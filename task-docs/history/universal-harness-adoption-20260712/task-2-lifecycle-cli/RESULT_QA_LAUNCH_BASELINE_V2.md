# Task 2 Focused Result QA Launch Baseline V2

Identity: `universal-harness-adoption-task-2-result-qa-launch-baseline-20260713-v2`

Status: `FROZEN`

## Authority And Retry Budget

- Accepted Contract v5 SHA-256: `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`.
- Result QA v1 SHA-256: `3603bd517fa817bca0c7422bb609fb3ec57e3ce78c7c20060c1d9ea0a9656f9f` (`FAIL`).
- Failure routing SHA-256: `d9b89ebbb9fed829f33a9376b28cc7a36a9380a98d315f230fece42d5d9f3a9c`.
- Exhaustion Decision v3 SHA-256: `1f8cccb0337632df36d0887306e5b642e9bbea14c3da1baa7ae04b66ec3346ff`.
- Focused resume decision SHA-256: `f49ef9c1ba74bab2739dd5dd8d5143ad37511ca8b2e4fbf2c68a1780ab0b728e`.
- Focused executor launch baseline SHA-256: `5f70b6c6398a7e52ff31a007db82863d91d6b6b7016f2abce3f87dbad5259996`.
- Implementation Report v2 SHA-256: `7a3ebf73a3465b4990a0b67c422565f6d8e7d024097db8ea533ae97b43248551`.
- Canonical evaluator calibration path: `task-docs/_harness/evaluator-calibration.md`.
- Canonical evaluator calibration SHA-256: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`.
- This is the sole producer-independent Result QA cycle authorized by the substantive user decision. A strict `FAIL` immediately re-exhausts the original Task 2 retry domain; no automatic repair or retry is authorized.

## Git And Protected State

- Branch: `codex/universal-nondestructive-harness-adoption`.
- HEAD: `60428957a99cf6f75d640c78cf6833576d47cc8d`.
- `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`.
- Merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`.
- Tracked working-tree delta: empty.
- Staged delta: empty.
- Committed branch delta against `origin/main`: empty.
- `git diff --check`: PASS.
- Complete original dirty baseline: all 85 rows in `DIRTY_WORKTREE_BASELINE_V2.md` match by type/path/content hash.
- Task 1 protected implementation: all 12 accepted hashes in `TASK1_ACCEPTED_EVIDENCE_CHAIN.md` match.
- Repository package/cache residue check: no `*.tgz`, `.npm`, or `npm-cache` path found under the repository.
- Active implementation writer: none.

## Task 2 Candidate Hashes

| Path | Focused pre-state SHA-256 | QA candidate SHA-256 | Disposition |
| --- | --- | --- | --- |
| `package.json` | `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9` | `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9` | unchanged |
| `package-lock.json` | `84d86095b95ad5c34529320c7bb531964f53be9025f137f17b091396400ec184` | `84d86095b95ad5c34529320c7bb531964f53be9025f137f17b091396400ec184` | unchanged |
| `bin/oh-my-harness.mjs` | `b1e19bfac413012fd1b8c28b374b9469420ae44c8c552ebb23b4e96efec26df9` | `b1e19bfac413012fd1b8c28b374b9469420ae44c8c552ebb23b4e96efec26df9` | unchanged |
| `src/installer/cli.mjs` | `0eea231c0da370b0d69efbb52157208dd383350cd775fbcd2fd617a3a03c5d82` | `0eea231c0da370b0d69efbb52157208dd383350cd775fbcd2fd617a3a03c5d82` | unchanged |
| `src/installer/filesystem.mjs` | `8620ba21939fec4a4619da53e456787159296123b7b40676c57edc8d41d5d249` | `1bdccb16f40fa3cc0ecf529707a749ef78258f645b3f81f4210e80b463b4f701` | focused repair |
| `src/installer/lifecycle.mjs` | `9183dd45bd6f6e815fd05aa46496b1f2e4f6da94a5b4c8499f825e4ca57ae49a` | `022fae0b5af59ebc14f83b077bdcbb6c067e7351da1936b4a420304c6cf4db59` | focused repair |
| `src/installer/markers.mjs` | `715d47c38b42289c505035a978e6a99ce66b1ceb28bb5f9d706a74af51ae8fc6` | `0ed248f49d3fdf223409264704d452246a1a74ea7fd4ed5a0663828af43ae7d0` | focused repair |
| `src/installer/package-bundle.mjs` | `8e1a1616f41ef7e00b0327bfbbaa7420dac159d8785e4203f37289fef908db08` | `8e1a1616f41ef7e00b0327bfbbaa7420dac159d8785e4203f37289fef908db08` | unchanged |
| `src/installer/state.mjs` | `9d7c1346cc9a026efc310482758bdfb0769cbbeb863dbb95e7b95a47f7ea5676` | `1b9e603b73d3345e9dd20ed00147e76da12c361e84f3d36c1c53ca23e369a6df` | focused repair |
| `test/lifecycle/cli.test.mjs` | `f83b172363e478a310abb75dddeecb39d6f6ecb3e66367a9686c10623111e12e` | `f83b172363e478a310abb75dddeecb39d6f6ecb3e66367a9686c10623111e12e` | unchanged |
| `test/lifecycle/lifecycle.test.mjs` | `00bbb379b7e24f17e029ddbfc1e4198db3bdadb5bf93e4ab2061fdfd977abae9` | `fd5a9e838111566fa6606d098d6b9e849419cac769aa8e8e2a6f29f36887fb02` | focused regression tests |
| `test/lifecycle/package-validation.mjs` | `71f5dd205ded9c921c73863d052d61a8295b2787517affdd007fab5ce6509dbc` | `71f5dd205ded9c921c73863d052d61a8295b2787517affdd007fab5ce6509dbc` | unchanged |
| `test/lifecycle/security.test.mjs` | `8519b075f25464badf54582115ff202eedce162e5bd169473280950df3e309ea` | `4992b0efc58050eb127d30ae1e42beb5482b309587cde14b1a8567e257938045` | focused regression tests |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` | unchanged |

Only these six files changed from the focused launch baseline. All are inside the frozen 14-file Task 2 write set.

## Main-Thread Pre-QA Validation

- `node --test test/lifecycle/lifecycle.test.mjs test/lifecycle/security.test.mjs`: PASS, 36/36.
- `node --test test/bundle/*.test.mjs test/lifecycle/*.test.mjs`: PASS, 60/60.
- `npm run validate:package`: PASS; command status `0`, primary status `0`, cleanup failure `false`.
- Packed archive SHA-256: `61ca3f512b9ce6b9622bebcb63be79f79c125ff22715d742ce550a4559da1488`.
- Packed lifecycle walkthrough: install, same-version install no-op, update no-op, and uninstall each returned status `0`.

## Mandatory Independent Reproduction

The evaluator must inspect primary source and tests and independently reproduce, rather than accept the Implementation Report's assertions:

1. forged in-namespace ownership and state-hash backup bypass are rejected unless validated install state, immutable inventory, and current-file evidence jointly prove ownership;
2. a successful rename or unlink is recorded as an actual mutation before any later verification can fail, so failure output truthfully includes the changed path;
3. every Git metadata and object-discovery read used by dirty-overlap detection is captured by the common instrumentation;
4. damaged managed markers terminate with the primary `INVALID_MANAGED_MARKER` conflict and do not add derivative `IO_UNAVAILABLE`;
5. all T2-AC1 through T2-AC20, package identity, write scope, protected state, and evidence truthfulness satisfy Contract v5.

Historical Result QA v1 is failure evidence, not the current verdict. The evaluator is read-only and may not repair findings.
