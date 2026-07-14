# Task 2 Contract Review 03

Identity: `universal-harness-adoption-task-2-contract-review-20260712-v3`

Reviewed contract identity: `universal-harness-adoption-task-2-contract-20260712-v3`

Reviewed contract SHA-256: `ed1d131c2159f376dcd0e2dffd01307d235b8dd6fea5d1785d56708201ece3ee`

Reviewer: fresh `oh_my_harness_solution_evaluator`, read-only and independent of contract production

Calibration consulted: `task-docs/_harness/evaluator-calibration.md`

Relevant calibration cases: `CAL-003`, `CAL-004`, `CAL-005`, `CAL-006`, `CAL-SEM-001`, `CAL-ADAPT-002`, `CAL-ADAPT-003`

## Decision

`FAIL`

Task 2 scope, Node 24, dirty-worktree protection, marker ownership, and high-risk gates are substantially improved, but five P1 defects still leave unsafe or contradictory lifecycle decisions to the executor.

## Findings

### P1 - Target-Configured Git Execution Surface

The required Git probe can still execute target-configured filter programs or follow local-config includes and inherited Git routing variables. This conflicts with no-target-code and no-outside-access requirements.

Required correction: freeze a non-executing exact-overlap mechanism with a closed environment/config boundary and malicious filter/include/inherited-environment fixtures.

### P1 - Package Post-Pack And npm Isolation

`prepack` exits before archive creation and therefore cannot perform post-archive cleanup. The command contains comments instead of an executable verifier, lacks a provenance handoff for the temporary root, and does not isolate npm config/cache/log/auth surfaces.

Required correction: freeze an executable post-pack verifier/cleanup mode and provenance mechanism; isolate npm environment in the authorized temporary root; bind the secrets route.

### P1 - Sentinel Windows And Schema

The sentinel is not unambiguously verified before every create mutation; initial namespace/sentinel failures lack exact residual rules. Sentinel keys, canonical bytes, plan-hash preimage, temporary grammar/scanner, and direct fault evidence are incomplete.

Required correction: close every initial mutation/failure window and freeze the complete sentinel/temporary/plan-hash contract.

### P1 - T2-AC16 Success-State Weakening

The contract permits a newly renamed state containing the new version and `verification.status: verified` to remain after state-verification failure. This weakens T2-AC16's requirement to withhold the new success state and conflicts with sentinel-stop behavior.

Required correction: preserve T2-AC16 literally with one compatible candidate/commit protocol or return upstream for revision.

### P1 - Plan And Persisted Lexical Encoding

The canonical comparator for path arrays and the plan/sentinel field types, nullability, enums, element schemas, duplicate rules, and hashed byte preimages remain open.

Required correction: freeze complete plan and sentinel schemas and one byte comparator/canonical serialization.

## Checklist

| Check | Result |
| --- | --- |
| Matches approved task | PASS |
| Scope minimal | PASS |
| Allowed/protected paths explicit | FAIL |
| Executor cannot redesign | FAIL |
| Triggered routes explicit | FAIL |
| Acceptance-criteria evidence | FAIL |
| Safety gates | FAIL |
| Current-state evidence | PASS |
| Validation commands | FAIL |
| Semantic fidelity | FAIL |

