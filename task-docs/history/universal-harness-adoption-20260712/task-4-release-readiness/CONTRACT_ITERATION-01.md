# Task 4 Release Readiness Contract v1

Identity: `universal-harness-adoption-task-4-contract-20260714-v1`

Intended accepted path: `task-docs/history/universal-harness-adoption-20260712/task-4-release-readiness/ACCEPTED_CONTRACT.md`

Status: `REVIEW CANDIDATE - becomes executor authority only after strict independent review and byte-identical freeze`

## 1. Objective

Prove that the stable accepted Task 1/2/3 source state produces one deterministic, locally release-ready, unpublished npm package for `@guoxiaoshuai2023/oh-my-harness`. The result must have direct behavior evidence for all twelve Universal Harness Adoption scenarios, preserve Harness semantics and target-repository ownership, pass package and CI validation, and remain within Task 4's test/validation-only authority.

Task 4 verifies and packages the accepted product. It does not repair or reinterpret Task 1 compiler behavior, Task 2 lifecycle behavior, Task 3 documentation, or the existing Harness architecture.

## 2. Original Request Anchor

> A user should be able to install a complete, fixed Harness release into an existing repository with one stable command, and update or uninstall it with one stable command.
>
> Installation, update, and uninstall must not silently overwrite or take ownership of target-owned content or uncommitted/untracked work. Modified Harness-owned content may be replaced or removed only after deterministic backup, explicit path-specific disclosure, and explicit confirmation.
>
> The product should be safe by namespace and precise ownership, not by attempting to understand and reconcile every governance system in the repository.

The accepted package identity is `@guoxiaoshuai2023/oh-my-harness`; the binary remains `oh-my-harness`; the installed namespace remains `.oh-my-harness/`; and the installed agent prefix remains `oh-my-harness-*`.

## 3. Frozen Planning Authority

| Artifact | Identity | Path | SHA-256 |
| --- | --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `task-docs/universal-harness-adoption-requirements-20260712.md` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Base implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Focused plan amendment | `universal-harness-adoption-implementation-plan-20260713-v5` | `task-docs/universal-harness-adoption-implementation-task-plan-20260713-v5.md` | `9f17a1054778b45a1ac2d4c18f0ce0210c71e5ae9edcbc79cd6294384a839fc1` |
| Current accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260713-v3` | `task-docs/universal-harness-adoption-accepted-planning-inputs-20260713-v3.md` | `6b9d18b607b9979decdc91e2bf7f0926770f50680fcf0d8759a5d2ea6fd11f78` |

Plan v5 amends only the stale Task 1 compiler-test ownership and resulting dependency propagation. Plan v4 remains authoritative for Task 4.

## 4. Accepted Dependency Chain

| Dependency | Identity | Path | SHA-256 | Status |
| --- | --- | --- | --- | --- |
| Task 1 current chain | `universal-harness-adoption-task-1-accepted-evidence-chain-20260713-v2` | `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_ACCEPTED_EVIDENCE_CHAIN_V2.md` | `ebe43ec5e4458befff6490277b09bc9016834f59faa935c2d9120ac55cb3740f` | `ACCEPTED` |
| Task 2 no-impact/current result | `universal-harness-adoption-task-2-transitive-no-impact-20260713-v1` | `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_TRANSITIVE_NO_IMPACT.md` | `a177a1c9a377b532ec2e8b9a6bca46fdb6784fccf0506147b060763acc2fd9d2` | `ACCEPTED - NO IMPACT` |
| Task 3 current chain | `universal-harness-adoption-task-3-accepted-evidence-chain-20260714-v1` | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/TASK3_ACCEPTED_EVIDENCE_CHAIN.md` | `2938a0d1bd90f31c7ed7a40f709ea337117760f53243bfcd02479da5bb5f9b61` | `PASS UNDER EXPLICIT USER-AUTHORIZED INDEPENDENT-QA WAIVER` |

The Task 3 waiver is a disclosed residual risk, not an independent QA verdict and not a change to global Harness gates. Task 4 must obtain fresh producer-independent Result QA over the final whole-system result.

Before any Task 4 implementation write, a launch baseline must recompute the three chain hashes and every implementation/source hash frozen below. Any mismatch stops execution and returns to the owning task or contract design.

## 5. User And Architecture Result

The accepted Task 1 compiler, Task 2 lifecycle CLI, and Task 3 documentation must jointly produce:

- one deterministic local release-candidate package and immutable inventory identity;
- direct isolated behavior evidence for AS-01 through AS-12;
- CI and local commands that validate the same accepted surfaces;
- semantic evidence that namespacing and reference rewriting preserve the existing adaptive Harness, six role profiles, safety/semantic gates, and target-repository authority;
- no publication, registry authentication, secrets access, or target-repository code execution.

Passing structural checks alone is insufficient. In particular, a package that validates files and TOML while changing bytes outside the managed `AGENTS.md` block is an overall `FAIL`.

## 6. In Scope

- Isolated synthetic fixture families covering AS-01 through AS-12 without creating twelve delivery tasks.
- A synthetic complex existing-ecosystem fixture. A read-only local dry-run against a reference repository is optional and cannot be required for acceptance.
- New test-only fixture and fault-injection support needed by the twelve scenarios.
- New release-validation tools using only the supported runtime standard libraries.
- One twelve-row acceptance matrix with setup, expected decision, primary evidence, and failure signals.
- Reference-closure, package-content, two-build determinism, modal-force/profile/router/block, target-authority, and semantic evidence.
- Direct Python 3.11 compilation and applicable deterministic execution of all three shipped Python helpers from their final packed installation paths.
- CI extension that retains every existing check and adds the accepted Node/package/lifecycle/acceptance validations.
- Local `npm pack` dry-run/archive inspection and local package command validation using isolated temporary/cache/home paths and no publication.
- Negative evidence that no valid install guidance emits unscoped `npx oh-my-harness` or `--package=oh-my-harness`.

## 7. Out Of Scope

- Any Task 1 compiler, map, schema, marker, package-contract, payload, or accepted test repair.
- Any Task 2 installer, lifecycle, package metadata, lockfile, CLI, state, marker, filesystem, or accepted test repair.
- Any Task 3 source-document repair.
- Changes to existing Harness router, routed docs, protocols, templates, calibration, profiles, scripts, examples, or adapter behavior.
- A thirteenth acceptance scenario or twelve separate delivery tasks.
- Whole-repository capability discovery, semantic-equivalence engines, arbitrary config merge, migration frameworks, automatic three-way merge, cross-file transactions, generalized crash recovery, multi-runtime/global/concurrent installation, or target-specific logic.
- Public npm publish, registry authentication, scope permission checks, release creation, signing, secrets, or license selection.
- Executing target-repository code, hooks, plugins, scripts, CI, or other repo-owned content.
- Git stage, commit, push, PR creation, or merge.

## 8. Implementation Write Authority

The executor may write only:

1. new files under `test/acceptance/**`;
2. new test-only fixture/fault-injection files under `test/support/**`;
3. new release-validation files under `tools/**`;
4. `.github/workflows/ci.yml`.

Current before state:

| Allowed area | Before state |
| --- | --- |
| `test/acceptance/**` | directory absent; new-only |
| `test/support/**` | directory absent; new-only |
| `tools/**` | directory absent; new-only |
| `.github/workflows/ci.yml` | existing SHA-256 `b6fd776b776452ea6aba0fe98c249ab1de30b4e8e66ecaaca75e22f1a81f7180` |

No other implementation path is authorized. Task 4 run evidence, launch baselines, Implementation Report, Result QA, and final acceptance artifacts are main-thread gate artifacts outside executor write authority.

The executor may create temporary test/package outputs only under an owned OS temporary directory and isolated cache/home. It must remove them and truthfully report cleanup failures. It may not create archives, caches, `node_modules`, generated bundles, or metadata residue in the repository.

## 9. Protected Paths And Before Hashes

Every path not listed in Section 8 is protected. The following accepted product surfaces are explicitly frozen.

### Task 1: 12 Accepted Paths

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
| `test/bundle/compiler.test.mjs` | `984e2cd76647b1ee43515be4b7dcf93897e300d723d0a3f29dd2e95edb1f5832` |
| `test/bundle/expected-data.mjs` | `f8aad20a1c67be4a15be4f8d34d458db39b3befca6a5130d3c1b69ae34f0aa42` |
| `test/bundle/semantic-ledgers.test.mjs` | `88885c3769caedf8dffdfc1cf44e4977aa1892765d17b39ab4faa5cecba71d52` |
| `test/bundle/test-helpers.mjs` | `890da32b4de7a16a08f6dd5e13257507442a164a4c29a1c84d5eb9f2eb91cf7c` |

### Task 2: 14 Accepted Paths

| Path | Before SHA-256 |
| --- | --- |
| `bin/oh-my-harness.mjs` | `b1e19bfac413012fd1b8c28b374b9469420ae44c8c552ebb23b4e96efec26df9` |
| `package.json` | `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9` |
| `package-lock.json` | `84d86095b95ad5c34529320c7bb531964f53be9025f137f17b091396400ec184` |
| `src/installer/cli.mjs` | `0eea231c0da370b0d69efbb52157208dd383350cd775fbcd2fd617a3a03c5d82` |
| `src/installer/filesystem.mjs` | `1bdccb16f40fa3cc0ecf529707a749ef78258f645b3f81f4210e80b463b4f701` |
| `src/installer/lifecycle.mjs` | `022fae0b5af59ebc14f83b077bdcbb6c067e7351da1936b4a420304c6cf4db59` |
| `src/installer/markers.mjs` | `0ed248f49d3fdf223409264704d452246a1a74ea7fd4ed5a0663828af43ae7d0` |
| `src/installer/package-bundle.mjs` | `8e1a1616f41ef7e00b0327bfbbaa7420dac159d8785e4203f37289fef908db08` |
| `src/installer/state.mjs` | `1b9e603b73d3345e9dd20ed00147e76da12c361e84f3d36c1c53ca23e369a6df` |
| `test/lifecycle/cli.test.mjs` | `f83b172363e478a310abb75dddeecb39d6f6ecb3e66367a9686c10623111e12e` |
| `test/lifecycle/lifecycle.test.mjs` | `fd5a9e838111566fa6606d098d6b9e849419cac769aa8e8e2a6f29f36887fb02` |
| `test/lifecycle/package-validation.mjs` | `71f5dd205ded9c921c73863d052d61a8295b2787517affdd007fab5ce6509dbc` |
| `test/lifecycle/security.test.mjs` | `4992b0efc58050eb127d30ae1e42beb5482b309587cde14b1a8567e257938045` |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` |

### Task 3: 5 Accepted Paths

| Path | Before SHA-256 |
| --- | --- |
| `README.md` | `90c176504881d50a02c09207529ac1d44acce95b4561ff3f8bab6f43c256ec37` |
| `docs/architecture.md` | `06c2fbd715f4c5542f0e2da2d27098f962a996f8c85e3f57a4622fb84fd58b92` |
| `docs/adapters/codex-subagents.md` | `e9cc864999d887fd9dedb3336260c9fa29ea6cc993bc510844a736e11d77744c` |
| `docs/adoption/universal-harness-adoption-runbook.md` | `c1aa4236015fc07b3e8ac381b2b3bc6276bcaec66dd4716a2cc042a98f4e7c26` |
| `docs/adoption/bundle-lifecycle-spec.md` | `e6d7bebcdc93573fc3676353c9e7956bbfd4310474b0c45a032ae79dba8bdc82` |

All requirements, plans, accepted-input manifests, contracts, reviews, reports, QA/waiver/acceptance artifacts, evidence chains, handoffs, existing Harness source assets, and superseded history are read-only. Every tracked HEAD path outside the allowed set and every pre-existing untracked path outside the allowed set is protected.

## 10. Branch And Dirty-Worktree Boundary

Contracting baseline:

- branch: `codex/universal-nondestructive-harness-adoption`;
- HEAD: `60428957a99cf6f75d640c78cf6833576d47cc8d`;
- `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`;
- merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`;
- staged delta: empty;
- committed branch delta against `origin/main`: empty;
- expected tracked dirty paths: the three accepted Task 3 source docs `README.md`, `docs/architecture.md`, and `docs/adapters/codex-subagents.md`;
- expected untracked state: accepted Task 1/2 product paths, the two accepted Task 3 adoption docs, and preserved planning/history/handoff artifacts;
- Task 4 evidence-chain/contract artifacts are gate-authorized additions, not implementation output.

Before executor launch, the main thread must create a separate versioned launch baseline containing the complete `git status --short -uall`, hashes for known non-sensitive untracked files, metadata-only treatment for any unknown entry until classified, staged/committed delta, allowed-area before state, all protected hashes, residue checks, and dirty-path attribution. Any unexplained path or active writer stops launch.

## 11. Required Behavior And Evidence

### Twelve Scenario Fixtures

One acceptance matrix must map each scenario to Task ACs, setup, expected decision, direct primary evidence, and failure signals:

| Scenario | Required behavior evidence |
| --- | --- |
| `AS-01` Empty repository install | Complete fixed payload, managed block, six profiles, verification, and ownership state from the local scoped package. |
| `AS-02` Large existing `AGENTS.md` | Exactly one managed block and byte-identical outer content. |
| `AS-03` Existing ecosystem | Exact write-confinement/changed-path evidence; repo-owned agents, skills/plugins, scripts, and CI remain untouched without semantic scanning. |
| `AS-04` Same-version reinstall | Install/update no-op with no changed payload, block, state, or timestamp. |
| `AS-05` Clean update | One state-owned replacement, one state-owned removal, one absent-only new required creation, block/reference/state verification. |
| `AS-06` Modified managed file | Byte-exact target-owned backup, path disclosure, explicit confirmation, clean replacement, and later backup deletion remaining non-blocking. |
| `AS-07` Unowned collision | Exact-path collision stops with zero writes. |
| `AS-08` Damaged marker | Missing-half/duplicate/nested/damaged marker stops without changing `AGENTS.md` or emitting a derived conflict. |
| `AS-09` Safe uninstall | Only state-owned payload/block removed, target content/backups preserved, state removed last, and injected final state-delete failure reports `FAIL`. |
| `AS-10` AC-pass-but-user-fail | Structural payload/TOML/route/state checks pass while one outer `AGENTS.md` byte changes; overall result is `FAIL`. |
| `AS-11` Containment | Traversal, absolute/empty path, symlink parent, and special-file targets stop without outside-root access. |
| `AS-12` Incomplete operation | Capturable fault withholds success, truthfully reports changed/unchanged paths, preserves available backup/evidence, and causes the next invocation to stop on unhealthy state. |

Scenario IDs or fixture names alone are not evidence. Each row requires executable behavior evidence, except semantic conclusions that necessarily require direct human/evaluator inspection of primary artifacts.

### Package And Reference Closure

- Two clean builds from the same frozen source must produce identical payload paths, payload bytes, per-file hashes, immutable `bundle-inventory.json`, and final inventory/package identity.
- `npm pack --dry-run --json` plus local archive inspection must show only the fixed release surface. The package must contain no `install-state.json`, operation sentinel, target-owned backup, task history, cache, secret, local absolute path, or unrelated file.
- Package metadata must name `@guoxiaoshuai2023/oh-my-harness`; the binary must remain `oh-my-harness`.
- No runtime/reference-bearing installed content may retain source-only `docs/agent-routing` or `task-docs/_harness` paths. Immutable inventory provenance metadata is not a runtime reference.
- Every routed/template/protocol/calibration/script reference in the transformed package must resolve in the generated tree or immutable inventory.
- All six installed TOMLs must parse. Evaluators must retain read-only sandbox, independence, primary-evidence, strict-verdict, no-repair, and canonical calibration-binding requirements. Executor one-boundary-only, allowed/protected path, stop/escalation, and no-fabrication boundaries must remain intact.
- The managed router block must retain always-on safety gates, fixed safety floor/adaptive workflow, route triggers, semantic-risk entry, namespaced routes, target-rule continuity, and material-conflict STOP with equivalent modal force.
- Adaptive default, required full v2, and evidence-backed deliberate full v2 must remain compatible. Complete v2 cannot become the default or be narrowed to explicit request only.

### Runtime And Command Boundary

- Node.js is the lifecycle CLI runtime; no third-party runtime dependency may be introduced.
- Python 3.11 is required only to run the three shipped helper validators, not to launch install/update/uninstall.
- From a final packed installation path, all three helpers must compile under Python 3.11 and each must execute against an appropriate deterministic fixture when its accepted interface applies.
- Canonical lifecycle guidance must use the scoped package plus binary relationship. Tests, metadata, help, docs, examples, and packed content must reject unscoped `npx oh-my-harness` and `--package=oh-my-harness` as valid installer guidance.
- Local pack validation must use OS temporary directories and isolated cache/home with lifecycle scripts, audit, fund, and update notifier disabled. Any child or cleanup failure is a failure; no repository residue may remain.

## 12. Acceptance Criteria

- `T4-AC1`: CI retains every existing source-Harness check and Python 3.11 setup, adds the accepted Node runtime, package build/content validation, lifecycle tests, and all fixture coverage, and proves lifecycle commands add no third-party runtime dependency.
- `T4-AC2`: one matrix maps AS-01 through AS-12 to Task ACs, fixture setup, expected decision, primary evidence, and failure signals; scenarios remain fixtures, not delivery tasks.
- `T4-AC3`: AS-01 through AS-09, AS-11, and AS-12 each have direct isolated lifecycle evidence, including update replace/remove/create, target-owned backup deletion, state-last failure, containment, and incomplete-operation follow-up.
- `T4-AC4`: AS-10 passes structural payload/TOML/route/state checks while changing one outer `AGENTS.md` byte and therefore produces overall `FAIL`.
- `T4-AC5`: exact write-confinement and changed-path evidence prove target-owned ecosystem content remains untouched without whole-repository hashing or semantic scanning.
- `T4-AC6`: final transformed payload has complete reference closure, six valid TOMLs, all three Python helpers compile and each runs against an appropriate deterministic fixture from its packed installation path, calibration binding is consistent, and no source-only runtime path remains.
- `T4-AC7`: modal force, managed block, six profiles, adaptive three-state, full-v2 composition, executor/evaluator boundaries, target authority, and material-conflict STOP pass producer-independent semantic review using primary evidence; structural checks alone cannot satisfy this AC.
- `T4-AC8`: two clean builds have identical paths/bytes/hashes and final inventory identity; dry-run/archive inspection contains only the fixed release surface and no mutable state, backups, history, cache, secrets, or local paths.
- `T4-AC9`: README, architecture, adapter, lifecycle spec/runbook, CLI help, protocols, templates, calibration, and CI consistently use the scoped package/binary, namespace/prefix, Node/Python prerequisite split, authority, evidence limits, and unpublished boundary.
- `T4-AC10`: fresh producer-independent Result QA inspects actual package contents, source/target diffs, all twelve fixtures, semantic evidence, and the disclosed Task 3 waiver risk; the main thread separately inspects primary evidence before final acceptance.
- `T4-AC11`: package metadata, help, README, runbook, examples, tests, and packed archive contain no valid-install guidance using unscoped `oh-my-harness`; a direct negative fixture fails any emitted `npx oh-my-harness` or unscoped `--package=oh-my-harness` command.

## 13. Validation Minimum

The executor must run and report, using the currently accepted supported runtimes:

1. existing Python 3.11 source-Harness compile/TOML/router/adaptive checks represented by CI;
2. focused and complete Node tests, including all new acceptance fixtures;
3. `npm run validate:package`;
4. the new release-content/reference/determinism validation entry points without modifying `package.json`;
5. Python 3.11 compile and applicable execution of all three helpers from a packed installed layout;
6. all twelve scenario fixtures and the AS-10 negative result;
7. scoped command positives and unscoped command negatives;
8. direct semantic-ledger/manual evidence for modal force, router/profile, adaptive/full-v2, executor/evaluator, target authority, and conflict STOP;
9. pre/post Task 1/2/3 dependency hashes and complete allowed/protected changed-path evidence;
10. `git diff --check`, staged/committed delta, complete status, and archive/cache/`node_modules`/temp residue checks.

Exact test/tool file organization and internal function design remain executor choices within the allowed write set. Validation commands and their stable entry points must be documented in the Implementation Report and represented in CI where the contract requires CI enforcement.

## 14. Reporting And Quality Gates

The executor returns one complete Implementation Report in its response and does not create gate artifacts. The report must include:

- exact changed files and their purpose;
- T4-AC1 through T4-AC11 decisions with primary evidence;
- AS-01 through AS-12 matrix/fixture decisions and failure signals;
- commands, exit statuses, key output, and cleanup result;
- final package/inventory identities and two-build comparison;
- semantic/modal-force/profile/router/evaluator/executor evidence;
- pre/post protected hashes, complete status, dirty attribution, staged/committed delta, and residue result;
- what was not validated and remaining risk;
- explicit confirmation of no publication, secrets, external target writes, stage, commit, push, or PR.

The main thread persists the report byte-for-byte, then launches one fresh read-only producer-independent Result Evaluator. The evaluator must inspect actual files, diff, package/archive, fixtures, semantic evidence, protected hashes, and report truthfulness. It cannot repair findings. Only strict `PASS` permits main-thread final acceptance.

## 15. Upstream Finding Routing

If Task 4 evidence exposes a Task 1, Task 2, or Task 3 defect, Task 4 must stop without modifying the protected upstream path.

The main thread must:

1. record the finding, evidence, and owning task;
2. classify whether it is an upstream defect, Task 4 implementation defect, contract insufficiency, or unsupported evaluator finding;
3. return an upstream defect to a new versioned owning-task boundary;
4. perform transitive dependency impact analysis;
5. mark affected downstream acceptance as superseded and revalidate under new identities, or record specific no-impact evidence;
6. create a revised Task 4 boundary only after upstream identities are stable.

Task 4 tests, tools, CI, or evidence must not conceal or patch an upstream defect. A Task 4 implementation defect within this frozen boundary may be repaired only through the accepted retry rules; scope cannot expand.

## 16. Stop Conditions

Stop before writing, or stop further work when applicable, if:

- any frozen identity/hash, branch/base, accepted implementation hash, candidate-doc hash, or dirty-path attribution mismatches;
- an allowed new-only directory already contains unexplained content at launch;
- a required result needs a path outside Section 8 or changes package metadata/production/docs;
- a fixture is only an ID/string-presence check where behavior evidence is required;
- structural validation is presented as semantic proof;
- any scenario, Python helper, package identity, reference closure, or protected-path result cannot be directly verified;
- CI/package validation requires a secret, registry publication, target code execution, network-dependent acceptance, or a new dependency;
- package output contains mutable state, backups, history, cache, secrets, local paths, or unrelated files;
- temporary output or cleanup remains;
- a target reference fixture would require writing to or executing the named external repository;
- an upstream defect is found;
- staged/committed delta becomes nonempty or an external write is requested.

No executor may start until this contract receives strict independent review, is frozen byte-identically at the intended accepted path, and a separate launch baseline passes.

## 17. Downstream Handoff

After strict Task 4 Result QA and main-thread acceptance, stop at a locally release-ready, unpublished package with one final package/inventory identity. Git delivery, PR, merge, npm authentication, registry publication, signing, and release creation remain separate user-authorized transitions.

This contract authorizes no Task 4 implementation until its strict review and accepted freeze are complete.
