import assert from 'node:assert/strict';
import test from 'node:test';

import {
  REPORT_CAPABLE,
  classifyReviewAttempt,
  readAllProfiles,
  readText,
  reviewCanUnlock,
  sha256,
  validateLifecycle,
  validatePeerMessage,
  validateRecovery,
  validateWriterIntervals,
} from '../support/t01-governance-fixtures.mjs';

function validAttempt(overrides = {}) {
  return {
    completion: 'complete',
    verdict: 'PASS',
    mainVerified: true,
    mainDisposed: true,
    ...overrides,
  };
}

test('AC6-AC7: only main controls producer/evaluator exchange and exact artifact verification', () => {
  const candidateBytes = '# candidate\n';
  const reportBytes = '# report\n';
  assert.equal(validateLifecycle({
    events: [
      { actor: 'main', action: 'select-producer' },
      { actor: 'main', action: 'issue-producer-packet' },
      { actor: 'main', action: 'launch-producer' },
      { actor: 'producer', action: 'write-candidate' },
      { actor: 'main', action: 'verify-candidate' },
      { actor: 'main', action: 'select-evaluator' },
      { actor: 'main', action: 'issue-evaluator-packet' },
      { actor: 'main', action: 'launch-evaluator' },
      { actor: 'evaluator', action: 'inspect-primary-evidence' },
      { actor: 'evaluator', action: 'write-report' },
      { actor: 'main', action: 'verify-report' },
      { actor: 'main', action: 'disposition-findings' },
      { actor: 'main', action: 'transition' },
      { actor: 'main', action: 'accept' },
    ],
    candidate: { path: 'candidates/C-01.md', identity: 'candidate-01', bytes: candidateBytes, hash: sha256(candidateBytes), pathAbsentAtLaunch: true },
    report: { path: 'reviews/R-01.md', identity: 'report-01', bytes: reportBytes, hash: sha256(reportBytes), targetHash: sha256(candidateBytes), completion: 'complete', verdict: 'PASS', pathAbsentAtLaunch: true },
    producerWrites: ['candidates/C-01.md'],
    evaluatorWrites: ['reviews/R-01.md'],
    targetUnchanged: true,
    upstreamUnchanged: true,
    mainVerifiedCandidate: true,
    mainVerifiedReport: true,
    mainDisposed: true,
  }), true);
});

test('AC6 negative: producer/evaluator transitions and summary-only evaluation fail', () => {
  const candidateBytes = 'candidate';
  const reportBytes = 'report';
  const base = {
    events: [],
    candidate: { path: 'candidate', identity: 'c', bytes: candidateBytes, hash: sha256(candidateBytes), pathAbsentAtLaunch: true },
    report: { path: 'report', identity: 'r', bytes: reportBytes, hash: sha256(reportBytes), targetHash: sha256(candidateBytes), completion: 'complete', verdict: 'PASS', pathAbsentAtLaunch: true },
    producerWrites: ['candidate'],
    evaluatorWrites: ['report'],
    targetUnchanged: true,
    upstreamUnchanged: true,
    mainVerifiedCandidate: true,
    mainVerifiedReport: true,
    mainDisposed: true,
  };
  assert.throws(() => validateLifecycle({ ...base, events: [
    { actor: 'producer', action: 'select-producer' },
  ] }));
  assert.throws(() => validateLifecycle({ ...base, evaluatorWrites: [], report: { ...base.report, targetHash: 'summary-only' } }));
});

test('AC8 and AC10: five evaluator/reviewer profiles have truthful logical report-only authority', async () => {
  const profiles = new Map((await readAllProfiles()).map((profile) => [profile.id, profile]));
  for (const id of REPORT_CAPABLE) {
    const profile = profiles.get(id);
    assert.equal(profile.parsed.sandbox_mode, 'workspace-write', profile.profile);
    assert.match(profile.parsed.developer_instructions, /logical report-only write boundary plus post-execution verification/i, profile.profile);
    assert.match(profile.parsed.developer_instructions, /canonical evaluator calibration/i, profile.profile);
    assert.match(profile.parsed.developer_instructions, /strict PASS or FAIL/i, profile.profile);
    assert.match(profile.parsed.developer_instructions, /primary evidence/i, profile.profile);
    assert.match(profile.parsed.developer_instructions, /must not.*(?:repair|modify).*target/i, profile.profile);
    assert.doesNotMatch(profile.parsed.developer_instructions, /(?:provides|is|has) native path (?:ACL|isolation)|is runtime-enforced report-only/i, profile.profile);
  }
});

test('AC9: integrity failures outrank content; operational and incomplete reports never unlock', () => {
  const cases = [
    ['target mutation', { targetMutation: true }, 'REVIEW_INVALID_STOP'],
    ['upstream mutation', { upstreamMutation: true }, 'REVIEW_INVALID_STOP'],
    ['extra write', { extraWrite: true }, 'REVIEW_INVALID_STOP'],
    ['binding mismatch', { bindingMismatch: true }, 'REVIEW_INVALID_STOP'],
    ['collision', { collision: true }, 'OPERATIONAL_INCOMPLETE'],
    ['missing parent', { missingParent: true }, 'OPERATIONAL_INCOMPLETE'],
    ['directory preparation', { directoryPreparationFailure: true }, 'OPERATIONAL_INCOMPLETE'],
    ['permission', { permissionFailure: true }, 'OPERATIONAL_INCOMPLETE'],
    ['runtime', { runtimeFailure: true }, 'OPERATIONAL_INCOMPLETE'],
    ['missing report', { missingReportAfterTerminal: true }, 'OPERATIONAL_INCOMPLETE'],
    ['partial', { completion: 'partial' }, 'REPORT_INCOMPLETE_INVALID'],
    ['unavailable', { completion: 'unavailable' }, 'REPORT_INCOMPLETE_INVALID'],
    ['missing fields', { missingRequiredFields: true }, 'REPORT_INCOMPLETE_INVALID'],
  ];
  for (const [label, mutation, expected] of cases) {
    const attempt = validAttempt(mutation);
    assert.equal(classifyReviewAttempt(attempt), expected, label);
    assert.equal(reviewCanUnlock(attempt), false, label);
  }
  assert.equal(reviewCanUnlock(validAttempt()), true);
  assert.equal(reviewCanUnlock(validAttempt({ mainVerified: false })), false);
  assert.equal(reviewCanUnlock(validAttempt({ mainDisposed: false })), false);
});

test('AC9 recovery: retries use new identities/paths and never overwrite or expand permission silently', () => {
  assert.equal(validateRecovery(
    { invocation: 'review-01', reportPath: 'reviews/R-01.md', collision: true },
    { invocation: 'review-02', reportPath: 'reviews/R-02.md', overwriteCollision: false },
  ), true);
  assert.equal(validateRecovery(
    { invocation: 'review-03', reportPath: 'reviews/R-03.md', permissionFailure: true },
    { invocation: 'review-04', reportPath: 'reviews/R-04.md', overwriteCollision: false, permissionExpansionConfirmed: true },
  ), true);
  assert.throws(() => validateRecovery(
    { invocation: 'review-01', reportPath: 'reviews/R-01.md', collision: true },
    { invocation: 'review-01', reportPath: 'reviews/R-01.md', overwriteCollision: true },
  ));
});

test('AC11: peer messages are non-authoritative and unisolated writers serialize', () => {
  for (const kind of ['question', 'clarification', 'artifact-ready', 'evidence-reference']) {
    assert.equal(validatePeerMessage({ kind }), true);
  }
  for (const kind of ['scope-change', 'permission', 'retry', 'disposition', 'topology', 'acceptance']) {
    assert.throws(() => validatePeerMessage({ kind }));
  }
  assert.equal(validateWriterIntervals([
    { id: 'producer', writes: true, start: 0, end: 10 },
    { id: 'evaluator', writes: true, start: 10, end: 20 },
  ]), true);
  assert.throws(() => validateWriterIntervals([
    { id: 'producer', writes: true, start: 0, end: 11 },
    { id: 'evaluator', writes: true, start: 10, end: 20 },
  ]));
});

test('AC6-AC11 source binding: protocols and packet expose the complete main-owned report lifecycle', async () => {
  const adaptive = await readText('task-docs/_harness/adaptive-orchestration-protocol.md');
  const runDirectory = await readText('task-docs/_harness/run-directory-protocol.md');
  const packet = await readText('task-docs/_harness/templates/task-packet-template.md');
  const governanceReview = await readText('task-docs/_harness/templates/governance-review-template.md');
  const combined = [adaptive, runDirectory, packet, governanceReview].join('\n');
  assert.match(combined, /main.*selects.*producer/is);
  assert.match(combined, /candidate.*hash.*write.scope.*verification/is);
  assert.match(combined, /evaluator.*exact.*candidate.*upstream/is);
  assert.match(combined, /unique.*report path/is);
  assert.match(combined, /logical report-only write boundary plus post-execution verification/i);
  assert.match(combined, /integrity.*precedence|integrity.*before.*verdict/is);
  assert.match(combined, /main.*disposition/is);
  assert.match(combined, /peer message.*non-authoritative|peer messages.*cannot/is);
});
