# Task 1 Execution Contract - Deterministic Bundle Compiler And Package Contract

Contract identity: `universal-harness-adoption-task-1-contract-20260712-v1`

Status: `PROPOSED FOR STRICT REVIEW`

Producer may modify or reinterpret this boundary: `no`

## 1. Authority

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| Contract-state baseline | `universal-harness-adoption-task-1-contract-state-baseline-20260712-v1` | `6211ca924ae0ab63104a0814f707bc162f52d254af99e769f02f691bdc4fc670` |
| Protected source hashes | 43-entry manifest | `0e5e14f3e3512a3a102fa51a712b63c5ed097f0acd08ad7cfb8521922b142040` |
| Pre-run untracked hashes | 34-entry authorized Markdown manifest | `44668aa118a56e6ffed3745764ee96abc6a965b103b56c39716db3f797e8f939` |

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

The executor may choose internal module filenames below `src/bundle/` and test filenames below `test/bundle/` when they remain necessary, stdlib-only, and directly traceable to this contract. It may not create another top-level implementation root.

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

Exactly these previously absent roots:

- `packaging/**`
- `src/bundle/**`
- `test/bundle/**`

Temporary validation output may be written only beneath an OS temporary directory created for the command and must not be retained in the repository. No generated `dist/` or archive is committed.

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

`packaging/package-contract.json` must deterministically encode at least:

- package identity: `@guoxiaoshuai2023/oh-my-harness`
- binary identity: `oh-my-harness`
- future binary path owned by Task 2: `bin/oh-my-harness.mjs`
- zero third-party runtime dependencies
- lifecycle runtime boundary: supported Node plus Node standard library only
- helper boundary: Python 3.11 only for the three required shipped Python helper validators; Python is not required to launch lifecycle commands
- required package allowlist contract for future `package.json`: package metadata, binary, lifecycle modules, and generated fixed bundle only; no planning/history, install state, backups, caches, fixtures, local absolute paths, or secrets
- canonical commands:
  - `npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>`
  - `npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>`
  - `npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>`
- stable channel through the same scoped `--package=...@latest` form
- local archive form `npx --yes --package=./<packed-archive>.tgz oh-my-harness <operation> --target <repo>`
- forbidden valid-install forms including unscoped `npx oh-my-harness` and unscoped `--package=oh-my-harness`
- shorter scoped form status: unsupported until direct resolution and binary-execution evidence exists

The JSON schema must require these authority-bearing fields and reject an unscoped package identity or a binary identity other than `oh-my-harness`.

## 8. Fixed Bundle Map And Target Layout

`packaging/bundle-map.json` must enumerate each source file individually. Runtime globbing or source-tree discovery must not decide membership.

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

The managed block is a separate inventory unit sourced from `AGENTS.md` and `packaging/managed-router-block.md`, not an installed file path.

Each map entry must classify required/optional status. Every entry above is required for Task 1; no arbitrary `SKIP` is permitted. Source hashes are observed and recorded in generated provenance, not hardcoded as map authority, so later accepted mapped documentation changes do not require a map change when destination/transformation rules remain stable.

## 9. Controlled Reference Transformation

The compiler may change only:

- source paths to their exact mapped installed paths;
- six profile filenames from `harness-*` to `oh-my-harness-*`;
- package/release identity fields fixed by this contract;
- the transformed evaluator-calibration SHA binding in transformed dependents;
- target-authority/conflict integration text fixed in the managed block.

The replacement table must be explicit and ordered. Unknown source-only runtime references fail the build. Source identifiers may remain only as inventory provenance metadata. Build-time source paths must not authorize install-time source access.

Evaluator calibration must be transformed before dependents. The compiler computes its transformed SHA-256 and replaces the canonical source calibration identity only in transformed reference-bearing dependents that bind that identity. It must not modify the source calibration file.

## 10. Managed Router Block

Use exact stable markers:

```text
<!-- oh-my-harness:start -->
<!-- oh-my-harness:end -->
```

`packaging/managed-router-block.md` must contain the markers exactly once and preserve, from source `AGENTS.md`, these substantive sections with only approved path/name transformations:

- Always-On Hard Gates
- the full Routing Table and all nine factual triggers
- Adaptive Harness Control Plane, including adaptive default and full-v2 compatibility
- Semantic Fidelity Entry Point
- Validation And Reporting Minimums

The block must add only the requirements-mandated integration authority:

- target-repository rules outside the block remain effective;
- if target and Harness authority materially conflict or cannot both be followed, `STOP`;
- neither authority may be silently overwritten, weakened, or taken over.

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

## 13. Required Validation And Evidence

Run at minimum:

1. `node --test test/bundle/*.test.mjs`
2. two clean builds to separate temporary directories using `node src/bundle/build-bundle.mjs --version 0.0.0-task1 --output <temp>`
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
- an allowed root already exists with unexplained content;
- a required source or reference closure cannot be mapped without semantic redesign;
- transformed content needs a semantic change beyond this contract;
- a dependency, `package.json`, binary, installer, docs/CI/source-Harness edit, or Task 2-4 path becomes necessary;
- managed-block preservation or modal force cannot be proven;
- output would contain install state, backups, history, secrets, local absolute paths, or unrelated content;
- a protected or pre-existing untracked path changes;
- an external write, npm auth/scope check/publication, Git stage/commit/push/PR, or secret access becomes necessary.

## 15. Delegation And Reporting Boundary

- Executor nested delegation: prohibited.
- Executor writes report only in its response; it must not create `IMPLEMENTATION_REPORT.md`.
- Main thread persists the exact report after the executor stops.
- A fresh producer-independent read-only result evaluator inspects actual files, diff, output, AC evidence, and protected hashes.
- Main thread independently checks primary evidence and decides Task 1.
- Task 2-4 remain not started regardless of Task 1 outcome.
