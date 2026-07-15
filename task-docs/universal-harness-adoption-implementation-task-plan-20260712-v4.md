# Universal Harness Adoption Implementation Task Plan

Plan identity: `universal-harness-adoption-implementation-plan-20260712-v4`

Status: `PLAN BASELINE - accepted only through the frozen planning-input manifest after strict Pass B`

Canonical path: `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md`

## 1. Planning Authority

### Original Request Anchor

> A user should be able to install a complete, fixed Harness release into an existing repository with one stable command, and update or uninstall it with one stable command.
>
> Installation, update, and uninstall must not silently overwrite or take ownership of target-owned content or uncommitted/untracked work. Modified Harness-owned content may be replaced or removed only after deterministic backup, explicit path-specific disclosure, and explicit confirmation.
>
> The product should be safe by namespace and precise ownership, not by attempting to understand and reconcile every governance system in the repository.

### Frozen Requirements

- Path: `task-docs/universal-harness-adoption-requirements-20260712.md`
- Identity: `universal-harness-adoption-requirements-20260712-v5`
- SHA-256: `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`
- Review decision supplied by the user: `PASS`

### Frozen Pass A

- Path: `task-docs/universal-harness-adoption-plan-review-pass-a-20260712.md`
- Identity: `universal-harness-adoption-plan-review-pass-a-20260712-v1`
- SHA-256: `595c7519b9f607a1496df87007467acd637094a2cde89dc0266e0b8123d695cc`
- Isolation: produced before this plan existed; no superseded adoption plan or contract was used as authority

### Current-State Package Identity Decision

- Finding path: `task-docs/universal-harness-adoption-external-plan-review-20260712-v1.md`
- Identity: `universal-harness-adoption-external-plan-review-20260712-v1`
- SHA-256: `80f7122ee3aa609f9baeeebb2f9b30394f6f8df1bf46154e699f1e9ab0c89212`
- Read-only evidence: unscoped npm package `oh-my-harness@0.18.0` resolves to unrelated repository `github.com/kyu1204/oh-my-harness`
- Substantive user decision: use npm package identity `@guoxiaoshuai2023/oh-my-harness`; preserve product/repository name, binary `oh-my-harness`, `.oh-my-harness/` namespace, and `oh-my-harness-*` agent prefix

Plan v3, Pass B v3, and accepted manifest v1 are superseded planning history after this new evidence. They remain protected but cannot authorize Task 1.

Superseded adoption requirements, plans, contracts, reviews, and exhaustion artifacts remain protected historical evidence only. They do not supply architecture, task boundaries, or acceptance rules for this plan.

## 2. Planning Topology And Risk

The main thread selected this topology:

```text
main-thread requirements and repo inspection
-> isolated focused reviewer Pass A
-> main-thread gap analysis and plan authorship
-> same independent reviewer Pass B
-> main-thread finding disposition and final planning manifest
-> stop
```

This is the smallest sufficient topology for a HIGH Semantic Risk, multi-surface planning result. A separate planner was omitted because requirements reconstruction, architecture choice, and plan authorship were explicitly retained by the main thread. Solution design, contract review, executor, Result QA, Git delivery, and publication are not part of this planning task. Pass A/Pass B remains mandatory because transformed governance can pass structural checks while losing user intent.

- Operational Risk of this planning task: `LOW`; it writes planning artifacts only.
- Operational Risk of planned implementation: `HIGH`; update and uninstall replace or remove managed content.
- Semantic Risk: `HIGH`; the package transforms and redistributes safety, routing, profiles, protocols, templates, and calibration.

## 3. Run-Level Outcome Contract

Outcome Contract identity: `universal-harness-adoption-outcome-contract-20260712-v1`

This section becomes frozen with the accepted plan hash.

Required outcomes:

1. A versioned release artifact contains one complete fixed Codex repo-local Harness bundle and one stable lifecycle CLI.
2. Install, update, and uninstall inspect and affect only the exact inventory-owned surface plus the managed `AGENTS.md` block.
3. Existing target governance and dirty work remain target-owned and unchanged unless the content is already Harness-owned and the modified-content backup/confirmation rule is satisfied.
4. The installed Harness preserves the source Harness's safety floor, adaptive main-thread orchestration, semantic gates, six role boundaries, evaluator calibration binding, executor boundary, and modal force.
5. Every lifecycle result is auditable through immutable inventory, mutable state, exact operation reporting, and direct evidence for all twelve acceptance scenarios.

Forbidden substitutions:

- manual source copying presented as installation;
- runtime source scanning or capability reconciliation presented as a fixed bundle;
- a one-line router pointer presented as the managed control block;
- file existence, hashes, TOML parsing, or smoke checks presented as semantic fidelity;
- namespace or filename similarity presented as ownership;
- generalized transactions, crash recovery, migration, config merge, multi-runtime, or global installation presented as MVP requirements;
- local package packing presented as public registry publication.

Protected state:

- frozen requirements, Pass A, accepted plan/review/manifest, and superseded historical artifacts;
- source Harness semantics except for deterministic name/path/release-identity transformation and the new target-authority/conflict integration statements required by v5;
- target-owned files, outer `AGENTS.md` bytes, existing agents/frameworks, dirty work, and target-owned backups;
- secrets, registry credentials, release tokens, and external publication state.

Required outcome evidence:

- complete source-to-target mapping and reference-closure report;
- transformed-file and modal-force comparison, with semantic review independent of the producer;
- package allowlist/inventory/hash evidence and two-build determinism evidence;
- direct lifecycle evidence for all twelve scenarios;
- write-confinement, outer-byte, path-containment, ownership, backup, and incomplete-state evidence;
- package dry-run/pack inspection and CI results;
- producer-independent Result QA per delivery unit when triggered and main-thread primary-evidence acceptance.

## 4. Current-State Facts And Gap Inventory

### Git And Workspace

- Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-universal-adoption`
- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked branch delta: empty
- Staged delta: empty
- Untracked files at plan v4 drafting before its new review/manifest: 32, comprising requirements v5, protected superseded adoption history, plan v1-v3 review history, accepted manifest v1, the external finding, and plan v4
- No implementation file has changed in this planning task.

The branch name reflects the superseded task, but its tracked base is current `origin/main`. The name is not architecture authority. Implementation must not begin until a task boundary records the then-current branch/base plus metadata-only inventory for unknown untracked entries and hashes only for explicitly authorized, known non-sensitive artifacts.

### Existing Harness Surface

| Surface | Current fact | Required gap closure |
| --- | --- | --- |
| Router | Root `AGENTS.md` contains hard gates, nine route triggers, adaptive control, semantic entry, and reporting minimums. | Produce one marker-owned target block that preserves these controls, rewrites routes, preserves target authority, and adds conflict STOP without replacing outer bytes. |
| Routed docs | Seven files under `docs/agent-routing/`. | Map deterministically under `.oh-my-harness/docs/agent-routing/` and close all runtime references. |
| Protocols | Adaptive, semantic-fidelity, and run-directory protocols use `task-docs/_harness/*` paths. | Map under `.oh-my-harness/protocols/` with path-only rewriting and semantic comparison. |
| Templates | Thirteen templates contain source paths, profile names, and calibration bindings. | Map under `.oh-my-harness/templates/`, rewrite references deterministically, and preserve required fields/modal force. |
| Calibration | Canonical evaluator calibration plus adaptive acceptance matrix; the matrix embeds the current calibration hash/path. | Map under `.oh-my-harness/calibration/`, recompute transformed calibration identity, and update only its path/hash binding in transformed dependents. |
| Profiles | Six `harness-*.toml`; three evaluators are read-only and all profile names already use `oh_my_harness_*`. | Install as six `.codex/agents/oh-my-harness-*.toml`; rewrite installed paths while preserving prompts, permissions, independence, and strict boundaries. |
| Scripts | Three stdlib Python helpers; smoke validators disclaim semantic proof. | Ship all three under `.oh-my-harness/scripts/`, preserve stdlib-only behavior/evidence limitations, document Python 3.11 as helper-only runtime, and validate them from the final packed layout. |
| Architecture/support | README, architecture, adapter, adoption docs, minimal example, and optional config example contain source-path references. | Include only the explicit support-document closure selected below and rewrite its references; do not discover support files dynamically. |
| Distribution | README uses manual `cp`; no package manifest, lockfile, CLI, bundle builder, or release config exists. | Add one versioned package, fixed package allowlist, deterministic builder, and stable lifecycle binary. |
| Lifecycle | No inventory, install state, marker parser, exact discovery, path guard, backup, install/update/uninstall, or incomplete-state handling exists. | Implement the exact v5 lifecycle without generalized reconciliation or recovery. |
| CI | Python 3.11 compile/TOML/router/adaptive checks only. | Retain existing checks and add package build, package-content, lifecycle fixtures, semantic mapping, and twelve-scenario coverage. |
| Publication | No root license file; no registry configuration or credentials. | Treat local release-ready package evidence as implementation acceptance; actual publication and license selection remain separate owner-authorized release work. |

### Current Behavior Authorities And Potential Conflicts

- `AGENTS.md` and routed docs own source safety/routing semantics. The generated block may not replace root `AGENTS.md` or become a weaker authority.
- Adaptive topology authority remains in the adaptive protocol; package or installer code must not define a competing workflow.
- Semantic fidelity and evaluator calibration remain behavior-shaping authorities. Generated-path validation cannot replace their semantic review requirements.
- Runtime adapter behavior remains in six TOMLs and `docs/adapters/codex-subagents.md`; package metadata must not reinterpret role authority.
- `bundle-inventory.json` is immutable release metadata. `install-state.json` is mutable target state and cannot hash or own itself.
- README and adoption docs are explanatory entry points. They cannot override lifecycle protocol/spec or code behavior.
- The current CI fixture validator is structural smoke only. New package checks must keep that limitation explicit.

## 5. Minimal Coherent Architecture

The implementation uses three narrow planes:

```text
release plane
  explicit bundle map -> deterministic transform -> immutable inventory -> npm package

target lifecycle plane
  package CLI -> exact-path inspection -> summary/confirmation -> namespaced write/block edit
  -> payload verification -> mutable install state -> state verification

evidence plane
  isolated repo fixtures -> lifecycle/semantic validators -> CI/package inspection
```

There is no capability catalog, target-governance parser, semantic-equivalence engine, migration framework, adapter framework, or dynamic source scan.

### Package And Command Choice

Use one versioned npm package with:

- npm package identity `@guoxiaoshuai2023/oh-my-harness` and package binary `oh-my-harness`;
- a single `oh-my-harness` binary;
- ECMAScript modules implemented with Node standard-library APIs only;
- no third-party runtime dependency;
- an explicit `package.json.files` allowlist;
- a deterministic prepack/build step that emits the fixed bundle and inventory;
- exact version-pinned command forms using `npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>`, the target version for `update`, and a compatible version for `uninstall`;
- stable-channel forms using `--package=@guoxiaoshuai2023/oh-my-harness@latest`, with the resolved immutable package/bundle version recorded before target writes;
- local acceptance forms using `npx --yes --package=./<packed-archive>.tgz oh-my-harness <operation> --target <repo>`;
- a negative invariant that unscoped `npx oh-my-harness`, `npx --package=oh-my-harness`, or equivalent unscoped installer guidance is never emitted or documented;
- a shorter scoped form only if direct command testing proves it resolves `@guoxiaoshuai2023/oh-my-harness` and invokes the intended `oh-my-harness` binary.

Canonical commands:

```bash
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> \
  oh-my-harness install --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> \
  oh-my-harness update --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> \
  oh-my-harness uninstall --target <repo>
```

Why npm:

- it supplies explicit package versions and a fixed package file list without source cloning;
- `npx` provides a stable one-command entry for an installer without modifying the target's own package configuration;
- it matches the deliberately limited GSD product pattern in v5;
- Node standard library is sufficient for JSON, hashing, paths, file writes, prompts, and tests, so no third-party dependency is needed;
- the package can be validated locally with `npm pack` without publishing or accessing credentials.

The package process may execute the released installer itself. The installer must never execute the target repository's package manager, hooks, scripts, plugins, CI, or validators.

Lifecycle commands require only the selected supported Node runtime and Node standard-library APIs. Python is not required to launch install, update, or uninstall. Python 3.11 is a documented prerequisite only for users who run the three required shipped helper validators from `.oh-my-harness/scripts/`; those helpers remain required payload and must not be rewritten to Node or silently made optional.

The scoped package identity, binary, lifecycle subcommands, and command relationships above are fixed implementation inputs. Registry scope access/ownership verification, license, signing, credentials, and publication remain outside implementation acceptance. If the owner cannot authorize the scoped registry identity, publication stops for a new user decision and corresponding package/docs rebuild; implementation must not fall back to or publish the unrelated unscoped package.

### Fixed Source-To-Target Mapping

Task 1 must encode this mapping in an explicit checked-in bundle map. It may enumerate files individually, but it may not glob or discover the release surface at runtime.

| Source group | Installed destination | Rule |
| --- | --- | --- |
| Managed router source derived from the required sections of root `AGENTS.md` | marker-delimited root `AGENTS.md` block | Preserve hard gates, routes, adaptive/semantic/reporting force; add only required target-authority/conflict integration text. |
| `docs/agent-routing/*.md` | `.oh-my-harness/docs/agent-routing/*.md` | Required, one-to-one path rewrite. |
| `docs/architecture.md` | `.oh-my-harness/docs/architecture.md` | Required support authority. |
| `docs/adapters/codex-subagents.md` and `.codex/config.example.toml` | `.oh-my-harness/docs/adapters/` | Required support closure; config stays an example and is never installed as target `.codex/config.toml`. |
| Existing README, adoption, and minimal-router example files that Task 1 proves are referenced by installed calibration/docs | `.oh-my-harness/docs/source-support/`, `.oh-my-harness/docs/adoption/`, or `.oh-my-harness/docs/examples/` | Include only files that exist and are explicitly enumerated in the accepted Task 1 map; no dynamic directory scan. |
| Adaptive, semantic, and run-directory protocols | `.oh-my-harness/protocols/*.md` | Required, one-to-one semantic content with path rewrite. |
| Thirteen templates | `.oh-my-harness/templates/*.md` | Required, preserve fields and modal force. |
| Evaluator calibration and adaptive acceptance matrix | `.oh-my-harness/calibration/*.md` | Required; transformed calibration hash/path binding is regenerated deterministically. |
| Three Python helpers | `.oh-my-harness/scripts/*.py` | Required, preserve stdlib-only behavior and evidence disclaimers. |
| Six `harness-*.toml` | six `.codex/agents/oh-my-harness-*.toml` | Required; filename/path rewrite only, with role invariants preserved. |
| `bundle-inventory.json` | `.oh-my-harness/bundle-inventory.json` | Generated immutable release metadata; no self-hash. |
| target-local state | `.oh-my-harness/install-state.json` | Generated after payload verification; not a release payload hash entry and never self-owned/self-hashed. |

Task 1 must resolve every support-file decision into the explicit map. A source identifier may remain only in inventory provenance fields. All runtime/reference-bearing transformed content must use installed paths.

New release-only specification or runbook files created after Task 1 are source-package documentation by default, not target payload. Adding one to the installed bundle requires reopening Task 1 with a versioned map/inventory boundary before downstream package acceptance; Task 4 cannot expand the map implicitly.

### Ownership And Lifecycle Model

- Inventory defines immutable expected release bytes and exact target destinations.
- Valid old install state proves replace/remove ownership.
- The new inventory permits creation only for a newly required absent path.
- Existing unowned content is `CONFLICT`; it is never adopted.
- The exact marker block is Harness-owned; outer bytes are target-owned.
- Backups are created under `.oh-my-harness-backups/<operation-id>/`, verified for the current operation, then become target-owned historical artifacts.
- The success state is written only after payload/block verification and verified afterward.
- Uninstall removes proven payload/block ownership, verifies target preservation, then deletes state last.
- Capturable failure stops later writes and reports incomplete state. The next lifecycle invocation detects mismatch; there is no generalized rollback/crash-recovery system.

## 6. Harness Semantic Non-Regression Strategy

Structural and semantic evidence are separate.

1. **Complete mapping:** every required source asset has one explicit destination and source hash; every transformed file has a target hash and inventory entry.
2. **Controlled transformation:** transformations are limited to approved path tokens, profile filenames, package/release identity fields, transformed calibration identity, and required managed-block integration text. Any other byte change is a build failure unless independently reviewed as a requirements-mandated documentation change.
3. **Reference closure:** a reference report classifies every source-only token as transformed runtime reference, inventory provenance, or build-time-only source reference. Runtime dangling references fail.
4. **Modal-force ledger:** source and transformed `MUST`, `MUST NOT`, `STOP`, required/forbidden action, trigger, permission, and independence statements are compared. Downgrade or omission fails.
5. **Managed-block ledger:** each source hard gate, route trigger, adaptive state, semantic entry, and reporting minimum maps to exact block text; target-authority preservation and material-conflict STOP are additive required controls.
6. **Profile six-row ledger:** each role records source/target hashes, permissions, sandbox, mission, evidence, stops, no-fan-out, no-fabrication, and non-transferable authority. Evaluators retain read-only, independence, primary evidence, strict verdict, no repair, and canonical calibration binding. Executor retains one-boundary-only, allowed/protected paths, stop/escalation, no self-approval, and no fabrication.
7. **Adaptive compatibility walkthroughs:** installed assets demonstrate adaptive default, explicit/stricter-policy required full v2, and evidence-backed deliberate full v2. Full v2 remains composable without becoming the default.
8. **Independent semantic review:** a producer-independent reviewer compares source and installed artifact content/ledgers. Passing hashes, TOML parsing, link checks, or router smoke cannot satisfy this gate alone.
9. **Target authority fixture:** existing target rules remain effective outside the managed block; a material conflict that cannot satisfy both authorities produces STOP.

## 7. Delivery Units

### Task 1 - Establish The Deterministic Bundle Compiler And Package Contract

**User/architecture result**

A checked-in explicit map, deterministic compiler, managed-block source, schemas, and npm package contract produce an inspectable provisional bundle directory and immutable inventory from any stable accepted source state. Task 1 proves compiler determinism and the package contract, but it does not claim a runnable npm package before the lifecycle binary exists. Task 4, after package code and mapped documentation are final, owns the final release-candidate payload/inventory/package identity.

**Dependencies**

- Frozen requirements v5, Pass A, accepted plan, and run-level Outcome Contract.
- Current source Harness hashes captured in the Task 1 boundary.
- No dependency on superseded adoption artifacts.

**In scope**

- fixed npm package contract consumed by Task 2, including name, binary path, command relationship, allowlist requirements, and no-third-party-dependency rule;
- explicit bundle map and deterministic transformer;
- managed router-block source/generator;
- immutable inventory generation and validation;
- reference rewriting, calibration-identity regeneration, source/target hash report;
- package allowlist contract and provisional bundle-directory inspection;
- focused bundle-builder tests.

**Out of scope**

- target install/update/uninstall writes;
- install-state generation;
- user confirmation or backup lifecycle;
- CI integration and final twelve-scenario suite;
- README adoption rewrite;
- public package publication.

**Allowed write areas**

- new `packaging/**`
- new `src/bundle/**`
- new `test/bundle/**`

Generated `dist/` and package archives are validation outputs, not committed source unless a later reviewed boundary proves that registry packaging cannot work reproducibly without them.

**Protected paths**

- frozen planning inputs and all superseded history;
- `AGENTS.md`, existing routed docs, protocols, templates, calibration, profiles, scripts, README, architecture, adapter, adoption docs, examples, CI;
- all untracked pre-task files.

**Acceptance criteria**

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

**Evidence and validation**

- source/destination inventory with hashes and reference classifications;
- managed-block and six-profile preservation ledgers;
- two-build comparison;
- provisional bundle file-list/hash inspection against the explicit map;
- Node tests for transformation/inventory validation;
- Python 3.11 compile checks on transformed helper assets and TOML parse checks on transformed profiles;
- `git diff --check` and protected-path before/after hashes.

**Stop conditions**

- a required source asset or reference closure cannot be mapped without semantic redesign;
- transformed content needs an unapproved semantic change rather than name/path/release-identity rewrite;
- compiler or schema implementation requires a third-party dependency not explicitly approved;
- managed-block source cannot preserve source gates/modal force;
- any protected or untracked path changes.

**Downstream handoff**

Freeze compiler behavior, bundle/inventory schema, explicit map identity, marker identity, and package contract for Task 2. Task 2 creates the real package metadata and runnable binary in one coherent unit. Provisional transformed hashes prove Task 1 determinism but are not the final release identity. If later accepted mapped source documentation changes without changing destinations or transformation rules, Task 4 regenerates the final hashes/inventory and reruns the complete package/lifecycle suite. A destination, transformation-rule, marker, schema, or package-contract change reopens Task 1 instead.

### Task 2 - Deliver The Non-Destructive Lifecycle CLI

**User/architecture result**

One stable CLI safely installs, no-op reinstalls, updates, and uninstalls the fixed bundle using exact ownership, one managed block, target-owned backups, containment checks, and truthful incomplete-state reporting.

**Dependencies**

- Accepted Task 1 package contract, compiler, bundle/inventory schema, explicit map, and marker identities.
- A versioned Task 2 boundary that freezes the lifecycle authority and protected Task 1 outputs.

**In scope**

- `install`, `update`, and `uninstall` subcommands and explicit target selection;
- actual `package.json`, lockfile, binary entry, and package scripts conforming to the Task 1 package contract;
- exact-path discovery, summary/dry-run, interactive confirmation, and explicit non-interactive confirmation;
- marker parser/editor and absent/existing `AGENTS.md` ownership modes;
- path normalization, root containment, symlink/special-file rejection, and immediate pre-write recheck;
- per-file temporary/atomic replacement where supported;
- install-state schema/validation and two-stage success ordering;
- same-version no-op;
- update replace/remove/create asymmetry;
- modified managed-content drift, backup, verification, disclosure, confirmation, and target-owned history;
- uninstall state-last semantics and safe directory cleanup;
- capturable partial-failure stop/report/mismatch detection without generalized recovery;
- focused unit/integration tests in isolated temporary repositories.

**Out of scope**

- whole-repo discovery or target semantic analysis;
- arbitrary merge, customization reapply, migration, rollback transaction, power-loss recovery, concurrent installer locking;
- target hook/script/package/CI execution;
- another runtime/global scope;
- public publication or registry access.

**Allowed write areas**

- new `bin/**`
- new `src/installer/**`
- new `test/lifecycle/**`
- `package.json` and `package-lock.json` only for the accepted binary/lifecycle test command surface, with no third-party dependency

Task 1 bundle code and fixtures are read-only unless an implementation finding proves a Task 1 defect; such a finding returns to a revised Task 1 boundary rather than being patched under Task 2 authority.

**Protected paths**

- Task 1 accepted bundle map, generated semantics, reports, contracts, and evidence unless explicitly reopened;
- all source Harness behavior files, docs, CI, planning inputs, superseded history, and pre-existing untracked work.

**Acceptance criteria**

- `T2-AC1`: each command inspects only inventory/profile/AGENTS/state/needed-backup paths, directly overlapping Git state, and required parents; it executes no target code or tooling.
- `T2-AC2`: plan/dry-run output names the version, exact creates/replaces/removals, block action, drift/backups, protected content, conflicts, and verification before confirmation.
- `T2-AC3`: install writes the complete fixed payload and exactly one substantive block, verifies payload/block first, writes state second, verifies state third, then reports success.
- `T2-AC4`: existing outer `AGENTS.md` bytes remain byte-identical; absent-file ownership and later target-added outer content are handled without takeover.
- `T2-AC5`: partial/duplicate/nested/reversed/damaged/lookalike markers stop before modification; `--force`, `--yes`, or another confirmation mode cannot bypass marker, ownership, containment, current-state recheck, backup, or verification gates.
- `T2-AC6`: same-version matching install and same-version matching update are true no-ops with no file, block, timestamp, inventory, or state rewrite.
- `T2-AC7`: update replaces/removes only old state-owned units, creates only newly required absent safe paths, and treats an existing unowned new target as `CONFLICT`.
- `T2-AC8`: install stops before any write when `.oh-my-harness/` is unmanaged/incompatible, a required destination or prefixed profile exists without valid ownership, or dirty/untracked content overlaps an unowned planned destination; update applies the same collision rule to newly required destinations.
- `T2-AC9`: modified managed content is backed up deterministically outside `.oh-my-harness/`, verified against pre-change bytes before replacement/removal and reverified before reporting success, disclosed path-by-path, and explicitly confirmed.
- `T2-AC10`: a later missing target-owned historical backup is informational only; it does not fail health, block lifecycle operations, or authorize recreation/deletion.
- `T2-AC11`: uninstall removes only proven payload/block ownership, preserves target content and backups, verifies preservation, deletes state last, and fails if final state deletion fails.
- `T2-AC12`: every inventory/state/backup path is normalized repo-relative and contained; traversal, absolute/empty/NUL, symlink, and special-file cases stop without outside access.
- `T2-AC13`: confirmation-time paths, ownership, marker state, and relevant bytes are rechecked immediately before mutation; changed plans stop.
- `T2-AC14`: target identity is validated sufficiently to detect obvious wrong-target state use before update/uninstall mutation, without claiming generalized repository identity or trust.
- `T2-AC15`: malformed, incompatible, unverifiable, or ownership-insufficient install state stops update/uninstall; install proceeds only when no unmanaged/conflicting `.oh-my-harness/` surface exists and never infers ownership from names.
- `T2-AC16`: capturable write/verification failure stops later writes, withholds the new success version/state, preserves available backups, and reports exact changed/unchanged paths.
- `T2-AC17`: the next lifecycle invocation detects inventory/state/filesystem mismatch and reports incomplete health without automatic repair or generalized recovery.
- `T2-AC18`: logs, state, errors, fixtures, reports, and user-visible disclosure contain no secret values or unrelated target content. Required backups remain opaque, byte-exact managed-content recovery artifacts: the installer may copy and hash them for authorized verification but must not parse, echo, redact, transform, or semantically inspect their contents.
- `T2-AC19`: the real `package.json` uses name `@guoxiaoshuai2023/oh-my-harness`, the lockfile and binary entry match it, lifecycle scripts conform exactly to the accepted Task 1 package contract, Node lifecycle code has no third-party runtime dependency, and the canonical local packed-archive command invokes binary `oh-my-harness` without Python.
- `T2-AC20`: inventory/install state and compatibility checks record scoped installer identity `@guoxiaoshuai2023/oh-my-harness`, binary/installer version, and bundle compatibility; missing, mismatched, or unscoped package identity is not accepted as this installation's ownership authority for update/uninstall.

**Evidence and validation**

- isolated temporary-repo unit/integration tests for each mutation and STOP path;
- before/after byte hashes for allowed paths and outer `AGENTS.md` segments;
- write-confinement log and changed-path evidence;
- fault injection at payload write, payload verification, state write/verification, and final state deletion;
- install/update collision tables, wrong-target state, invalid-state, force/confirmation bypass, and backup pre-action/pre-success verification evidence;
- containment tests proving no outside reads/writes/deletes;
- state/inventory schema and ownership transition tests;
- local package metadata/bin validation and a packed-archive lifecycle smoke in an isolated temporary repo;
- `npm test`, targeted command dry-runs, `git diff --check`, protected hashes.

**Stop conditions**

- Task 1 inventory/marker/bundle semantics are insufficient or inconsistent;
- safe behavior requires touching an unowned path or executing target code;
- a target path cannot be contained or ownership cannot be proven;
- a requested convenience would require arbitrary merge, generalized transaction/recovery, or another runtime;
- protected state changes or a third-party dependency becomes necessary without approval.

**Downstream handoff**

Freeze exact binary/subcommands/options, package metadata after any Task 2 script update, state format, lifecycle behavior, failure report shape, and accepted fixture APIs for documentation and final acceptance work. Task 4 must not modify these production/package authorities.

### Task 3 - Document The Product And Normative Lifecycle Boundary

**User/architecture result**

Users and maintainers receive exact install/update/uninstall commands, ownership/conflict expectations, package architecture, manifest/state specification, backup behavior, release boundary, and migration from the old manual-copy README without changing Harness orchestration semantics.

**Dependencies**

- Accepted Task 1 package/bundle map and Task 2 command/lifecycle interfaces.
- No dependency on unaccepted Task 4 test results.

**In scope**

- replace README manual-copy Quick Start with exact package commands and lifecycle expectations;
- document release plane, target lifecycle plane, and evidence plane in architecture;
- document source-profile versus installed-profile paths in the Codex adapter;
- add a focused adoption runbook and normative bundle-inventory/install-state/marker specification under `docs/adoption/`;
- document target-owned backup cleanup, conflicts, no-op, incomplete-state behavior, and non-goals;
- document that supported Node plus Node standard library is sufficient for install/update/uninstall, while Python 3.11 is required only to run the three shipped helper validators;
- document canonical scoped commands and forbid unscoped `npx oh-my-harness` guidance;
- document local package validation versus actual public publication.

**Out of scope**

- changing adaptive protocol, semantic protocol, templates, calibration rules, six profile behavior, router semantics, or installer code;
- selecting a license, accessing registry credentials, publishing, signing, or creating a release;
- documenting multi-runtime/global installation or generalized recovery.

**Allowed write areas**

- `README.md`
- `docs/architecture.md`
- `docs/adapters/codex-subagents.md`
- new focused files under `docs/adoption/`
- existing adoption docs only where exact old manual-copy/release guidance must be made consistent

**Protected paths**

- Task 1/2 production code, package artifacts, tests, and accepted evidence;
- `AGENTS.md`, all routed docs, protocols, templates, calibration, profiles, scripts, examples, CI, planning inputs, superseded history, and untracked work unless an exact allowed documentation path above applies.

**Acceptance criteria**

- `T3-AC1`: README presents the three canonical `--package=@guoxiaoshuai2023/oh-my-harness@...` commands and local archive form as the primary path; manual source copying and unscoped `npx oh-my-harness` are not presented as valid managed installation.
- `T3-AC2`: architecture assigns non-conflicting authority to bundle map/inventory, lifecycle code, install state, managed block, target content, backups, fixtures, and docs.
- `T3-AC3`: the adapter clearly distinguishes source `harness-*.toml` from installed `oh-my-harness-*.toml` while preserving all six role boundaries and calibration binding.
- `T3-AC4`: the manifest/state spec defines immutable inventory, mutable non-self-hashing state, exact ownership, asymmetric update permission, marker ownership, containment, and state-last uninstall.
- `T3-AC5`: the runbook explains summary/confirmation, modified managed backup, target-owned backup cleanup, exact conflicts, no-op, incomplete state, and truthful stops.
- `T3-AC6`: docs preserve adaptive default, required full v2, evidence-backed deliberate full v2, main-thread authority, and no fixed seventh agent without redefining them.
- `T3-AC7`: docs consistently state that parsing/hashes/smoke are not semantic proof and that material target/Harness authority conflict causes STOP.
- `T3-AC8`: local implementation acceptance ends at reproducible package/fixture/CI evidence; license, npm scope access/ownership verification, credentials, signing, and actual publication require a later owner decision and external-write boundary.
- `T3-AC9`: README and adoption guidance state that lifecycle commands require only the supported Node runtime, Python 3.11 is helper-validator-only, and all three Python helpers remain required installed payload.

**Evidence and validation**

- command/path/authority terminology matrix across README, architecture, adapter, protocols, templates, calibration, package CLI help, and new adoption docs;
- link/path checks and package-command help comparison;
- before/after review showing no Harness modal-force or profile behavior change;
- `git diff --check` and protected hashes.

**Stop conditions**

- documentation requires changing accepted production behavior or a protected Harness authority;
- exact commands or schema remain unstable;
- publication claims would require credentials, license choice, signing, or external writes;
- docs attempt to restore manual copy, capability reconciliation, multi-runtime, or generalized recovery.

**Downstream handoff**

Provide final source docs and an exact list of mapped source files whose bytes changed to Task 4. Such expected documentation changes supersede Task 1's provisional transformed hashes but do not alter the accepted compiler/map/schema when destinations and transformation rules remain unchanged. Task 4 must regenerate and revalidate the final inventory/package from this stable source state. New release-only docs remain outside the target payload unless Task 1 was explicitly revised and reaccepted.

### Task 4 - Prove Release Readiness And All Twelve Outcomes

**User/architecture result**

The final stable Task 1/2/3 source state produces one final release-candidate package and inventory identity that pass automated and producer-independent verification for all twelve lifecycle scenarios, semantic non-regression, package contents, and documentation/CI consistency, while the package remains unpublished.

**Dependencies**

- Accepted Task 1 bundle builder, Task 2 lifecycle CLI, and Task 3 documentation.
- Stable upstream compiler/map/schema/marker/package contract, lifecycle production/package metadata, and final mapped documentation identities, plus transitive impact review before Task 4 begins.

**In scope**

- isolated synthetic fixture families for all twelve scenarios;
- one synthetic complex ecosystem fixture and optional read-only local dry-run against the named reference repository without hardcoded paths or writes;
- package/release-content validator, reference-closure check, modal-force/profile/block ledgers, and semantic review fixtures;
- CI additions that retain existing Python 3.11/TOML/router/adaptive checks and add Node/package/lifecycle tests;
- final bundle/inventory generation, `npm pack` inspection, stable identity recording, and two-build determinism check from the accepted source state;
- direct packed-layout compilation and applicable execution of all three shipped Python helpers under Python 3.11;
- package/help/docs command validation proving scoped package identity plus binary separation and rejecting every unscoped installer form;
- acceptance matrix mapping every requirement scenario to direct evidence;
- AC-pass-but-user-fail negative fixture.

**Out of scope**

- production-code or source-Harness repairs under Task 4 authority;
- a thirteenth delivery scenario or twelve separate delivery tasks;
- public publish, registry login, release creation, signing, secrets, or license selection;
- target repo code execution or whole-repo scanning.

**Allowed write areas**

- new `test/acceptance/**`
- new test-only fixture and fault-injection support under `test/support/**`
- new release-validation tools under `tools/**`
- `.github/workflows/ci.yml`

The twelve-row acceptance matrix belongs under `test/acceptance/**` or the Task 4 run-evidence directory selected by its future boundary. Task 4 does not add or edit generic `task-docs/_harness/` assets.

**Protected paths**

- all accepted Task 1/2 implementation files, `package.json`, lockfile, and Task 3 docs;
- existing Harness router, routed docs, protocols, templates, calibration, profiles, scripts, examples, planning inputs, and superseded history.

If Task 4 exposes an upstream defect, it must stop, identify Task 1/2/3 as owner, perform transitive impact analysis, and require a revised upstream boundary. Task 4 cannot conceal the defect in tests, docs, calibration, or CI.

**Acceptance criteria**

- `T4-AC1`: CI retains every existing source-Harness check and Python 3.11 setup, adds the selected supported Node runtime, package build, package-content validation, lifecycle tests, and fixture coverage, and proves lifecycle commands have no third-party runtime dependency.
- `T4-AC2`: one matrix maps AS-01 through AS-12 to Task ACs, fixture setup, expected decision, primary evidence, and failure signals; scenarios remain fixtures, not delivery tasks.
- `T4-AC3`: AS-01 through AS-09, AS-11, and AS-12 each have direct isolated lifecycle evidence matching v5, including update add/remove/create, backup deletion, state-last failure, containment, and incomplete-operation follow-up.
- `T4-AC4`: AS-10 intentionally passes structural payload/TOML/route/state checks while changing one outer `AGENTS.md` byte and therefore produces overall `FAIL`.
- `T4-AC5`: write-confinement and exact changed-path evidence prove target-owned ecosystem content remains untouched without hashing or semantically scanning the whole fixture.
- `T4-AC6`: final transformed payload has complete reference closure, valid six TOMLs, all three Python helpers compile and each runs against an appropriate deterministic fixture under Python 3.11 from its final packed installation path, calibration binding is consistent, and no source-only runtime path remains.
- `T4-AC7`: modal-force, managed-block, six-profile, adaptive-three-state, full-v2 composition, executor, evaluator, target-authority, and material-conflict STOP evidence all pass producer-independent semantic review.
- `T4-AC8`: two clean builds from the final accepted source state have identical payload/inventory/file hashes; the final inventory/package identities are recorded; `npm pack --dry-run --json` and archive inspection contain only the fixed release surface and no state, backups, dirty history, secrets, caches, or local absolute paths.
- `T4-AC9`: README, architecture, adapter, lifecycle spec/runbook, package CLI help, protocols, templates, calibration, and CI consistently use scoped package `@guoxiaoshuai2023/oh-my-harness`, binary `oh-my-harness`, installed namespace/prefix, Node lifecycle prerequisite, Python 3.11 helper-only prerequisite, authority, evidence limits, and publication boundary.
- `T4-AC10`: producer-independent Result QA inspects actual package contents, source/target diffs, all twelve fixtures, and semantic ledgers; main-thread final acceptance inspects primary evidence separately.
- `T4-AC11`: package metadata, help output, README, runbook, examples, tests, and packed archive contain no valid-install guidance using unscoped `oh-my-harness`; a negative fixture fails any emitted `npx oh-my-harness` or unscoped `--package=oh-my-harness` command.

**Evidence and validation**

- CI command transcript and local equivalent commands;
- twelve-row acceptance matrix and fixture results;
- negative-fixture output;
- final source-to-target inventory, transformed hashes, reference report, and semantic ledgers;
- package dry-run/archive listing and two-build comparison;
- scoped-package/binary command matrix, unscoped negative-fixture output, and packed-layout Python 3.11 helper results;
- complete Git status, allowed changed paths, staged/committed delta, protected hashes, metadata-only inventory for unknown untracked entries, and hashes only for explicitly authorized known non-sensitive artifacts;
- producer-independent QA and main-thread evidence decision as gates, not delivery tasks.

**Stop conditions**

- any scenario is represented only by a string/ID check rather than behavior evidence;
- structural checks are claimed as semantic proof;
- an upstream defect requires production/doc modification outside Task 4 authority;
- CI/package validation requires secrets, publication, target code execution, or an unapproved dependency;
- package content includes mutable state, backups, history, caches, local paths, or unrelated files.

**Downstream handoff**

After strict Task 4 acceptance, stop at a locally release-ready, unpublished package with one final inventory/package identity. Git commit/PR and public registry publication are separate user-authorized transitions.

## 8. Delivery Dependency Graph

```text
Task 1 deterministic compiler/map/schema/package contract
  -> Task 2 lifecycle CLI
      -> Task 3 product/spec documentation
          -> Task 4 final fixtures, package validation, CI, and semantic acceptance
```

The sequence is intentionally serial. Task 2 consumes Task 1's compiler/map/schema/package contract, not a claimed final payload hash. Task 3 documents accepted commands and may change mapped support-document bytes without changing their accepted destinations or transformation rules. Those changes explicitly supersede Task 1's provisional generated hashes. Task 4 then builds the only final release-candidate inventory/package identity from the stable accepted Task 1/2/3 source state and reruns the complete lifecycle/semantic suite. Task 4 cannot edit upstream package metadata, production code, map, schema, marker, or docs. Artificial parallelism would create stale package or command evidence.

## 9. Acceptance Scenario Coverage

| Scenario | Owning implementation ACs | Final evidence |
| --- | --- | --- |
| AS-01 Empty repo install | T1-AC2..T1-AC8; T2-AC2..T2-AC4; T2-AC19..T2-AC20; T4-AC3 | Runnable scoped local package, package/state compatibility identity, complete target tree, payload/block/state verification, ownership inventory. |
| AS-02 Large `AGENTS.md` | T2-AC4; T4-AC3 | Pre/post outer-byte hashes and exactly one block. |
| AS-03 Existing ecosystem | T2-AC1; T4-AC5 | Exact allowed-path/write-confinement evidence, no whole-repo semantic scan. |
| AS-04 Same-version no-op | T2-AC6; T4-AC3 | Install and update no-op before/after hashes including unchanged inventory/state/timestamp. |
| AS-05 Clean update | T2-AC7; T2-AC20; T4-AC3 | Scoped package/state compatibility, one replacement, one removal, one absent-only creation, block/state/reference verification. |
| AS-06 Modified managed file | T2-AC9..T2-AC10; T4-AC3 | Backup byte match before mutation and before success, disclosure/confirmation, later backup deletion remains non-blocking. |
| AS-07 Unowned collision | T2-AC7..T2-AC8; T2-AC15; T4-AC3 | Install unmanaged namespace/profile/dirty collision and update newly-required-path collision reports with zero writes. |
| AS-08 Damaged marker | T2-AC5; T4-AC3 | Marker variants and byte-identical target. |
| AS-09 Safe uninstall | T2-AC11; T2-AC14..T2-AC15; T2-AC20; T4-AC3 | Scoped installer compatibility, ownership/target identity/state validation, deletion set, target preservation, state-last ordering and injected state-delete failure. |
| AS-10 AC-pass-but-user-fail | T1-AC8..T1-AC10; T4-AC4 | Structural PASS plus outer-byte mutation yields strict FAIL. |
| AS-11 Containment | T2-AC5; T2-AC12..T2-AC13; T4-AC3 | Traversal/symlink/special-file STOP, force-bypass rejection, and outside-path non-access evidence. |
| AS-12 Incomplete operation | T2-AC16..T2-AC17; T4-AC3 | Fault injection, truthful partial report, withheld success, next-invocation mismatch. |

No scenario is a delivery task. Task 4 collects the fixture matrix and final evidence after Tasks 1-3 create the product behavior.

## 10. Dirty Worktree And Protected History Plan

Before every task contract and executor launch:

1. verify requirements, accepted plan, Pass A, Pass B, and planning manifest hashes;
2. record branch, HEAD, `origin/main`, merge base, full status, staged/committed delta, and allowed changed-path baseline;
3. record path/status/type metadata for every untracked entry without opening unknown content; content-hash only the known, explicitly authorized, non-sensitive Markdown planning/history artifacts already identified in this worktree;
4. hash all upstream accepted implementation paths and evidence;
5. prohibit overwrite, deletion, rename, staging, or cleanup of any pre-existing untracked path; if an unknown untracked entry overlaps an allowed write, stop for user direction rather than reading or hashing it;
6. compare post-task status and hashes against allowed writes and protected inventory.

Current protected superseded families include all `task-docs/universal-nondestructive-harness-adoption-*` files and `task-docs/history/universal-nondestructive-harness-adoption-20260712/**`. These known Markdown artifacts have already been explicitly inspected as task documents and may have their current hashes copied into the first implementation boundary baseline. Unknown future untracked content, `.env*`, credentials, or private material must not be opened for preservation hashing.

The frozen v5 requirements remain untracked at planning time. Its authority comes from user acceptance, identity, and hash; implementation may not edit it.

## 11. Publication Boundary

Implementation acceptance may:

- build locally;
- run tests and fixtures;
- run `npm pack`/dry-run inspection without registry authentication;
- validate package metadata, file contents, and commands against a local archive;
- document the intended stable and explicit-version command forms.

Implementation acceptance may not:

- assert npm scope access, authentication, or publication rights that were not verified;
- choose a license on the owner's behalf;
- authenticate to npm or another registry;
- publish, deprecate, tag, sign, create a release, or modify external package state.

Actual open-source publication requires a later owner decision on license and verification of access to the fixed `@guoxiaoshuai2023` npm scope, plus an exact high-impact external-write boundary, dry-run/preview, confirmation, and producer-independent verification. A locally valid scoped archive is release-ready evidence, not proof of registry access or publication.

## 12. Decisions Left To Single-Task Boundaries

The plan fixes npm package identity `@guoxiaoshuai2023/oh-my-harness`, binary `oh-my-harness`, canonical scoped version-pinned/stable-channel/local-archive command relationships, Node-standard-library-only lifecycle behavior, Python 3.11 helper-validator prerequisite, mapping model, lifecycle semantics, and task ownership. Individual accepted boundaries may still decide:

- initial local package version and non-authority package metadata fields other than the fixed name/binary;
- supported Node engine version based on then-current supported-LTS evidence;
- exact JSON field names and schema version numbers consistent with v5 responsibilities;
- exact marker strings and owned delimiter whitespace;
- exact target identity representation;
- operation-ID format and backup filename encoding;
- standard-library atomic replacement APIs and platform-specific error normalization;
- internal module/file names within each allowed directory;
- test fault-injection seam and fixture implementation;
- whether generated `dist/` remains ephemeral or a later release process needs a committed artifact, with reproducibility evidence;
- optional support file classification only within the explicit reference closure, never runtime discovery.

These choices cannot change ownership, discovery, safety, semantics, package system, command responsibilities, allowed runtime, or publication boundary.

## 13. Plan-Level Stop Conditions

Stop and return to planning or user decision if:

- the requirements, accepted plan, Pass A/B, or manifest hash changes;
- a task needs whole-repo capability discovery, semantic equivalence, arbitrary config merge, migration, automatic reapply, generalized transaction/recovery, multi-runtime, global installation, concurrency coordination, or target-specific logic;
- package implementation requires an unapproved third-party dependency;
- source Harness semantics cannot be preserved through controlled transformation plus the required integration block;
- npm scope access, registry authentication/publication, or license is treated as implicitly authorized, or implementation falls back to the unrelated unscoped package;
- a task would overwrite protected history, target-owned content, or another task's accepted result;
- an upstream revision invalidates downstream accepted evidence without transitive impact analysis and new versioned boundaries.

## 14. Adaptive Post-Plan Handoff

After the user separately authorizes implementation, the main thread must reassess topology for each delivery unit rather than automatically run all six profiles. Because these tasks affect protected files and HIGH Operational or Semantic Risk outcomes, each write attempt requires:

- a stable versioned, producer-nonmodifiable task boundary with exact allowed/protected paths, ACs, evidence, stops, and upstream identities;
- read-only independent boundary scrutiny appropriate to the task before protected writes;
- a bounded producer that cannot expand or rewrite its own authority;
- producer-independent result verification against primary package, diff, fixture, semantic, and protected-state evidence;
- main-thread transitive impact analysis, evidence synthesis, and final task acceptance.

Those controls may be supplied by focused capabilities or direct main-thread work with the required independence preserved. They do not mandate the complete six-role sequence. Complete v2 becomes mandatory only if the user explicitly requests it or a stricter downstream policy requires it; the main thread may otherwise deliberately select it only with the full task-specific evidence record required by the adaptive protocol.

No Task 2 boundary starts before Task 1 acceptance. No Task 3 boundary starts before Task 2 acceptance. No Task 4 boundary starts until stable Task 1/2/3 identities and mapped-source impact are recorded.

## 15. Planning Completion Boundary

This plan does not authorize Task 1 contracting or implementation. After a fresh reviewer performs Pass B against frozen Pass A and this exact plan, the main thread will either revise through a new plan identity or create an accepted planning-input manifest recording requirements, Pass A, plan, and Pass B identities/hashes. It will then stop.

No installer, bundle, package, CLI, Harness behavior file, README, CI, release config, contract, commit, push, PR, or publication is created by this planning task.
