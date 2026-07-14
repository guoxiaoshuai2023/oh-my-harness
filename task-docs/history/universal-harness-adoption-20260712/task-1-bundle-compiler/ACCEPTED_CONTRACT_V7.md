# Task 1 Execution Contract - Deterministic Bundle Compiler And Package Contract

Contract identity: `universal-harness-adoption-task-1-contract-20260712-v7`

Status: `PROPOSED FOR STRICT REVIEW`

Producer may modify or reinterpret this boundary: `no`

## 1. Authority

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| Historical pre-v4 baseline, not an active execution precondition | `universal-harness-adoption-task-1-contract-state-baseline-20260712-v1` | `6211ca924ae0ab63104a0814f707bc162f52d254af99e769f02f691bdc4fc670` |
| Protected source hashes | 43-entry manifest | `0e5e14f3e3512a3a102fa51a712b63c5ed097f0acd08ad7cfb8521922b142040` |
| Pre-run untracked hashes | 34-entry authorized Markdown manifest | `44668aa118a56e6ffed3745764ee96abc6a965b103b56c39716db3f797e8f939` |
| Contract review v1 | `universal-harness-adoption-task-1-contract-review-20260712-v1` | `a675ccdfd426907277391eb7d2b03b2165b4507b1ff4dbef6a4485a17a9945b1` |
| Contract review v2 | `universal-harness-adoption-task-1-contract-review-20260712-v2` | `4ce320f28d7b339f7164691140bb309c2f68be6458e47fb1e5e4bfdbd57302da` |
| Node runtime evidence | `universal-harness-adoption-task-1-node-runtime-evidence-20260712-v1` | `eb6f0c644665ed6d9f6e457199ac2f0a3f318e07fc56b939a2a8d2790ca1b6bf` |
| Contract review v3 | `universal-harness-adoption-task-1-contract-review-20260712-v3` | `2f9280225784d74a1b1af69044d32eb7854b5ae33681675d2f3dc9b2e1227be3` |
| v4 failure routing | `universal-harness-adoption-task-1-v4-failure-routing-20260712-v1` | `3b34a402d15df1c17523a63a50db303693f7a2219e7c39ed7cc54b7c36a2ffb5` |
| Revised contract-state baseline | `universal-harness-adoption-task-1-contract-state-baseline-20260712-v2` | `dd1bbcffc911101e175c563fb48c01c44176040c5fa8ecaa57d54c20d33e921d` |
| Rejected v4 implementation report | `universal-harness-adoption-task-1-implementation-report-20260712-v1` | `db243283d05f0535b6eba82253e1f4adc63a58b34a05b921a0897d62cfca702b` |
| Rejected v4 Result QA | `universal-harness-adoption-task-1-result-qa-20260712-v1` | `8e527897cfc27b1ff16a3e1719188f47cead1da1f3bf837582b20f3c9e2cc465` |
| v4 main-thread FAIL decision | `universal-harness-adoption-task-1-main-thread-decision-20260712-v1` | `70243728ebed35c1b81ae45cfdafc9bd44eea9d996b98fe045221628fe767bdb` |
| Contract review v5 | `universal-harness-adoption-task-1-contract-review-20260712-v5` | `1d7d492d3ef5bddf18617c0fb748403c52b9a1c3911d3f90d044d948a2bf8eff` |
| Contract review v6 | `universal-harness-adoption-task-1-contract-review-20260712-v6` | `1144d655bc342006bad82b5775554e62433435ca216f0bc36c6186098cc28ab8` |

The sole active implementation precondition is `CONTRACT_STATE_BASELINE_V5.md`, identity `universal-harness-adoption-task-1-contract-state-baseline-20260712-v2`, SHA-256 `dd1bbcffc911101e175c563fb48c01c44176040c5fa8ecaa57d54c20d33e921d`. The historical v1 baseline is preserved only to explain the pre-v4 state and must not be evaluated as the current candidate state.

If strict review passes, main-thread gate artifacts use these non-overwriting paths and identities:

- accepted boundary: `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/ACCEPTED_CONTRACT_V7.md`, identity `universal-harness-adoption-task-1-contract-20260712-v7`;
- boundary manifest: `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_BOUNDARY_MANIFEST_V7.md`, identity `universal-harness-adoption-task-1-boundary-manifest-20260712-v3`;
- executor launch baseline: `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/EXECUTOR_LAUNCH_BASELINE_V7.md`, identity `universal-harness-adoption-task-1-executor-launch-baseline-20260712-v3`.

The executor consumes exactly `ACCEPTED_CONTRACT_V7.md`. Existing v4 `ACCEPTED_CONTRACT.md`, manifest, launch baseline, report, QA, and decision remain immutable failed-run evidence.

### Semantic authority and route binding

- Original Request Anchor: requirements v5 Section 1 at `task-docs/universal-harness-adoption-requirements-20260712.md`, bound by the requirements identity and hash above. It requires a fixed-version, namespaced, ownership-safe Harness installation model that preserves target-owned authority and work.
- Frozen Pass A: `task-docs/universal-harness-adoption-plan-review-pass-a-20260712.md`, identity `universal-harness-adoption-plan-review-pass-a-20260712-v1`, SHA-256 `595c7519b9f607a1496df87007467acd637094a2cde89dc0266e0b8123d695cc`.
- Outcome Contract: implementation plan v4 Section 3, identity `universal-harness-adoption-outcome-contract-20260712-v1`, governed by the plan hash above.
- Main-thread semantic comparison: accepted planning inputs v2, section `Main-Thread Semantic Comparison`, governed by the accepted-planning-input identity and hash above.
- AC-pass-but-user-fail anchor: the compiler, schemas, TOML parse, and string checks can all pass while the managed router block omits target-authority preservation, weakens a `MUST`/`MUST NOT`/`STOP`, or leaves runtime references pointing at source-only paths. Any such state is an overall Task 1 FAIL.

The following routed authority is triggered and remains binding: `AGENTS.md`; `docs/agent-routing/README.md`; `docs/agent-routing/current-state-evidence.md`; `docs/agent-routing/task-planning-scale.md`; `docs/agent-routing/implementation-boundary.md`; `docs/agent-routing/validation-and-reporting.md`; `task-docs/_harness/adaptive-orchestration-protocol.md`; and `task-docs/_harness/semantic-fidelity-protocol.md`. External-system and high-impact-action routes are not triggered because this task prohibits publication, authentication, target mutation, and external writes.

Direct run-level authority, not an `AGENTS.md` route target: `task-docs/_harness/run-directory-protocol.md`. Its factual trigger is this versioned run's frozen boundary, failed-result routing, immutable evidence chain, and non-overwriting report/QA lifecycle.

| Gate | Owner | Required evidence | Decision rule |
| --- | --- | --- | --- |
| Stable execution boundary | Main thread and independent contract reviewer | Versioned contract, hashes, strict review | No executor before strict PASS |
| Scope and protected state | Executor, result evaluator, main thread | Before/after manifests and changed-path classification | Any unexplained change is FAIL |
| Current source fidelity | Executor and result evaluator | Source hashes, deterministic outputs, semantic ledgers | Source fact or evidence mismatch is FAIL |
| HIGH semantic fidelity | Producer-independent result evaluator and main thread | Primary-file comparison for T1-AC7 through T1-AC10 | Structural PASS cannot substitute for semantic judgment |
| No secrets/external writes | Main thread and executor | Command/write inventory | Any access or write outside the boundary stops |
| Final acceptance | Main thread | Actual files, command evidence, independent Result QA | Subagent PASS is not self-executing acceptance |

No nested delegation is authorized.

Task identity: `universal-harness-adoption-task-1-bundle-compiler`

Task title: `Establish The Deterministic Bundle Compiler And Package Contract`

Material boundary change rule: stop, return to the main thread, and create a new versioned contract. The executor cannot edit this contract, review artifacts, baselines, or manifests.

## 2. Objective And User-Valued Result

Create the deterministic release-plane foundation for Universal Harness Adoption:

- one explicit checked-in source-to-target map;
- one scoped npm package contract for `@guoxiaoshuai2023/oh-my-harness` with binary `oh-my-harness`;
- one substantive marker-delimited managed router block;
- bundle-inventory and package-contract schemas;
- one Node-standard-library-only deterministic bundle compiler;
- focused tests and reproducible provisional bundle evidence.

The result must transform the current accepted Harness source into an inspectable provisional target bundle and immutable inventory without creating a runnable npm package, target install state, lifecycle CLI, or installer. Task 4, not Task 1, owns the final release-candidate package identity.

### v7 revision outcome

The v4 candidate is not accepted. This revision keeps the same Task 1 objective and changes only the source-reference closure authority needed to handle both slash-terminated and bare directory references. The executor must patch the existing 12-file candidate rather than roll it back or redesign the compiler.

## 3. In Scope

- `packaging/package-contract.json`
- `packaging/bundle-map.json`
- `packaging/managed-router-block.md`
- `packaging/schemas/package-contract.schema.json`
- `packaging/schemas/bundle-inventory.schema.json`
- Node ESM modules below `src/bundle/`, including one CLI entry `src/bundle/build-bundle.mjs`
- focused Node tests and test-only expected data below `test/bundle/`
- deterministic temporary build output used only for validation
- source/target mapping, reference closure, calibration identity regeneration, modal-force, managed-block, and six-profile evidence returned in the Implementation Report

No new repository file is authorized. The existing 12 candidate files listed in Section 5 are the complete implementation write universe.

## 4. Out Of Scope

- `package.json`, lockfiles, npm publication metadata, or a runnable package
- `bin/**`, lifecycle commands, installer, install state, backup behavior, target mutation, or confirmation UI
- install/update/uninstall/no-op implementation
- README, architecture, adapter, adoption documentation, examples, protocols, templates, calibration source, profiles, scripts, CI, or source `AGENTS.md` edits
- Task 2, Task 3, or Task 4 fixtures/code/docs
- dependency additions
- npm authentication, scope-access verification, publication, signing, release creation, Git staging/commit/push/PR
- secrets, credentials, private environment values, or external writes

## 5. Allowed Writes

Exactly these existing candidate files, frozen by `CONTRACT_STATE_BASELINE_V5.md`:

- `packaging/package-contract.json`
- `packaging/bundle-map.json`
- `packaging/managed-router-block.md`
- `packaging/schemas/package-contract.schema.json`
- `packaging/schemas/bundle-inventory.schema.json`
- `src/bundle/build-bundle.mjs`
- `src/bundle/compiler.mjs`
- `src/bundle/validation.mjs`
- `test/bundle/compiler.test.mjs`
- `test/bundle/expected-data.mjs`
- `test/bundle/semantic-ledgers.test.mjs`
- `test/bundle/test-helpers.mjs`

Temporary validation output may be written only beneath an OS temporary directory created for the command and must not be retained in the repository. No generated `dist/` or archive is committed.

Only files necessary to implement and test the v7 reference-closure correction may change. Unrelated cleanup, module restructuring, schema redesign, package-contract changes, managed-router semantic changes, or test refactoring is outside the boundary.

## 6. Protected Paths And State

Read-only source inputs:

- `AGENTS.md`
- `README.md`
- `.codex/agents/*.toml`
- `.codex/config.example.toml`
- `docs/**`
- `examples/**`
- `scripts/**`
- `task-docs/_harness/**`

Read-only planning/history/gate artifacts:

- all `task-docs/universal-harness-adoption-*`
- all `task-docs/universal-nondestructive-harness-adoption-*`
- `task-docs/history/universal-nondestructive-harness-adoption-20260712/**`
- this run directory, except main-thread persistence of later gate/report/QA artifacts after the executor stops
- all v4 failure evidence, v5/v6/v7 contracting artifacts, the revised baseline, and the eventual v7 accepted boundary/manifest/launch baseline

Forbidden implementation paths include:

- `package.json`, `package-lock.json`, any lockfile
- `bin/**`
- `src/installer/**`
- `test/lifecycle/**`
- `test/acceptance/**`
- `tools/**`
- `.github/**`

Before and after proof:

- `shasum -a 256 -c task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/PROTECTED_SOURCE_HASHES.sha256`
- `shasum -a 256 -c task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/UNTRACKED_BASELINE.sha256`
- complete Git status and changed-path classification
- no staged/committed delta and no unexplained tracked change

Any mismatch stops execution. Unknown future untracked content is not opened or hashed; an overlap with the allowed roots stops for main-thread handling.

## 7. Fixed Package Contract

Current-state evidence is frozen in `NODE_RUNTIME_EVIDENCE.md`: the official Node.js release page reports Node 24 as LTS and the exact local validation executable below reports `v24.14.0`. Task 1 therefore freezes `nodeEngine` as `>=24 <25`. The default `/opt/homebrew/bin/node` is Node `v25.9.0`, is EOL according to the same official table, and is not authorized for Task 1 validation. Changing the engine or validation executable requires a revised contract.

```text
/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
```

`packaging/package-contract.json` and its schema must use this exact closed shape; every listed key is required and `additionalProperties` is false at every object level:

```json
{
  "schemaVersion": 1,
  "packageName": "@guoxiaoshuai2023/oh-my-harness",
  "binaryName": "oh-my-harness",
  "binaryPath": "bin/oh-my-harness.mjs",
  "nodeEngine": ">=24 <25",
  "lifecycleRuntime": {
    "language": "node",
    "standardLibraryOnly": true,
    "pythonRequired": false,
    "thirdPartyRuntimeDependencies": 0
  },
  "helperRuntime": {
    "language": "python",
    "version": "3.11",
    "requiredPayload": true,
    "requiredHelpers": [
      ".oh-my-harness/scripts/extract_agents_source.py",
      ".oh-my-harness/scripts/validate_router_fixture.py",
      ".oh-my-harness/scripts/validate_rule_preservation.py"
    ]
  },
  "canonicalCommands": {
    "install": "npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>",
    "update": "npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>",
    "uninstall": "npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>",
    "stableChannel": "npx --yes --package=@guoxiaoshuai2023/oh-my-harness@latest oh-my-harness install --target <repo>",
    "localArchive": "npx --yes --package=./<packed-archive>.tgz oh-my-harness <operation> --target <repo>"
  },
  "forbiddenCommandPatterns": [
    "npx oh-my-harness",
    "--package=oh-my-harness"
  ],
  "shorterScopedForm": {
    "status": "unsupported-pending-direct-proof"
  },
  "packageFiles": [
    "bin/oh-my-harness.mjs",
    "src/installer/**",
    "dist/**",
    "README.md",
    "package.json"
  ],
  "excludedPackageContent": [
    "task-docs/**",
    "test/**",
    "fixtures/**",
    ".oh-my-harness/install-state.json",
    ".oh-my-harness-backups/**",
    "**/__pycache__/**",
    "**/*.pyc",
    "local-absolute-paths",
    "secrets"
  ]
}
```

The schema must enforce these constants, the scoped name, the binary identity, the fixed Node engine, and the exact three helper destinations. The package allowlist is a Task 2/4 contract, not authorization for Task 1 to create those paths.

## 8. Fixed Bundle Map And Target Layout

`packaging/bundle-map.json` must use the exact closed root shape `{ "schemaVersion": 1, "entries": [...], "rewrites": [...], "calibrationBinding": {...}, "managedBlock": {...} }`. Each entry has exactly `assetId`, `source`, `destination`, `kind`, `required`, and `transform`. Every entry is required. Runtime globbing or source-tree discovery must not decide membership.

Required mappings:

- seven `docs/agent-routing/*.md` files -> `.oh-my-harness/docs/agent-routing/`
- `docs/architecture.md` -> `.oh-my-harness/docs/architecture.md`
- `docs/adapters/codex-subagents.md` -> `.oh-my-harness/docs/adapters/codex-subagents.md`
- `.codex/config.example.toml` -> `.oh-my-harness/docs/adapters/config.example.toml`
- `README.md` -> `.oh-my-harness/docs/source-support/README.md`
- two existing `docs/adoption/*.md` files -> `.oh-my-harness/docs/adoption/`
- two existing `examples/minimal-router/*` files -> `.oh-my-harness/docs/examples/minimal-router/`
- adaptive, semantic-fidelity, and run-directory protocols -> `.oh-my-harness/protocols/`
- all thirteen templates -> `.oh-my-harness/templates/`
- evaluator calibration and adaptive acceptance matrix -> `.oh-my-harness/calibration/`
- all three Python helpers -> `.oh-my-harness/scripts/`
- six `harness-*.toml` profiles -> six `.codex/agents/oh-my-harness-*.toml` destinations

The category list above is shorthand only. The following source/destination pairs are the complete authoritative Task 1 payload map:

```text
docs/agent-routing/README.md -> .oh-my-harness/docs/agent-routing/README.md
docs/agent-routing/current-state-evidence.md -> .oh-my-harness/docs/agent-routing/current-state-evidence.md
docs/agent-routing/external-systems-and-secrets.md -> .oh-my-harness/docs/agent-routing/external-systems-and-secrets.md
docs/agent-routing/high-risk-actions.md -> .oh-my-harness/docs/agent-routing/high-risk-actions.md
docs/agent-routing/implementation-boundary.md -> .oh-my-harness/docs/agent-routing/implementation-boundary.md
docs/agent-routing/task-planning-scale.md -> .oh-my-harness/docs/agent-routing/task-planning-scale.md
docs/agent-routing/validation-and-reporting.md -> .oh-my-harness/docs/agent-routing/validation-and-reporting.md
docs/architecture.md -> .oh-my-harness/docs/architecture.md
docs/adapters/codex-subagents.md -> .oh-my-harness/docs/adapters/codex-subagents.md
.codex/config.example.toml -> .oh-my-harness/docs/adapters/config.example.toml
README.md -> .oh-my-harness/docs/source-support/README.md
docs/adoption/open-source-release-checklist.md -> .oh-my-harness/docs/adoption/open-source-release-checklist.md
docs/adoption/router-refactor-runbook.md -> .oh-my-harness/docs/adoption/router-refactor-runbook.md
examples/minimal-router/AGENTS.md -> .oh-my-harness/docs/examples/minimal-router/AGENTS.md
examples/minimal-router/README.md -> .oh-my-harness/docs/examples/minimal-router/README.md
task-docs/_harness/adaptive-orchestration-protocol.md -> .oh-my-harness/protocols/adaptive-orchestration-protocol.md
task-docs/_harness/semantic-fidelity-protocol.md -> .oh-my-harness/protocols/semantic-fidelity-protocol.md
task-docs/_harness/run-directory-protocol.md -> .oh-my-harness/protocols/run-directory-protocol.md
task-docs/_harness/templates/context-handoff-template.md -> .oh-my-harness/templates/context-handoff-template.md
task-docs/_harness/templates/executor-report-template.md -> .oh-my-harness/templates/executor-report-template.md
task-docs/_harness/templates/orchestration-prompt-template.md -> .oh-my-harness/templates/orchestration-prompt-template.md
task-docs/_harness/templates/plan-review-template.md -> .oh-my-harness/templates/plan-review-template.md
task-docs/_harness/templates/plan-template.md -> .oh-my-harness/templates/plan-template.md
task-docs/_harness/templates/result-qa-template.md -> .oh-my-harness/templates/result-qa-template.md
task-docs/_harness/templates/routing-scenario-matrix-template.md -> .oh-my-harness/templates/routing-scenario-matrix-template.md
task-docs/_harness/templates/rule-preservation-ledger-template.md -> .oh-my-harness/templates/rule-preservation-ledger-template.md
task-docs/_harness/templates/solution-review-template.md -> .oh-my-harness/templates/solution-review-template.md
task-docs/_harness/templates/source-coverage-manifest-template.md -> .oh-my-harness/templates/source-coverage-manifest-template.md
task-docs/_harness/templates/source-snapshot-template.md -> .oh-my-harness/templates/source-snapshot-template.md
task-docs/_harness/templates/task-contract-template.md -> .oh-my-harness/templates/task-contract-template.md
task-docs/_harness/templates/task-packet-template.md -> .oh-my-harness/templates/task-packet-template.md
task-docs/_harness/evaluator-calibration.md -> .oh-my-harness/calibration/evaluator-calibration.md
task-docs/_harness/adaptive-orchestration-acceptance-matrix.md -> .oh-my-harness/calibration/adaptive-orchestration-acceptance-matrix.md
scripts/extract_agents_source.py -> .oh-my-harness/scripts/extract_agents_source.py
scripts/validate_router_fixture.py -> .oh-my-harness/scripts/validate_router_fixture.py
scripts/validate_rule_preservation.py -> .oh-my-harness/scripts/validate_rule_preservation.py
.codex/agents/harness-planner.toml -> .codex/agents/oh-my-harness-planner.toml
.codex/agents/harness-plan-evaluator.toml -> .codex/agents/oh-my-harness-plan-evaluator.toml
.codex/agents/harness-solution-designer.toml -> .codex/agents/oh-my-harness-solution-designer.toml
.codex/agents/harness-solution-evaluator.toml -> .codex/agents/oh-my-harness-solution-evaluator.toml
.codex/agents/harness-executor.toml -> .codex/agents/oh-my-harness-executor.toml
.codex/agents/harness-result-evaluator.toml -> .codex/agents/oh-my-harness-result-evaluator.toml
```

The managed block is a separate inventory unit sourced from `AGENTS.md` and `packaging/managed-router-block.md`, not an installed file path.

Each map entry must classify required/optional status. Every entry above is required for Task 1; no arbitrary `SKIP` is permitted. Source hashes are observed and recorded in generated provenance, not hardcoded as map authority, so later accepted mapped documentation changes do not require a map change when destination/transformation rules remain stable.

The generated `.oh-my-harness/bundle-inventory.json` and its schema must have the exact closed root fields `schemaVersion`, `bundleVersion`, `packageName`, `binaryName`, `nodeEngine`, `installerCompatibility`, `requiredFiles`, `optionalFiles`, `managedBlock`, `ownership`, and `referencePolicy`. `optionalFiles` is an empty array for Task 1. Every required-file item has exactly `assetId`, `sourcePath`, `sourceSha256`, `destinationPath`, `destinationSha256`, `required`, `kind`, and `transformations`. The managed-block object has exactly `sourcePath`, `sourceSha256`, `assetPath`, `sha256`, `startMarker`, and `endMarker`. The remaining nested objects are closed and exact:

```json
{
  "installerCompatibility": {
    "packageName": "@guoxiaoshuai2023/oh-my-harness",
    "binaryName": "oh-my-harness",
    "nodeEngine": ">=24 <25"
  },
  "ownership": {
    "payloadPaths": ["<sorted exact required destinations>"],
    "agentPaths": ["<sorted six exact prefixed agent destinations>"],
    "managedBlockId": "oh-my-harness"
  },
  "referencePolicy": {
    "runtimeSourcePathsForbidden": true,
    "provenanceSourcePathsAllowed": true
  }
}
```

The inventory never records or hashes itself, never includes `install-state.json`, and never claims backup ownership. In `bundle-map.json`, `managedBlock` has exactly `sourceRouter`, `blockTemplate`, `assetPath`, `startMarker`, and `endMarker`. The `rewrites` array consists only of closed `{ "from", "to" }` objects.

The calibration source entry has exact asset ID `calibration/evaluator-calibration`. `calibrationBinding` is this exact closed object:

```json
{
  "sourcePath": "task-docs/_harness/evaluator-calibration.md",
  "destinationPath": ".oh-my-harness/calibration/evaluator-calibration.md",
  "dependentAssetIds": [
    "agent/plan-evaluator",
    "agent/solution-evaluator",
    "agent/result-evaluator",
    "calibration/adaptive-orchestration-acceptance-matrix",
    "template/orchestration-prompt",
    "template/plan-review",
    "template/result-qa",
    "template/task-packet"
  ]
}
```

Those eight dependent entries must use exactly those asset IDs. The remaining four agent IDs are `agent/planner`, `agent/solution-designer`, `agent/executor`, and the remaining mapped files use deterministic slash-separated IDs derived from their destination category and basename. No additional calibration dependent may be inferred by the compiler; a new source binding requires a revised contract.

## 9. Controlled Reference Transformation

The compiler may change only:

- source paths to their exact mapped installed paths;
- six profile filenames from `harness-*` to `oh-my-harness-*`;
- package/release identity fields fixed by this contract;
- the transformed evaluator-calibration SHA binding in transformed dependents;
- target-authority/conflict integration text fixed in the managed block.

The replacement table is fully determined as follows and must be checked into `bundle-map.json` in this order:

1. one `{ "from", "to" }` rule for each of the 42 authoritative source/destination pairs in Section 8, sorted by descending `from` length and then bytewise ascending `from` for ties;
2. the following exact generic rules in the listed order; each slash-terminated form precedes its bare overlapping form:

```text
.codex/agents/harness-*.toml -> .codex/agents/oh-my-harness-*.toml
.codex/agents/*.toml -> .codex/agents/oh-my-harness-*.toml
task-docs/_harness/templates/ -> .oh-my-harness/templates/
examples/minimal-router/ -> .oh-my-harness/docs/examples/minimal-router/
docs/agent-routing/ -> .oh-my-harness/docs/agent-routing/
docs/agent-routing -> .oh-my-harness/docs/agent-routing
task-docs/_harness/ -> .oh-my-harness/
task-docs/_harness -> .oh-my-harness
docs/adapters/ -> .oh-my-harness/docs/adapters/
docs/adoption/ -> .oh-my-harness/docs/adoption/
scripts/ -> .oh-my-harness/scripts/
```

3. six generic filename rules, in planner/plan-evaluator/solution-designer/solution-evaluator/executor/result-evaluator order, from `harness-<role>.toml` to `oh-my-harness-<role>.toml`.

The compiler uses one non-cascading source-span pass. At each byte position in the original input only, it selects the first ordered rule whose `from` bytes match there, appends that rule's `to` bytes, and advances by the matched `from` length; if no rule matches, it copies one original byte. Inserted destination bytes are never examined again. Duplicate `from` values with a different `to` value are invalid. This exact algorithm prevents target strings such as `.oh-my-harness/scripts/` or `oh-my-harness-*.toml` from being rewritten again.

All concrete rules, their exact `from`/`to` strings, and their order are checked into `bundle-map.json`; no code-owned hidden replacement is allowed. After transformation, reference-bearing runtime content must contain neither slash-terminated nor bare forms of `docs/agent-routing` and `task-docs/_harness`, and must contain none of these other source-only prefixes or exact paths: `docs/architecture.md`, `docs/adapters/`, `docs/adoption/`, `examples/minimal-router/`, `.codex/agents/harness-`, `.codex/agents/*.toml`, `.codex/config.example.toml`, or source helper paths. Source identifiers may remain only in inventory provenance and build evidence. Unknown source-only runtime references fail the build. Build-time source paths must not authorize install-time source access.

Source-reference validation must be independent from successful rewriting:

- recognize both `docs/agent-routing/` and bare `docs/agent-routing` as source-only runtime tokens;
- recognize both `task-docs/_harness/` and bare `task-docs/_harness` as source-only runtime tokens;
- mask or classify exact installed target references from the generated inventory before source-token rejection, longest target first, so `.oh-my-harness/docs/agent-routing` is not rejected merely because it contains the substring `docs/agent-routing`;
- apply token-boundary checks so a source token is rejected when standalone or followed by `/`, whitespace, quote, backtick, punctuation, or end of input;
- validate every runtime path reference in generated support README content against the generated tree or inventory: an exact file must exist, and a directory reference must be a prefix of at least one inventory destination or an actual generated directory;
- continue to exclude inventory provenance fields from runtime-reference claims without excluding reference-bearing payload content.

The generated support README must contain the rewritten runtime paths `.oh-my-harness/docs/agent-routing` and `.oh-my-harness` in place of the two failed bare source paths. Both must resolve in the generated output. It must contain no remaining bare or slash-terminated source form.

Evaluator calibration must be transformed before dependents. The compiler computes its transformed SHA-256 and replaces the canonical source calibration identity only in transformed reference-bearing dependents that bind that identity. It must not modify the source calibration file.

## 10. Managed Router Block

Use exact stable markers:

```text
<!-- oh-my-harness:start -->
<!-- oh-my-harness:end -->
```

`packaging/managed-router-block.md` must contain the markers exactly once. Immediately after the start marker it must contain the exact heading `# oh-my-harness Managed Router`, the exact sentence `This block is managed by oh-my-harness.`, and this exact integration section:

```text
## Authority With Target Rules
- Target-repository instructions outside this block remain effective and must be followed alongside this Harness.
- If target-repository authority and Harness authority materially conflict or cannot both be followed, STOP and ask the user to resolve the conflict.
- Do not silently overwrite, weaken, or take over either target-repository authority or Harness authority.
```

After that integration section it must preserve, from source `AGENTS.md`, these substantive sections with only approved path/name transformations:

- Always-On Hard Gates
- the full Routing Table and all nine factual triggers
- Adaptive Harness Control Plane, including adaptive default and full-v2 compatibility
- Semantic Fidelity Entry Point
- Validation And Reporting Minimums

The block cannot be a one-line pointer. A generated ledger must map every required source heading/bullet/route to target text and show preserved modal force. Markers are packaging delimiters, not part of target-owned outer bytes.

## 11. Deterministic Builder Behavior

`src/bundle/build-bundle.mjs` must:

- use Node standard-library APIs only;
- accept explicit `--version` and `--output` arguments;
- read only the explicit package contract, bundle map, managed block, schemas, and mapped source files;
- reject malformed contract/map/schema inputs, duplicate destinations, missing required sources, unsafe/non-relative target destinations, incomplete mappings, and unknown source-only runtime references;
- write only to a new or explicitly empty output directory supplied by the caller;
- produce deterministic bytes with no timestamp, machine path, random value, username, environment value, or ordering dependence;
- materialize the provisional target tree plus immutable `.oh-my-harness/bundle-inventory.json` and a package-internal managed-block asset;
- never generate `.oh-my-harness/install-state.json`;
- record bundle version, scoped installer identity/compatibility, required classification, source provenance path/hash, exact destination, transformed hash, ownership surface, managed-block hash, and reference/transformation metadata;
- avoid inventory self-hash and any install-state/backup ownership claim;
- return nonzero with a precise non-sensitive error on validation failure.

The generated output may include deterministic build-evidence reports outside the installed target tree, but those reports must be clearly classified as build evidence and excluded from the target ownership inventory.

## 12. Acceptance Criteria

- `T1-AC1`: the checked-in package contract fixes scoped package identity `@guoxiaoshuai2023/oh-my-harness`, binary `oh-my-harness`, binary destination owned by Task 2, canonical scoped version-pinned/stable-channel/local-archive command relationships, explicit package allowlist requirements, and zero third-party runtime dependencies; it forbids unscoped installer commands.
- `T1-AC2`: an explicit checked-in map covers every required file and the selected support-reference closure; no source-tree scan or runtime glob decides bundle membership.
- `T1-AC3`: two clean builds from the same source produce identical transformed payload bytes, inventory bytes, file list, and per-file hashes.
- `T1-AC4`: inventory includes bundle version, scoped installer package identity/compatibility, required/optional classification, source provenance mapping, exact destinations, expected transformed hashes, ownership surface, and managed-block identity; it excludes mutable state and avoids self-hash.
- `T1-AC5`: the generated target layout uses `.oh-my-harness/`, six exact prefixed profile filenames, and no target `.codex/config.toml` takeover.
- `T1-AC6`: every runtime reference resolves to an installed target; source identifiers remain only in inventory provenance/build evidence.
- `T1-AC7`: transformed calibration path/hash bindings are internally consistent and the three evaluator profiles bind the installed canonical calibration; all six total profiles retain their distinct role-specific mission and authority.
- `T1-AC8`: managed-block mapping and modal-force ledgers show no omission/downgrade of always-on gates, adaptive states, routes, semantic entry, validation minimums, or profile boundaries.
- `T1-AC9`: provisional bundle-directory inspection contains exactly the explicitly mapped transformed assets and immutable inventory; no install state, installer placeholder, untracked history, caches, secrets, target fixtures, or local absolute paths leak into it.
- `T1-AC10`: structural checks are explicitly labeled as structural; an independent semantic review remains required downstream.
- `T1-AC11`: all three Python helpers remain required mapped payload, retain Python stdlib behavior/evidence disclaimers, and are not replaced by Node implementations or reclassified as optional.

No AC may be marked PASS from ID/string presence alone.

Every T1-AC1 through T1-AC11 must be rerun and independently decided under v7 through `ACCEPTED_CONTRACT_V7.md`. No v4 PASS label is inherited. T1-AC6 additionally requires direct inspection of generated support README, generated-tree and inventory resolution, and every positive/negative fixture below.

### Criterion-owned evidence and failure signals

| AC | Primary evidence and validation | Failure signal | Independent judgment |
| --- | --- | --- | --- |
| T1-AC1 | Package contract/schema parse; exact closed-shape comparison; negative unscoped-name/binary/engine/extra-key fixtures | Any identity, command, runtime, allowlist, or closed-schema mismatch | Result evaluator inspects JSON and negative results |
| T1-AC2 | Explicit 42-entry map comparison against Section 8; source existence; no discovery/glob code path; missing/extra-entry negative fixture | Missing, duplicate, extra, optional, discovered, or glob-selected payload member | Result evaluator compares the checked-in map to source facts |
| T1-AC3 | Two clean output trees; recursive byte/hash and inventory-byte comparison | Any byte, path, ordering, or hash difference | Result evaluator reruns or directly checks reproducibility evidence |
| T1-AC4 | Inventory schema parse; exact root/item/nested shape; ownership and no-self/state checks | Missing authority field, extra mutable field, self-hash, state, or backup ownership | Result evaluator inspects generated inventory and schema |
| T1-AC5 | Exact tree listing; six prefixed profile paths; explicit absence of target `.codex/config.toml` | Wrong namespace/profile name, extra takeover file, or missing required path | Result evaluator checks actual output paths |
| T1-AC6 | Reference-closure report with provenance exclusion; injected unknown-source-reference negative fixture | Dangling runtime source path, uninstalled target, or provenance used as runtime authority | Result evaluator inspects transformed references, not only report totals |
| T1-AC7 | Transformed calibration path/hash check; `tomllib` parse; six-role normalized mission/authority ledger | Stale calibration binding, role collapse, permission/mission drift, or evaluator boundary loss | Producer-independent semantic comparison of all six source/target profiles is mandatory |
| T1-AC8 | Heading/bullet/route/modal ledger; exact marker/integration-text check; negative modal downgrade fixture | Omission, trigger substitution, force downgrade, duplicate/damaged marker, or one-line router | Producer-independent semantic comparison of source router and managed block is mandatory |
| T1-AC9 | Recursive output inventory; prohibited-content, absolute-path, secret-pattern, state, cache, and history scans | Any unlisted asset or prohibited/leaked content | Result evaluator inspects actual output and scan scope |
| T1-AC10 | Build/test/report wording and Result QA method classification | A structural/smoke check is described as semantic proof or replaces semantic review | Result evaluator must explicitly issue separate implementation and semantic decisions |
| T1-AC11 | Three exact helper map entries; transformed files; Python 3.11 compile; source/target behavior-disclaimer comparison | Missing/optional helper, Node rewrite, compile failure, or disclaimer/stdlib boundary drift | Result evaluator inspects all three source/target helpers |

The Result Evaluator is a fresh read-only producer-independent evaluator bound to `task-docs/_harness/evaluator-calibration.md`. It must report the consulted calibration path and relevant case IDs or `N/A`, use primary files and command evidence, issue strict implementation and semantic PASS/FAIL decisions, and perform no repair. Any unverified AC or any P0/P1 finding is overall FAIL.

## 13. Required Validation And Evidence

Run at minimum:

1. `/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --test test/bundle/*.test.mjs`
2. two clean builds to separate temporary directories using `/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node src/bundle/build-bundle.mjs --version 0.0.0-task1 --output <temp>`
3. recursive relative-path/file-hash comparison of both outputs
4. schema/contract/map validation and negative tests for duplicate destinations, missing source, unscoped package identity, unsafe target path, unknown source reference, and output collision
5. `/opt/homebrew/bin/python3.11 -m py_compile` for all three transformed helpers
6. `/opt/homebrew/bin/python3.11` plus `tomllib` parsing for all six transformed profiles, confirming exactly three read-only evaluators
7. installed-reference closure check with explicit inventory-provenance exclusion
8. calibration transformed-hash/path verification
9. managed-block heading/route/marker/modal-force ledger review
10. six-profile source/target normalized semantic and permission ledger
11. `git diff --check`
12. both protected hash-manifest checks and complete Git changed-path/status classification

The test suite must include all of these v7 fixtures:

1. Positive regression: build the unchanged current source README and assert its two `cp -R` lines use `.oh-my-harness/docs/agent-routing` and `.oh-my-harness`, contain neither bare source token, and resolve through the output tree or inventory.
2. Negative rewrite-authority fixture: remove either bare-form rewrite from an isolated temporary map; the build must fail before producing an accepted output.
3. Negative validator fixture: invoke the same runtime-reference validator used by the builder on payload content containing standalone bare `docs/agent-routing` and standalone bare `task-docs/_harness`; each must fail.
4. False-positive fixture: the same validator must accept valid installed references `.oh-my-harness/docs/agent-routing`, `.oh-my-harness/docs/agent-routing/README.md`, and `.oh-my-harness/protocols/semantic-fidelity-protocol.md` when those targets resolve in the supplied tree/inventory.
5. Slash-form regression: existing slash-terminated source tokens remain rejected or rewritten exactly as before.

The Implementation Report must include:

- exact changed files;
- commands and exit status;
- T1-AC1 through T1-AC11 result/evidence map;
- source/destination count and required-entry count;
- two-build identity and output inventory hash;
- reference rewrite and dangling-reference results;
- managed-block markers, headings, nine routes, integration clauses, and modal-force summary;
- six-profile permission/calibration summary;
- Python helper payload/compile summary;
- protected/source/untracked before/after result;
- what was not validated and remaining risks;
- explicit confirmation that no Task 2-4 work, npm publication, package metadata, installer, or target write occurred.

## 14. Stop Conditions

Stop before or during execution if:

- any authority/baseline/hash mismatches;
- any of the 12 allowed candidate files mismatches `CONTRACT_STATE_BASELINE_V5.md` before execution, or an allowed root contains unexplained content;
- a required source or reference closure cannot be mapped without semantic redesign;
- the focused correction requires changing source README, source Harness behavior, schemas, package contract, managed-router semantics, or files outside the existing three Task 1 roots;
- source-reference validation cannot distinguish installed target paths from embedded source-only tokens without broad parsing or a new dependency;
- transformed content needs a semantic change beyond this contract;
- a dependency, `package.json`, binary, installer, docs/CI/source-Harness edit, or Task 2-4 path becomes necessary;
- managed-block preservation or modal force cannot be proven;
- output would contain install state, backups, history, secrets, local absolute paths, or unrelated content;
- a protected or pre-existing untracked path changes;
- an external write, npm auth/scope check/publication, Git stage/commit/push/PR, or secret access becomes necessary.

## 15. Delegation And Reporting Boundary

- Executor nested delegation: prohibited.
- Executor writes report only in its response with identity `universal-harness-adoption-task-1-implementation-report-20260712-v2`; it must not create or overwrite `IMPLEMENTATION_REPORT.md` or `IMPLEMENTATION_REPORT_V2.md`.
- Main thread persists the exact report after the executor stops.
- Main thread persists the new report as `IMPLEMENTATION_REPORT_V2.md`; v1 remains immutable failed evidence.
- A fresh producer-independent read-only result evaluator inspects actual files, baseline-to-current changes, output, all T1 AC evidence, and protected hashes, returning identity `universal-harness-adoption-task-1-result-qa-20260712-v2` for main-thread persistence as `RESULT_QA_V2.md`; v1 remains immutable.
- Main thread independently checks primary evidence and decides Task 1.
- Task 2-4 remain not started regardless of Task 1 outcome.
