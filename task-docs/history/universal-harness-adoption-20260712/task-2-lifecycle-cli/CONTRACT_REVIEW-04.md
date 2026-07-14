# Task 2 Contract Review 04

Identity: `universal-harness-adoption-task-2-contract-review-20260712-v4`

Reviewed contract identity: `universal-harness-adoption-task-2-contract-20260712-v4`

Reviewed contract SHA-256: `3f083ddd0f82fb6bb82a2029a7ce33ce846b6a3ba1b04086e7fa3b4d1cfe0c35`

Retry domain: `universal-harness-adoption-task-2-lifecycle-contract-20260712-rd1`

Reviewer: fresh `oh_my_harness_solution_evaluator`, read-only and producer-independent from contract production

Calibration consulted: `task-docs/_harness/evaluator-calibration.md`

Relevant calibration cases: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-001`, `CAL-ADAPT-006`

## Decision

`FAIL`

Task 2 scope and most prior findings are closed, but three P1 defects leave sentinel semantics, canonical plan output, and package validation behavior unresolved.

## Findings

### P1 - Final Sentinel Path Is Undefined

The contract names `.oh-my-harness/.operation-in-progress.tmp` and requires `link(temp, final)` but never fixes the literal final path. Preflight, schema validation, publication, deletion, fault classification, and success predicates therefore lack one controlling path.

Required correction: a future authorized boundary must state the exact final sentinel path and bind every scanner/publication/deletion/evidence rule to it.

### P1 - Canonical Plan Schema Is Lexically Incomplete

`modifiedManaged.expectedSha256`, `modifiedManaged.currentSha256`, backup `sha256`, and `conflicts.code` lack complete lexical types/enums. The public canonical bytes and conflict meaning remain open to executor choice.

Required correction: a future authorized boundary must close every plan field's type, nullability, lexical grammar, enum domain, duplicate rule, order, and canonical preimage.

### P1 - Package Validation Sequence Is Not Fully Executable

The sequence contains a comment rather than an executable local-archive smoke command. It lacks one failure-propagating entry and guaranteed cleanup/status aggregation, so pack/verify/smoke/cleanup/residue failures could be masked.

Required correction: a future authorized boundary must freeze one runnable validation entry that preserves every failure, always attempts bounded cleanup, checks residue, and returns nonzero if any phase fails.

## Checklist

| Check | Result |
| --- | --- |
| Matches approved task | PASS |
| Scope minimal | PASS |
| Allowed/protected paths explicit | FAIL |
| Executor cannot redesign | FAIL |
| Triggered routes explicit | PASS |
| Acceptance-criteria evidence | FAIL |
| Safety gates | FAIL |
| Current-state evidence | PASS |
| Validation commands | FAIL |
| Semantic fidelity | FAIL |

