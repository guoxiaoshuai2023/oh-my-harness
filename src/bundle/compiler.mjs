import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  assertBundleMap,
  assertInventory,
  assertPackageContract,
  assertSafeRelativePath,
  BINARY_NAME,
  CALIBRATION_SOURCE,
  FIXED_AGENT_PATHS,
  NODE_ENGINE,
  PACKAGE_NAME,
} from './validation.mjs';

const CONFIG_PATHS = {
  packageContract: 'packaging/package-contract.json',
  bundleMap: 'packaging/bundle-map.json',
  managedBlock: 'packaging/managed-router-block.md',
  packageSchema: 'packaging/schemas/package-contract.schema.json',
  inventorySchema: 'packaging/schemas/bundle-inventory.schema.json',
};

const REQUIRED_ROUTER_SECTIONS = [
  'Always-On Hard Gates',
  'Routing Table',
  'Adaptive Harness Control Plane',
  'Semantic Fidelity Entry Point',
  'Validation And Reporting Minimums',
];

const EVALUATOR_IDS = new Set([
  'agent/requirements-evaluator',
  'agent/plan-evaluator',
  'agent/solution-evaluator',
  'agent/result-evaluator',
  'agent/orchestration-reviewer',
]);

const SOURCE_ONLY_REFERENCES = [
  'docs/architecture.md',
  'docs/adapters/',
  'docs/adoption/',
  'examples/minimal-router/',
  '.codex/agents/harness-',
  '.codex/agents/*.toml',
  '.codex/config.example.toml',
  'scripts/extract_agents_source.py',
  'scripts/validate_router_fixture.py',
  'scripts/validate_rule_preservation.py',
];

const BARE_SOURCE_REFERENCES = [
  'docs/agent-routing',
  'task-docs/_harness',
];

const INSTALLED_REFERENCE_PATTERN = /(?:\.oh-my-harness(?:\/[A-Za-z0-9_.*-]+)*\/?|\.codex\/agents\/oh-my-harness-[A-Za-z0-9*-]+\.toml)(?=$|[\s"'`.,;:!?()[\]{}<>])/g;

const INTEGRATION_SECTION = `## Authority With Target Rules
- Target-repository instructions outside this block remain effective and must be followed alongside this Harness.
- If target-repository authority and Harness authority materially conflict or cannot both be followed, STOP and ask the user to resolve the conflict.
- Do not silently overwrite, weaken, or take over either target-repository authority or Harness authority.`;

function sha256(content) {
  return createHash('sha256').update(content).digest('hex');
}

function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function readJson(rootDir, relativePath, label) {
  try {
    return JSON.parse(await readFile(path.join(rootDir, relativePath), 'utf8'));
  } catch (error) {
    throw new Error(`${label} could not be parsed: ${error.message}`);
  }
}

export function applyRewrites(input, rewrites) {
  let output = '';
  let offset = 0;
  while (offset < input.length) {
    const rule = rewrites.find(({ from }) => input.startsWith(from, offset));
    if (rule) {
      output += rule.to;
      offset += rule.from.length;
    } else {
      output += input[offset];
      offset += 1;
    }
  }
  return output;
}

function section(source, heading) {
  const marker = `## ${heading}`;
  const start = source.indexOf(marker);
  if (start < 0) throw new Error(`managed router source is missing section: ${heading}`);
  const end = source.indexOf('\n## ', start + marker.length);
  return source.slice(start, end < 0 ? source.length : end).trimEnd();
}

function expectedManagedBlock(sourceRouter, map) {
  const transformedSections = REQUIRED_ROUTER_SECTIONS
    .map((heading) => applyRewrites(section(sourceRouter, heading), map.rewrites));
  return [
    map.managedBlock.startMarker,
    '# oh-my-harness Managed Router',
    'This block is managed by oh-my-harness.',
    '',
    INTEGRATION_SECTION,
    '',
    transformedSections.join('\n\n'),
    map.managedBlock.endMarker,
    '',
  ].join('\n');
}

function count(content, needle) {
  return content.split(needle).length - 1;
}

function assertManagedBlock(template, sourceRouter, map) {
  if (count(template, map.managedBlock.startMarker) !== 1 || count(template, map.managedBlock.endMarker) !== 1) {
    throw new Error('managed router block must contain each marker exactly once');
  }
  const expected = expectedManagedBlock(sourceRouter, map);
  if (template !== expected) {
    throw new Error('managed router block does not exactly preserve the required source sections and integration text');
  }
}

function addEvaluatorCalibrationBinding(content, calibrationPath, calibrationSha) {
  const anchor = '\n\nInspect primary evidence';
  const index = content.indexOf(anchor);
  if (index < 0) throw new Error('evaluator profile has no stable calibration-binding insertion point');
  const binding = `\n\nInstalled canonical evaluator calibration for this bundle: path \`${calibrationPath}\`; SHA-256 \`${calibrationSha}\`. This binding does not replace the main-thread packet requirement above.`;
  return `${content.slice(0, index)}${binding}${content.slice(index)}`;
}

function addCalibrationLedgerBinding(content, calibrationPath, calibrationSha) {
  const anchor = `Canonical evaluator calibration path: ${calibrationPath}`;
  const anchorCount = count(content, anchor);
  if (anchorCount !== 1) {
    throw new Error(`acceptance matrix must contain exactly one installed calibration anchor; found ${anchorCount}`);
  }
  const label = 'Installed transformed calibration SHA-256:';
  if (content.includes(label)) {
    throw new Error('acceptance matrix must not contain a pre-existing installed calibration binding');
  }
  const binding = `${label} \`${calibrationSha}\``;
  return content.replace(anchor, `${anchor}\n${binding}`);
}

function isTokenBoundary(content, index, direction) {
  if (index < 0 || index >= content.length) return true;
  const character = content[index];
  return direction === 'before'
    ? !/[A-Za-z0-9_.-]/.test(character)
    : !/[A-Za-z0-9_-]/.test(character);
}

function containsBoundedToken(content, token) {
  let offset = content.indexOf(token);
  while (offset >= 0) {
    if (isTokenBoundary(content, offset - 1, 'before')
        && isTokenBoundary(content, offset + token.length, 'after')) return true;
    offset = content.indexOf(token, offset + 1);
  }
  return false;
}

function inventoryPaths(inventory) {
  const installed = new Set(inventory.requiredFiles.map(({ destinationPath }) => destinationPath));
  installed.add(inventory.managedBlock.assetPath);
  installed.add('.oh-my-harness/bundle-inventory.json');
  return installed;
}

function installedDirectories(installed) {
  const directories = new Set();
  for (const installedPath of installed) {
    let directory = path.posix.dirname(installedPath);
    while (directory !== '.') {
      directories.add(directory);
      directory = path.posix.dirname(directory);
    }
  }
  return directories;
}

function referenceResolves(reference, installed, directories) {
  const normalized = reference.endsWith('/') ? reference.slice(0, -1) : reference;
  return installed.has(normalized)
    || directories.has(normalized)
    || (reference.includes('*') && [...installed].some((candidate) => wildcardPattern(reference).test(candidate)));
}

function maskInstalledReferences(content, runtimeReferences) {
  let masked = content;
  const references = [...new Set(runtimeReferences)].sort((left, right) => right.length - left.length
    || Buffer.from(left).compare(Buffer.from(right)));
  for (const reference of references) {
    masked = masked.split(reference).join(' '.repeat(reference.length));
  }
  return masked;
}

export function assertRuntimeReferenceClosure(content, destination, inventory) {
  const installed = inventoryPaths(inventory);
  const directories = installedDirectories(installed);
  const runtimeReferences = content.match(INSTALLED_REFERENCE_PATTERN) ?? [];
  for (const reference of runtimeReferences) {
    if (!referenceResolves(reference, installed, directories)) {
      throw new Error(`installed reference does not resolve in ${destination}: ${reference}`);
    }
  }
  const scrubbed = maskInstalledReferences(content, runtimeReferences);
  for (const sourceReference of BARE_SOURCE_REFERENCES) {
    if (containsBoundedToken(scrubbed, sourceReference)) {
      throw new Error(`unknown source-only runtime reference in ${destination}: ${sourceReference}`);
    }
  }
  for (const sourceReference of SOURCE_ONLY_REFERENCES) {
    if (scrubbed.includes(sourceReference)) {
      throw new Error(`unknown source-only runtime reference in ${destination}: ${sourceReference}`);
    }
  }
  if (content.includes('/Users/') || content.includes('/home/')) {
    throw new Error(`local absolute path leaked into ${destination}`);
  }
}

function wildcardPattern(value) {
  const escaped = value.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('*', '.*');
  return new RegExp(`^${escaped}$`);
}

async function assertEmptyOutput(outputDir) {
  try {
    const info = await stat(outputDir);
    if (!info.isDirectory()) throw new Error('output path exists and is not a directory');
    const children = await readdir(outputDir);
    if (children.length) throw new Error('output directory must be new or explicitly empty');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}

function validateVersion(version) {
  if (typeof version !== 'string' || !/^[0-9A-Za-z][0-9A-Za-z.+_-]*$/.test(version)) {
    throw new Error('bundle version must be a non-empty path-safe release identifier');
  }
}

export async function buildBundle({ rootDir, outputDir, version }) {
  validateVersion(version);
  if (!path.isAbsolute(rootDir) || !path.isAbsolute(outputDir)) throw new Error('rootDir and outputDir must be absolute paths');
  await assertEmptyOutput(outputDir);

  const [packageContract, map, packageSchema, inventorySchema] = await Promise.all([
    readJson(rootDir, CONFIG_PATHS.packageContract, 'package contract'),
    readJson(rootDir, CONFIG_PATHS.bundleMap, 'bundle map'),
    readJson(rootDir, CONFIG_PATHS.packageSchema, 'package contract schema'),
    readJson(rootDir, CONFIG_PATHS.inventorySchema, 'bundle inventory schema'),
  ]);
  assertPackageContract(packageContract, packageSchema);
  assertBundleMap(map);
  const [managedTemplate, sourceRouter] = await Promise.all([
    readFile(path.join(rootDir, CONFIG_PATHS.managedBlock), 'utf8'),
    readFile(path.join(rootDir, 'AGENTS.md'), 'utf8'),
  ]);
  assertManagedBlock(managedTemplate, sourceRouter, map);

  const sourceContents = new Map();
  for (const entry of map.entries) {
    try {
      sourceContents.set(entry.assetId, await readFile(path.join(rootDir, entry.source)));
    } catch (error) {
      throw new Error(`required source is unavailable for ${entry.assetId}: ${error.message}`);
    }
  }

  const calibrationEntry = map.entries.find(({ source }) => source === CALIBRATION_SOURCE);
  if (!calibrationEntry || calibrationEntry.assetId !== 'calibration/evaluator-calibration') {
    throw new Error('canonical calibration map entry is missing');
  }
  const calibrationSource = sourceContents.get(calibrationEntry.assetId);
  const calibrationTransformed = Buffer.from(applyRewrites(calibrationSource.toString('utf8'), map.rewrites));
  const calibrationSourceSha = sha256(calibrationSource);
  const calibrationSha = sha256(calibrationTransformed);

  const payloads = [];
  for (const entry of map.entries) {
    const source = sourceContents.get(entry.assetId);
    let content = entry.assetId === calibrationEntry.assetId
      ? calibrationTransformed.toString('utf8')
      : applyRewrites(source.toString('utf8'), map.rewrites);
    const transformations = ['reference-rewrite'];
    if (map.calibrationBinding.dependentAssetIds.includes(entry.assetId)) {
      if (content.includes(calibrationSourceSha)) {
        content = content.split(calibrationSourceSha).join(calibrationSha);
        transformations.push('calibration-hash-regeneration');
      }
      if (entry.assetId === 'calibration/adaptive-orchestration-acceptance-matrix') {
        content = addCalibrationLedgerBinding(content, map.calibrationBinding.destinationPath, calibrationSha);
        transformations.push('calibration-ledger-binding');
      }
      if (EVALUATOR_IDS.has(entry.assetId)) {
        content = addEvaluatorCalibrationBinding(content, map.calibrationBinding.destinationPath, calibrationSha);
        transformations.push('calibration-binding');
      }
    }
    payloads.push({ entry, source, content: Buffer.from(content), transformations });
  }

  const requiredFiles = payloads
    .map(({ entry, source, content, transformations }) => ({
      assetId: entry.assetId,
      sourcePath: entry.source,
      sourceSha256: sha256(source),
      destinationPath: entry.destination,
      destinationSha256: sha256(content),
      required: true,
      kind: entry.kind,
      transformations,
    }))
    .sort((left, right) => Buffer.from(left.destinationPath).compare(Buffer.from(right.destinationPath)));

  const payloadPaths = requiredFiles.map(({ destinationPath }) => destinationPath);
  const inventory = {
    schemaVersion: 1,
    bundleVersion: version,
    packageName: PACKAGE_NAME,
    binaryName: BINARY_NAME,
    nodeEngine: NODE_ENGINE,
    installerCompatibility: {
      packageName: PACKAGE_NAME,
      binaryName: BINARY_NAME,
      nodeEngine: NODE_ENGINE,
    },
    requiredFiles,
    optionalFiles: [],
    managedBlock: {
      sourcePath: map.managedBlock.sourceRouter,
      sourceSha256: sha256(Buffer.from(sourceRouter)),
      assetPath: map.managedBlock.assetPath,
      sha256: sha256(Buffer.from(managedTemplate)),
      startMarker: map.managedBlock.startMarker,
      endMarker: map.managedBlock.endMarker,
    },
    ownership: {
      payloadPaths,
      agentPaths: FIXED_AGENT_PATHS,
      managedBlockId: 'oh-my-harness',
    },
    referencePolicy: {
      runtimeSourcePathsForbidden: true,
      provenanceSourcePathsAllowed: true,
    },
  };
  assertInventory(inventory, inventorySchema);
  for (const { entry, content } of payloads) {
    assertRuntimeReferenceClosure(content.toString('utf8'), entry.destination, inventory);
  }

  const outputFiles = new Map(payloads.map(({ entry, content }) => [entry.destination, content]));
  outputFiles.set(map.managedBlock.assetPath, Buffer.from(managedTemplate));
  outputFiles.set('.oh-my-harness/bundle-inventory.json', Buffer.from(serialize(inventory)));
  for (const relativePath of outputFiles.keys()) assertSafeRelativePath(relativePath, 'output file');

  await mkdir(outputDir, { recursive: true });
  for (const relativePath of [...outputFiles.keys()].sort()) {
    const absolutePath = path.join(outputDir, relativePath);
    await mkdir(path.dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, outputFiles.get(relativePath), { flag: 'wx' });
  }

  return {
    inventory,
    calibrationSourceSha256: calibrationSourceSha,
    calibrationSha256: calibrationSha,
    outputFileCount: outputFiles.size,
  };
}
