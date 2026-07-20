import assert from 'node:assert/strict';
import test from 'node:test';

import {
  REQUIRED_T03_IDS,
  assertT03SourceAvailable,
  centralCase,
  runCaseReviewScenario,
  runCustodyScenario,
  runLearningScanScenario,
  triggerIds,
} from '../support/t03-learning-fixtures.mjs';
import {
  ROOT,
  WorkTruthContractError,
  decide,
  loadWorkTruthContract,
  rewriteRecord,
  validateEnum,
  withTempContractRoot,
} from '../support/t02-work-truth-fixtures.mjs';

function errorCode(code) {
  return (error) => error instanceof WorkTruthContractError && error.code === code;
}

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

const SCAN_FIRST_INLINE = Object.freeze({
  nonTrivial: true, terminalState: 'accepted', actor: 'main', terminalObservationCurrent: true,
  terminalEvidenceCurrent: true, stateConflict: false, predecessorEvidenceComplete: true,
  viewSetMatchesPersistence: true, runAlreadyTerminal: true, sameMainTerminalizationSession: true,
  priorScanObserved: false, priorScanConflict: false, priorScanStale: false, priorScanExact: false, contextSelected: false,
});

const EVIDENCE_SUFFICIENT = Object.freeze({
  sensitiveAccessOutsideAuthority: false, copiedSensitiveContent: false, safeEvidenceReferencesEstablished: true,
  identityConflict: false, ownerConflict: false, triggerTerminalConflict: false, protectedDelta: false,
  evidenceFieldsComplete: true, identitiesCurrent: true, fabricatedPlaceholder: false, physicalReadbackComplete: true,
});

const CUSTODY_COMMON = Object.freeze({
  phase: 'plan', sourceCount: 1, targetCount: 0, targetAbsent: true, targetStatus: undefined,
  targetStatusKey: '', applicabilityStrictlyNarrower: true, containedSourceOnlyTarget: true,
  actorMatchesCustodian: true, protectedOrPackageDelta: false, realRepositoryTarget: false,
  humanDispositionCurrent: true, custodianAuthorizationCurrent: true, reviewCurrent: true,
  mainDispositionCurrent: true, libraryManifestCurrent: true, preimageConflict: false,
  duplicateIdentityOrPath: false, successorAbsent: true, contentComplete: true,
  semanticConflict: false, humanEnumeratedChangesOnly: true,
});

const ACTION_FACTS = Object.freeze({
  create: { ...CUSTODY_COMMON, action: 'create' },
  update: { ...CUSTODY_COMMON, action: 'update', targetCount: 1, targetStatus: 'active' },
  merge: { ...CUSTODY_COMMON, action: 'merge', targetCount: 2, targetStatusKey: 'active,active' },
  downgrade: { ...CUSTODY_COMMON, action: 'downgrade', targetCount: 1, targetStatus: 'active' },
  reject: { ...CUSTODY_COMMON, action: 'reject' },
  supersede: { ...CUSTODY_COMMON, action: 'supersede', targetCount: 1, targetStatus: 'active' },
  retire: { ...CUSTODY_COMMON, action: 'retire', targetCount: 1, targetStatus: 'active' },
});

test('learning contract closes the exact source-owned domains without template decision authority', async () => {
  const contract = await assertT03SourceAvailable();
  assert.equal(REQUIRED_T03_IDS.every((id) => contract.byId.has(id)), true);
  assert.deepEqual(triggerIds(contract), TRIGGERS);
  assert.deepEqual(contract.byId.get('run.end-vocabulary').value.values, ['accepted', 'blocked', 'exhausted', 'stopped']);
  assert.equal(contract.records.filter(({ value }) => value.kind === 'decision' && value.sourceOwner.includes('/templates/')).length, 0);
  assert.equal(contract.paths.includes('task-docs/_harness/templates/retrospective-case-template.md'), false);
});

test('decisive learning and custody facts expose physical artifact observations rather than caller assertions', async () => {
  const scan = await runLearningScanScenario(undefined, { terminalSessionArtifact: 'missing' });
  assert.equal(scan.scan.result.code, 'SCAN_HISTORY_UNAVAILABLE_STOP');
  assert.equal(scan.observations.terminalSession.present, false);

  const review = await runCaseReviewScenario(undefined, { reviewArtifact: 'binding-mismatch' });
  assert.equal(review.review.result.code, 'CASE_REVIEW_INVALID_STOP');
  assert.equal(review.observations.bindingManifest.matches, false);

  const arbitrary = centralCase({
    caseIdentity: 'case-arbitrary',
    reviewIdentities: ['no-physical-review-artifact'],
    humanDispositionIdentity: 'no-physical-human-artifact',
    custodianAuthorizationIdentity: 'no-physical-custodian-artifact',
  });
  const custody = await runCustodyScenario(undefined, {
    action: 'create', preCases: [], postCases: [arbitrary], custodyArtifacts: 'missing',
  });
  assert.equal(custody.plan.result.code, 'HUMAN_CUSTODY_REQUIRED_STOP');
  assert.equal(custody.observations.authorityBindings.complete, false);
  assert.deepEqual(custody.delta, { add: [], replace: [], remove: [] });
});

test('all eight persistence outcomes keep exactly one scan owner and never assign Board or Task State', async () => {
  const contract = await assertT03SourceAvailable();
  for (const [continuityRisk, multiTaskRisk, detailRisk] of [
    [false, false, false], [true, false, false], [false, true, false], [false, false, true],
    [true, true, false], [true, false, true], [false, true, true], [true, true, true],
  ]) {
    const persistence = decide(contract, 'persistence', { continuityRisk, multiTaskRisk, detailRisk });
    const storage = decide(contract, 'run-learning-scan-storage', { contextSelected: persistence.result.representations.includes('context') });
    assert.equal(storage.result.owner, continuityRisk ? 'context' : 'main');
    assert.equal(storage.result.boardOwnsScan, false);
    assert.equal(storage.result.taskStateOwnsScan, false);
  }
});

test('scan decision distinguishes first, exact repeat, conflict, stale, lost history and ineligible Task-like input', async () => {
  const contract = await assertT03SourceAvailable();
  assert.equal(decide(contract, 'run-learning-scan', SCAN_FIRST_INLINE).result.code, 'SCAN_REQUIRED_INLINE');
  assert.equal(decide(contract, 'run-learning-scan', { ...SCAN_FIRST_INLINE, contextSelected: true }).result.code, 'SCAN_REQUIRED_CONTEXT');
  assert.equal(decide(contract, 'run-learning-scan', { ...SCAN_FIRST_INLINE, sameMainTerminalizationSession: false, priorScanObserved: true, priorScanExact: true }).result.code, 'SCAN_ALREADY_RECORDED_NOOP');
  assert.equal(decide(contract, 'run-learning-scan', { ...SCAN_FIRST_INLINE, priorScanObserved: true, priorScanConflict: true }).result.code, 'SCAN_IDENTITY_CONFLICT_STOP');
  assert.equal(decide(contract, 'run-learning-scan', { ...SCAN_FIRST_INLINE, priorScanObserved: true, priorScanStale: true }).result.code, 'SCAN_STALE_STOP');
  assert.equal(decide(contract, 'run-learning-scan', { ...SCAN_FIRST_INLINE, sameMainTerminalizationSession: false }).result.code, 'SCAN_HISTORY_UNAVAILABLE_STOP');
  assert.equal(decide(contract, 'run-learning-scan', { ...SCAN_FIRST_INLINE, terminalState: 'completed' }).result.code, 'RUN_SCAN_NOT_ELIGIBLE_STOP');
  assert.equal(decide(contract, 'run-learning-scan', { ...SCAN_FIRST_INLINE, actor: 'planner' }).result.code, 'RUN_SCAN_NOT_ELIGIBLE_STOP');
});

test('each exact trigger leaf independently selects learning and clean facts do not', async () => {
  const contract = await assertT03SourceAvailable();
  for (const trigger of TRIGGERS) {
    const facts = Object.fromEntries(TRIGGERS.map((id) => [id, id === trigger]));
    assert.equal(decide(contract, 'run-learning-trigger', facts).result.code, 'LEARNING_TRIGGER_OBSERVED', trigger);
  }
  assert.equal(decide(contract, 'run-learning-trigger', Object.fromEntries(TRIGGERS.map((id) => [id, false]))).result.code, 'NO_LEARNING_TRIGGER');
});

test('evidence precedence is privacy, conflict, insufficiency, then sufficient', async () => {
  const contract = await assertT03SourceAvailable();
  assert.equal(decide(contract, 'run-learning-evidence', { ...EVIDENCE_SUFFICIENT, sensitiveAccessOutsideAuthority: true, identityConflict: true, evidenceFieldsComplete: false }).result.code, 'PRIVACY_SAFETY_STOP');
  assert.equal(decide(contract, 'run-learning-evidence', { ...EVIDENCE_SUFFICIENT, identityConflict: true, evidenceFieldsComplete: false }).result.code, 'EVIDENCE_CONFLICT_STOP');
  assert.equal(decide(contract, 'run-learning-evidence', { ...EVIDENCE_SUFFICIENT, evidenceFieldsComplete: false }).result.code, 'EVIDENCE_INSUFFICIENT_NO_CANDIDATE');
  assert.equal(decide(contract, 'run-learning-evidence', EVIDENCE_SUFFICIENT).result.code, 'EVIDENCE_SUFFICIENT');
});

test('case review and learning-change route never promote, mutate or launch', async () => {
  const contract = await assertT03SourceAvailable();
  const review = decide(contract, 'run-learning-review', {
    selectedCapability: 'result-evaluator', reviewType: 'run-learning-case-review', uniqueReportPathAbsentBeforeLaunch: true,
    candidateBindingsExact: true, reportComplete: true, strictVerdict: 'PASS', reportOnlyDelta: true, reviewerRepairedOrLaunched: false,
  });
  assert.deepEqual(review.result, { valid: true, promotionAuthority: false, automaticTransition: false, code: 'CASE_REVIEW_REPORT_VALID' });
  for (const facts of [
    { requestedHarnessMutation: true, requestedGlobalMust: false, requestedLaunch: false },
    { requestedHarnessMutation: false, requestedGlobalMust: true, requestedLaunch: false },
    { requestedHarnessMutation: false, requestedGlobalMust: false, requestedLaunch: true },
  ]) {
    const stopped = decide(contract, 'learning-change-route', facts);
    assert.equal(stopped.result.code, 'AUTOMATIC_LEARNING_CHANGE_STOP');
    assert.equal(stopped.result.mayWrite, false);
    assert.equal(stopped.result.mayLaunch, false);
  }
  const routed = decide(contract, 'learning-change-route', {
    requestedHarnessMutation: false, requestedGlobalMust: false, requestedLaunch: false,
    reviewedCaseEvidence: true, laterExplicitHumanDecision: true, newTaskIdentity: true, mainBoundaryIssued: true,
  });
  assert.equal(routed.result.code, 'ROUTE_TO_SEPARATE_AUTHORIZED_TASK');
  assert.equal(routed.result.mayWrite, false);
  assert.equal(routed.result.mayLaunch, false);
});

test('seven custody actions select distinct source plans and action-specific lifecycle results', async () => {
  const contract = await assertT03SourceAvailable();
  for (const [action, facts] of Object.entries(ACTION_FACTS)) {
    const plan = decide(contract, 'central-case-custody', facts);
    assert.equal(plan.result.code, 'CUSTODY_ACTION_READY', action);
    assert.equal(plan.result.action, action, action);
  }
  assert.deepEqual(decide(contract, 'central-case-custody', { ...ACTION_FACTS.create, actorMatchesCustodian: false }).result.code, 'CUSTODY_CONTAINMENT_OR_OWNER_STOP');
  assert.deepEqual(decide(contract, 'central-case-custody', { ...ACTION_FACTS.create, humanDispositionCurrent: false }).result.code, 'HUMAN_CUSTODY_REQUIRED_STOP');
  assert.deepEqual(decide(contract, 'central-case-custody', { ...ACTION_FACTS.create, preimageConflict: true }).result.code, 'CUSTODY_PREIMAGE_CONFLICT_STOP');
  assert.deepEqual(decide(contract, 'central-case-custody', { ...ACTION_FACTS.create, semanticConflict: true }).result.code, 'CUSTODY_SEMANTICS_STOP');
});

const SOURCE_VARIANTS = Object.freeze([
  ['run-learning-scan-storage', 'run-learning.scan-storage-inline', 'run-learning.scan-storage-incomplete', { contextSelected: false }, 'SCAN_STORAGE_INLINE'],
  ['run-learning-scan-transfer', 'run-learning.scan-transfer', 'run-learning.scan-transfer-incomplete', { plannedContinuityTransfer: true, exactInlineScanObserved: true, contextSelected: true, contextScanAbsent: true }, 'PUBLISH_INLINE_SCAN_TO_CONTEXT'],
  ['run-learning-scan', 'run-learning.scan-inline', 'run-learning.scan-incomplete', SCAN_FIRST_INLINE, 'SCAN_REQUIRED_INLINE'],
  ['run-learning-evidence', 'run-learning.evidence-sufficient', 'run-learning.evidence-incomplete-stop', EVIDENCE_SUFFICIENT, 'EVIDENCE_SUFFICIENT'],
  ['run-learning-artifact', 'run-learning.artifact-create', 'run-learning.artifact-ineligible', { scanCode: 'SCAN_REQUIRED_INLINE', triggerCode: 'LEARNING_TRIGGER_OBSERVED', evidenceCode: 'EVIDENCE_SUFFICIENT' }, 'CREATE_RUN_RETROSPECTIVE_AND_CANDIDATE'],
  ['run-learning-review', 'run-learning.review-valid', 'run-learning.review-invalid', { selectedCapability: 'result-evaluator', reviewType: 'run-learning-case-review', uniqueReportPathAbsentBeforeLaunch: true, candidateBindingsExact: true, reportComplete: true, strictVerdict: 'PASS', reportOnlyDelta: true, reviewerRepairedOrLaunched: false }, 'CASE_REVIEW_REPORT_VALID'],
  ['learning-change-route', 'learning-change.automatic-stop', 'learning-change.human-required', { requestedHarnessMutation: true, requestedGlobalMust: false, requestedLaunch: false }, 'AUTOMATIC_LEARNING_CHANGE_STOP'],
]);

const PROJECTION_VARIANTS = Object.freeze([
  'run-learning.triggers',
  'run-learning.evidence-index',
  'run-learning.retrospective',
  'run-learning.candidate',
  'central-case.content',
]);

test('new projections reject omission, follow field reversal and reject source contradiction', async (context) => {
  for (const id of PROJECTION_VARIANTS) {
    await context.test(id, async () => {
      const canonical = await assertT03SourceAvailable();
      const fields = canonical.byId.get(id).value.fields;
      assert.equal(fields.length > 0, true);
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, () => null);
        await assert.rejects(loadWorkTruthContract(root), (error) => error instanceof WorkTruthContractError && ['CONTRACT_MANIFEST_IDS', 'CONTRACT_MANIFEST_DOMAINS'].includes(error.code));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, (record) => ({ ...record, fields: [...record.fields].reverse() }));
        const changed = await loadWorkTruthContract(root);
        assert.notDeepEqual(changed.byId.get(id).value.fields, fields);
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, (record) => ({ ...record, forbiddenFields: [...(record.forbiddenFields ?? []), record.fields[0]] }));
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_CONTRADICTION'));
      });
    });
  }
});

test('new vocabularies reject omission, change validation when reversed and reject duplicate values', async (context) => {
  for (const id of ['run.end-vocabulary', 'run-learning.root-causes', 'central-case.status']) {
    await context.test(id, async () => {
      const canonical = await assertT03SourceAvailable();
      const original = canonical.byId.get(id).value.values[0];
      validateEnum(canonical, id, original);
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, () => null);
        await assert.rejects(loadWorkTruthContract(root), (error) => error instanceof WorkTruthContractError && ['CONTRACT_MANIFEST_IDS', 'CONTRACT_MANIFEST_DOMAINS'].includes(error.code));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, (record) => ({ ...record, values: [`reversed-${original}`, ...record.values.slice(1)] }));
        const changed = await loadWorkTruthContract(root);
        assert.throws(() => validateEnum(changed, id, original), errorCode('CONTRACT_ENUM_VALUE'));
        validateEnum(changed, id, `reversed-${original}`);
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, id, (record) => ({ ...record, values: [record.values[0], ...record.values] }));
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_DUPLICATE_VALUE'));
      });
    });
  }
});

test('new controlling domains reject omission, follow reversal and fail same-priority contradiction', async (context) => {
  for (const [domain, target, fallback, facts, code] of SOURCE_VARIANTS) {
    await context.test(domain, async () => {
      const canonical = await assertT03SourceAvailable();
      assert.equal(decide(canonical, domain, facts).result.code, code);
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, target, () => null);
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MANIFEST_IDS'));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, target, (record) => ({ ...record, result: { ...record.result, code: `REVERSED_${code}` } }));
        const changed = await loadWorkTruthContract(root);
        assert.notEqual(decide(changed, domain, facts).result.code, code);
      });
      await withTempContractRoot(ROOT, async (root) => {
        const source = (await assertT03SourceAvailable()).byId.get(target).value;
        await rewriteRecord(root, fallback, (record) => ({ ...record, priority: source.priority, when: structuredClone(source.when) }));
        const changed = await loadWorkTruthContract(root);
        assert.throws(() => decide(changed, domain, facts), errorCode('CONTRACT_AMBIGUOUS_DECISION'));
      });
    });
  }
});

test('every custody action independently rejects omission, follows reversal and fails contradiction', async (context) => {
  for (const [action, facts] of Object.entries(ACTION_FACTS)) {
    const target = `central-case.${action}`;
    await context.test(action, async () => {
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, target, () => null);
        await assert.rejects(loadWorkTruthContract(root), errorCode('CONTRACT_MANIFEST_IDS'));
      });
      await withTempContractRoot(ROOT, async (root) => {
        await rewriteRecord(root, target, (record) => ({ ...record, result: { ...record.result, action: `reversed-${action}` } }));
        const changed = await loadWorkTruthContract(root);
        assert.notEqual(decide(changed, 'central-case-custody', facts).result.action, action);
      });
      await withTempContractRoot(ROOT, async (root) => {
        const source = (await assertT03SourceAvailable()).byId.get(target).value;
        await rewriteRecord(root, 'central-case.incomplete-stop', (record) => ({ ...record, priority: source.priority, when: structuredClone(source.when) }));
        const changed = await loadWorkTruthContract(root);
        assert.throws(() => decide(changed, 'central-case-custody', facts), errorCode('CONTRACT_AMBIGUOUS_DECISION'));
      });
    });
  }
});
