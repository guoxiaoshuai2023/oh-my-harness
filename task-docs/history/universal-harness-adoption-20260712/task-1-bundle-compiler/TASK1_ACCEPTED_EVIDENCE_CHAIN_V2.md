# Task 1 Accepted Evidence Chain v2

Identity: `universal-harness-adoption-task-1-accepted-evidence-chain-20260713-v2`

Upstream result: `PASS`

This chain supersedes the prior Task 1 chain for downstream dependency binding. The prior chain remains accepted history for the original Task 1 result; this chain adds the test-only compatibility revision required by Plan v5.

## Original Accepted Task 1 Chain

- Path: `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK1_ACCEPTED_EVIDENCE_CHAIN.md`
- Identity: `universal-harness-adoption-task-1-accepted-evidence-chain-20260712-v1`
- SHA-256: `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c`

Its six gate members remain byte-valid. The only accepted implementation-path change after that chain is the compiler-test assertion update below.

## Compatibility Gate Chain

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Accepted compatibility contract | `universal-harness-adoption-task-1-compatibility-contract-20260713-v4` | `3e1b34d3bc550b4b0a9e8d78bf9faad76c0640e76153d870e3a8f35e4652cd21` |
| Strict contract review | `universal-harness-adoption-task-1-compatibility-contract-review-20260713-v4` | `a60605a1dde1203520536ccd9dbe015fe43bdb58dbdc5468cb5ab2d49e17d7fa` |
| Executor launch baseline | `universal-harness-adoption-task-1-compatibility-executor-launch-baseline-20260713-v1` | `7a6ddfbab04f769cfa36d6513886c5b3514e91ae2a7dad7416163f78c90bff3d` |
| Implementation Report | `universal-harness-adoption-task-1-compatibility-implementation-report-20260713-v1` | `8e637cc2a169dc654ba63c24b4d5b6415eced0580b08c062fe710cfbe8320485` |
| Producer-independent Result QA | `universal-harness-adoption-task-1-compatibility-result-qa-20260713-v1` | `098c222f11bdcf23cd015985932feb75f3a30843517b01babae998b1dd6c7bca` |
| Main-thread acceptance | `universal-harness-adoption-task-1-compatibility-main-thread-acceptance-20260713-v1` | `1adc3e61f73f9a7d556fd22d7a92b2d9db5ccfe4906d741e7927e4967c9ced1e` |

## Current Accepted Implementation Hashes

| Path | SHA-256 | Status from v1 |
| --- | --- | --- |
| `packaging/bundle-map.json` | `38ac29aefb45a64749f27d76464b3cbb1bda221ea6882def195595828e695774` | unchanged |
| `packaging/managed-router-block.md` | `68ca465a5bc3999671ee9cacb1a3dc8e170aae92237bcb4b680b4baadffeb1c8` | unchanged |
| `packaging/package-contract.json` | `164fdf2f87a5e7b45cb47902af2afb9de3197f788d1c00426e3f01e705b19ed7` | unchanged |
| `packaging/schemas/bundle-inventory.schema.json` | `bc06d65a35e2ecbb4c83ba6a19064047c9549860a6448ad13f1c33e513325104` | unchanged |
| `packaging/schemas/package-contract.schema.json` | `22a80bc9f72ea552426517600417dbe26218806607f21adf973ea2e1a51ab954` | unchanged |
| `src/bundle/build-bundle.mjs` | `fd5a5200190e83c20206a05eab366b2dac6d4f1501d5ec8ac9c392db126ec5c3` | unchanged |
| `src/bundle/compiler.mjs` | `a4094179be8bb1376791dcd54e54de7379281b348b43c67a869a84579aca7ecf` | unchanged |
| `src/bundle/validation.mjs` | `6a76ff269118c8d6b44242f942c1cde223cd67fc62c7b08045ea203868bb30d6` | unchanged |
| `test/bundle/compiler.test.mjs` | `984e2cd76647b1ee43515be4b7dcf93897e300d723d0a3f29dd2e95edb1f5832` | compatibility revision |
| `test/bundle/expected-data.mjs` | `f8aad20a1c67be4a15be4f8d34d458db39b3befca6a5130d3c1b69ae34f0aa42` | unchanged |
| `test/bundle/semantic-ledgers.test.mjs` | `88885c3769caedf8dffdfc1cf44e4977aa1892765d17b39ab4faa5cecba71d52` | unchanged |
| `test/bundle/test-helpers.mjs` | `890da32b4de7a16a08f6dd5e13257507442a164a4c29a1c84d5eb9f2eb91cf7c` | unchanged |

## Revalidation

- Focused compiler: 11/11 PASS under Node v24.14.0.
- Complete required suite: 60/60 PASS.
- Package validation: PASS with cleanup.
- Generated README: four scoped lifecycle commands present; both obsolete manual-copy commands absent.
- Task 1 production behavior: unchanged.
- Candidate docs: unchanged and still unaccepted pending Task 3.

Downstream work must bind this chain rather than silently reuse the old compiler-test hash.

