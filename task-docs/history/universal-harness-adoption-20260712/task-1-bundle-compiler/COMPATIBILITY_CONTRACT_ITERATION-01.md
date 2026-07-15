# Task 1A Compatibility Execution Contract

Identity: `universal-harness-adoption-task-1-compatibility-contract-20260713-v1`

Status: `CONTRACT CANDIDATE`

## Objective

Replace only the stale generated-README assertions in `test/bundle/compiler.test.mjs` so Task 1 validation requires the accepted scoped lifecycle CLI guidance and rejects the two obsolete manual-copy commands, without changing compiler, bundle, payload, lifecycle, package, or Harness behavior.

## Frozen Authority

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Requirements v5 | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Plan v4 | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Focused Plan v5 | `universal-harness-adoption-implementation-plan-20260713-v5` | `9f17a1054778b45a1ac2d4c18f0ce0210c71e5ae9edcbc79cd6294384a839fc1` |
| Accepted planning inputs v3 | `universal-harness-adoption-accepted-planning-inputs-20260713-v3` | `6b9d18b607b9979decdc91e2bf7f0926770f50680fcf0d8759a5d2ea6fd11f78` |
| Plan-gap finding routing | `universal-harness-adoption-plan-finding-routing-20260713-v1` | `d9363a91fe3837535d0eef12a85ec783984fce5910a13e3fde9842a108487ad0` |
| Focused Plan v5 review | `universal-harness-adoption-plan-review-20260713-v5-r2` | `d5ead083de3135bc123620be18a8e098ba050fcb6c6a09412a760068a04aec7d` |

## Scope

### In Scope

- edit only the assertions in the test beginning at `test/bundle/compiler.test.mjs:78` that directly require old README manual-copy commands;
- positively require the generated README to show scoped package `@guoxiaoshuai2023/oh-my-harness@...` and binary `oh-my-harness` in lifecycle commands;
- negatively require the generated README not to present either obsolete command as required content or valid managed installation:
  - `cp -R .oh-my-harness/docs/agent-routing "$TARGET/docs/"`
  - `cp -R .oh-my-harness "$TARGET/task-docs/"`;
- preserve applicable generated-target/reference-closure checks in that test.

### Out Of Scope

- any compiler, mapping, inventory, payload, installer, lifecycle, package, documentation, requirements, protocol, profile, template, calibration, CI, or Task 4 change;
- general test refactoring, renaming, formatting, or adding unrelated assertions;
- restoring manual-copy guidance to README;
- stage, commit, push, PR, publication, registry access, secrets, or external writes.

## Write Authority

Only `test/bundle/compiler.test.mjs` may be modified, with before SHA-256:

`53935da125da726697759123f12c3f7cc05bcac569960e1389d8c1467de30477`

The executor must stop if its before hash differs.

## Protected Task 1 Implementation Paths

| Path | Before SHA-256 |
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

All Task 2 implementation paths and evidence, all planning/review/history artifacts, and all other repository paths are protected.

## Protected Candidate Documentation

| Path | Before SHA-256 |
| --- | --- |
| `README.md` | `90c176504881d50a02c09207529ac1d44acce95b4561ff3f8bab6f43c256ec37` |
| `docs/architecture.md` | `06c2fbd715f4c5542f0e2da2d27098f962a996f8c85e3f57a4622fb84fd58b92` |
| `docs/adapters/codex-subagents.md` | `e9cc864999d887fd9dedb3336260c9fa29ea6cc993bc510844a736e11d77744c` |
| `docs/adoption/universal-harness-adoption-runbook.md` | `c1aa4236015fc07b3e8ac381b2b3bc6276bcaec66dd4716a2cc042a98f4e7c26` |
| `docs/adoption/bundle-lifecycle-spec.md` | `e6d7bebcdc93573fc3676353c9e7956bbfd4310474b0c45a032ae79dba8bdc82` |

## Acceptance Criteria

- `T1C-AC1`: the implementation diff changes only the directly stale assertions in the single allowed test file.
- `T1C-AC2`: generated README must contain canonical scoped `--package=@guoxiaoshuai2023/oh-my-harness@...` lifecycle guidance and invoke binary `oh-my-harness`.
- `T1C-AC3`: generated README must not contain either obsolete `cp -R` command as valid installation guidance.
- `T1C-AC4`: all protected Task 1 production/test-support paths, Task 2 paths, and five candidate docs remain byte-identical.
- `T1C-AC5`: focused compiler suite passes under Node v24.14.0.
- `T1C-AC6`: complete required suite passes 60/60 under Node v24.14.0.
- `T1C-AC7`: `npm run validate:package` passes under Node v24.14.0 without repository residue.
- `T1C-AC8`: generated README and generated tree/inventory remain reference-closed; structural checks are not claimed as semantic proof.
- `T1C-AC9`: staged/committed delta remains empty; no unauthorized dirty path or archive/cache residue is created.

## Validation Commands

All Node/npm commands must prepend:

```sh
export PATH="/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
node --version
npm --version
```

Then run:

```sh
node --test test/bundle/compiler.test.mjs
npm test
npm run validate:package
git diff --check
git diff --cached --name-status
git diff --name-status origin/main...HEAD
```

Directly inspect the changed assertion and generated README output. Recompute the 11 protected Task 1 hashes, 14 Task 2 hashes, five candidate-doc hashes, and complete dirty-path attribution.

## Reporting

Return one complete Implementation Report in the executor response with before/after test hash, exact diff summary, each AC verdict, command exit/results, generated README evidence, protected hash results, status/residue evidence, and anything not validated. The executor must not persist its report.

## Stop Conditions

Stop without expanding scope if any required fix needs another path, any protected hash differs, Node v24.14.0 is unavailable, a stable non-stale-assertion test failure appears, scoped guidance cannot be verified without behavior change, candidate docs would need modification, or a reviewer requests an unsupported implementation preference.

