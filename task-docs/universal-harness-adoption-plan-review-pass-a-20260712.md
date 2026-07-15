# Universal Harness Adoption Plan Review - Pass A

Identity: `universal-harness-adoption-plan-review-pass-a-20260712-v1`

Status: `FROZEN ISOLATED BASELINE`

Reviewer: fresh producer-independent `oh_my_harness_plan_evaluator` invocation `019f5517-fbff-7de3-853e-76a2c6604b48`

## Isolation And Inputs

The reviewer produced this baseline before any new Universal Harness Adoption implementation plan existed or was read.

Allowed inputs inspected:

- `task-docs/universal-harness-adoption-requirements-20260712.md`;
- `AGENTS.md` and fact-triggered routed docs;
- `task-docs/_harness/adaptive-orchestration-protocol.md`;
- `task-docs/_harness/semantic-fidelity-protocol.md`;
- `task-docs/_harness/run-directory-protocol.md`;
- current README, architecture, Codex adapter, templates, calibration, profiles, scripts, CI, package/release-file presence, and Git facts.

Excluded inputs:

- any new planner-authored implementation plan;
- superseded adoption requirements, implementation plans, contracts, reviews, and exhaustion artifacts as authority;
- target-repository business or OpenCLI content as architecture input.

The reviewer observed superseded artifacts only as protected untracked-path facts. It did not read or use their contents.

## Requirements Verification

- Path: `task-docs/universal-harness-adoption-requirements-20260712.md`
- Declared identity: `universal-harness-adoption-requirements-20260712-v5`
- Expected SHA-256: `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`
- Observed SHA-256: `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`
- Verification: exact match

Calibration consulted: `task-docs/_harness/evaluator-calibration.md`

Relevant cases: `CAL-003`, `CAL-SEM-001`, `CAL-SEM-002`, `CAL-SEM-003`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-005`, `CAL-ADAPT-009`, `CAL-ADAPT-010`

## Independent User-Outcome Baseline

The implementation must produce a versioned open-source package through which a user can install a complete immutable Harness release into an empty or existing Git repository with one stable command, update to an explicit released version with one stable command, and uninstall with one stable command. It must not require a source clone or manual copying.

The release inventory, not target-repository analysis, defines the complete installation. The target layout uses `.oh-my-harness/`, six `oh-my-harness-*` Codex profiles, and exactly one marker-managed root `AGENTS.md` block. Target-owned governance, dirty work, agents, integrations, scripts, CI, and content remain outside Harness ownership.

Modified Harness-owned content can be replaced or removed only after deterministic backup, exact path disclosure, and explicit confirmation. Installation or update succeeds only after payload/block verification followed by install-state verification.

The named reference repository is a read-only complex acceptance case. Its OpenCLI integration, domain rules, paths, tools, and dirty state cannot become generic defaults or product logic.

## Risk Baseline

- Operational Risk: `HIGH` for later lifecycle implementation because update and uninstall replace or delete managed content and must protect modified user work. This Pass A activity is read-only.
- Semantic Risk: `HIGH` because release transformation redistributes governance, protocols, profiles, safety rules, and modal force across multiple installed surfaces. Structural validity alone cannot prove preservation.

## Non-Negotiable Constraints

- Use one immutable per-release bundle inventory with deterministic transformed-byte hashes and source-to-target mapping.
- Reject missing, malformed, incompatible, inconsistent, or incomplete inventory before target writes.
- Install all applicable required entries. Runtime `SKIP`, source scanning, profile selection, and partial Harness installation are forbidden.
- Keep `.oh-my-harness-backups/` outside the managed namespace and inventory. Backups become target-owned, survive uninstall, and are not a continuing health requirement.
- Preserve all six profile missions, permissions, evaluator read-only boundaries, independence, evidence standards, stops, no-repair behavior, executor bounded authority, and no-fabrication controls.
- Preserve adaptive default, required full v2, and evidence-backed deliberate full-v2 selection without making full v2 the default.
- Keep the managed `AGENTS.md` block substantive: always-on safety floor, adaptive entry, main-thread authority, namespaced routes, semantic entry, validation minimums, target-authority preservation, and conflict STOP.
- Preserve every byte outside the managed block. Invalid, duplicate, nested, reversed, damaged, partial, or lookalike markers are conflicts, not repair opportunities.
- Authorize replacement or deletion only from valid install-state ownership. Namespace, filename prefix, inventory membership, or directory existence alone is insufficient.
- Update may create a newly required path only when it is absent and safely contained. An existing unowned target is a conflict.
- Require normalized repo-relative paths, canonical root containment, and STOP on absolute, empty, traversing, NUL, symlink, or special-file paths.
- Revalidate paths, ownership, markers, and current state immediately before each write, replacement, backup, or deletion. `--force` cannot bypass these controls.
- Restrict discovery to exact inventory/profile/AGENTS/state/backup paths, directly overlapping Git state, and required parent accessibility. Do not execute target code, hooks, plugins, CI, scripts, package managers, or validators.
- Verify backups against pre-change bytes before destructive action and before reporting the current operation successful.
- Verify payload/block before writing success state; verify state after writing it. Delete `install-state.json` last during uninstall.
- On a capturable partial failure, stop further writes, preserve evidence/backups, truthfully report changed and unchanged paths, withhold success, and make the next lifecycle invocation detect mismatch. Do not build generalized crash recovery.
- Resolve installed runtime references only to installed namespaced paths or valid root `AGENTS.md`. Inventory source identifiers remain provenance, not runtime references.
- Never represent parsing, hashes, path existence, or smoke tests as semantic equivalence proof.
- Do not add dependencies without necessity and explicit approval.

## Current Repository Facts

- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD and `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked delta and staged delta against `origin/main`: empty
- Dirty state: 24 untracked task-doc files, consisting of the frozen new requirements plus protected superseded history
- README distribution: manual copy/clone workflow
- Existing source assets: seven routed docs, five root Harness protocol/calibration/acceptance files, thirteen templates, six Codex profiles, and three stdlib-only Python helpers
- Current profile filenames: `harness-*.toml`; installed filenames must become `oh-my-harness-*.toml`
- Existing evaluators: all three declare `sandbox_mode = "read-only"`
- Existing executor: bounded to one stable producer-nonmodifiable authority
- Existing scripts: source extraction, structural preservation, and router smoke/coverage; they explicitly do not prove semantics
- Existing `.codex/config.example.toml`: optional `max_depth = 1` example, not complete authority or fan-out enforcement
- Existing CI: whitespace, Python compile, six-profile TOML/invariant parsing, router smoke, and adaptive-structure checks
- Missing product surface: no package manifest, package lock, CLI, installer, bundle builder, immutable inventory, mutable state, backup lifecycle, lifecycle fixtures, or package/release CI
- Existing runtime references include `docs/agent-routing/*`, `task-docs/_harness/*`, `.codex/agents/*`, and `scripts/*`; deterministic release transformation must close this graph
- No root license file exists; README already identifies license selection as a separate publication-blocking owner decision

## Expected Plan Coverage And Dependency Principles

The plan should cover a stable package/command surface; deterministic bundle construction and reference rewriting; immutable inventory and mutable state; exact-path discovery and containment; managed-block handling; install/no-op/update/backup/uninstall/incomplete-state behavior; installed Harness semantic validity; all twelve acceptance scenarios; package-content validation; documentation; and CI.

Bundle transformation and inventory identity must precede lifecycle operations. Update and uninstall share the ownership/state model established by install. Backup and confirmation precede destructive treatment of modified managed content. Payload verification precedes success-state writing, and state verification follows it. Uninstall preservation checks precede final state deletion. Documentation and CI must cite actual implemented commands and package output.

Plan review, boundary review, Result QA, semantic comparison, Git delivery, publication, and main-thread acceptance remain gates or later transitions, not delivery tasks.

## Twelve Scenario Expectations

| ID | Required outcome evidence |
| --- | --- |
| AS-01 | Empty repo receives the complete fixed bundle, substantive managed router, verified payload/state, and exact ownership. |
| AS-02 | A large existing `AGENTS.md` gains one block while all original outer bytes remain identical. |
| AS-03 | Write-confinement and changed-path evidence prove an existing agent/OpenCLI ecosystem remains untouched without whole-repo semantic scanning. |
| AS-04 | Matching same-version install is a byte-level no-op. |
| AS-05 | Clean update replaces and removes old-owned files, creates one absent newly required file, replaces the block, and verifies the new state/reference graph. |
| AS-06 | Modified managed bytes are verified, disclosed, backed up, and confirmed; later manual backup deletion does not impair health or lifecycle operations. |
| AS-07 | An unowned exact-path collision stops before any target write or ownership adoption. |
| AS-08 | Damaged markers stop without modifying `AGENTS.md`. |
| AS-09 | Uninstall removes only proven ownership, preserves target content/backups, deletes state last, and fails if final state deletion fails. |
| AS-10 | Structural PASS plus any changed outer `AGENTS.md` byte is overall FAIL. |
| AS-11 | Traversal, symlink, or special-file paths stop without access outside the canonical repo. |
| AS-12 | Injected write/verification failure stops later writes, withholds success, reports exact partial state, preserves backups, and is detected next invocation. |

## AC-Pass-But-User-Fail Baseline

Primary counterexample: every installed file matches its inventory hash, all six TOMLs parse, route paths exist, and state is structurally valid, but one byte outside the managed `AGENTS.md` block changed. The user preservation outcome failed, so the overall result is `FAIL`.

Other forbidden substitutions include a package that still requires source cloning/manual copying, a one-line managed pointer that omits always-visible controls, or structurally complete assets retaining source-only runtime references.

## Likely Plan Failure Signals

- Using superseded adoption artifacts or the read-only fixture repo as authority.
- Reintroducing capability discovery, semantic equivalence, arbitrary merge, migration, multi-runtime, transaction, or crash-recovery systems.
- Deferring package, command, marker, ownership, schema, or release-boundary decisions that executors need.
- Replacing target `AGENTS.md` wholesale or weakening the managed block to a pointer.
- Inferring ownership from names or current inventory without valid state.
- Whole-repo scanning to prove non-modification.
- Missing direct evidence for any of the twelve scenarios.
- Treating file existence, TOML parsing, hashes, or smoke checks as semantic proof.
- Weakening profiles or changing adaptive three-state topology semantics.
- Including publication credentials or external release writes in implementation acceptance.

## Uncertainties Left For Planning

- Package system, release channel, and exact stable command pattern.
- Inventory/state schema mechanics, marker strings, compatibility policy, target identity, operation-ID format, and per-file atomic-write implementation.
- Exact support-document membership required to close the installed reference graph.
- Test framework and release-package validation commands.
- Public registry package name, license selection, credentials, signing, and actual publication authority.

## Reviewer Decision

`PASS`

Blocking findings: none.

The reviewer explicitly confirmed that no planner-authored implementation plan was read.

## Main-Thread Disposition

The reviewer appended a generic “required v2 handoff” that would force later solution designer/evaluator/executor/result-evaluator stages. That statement is not part of the isolated intent baseline and is rejected as an unsupported topology prescription. The controlling user instruction requires adaptive planning now, one focused Pass A/Pass B reviewer, and a stop after accepted planning inputs. Future contracting and implementation topology will be selected later from task facts and triggered gates; this planning task neither starts nor mandates the complete six-role sequence.
