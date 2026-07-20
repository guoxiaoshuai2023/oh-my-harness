import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, realpath } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const CAPABILITIES = Object.freeze([
  { id: 'requirements-author', name: 'oh_my_harness_requirements_author', mission: 'Produces one source-backed Requirements candidate under a main-thread packet.', profile: '.codex/agents/harness-requirements-author.toml', kind: 'producer' },
  { id: 'requirements-evaluator', name: 'oh_my_harness_requirements_evaluator', mission: 'Writes one strict independent Requirements review report from original sources.', profile: '.codex/agents/harness-requirements-evaluator.toml', kind: 'evaluator' },
  { id: 'planner', name: 'oh_my_harness_planner', mission: 'Produces one source-backed, acceptance-closed Task Plan candidate under a main-thread packet.', profile: '.codex/agents/harness-planner.toml', kind: 'producer' },
  { id: 'plan-evaluator', name: 'oh_my_harness_plan_evaluator', mission: 'Writes one strict independent Task Plan review report from exact primary evidence.', profile: '.codex/agents/harness-plan-evaluator.toml', kind: 'evaluator' },
  { id: 'solution-designer', name: 'oh_my_harness_solution_designer', mission: 'Produces one concrete Technical Solution Design candidate for one frozen Task.', profile: '.codex/agents/harness-solution-designer.toml', kind: 'producer' },
  { id: 'solution-evaluator', name: 'oh_my_harness_solution_evaluator', mission: 'Writes one strict independent Technical Solution Design review report.', profile: '.codex/agents/harness-solution-evaluator.toml', kind: 'evaluator' },
  { id: 'executor', name: 'oh_my_harness_executor', mission: 'Executes exactly one Frozen Plan Task under one main-issued attempt Boundary.', profile: '.codex/agents/harness-executor.toml', kind: 'producer' },
  { id: 'result-evaluator', name: 'oh_my_harness_result_evaluator', mission: 'Writes one strict producer-independent QA report for an actual bounded result.', profile: '.codex/agents/harness-result-evaluator.toml', kind: 'evaluator' },
  { id: 'orchestration-reviewer', name: 'oh_my_harness_orchestration_reviewer', mission: 'Writes one strict advisory review of bounded orchestration governance.', profile: '.codex/agents/harness-orchestration-reviewer.toml', kind: 'reviewer' },
]);

export const ORIGINAL_SIX = Object.freeze([
  'planner',
  'plan-evaluator',
  'solution-designer',
  'solution-evaluator',
  'executor',
  'result-evaluator',
]);

export const REPORT_CAPABLE = Object.freeze([
  'requirements-evaluator',
  'plan-evaluator',
  'solution-evaluator',
  'result-evaluator',
  'orchestration-reviewer',
]);

export const MANDATORY_GATES = Object.freeze([
  'safety',
  'semantic',
  'stable-boundary',
  'current-state',
  'independence',
  'retry',
  'validation',
]);

const STRING_ARRAY = (value) => Array.isArray(value) && value.every((item) => typeof item === 'string');

export const SELECTION_FACT_SCHEMA = Object.freeze({
  requiredCapabilities: STRING_ARRAY,
  lowDirect: (value) => typeof value === 'boolean',
  artifactEvents: STRING_ARRAY,
  validation: STRING_ARRAY,
  semanticRisk: (value) => ['LOW', 'MEDIUM', 'HIGH'].includes(value),
  triggeredGates: (value) => STRING_ARRAY(value) && value.every((gate) => MANDATORY_GATES.includes(gate)),
  gateRecords: (value) => Array.isArray(value) && value.every((record) => (
    record
    && Object.getPrototypeOf(record) === Object.prototype
    && Object.keys(record).every((key) => ['gate', 'owner', 'evidence', 'decision'].includes(key))
    && typeof record.gate === 'string'
    && ['owner', 'evidence', 'decision'].every((key) => typeof record[key] === 'string')
  )),
});

export const ACTIVE_SOURCE_PATHS = Object.freeze([
  'AGENTS.md',
  'README.md',
  '.codex/config.example.toml',
  ...CAPABILITIES.map(({ profile }) => profile),
  'task-docs/_harness/adaptive-orchestration-protocol.md',
  'task-docs/_harness/semantic-fidelity-protocol.md',
  'task-docs/_harness/run-directory-protocol.md',
  'task-docs/_harness/evaluator-calibration.md',
  'task-docs/_harness/adaptive-orchestration-acceptance-matrix.md',
  'task-docs/_harness/templates/task-packet-template.md',
  'task-docs/_harness/templates/orchestration-prompt-template.md',
  'task-docs/_harness/templates/technical-solution-design-template.md',
  'task-docs/_harness/templates/governance-review-template.md',
  'docs/architecture.md',
  'docs/adapters/codex-subagents.md',
  'examples/minimal-router/AGENTS.md',
]);

export function allSubsets(values) {
  assert.ok(Array.isArray(values), 'subset values must come from a verified source registry');
  const result = [];
  for (let mask = 0; mask < 2 ** values.length; mask += 1) {
    result.push(values.filter((_, index) => (mask & (1 << index)) !== 0));
  }
  return result;
}

export function validateSelectionFacts(facts) {
  assert.ok(facts && Object.getPrototypeOf(facts) === Object.prototype, 'selection facts must be a plain object');
  for (const key of Object.keys(facts)) {
    assert.ok(Object.hasOwn(SELECTION_FACT_SCHEMA, key), 'unexpected selection fact: ' + key);
    assert.ok(SELECTION_FACT_SCHEMA[key](facts[key]), 'invalid selection fact: ' + key);
  }
  return true;
}

function validateCapabilityRegistry(sourceCapabilities) {
  assert.ok(Array.isArray(sourceCapabilities), 'physical capability registry is required');
  assert.equal(sourceCapabilities.length, CAPABILITIES.length, 'source capability count');
  for (const capability of sourceCapabilities) {
    assert.ok(typeof capability.id === 'string' && capability.id.length > 0, 'capability ID');
    assert.ok(typeof capability.name === 'string' && capability.name.length > 0, capability.id);
    assert.ok(typeof capability.mission === 'string' && capability.mission.length > 0, capability.id);
    assert.ok(typeof capability.profile === 'string' && capability.profile.length > 0, capability.id);
    assert.match(capability.sourceHash, /^[a-f0-9]{64}$/, capability.profile);
  }
  assert.equal(new Set(sourceCapabilities.map(({ id }) => id)).size, CAPABILITIES.length, 'duplicate source capability ID');
  assert.equal(new Set(sourceCapabilities.map(({ name }) => name)).size, CAPABILITIES.length, 'duplicate source capability identity');
  assert.equal(new Set(sourceCapabilities.map(({ mission }) => mission)).size, CAPABILITIES.length, 'duplicate source capability mission');
  return true;
}

function validateSourceCapabilityRegistry(sourceCapabilities) {
  validateCapabilityRegistry(sourceCapabilities);
  const expected = new Map(CAPABILITIES.map((capability) => [capability.id, capability]));
  for (const capability of sourceCapabilities) {
    const expectedCapability = expected.get(capability.id);
    assert.ok(expectedCapability, 'unknown source capability: ' + capability.id);
    assert.equal(capability.name, expectedCapability.name, capability.profile);
    assert.equal(capability.mission, expectedCapability.mission, capability.profile);
    assert.equal(capability.profile, expectedCapability.profile, capability.id);
  }
  return true;
}

export function selectCapabilities(facts, sourceCapabilities) {
  validateSelectionFacts(facts);
  validateCapabilityRegistry(sourceCapabilities);
  const selected = [...new Set(facts.requiredCapabilities ?? [])];
  const known = new Set(sourceCapabilities.map(({ id }) => id));
  for (const capability of selected) assert.ok(known.has(capability), 'unknown capability: ' + capability);

  if (facts.lowDirect) {
    assert.deepEqual(selected, [], 'LOW direct work selects no capability');
    assert.deepEqual(facts.artifactEvents ?? [], [], 'LOW direct work creates no governance artifact');
    assert.ok((facts.validation ?? []).length > 0, 'LOW direct work still has proportional validation');
  }

  const gateRecords = new Map((facts.gateRecords ?? []).map((record) => [record.gate, record]));
  for (const gate of facts.triggeredGates ?? []) {
    const record = gateRecords.get(gate);
    assert.ok(record, 'dropped triggered gate: ' + gate);
    assert.ok(record.owner && record.evidence && record.decision, 'unclosed triggered gate: ' + gate);
  }

  return new Set(selected);
}

export function dependencyOrder(selected, edges) {
  const nodes = new Set(selected);
  const indegree = new Map([...nodes].map((node) => [node, 0]));
  const outgoing = new Map([...nodes].map((node) => [node, []]));
  for (const [before, after] of edges) {
    if (!nodes.has(before) || !nodes.has(after)) continue;
    outgoing.get(before).push(after);
    indegree.set(after, indegree.get(after) + 1);
  }
  const ready = [...nodes].filter((node) => indegree.get(node) === 0).sort();
  const order = [];
  while (ready.length > 0) {
    const node = ready.shift();
    order.push(node);
    for (const next of outgoing.get(node).sort()) {
      indegree.set(next, indegree.get(next) - 1);
      if (indegree.get(next) === 0) ready.push(next);
    }
    ready.sort();
  }
  assert.equal(order.length, nodes.size, 'dependency cycle');
  return order;
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function validateLifecycle(trace) {
  const expected = [
    ['main', 'select-producer'],
    ['main', 'issue-producer-packet'],
    ['main', 'launch-producer'],
    ['producer', 'write-candidate'],
    ['main', 'verify-candidate'],
    ['main', 'select-evaluator'],
    ['main', 'issue-evaluator-packet'],
    ['main', 'launch-evaluator'],
    ['evaluator', 'inspect-primary-evidence'],
    ['evaluator', 'write-report'],
    ['main', 'verify-report'],
    ['main', 'disposition-findings'],
    ['main', 'transition'],
    ['main', 'accept'],
  ];
  assert.deepEqual(trace.events.map(({ actor, action }) => [actor, action]), expected);
  assert.ok(trace.candidate.path && trace.candidate.identity && trace.candidate.hash);
  assert.ok(trace.report.path && trace.report.identity && trace.report.hash);
  assert.notEqual(trace.candidate.path, trace.report.path);
  assert.equal(trace.candidate.pathAbsentAtLaunch, true);
  assert.equal(trace.report.pathAbsentAtLaunch, true);
  assert.deepEqual(trace.producerWrites, [trace.candidate.path]);
  assert.deepEqual(trace.evaluatorWrites, [trace.report.path]);
  assert.equal(trace.candidate.hash, sha256(trace.candidate.bytes));
  assert.equal(trace.report.hash, sha256(trace.report.bytes));
  assert.equal(trace.report.targetHash, trace.candidate.hash);
  assert.equal(trace.targetUnchanged, true);
  assert.equal(trace.upstreamUnchanged, true);
  assert.equal(trace.mainVerifiedCandidate, true);
  assert.equal(trace.mainVerifiedReport, true);
  assert.equal(trace.mainDisposed, true);
  assert.equal(trace.report.completion, 'complete');
  assert.match(trace.report.verdict, /^(PASS|FAIL)$/);
  return true;
}

export function classifyReviewAttempt(attempt) {
  if (attempt.targetMutation || attempt.upstreamMutation || attempt.extraWrite) return 'REVIEW_INVALID_STOP';
  if (attempt.bindingMismatch) return 'REVIEW_INVALID_STOP';
  if (attempt.collision || attempt.missingParent || attempt.directoryPreparationFailure || attempt.permissionFailure || attempt.runtimeFailure || attempt.missingReportAfterTerminal) return 'OPERATIONAL_INCOMPLETE';
  if (attempt.completion !== 'complete' || !/^(PASS|FAIL)$/.test(attempt.verdict ?? '') || attempt.missingRequiredFields) return 'REPORT_INCOMPLETE_INVALID';
  return attempt.verdict === 'PASS' ? 'QUALITY_PASS_EVIDENCE' : 'QUALITY_FAIL_EVIDENCE';
}

export function reviewCanUnlock(attempt) {
  return classifyReviewAttempt(attempt) === 'QUALITY_PASS_EVIDENCE' && attempt.mainVerified === true && attempt.mainDisposed === true;
}

export function validateRecovery(previous, next) {
  assert.notEqual(next.invocation, previous.invocation, 'retry needs a new invocation');
  assert.notEqual(next.reportPath, previous.reportPath, 'retry needs a new report path');
  if (previous.permissionFailure) assert.equal(next.permissionExpansionConfirmed, true, 'permission expansion needs explicit confirmation');
  assert.equal(next.overwriteCollision, false, 'collisions are never overwritten');
  return true;
}

export function validatePeerMessage(message) {
  const allowed = new Set(['question', 'clarification', 'artifact-ready', 'evidence-reference']);
  assert.ok(allowed.has(message.kind), 'peer message cannot carry authority: ' + message.kind);
  return true;
}

export function validateWriterIntervals(intervals) {
  const writers = intervals.filter(({ writes }) => writes);
  for (let i = 0; i < writers.length; i += 1) {
    for (let j = i + 1; j < writers.length; j += 1) {
      const overlap = writers[i].start < writers[j].end && writers[j].start < writers[i].end;
      assert.equal(overlap, false, 'unisolated writers must be serialized');
    }
  }
  return true;
}

export async function readText(relativePath) {
  return readFile(path.join(ROOT, relativePath), 'utf8');
}

export async function readProfile(capability) {
  const content = await readText(capability.profile);
  const value = (key) => content.match(new RegExp('^' + key + ' = "([^"]*)"$', 'm'))?.[1];
  const instructions = content.match(/developer_instructions = """([\s\S]*?)"""/m)?.[1] ?? '';
  return {
    ...capability,
    content,
    parsed: {
      name: value('name'),
      description: value('description'),
      sandbox_mode: value('sandbox_mode'),
      developer_instructions: instructions,
    },
  };
}

export async function readAllProfiles() {
  return Promise.all(CAPABILITIES.map(readProfile));
}

export async function readSourceCapabilityRegistry() {
  const profiles = await readAllProfiles();
  const sourceCapabilities = profiles.map((profile) => {
    assert.equal(profile.parsed.name, profile.name, profile.profile);
    assert.equal(profile.parsed.description, profile.mission, profile.profile);
    return Object.freeze({
      id: profile.id,
      name: profile.parsed.name,
      mission: profile.parsed.description,
      profile: profile.profile,
      kind: profile.kind,
      sourceHash: sha256(profile.content),
    });
  });
  validateSourceCapabilityRegistry(sourceCapabilities);
  return Object.freeze(sourceCapabilities);
}

function installedProfile(content, entry, calibration) {
  const value = (key) => content.match(new RegExp('^' + key + ' = "([^"]*)"$', 'm'))?.[1];
  const instructions = content.match(/developer_instructions = """([\s\S]*?)"""/m)?.[1] ?? '';
  const id = entry.assetId.replace(/^agent\//, '');
  const reportCapable = REPORT_CAPABLE.includes(id);
  const solution = id === 'solution-designer' || id === 'solution-evaluator';
  return Object.freeze({
    id,
    name: value('name'),
    mission: value('description'),
    profile: entry.destinationPath,
    kind: reportCapable ? (id === 'orchestration-reviewer' ? 'reviewer' : 'evaluator') : 'producer',
    sourceHash: sha256(content),
    physical: Object.freeze({
      assetId: entry.assetId,
      sourcePath: entry.sourcePath,
      destinationPath: entry.destinationPath,
      destinationSha256: entry.destinationSha256,
    }),
    controls: Object.freeze({
      hardNoFanOut: instructions.includes('must not create, invoke, launch, delegate to, or reconfigure another agent'),
      reportOnly: !reportCapable || (instructions.includes('logical report-only write boundary plus post-execution verification')
        && instructions.includes('Write exactly one invocation-specific')),
      strictVerdict: !reportCapable || instructions.includes('strict PASS or FAIL'),
      primaryEvidence: !reportCapable || instructions.includes('primary evidence'),
      solutionTechnicalDesignOnly: !solution || (instructions.includes('Technical Solution Design')
        && instructions.includes('Boundary, Contract, permission artifact')),
      mainOnlyBoundary: instructions.includes('main-issued') || instructions.includes('main-thread packet'),
    }),
    calibration: Object.freeze({
      path: calibration.destinationPath,
      sha256: calibration.sha256,
      bound: !reportCapable || (content.includes(`path \`${calibration.destinationPath}\``)
        && content.includes(`SHA-256 \`${calibration.sha256}\``)),
    }),
  });
}

export async function readInstalledCapabilityRegistry({ releaseRoot, inventory, forbiddenRoots } = {}) {
  if (typeof releaseRoot !== 'string' || !releaseRoot) throw new Error('INSTALLED_CAPABILITY_ROOT_REQUIRED: releaseRoot is mandatory');
  if (!inventory || typeof inventory.readDestination !== 'function' || !inventory.inventoryDocument) {
    throw new Error('INSTALLED_CAPABILITY_INVENTORY_REQUIRED: physical inventory handle is mandatory');
  }
  if (!Array.isArray(forbiddenRoots) || forbiddenRoots.length === 0) {
    throw new Error('INSTALLED_CAPABILITY_FORBIDDEN_ROOTS_REQUIRED: forbiddenRoots are mandatory');
  }
  const actualRoot = await realpath(path.resolve(releaseRoot));
  if (actualRoot !== inventory.releaseRoot) throw new Error('INSTALLED_CAPABILITY_ROOT_MISMATCH: release root differs from physical inventory');
  const actualForbidden = await Promise.all(forbiddenRoots.map((item) => realpath(path.resolve(item))));
  if (JSON.stringify(actualForbidden) !== JSON.stringify(inventory.forbiddenRoots)) {
    throw new Error('INSTALLED_CAPABILITY_FORBIDDEN_ROOTS_MISMATCH: forbidden roots differ from physical inventory');
  }
  const calibrationEntry = inventory.bySourcePath.get('task-docs/_harness/evaluator-calibration.md');
  if (!calibrationEntry) throw new Error('INSTALLED_CAPABILITY_CALIBRATION_MISSING: canonical calibration mapping is absent');
  const calibrationRead = await inventory.readDestination(calibrationEntry);
  const calibration = Object.freeze({ destinationPath: calibrationEntry.destinationPath, sha256: calibrationRead.hash });
  const profileEntries = inventory.inventoryDocument.requiredFiles
    .filter(({ kind }) => kind === 'agent-profile')
    .sort((left, right) => left.assetId.localeCompare(right.assetId));
  if (profileEntries.length !== CAPABILITIES.length) throw new Error('INSTALLED_CAPABILITY_SET_MISMATCH: expected nine physical profiles');
  const profiles = [];
  for (const entry of profileEntries) {
    if (!/^agent\/[a-z-]+$/.test(entry.assetId)) throw new Error('INSTALLED_CAPABILITY_IDENTITY_INVALID: ' + entry.assetId);
    const observed = await inventory.readDestination(entry);
    profiles.push(installedProfile(observed.text, entry, calibration));
  }
  validateCapabilityRegistry(profiles);
  return Object.freeze(profiles);
}

export function completeGateRecords(gates = MANDATORY_GATES) {
  return gates.map((gate) => ({ gate, owner: 'main', evidence: gate + '-evidence', decision: gate + '-decision' }));
}
