# Independent Result QA: <Task Name>

Decision: PASS | FAIL

## Inputs And Assigned Review

- Applicable authoritative boundary form:
- Boundary identity/hash and path/reference:
- Implementation report path/reference:
- Plan/Original Request Anchor/Outcome Contract identities, when triggered:
- Context/handoff identity, when used:
- Assigned review type: code | factual | UX | security | semantic | external-state | combined bounded types
- Reviewer independence from producer:
- Relevant route docs and triggered gates:

An immutable `ACCEPTED_CONTRACT.md` is the applicable boundary in explicit full v2; concise stable packets and other frozen/versioned forms are also valid when authorized.

## Authority, Scope, And State Verification

- Verdict: PASS | FAIL
- Stable producer-nonmodifiable boundary existed before the attempt:
- Producer did not modify/reinterpret the boundary:
- Correct boundary level and escalation triggers applied:
- Allowed files/effects and protected paths respected:
- Dirty/shared/current-state before/after evidence independently checked:
- Every actual delta classified; unexplained delta absent:
- Required validation commands/checks independently inspected:
- Implementation report complete and truthful:

## Outcome And Semantic Verification

- Verdict: PASS | FAIL | N/A
- Required for this task: yes/no
- Original Request Anchor / Pass A / Outcome Contract identities checked:
- Outcome ACs independently checked against primary evidence:
- Outcome evidence remains distinct from implementation-only evidence:
- AC-pass-but-user-fail counterexample exercised:
- Current-state source/freshness checked:
- Producer made no unresolved semantic decision:
- HIGH-risk producer-independent semantic/safety/external evidence satisfied:

## Adaptive Topology And Gate Verification

- Selected topology preserved every triggered gate: PASS/FAIL
- Omitted roles/stages had an evidence-backed rationale and did not omit controls: PASS/FAIL/N/A
- Explicit full-v2 request/stricter policy preserved: PASS/FAIL/N/A
- Task packet route binding used proved inheritance or explicit routes/gates: PASS/FAIL/N/A
- Dependencies, branch state, obsolete/cancellation conditions, and synthesis checked: PASS/FAIL/N/A
- Review type matches the actual correctness/risk question: PASS/FAIL
- No producer self-review was counted as independent: PASS/FAIL

## Retry And Failure Classification

- Review finding is within assigned review type and tied to active authority: yes/no
- Decisive evidence for PASS/FAIL:
- Failure origin, if any: implementation | prompt | missing/stale evidence | plan/contract | role/capability mismatch | evaluator misunderstanding/unsupported/wrong type | user-intent ambiguity | external environment/permission/tool/service/state
- Quality failure valid for stage-local count: yes/no/N/A
- Quality failure valid for retry-domain cumulative count: yes/no/N/A
- Artifact-free operational failure only: yes/no/N/A
- Counter continuity and intervention/exhaustion/resume handling checked:
- Unsupported finding disposition: reject with evidence, leave producer counts unchanged, and correct review path | N/A
- Failure route: same-boundary executor | new versioned solution boundary | planning | corrected reviewer/packet | user decision/blocker | N/A

## Calibration

- Consulted path: `task-docs/_harness/evaluator-calibration.md` | N/A
- Relevant calibration case IDs: CAL-... | N/A

## Independent Evidence Checklist

- Applicable boundary identity/content:
- Implementation report:
- Actual file/diff/state inspection:
- Command output:
- Runtime or user-visible behavior:
- Current/external-state readback:
- Generated artifacts/screenshots:
- Router and triggered route/gate evidence:
- Semantic artifacts:
- Secret/sensitive-material safety:
- What was not checked and why:

Producer self-report is a claim, not independent evidence.

## Acceptance Criteria Verification

| AC | Type | Result | Independent primary evidence | Discriminating failure signal |
| --- | --- | --- | --- | --- |
| AC1 | Outcome / Implementation / Safety | PASS/FAIL |  |  |

Outcome AC coverage summary:

-

Implementation/safety AC coverage summary:

-

AC-pass-but-user-fail result:

-

## Findings

List findings by severity. Use `P0`, `P1`, `P2`, or `P3`.

| Severity | Finding | Primary evidence | Required fix/route | Calibration case |
| --- | --- | --- | --- | --- |
|  |  |  |  | CAL-... / N/A |

## Overall Decision

- Verdict: PASS | FAIL
- Rule: Overall Verdict must equal `Decision`.
- Rule: Any failed required authority/scope/implementation check makes Overall Verdict `FAIL`.
- Rule: Any failed required outcome/semantic/safety/independence check makes Overall Verdict `FAIL`.
- Rule: Any P0/P1, missing AC evidence, or unverified AC makes Overall Verdict `FAIL`.

Do not output `PASS with caveats`. PASS requires every required AC and triggered gate to be independently verified, strict evidence to support the assigned review judgment, and no P0/P1 finding. This QA does not perform repairs, redesign, boundary edits, or main-thread final acceptance.
