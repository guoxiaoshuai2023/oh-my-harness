# Adaptive Main-Thread Orchestration Accepted Planning Inputs

- Status: Complete accepted-planning-input manifest
- Date: 2026-07-11
- Manifest identity: `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1`
- Purpose: Freeze the planning artifacts that must be transferred to and verified on the dedicated implementation branch before Task 1 contracting

## 1. Accepted Inputs

| Artifact | Stable identity | Canonical path | Final SHA-256 | Acceptance state |
| --- | --- | --- | --- | --- |
| Requirements baseline | `adaptive-main-thread-orchestration-requirements-20260711-v4` | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` | Frozen requirements authority |
| Implementation task plan | `adaptive-main-thread-orchestration-implementation-plan-20260711-v5` | `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md` | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` | Independently reviewed plan |
| Plan Review Pass A | `adaptive-main-thread-orchestration-plan-review-pass-a-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md` | `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b` | Frozen isolated baseline |
| Plan Review Pass B | `adaptive-main-thread-orchestration-plan-review-20260711-v2` | `task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md` | `2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204` | Final PASS; no P0/P1/P2 findings |

## 2. Integrity And Transfer Rules

- All four artifacts are protected read-only implementation inputs.
- Before branch preparation, recompute every SHA-256 and require an exact match with this manifest.
- Transfer these four artifacts and this manifest to the dedicated implementation branch without changing their content, identity, path, or hash.
- After transfer, recompute every SHA-256 before creating the Task 1 execution boundary.
- A missing file, path change, identity mismatch, or hash mismatch blocks Task 1 contracting and requires explicit diagnosis. Do not silently regenerate or normalize an artifact.
- The manifest itself is also protected. Its SHA-256 is recorded in the planning delivery report because a file cannot embed its own final hash without changing that hash.

## 3. Review Decision

The Pass B artifact records:

- Decision: PASS;
- reviewed plan identity: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`;
- reviewed plan SHA-256: `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`;
- requirements and Pass A identity/hash verification;
- valid Pass A continuity;
- no P0, P1, or P2 findings;
- closure of transitive dependency invalidation and manifest persistence findings.

## 4. Current Execution Gate

Planning-input persistence is complete. Implementation is still blocked because:

- the current branch is `codex/release-checklist-fixture-path`, which contains overlapping committed work in `docs/adoption/open-source-release-checklist.md`;
- the dedicated implementation branch precondition has not been executed;
- Task 1 does not yet have a stable, citable, independently reviewed execution boundary.

The required next order is:

```text
verify this manifest and all recorded hashes
-> satisfy the dedicated implementation branch precondition
-> create the Task 1 stable/versioned execution boundary
-> independently review that boundary
-> begin Task 1 implementation only after strict PASS
```
