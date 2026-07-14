# Task 2 Execution Contract Amendment - Standard Package Lifecycle And Unborn Git Repository

Identity: `universal-harness-adoption-task-2-contract-20260714-v6`

Status: `PROPOSED FOR STRICT REVIEW`

Producer may reinterpret or modify this boundary: `no`

## 1. Authority And Amendment Semantics

This is a focused, versioned amendment to the accepted Task 2 v5 boundary. It does not rewrite requirements, planning, or the lifecycle design.

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| Parent Task 2 boundary | `universal-harness-adoption-task-2-contract-20260712-v5` | `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f` |
| PR #7 independent review | `universal-harness-adoption-pr7-independent-review-20260714-v1` | `c2da6b4535010a7e2d5aab581d5349a713498c5053596b1673a69ff005f2c5ef` |
| PR #7 finding routing | `universal-harness-adoption-pr7-finding-routing-20260714-v1` | `934f48a0af3c4ae4c588c4794bd26c4b49a1b4cd458376421f2f2be26c41f18b` |
| Task 1 no-impact evidence | `universal-harness-adoption-task-1-pr7-no-impact-20260714-v1` | `d7e829de86f289075a9a5ce9e577bdee8fefac0194f0b9cbdb9c7d596c0ded9e` |
| Task 3 no-impact evidence | `universal-harness-adoption-task-3-pr7-no-impact-20260714-v1` | `db73663dd82408a0e8193c025b51fda09eb0c48e8aa2a4e166af9f141a8ca319` |

The parent v5 boundary remains normative except for the clauses explicitly replaced here:

1. v5 Section 4's `prepack` command and its claim that local pack validation may rely on caller-provided `OH_MY_HARNESS_PACK_ROOT` are replaced by Sections 4 and 6 below.
2. v5 Section 5's use of manual bundle preparation plus `npm pack --ignore-scripts`, and its environment requirement to disable lifecycle scripts, are replaced by Sections 4 and 6 below.
3. v5 Section 6's Git overlap assumptions that require an existing index entry, commit OID, or born `HEAD` are replaced by Sections 5 and 6 below.

All other v5 objectives, T2-AC1 through T2-AC20, safety gates, ownership rules, conflict enum, state/sentinel rules, confirmation model, reporting requirements, and stop conditions remain in force and must be regression-verified. This amendment grants no authority to change those behaviors.

## 2. Objective And Failure Boundary

Task identity: `universal-harness-adoption-task-2-lifecycle-cli`

Objective: correct two accepted-boundary defects without redesigning the lifecycle system:

1. standard npm package lifecycle must build the fixed bundle and pack successfully without a private caller environment variable or `--ignore-scripts` bypass; and
2. a newly initialized Git repository with unborn `HEAD`, no index, no commit, and zero tracked files must be a valid installation target while exact planned-path overlap and target-code non-execution remain intact.

These are Task 2 package/Git-discovery defects. Task 1 compiler/payload behavior and Task 3 documentation are accepted no-impact dependencies. Task 4 acceptance is downstream and remains closed until this Task 2 result is accepted.

AC-pass-but-user-fail counterexamples:

- `npm run validate:package` passes only because it manually builds `dist/`, supplies `OH_MY_HARNESS_PACK_ROOT`, or invokes npm with `--ignore-scripts`, while ordinary `npm pack` still fails.
- an unborn repository is accepted only by disabling overlap checks, reading unrelated target content, using target Git configuration, or permitting hooks, filters, fsmonitor, submodules, or other target execution.

Either counterexample is overall FAIL even if focused tests pass.

## 3. Exact Write Authority

The executor may modify only these existing files:

- `package.json`
- `src/installer/package-bundle.mjs`
- `src/installer/filesystem.mjs`
- `test/lifecycle/lifecycle.test.mjs`
- `test/lifecycle/package-validation.mjs`
- `test/lifecycle/security.test.mjs`
- `test/lifecycle/test-helpers.mjs`, only when a shared test-fixture change is directly necessary for the unborn-repository regression

Before hashes:

| Path | SHA-256 |
| --- | --- |
| `package.json` | `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9` |
| `src/installer/package-bundle.mjs` | `8e1a1616f41ef7e00b0327bfbbaa7420dac159d8785e4203f37289fef908db08` |
| `src/installer/filesystem.mjs` | `1bdccb16f40fa3cc0ecf529707a749ef78258f645b3f81f4210e80b463b4f701` |
| `test/lifecycle/lifecycle.test.mjs` | `fd5a9e838111566fa6606d098d6b9e849419cac769aa8e8e2a6f29f36887fb02` |
| `test/lifecycle/package-validation.mjs` | `71f5dd205ded9c921c73863d052d61a8295b2787517affdd007fab5ce6509dbc` |
| `test/lifecycle/security.test.mjs` | `4992b0efc58050eb127d30ae1e42beb5482b309587cde14b1a8567e257938045` |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` |

Everything else is protected, including:

- `package-lock.json`, binary, CLI, lifecycle, marker, and state modules;
- all Task 1 compiler/map/schema/payload files and tests;
- all five Task 3 documentation files;
- Task 4 acceptance fixtures, release validator, support tooling, and CI;
- requirements, plans, contracts, reviews, reports, QA, evidence chains, and prior acceptance artifacts;
- every unrelated tracked or untracked user file.

The independent user file `task-docs/harness-capability-enhancement-synthesis-20260714.md` is content-inaccessible and read-only. Executor and reviewers may verify only its path, type, size, mtime, and SHA-256. They must not read, stage, move, delete, modify, or consume its content.

No dependency, archive, cache, generated `dist/`, npm metadata, fixture repository, or temporary output may persist in the repository.

## 4. Standard Npm Lifecycle Invariants

The package identity remains `@guoxiaoshuai2023/oh-my-harness`; the binary remains `oh-my-harness`; the package version and allowlist remain unchanged.

The corrected lifecycle must satisfy all of the following:

1. `npm pack --dry-run --json` and `npm pack --json` succeed from a complete package source tree with lifecycle scripts enabled and without `OH_MY_HARNESS_PACK_ROOT` or any replacement private caller variable.
2. `prepack` deterministically prepares the fixed bundle from package-local source assets. A package-owned cleanup lifecycle may remove only generated package-local bundle output after pack; cleanup must validate its exact owned destination before deletion and must fail honestly if cleanup fails.
3. `npm run validate:package` remains the sole package-validation entry. It must exercise the standard lifecycle, not manually prepare the bundle and then bypass scripts.
4. Package validation stages only the explicit source, build, installer, binary, metadata, and mapped assets required to exercise the real lifecycle. It must not copy or scan unrelated repository content.
5. Dry-run and real archives preserve the scoped identity, binary mapping, allowlisted contents, fixed inventory, payload hashes, determinism, and zero dependencies.
6. Temporary package source, npm home/cache/config/log/tmp, generated output, and archives remain under one owned OS temporary root and are cleaned in `finally`. Cleanup failure is a validation failure.
7. No ordinary validation writes repository `dist/`, archive, npm cache/config/log, pack metadata, or other residue.
8. No registry access, authentication, publication, signing, secret access, or external write is authorized.

The package validator may set only standard non-sensitive npm isolation controls needed for offline local validation. It must not set `npm_config_ignore_scripts=true` for the standard pack proof. Local archive installation may disable dependency install scripts only if that does not bypass this package's already-proven pack lifecycle.

## 5. Empty Initialized Git Repository Invariants

A target created by `git init` is valid when its `HEAD` is a safe symbolic reference to an absent local branch, its index is absent, it has no commits, and it has zero tracked files.

Git overlap discovery must:

1. treat unborn `HEAD`, absent index, and zero tracked files as ordinary repository state rather than `IO_UNAVAILABLE`;
2. inspect only the normalized planned write paths and their exact Git overlap;
3. report overlapping untracked or staged planned paths as `DIRTY_OVERLAP` before mutation;
4. ignore unrelated dirty/untracked paths except for preserving them through write confinement;
5. use sanitized, read-only Git invocations with hooks, filters, fsmonitor, optional locks, prompts, replacement objects, alternates, and submodule traversal disabled;
6. avoid target-repository configuration, hooks, filters, submodules, commands, scripts, and code execution;
7. preserve existing behavior for born repositories and non-Git filesystem targets; and
8. return the existing closed conflict `IO_UNAVAILABLE` for malformed, inaccessible, unsafe, or unprovable Git metadata rather than guessing.

The implementation may create a sanitized temporary Git view under the already-authorized operation-owned OS temporary root. That view must model the unborn symbolic `HEAD` and optional absent index without modifying the target `.git` directory.

## 6. Acceptance Criteria

- `T2R-AC1`: normal, scripts-enabled `npm pack --dry-run --json` and `npm pack --json` succeed without a caller-provided private environment variable.
- `T2R-AC2`: both pack forms retain scoped identity, binary, package allowlist, bundle inventory/hashes, deterministic output, and zero third-party dependencies.
- `T2R-AC3`: `npm run validate:package` proves the normal lifecycle and leaves no repository or temporary-root residue; cleanup failure is a failure.
- `T2R-AC4`: a freshly initialized empty Git repository reaches a clean lifecycle plan and completes install in an isolated fixture.
- `T2R-AC5`: untracked and staged overlap on an exact planned destination still stop before write, while unrelated dirty paths remain unchanged and do not block.
- `T2R-AC6`: Git discovery remains read-only, exact-path-scoped, and non-executing; hooks, filters, fsmonitor, optional locks, submodules, alternates, and target configuration cannot run or influence the result.
- `T2R-AC7`: all parent v5 `T2-AC1` through `T2-AC20` remain satisfied and all required package/compiler/lifecycle/security suites pass.
- `T2R-AC8`: actual changed paths stay within Section 3, protected hashes remain unchanged, the report is truthful, and no forbidden residue or external action occurs.

## 7. Required Evidence And Validation

The executor must report commands, exit codes, relevant raw output, exact changed paths, before/after hashes, and any unvalidated limitation. At minimum it must run:

1. focused package lifecycle and Git discovery regression tests, including direct positive fixtures for normal pack and an empty initialized repository;
2. negative fixtures for exact planned-path untracked/staged overlap and target Git execution controls;
3. `npm test` under the repository's supported Node 24 runtime;
4. `npm run validate:package`;
5. a separate scripts-enabled, no-private-variable `npm pack --dry-run --json` and real archive check inside an isolated OS temporary package source, with cleanup and residue evidence;
6. Task 1 compiler/package and existing Task 2 lifecycle/security regressions;
7. TOML/Python/router checks only as non-regression evidence when already part of the accepted repository validation surface;
8. protected-path hash comparison, complete Git status, staged/committed delta, residue checks, and the normative `git diff --check` command used by CI.

The report must explicitly distinguish repository-local validation from unauthorized npm registry publication or authentication, neither of which is performed.

## 8. Stop And Escalation Conditions

Stop without expanding scope if:

- a required fix needs any path outside Section 3;
- Task 1 compiler, bundle mapping, package contract, payload, or profile behavior must change;
- Task 3 documentation or Task 4 fixture/CI/release tooling must change during this Task 2 cycle;
- standard lifecycle correctness would require a dependency, registry access, secret, publication, or a new packaging architecture;
- safe unborn-repository support cannot be implemented without reading unrelated paths or executing target content;
- any authority hash, protected hash, branch baseline, or dirty-path attribution mismatches;
- a test exposes a requirements/plan gap or an out-of-boundary defect; or
- complete Implementation Report evidence cannot be returned.

Implementation choices that fit these invariants remain with the executor; this contract does not prescribe function names, module decomposition, or shell command composition.

## 9. Handoff

The executor returns a complete Implementation Report in its response and does not create gate artifacts. The main thread persists it, launches a fresh read-only producer-independent Result Evaluator, and independently checks the actual files and raw validation evidence.

Task 2 acceptance must freeze a new accepted evidence identity and current hashes. Main thread then performs transitive impact analysis: Task 1 compiler/payload and Task 3 docs are rechecked for no impact; Task 4 old final acceptance is superseded for delivery purposes and must be revalidated against standard npm lifecycle and the empty initialized Git fixture before PR delivery.

Task 3/4 implementation, Git stage/commit/push/merge, npm publication, release creation, authentication, signing, and secret access are not authorized by this boundary.
