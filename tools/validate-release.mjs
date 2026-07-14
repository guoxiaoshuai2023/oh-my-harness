#!/usr/bin/env node
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import {
  cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { assertRuntimeReferenceClosure } from '../src/bundle/compiler.mjs';
import { loadReleaseBundle, preparePackage } from '../src/installer/package-bundle.mjs';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VERSION = '0.1.0';
const PROFILE_PATHS = [
  '.codex/agents/oh-my-harness-executor.toml',
  '.codex/agents/oh-my-harness-plan-evaluator.toml',
  '.codex/agents/oh-my-harness-planner.toml',
  '.codex/agents/oh-my-harness-result-evaluator.toml',
  '.codex/agents/oh-my-harness-solution-designer.toml',
  '.codex/agents/oh-my-harness-solution-evaluator.toml',
];
const HELPER_PATHS = [
  '.oh-my-harness/scripts/extract_agents_source.py',
  '.oh-my-harness/scripts/validate_router_fixture.py',
  '.oh-my-harness/scripts/validate_rule_preservation.py',
];

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function resolveExecutable(name) {
  for (const directory of (process.env.PATH ?? '').split(path.delimiter).filter(Boolean)) {
    const candidate = path.resolve(directory, name);
    try {
      const info = statSync(candidate);
      if (info.isFile() && (info.mode & 0o111)) return candidate;
    } catch {}
  }
  throw new Error(`${name} is unavailable under the verified PATH`);
}

function run(executable, args, { cwd, environment, label }) {
  const assignments = Object.entries(environment).map(([key, value]) => `${key}=${value}`);
  const child = spawnSync('/usr/bin/env', ['-i', ...assignments, executable, ...args], {
    cwd, env: {}, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
  });
  if (child.error || child.signal || child.status !== 0) {
    throw new Error(`${label} failed: status=${child.status} signal=${child.signal ?? 'none'} detail=${child.error?.message ?? child.stderr.trim()}`);
  }
  return child.stdout;
}

function isolatedEnvironment(root, executables) {
  return {
    PATH: [...new Set([
      path.dirname(process.execPath), path.dirname(executables.npm), path.dirname(executables.python),
      '/usr/bin', '/bin',
    ])].join(path.delimiter),
    HOME: path.join(root, 'home'),
    XDG_CONFIG_HOME: path.join(root, 'xdg'),
    TMPDIR: path.join(root, 'tmp'),
    PYTHONPYCACHEPREFIX: path.join(root, 'pycache'),
    npm_config_userconfig: path.join(root, 'user.npmrc'),
    npm_config_globalconfig: path.join(root, 'global.npmrc'),
    npm_config_cache: path.join(root, 'cache'),
    npm_config_logs_dir: path.join(root, 'logs'),
    npm_config_tmp: path.join(root, 'tmp'),
    npm_config_offline: 'true',
    npm_config_ignore_scripts: 'true',
    npm_config_audit: 'false',
    npm_config_fund: 'false',
    npm_config_update_notifier: 'false',
    npm_config_progress: 'false',
    npm_config_registry: 'http://127.0.0.1:9',
    LC_ALL: 'C',
  };
}

function repositoryStatus() {
  const git = resolveExecutable('git');
  const child = spawnSync(git, ['--no-optional-locks', '-c', 'core.hooksPath=/dev/null', '-c', 'core.fsmonitor=false', 'status', '--porcelain=v1', '-uall'], {
    cwd: ROOT, env: {
      PATH: `${path.dirname(git)}:/usr/bin:/bin`, HOME: '/nonexistent',
      XDG_CONFIG_HOME: '/nonexistent', GIT_CONFIG_NOSYSTEM: '1',
      GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_SYSTEM: '/dev/null',
      GIT_OPTIONAL_LOCKS: '0', LC_ALL: 'C',
    }, encoding: 'utf8',
  });
  if (child.status !== 0) throw new Error('could not capture repository status');
  return child.stdout;
}

async function repositoryResidue() {
  const names = ['dist', 'node_modules', '.npm', 'npm-cache', '__pycache__'];
  const present = [];
  for (const name of names) {
    try { await lstat(path.join(ROOT, name)); present.push(name); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  for (const name of await readdir(ROOT)) if (name.endsWith('.tgz') || name.startsWith('npm-debug')) present.push(name);
  return [...new Set(present)].sort();
}

async function stagePackage(stageRoot) {
  await mkdir(stageRoot);
  await cp(path.join(ROOT, 'bin'), path.join(stageRoot, 'bin'), { recursive: true, errorOnExist: true, force: false });
  await mkdir(path.join(stageRoot, 'src'));
  await cp(path.join(ROOT, 'src/installer'), path.join(stageRoot, 'src/installer'), { recursive: true, errorOnExist: true, force: false });
  await cp(path.join(ROOT, 'README.md'), path.join(stageRoot, 'README.md'), { errorOnExist: true, force: false });
  await cp(path.join(ROOT, 'package.json'), path.join(stageRoot, 'package.json'), { errorOnExist: true, force: false });
  await preparePackage({ packRoot: stageRoot, sourceRoot: ROOT, version: VERSION });
  return loadReleaseBundle({ packageRoot: stageRoot, packageVersion: VERSION });
}

async function treeHashes(root) {
  const rows = [];
  const walk = async (directory, prefix = '') => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => Buffer.from(left.name).compare(Buffer.from(right.name)));
    for (const entry of entries) {
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolute, relativePath);
      else if (entry.isFile()) rows.push([relativePath, sha256(await readFile(absolute))]);
      else throw new Error(`unexpected staged file type: ${relativePath}`);
    }
  };
  await walk(root);
  return rows;
}

function tarEntries(archiveBytes) {
  const bytes = gunzipSync(archiveBytes);
  const entries = new Map();
  let offset = 0;
  while (offset + 512 <= bytes.length) {
    const header = bytes.subarray(offset, offset + 512);
    if (header.every((value) => value === 0)) break;
    const text = (start, length) => header.subarray(start, start + length).toString('utf8').replace(/\0.*$/s, '');
    const name = text(0, 100);
    const prefix = text(345, 155);
    const fullName = prefix ? `${prefix}/${name}` : name;
    const sizeText = text(124, 12).trim();
    const size = sizeText ? Number.parseInt(sizeText, 8) : 0;
    const type = String.fromCharCode(header[156] || 0x30);
    if (!Number.isSafeInteger(size) || size < 0 || entries.has(fullName)) throw new Error(`malformed archive entry: ${fullName}`);
    const contentStart = offset + 512;
    const contentEnd = contentStart + size;
    if (contentEnd > bytes.length) throw new Error(`archive entry exceeds bounds: ${fullName}`);
    if (type === '0' || type === '\0') entries.set(fullName, bytes.subarray(contentStart, contentEnd));
    else if (type !== '5') throw new Error(`unsupported archive entry type ${type}: ${fullName}`);
    offset = contentStart + Math.ceil(size / 512) * 512;
  }
  return entries;
}

async function expectedPackagePaths(stageRoot, release) {
  const installer = (await readdir(path.join(stageRoot, 'src/installer'))).sort();
  return [
    'README.md', 'package.json', 'bin/oh-my-harness.mjs',
    ...installer.map((name) => `src/installer/${name}`),
    ...[...release.files.keys()].map((name) => `dist/${name}`),
  ].sort();
}

function assertExactSet(actual, expected, label) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const extra = [...actualSet].filter((item) => !expectedSet.has(item));
  const missing = [...expectedSet].filter((item) => !actualSet.has(item));
  if (extra.length || missing.length) throw new Error(`${label} mismatch; extra=${extra.join(',')} missing=${missing.join(',')}`);
}

export function findUnscopedInstallCommands(text) {
  return text.split(/\r?\n/).map((line) => line.trim()).filter((line) => {
    const command = line.replace(/^\$\s*/, '').replace(/^```(?:sh|shell|bash)?\s*/, '');
    return /^npx\s+(?:--yes\s+)?oh-my-harness(?:\s|$)/.test(command)
      || (/^npx\s/.test(command) && /--package=oh-my-harness(?:@|\s|$)/.test(command));
  });
}

async function guidanceEvidence(archive) {
  assert.equal(findUnscopedInstallCommands('npx oh-my-harness install --target repo').length, 1);
  assert.equal(findUnscopedInstallCommands('npx --yes --package=oh-my-harness oh-my-harness install --target repo').length, 1);
  assert.equal(findUnscopedInstallCommands('npx --yes --package=@guoxiaoshuai2023/oh-my-harness@1.0.0 oh-my-harness install --target repo').length, 0);
  const sourceSurfaces = [
    'README.md', 'docs/architecture.md', 'docs/adapters/codex-subagents.md',
    'docs/adoption/universal-harness-adoption-runbook.md', 'docs/adoption/bundle-lifecycle-spec.md',
    'bin/oh-my-harness.mjs',
  ];
  const violations = [];
  for (const relativePath of sourceSurfaces) {
    const text = await readFile(path.join(ROOT, relativePath), 'utf8');
    for (const command of findUnscopedInstallCommands(text)) violations.push(`${relativePath}:${command}`);
  }
  for (const [name, bytes] of archive) {
    for (const command of findUnscopedInstallCommands(bytes.toString('utf8'))) violations.push(`${name}:${command}`);
  }
  assert.deepEqual(violations, []);
  const readme = await readFile(path.join(ROOT, 'README.md'), 'utf8');
  const runbook = await readFile(path.join(ROOT, 'docs/adoption/universal-harness-adoption-runbook.md'), 'utf8');
  for (const operation of ['install', 'update', 'uninstall']) {
    assert(readme.includes(`oh-my-harness ${operation} --target <repo>`));
    assert(runbook.includes(`oh-my-harness ${operation} --target <repo> --dry-run`));
  }
  assert(readme.includes('--package=@guoxiaoshuai2023/oh-my-harness@'));
  return { scannedSourceSurfaces: sourceSurfaces.length, scannedArchiveFiles: archive.size, negativeFixtures: 2 };
}

async function documentationAndCiEvidence(release) {
  const documentPaths = [
    'README.md', 'docs/architecture.md', 'docs/adapters/codex-subagents.md',
    'docs/adoption/universal-harness-adoption-runbook.md', 'docs/adoption/bundle-lifecycle-spec.md',
  ];
  const documents = (await Promise.all(documentPaths.map((relativePath) => readFile(path.join(ROOT, relativePath), 'utf8')))).join('\n');
  for (const required of [
    '@guoxiaoshuai2023/oh-my-harness', 'oh-my-harness install', '.oh-my-harness',
    'oh-my-harness-', 'Node `>=24 <25`', 'Python 3.11', 'target', 'authority',
    'publication', 'evidence',
  ]) assert(documents.includes(required), required);
  const cli = await readFile(path.join(ROOT, 'src/installer/cli.mjs'), 'utf8');
  assert(cli.includes('usage: oh-my-harness <install|update|uninstall> --target <repo> [--dry-run] [--yes]'));
  assert(!cli.includes('npx oh-my-harness'));

  const ci = await readFile(path.join(ROOT, '.github/workflows/ci.yml'), 'utf8');
  for (const required of [
    'actions/setup-python@v5', 'python-version: "3.11"', 'python -m py_compile scripts/*.py',
    'Parse Codex agent profiles', 'Run router fixture smoke check', 'Validate adaptive orchestration structure',
    'actions/setup-node@v4', 'node-version: "24.14.0"', 'npm test',
    'node --test test/acceptance/*.test.mjs', 'npm run validate:package', 'node tools/validate-release.mjs',
  ]) assert(ci.includes(required), required);
  const kindCounts = release.inventory.requiredFiles.reduce((counts, item) => {
    counts[item.kind] = (counts[item.kind] ?? 0) + 1;
    return counts;
  }, {});
  assert.equal(kindCounts.protocol, 3);
  assert.equal(kindCounts.template, 13);
  assert.equal(kindCounts.calibration, 2);
  return {
    sourceDocuments: documentPaths.length, cliBinarySyntax: true,
    packedProtocols: kindCounts.protocol, packedTemplates: kindCounts.template,
    packedCalibration: kindCounts.calibration, existingCiChecksRetained: true,
    nodePackageAcceptanceChecksInCi: true, unpublishedBoundary: true,
  };
}

async function semanticEvidence(release) {
  const block = release.managedBlock.toString('utf8');
  for (const required of [
    '## Always-On Hard Gates', '## Adaptive Harness Control Plane',
    '## Routing Table', '## Semantic Fidelity Entry Point',
    'Target-repository instructions outside this block remain effective and must be followed alongside this Harness.',
    'materially conflict or cannot both be followed, STOP and ask the user',
    'Do not silently overwrite, weaken, or take over either target-repository authority or Harness authority.',
  ]) assert(block.includes(required), required);
  assert.equal(block.split('\n').filter((line) => line.startsWith('|')).length, 11);
  const modality = Object.fromEntries(['must', 'must not', 'Do not', 'STOP', 'required'].map((token) => [token, block.split(token).length - 1]));
  assert(Object.values(modality).every((count) => count > 0));

  const profiles = new Map();
  for (const profilePath of PROFILE_PATHS) profiles.set(profilePath, release.files.get(profilePath).toString('utf8'));
  assert.equal(profiles.size, 6);
  assert.equal(new Set([...profiles.values()].map((text) => text.match(/^description = "([^"]+)"$/m)?.[1])).size, 6);
  const evaluators = [...profiles].filter(([profilePath]) => profilePath.includes('evaluator'));
  assert.equal(evaluators.length, 3);
  for (const [, text] of evaluators) {
    for (const required of [
      'sandbox_mode = "read-only"', 'never substitutes for primary', 'strict',
      'do not edit, repair, complete', '.oh-my-harness/calibration/evaluator-calibration.md',
    ]) assert(text.includes(required), required);
  }
  const executor = profiles.get('.codex/agents/oh-my-harness-executor.toml');
  for (const required of [
    'Execute exactly one stable, cited authority', 'allowed writes or actions', 'protected state',
    'Stop when a material change', 'repair adjacent issues', 'Do not fabricate execution',
  ]) assert(executor.includes(required), required);
  const adaptive = release.files.get('.oh-my-harness/protocols/adaptive-orchestration-protocol.md').toString('utf8');
  for (const required of [
    'default meaning of “use the harness” is adaptive main-thread governance',
    'complete v2 flow remains an explicit compatible option',
    'deliberate', 'evidence',
  ]) assert(adaptive.toLowerCase().includes(required.toLowerCase()), required);
  return {
    managedBlockSha256: sha256(release.managedBlock), modality,
    routeRows: 9, profiles: 6, evaluatorProfiles: 3,
    targetAuthority: true, conflictStop: true, adaptiveThreeState: true,
    executorBoundary: true, evaluatorBoundary: true,
  };
}

async function extractArchive(archive, destination) {
  for (const [name, bytes] of archive) {
    const absolute = path.join(destination, ...name.split('/'));
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, bytes, { flag: 'wx' });
  }
}

async function pythonEvidence({ archive, root, environment, python }) {
  const extracted = path.join(root, 'extracted');
  await mkdir(extracted);
  await extractArchive(archive, extracted);
  const installedRoot = path.join(extracted, 'package/dist');
  const helperFiles = HELPER_PATHS.map((relativePath) => path.join(installedRoot, ...relativePath.split('/')));
  const pythonVersion = run(python, ['--version'], { cwd: extracted, environment, label: 'Python version' }).trim();
  assert.match(pythonVersion, /^Python 3\.11\./);
  run(python, ['-m', 'py_compile', ...helperFiles], { cwd: extracted, environment, label: 'packed helper compilation' });

  const fixtureRoot = path.join(root, 'python-fixtures');
  await mkdir(fixtureRoot);
  const source = path.join(fixtureRoot, 'AGENTS.md');
  const snapshot = path.join(fixtureRoot, 'snapshot.md');
  const draft = path.join(fixtureRoot, 'coverage-draft.md');
  await writeFile(source, '# Rules\n\n- MUST preserve target authority.\n');
  run(python, [helperFiles[0], source, '--snapshot', snapshot, '--coverage', draft, '--prefix', 'PACKED-SRC'], {
    cwd: fixtureRoot, environment, label: 'packed extract_agents_source.py',
  });
  assert((await readFile(snapshot, 'utf8')).includes('PACKED-SRC-0002'));
  assert((await readFile(draft, 'utf8')).includes('PACKED-SRC-0002'));

  const router = path.join(installedRoot, 'AGENTS.md');
  const routerFixture = path.join(installedRoot, '.oh-my-harness/templates/routing-scenario-matrix-template.md');
  await writeFile(router, releaseManagedBlockFromArchive(archive));
  const routerOutput = run(python, [helperFiles[1], '--router', router, '--fixture', routerFixture], {
    cwd: installedRoot, environment, label: 'packed validate_router_fixture.py',
  });
  assert(routerOutput.includes('router fixture smoke/coverage check passed'));

  const coverage = path.join(fixtureRoot, 'coverage.md');
  const ledger = path.join(fixtureRoot, 'ledger.md');
  await writeFile(coverage, [
    '| Source block ID | Original heading/context | Original excerpt | Classification | Force | Coverage rationale |',
    '| --- | --- | --- | --- | --- | --- |',
    '| `PACKED-SRC-0001` | Rules | heading | Non-normative | `CONTEXT` | Heading context only. |',
    '| `PACKED-SRC-0002` | Rules | MUST preserve target authority. | Rule ID: `PACKED-RULE-001` | `MUST` | Preserves target authority. |',
    '',
  ].join('\n'));
  await writeFile(ledger, [
    '# Rule ledger', '', '### PACKED-RULE-001', '',
    '- Source block ID(s): `PACKED-SRC-0002`', '- Original force: MUST',
    '- Target force: MUST', '- Force preserved: yes', '- Fidelity judgment: PRESERVED', '',
  ].join('\n'));
  const ruleOutput = run(python, [helperFiles[2], '--snapshot', snapshot, '--coverage', coverage, '--ledger', ledger], {
    cwd: fixtureRoot, environment, label: 'packed validate_rule_preservation.py',
  });
  assert(ruleOutput.includes('rule preservation structural check passed'));
  return { pythonVersion, compiledHelpers: helperFiles.length, executedHelpers: helperFiles.length, tomlProfiles: 6 };
}

function releaseManagedBlockFromArchive(archive) {
  const bytes = archive.get('package/dist/.oh-my-harness/managed-router-block.md');
  if (!bytes) throw new Error('packed managed block is missing');
  return bytes;
}

async function parsePackedToml({ archive, root, environment, python }) {
  const paths = PROFILE_PATHS.map((relativePath) => path.join(root, 'extracted/package/dist', ...relativePath.split('/')));
  const code = 'import pathlib,sys,tomllib\nfor p in sys.argv[1:]:\n tomllib.loads(pathlib.Path(p).read_text(encoding="utf-8"))\nprint(f"parsed={len(sys.argv)-1}")';
  const output = run(python, ['-c', code, ...paths], { cwd: root, environment, label: 'packed TOML parse' });
  assert.equal(output.trim(), 'parsed=6');
}

async function packStage({ stageRoot, archiveRoot, environment, npm, dryRun = false }) {
  const args = ['pack', '--ignore-scripts', '--offline', '--json'];
  if (dryRun) args.push('--dry-run');
  else args.push('--pack-destination', archiveRoot);
  const output = run(npm, args, { cwd: stageRoot, environment, label: dryRun ? 'npm pack --dry-run --json' : 'npm pack archive' });
  const parsed = JSON.parse(output);
  assert(Array.isArray(parsed) && parsed.length === 1);
  return parsed[0];
}

export async function validateRelease() {
  if (process.version !== 'v24.14.0') throw new Error(`release validation requires Node v24.14.0, got ${process.version}`);
  const beforeStatus = repositoryStatus();
  assert.deepEqual(await repositoryResidue(), []);
  const root = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-task4-release-'));
  const rootReal = await realpath(root);
  let cleanupFailed = false;
  try {
    for (const child of ['archive-a', 'archive-b', 'cache', 'home', 'logs', 'tmp', 'xdg', 'pycache']) {
      await mkdir(path.join(rootReal, child));
    }
    await writeFile(path.join(rootReal, 'user.npmrc'), '', { flag: 'wx', mode: 0o600 });
    await writeFile(path.join(rootReal, 'global.npmrc'), '', { flag: 'wx', mode: 0o600 });
    const executables = {
      npm: resolveExecutable('npm'), python: resolveExecutable('python3.11'),
    };
    const environment = isolatedEnvironment(rootReal, executables);
    const npmVersion = run(executables.npm, ['--version'], { cwd: rootReal, environment, label: 'npm version' }).trim();
    const stageA = path.join(rootReal, 'package-a');
    const stageB = path.join(rootReal, 'package-b');
    const releaseA = await stagePackage(stageA);
    const releaseB = await stagePackage(stageB);
    const treeA = await treeHashes(path.join(stageA, 'dist'));
    const treeB = await treeHashes(path.join(stageB, 'dist'));
    assert.deepEqual(treeA, treeB);
    assert.equal(treeA.length, 44);
    assert.deepEqual(releaseA.inventoryBytes, releaseB.inventoryBytes);
    const payloadIdentity = sha256(Buffer.from(`${JSON.stringify(treeA)}\n`));
    const inventoryIdentity = sha256(releaseA.inventoryBytes);

    const expectedPaths = await expectedPackagePaths(stageA, releaseA);
    const dryRun = await packStage({ stageRoot: stageA, archiveRoot: null, environment, npm: executables.npm, dryRun: true });
    assertExactSet(dryRun.files.map(({ path: filePath }) => filePath), expectedPaths, 'npm dry-run file inventory');

    const packedA = await packStage({ stageRoot: stageA, archiveRoot: path.join(rootReal, 'archive-a'), environment, npm: executables.npm });
    const packedB = await packStage({ stageRoot: stageB, archiveRoot: path.join(rootReal, 'archive-b'), environment, npm: executables.npm });
    const archivePathA = path.join(rootReal, 'archive-a', packedA.filename);
    const archivePathB = path.join(rootReal, 'archive-b', packedB.filename);
    const archiveBytesA = await readFile(archivePathA);
    const archiveBytesB = await readFile(archivePathB);
    assert.deepEqual(archiveBytesA, archiveBytesB);
    const packageIdentity = sha256(archiveBytesA);
    const archive = tarEntries(archiveBytesA);
    assertExactSet([...archive.keys()], expectedPaths.map((item) => `package/${item}`), 'packed archive file inventory');
    const metadata = JSON.parse(archive.get('package/package.json').toString('utf8'));
    assert.equal(metadata.name, '@guoxiaoshuai2023/oh-my-harness');
    assert.deepEqual(metadata.bin, { 'oh-my-harness': 'bin/oh-my-harness.mjs' });
    assert.deepEqual(metadata.engines, { node: '>=24 <25' });
    assert.equal(metadata.dependencies, undefined);
    assert.equal(metadata.devDependencies, undefined);
    for (const name of archive.keys()) {
      assert(!/(?:^|\/)(?:install-state\.json|\.operation-in-progress\.json|__pycache__)(?:\/|$)/.test(name), name);
      assert(!name.includes('.oh-my-harness-backups') && !name.includes('task-docs/history') && !name.includes('/test/'), name);
    }
    for (const [name, bytes] of archive) {
      const text = bytes.toString('utf8');
      assert(!text.includes(ROOT), `local absolute path in ${name}`);
      assert(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}/.test(text), `secret-like content in ${name}`);
    }
    for (const item of releaseA.inventory.requiredFiles) {
      const content = releaseA.files.get(item.destinationPath).toString('utf8');
      assertRuntimeReferenceClosure(content, item.destinationPath, releaseA.inventory);
      assert(!/(?:^|[\s"'`(])task-docs\/_harness(?=$|[\s"'`.,;:!?/)\]}])/m.test(content), item.destinationPath);
      assert(!/(?:^|[\s"'`(])docs\/agent-routing(?=$|[\s"'`.,;:!?/)\]}])/m.test(content), item.destinationPath);
    }
    const semantic = await semanticEvidence(releaseA);
    const guidance = await guidanceEvidence(archive);
    const documentationAndCi = await documentationAndCiEvidence(releaseA);
    const python = await pythonEvidence({ archive, root: rootReal, environment, python: executables.python });
    await parsePackedToml({ archive, root: rootReal, environment, python: executables.python });

    assert.equal(repositoryStatus(), beforeStatus);
    assert.deepEqual(await repositoryResidue(), []);
    return {
      status: 'PASS', nodeVersion: process.version, npmVersion,
      package: {
        name: metadata.name, binary: 'oh-my-harness', version: metadata.version,
        fileCount: archive.size, dryRunFileCount: dryRun.files.length,
        packageIdentity, payloadIdentity, inventoryIdentity,
        twoBuildPathsBytesHashesIdentical: true, twoArchivesIdentical: true,
      },
      references: { requiredFiles: releaseA.inventory.requiredFiles.length, installedFiles: releaseA.files.size, closure: true, sourceOnlyRuntimePaths: 0 },
      python, semantic, guidance, documentationAndCi,
      cleanup: { repositoryStatusUnchanged: true, repositoryResidue: [] },
    };
  } finally {
    try {
      if (await realpath(root) !== rootReal || !rootReal.startsWith(await realpath(os.tmpdir()))) throw new Error('temporary root identity changed');
      await rm(rootReal, { recursive: true, force: false });
      try { await lstat(rootReal); throw new Error('temporary release root remains'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    } catch {
      cleanupFailed = true;
    }
    if (cleanupFailed) throw new Error('owned temporary release root cleanup failed');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await validateRelease();
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`release validation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
