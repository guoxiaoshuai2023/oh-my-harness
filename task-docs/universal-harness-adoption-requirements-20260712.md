# Universal Harness Adoption Requirements

Baseline identity: `universal-harness-adoption-requirements-20260712-v5`

Status: `REQUIREMENTS BASELINE`

Canonical path: `task-docs/universal-harness-adoption-requirements-20260712.md`

This document is the sole requirements authority for the new Universal Harness Adoption implementation-planning task. V5 closes the new-file update permission and target-owned backup health findings from the focused review of v4. It does not authorize implementation. Material changes to the installation layout, bundle contract, ownership boundary, AGENTS.md integration, lifecycle behavior, or Harness-validity outcomes require a new baseline version.

## 1. Original Request Anchor

> oh-my-harness is an open-source Harness project.
>
> A user should be able to install a complete, fixed Harness release into an existing repository with one stable command, and update or uninstall it with one stable command.
>
> Installation, update, and uninstall must not silently overwrite or take ownership of target-owned content or uncommitted/untracked work. Modified Harness-owned content may be replaced or removed only after deterministic backup, explicit path-specific disclosure, and explicit confirmation.
>
> The product should be safe by namespace and precise ownership, not by attempting to understand and reconcile every governance system in the repository.

The repository at `/Users/yurendao45/Vibe Coding Projects/The Path to Financial Freedom` is a read-only acceptance case. Its OpenCLI integration, domain rules, directory structure, tools, and dirty state are not generic architecture inputs and must not appear as installer defaults.

## 2. Problem Statement

The current oh-my-harness repository contains the Harness architecture but distributes it as source files with source-repository paths. Its README still instructs users to clone or copy `AGENTS.md`, routed docs, protocols, templates, profiles, and scripts manually.

Manual copying is unsafe and difficult to update:

- root `AGENTS.md` may already be the target repository's authority;
- current Harness references point to source paths such as `docs/agent-routing/*` and `task-docs/_harness/*`;
- `.codex/agents/` may already contain agents from another framework;
- users cannot reliably tell which files a later update may replace or uninstall;
- a source-tree scan can accidentally turn packaging into a dynamic governance redesign.

The required product is smaller: publish one fixed Harness bundle, install it into a reserved namespace, expose it through one precisely managed AGENTS.md block, and manage only the resulting owned surface.

## 3. Superseded Problem Definitions

Previous adoption requirements, MVP requirements, plans, contract iterations, reviews, baselines, and exhaustion records remain preserved as historical evidence but are superseded and are not implementation authority for this baseline.

This includes:

- `task-docs/universal-nondestructive-harness-adoption-requirements-20260712.md`;
- `task-docs/universal-nondestructive-harness-adoption-mvp-requirements-20260712.md`;
- `task-docs/universal-nondestructive-harness-adoption-implementation-task-plan-20260712.md`;
- related accepted-input, Pass A/Pass B, and review artifacts;
- `task-docs/history/universal-nondestructive-harness-adoption-20260712/`.

They must not be deleted or rewritten. They also must not constrain the new implementation with source capability catalogs, distribution-universe authorities, semantic-equivalence systems, generalized reconciliation, complex retry-domain contracting, or crash-recovery architecture.

The earlier design was superseded because it treated the installer as a coordinator among arbitrary governance systems. The new design treats those systems as target-owned content and avoids them through namespace isolation.

## 4. Product Principle

The controlling installation model is:

```text
fixed released version
-> immutable bundle inventory
-> inspect only exact planned target paths
-> display install/update/uninstall summary
-> user confirms
-> write Harness-owned namespace
-> create or replace one Harness-owned AGENTS.md block
-> verify the installed Harness
-> record version and ownership
```

Two principles follow:

> Reduce conflicts through namespace and explicit ownership, not through more complex repository analysis.

> The released bundle inventory defines what the Harness is. Target discovery may decide whether those exact writes are safe, but it must not add, remove, reinterpret, or selectively omit Harness capabilities at runtime.

## 5. MVP Scope

The MVP supports one installation mode:

- Codex repo-local installation into an existing or empty Git repository.

It installs one complete applicable Harness bundle. The MVP does not support selectable installation profiles, capability subsets, global scope, or another runtime. It always installs all six required Codex agent profiles.

The source repository does not need to adopt the target installation layout. A release build may map and rewrite source assets into deterministic target bundle paths before publication.

## 6. Fixed Logical Installation Layout

The released bundle must install into this logical target layout:

```text
.oh-my-harness/
  docs/
    agent-routing/
    architecture.md
  protocols/
  templates/
  calibration/
  scripts/
  bundle-inventory.json
  install-state.json

.codex/agents/
  oh-my-harness-planner.toml
  oh-my-harness-plan-evaluator.toml
  oh-my-harness-solution-designer.toml
  oh-my-harness-solution-evaluator.toml
  oh-my-harness-executor.toml
  oh-my-harness-result-evaluator.toml

AGENTS.md
  one marker-delimited oh-my-harness managed router block

.oh-my-harness-backups/<operation-id>/
  target-owned recovery artifacts created only when needed
```

Minor naming changes are allowed only if implementation planning proves a Codex compatibility requirement and preserves the same namespace and ownership model. The user-visible namespace `.oh-my-harness/`, the `oh-my-harness-*` agent prefix, and the single AGENTS.md managed-block boundary are fixed MVP concepts.

The bundle must include every routed document, protocol, template, calibration asset, script, and support document required for installed references and validation. The fixed inventory, not this illustrative tree, is the final per-release file list. `.oh-my-harness-backups/` is outside the managed namespace and is never part of the bundle inventory.

## 7. Bundle Inventory Contract

Every released Harness version must carry an immutable `bundle-inventory.json` produced as part of that release. It is release payload metadata, not target installation state.

The inventory must define:

- Harness/bundle version;
- required files for Codex repo-local installation;
- explicitly optional support files, if any, that do not affect Harness validity;
- deterministic source-to-destination mapping;
- expected hash of every installed file after release-time path transformation;
- exact Harness-owned target paths;
- expected AGENTS.md managed-block content/hash or equivalent release identity;
- installer/bundle compatibility information.

All applicable required entries must be installed. Runtime discovery must not introduce `SKIP`, profiles, dynamic feature selection, or a source-tree scan that changes the bundle surface.

Expected hashes bind the target bytes shipped by the release, including rewritten namespaced references. They are not computed by scanning arbitrary current `main` contents at install time.

Inventory expected hashes cover immutable released payload files. They do not cover the target-generated mutable `install-state.json`, target identity, operation timestamps, verification results, or backup records. The inventory's own release/package integrity mechanism is an implementation-planning decision and must not create a self-hash requirement.

The installer must reject a missing, malformed, internally inconsistent, incompatible, or incomplete bundle/inventory before target writes.

Source identifiers in the inventory's deterministic source-to-destination mapping are release/build provenance metadata, not runtime references. They may name source-tree paths, but they do not authorize source-tree access at install time and are excluded from dangling runtime-reference checks.

## 8. Source-To-Target Mapping Requirements

The release build must deterministically map current Harness assets into the namespaced bundle. At minimum the mapping must preserve these logical groups:

- `docs/agent-routing/*` -> `.oh-my-harness/docs/agent-routing/*`;
- Harness architecture/runtime guidance needed after installation -> `.oh-my-harness/docs/*`;
- adaptive orchestration, semantic fidelity, and run-directory protocols -> `.oh-my-harness/protocols/*`;
- reusable Harness templates -> `.oh-my-harness/templates/*`;
- evaluator calibration and acceptance material required by the installed profiles -> `.oh-my-harness/calibration/*`;
- shipped helper scripts -> `.oh-my-harness/scripts/*`;
- six Codex profiles -> `.codex/agents/oh-my-harness-*.toml`;
- repo-level router essentials -> the AGENTS.md managed block.

Every runtime reference in transformed reference-bearing content must resolve to an installed target path. Installed docs, protocols, templates, profiles, scripts, and the AGENTS.md managed block must not retain runtime references to source-only paths such as `task-docs/_harness/*`, uninstalled `docs/*`, source profile filenames, or source-repository scripts. Source identifiers held only in immutable inventory provenance fields are not runtime references and are not failures under this rule.

Release-time mapping may rename paths and rewrite known references. Install time must not redesign document semantics or decide which Harness rules survive.

## 9. AGENTS.md Managed Block

The root AGENTS.md is the single integration point between target-owned governance and the namespaced Harness.

### Existing AGENTS.md

When AGENTS.md exists, install appends one release-defined marker-delimited block without changing bytes outside that block. Update may replace only the bytes between the valid Harness markers. Uninstall may remove only the complete valid Harness block and the minimal delimiter whitespace owned with it.

### Absent AGENTS.md

When AGENTS.md is absent, install creates an AGENTS.md containing the managed block and records that the whole file was Harness-created. Uninstall may delete that file only when it still contains exactly the owned Harness content; otherwise it removes only the valid block and preserves remaining target content.

### Required Always-Visible Content

The managed block cannot be a one-line pointer. It must keep the installed Harness control entry visible in every relevant agent session:

- always-on safety gates;
- fixed safety floor and adaptive workflow principle;
- main-thread ownership of topology, synthesis, intervention, and final acceptance;
- route triggers and their namespaced target paths;
- semantic-risk entry point;
- validation/reporting minimums;
- statement that target-repository rules outside the block remain effective;
- STOP rule when target and Harness authority materially conflict or cannot both be followed;
- no silent overwrite, weakening, or takeover of either authority.

Detailed routed docs, protocols, templates, and calibration belong under `.oh-my-harness/`; the block contains only the always-visible gates, routing entry, and concise control-plane summaries needed to reach them.

### Marker Integrity

Marker syntax is stable within the installer compatibility policy. Missing one marker, duplicate pairs, nesting, reversed markers, damaged markers, or an unowned lookalike block is a conflict. The installer must stop and must not guess, normalize, or repair AGENTS.md.

## 10. Harness Ownership Boundary

The Harness owns only:

- released payload files under `.oh-my-harness/` listed as owned in the current valid install state;
- `.oh-my-harness/bundle-inventory.json` as immutable release-owned metadata;
- `.oh-my-harness/install-state.json` as the Harness-owned mutable control file governed by the special state-file rules below;
- `.codex/agents/oh-my-harness-*` files listed as owned in the current valid install state;
- the exact marker-delimited Harness block in root AGENTS.md;
- AGENTS.md as a whole only when the install state proves the Harness created it and it remains Harness-only.

Everything else is target-owned, including:

- AGENTS.md bytes outside the managed block;
- non-Harness files under `.codex/agents/`;
- OpenCLI or other agent-framework files;
- skills, plugins, agents, domain rules, protocols, scripts, CI, and project configuration;
- uncommitted, staged, untracked, or ignored user work;
- any file added by the user inside a directory that is not individually recorded as Harness-owned.

`bundle-inventory.json` is Harness-owned immutable release metadata. `install-state.json` is a Harness-owned mutable control file, but it does not list or hash itself as an owned payload entry. Its ownership follows from this fixed control-file rule, not from a self-reference.

A backup is different: once created under `.oh-my-harness-backups/<operation-id>/`, it is a target-owned recovery artifact. The install state may record its path and originating operation, but that record does not grant permission to overwrite, replace, or delete the backup during a later update or uninstall. Backups survive uninstall and the final report must explain how the user may remove them manually.

Directory existence never grants ownership of unlisted children. Prefix similarity outside the fixed `oh-my-harness-*` target names never grants ownership.

## 11. Target Discovery Boundary

Discovery is limited to the exact install surface defined by the selected bundle inventory:

- inventory destination paths under `.oh-my-harness/`;
- the six `.codex/agents/oh-my-harness-*` target files;
- root AGENTS.md and Harness marker state;
- current `.oh-my-harness/bundle-inventory.json` and `.oh-my-harness/install-state.json`, when present;
- the exact `.oh-my-harness-backups/<operation-id>/` destination when the operation requires a backup;
- Git dirty/untracked state that directly overlaps those exact paths;
- parent-directory readability/writability needed for those paths.

Discovery may report the presence of nearby target-owned content when needed to prove it will not be touched, but it must not:

- scan the repository for capabilities;
- interpret existing skills, plugins, protocols, agents, OpenCLI, or domain rules;
- decide whether two governance systems are semantically equivalent;
- build a source capability catalog;
- dynamically add or remove bundle entries;
- execute target code, hooks, plugins, CI, scripts, package managers, or validators;
- read or output secrets.

Dirty state outside the exact install surface is opaque and preserved. Dirty or untracked state overlapping a planned unowned destination is a conflict. Dirty state inside a recorded Harness-owned unit is handled by the modified-managed-content rules for update or uninstall.

### Path Containment And Filesystem Boundary

Path safety is required even though complex filesystem support is not part of the MVP:

- every target or backup path stored in inventory/install state must be a normalized repository-relative path;
- absolute paths, empty paths, NUL-containing paths, and `..` traversal are invalid;
- the installer must canonicalize the target repository root and prove every resolved destination remains inside it;
- a planned destination or existing parent component that is a symlink, special file, or unsupported filesystem object is a conflict by default;
- install, update, backup, and uninstall must revalidate containment and path type immediately before their write, replacement, copy, or deletion;
- no path read from install state may authorize deletion until it passes normalization, containment, ownership, and current-state checks;
- validation failure must identify the unsafe path without following it outside the repository.

The exact standard-library or platform APIs used for these checks are implementation decisions. The observable containment and STOP behavior are not optional.

## 12. Install Experience

A stable install command must:

1. resolve an explicit released Harness version or a documented stable release channel;
2. load and validate that version's fixed bundle inventory;
3. inspect only the exact target surface;
4. display version, planned creates, AGENTS.md block change, protected target content, conflicts, and verification steps;
5. obtain user confirmation;
6. recheck planned paths and marker state;
7. write bundle-owned files and the managed block;
8. verify payload files, routes, TOML profiles, AGENTS.md block, and remapped references;
9. write `install-state.json` as the success state;
10. verify the install state against the actual payload/block and then report the installed version/ownership.

Install must not proceed when an exact-path or ownership conflict is unresolved. Non-interactive mode may provide explicit confirmation, but it cannot skip inventory validation, path checks, marker checks, ownership boundaries, or post-install verification.

No success may be reported if either payload verification or install-state verification fails. If the same version is already installed and every owned hash/block/state entry matches, install is a no-op and must not rewrite bytes.

## 13. Update Experience

A stable update command must:

1. read the current bundle inventory, install state, and installed version;
2. resolve one explicit released target version and its fixed inventory;
3. compare old recorded Harness-owned content with current bytes and the new bundle;
4. display files to replace, files to add/remove, AGENTS.md block replacement, modified managed content, backups, protected target content, and verification;
5. obtain confirmation;
6. recheck the exact target surface;
7. apply the authorized inventory transition: replace or remove only paths proven owned by the old install state, create only newly required paths from the new inventory whose targets do not exist, and replace the managed block;
8. verify the new payload/block and all installed references;
9. write the new install state/version;
10. verify the install state against the actual installed payload before reporting success.

Update must not modify other files or perform a three-way merge.

Update permissions are asymmetric and exact:

- **replace/remove:** only a path or managed block proven owned by the old valid install state;
- **create:** only a required destination newly introduced by the new fixed inventory, after proving the destination does not exist and its containment is safe;
- **collision:** if a new required destination already exists and is not proven owned by the old installation, update stops with `CONFLICT` rather than adopting or replacing it.

When a recorded Harness-owned file or managed block was modified by the user:

- create a deterministic backup under `.oh-my-harness-backups/<operation-id>/` before overwrite;
- verify that the backup exists and matches the pre-change managed bytes before the destructive replacement/removal and again before reporting the current operation successful;
- display the modified paths and backup location;
- require explicit confirmation that the clean released version will replace the managed content;
- preserve the backup as target-owned recovery content outside the managed `.oh-my-harness/` namespace after update;
- do not automatically reapply or merge the customization.

If confirmation is denied or backup fails, update stops before replacing that content. Project-specific custom rules should live outside the Harness managed block and namespace.

Updating to the already installed matching version is a no-op.

## 14. Uninstall Experience

A stable uninstall command must:

1. validate the current bundle inventory, install state, path containment, and marker state;
2. list exact recorded Harness-owned files and managed block to remove;
3. identify modified managed content and required backups;
4. display target-owned content that will remain;
5. obtain confirmation;
6. recheck ownership and target state;
7. remove only proven Harness-owned files and the managed block;
8. verify those removals and confirm target-owned content/backups remain;
9. delete `.oh-my-harness/install-state.json` as the final owned control-file deletion;
10. remove Harness-created directories only when empty after state-file deletion, then report preserved residue.

Modified managed content must be backed up and explicitly confirmed before removal. Uninstall must not delete a non-Harness file, a non-empty directory containing target-owned content, another framework's agent, or AGENTS.md content outside the block.

Every created backup is target-owned, remains under `.oh-my-harness-backups/` after uninstall, and is reported with manual cleanup guidance. Failure to delete `install-state.json` means uninstall did not complete and must not be reported as successful. If install-state ownership cannot be validated, uninstall stops and reports manual guidance; it does not infer ownership from names alone.

## 15. Install-State Responsibilities

`.oh-my-harness/install-state.json` is the mutable target-local ownership and version record. It is generated by install/update and is distinct from the immutable released `.oh-my-harness/bundle-inventory.json`. It must contain enough information to support install no-op detection, update, verification, backup decisions, and uninstall.

`install-state.json` is a special Harness-owned control file. It must not contain an ownership entry or expected hash for itself. Update replaces it only after payload verification. Uninstall deletes it only after all other owned removals and target-preservation verification succeed; that deletion is required for uninstall success.

At minimum it records:

- install-state format version;
- installed Harness/bundle version;
- compatible installer identity/version;
- target-repository identity sufficient to detect obvious wrong-target use;
- operation identity/timestamp;
- every owned file path and installed expected hash;
- the six owned agent paths and hashes;
- AGENTS.md ownership mode (`created-file` or `managed-block`) and installed block hash;
- prior installed version for update lineage;
- verification result/status;
- backup records created for modified managed content.

The install state does not claim ownership of target-owned content and cannot authorize deletion outside its exact listed surface. Backup records are historical, informational target-owned recovery references, not deletion authority or a continuing Harness-health requirement. A backup created by the current operation must be verified for that operation, but a user may later delete it manually. Its later absence may be reported, but must not create Harness drift, block update/uninstall, authorize recreation, or fail Harness integrity. The state is not required to implement supply-chain-grade provenance, signatures, an external trust anchor, or a generalized ownership database.

Install-state parsing/validation failure is a conflict for update and uninstall. Install may proceed only when no conflicting unmanaged `.oh-my-harness/` surface exists.

## 16. Exact Conflict Conditions

The MVP handles conflicts only on its exact installation surface:

- `.oh-my-harness/` exists without a valid compatible bundle inventory and install state;
- during install, a required inventory destination already exists without valid Harness ownership; during update, a destination to be replaced/removed is not proven owned by the old installation, or a newly required destination to be created already exists without that ownership;
- a `.codex/agents/oh-my-harness-*` target file exists but is not recorded as Harness-owned;
- AGENTS.md contains a missing-half, duplicate, nested, reversed, damaged, or unowned marker set;
- install-state ownership cannot be validated sufficiently for the requested operation;
- an overlapping dirty/untracked path is not already a recorded Harness-owned managed unit;
- an inventory/state path is absolute, empty, traversing, outside the canonical target root, or resolves through a symlink/special-file parent;
- a planned path or AGENTS.md marker state changes after confirmation;
- a required target path cannot be read, backed up, written, or verified safely;
- bundle inventory or transformed-reference validation fails.

Conflict means STOP before the unsafe write. It is not a semantic compatibility decision and does not trigger `INSTALL/MERGE/REUSE/SKIP/CONFLICT` capability coordination.

The report must name the exact path/block, observed state, protected content, and user action required. `--force` must not bypass ownership or marker integrity.

## 17. Write And Failure Boundary

The MVP may use pre-write state checks, per-file temporary writes, atomic replacement where supported, and backups of overwritten/removed managed content.

It is not required to provide a cross-file transaction system or automatic recovery after power loss/process kill. If a write or verification error occurs:

- stop further writes;
- do not record the new version as successfully installed;
- report exactly which owned paths changed and which did not;
- preserve available backups;
- ensure the next install/update/uninstall invocation detects inventory/install-state/filesystem mismatch instead of reporting a healthy installation.

Honest incomplete-state reporting is required. A generalized crash-recovery state machine is not.

## 18. Harness Validity After Install Or Update

Verification must establish at least:

1. the AGENTS.md Harness managed block exists exactly once;
2. bytes outside the managed block are unchanged from the pre-operation target state;
3. the managed block contains the complete release-defined always-on gates, adaptive safety-floor entry, route triggers, semantic-risk entry, target-authority preservation, and conflict STOP rule;
4. every namespaced route target referenced by the block exists;
5. every required bundle file exists at its inventory path and matches the expected released hash;
6. all six installed TOML profiles parse;
7. plan, solution, and result evaluators retain read-only sandbox, independence, primary-evidence, no-repair, and calibration-binding requirements;
8. the executor retains one-boundary-only, allowed-write, protected-state, stop/escalation, no-self-approval, and no-fabrication boundaries;
9. installed templates, protocols, calibration, profile prompts, and docs resolve only to installed namespaced paths or valid repo-level AGENTS.md;
10. no installed runtime/reference-bearing content retains a dangling reference to an uninstalled source path; immutable inventory provenance fields are excluded from this runtime-reference check;
11. target-owned agents, skills, plugins, OpenCLI, scripts, CI, domain rules, and AGENTS.md outer content are unchanged;
12. the immutable bundle inventory matches the released payload, and the mutable install state matches the actual verified payload, block, version, and ownership; backup records must truthfully describe backups verified when created, but later absence of a target-owned historical backup is non-failing.

Verification is two-stage: first verify materialized payload/block validity without relying on a success state; then write the success install state and verify that state against the actual installed surface. Both stages must pass before reporting success.

Check 11 must not expand discovery into a whole-repository content scan. Non-modification evidence is limited to the installer write-confinement log, exact allowed-path before/after evidence, Git changed-path baseline when available, and byte comparison outside the AGENTS.md managed block. The verifier must not read/hash unrelated target agents, skills, plugins, OpenCLI, scripts, CI, or domain content merely to prove they were untouched.

Structural parsing and hash checks verify the released Harness surface. They must not be described as proof that target-domain rules and Harness rules are semantically equivalent. The managed block instead preserves both authorities and requires STOP on material conflict.

## 19. Open-Source Distribution Requirements

The product must provide stable install, update, and uninstall command entry points without requiring a source clone or manual file copying.

Distribution must support:

- explicit released version selection or pinning;
- a documented stable channel that resolves to a released immutable version;
- a complete package containing the installer, fixed inventory, and mapped Harness bundle;
- visible installer/bundle compatibility;
- installed-version reporting;
- rejection of arbitrary branch/main content as an update source;
- reproducible package-content validation before release.

The implementation plan will choose npm, another package system, GitHub Releases, or a combination. This requirements task does not publish a package, access credentials, sign releases, or change the current repository layout.

## 20. GSD Product-Pattern Reference

The new MVP borrows a small product pattern from GSD, not GSD's full implementation.

Verified GSD facts used here:

- GSD exposes a versioned npm package and a fixed npm `files` list rather than requiring users to copy a source tree. ([package.json](https://github.com/open-gsd/gsd-core/blob/next/package.json))
- Its update workflow detects the installed/released version, previews changes, warns about clean replacement, asks for confirmation, and invokes the released package. ([update workflow](https://github.com/open-gsd/gsd-core/blob/next/gsd-core/workflows/update.md))
- It uses `gsd-*`-scoped artifacts and a file manifest with hashes to distinguish managed files and detect modifications. ([installer source](https://github.com/open-gsd/gsd-core/blob/next/bin/install.js))
- It backs up modified managed files and user-added files before clean update. ([update workflow](https://github.com/open-gsd/gsd-core/blob/next/gsd-core/workflows/update.md), [installer source](https://github.com/open-gsd/gsd-core/blob/next/bin/install.js))
- It uses marker-managed instruction/config surfaces and per-file atomic-write helpers in runtime integration code. ([runtime hooks surface](https://github.com/open-gsd/gsd-core/blob/next/src/runtime-hooks-surface.cts))

Adopted patterns:

- versioned package entry point;
- fixed release package/bundle list;
- distinctive filename/namespace prefix;
- marker-owned shared-file block;
- target-local state-backed file ownership and drift detection, inspired by GSD's file manifest;
- clean released-version replacement;
- modified-managed-file backup and explicit user warning/confirmation;
- per-file atomic write where practical.

Not adopted for this MVP:

- GSD's many-runtime registry and conversion layers;
- global installation and local/global detection cascade;
- install profiles, skill clusters, runtime capability descriptors, and hook buses;
- migration engines and legacy cleanup;
- update channels beyond one stable channel plus explicit version pinning;
- automatic three-way customization reapply;
- custom-file reconciliation inside broadly wiped managed directories;
- complex cache invalidation, runtime hook surfaces, or mature recovery behavior.

These exclusions prevent a useful product analogy from becoming another oversized architecture.

## 21. Acceptance Scenarios

The MVP uses these 12 discriminating scenarios:

1. **Empty repository install:** installs the complete fixed version, creates namespaced files and AGENTS.md, verifies, and records ownership.
2. **Large existing AGENTS.md:** inserts one valid managed block while preserving every original byte outside it.
3. **Existing OpenCLI/agent ecosystem:** existing agents, skills, plugins, domain content, scripts, and CI remain unchanged because they are outside the exact install surface.
4. **Same-version reinstall:** matching installation reports no-op and rewrites nothing.
5. **Clean update:** replaces an old state-owned file, removes another old state-owned file, creates one newly required inventory path only after proving it absent, replaces the managed block, and verifies all remapped references and the new state.
6. **Modified managed file:** backs it up, verifies and displays the modification/backup, requires confirmation, then performs clean replacement without automatic merge; later user deletion of that target-owned backup does not make the Harness unhealthy, block update/uninstall, or cause backup recreation.
7. **Unowned exact-path collision:** stops before writing when a namespaced destination exists without valid ownership.
8. **Damaged AGENTS.md marker:** stops without guessing, normalizing, or modifying AGENTS.md.
9. **Ownership-safe uninstall:** removes only install-state-owned payload files and the managed block, preserves target-owned content, backups, and non-empty external directories, then deletes `install-state.json` last; failure of that final deletion makes the operation FAIL.
10. **AC-pass-but-user-fail:** installed files and TOMLs validate, but bytes outside the AGENTS.md block changed; the overall result is FAIL.
11. **Traversal/symlink containment:** an inventory/state path escapes the root or a planned parent is a symlink/special file; install/update/uninstall stops without reading, writing, or deleting outside the canonical target repository.
12. **Incomplete operation:** an injected payload/state write or verification failure stops further writes, does not report success, truthfully reports changed and unchanged paths, preserves available backups, and causes the next lifecycle invocation to detect the mismatch instead of treating the installation as healthy.

## 22. Success Criteria

The requirements are satisfied when a future implementation can prove that:

- one stable command installs a complete fixed Harness release into a Codex repo-local namespace;
- one stable command updates to an explicit released version and one removes the owned installation;
- the bundle inventory, not target analysis, defines the installed Harness;
- target discovery reads only the exact installation surface;
- target-owned governance and work remain untouched;
- the AGENTS.md block remains a real always-visible control/router entry rather than a weak pointer;
- installed namespaced references, six profiles, evaluator/executor boundaries, templates, protocols, calibration, and scripts remain valid;
- modified managed content is backed up and explicitly confirmed before clean replacement/removal;
- historical backup records confer no Harness ownership and a user-deleted target-owned backup does not fail Harness health or block a later lifecycle operation;
- update can replace/remove only old state-owned units and can create a newly required inventory path only when its target is absent and safely contained;
- same-version reinstall is a no-op;
- conflicts stop at exact path/marker/ownership boundaries;
- uninstall removes only install-state-owned units, preserves target-owned backups outside the managed namespace, deletes `install-state.json` last, and does not claim success if that deletion fails;
- all 12 acceptance scenarios have direct PASS/FAIL evidence.

## 23. Explicit MVP Exclusions

The implementation plan must not reintroduce:

- whole-repository capability discovery;
- semantic-equivalence engines;
- arbitrary config merge or a structured-config adapter framework;
- generalized migration or governance-reconciliation frameworks;
- automatic three-way merge/reapply;
- generalized crash-recovery or cross-file transaction state machines;
- multi-runtime support;
- global installation;
- concurrent installer coordination;
- source distribution universe authorities or normative-block coverage systems;
- supply-chain-grade trust/provenance infrastructure;
- OpenCLI, JoinQuant, business-domain, or target-layout special cases;
- a fixed seventh agent;
- redesign of the installed Harness's adaptive orchestration or semantic behavior.

## 24. Decisions Left To Implementation Planning

The next implementation plan may decide:

- package manager/channel and exact stable commands;
- bundle build tooling and source-to-target rewrite implementation;
- exact bundle-inventory and install-state schemas;
- exact marker strings and owned delimiter whitespace;
- final filenames inside the fixed logical namespace;
- installer/bundle compatibility policy;
- backup operation-ID naming, retention policy, and manual-cleanup presentation within the fixed `.oh-my-harness-backups/<operation-id>/` root;
- per-file atomic-write and failure-reporting mechanics;
- target identity representation;
- test framework and release-package validation commands;
- whether optional support documentation is required or optional in the inventory.

Those choices may refine mechanics but cannot expand discovery, make runtime bundle selection dynamic, weaken ownership, omit required Harness controls, or modify target-owned content.

## 25. Delivery Boundary For This Requirements Task

This baseline does not create an implementation plan, contract, installer, CLI, bundle inventory, install state, bundle, schema, marker, release package, or code change. It does not modify AGENTS.md, routed docs, protocols, templates, calibration, profiles, README, CI, or the read-only reference repository.

Implementation begins only under a later task that explicitly accepts this baseline and defines a new planning identity independent of the superseded adoption history.
