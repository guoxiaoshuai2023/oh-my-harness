import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const WORK_TRUTH_PATHS = Object.freeze([
  'task-docs/_harness/adaptive-orchestration-protocol.md',
  'task-docs/_harness/run-directory-protocol.md',
  'task-docs/_harness/semantic-fidelity-protocol.md',
  'task-docs/_harness/templates/context-handoff-template.md',
  'task-docs/_harness/templates/task-board-template.md',
  'task-docs/_harness/templates/plan-template.md',
  'task-docs/_harness/templates/plan-review-template.md',
  'task-docs/_harness/templates/task-packet-template.md',
  'task-docs/_harness/templates/orchestration-prompt-template.md',
  'task-docs/_harness/templates/result-qa-template.md',
]);

export const REQUIRED_DOMAINS = Object.freeze([
  'acceptance-proxy',
  'central-case-custody',
  'compaction',
  'conflict-error-precedence',
  'contract-manifest',
  'interface:context',
  'interface:orchestration',
  'interface:plan',
  'interface:plan-review',
  'interface:result-qa',
  'interface:task-board',
  'interface:task-packet',
  'learning-change-route',
  'ownership',
  'persistence',
  'readiness-unlock',
  'retry-control',
  'retry-storage',
  'run-learning-artifact',
  'run-learning-candidate',
  'run-learning-end',
  'run-learning-evidence',
  'run-learning-retrospective',
  'run-learning-review',
  'run-learning-root-cause',
  'run-learning-scan',
  'run-learning-scan-storage',
  'run-learning-scan-transfer',
  'run-learning-trigger',
  'state-publication-recovery',
  'state-transition',
  'state-vocabulary',
  'subjective-authority',
  'task2-invariant-observation',
  'task3-currentness',
  'topology',
  'waiver',
]);

const START = '<!-- oh-my-harness-work-truth:v1:start -->';
const END = '<!-- oh-my-harness-work-truth:v1:end -->';
const COMMON_KEYS = ['version', 'id', 'domain', 'kind', 'sourceOwner'];
const KIND_KEYS = Object.freeze({
  enum: [...COMMON_KEYS, 'values'],
  decision: [...COMMON_KEYS, 'priority', 'when', 'result'],
  projection: [...COMMON_KEYS, 'fields', 'forbiddenFields'],
  interface: [...COMMON_KEYS, 'requires', 'emits', 'references', 'forbids'],
  manifest: [...COMMON_KEYS, 'paths', 'requiredDomains', 'requiredIds'],
});
const OPERATORS = new Set([
  'all',
  'any',
  'not',
  'eq',
  'in',
  'exists',
  'fresh',
  'sameHash',
  'setEquals',
  'manifestDeltaSubset',
  'readbackMatches',
  'actorEqualsOwner',
]);
const OP_KEYS = Object.freeze({
  all: ['op', 'conditions'],
  any: ['op', 'conditions'],
  not: ['op', 'condition'],
  eq: ['op', 'fact', 'value'],
  in: ['op', 'fact', 'values'],
  exists: ['op', 'fact'],
  fresh: ['op', 'fact', 'against'],
  sameHash: ['op', 'left', 'right'],
  setEquals: ['op', 'fact', 'value'],
  manifestDeltaSubset: ['op', 'deltaFact', 'allowedFact'],
  readbackMatches: ['op', 'actualFact', 'expectedFact'],
  actorEqualsOwner: ['op', 'actorFact', 'ownerFact'],
});

export class WorkTruthContractError extends Error {
  constructor(code, message, details = {}) {
    super(`${code}: ${message}`);
    this.name = 'WorkTruthContractError';
    this.code = code;
    this.details = details;
  }
}

function fail(code, message, details) {
  throw new WorkTruthContractError(code, message, details);
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function plainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value) && Object.getPrototypeOf(value) === Object.prototype;
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
  if (plainObject(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

// JSON.parse silently accepts duplicate keys. This parser intentionally does not.
function parseJsonStrict(text, source) {
  let index = 0;
  const whitespace = () => { while (/\s/.test(text[index] ?? '')) index += 1; };
  const parseString = () => {
    if (text[index] !== '"') fail('CONTRACT_MALFORMED_JSON', `${source}: expected string`);
    const start = index;
    index += 1;
    let escaped = false;
    while (index < text.length) {
      const character = text[index];
      if (!escaped && character === '"') {
        index += 1;
        try { return JSON.parse(text.slice(start, index)); } catch { fail('CONTRACT_MALFORMED_JSON', `${source}: invalid string`); }
      }
      if (!escaped && character.charCodeAt(0) < 0x20) fail('CONTRACT_MALFORMED_JSON', `${source}: control character in string`);
      if (!escaped && character === '\\') escaped = true;
      else escaped = false;
      index += 1;
    }
    fail('CONTRACT_MALFORMED_JSON', `${source}: unterminated string`);
  };
  const parseNumber = () => {
    const match = text.slice(index).match(/^-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?/);
    if (!match) fail('CONTRACT_MALFORMED_JSON', `${source}: invalid number`);
    index += match[0].length;
    return Number(match[0]);
  };
  const parseValue = () => {
    whitespace();
    if (text[index] === '"') return parseString();
    if (text[index] === '{') {
      index += 1;
      whitespace();
      const result = {};
      const keys = new Set();
      if (text[index] === '}') { index += 1; return result; }
      while (index < text.length) {
        whitespace();
        const key = parseString();
        if (keys.has(key)) fail('CONTRACT_DUPLICATE_KEY', `${source}: duplicate key ${key}`);
        keys.add(key);
        whitespace();
        if (text[index] !== ':') fail('CONTRACT_MALFORMED_JSON', `${source}: expected colon`);
        index += 1;
        result[key] = parseValue();
        whitespace();
        if (text[index] === '}') { index += 1; return result; }
        if (text[index] !== ',') fail('CONTRACT_MALFORMED_JSON', `${source}: expected comma`);
        index += 1;
      }
      fail('CONTRACT_MALFORMED_JSON', `${source}: unterminated object`);
    }
    if (text[index] === '[') {
      index += 1;
      whitespace();
      const result = [];
      if (text[index] === ']') { index += 1; return result; }
      while (index < text.length) {
        result.push(parseValue());
        whitespace();
        if (text[index] === ']') { index += 1; return result; }
        if (text[index] !== ',') fail('CONTRACT_MALFORMED_JSON', `${source}: expected comma`);
        index += 1;
      }
      fail('CONTRACT_MALFORMED_JSON', `${source}: unterminated array`);
    }
    for (const [token, value] of [['true', true], ['false', false], ['null', null]]) {
      if (text.startsWith(token, index)) { index += token.length; return value; }
    }
    return parseNumber();
  };
  const value = parseValue();
  whitespace();
  if (index !== text.length) fail('CONTRACT_MALFORMED_JSON', `${source}: trailing input`);
  return value;
}

function assertExactKeys(value, allowed, source) {
  if (!plainObject(value)) fail('CONTRACT_TYPE', `${source}: record must be a plain object`);
  const actual = Object.keys(value).sort();
  const expected = [...allowed].sort();
  if (canonical(actual) !== canonical(expected)) fail('CONTRACT_UNKNOWN_OR_MISSING_KEY', `${source}: expected keys ${expected.join(', ')}`, { actual, expected });
}

function assertStringArray(value, source, { nonempty = true } = {}) {
  if (!Array.isArray(value) || (nonempty && value.length === 0) || value.some((item) => typeof item !== 'string' || item.length === 0)) {
    fail('CONTRACT_TYPE', `${source}: expected ${nonempty ? 'nonempty ' : ''}string array`);
  }
  if (new Set(value).size !== value.length) fail('CONTRACT_DUPLICATE_VALUE', `${source}: duplicate array value`);
}

function validateCondition(condition, source) {
  if (!plainObject(condition) || !OPERATORS.has(condition.op)) fail('CONTRACT_UNKNOWN_OPERATOR', `${source}: unknown condition operator`);
  assertExactKeys(condition, OP_KEYS[condition.op], source);
  for (const key of Object.keys(condition)) {
    if (key === 'op') continue;
    if (key.endsWith('Fact') || ['fact', 'against', 'left', 'right'].includes(key)) {
      if (typeof condition[key] !== 'string' || condition[key].length === 0) fail('CONTRACT_TYPE', `${source}/${key}: expected fact name`);
    }
  }
  if (condition.op === 'all' || condition.op === 'any') {
    if (!Array.isArray(condition.conditions)) fail('CONTRACT_TYPE', `${source}/conditions: expected array`);
    condition.conditions.forEach((item, itemIndex) => validateCondition(item, `${source}/conditions/${itemIndex}`));
  } else if (condition.op === 'not') validateCondition(condition.condition, `${source}/condition`);
  else if (condition.op === 'in') assertStringArray(condition.values, `${source}/values`);
  else if (condition.op === 'setEquals' && !Array.isArray(condition.value)) fail('CONTRACT_TYPE', `${source}/value: expected array`);
}

function collectPointers(value, pointer = '') {
  const result = [pointer || '/'];
  if (Array.isArray(value)) value.forEach((item, index) => result.push(...collectPointers(item, `${pointer}/${index}`)));
  else if (plainObject(value)) Object.entries(value).forEach(([key, item]) => result.push(...collectPointers(item, `${pointer}/${key.replaceAll('~', '~0').replaceAll('/', '~1')}`)));
  return result;
}

function validateRecord(record, sourcePath, line, expectedOwner = sourcePath) {
  const label = `${sourcePath}:${line}`;
  if (!plainObject(record) || !Object.hasOwn(KIND_KEYS, record.kind)) fail('CONTRACT_KIND', `${label}: unknown record kind`);
  assertExactKeys(record, KIND_KEYS[record.kind], label);
  if (record.version !== 1) fail('CONTRACT_VERSION', `${label}: version must be 1`);
  for (const key of ['id', 'domain', 'sourceOwner']) {
    if (typeof record[key] !== 'string' || record[key].length === 0) fail('CONTRACT_TYPE', `${label}/${key}: expected string`);
  }
  if (record.sourceOwner !== expectedOwner) fail('CONTRACT_SOURCE_OWNER', `${label}: sourceOwner does not match containing path`);
  if (record.kind === 'enum') assertStringArray(record.values, `${label}/values`);
  if (record.kind === 'decision') {
    if (!Number.isInteger(record.priority) || record.priority < 0) fail('CONTRACT_PRIORITY', `${label}: priority must be a nonnegative integer`);
    validateCondition(record.when, `${label}/when`);
    if (!plainObject(record.result) || Object.keys(record.result).length === 0) fail('CONTRACT_TYPE', `${label}/result: expected nonempty object`);
  }
  if (record.kind === 'projection') {
    assertStringArray(record.fields, `${label}/fields`);
    assertStringArray(record.forbiddenFields, `${label}/forbiddenFields`, { nonempty: false });
    const overlap = record.fields.filter((field) => record.forbiddenFields.includes(field));
    if (overlap.length > 0) fail('CONTRACT_CONTRADICTION', `${label}: projection requires and forbids ${overlap.join(', ')}`);
  }
  if (record.kind === 'interface') {
    assertStringArray(record.requires, `${label}/requires`);
    assertStringArray(record.emits, `${label}/emits`);
    assertStringArray(record.references, `${label}/references`, { nonempty: false });
    assertStringArray(record.forbids, `${label}/forbids`, { nonempty: false });
    const overlap = [...record.emits, ...record.references].filter((field) => record.forbids.includes(field));
    if (overlap.length > 0) fail('CONTRACT_CONTRADICTION', `${label}: interface requires and forbids ${[...new Set(overlap)].join(', ')}`);
  }
  if (record.kind === 'manifest') {
    assertStringArray(record.paths, `${label}/paths`);
    assertStringArray(record.requiredDomains, `${label}/requiredDomains`);
    assertStringArray(record.requiredIds, `${label}/requiredIds`);
  }
}

async function assertSafeRoot(root) {
  if (typeof root !== 'string' || root.length === 0) fail('CONTRACT_ROOT_REQUIRED', 'loadWorkTruthContract(root) requires an explicit root');
  const resolved = path.resolve(root);
  let info;
  let actual;
  try {
    info = await lstat(resolved);
    actual = await realpath(resolved);
  } catch (error) {
    fail('CONTRACT_ROOT_INVALID', `${resolved}: ${error.code ?? error.message}`);
  }
  if (info.isSymbolicLink()) fail('CONTRACT_ROOT_SYMLINK', `${resolved}: root must not be a symlink`);
  return actual;
}

async function readSafeSource(root, relativePath) {
  const absolute = path.resolve(root, relativePath);
  if (absolute !== path.join(root, relativePath) || !absolute.startsWith(`${root}${path.sep}`)) fail('CONTRACT_PATH_ESCAPE', relativePath);
  const segments = relativePath.split('/');
  let cursor = root;
  for (const segment of segments) {
    cursor = path.join(cursor, segment);
    let info;
    try { info = await lstat(cursor); } catch (error) { fail('CONTRACT_PATH_MISSING', `${relativePath}: ${error.code ?? error.message}`); }
    if (info.isSymbolicLink()) fail('CONTRACT_PATH_SYMLINK', `${relativePath}: symlink substitution is forbidden`);
  }
  const bytes = await readFile(absolute);
  return { bytes, text: bytes.toString('utf8'), hash: sha256(bytes) };
}

function parseBlock(relativePath, source, expectedOwner = relativePath) {
  const starts = [...source.text.matchAll(new RegExp(START, 'g'))];
  const ends = [...source.text.matchAll(new RegExp(END, 'g'))];
  if (starts.length !== 1 || ends.length !== 1 || starts[0].index >= ends[0].index) {
    fail('CONTRACT_BLOCK_MISSING', `${relativePath}: expected exactly one ordered v1 record block`, { starts: starts.length, ends: ends.length });
  }
  const prefix = source.text.slice(0, starts[0].index + START.length);
  const block = source.text.slice(starts[0].index + START.length, ends[0].index);
  const firstLine = prefix.split('\n').length;
  const records = [];
  block.split('\n').forEach((rawLine, offset) => {
    if (rawLine.trim() === '') return;
    const line = firstLine + offset;
    const record = parseJsonStrict(rawLine, `${relativePath}:${line}`);
    validateRecord(record, relativePath, line, expectedOwner);
    const provenance = {};
    for (const pointer of collectPointers(record)) provenance[pointer] = Object.freeze({ path: relativePath, sourceHash: source.hash, line, jsonPointer: pointer });
    records.push({ value: record, path: relativePath, sourceHash: source.hash, line, provenance: Object.freeze(provenance) });
  });
  if (records.length === 0) fail('CONTRACT_BLOCK_EMPTY', `${relativePath}: record block is empty`);
  return records;
}

function usagePointer(record, pointer) {
  return `${record.value.id}${pointer === '/' ? '' : pointer}`;
}

function makeTrace(contract, type, recordEntries, pointerMap = new Map(), extra = {}) {
  const fieldsRead = [];
  for (const entry of recordEntries) {
    const pointers = pointerMap.get(entry.value.id) ?? collectPointers(entry.value);
    for (const pointer of pointers) fieldsRead.push(usagePointer(entry, pointer));
  }
  return deepFreeze({
    type,
    contractDigest: contract.contractDigest,
    sourceHashes: contract.sourceHashes,
    recordIds: recordEntries.map(({ value }) => value.id),
    fieldsRead: [...new Set(fieldsRead)].sort(),
    ...extra,
  });
}

function assembleContract({ root, paths, sourceContractPaths, sources, entries, physical = null }) {
  const byId = new Map();
  for (const entry of entries) {
    if (byId.has(entry.value.id)) fail('CONTRACT_DUPLICATE_ID', `duplicate record ID ${entry.value.id}`);
    byId.set(entry.value.id, entry);
  }
  const manifests = entries.filter(({ value }) => value.kind === 'manifest');
  if (manifests.length !== 1) fail('CONTRACT_MANIFEST_COUNT', `expected one manifest, found ${manifests.length}`);
  const manifest = manifests[0];
  if (canonical(manifest.value.paths) !== canonical(paths)) fail('CONTRACT_MANIFEST_PATHS', 'manifest paths do not equal the exact record-bearing path list');
  const actualDomains = [...new Set(entries.map(({ value }) => value.domain))].sort();
  if (canonical([...manifest.value.requiredDomains].sort()) !== canonical(actualDomains)) fail('CONTRACT_MANIFEST_DOMAINS', 'manifest domain closure mismatch', { expected: manifest.value.requiredDomains, actual: actualDomains });
  if (canonical([...manifest.value.requiredDomains].sort()) !== canonical([...REQUIRED_DOMAINS].sort())) fail('CONTRACT_REQUIRED_DOMAINS', 'Frozen-AC domain coverage is incomplete');
  const actualIds = entries.map(({ value }) => value.id).sort();
  if (canonical([...manifest.value.requiredIds].sort()) !== canonical(actualIds)) fail('CONTRACT_MANIFEST_IDS', 'manifest record-ID closure mismatch', { expected: manifest.value.requiredIds, actual: actualIds });

  const domainOwners = new Map();
  for (const entry of entries.filter(({ value }) => ['decision', 'enum', 'projection'].includes(value.kind))) {
    const current = domainOwners.get(entry.value.domain);
    if (current && current !== entry.path) fail('CONTRACT_DOMAIN_OWNER', `${entry.value.domain} is controlled by both ${current} and ${entry.path}`);
    domainOwners.set(entry.value.domain, entry.path);
  }
  for (const entry of entries.filter(({ value }) => value.kind === 'interface')) {
    for (const requiredId of entry.value.requires) {
      const required = byId.get(requiredId);
      if (!required) fail('CONTRACT_INTERFACE_REFERENCE', `${entry.value.id}: unresolved ${requiredId}`);
      if (required.value.kind === 'interface' || required.value.kind === 'manifest') fail('CONTRACT_INTERFACE_REFERENCE', `${entry.value.id}: ${requiredId} is not a governing record`);
    }
  }
  const sourceHashes = Object.freeze(Object.fromEntries(paths.map((relativePath) => [relativePath, sources[relativePath].hash])));
  const contractDigest = sha256(paths.map((relativePath) => {
    const records = entries.filter((entry) => entry.path === relativePath).map((entry) => `${entry.value.id}\0${canonical(entry.value)}`).join('\0');
    return `${relativePath}\0${sources[relativePath].hash}\0${records}`;
  }).join('\n'));
  const frozenEntries = entries.map((entry) => deepFreeze({ ...entry, value: deepFreeze(entry.value) }));
  const frozenEntryMap = new Map(frozenEntries.map((entry) => [entry.value.id, entry]));
  const readOnlyById = Object.freeze({
    get: (id) => frozenEntryMap.get(id),
    has: (id) => frozenEntryMap.has(id),
  });
  const contract = {
    root,
    paths: Object.freeze([...paths]),
    sourceContractPaths: Object.freeze([...sourceContractPaths]),
    sources,
    sourceHashes,
    contractDigest,
    records: frozenEntries,
    byId: readOnlyById,
    physical,
  };
  contract.loadTrace = makeTrace(contract, 'contract-load', [manifest]);
  return deepFreeze(contract);
}

export async function loadWorkTruthContract(root) {
  const resolvedRoot = await assertSafeRoot(root);
  const sources = {};
  const entries = [];
  for (const relativePath of WORK_TRUTH_PATHS) {
    const source = await readSafeSource(resolvedRoot, relativePath);
    sources[relativePath] = Object.freeze({ hash: source.hash, bytes: source.bytes.length });
    entries.push(...parseBlock(relativePath, source));
  }
  return assembleContract({
    root: resolvedRoot,
    paths: WORK_TRUTH_PATHS,
    sourceContractPaths: WORK_TRUTH_PATHS,
    sources,
    entries,
  });
}

export async function loadInstalledWorkTruthContract({ releaseRoot, inventory, forbiddenRoots } = {}) {
  if (typeof releaseRoot !== 'string' || !releaseRoot) fail('INSTALLED_CONTRACT_ROOT_REQUIRED', 'releaseRoot is mandatory');
  if (!inventory || typeof inventory.readDestination !== 'function' || !inventory.inventoryDocument) {
    fail('INSTALLED_CONTRACT_INVENTORY_REQUIRED', 'physical inventory handle is mandatory');
  }
  if (!Array.isArray(forbiddenRoots) || forbiddenRoots.length === 0) {
    fail('INSTALLED_CONTRACT_FORBIDDEN_ROOTS_REQUIRED', 'forbiddenRoots are mandatory');
  }
  const resolvedRoot = await assertSafeRoot(releaseRoot);
  if (resolvedRoot !== inventory.releaseRoot) fail('INSTALLED_CONTRACT_ROOT_MISMATCH', 'release root differs from physical inventory');
  const resolvedForbidden = await Promise.all(forbiddenRoots.map((item) => realpath(path.resolve(item))));
  if (canonical(resolvedForbidden) !== canonical(inventory.forbiddenRoots)) {
    fail('INSTALLED_CONTRACT_FORBIDDEN_ROOTS_MISMATCH', 'forbidden roots differ from physical inventory');
  }

  const inventoryPath = inventory.inventoryPath ?? '.oh-my-harness/bundle-inventory.json';
  const reread = await readSafeSource(resolvedRoot, inventoryPath);
  if (reread.hash !== inventory.inventorySha256) fail('INSTALLED_CONTRACT_INVENTORY_HASH', 'reread inventory hash mismatch');
  let rereadInventory;
  try { rereadInventory = JSON.parse(reread.text); } catch (error) { fail('INSTALLED_CONTRACT_INVENTORY_JSON', error.message); }
  if (canonical(rereadInventory) !== canonical(inventory.inventoryDocument)) {
    fail('INSTALLED_CONTRACT_INVENTORY_BINDING', 'caller inventory differs from physical inventory bytes');
  }

  const mappedEntries = WORK_TRUTH_PATHS.map((sourcePath) => {
    const matches = rereadInventory.requiredFiles.filter((entry) => entry.sourcePath === sourcePath);
    if (matches.length !== 1) fail('INSTALLED_CONTRACT_MAPPING', `${sourcePath}: expected exactly one physical destination`);
    return matches[0];
  });
  const installedPaths = mappedEntries.map(({ destinationPath }) => destinationPath);
  if (new Set(installedPaths).size !== installedPaths.length) fail('INSTALLED_CONTRACT_MAPPING', 'duplicate physical destination');
  const sources = {};
  const entries = [];
  for (const entry of mappedEntries) {
    const bound = inventory.byAssetId.get(entry.assetId);
    if (!bound || canonical(bound) !== canonical(entry)) fail('INSTALLED_CONTRACT_MAPPING', `${entry.assetId}: caller mapping mismatch`);
    const observed = await inventory.readDestination(bound);
    sources[entry.destinationPath] = Object.freeze({
      hash: observed.hash,
      bytes: observed.bytes.length,
      sourcePath: entry.sourcePath,
      destinationPath: entry.destinationPath,
      actualRealpath: observed.actualRealpath,
    });
    entries.push(...parseBlock(entry.destinationPath, observed, entry.destinationPath));
  }
  return assembleContract({
    root: resolvedRoot,
    paths: installedPaths,
    sourceContractPaths: WORK_TRUTH_PATHS,
    sources,
    entries,
    physical: Object.freeze({
      inventorySha256: inventory.inventorySha256,
      inventoryPath,
      sourceToDestination: Object.freeze(Object.fromEntries(mappedEntries.map((entry) => [entry.sourcePath, entry.destinationPath]))),
    }),
  });
}

function getFact(facts, name, consulted) {
  consulted.add(name);
  return facts[name];
}

function markTree(entry, value, pointer, fieldsRead) {
  fieldsRead.add(usagePointer(entry, pointer || '/'));
  if (Array.isArray(value)) value.forEach((item, index) => markTree(entry, item, `${pointer}/${index}`, fieldsRead));
  else if (plainObject(value)) Object.entries(value).forEach(([key, item]) => markTree(entry, item, `${pointer}/${key}`, fieldsRead));
}

function evaluateCondition(entry, condition, facts, pointer, fieldsRead, consulted) {
  fieldsRead.add(usagePointer(entry, pointer || '/'));
  fieldsRead.add(usagePointer(entry, `${pointer}/op`));
  const fact = (name, key = 'fact') => {
    fieldsRead.add(usagePointer(entry, `${pointer}/${key}`));
    return getFact(facts, name, consulted);
  };
  if (condition.op === 'all') {
    fieldsRead.add(usagePointer(entry, `${pointer}/conditions`));
    return condition.conditions.map((item, index) => evaluateCondition(entry, item, facts, `${pointer}/conditions/${index}`, fieldsRead, consulted)).every(Boolean);
  }
  if (condition.op === 'any') {
    fieldsRead.add(usagePointer(entry, `${pointer}/conditions`));
    return condition.conditions.map((item, index) => evaluateCondition(entry, item, facts, `${pointer}/conditions/${index}`, fieldsRead, consulted)).some(Boolean);
  }
  if (condition.op === 'not') {
    fieldsRead.add(usagePointer(entry, `${pointer}/condition`));
    return !evaluateCondition(entry, condition.condition, facts, `${pointer}/condition`, fieldsRead, consulted);
  }
  if (condition.op === 'eq') {
    markTree(entry, condition.value, `${pointer}/value`, fieldsRead);
    return canonical(fact(condition.fact)) === canonical(condition.value);
  }
  if (condition.op === 'in') {
    markTree(entry, condition.values, `${pointer}/values`, fieldsRead);
    return condition.values.some((value) => canonical(value) === canonical(fact(condition.fact)));
  }
  if (condition.op === 'exists') return fact(condition.fact) !== undefined && fact(condition.fact) !== null;
  if (condition.op === 'fresh') {
    const value = fact(condition.fact);
    const against = fact(condition.against, 'against');
    return Number.isFinite(value) && Number.isFinite(against) && value >= against;
  }
  if (condition.op === 'sameHash') return fact(condition.left, 'left') === fact(condition.right, 'right');
  if (condition.op === 'setEquals') {
    markTree(entry, condition.value, `${pointer}/value`, fieldsRead);
    const actual = fact(condition.fact);
    return Array.isArray(actual) && canonical([...new Set(actual)].sort()) === canonical([...new Set(condition.value)].sort());
  }
  if (condition.op === 'manifestDeltaSubset') {
    const delta = fact(condition.deltaFact, 'deltaFact');
    const allowed = fact(condition.allowedFact, 'allowedFact');
    return Array.isArray(delta) && Array.isArray(allowed) && delta.every((item) => allowed.includes(item));
  }
  if (condition.op === 'readbackMatches') return canonical(fact(condition.actualFact, 'actualFact')) === canonical(fact(condition.expectedFact, 'expectedFact'));
  if (condition.op === 'actorEqualsOwner') return fact(condition.actorFact, 'actorFact') === fact(condition.ownerFact, 'ownerFact');
  fail('CONTRACT_UNKNOWN_OPERATOR', condition.op);
}

export function decide(contract, domain, facts) {
  assert.ok(contract && contract.contractDigest, 'a loaded contract is required');
  if (!plainObject(facts)) fail('CONTRACT_FACTS', `${domain}: facts must be a plain object`);
  const entries = contract.records.filter(({ value }) => value.kind === 'decision' && value.domain === domain);
  if (entries.length === 0) fail('CONTRACT_NO_DOMAIN', `no decision records for ${domain}`);
  const evaluated = [];
  const fieldsRead = new Set();
  const consulted = new Set();
  for (const entry of entries) {
    for (const pointer of ['/version', '/id', '/domain', '/kind', '/sourceOwner', '/priority']) fieldsRead.add(usagePointer(entry, pointer));
    evaluated.push({ entry, matched: evaluateCondition(entry, entry.value.when, facts, '/when', fieldsRead, consulted) });
  }
  const matched = evaluated.filter(({ matched: value }) => value);
  if (matched.length === 0) fail('CONTRACT_NO_DECISION', `${domain}: zero decisions matched`, { facts });
  const bestPriority = Math.min(...matched.map(({ entry }) => entry.value.priority));
  const winners = matched.filter(({ entry }) => entry.value.priority === bestPriority);
  if (winners.length !== 1) fail('CONTRACT_AMBIGUOUS_DECISION', `${domain}: ${winners.length} decisions matched priority ${bestPriority}`, { ids: winners.map(({ entry }) => entry.value.id) });
  const winner = winners[0].entry;
  markTree(winner, winner.value.result, '/result', fieldsRead);
  const result = structuredClone(winner.value.result);
  const trace = deepFreeze({
    type: 'decision',
    domain,
    contractDigest: contract.contractDigest,
    sourceHashes: contract.sourceHashes,
    matchedDecisionIds: [winner.value.id],
    sourcePointers: [...fieldsRead].filter((pointer) => pointer.startsWith(`${winner.value.id}/`)).sort(),
    fieldsRead: [...fieldsRead].sort(),
    factsConsulted: [...consulted].sort(),
  });
  return deepFreeze({ result: deepFreeze(result), trace });
}

export function validateEnum(contract, id, value) {
  const entry = contract.byId.get(id);
  if (!entry || entry.value.kind !== 'enum') fail('CONTRACT_ENUM', `${id}: enum not found`);
  if (!entry.value.values.includes(value)) fail('CONTRACT_ENUM_VALUE', `${id}: invalid value ${value}`);
  return makeTrace(contract, 'enum', [entry], new Map([[id, collectPointers(entry.value)]]), { value });
}

export function project(contract, id, source) {
  const entry = contract.byId.get(id);
  if (!entry || entry.value.kind !== 'projection') fail('CONTRACT_PROJECTION', `${id}: projection not found`);
  if (!plainObject(source)) fail('CONTRACT_PROJECTION', `${id}: source must be an object`);
  for (const field of entry.value.forbiddenFields) if (Object.hasOwn(source, field)) fail('CONTRACT_PROJECTION_FORBIDDEN', `${id}: forbidden field ${field}`);
  const result = {};
  for (const field of entry.value.fields) {
    if (!Object.hasOwn(source, field)) fail('CONTRACT_PROJECTION_MISSING', `${id}: missing field ${field}`);
    result[field] = source[field];
  }
  return { value: deepFreeze(result), trace: makeTrace(contract, 'projection', [entry]) };
}

export function validateInterface(contract, id, payload) {
  const entry = contract.byId.get(id);
  if (!entry || entry.value.kind !== 'interface') fail('CONTRACT_INTERFACE', `${id}: interface not found`);
  if (!plainObject(payload)) fail('CONTRACT_INTERFACE', `${id}: payload must be an object`);
  for (const required of entry.value.requires) if (!contract.byId.has(required)) fail('CONTRACT_INTERFACE_REFERENCE', `${id}: missing ${required}`);
  for (const field of entry.value.emits) if (!Object.hasOwn(payload, field)) fail('CONTRACT_INTERFACE_MISSING', `${id}: missing emitted field ${field}`);
  for (const field of entry.value.forbids) if (Object.hasOwn(payload, field)) fail('CONTRACT_INTERFACE_FORBIDDEN', `${id}: forbidden field ${field}`);
  return makeTrace(contract, 'interface', [entry]);
}

const METADATA_POINTERS = new Set(['/version', '/id', '/domain', '/kind', '/sourceOwner']);

export function assertAllNormativeFieldsConsumed(contract, traces) {
  const consumed = new Set(traces.flatMap((trace) => trace.fieldsRead ?? []));
  const missing = [];
  for (const entry of contract.records) {
    for (const pointer of collectPointers(entry.value)) {
      if (pointer === '/' || METADATA_POINTERS.has(pointer)) continue;
      const identity = usagePointer(entry, pointer);
      if (!consumed.has(identity)) missing.push(identity);
    }
  }
  if (missing.length > 0) fail('CONTRACT_UNUSED_FIELD', `normative fields were not consumed: ${missing.join(', ')}`, { missing });
  return true;
}

export async function copyWorkTruthSources(sourceRoot, targetRoot) {
  await mkdir(targetRoot, { recursive: true });
  for (const relativePath of WORK_TRUTH_PATHS) {
    const target = path.join(targetRoot, relativePath);
    await mkdir(path.dirname(target), { recursive: true });
    await cp(path.join(sourceRoot, relativePath), target, { dereference: false, errorOnExist: true });
  }
}

export async function withTempContractRoot(sourceRoot, callback) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t02-contract-'));
  try {
    await copyWorkTruthSources(sourceRoot, tempRoot);
    return await callback(tempRoot);
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

export async function rewriteRecord(root, recordId, transform) {
  for (const relativePath of WORK_TRUTH_PATHS) {
    const absolute = path.join(root, relativePath);
    let text;
    try { text = await readFile(absolute, 'utf8'); } catch { continue; }
    const lines = text.split('\n');
    let found = false;
    const next = [];
    for (const line of lines) {
      if (!line.trim().startsWith('{')) { next.push(line); continue; }
      let value;
      try { value = JSON.parse(line); } catch { next.push(line); continue; }
      if (value.id !== recordId) { next.push(line); continue; }
      found = true;
      const changed = transform(structuredClone(value));
      if (changed !== null) next.push(JSON.stringify(changed));
    }
    if (found) {
      await writeFile(absolute, next.join('\n'));
      return relativePath;
    }
  }
  fail('CONTRACT_RECORD_NOT_FOUND', recordId);
}

export async function manifestTree(root) {
  const result = [];
  async function visit(absolute, relative = '') {
    const entries = await readdir(absolute, { withFileTypes: true });
    entries.sort((left, right) => left.name.localeCompare(right.name));
    for (const entry of entries) {
      const childRelative = relative ? `${relative}/${entry.name}` : entry.name;
      const child = path.join(absolute, entry.name);
      const info = await lstat(child);
      if (info.isSymbolicLink()) fail('PHYSICAL_SYMLINK', `${childRelative}: symlink forbidden`);
      if (info.isDirectory()) {
        result.push({ path: childRelative, type: 'directory', mode: info.mode & 0o777, size: 0, hash: null });
        await visit(child, childRelative);
      } else if (info.isFile()) {
        const bytes = await readFile(child);
        result.push({ path: childRelative, type: 'file', mode: info.mode & 0o777, size: bytes.length, hash: sha256(bytes) });
      } else fail('PHYSICAL_TYPE', `${childRelative}: unsupported filesystem entry`);
    }
  }
  await visit(root);
  return deepFreeze(result);
}

export function manifestDelta(before, after) {
  const oldMap = new Map(before.map((entry) => [entry.path, entry]));
  const newMap = new Map(after.map((entry) => [entry.path, entry]));
  const paths = [...new Set([...oldMap.keys(), ...newMap.keys()])].sort();
  return deepFreeze(paths.filter((item) => canonical(oldMap.get(item)) !== canonical(newMap.get(item))));
}

async function stagedWrite(absolute, bytes, updateIdentity) {
  const stage = `${absolute}.${updateIdentity}.stage`;
  await writeFile(stage, bytes);
  await rename(stage, absolute);
}

export async function runTask2PhysicalScenario(sourceRoot, scenario) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t02-physical-'));
  const sourceCopy = path.join(tempRoot, 'source');
  const physicalRoot = path.join(tempRoot, 'physical');
  try {
    await copyWorkTruthSources(sourceRoot, sourceCopy);
    const contract = await loadWorkTruthContract(sourceCopy);
    const initial = {
      'context/LIVING_CONTEXT.md': 'macro-current\n',
      'context/TASK_BOARD.md': scenario.boardBytes ?? 'T-02 blocked\n',
      'tasks/T-02/TASK_STATE.md': scenario.beforeBytes ?? 'state=blocked\n',
      'protected/tracked.txt': 'tracked-sentinel\n',
      'protected/untracked.txt': 'untracked-sentinel\n',
      'protected/ignored-history.txt': 'ignored-history-sentinel\n',
    };
    for (const [relativePath, bytes] of Object.entries(initial)) {
      const absolute = path.join(physicalRoot, relativePath);
      await mkdir(path.dirname(absolute), { recursive: true });
      await writeFile(absolute, bytes);
    }
    const before = await manifestTree(physicalRoot);
    const targetPath = scenario.targetPath ?? 'tasks/T-02/TASK_STATE.md';
    const allowedPaths = scenario.allowedPaths ?? [targetPath];
    const updateIdentity = scenario.updateIdentity ?? 'physical-update-01';
    const ownership = decide(contract, 'ownership', { view: scenario.view ?? 'task-state', actor: scenario.actor });
    const operations = [];
    if (ownership.result.allowed === true || scenario.bypass === true) {
      await stagedWrite(path.join(physicalRoot, targetPath), scenario.afterBytes ?? 'state=completed\n', updateIdentity);
      operations.push({ actor: scenario.actor, path: targetPath, kind: scenario.bypass ? 'bypass-write' : 'staged-write' });
    }
    if (scenario.leakPath) {
      await stagedWrite(path.join(physicalRoot, scenario.leakPath), scenario.leakBytes ?? 'leaked\n', updateIdentity);
      operations.push({ actor: scenario.actor, path: scenario.leakPath, kind: 'extra-write' });
    }
    if (scenario.corruptBeforeReadback && ownership.result.allowed === true) {
      await writeFile(path.join(physicalRoot, targetPath), scenario.corruptBytes ?? 'corrupt\n');
      operations.push({ actor: 'fault-injection', path: targetPath, kind: 'corrupt' });
    }
    let readback = null;
    let readbackError = null;
    try { readback = await readFile(path.join(physicalRoot, targetPath), 'utf8'); } catch (error) { readbackError = error.code ?? error.message; }
    const after = await manifestTree(physicalRoot);
    const delta = manifestDelta(before, after);
    const expectedBytes = scenario.afterBytes ?? 'state=completed\n';
    const observationIdentity = readback === null ? null : sha256(readback);
    let physicalConflict = false;
    try {
      const board = JSON.parse(await readFile(path.join(physicalRoot, 'context/TASK_BOARD.md'), 'utf8'));
      if (typeof board.taskStateHash === 'string') physicalConflict = board.taskStateHash !== observationIdentity;
    } catch {
      physicalConflict = false;
    }
    const task2 = decide(contract, 'task2-invariant-observation', {
      actorAllowed: ownership.result.allowed === true,
      deltaPaths: delta,
      allowedPaths,
      actualReadback: readback,
      expectedReadback: expectedBytes,
      observationIdentity,
      physicalObservation: true,
      conflict: physicalConflict,
    });
    return deepFreeze({
      tempRootIdentity: sha256(tempRoot),
      contractDigest: contract.contractDigest,
      sourceHashes: contract.sourceHashes,
      before,
      after,
      delta,
      operations,
      readback,
      readbackError,
      observationIdentity,
      physicalConflict,
      ownership,
      task2,
    });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

function jsonBytes(value) {
  return Buffer.from(`${JSON.stringify(value)}\n`);
}

function nonempty(value) {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return plainObject(value) && Object.keys(value).length > 0;
}

function exactKeys(value, keys) {
  return plainObject(value) && canonical(Object.keys(value).sort()) === canonical([...keys].sort());
}

async function writeFixture(root, relativePath, bytes, updateIdentity = null) {
  const absolute = path.join(root, relativePath);
  await mkdir(path.dirname(absolute), { recursive: true });
  if (updateIdentity === null) await writeFile(absolute, bytes);
  else await stagedWrite(absolute, bytes, updateIdentity);
}

async function observeFixture(root, relativePath, expectedBytes) {
  try {
    const bytes = await readFile(path.join(root, relativePath));
    let value = null;
    try { value = parseJsonStrict(bytes.toString('utf8').trim(), relativePath); } catch { value = null; }
    return deepFreeze({
      present: true,
      bytes: bytes.length,
      hash: sha256(bytes),
      expectedHash: sha256(expectedBytes),
      readbackMatches: bytes.equals(expectedBytes),
      value,
    });
  } catch (error) {
    return deepFreeze({ present: false, bytes: 0, hash: null, expectedHash: sha256(expectedBytes), readbackMatches: false, value: null, error: error.code ?? error.message });
  }
}

async function newPhysicalRoot(prefix) {
  const tempRoot = await mkdtemp(path.join(os.tmpdir(), prefix));
  const physicalRoot = path.join(tempRoot, 'physical');
  await mkdir(physicalRoot, { recursive: true });
  return { tempRoot, physicalRoot };
}

export async function runAcceptancePhysicalScenario(sourceRoot, scenario = {}) {
  const { tempRoot, physicalRoot } = await newPhysicalRoot('oh-my-harness-t02-acceptance-');
  try {
    const contract = await loadWorkTruthContract(sourceRoot);
    const before = await manifestTree(physicalRoot);
    const closure = {
      owner: 'main',
      scopeAndNonGoals: ['T-02 work-truth closure', 'no downstream unlock'],
      prerequisites: ['accepted T-01'],
      acceptanceCriteria: Array.from({ length: 10 }, (_, index) => `AC${index + 1}`),
      primaryEvidence: ['physical Task readback', 'physical AC ledger readback'],
      discriminatingFailure: 'proxy-only evidence',
      strictDecisionPath: 'independent QA then main acceptance',
      protectedUpstream: ['accepted T-01'],
      protectedDownstream: ['T-03'],
      consumerRevalidation: ['T-03 remains blocked'],
      lifecycleConditions: ['blocked', 'superseded', 'cancelled'],
      acceptedIdentity: 'accepted-task-identity-01',
      designTrigger: 'material execution uncertainty',
    };
    if (scenario.omitClosureField) delete closure[scenario.omitClosureField];
    const task = {
      taskIdentity: 'task-T-02-identity-01',
      observableResult: { kind: 'physical-work-truth', state: 'observed' },
      closure,
    };
    const ledger = closure.acceptanceCriteria.map((ac, index) => ({
      ac,
      evidence: index === 0 ? 'task.json' : 'ledger.json',
      expectationPath: index === 0 ? '/observableResult' : `/${index}`,
      owner: 'main',
      consumer: 'T-03',
      revalidation: 'required',
      resolved: true,
    }));
    if (scenario.emptyLedger) ledger.splice(0, ledger.length);
    if (scenario.duplicateAc) ledger[1].ac = 'AC1';
    if (scenario.extraLedger) ledger.push({ ac: 'AC11', evidence: 'ledger.json', expectationPath: '/10', owner: 'main', consumer: 'T-03', revalidation: 'required', resolved: true });
    if (scenario.mismatchedLedger) ledger[0].ac = 'AC-mismatch';
    if (scenario.unresolvedLedger) ledger[0].resolved = false;
    if (scenario.omitLedgerField) delete ledger[0][scenario.omitLedgerField];
    const taskExpected = jsonBytes(task);
    const ledgerExpected = jsonBytes(ledger);
    if (!scenario.omitTask) await writeFixture(physicalRoot, 'task.json', taskExpected);
    if (!scenario.omitLedger) await writeFixture(physicalRoot, 'ledger.json', ledgerExpected);
    if (scenario.corruptTask && !scenario.omitTask) await writeFile(path.join(physicalRoot, 'task.json'), '{"corrupt":true}\n');
    if (scenario.corruptLedger && !scenario.omitLedger) await writeFile(path.join(physicalRoot, 'ledger.json'), 'not-json\n');
    const taskObservation = await observeFixture(physicalRoot, 'task.json', taskExpected);
    const ledgerObservation = await observeFixture(physicalRoot, 'ledger.json', ledgerExpected);
    const actualTask = taskObservation.value;
    const actualLedger = ledgerObservation.value;
    const requiredClosureFields = [
      'owner', 'scopeAndNonGoals', 'prerequisites', 'acceptanceCriteria', 'primaryEvidence', 'discriminatingFailure', 'strictDecisionPath',
      'protectedUpstream', 'protectedDownstream', 'consumerRevalidation', 'lifecycleConditions', 'acceptedIdentity', 'designTrigger',
    ];
    const taskAcs = plainObject(actualTask?.closure) && Array.isArray(actualTask.closure.acceptanceCriteria) ? actualTask.closure.acceptanceCriteria : [];
    const ledgerAcs = Array.isArray(actualLedger) ? actualLedger.map(({ ac }) => ac) : [];
    const exactLedgerRow = (row) => exactKeys(row, ['ac', 'evidence', 'expectationPath', 'owner', 'consumer', 'revalidation', 'resolved'])
      && ['ac', 'evidence', 'expectationPath', 'owner', 'consumer', 'revalidation'].every((field) => nonempty(row[field]));
    const facts = {
      taskObservationIdentity: taskObservation.hash,
      taskExpectedIdentity: taskObservation.expectedHash,
      taskIdentityObserved: nonempty(actualTask?.taskIdentity),
      actualResultObserved: nonempty(actualTask?.observableResult),
      closureFieldsComplete: exactKeys(actualTask, ['taskIdentity', 'observableResult', 'closure'])
        && exactKeys(actualTask?.closure, requiredClosureFields)
        && requiredClosureFields.every((field) => nonempty(actualTask.closure[field])),
      ledgerObservationIdentity: ledgerObservation.hash,
      ledgerExpectedIdentity: ledgerObservation.expectedHash,
      ledgerObserved: Array.isArray(actualLedger),
      ledgerNonempty: Array.isArray(actualLedger) && actualLedger.length > 0,
      uniqueAcOwnership: taskAcs.length > 0
        && taskAcs.every((ac) => ledgerAcs.filter((ledgerAc) => ledgerAc === ac).length === 1),
      ledgerExactAgainstTask: Array.isArray(actualLedger)
        && actualLedger.every(exactLedgerRow)
        && canonical([...ledgerAcs].sort()) === canonical([...taskAcs].sort()),
      unresolvedLedgerRows: !Array.isArray(actualLedger) || actualLedger.some((row) => row.resolved !== true),
      proxyOnly: scenario.proxyOnly === true,
    };
    const acceptance = decide(contract, 'acceptance-proxy', facts);
    const after = await manifestTree(physicalRoot);
    return deepFreeze({
      tempRootIdentity: sha256(tempRoot), contractDigest: contract.contractDigest, sourceHashes: contract.sourceHashes,
      before, after, delta: manifestDelta(before, after), manifest: after, taskObservation, ledgerObservation, facts, acceptance,
    });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

export async function runCompletionPhysicalScenario(sourceRoot, scenario = {}) {
  const { tempRoot, physicalRoot } = await newPhysicalRoot('oh-my-harness-t02-completion-');
  try {
    const contract = await loadWorkTruthContract(sourceRoot);
    const before = await manifestTree(physicalRoot);
    const taskIdentity = 'task-T-02-identity-01';
    const fixtures = {
      'actor.json': { actor: scenario.actor ?? 'main', boundaryIdentity: 'boundary-02' },
      'behavior.json': { taskIdentity, currentBehaviorEvidence: ['targeted-green'], negativeEvidence: ['proxy-negative-green'] },
      'strict-qa.json': { reportIdentity: 'strict-qa-02', targetIdentity: taskIdentity, strict: true, verdict: scenario.qaVerdict ?? 'PASS' },
      'finding-disposition.json': { qaReportIdentity: 'strict-qa-02', actor: 'main', findings: [], dispositions: [] },
      'main-acceptance.json': { actor: 'main', taskIdentity, qaReportIdentity: 'strict-qa-02', accepted: true },
    };
    if (scenario.omitEvidenceField) {
      const [fixturePath, field] = scenario.omitEvidenceField.split(':');
      delete fixtures[fixturePath]?.[field];
    }
    const expected = Object.fromEntries(Object.entries(fixtures).map(([fixturePath, value]) => [fixturePath, jsonBytes(value)]));
    for (const [fixturePath, bytes] of Object.entries(expected)) {
      if (scenario.omitFile !== fixturePath) await writeFixture(physicalRoot, fixturePath, bytes);
    }
    if (scenario.corruptFile && expected[scenario.corruptFile]) await writeFile(path.join(physicalRoot, scenario.corruptFile), '{"corrupt":true}\n');
    const observations = {};
    for (const [fixturePath, bytes] of Object.entries(expected)) observations[fixturePath] = await observeFixture(physicalRoot, fixturePath, bytes);
    const actor = observations['actor.json'].value;
    const behavior = observations['behavior.json'].value;
    const qa = observations['strict-qa.json'].value;
    const disposition = observations['finding-disposition.json'].value;
    const acceptance = observations['main-acceptance.json'].value;
    const facts = {
      edge: scenario.edge ?? 'active->completed',
      observedActor: actor?.actor,
      completionObservationIdentities: Object.keys(expected).map((fixturePath) => observations[fixturePath].hash),
      completionExpectedIdentities: Object.keys(expected).map((fixturePath) => observations[fixturePath].expectedHash),
      currentBehaviorObserved: nonempty(behavior?.currentBehaviorEvidence),
      negativeEvidenceObserved: nonempty(behavior?.negativeEvidence),
      strictQaObserved: nonempty(qa?.reportIdentity),
      strictQaValid: qa?.strict === true && qa?.verdict === 'PASS' && qa?.targetIdentity === taskIdentity,
      findingDispositionObserved: nonempty(disposition?.qaReportIdentity) && Array.isArray(disposition?.findings) && Array.isArray(disposition?.dispositions),
      mainAcceptanceObserved: acceptance?.actor === 'main' && acceptance?.accepted === true,
      evidenceIdentityContinuity: behavior?.taskIdentity === taskIdentity
        && qa?.targetIdentity === taskIdentity
        && disposition?.qaReportIdentity === qa?.reportIdentity
        && acceptance?.taskIdentity === taskIdentity
        && acceptance?.qaReportIdentity === qa?.reportIdentity,
    };
    const transition = decide(contract, 'state-transition', facts);
    const after = await manifestTree(physicalRoot);
    return deepFreeze({ tempRootIdentity: sha256(tempRoot), before, after, delta: manifestDelta(before, after), observations, facts, transition, manifest: after });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

export async function runPublicationPhysicalScenario(sourceRoot, scenario = {}) {
  const { tempRoot, physicalRoot } = await newPhysicalRoot('oh-my-harness-t02-publication-');
  try {
    const contract = await loadWorkTruthContract(sourceRoot);
    const empty = await manifestTree(physicalRoot);
    const persistenceFacts = scenario.persistenceFacts ?? { continuityRisk: true, multiTaskRisk: true, detailRisk: true };
    const persistence = decide(contract, 'persistence', persistenceFacts);
    const representations = persistence.result.representations;
    if (canonical(representations) === canonical(['inline'])) {
      return deepFreeze({
        tempRootIdentity: sha256(tempRoot), empty, before: empty, after: empty, deltaPaths: [], allowedPaths: [], operations: [],
        preparedHashes: [], observations: {}, facts: null, persistence, publication: null, priorLastVerifiedObservation: null,
        priorLastVerifiedIdentity: null, commitRootIdentity: null, retainedLastVerifiedIdentity: null,
      });
    }
    const updateIdentity = scenario.updateIdentity ?? 'publication-update-02';
    const viewPaths = {
      'task-state': 'tasks/T-02/TASK_STATE.json',
      'task-board': 'context/TASK_BOARD.json',
      context: 'context/LIVING_CONTEXT.json',
    };
    const selectedViews = representations.filter((view) => Object.hasOwn(viewPaths, view));
    if (selectedViews.length !== representations.length || new Set(selectedViews).size !== selectedViews.length) {
      fail('PHYSICAL_PERSISTENCE_RESULT', 'persistence result must contain unique inline or durable representations', { representations });
    }
    const publicationRecord = contract.byId.get('publication.current')?.value;
    const fullOrder = publicationRecord?.result?.publicationOrder;
    if (!Array.isArray(fullOrder) || new Set(fullOrder).size !== fullOrder.length || selectedViews.some((view) => !fullOrder.includes(view))) {
      fail('PHYSICAL_PUBLICATION_ORDER', 'publication.current must own one full relative order containing every selected view', { fullOrder, selectedViews });
    }
    const expectedPublicationOrder = fullOrder.filter((view) => selectedViews.includes(view));
    const priorLastVerifiedBytes = jsonBytes({ identity: scenario.priorLastVerifiedIdentity ?? 'prior-last-verified-01' });
    const initial = {
      'protected/tracked.txt': Buffer.from('tracked-sentinel\n'),
      'protected/untracked.txt': Buffer.from('untracked-sentinel\n'),
      'protected/ignored-history.txt': Buffer.from('ignored-history-sentinel\n'),
    };
    for (const view of selectedViews) initial[viewPaths[view]] = jsonBytes({ updateIdentity: 'prior-update', view, state: 'prior' });
    if (!scenario.omitLastVerified) {
      initial['last-verified.json'] = scenario.corruptLastVerified
        ? Buffer.from('not-json\n')
        : scenario.mismatchLastVerified
          ? jsonBytes({ identity: 'mismatched-prior-identity' })
          : priorLastVerifiedBytes;
    }
    for (const [fixturePath, bytes] of Object.entries(initial)) await writeFixture(physicalRoot, fixturePath, bytes);
    const before = await manifestTree(physicalRoot);
    const observedPrior = await observeFixture(physicalRoot, 'last-verified.json', priorLastVerifiedBytes);
    const priorLastVerifiedObservation = deepFreeze({
      ...observedPrior,
      valid: observedPrior.present
        && observedPrior.readbackMatches
        && exactKeys(observedPrior.value, ['identity'])
        && nonempty(observedPrior.value.identity),
    });
    const prepared = {};
    if (selectedViews.includes('task-state')) {
      prepared['task-state'] = jsonBytes({ updateIdentity, view: 'task-state', taskIdentity: 'task-T-02-identity-01', state: 'completed' });
    }
    if (selectedViews.includes('task-board')) {
      const board = { updateIdentity, view: 'task-board', readiness: 'blocked' };
      if (selectedViews.includes('task-state')) board.taskStateHash = scenario.conflict ? 'stale-task-hash' : sha256(prepared['task-state']);
      prepared['task-board'] = jsonBytes(board);
    }
    if (selectedViews.includes('context')) {
      const context = { updateIdentity, view: 'context', nextAction: 'main-review' };
      if (selectedViews.includes('task-board')) context.taskBoardHash = scenario.conflict ? 'stale-board-hash' : sha256(prepared['task-board']);
      prepared.context = jsonBytes(context);
    }
    const order = scenario.order ?? expectedPublicationOrder;
    if (order.some((view) => !selectedViews.includes(view))) fail('PHYSICAL_PUBLICATION_OPERATION', 'operation order contains a nonselected view', { order, selectedViews });
    const publishCount = scenario.publishCount ?? order.length;
    const operations = [];
    for (const view of order.slice(0, publishCount)) {
      await writeFixture(physicalRoot, viewPaths[view], prepared[view], updateIdentity);
      operations.push({ view, path: viewPaths[view], updateIdentity, expectedHash: sha256(prepared[view]) });
    }
    if (scenario.extraParticipant && Object.hasOwn(viewPaths, scenario.extraParticipant) && !selectedViews.includes(scenario.extraParticipant)) {
      const extraBytes = jsonBytes({ updateIdentity, view: scenario.extraParticipant, extraParticipant: true });
      prepared[scenario.extraParticipant] = extraBytes;
      await writeFixture(physicalRoot, viewPaths[scenario.extraParticipant], extraBytes, updateIdentity);
      operations.push({ view: scenario.extraParticipant, path: viewPaths[scenario.extraParticipant], updateIdentity, expectedHash: sha256(extraBytes) });
    }
    if (scenario.corruptView && viewPaths[scenario.corruptView]) {
      await writeFile(path.join(physicalRoot, viewPaths[scenario.corruptView]), '{"corrupt":true}\n');
      operations.push({ view: scenario.corruptView, path: viewPaths[scenario.corruptView], updateIdentity: 'fault', expectedHash: null });
    }
    if (scenario.protectedMutation) await writeFile(path.join(physicalRoot, 'protected/tracked.txt'), 'changed-protected\n');
    const observations = {};
    for (const view of Object.keys(prepared)) observations[view] = await observeFixture(physicalRoot, viewPaths[view], prepared[view]);
    const after = await manifestTree(physicalRoot);
    const deltaPaths = manifestDelta(before, after);
    const allowedPaths = scenario.allowedPaths ?? selectedViews.map((view) => viewPaths[view]);
    const expectedReadback = expectedPublicationOrder.map((view) => sha256(prepared[view]));
    const actualReadback = expectedPublicationOrder.map((view) => observations[view].hash);
    const parsed = Object.fromEntries(Object.entries(observations).map(([view, observation]) => [view, observation.value]));
    const sharedUpdateComplete = expectedPublicationOrder.every((view) => observations[view].readbackMatches);
    const updateIdentityObserved = expectedPublicationOrder.every((view) => parsed[view]?.updateIdentity === updateIdentity);
    const actualPublicationOrder = operations.filter(({ updateIdentity: identity }) => identity === updateIdentity).map(({ view }) => view);
    const actualParticipatingViews = actualPublicationOrder.filter((view, index) => (
      actualPublicationOrder.indexOf(view) === index
      && parsed[view]?.updateIdentity === updateIdentity
      && parsed[view]?.view === view
      && observations[view]?.readbackMatches
    ));
    const actualCrossViewReferences = [];
    const expectedCrossViewReferences = [];
    if (selectedViews.includes('task-state') && selectedViews.includes('task-board')) {
      actualCrossViewReferences.push(parsed['task-board']?.taskStateHash);
      expectedCrossViewReferences.push(observations['task-state'].hash);
    }
    if (selectedViews.includes('task-board') && selectedViews.includes('context')) {
      actualCrossViewReferences.push(parsed.context?.taskBoardHash);
      expectedCrossViewReferences.push(observations['task-board'].hash);
    }
    const publicationComplete = priorLastVerifiedObservation.valid
      && sharedUpdateComplete
      && updateIdentityObserved
      && canonical(actualReadback) === canonical(expectedReadback)
      && canonical(actualParticipatingViews) === canonical(expectedPublicationOrder)
      && canonical(actualPublicationOrder) === canonical(expectedPublicationOrder)
      && canonical(actualCrossViewReferences) === canonical(expectedCrossViewReferences)
      && deltaPaths.every((item) => allowedPaths.includes(item));
    const lastParticipatingView = expectedPublicationOrder.at(-1);
    const candidateCommitRootIdentity = publicationComplete ? observations[lastParticipatingView].hash : null;
    const facts = {
      deltaPaths, allowedPaths, actualReadback, expectedReadback, sharedUpdateComplete,
      updateIdentity: updateIdentityObserved ? updateIdentity : null,
      priorLastVerifiedObservationIdentity: priorLastVerifiedObservation.hash,
      priorLastVerifiedExpectedIdentity: priorLastVerifiedObservation.expectedHash,
      priorLastVerifiedIdentity: priorLastVerifiedObservation.valid ? priorLastVerifiedObservation.value.identity : null,
      preparedExpectedHashes: expectedReadback,
      actualParticipatingViews, expectedParticipatingViews: expectedPublicationOrder,
      actualPublicationOrder, expectedPublicationOrder,
      actualCrossViewReferences, expectedCrossViewReferences,
      commitRootIdentity: candidateCommitRootIdentity,
      lastParticipatingReadbackIdentity: observations[lastParticipatingView].hash,
      boardTaskReferenceIdentity: parsed['task-board']?.taskStateHash,
      taskStateReadbackIdentity: observations['task-state']?.hash,
      contextBoardReferenceIdentity: parsed.context?.taskBoardHash,
      taskBoardReadbackIdentity: observations['task-board']?.hash,
    };
    const publication = decide(contract, 'state-publication-recovery', facts);
    const priorLastVerifiedIdentity = priorLastVerifiedObservation.valid ? priorLastVerifiedObservation.value.identity : null;
    const commitRootIdentity = publication.result.current === true ? candidateCommitRootIdentity : null;
    const retainedLastVerifiedIdentity = publication.result.current === true ? commitRootIdentity : priorLastVerifiedIdentity;
    return deepFreeze({
      tempRootIdentity: sha256(tempRoot), empty, before, after, deltaPaths, allowedPaths, operations,
      selectedViews, expectedPublicationOrder, preparedHashes: expectedReadback, observations, facts, persistence, publication,
      priorLastVerifiedObservation, priorLastVerifiedIdentity, commitRootIdentity, retainedLastVerifiedIdentity,
    });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

export async function runWaiverPhysicalScenario(sourceRoot, scenario = {}) {
  const { tempRoot, physicalRoot } = await newPhysicalRoot('oh-my-harness-t02-waiver-');
  try {
    const contract = await loadWorkTruthContract(sourceRoot);
    const before = await manifestTree(physicalRoot);
    const waiver = {
      waiverIdentity: 'waiver-02', gate: scenario.gate ?? 'documentation-format', authorityOwner: 'main', evidenceState: 'missing-nonblocking-evidence',
      reason: 'bounded documentation variance', scope: 'T-02 report formatting', issueTime: '2026-07-19T00:00:00Z',
      expiryReevaluation: 're-evaluate before consumer handoff', residualRisk: 'format drift', downstreamImpact: 'none until revalidation',
      consumerRevalidation: 'T-03 must revalidate', status: 'recorded-not-pass',
    };
    if (scenario.omitField) delete waiver[scenario.omitField];
    const expectedBytes = jsonBytes(waiver);
    if (!scenario.omitRecord) await writeFixture(physicalRoot, 'waiver.json', expectedBytes);
    if (scenario.corruptRecord && !scenario.omitRecord) await writeFile(path.join(physicalRoot, 'waiver.json'), '{"waiverIdentity":"waiver-02"}\n');
    const observation = await observeFixture(physicalRoot, 'waiver.json', expectedBytes);
    const value = observation.value;
    const required = ['waiverIdentity', 'gate', 'authorityOwner', 'evidenceState', 'reason', 'scope', 'issueTime', 'expiryReevaluation', 'residualRisk', 'downstreamImpact', 'consumerRevalidation', 'status'];
    const facts = {
      gate: value?.gate,
      recordShapeObserved: exactKeys(value, required),
      waiverObservationIdentity: observation.hash,
      waiverExpectedIdentity: observation.expectedHash,
      waiverIdentity: nonempty(value?.waiverIdentity) ? value.waiverIdentity : null,
      authorityOwner: nonempty(value?.authorityOwner) ? value.authorityOwner : null,
      evidenceState: nonempty(value?.evidenceState) ? value.evidenceState : null,
      reason: nonempty(value?.reason) ? value.reason : null,
      scope: nonempty(value?.scope) ? value.scope : null,
      issueTime: nonempty(value?.issueTime) ? value.issueTime : null,
      expiryReevaluation: nonempty(value?.expiryReevaluation) ? value.expiryReevaluation : null,
      residualRisk: nonempty(value?.residualRisk) ? value.residualRisk : null,
      downstreamImpact: nonempty(value?.downstreamImpact) ? value.downstreamImpact : null,
      consumerRevalidation: nonempty(value?.consumerRevalidation) ? value.consumerRevalidation : null,
      status: nonempty(value?.status) ? value.status : null,
    };
    const decision = decide(contract, 'waiver', facts);
    const after = await manifestTree(physicalRoot);
    return deepFreeze({ tempRootIdentity: sha256(tempRoot), before, after, delta: manifestDelta(before, after), observation, facts, decision, manifest: after });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

export async function runRetryPhysicalScenario(sourceRoot, scenario = {}) {
  const { tempRoot, physicalRoot } = await newPhysicalRoot('oh-my-harness-t02-retry-');
  try {
    const contract = await loadWorkTruthContract(sourceRoot);
    const before = await manifestTree(physicalRoot);
    const currentCount = scenario.cumulativeCount ?? 1;
    const currentCauseCount = scenario.causeCount ?? 0;
    const identities = {
      stageIdentity: 'stage-result-qa', boundaryLineage: 'boundary-01>boundary-02', retryDomainIdentity: 'T-02-result-qa-quality',
      observableResultIdentity: 'work-truth-result-01', normalizedCauseAuthorityIdentity: 'qa-disposition-authority-01',
    };
    const prior = {
      ...identities,
      stageLocalQuality: scenario.priorStageCount ?? Math.max(currentCount - 1, 0),
      cumulativeQuality: scenario.priorCumulativeCount ?? Math.max(currentCount - 1, 0),
      operationalByCause: { 'observer-unavailable': scenario.priorCauseCount ?? Math.max(currentCauseCount - 1, 0) },
    };
    const priorBytes = jsonBytes(prior);
    const current = {
      ...identities,
      ...(scenario.identityRewrite ?? {}),
      historySnapshotIdentity: scenario.historySnapshotIdentity ?? sha256(priorBytes),
      stageLocalQuality: scenario.stageCount ?? currentCount,
      cumulativeQuality: currentCount,
      operationalByCause: { 'observer-unavailable': currentCauseCount },
      event: scenario.event ?? 'valid-quality-failure',
      counterKind: scenario.counterKind ?? 'quality',
      interventionComplete: scenario.interventionComplete ?? false,
      newEvidenceOrUserDecision: scenario.newEvidenceOrUserDecision ?? false,
      resumedBudget: scenario.resumedBudget ?? 0,
      displayName: scenario.displayName ?? 'T-02 Result QA',
      stateLabel: scenario.stateLabel ?? 'active',
    };
    const currentBytes = jsonBytes(current);
    await writeFixture(physicalRoot, 'retry-prior.json', priorBytes);
    await writeFixture(physicalRoot, 'retry-current.json', currentBytes);
    if (scenario.corruptCurrent) await writeFile(path.join(physicalRoot, 'retry-current.json'), '{"corrupt":true}\n');
    const priorObservation = await observeFixture(physicalRoot, 'retry-prior.json', priorBytes);
    const currentObservation = await observeFixture(physicalRoot, 'retry-current.json', currentBytes);
    const old = priorObservation.value;
    const next = currentObservation.value;
    const oldOperational = old?.operationalByCause?.['observer-unavailable'];
    const nextOperational = next?.operationalByCause?.['observer-unavailable'];
    const facts = {
      currentRetryObservationIdentity: currentObservation.hash,
      currentRetryExpectedIdentity: currentObservation.expectedHash,
      priorHistoryObservationIdentity: priorObservation.hash,
      historySnapshotIdentity: next?.historySnapshotIdentity,
      priorStageIdentity: old?.stageIdentity,
      currentStageIdentity: next?.stageIdentity,
      priorBoundaryLineage: old?.boundaryLineage,
      currentBoundaryLineage: next?.boundaryLineage,
      priorRetryDomainIdentity: old?.retryDomainIdentity,
      currentRetryDomainIdentity: next?.retryDomainIdentity,
      priorObservableResultIdentity: old?.observableResultIdentity,
      currentObservableResultIdentity: next?.observableResultIdentity,
      priorCauseAuthorityIdentity: old?.normalizedCauseAuthorityIdentity,
      currentCauseAuthorityIdentity: next?.normalizedCauseAuthorityIdentity,
      priorStageCount: old?.stageLocalQuality,
      currentStageCount: next?.stageLocalQuality,
      priorCumulativeCount: old?.cumulativeQuality,
      currentCumulativeCount: next?.cumulativeQuality,
      priorCauseCount: oldOperational,
      currentCauseCount: nextOperational,
      event: next?.event,
      counterKind: next?.counterKind,
      cumulativeCount: next?.cumulativeQuality,
      causeCount: nextOperational,
      interventionComplete: next?.interventionComplete,
      newEvidenceOrUserDecision: next?.newEvidenceOrUserDecision,
      resumedBudget: next?.resumedBudget,
    };
    const storage = decide(contract, 'retry-storage', facts);
    const control = decide(contract, 'retry-control', facts);
    const after = await manifestTree(physicalRoot);
    return deepFreeze({ tempRootIdentity: sha256(tempRoot), before, after, delta: manifestDelta(before, after), priorObservation, currentObservation, facts, storage, control, manifest: after });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

export async function runSubjectivePhysicalScenario(sourceRoot, scenario = {}) {
  const { tempRoot, physicalRoot } = await newPhysicalRoot('oh-my-harness-t02-subjective-');
  try {
    const contract = await loadWorkTruthContract(sourceRoot);
    const before = await manifestTree(physicalRoot);
    const dimensions = ['clarity', 'fidelity'];
    const artifact = { artifactIdentity: 'artifact-02', dimensions, primaryEvidence: ['rendered-result'], preferenceSource: 'frozen-user-rubric' };
    const artifactBytes = jsonBytes(artifact);
    const artifactHash = sha256(artifactBytes);
    const rubric = {
      rubricIdentity: 'rubric-02', frozen: scenario.rubricFrozen ?? true, standardsSufficient: scenario.standardsSufficient ?? true,
      delegatesMain: scenario.rubricDelegatesMain ?? true,
      delegationScope: scenario.missingDelegation ? null : { allowedDecisions: ['accept', 'reject'], dimensions },
      decisionOwner: 'main', strictDecisionPath: 'advisory-report>main-decision',
    };
    const rubricBytes = jsonBytes(rubric);
    const rubricHash = sha256(rubricBytes);
    const report = {
      reportIdentity: 'advisory-02', artifactHash, rubricHash, advisoryOnly: true,
      evaluatorClaimsFinal: scenario.evaluatorClaimsFinal ?? false, dimensions, findings: [],
    };
    const reportBytes = jsonBytes(report);
    const reportHash = sha256(reportBytes);
    const mainDecision = {
      decisionIdentity: 'main-decision-02', artifactHash, rubricHash, reportHash, actor: 'main',
      decision: scenario.decision ?? 'accept', unresolvedDimensions: scenario.unresolvedDimensions ? ['fidelity'] : [],
    };
    const mainDecisionBytes = jsonBytes(mainDecision);
    const fixtures = {
      'artifact.json': artifactBytes, 'rubric.json': rubricBytes, 'advisory-report.json': reportBytes, 'main-decision.json': mainDecisionBytes,
    };
    for (const [fixturePath, bytes] of Object.entries(fixtures)) if (scenario.omitFile !== fixturePath) await writeFixture(physicalRoot, fixturePath, bytes);
    if (scenario.corruptFile && fixtures[scenario.corruptFile]) await writeFile(path.join(physicalRoot, scenario.corruptFile), '{"corrupt":true}\n');
    const observations = {};
    for (const [fixturePath, bytes] of Object.entries(fixtures)) observations[fixturePath] = await observeFixture(physicalRoot, fixturePath, bytes);
    const actualArtifact = observations['artifact.json'].value;
    const actualRubric = observations['rubric.json'].value;
    const actualReport = observations['advisory-report.json'].value;
    const actualDecision = observations['main-decision.json'].value;
    const allowedDecisions = actualRubric?.delegationScope?.allowedDecisions;
    const facts = {
      standardsSufficient: actualRubric?.standardsSufficient === true,
      rubricFrozen: actualRubric?.frozen === true,
      rubricDelegatesMain: actualRubric?.delegatesMain === true,
      artifactObservationIdentity: observations['artifact.json'].hash,
      artifactExpectedIdentity: observations['artifact.json'].expectedHash,
      reportArtifactIdentity: actualReport?.artifactHash,
      decisionArtifactIdentity: actualDecision?.artifactHash,
      artifactDimensions: actualArtifact?.dimensions,
      rubricDimensions: actualRubric?.delegationScope?.dimensions,
      reportDimensions: actualReport?.dimensions,
      primaryEvidenceObserved: nonempty(actualArtifact?.primaryEvidence),
      preferenceSourceObserved: nonempty(actualArtifact?.preferenceSource),
      decisionOwnerObserved: actualRubric?.decisionOwner === 'main' && actualDecision?.actor === 'main',
      rubricObservationIdentity: observations['rubric.json'].hash,
      rubricExpectedIdentity: observations['rubric.json'].expectedHash,
      reportRubricIdentity: actualReport?.rubricHash,
      decisionRubricIdentity: actualDecision?.rubricHash,
      delegationScopeObserved: plainObject(actualRubric?.delegationScope) && nonempty(allowedDecisions) && nonempty(actualRubric.delegationScope.dimensions),
      advisoryReportObservationIdentity: observations['advisory-report.json'].hash,
      advisoryReportExpectedIdentity: observations['advisory-report.json'].expectedHash,
      decisionReportIdentity: actualDecision?.reportHash,
      strictDecisionPathObserved: nonempty(actualRubric?.strictDecisionPath),
      mainDecisionObservationIdentity: observations['main-decision.json'].hash,
      mainDecisionExpectedIdentity: observations['main-decision.json'].expectedHash,
      mainDecisionWithinDelegation: Array.isArray(allowedDecisions) && allowedDecisions.includes(actualDecision?.decision),
      evaluatorAdvisoryOnly: actualReport?.advisoryOnly === true,
      unresolvedDimensions: !Array.isArray(actualDecision?.unresolvedDimensions) || actualDecision.unresolvedDimensions.length > 0,
      evaluatorClaimsFinal: actualReport?.evaluatorClaimsFinal === true,
    };
    const decision = decide(contract, 'subjective-authority', facts);
    const after = await manifestTree(physicalRoot);
    return deepFreeze({ tempRootIdentity: sha256(tempRoot), before, after, delta: manifestDelta(before, after), observations, facts, decision, manifest: after });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

export async function hashRegistryProfiles(registry, sourceRoot) {
  const result = [];
  for (const capability of registry) {
    const bytes = await readFile(path.join(sourceRoot, capability.profile));
    const sourceHash = sha256(bytes);
    if (sourceHash !== capability.sourceHash) fail('REGISTRY_PROFILE_STALE', `${capability.profile}: current bytes differ from registry`);
    result.push({ ...capability, sourceHash });
  }
  return deepFreeze(result);
}

export async function evaluateTask3(contract, registry, profileRoot, facts) {
  const verifiedRegistry = await hashRegistryProfiles(registry, profileRoot);
  const currentness = decide(contract, 'task3-currentness', facts.currentness);
  const topology = decide(contract, 'topology', { writePaths: facts.writePaths });
  let excludedCapability = null;
  if (Object.hasOwn(topology.result, 'excludeCapability')) {
    const matches = verifiedRegistry.filter(({ id }) => id === topology.result.excludeCapability);
    if (matches.length !== 1) fail('TOPOLOGY_REGISTRY_RESOLUTION', `expected one source-registry match for ${topology.result.excludeCapability}`);
    [excludedCapability] = matches;
  }
  const selected = [];
  if (topology.result.mode === 'verification-only') {
    if (!Array.isArray(topology.result.selectedCapabilities)) fail('TOPOLOGY_REGISTRY_RESOLUTION', 'verification-only result lacks selectedCapabilities');
    for (const capabilityId of topology.result.selectedCapabilities) {
      const matches = verifiedRegistry.filter(({ id }) => id === capabilityId);
      if (matches.length !== 1) fail('TOPOLOGY_REGISTRY_RESOLUTION', `expected one source-registry match for ${capabilityId}`);
      if (capabilityId === excludedCapability.id) fail('TOPOLOGY_REGISTRY_RESOLUTION', `${capabilityId} is both selected and excluded`);
      selected.push(capabilityId);
    }
  }
  const inputDigest = sha256(canonical({
    contractDigest: contract.contractDigest,
    registry: verifiedRegistry,
    currentness: facts.currentness,
    remainingActions: facts.remainingActions,
    writePaths: facts.writePaths,
  }));
  return deepFreeze({
    registry: verifiedRegistry,
    registryDigest: sha256(canonical(verifiedRegistry)),
    currentness,
    topology,
    excludedCapability,
    selected,
    inputDigest,
    mayWrite: false,
  });
}

export async function assertZeroWrite(operation) {
  const root = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t02-zero-write-'));
  try {
    await writeFile(path.join(root, 'sentinel.txt'), 'unchanged\n');
    const before = await manifestTree(root);
    const value = await operation(root);
    const after = await manifestTree(root);
    assert.deepEqual(after, before, 'verification-only operation changed the filesystem');
    return deepFreeze({ value, before, after, digest: sha256(canonical(before)) });
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}
