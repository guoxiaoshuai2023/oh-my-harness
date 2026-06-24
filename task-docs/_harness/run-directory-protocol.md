# Run Directory Protocol

Use this protocol for multi-step harness runs that need durable evidence, accepted contracts, and independent review.

## Directory Shape

Create a run directory under `task-docs/history/<run-slug>/`.

Recommended layout:

```text
task-docs/history/<run-slug>/
  00-planning-docs/
    ORIGINAL_REQUEST_ANCHOR.md
    PASS_A_BASELINE.md
    OUTCOME_CONTRACT.md
  task-1-<short-name>/
    CONTRACT_ITERATION-01.md
    ACCEPTED_CONTRACT.md
    IMPLEMENTATION_REPORT.md
    RESULT_QA.md
  task-2-<short-name>/
    ACCEPTED_CONTRACT.md
    IMPLEMENTATION_REPORT.md
    RESULT_QA.md
```

Use only the folders required by the run. Do not create empty ceremony.

## Stable Identities

Record stable identities for:

- Original Request Anchor.
- Pass A baseline when used.
- Outcome Contract when used.
- Accepted contract.
- Implementation report.
- Result QA.
- Source snapshot and traceability artifacts when used.

A stable identity can be a SHA-256 hash, a deterministic ID plus hash, or both.

## Accepted Contract Freeze

For each delivery task:

- Solution designer writes a contract.
- Solution evaluator reviews it read-only.
- Failed contracts are revised in new iterations.
- The first strict PASS version is copied to `ACCEPTED_CONTRACT.md`.
- Executor reads only `ACCEPTED_CONTRACT.md` as the task boundary.

## Dirty Worktree Baselines

When the worktree may contain unrelated changes:

- Record protected read-only paths for the task.
- Capture before/after hashes for protected files or changed-path baselines for protected directories.
- Do not use a plain final diff as proof that no unrelated changes were touched.

## Reports

Implementation reports should include:

- Contract identity.
- Files changed.
- Scope boundaries respected.
- Acceptance criteria evidence.
- Validation commands and outputs summarized.
- What was not validated.
- Remaining risk.

Result QA should independently verify the implementation report, repo state, evidence, and every acceptance criterion.
