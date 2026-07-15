# PR #7 Finding Routing Decision

Identity: `universal-harness-adoption-pr7-finding-routing-20260714-v1`

Decision: `ACCEPT BOTH P1 FINDINGS AND REOPEN TASK 2`

## Bound Evidence

- PR head: `53d9995163fec362511b0d7b398cef0a8e31b0f2`
- PR: `https://github.com/guoxiaoshuai2023/oh-my-harness/pull/7`
- Independent review: `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/PR7_INDEPENDENT_REVIEW.md`
- Previous Task 2 contract SHA-256: `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`
- Previous Task 2 Implementation Report V2 SHA-256: `7a3ebf73a3465b4990a0b67c422565f6d8e7d024097db8ea533ae97b43248551`
- Previous Task 2 Result QA V2 SHA-256: `595dca2d5a3f4bb0ba9161b4c93599513c478ea4e2ff2acfc2a94ef42643ea8c`
- Previous Task 2 acceptance SHA-256: `d5edff6e70e16eccdcbe610472cc96ae2e211cd61db6df10abc53a290d8b814f`
- Previous Task 4 acceptance SHA-256: `603c46031512fece5e2e3e51fa32309bf13205e54ca2ac71257df9f8e324d4c9`

## Main-Thread Reproduction

The main thread independently reproduced both findings under Node v24.14.0.

Standard lifecycle:

```text
env -u OH_MY_HARNESS_PACK_ROOT npm run prepack
exit=1
package bundle preparation failed: usage: package-bundle.mjs prepare --pack-root <absolute-directory>
```

Empty initialized Git repository:

```json
{"status":"CONFLICT","conflicts":[{"code":"IO_UNAVAILABLE","path":".git"}]}
```

## Failure Classification

- Failure origin: Task 2 accepted contract/package-and-Git-discovery boundary defect.
- The standard package failure contradicts Plan v4's deterministic prepack and normal local `npm pack` outcome.
- The Git failure contradicts Requirements v5's existing-or-empty Git repository outcome.
- The old Task 2 implementation and acceptance remain historical evidence but are superseded for downstream delivery by the revised Task 2 result.
- The old Task 4 acceptance cannot authorize merge because its package and AS-01 evidence omitted the failing paths.
- This is not a Task 1 compiler/payload defect.
- This is not a Task 3 documentation defect.

## Substantive User Decision

The user fixed these outcomes:

1. Standard `npm pack` and future publish prepack must not depend on a caller-provided `OH_MY_HARNESS_PACK_ROOT` and must not be proved only with `--ignore-scripts`.
2. A fresh `git init` repository with an unborn HEAD, no commit, and no index entries is a valid install target.
3. Git discovery remains read-only, checks only exact planned write paths, disables hooks/fsmonitor/optional locks/submodules/filters, and executes no target-repository content.
4. Task 1 and Task 3 reopen only if evidence disproves their no-impact decisions.
5. Task 4 must be reaccepted after revised Task 2 evidence stabilizes.

## Authorized Next Work

- Create and strictly review one revised Task 2 boundary limited to the two P1 outcomes and direct tests.
- Perform one focused implementation and producer-independent Result QA cycle.
- Freeze revised Task 2 evidence and transitive Task 1/2/3 impact.
- Revalidate Task 4, including standard package lifecycle and an empty initialized Git fixture inside AS-01.
- Push fixes to PR #7 only after Task 2 and Task 4 both pass.

No requirements rewrite, full implementation-plan rewrite, npm publication, release creation, registry authentication, signing, secret access, force push, or new PR is authorized.
