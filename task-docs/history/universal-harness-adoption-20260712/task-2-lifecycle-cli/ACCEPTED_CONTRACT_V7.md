# Task 2 Execution Contract Amendment - Standard Package Lifecycle And Unborn Git Repository

Identity: `universal-harness-adoption-task-2-contract-20260714-v7`

Status: `PROPOSED FOR STRICT REVIEW`

Producer may reinterpret or modify this boundary: `no`

## 1. Authority And Amendment Semantics

This focused amendment corrects two Task 2 boundary defects. It does not rewrite requirements, planning, or the lifecycle design.

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| Parent Task 2 boundary | `universal-harness-adoption-task-2-contract-20260712-v5` | `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f` |
| Rejected Contract Iteration 06 | `universal-harness-adoption-task-2-contract-20260714-v6` | `3808cd82241cb68226a327880167e676297cc7e1a70e873439357af3b5c2b440` |
| Contract Review 06 | `universal-harness-adoption-task-2-contract-review-20260714-v6` | `6aa4fc7f06aa158bbfdcc34d8ce9a8f782f9a0e011a07634b3e7dc5901156441` |
| PR #7 independent review | `universal-harness-adoption-pr7-independent-review-20260714-v1` | `c2da6b4535010a7e2d5aab581d5349a713498c5053596b1673a69ff005f2c5ef` |
| PR #7 finding routing | `universal-harness-adoption-pr7-finding-routing-20260714-v1` | `934f48a0af3c4ae4c588c4794bd26c4b49a1b4cd458376421f2f2be26c41f18b` |
| Task 1 no-impact evidence | `universal-harness-adoption-task-1-pr7-no-impact-20260714-v1` | `d7e829de86f289075a9a5ce9e577bdee8fefac0194f0b9cbdb9c7d596c0ded9e` |
| Task 3 no-impact evidence | `universal-harness-adoption-task-3-pr7-no-impact-20260714-v1` | `db73663dd82408a0e8193c025b51fda09eb0c48e8aa2a4e166af9f141a8ca319` |

The parent v5 boundary remains normative except for these explicit replacements:

1. v5 Section 4's private-environment `prepack` command is replaced by Sections 4 and 6 below.
2. v5 Section 5's manual prepare plus `npm pack --ignore-scripts` validation is replaced by Sections 4 and 6 below.
3. v5 Section 6's requirement for an existing index and born HEAD/OID is replaced by Sections 5 and 6 below. Its temporary object-store mechanism is retained only under the explicit distinction in Section 5.
4. v5 Section 14's consumed Implementation Report identity/path is replaced by Section 9 below.
5. v5 Section 15's historical statement that Tasks 3 and 4 remain unstarted is replaced by Section 9 below.

All other v5 objectives, T2-AC1 through T2-AC20, safety gates, ownership rules, conflict enum, state/sentinel rules, confirmation model, reporting content, and stop conditions remain in force and must be regression-verified. This amendment grants no authority to change those behaviors.

## 2. Objective And Failure Boundary

Task identity: `universal-harness-adoption-task-2-lifecycle-cli`

Objective:

1. make the standard npm package lifecycle build and pack the fixed bundle without a caller-provided private environment variable or `--ignore-scripts` bypass; and
2. accept a newly initialized Git repository with unborn `HEAD`, no index, no commit, and zero tracked files while retaining exact planned-path overlap and target-code non-execution.

These are Task 2 package/Git-discovery defects. Task 1 compiler/payload behavior and Task 3 documentation are accepted no-impact dependencies. Task 4 acceptance is downstream and must be revalidated after Task 2 acceptance.

AC-pass-but-user-fail counterexamples:

- package validation passes only because it manually creates `dist/`, supplies `OH_MY_HARNESS_PACK_ROOT`, or invokes npm with `--ignore-scripts`, while ordinary `npm pack` fails;
- an unborn repository is accepted only by disabling overlap checks, reading unrelated target content, using target Git configuration, or permitting hooks, filters, fsmonitor, submodules, or other target execution.

Either result is overall FAIL.

## 3. Exact Write Authority

The executor may modify only:

- `package.json`
- `src/installer/package-bundle.mjs`
- `src/installer/filesystem.mjs`
- `test/lifecycle/lifecycle.test.mjs`
- `test/lifecycle/package-validation.mjs`
- `test/lifecycle/security.test.mjs`
- `test/lifecycle/test-helpers.mjs`, only if directly necessary for the unborn-repository fixture

| Path | Before SHA-256 |
| --- | --- |
| `package.json` | `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9` |
| `src/installer/package-bundle.mjs` | `8e1a1616f41ef7e00b0327bfbbaa7420dac159d8785e4203f37289fef908db08` |
| `src/installer/filesystem.mjs` | `1bdccb16f40fa3cc0ecf529707a749ef78258f645b3f81f4210e80b463b4f701` |
| `test/lifecycle/lifecycle.test.mjs` | `fd5a9e838111566fa6606d098d6b9e849419cac769aa8e8e2a6f29f36887fb02` |
| `test/lifecycle/package-validation.mjs` | `71f5dd205ded9c921c73863d052d61a8295b2787517affdd007fab5ce6509dbc` |
| `test/lifecycle/security.test.mjs` | `4992b0efc58050eb127d30ae1e42beb5482b309587cde14b1a8567e257938045` |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` |

Everything else is protected, including package-lock, binary/CLI/lifecycle/marker/state modules, Task 1 files, Task 3 docs, Task 4 fixtures/tools/CI, and all gate artifacts.

`task-docs/harness-capability-enhancement-synthesis-20260714.md` is content-inaccessible independent user work. Only path/type/size/mtime/SHA metadata may be checked. It must not be read, modified, moved, staged, deleted, or consumed.

No dependency, archive, cache, generated repository `dist/`, npm metadata, fixture repository, or temporary output may persist.

## 4. Standard Npm Lifecycle Invariants

Package identity remains `@guoxiaoshuai2023/oh-my-harness`; binary remains `oh-my-harness`; version and allowlist remain unchanged.

1. `npm pack --dry-run --json` and `npm pack --json` succeed from a complete package source tree with scripts enabled and without `OH_MY_HARNESS_PACK_ROOT` or any replacement private caller variable.
2. `prepack` deterministically prepares the fixed bundle from package-local source assets. A package-owned cleanup lifecycle may remove only exact generated package-local output after pack, must validate ownership before deletion, and must fail honestly on cleanup failure.
3. `npm run validate:package` remains the sole package-validation entry and exercises the standard lifecycle instead of bypassing it.
4. Validation stages only the explicit build, installer, binary, metadata, and mapped assets needed by the lifecycle; it does not copy or scan unrelated repository content.
5. Dry-run and real archives preserve scoped identity, binary mapping, allowlisted contents, fixed inventory/hashes, determinism, and zero dependencies.
6. Package source, npm home/cache/config/log/tmp, generated output, and archives stay under one owned OS temporary root and are cleaned in `finally`; cleanup failure fails validation.
7. No validation leaves repository `dist/`, archive, npm cache/config/log, pack metadata, or other residue.
8. Registry access, authentication, publication, signing, secret access, and external writes are forbidden.

The standard pack proof must not set `npm_config_ignore_scripts=true`. Local archive installation may disable dependency install scripts only after the package's own pack lifecycle has been proven normally.

## 5. Empty Initialized Git Repository And Alternate Boundary

A target created by `git init` is valid when `HEAD` is a safe symbolic reference to an absent local branch, the index is absent, there are no commits, and there are zero tracked files.

Git overlap discovery must:

1. treat unborn `HEAD`, absent index, and zero tracked files as normal state;
2. inspect only normalized planned paths and exact Git overlap;
3. report untracked or staged planned-path overlap as `DIRTY_OVERLAP` before mutation;
4. leave unrelated dirty paths unchanged and non-blocking;
5. use sanitized read-only Git with hooks, filters, fsmonitor, optional locks, prompts, replacement objects, submodules, and target configuration disabled;
6. preserve existing born-repository and non-Git behavior; and
7. retain `IO_UNAVAILABLE` for malformed, inaccessible, unsafe, or unprovable Git metadata.

Alternate semantics are explicit:

- target-owned or inherited object alternates, including target `.git/objects/info/alternates`, environment-supplied alternates, replacement-object routing, or alternate chains, are forbidden and cause STOP;
- the installer may create exactly one package-owned `objects/info/alternates` file inside its sanitized temporary Git directory, pointing directly to the already-contained and validated target `.git/objects` directory;
- that temporary bridge is allowed only for read-only object resolution by the one sanitized exact-path `git status` process; it is not target configuration, is not copied from the target, cannot chain because target alternates are prechecked absent, lives under the operation-owned temporary root, and is deleted with that root;
- an unborn repository may use a safe symbolic temporary HEAD and no index; the package-owned bridge is optional when no objects are needed.

The temporary view must never modify the target `.git` directory or worktree.

## 6. Acceptance Criteria

- `T2R-AC1`: normal scripts-enabled pack dry-run and real pack succeed without a private caller variable.
- `T2R-AC2`: both retain identity, binary, allowlist, inventory/hashes, determinism, and zero dependencies.
- `T2R-AC3`: `npm run validate:package` proves normal lifecycle, cleanup, and zero repository/temp residue.
- `T2R-AC4`: a fresh `git init` target reaches a clean plan and completes isolated install.
- `T2R-AC5`: exact planned untracked/staged overlap still stops; unrelated dirty paths do not block or change.
- `T2R-AC6`: Git discovery stays read-only, exact-path scoped, and non-executing under the Section 5 alternate distinction.
- `T2R-AC7`: parent `T2-AC1` through `T2-AC20` and required package/compiler/lifecycle/security suites pass.
- `T2R-AC8`: changed paths stay within Section 3, protected hashes hold, evidence is truthful, and no forbidden residue/external action occurs.

## 7. Required Evidence And Validation

The executor reports commands, exit codes, relevant raw output, changed paths, before/after hashes, and limitations. It must run:

1. focused package and Git regressions, including positive normal-pack and fresh-`git init` fixtures;
2. negative exact-path overlap and target Git execution-control fixtures;
3. `npm test` under frozen Node `v24.14.0`;
4. `npm run validate:package`;
5. a separate scripts-enabled no-private-variable pack dry-run and real archive check in an isolated OS temporary package source, with cleanup/residue evidence;
6. Task 1 compiler/package and Task 2 lifecycle/security regressions;
7. protected hashes, complete status, staged/committed delta, residue checks, and CI's normative `git diff --check` command.

Registry publication/authentication is neither run nor claimed.

## 8. Stop Conditions

Stop without expansion if a fix needs a path outside Section 3; Task 1, Task 3, or Task 4 changes; a dependency; registry/secret/external access; a new packaging architecture; unrelated target reads; target code execution; a mismatched authority/protected hash; an unexplained dirty path; or a requirements/plan/out-of-boundary defect.

Implementation organization remains with the executor. This contract does not prescribe function names, module decomposition, or shell composition.

## 9. Versioned Reporting And Downstream State

Prior Task 2 reports, QA, acceptance, contracts, and reviews remain read-only historical evidence and are not overwritten.

- New Implementation Report identity: `universal-harness-adoption-task-2-pr7-implementation-report-20260714-v1`
- Intended path: `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/IMPLEMENTATION_REPORT_PR7_V1.md`
- New Result QA identity: `universal-harness-adoption-task-2-pr7-result-qa-20260714-v1`
- Intended path: `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/RESULT_QA_PR7_V1.md`
- New main-thread acceptance identity: `universal-harness-adoption-task-2-pr7-main-thread-acceptance-20260714-v1`
- Intended path: `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/MAIN_THREAD_ACCEPTANCE_PR7_V1.md`

The executor returns the report only in its response; main thread persists it and starts a fresh read-only producer-independent evaluator. The evaluator inspects actual files/output and performs no repair.

Task 3 is already accepted under its recorded waiver and is protected; this cycle must reverify and record concrete no-impact evidence. Task 4 has already run historically, but its old acceptance is not sufficient for PR delivery after this Task 2 change. After Task 2 acceptance, main thread must freeze a new Task 2 evidence chain, confirm Task 1/Task 3 no impact, and reopen only the affected Task 4 verification/fixture scope under a separate boundary.

No Task 3/4 implementation, stage, commit, push, PR update, merge, publication, release, authentication, signing, or secret access is authorized by this boundary.
