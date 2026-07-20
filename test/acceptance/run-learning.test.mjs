import assert from 'node:assert/strict';
import { lstat, mkdtemp, rm, symlink } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  assertControlledFixtureRoot,
  assertRealLearningPathsAbsent,
  centralCase,
  inspectPackageAbsence,
  runCaseReviewScenario,
  runCustodyScenario,
  runInlineTransferScenario,
  runLearningBarrierScenario,
  runLearningScanScenario,
} from '../support/t03-learning-fixtures.mjs';

const PERSISTENCE_FACTS = Object.freeze([
  [false, false, false],
  [true, false, false],
  [false, true, false],
  [false, false, true],
  [true, true, false],
  [true, false, true],
  [false, true, true],
  [true, true, true],
]);

const TRIGGERS = Object.freeze([
  'retry-domain-two-valid-failures',
  'required-intervention',
  'run-blocked',
  'run-exhausted',
  'waiver-recorded',
  'downstream-found-upstream-defect',
  'user-rejected-harness-accepted-result',
  'ac-pass-but-user-fail',
  'producer-evaluator-independence-failure',
  'report-lost',
  'false-completion',
  'report-unverifiable',
  'protected-state-event',
  'ownership-event',
  'truthfulness-event',
  'no-fabrication-event',
  'repeated-calibration-pattern',
]);

function entry(manifest, pathName) {
  return manifest.find(({ path: candidate }) => candidate === pathName);
}

test('all eight persistence outcomes physically perform clean and triggered first/repeat scans without duplicate truth', async () => {
  for (const [continuityRisk, multiTaskRisk, detailRisk] of PERSISTENCE_FACTS) {
    const label = `${continuityRisk}/${multiTaskRisk}/${detailRisk}`;
    const clean = await runLearningScanScenario(undefined, { continuityRisk, multiTaskRisk, detailRisk });
    assert.equal(clean.scan.result.code, continuityRisk ? 'SCAN_REQUIRED_CONTEXT' : 'SCAN_REQUIRED_INLINE', label);
    assert.equal(clean.artifact.result.code, 'SCAN_COMPLETE_NO_FORMAL_ARTIFACT', label);
    assert.equal(clean.afterFirst.some(({ path: item }) => item.startsWith('learning')), false, label);
    assert.equal(clean.repeat.result.code, 'SCAN_ALREADY_RECORDED_NOOP', label);
    assert.deepEqual(clean.repeatDelta, [], label);
    if (!continuityRisk) assert.deepEqual(clean.firstDelta, [], `${label}: inline clean scan must be zero filesystem delta`);
    for (const view of ['task-board.json', 'task-state.json']) {
      if (entry(clean.before, view)) assert.deepEqual(entry(clean.before, view), entry(clean.afterFirst, view), `${label}:${view}`);
    }

    const triggered = await runLearningScanScenario(undefined, {
      continuityRisk, multiTaskRisk, detailRisk, triggerIds: ['false-completion'],
    });
    assert.equal(triggered.artifact.result.code, 'CREATE_RUN_RETROSPECTIVE_AND_CANDIDATE', label);
    assert.ok(triggered.retrospectiveObservation, label);
    assert.ok(triggered.candidateObservation, label);
    assert.ok(entry(triggered.afterFirst, 'learning/RETROSPECTIVE-v1.md'), label);
    assert.ok(entry(triggered.afterFirst, 'learning/cases/candidates/NEGATIVE_CASE-v1.md'), label);
    assert.equal(triggered.repeat.result.code, 'SCAN_ALREADY_RECORDED_NOOP', label);
    assert.deepEqual(triggered.repeatDelta, [], label);
    for (const view of ['task-board.json', 'task-state.json']) {
      if (entry(triggered.before, view)) assert.deepEqual(entry(triggered.before, view), entry(triggered.afterFirst, view), `${label}:${view}`);
    }
  }
});

test('same terminal bytes distinguish same-session first scan from exact repeat, conflict, stale and lost history', async () => {
  const first = await runLearningScanScenario(undefined, {});
  assert.equal(first.scan.result.code, 'SCAN_REQUIRED_INLINE');
  const exact = await runLearningScanScenario(undefined, { history: 'exact' });
  assert.equal(exact.scan.result.code, 'SCAN_ALREADY_RECORDED_NOOP');
  assert.deepEqual(exact.firstDelta, []);
  const conflict = await runLearningScanScenario(undefined, { history: 'conflict' });
  assert.equal(conflict.scan.result.code, 'SCAN_IDENTITY_CONFLICT_STOP');
  assert.deepEqual(conflict.firstDelta, []);
  const stale = await runLearningScanScenario(undefined, { history: 'stale' });
  assert.equal(stale.scan.result.code, 'SCAN_STALE_STOP');
  assert.deepEqual(stale.firstDelta, []);
  const lost = await runLearningScanScenario(undefined, { history: 'lost' });
  assert.equal(lost.scan.result.code, 'SCAN_HISTORY_UNAVAILABLE_STOP');
  assert.deepEqual(lost.firstDelta, []);
});

test('a missing physical terminalization-session observation cannot be relabelled as a first scan', async () => {
  const observed = await runLearningScanScenario(undefined, { terminalSessionArtifact: 'missing' });
  assert.equal(observed.scan.result.code, 'SCAN_HISTORY_UNAVAILABLE_STOP');
  assert.equal(observed.observations.terminalSession.present, false);
  assert.deepEqual(observed.firstDelta, []);
});

test('planned inline-to-Context transfer preserves exact scan bytes and later reentry no-ops', async () => {
  const transferred = await runInlineTransferScenario();
  assert.equal(transferred.first.result.code, 'SCAN_REQUIRED_INLINE');
  assert.equal(transferred.transfer.result.code, 'PUBLISH_INLINE_SCAN_TO_CONTEXT');
  assert.equal(transferred.exactBytesPreserved, true);
  assert.ok(transferred.observations.inlineScan?.hash);
  assert.ok(transferred.observations.transferRequest.hash);
  assert.ok(transferred.observations.context?.hash);
  assert.equal(transferred.later.result.code, 'SCAN_ALREADY_RECORDED_NOOP');
  assert.deepEqual(transferred.delta, ['context.json']);
  const unavailable = await runInlineTransferScenario(undefined, { missingInline: true });
  assert.equal(unavailable.transfer.result.code, 'SCAN_HISTORY_UNAVAILABLE_STOP');
  assert.deepEqual(unavailable.delta, []);
});

test('all seventeen trigger leaves independently create exact retrospective/candidate bytes', async () => {
  for (const trigger of TRIGGERS) {
    const observed = await runLearningScanScenario(undefined, { triggerIds: [trigger] });
    assert.deepEqual(observed.selectedTriggers, [trigger], trigger);
    assert.equal(observed.artifact.result.code, 'CREATE_RUN_RETROSPECTIVE_AND_CANDIDATE', trigger);
    assert.equal(observed.candidateValue.triggerIds[0], trigger);
    assert.equal(observed.candidateValue.noAuthorityDeclarations.harnessChange, false);
    assert.equal(observed.retrospectiveValue.noAuthorityDeclarations.promotion, false);
  }
  assert.deepEqual((await runLearningScanScenario(undefined, { terminalState: 'blocked' })).selectedTriggers, ['run-blocked']);
  assert.deepEqual((await runLearningScanScenario(undefined, { terminalState: 'exhausted' })).selectedTriggers, ['run-exhausted']);
});

test('privacy, conflict, missing, stale, fabricated and protected evidence create no formal artifacts', async () => {
  for (const [kind, code] of [
    ['privacy', 'PRIVACY_SAFETY_STOP'],
    ['conflict', 'EVIDENCE_CONFLICT_STOP'],
    ['protected-delta', 'EVIDENCE_CONFLICT_STOP'],
    ['missing', 'EVIDENCE_INSUFFICIENT_NO_CANDIDATE'],
    ['stale', 'EVIDENCE_INSUFFICIENT_NO_CANDIDATE'],
    ['fabricated', 'EVIDENCE_INSUFFICIENT_NO_CANDIDATE'],
  ]) {
    const observed = await runLearningScanScenario(undefined, { triggerIds: ['false-completion'], evidence: kind });
    assert.equal(observed.evidence.result.code, code, kind);
    assert.equal(observed.artifact.result.code, 'LEARNING_ARTIFACT_STOP', kind);
    assert.equal(observed.afterFirst.some(({ path: item }) => item.startsWith('learning')), false, kind);
  }
});

test('physical evidence bytes and protected manifests, not classification flags, select every evidence stop', async () => {
  for (const [evidenceArtifact, code] of [
    ['missing-field', 'EVIDENCE_INSUFFICIENT_NO_CANDIDATE'],
    ['stale-identity', 'EVIDENCE_INSUFFICIENT_NO_CANDIDATE'],
    ['fabricated-placeholder', 'EVIDENCE_INSUFFICIENT_NO_CANDIDATE'],
    ['protected-delta', 'EVIDENCE_CONFLICT_STOP'],
  ]) {
    const observed = await runLearningScanScenario(undefined, {
      triggerIds: ['false-completion'], evidenceArtifact,
    });
    assert.equal(observed.evidence.result.code, code, evidenceArtifact);
    assert.equal(observed.observations.evidence.classification, evidenceArtifact, evidenceArtifact);
    assert.equal(observed.afterFirst.some(({ path: item }) => item.startsWith('learning')), false, evidenceArtifact);
  }
});

test('Task completion and nonterminal Run do not enter the learning lifecycle', async () => {
  const taskCompletion = await runLearningScanScenario(undefined, { terminalState: 'completed' });
  assert.equal(taskCompletion.scan.result.code, 'RUN_SCAN_NOT_ELIGIBLE_STOP');
  assert.equal(taskCompletion.afterFirst.some(({ path: item }) => item.startsWith('learning')), false);
  const trivial = await runLearningScanScenario(undefined, { nonTrivial: false });
  assert.equal(trivial.scan.result.code, 'RUN_SCAN_NOT_ELIGIBLE_STOP');
  assert.equal(trivial.afterFirst.some(({ path: item }) => item.startsWith('learning')), false);
});

test('case review is physically report-only; collision, partial, mismatch, repair and launch are invalid', async () => {
  for (const verdict of ['PASS', 'FAIL']) {
    const valid = await runCaseReviewScenario(undefined, { verdict });
    assert.equal(valid.review.result.code, 'CASE_REVIEW_REPORT_VALID');
    assert.equal(valid.review.result.promotionAuthority, false);
    assert.equal(valid.delta.length, 1);
    assert.match(valid.delta[0], /EVALUATOR_REPORT-invocation-01\.md$/);
  }
  for (const scenario of [
    { collision: true }, { partial: true }, { bindingMismatch: true }, { extraWrite: true }, { launched: true }, { capability: 'requirements-evaluator' },
  ]) {
    const invalid = await runCaseReviewScenario(undefined, scenario);
    assert.equal(invalid.review.result.code, 'CASE_REVIEW_INVALID_STOP');
  }
});

test('case-review binding and launch failures must exist in physical manifests', async () => {
  const mismatch = await runCaseReviewScenario(undefined, { reviewArtifact: 'binding-mismatch' });
  assert.equal(mismatch.review.result.code, 'CASE_REVIEW_INVALID_STOP');
  assert.equal(mismatch.observations.bindingManifest.matches, false);
  const launch = await runCaseReviewScenario(undefined, { launchArtifact: 'present' });
  assert.equal(launch.observations.launchDelta, true);
  assert.equal(launch.review.result.code, 'CASE_REVIEW_INVALID_STOP');
});

function custodyFixtures() {
  const a = centralCase({
    caseIdentity: 'case-a',
    downstreamConsumptionState: 'reference-only',
    downstreamConsumptionHistory: [{ consumer: 'historical-consumer', reference: 'history-a' }],
  });
  const b = centralCase({
    caseIdentity: 'case-b',
    downstreamConsumptionState: 'not-yet-consumed',
    downstreamConsumptionHistory: [{ consumer: 'historical-consumer', reference: 'history-b' }],
  });
  const create = centralCase({ caseIdentity: 'case-created' });
  const updated = centralCase({
    ...a,
    version: 2,
    facts: [...a.facts, { fact: 'human-enumerated update', evidence: 'evidence:update' }],
    provenance: { ...a.provenance, action: 'update', priorContentIdentity: a.contentIdentity },
  });
  const mergeSuccessor = centralCase({ caseIdentity: 'case-merged', mergedFrom: ['case-a', 'case-b'] });
  const mergedA = centralCase({ ...a, version: 2, status: 'merged', successor: 'case-merged', downstreamConsumptionState: 'closed-no-new-consumption', downstreamConsumptionHistory: [...a.downstreamConsumptionHistory, { consumer: 'merge', reference: 'case-merged' }] });
  const mergedB = centralCase({ ...b, version: 2, status: 'merged', successor: 'case-merged', downstreamConsumptionState: 'closed-no-new-consumption', downstreamConsumptionHistory: [...b.downstreamConsumptionHistory, { consumer: 'merge', reference: 'case-merged' }] });
  const downgraded = centralCase({ ...a, version: 2, status: 'downgraded', applicabilityBoundary: ['strictly narrower synthetic condition'], downstreamConsumptionState: 'reference-only', successor: null });
  const supersedeSuccessor = centralCase({ caseIdentity: 'case-successor', supersedes: ['case-a'] });
  const superseded = centralCase({ ...a, version: 2, status: 'superseded', successor: 'case-successor', downstreamConsumptionState: 'closed-no-new-consumption', downstreamConsumptionHistory: [...a.downstreamConsumptionHistory, { consumer: 'supersession', reference: 'case-successor' }] });
  const retired = centralCase({ ...a, version: 2, status: 'retired', successor: null, downstreamConsumptionState: 'closed-no-new-consumption' });
  return {
    create: { action: 'create', preCases: [], postCases: [create] },
    update: { action: 'update', preCases: [a], postCases: [updated] },
    merge: { action: 'merge', preCases: [a, b], postCases: [mergedA, mergedB, mergeSuccessor] },
    downgrade: { action: 'downgrade', preCases: [a], postCases: [downgraded] },
    reject: { action: 'reject', preCases: [], postCases: [] },
    supersede: { action: 'supersede', preCases: [a], postCases: [superseded, supersedeSuccessor] },
    retire: { action: 'retire', preCases: [a], postCases: [retired] },
  };
}

function falseCustodyFixtures() {
  const valid = custodyFixtures();
  return {
    create: { ...valid.create, postCases: [centralCase({ ...valid.create.postCases[0], version: 2 })] },
    update: { ...valid.update, postCases: [centralCase({ ...valid.update.postCases[0], downstreamConsumptionHistory: [] })] },
    merge: { ...valid.merge, postCases: [centralCase({ ...valid.merge.postCases[0], successor: null }), ...valid.merge.postCases.slice(1)] },
    downgrade: { ...valid.downgrade, postCases: [centralCase({ ...valid.downgrade.postCases[0], applicabilityBoundary: valid.downgrade.preCases[0].applicabilityBoundary })] },
    reject: { ...valid.reject, postCases: [centralCase({ caseIdentity: 'forbidden-reject-postimage' })] },
    supersede: { ...valid.supersede, postCases: [valid.supersede.postCases[0], centralCase({ ...valid.supersede.postCases[1], supersedes: [] })] },
    retire: { ...valid.retire, postCases: [centralCase({ ...valid.retire.postCases[0], status: 'active' })] },
  };
}

test('all seven human-custody actions physically match exact source plans and complete postimages', async () => {
  for (const [action, scenario] of Object.entries(custodyFixtures())) {
    const observed = await runCustodyScenario(undefined, scenario);
    assert.equal(observed.plan.result.action, action, action);
    assert.equal(observed.plan.result.code, 'CUSTODY_ACTION_READY', action);
    assert.equal(observed.postimageMatchesPlan, true, action);
    assert.equal(observed.readback.result.code, 'CUSTODY_ACTION_OBSERVED', action);
    assert.equal(observed.delta.add.length, observed.plan.result.addCount, action);
    assert.equal(observed.delta.replace.length, observed.plan.result.replaceCount, action);
    assert.equal(observed.delta.remove.length, 0, action);
  }
});

test('arbitrary custody identity strings cannot replace physical review, main, human or custodian artifacts', async () => {
  const arbitrary = centralCase({
    caseIdentity: 'case-arbitrary',
    reviewIdentities: ['no-physical-review-artifact'],
    humanDispositionIdentity: 'no-physical-human-artifact',
    custodianAuthorizationIdentity: 'no-physical-custodian-artifact',
  });
  const observed = await runCustodyScenario(undefined, {
    action: 'create', preCases: [], postCases: [arbitrary], custodyArtifacts: 'missing',
  });
  assert.equal(observed.plan.result.code, 'HUMAN_CUSTODY_REQUIRED_STOP');
  assert.equal(observed.observations.authorityBindings.complete, false);
  assert.deepEqual(observed.delta, { add: [], replace: [], remove: [] });
});

test('missing and stale custody-chain artifacts stop from their physical bindings before central writes', async () => {
  const base = custodyFixtures().create;
  for (const variant of [
    'review-missing', 'review-stale', 'main-missing', 'main-stale',
    'human-missing', 'human-stale', 'custodian-missing', 'custodian-stale',
  ]) {
    const observed = await runCustodyScenario(undefined, { ...base, custodyArtifact: variant });
    assert.equal(observed.plan.result.code, 'HUMAN_CUSTODY_REQUIRED_STOP', variant);
    assert.deepEqual(observed.delta, { add: [], replace: [], remove: [] }, variant);
    assert.equal(Object.values(observed.observations.decisionFacts).some((value) => value === false), true, variant);
  }
  const staleLibrary = await runCustodyScenario(undefined, { ...base, custodyArtifact: 'library-stale' });
  assert.equal(staleLibrary.plan.result.code, 'CUSTODY_PREIMAGE_CONFLICT_STOP');
  assert.equal(staleLibrary.observations.decisionFacts.libraryManifestCurrent, false);
  assert.deepEqual(staleLibrary.delta, { add: [], replace: [], remove: [] });
});

test('each custody action rejects an action-specific false postimage even with valid action/actor/path', async () => {
  for (const [action, scenario] of Object.entries(falseCustodyFixtures())) {
    const observed = await runCustodyScenario(undefined, { ...scenario, publishFalsePostimage: true });
    assert.equal(observed.plan.result.action, action, action);
    assert.equal(observed.postimageMatchesPlan, false, action);
    assert.equal(observed.readback.result.code, 'CUSTODY_POSTIMAGE_INVALID', action);
  }
});

test('custody containment, human, preimage and semantic failures stop before central delta', async () => {
  const base = custodyFixtures().create;
  for (const [change, code] of [
    [{ containedSourceOnlyTarget: false }, 'CUSTODY_CONTAINMENT_OR_OWNER_STOP'],
    [{ actorMatchesCustodian: false }, 'CUSTODY_CONTAINMENT_OR_OWNER_STOP'],
    [{ realRepositoryTarget: true }, 'CUSTODY_CONTAINMENT_OR_OWNER_STOP'],
    [{ humanDispositionCurrent: false }, 'HUMAN_CUSTODY_REQUIRED_STOP'],
    [{ custodianAuthorizationCurrent: false }, 'HUMAN_CUSTODY_REQUIRED_STOP'],
    [{ preimageConflict: true }, 'CUSTODY_PREIMAGE_CONFLICT_STOP'],
    [{ semanticConflict: true }, 'CUSTODY_SEMANTICS_STOP'],
  ]) {
    const observed = await runCustodyScenario(undefined, { ...base, ...change });
    assert.equal(observed.plan.result.code, code);
    assert.deepEqual(observed.delta, { add: [], replace: [], remove: [] });
  }
});

test('learning recommendations cannot mutate or launch, even after reviewed case evidence', async () => {
  for (const request of [
    { requestedHarnessMutation: true }, { requestedGlobalMust: true }, { requestedLaunch: true },
  ]) {
    const observed = await runLearningBarrierScenario(undefined, request);
    assert.equal(observed.decision.result.code, 'AUTOMATIC_LEARNING_CHANGE_STOP');
    assert.equal(observed.decision.result.mayWrite, false);
    assert.equal(observed.decision.result.mayLaunch, false);
    assert.equal(observed.zeroDelta, true);
  }
  const routed = await runLearningBarrierScenario(undefined, {
    reviewedCaseEvidence: true, laterExplicitHumanDecision: true, newTaskIdentity: true, mainBoundaryIssued: true,
  });
  assert.equal(routed.decision.result.code, 'ROUTE_TO_SEPARATE_AUTHORIZED_TASK');
  assert.equal(routed.decision.result.mayWrite, false);
  assert.equal(routed.decision.result.mayLaunch, false);
  assert.equal(routed.zeroDelta, true);
});

test('central cases and Run learning remain real-path absent and package surfaces are read-only/excluding', async () => {
  assert.equal(await assertRealLearningPathsAbsent(), true);
  const packageEvidence = await inspectPackageAbsence();
  assert.equal(packageEvidence.containsHistory, false);
  assert.equal(packageEvidence.containsCases, false);
  assert.equal(packageEvidence.unchanged, true);
});

test('fixture safety rejects repository and symlink roots', async () => {
  await assert.rejects(assertControlledFixtureRoot(process.cwd()), /T03_FIXTURE_ROOT_NOT_CONTROLLED|T03_FIXTURE_ROOT_REPOSITORY_COLLISION/);
  const holder = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t03-symlink-holder-'));
  try {
    const target = path.join(holder, 'oh-my-harness-t03-target');
    const link = path.join(holder, 'oh-my-harness-t03-link');
    await symlink(holder, link);
    assert.equal((await lstat(link)).isSymbolicLink(), true);
    await assert.rejects(assertControlledFixtureRoot(link), /T03_FIXTURE_ROOT_SYMLINK/);
    void target;
  } finally {
    await rm(holder, { recursive: true, force: true });
  }
});
