# Task 3 Contract Review v7

Identity: `universal-harness-adoption-task-3-contract-review-20260713-v7`

Decision: `FAIL`

## Hash Check

- Expected: `755f2802733601ba0794d4664256cb53420ce80fed6eefcac1e20f17fbdb1f9e`
- Observed: `755f2802733601ba0794d4664256cb53420ce80fed6eefcac1e20f17fbdb1f9e`
- Result: MATCH

## Review Summary

V7 closes the exact CLI and validation-failure requirements, but cleanup and residue failures can still be masked.

- Task plan: Plan v4 and accepted Plan v5
- Contract: `CONTRACT_ITERATION-07.md`
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-006`

## Finding Closure

- Review 06 P1: OPEN
- Exact no-argument invocation, exit `2`, empty stdout, and exact stderr usage: CLOSED
- Build/assertion/CLI failures preserved through cleanup: CLOSED
- Cleanup always attempted: CLOSED
- Cleanup or residue failure necessarily fails validation: OPEN
- Review 04 findings 1, 3, and 4: remain CLOSED

## Blocking Finding

- `[P1]` Cleanup and residue checks remain non-discriminating.
  - Calibration case ID: `CAL-006`.
  - Evidence: Contract lines 107-111 run three outer-shell `test` commands without `set -e` or status aggregation. A failed cleanup-status or residue test can therefore be overwritten by the final successful `test "$validation_status" -eq 0`.
  - Required change: Make cleanup-status, residue, and validation-status failures jointly determine the block's final nonzero exit.

## Checklist

- Matches approved task: PASS
- Scope minimal: PASS
- Allowed/protected paths explicit: PASS
- Executor cannot redesign: PASS
- Triggered routes explicit: PASS
- Acceptance criteria evidence: FAIL
- Safety gates: FAIL
- Current-state evidence: PASS
- Validation commands: FAIL
- Semantic fidelity: PASS

## Final Decision

`STRICT FAIL`

Remaining uncertainty: runtime and documentation outcomes were not executed in this read-only contract review; this does not affect the blocking verdict.
