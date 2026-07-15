# PR #7 Independent Review

Identity: `universal-harness-adoption-pr7-independent-review-20260714-v1`

Status: `STRICT FAIL`

## Reviewer Run

- Reviewer type: fresh producer-independent read-only result evaluator
- Agent id: `019f5dfe-ab6e-7860-9875-349be482c47e`
- Agent nickname: `Nietzsche`
- PR: `https://github.com/guoxiaoshuai2023/oh-my-harness/pull/7`
- Base: `origin/main` at `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Reviewed head: `53d9995163fec362511b0d7b398cef0a8e31b0f2`
- Reviewer completion status: `completed`
- Exact service start/end timestamps: `unavailable`
- External writes: none
- Protected user file: not read or consumed

The launch packet initially contained a transcribed full-hash error. The main thread corrected it before completion; the reviewer explicitly reviewed the checked-out head above and `origin/main...HEAD`.

## Calibration

- Consulted path: `task-docs/_harness/evaluator-calibration.md`
- Consulted SHA-256: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`
- Relevant cases: `CAL-001`, `CAL-002`, `CAL-003`, `CAL-006`, `CAL-SEM-001`, `CAL-SEM-004`, `CAL-ADAPT-009`

## Decision

- Implementation Verification: `FAIL`
- Semantic Validation: `FAIL`
- Overall Decision: `FAIL`

The reviewer found two P1 blockers. Automated suites passed, but they did not exercise the two failing user-facing paths.

## Evidence Checked

- Full 212-path committed PR diff: 32,746 insertions and 22 deletions.
- Requirements v5, implementation plans v4/v5, Task 4 contract, Implementation Report V4, Result QA V2, and Main-Thread Acceptance V2.
- Package/compiler, lifecycle, filesystem, state, marker, fixtures, release validation, CI, and product documentation.
- `npm test`: `60/60 PASS` under Node v24.14.0.
- `node --test test/acceptance/*.test.mjs`: `28/28 PASS`.
- `npm run validate:package`: `PASS`, 53-file archive.
- `node tools/validate-release.mjs`: `PASS` with deterministic reported identities.
- `env -u OH_MY_HARNESS_PACK_ROOT npm run prepack`: `FAIL`, exit `1`.
- Fresh `git init` target: lifecycle plan returned `CONFLICT`, `IO_UNAVAILABLE`, path `.git`.
- High-confidence private-key/token-prefix scan: no committed matches.
- No repository `dist`, package archive, or package residue remained after review.

Remote GitHub Actions and npm registry behavior were not used by the reviewer. The main thread checked GitHub Actions separately. Superseded historical contracts were not re-adjudicated as current authority.

## P1 Finding 1 - Standard Package Lifecycle Is Broken

`package.json` declares:

```text
node src/installer/package-bundle.mjs prepare --pack-root "$OH_MY_HARNESS_PACK_ROOT"
```

Without that private caller-provided variable, the script supplies an empty argument and `src/installer/package-bundle.mjs` rejects the invocation.

The existing validation avoids the path by manually preparing a staged package and invoking `npm pack --ignore-scripts`. `tools/validate-release.mjs` repeats the bypass. Therefore passing package validation did not prove the standard npm lifecycle.

Reproduction:

```text
env -u OH_MY_HARNESS_PACK_ROOT npm run prepack
```

Observed result:

```text
package bundle preparation failed: usage: package-bundle.mjs prepare --pack-root <absolute-directory>
```

Expected result: the deterministic prepack/build step must produce the fixed release without an undocumented caller-provided environment variable, and normal `npm pack` must succeed.

Affected decisions:

- `T2-AC19`: FAIL
- `T4-AC1`: FAIL
- `T4-AC8`: FAIL
- `T4-AC10`: FAIL
- Distribution success criterion: FAIL

Primary file evidence:

- `package.json:19`
- `src/installer/package-bundle.mjs:103`
- `test/lifecycle/package-validation.mjs:230`
- `test/lifecycle/package-validation.mjs:239`
- `tools/validate-release.mjs:368`

## P1 Finding 2 - Empty Initialized Git Repository Is Rejected

Requirements v5 includes installation into an existing or empty Git repository. A repository immediately after `git init`, with an unborn symbolic HEAD, no commit, and no index entries, is an empty Git repository.

`src/installer/filesystem.mjs` currently requires both `.git/HEAD` and `.git/index`, then requires a resolvable commit OID. The resulting `unsafe-git-layout` is converted into `IO_UNAVAILABLE` by lifecycle planning.

Reproduction setup:

```text
mkdir target
git -C target init
createLifecyclePlan({ operation: "install", target, release })
```

Observed result:

```json
{"status":"CONFLICT","conflicts":[{"code":"IO_UNAVAILABLE","path":".git"}]}
```

Expected result: `READY`, provided no exact planned write path overlaps dirty/untracked work. Git discovery must remain read-only and non-executing.

Affected decisions:

- Requirements `AS-01`: FAIL
- `T4-AC2`: FAIL
- `T4-AC3`: FAIL
- `T4-AC10`: FAIL

Primary file evidence:

- `task-docs/universal-harness-adoption-requirements-20260712.md:79`
- `src/installer/filesystem.mjs:349`
- `src/installer/filesystem.mjs:380`
- `src/installer/lifecycle.mjs:338`
- `test/lifecycle/test-helpers.mjs:21`

## AC Summary

- Task 1: `T1-AC1` through `T1-AC11` PASS.
- Task 2: `T2-AC1` through `T2-AC18` PASS; `T2-AC19` FAIL; `T2-AC20` PASS.
- Task 3: `T3-AC1` through `T3-AC9` PASS.
- Task 4: `T4-AC1`, `T4-AC2`, `T4-AC3`, `T4-AC8`, and `T4-AC10` FAIL; the remaining Task 4 ACs PASS.
- Requirements scenarios: `AS-01` FAIL; `AS-02` through `AS-12` PASS.

## Non-Blocking Finding

The raw complete PR diff reports whitespace in immutable SHA-addressed history artifacts. CI intentionally excludes those exact evidence surfaces from its normative whitespace check. This is disclosure, not permission to rewrite frozen artifact bytes.

## Reviewer-Requested Outcome

Reopen the Task 2 package and Git-discovery boundary, add direct regressions for standard scripts-enabled `npm pack` and a literal empty `git init` repository, then transitively rerun Task 4 release validation and independent QA.
