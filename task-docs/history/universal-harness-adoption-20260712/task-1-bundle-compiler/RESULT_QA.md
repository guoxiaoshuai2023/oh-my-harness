# Task 1 Result QA

Identity: `universal-harness-adoption-task-1-result-qa-20260712-v1`

Decision: `FAIL`

Reviewer: fresh read-only producer-independent `oh_my_harness_result_evaluator` invocation `019f55f7-b40e-7821-9d3e-f35ff4e96481`

## Implementation Verification

Decision: `FAIL`

- T1-AC6 fails: generated support README content retains unresolved source-tree references.
- The compiler and tests check `docs/agent-routing/` and `task-docs/_harness/`, but not the bare directory forms `docs/agent-routing` and `task-docs/_harness`.
- The Implementation Report's claim of zero runtime source-only references is therefore false.
- Scope, determinism, inventory, package contract, protected state, and runtime-boundary checks otherwise matched primary evidence.

## Semantic Validation

Decision: `FAIL`

- All six profiles preserve distinct missions, permissions, stop behavior, evaluator independence, and calibration bindings.
- The managed router preserves the five required source sections, nine route triggers, modal force, markers, and target-authority clauses.
- The installed support README nevertheless directs users to unavailable source-tree paths. This is a credible AC-pass-but-user-fail outcome.

## Overall Decision

Decision: `FAIL`

## Primary Evidence

- Frozen input, contract, manifest, baseline, and report hashes matched.
- Exact Node 24 tests: 11 passed, 0 failed.
- Two independent builds: 44 files each; identical bytes; inventory SHA-256 `cce4d731512aaacb1f53775e0bb505945daf4d4988ff94bacc80caec5ef0d68b`.
- Python 3.11 compiled all three helpers.
- `tomllib` parsed six profiles with exactly three read-only evaluators.
- All 42 mapped pairs and generated inventory hashes matched the controlled transformation.
- Protected manifests, boundary entries, Git baseline, staged state, and Task 2-4 boundaries remained protected.

The generated `.oh-my-harness/docs/source-support/README.md` contains:

```sh
cp -R docs/agent-routing "$TARGET/docs/"
cp -R task-docs/_harness "$TARGET/task-docs/"
```

Neither referenced source path exists in the provisional target tree or inventory.

## Acceptance Criteria

| Criterion | Result | Evidence |
| --- | --- | --- |
| T1-AC1 | PASS | Closed scoped package contract/schema and runtime boundaries verified. |
| T1-AC2 | PASS | Exact 42-entry map and 57 fixed rewrites verified. |
| T1-AC3 | PASS | Two clean outputs were byte-identical. |
| T1-AC4 | PASS | Closed inventory, ownership, provenance, and no-self/state/backup rules verified. |
| T1-AC5 | PASS | Namespaced layout, six prefixed profiles, and no config takeover verified. |
| T1-AC6 | FAIL | Two bare source-directory references remain unresolved in generated support README. |
| T1-AC7 | PASS | Independent profile mission, authority, permission, stop, and calibration comparison passed. |
| T1-AC8 | PASS | Independent managed-router semantic/modal comparison passed. |
| T1-AC9 | PASS | Exact 44-file output and prohibited-content checks passed. |
| T1-AC10 | PASS | Structural checks were not accepted as semantic proof. |
| T1-AC11 | PASS | Three required Python helpers compile and retain their boundaries/disclaimers. |

## Blocking Finding

### P1 - Installed Reference Closure Is False

Reproduction:

1. Build with the accepted Node command.
2. Inspect `.oh-my-harness/docs/source-support/README.md` for the two bare source paths above.
3. Confirm neither path exists in output or inventory.
4. Observe tests still pass and the report claims zero runtime source-only references.

Expected: every reference-bearing installed file uses an installed target path, or the build fails.

Actual: the build succeeds with two unresolved source-tree references because validation only covers slash-terminated variants.

Failure origin: contract/reference-authority design. The frozen rewrite table does not authorize the bare-form transformations, so repair requires a revised versioned Task 1 boundary rather than executor interpretation.

## Calibration

- Consulted calibration path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-001`, `CAL-002`, `CAL-003`, `CAL-006`, `CAL-SEM-001`, `CAL-SEM-004`, `CAL-ADAPT-005`, `CAL-ADAPT-009`, `CAL-ADAPT-010`

## Unchecked Scope

- npm package, binary, lifecycle operations, target installation, publication, and Task 2-4 behavior were not checked because they are outside Task 1.
- No external or cross-platform runtime matrix was required.
- No repair was performed.
