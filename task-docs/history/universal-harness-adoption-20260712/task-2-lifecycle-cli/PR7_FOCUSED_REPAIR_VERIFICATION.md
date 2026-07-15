# PR #7 Focused Repair Verification

Identity: `universal-harness-adoption-pr7-focused-repair-verification-20260715-v1`

Status: `MAIN-THREAD PRIMARY EVIDENCE - FRESH REVIEW PENDING`

## Scope

This report verifies the focused repair authorized by `universal-harness-adoption-pr7-focused-repair-authority-20260715-v1`.

Candidate baseline commit: `255a10f0acd6589eb23bc9101c8720f9d1a8ce0b`

Behavior changes are limited to:

- propagating a detected unsafe managed-directory condition instead of returning successful uninstall;
- failing planning when the operation-owned temporary Git view cannot be cleaned;
- adding direct regressions for both failures and for the required schema v1 `managedDirectories` field.

The separate authority amendment defines `managedDirectories` as part of the first unpublished schema v1. No implementation change to that already-present field was required in this repair.

## Finding Results

| Finding | Result | Primary evidence |
| --- | --- | --- |
| Observed unsafe directory swap was converted to success | Fixed | The managed-directory swap regression now receives `UNSAFE_PATH`, exit code `4`, a failure report, and no outside mutation. |
| `managedDirectories` conflicted with the closed schema v1 authority | Resolved by authority amendment | Missing, extra, and traversal-bearing schema fields are rejected; the first unpublished schema v1 now explicitly requires sorted validated `managedDirectories`. |
| Current code hashes no longer matched the old evidence chain | Superseded | `TASK2_ACCEPTED_EVIDENCE_CHAIN_PR7_V2.md` binds the current Task 2 and affected Task 4 paths. The old chain remains unchanged history. |
| Temporary Git-view cleanup failure was ignored | Fixed | An injected cleanup failure rejects planning with `temporary Git view cleanup failed`; the test then removes its deliberately retained test fixture. |

The post-check/pre-syscall adversarial replacement window remains the accepted residual risk documented in `PR7_ROOT_TOCTOU_FINDING_DISPOSITION.md`; this repair does not claim atomic containment.

## Validation

Runtime: Node `v24.14.0`, npm `11.12.1`, Python `3.11.14`.

| Command or check | Result |
| --- | --- |
| Focused security suite before production repair | Expected FAIL: managed-directory success and missing Git-cleanup failure regression reproduced. |
| Focused security suite after repair | `28/28 PASS` |
| `npm test` | `83/83 PASS` |
| `node --test test/acceptance/*.test.mjs` | `28/28 PASS`, AS-01 through AS-12 |
| `npm run validate:package` | PASS; status `0`, primary status `0`, cleanup failure `false`, four lifecycle smoke operations `0` |
| `node tools/validate-release.mjs` | PASS |
| Package identity | `e6e915379c37013fd1b4bee87edefd0cba1af9e9d6172b1898213adc0d4f817d` |
| Payload identity | `f7eaf62fdee7950e38bc8714118e340d59196737ad8cf443262d628f0a022a14` |
| Inventory identity | `6a5b53dccb7eb39a6793732e04a63ac36c43d371702e8f3af075e3a75c008fc0` |
| Python helper compilation | PASS using external bytecode cache, removed after the check |
| Six TOML profiles and evaluator invariants | PASS |
| Router fixture | PASS smoke/coverage check; not treated as semantic proof |
| Adaptive orchestration structure | PASS; not treated as semantic proof |
| `git diff --check` | PASS |
| Repository archive/cache/`node_modules`/`dist`/bytecode residue | None |
| Staged delta | Empty |

The first attempted `npm test` shell command exited `127` before npm or product code ran because its isolated `PATH` omitted the npm executable. The corrected command retained the frozen Node binary and added the existing npm location; the `83/83` result above is the applicable product evidence.

Three directories and one symlink matching old `oh-my-harness-*` test names existed in the OS temporary root with modification time `2026-07-14T15:38:41+0800`, predating this verification. They were not created, read as content, modified, or removed by this repair. All temporary roots created by the validation commands in this report were removed by their owning checks.

## Scope And Protected State

- No dependency, package identity, compiler, bundle payload, documentation, CI, or release configuration changed.
- The protected independent file `task-docs/harness-capability-enhancement-synthesis-20260714.md` remained untracked and content-inaccessible; it was not read, modified, moved, staged, deleted, or consumed.
- Other pre-existing untracked files remained outside this task and were not modified or staged.
- No archive, publication, registry authentication, secret access, GitHub Release, or merge occurred.

## Remaining Gate

This report is main-thread primary evidence, not producer-independent review. One fresh read-only reviewer must inspect the focused repair diff and the four finding dispositions before Git delivery continues.
