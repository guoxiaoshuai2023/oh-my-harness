# Task 4 PR #7 Revalidation Contract Review 01

Identity: `universal-harness-adoption-task-4-pr7-revalidation-contract-review-20260714-v1`

Reviewed contract SHA-256: `ea14010bf3697ce446479db86f39955d068532dd878fc5467285ae11f11312fb`

Reviewer: fresh `oh_my_harness_solution_evaluator` agent `019f5ea2-332a-77e0-8185-1a07c61adaf2` (`Bernoulli`)

Decision: `FAIL`

## Calibration

Consulted: `task-docs/_harness/evaluator-calibration.md`

Relevant cases: `CAL-003`, `CAL-004`, `CAL-ADAPT-003`

## Findings

### P1 - Stale Parent Baselines Were Inherited

The amendment retained the parent Task 4 branch/dirty and Task 2 hash clauses. Those clauses describe the pre-PR state and would immediately STOP at current HEAD `53d9995163fec362511b0d7b398cef0a8e31b0f2` and the new accepted Task 2 hashes.

Required correction: explicitly supersede the old Task 2 dependency/hash table and branch/dirty clauses with current PR HEAD/base, accepted Task 2 chain and paths, staged state, committed PR delta, current Task 4 hashes, and protected dirty attribution.

### P1 - Controlling Artifact Paths/Identities Were Ambiguous

The authority table omitted paths and misstated the parent Task 4 and Task 3 chain identities.

Required correction: provide exact path/identity/hash tuples and explicitly bind the parent route/gate table through the corrected parent path.

## Main-Thread Disposition

Both findings are accepted as launch-authority defects. They do not change the three-file write set, the two required behavior corrections, AS/T4 coverage, or the Task 1/3 no-impact decisions. Contract 01 remains rejected historical evidence; Contract 02 will correct only authority and baseline clauses.
