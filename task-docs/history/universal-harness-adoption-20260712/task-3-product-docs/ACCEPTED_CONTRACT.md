# Task 3 Execution Contract

Identity: `universal-harness-adoption-task-3-contract-20260713-v3`

Status: `PROPOSED`

## 1. Objective And Frozen Dependencies

Deliver Plan Task 3, **Document The Product And Normative Lifecycle Boundary**. Users and maintainers must receive exact lifecycle commands, ownership/conflict expectations, package architecture, inventory/state/marker rules, backup behavior, release boundary, and migration away from manual copying without changing Harness orchestration semantics or accepted Task 1/2 behavior.

| Input | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| Task 1 accepted chain | `universal-harness-adoption-task-1-accepted-evidence-chain-20260712-v1` | `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c` |
| Task 2 accepted chain | `universal-harness-adoption-task-2-accepted-evidence-chain-20260713-v1` | `1e31a265e3692fd5e275e818850318de67e070da560b6a6a05060ca7dd59f448` |
| Contract-state baseline | `universal-harness-adoption-task-3-contract-state-baseline-20260713-v1` | `badb42eb6588837c7c7497b26b3100c6e10165d283d16cafdcd083418f982f68` |

Task 3 documents these accepted interfaces; it cannot reinterpret or modify them.

## 2. Exact Authority Binding

Selected binding mode: explicit binding in this accepted boundary and the executor launch packet. No runtime-inheritance assumption is used.

Always-on router authority:

- root `AGENTS.md`, including its hard gates, adaptive control plane, semantic entry, and validation minimums.

Exact fact-triggered routed authority:

- `task-docs/_harness/adaptive-orchestration-protocol.md` for topology, delegation, route/gate binding, independent QA, and main-thread acceptance;
- `docs/agent-routing/current-state-evidence.md` because package, CLI, mapping, and accepted behavior claims depend on current primary evidence;
- `docs/agent-routing/task-planning-scale.md` because this is one frozen documentation delivery unit and review/acceptance are gates;
- `docs/agent-routing/implementation-boundary.md` because only five exact documentation paths may change;
- `docs/agent-routing/validation-and-reporting.md` for evidence and truthful reporting;
- `task-docs/_harness/semantic-fidelity-protocol.md` for T3-AC6/T3-AC7, modal-force preservation, and semantic evidence beyond structural checks.

Direct run-level supporting authority, not additional router targets:

- `task-docs/_harness/run-directory-protocol.md` for separation of accepted boundary, producer report, independent QA, and main-thread decision;
- `task-docs/_harness/evaluator-calibration.md` for independent evaluator failure patterns and evidence discipline.

Gate ownership:

- executor: implement only the five paths, use current primary evidence, validate, and stop on ambiguity or boundary mismatch;
- producer-independent Result Evaluator: independently inspect actual wording/diff and decide all nine ACs, modal force, scope, and evidence truthfulness without repair;
- main thread: own topology, finding arbitration, primary-evidence review, final Task 3 acceptance, and every external-write decision;
- external/secret/publish stop: root hard gates plus the direct user prohibition disallow registry access, credentials, signing, release creation, publication, secrets, and all external writes.

## 3. Scope And Write Boundary

In scope:

- replace README manual-copy Quick Start with canonical scoped package commands, local archive usage, lifecycle expectations, and focused adoption links;
- document release, target lifecycle, and evidence planes and their non-conflicting authorities;
- distinguish source `harness-*.toml` from installed `.codex/agents/oh-my-harness-*.toml` while preserving six roles and calibration binding;
- add one focused lifecycle/adoption runbook and one normative inventory/state/marker specification;
- document confirmation, modified-managed backup, target-owned backup cleanup, conflicts, no-op, incomplete-state truthfulness, runtime prerequisites, non-goals, and local acceptance versus public release.

The executor may modify or create only:

1. `README.md`
2. `docs/architecture.md`
3. `docs/adapters/codex-subagents.md`
4. `docs/adoption/universal-harness-adoption-runbook.md`
5. `docs/adoption/bundle-lifecycle-spec.md`

Every other path is protected by `CONTRACT_STATE_BASELINE.md`, the Task 1/2 chains, and the exact changed-path check. Gate artifacts in this run directory are main-thread-only.

The first three files are mapped Task 1 bundle sources; accepted Task 3 bytes supersede only their provisional transformed hashes. The two new adoption docs remain release-repository-only because the frozen map does not include them. Do not modify the map.

Out of scope: Task 1/2 code/package/tests/map/schema/marker/evidence; `AGENTS.md`; routed docs; protocols; templates; calibration; profiles; scripts; examples; CI; existing adoption docs; license/registry/publish/sign/release work; multi-runtime/global install; generalized recovery/reconciliation; and all Task 4 work.

## 4. Documentation Invariants

- Package `@guoxiaoshuai2023/oh-my-harness`, binary `oh-my-harness`, `.oh-my-harness/`, and `oh-my-harness-*` remain distinct fixed identities.
- Canonical public forms use `npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness ...`; update names the target version and uninstall uses a compatible version. Never present unscoped `npx oh-my-harness` or `--package=oh-my-harness` as valid.
- Local `.tgz` acceptance is not publication, npm scope proof, signing, or release authorization.
- Lifecycle commands need the supported Node runtime and Node standard library only. Python 3.11 is only for the three required shipped helper validators.
- Immutable `bundle-inventory.json`, mutable non-self-hashing `install-state.json`, one managed `AGENTS.md` block, exact owned files, target content, and target-owned backups have separate authority.
- Replace/remove requires validated old state reconciled with installed immutable inventory. Create applies only to an absent new required destination. Unowned collision or unverifiable ownership stops.
- Modified managed content requires path disclosure, deterministic backup under `.oh-my-harness-backups/<operation-id>/`, and explicit confirmation. Backups remain target-owned and later deletion is non-blocking.
- Paths are normalized, repo-relative, contained, and free of symlink/special-file traversal. Damaged markers, target changes, exact dirty overlap, unsafe paths, and unverifiable state stop without merge or inference.
- Capturable incomplete operation never claims success; later invocation detects sentinel or payload/state mismatch and stops without generalized recovery.
- Adaptive default, required full v2, evidence-backed deliberate full v2, fact-triggered gates, finite retry/intervention, main-thread final authority, and no fixed seventh agent retain current force. Docs explain but do not redefine them.
- Parsing, hashes, TOML validity, package smoke, and structural validators are evidence, not semantic proof. Material target/Harness authority conflict causes `STOP`; target rules outside the managed block remain effective.

## 5. Acceptance Criteria

- `T3-AC1`: README presents the three canonical scoped commands and local archive form; manual copying and unscoped npm commands are not valid managed installation.
- `T3-AC2`: architecture assigns non-conflicting authority to map/inventory, lifecycle code, install state, managed block, target content, backups, fixtures, and docs.
- `T3-AC3`: adapter distinguishes all six source and installed profile paths while preserving role boundaries and calibration binding.
- `T3-AC4`: spec defines immutable inventory, mutable non-self-hashing state, exact ownership, asymmetric update, marker ownership, containment, and state-last uninstall.
- `T3-AC5`: runbook covers summary/confirmation, modified-managed backup, target-owned cleanup, exact conflicts, no-op, incomplete state, and truthful stops.
- `T3-AC6`: docs preserve adaptive default, required and deliberate full v2, main-thread authority, and no fixed seventh agent without redefinition.
- `T3-AC7`: docs state structural checks are not semantic proof and material authority conflict causes STOP.
- `T3-AC8`: local acceptance ends at reproducible package/fixture/CI evidence; license, scope access/ownership, credentials, signing, publication, and release need later owner/external-write authority.
- `T3-AC9`: README/adoption guidance states Node-only lifecycle, Python 3.11 helper-only, and all three helpers remain required payload.

## 6. Evidence And Validation

Implementation Report must include changed paths and hashes; evidence for T3-AC1..9; command/path/authority terminology matrix; modal-force comparison; mapped-source impact list separating three mapped docs from two release-only docs; commands, unchecked areas, and risks.

Required checks:

- compare docs with `package.json` and the accepted usage interface: `node bin/oh-my-harness.mjs --help` must exit `2`, emit empty stdout, and emit exactly `usage: oh-my-harness <install|update|uninstall> --target <repo> [--dry-run] [--yes]` plus LF on stderr. This is existing usage evidence, not a successful help feature or authority to modify CLI;
- negative-search the five docs for unscoped installer commands and old manual-copy managed-install guidance;
- validate introduced/changed links and repository/runtime paths;
- verify all six source/installed profile names and calibration binding;
- run existing Task 1/2 tests and `npm run validate:package` for mapped-doc regressions;
- verify Task 1/2 hashes, protected authority hashes, exact changed paths, dirty attribution, `git diff --check`, and no package/cache/temp residue.

Structural PASS alone cannot satisfy semantic ACs. Independent QA and main-thread review must inspect wording and authority relationships.

## 7. Stop And Handoff

Stop if an authority/dependency mismatches; accurate docs require another path or accepted behavior change; commands/schema/lifecycle are unstable; claims require license/credentials/scope verification/signing/publication/external writes; scope would restore manual copying, unscoped guidance, capability reconciliation, multi-runtime/global installation, generalized recovery, or fixed pipeline; or any unexplained/sensitive path appears.

An implementation defect inside these five paths may return to a focused executor under this boundary. Requirements/plan gap or another write path stops and returns to its owning decision.

After strict QA and main-thread PASS, freeze five final hashes and mapped-source impact for Task 4. This contract does not start or authorize Task 4.
