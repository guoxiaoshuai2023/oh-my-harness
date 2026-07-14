# Task 2 Focused Executor Launch Baseline

Identity: `universal-harness-adoption-task-2-focused-executor-launch-baseline-20260713-v1`

Status: `FROZEN`

## Authority

- Accepted contract SHA-256: `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`
- Boundary manifest SHA-256: `fb2c58712461d8ff1e51a3631379063258c2325194f6b6259425d3d9cb2a7c7f`
- Result QA v1 SHA-256: `3603bd517fa817bca0c7422bb609fb3ec57e3ce78c7c20060c1d9ea0a9656f9f`
- Failure routing SHA-256: `d9b89ebbb9fed829f33a9376b28cc7a36a9380a98d315f230fece42d5d9f3a9c`
- Resume decision SHA-256: `f49ef9c1ba74bab2739dd5dd8d5143ad37511ca8b2e4fbf2c68a1780ab0b728e`

## Git And Runtime

- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD/origin/main/merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked delta: empty
- Staged delta: empty
- Committed branch delta: empty
- Node: `v24.14.0`
- npm: `11.12.1`
- Active writer: none

## Rejected Candidate Baseline

| Path | SHA-256 |
| --- | --- |
| `package.json` | `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9` |
| `package-lock.json` | `84d86095b95ad5c34529320c7bb531964f53be9025f137f17b091396400ec184` |
| `bin/oh-my-harness.mjs` | `b1e19bfac413012fd1b8c28b374b9469420ae44c8c552ebb23b4e96efec26df9` |
| `src/installer/cli.mjs` | `0eea231c0da370b0d69efbb52157208dd383350cd775fbcd2fd617a3a03c5d82` |
| `src/installer/filesystem.mjs` | `8620ba21939fec4a4619da53e456787159296123b7b40676c57edc8d41d5d249` |
| `src/installer/lifecycle.mjs` | `9183dd45bd6f6e815fd05aa46496b1f2e4f6da94a5b4c8499f825e4ca57ae49a` |
| `src/installer/markers.mjs` | `715d47c38b42289c505035a978e6a99ce66b1ceb28bb5f9d706a74af51ae8fc6` |
| `src/installer/package-bundle.mjs` | `8e1a1616f41ef7e00b0327bfbbaa7420dac159d8785e4203f37289fef908db08` |
| `src/installer/state.mjs` | `9d7c1346cc9a026efc310482758bdfb0769cbbeb863dbb95e7b95a47f7ea5676` |
| `test/lifecycle/cli.test.mjs` | `f83b172363e478a310abb75dddeecb39d6f6ecb3e66367a9686c10623111e12e` |
| `test/lifecycle/lifecycle.test.mjs` | `00bbb379b7e24f17e029ddbfc1e4198db3bdadb5bf93e4ab2061fdfd977abae9` |
| `test/lifecycle/package-validation.mjs` | `71f5dd205ded9c921c73863d052d61a8295b2787517affdd007fab5ce6509dbc` |
| `test/lifecycle/security.test.mjs` | `8519b075f25464badf54582115ff202eedce162e5bd169473280950df3e309ea` |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` |

The executor may change only these 14 paths and only for the four routed P1 repairs plus regression tests. All other paths and prior gate artifacts are protected.

