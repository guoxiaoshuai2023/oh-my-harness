# Task 2 Execution Contract - Non-Destructive Lifecycle CLI

Identity: `universal-harness-adoption-task-2-contract-20260712-v2`

Status: `PROPOSED FOR STRICT REVIEW`

Producer may reinterpret or modify this boundary: `no`

## 1. Authority And Objective

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Implementation plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |
| Task 1 accepted evidence chain | `universal-harness-adoption-task-1-accepted-evidence-chain-20260712-v1` | `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c` |
| Task 2 contract-state baseline | `universal-harness-adoption-task-2-contract-state-baseline-20260712-v1` | `e4c056922531a1d4b5511b03a9bac579e53a5edb4a58668cd284f28ef9fefa7f` |
| Contract Review 01 | `universal-harness-adoption-task-2-contract-review-20260712-v1` | `eea09c753943630df133ea16fc8a767f13e43d2a4d8e6268b71df68cc42678b9` |
| Complete dirty-worktree baseline | `universal-harness-adoption-task-2-dirty-worktree-baseline-20260712-v2` | `17bc1c59c29f480838eedcf66addc61c4b943a5441cdee0fefbf0e8c3260101e` |
| Node 24 runtime evidence | `universal-harness-adoption-task-2-node24-runtime-evidence-20260712-v1` | `9bf865f9533f5fcf16fe487275f638eb996206a6470ae8a50f8c3dc506a937b1` |

Task identity: `universal-harness-adoption-task-2-lifecycle-cli`

Objective: deliver one Node-standard-library-only CLI that installs, same-version no-ops, updates, and uninstalls the accepted fixed Task 1 bundle through exact ownership, one managed AGENTS block, target-owned backups, containment checks, two-stage verification, and truthful incomplete-state reporting.

Original Request Anchor: requirements v5 Sections 1 and 11-19. The lifecycle must never silently overwrite target-owned content or broaden into repository capability analysis, arbitrary merging, generalized migration, transaction, or crash recovery.

AC-pass-but-user-fail anchor: tests and state parsing can pass while AGENTS outer bytes change, an unowned path is adopted, a modified managed file is replaced without a verified backup/confirmation, state records success before payload verification, or uninstall deletes target-owned content. Any such result is overall FAIL.

Triggered routed authority: `AGENTS.md`, `docs/agent-routing/current-state-evidence.md`, `docs/agent-routing/high-risk-actions.md`, `docs/agent-routing/task-planning-scale.md`, `docs/agent-routing/implementation-boundary.md`, `docs/agent-routing/validation-and-reporting.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`, and `task-docs/_harness/semantic-fidelity-protocol.md`. Direct run-level authority: `task-docs/_harness/run-directory-protocol.md`.

High-risk gate ownership is fixed: the main thread owns the versioned boundary, confirmation model, and final decision; the executor owns exact-path preview, backup-before-destructive-action, immediate recheck, implementation, and post-action evidence; the producer-independent Result Evaluator owns independent inspection of deletion/replacement outcomes, backups, outer-byte preservation, and truthful failure evidence. Exact actions and targets are isolated temporary fixture repositories only. No real downstream repo or external system is written.

## 2. In Scope And Out Of Scope

In scope:

- install/update/uninstall CLI and explicit target selection;
- package metadata, lockfile, binary, local pack scripts, fixed bundle packaging;
- exact-surface discovery, deterministic plan/summary, confirmation, and immediate recheck;
- marker parsing/editing and AGENTS outer-byte preservation;
- state, ownership, backup, containment, no-op, transition, uninstall, and incomplete-state behavior;
- focused unit/integration and local `.tgz` tests in isolated temporary repositories.

Out of scope:

- Task 1 edits, Task 3/4 docs/CI/acceptance work, source Harness edits, dependencies;
- whole-repo discovery, semantic equivalence, arbitrary config merge, customization reapply, migration, cross-file transaction, automatic recovery, concurrency/locking, multi-runtime/global install;
- target code/hooks/plugins/CI/scripts/package-manager execution;
- registry reads/authentication/publication/signing/releases, real downstream target mutation, secrets.

## 3. Exact Write Universe

Only these previously absent repository files may be created:

- `package.json`
- `package-lock.json`
- `bin/oh-my-harness.mjs`
- `src/installer/cli.mjs`
- `src/installer/lifecycle.mjs`
- `src/installer/filesystem.mjs`
- `src/installer/markers.mjs`
- `src/installer/state.mjs`
- `src/installer/package-bundle.mjs`
- `test/lifecycle/cli.test.mjs`
- `test/lifecycle/lifecycle.test.mjs`
- `test/lifecycle/security.test.mjs`
- `test/lifecycle/test-helpers.mjs`

No other persistent repository file may be added or changed. One transient generated boundary is authorized solely for package validation: `dist/bundle/**`. Before each `npm pack`, `dist/` must be absent; `prepack` may create only `dist/bundle/**`; after archive inspection and each test, `dist/` must be removed and proven absent. The executor may not edit generated bytes by hand or retain them as implementation output.

Package archives and target fixtures live only under a newly created OS temporary root. Target-side same-directory atomic-write temporaries are limited to `.<basename>.oh-my-harness-tmp-<operation-id>`; state uses `.oh-my-harness/.install-state.json.oh-my-harness-tmp-<operation-id>`. A surviving temporary is incomplete state and never ownership authority.

Task 1's six accepted evidence artifacts and 12 implementation files are protected and must verify before and after. Every pre-existing untracked file in the complete dirty-worktree baseline is protected byte-for-byte; Task 2 gate artifacts created after that baseline are additive and may not overwrite any baseline row.

## 4. Package And Public CLI Contract

`package.json` is closed to the Task 1 package contract:

- name `@guoxiaoshuai2023/oh-my-harness`;
- version `0.1.0` for local implementation acceptance, not a publication claim;
- `type: module`;
- engines Node `>=24 <25`;
- binary `oh-my-harness` -> `bin/oh-my-harness.mjs`;
- `files`: `bin/`, `src/installer/`, `dist/`, `README.md`;
- no dependencies or devDependencies;
- `prepack` runs `node src/installer/package-bundle.mjs` to remove only an existing generated `dist/bundle`, recreate `dist/bundle` through the accepted Task 1 compiler, and touch no other path;
- `test` runs the bundle and lifecycle Node tests;
- lockfile package identity/version/bin/engine match exactly.

Public syntax is exactly:

```text
oh-my-harness install --target <repo> [--dry-run] [--yes]
oh-my-harness update --target <repo> [--dry-run] [--yes]
oh-my-harness uninstall --target <repo> [--dry-run] [--yes]
```

Unknown/duplicate flags, missing operation/target, `--force`, or extra arguments fail usage. Exit codes: `0` success/no-op/clean dry-run; `2` usage; `3` confirmation declined/required; `4` conflict; `5` write/verification/incomplete-operation failure. The CLI always prints the plan before confirmation. `--dry-run` never prompts or writes. `--yes` is explicit confirmation after the plan; it cannot bypass any gate. Without `--yes`, a TTY receives one yes/no prompt; non-TTY exits `3` after the plan.

The lifecycle runtime is Node-only and stdlib-only. Python is not used to launch lifecycle commands. The three Python helpers remain required payload and require Python 3.11 only when users run them.

## 5. Fixed Package Bundle

`package-bundle.mjs` reads package version, refuses any existing `dist/` entry other than its own prior generated `dist/bundle`, removes only that generated subtree, invokes the accepted Task 1 compiler with repository root as read-only source and `dist/bundle` as output, and produces the fixed bundle consumed by the CLI. It may not scan source membership or mutate Task 1 inputs. Runtime bundle access is package-relative `dist/bundle`; no branch/main/network source is accepted.

The executable package-validation sequence is fixed:

```sh
export PATH="/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
test "$(node --version)" = "v24.14.0"
test ! -e dist
tmp_root="$(mktemp -d)"
npm_config_offline=true npm pack --pack-destination "$tmp_root"
tar -tf "$tmp_root"/*.tgz
rm -rf dist
test ! -e dist
```

The OS temporary root is outside the repository, newly created for the attempt, used only for archive/fixtures, and removed at the end. Failure before cleanup is reported; main-thread post-check removes no unexplained output and treats retained `dist/` as FAIL.

`npm pack --pack-destination <temp>` must produce a local archive containing only package metadata/README, the binary, installer modules, and generated fixed bundle. Planning/history/tests, install-state, backups, caches, secrets, and local absolute paths are excluded. Unscoped `npx oh-my-harness` is never emitted or accepted as canonical guidance.

## 6. Plan And Discovery Model

Every operation first produces a closed deterministic plan object with:

```text
operation, currentVersion, targetVersion, status,
creates, replaces, removes, blockAction,
modifiedManaged, backups, protected, conflicts,
gitOverlap, verification
```

Arrays are sorted repo-relative paths. Status is `READY`, `NO_OP`, or `CONFLICT`. The plan lists exact payload/state/block effects and never includes unrelated target content or file bytes.

Discovery reads only selected bundle inventory/payload, exact destinations and parents, root AGENTS, current inventory/state, exact backup destination when needed, and directly overlapping Git status. It executes no target code. For a target with `.git`, the CLI must run exactly one read-only overlap inspection using host Git with hooks disabled and pathspecs limited to planned exact paths and their required parents: `git -c core.hooksPath=/dev/null -C <target> status --short --untracked-files=all -- <pathspecs...>`. Git failure is reported as `CONFLICT`; it never falls back to whole-repo inspection. A target without `.git` reports `gitOverlap: not-a-git-repository` and relies on filesystem ownership/hash checks. No whole-repo scan is allowed.

The plan freezes fingerprints for every relevant path, state, inventory, marker, and managed bytes. Apply recomputes them immediately before the first write; any change stops with conflict and no write.

## 7. Path And Filesystem Safety

- Every inventory/state/backup path must be non-empty normalized POSIX repo-relative, with no NUL, absolute path, `.` result, or `..` segment.
- Canonicalize target root; every destination must remain inside it.
- Inspect each existing path component with `lstat`; symlink, special-file, or non-directory parent is conflict. Never follow a state-supplied path before validation.
- Revalidate containment/type immediately before each write/copy/delete.
- Temporary files are same-directory, mode-safe, and atomically renamed where supported. Fail honestly when unavailable; do not claim cross-file atomicity.
- Error output names only the safe repo-relative path and reason, never outside content or secrets.

## 8. Marker And AGENTS Semantics

Markers are byte-exact `<!-- oh-my-harness:start -->` and `<!-- oh-my-harness:end -->`.

The closed scanner first finds every byte occurrence of either exact marker. It also treats as reserved lookalike syntax any HTML-comment opener `<!--` followed before its closer or EOF by ASCII case-insensitive `oh-my-harness` and `start` or `end`. A reserved occurrence that is not one of the two byte-exact markers is damaged/lookalike and conflicts. Ordinary prose mentioning oh-my-harness outside such a comment is target-owned content and is not a marker.

Required negative fixtures are: start-only; end-only; two starts/one end; one start/two ends; two complete pairs; start-start-end-end nesting; end-before-start; exact words with added/removed whitespace; case-changed token; colon/action typo; and unclosed marker-like HTML comment. Exact one start followed by exact one end is the only owned-block shape.

- No markers: install may append the complete block bytes at EOF without altering any existing byte. No separator byte may be inserted outside the managed block.
- Exact one ordered pair: valid only for update/uninstall with matching state ownership.
- Missing half, duplicate, nested, reversed, damaged, unowned, or lookalike `oh-my-harness` marker syntax is conflict before write.
- Update replaces exactly marker-start through marker-end plus the block's own bytes; prefix/suffix are byte-identical.
- Uninstall removes exactly the managed block bytes. If install created an AGENTS file and it still consists only of the installed block, delete it; if target outer bytes were later added, remove only the block and preserve all outer bytes. A pre-existing empty/file mode remains a target-owned file.
- State mode is `created-file` or `managed-block`; it never owns outer bytes.

## 9. Install-State Contract

`.oh-my-harness/install-state.json` is UTF-8 canonical JSON with schema version integer `1`, no additional keys at any object level, and these exact fields and types:

```text
schemaVersion: 1
installedVersion: non-empty semver string
bundleVersion: same string as installedVersion
installer:
  packageName: "@guoxiaoshuai2023/oh-my-harness"
  binaryName: "oh-my-harness"
  version: same string as installedVersion
  nodeEngine: ">=24 <25"
target:
  kind: "canonical-root-sha256"
  value: 64 lowercase hex
operation:
  id: 24 lowercase hex
  type: "install" | "update"
  timestamp: UTC ISO-8601 string
  priorVersion: null for install | non-empty semver string for update
ownedFiles: sorted unique array of:
  path: validated repo-relative path
  sha256: 64 lowercase hex released/accepted bytes
  kind: "payload" | "inventory"
agents: sorted exact six-entry array of:
  path: ".codex/agents/oh-my-harness-*.toml"
  sha256: matching ownedFiles hash
agentsMd:
  mode: "created-file" | "managed-block"
  blockSha256: 64 lowercase hex
verification:
  status: "verified"
  timestamp: UTC ISO-8601 string not earlier than operation.timestamp
backups: sorted unique array of:
  path: validated path under ".oh-my-harness-backups/<operation-id>/"
  sourcePath: validated managed repo-relative source or "AGENTS.md#managed-block"
  sha256: 64 lowercase hex
  operationId: equal operation.id
```

`ownedFiles` contains every inventory payload and `.oh-my-harness/bundle-inventory.json`, but never state itself or the AGENTS block. `agents` is the exact six-entry subset and must agree with `ownedFiles`. Target identity is SHA-256 of the canonical absolute target root, never the raw path.

A malformed state, invalid path/type/enum, duplicate, self-ownership, identity/target mismatch, impossible ownership set, state-record hash inconsistency, or unprovable marker ownership is `CONFLICT`. By contrast, a structurally valid state whose recorded owned-file or block hash differs from current managed bytes is managed-content drift: update/uninstall may proceed only through path-specific disclosure, verified backup, and confirmation. A drifted `bundle-inventory.json` is backed up as managed content but is not trusted; old ownership comes only from the validated state and the new release surface comes only from the package inventory. Drift or corruption of `install-state.json` itself is never auto-adopted or replaced and is `CONFLICT`.

Operation ID is deterministic SHA-256 over operation, target identity, old/new versions, and sorted pre-change managed path/hashes, shortened to 24 lowercase hex characters. Timestamp is UTC ISO-8601 and is written only for a successful new state. Same-version no-op never rewrites timestamps or state.

## 10. Install, Update, And Uninstall

Install:

1. validate fixed inventory/package identity and exact target surface;
2. conflict on unmanaged `.oh-my-harness/`, unowned required/prefixed target, invalid marker, or overlapping unowned destination;
3. plan, disclose, confirm, recheck;
4. write all payload files/inventory and one managed block;
5. verify payload, references, profiles, router block, hashes, and outer bytes;
6. write state only after payload verification; verify state against actual surface; then report success.

Update:

- requires valid old inventory/state/target/marker ownership;
- replace/remove only old state-owned paths;
- create only new required paths absent from old ownership and absent on disk;
- existing unowned new path is conflict;
- compare current bytes to old state, back up every modified managed file/block, disclose and confirm;
- no three-way merge or customization reapply;
- verify new payload/block/references before replacing state, then verify state;
- same installed matching version with matching surface is byte-for-byte `NO_OP`.

Uninstall:

- requires valid inventory/state/target/marker ownership;
- back up and confirm modified managed files/block;
- remove only state-proven owned files/block;
- verify target outer bytes and backups remain;
- delete install-state last; deletion failure means FAIL;
- remove only Harness-created directories that are empty after state deletion;
- preserve and report target-owned backup root/residue.

## 11. Backup Contract

Backups use `.oh-my-harness-backups/<operation-id>/<source-relative-path>`; managed block backup is `AGENTS.md.managed-block`. They preserve exact bytes and directory structure, are created before destructive action, and are hash-verified before replacement/removal and again before operation success. Collision with differing backup bytes is conflict; identical retry bytes may be reused after verification.

Backups are target-owned opaque recovery artifacts. The installer may copy/hash but never parse, echo, redact, transform, overwrite after creation, or delete them. State backup records are historical information, not ownership. Later manual absence is informational and cannot fail health, block lifecycle, or authorize recreation.

## 12. Failure And Verification Boundary

Any preflight conflict blocks the whole operation. Capturable failure stops later lifecycle writes, preserves available verified backups, and reports exact changed, unchanged, temporary, and state paths. No generalized rollback or crash recovery is claimed.

Residual-state rules are exact:

- payload/block write or payload verification fails before state work: install leaves state absent; update leaves the previous state byte-identical; filesystem/state mismatch is reported incomplete;
- state temporary write or verification-before-rename fails: previous state remains byte-identical (or absent for install); the named temporary is removed if safe, otherwise reported as incomplete residue;
- atomic state rename fails: previous state remains (or state is absent for install); report failure;
- state rename succeeds but post-state verification/read fails: the new state may remain, but success is forbidden; report that state replacement occurred and require the next invocation to revalidate the entire surface;
- uninstall fails before final state deletion: old state remains and the partial deletion set is reported;
- final state deletion fails: old state remains and uninstall is FAIL;
- a next invocation that sees state/filesystem/temp mismatch reports incomplete health and stops without inference, repair, rollback, or state rewrite.

“Never writes the new success state” means no success state is recorded before payload verification. It does not erase an atomically renamed candidate state after a post-state verification failure; that exact residual is disclosed and remains unaccepted until a later invocation independently verifies it.

Post-install/update verification covers all requirements Section 18 checks without whole-repo scanning: payload/inventory hashes, one block, exact outer bytes, route targets, six TOMLs, evaluator/executor boundaries, installed references, write-confinement log, state/surface match, and protected-path evidence. Parsing/hashes are structural evidence, not target/Harness semantic-equivalence proof.

## 13. Acceptance Criteria And Evidence

All `T2-AC1` through `T2-AC20` from plan v4 are controlling and must be individually rerun. Criterion evidence is:

| AC | Required primary evidence |
| --- | --- |
| 1 | read/open/spawn instrumentation proves exact discovery and no target execution |
| 2 | snapshot of deterministic READY/NO_OP/CONFLICT plan fields |
| 3 | complete installed-tree versus fixed inventory file/hash comparison, exact six agents, every required payload, exactly one substantive managed block, plus payload-verify/state-write/state-verify ordering fault probes |
| 4 | binary outer-byte fixtures, absent-created and later-outer-content cases |
| 5 | full marker matrix plus `--yes`/unknown `--force` bypass negatives |
| 6 | before/after complete tree hashes and state timestamp equality |
| 7 | synthetic old/new inventory replace/remove/create/collision transition table |
| 8 | unmanaged namespace/profile/dirty-overlap conflict fixtures |
| 9 | modified file/block backup pre-action/pre-success hashes and confirmation fixtures |
| 10 | missing historical backup remains informational |
| 11 | state-last uninstall, outer preservation, residue, final-state-delete fault |
| 12 | instrumented read/open/write/delete/spawn log for every traversal/absolute/NUL/symlink/special/outside case, proving no resolved outside access, plus unchanged outside canary |
| 13 | mutation-after-plan fingerprint probe |
| 14 | copied/wrong-target state rejection |
| 15 | malformed/incompatible/insufficient state and no name-based ownership |
| 16 | payload/state write/verify fault matrix and truthful changed/unchanged report |
| 17 | next-invocation incomplete mismatch detection without repair |
| 18 | output/state/log secret-safe assertions and opaque backup behavior |
| 19 | package/lock/bin/engine/files/no-dependency checks and local `.tgz` CLI smoke |
| 20 | scoped identity/version compatibility in inventory/state and mismatch negatives |

Any unverified AC, P0/P1, outer-byte drift, unowned mutation, false success, or structural-evidence overclaim is FAIL.

## 14. Required Validation

- prepend the verified Node 24 directory from `NODE24_RUNTIME_EVIDENCE.md`, assert `node --version` is `v24.14.0`, and stop otherwise;
- exact Node 24 `node --test test/bundle/*.test.mjs test/lifecycle/*.test.mjs`;
- `npm_config_offline=true npm test`;
- `npm pack --pack-destination <temp>` and archive allowlist inspection;
- canonical local archive install/no-op/update/uninstall smoke in isolated temp repos;
- all marker, lifecycle, transition, containment, backup, failure-injection, state and secret-safety fixtures;
- fresh build/inventory/reference/profile/router verification;
- Task 1 accepted chain and 12 hashes before/after;
- exact persistent write-universe before/after; transient `dist/bundle/**` creation and cleanup evidence; complete status; no staged/committed delta; `git diff --check`;
- exact pre/post comparison of every row in `DIRTY_WORKTREE_BASELINE_V2.md`, plus hashes for all subsequently frozen contract/review/manifest/launch artifacts.

Implementation Report identity: `universal-harness-adoption-task-2-implementation-report-20260712-v1`, persisted by main thread as `IMPLEMENTATION_REPORT.md`. It must include exact files/hashes, commands/statuses, T2-AC1..20 evidence, package/archive inventory, lifecycle/fault tables, protected state, unvalidated scope, and no self-acceptance.

Result QA must be fresh, read-only, producer-independent, calibration-bound, inspect actual files/output, rerun primary behavior, issue separate Implementation Verification/Semantic Validation/Overall/final PASS or FAIL, and perform no repair.

## 15. Stop Conditions

Stop and return to contract design or owning upstream task if:

- any authority/upstream/baseline hash mismatches;
- the verified Node executable does not report `v24.14.0` or npm would require runtime provisioning/network access;
- a Task 1 file or behavior is insufficient or would need modification;
- safe behavior needs an unowned write, target code execution, extra repository file, dependency, source/doc/CI edit, or Task 3/4 path;
- containment/ownership/marker/state cannot be proven;
- generalized merge/transaction/recovery/concurrency/multi-runtime behavior is needed;
- package creation requires registry/network/authentication/publication;
- any protected or unexplained dirty path changes.

Executor nested delegation is prohibited. No stage, commit, push, PR, publication, external target write, or secrets. Stop after Task 2 main-thread decision; Tasks 3 and 4 remain not started.

## 16. Contract Review 01 Disposition

All six P1 findings are accepted and closed by this iteration:

- package generation has one explicit transient `dist/bundle/**` boundary, exact Node/npm commands, archive location, and cleanup proof;
- state schema, drift distinction, marker grammar, and every state-write/verification residual are closed;
- local Node `v24.14.0` and invocation are frozen without provisioning;
- the complete pre-existing untracked inventory is hash-protected;
- T2-AC3 and T2-AC12 require outcome-level tree/block and read/open/write/delete evidence;
- the high-risk route, gate owners, confirmation, backup, post-action evidence, and independent decision are bound.

No finding changes Task 1, the Task 2 objective, or the persistent implementation write set.
