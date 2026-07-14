# Task 4 PR #7 Revalidation Boundary Manifest

Identity: `universal-harness-adoption-task-4-pr7-boundary-manifest-20260714-v1`

Status: `FROZEN EXECUTOR AUTHORITY INVENTORY`

## Accepted Boundary

| Artifact | Identity | Path | SHA-256 |
| --- | --- | --- | --- |
| Accepted PR #7 revalidation contract | `universal-harness-adoption-task-4-pr7-revalidation-contract-20260714-v2` | `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/ACCEPTED_PR7_REVALIDATION_CONTRACT_V2.md` | `f2eb8f855ce86e8444ccf0270a2c377445ddb65f5fe9afff0f6823c79ae7e74b` |
| Strict contract review | `universal-harness-adoption-task-4-pr7-revalidation-contract-review-20260714-v2` | `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/PR7_REVALIDATION_CONTRACT_REVIEW-02.md` | `01bfea9ac5ad6c967f73b2a20ebb864f22cc5c827d918962c864ff426166d13d` |
| Parent Task 4 contract | `universal-harness-adoption-task-4-contract-20260714-v2` | `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/ACCEPTED_CONTRACT.md` | `b5b2f5e3b79afff5dad4a51c190eac3b486f409a0eafdf68956fe3620d824f5e` |
| Task 1 accepted chain | `universal-harness-adoption-task-1-accepted-evidence-chain-20260713-v2` | `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_ACCEPTED_EVIDENCE_CHAIN_V2.md` | `ebe43ec5e4458befff6490277b09bc9016834f59faa935c2d9120ac55cb3740f` |
| Task 2 accepted chain | `universal-harness-adoption-task-2-accepted-evidence-chain-20260714-v2` | `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_ACCEPTED_EVIDENCE_CHAIN_PR7_V1.md` | `b251f6de280ac6803b593336a5c52592ae5155dbebb7df8e221dc7b4f943be13` |
| Task 3 accepted chain | `universal-harness-adoption-task-3-accepted-evidence-chain-20260714-v1` | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/TASK3_ACCEPTED_EVIDENCE_CHAIN.md` | `2938a0d1bd90f31c7ed7a40f709ea337117760f53243bfcd02479da5bb5f9b61` |

The accepted contract is byte-identical to Contract 02. Contract 01 and Review 01 are rejected history. The parent Task 4 contract is inherited only as described by the accepted amendment.

## Task 1 Protected Implementation Inventory

| Path | SHA-256 |
| --- | --- |
| `packaging/bundle-map.json` | `38ac29aefb45a64749f27d76464b3cbb1bda221ea6882def195595828e695774` |
| `packaging/managed-router-block.md` | `68ca465a5bc3999671ee9cacb1a3dc8e170aae92237bcb4b680b4baadffeb1c8` |
| `packaging/package-contract.json` | `164fdf2f87a5e7b45cb47902af2afb9de3197f788d1c00426e3f01e705b19ed7` |
| `packaging/schemas/bundle-inventory.schema.json` | `bc06d65a35e2ecbb4c83ba6a19064047c9549860a6448ad13f1c33e513325104` |
| `packaging/schemas/package-contract.schema.json` | `22a80bc9f72ea552426517600417dbe26218806607f21adf973ea2e1a51ab954` |
| `src/bundle/build-bundle.mjs` | `fd5a5200190e83c20206a05eab366b2dac6d4f1501d5ec8ac9c392db126ec5c3` |
| `src/bundle/compiler.mjs` | `a4094179be8bb1376791dcd54e54de7379281b348b43c67a869a84579aca7ecf` |
| `src/bundle/validation.mjs` | `6a76ff269118c8d6b44242f942c1cde223cd67fc62c7b08045ea203868bb30d6` |
| `test/bundle/compiler.test.mjs` | `984e2cd76647b1ee43515be4b7dcf93897e300d723d0a3f29dd2e95edb1f5832` |
| `test/bundle/expected-data.mjs` | `f8aad20a1c67be4a15be4f8d34d458db39b3befca6a5130d3c1b69ae34f0aa42` |
| `test/bundle/semantic-ledgers.test.mjs` | `88885c3769caedf8dffdfc1cf44e4977aa1892765d17b39ab4faa5cecba71d52` |
| `test/bundle/test-helpers.mjs` | `890da32b4de7a16a08f6dd5e13257507442a164a4c29a1c84d5eb9f2eb91cf7c` |

## Task 2 Protected Implementation Inventory

| Path | SHA-256 |
| --- | --- |
| `package.json` | `4ac76602df29dcd335dcfa10caaa1a203682ce47862ee816123ca88e7eb70a74` |
| `package-lock.json` | `84d86095b95ad5c34529320c7bb531964f53be9025f137f17b091396400ec184` |
| `bin/oh-my-harness.mjs` | `b1e19bfac413012fd1b8c28b374b9469420ae44c8c552ebb23b4e96efec26df9` |
| `src/installer/cli.mjs` | `0eea231c0da370b0d69efbb52157208dd383350cd775fbcd2fd617a3a03c5d82` |
| `src/installer/filesystem.mjs` | `168a79ab511877df69db016287bd03f512d4af67c85be09b36774473bf203519` |
| `src/installer/lifecycle.mjs` | `022fae0b5af59ebc14f83b077bdcbb6c067e7351da1936b4a420304c6cf4db59` |
| `src/installer/markers.mjs` | `0ed248f49d3fdf223409264704d452246a1a74ea7fd4ed5a0663828af43ae7d0` |
| `src/installer/package-bundle.mjs` | `df94880ea67c7f7f065b5ce3215a86e84dad4da8db9c2f871c0969ca28d0b85e` |
| `src/installer/state.mjs` | `1b9e603b73d3345e9dd20ed00147e76da12c361e84f3d36c1c53ca23e369a6df` |
| `test/lifecycle/cli.test.mjs` | `f83b172363e478a310abb75dddeecb39d6f6ecb3e66367a9686c10623111e12e` |
| `test/lifecycle/lifecycle.test.mjs` | `a0f68bef221f852b62f6a3fe7207e9e01ed95d3b6ca4a4bb6ccc0cd329178ebd` |
| `test/lifecycle/package-validation.mjs` | `ef78beb199058a23a3e9eb3fb5a86933ddfe0f6512c97979b9b6d6ba784d0bea` |
| `test/lifecycle/security.test.mjs` | `79821e9d77f82f847d55c43c1cc984938d466dc2393dee48598cc62f35ea5c3f` |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` |

## Task 3 Protected Implementation Inventory

| Path | SHA-256 |
| --- | --- |
| `README.md` | `90c176504881d50a02c09207529ac1d44acce95b4561ff3f8bab6f43c256ec37` |
| `docs/architecture.md` | `06c2fbd715f4c5542f0e2da2d27098f962a996f8c85e3f57a4622fb84fd58b92` |
| `docs/adapters/codex-subagents.md` | `e9cc864999d887fd9dedb3336260c9fa29ea6cc993bc510844a736e11d77744c` |
| `docs/adoption/universal-harness-adoption-runbook.md` | `c1aa4236015fc07b3e8ac381b2b3bc6276bcaec66dd4716a2cc042a98f4e7c26` |
| `docs/adoption/bundle-lifecycle-spec.md` | `e6d7bebcdc93573fc3676353c9e7956bbfd4310474b0c45a032ae79dba8bdc82` |

## Task 4 Allowed Before State

| Path | SHA-256 |
| --- | --- |
| `test/acceptance/universal-adoption.test.mjs` | `44ef0a4a207359ff98a5a6c36e79ea9901f708a5b889047d6dde21426101a6dd` |
| `test/acceptance/scenario-matrix.mjs` | `80f7f287517b5eb93e0bf79b373638ddae6a0f9d44faa82e6a73dde97e64d47d` |
| `tools/validate-release.mjs` | `a04b69f95178441b26641d1286bb2311e860bec1a8e8a3b80888d2ea435ded78` |

## Explicit Task 4 Protected State

| Path | SHA-256 |
| --- | --- |
| `.github/workflows/ci.yml` | `f18bcf8ae3e400f33ff300661b46f1596a39dc5740a7778165d554180df52cf0` |
| `test/support/task4-fixtures.mjs` | `b67c454ed926f720458ffc83356791d0f317ca057f851ecce4913da1947a7212` |

## Authority Boundary

- Writes are limited to the three Task 4 allowed paths above.
- Every other repository path is protected, including all planning/gate artifacts and the accepted Task 1-3 inventories.
- `task-docs/harness-capability-enhancement-synthesis-20260714.md` is independent target-owned work. Only path/type/size/mtime/SHA metadata may be checked.
- No nested delegation, dependency addition, staging, commit, push, merge, publication, registry authentication, signing, secret access, or external write is authorized.
- One fresh Task 4 implementation attempt is authorized after a matching launch baseline.

