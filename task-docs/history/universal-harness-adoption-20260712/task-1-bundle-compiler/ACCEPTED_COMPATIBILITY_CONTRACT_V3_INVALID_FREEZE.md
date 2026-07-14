# Task 1A Compatibility Execution Contract v3

Identity: `universal-harness-adoption-task-1-compatibility-contract-20260713-v3`

Intended accepted path: `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/ACCEPTED_COMPATIBILITY_CONTRACT.md`

Status: `CONTRACT CANDIDATE - producer-nonmodifiable after freeze`

## Objective And Result

Change only the stale generated-README assertions in `test/bundle/compiler.test.mjs` so Task 1 validation requires the accepted scoped lifecycle CLI guidance and rejects the two obsolete manual-copy commands. Compiler, map, inventory, payload, lifecycle, package, documentation, and Harness behavior must remain byte-unchanged.

## Frozen Authority And Preflight

| Path | Identity | SHA-256 |
| --- | --- | --- |
| `task-docs/universal-harness-adoption-requirements-20260712.md` | requirements v5 | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | Plan v4 | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260713-v5.md` | Plan v5 | `9f17a1054778b45a1ac2d4c18f0ce0210c71e5ae9edcbc79cd6294384a839fc1` |
| `task-docs/universal-harness-adoption-accepted-planning-inputs-20260713-v3.md` | planning manifest v3 | `6b9d18b607b9979decdc91e2bf7f0926770f50680fcf0d8759a5d2ea6fd11f78` |
| `task-docs/universal-harness-adoption-plan-review-20260713-v5-r2.md` | Plan v5 strict review | `d5ead083de3135bc123620be18a8e098ba050fcb6c6a09412a760068a04aec7d` |
| `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/PLAN_GAP_FINDING_ROUTING.md` | finding routing | `d9363a91fe3837535d0eef12a85ec783984fce5910a13e3fde9842a108487ad0` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/COMPATIBILITY_CONTRACT_STATE_BASELINE.md` | contract-state baseline | `b8945d90c6c0a50d9301593897721753d814a1ab6a221e2d02e11ba4159b456a` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/COMPILER_TEST_BEFORE.mjs` | exact pre-edit bytes | `53935da125da726697759123f12c3f7cc05bcac569960e1389d8c1467de30477` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK1_ACCEPTED_EVIDENCE_CHAIN.md` | prior Task 1 chain | `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c` |
| `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/TASK2_ACCEPTED_EVIDENCE_CHAIN.md` | accepted Task 2 chain | `1e31a265e3692fd5e275e818850318de67e070da560b6a6a05060ca7dd59f448` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/NODE_RUNTIME_EVIDENCE.md` | Node v24 evidence | `eb6f0c644665ed6d9f6e457199ac2f0a3f318e07fc56b939a2a8d2790ca1b6bf` |

Before any write, verify every hash above, the frozen accepted-boundary hash supplied in the launch packet, branch `codex/universal-nondestructive-harness-adoption`, and HEAD/origin/main/merge base `60428957a99cf6f75d640c78cf6833576d47cc8d`. Verify:

```sh
cmp task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/COMPILER_TEST_BEFORE.mjs test/bundle/compiler.test.mjs
```

The launch packet must bind a fresh full-status/untracked path metadata baseline produced after contract freeze. Any authority, dependency, compiler-before, branch/base, status-attribution, or protected hash mismatch stops before write.

Task 2 chain binds these accepted gate artifacts, which must also match directly: contract `6b449cd7...`, report `7a3ebf73...`, QA `595dca2d...`, and main acceptance `d5edff6...`; it binds all fourteen accepted Task 2 implementation hashes. No Task 2 artifact may change.

## Applicable Routes And Task Packet

Runtime inheritance is not assumed. The executor packet explicitly binds:

- `AGENTS.md`: always-on scope, secrets/external-write, dirty-worktree, evidence, and no-fabrication floors;
- `task-docs/_harness/adaptive-orchestration-protocol.md`: stable boundary, no nested delegation, route binding, finite retry, and truthful reporting;
- `docs/agent-routing/current-state-evidence.md`: generated README and current dirty state are primary current-state evidence;
- `docs/agent-routing/implementation-boundary.md`: single-file minimal diff and no adjacent cleanup;
- `docs/agent-routing/validation-and-reporting.md`: command, report, protected-hash, and unvalidated-area evidence;
- `task-docs/_harness/semantic-fidelity-protocol.md`: manual-copy restoration is the AC-pass-but-user-fail negative and structural checks are not semantic proof.

The external-system/secrets route and high-risk-actions route are not otherwise triggered because network, registry, credentials, publication, and external writes are prohibited. Their always-on safety floors still apply.

Allowed reads: the frozen authority above, `test/bundle/compiler.test.mjs`, README, package/bundle/lifecycle source needed by the listed tests, protected paths for hashing, and generated output in an executor-owned OS temp directory. Allowed tools: read-only Git commands, `shasum`, `cmp`, `sed`/`rg`, frozen Node/npm commands, `mktemp`, and cleanup limited to the executor-owned OS temp directory. No network, dependency install, target-repo execution, secret access, external system, stage/commit/push/PR/publish, or nested delegation is authorized.

Reason for delegation: isolated single-file implementation. Main thread owns integration and acceptance. Expected output: response-only Implementation Report.

## Scope And Write Authority

Only `test/bundle/compiler.test.mjs` may change, from SHA-256 `53935da125da726697759123f12c3f7cc05bcac569960e1389d8c1467de30477`.

In scope:

- replace only assertions in the test beginning at line 78 that require old manual-copy commands;
- preserve its generated README and installed-target/reference-closure purpose;
- choose the smallest clear assertion implementation satisfying the frozen positive/negative semantics below.

Out of scope: every other file and behavior, general test refactoring, candidate-doc edits, Task 2/3/4 implementation, or any external/Git delivery action.

## Protected Paths And Before Hashes

The eleven other Task 1 paths remain:

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
| `test/bundle/expected-data.mjs` | `f8aad20a1c67be4a15be4f8d34d458db39b3befca6a5130d3c1b69ae34f0aa42` |
| `test/bundle/semantic-ledgers.test.mjs` | `88885c3769caedf8dffdfc1cf44e4977aa1892765d17b39ab4faa5cecba71d52` |
| `test/bundle/test-helpers.mjs` | `890da32b4de7a16a08f6dd5e13257507442a164a4c29a1c84d5eb9f2eb91cf7c` |

Five candidate docs remain:

| Path | SHA-256 |
| --- | --- |
| `README.md` | `90c176504881d50a02c09207529ac1d44acce95b4561ff3f8bab6f43c256ec37` |
| `docs/architecture.md` | `06c2fbd715f4c5542f0e2da2d27098f962a996f8c85e3f57a4622fb84fd58b92` |
| `docs/adapters/codex-subagents.md` | `e9cc864999d887fd9dedb3336260c9fa29ea6cc993bc510844a736e11d77744c` |
| `docs/adoption/universal-harness-adoption-runbook.md` | `c1aa4236015fc07b3e8ac381b2b3bc6276bcaec66dd4716a2cc042a98f4e7c26` |
| `docs/adoption/bundle-lifecycle-spec.md` | `e6d7bebcdc93573fc3676353c9e7956bbfd4310474b0c45a032ae79dba8bdc82` |

All Task 2 paths/evidence and all other repository paths are protected. The executor must compare the launch-baseline full status after execution, allowing only the test hash change plus main-thread-created gate artifacts.

## Frozen Positive And Negative Semantics

Generated source-support README must contain all four canonical relationships:

```text
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>
```

It must not contain either obsolete command anywhere:

```text
cp -R .oh-my-harness/docs/agent-routing "$TARGET/docs/"
cp -R .oh-my-harness "$TARGET/task-docs/"
```

A test that only checks file existence, product-name substring, TOML parse, or reference closure does not satisfy these semantic assertions. Restoring manual-copy guidance to pass the old test is an immediate FAIL.

## Acceptance Criteria

- `T1C-AC1`: only the directly stale assertion block in the one allowed test changes.
- `T1C-AC2`: all four scoped package/binary command relationships above are positively asserted against generated README.
- `T1C-AC3`: both obsolete manual-copy commands above are negatively asserted against generated README.
- `T1C-AC4`: eleven protected Task 1 paths, fourteen Task 2 implementation paths and its accepted evidence, and five candidate docs remain byte-identical.
- `T1C-AC5`: focused compiler suite passes under Node v24.14.0.
- `T1C-AC6`: complete required suite passes 60/60 under Node v24.14.0.
- `T1C-AC7`: `npm run validate:package` passes under Node v24.14.0 and leaves no archive/cache/metadata residue.
- `T1C-AC8`: direct OS-temp generated README readback proves the positive and negative semantics separately from structural/reference-closure evidence.
- `T1C-AC9`: staged/committed delta remains empty and full status comparison shows no unauthorized change.

## Validation And Primary Evidence

Use the frozen runtime:

```sh
export PATH="/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
node --version  # exactly v24.14.0
npm --version
node --test test/bundle/compiler.test.mjs
npm test
npm run validate:package
git diff --check
```

Generate/read back without repository residue:

```sh
tmp="$(mktemp -d "${TMPDIR:-/tmp}/omh-task1c.XXXXXX")"
node src/bundle/build-bundle.mjs --version 0.0.0-task1-compat --output "$tmp/bundle"
readme="$tmp/bundle/.oh-my-harness/docs/source-support/README.md"
shasum -a 256 "$readme"
rg -F -- '@guoxiaoshuai2023/oh-my-harness@' "$readme"
rg -F -- 'oh-my-harness install --target <repo>' "$readme"
rg -F -- 'oh-my-harness update --target <repo>' "$readme"
rg -F -- 'oh-my-harness uninstall --target <repo>' "$readme"
! rg -F -- 'cp -R .oh-my-harness/docs/agent-routing "$TARGET/docs/"' "$readme"
! rg -F -- 'cp -R .oh-my-harness "$TARGET/task-docs/"' "$readme"
rm -rf "$tmp"
test ! -e "$tmp"
```

Compare exact focused change independently:

```sh
diff -u task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/COMPILER_TEST_BEFORE.mjs test/bundle/compiler.test.mjs
git diff --cached --name-status
git diff --name-status origin/main...HEAD
git status --porcelain=v1 -uall
```

Recompute every protected hash, verify Task 2's chain and four gate members, and compare full path/status metadata to the executor launch baseline. Structural checks remain structural evidence only.

## Reporting And Stops

Return a response-only Implementation Report with before/after test hash, exact diff, each AC, command output summary, generated README hash/readback evidence, protected/evidence-chain results, full status/residue evidence, and unvalidated areas. Do not create the report file.

Stop before or during work on any frozen-authority, accepted-boundary, dependency-chain, branch/base, compiler-before, protected-hash, or unexplained status mismatch; if any fix needs another file; if Node v24.14.0 is unavailable; if another stable failure appears; if positive/negative semantics cannot be met without behavior/docs changes; or if external access, dependency install, candidate-doc change, Task 2/3/4 change, or scope expansion would be required.
