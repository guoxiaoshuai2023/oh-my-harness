# Task 4 PR #7 Focused Revalidation Contract

Identity: `universal-harness-adoption-task-4-pr7-revalidation-contract-20260714-v1`

Status: `PROPOSED FOR STRICT REVIEW`

Producer may reinterpret or modify this boundary: `no`

## 1. Authority And Objective

This is a focused amendment to the accepted Task 4 boundary, not a new architecture or a replay of Tasks 1-3.

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Parent Task 4 contract | `universal-harness-adoption-task-4-release-readiness-20260713-v2` | `b5b2f5e3b79afff5dad4a51c190eac3b486f409a0eafdf68956fe3620d824f5e` |
| Current Task 1 accepted chain | `universal-harness-adoption-task-1-accepted-evidence-chain-20260713-v2` | `ebe43ec5e4458befff6490277b09bc9016834f59faa935c2d9120ac55cb3740f` |
| Current Task 2 accepted chain | `universal-harness-adoption-task-2-accepted-evidence-chain-20260714-v2` | `b251f6de280ac6803b593336a5c52592ae5155dbebb7df8e221dc7b4f943be13` |
| Current Task 3 accepted chain | `universal-harness-adoption-task-3-accepted-evidence-chain-20260713-v1` | `2938a0d1bd90f31c7ed7a40f709ea337117760f53243bfcd02479da5bb5f9b61` |
| Transitive impact analysis | `universal-harness-adoption-pr7-transitive-impact-analysis-20260714-v1` | `77557e205b39d86ed0821e9f02952d709e1a192baffafe69f66a3d29de88194f` |

Objective: update only the affected Task 4 acceptance/release evidence so the final package proves the newly accepted Task 2 behaviors:

1. standard npm pack/prepack lifecycle runs with scripts enabled and without a supplied private pack-root value; and
2. the existing AS-01 empty-repository family uses a literal freshly initialized Git repository with unborn HEAD, no index, no commit, and zero tracked files.

All parent Task 4 T4-AC1 through T4-AC11, AS-01 through AS-12, semantic/non-regression gates, reporting content, and stop conditions remain applicable and must be rerun. No AS-13 is added.

## 2. Exact Write Authority

Only these existing Task 4 files may change:

| Path | Before SHA-256 | Direct reason |
| --- | --- | --- |
| `test/acceptance/universal-adoption.test.mjs` | `44ef0a4a207359ff98a5a6c36e79ea9901f708a5b889047d6dde21426101a6dd` | Make AS-01 a literal fresh `git init` fixture and verify Git metadata preservation. |
| `test/acceptance/scenario-matrix.mjs` | `80f7f287517b5eb93e0bf79b373638ddae6a0f9d44faa82e6a73dde97e64d47d` | Record the unborn/no-index setup and failure signals in the existing AS-01 row. |
| `tools/validate-release.mjs` | `a04b69f95178441b26641d1286bb2311e860bec1a8e8a3b80888d2ea435ded78` | Replace manual prepare/`--ignore-scripts` pack proof with standard package lifecycle evidence. |

No other implementation path is writable. In particular, `.github/workflows/ci.yml`, `test/support/**`, Task 1 files, all fourteen Task 2 paths, five Task 3 docs, README/docs, package metadata, installer/compiler code, and all other tests are protected.

The independent user file `task-docs/harness-capability-enhancement-synthesis-20260714.md` is content-inaccessible. Only path/type/size/mtime/SHA metadata may be checked; it must not be read, modified, moved, staged, deleted, or consumed.

## 3. Required Behavior

### AS-01

- The existing AS-01 test creates an empty target and runs literal `git init` before lifecycle planning.
- It proves unborn symbolic HEAD, absent index/branch ref, no commit, and zero tracked files before install.
- Install must be `READY`, complete successfully, install the full fixed scoped release, and leave `.git` metadata byte-identical.
- The scenario-matrix row must name this setup and fail if the repository is rejected as `IO_UNAVAILABLE`, if overlap checks are bypassed, or if Git metadata changes.
- This remains AS-01; no new scenario ID or separate delivery task is created.

### Standard Release Pack

- Release validation must stage the explicit complete package source needed by normal prepack, not manually materialize `dist` as a substitute.
- Its npm pack dry-run and real archive builds run with lifecycle scripts enabled, no `OH_MY_HARNESS_PACK_ROOT` value, no replacement private variable, isolated home/cache/config/log/tmp, offline loopback registry controls, and no repository residue.
- It must prove two deterministic release candidates, identical archive bytes/metadata, scoped package identity, binary, exact allowlist, fixed payload/inventory hashes, reference closure, semantic ledgers, six profiles, helper behavior, documentation authority, and zero third-party dependencies.
- Postpack cleanup must leave staged package sources without `dist`; all archive/temp output remains under the owned OS temporary root and cleanup failure is FAIL.
- Existing `npm run validate:package` remains a separate required check; release validation may not claim it as a substitute for its own archive/semantic evidence.

## 4. Acceptance Criteria

- `T4R-AC1`: AS-01 is a literal fresh initialized Git repository with unborn HEAD/no index/no commit/zero tracked files; install succeeds and `.git` is unchanged.
- `T4R-AC2`: release validation runs scripts-enabled normal pack dry-run and two real packs without a supplied private pack-root value or `--ignore-scripts` bypass.
- `T4R-AC3`: final package identity/content/inventory/hashes and two archive bytes are deterministic; postpack/temp/repository cleanup is verified.
- `T4R-AC4`: all parent `T4-AC1` through `T4-AC11` and AS-01 through AS-12 pass; AS count remains twelve.
- `T4R-AC5`: Task 1 and Task 3 chains remain unchanged; all fourteen current Task 2 hashes match the new accepted chain; no upstream behavior is repaired under Task 4.
- `T4R-AC6`: changed paths are exactly a subset of Section 2, protected/dirty/residue evidence is truthful, and no stage/commit/push/publish/external action occurs during implementation/QA.

AC-pass-but-user-fail: release validation passes because it manually builds `dist` or disables scripts, or AS-01 still uses a plain non-Git directory while claiming empty-Git coverage. Either is overall FAIL even if all structural IDs and existing tests pass.

## 5. Validation And Evidence

The executor must run and report:

1. focused AS-01/acceptance and release-validator tests;
2. `npm test` under Node `v24.14.0`;
3. `node --test test/acceptance/*.test.mjs`;
4. `npm run validate:package`;
5. `node tools/validate-release.mjs`;
6. all twelve scenario decisions and all T4/T4R AC evidence;
7. Python helper/TOML/router/semantic/reference/package checks already required by the parent boundary and release validator;
8. Task 1/2/3 accepted hashes, complete changed paths/status, staged/committed delta, residue, protected synthesis metadata, working diff check, and actual CI normative diff check.

Structural IDs, TOML parse, or file presence alone do not prove semantic preservation. The report must include commands, statuses, relevant raw output, before/after hashes, limitations, and no publication claim.

## 6. Stop Conditions

Stop without expansion if a fix needs a path outside Section 2; any Task 1/2/3 accepted file changes; package/installer/compiler behavior must change; CI/docs/support files must change; an AS-13 or new architecture is proposed; a dependency/network/registry/secret/external action is needed; an authority/protected hash mismatches; an unexplained writer/path appears; or required evidence cannot be returned.

## 7. Versioned Result Artifacts

- Implementation Report identity: `universal-harness-adoption-task-4-pr7-implementation-report-20260714-v1`
- Intended path: `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/IMPLEMENTATION_REPORT_PR7_V1.md`
- Result QA identity: `universal-harness-adoption-task-4-pr7-result-qa-20260714-v1`
- Intended path: `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/RESULT_QA_PR7_V1.md`
- Main-thread acceptance identity: `universal-harness-adoption-task-4-pr7-main-thread-acceptance-20260714-v1`
- Intended path: `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/MAIN_THREAD_ACCEPTANCE_PR7_V1.md`

Prior Task 4 reports/QA/acceptance remain read-only historical evidence and are not accepted as the new verdict. Executor returns its report in the response only; main thread persists it and launches fresh producer-independent Result QA.

Task 4 acceptance authorizes later Git delivery only under the user's separate existing Git-delivery authorization. It does not authorize npm publication, release, authentication, signing, secrets, or external writes.
