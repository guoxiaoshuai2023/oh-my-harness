# Task 4 Focused Repair Launch Baseline

Identity: `universal-harness-adoption-task-4-focused-repair-launch-baseline-20260714-v1`

Status: `ONE FOCUSED IMPLEMENTATION AND QA CYCLE`

Captured at UTC: `2026-07-13T18:57:04Z`

Retry domain: `universal-harness-adoption-task-4-execution-20260714-rd1`

## Authority

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Accepted contract | `universal-harness-adoption-task-4-contract-20260714-v2` | `b5b2f5e3b79afff5dad4a51c190eac3b486f409a0eafdf68956fe3620d824f5e` |
| Failed Implementation Report | `universal-harness-adoption-task-4-implementation-report-20260714-v3` | `3fe1eb9d30875683f66bc355ae49e6fedb94dca4f56b0dfc4d2cd203bdd85c6a` |
| Failed Result QA | `universal-harness-adoption-task-4-result-qa-20260714-v1` | `5a85d8e80f69bf487728a6e621585af2647cf2b5b0997ad6270e1b0f69794ffb` |
| Main-thread FAIL decision | `universal-harness-adoption-task-4-main-thread-decision-20260714-v1` | `60571da8528e5f301cae9eb835dfd8ee350c9d4baf9acf6696f5094dc5e0a9bd` |
| Focused repair authorization | `universal-harness-adoption-task-4-focused-repair-resume-decision-20260714-v1` | `10273237d889e14cc431fad488e9b8ec89d2b824693a16f8aaf58fb4c60c189d` |

Requirements, plans, contract, review, and Task 1-3 accepted evidence remain unchanged and read-only.

## Repository And Runtime

- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD / `origin/main` / merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Node: `v24.14.0` at the bundled runtime path recorded by V4
- npm: `11.12.1`
- Python: `3.11.14`
- Staged delta: `EMPTY`
- Committed branch delta: `EMPTY`
- Status entries before self-excluded baseline: `244`
- Sorted complete-status digest: `0494d13e437ed4179e203f36724c2a8717d08a87af47592ebff5f63607f227a6`
- Untracked files before self-excluded baseline: `240`
- Sorted untracked path/hash digest: `29c71fd074c2b6041a4f5a6d9c11ee66c95c7f666386ff1e114850177fd4ecb1`
- Residue check: `CLEAN`
- `git diff --check`: `PASS`

This baseline is self-excluded and is the only expected added path before executor spawn. Any other unexplained path or byte change stops launch without consuming the repair attempt.

## Candidate Before Hashes And Write Authority

| Path | Before SHA-256 | Authority |
| --- | --- | --- |
| `test/acceptance/scenario-matrix.mjs` | `2cd0b99a2e230e7c18eca04f46bf1a7eec21ab934e5428b2b96f9320cdd54116` | write only for AS-03 evidence correction |
| `test/acceptance/universal-adoption.test.mjs` | `ce93561d07b6607e397fee4a7d24aed906deec1f1a25f8f6604f44afe0f650a3` | write only for AS-03 evidence correction |
| `test/support/task4-fixtures.mjs` | `1d0b7e159e1ad12b89d7d2a6023b387551a56a68f066402d27784a6a1b8b2f81` | remove only rejected-evidence helper code if unused |
| `tools/validate-release.mjs` | `d4381d9ad92be4dc212944db2fec273ce833386a7accfb8d353f21f8fff832dc` | write only for packed routing fixture correction |

`.github/workflows/ci.yml` is protected at SHA-256 `d9fa867768a79c91b5599508c9b6df4a791657ac2574d08ab930797e59bf6f50`. Every other path is protected.

## Protected Dependencies And User Work

- Task 1 chain: `ebe43ec5e4458befff6490277b09bc9016834f59faa935c2d9120ac55cb3740f`
- Task 2 no-impact: `a177a1c9a377b532ec2e8b9a6bca46fdb6784fccf0506147b060763acc2fd9d2`
- Task 3 chain: `2938a0d1bd90f31c7ed7a40f709ea337117760f53243bfcd02479da5bb5f9b61`
- Accepted product paths: `31/31` matched the contract hashes.

Protected independent user work `task-docs/harness-capability-enhancement-synthesis-20260714.md` was stable across samples at `2026-07-13T18:56:05Z` and `18:56:35Z`:

- Type: regular file
- Size: `63282`
- mtime epoch: `1783965344`
- Inode: `86996201`
- SHA-256: `7e5510244df11c24c1ea16a3e2e337a66902100d4b0375b1b85c7d2162bbbd33`

Its content may not be read or consumed. Only metadata/hash preservation checks are allowed.

## Cycle Boundary

One fresh executor may perform only the four-path focused repair and must return a complete new Implementation Report. It must run the full required suite, all acceptance fixtures, package validation, release validation, protected hashes, residue checks, and `git diff --check`.

One fresh read-only producer-independent evaluator may run only after a complete report. A wait timeout while an agent remains running is not a failure or authority for a duplicate agent. Executor and evaluator each have a `30-minute` overall deadline from spawn. Failure at either gate stops this retry domain without another automatic attempt.

No nested delegation, dependency installation, stage, commit, push, PR, publication, secret access, network acceptance, or external write is authorized.

