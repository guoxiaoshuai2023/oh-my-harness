# Task 2 Boundary Manifest

Identity: `universal-harness-adoption-task-2-boundary-manifest-20260712-v1`

Status: `FROZEN`

## Accepted Boundary

- Identity: `universal-harness-adoption-task-2-contract-20260712-v5`
- Path: `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/ACCEPTED_CONTRACT.md`
- SHA-256: `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`
- Byte-identical reviewed source: `CONTRACT_ITERATION-05.md`, same SHA-256
- Strict review: `CONTRACT_REVIEW-05.md`, SHA-256 `013775180a863ef5643b1acf7d083712b53e678f31ac1ada3c7f8704c8bc4479`, decision `PASS`

## Frozen Authority

| Path | SHA-256 |
| --- | --- |
| `task-docs/universal-harness-adoption-requirements-20260712.md` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| `task-docs/universal-harness-adoption-accepted-planning-inputs-20260712-v2.md` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK1_ACCEPTED_EVIDENCE_CHAIN.md` | `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/DIRTY_WORKTREE_BASELINE_V2.md` | `17bc1c59c29f480838eedcf66addc61c4b943a5441cdee0fefbf0e8c3260101e` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/NODE24_RUNTIME_EVIDENCE.md` | `9bf865f9533f5fcf16fe487275f638eb996206a6470ae8a50f8c3dc506a937b1` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_CONTRACT_RESUME_DECISION_V2.md` | `b3765e0f83b8ba1bb2d34dc1975951e9e2786daa038bcddc0216287fe9725043` |

## Accepted Task 1 Implementation Inputs

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
| `test/bundle/compiler.test.mjs` | `53935da125da726697759123f12c3f7cc05bcac569960e1389d8c1467de30477` |
| `test/bundle/expected-data.mjs` | `f8aad20a1c67be4a15be4f8d34d458db39b3befca6a5130d3c1b69ae34f0aa42` |
| `test/bundle/semantic-ledgers.test.mjs` | `88885c3769caedf8dffdfc1cf44e4977aa1892765d17b39ab4faa5cecba71d52` |
| `test/bundle/test-helpers.mjs` | `890da32b4de7a16a08f6dd5e13257507442a164a4c29a1c84d5eb9f2eb91cf7c` |

## Executor Persistent Write Set

Only these 14 previously absent paths may be created:

- `package.json`
- `package-lock.json`
- `bin/oh-my-harness.mjs`
- `src/installer/cli.mjs`
- `src/installer/lifecycle.mjs`
- `src/installer/filesystem.mjs`
- `src/installer/markers.mjs`
- `src/installer/state.mjs`
- `src/installer/package-bundle.mjs`
- `test/lifecycle/cli.test.mjs`
- `test/lifecycle/lifecycle.test.mjs`
- `test/lifecycle/security.test.mjs`
- `test/lifecycle/test-helpers.mjs`
- `test/lifecycle/package-validation.mjs`

All other repository paths are protected. OS-temporary package/Git/fixture data is allowed only under the accepted boundary and must be absent after execution.

## Launch Rule

Executor launch requires a fresh launch baseline that verifies every row above, the full existing dirty/untracked inventory, empty staged/committed delta, absent Task 2 write paths, Node 24, and no active writer. Any mismatch stops before implementation.

