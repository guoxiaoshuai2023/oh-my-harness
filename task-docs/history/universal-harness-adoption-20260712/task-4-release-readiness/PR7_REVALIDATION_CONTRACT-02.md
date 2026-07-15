# Task 4 PR #7 Focused Revalidation Contract

Identity: `universal-harness-adoption-task-4-pr7-revalidation-contract-20260714-v2`

Status: `PROPOSED FOR STRICT REVIEW`

Producer may reinterpret or modify this boundary: `no`

## 1. Exact Authority And Amendment Semantics

| Artifact | Identity | Path | SHA-256 |
| --- | --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `task-docs/universal-harness-adoption-requirements-20260712.md` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Parent Task 4 contract | `universal-harness-adoption-task-4-contract-20260714-v2` | `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/ACCEPTED_CONTRACT.md` | `b5b2f5e3b79afff5dad4a51c190eac3b486f409a0eafdf68956fe3620d824f5e` |
| Task 1 accepted chain | `universal-harness-adoption-task-1-accepted-evidence-chain-20260713-v2` | `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_ACCEPTED_EVIDENCE_CHAIN_V2.md` | `ebe43ec5e4458befff6490277b09bc9016834f59faa935c2d9120ac55cb3740f` |
| Task 2 accepted chain | `universal-harness-adoption-task-2-accepted-evidence-chain-20260714-v2` | `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_ACCEPTED_EVIDENCE_CHAIN_PR7_V1.md` | `b251f6de280ac6803b593336a5c52592ae5155dbebb7df8e221dc7b4f943be13` |
| Task 3 accepted chain | `universal-harness-adoption-task-3-accepted-evidence-chain-20260714-v1` | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/TASK3_ACCEPTED_EVIDENCE_CHAIN.md` | `2938a0d1bd90f31c7ed7a40f709ea337117760f53243bfcd02479da5bb5f9b61` |
| Transitive impact | `universal-harness-adoption-pr7-transitive-impact-analysis-20260714-v1` | `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/PR7_TRANSITIVE_IMPACT_ANALYSIS.md` | `77557e205b39d86ed0821e9f02952d709e1a192baffafe69f66a3d29de88194f` |
| Rejected revalidation contract | `universal-harness-adoption-task-4-pr7-revalidation-contract-20260714-v1` | `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/PR7_REVALIDATION_CONTRACT-01.md` | `ea14010bf3697ce446479db86f39955d068532dd878fc5467285ae11f11312fb` |
| Contract Review 01 | `universal-harness-adoption-task-4-pr7-revalidation-contract-review-20260714-v1` | `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/PR7_REVALIDATION_CONTRACT_REVIEW-01.md` | `ef68a9ce320fd8a5d05c0629cf8e62c8d22208cb71c993ff0c86e5ee5cad5702` |

The parent Task 4 contract remains normative for its Original Request Anchor, route/gate table, Task 4 role, T4-AC1 through T4-AC11, AS-01 through AS-12, semantic evidence, no-publication boundary, reporting content, upstream-finding routing, and non-conflicting stop conditions.

This v2 amendment explicitly supersedes only:

1. parent Section 4's old Task 2 chain;
2. parent Section 9's fourteen old Task 2 path hashes;
3. parent Section 10's pre-PR branch/HEAD/dirty baseline; and
4. parent Section 16 clauses that prohibit the already-accepted PR commit or already-accepted Task 2 working delta.

The corrected parent path above is the sole source for inherited routes and gate owners; the executor does not infer or select additional routes.

## 2. Objective

Update only the affected Task 4 acceptance/release evidence so the final package proves:

1. standard npm pack/prepack runs with scripts enabled and without a supplied private pack-root value; and
2. the existing AS-01 family uses a literal fresh Git repository with unborn HEAD, no index, no commit, and zero tracked files.

All parent Task 4 ACs/scenarios must be rerun. No AS-13 is added. Task 1 compiler/payload, accepted Task 2 behavior, Task 3 docs, Harness semantics, and package identity are not redesigned or repaired.

## 3. Current Branch And Dirty Baseline

- worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-universal-adoption`
- branch: `codex/universal-nondestructive-harness-adoption`
- HEAD: `53d9995163fec362511b0d7b398cef0a8e31b0f2`
- origin/main: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- accepted committed PR delta: exactly commit `53d9995 Add universal harness adoption lifecycle`
- staged delta: empty

The following six tracked working changes are accepted Task 2 dependencies and protected during Task 4:

| Path | Accepted SHA-256 |
| --- | --- |
| `package.json` | `4ac76602df29dcd335dcfa10caaa1a203682ce47862ee816123ca88e7eb70a74` |
| `src/installer/filesystem.mjs` | `168a79ab511877df69db016287bd03f512d4af67c85be09b36774473bf203519` |
| `src/installer/package-bundle.mjs` | `df94880ea67c7f7f065b5ce3215a86e84dad4da8db9c2f871c0969ca28d0b85e` |
| `test/lifecycle/lifecycle.test.mjs` | `a0f68bef221f852b62f6a3fe7207e9e01ed95d3b6ca4a4bb6ccc0cd329178ebd` |
| `test/lifecycle/package-validation.mjs` | `ef78beb199058a23a3e9eb3fb5a86933ddfe0f6512c97979b9b6d6ba784d0bea` |
| `test/lifecycle/security.test.mjs` | `79821e9d77f82f847d55c43c1cc984938d466dc2393dee48598cc62f35ea5c3f` |

All Task 2 PR #7 gate artifacts are protected untracked evidence. Other pre-existing untracked state remains protected: `task-docs/cases/**`, `task-docs/handoffs/**`, the superseded `universal-nondestructive-harness-adoption` family, and the independent synthesis file. A launch baseline created after strict review must capture complete `git status --short -uall`, hashes/metadata, and attribution. Its own additive path is allowed; any other unexplained path or writer is STOP.

The existing committed PR delta and accepted Task 2 working delta are baseline, not violations. A different HEAD/base/commit set, a changed accepted Task 2 hash, any staged path, or a new unexplained tracked/untracked delta is STOP.

## 4. Exact Write Authority

Only these existing files may change:

| Path | Before SHA-256 |
| --- | --- |
| `test/acceptance/universal-adoption.test.mjs` | `44ef0a4a207359ff98a5a6c36e79ea9901f708a5b889047d6dde21426101a6dd` |
| `test/acceptance/scenario-matrix.mjs` | `80f7f287517b5eb93e0bf79b373638ddae6a0f9d44faa82e6a73dde97e64d47d` |
| `tools/validate-release.mjs` | `a04b69f95178441b26641d1286bb2311e860bec1a8e8a3b80888d2ea435ded78` |

No other implementation path is writable. Explicitly protected current Task 4 surfaces:

- `.github/workflows/ci.yml`: `f18bcf8ae3e400f33ff300661b46f1596a39dc5740a7778165d554180df52cf0`
- `test/support/task4-fixtures.mjs`: `b67c454ed926f720458ffc83356791d0f317ca057f851ecce4913da1947a7212`

All twelve Task 1 paths remain protected at their current accepted hashes. All fourteen Task 2 paths are protected at the hashes in the current Task 2 chain. All five Task 3 docs remain protected at the hashes in the current Task 3 chain. All requirements/plans/gate artifacts and all other repository paths are protected.

`task-docs/harness-capability-enhancement-synthesis-20260714.md` is content-inaccessible: only path/type/size/mtime/SHA metadata may be checked; no read, modification, move, staging, deletion, or consumption.

## 5. Required Behavior

### AS-01 Existing Family

- Create an empty target and run literal `git init` before lifecycle planning.
- Prove unborn symbolic HEAD, absent index/branch ref, no commit, and zero tracked files before install.
- Require `READY`, complete fixed scoped install, and byte-identical `.git` metadata after install.
- Update only the existing AS-01 matrix row with this setup and failure signals, including `IO_UNAVAILABLE`, overlap bypass, or Git metadata mutation.
- Do not add a scenario ID or delivery task.

### Standard Release Pack

- Stage the explicit complete package source required by normal prepack; do not manually materialize `dist` as a substitute.
- Run pack dry-run and two real archive builds with lifecycle scripts enabled, no `OH_MY_HARNESS_PACK_ROOT` value/replacement private variable, isolated home/cache/config/log/tmp, offline loopback registry, and no repository residue.
- Prove deterministic archive bytes/metadata, scoped identity/binary/allowlist, fixed inventory/payload hashes, references, semantic ledgers, six profiles, helper behavior, docs authority, and zero dependencies.
- Verify postpack removes staged `dist`; all temporary/archive output stays under the owned OS temp root and cleanup failure is FAIL.
- Keep `npm run validate:package` as a separate required check.

## 6. Acceptance Criteria

- `T4R-AC1`: AS-01 literally uses fresh `git init` with unborn/no-index/no-commit/zero-tracked preconditions; install succeeds and `.git` is unchanged.
- `T4R-AC2`: release validation uses scripts-enabled normal pack dry-run and two real packs without a supplied private pack-root or `--ignore-scripts` bypass.
- `T4R-AC3`: package identity/content/inventory/hashes and two archive bytes are deterministic; postpack/temp/repository cleanup is verified.
- `T4R-AC4`: parent `T4-AC1` through `T4-AC11` and AS-01 through AS-12 pass; count remains twelve.
- `T4R-AC5`: Task 1/3 chains and all their paths remain unchanged; all fourteen Task 2 hashes match the current chain; no upstream repair occurs.
- `T4R-AC6`: changed paths are a subset of Section 4 and protected/dirty/residue evidence is truthful.

AC-pass-but-user-fail: release validation passes only because it manually builds `dist` or disables scripts, or AS-01 remains a plain non-Git directory while claiming empty-Git coverage. Either is overall FAIL.

## 7. Validation

Run and report:

1. focused AS-01/acceptance and release-validator checks;
2. Node `v24.14.0` `npm test`;
3. `node --test test/acceptance/*.test.mjs`;
4. `npm run validate:package`;
5. `node tools/validate-release.mjs`;
6. all twelve scenarios and every parent T4/T4R AC;
7. parent Python/TOML/router/semantic/reference/package evidence;
8. Task 1/2/3 hashes, complete status/changed paths, staged/committed baseline, residue, protected synthesis metadata, working diff check, and actual CI normative diff command.

Structural IDs, TOML parse, or file existence alone are not semantic proof. Report commands/statuses, relevant raw output, before/after hashes, limitations, and no publication claim.

## 8. Stop Conditions

Stop without expansion if a fix needs a path outside Section 4; any Task 1/2/3 or protected Task 4 path changes; package/installer/compiler behavior must change; CI/docs/support files must change; AS-13/new architecture/dependency/network/registry/secret/external action is needed; current branch/commit/accepted dirty baseline diverges; authority/protected hashes mismatch; an unexplained writer/path appears; or required evidence cannot be returned.

## 9. Versioned Results

- Implementation Report: `universal-harness-adoption-task-4-pr7-implementation-report-20260714-v1`, intended `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/IMPLEMENTATION_REPORT_PR7_V1.md`
- Result QA: `universal-harness-adoption-task-4-pr7-result-qa-20260714-v1`, intended `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/RESULT_QA_PR7_V1.md`
- Main-thread acceptance: `universal-harness-adoption-task-4-pr7-main-thread-acceptance-20260714-v1`, intended `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/MAIN_THREAD_ACCEPTANCE_PR7_V1.md`

Prior Task 4 result artifacts remain read-only history and are not the new verdict. Executor returns its report only in response; main thread persists it and launches fresh producer-independent QA.

This boundary authorizes no stage/commit/push/merge during implementation/QA and no npm publication, release, authentication, signing, secrets, or external writes.
