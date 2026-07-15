# Task 3 Execution Contract

Identity: `universal-harness-adoption-task-3-contract-20260713-v1`

Status: `PROPOSED`

## 1. Objective And Authority

Deliver Task 3, **Document The Product And Normative Lifecycle Boundary**: users and maintainers receive exact install/update/uninstall commands, ownership and conflict expectations, package architecture, inventory/state/marker rules, backup behavior, release boundary, and migration away from manual copying, without changing Harness orchestration semantics or accepted Task 1/2 behavior.

Frozen inputs:

| Input | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| Task 1 accepted chain | `universal-harness-adoption-task-1-accepted-evidence-chain-20260712-v1` | `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c` |
| Task 2 accepted chain | `universal-harness-adoption-task-2-accepted-evidence-chain-20260713-v1` | `1e31a265e3692fd5e275e818850318de67e070da560b6a6a05060ca7dd59f448` |
| Contract-state baseline | `universal-harness-adoption-task-3-contract-state-baseline-20260713-v1` | recorded by final contract review before acceptance |

Task 3 documents accepted interfaces. It does not redesign or modify them.

## 2. In Scope And Out Of Scope

In scope:

- replace README manual-copy Quick Start with canonical scoped package commands, local archive usage, lifecycle expectations, and links to the focused adoption docs;
- document the release, target lifecycle, and evidence planes and their non-conflicting authorities;
- distinguish source `harness-*.toml` profiles from installed `.codex/agents/oh-my-harness-*.toml` profiles while preserving all six role boundaries and evaluator calibration binding;
- add one focused lifecycle/adoption runbook and one normative bundle inventory/install-state/managed-marker specification;
- document confirmation, modified-managed backup, target-owned backup cleanup, conflicts, no-op, incomplete-state truthfulness, runtime prerequisites, non-goals, and local acceptance versus public release.

Out of scope:

- any change to Task 1/2 production, package, test, map, schema, marker asset, accepted evidence, or behavior;
- any change to `AGENTS.md`, routed docs, adaptive/semantic/run protocols, templates, calibration, six source profiles, scripts, examples, CI, or existing adoption docs;
- license selection, registry access, publication, signing, release creation, multi-runtime/global installation, generalized recovery, capability reconciliation, or architecture redesign;
- Task 4 fixtures, final release inventory, final package identity, CI expansion, or release acceptance.

## 3. Exact Write Boundary

The executor may modify or create only:

1. `README.md`
2. `docs/architecture.md`
3. `docs/adapters/codex-subagents.md`
4. `docs/adoption/universal-harness-adoption-runbook.md`
5. `docs/adoption/bundle-lifecycle-spec.md`

Every other repository path is protected. Before hashes and the protected-untracked digest are frozen in `CONTRACT_STATE_BASELINE.md`. Gate artifacts in this run directory are created only by the main thread, never by the executor.

Three allowed files are mapped Task 1 bundle sources: `README.md`, `docs/architecture.md`, and `docs/adapters/codex-subagents.md`. Their accepted Task 3 bytes supersede only Task 1's provisional transformed hashes. The two new adoption documents are release-repository docs and remain outside the target payload because Task 1's frozen map does not include them. The executor must not change the map to include them.

## 4. Required Behavioral Invariants

- Product/package identity is `@guoxiaoshuai2023/oh-my-harness`; binary identity is `oh-my-harness`; installed namespace and profile prefix remain `.oh-my-harness/` and `oh-my-harness-*`.
- Canonical public forms use `npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness ...`; update names the target version and uninstall uses a compatible package version. Unscoped `npx oh-my-harness` or `--package=oh-my-harness` must never be presented as valid guidance.
- Local implementation acceptance may use a local `.tgz`; it is not npm publication, scope ownership proof, signing, or release authorization.
- Install/update/uninstall require the supported Node runtime and Node standard library only. Python 3.11 is required only to run the three shipped helper validators, which remain required payload.
- Immutable `bundle-inventory.json`, mutable non-self-hashing `install-state.json`, the single managed `AGENTS.md` block, exact file ownership, and target-owned backups have distinct authority.
- Update replace/remove authority comes only from validated old state reconciled with installed immutable inventory; create authority applies only to an absent required destination in the new inventory. Unowned collision or unverifiable ownership stops.
- Modified managed content is backed up to `.oh-my-harness-backups/<operation-id>/` and disclosed path-by-path before explicit confirmation. Backups are target-owned historical recovery artifacts and may be cleaned up by the user without making the installation unhealthy.
- Paths must be normalized repo-relative, contained under the target root, and free of symlink/special-file traversal. Damaged markers, changed confirmed targets, exact dirty overlap, unsafe paths, and unverifiable state stop rather than guess or merge.
- A capturable incomplete operation never claims success. A sentinel or payload/state mismatch makes the next lifecycle invocation stop truthfully; no generalized crash recovery is promised.
- Adaptive default, required full v2, evidence-backed deliberate full v2, main-thread topology/final-acceptance ownership, fact-triggered gates, finite retry/intervention, and no fixed seventh agent retain their existing modal force. Documentation may explain but not redefine them.
- Parsing, hashes, TOML validity, package smoke, and structural validators are evidence, not semantic proof. Material conflict between target and Harness authority causes `STOP`; target-owned rules outside the managed block remain effective.

## 5. Acceptance Criteria

- `T3-AC1`: README presents the three canonical `--package=@guoxiaoshuai2023/oh-my-harness@...` commands and local archive form as the primary path; manual source copying and unscoped `npx oh-my-harness` are not presented as valid managed installation.
- `T3-AC2`: architecture assigns non-conflicting authority to bundle map/inventory, lifecycle code, install state, managed block, target content, backups, fixtures, and docs.
- `T3-AC3`: the adapter clearly distinguishes source `harness-*.toml` from installed `oh-my-harness-*.toml` while preserving all six role boundaries and calibration binding.
- `T3-AC4`: the manifest/state spec defines immutable inventory, mutable non-self-hashing state, exact ownership, asymmetric update permission, marker ownership, containment, and state-last uninstall.
- `T3-AC5`: the runbook explains summary/confirmation, modified managed backup, target-owned backup cleanup, exact conflicts, no-op, incomplete state, and truthful stops.
- `T3-AC6`: docs preserve adaptive default, required full v2, evidence-backed deliberate full v2, main-thread authority, and no fixed seventh agent without redefining them.
- `T3-AC7`: docs consistently state that parsing/hashes/smoke are not semantic proof and that material target/Harness authority conflict causes STOP.
- `T3-AC8`: local implementation acceptance ends at reproducible package/fixture/CI evidence; license, npm scope access/ownership verification, credentials, signing, and actual publication require a later owner decision and external-write boundary.
- `T3-AC9`: README and adoption guidance state that lifecycle commands require only the supported Node runtime, Python 3.11 is helper-validator-only, and all three Python helpers remain required installed payload.

## 6. Evidence, Validation, And Report

The executor must return, in its response only, an Implementation Report containing:

- exact changed paths and before/after hashes;
- T3-AC1 through T3-AC9 evidence mapped to headings or excerpts;
- a command/path/authority terminology matrix covering README, architecture, adapter, both new docs, package metadata/CLI help, and the protected protocol/profile/calibration authorities used for comparison;
- a modal-force/non-regression comparison for adaptive/full-v2/main-thread/gate/conflict statements;
- the exact mapped-source impact list for Task 4, distinguishing the three mapped changed docs from the two release-only docs;
- validation output, unchecked areas, and remaining risks.

Required checks:

- compare documented commands and options with `package.json` and `node bin/oh-my-harness.mjs --help`;
- negative search for unscoped installer guidance and old manual-copy managed-install guidance in the five allowed docs;
- verify all relative links and documented repository/runtime paths introduced or changed by Task 3;
- verify all six source and installed profile names and the canonical calibration binding described by the adapter;
- run the existing Task 1/2 automated suites and `npm run validate:package` to detect packaging/reference regressions caused by mapped documentation changes;
- verify Task 1/2 accepted hashes, protected authority hashes, allowed changed-path set, dirty-worktree attribution, `git diff --check`, and absence of package/cache/temp residue.

File existence, passing tests, TOML parsing, hashes, or smoke checks cannot alone satisfy semantic ACs. Producer-independent Result QA and main-thread review must inspect the actual wording and authority relationships.

## 7. Stop And Escalation Conditions

Stop without editing outside the boundary if:

- an authority hash or accepted Task 1/2 dependency mismatches;
- accurate documentation requires changing accepted production behavior, the bundle map/schema, package metadata, tests, Harness authority, or an existing protected adoption document;
- exact commands, schemas, or lifecycle behavior are unstable or contradictory;
- a publication claim requires a license, credentials, scope verification, signing, release creation, or external write;
- the requested result would restore manual copying, unscoped package guidance, capability reconciliation, multi-runtime/global installation, generalized migration/recovery, or a fixed pipeline;
- any unexplained path changes or sensitive material is encountered.

An implementation defect that is fixable inside these five paths returns to a focused executor under this same boundary. A requirements/plan gap or need for another write path stops and returns to the owning planning or contract decision; it must not be disguised as an implementation preference.

## 8. Downstream Handoff

After strict Result QA and main-thread acceptance, freeze the five final documentation hashes and the mapped-source impact list. Task 4 may then regenerate the final release candidate from stable Task 1/2/3 source identities. This contract neither starts nor authorizes Task 4.
