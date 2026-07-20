# Task Plan Review: <Run>

- Report identity/invocation/path:
- Completion: partial | complete | unavailable
- Strict verdict: PASS | FAIL
- Runtime boundary: logical report-only write boundary plus post-execution verification
- Consulted calibration path / case IDs:
- Plan identity/path/SHA-256:
- Pass A report/binding identity/SHA-256:
- Original Request Anchor, Outcome, and current upstream identities/SHA-256:

## Primary Evidence And Independence

- Exact candidate/upstream inspected:
- Current-state/safety facts inspected:
- Reviewer wrote only this report and did not repair/launch/transition:
- Unchecked areas:

## Acceptance-Closure Review

| Task | Observable result | Owner | Dependency | AC/evidence | Failure signal | Decision path | Consumer/revalidation | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  | PASS/FAIL |

- Pass A preceded Plan-candidate access and remains exact: PASS/FAIL
- User intent/non-goals preserved; no proxy substitution: PASS/FAIL
- Capabilities are fact-selected; triggered gates remain owned: PASS/FAIL
- LOW path remains direct/proportional: PASS/FAIL
- Currentness transition closes later shared-surface changes: PASS/FAIL
- Actual result observation is primary and no proxy/file/count/command result completed a Task: PASS/FAIL
- Subjective decisions bind exact rubric/delegation or STOP and return to user; evaluator remains advisory: PASS/FAIL
- Technical Solution Design trigger is execution-uncertainty based: PASS/FAIL
- Credible all-Tasks-PASS-but-user-fail case is discriminating: PASS/FAIL

## Findings

| Severity | Finding | Evidence | Likely owner |
| --- | --- | --- | --- |
|  |  |  |  |

Never PASS with caveats. Any P0/P1, contaminated Pass A, missing acceptance evidence, dropped triggered gate, or proxy-only result is FAIL. Main owns finding disposition and Plan transition.

The adjacent interface requires the governing semantic/currentness records and declares strict review outputs. It does not define acceptance or own transition.

<!-- oh-my-harness-work-truth:v1:start -->
{"version":1,"id":"interface.plan-review","domain":"interface:plan-review","kind":"interface","sourceOwner":"task-docs/_harness/templates/plan-review-template.md","requires":["acceptance.proxy-stop","subjective.return-user","task3.stale","conflict.quality-pass"],"emits":["exactTargetAndUpstream","actualResultEvidenceDecision","proxyNegativeDecision","subjectiveAuthorityDecision","currentnessDecision","allTasksPassUserFailDecision","strictVerdict","findings"],"references":["frozenAcExpectation","primaryEvidenceIdentities","calibrationCases"],"forbids":["targetRepair","findingDisposition","transition","acceptance","passWithCaveats"]}
<!-- oh-my-harness-work-truth:v1:end -->
