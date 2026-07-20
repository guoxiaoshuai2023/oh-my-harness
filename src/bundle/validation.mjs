import { createHash } from 'node:crypto';
import path from 'node:path';

export const PACKAGE_NAME = '@guoxiaoshuai2023/oh-my-harness';
export const BINARY_NAME = 'oh-my-harness';
export const NODE_ENGINE = '>=24 <25';
export const CALIBRATION_SOURCE = 'task-docs/_harness/evaluator-calibration.md';
export const CALIBRATION_DESTINATION = '.oh-my-harness/calibration/evaluator-calibration.md';

const GENERIC_REWRITES = [
  ['.codex/agents/harness-*.toml', '.codex/agents/oh-my-harness-*.toml'],
  ['.codex/agents/*.toml', '.codex/agents/oh-my-harness-*.toml'],
  ['task-docs/_harness/templates/', '.oh-my-harness/templates/'],
  ['examples/minimal-router/', '.oh-my-harness/docs/examples/minimal-router/'],
  ['docs/agent-routing/', '.oh-my-harness/docs/agent-routing/'],
  ['docs/agent-routing', '.oh-my-harness/docs/agent-routing'],
  ['task-docs/_harness/', '.oh-my-harness/'],
  ['task-docs/_harness', '.oh-my-harness'],
  ['docs/adapters/', '.oh-my-harness/docs/adapters/'],
  ['docs/adoption/', '.oh-my-harness/docs/adoption/'],
  ['scripts/', '.oh-my-harness/scripts/'],
];

const PROFILE_REWRITES = [
  ['harness-planner.toml', 'oh-my-harness-planner.toml'],
  ['harness-plan-evaluator.toml', 'oh-my-harness-plan-evaluator.toml'],
  ['harness-solution-designer.toml', 'oh-my-harness-solution-designer.toml'],
  ['harness-solution-evaluator.toml', 'oh-my-harness-solution-evaluator.toml'],
  ['harness-executor.toml', 'oh-my-harness-executor.toml'],
  ['harness-result-evaluator.toml', 'oh-my-harness-result-evaluator.toml'],
  ['harness-requirements-author.toml', 'oh-my-harness-requirements-author.toml'],
  ['harness-requirements-evaluator.toml', 'oh-my-harness-requirements-evaluator.toml'],
  ['harness-orchestration-reviewer.toml', 'oh-my-harness-orchestration-reviewer.toml'],
];

const EXACT_HELPERS = [
  '.oh-my-harness/scripts/extract_agents_source.py',
  '.oh-my-harness/scripts/validate_router_fixture.py',
  '.oh-my-harness/scripts/validate_rule_preservation.py',
];

const EXACT_AGENT_PATHS = [
  '.codex/agents/oh-my-harness-executor.toml',
  '.codex/agents/oh-my-harness-orchestration-reviewer.toml',
  '.codex/agents/oh-my-harness-plan-evaluator.toml',
  '.codex/agents/oh-my-harness-planner.toml',
  '.codex/agents/oh-my-harness-requirements-author.toml',
  '.codex/agents/oh-my-harness-requirements-evaluator.toml',
  '.codex/agents/oh-my-harness-result-evaluator.toml',
  '.codex/agents/oh-my-harness-solution-designer.toml',
  '.codex/agents/oh-my-harness-solution-evaluator.toml',
];

const CALIBRATION_DEPENDENTS = [
  'agent/requirements-evaluator',
  'agent/plan-evaluator',
  'agent/solution-evaluator',
  'agent/result-evaluator',
  'agent/orchestration-reviewer',
  'calibration/adaptive-orchestration-acceptance-matrix',
  'template/orchestration-prompt',
  'template/plan-review',
  'template/result-qa',
  'template/task-packet',
];

export const TARGET_PROJECTION_SHA256 = 'b4d988390d4e214cd2d7887c800e3c5b7ba45d87edd7c7db147b7598fab15db5';
export const TARGET_REQUIRED_PROJECTION_SHA256 = 'a32fe9eff38a1d8dc7af91eba3e1c8068f4a5d9318f474d0a701516f56f59480';
const TARGET_KIND_COUNTS = {
  documentation: 12,
  'adapter-config': 1,
  example: 2,
  protocol: 3,
  template: 17,
  calibration: 2,
  'python-helper': 3,
  'agent-profile': 9,
};

const MANAGED_BLOCK = {
  sourceRouter: 'AGENTS.md',
  blockTemplate: 'packaging/managed-router-block.md',
  assetPath: '.oh-my-harness/managed-router-block.md',
  startMarker: '<!-- oh-my-harness:start -->',
  endMarker: '<!-- oh-my-harness:end -->',
};

function fail(message) {
  throw new Error(message);
}

export function assertExactKeys(value, expected, label) {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail(`${label} must be an object`);
  }
  const actual = Object.keys(value).sort();
  const wanted = [...expected].sort();
  if (JSON.stringify(actual) !== JSON.stringify(wanted)) {
    fail(`${label} must have exactly these keys: ${wanted.join(', ')}`);
  }
}

export function assertSafeRelativePath(value, label) {
  if (typeof value !== 'string' || value.length === 0) fail(`${label} must be a non-empty string`);
  if (value.includes('\\') || value.includes('\0') || path.posix.isAbsolute(value)) {
    fail(`${label} must be a safe relative POSIX path: ${value}`);
  }
  const normalized = path.posix.normalize(value);
  if (normalized !== value || value === '.' || value.split('/').includes('..')) {
    fail(`${label} must be a normalized relative path: ${value}`);
  }
}

export function validateJsonSchema(value, schema, location = '$') {
  const errors = [];
  const visit = (subject, rule, at) => {
    if (rule === false) {
      errors.push(`${at}: value is forbidden`);
      return;
    }
    if (!rule || typeof rule !== 'object' || Array.isArray(rule)) {
      errors.push(`${at}: malformed schema rule`);
      return;
    }
    if ('const' in rule && !isDeepStrictEqual(subject, rule.const)) errors.push(`${at}: constant mismatch`);
    if (rule.type === 'object') {
      if (subject === null || typeof subject !== 'object' || Array.isArray(subject)) {
        errors.push(`${at}: expected object`);
        return;
      }
      const required = rule.required ?? [];
      for (const key of required) if (!(key in subject)) errors.push(`${at}: missing required key ${key}`);
      const properties = rule.properties ?? {};
      for (const [key, child] of Object.entries(subject)) {
        if (key in properties) visit(child, properties[key], `${at}.${key}`);
        else if (rule.additionalProperties === false) errors.push(`${at}: unexpected key ${key}`);
      }
    } else if (rule.type === 'array') {
      if (!Array.isArray(subject)) {
        errors.push(`${at}: expected array`);
        return;
      }
      if (Number.isInteger(rule.minItems) && subject.length < rule.minItems) errors.push(`${at}: too few items`);
      if (Number.isInteger(rule.maxItems) && subject.length > rule.maxItems) errors.push(`${at}: too many items`);
      if (rule.uniqueItems && new Set(subject.map((item) => JSON.stringify(item))).size !== subject.length) {
        errors.push(`${at}: duplicate items`);
      }
      const prefix = rule.prefixItems ?? [];
      for (let index = 0; index < Math.min(prefix.length, subject.length); index += 1) {
        visit(subject[index], prefix[index], `${at}[${index}]`);
      }
      if (rule.items === false && subject.length > prefix.length) errors.push(`${at}: extra array items`);
      else if (rule.items && rule.items !== true) {
        for (let index = prefix.length; index < subject.length; index += 1) {
          visit(subject[index], rule.items, `${at}[${index}]`);
        }
      }
    } else if (rule.type === 'string') {
      if (typeof subject !== 'string') errors.push(`${at}: expected string`);
      else {
        if (Number.isInteger(rule.minLength) && subject.length < rule.minLength) errors.push(`${at}: string too short`);
        if (rule.pattern && !(new RegExp(rule.pattern).test(subject))) errors.push(`${at}: pattern mismatch`);
      }
    } else if (rule.type === 'integer' && !Number.isInteger(subject)) errors.push(`${at}: expected integer`);
    else if (rule.type === 'boolean' && typeof subject !== 'boolean') errors.push(`${at}: expected boolean`);
  };
  visit(value, schema, location);
  return errors;
}

function isDeepStrictEqual(left, right) {
  if (Object.is(left, right)) return true;
  if (typeof left !== typeof right || left === null || right === null) return false;
  if (Array.isArray(left) || Array.isArray(right)) {
    return Array.isArray(left) && Array.isArray(right)
      && left.length === right.length
      && left.every((item, index) => isDeepStrictEqual(item, right[index]));
  }
  if (typeof left !== 'object') return false;
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  return leftKeys.length === rightKeys.length
    && leftKeys.every((key) => Object.hasOwn(right, key) && isDeepStrictEqual(left[key], right[key]));
}

export function assertPackageContract(contract, schema) {
  if (schema?.$schema !== 'https://json-schema.org/draft/2020-12/schema') fail('package contract schema has an unsupported or missing $schema');
  const errors = validateJsonSchema(contract, schema, 'packageContract');
  if (errors.length) fail(`package contract schema validation failed: ${errors[0]}`);
  assertExactKeys(contract, [
    'schemaVersion', 'packageName', 'license', 'binaryName', 'binaryPath', 'nodeEngine',
    'lifecycleRuntime', 'helperRuntime', 'canonicalCommands', 'forbiddenCommandPatterns',
    'shorterScopedForm', 'packageFiles', 'excludedPackageContent',
  ], 'package contract');
  if (contract.schemaVersion !== 1 || contract.packageName !== PACKAGE_NAME
      || contract.license !== 'Apache-2.0'
      || contract.binaryName !== BINARY_NAME || contract.binaryPath !== 'bin/oh-my-harness.mjs'
      || contract.nodeEngine !== NODE_ENGINE) fail('package contract fixed identity mismatch');
  if (!contract.lifecycleRuntime.standardLibraryOnly
      || contract.lifecycleRuntime.thirdPartyRuntimeDependencies !== 0
      || contract.lifecycleRuntime.pythonRequired !== false) fail('package contract runtime boundary mismatch');
  if (!contract.helperRuntime.requiredPayload
      || !isDeepStrictEqual(contract.helperRuntime.requiredHelpers, EXACT_HELPERS)) fail('package contract helper payload mismatch');
  if (!isDeepStrictEqual(contract.forbiddenCommandPatterns, ['npx oh-my-harness', '--package=oh-my-harness'])) {
    fail('package contract forbidden command patterns mismatch');
  }
  for (const command of Object.values(contract.canonicalCommands)) {
    if (command.includes('npx oh-my-harness') || command.includes('--package=oh-my-harness')) {
      fail('package contract contains an unscoped installer command');
    }
  }
  const probes = [
    { ...contract, unexpected: true },
    { ...contract, packageName: 'oh-my-harness' },
    { ...contract, binaryName: 'other' },
    { ...contract, nodeEngine: '>=25' },
    { ...contract, helperRuntime: { ...contract.helperRuntime, unexpected: true } },
  ];
  if (probes.some((probe) => validateJsonSchema(probe, schema).length === 0)) {
    fail('package contract schema does not enforce its closed fixed shape');
  }
}

function bytewiseRewriteOrder(left, right) {
  return right.from.length - left.from.length || Buffer.from(left.from).compare(Buffer.from(right.from));
}

export function expectedRewrites(entries) {
  const exact = entries.map(({ source: from, destination: to }) => ({ from, to })).sort(bytewiseRewriteOrder);
  return [
    ...exact,
    ...GENERIC_REWRITES.map(([from, to]) => ({ from, to })),
    ...PROFILE_REWRITES.map(([from, to]) => ({ from, to })),
  ];
}

export function bundleProjection(entries, includeRequired = false) {
  return `${entries.map((entry) => [
    entry.source, entry.destination, entry.kind, ...(includeRequired ? [String(entry.required)] : []),
  ].join('\t')).join('\n')}\n`;
}

export function assertBundleMap(map) {
  assertExactKeys(map, ['schemaVersion', 'entries', 'rewrites', 'calibrationBinding', 'managedBlock'], 'bundle map');
  if (map.schemaVersion !== 1 || !Array.isArray(map.entries) || map.entries.length !== 49) {
    fail('bundle map must contain exactly 49 entries at schema version 1');
  }
  const ids = new Set();
  const sources = new Set();
  const destinations = new Set();
  for (const [index, entry] of map.entries.entries()) {
    assertExactKeys(entry, ['assetId', 'source', 'destination', 'kind', 'required', 'transform'], `bundle map entry ${index}`);
    for (const key of ['assetId', 'kind', 'transform']) {
      if (typeof entry[key] !== 'string' || entry[key].length === 0) fail(`bundle map entry ${index} has invalid ${key}`);
    }
    assertSafeRelativePath(entry.source, `bundle map entry ${index} source`);
    assertSafeRelativePath(entry.destination, `bundle map entry ${index} destination`);
    if (entry.required !== true) fail(`bundle map entry ${entry.assetId} must be required`);
    if (entry.transform !== 'reference-rewrite') fail(`bundle map entry ${entry.assetId} has an unsupported transform`);
    if (!entry.destination.startsWith('.oh-my-harness/') && !entry.destination.startsWith('.codex/agents/oh-my-harness-')) {
      fail(`bundle map entry ${entry.assetId} has an unsafe target namespace`);
    }
    if (entry.destination === '.codex/config.toml') fail('bundle map must not take over .codex/config.toml');
    if (ids.has(entry.assetId) || sources.has(entry.source) || destinations.has(entry.destination)) {
      fail(`bundle map has a duplicate asset, source, or destination at ${entry.assetId}`);
    }
    ids.add(entry.assetId);
    sources.add(entry.source);
    destinations.add(entry.destination);
  }
  const kindCounts = Object.fromEntries(Object.keys(TARGET_KIND_COUNTS).map((kind) => [
    kind, map.entries.filter((entry) => entry.kind === kind).length,
  ]));
  if (!isDeepStrictEqual(kindCounts, TARGET_KIND_COUNTS)) fail('bundle map kind membership mismatch');
  if (map.entries.some(({ assetId, source, destination }) => assetId === 'template/task-contract'
      || source.endsWith('/task-contract-template.md') || destination.endsWith('/task-contract-template.md'))) {
    fail('bundle map retains the obsolete task Contract template');
  }
  if (!isDeepStrictEqual([...destinations].filter((item) => item.startsWith('.codex/agents/')).sort(), EXACT_AGENT_PATHS)) {
    fail('bundle map must contain the nine exact prefixed agent destinations');
  }
  const projectionSha = createHash('sha256').update(bundleProjection(map.entries)).digest('hex');
  const requiredProjectionSha = createHash('sha256').update(bundleProjection(map.entries, true)).digest('hex');
  if (projectionSha !== TARGET_PROJECTION_SHA256 || requiredProjectionSha !== TARGET_REQUIRED_PROJECTION_SHA256) {
    fail('bundle map exact target projection mismatch');
  }
  const expected = expectedRewrites(map.entries);
  if (!isDeepStrictEqual(map.rewrites, expected)) fail('bundle map rewrite table is incomplete or out of contract order');
  const seenFrom = new Map();
  for (const rewrite of map.rewrites) {
    assertExactKeys(rewrite, ['from', 'to'], 'bundle map rewrite');
    if (!rewrite.from || typeof rewrite.from !== 'string' || typeof rewrite.to !== 'string') fail('bundle map rewrite must use non-empty strings');
    if (seenFrom.has(rewrite.from) && seenFrom.get(rewrite.from) !== rewrite.to) fail(`conflicting duplicate rewrite: ${rewrite.from}`);
    seenFrom.set(rewrite.from, rewrite.to);
  }
  assertExactKeys(map.calibrationBinding, ['sourcePath', 'destinationPath', 'dependentAssetIds'], 'calibration binding');
  if (map.calibrationBinding.sourcePath !== CALIBRATION_SOURCE
      || map.calibrationBinding.destinationPath !== CALIBRATION_DESTINATION
      || !isDeepStrictEqual(map.calibrationBinding.dependentAssetIds, CALIBRATION_DEPENDENTS)) {
    fail('bundle map calibration binding mismatch');
  }
  for (const id of CALIBRATION_DEPENDENTS) if (!ids.has(id)) fail(`missing calibration dependent: ${id}`);
  assertExactKeys(map.managedBlock, ['sourceRouter', 'blockTemplate', 'assetPath', 'startMarker', 'endMarker'], 'managed block map');
  if (!isDeepStrictEqual(map.managedBlock, MANAGED_BLOCK)) fail('managed block map mismatch');
}

export function assertInventory(inventory, schema) {
  if (schema?.$schema !== 'https://json-schema.org/draft/2020-12/schema') fail('bundle inventory schema has an unsupported or missing $schema');
  const errors = validateJsonSchema(inventory, schema, 'bundleInventory');
  if (errors.length) fail(`bundle inventory schema validation failed: ${errors[0]}`);
  const probes = [
    { ...inventory, unexpected: true },
    { ...inventory, optionalFiles: ['unexpected'] },
    { ...inventory, managedBlock: { ...inventory.managedBlock, sourcePath: 'other' } },
    { ...inventory, requiredFiles: inventory.requiredFiles.map((item, index) => index ? item : { ...item, unexpected: true }) },
  ];
  if (probes.some((probe) => validateJsonSchema(probe, schema).length === 0)) {
    fail('bundle inventory schema does not enforce its closed fixed shape');
  }
  const paths = inventory.requiredFiles.map((item) => item.destinationPath);
  if (paths.length !== 49) fail('bundle inventory must contain the exact 49 payloads');
  if (!isDeepStrictEqual(paths, [...paths].sort())) fail('bundle inventory required files must be destination-sorted');
  if (!isDeepStrictEqual(inventory.ownership.payloadPaths, paths)) fail('bundle inventory ownership payload paths mismatch');
  if (!isDeepStrictEqual(inventory.ownership.agentPaths, EXACT_AGENT_PATHS)) fail('bundle inventory agent paths mismatch');
  if (paths.some((item) => item.endsWith('/task-contract-template.md') || item.includes('/task-docs/cases/')
      || item.includes('/task-docs/history/'))) fail('bundle inventory contains a forbidden target surface');
  if (paths.includes('.oh-my-harness/bundle-inventory.json')) fail('bundle inventory must not hash itself');
  if (JSON.stringify(inventory.ownership).includes('install-state') || JSON.stringify(inventory.ownership).includes('backup')) {
    fail('bundle inventory must not claim mutable state or backup ownership');
  }
}

export const FIXED_AGENT_PATHS = EXACT_AGENT_PATHS;
