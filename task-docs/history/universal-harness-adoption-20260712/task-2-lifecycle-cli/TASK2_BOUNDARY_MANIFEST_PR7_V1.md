# Task 2 PR #7 Boundary Manifest

Identity: `universal-harness-adoption-task-2-pr7-boundary-manifest-20260714-v1`

Status: `FROZEN EXECUTION AUTHORITY INVENTORY`

## Accepted Boundary

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Accepted Contract v7 | `universal-harness-adoption-task-2-contract-20260714-v7` | `467430f88c949af76591eee6ac76c453b2f7986a81acd0c0973fa0758d7d7b94` |
| Strict Contract Review v7 | `universal-harness-adoption-task-2-contract-review-20260714-v7` | `e95f3fc80758c49e111d8131ddff3addf399a6ae5d88ffa3591cd8f822f06c32` |
| PR review | `universal-harness-adoption-pr7-independent-review-20260714-v1` | `c2da6b4535010a7e2d5aab581d5349a713498c5053596b1673a69ff005f2c5ef` |
| Finding routing | `universal-harness-adoption-pr7-finding-routing-20260714-v1` | `934f48a0af3c4ae4c588c4794bd26c4b49a1b4cd458376421f2f2be26c41f18b` |

`CONTRACT_ITERATION-06.md` and `CONTRACT_REVIEW-06.md` are rejected history. `ACCEPTED_CONTRACT.md` is the superseded Task 2 v5 parent. Only `ACCEPTED_CONTRACT_V7.md` plus this manifest authorize the focused executor.

## Frozen Planning And Upstream Inputs

| Artifact | SHA-256 |
| --- | --- |
| `task-docs/universal-harness-adoption-requirements-20260712.md` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| `task-docs/universal-harness-adoption-accepted-planning-inputs-20260712-v2.md` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_ACCEPTED_EVIDENCE_CHAIN_V2.md` | `ebe43ec5e4458befff6490277b09bc9016834f59faa935c2d9120ac55cb3740f` |
| `TASK1_PR7_NO_IMPACT.md` | `d7e829de86f289075a9a5ce9e577bdee8fefac0194f0b9cbdb9c7d596c0ded9e` |
| `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/TASK3_ACCEPTED_EVIDENCE_CHAIN.md` | `2938a0d1bd90f31c7ed7a40f709ea337117760f53243bfcd02479da5bb5f9b61` |
| `TASK3_PR7_NO_IMPACT.md` | `db73663dd82408a0e8193c025b51fda09eb0c48e8aa2a4e166af9f141a8ca319` |

Task 2 v5 historical gate hashes remain protected:

- contract: `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`
- Implementation Report V2: `7a3ebf73a3465b4990a0b67c422565f6d8e7d024097db8ea533ae97b43248551`
- Result QA V2: `595dca2d5a3f4bb0ba9161b4c93599513c478ea4e2ff2acfc2a94ef42643ea8c`
- Main-Thread Acceptance V2: `d5edff6e70e16eccdcbe610472cc96ae2e211cd61db6df10abc53a290d8b814f`

The historical Task 4 acceptance SHA `603c46031512fece5e2e3e51fa32309bf13205e54ca2ac71257df9f8e324d4c9` is protected evidence but is superseded as final PR-delivery authority until focused Task 4 revalidation completes.

## Allowed Implementation Paths

| Path | Before SHA-256 |
| --- | --- |
| `package.json` | `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9` |
| `src/installer/package-bundle.mjs` | `8e1a1616f41ef7e00b0327bfbbaa7420dac159d8785e4203f37289fef908db08` |
| `src/installer/filesystem.mjs` | `1bdccb16f40fa3cc0ecf529707a749ef78258f645b3f81f4210e80b463b4f701` |
| `test/lifecycle/lifecycle.test.mjs` | `fd5a9e838111566fa6606d098d6b9e849419cac769aa8e8e2a6f29f36887fb02` |
| `test/lifecycle/package-validation.mjs` | `71f5dd205ded9c921c73863d052d61a8295b2787517affdd007fab5ce6509dbc` |
| `test/lifecycle/security.test.mjs` | `4992b0efc58050eb127d30ae1e42beb5482b309587cde14b1a8567e257938045` |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` |

No other implementation path is writable.

## Protected Inventory Rule

Every path outside the seven-row allowlist is protected. In particular: package-lock; binary/CLI/lifecycle/marker/state; all Task 1 files; all Task 3 docs; all Task 4 fixtures/tools/CI; requirements/plans/gate artifacts; and all unrelated tracked/untracked user work.

The independent synthesis file is protected by metadata only:

- path: `task-docs/harness-capability-enhancement-synthesis-20260714.md`
- type: regular file
- size: `63282`
- mtime epoch: `1783965344`
- SHA-256: `7e5510244df11c24c1ea16a3e2e337a66902100d4b0375b1b85c7d2162bbbd33`
- content access: forbidden

Pre/post changed-path comparison and protected hashes, not assumptions, decide scope compliance. Any mismatch or unexplained path stops execution.
