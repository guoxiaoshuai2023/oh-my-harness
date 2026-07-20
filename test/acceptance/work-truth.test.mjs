import assert from 'node:assert/strict';
import { cp, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { readSourceCapabilityRegistry } from '../support/t01-governance-fixtures.mjs';
import {
  ROOT,
  WorkTruthContractError,
  assertAllNormativeFieldsConsumed,
  assertZeroWrite,
  decide,
  evaluateTask3,
  loadWorkTruthContract,
  manifestTree,
  project,
  rewriteRecord,
  runAcceptancePhysicalScenario,
  runSubjectivePhysicalScenario,
  runTask2PhysicalScenario,
  validateEnum,
  validateInterface,
  withTempContractRoot,
} from '../support/t02-work-truth-fixtures.mjs';

function errorCode(code) {
  return (error) => error instanceof WorkTruthContractError && error.code === code;
}

test('post-intervention expected red: physical T-02 closure is exact AC1 through AC10', async () => {
  const physical = await runAcceptancePhysicalScenario(ROOT);
  const expectedAcs = Array.from({ length: 10 }, (_, index) => `AC${index + 1}`);
  const taskAcs = physical.taskObservation.value.closure.acceptanceCriteria;
  const ledger = physical.ledgerObservation.value;
  assert.deepEqual(taskAcs, expectedAcs);
  assert.equal(ledger.length, 10);
  assert.deepEqual(ledger.map(({ ac }) => ac), expectedAcs);
  assert.equal(new Set(ledger.map(({ ac }) => ac)).size, 10);
  assert.equal(ledger.every(({ resolved }) => resolved === true), true);
  assert.equal(physical.acceptance.result.code, 'ACTUAL_RESULT_CLOSED');
});

test('P1-T02-QA-001 expected red: caller claims cannot close an empty physical Task and ledger root', async () => {
  const physicalRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t02-acceptance-red-'));
  try {
    const before = await manifestTree(physicalRoot);
    const contract = await loadWorkTruthContract(ROOT);
    const acceptance = decide(contract, 'acceptance-proxy', {
      closureComplete: true,
      actualResultObserved: true,
      proxyOnly: false,
    });
    const after = await manifestTree(physicalRoot);
    assert.deepEqual(before, after);
    assert.equal(acceptance.result.eligible, false);
  } finally {
    await rm(physicalRoot, { recursive: true, force: true });
  }
});

test('P1-T02-QA-006 expected red: subjective booleans cannot replace artifact, rubric, report and decision bytes', async () => {
  const physicalRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t02-subjective-red-'));
  try {
    assert.deepEqual(await manifestTree(physicalRoot), []);
    const contract = await loadWorkTruthContract(ROOT);
    assert.notEqual(decide(contract, 'subjective-authority', SUBJECTIVE_DELEGATED).result.code, 'FROZEN_RUBRIC_DELEGATES_MAIN');
  } finally {
    await rm(physicalRoot, { recursive: true, force: true });
  }
});

const CURRENTNESS = Object.freeze({
  ownerCurrent: true,
  materialInputsCurrent: true,
  evidenceCurrent: true,
  affectedTaskAcNamed: true,
  consumerRevalidated: true,
  mainDispositionCurrent: true,
});

const READY = Object.freeze({
  predecessorState: 'completed',
  authorityCurrent: true,
  ownerConsumerPresent: true,
  prerequisitesAcceptedCurrent: true,
  gatesClosed: true,
  conflictFree: true,
  pendingChoice: false,
  mainUnlockDecision: true,
});

const SUBJECTIVE_DELEGATED = Object.freeze({
  standardsSufficient: true,
  rubricFrozen: true,
  rubricDelegatesMain: true,
  artifactObserved: true,
  dimensionsBound: true,
  primaryEvidenceBound: true,
  evaluatorAdvisoryOnly: true,
  unresolvedDimensions: false,
  evaluatorClaimsFinal: false,
});

const INTERFACES = Object.freeze({
  'interface.context': {
    required: 'persistence.context',
    emits: ['runIdentity', 'goalAndNonGoals', 'authorityIdentities', 'phaseAndTopology', 'milestones', 'globalBlockersAndGates', 'runRetryWaiverSummary', 'pendingDecisions', 'failureScan', 'nextAction'],
    forbidden: 'controllingTaskRows',
  },
  'interface.task-board': {
    required: 'readiness.ready',
    emits: ['taskId', 'resultLabel', 'owner', 'state', 'prerequisites', 'readiness', 'blocker', 'retrySummary', 'currentEvidenceIdentity', 'consumerRevalidation', 'obsoleteCondition', 'nextAction'],
    forbidden: 'fullAcEvidence',
  },
  'interface.plan': {
    required: 'acceptance.actual-result',
    emits: ['observableResult', 'scopeAndNonGoals', 'deliveryOwner', 'decisionOwner', 'prerequisitesAndReadiness', 'protectedUpstreamAndDownstream', 'acceptanceCriteria', 'primaryEvidence', 'actualResultObservation', 'acEvidenceExpectationOwnerConsumerLedger', 'discriminatingFailure', 'strictDecisionPath', 'lifecycleAndAcceptedIdentity', 'designTrigger'],
    forbidden: 'proxyAsResult',
  },
  'interface.plan-review': {
    required: 'acceptance.proxy-stop',
    emits: ['exactTargetAndUpstream', 'actualResultEvidenceDecision', 'proxyNegativeDecision', 'subjectiveAuthorityDecision', 'currentnessDecision', 'allTasksPassUserFailDecision', 'strictVerdict', 'findings'],
    forbidden: 'targetRepair',
  },
  'interface.task-packet': {
    required: 'topology.verification-only',
    emits: ['boundaryIdentity', 'currentStateIdentities', 'currentnessInputDigest', 'remainingActions', 'writeSetDigest', 'topologyInputDigest', 'materialChangeRule', 'zeroWriteVerificationBinding'],
    forbidden: 'verifierMutation',
  },
  'interface.orchestration': {
    required: 'publication.partial-stop',
    emits: ['persistenceFacts', 'stateOwnerAndActorFacts', 'stateTransitionFacts', 'publicationAndReadbackFacts', 'conflictFacts', 'currentnessFacts', 'remainingActionsAndWriteSet', 'topologyDecision', 'retryDecision', 'completeRunTerminalEvidenceFacts', 'scanStorageAndHistoryFacts', 'canonicalInlineOrContextScanObservation', 'continuityTransferAndReentryFacts', 'learningTriggerAndEvidenceFacts', 'retrospectiveCandidateObservation', 'caseReviewIntegrityObservation', 'humanCustodyFixtureObservation', 'learningChangeBarrierDecision'],
    forbidden: 'automaticUnlock',
  },
  'interface.result-qa': {
    required: 'task2.eligible',
    emits: ['explicitSourceRoot', 'contractDigest', 'sourceHashes', 'sourceVariantEvidence', 'normativeUsageTrace', 'proseRecordComparison', 'physicalTask2Observations', 'currentRegistryProfileHashes', 'task3CurrentnessTopologyEvidence', 'allPersistenceScanEvidence', 'triggerEvidencePrecedenceAndArtifactEvidence', 'caseReviewIntegrityEvidence', 'custodyActionAndFalsePostimageEvidence', 'learningNoChangeAndPackageAbsenceEvidence', 'strictAcDecisions', 'strictVerdict'],
    forbidden: 'producerClaimAsOracle',
  },
});

test('actual result closes acceptance while proxy structure, files, counts and commands do not', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  const closed = await runAcceptancePhysicalScenario(ROOT);
  assert.deepEqual(closed.acceptance.result, { eligible: true, code: 'ACTUAL_RESULT_CLOSED' });
  assert.equal(closed.taskObservation.hash, closed.manifest.find(({ path: item }) => item === 'task.json').hash);
  assert.equal(closed.ledgerObservation.hash, closed.manifest.find(({ path: item }) => item === 'ledger.json').hash);
  for (const [label, scenario, code] of [
    ['proxy-only', { proxyOnly: true }, 'RESULT_PROXY_STOP'],
    ['missing Task', { omitTask: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['corrupt Task readback', { corruptTask: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['missing ledger', { omitLedger: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['empty ledger', { emptyLedger: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['corrupt ledger readback', { corruptLedger: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['duplicate AC ownership', { duplicateAc: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['extra ledger row', { extraLedger: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['mismatched ledger row', { mismatchedLedger: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['unresolved ledger row', { unresolvedLedger: true }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['missing closure field', { omitClosureField: 'strictDecisionPath' }, 'ACCEPTANCE_INCOMPLETE_STOP'],
    ['inexact ledger row', { omitLedgerField: 'consumer' }, 'ACCEPTANCE_INCOMPLETE_STOP'],
  ]) {
    assert.equal((await runAcceptancePhysicalScenario(ROOT, scenario)).acceptance.result.code, code, label);
  }
  assert.deepEqual(decide(contract, 'acceptance-proxy', { closureComplete: true, actualResultObserved: true, proxyOnly: false }).result, { eligible: false, code: 'ACCEPTANCE_INCOMPLETE_STOP' });
  assert.deepEqual(decide(contract, 'acceptance-proxy', { closureComplete: true, actualResultObserved: false, proxyOnly: true }).result, { eligible: false, code: 'RESULT_PROXY_STOP' });
});

test('subjective acceptance uses exact delegated rubric or returns to the user', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  const delegated = await runSubjectivePhysicalScenario(ROOT);
  assert.deepEqual(delegated.decision.result, { decisionOwner: 'main', accept: 'main-decision-required', code: 'FROZEN_RUBRIC_DELEGATES_MAIN' });
  for (const [label, scenario] of [
    ['insufficient standards', { standardsSufficient: false }],
    ['unfrozen rubric', { rubricFrozen: false }],
    ['missing rubric delegation', { rubricDelegatesMain: false }],
    ['missing delegation scope', { missingDelegation: true }],
    ['unresolved dimensions', { unresolvedDimensions: true }],
    ['invented preference', { decision: 'invented-preference' }],
  ]) {
    assert.deepEqual((await runSubjectivePhysicalScenario(ROOT, scenario)).decision.result, { decisionOwner: 'user', accept: false, code: 'RETURN_TO_USER' }, label);
  }
  assert.equal((await runSubjectivePhysicalScenario(ROOT, { evaluatorClaimsFinal: true })).decision.result.code, 'EVALUATOR_FINAL_AUTHORITY_STOP');
  assert.equal((await runSubjectivePhysicalScenario(ROOT, { omitFile: 'artifact.json' })).decision.result.code, 'SUBJECTIVE_AUTHORITY_INCOMPLETE_STOP');
  assert.equal((await runSubjectivePhysicalScenario(ROOT, { corruptFile: 'advisory-report.json' })).decision.result.code, 'SUBJECTIVE_AUTHORITY_INCOMPLETE_STOP');
  assert.equal(decide(contract, 'subjective-authority', SUBJECTIVE_DELEGATED).result.code, 'SUBJECTIVE_AUTHORITY_INCOMPLETE_STOP');
});

test('all seven templates expose unique interfaces without competing decision authority', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  assert.equal(contract.records.filter(({ value }) => value.kind === 'interface').length, 7);
  assert.equal(contract.records.filter(({ value }) => value.kind === 'decision' && value.sourceOwner.includes('/templates/')).length, 0);
  for (const [id, expected] of Object.entries(INTERFACES)) {
    const record = contract.byId.get(id).value;
    assert.ok(record.requires.includes(expected.required), `${id} missing Frozen-AC protocol reference`);
    assert.deepEqual(record.emits, expected.emits, `${id} changed unique emitted truth`);
    assert.ok(record.forbids.includes(expected.forbidden), `${id} missing forbidden competing truth`);
    const payload = Object.fromEntries(expected.emits.map((field) => [field, `${field}-value`]));
    const trace = validateInterface(contract, id, payload);
    assert.ok(trace.fieldsRead.some((pointer) => pointer.startsWith(`${id}/requires`)));
    assert.throws(() => validateInterface(contract, id, { ...payload, [expected.forbidden]: true }), errorCode('CONTRACT_INTERFACE_FORBIDDEN'));
  }
});

test('every interface fails omission, Frozen-AC reference reversal, contradiction and unused extension', async (context) => {
  for (const [id, expected] of Object.entries(INTERFACES)) {
    await context.test(id, async () => {
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, () => null);
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_BLOCK_EMPTY'));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, (record) => ({ ...record, requires: record.requires.filter((required) => required !== expected.required) }));
        const reversed = await loadWorkTruthContract(root);
        assert.equal(reversed.byId.get(id).value.requires.includes(expected.required), false, 'reversed interface source incorrectly met Frozen-AC expectation');
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, (record) => ({ ...record, forbids: [...record.forbids, record.emits[0]] }));
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_CONTRADICTION'));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, (record) => ({ ...record, emits: [...record.emits, 'unusedNormativeField'] }));
        const changed = await loadWorkTruthContract(root);
        const payload = Object.fromEntries(expected.emits.map((field) => [field, true]));
        assert.throws(() => validateInterface(changed, id, payload), errorCode('CONTRACT_INTERFACE_MISSING'));
      });
    });
  }
});

test('Task 2 physically proves authorized mutation, readback, attribution and protected closure', async () => {
  const positive = await runTask2PhysicalScenario(ROOT, { actor: 'main', afterBytes: 'state=completed\n' });
  assert.deepEqual(positive.delta, ['tasks/T-02/TASK_STATE.md']);
  assert.equal(positive.operations[0].kind, 'staged-write');
  assert.equal(positive.readback, 'state=completed\n');
  assert.equal(positive.observationIdentity, positive.after.find(({ path: item }) => item === 'tasks/T-02/TASK_STATE.md').hash);
  assert.deepEqual(positive.task2.result, { eligible: true, code: 'PHYSICAL_OBSERVATION_CLOSED' });
  for (const sentinel of ['protected/tracked.txt', 'protected/untracked.txt', 'protected/ignored-history.txt']) {
    assert.deepEqual(positive.before.find(({ path: item }) => item === sentinel), positive.after.find(({ path: item }) => item === sentinel));
  }
});

test('Task 2 physical negatives discriminate wrong writer, bypass, leakage, unobserved corruption, conflict and object-only claims', async () => {
  const wrongWriter = await runTask2PhysicalScenario(ROOT, { actor: 'evaluator' });
  assert.deepEqual(wrongWriter.delta, []);
  assert.deepEqual(wrongWriter.operations, []);
  assert.equal(wrongWriter.task2.result.code, 'WRONG_WRITER_STOP');

  const bypass = await runTask2PhysicalScenario(ROOT, { actor: 'producer', bypass: true });
  assert.deepEqual(bypass.delta, ['tasks/T-02/TASK_STATE.md']);
  assert.equal(bypass.operations[0].kind, 'bypass-write');
  assert.equal(bypass.task2.result.code, 'UNAUTHORIZED_ACTUAL_DELTA_STOP');

  const leakage = await runTask2PhysicalScenario(ROOT, { actor: 'main', leakPath: 'protected/tracked.txt' });
  assert.deepEqual(leakage.delta, ['protected/tracked.txt', 'tasks/T-02/TASK_STATE.md']);
  assert.equal(leakage.task2.result.code, 'UNAUTHORIZED_DELTA_STOP');

  const unobserved = await runTask2PhysicalScenario(ROOT, { actor: 'main', corruptBeforeReadback: true });
  assert.equal(unobserved.task2.result.code, 'UNOBSERVED_STATE_INCOMPLETE');
  assert.notEqual(unobserved.readback, 'state=completed\n');

  const conflict = await runTask2PhysicalScenario(ROOT, {
    actor: 'main',
    boardBytes: JSON.stringify({ taskStateHash: 'stale-board-reference' }),
    afterBytes: JSON.stringify({ state: 'blocked', evidence: 'current' }),
  });
  assert.equal(conflict.physicalConflict, true);
  assert.equal(conflict.task2.result.code, 'STATE_CONFLICT_STOP');

  const contract = await loadWorkTruthContract(ROOT);
  const objectOnly = decide(contract, 'task2-invariant-observation', {
    actorAllowed: true,
    deltaPaths: ['task'],
    allowedPaths: ['task'],
    actualReadback: 'claimed',
    expectedReadback: 'claimed',
    observationIdentity: 'object-claim',
    physicalObservation: false,
    conflict: false,
  });
  assert.equal(objectOnly.result.code, 'UNOBSERVED_STATE_INCOMPLETE');
});

test('Task 3 binds the exact accepted T-01 registry/profile bytes and selects zero-write verification without Executor', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  const registry = await readSourceCapabilityRegistry();
  const verification = await assertZeroWrite(() => evaluateTask3(contract, registry, ROOT, {
    currentness: CURRENTNESS,
    remainingActions: ['read', 'hash', 'replay', 'readback'],
    writePaths: [],
  }));
  assert.equal(verification.value.registry.length, 9);
  assert.match(verification.value.registryDigest, /^[a-f0-9]{64}$/);
  assert.equal(verification.value.currentness.result.code, 'CURRENTNESS_CLOSED');
  assert.equal(verification.value.topology.result.code, 'ZERO_WRITE_TOPOLOGY');
  assert.equal(verification.value.excludedCapability.id, 'executor');
  assert.deepEqual(verification.value.selected, ['result-evaluator']);
  assert.equal(verification.value.selected.includes('executor'), false);
  assert.equal(verification.value.mayWrite, false);
  assert.deepEqual(verification.before, verification.after);
});

test('Task 3 rejects stale/wrong/blocked inputs and stops without mutation when write or registry changes', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  const registry = await readSourceCapabilityRegistry();
  for (const field of Object.keys(CURRENTNESS)) {
    const currentness = { ...CURRENTNESS, [field]: false };
    assert.equal(decide(contract, 'task3-currentness', currentness).result.code, 'STALE_OWNER_STOP', field);
  }
  for (const predecessorState of ['blocked', 'superseded', 'cancelled']) {
    assert.equal(decide(contract, 'readiness-unlock', { ...READY, predecessorState }).result.unlock, false);
  }
  assert.equal(decide(contract, 'readiness-unlock', { ...READY, mainUnlockDecision: false }).result.code, 'MAIN_UNLOCK_REQUIRED');

  const writeAppears = await assertZeroWrite(() => evaluateTask3(contract, registry, ROOT, {
    currentness: CURRENTNESS,
    remainingActions: ['edit-source'],
    writePaths: ['task-docs/_harness/adaptive-orchestration-protocol.md'],
  }));
  assert.equal(writeAppears.value.topology.result.code, 'WRITE_OR_PREMISE_CHANGE_STOP');
  assert.deepEqual(writeAppears.value.selected, []);
  assert.equal(writeAppears.value.mayWrite, false);

  const profileRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t02-profiles-'));
  try {
    for (const capability of registry) {
      const target = path.join(profileRoot, capability.profile);
      await mkdir(path.dirname(target), { recursive: true });
      await cp(path.join(ROOT, capability.profile), target);
    }
    await writeFile(path.join(profileRoot, registry[0].profile), `${await readFile(path.join(profileRoot, registry[0].profile), 'utf8')}\nchanged\n`);
    await assert.rejects(evaluateTask3(contract, registry, profileRoot, { currentness: CURRENTNESS, remainingActions: ['verify'], writePaths: [] }), errorCode('REGISTRY_PROFILE_STALE'));
  } finally {
    await rm(profileRoot, { recursive: true, force: true });
  }

  const duplicateExecutor = [...registry, registry.find(({ id }) => id === 'executor')];
  await assert.rejects(evaluateTask3(contract, duplicateExecutor, ROOT, { currentness: CURRENTNESS, remainingActions: ['verify'], writePaths: [] }), errorCode('TOPOLOGY_REGISTRY_RESOLUTION'));

  const first = await evaluateTask3(contract, registry, ROOT, { currentness: CURRENTNESS, remainingActions: ['verify'], writePaths: [] });
  const changed = await evaluateTask3(contract, registry, ROOT, { currentness: { ...CURRENTNESS, evidenceCurrent: false }, remainingActions: ['verify'], writePaths: [] });
  assert.notEqual(first.inputDigest, changed.inputDigest, 'material currentness change left topology input digest stale');
});

const ACCEPTANCE_OBSERVED = Object.freeze({
  taskObservationIdentity: 'task-hash', taskExpectedIdentity: 'task-hash', taskIdentityObserved: true,
  actualResultObserved: true, closureFieldsComplete: true, ledgerObservationIdentity: 'ledger-hash', ledgerExpectedIdentity: 'ledger-hash',
  ledgerObserved: true, ledgerNonempty: true, uniqueAcOwnership: true,
  ledgerExactAgainstTask: true, unresolvedLedgerRows: false, proxyOnly: false,
});
const SUBJECTIVE_OBSERVED = Object.freeze({
  standardsSufficient: true, rubricFrozen: true, rubricDelegatesMain: true,
  artifactObservationIdentity: 'artifact-hash', artifactExpectedIdentity: 'artifact-hash', reportArtifactIdentity: 'artifact-hash', decisionArtifactIdentity: 'artifact-hash',
  artifactDimensions: ['clarity'], rubricDimensions: ['clarity'], reportDimensions: ['clarity'],
  primaryEvidenceObserved: true, preferenceSourceObserved: true, decisionOwnerObserved: true,
  rubricObservationIdentity: 'rubric-hash', rubricExpectedIdentity: 'rubric-hash', reportRubricIdentity: 'rubric-hash', decisionRubricIdentity: 'rubric-hash',
  delegationScopeObserved: true, advisoryReportObservationIdentity: 'report-hash', advisoryReportExpectedIdentity: 'report-hash', decisionReportIdentity: 'report-hash',
  strictDecisionPathObserved: true, mainDecisionObservationIdentity: 'decision-hash', mainDecisionExpectedIdentity: 'decision-hash', mainDecisionWithinDelegation: true,
  evaluatorAdvisoryOnly: true, unresolvedDimensions: false, evaluatorClaimsFinal: false,
});
const COMPLETION_OBSERVED = Object.freeze({
  edge: 'active->completed', observedActor: 'main', completionObservationIdentities: ['actor', 'behavior', 'qa', 'disposition', 'acceptance'],
  completionExpectedIdentities: ['actor', 'behavior', 'qa', 'disposition', 'acceptance'], currentBehaviorObserved: true,
  negativeEvidenceObserved: true, strictQaObserved: true, strictQaValid: true, findingDispositionObserved: true,
  mainAcceptanceObserved: true, evidenceIdentityContinuity: true,
});
const PUBLICATION_OBSERVED = Object.freeze({
  deltaPaths: ['task'], allowedPaths: ['task'], actualReadback: ['hash'], expectedReadback: ['hash'], sharedUpdateComplete: true,
  updateIdentity: 'update-01', preparedExpectedHashes: ['hash'], actualParticipatingViews: ['task-state', 'task-board', 'context'],
  expectedParticipatingViews: ['task-state', 'task-board', 'context'],
  actualPublicationOrder: ['task-state', 'task-board', 'context'], expectedPublicationOrder: ['task-state', 'task-board', 'context'],
  actualCrossViewReferences: ['task-hash', 'board-hash'], expectedCrossViewReferences: ['task-hash', 'board-hash'],
  priorLastVerifiedObservationIdentity: 'prior-hash', priorLastVerifiedExpectedIdentity: 'prior-hash', priorLastVerifiedIdentity: 'prior-01',
  commitRootIdentity: 'context-hash', lastParticipatingReadbackIdentity: 'context-hash',
});
const WAIVER_OBSERVED = Object.freeze({
  gate: 'documentation-format', recordShapeObserved: true, waiverObservationIdentity: 'waiver-hash', waiverExpectedIdentity: 'waiver-hash',
  waiverIdentity: 'waiver-01', authorityOwner: 'main', evidenceState: 'missing', reason: 'bounded', scope: 'T-02', issueTime: '2026-07-19',
  expiryReevaluation: 'before handoff', residualRisk: 'format', downstreamImpact: 'none', consumerRevalidation: 'required', status: 'recorded-not-pass',
});
const RETRY_OBSERVED = Object.freeze({
  currentRetryObservationIdentity: 'current-hash', currentRetryExpectedIdentity: 'current-hash', priorHistoryObservationIdentity: 'prior-hash', historySnapshotIdentity: 'prior-hash',
  priorStageIdentity: 'stage', currentStageIdentity: 'stage', priorBoundaryLineage: 'boundary', currentBoundaryLineage: 'boundary',
  priorRetryDomainIdentity: 'domain', currentRetryDomainIdentity: 'domain', priorObservableResultIdentity: 'result', currentObservableResultIdentity: 'result',
  priorCauseAuthorityIdentity: 'cause', currentCauseAuthorityIdentity: 'cause', priorStageCount: 0, currentStageCount: 1,
  priorCumulativeCount: 0, currentCumulativeCount: 1, priorCauseCount: 0, currentCauseCount: 0,
});

const ACCEPTANCE_VARIANTS = [
  {
    domain: 'acceptance-proxy', target: 'acceptance.actual-result', fallback: 'acceptance.incomplete-stop',
    facts: ACCEPTANCE_OBSERVED, expected: { eligible: true, code: 'ACTUAL_RESULT_CLOSED' },
    reverse: (record) => ({ ...record, result: { eligible: false, code: 'REVERSED_PROXY' } }),
  },
  {
    domain: 'subjective-authority', target: 'subjective.main-delegated', fallback: 'subjective.incomplete-stop',
    facts: SUBJECTIVE_OBSERVED, expected: { decisionOwner: 'main', accept: 'main-decision-required', code: 'FROZEN_RUBRIC_DELEGATES_MAIN' },
    reverse: (record) => ({ ...record, result: { decisionOwner: 'evaluator', accept: true, code: 'REVERSED_SUBJECTIVE' } }),
  },
  {
    domain: 'task2-invariant-observation', target: 'task2.eligible', fallback: 'task2.unobserved-stop',
    facts: { actorAllowed: true, deltaPaths: ['task'], allowedPaths: ['task'], actualReadback: 'next', expectedReadback: 'next', observationIdentity: 'hash', physicalObservation: true, conflict: false },
    expected: { eligible: true, code: 'PHYSICAL_OBSERVATION_CLOSED' },
    reverse: (record) => ({ ...record, result: { eligible: false, code: 'REVERSED_TASK2' } }),
  },
  {
    domain: 'task3-currentness', target: 'task3.current', fallback: 'task3.stale', facts: CURRENTNESS,
    expected: { current: true, code: 'CURRENTNESS_CLOSED', automaticUnlock: false },
    reverse: (record) => ({ ...record, result: { current: false, code: 'REVERSED_TASK3', automaticUnlock: true } }),
  },
  {
    domain: 'topology', target: 'topology.verification-only', fallback: 'topology.recompute', facts: { writePaths: [] },
    expected: { mode: 'verification-only', selectedCapabilities: ['result-evaluator'], excludeCapability: 'executor', mayWrite: false, code: 'ZERO_WRITE_TOPOLOGY' },
    reverse: (record) => ({ ...record, result: { mode: 'executor-write', selectedCapabilities: ['executor'], excludeCapability: 'result-evaluator', mayWrite: true, code: 'REVERSED_TOPOLOGY' } }),
  },
];

test('acceptance, Task 2 and Task 3 domains reject omission, follow reversal and fail contradiction on the same path', async (context) => {
  const canonical = await loadWorkTruthContract(ROOT);
  for (const variant of ACCEPTANCE_VARIANTS) {
    await context.test(variant.domain, async () => {
      assert.deepEqual(decide(canonical, variant.domain, variant.facts).result, variant.expected);
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, variant.target, () => null);
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MANIFEST_IDS'));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, variant.target, variant.reverse);
        const reversed = await loadWorkTruthContract(root);
        assert.notDeepEqual(decide(reversed, variant.domain, variant.facts).result, variant.expected, 'valid reversal left Frozen-AC expectation green');
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

function allDecisionWinnerTraces(contract) {
  const traces = [];
  const run = (domain, facts) => traces.push(decide(contract, domain, facts).trace);
  for (const [continuityRisk, multiTaskRisk, detailRisk] of [[false,false,false],[true,false,false],[false,true,false],[false,false,true],[true,true,false],[true,false,true],[false,true,true],[true,true,true]]) run('persistence', { continuityRisk, multiTaskRisk, detailRisk });
  for (const view of ['context', 'task-board', 'task-state', 'inline']) run('ownership', { view, actor: 'main' });
  run('ownership', { view: 'task-state', actor: 'evaluator' });
  run('state-transition', COMPLETION_OBSERVED);
  run('state-transition', { edge: 'pending->active' });
  run('state-transition', { edge: 'pending->completed' });
  run('state-publication-recovery', PUBLICATION_OBSERVED);
  run('state-publication-recovery', { ...PUBLICATION_OBSERVED, actualReadback: ['corrupt'] });
  run('state-publication-recovery', { ...PUBLICATION_OBSERVED, deltaPaths: ['protected'] });
  const task2 = { actorAllowed: true, deltaPaths: ['task'], allowedPaths: ['task'], actualReadback: 'next', expectedReadback: 'next', observationIdentity: 'hash', physicalObservation: true, conflict: false };
  run('task2-invariant-observation', task2);
  run('task2-invariant-observation', { ...task2, conflict: true });
  run('task2-invariant-observation', { ...task2, deltaPaths: ['protected'] });
  run('task2-invariant-observation', { ...task2, actorAllowed: false, deltaPaths: [] });
  run('task2-invariant-observation', { ...task2, actorAllowed: false });
  run('task2-invariant-observation', { ...task2, actualReadback: 'corrupt' });
  run('waiver', { ...WAIVER_OBSERVED, gate: 'protected-state' });
  run('waiver', WAIVER_OBSERVED);
  run('waiver', { gate: 'documentation-format' });
  run('retry-storage', { event: 'valid-quality-failure' });
  for (const event of ['valid-quality-failure', 'artifact-free-operational-failure', 'unsupported-finding', 'observer-timeout-before-terminal', 'resume-authorized']) run('retry-storage', { ...RETRY_OBSERVED, event });
  run('readiness-unlock', READY);
  run('readiness-unlock', { ...READY, predecessorState: 'blocked' });
  run('readiness-unlock', { ...READY, prerequisitesAcceptedCurrent: false });
  run('readiness-unlock', { ...READY, mainUnlockDecision: false });
  run('readiness-unlock', { ...READY, predecessorState: 'active' });
  const conflict = { protectedOrExtraWrite: false, stateConflict: false, observationComplete: true, artifactComplete: true, strictVerdict: 'PASS' };
  run('conflict-error-precedence', conflict);
  run('conflict-error-precedence', { ...conflict, strictVerdict: 'FAIL' });
  run('conflict-error-precedence', { ...conflict, protectedOrExtraWrite: true });
  run('conflict-error-precedence', { ...conflict, stateConflict: true });
  run('conflict-error-precedence', { ...conflict, observationComplete: false });
  run('task3-currentness', CURRENTNESS);
  run('task3-currentness', { ...CURRENTNESS, ownerCurrent: false });
  run('topology', { writePaths: [] });
  run('topology', { writePaths: ['source'] });
  for (const facts of [
    { ...RETRY_OBSERVED, event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 1 },
    { ...RETRY_OBSERVED, event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 2, interventionComplete: false },
    { ...RETRY_OBSERVED, event: 'valid-quality-failure', counterKind: 'quality', cumulativeCount: 3, interventionComplete: true },
    { ...RETRY_OBSERVED, event: 'artifact-free-operational-failure', counterKind: 'operational', causeCount: 1 },
    { ...RETRY_OBSERVED, event: 'artifact-free-operational-failure', counterKind: 'operational', causeCount: 2, interventionComplete: false },
    { ...RETRY_OBSERVED, event: 'artifact-free-operational-failure', counterKind: 'operational', causeCount: 3, interventionComplete: true },
    { ...RETRY_OBSERVED, event: 'resume-authorized', counterKind: 'resume', newEvidenceOrUserDecision: true, resumedBudget: 1 },
    { ...RETRY_OBSERVED, event: 'unsupported-finding', counterKind: 'quality', cumulativeCount: 1 },
    { counterKind: 'quality', cumulativeCount: 1 },
  ]) run('retry-control', facts);
  run('acceptance-proxy', ACCEPTANCE_OBSERVED);
  run('acceptance-proxy', { proxyOnly: true });
  run('acceptance-proxy', { proxyOnly: false });
  run('subjective-authority', SUBJECTIVE_OBSERVED);
  run('subjective-authority', { ...SUBJECTIVE_OBSERVED, evaluatorClaimsFinal: true });
  run('subjective-authority', { ...SUBJECTIVE_OBSERVED, rubricDelegatesMain: false });
  run('subjective-authority', { ...SUBJECTIVE_OBSERVED, artifactObservationIdentity: null });
  run('run-learning-scan-storage', { contextSelected: true });
  run('run-learning-scan-storage', { contextSelected: false });
  run('run-learning-scan-storage', {});
  run('run-learning-scan-transfer', { plannedContinuityTransfer: true, exactInlineScanObserved: false, contextSelected: true, contextScanAbsent: true });
  run('run-learning-scan-transfer', { plannedContinuityTransfer: true, exactInlineScanObserved: true, contextSelected: true, contextScanAbsent: true });
  run('run-learning-scan-transfer', { plannedContinuityTransfer: false, exactInlineScanObserved: true, contextSelected: false, contextScanAbsent: true });
  run('run-learning-scan-transfer', { plannedContinuityTransfer: true, exactInlineScanObserved: true, contextSelected: false, contextScanAbsent: true });
  const scan = { nonTrivial: true, terminalState: 'accepted', actor: 'main', terminalObservationCurrent: true, terminalEvidenceCurrent: true, stateConflict: false, predecessorEvidenceComplete: true, viewSetMatchesPersistence: true, runAlreadyTerminal: true, sameMainTerminalizationSession: true, priorScanObserved: false, priorScanConflict: false, priorScanStale: false, priorScanExact: false, contextSelected: false };
  run('run-learning-scan', { ...scan, nonTrivial: false });
  run('run-learning-scan', { ...scan, sameMainTerminalizationSession: false });
  run('run-learning-scan', { ...scan, priorScanObserved: true, priorScanConflict: true });
  run('run-learning-scan', { ...scan, priorScanObserved: true, priorScanStale: true });
  run('run-learning-scan', { ...scan, sameMainTerminalizationSession: false, priorScanObserved: true, priorScanExact: true });
  run('run-learning-scan', { ...scan, contextSelected: true });
  run('run-learning-scan', scan);
  run('run-learning-scan', { ...scan, sameMainTerminalizationSession: undefined, priorScanObserved: true });
  const triggerFields = contract.byId.get('run-learning.triggers').value.fields;
  run('run-learning-trigger', Object.fromEntries(triggerFields.map((field, index) => [field, index === 0])));
  run('run-learning-trigger', Object.fromEntries(triggerFields.map((field) => [field, false])));
  const evidence = { sensitiveAccessOutsideAuthority: false, copiedSensitiveContent: false, safeEvidenceReferencesEstablished: true, identityConflict: false, ownerConflict: false, triggerTerminalConflict: false, protectedDelta: false, evidenceFieldsComplete: true, identitiesCurrent: true, fabricatedPlaceholder: false, physicalReadbackComplete: true };
  run('run-learning-evidence', { ...evidence, sensitiveAccessOutsideAuthority: true });
  run('run-learning-evidence', { ...evidence, identityConflict: true });
  run('run-learning-evidence', { ...evidence, evidenceFieldsComplete: false });
  run('run-learning-evidence', evidence);
  run('run-learning-evidence', { safeEvidenceReferencesEstablished: true });
  run('run-learning-artifact', { scanCode: 'SCAN_REQUIRED_INLINE', triggerCode: 'NO_LEARNING_TRIGGER', evidenceCode: 'EVIDENCE_SUFFICIENT' });
  run('run-learning-artifact', { scanCode: 'SCAN_REQUIRED_INLINE', triggerCode: 'LEARNING_TRIGGER_OBSERVED', evidenceCode: 'EVIDENCE_SUFFICIENT' });
  run('run-learning-artifact', { scanCode: 'SCAN_REQUIRED_INLINE', triggerCode: 'LEARNING_TRIGGER_OBSERVED', evidenceCode: 'PRIVACY_SAFETY_STOP' });
  run('run-learning-artifact', { scanCode: 'SCAN_INCOMPLETE_STOP', triggerCode: 'NO_LEARNING_TRIGGER', evidenceCode: 'EVIDENCE_INCOMPLETE_STOP' });
  const review = { selectedCapability: 'result-evaluator', reviewType: 'run-learning-case-review', uniqueReportPathAbsentBeforeLaunch: true, candidateBindingsExact: true, reportComplete: true, strictVerdict: 'PASS', reportOnlyDelta: true, reviewerRepairedOrLaunched: false };
  run('run-learning-review', review);
  run('run-learning-review', { ...review, reportOnlyDelta: false });
  run('learning-change-route', { requestedHarnessMutation: true, requestedGlobalMust: false, requestedLaunch: false });
  run('learning-change-route', { requestedHarnessMutation: false, requestedGlobalMust: false, requestedLaunch: false, reviewedCaseEvidence: true, laterExplicitHumanDecision: true, newTaskIdentity: true, mainBoundaryIssued: true });
  run('learning-change-route', { requestedHarnessMutation: false, requestedGlobalMust: false, requestedLaunch: false });
  const custody = { phase: 'plan', action: 'create', sourceCount: 1, targetCount: 0, targetStatus: undefined, targetStatusKey: '', targetAbsent: true, applicabilityStrictlyNarrower: true, containedSourceOnlyTarget: true, actorMatchesCustodian: true, protectedOrPackageDelta: false, realRepositoryTarget: false, humanDispositionCurrent: true, custodianAuthorizationCurrent: true, reviewCurrent: true, mainDispositionCurrent: true, libraryManifestCurrent: true, preimageConflict: false, duplicateIdentityOrPath: false, successorAbsent: true, contentComplete: true, semanticConflict: false, humanEnumeratedChangesOnly: true };
  run('central-case-custody', { ...custody, containedSourceOnlyTarget: false });
  run('central-case-custody', { ...custody, humanDispositionCurrent: false });
  run('central-case-custody', { ...custody, preimageConflict: true });
  run('central-case-custody', { ...custody, semanticConflict: true });
  run('central-case-custody', { ...custody, phase: 'readback', postimageMatchesPlan: false });
  run('central-case-custody', { ...custody, phase: 'readback', postimageMatchesPlan: true });
  run('central-case-custody', custody);
  run('central-case-custody', { ...custody, action: 'update', targetCount: 1, targetStatus: 'active' });
  run('central-case-custody', { ...custody, action: 'merge', targetCount: 2, targetStatusKey: 'active,active' });
  run('central-case-custody', { ...custody, action: 'downgrade', targetCount: 1, targetStatus: 'active' });
  run('central-case-custody', { ...custody, action: 'reject' });
  run('central-case-custody', { ...custody, action: 'supersede', targetCount: 1, targetStatus: 'active' });
  run('central-case-custody', { ...custody, action: 'retire', targetCount: 1, targetStatus: 'active' });
  run('central-case-custody', { ...custody, action: 'unknown' });
  return traces;
}

test('every normative source field is consumed by a causal load, decision, enum, projection or interface trace', async () => {
  const contract = await loadWorkTruthContract(ROOT);
  const traces = [contract.loadTrace, ...allDecisionWinnerTraces(contract)];
  traces.push(validateEnum(contract, 'state.vocabulary', 'completed'));
  traces.push(validateEnum(contract, 'run.end-vocabulary', 'accepted'));
  traces.push(validateEnum(contract, 'run-learning.root-causes', 'implementation'));
  traces.push(validateEnum(contract, 'central-case.status', 'active'));
  const compactSource = Object.fromEntries(contract.byId.get('compaction.preserved').value.fields.map((field) => [field, field]));
  traces.push(project(contract, 'compaction.preserved', compactSource).trace);
  for (const id of ['run-learning.triggers', 'run-learning.evidence-index', 'run-learning.retrospective', 'run-learning.candidate', 'central-case.content']) {
    const source = Object.fromEntries(contract.byId.get(id).value.fields.map((field) => [field, field]));
    traces.push(project(contract, id, source).trace);
  }
  for (const [id, expected] of Object.entries(INTERFACES)) {
    const payload = Object.fromEntries(expected.emits.map((field) => [field, field]));
    traces.push(validateInterface(contract, id, payload));
  }
  assert.equal(assertAllNormativeFieldsConsumed(contract, traces), true);
});
