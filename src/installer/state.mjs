import { createHash } from 'node:crypto';
import {
  assertSafeRelativePath, byteCompare, canonicalBytes, canonicalPreimageBytes, LifecycleError, sha256,
} from './filesystem.mjs';
import { END_MARKER, START_MARKER } from './markers.mjs';

export const PACKAGE_NAME = '@guoxiaoshuai2023/oh-my-harness';
export const BINARY_NAME = 'oh-my-harness';
export const NODE_ENGINE = '>=24 <25';
export const STATE_PATH = '.oh-my-harness/install-state.json';
export const STATE_TEMP_PATH = '.oh-my-harness/.install-state.tmp';
export const SENTINEL_PATH = '.oh-my-harness/.operation-in-progress.json';
export const SENTINEL_TEMP_PATH = '.oh-my-harness/.operation-in-progress.tmp';
export const VERSION_PATTERN = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
export const SHA_PATTERN = /^[0-9a-f]{64}$/;
export const OPERATION_ID_PATTERN = /^[0-9a-f]{24}$/;
export const TIMESTAMP_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
export const AGENT_PATHS = [
  '.codex/agents/oh-my-harness-executor.toml',
  '.codex/agents/oh-my-harness-plan-evaluator.toml',
  '.codex/agents/oh-my-harness-planner.toml',
  '.codex/agents/oh-my-harness-result-evaluator.toml',
  '.codex/agents/oh-my-harness-solution-designer.toml',
  '.codex/agents/oh-my-harness-solution-evaluator.toml',
].sort(byteCompare);

function conflict(message, safePath = null, code = 'UNVERIFIABLE_INSTALL_STATE') {
  throw new LifecycleError(message, { code, exitCode: 4, safePath });
}

export function assertExactKeys(value, keys, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) conflict(`${label} must be an object`);
  const actual = Object.keys(value).sort();
  const expected = [...keys].sort();
  if (JSON.stringify(actual) !== JSON.stringify(expected)) conflict(`${label} has an incompatible shape`);
}

function assertVersion(value, label) {
  if (typeof value !== 'string' || !VERSION_PATTERN.test(value)) conflict(`${label} is not a compatible version`);
}

function assertSha(value, label) {
  if (typeof value !== 'string' || !SHA_PATTERN.test(value)) conflict(`${label} is not a SHA-256 value`);
}

function assertSortedUnique(items, comparator, label) {
  for (let index = 1; index < items.length; index += 1) {
    if (comparator(items[index - 1], items[index]) >= 0) conflict(`${label} is not sorted and unique`);
  }
}

export function targetIdentity(canonicalRoot) {
  return sha256(Buffer.from(canonicalRoot, 'utf8'));
}

export function operationId({ operation, targetIdentity: identity, invokerVersion, installedVersion, requestedVersion, managed }) {
  const preimage = {
    schemaVersion: 1,
    operation,
    targetIdentity: identity,
    invokerVersion,
    installedVersion,
    requestedVersion,
    managed: [...managed].sort((left, right) => byteCompare(left.path, right.path)
      || byteCompare(left.kind, right.kind)),
  };
  return createHash('sha256').update(canonicalPreimageBytes(preimage)).digest('hex').slice(0, 24);
}

export function validateInventory(inventory, { packageVersion = null } = {}) {
  assertExactKeys(inventory, [
    'schemaVersion', 'bundleVersion', 'packageName', 'binaryName', 'nodeEngine',
    'installerCompatibility', 'requiredFiles', 'optionalFiles', 'managedBlock',
    'ownership', 'referencePolicy',
  ], 'bundle inventory');
  if (inventory.schemaVersion !== 1 || inventory.packageName !== PACKAGE_NAME
      || inventory.binaryName !== BINARY_NAME || inventory.nodeEngine !== NODE_ENGINE) {
    conflict('bundle inventory identity is incompatible', '.oh-my-harness/bundle-inventory.json', 'INCOMPATIBLE_INSTALLATION');
  }
  assertVersion(inventory.bundleVersion, 'bundle version');
  if (packageVersion !== null && inventory.bundleVersion !== packageVersion) {
    conflict('package and bundle versions differ', '.oh-my-harness/bundle-inventory.json', 'INCOMPATIBLE_INSTALLATION');
  }
  assertExactKeys(inventory.installerCompatibility, ['packageName', 'binaryName', 'nodeEngine'], 'installer compatibility');
  if (inventory.installerCompatibility.packageName !== PACKAGE_NAME
      || inventory.installerCompatibility.binaryName !== BINARY_NAME
      || inventory.installerCompatibility.nodeEngine !== NODE_ENGINE) {
    conflict('installer compatibility identity is incompatible', '.oh-my-harness/bundle-inventory.json', 'INCOMPATIBLE_INSTALLATION');
  }
  if (!Array.isArray(inventory.requiredFiles) || !Array.isArray(inventory.optionalFiles)
      || inventory.optionalFiles.length !== 0 || inventory.requiredFiles.length === 0) {
    conflict('bundle inventory file list is incompatible');
  }
  const paths = [];
  for (const item of inventory.requiredFiles) {
    assertExactKeys(item, [
      'assetId', 'sourcePath', 'sourceSha256', 'destinationPath', 'destinationSha256',
      'required', 'kind', 'transformations',
    ], 'bundle inventory file');
    assertSafeRelativePath(item.destinationPath, 'inventory destination');
    if (!item.destinationPath.startsWith('.oh-my-harness/')
        && !item.destinationPath.startsWith('.codex/agents/oh-my-harness-')) {
      conflict('inventory destination is outside the owned namespaces', item.destinationPath, 'UNSAFE_PATH');
    }
    assertSha(item.destinationSha256, 'inventory destination hash');
    assertSha(item.sourceSha256, 'inventory source hash');
    if (item.required !== true || typeof item.assetId !== 'string' || !Array.isArray(item.transformations)) {
      conflict('bundle inventory file is incompatible', item.destinationPath);
    }
    paths.push(item.destinationPath);
  }
  assertSortedUnique(paths, byteCompare, 'bundle inventory paths');
  assertExactKeys(inventory.managedBlock, [
    'sourcePath', 'sourceSha256', 'assetPath', 'sha256', 'startMarker', 'endMarker',
  ], 'managed block inventory');
  assertSafeRelativePath(inventory.managedBlock.assetPath, 'managed block asset path');
  assertSha(inventory.managedBlock.sha256, 'managed block hash');
  if (inventory.managedBlock.startMarker !== START_MARKER.toString()
      || inventory.managedBlock.endMarker !== END_MARKER.toString()) {
    conflict('managed marker identity is incompatible', 'AGENTS.md', 'INCOMPATIBLE_INSTALLATION');
  }
  assertExactKeys(inventory.ownership, ['payloadPaths', 'agentPaths', 'managedBlockId'], 'inventory ownership');
  if (JSON.stringify(inventory.ownership.payloadPaths) !== JSON.stringify(paths)
      || JSON.stringify(inventory.ownership.agentPaths) !== JSON.stringify(AGENT_PATHS)
      || inventory.ownership.managedBlockId !== 'oh-my-harness') {
    conflict('bundle inventory ownership is inconsistent');
  }
  assertExactKeys(inventory.referencePolicy, ['runtimeSourcePathsForbidden', 'provenanceSourcePathsAllowed'], 'reference policy');
  if (!inventory.referencePolicy.runtimeSourcePathsForbidden || !inventory.referencePolicy.provenanceSourcePathsAllowed) {
    conflict('bundle inventory reference policy is incompatible');
  }
  return inventory;
}

export function releaseOwnedFiles(inventory, inventoryBytes = canonicalBytes(inventory)) {
  const files = inventory.requiredFiles.map((item) => ({
    path: item.destinationPath, sha256: item.destinationSha256,
    kind: item.destinationPath.endsWith('/bundle-inventory.json') ? 'inventory' : 'payload',
  }));
  files.push({ path: inventory.managedBlock.assetPath, sha256: inventory.managedBlock.sha256, kind: 'payload' });
  files.push({ path: '.oh-my-harness/bundle-inventory.json', sha256: sha256(inventoryBytes), kind: 'inventory' });
  return files.sort((left, right) => byteCompare(left.path, right.path));
}

export function reconcileInstallStateInventory(state, inventory, inventoryBytes) {
  const released = releaseOwnedFiles(inventory, inventoryBytes);
  const ownershipMatches = state.ownedFiles.length === released.length
    && state.ownedFiles.every((item, index) => item.path === released[index].path
      && item.kind === released[index].kind && item.sha256 === released[index].sha256);
  if (!ownershipMatches || state.agentsMd.blockSha256 !== inventory.managedBlock.sha256) {
    conflict('install state ownership disagrees with the installed inventory', STATE_PATH);
  }
}

export function parseInstallState(bytes, { canonicalRoot, requireSurfacePaths = true } = {}) {
  let state;
  try {
    state = JSON.parse(Buffer.from(bytes).toString('utf8'));
  } catch {
    conflict('install state is not valid JSON', STATE_PATH);
  }
  if (!canonicalBytes(state).equals(Buffer.from(bytes))) conflict('install state is not canonical', STATE_PATH);
  assertExactKeys(state, [
    'schemaVersion', 'installedVersion', 'bundleVersion', 'installer', 'target', 'operation',
    'ownedFiles', 'agents', 'agentsMd', 'verification', 'backups',
  ], 'install state');
  if (state.schemaVersion !== 1) conflict('install state schema is incompatible', STATE_PATH, 'INCOMPATIBLE_INSTALLATION');
  assertVersion(state.installedVersion, 'installed version');
  if (state.bundleVersion !== state.installedVersion) conflict('bundle and installed versions differ', STATE_PATH);
  assertExactKeys(state.installer, ['packageName', 'binaryName', 'version', 'nodeEngine'], 'state installer');
  if (state.installer.packageName !== PACKAGE_NAME || state.installer.binaryName !== BINARY_NAME
      || state.installer.version !== state.installedVersion || state.installer.nodeEngine !== NODE_ENGINE) {
    conflict('state installer identity is incompatible', STATE_PATH, 'INCOMPATIBLE_INSTALLATION');
  }
  assertExactKeys(state.target, ['kind', 'value'], 'state target');
  assertSha(state.target.value, 'state target identity');
  if (state.target.kind !== 'canonical-root-sha256') conflict('state target identity type is incompatible', STATE_PATH);
  if (canonicalRoot && state.target.value !== targetIdentity(canonicalRoot)) conflict('install state belongs to a different target', STATE_PATH);
  assertExactKeys(state.operation, ['id', 'type', 'timestamp', 'priorVersion'], 'state operation');
  if (!OPERATION_ID_PATTERN.test(state.operation.id) || !['install', 'update'].includes(state.operation.type)
      || !TIMESTAMP_PATTERN.test(state.operation.timestamp)) conflict('state operation metadata is invalid', STATE_PATH);
  if (state.operation.type === 'install' ? state.operation.priorVersion !== null : typeof state.operation.priorVersion !== 'string') {
    conflict('state prior version is invalid', STATE_PATH);
  }
  if (state.operation.priorVersion !== null) assertVersion(state.operation.priorVersion, 'prior version');
  if (!Array.isArray(state.ownedFiles) || !Array.isArray(state.agents) || !Array.isArray(state.backups)) {
    conflict('state ownership arrays are invalid', STATE_PATH);
  }
  for (const file of state.ownedFiles) {
    assertExactKeys(file, ['path', 'sha256', 'kind'], 'owned file');
    assertSafeRelativePath(file.path, 'owned file path');
    if (file.path === STATE_PATH || (!file.path.startsWith('.oh-my-harness/') && !AGENT_PATHS.includes(file.path))
        || !['payload', 'inventory'].includes(file.kind)) conflict('state has impossible ownership', file.path);
    if ((file.path === '.oh-my-harness/bundle-inventory.json') !== (file.kind === 'inventory')) {
      conflict('state ownership kind is inconsistent', file.path);
    }
    assertSha(file.sha256, 'owned file hash');
  }
  assertSortedUnique(state.ownedFiles, (left, right) => byteCompare(left.path, right.path), 'owned files');
  const ownedByPath = new Map(state.ownedFiles.map((item) => [item.path, item]));
  for (const agent of state.agents) {
    assertExactKeys(agent, ['path', 'sha256'], 'agent ownership');
    assertSafeRelativePath(agent.path, 'agent path');
    assertSha(agent.sha256, 'agent hash');
    if (ownedByPath.get(agent.path)?.sha256 !== agent.sha256) conflict('agent ownership disagrees with owned files', agent.path);
  }
  if (JSON.stringify(state.agents.map((item) => item.path)) !== JSON.stringify(AGENT_PATHS)) {
    conflict('state does not own the exact six agent profiles', STATE_PATH);
  }
  assertExactKeys(state.agentsMd, ['mode', 'blockSha256'], 'AGENTS.md state');
  if (!['created-file', 'managed-block'].includes(state.agentsMd.mode)) conflict('AGENTS.md ownership mode is invalid', 'AGENTS.md');
  assertSha(state.agentsMd.blockSha256, 'managed block hash');
  assertExactKeys(state.verification, ['status', 'timestamp'], 'state verification');
  if (state.verification.status !== 'verified' || !TIMESTAMP_PATTERN.test(state.verification.timestamp)
      || state.verification.timestamp < state.operation.timestamp) conflict('state verification metadata is invalid', STATE_PATH);
  for (const backup of state.backups) {
    assertExactKeys(backup, ['path', 'sourcePath', 'sha256', 'operationId'], 'backup record');
    assertSafeRelativePath(backup.path, 'backup path');
    if (!backup.path.startsWith(`.oh-my-harness-backups/${backup.operationId}/`)
        || !OPERATION_ID_PATTERN.test(backup.operationId) || backup.operationId !== state.operation.id) {
      conflict('backup record path is invalid', backup.path);
    }
    if (backup.sourcePath !== 'AGENTS.md#managed-block') assertSafeRelativePath(backup.sourcePath, 'backup source path');
    const backupSuffix = backup.sourcePath === 'AGENTS.md#managed-block' ? 'AGENTS.md.managed-block' : backup.sourcePath;
    if (backup.path !== `.oh-my-harness-backups/${backup.operationId}/${backupSuffix}`
        || (backup.sourcePath !== 'AGENTS.md#managed-block' && !ownedByPath.has(backup.sourcePath))) {
      conflict('backup record does not match managed ownership', backup.path);
    }
    assertSha(backup.sha256, 'backup hash');
  }
  assertSortedUnique(state.backups, (left, right) => byteCompare(left.path, right.path)
    || byteCompare(left.sourcePath, right.sourcePath), 'backup records');
  if (requireSurfacePaths && (!ownedByPath.has('.oh-my-harness/bundle-inventory.json')
      || !ownedByPath.has('.oh-my-harness/managed-router-block.md'))) {
    conflict('state ownership surface is incomplete', STATE_PATH);
  }
  return state;
}

export function buildInstallState({
  inventory, inventoryBytes, canonicalRoot, operation, operationId: id, priorVersion, agentsMode,
  timestamp, verificationTimestamp, backups,
}) {
  const ownedFiles = releaseOwnedFiles(inventory, inventoryBytes);
  const agents = AGENT_PATHS.map((agentPath) => ({ path: agentPath, sha256: ownedFiles.find((item) => item.path === agentPath).sha256 }));
  return {
    schemaVersion: 1,
    installedVersion: inventory.bundleVersion,
    bundleVersion: inventory.bundleVersion,
    installer: {
      packageName: PACKAGE_NAME, binaryName: BINARY_NAME,
      version: inventory.bundleVersion, nodeEngine: NODE_ENGINE,
    },
    target: { kind: 'canonical-root-sha256', value: targetIdentity(canonicalRoot) },
    operation: { id, type: operation, timestamp, priorVersion },
    ownedFiles,
    agents,
    agentsMd: { mode: agentsMode, blockSha256: inventory.managedBlock.sha256 },
    verification: { status: 'verified', timestamp: verificationTimestamp },
    backups: [...backups].sort((left, right) => byteCompare(left.path, right.path)
      || byteCompare(left.sourcePath, right.sourcePath)),
  };
}

export function sentinelDocument({ operationId: id, operation, targetIdentity: identity, priorStateSha256, requestedVersion, planSha256 }) {
  return { schemaVersion: 1, operationId: id, operation, targetIdentity: identity, priorStateSha256, requestedVersion, planSha256 };
}
