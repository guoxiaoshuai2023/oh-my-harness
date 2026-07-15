# Task 2 Contract Review 06

Identity: `universal-harness-adoption-task-2-contract-review-20260714-v6`

Reviewed candidate: `universal-harness-adoption-task-2-contract-20260714-v6`

Reviewed candidate SHA-256: `3808cd82241cb68226a327880167e676297cc7e1a70e873439357af3b5c2b440`

Reviewer: fresh `oh_my_harness_solution_evaluator` agent `019f5e18-4ba0-7170-bc8b-f4833d501b53` (`Locke`)

Decision: `FAIL`

## Inspected Scope

- Requirements v5, implementation plan v4, accepted planning inputs v2.
- Parent Task 2 v5 boundary.
- PR #7 independent review and main-thread routing decision.
- Task 1 and Task 3 no-impact artifacts.
- Candidate Contract Iteration 06 and its seven allowed-path before hashes.
- Applicable router/routed guidance and relevant current implementation surfaces.
- Local Git status and refs.

The reviewer did not read the protected synthesis document, edit files, run implementation, or delegate.

## Calibration

Consulted path: `task-docs/_harness/evaluator-calibration.md`

Actual consulted SHA-256: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`

Relevant case IDs: `CAL-002`, `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-001`, `CAL-ADAPT-003`, `CAL-ADAPT-009`

## Findings

### P1 - Inherited Git Alternate Semantics Conflict

Classification: `contract ambiguity / unsafe authority`

The candidate preserved v5's temporary Git view, which uses one installer-created object-store alternate, while also saying alternates are disabled and cannot influence the result. The executor would have to choose whether the package-owned bridge is allowed.

Required correction: distinguish forbidden target/inherited alternates from the one package-owned temporary alternate, or explicitly supersede the parent mechanism with a complete replacement boundary.

### P1 - Inherited Reporting And Downstream Status Are Stale

Classification: `contract ambiguity / unsafe authority`

The candidate inherited v5's already-consumed Implementation Report identity/path and v5's statement that Tasks 3 and 4 had not started. Those conflict with the new evidence cycle, the accepted Task 3 state, and the required Task 4 revalidation.

Required correction: supersede the old report identity/path and stale downstream-status clause; assign new versioned gate artifacts while preserving all prior artifacts read-only.

## Checklist

| Check | Result |
| --- | --- |
| Matches approved task | PASS |
| Scope minimal | PASS |
| Allowed/protected paths explicit | PASS |
| Executor cannot redesign | FAIL |
| Triggered routes explicit | PASS |
| Acceptance-criteria evidence | PASS |
| Safety gates | FAIL |
| Current-state evidence | PASS |
| Validation commands | PASS |
| Semantic fidelity | FAIL |

## Main-Thread Disposition

Both findings have direct authority and auditability impact and are accepted. They do not require requirements, plan, objective, write-set, Task 1, or Task 3 changes. Contract Iteration 06 remains rejected historical evidence. A focused v7 candidate will clarify the temporary alternate boundary and the new gate-artifact/downstream-state handoff only.
