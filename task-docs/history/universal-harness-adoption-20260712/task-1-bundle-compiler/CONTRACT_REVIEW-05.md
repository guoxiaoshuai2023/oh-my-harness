# Task 1 Contract Review v5

Identity: `universal-harness-adoption-task-1-contract-review-20260712-v5`

Decision: `FAIL`

Reviewer: fresh read-only `oh_my_harness_solution_evaluator` invocation `019f5609-ecf4-7ba2-891f-0532b1f600cf`

## Reviewed Boundary

- Path: `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-05.md`
- Identity: `universal-harness-adoption-task-1-contract-20260712-v5`
- SHA-256: `1c27ef5b24c22f0ada5df256b4cd908abdf0a37c5a6e283a5901399d9d9cb6f4`

- Consulted calibration path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-001`, `CAL-SEM-004`, `CAL-ADAPT-003`, `CAL-ADAPT-009`

## Findings

### P1 - Active Baseline And Freeze Paths Are Ambiguous

Baseline v1 records absent implementation roots while baseline v2 records the current 12-file candidate. The contract did not explicitly make v2 the sole active execution baseline or define non-overwriting v6 accepted-contract, manifest, and launch-baseline paths.

Main-thread disposition: `ACCEPTED`.

### P1 - Residual Filename Selection Authority

The copied v4 text still allowed the executor to choose new internal module/test filenames despite the focused 12-file correction.

Main-thread disposition: `ACCEPTED`.

### P1 - Run-Directory Protocol Misclassified As Routed Authority

`task-docs/_harness/run-directory-protocol.md` is controlling direct run-level authority but is not an `AGENTS.md` route target.

Main-thread disposition: `ACCEPTED`.

## Next Action

Create contract v6 with one active baseline, exact non-overwriting freeze paths, the exact 12-file write universe, and corrected authority classification. Do not execute v5.
