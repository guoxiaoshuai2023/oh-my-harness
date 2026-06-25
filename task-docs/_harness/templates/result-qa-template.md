# Result QA: <Task Name>

Decision: PASS | FAIL

## Inputs

- Accepted contract path:
- Accepted contract identity/hash:
- Implementation report path:
- Plan path:
- Outcome Contract identity/path, if any:
- Pass A baseline identity/path, if any:
- Relevant route docs:

## Implementation Verification

- Verdict: PASS | FAIL
- Frozen `ACCEPTED_CONTRACT.md` followed:
- Executor did not modify `ACCEPTED_CONTRACT.md`:
- Allowed files and protected paths respected:
- Required validation commands run:
- Implementation AC evidence checked:
- Executor report complete:
- Repo state and changed files independently inspected:

## Semantic Validation

- Verdict: PASS | FAIL | N/A
- Required for this task: yes/no
- Frozen Outcome Contract identity checked, if applicable:
- Pass A baseline identity checked, if applicable:
- Outcome AC evidence checked:
- Outcome AC vs Implementation AC separation preserved:
- AC-pass-but-user-fail counterexample checked when relevant:
- Current-state evidence trigger satisfied when relevant:
- Executor did not make unresolved semantic decisions:

## Overall Decision

- Verdict: PASS | FAIL
- Rule: Overall Decision must match `Decision`.
- Rule: Overall Decision is FAIL if Implementation Verification is FAIL.
- Rule: Overall Decision is FAIL if required Semantic Validation is FAIL.
- Rule: PASS only when both required verdicts pass, every required AC is independently verified, and no P0/P1 finding remains.

## Calibration

- Consulted path: `task-docs/_harness/evaluator-calibration.md` | N/A
- Relevant calibration case IDs: CAL-... | N/A

## Independent Evidence Checklist

- `ACCEPTED_CONTRACT.md` path and identity/hash:
- Implementation report:
- File/diff inspection:
- Command output:
- Runtime or user-visible behavior:
- Current-state evidence:
- Generated artifacts or screenshots:
- Evidence directory/index:
- `AGENTS.md` router and triggered routed docs:
- Outcome Contract and Pass A baseline, if applicable:
- Secret/sensitive-material safety scan:
- Not checked and why:

## Acceptance Criteria Verification

| AC | Type | Result | Independent evidence |
| --- | --- | --- | --- |
| AC1 | Outcome AC / Implementation AC | PASS / FAIL |  |

Outcome AC coverage summary:

-

Implementation AC coverage summary:

-

AC-pass-but-user-fail check:

-

## Findings

List findings by severity. Use `P0`, `P1`, `P2`, or `P3`.

| Severity | Finding | Evidence | Required fix | Calibration case |
| --- | --- | --- | --- | --- |
|  |  |  |  | CAL-... / N/A |

## Failure Routing

- Implementation failure: executor missed the frozen contract, changed out-of-scope files, or did not produce required evidence; send back to a new executor run with the same frozen `ACCEPTED_CONTRACT.md`.
- Contract insufficiency: the frozen contract cannot satisfy the approved task ACs, lacks necessary scope, or is unsafe/contradictory; stop execution and return to solution design.
- Semantic plan/contract failure: required semantic validation fails because the plan or frozen contract dropped the Outcome Contract, converted Outcome ACs into implementation-only checks, omitted required current-state evidence, or left semantic decisions to the executor; return to planning or solution design as appropriate.
- Result evaluator has no repair/redesign authority and must not rewrite the plan, contract, or implementation.
- Executor must not guess or repair semantic gaps outside the same frozen `ACCEPTED_CONTRACT.md`.

## Checklist

- Immutable `ACCEPTED_CONTRACT.md` followed: PASS/FAIL
- No out-of-scope changes: PASS/FAIL
- Implementation Verification completed: PASS/FAIL
- Semantic Validation completed when required: PASS/FAIL/N/A
- Overall Decision matches Decision: PASS/FAIL
- Overall Decision correctly fails if implementation or required semantic validation fails: PASS/FAIL
- Every AC independently verified: PASS/FAIL
- Outcome AC evidence independently checked: PASS/FAIL/N/A
- AC-pass-but-user-fail risk handled when relevant: PASS/FAIL/N/A
- User-visible or runtime behavior verified when relevant: PASS/FAIL/N/A
- Current-state evidence verified when relevant: PASS/FAIL/N/A
- Secret/sensitive-material safe: PASS/FAIL
- Calibration consulted: PASS/FAIL/N/A
- Relevant calibration case IDs reported: PASS/FAIL/N/A

## PASS Rule

PASS only when all required ACs pass, all required evidence was independently checked, the accepted contract was followed, Implementation Verification is PASS, required Semantic Validation is PASS, Overall Decision is PASS, and there are no P0/P1 findings.

Do not output `PASS with caveats`. Any P0/P1 finding, missing acceptance-criteria evidence, unverified acceptance criterion, failed implementation verification, or failed required semantic validation is a FAIL.
