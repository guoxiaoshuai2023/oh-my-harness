import assert from 'node:assert/strict';
import { mkdir, mkdtemp, readFile, rm, symlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  ROOT,
  WORK_TRUTH_PATHS,
  WorkTruthContractError,
  decide,
  loadWorkTruthContract,
  manifestTree,
  project,
  rewriteRecord,
  runCompletionPhysicalScenario,
  runPublicationPhysicalScenario,
  runRetryPhysicalScenario,
  runWaiverPhysicalScenario,
  validateEnum,
  withTempContractRoot,
} from '../support/t02-work-truth-fixtures.mjs';

const EXPECTED_STATES = ['pending', 'active', 'blocked', 'exhausted', 'completed', 'superseded', 'cancelled'];
const EXPECTED_EDGES = new Set([
  'pending->active', 'pending->blocked', 'pending->cancelled', 'pending->superseded',
  'active->blocked', 'active->completed', 'active->exhausted', 'active->cancelled', 'active->superseded',
  'blocked->active', 'blocked->exhausted', 'blocked->cancelled', 'blocked->superseded',
  'exhausted->active', 'exhausted->cancelled', 'exhausted->superseded',
  'completed->active', 'completed->superseded',
]);
const EXPECTED_COMPACTION = [
  'failures',
  'findingValidityAndDisposition',
  'stageLocalQualityCounter',
  'cumulativeQualityCounter',
  'operationalCounter',
  'exhaustionInterventionStrategyResumeBudget',
  'waivers',
  'rejectedDecisions',
  'pendingDecisions',
  'blockersCancellationSupersession',
  'authorityAndEvidenceIdentities',
  'readbackObservationQaAcceptedStateIdentities',
];

function errorCode(code) {
  return (error) => error instanceof WorkTruthContractError && error.code === code;
}

const DURABLE_VIEW_PATHS = Object.freeze({
  'task-state': 'tasks/T-02/TASK_STATE.json',
  'task-board': 'context/TASK_BOARD.json',
  context: 'context/LIVING_CONTEXT.json',
});

const PERSISTENCE_CASES = Object.freeze([
  ['context only', { continuityRisk: true, multiTaskRisk: false, detailRisk: false }, ['context']],
  ['board only', { continuityRisk: false, multiTaskRisk: true, detailRisk: false }, ['task-board']],
  ['task only', { continuityRisk: false, multiTaskRisk: false, detailRisk: true }, ['task-state']],
  ['context and board', { continuityRisk: true, multiTaskRisk: true, detailRisk: false }, ['task-board', 'context']],
  ['context and task', { continuityRisk: true, multiTaskRisk: false, detailRisk: true }, ['task-state', 'context']],
  ['board and task', { continuityRisk: false, multiTaskRisk: true, detailRisk: true }, ['task-state', 'task-board']],
  ['all three', { continuityRisk: true, multiTaskRisk: true, detailRisk: true }, ['task-state', 'task-board', 'context']],
]);

async function assertPhysicalPersistenceCase(label, persistenceFacts, expectedViews) {
  const physical = await runPublicationPhysicalScenario(ROOT, { persistenceFacts });
  assert.deepEqual(physical.operations.map(({ view }) => view), expectedViews, `${label}: operation order`);
  assert.deepEqual([...physical.deltaPaths].sort(), expectedViews.map((view) => DURABLE_VIEW_PATHS[view]).sort(), `${label}: exact delta`);
  const durableFiles = physical.after.filter(({ type, path: item }) => type === 'file' && Object.values(DURABLE_VIEW_PATHS).includes(item)).map(({ path: item }) => item).sort();
  assert.deepEqual(durableFiles, expectedViews.map((view) => DURABLE_VIEW_PATHS[view]).sort(), `${label}: no nonparticipant`);
  assert.equal(physical.publication.result.code, 'PUBLICATION_CURRENT', label);
  assert.equal(physical.commitRootIdentity, physical.observations[expectedViews.at(-1)].hash, `${label}: physical commit root`);
}

for (const [label, persistenceFacts, expectedViews] of PERSISTENCE_CASES) {
  test(`post-intervention expected red: source-selected publication ${label}`, async () => {
    await assertPhysicalPersistenceCase(label, persistenceFacts, expectedViews);
  });
}

test('post-intervention expected red: inline persistence creates zero durable artifact', async () => {
  const physical = await runPublicationPhysicalScenario(ROOT, {
    persistenceFacts: { continuityRisk: false, multiTaskRisk: false, detailRisk: false },
  });
  assert.deepEqual(physical.before, []);
  assert.deepEqual(physical.after, []);
  assert.deepEqual(physical.deltaPaths, []);
  assert.deepEqual(physical.operations, []);
  assert.equal(physical.publication, null);
});

test('post-intervention expected red: missing physical prior recovery cannot retain a literal', async () => {
  const physical = await runPublicationPhysicalScenario(ROOT, {
    persistenceFacts: { continuityRisk: false, multiTaskRisk: false, detailRisk: true },
    publishCount: 0,
    omitLastVerified: true,
  });
  assert.equal(physical.priorLastVerifiedObservation.present, false);
  assert.equal(physical.retainedLastVerifiedIdentity, null);
  assert.equal(physical.publication.result.current, false);
});

test('post-intervention expected red: corrupt physical prior recovery cannot retain a literal', async () => {
  const physical = await runPublicationPhysicalScenario(ROOT, {
    persistenceFacts: { continuityRisk: false, multiTaskRisk: false, detailRisk: true },
    publishCount: 0,
    corruptLastVerified: true,
  });
  assert.equal(physical.priorLastVerifiedObservation.present, true);
  assert.equal(physical.priorLastVerifiedObservation.value, null);
  assert.equal(physical.retainedLastVerifiedIdentity, null);
  assert.equal(physical.publication.result.current, false);
});

test('post-intervention expected red: publication failures preserve only an observed prior identity', async () => {
  const persistenceFacts = { continuityRisk: true, multiTaskRisk: true, detailRisk: true };
  const scenarios = [
    ['wrong order', { persistenceFacts, order: ['context', 'task-board', 'task-state'] }, 'PARTIAL_PUBLICATION_STOP'],
    ['missing participant', { persistenceFacts, publishCount: 2 }, 'PARTIAL_PUBLICATION_STOP'],
    ['extra participant', { persistenceFacts: { continuityRisk: false, multiTaskRisk: false, detailRisk: true }, extraParticipant: 'context' }, 'PROTECTED_OR_EXTRA_DELTA_STOP'],
    ['partial write', { persistenceFacts, publishCount: 1 }, 'PARTIAL_PUBLICATION_STOP'],
    ['protected delta', { persistenceFacts, protectedMutation: true }, 'PROTECTED_OR_EXTRA_DELTA_STOP'],
    ['corrupt readback', { persistenceFacts, corruptView: 'task-board' }, 'PARTIAL_PUBLICATION_STOP'],
    ['cross-view conflict', { persistenceFacts, conflict: true }, 'PARTIAL_PUBLICATION_STOP'],
  ];
  const observed = await Promise.all(scenarios.map(async ([label, scenario, code]) => {
    const physical = await runPublicationPhysicalScenario(ROOT, scenario);
    return {
      label,
      code: physical.publication.result.code,
      expectedCode: code,
      priorObserved: physical.priorLastVerifiedObservation?.valid === true,
      retainedMatchesObserved: physical.retainedLastVerifiedIdentity === physical.priorLastVerifiedObservation?.value?.identity,
    };
  }));
  assert.deepEqual(observed, observed.map(({ label, expectedCode }) => ({
    label, code: expectedCode, expectedCode, priorObserved: true, retainedMatchesObserved: true,
  })));
});

test('post-intervention expected red: source publication-order reversal changes the physical path', async () => {
  await withTempContractRoot(ROOT, async (root) => {
    const reversedOrder = ['context', 'task-board', 'task-state'];
    await rewriteRecord(root, 'publication.current', (record) => ({ ...record, result: { ...record.result, publicationOrder: reversedOrder } }));
    const physical = await runPublicationPhysicalScenario(root, {
      persistenceFacts: { continuityRisk: true, multiTaskRisk: true, detailRisk: true },
    });
    assert.deepEqual(physical.operations.map(({ view }) => view), reversedOrder);
    assert.notDeepEqual(physical.operations.map(({ view }) => view), ['task-state', 'task-board', 'context']);
  });
});

test('post-intervention expected red: source persistence reversal changes the physical view set', async () => {
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'persistence.task', (record) => ({ ...record, result: { representations: ['context'], createRunTree: true } }));
    const physical = await runPublicationPhysicalScenario(root, {
      persistenceFacts: { continuityRisk: false, multiTaskRisk: false, detailRisk: true },
    });
    assert.deepEqual(physical.operations.map(({ view }) => view), ['context']);
    assert.notDeepEqual(physical.operations.map(({ view }) => view), ['task-state']);
  });
});

test('P1-T02-QA-002 expected red: completion cannot pass from an edge without observed guards', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  assert.equal(decide(contract, 'state-transition', { edge: 'active->completed' }).result.allowed, false);
});

test('P1-T02-QA-003 expected red: an empty physical root cannot become current from publication claims', async () => {
  const physicalRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t02-publication-red-'));
  try {
    const before = await manifestTree(physicalRoot);
    const contract = await loadWorkTruthContract(ROOT);
    const publication = decide(contract, 'state-publication-recovery', {
      deltaPaths: [],
      allowedPaths: [],
      actualReadback: 'claimed',
      expectedReadback: 'claimed',
      sharedUpdateComplete: true,
    });
    const after = await manifestTree(physicalRoot);
    assert.deepEqual(before, after);
    assert.equal(publication.result.current, false);
  } finally {
    await rm(physicalRoot, { recursive: true, force: true });
  }
});

test('P1-T02-QA-004 expected red: waiver booleans cannot replace a complete physical record', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  assert.equal(decide(contract, 'waiver', {
    gate: 'documentation-format',
    completeRecord: true,
    authorityPresent: true,
  }).result.valid, false);
});

test('P1-T02-QA-005 expected red: caller-reset counts cannot obtain first-failure retry behavior', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  assert.notEqual(decide(contract, 'retry-control', {
    counterKind: 'quality',
    cumulativeCount: 1,
  }).result.action, 'focused-revision');
});

test('record-bearing source set is exact, explicit-root, deeply frozen and provenance-bound', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  assert.deepEqual(contract.paths, WORK_TRUTH_PATHS);
  assert.match(contract.contractDigest, /^[a-f0-9]{64}$/);
  assert.equal(Object.isFrozen(contract), true);
  assert.equal(Object.isFrozen(contract.records), true);
  assert.equal(Object.isFrozen(contract.records[0].value), true);
  assert.equal(Object.isFrozen(contract.records[0].provenance), true);
  assert.equal(Object.isFrozen(contract.byId), true);
  assert.equal(contract.byId.set, undefined);
  assert.equal(Object.isFrozen(contract.byId.get('contract.manifest').value), true);
  assert.equal(Object.keys(contract.sourceHashes).length, WORK_TRUTH_PATHS.length);
  assert.ok(contract.records.every(({ path: sourcePath, provenance }) => (
    Object.values(provenance).every(({ path: provenancePath, sourceHash, line, jsonPointer }) => (
      provenancePath === sourcePath
      && sourceHash === contract.sourceHashes[sourcePath]
      && Number.isInteger(line)
      && jsonPointer.startsWith('/')
    ))
  )));
  await assert.rejects(loadWorkTruthContract(), errorCode('CONTRACT_ROOT_REQUIRED'));
});

test('loader rejects missing blocks, fallback, symlink substitution, duplicate keys, unknown fields and unsupported versions', async () => {
  await withTempContractRoot(ROOT, async (root) => {
    await import('node:fs/promises').then(({ rm }) => rm(path.join(root, WORK_TRUTH_PATHS[0])));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_PATH_MISSING'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    const sourcePath = path.join(root, WORK_TRUTH_PATHS[0]);
    const source = await readFile(sourcePath, 'utf8');
    await import('node:fs/promises').then(({ writeFile }) => writeFile(sourcePath, source.replace('oh-my-harness-work-truth:v1:start', 'record-block-removed')));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_BLOCK_MISSING'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'persistence.inline', () => null);
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MANIFEST_IDS'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    const target = path.join(root, WORK_TRUTH_PATHS[0]);
    const saved = `${target}.saved`;
    await mkdir(path.dirname(saved), { recursive: true });
    const bytes = await readFile(target);
    await import('node:fs/promises').then(({ rename, writeFile }) => rename(target, saved).then(() => writeFile(target, bytes)));
    await import('node:fs/promises').then(({ rm }) => rm(target).then(() => symlink(saved, target)));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_PATH_SYMLINK'));
  });
  for (const [mutation, code] of [
    [(record) => ({ ...record, unexpected: true }), 'CONTRACT_UNKNOWN_OR_MISSING_KEY'],
    [(record) => ({ ...record, version: 2 }), 'CONTRACT_VERSION'],
    [(record) => ({ ...record, sourceOwner: WORK_TRUTH_PATHS[0] }), 'CONTRACT_SOURCE_OWNER'],
    [(record) => ({ ...record, priority: -1 }), 'CONTRACT_PRIORITY'],
    [(record) => ({ ...record, when: { op: 'domainDefault', fact: 'continuityRisk' } }), 'CONTRACT_UNKNOWN_OPERATOR'],
  ]) {
    await withTempContractRoot(ROOT, async (root) => {
      await rewriteRecord(root, 'persistence.inline', mutation);
      await assert.rejects(loadWorkTruthContract(root), errorCode(code));
    });
  }
  await withTempContractRoot(ROOT, async (root) => {
    const sourcePath = path.join(root, 'task-docs/_harness/run-directory-protocol.md');
    const source = await readFile(sourcePath, 'utf8');
    const duplicate = source.replace('"id":"persistence.inline"', '"id":"persistence.inline","id":"persistence.inline"');
    await import('node:fs/promises').then(({ writeFile }) => writeFile(sourcePath, duplicate));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_DUPLICATE_KEY'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    const sourcePath = path.join(root, 'task-docs/_harness/run-directory-protocol.md');
    const source = await readFile(sourcePath, 'utf8');
    await import('node:fs/promises').then(({ writeFile }) => writeFile(sourcePath, source.replace('"domain":"persistence"', '"domain":')));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MALFORMED_JSON'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'interface.context', (record) => ({ ...record, requires: [...record.requires, 'missing.decision'] }));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_INTERFACE_REFERENCE'));
  });
});

test('persistence selects all eight independent trigger combinations without empty ceremony', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  const cases = [
    [false, false, false, ['inline'], false],
    [true, false, false, ['context'], true],
    [false, true, false, ['task-board'], true],
    [false, false, true, ['task-state'], true],
    [true, true, false, ['context', 'task-board'], true],
    [true, false, true, ['context', 'task-state'], true],
    [false, true, true, ['task-board', 'task-state'], true],
    [true, true, true, ['context', 'task-board', 'task-state'], true],
  ];
  for (const [continuityRisk, multiTaskRisk, detailRisk, representations, createRunTree] of cases) {
    const decision = decide(contract, 'persistence', { continuityRisk, multiTaskRisk, detailRisk });
    assert.deepEqual(decision.result, { representations, createRunTree });
    assert.deepEqual(decision.trace.factsConsulted, ['continuityRisk', 'detailRisk', 'multiTaskRisk']);
  }
});

test('unique owners, exact seven states, every transition and main-only writer are source-decided', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  for (const [view, truthOwner] of [
    ['context', 'run-macro'],
    ['task-board', 'index-readiness'],
    ['task-state', 'full-evidence-retry'],
    ['inline', 'single-task-local'],
  ]) {
    const main = decide(contract, 'ownership', { view, actor: 'main' });
    assert.equal(main.result.allowed, true);
    assert.equal(main.result.truthOwner, truthOwner);
    const wrong = decide(contract, 'ownership', { view, actor: 'evaluator' });
    assert.deepEqual(wrong.result, { allowed: false, truthOwner: 'main', code: 'WRONG_WRITER_STOP' });
  }
  const vocabulary = contract.byId.get('state.vocabulary').value.values;
  assert.deepEqual(vocabulary, EXPECTED_STATES);
  assert.equal(vocabulary.includes('accepted'), false);
  for (const state of EXPECTED_STATES) validateEnum(contract, 'state.vocabulary', state);
  assert.throws(() => validateEnum(contract, 'state.vocabulary', 'accepted'), errorCode('CONTRACT_ENUM_VALUE'));
  for (const from of EXPECTED_STATES) {
    for (const to of EXPECTED_STATES) {
      const edge = `${from}->${to}`;
      const transition = decide(contract, 'state-transition', { edge });
      assert.equal(transition.result.allowed, edge === 'active->completed' ? false : EXPECTED_EDGES.has(edge), edge);
      assert.equal(transition.result.actor, 'main', edge);
    }
  }
  const completed = await runCompletionPhysicalScenario(ROOT);
  assert.deepEqual(completed.transition.result, { allowed: true, actor: 'main', code: 'COMPLETION_EVIDENCE_CLOSED' });
  for (const [label, scenario] of [
    ['wrong actor', { actor: 'evaluator' }],
    ['missing current behavior', { omitEvidenceField: 'behavior.json:currentBehaviorEvidence' }],
    ['missing negative evidence', { omitEvidenceField: 'behavior.json:negativeEvidence' }],
    ['invalid strict QA', { qaVerdict: 'FAIL' }],
    ['missing finding disposition', { omitFile: 'finding-disposition.json' }],
    ['missing main acceptance', { omitFile: 'main-acceptance.json' }],
    ['corrupt observed artifact', { corruptFile: 'strict-qa.json' }],
  ]) {
    const stopped = await runCompletionPhysicalScenario(ROOT, scenario);
    assert.equal(stopped.transition.result.code, 'ILLEGAL_TRANSITION_STOP', label);
  }
  assert.equal(decide(contract, 'state-transition', { edge: 'pending->completed' }).result.allowed, false);
  assert.equal(decide(contract, 'state-transition', { edge: 'blocked->completed' }).result.allowed, false);
  assert.equal(decide(contract, 'state-transition', { edge: 'superseded->active' }).result.allowed, false);
});

const READY_FACTS = Object.freeze({
  predecessorState: 'completed',
  authorityCurrent: true,
  ownerConsumerPresent: true,
  prerequisitesAcceptedCurrent: true,
  gatesClosed: true,
  conflictFree: true,
  pendingChoice: false,
  mainUnlockDecision: true,
});

test('readiness is current and unlock is a separate main decision', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  assert.deepEqual(decide(contract, 'readiness-unlock', READY_FACTS).result, { ready: true, unlock: true, code: 'MAIN_UNLOCK_CURRENT' });
  for (const predecessorState of ['blocked', 'exhausted', 'superseded', 'cancelled']) {
    assert.equal(decide(contract, 'readiness-unlock', { ...READY_FACTS, predecessorState }).result.code, 'PREDECESSOR_STATE_STOP');
  }
  assert.equal(decide(contract, 'readiness-unlock', { ...READY_FACTS, evidenceCurrent: false, prerequisitesAcceptedCurrent: false }).result.code, 'READINESS_STALE_STOP');
  assert.equal(decide(contract, 'readiness-unlock', { ...READY_FACTS, mainUnlockDecision: false }).result.code, 'MAIN_UNLOCK_REQUIRED');
  assert.equal(decide(contract, 'readiness-unlock', { ...READY_FACTS, predecessorState: 'active' }).result.code, 'READINESS_INCOMPLETE_STOP');
});

test('publication, conflict precedence and compaction preserve current truth', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  const current = await runPublicationPhysicalScenario(ROOT);
  assert.equal(current.publication.result.code, 'PUBLICATION_CURRENT');
  assert.deepEqual(current.operations.map(({ view }) => view), ['task-state', 'task-board', 'context']);
  assert.deepEqual([...current.deltaPaths].sort(), [...current.allowedPaths].sort());
  assert.equal(current.commitRootIdentity, current.observations.context.hash);
  assert.equal(current.retainedLastVerifiedIdentity, current.commitRootIdentity);
  for (const sentinel of ['protected/tracked.txt', 'protected/untracked.txt', 'protected/ignored-history.txt']) {
    assert.deepEqual(current.before.find(({ path: item }) => item === sentinel), current.after.find(({ path: item }) => item === sentinel));
  }
  const protectedWrite = await runPublicationPhysicalScenario(ROOT, { protectedMutation: true });
  assert.equal(protectedWrite.publication.result.code, 'PROTECTED_OR_EXTRA_DELTA_STOP');
  assert.equal(protectedWrite.retainedLastVerifiedIdentity, protectedWrite.priorLastVerifiedIdentity);
  const corrupt = await runPublicationPhysicalScenario(ROOT, { corruptView: 'task-board' });
  assert.equal(corrupt.publication.result.code, 'PARTIAL_PUBLICATION_STOP');
  assert.equal(corrupt.retainedLastVerifiedIdentity, corrupt.priorLastVerifiedIdentity);
  const partial = await runPublicationPhysicalScenario(ROOT, { publishCount: 2 });
  assert.equal(partial.publication.result.code, 'PARTIAL_PUBLICATION_STOP');
  assert.equal(partial.commitRootIdentity, null);
  assert.equal(partial.retainedLastVerifiedIdentity, partial.priorLastVerifiedIdentity);
  const conflictPublication = await runPublicationPhysicalScenario(ROOT, { conflict: true });
  assert.notEqual(conflictPublication.facts.boardTaskReferenceIdentity, conflictPublication.facts.taskStateReadbackIdentity);
  assert.notEqual(conflictPublication.facts.contextBoardReferenceIdentity, conflictPublication.facts.taskBoardReadbackIdentity);
  assert.equal(conflictPublication.publication.result.code, 'PARTIAL_PUBLICATION_STOP');
  assert.equal(conflictPublication.retainedLastVerifiedIdentity, conflictPublication.priorLastVerifiedIdentity);

  const clean = { protectedOrExtraWrite: false, stateConflict: false, observationComplete: true, artifactComplete: true, strictVerdict: 'PASS' };
  assert.equal(decide(contract, 'conflict-error-precedence', clean).result.classification, 'quality-pass-evidence');
  assert.equal(decide(contract, 'conflict-error-precedence', { ...clean, strictVerdict: 'FAIL' }).result.classification, 'quality-fail-evidence');
  assert.equal(decide(contract, 'conflict-error-precedence', { ...clean, protectedOrExtraWrite: true }).result.code, 'PROTECTED_WRITE_STOP');
  assert.equal(decide(contract, 'conflict-error-precedence', { ...clean, stateConflict: true }).result.code, 'STATE_CONFLICT_STOP');
  assert.equal(decide(contract, 'conflict-error-precedence', { ...clean, observationComplete: false }).result.code, 'MISSING_EVIDENCE_INCOMPLETE');

  const full = Object.fromEntries(EXPECTED_COMPACTION.map((field) => [field, `${field}-value`]));
  const compacted = project(contract, 'compaction.preserved', full);
  assert.deepEqual(Object.keys(compacted.value), EXPECTED_COMPACTION);
  for (const field of EXPECTED_COMPACTION) {
    const omitted = { ...full };
    delete omitted[field];
    assert.throws(() => project(contract, 'compaction.preserved', omitted), errorCode('CONTRACT_PROJECTION_MISSING'));
  }
});

test('waiver and rename-resistant retry decisions preserve non-waivable gates and three counters', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  for (const gate of ['authorization', 'secrets-safety', 'destructive-confirmation', 'protected-state', 'no-fabrication', 'independent-pass', 'main-acceptance']) {
    const result = (await runWaiverPhysicalScenario(ROOT, { gate })).decision.result;
    assert.deepEqual(result, { valid: false, unlock: false, code: 'NON_WAIVABLE_GATE_STOP' });
  }
  const validWaiver = await runWaiverPhysicalScenario(ROOT);
  assert.deepEqual(validWaiver.decision.result, { valid: true, unlock: false, code: 'WAIVER_RECORDED_NOT_PASS' });
  for (const field of ['waiverIdentity', 'gate', 'authorityOwner', 'evidenceState', 'reason', 'scope', 'issueTime', 'expiryReevaluation', 'residualRisk', 'downstreamImpact', 'consumerRevalidation', 'status']) {
    assert.equal((await runWaiverPhysicalScenario(ROOT, { omitField: field })).decision.result.code, 'INVALID_WAIVER_STOP', field);
  }
  assert.equal((await runWaiverPhysicalScenario(ROOT, { corruptRecord: true })).decision.result.code, 'INVALID_WAIVER_STOP');
  assert.equal(decide(contract, 'waiver', { gate: 'documentation-format', completeRecord: true, authorityPresent: true }).result.code, 'INVALID_WAIVER_STOP');

  const storageCases = [
    [{ event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 1 }, 'stage-and-cumulative-quality'],
    [{ event: 'artifact-free-operational-failure', counterKind: 'operational', causeCount: 1 }, 'normalized-cause-operational'],
    [{ event: 'unsupported-finding' }, 'none'],
    [{ event: 'observer-timeout-before-terminal' }, 'none'],
  ];
  for (const [scenario, increment] of storageCases) assert.equal((await runRetryPhysicalScenario(ROOT, scenario)).storage.result.increment, increment);
  const controlCases = [
    [{ event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 1 }, 'focused-revision'],
    [{ event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 2, interventionComplete: false }, 'intervention-required'],
    [{ event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 3, interventionComplete: true }, 'exhausted'],
    [{ event: 'artifact-free-operational-failure', counterKind: 'operational', causeCount: 1 }, 'checked-retry'],
    [{ event: 'artifact-free-operational-failure', counterKind: 'operational', causeCount: 2, interventionComplete: false }, 'intervention-required'],
    [{ event: 'artifact-free-operational-failure', counterKind: 'operational', causeCount: 3, interventionComplete: true }, 'blocked-or-exhausted'],
    [{ event: 'resume-authorized', counterKind: 'resume', newEvidenceOrUserDecision: true, resumedBudget: 1 }, 'one-bounded-resume'],
  ];
  for (const [scenario, action] of controlCases) assert.equal((await runRetryPhysicalScenario(ROOT, scenario)).control.result.action, action);
  const renamed = await runRetryPhysicalScenario(ROOT, { cumulativeCount: 2, displayName: 'renamed-stage', stateLabel: 'blocked' });
  assert.equal(renamed.control.result.action, 'intervention-required');
  const reset = await runRetryPhysicalScenario(ROOT, { priorCumulativeCount: 2, priorStageCount: 2, cumulativeCount: 1, displayName: 'renamed-stage', stateLabel: 'active' });
  assert.equal(reset.control.result.code, 'RETRY_IDENTITY_HISTORY_STOP');
  const rewrittenIdentity = await runRetryPhysicalScenario(ROOT, { identityRewrite: { retryDomainIdentity: 'new-domain' } });
  assert.equal(rewrittenIdentity.control.result.code, 'RETRY_IDENTITY_HISTORY_STOP');
  const rewrittenHistory = await runRetryPhysicalScenario(ROOT, { historySnapshotIdentity: 'rewritten-history' });
  assert.equal(rewrittenHistory.control.result.code, 'RETRY_IDENTITY_HISTORY_STOP');
});

const OBSERVED_PUBLICATION_FACTS = Object.freeze({
  deltaPaths: ['task'], allowedPaths: ['task'], actualReadback: ['hash'], expectedReadback: ['hash'], sharedUpdateComplete: true,
  updateIdentity: 'update-01', preparedExpectedHashes: ['hash'], actualParticipatingViews: ['task-state', 'task-board', 'context'],
  expectedParticipatingViews: ['task-state', 'task-board', 'context'],
  actualPublicationOrder: ['task-state', 'task-board', 'context'], expectedPublicationOrder: ['task-state', 'task-board', 'context'],
  actualCrossViewReferences: ['task-hash', 'board-hash'], expectedCrossViewReferences: ['task-hash', 'board-hash'],
  priorLastVerifiedObservationIdentity: 'prior-hash', priorLastVerifiedExpectedIdentity: 'prior-hash', priorLastVerifiedIdentity: 'prior-01',
  commitRootIdentity: 'context-hash', lastParticipatingReadbackIdentity: 'context-hash',
});
const OBSERVED_WAIVER_FACTS = Object.freeze({
  gate: 'documentation-format', recordShapeObserved: true, waiverObservationIdentity: 'waiver-hash', waiverExpectedIdentity: 'waiver-hash',
  waiverIdentity: 'waiver-01', authorityOwner: 'main', evidenceState: 'missing', reason: 'bounded', scope: 'T-02',
  issueTime: '2026-07-19', expiryReevaluation: 'before handoff', residualRisk: 'format', downstreamImpact: 'none',
  consumerRevalidation: 'required', status: 'recorded-not-pass',
});
const OBSERVED_RETRY_FACTS = Object.freeze({
  currentRetryObservationIdentity: 'current-hash', currentRetryExpectedIdentity: 'current-hash',
  priorHistoryObservationIdentity: 'prior-hash', historySnapshotIdentity: 'prior-hash',
  priorStageIdentity: 'stage', currentStageIdentity: 'stage', priorBoundaryLineage: 'boundary', currentBoundaryLineage: 'boundary',
  priorRetryDomainIdentity: 'domain', currentRetryDomainIdentity: 'domain', priorObservableResultIdentity: 'result', currentObservableResultIdentity: 'result',
  priorCauseAuthorityIdentity: 'cause', currentCauseAuthorityIdentity: 'cause', priorStageCount: 0, currentStageCount: 1,
  priorCumulativeCount: 0, currentCumulativeCount: 1, priorCauseCount: 0, currentCauseCount: 0,
});

const DECISION_VARIANTS = [
  {
    domain: 'persistence', target: 'persistence.inline', fallback: 'persistence.context',
    facts: { continuityRisk: false, multiTaskRisk: false, detailRisk: false }, expected: { representations: ['inline'], createRunTree: false },
    reverse: (record) => ({ ...record, result: { representations: ['context', 'task-board'], createRunTree: true } }),
  },
  {
    domain: 'ownership', target: 'ownership.task-main', fallback: 'ownership.wrong-writer',
    facts: { view: 'task-state', actor: 'main' }, expected: { allowed: true, truthOwner: 'full-evidence-retry', code: 'OWNER_ALLOWED' },
    reverse: (record) => ({ ...record, result: { allowed: false, truthOwner: 'evaluator', code: 'REVERSED_OWNER' } }),
  },
  {
    domain: 'state-transition', target: 'state.transition-denied', fallback: 'state.transition-allowed',
    facts: { edge: 'pending->completed' }, expected: { allowed: false, actor: 'main', code: 'ILLEGAL_TRANSITION_STOP' },
    reverse: (record) => ({ ...record, result: { allowed: true, actor: 'main', code: 'REVERSED_TRANSITION' } }),
  },
  {
    domain: 'readiness-unlock', target: 'readiness.ready', fallback: 'readiness.incomplete-stop',
    facts: READY_FACTS, expected: { ready: true, unlock: true, code: 'MAIN_UNLOCK_CURRENT' },
    reverse: (record) => ({ ...record, result: { ready: false, unlock: false, code: 'REVERSED_READINESS' } }),
  },
  {
    domain: 'state-publication-recovery', target: 'publication.current', fallback: 'publication.partial-stop',
    facts: OBSERVED_PUBLICATION_FACTS,
    expected: { current: true, code: 'PUBLICATION_CURRENT', publicationOrder: ['task-state', 'task-board', 'context'], commitRoot: 'last-participating-view' },
    reverse: (record) => ({ ...record, result: { current: false, code: 'REVERSED_PUBLICATION', retainLastVerified: false } }),
  },
  {
    domain: 'conflict-error-precedence', target: 'conflict.quality-pass', fallback: 'conflict.quality-fail',
    facts: { protectedOrExtraWrite: false, stateConflict: false, observationComplete: true, artifactComplete: true, strictVerdict: 'PASS' },
    expected: { classification: 'quality-pass-evidence', consumeVerdict: true, automaticTransition: false },
    reverse: (record) => ({ ...record, result: { classification: 'automatic-pass', consumeVerdict: true, automaticTransition: true } }),
  },
  {
    domain: 'waiver', target: 'waiver.valid-record', fallback: 'waiver.invalid-record',
    facts: OBSERVED_WAIVER_FACTS,
    expected: { valid: true, unlock: false, code: 'WAIVER_RECORDED_NOT_PASS' },
    reverse: (record) => ({ ...record, result: { valid: true, unlock: true, code: 'REVERSED_WAIVER' } }),
  },
  {
    domain: 'retry-storage', target: 'retry-storage.quality', fallback: 'retry-storage.timeout',
    facts: { ...OBSERVED_RETRY_FACTS, event: 'valid-quality-failure' }, expected: { increment: 'stage-and-cumulative-quality', code: 'QUALITY_COUNTER_EVENT' },
    reverse: (record) => ({ ...record, result: { increment: 'none', code: 'REVERSED_RETRY_STORAGE' } }),
  },
  {
    domain: 'retry-control', target: 'retry-control.quality-exhausted', fallback: 'retry-control.quality-focused',
    facts: { ...OBSERVED_RETRY_FACTS, event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 3, interventionComplete: true }, expected: { action: 'exhausted', code: 'POST_INTERVENTION_THIRD_QUALITY' },
    reverse: (record) => ({ ...record, result: { action: 'focused-revision', code: 'REVERSED_RETRY_CONTROL' } }),
  },
];

test('governance domains reject omission, follow structurally valid reversal, and fail contradiction on the same path', async (context) => {
  const canonical = await loadWorkTruthContract(ROOT);
  for (const variant of DECISION_VARIANTS) {
    await context.test(variant.domain, async () => {
      assert.deepEqual(decide(canonical, variant.domain, variant.facts).result, variant.expected);
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, variant.target, () => null);
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MANIFEST_IDS'));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, variant.target, variant.reverse);
        const reversed = await loadWorkTruthContract(root);
        const actual = decide(reversed, variant.domain, variant.facts).result;
        assert.notDeepEqual(actual, variant.expected, 'reversed source left the Frozen-AC expectation green');
      });
      await withTempContractRoot(ROOT, async (root) => {
        const target = canonical.byId.get(variant.target).value;
        await rewriteRecord(root, variant.fallback, (record) => ({ ...record, priority: target.priority, when: structuredClone(target.when) }));
        const contradicted = await loadWorkTruthContract(root);
        assert.throws(() => decide(contradicted, variant.domain, variant.facts), errorCode('CONTRACT_AMBIGUOUS_DECISION'));
      });
    });
  }
});

test('state vocabulary and compaction independently reject omission, reversal, and contradiction', async () => {
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'state.vocabulary', () => null);
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MANIFEST_DOMAINS'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'state.vocabulary', (record) => ({ ...record, values: record.values.map((value) => value === 'completed' ? 'accepted' : value) }));
    const contract = await loadWorkTruthContract(root);
    assert.notDeepEqual(contract.byId.get('state.vocabulary').value.values, EXPECTED_STATES);
  });
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'state.vocabulary', (record) => ({ ...record, values: [...record.values, 'pending'] }));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_DUPLICATE_VALUE'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'compaction.preserved', () => null);
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MANIFEST_DOMAINS'));
  });
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'compaction.preserved', (record) => ({ ...record, fields: record.fields.filter((field) => field !== 'pendingDecisions') }));
    const contract = await loadWorkTruthContract(root);
    assert.notDeepEqual(contract.byId.get('compaction.preserved').value.fields, EXPECTED_COMPACTION);
  });
  await withTempContractRoot(ROOT, async (root) => {
    await rewriteRecord(root, 'compaction.preserved', (record) => ({ ...record, forbiddenFields: ['pendingDecisions'] }));
    await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_CONTRADICTION'));
  });
});
