# Task 3 Contract Review v6

Identity: `universal-harness-adoption-task-3-contract-review-20260713-v6`

Decision: `FAIL`

## Hash Check

- Contract v6: `5e3290ff40edf31e65a51828af1218ef5c02a49e5b1b74738b3b7562b425a35b` - MATCH
- Plan v5: `9f17a1054778b45a1ac2d4c18f0ce0210c71e5ae9edcbc79cd6294384a839fc1` - MATCH
- Review 04 observed: `b62cac2002ffc97efde5e3cd2d448e4cc8283d9d1cc41a5dbba94dff54c46514`

## Review Summary

V6 closes findings 1, 3, and 4, but validation finding 2 remains blocking.

Evidence reviewed:

- Task plan: frozen Plan v5
- Contract: Contract Iteration 06
- Prior decision: Contract Review 04
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-003`, `CAL-ADAPT-002`, `CAL-ADAPT-003`

## Closure Table

| Review 04 blocker | Status | Basis |
| --- | --- | --- |
| 1. Task-planning route binding; no delivery stage | CLOSED | Exact route is bound, responsibilities are assigned, and the contract explicitly adds no delivery stage. |
| 2. Executable validation and usage semantics | OPEN | Node 24, focused/full/package tests, generated README literals, cleanup, and link checks are specified. However, CLI-help usage lacks an exact invocation and expected exit/output semantics. The temporary README shell block can also return success after an earlier build or assertion failure because failures are not aggregated. |
| 3. Fresh post-freeze dirty baseline | CLOSED | A mandatory post-freeze launch baseline and preflight/postflight comparison are required, including full `-uall` path metadata and protected handling of unknown content. |
| 4. Exact mapped impact and Task 3 chain | CLOSED | The exact three-mapped/two-release-only classification and new Task 3 acceptance chain are required before Task 4 authorization. |

## Blocking Finding

- `[P1]` Required validation remains incomplete and non-discriminating.
  - Calibration case IDs: `CAL-004`, `CAL-006`.
  - Evidence: Contract lines 72-102 do not freeze an exact CLI usage invocation with expected exit/output behavior. The lines 87-100 shell sequence can finish successfully after an earlier failed build, positive assertion, or negative assertion because the final cleanup check determines the block's status.
  - Required change: Specify exact CLI usage command(s) and expected semantics, and make every generated-README build/assertion failure produce an unambiguous failed validation while guaranteeing cleanup and residue verification.

## Checklist

- Matches approved task: PASS
- Scope minimal: PASS
- Allowed/protected paths explicit: PASS
- Executor cannot redesign: FAIL
- Triggered routes explicit: PASS
- Acceptance criteria evidence: FAIL
- Safety gates: PASS
- Current-state evidence: PASS
- Validation commands: FAIL
- Semantic fidelity: PASS

## Final Decision

`STRICT FAIL`

Remaining uncertainty: runtime, test, and documentation outcomes remain unexecuted because this was a contract-only read-only review. This does not affect the blocking verdict.
