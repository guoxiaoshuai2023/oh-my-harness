import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  lstat, mkdir, mkdtemp, readFile, realpath, rm, symlink, unlink, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const INVENTORY_PATH = '.oh-my-harness/bundle-inventory.json';
const CALIBRATION_SOURCE = 'task-docs/_harness/evaluator-calibration.md';
const EXPECTED_KINDS = Object.freeze({
  documentation: 12,
  'adapter-config': 1,
  example: 2,
  protocol: 3,
  template: 17,
  calibration: 2,
  'python-helper': 3,
  'agent-profile': 9,
});

export class PhysicalReleaseError extends Error {
  constructor(code, message) {
    super(`${code}: ${message}`);
    this.name = 'PhysicalReleaseError';
    this.code = code;
  }
}

function fail(code, message) {
  throw new PhysicalReleaseError(code, message);
}

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function plainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    && Object.getPrototypeOf(value) === Object.prototype;
}

function deepFreeze(value) {
  if (value && typeof value === 'object' && !Object.isFrozen(value)) {
    for (const item of Object.values(value)) deepFreeze(item);
    Object.freeze(value);
  }
  return value;
}

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (plainObject(value)) return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function contained(parent, child) {
  return child === parent || child.startsWith(`${parent}${path.sep}`);
}

async function currentRepositoryRoots() {
  const worktree = await realpath(ROOT);
  const dotGit = await readFile(path.join(worktree, '.git'), 'utf8');
  const match = dotGit.match(/^gitdir:\s*(.+)\s*$/);
  if (!match) fail('PHYSICAL_REPOSITORY_IDENTITY', 'linked-worktree .git identity is unavailable');
  const gitDirectory = path.resolve(worktree, match[1]);
  const canonicalRoot = await realpath(path.dirname(path.dirname(path.dirname(gitDirectory))));
  return Object.freeze([worktree, canonicalRoot]);
}

export async function repositoryRootsForPhysicalTests() {
  return currentRepositoryRoots();
}

async function safeFile(root, relativePath) {
  if (typeof relativePath !== 'string' || !relativePath || relativePath.includes('\\') || path.posix.isAbsolute(relativePath)
      || path.posix.normalize(relativePath) !== relativePath || relativePath.split('/').includes('..')) {
    fail('PHYSICAL_PATH_UNSAFE', String(relativePath));
  }
  let cursor = root;
  for (const segment of relativePath.split('/')) {
    cursor = path.join(cursor, segment);
    let info;
    try { info = await lstat(cursor); } catch (error) { fail('PHYSICAL_PATH_MISSING', `${relativePath}: ${error.code ?? error.message}`); }
    if (info.isSymbolicLink()) fail('PHYSICAL_PATH_SYMLINK', relativePath);
  }
  const actual = await realpath(cursor);
  if (!contained(root, actual)) fail('PHYSICAL_PATH_ESCAPE', relativePath);
  const info = await lstat(actual);
  if (!info.isFile()) fail('PHYSICAL_PATH_NOT_FILE', relativePath);
  return { actual, bytes: await readFile(actual) };
}

function validateInventory(inventory) {
  if (!plainObject(inventory) || inventory.schemaVersion !== 1 || !Array.isArray(inventory.requiredFiles)
      || inventory.requiredFiles.length !== 49 || !Array.isArray(inventory.optionalFiles) || inventory.optionalFiles.length !== 0) {
    fail('PHYSICAL_INVENTORY_SHAPE', 'inventory is not the exact 49-payload release');
  }
  const ids = new Set();
  const sources = new Set();
  const destinations = new Set();
  const kinds = {};
  for (const entry of inventory.requiredFiles) {
    if (!plainObject(entry) || entry.required !== true || typeof entry.assetId !== 'string'
        || typeof entry.sourcePath !== 'string' || typeof entry.destinationPath !== 'string'
        || !/^[0-9a-f]{64}$/.test(entry.destinationSha256 ?? '')) {
      fail('PHYSICAL_INVENTORY_ENTRY', 'malformed required-file entry');
    }
    if (ids.has(entry.assetId) || sources.has(entry.sourcePath) || destinations.has(entry.destinationPath)) {
      fail('PHYSICAL_INVENTORY_DUPLICATE', entry.assetId);
    }
    ids.add(entry.assetId);
    sources.add(entry.sourcePath);
    destinations.add(entry.destinationPath);
    kinds[entry.kind] = (kinds[entry.kind] ?? 0) + 1;
  }
  if (canonical(kinds) !== canonical(EXPECTED_KINDS)) fail('PHYSICAL_INVENTORY_KINDS', canonical(kinds));
  const payloadPaths = inventory.requiredFiles.map(({ destinationPath }) => destinationPath);
  if (canonical(inventory.ownership?.payloadPaths) !== canonical(payloadPaths)
      || inventory.ownership?.agentPaths?.length !== 9) fail('PHYSICAL_INVENTORY_OWNERSHIP', 'payload/agent ownership mismatch');
  for (const forbidden of ['template/task-contract']) if (ids.has(forbidden)) fail('PHYSICAL_INVENTORY_FORBIDDEN', forbidden);
  return inventory;
}

function readOnlyIndex(map) {
  return Object.freeze({
    get: (key) => map.get(key),
    has: (key) => map.has(key),
    values: () => Object.freeze([...map.values()]),
  });
}

function serialize(value) {
  return Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
}

function exactEntry(inventory, assetId) {
  const matches = inventory.requiredFiles.filter((entry) => entry.assetId === assetId);
  if (matches.length !== 1) fail('PHYSICAL_MUTATION_TARGET', `${assetId}: expected exactly one inventory entry, found ${matches.length}`);
  return matches[0];
}

function replaceExactlyOnce(content, from, to, label) {
  if (typeof from !== 'string' || !from || typeof to !== 'string' || from === to) {
    fail('PHYSICAL_MUTATION_REPLACEMENT', `${label}: replacement must use distinct nonempty strings`);
  }
  const matches = content.split(from).length - 1;
  if (matches !== 1) fail('PHYSICAL_MUTATION_REPLACEMENT', `${label}: expected one replacement target, found ${matches}`);
  return content.replace(from, to);
}

async function writeContained(root, relativePath, bytes, { exclusive = false } = {}) {
  if (typeof relativePath !== 'string' || !relativePath || relativePath.includes('\\') || path.posix.isAbsolute(relativePath)
      || path.posix.normalize(relativePath) !== relativePath || relativePath.split('/').includes('..')) {
    fail('PHYSICAL_MUTATION_PATH', String(relativePath));
  }
  const absolute = path.join(root, ...relativePath.split('/'));
  if (!contained(root, absolute)) fail('PHYSICAL_MUTATION_PATH', relativePath);
  await mkdir(path.dirname(absolute), { recursive: true });
  await writeFile(absolute, bytes, exclusive ? { flag: 'wx' } : undefined);
  return absolute;
}

export async function copyPhysicalReleaseForMutation({ physicalRelease, forbiddenRoots, mutationId } = {}) {
  if (!physicalRelease?.inventoryDocument || typeof physicalRelease.readDestination !== 'function') {
    fail('PHYSICAL_MUTATION_SOURCE_REQUIRED', 'an opened physical release is mandatory');
  }
  if (!Array.isArray(forbiddenRoots) || canonical(forbiddenRoots) !== canonical(physicalRelease.forbiddenRoots)) {
    fail('PHYSICAL_MUTATION_FORBIDDEN_ROOTS', 'forbidden roots must exactly match the opened physical release');
  }
  if (typeof mutationId !== 'string' || !/^[a-z0-9][a-z0-9-]{2,63}$/.test(mutationId)) {
    fail('PHYSICAL_MUTATION_ID', String(mutationId));
  }
  const parentRoot = await mkdtemp(path.join(os.tmpdir(), `oh-my-harness-t04-${mutationId}-`));
  const parentReal = await realpath(parentRoot);
  const temporaryRoot = await realpath(os.tmpdir());
  if (!contained(temporaryRoot, parentReal) || parentReal === temporaryRoot) fail('PHYSICAL_MUTATION_ROOT', parentReal);
  const releaseRoot = path.join(parentReal, 'release');
  await mkdir(releaseRoot);
  const inventory = JSON.parse(physicalRelease.inventoryBytes);
  const copyReads = [];
  try {
    for (const entry of inventory.requiredFiles) {
      const observed = await physicalRelease.readDestination(entry.assetId);
      await writeContained(releaseRoot, entry.destinationPath, observed.bytes, { exclusive: true });
      copyReads.push(Object.freeze({
        assetId: entry.assetId,
        sourceReleaseRoot: physicalRelease.releaseRoot,
        sourceActualRealpath: observed.actualRealpath,
        copiedDestinationPath: entry.destinationPath,
        copiedSha256: observed.hash,
      }));
    }
    const managed = await safeFile(physicalRelease.releaseRoot, inventory.managedBlock.assetPath);
    if (sha256(managed.bytes) !== inventory.managedBlock.sha256) fail('PHYSICAL_MUTATION_MANAGED_HASH', inventory.managedBlock.assetPath);
    await writeContained(releaseRoot, inventory.managedBlock.assetPath, managed.bytes, { exclusive: true });
    copyReads.push(Object.freeze({
      assetId: 'generated/managed-router', sourceReleaseRoot: physicalRelease.releaseRoot,
      sourceActualRealpath: managed.actual, copiedDestinationPath: inventory.managedBlock.assetPath,
      copiedSha256: sha256(managed.bytes),
    }));
    await writeContained(releaseRoot, INVENTORY_PATH, physicalRelease.inventoryBytes, { exclusive: true });
    copyReads.push(Object.freeze({
      assetId: 'generated/bundle-inventory', sourceReleaseRoot: physicalRelease.releaseRoot,
      sourceActualRealpath: path.join(physicalRelease.releaseRoot, INVENTORY_PATH),
      copiedDestinationPath: INVENTORY_PATH, copiedSha256: physicalRelease.inventorySha256,
    }));
  } catch (error) {
    await rm(parentReal, { recursive: true, force: true });
    throw error;
  }

  let inventoryBytes = Buffer.from(physicalRelease.inventoryBytes);
  let inventorySha256 = sha256(inventoryBytes);
  let cleaned = false;
  const writeInventory = async () => {
    inventoryBytes = serialize(inventory);
    inventorySha256 = sha256(inventoryBytes);
    await writeContained(releaseRoot, INVENTORY_PATH, inventoryBytes);
  };
  const mutateDestinationBytes = async (assetId, bytes, updateInventoryHash) => {
    const entry = exactEntry(inventory, assetId);
    await writeContained(releaseRoot, entry.destinationPath, bytes);
    if (updateInventoryHash) {
      entry.destinationSha256 = sha256(bytes);
      await writeInventory();
    }
    return Object.freeze({ assetId, destinationPath: entry.destinationPath, sha256: sha256(bytes), inventorySha256 });
  };

  const fixture = {
    mutationId,
    parentRoot: parentReal,
    releaseRoot,
    sourceReleaseRoot: physicalRelease.releaseRoot,
    forbiddenRoots: physicalRelease.forbiddenRoots,
    sourceInventorySha256: physicalRelease.inventorySha256,
    copyLedger() { return Object.freeze(copyReads.map((entry) => ({ ...entry }))); },
    currentInventorySha256() { return inventorySha256; },
    open(extra = {}) {
      return openPhysicalRelease({
        ...extra, releaseRoot, forbiddenRoots: physicalRelease.forbiddenRoots,
        expectedInventorySha256: inventorySha256,
      });
    },
    async omitAsset(assetId) {
      const entry = exactEntry(inventory, assetId);
      await unlink(path.join(releaseRoot, ...entry.destinationPath.split('/')));
      return Object.freeze({ assetId, destinationPath: entry.destinationPath });
    },
    async corruptAsset(assetId) {
      const entry = exactEntry(inventory, assetId);
      const observed = await safeFile(releaseRoot, entry.destinationPath);
      return mutateDestinationBytes(assetId, Buffer.concat([observed.bytes, Buffer.from('\nT04_CORRUPTION\n')]), false);
    },
    async replaceText(assetId, { from, to, updateInventoryHash = true } = {}) {
      const entry = exactEntry(inventory, assetId);
      const observed = await safeFile(releaseRoot, entry.destinationPath);
      const changed = Buffer.from(replaceExactlyOnce(observed.bytes.toString('utf8'), from, to, assetId));
      return mutateDestinationBytes(assetId, changed, updateInventoryHash);
    },
    async mutateRecord(assetId, recordId, transform) {
      if (typeof recordId !== 'string' || !recordId || typeof transform !== 'function') {
        fail('PHYSICAL_MUTATION_RECORD', `${assetId}: exact record ID and transform are mandatory`);
      }
      const entry = exactEntry(inventory, assetId);
      const observed = await safeFile(releaseRoot, entry.destinationPath);
      const lines = observed.bytes.toString('utf8').split('\n');
      const matches = [];
      for (const [index, line] of lines.entries()) {
        if (!line.startsWith('{')) continue;
        let record;
        try { record = JSON.parse(line); } catch { continue; }
        if (record?.id === recordId) matches.push({ index, record });
      }
      if (matches.length !== 1) fail('PHYSICAL_MUTATION_RECORD', `${recordId}: expected one record, found ${matches.length}`);
      const changed = transform(JSON.parse(JSON.stringify(matches[0].record)));
      if (!plainObject(changed) || changed.id !== recordId) fail('PHYSICAL_MUTATION_RECORD', `${recordId}: transform changed record identity or shape`);
      lines[matches[0].index] = JSON.stringify(changed);
      return mutateDestinationBytes(assetId, Buffer.from(lines.join('\n')), true);
    },
    async mutateInventoryEntry(assetId, transform, { synchronizeOwnership = false } = {}) {
      if (typeof transform !== 'function') fail('PHYSICAL_MUTATION_INVENTORY', `${assetId}: transform is mandatory`);
      const entry = exactEntry(inventory, assetId);
      const before = JSON.parse(JSON.stringify(entry));
      const changed = transform(JSON.parse(JSON.stringify(entry)));
      if (!plainObject(changed) || changed.assetId !== assetId) fail('PHYSICAL_MUTATION_INVENTORY', `${assetId}: transform changed entry identity or shape`);
      Object.keys(entry).forEach((key) => delete entry[key]);
      Object.assign(entry, changed);
      if (synchronizeOwnership && changed.destinationPath !== before.destinationPath) {
        const payloadMatches = inventory.ownership.payloadPaths
          .map((item, index) => ({ item, index })).filter(({ item }) => item === before.destinationPath);
        if (payloadMatches.length !== 1) fail('PHYSICAL_MUTATION_INVENTORY', `${assetId}: payload ownership target is not singular`);
        inventory.ownership.payloadPaths[payloadMatches[0].index] = changed.destinationPath;
        const agentMatches = inventory.ownership.agentPaths
          .map((item, index) => ({ item, index })).filter(({ item }) => item === before.destinationPath);
        if (agentMatches.length > 1) fail('PHYSICAL_MUTATION_INVENTORY', `${assetId}: agent ownership target is not singular`);
        if (agentMatches.length === 1) inventory.ownership.agentPaths[agentMatches[0].index] = changed.destinationPath;
      }
      await writeInventory();
      return Object.freeze({ assetId, before, after: JSON.parse(JSON.stringify(entry)), inventorySha256 });
    },
    async createRootSymlink() {
      const linkPath = path.join(parentReal, 'release-link');
      await symlink(releaseRoot, linkPath, 'dir');
      return linkPath;
    },
    async cleanup() {
      if (cleaned) fail('PHYSICAL_MUTATION_CLEANUP', `${mutationId}: cleanup already completed`);
      const actual = await realpath(parentReal);
      if (actual !== parentReal || !contained(temporaryRoot, actual) || actual === temporaryRoot) {
        fail('PHYSICAL_MUTATION_CLEANUP', `${mutationId}: temporary ownership changed`);
      }
      await rm(actual, { recursive: true, force: false });
      cleaned = true;
    },
  };
  return Object.freeze(fixture);
}

export async function openPhysicalRelease({ releaseRoot, forbiddenRoots, expectedInventorySha256 } = {}) {
  if (typeof releaseRoot !== 'string' || !releaseRoot) fail('PHYSICAL_ROOT_REQUIRED', 'releaseRoot is mandatory');
  if (!Array.isArray(forbiddenRoots) || forbiddenRoots.length === 0) fail('PHYSICAL_FORBIDDEN_ROOTS_REQUIRED', 'forbiddenRoots are mandatory');
  if (!/^[0-9a-f]{64}$/.test(expectedInventorySha256 ?? '')) fail('PHYSICAL_INVENTORY_HASH_REQUIRED', 'expectedInventorySha256 is mandatory');
  const requested = path.resolve(releaseRoot);
  const requestedInfo = await lstat(requested).catch((error) => fail('PHYSICAL_ROOT_INVALID', error.code ?? error.message));
  if (requestedInfo.isSymbolicLink()) fail('PHYSICAL_ROOT_SYMLINK', requested);
  if (!requestedInfo.isDirectory()) fail('PHYSICAL_ROOT_NOT_DIRECTORY', requested);
  const physicalRoot = await realpath(requested);
  const temporaryRoot = await realpath(os.tmpdir());
  if (!contained(temporaryRoot, physicalRoot) || physicalRoot === temporaryRoot) fail('PHYSICAL_ROOT_NOT_OWNED_TEMP', physicalRoot);

  const forbidden = Object.freeze(await Promise.all(forbiddenRoots.map(async (item) => realpath(path.resolve(item)))));
  const requiredRepositories = await currentRepositoryRoots();
  for (const repository of requiredRepositories) {
    if (!forbidden.includes(repository)) fail('PHYSICAL_FORBIDDEN_ROOT_INCOMPLETE', repository);
  }
  for (const item of forbidden) {
    if (contained(item, physicalRoot) || contained(physicalRoot, item)) fail('PHYSICAL_ROOT_OVERLAP', item);
  }

  const inventoryRead = await safeFile(physicalRoot, INVENTORY_PATH);
  const inventorySha256 = sha256(inventoryRead.bytes);
  if (inventorySha256 !== expectedInventorySha256) fail('PHYSICAL_INVENTORY_HASH', inventorySha256);
  let inventoryDocument;
  try { inventoryDocument = validateInventory(JSON.parse(inventoryRead.bytes)); } catch (error) {
    if (error instanceof PhysicalReleaseError) throw error;
    fail('PHYSICAL_INVENTORY_JSON', error.message);
  }
  deepFreeze(inventoryDocument);
  const byAssetId = new Map(inventoryDocument.requiredFiles.map((entry) => [entry.assetId, entry]));
  const bySourcePath = new Map(inventoryDocument.requiredFiles.map((entry) => [entry.sourcePath, entry]));
  const byDestinationPath = new Map(inventoryDocument.requiredFiles.map((entry) => [entry.destinationPath, entry]));
  const internalReads = [{
    assetId: 'generated/bundle-inventory', sourcePath: null, destinationPath: INVENTORY_PATH,
    requestedPath: path.join(physicalRoot, INVENTORY_PATH), actualRealpath: inventoryRead.actual,
    byteCount: inventoryRead.bytes.length, observedSha256: inventorySha256,
  }];

  const handle = {
    releaseRoot: physicalRoot,
    forbiddenRoots: forbidden,
    inventoryPath: INVENTORY_PATH,
    inventorySha256,
    inventoryBytes: Buffer.from(inventoryRead.bytes),
    inventoryDocument,
    byAssetId: readOnlyIndex(byAssetId),
    bySourcePath: readOnlyIndex(bySourcePath),
    byDestinationPath: readOnlyIndex(byDestinationPath),
    async readDestination(entryOrId) {
      const entry = typeof entryOrId === 'string' ? byAssetId.get(entryOrId) : entryOrId;
      if (!entry || byAssetId.get(entry.assetId) !== entry) fail('PHYSICAL_ENTRY_UNBOUND', String(entryOrId));
      const observed = await safeFile(physicalRoot, entry.destinationPath);
      const observedSha256 = sha256(observed.bytes);
      if (observedSha256 !== entry.destinationSha256) fail('PHYSICAL_DESTINATION_HASH', entry.destinationPath);
      internalReads.push({
        assetId: entry.assetId, sourcePath: entry.sourcePath, destinationPath: entry.destinationPath,
        requestedPath: path.join(physicalRoot, entry.destinationPath), actualRealpath: observed.actual,
        byteCount: observed.bytes.length, observedSha256,
      });
      return Object.freeze({
        entry, bytes: Buffer.from(observed.bytes), text: observed.bytes.toString('utf8'),
        hash: observedSha256, actualRealpath: observed.actual,
      });
    },
    readLedger() { return deepFreeze(internalReads.map((item) => ({ ...item }))); },
  };
  return Object.freeze(handle);
}

export function evaluateInstalledCapabilityContract(observedRegistry, frozenOracle) {
  assert.ok(Array.isArray(observedRegistry) && plainObject(frozenOracle), 'physical registry and Frozen oracle are required');
  const expected = new Map(frozenOracle.capabilities.map((item) => [item.id, item]));
  if (observedRegistry.length !== expected.size) return Object.freeze({ compliant: false, code: 'PROFILE_SET_STOP' });
  for (const observed of observedRegistry) {
    const wanted = expected.get(observed.id);
    if (!wanted || observed.name !== wanted.name) return Object.freeze({ compliant: false, code: 'PROFILE_IDENTITY_STOP', capability: observed.id });
    if (observed.mission !== wanted.mission) return Object.freeze({ compliant: false, code: 'PROFILE_MISSION_STOP', capability: observed.id });
    if (observed.controls?.hardNoFanOut !== true) return Object.freeze({ compliant: false, code: 'PROFILE_MODAL_FORCE_STOP', capability: observed.id });
    if (frozenOracle.reportCapable.includes(observed.id)) {
      if (!observed.controls.reportOnly) return Object.freeze({ compliant: false, code: 'PROFILE_REPORT_AUTHORITY_STOP', capability: observed.id });
      if (!observed.controls.strictVerdict || !observed.controls.primaryEvidence) return Object.freeze({ compliant: false, code: 'PROFILE_REVIEW_DUTY_STOP', capability: observed.id });
      if (!observed.calibration?.bound) return Object.freeze({ compliant: false, code: 'CALIBRATION_BINDING_STOP', capability: observed.id });
    }
    if (observed.id.startsWith('solution-') && observed.controls.solutionTechnicalDesignOnly !== true) {
      return Object.freeze({ compliant: false, code: 'SOLUTION_SCOPE_STOP', capability: observed.id });
    }
  }
  return Object.freeze({ compliant: true, code: 'INSTALLED_CAPABILITY_CONTRACT_CLOSED' });
}
