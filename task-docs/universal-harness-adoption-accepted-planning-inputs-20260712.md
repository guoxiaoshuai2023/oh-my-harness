# Universal Harness Adoption Accepted Planning Inputs

Identity: `universal-harness-adoption-accepted-planning-inputs-20260712-v1`

Status: `FROZEN PLANNING INPUT MANIFEST`

This manifest freezes the inputs accepted for later Universal Harness Adoption task contracting. It does not authorize contracting, implementation, Git delivery, registry access, or publication. Its own SHA-256 is recorded externally after final bytes are written to avoid self-reference.

## Accepted Inputs

| Role | Path | Identity | SHA-256 | Decision |
| --- | --- | --- | --- | --- |
| Requirements | `task-docs/universal-harness-adoption-requirements-20260712.md` | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` | User-frozen `PASS` |
| Isolated Pass A | `task-docs/universal-harness-adoption-plan-review-pass-a-20260712.md` | `universal-harness-adoption-plan-review-pass-a-20260712-v1` | `595c7519b9f607a1496df87007467acd637094a2cde89dc0266e0b8123d695cc` | `PASS` baseline |
| Implementation plan | `task-docs/universal-harness-adoption-implementation-task-plan-20260712.md` | `universal-harness-adoption-implementation-plan-20260712-v3` | `8ee3ea376647413e7096724ecf1c814d6e901fe7397a1da5f2e82a671d2e3331` | Main-thread candidate accepted after strict Pass B |
| Final Pass B | `task-docs/universal-harness-adoption-plan-review-20260712-v3.md` | `universal-harness-adoption-plan-review-20260712-v3` | `b687e2411454ae7118521e8d6471b11f9f340ca282cbdba3c7cd3e43e814eba9` | Strict `PASS` |

Canonical evaluator calibration used by Pass A/B:

- Path: `task-docs/_harness/evaluator-calibration.md`
- SHA-256: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`

## Superseded Planning Iterations

These artifacts are preserved as finding history but are not accepted planning authority:

| Path | Identity | SHA-256 | Decision |
| --- | --- | --- | --- |
| `task-docs/universal-harness-adoption-plan-review-20260712-v1.md` | `universal-harness-adoption-plan-review-20260712-v1` | `224f22dfb43088c86f00b948626afad42a7e30943ebf5f9199c64fdfa1063823` | `FAIL` |
| `task-docs/universal-harness-adoption-plan-review-20260712-v2.md` | `universal-harness-adoption-plan-review-20260712-v2` | `aef9a39afc783489046e4ab80f95e9eb121ad25c907eb84ad3b8dac43ab7ee93` | `FAIL` |

The plan v1 and v2 bytes were revised in place before final acceptance and are not frozen inputs. Their exact reviewed hashes remain recorded in the corresponding immutable review artifacts:

- v1 reviewed SHA-256: `ca3690cd529365549601fcdc0c1a8ce3898f697fbc8c4223c654cdcf665d0005`
- v2 reviewed SHA-256: `23ad79022c385044c6e6b34aefa35f667eb8e68a209adb42101368955cfd6c2c`

Only plan v3 at the accepted hash may control later work.

## Main-Thread Semantic Comparison

The main thread compared final plan v3 with requirements v5, frozen Pass A, and the run-level Outcome Contract embedded in the plan.

Result: `PASS`.

The plan preserves:

- one stable versioned package command surface rather than manual copying;
- fixed inventory and namespaced ownership instead of governance-system coordination;
- exact managed block and outer-byte preservation;
- immutable inventory versus mutable non-self-hashing state;
- install/update/uninstall/no-op, asymmetric update, backups, containment, marker integrity, and truthful incomplete state;
- all twelve acceptance scenarios and the outer-byte AC-pass-but-user-fail case;
- adaptive main-thread semantics, required and deliberate full-v2 compatibility, six profiles, evaluator/executor boundaries, calibration binding, modal force, and producer-independent semantic evidence;
- secret-safe dirty-state preservation and protected superseded history;
- local package acceptance separated from license, registry ownership, credentials, signing, and actual publication.

No forbidden substitution or unresolved requirements-level ambiguity remains in the accepted plan.

## Current Git And Dirty-State Baseline

- Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-universal-adoption`
- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked branch delta: empty
- Staged delta: empty
- Tracked implementation/Harness changes made by this planning task: none

All current dirty entries are under `task-docs/` and consist of the frozen new planning family plus superseded adoption history. Later boundaries must:

- use path/status/type metadata without reading unknown future untracked content;
- hash only these known, explicitly authorized, non-sensitive Markdown planning/history artifacts;
- preserve every pre-existing untracked path;
- stop on an unknown overlap instead of reading or hashing it;
- verify the accepted input hashes above before any later task transition.

## Accepted Delivery Sequence

1. Task 1 establishes the deterministic compiler, explicit map, schemas, marker, package contract, and provisional bundle evidence.
2. Task 2 creates the real package metadata/binary and complete non-destructive lifecycle engine.
3. Task 3 documents the accepted product, lifecycle authority, and publication boundary.
4. Task 4 generates the only final package/inventory identity and proves all twelve outcomes, semantic non-regression, CI, and package contents.

Each task requires a later versioned producer-nonmodifiable boundary and applicable independent evidence. The main thread will select the smallest sufficient topology at that time; this manifest does not mandate complete v2 or start Task 1.

## Stop State

Planning is complete. Task 1 contracting and all implementation remain `NOT STARTED`.

Any change to requirements, Pass A, plan, final Pass B, package architecture, delivery ownership, or this manifest requires a new versioned planning authority before implementation proceeds.
