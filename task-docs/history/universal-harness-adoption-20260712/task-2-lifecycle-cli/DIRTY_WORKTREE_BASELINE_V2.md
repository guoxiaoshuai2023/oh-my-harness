# Task 2 Dirty-Worktree Baseline V2

Identity: `universal-harness-adoption-task-2-dirty-worktree-baseline-20260712-v2`

Capture scope: all files returned by `git ls-files --others --exclude-standard` immediately after Contract Review 01 and before Contract Iteration 02.

Tracked working-tree delta: none.

Staged delta: none.

Committed branch delta against `origin/main`: none.

Protection rule: every row below is read-only for Task 2 unless the path is one of the subsequently frozen Task 2 implementation write paths. Pre-existing rows must preserve type and SHA-256. New contract, review, manifest, launch, report, QA, and main-thread acceptance artifacts in the Task 2 run directory are gate-created additions and must not overwrite a row below.

All listed files are known project source, test, planning, or history artifacts; no unknown or sensitive path was hashed.

| Path | Status | Type | SHA-256 |
| --- | --- | --- | --- |
| `packaging/bundle-map.json` | `??` | Regular File | `38ac29aefb45a64749f27d76464b3cbb1bda221ea6882def195595828e695774` |
| `packaging/managed-router-block.md` | `??` | Regular File | `68ca465a5bc3999671ee9cacb1a3dc8e170aae92237bcb4b680b4baadffeb1c8` |
| `packaging/package-contract.json` | `??` | Regular File | `164fdf2f87a5e7b45cb47902af2afb9de3197f788d1c00426e3f01e705b19ed7` |
| `packaging/schemas/bundle-inventory.schema.json` | `??` | Regular File | `bc06d65a35e2ecbb4c83ba6a19064047c9549860a6448ad13f1c33e513325104` |
| `packaging/schemas/package-contract.schema.json` | `??` | Regular File | `22a80bc9f72ea552426517600417dbe26218806607f21adf973ea2e1a51ab954` |
| `src/bundle/build-bundle.mjs` | `??` | Regular File | `fd5a5200190e83c20206a05eab366b2dac6d4f1501d5ec8ac9c392db126ec5c3` |
| `src/bundle/compiler.mjs` | `??` | Regular File | `a4094179be8bb1376791dcd54e54de7379281b348b43c67a869a84579aca7ecf` |
| `src/bundle/validation.mjs` | `??` | Regular File | `6a76ff269118c8d6b44242f942c1cde223cd67fc62c7b08045ea203868bb30d6` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/ACCEPTED_CONTRACT.md` | `??` | Regular File | `458c6c2cbba7e3ee1148f51b42b2a7127bb57983479002e58ac6537def62a27d` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/ACCEPTED_CONTRACT_V7.md` | `??` | Regular File | `baeae6371f1c485b035972ed56349f89919c630ee8d6e56cbe37bed08fb729e4` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-01.md` | `??` | Regular File | `5a1bd8a5b2fef7bb6e751a86b9a3f62fc9eae5b8d236426f65720e6f53884f92` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-02.md` | `??` | Regular File | `3dd9abb8cf023fb3cc1c03bbc8fb9d748a17b9beacd07c2cb9599df367bdf4ae` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-03.md` | `??` | Regular File | `bf3589e1f296abbee9c5e499fc1251c622c91d74d835220e0b574485f8f2e3f8` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-04.md` | `??` | Regular File | `458c6c2cbba7e3ee1148f51b42b2a7127bb57983479002e58ac6537def62a27d` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-05.md` | `??` | Regular File | `1c27ef5b24c22f0ada5df256b4cd908abdf0a37c5a6e283a5901399d9d9cb6f4` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-06.md` | `??` | Regular File | `73067ba64324dc93ab01d1ab3e2ffb7f92d0947c55810ec2adfb0465ab898c51` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-07.md` | `??` | Regular File | `baeae6371f1c485b035972ed56349f89919c630ee8d6e56cbe37bed08fb729e4` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-01.md` | `??` | Regular File | `a675ccdfd426907277391eb7d2b03b2165b4507b1ff4dbef6a4485a17a9945b1` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-02.md` | `??` | Regular File | `4ce320f28d7b339f7164691140bb309c2f68be6458e47fb1e5e4bfdbd57302da` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-03.md` | `??` | Regular File | `2f9280225784d74a1b1af69044d32eb7854b5ae33681675d2f3dc9b2e1227be3` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-04.md` | `??` | Regular File | `d69a4b94435d247d68929adf3973303d8d44751d56b66feb134042244b15e146` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-05.md` | `??` | Regular File | `1d7d492d3ef5bddf18617c0fb748403c52b9a1c3911d3f90d044d948a2bf8eff` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-06.md` | `??` | Regular File | `1144d655bc342006bad82b5775554e62433435ca216f0bc36c6186098cc28ab8` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-07.md` | `??` | Regular File | `5324e5722e538983ace82814483d780b06473d24abb6af7824e8a8f70782f255` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_STATE_BASELINE.md` | `??` | Regular File | `6211ca924ae0ab63104a0814f707bc162f52d254af99e769f02f691bdc4fc670` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_STATE_BASELINE_V5.md` | `??` | Regular File | `dd1bbcffc911101e175c563fb48c01c44176040c5fa8ecaa57d54c20d33e921d` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/EXECUTOR_LAUNCH_BASELINE.md` | `??` | Regular File | `3abdd26fbacc18fd8de1329c02240df1534407fa59d982a8c9a7c66fb6828680` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/EXECUTOR_LAUNCH_BASELINE_V7.md` | `??` | Regular File | `f6a8bd00a124cb931724d5443fa07c0e801481edf7bd1796f81950bc8683f383` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/IMPLEMENTATION_REPORT.md` | `??` | Regular File | `db243283d05f0535b6eba82253e1f4adc63a58b34a05b921a0897d62cfca702b` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/IMPLEMENTATION_REPORT_V2.md` | `??` | Regular File | `43e1fa1fb8f7c0e616b4bccdfc243ba8dd9359ed071fa1ced01c79173334bfb7` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/IMPLEMENTATION_REPORT_V3.md` | `??` | Regular File | `4fc85d587f6c632f68585a4fdfe78282cd70088223741ba881be018f8826bdd9` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/MAIN_THREAD_DECISION.md` | `??` | Regular File | `70243728ebed35c1b81ae45cfdafc9bd44eea9d996b98fe045221628fe767bdb` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/MAIN_THREAD_DECISION_V2.md` | `??` | Regular File | `5bea6890b11d520082a8e6c0f02fa2d42fb3ff07cd01d565b9b8a87079183cee` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/NODE_RUNTIME_EVIDENCE.md` | `??` | Regular File | `eb6f0c644665ed6d9f6e457199ac2f0a3f318e07fc56b939a2a8d2790ca1b6bf` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/PROTECTED_SOURCE_HASHES.sha256` | `??` | Regular File | `0e5e14f3e3512a3a102fa51a712b63c5ed097f0acd08ad7cfb8521922b142040` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/RESULT_QA.md` | `??` | Regular File | `8e527897cfc27b1ff16a3e1719188f47cead1da1f3bf837582b20f3c9e2cc465` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/RESULT_QA_V2.md` | `??` | Regular File | `d841a61cc6f398adadfaa1f3537f4f3b22a186bf8f038bb3d80f7a75f92636cf` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/RESULT_QA_V3.md` | `??` | Regular File | `000a2c3990a2bbcf74c5dacc3b546c6131c5908935523b33dec7c98fae095d88` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_BOUNDARY_MANIFEST.md` | `??` | Regular File | `8e69e276f5de3e8a2899acc0425ae07f37d8e50b3097040dff6957fe1feaa4ab` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_BOUNDARY_MANIFEST_V7.md` | `??` | Regular File | `324ea6e96b992047b6d33b87f6b4346d089261522663f9fac007f12671767e74` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_V4_FAILURE_ROUTING.md` | `??` | Regular File | `3b34a402d15df1c17523a63a50db303693f7a2219e7c39ed7cc54b7c36a2ffb5` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_V7_REPORT_FAILURE_ROUTING.md` | `??` | Regular File | `eed524ec3c7165350c54224ce3465d7e43ed659e87b1609ecda166c875cb485c` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/UNTRACKED_BASELINE.sha256` | `??` | Regular File | `44668aa118a56e6ffed3745764ee96abc6a965b103b56c39716db3f797e8f939` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_ITERATION-01.md` | `??` | Regular File | `78bf692372d40a853de57e7fd94139e6db7dfcc1c33141aa8ecedf9b2671915c` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_REVIEW-01.md` | `??` | Regular File | `eea09c753943630df133ea16fc8a767f13e43d2a4d8e6268b71df68cc42678b9` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_STATE_BASELINE.md` | `??` | Regular File | `e4c056922531a1d4b5511b03a9bac579e53a5edb4a58668cd284f28ef9fefa7f` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK1_ACCEPTED_EVIDENCE_CHAIN.md` | `??` | Regular File | `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_ITERATION-01.md` | `??` | Regular File | `3f7e0b2e3d08cbc8c69fc3f7824c5c01f1ff32d832e94211cf294f1857473f74` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_ITERATION-02.md` | `??` | Regular File | `17b56fa02c9501dc4deadc5a417b1d9b8effcecbfbcbc9e426b48bf2dd9c7994` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_ITERATION-03.md` | `??` | Regular File | `4af6239f6f35d1070ac13f9d67d2dbec796666aa6cc5dc522724887347a85579` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_REVIEW-01.md` | `??` | Regular File | `312cbd631fc5f2cbd430d23acb771751664c90071a15af81f0b5288f27fe565e` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_REVIEW-02.md` | `??` | Regular File | `5aa2f055d1d24be4551d606464d5ff7b9083c8dd7cc1f1eccf6d2b91d1dd6c71` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_REVIEW-03.md` | `??` | Regular File | `2c14760998a15be7b37a502a550623a7c544e6eb9a269eb363ff5173308649ec` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_STATE_BASELINE_V2.md` | `??` | Regular File | `a8aa28e9ff292f6886cbfe4fa0ba55d495bf75d9f130b11a999ef6663e585a09` |
| `task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/TASK1_EXHAUSTION_DECISION.md` | `??` | Regular File | `0ae7b954a165ef06d8ac49ca4af668ce1ac745ae1cec2bf6a3f99134ddfaff47` |
| `task-docs/universal-harness-adoption-accepted-planning-inputs-20260712-v2.md` | `??` | Regular File | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| `task-docs/universal-harness-adoption-accepted-planning-inputs-20260712.md` | `??` | Regular File | `6ad45199c0b85e28d76f4f46662eecce1870abc5bd352e06d4cd93d657453a26` |
| `task-docs/universal-harness-adoption-external-plan-review-20260712-v1.md` | `??` | Regular File | `80f7122ee3aa609f9baeeebb2f9b30394f6f8df1bf46154e699f1e9ab0c89212` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | `??` | Regular File | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260712.md` | `??` | Regular File | `8ee3ea376647413e7096724ecf1c814d6e901fe7397a1da5f2e82a671d2e3331` |
| `task-docs/universal-harness-adoption-plan-review-20260712-v1.md` | `??` | Regular File | `224f22dfb43088c86f00b948626afad42a7e30943ebf5f9199c64fdfa1063823` |
| `task-docs/universal-harness-adoption-plan-review-20260712-v2.md` | `??` | Regular File | `aef9a39afc783489046e4ab80f95e9eb121ad25c907eb84ad3b8dac43ab7ee93` |
| `task-docs/universal-harness-adoption-plan-review-20260712-v3.md` | `??` | Regular File | `b687e2411454ae7118521e8d6471b11f9f340ca282cbdba3c7cd3e43e814eba9` |
| `task-docs/universal-harness-adoption-plan-review-20260712-v4.md` | `??` | Regular File | `7b81dd19130612e713cc4d0108d53c56df37db55e5788018c06d18d47462c60b` |
| `task-docs/universal-harness-adoption-plan-review-pass-a-20260712.md` | `??` | Regular File | `595c7519b9f607a1496df87007467acd637094a2cde89dc0266e0b8123d695cc` |
| `task-docs/universal-harness-adoption-requirements-20260712.md` | `??` | Regular File | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| `task-docs/universal-nondestructive-harness-adoption-accepted-planning-inputs-20260712-v2.md` | `??` | Regular File | `3e918bd9cc4db30126dd6ee7a146e6332c3203aa5e001511b30854a4285eaa44` |
| `task-docs/universal-nondestructive-harness-adoption-accepted-planning-inputs-20260712.md` | `??` | Regular File | `251e575f94ab8b65ea77fb502ee2867e790c5404036fe1b79b895a952b30df7b` |
| `task-docs/universal-nondestructive-harness-adoption-accepted-requirements-20260712.md` | `??` | Regular File | `863bf1ea23c08adf85d9856e240c24e6c03e8c37c7a1f545ef8d60d5b83f7f28` |
| `task-docs/universal-nondestructive-harness-adoption-implementation-task-plan-20260712.md` | `??` | Regular File | `a4da55bbc71c653b8455d94aca086ae784e8a12dbd13dc7c9e6badf5d7186ad4` |
| `task-docs/universal-nondestructive-harness-adoption-mvp-requirements-20260712.md` | `??` | Regular File | `786db9017ded1cb33f280c4d1dd04216b83c1a350df7ec0024ce846ea8d7bf73` |
| `task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v1.md` | `??` | Regular File | `43ad6e2ecb86d0ad492d31c044019ce175172f34ec865b7bcd009379af637f0e` |
| `task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v2.md` | `??` | Regular File | `690726567438711783d09d44f4447950f64f85a9ffd53ee4c5f0f1309e689d64` |
| `task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v3.md` | `??` | Regular File | `e101fbd674d2e17f5c83e36f7cbd1693e89b3b8af789c95a03dfeb43b5fe294e` |
| `task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v4.md` | `??` | Regular File | `7f8a023d5ddf14fcb645f04bf8f90f6eba67024576363f9ac560493f733f2df4` |
| `task-docs/universal-nondestructive-harness-adoption-plan-review-pass-a-20260712.md` | `??` | Regular File | `6fefb549f418559962ff82f4cf99ed62602226e297da7e396c2bbfbf47875d56` |
| `task-docs/universal-nondestructive-harness-adoption-requirements-20260712.md` | `??` | Regular File | `b1dcd2c6f920798127b4140e1441b2ad92341c861619046f8b53009dfa1f5f61` |
| `task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v1.md` | `??` | Regular File | `5fea9d0ba0504b79a96ac66a2975006c03cbbe361b2c97340667ce588409a869` |
| `task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v2.md` | `??` | Regular File | `3a309a067c9b04fbb75f5ae5a6b81c72cde4a84407933e9c32451d583ddd3a17` |
| `task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v3.md` | `??` | Regular File | `b4bd3611f9f9b45a5202d81549210cda644ce08c06e68ccec434dd75fd34f63b` |
| `task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v4.md` | `??` | Regular File | `ded93b4e87d382ae6cd4f9c7de3592314ff495c2098b092b266064b2e7472a55` |
| `test/bundle/compiler.test.mjs` | `??` | Regular File | `53935da125da726697759123f12c3f7cc05bcac569960e1389d8c1467de30477` |
| `test/bundle/expected-data.mjs` | `??` | Regular File | `f8aad20a1c67be4a15be4f8d34d458db39b3befca6a5130d3c1b69ae34f0aa42` |
| `test/bundle/semantic-ledgers.test.mjs` | `??` | Regular File | `88885c3769caedf8dffdfc1cf44e4977aa1892765d17b39ab4faa5cecba71d52` |
| `test/bundle/test-helpers.mjs` | `??` | Regular File | `890da32b4de7a16a08f6dd5e13257507442a164a4c29a1c84d5eb9f2eb91cf7c` |

