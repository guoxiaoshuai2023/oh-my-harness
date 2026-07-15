# Task 2 Execution Contract - Non-Destructive Lifecycle CLI

Identity: `universal-harness-adoption-task-2-contract-20260712-v1`

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

Task identity: `universal-harness-adoption-task-2-lifecycle-cli`

Objective: deliver one Node-standard-library-only CLI that installs, same-version no-ops, updates, and uninstalls the accepted fixed Task 1 bundle through exact ownership, one managed AGENTS block, target-owned backups, containment checks, two-stage verification, and truthful incomplete-state reporting.

Original Request Anchor: requirements v5 Sections 1 and 11-19. The lifecycle must never silently overwrite target-owned content or broaden into repository capability analysis, arbitrary merging, generalized migration, transaction, or crash recovery.

AC-pass-but-user-fail anchor: tests and state parsing can pass while AGENTS outer bytes change, an unowned path is adopted, a modified managed file is replaced without a verified backup/confirmation, state records success before payload verification, or uninstall deletes target-owned content. Any such result is overall FAIL.

Triggered routed authority: `AGENTS.md`, `docs/agent-routing/current-state-evidence.md`, `docs/agent-routing/task-planning-scale.md`, `docs/agent-routing/implementation-boundary.md`, `docs/agent-routing/validation-and-reporting.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`, and `task-docs/_harness/semantic-fidelity-protocol.md`. Direct run-level authority: `task-docs/_harness/run-directory-protocol.md`. External-system/high-risk routes are not triggered because target mutations occur only in isolated temporary fixture repositories and no external system is written.

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

No other repository file may be added or changed. Temporary bundle/package/fixture output must live under OS temporary directories and be removed. Task 1's six accepted evidence artifacts and 12 implementation files are protected and must verify before and after.

## 4. Package And Public CLI Contract

`package.json` is closed to the Task 1 package contract:

- name `@guoxiaoshuai2023/oh-my-harness`;
- version `0.1.0` for local implementation acceptance, not a publication claim;
- `type: module`;
- engines Node `>=24 <25`;
- binary `oh-my-harness` -> `bin/oh-my-harness.mjs`;
- `files`: `bin/`, `src/installer/`, `dist/`, `README.md`;
- no dependencies or devDependencies;
- `prepack` runs `node src/installer/package-bundle.mjs` to regenerate `dist/bundle` deterministically;
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

`package-bundle.mjs` reads package version, removes only package-local generated `dist/bundle`, invokes the accepted Task 1 compiler, and produces the fixed versioned bundle consumed by the CLI. It may not scan source membership or mutate Task 1 inputs. Runtime bundle access is package-relative `dist/bundle`; no branch/main/network source is accepted.

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

Discovery reads only selected bundle inventory/payload, exact destinations and parents, root AGENTS, current inventory/state, exact backup destination when needed, and directly overlapping Git status. It executes no target code. If `.git` and host Git are available, one read-only status command may inspect only planned exact paths with hooks disabled; absence/unavailability is reported and never substitutes for filesystem ownership/hash checks. No whole-repo scan is allowed.

The plan freezes fingerprints for every relevant path, state, inventory, marker, and managed bytes. Apply recomputes them immediately before the first write; any change stops with conflict and no write.

## 7. Path And Filesystem Safety

- Every inventory/state/backup path must be non-empty normalized POSIX repo-relative, with no NUL, absolute path, `.` result, or `..` segment.
- Canonicalize target root; every destination must remain inside it.
- Inspect each existing path component with `lstat`; symlink, special-file, or non-directory parent is conflict. Never follow a state-supplied path before validation.
- Revalidate containment/type immediately before each write/copy/delete.
- Temporary files are same-directory, mode-safe, and atomically renamed where supported. Fail honestly when unavailable; do not claim cross-file atomicity.
- Error output names only the safe repo-relative path and reason, never outside content or secrets.

## 8. Marker And AGENTS Semantics

Markers are exactly `<!-- oh-my-harness:start -->` and `<!-- oh-my-harness:end -->`.

- No markers: install may append the complete block bytes at EOF without altering any existing byte. No separator byte may be inserted outside the managed block.
- Exact one ordered pair: valid only for update/uninstall with matching state ownership.
- Missing half, duplicate, nested, reversed, damaged, unowned, or lookalike `oh-my-harness` marker syntax is conflict before write.
- Update replaces exactly marker-start through marker-end plus the block's own bytes; prefix/suffix are byte-identical.
- Uninstall removes exactly the managed block bytes. If install created an AGENTS file and it still consists only of the installed block, delete it; if target outer bytes were later added, remove only the block and preserve all outer bytes. A pre-existing empty/file mode remains a target-owned file.
- State mode is `created-file` or `managed-block`; it never owns outer bytes.

## 9. Install-State Contract

`.oh-my-harness/install-state.json` is closed schema version `1` with exactly:

```text
schemaVersion
installedVersion
bundleVersion
installer { packageName, binaryName, version, nodeEngine }
target { kind: canonical-root-sha256, value }
operation { id, type, timestamp, priorVersion }
ownedFiles [{ path, sha256, kind }]
agents [{ path, sha256 }]
agentsMd { mode, blockSha256 }
verification { status: verified, timestamp }
backups [{ path, sourcePath, sha256, operationId }]
```

All objects are closed; paths/hashes/version/enum types are validated. `ownedFiles` contains every inventory payload, managed-block asset, and `.oh-my-harness/bundle-inventory.json`, but never state itself. `agents` is the exact six-entry subset. Target identity is SHA-256 of the canonical absolute target root, never the raw path. State from another target, unscoped/mismatched installer identity, incompatible version/schema, invalid ownership, duplicate path, wrong hashes, or unverifiable marker is conflict.

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

Any preflight conflict blocks the whole operation. Capturable write/verification failure stops later writes, never writes the new success state/version, preserves available backups, and reports exact changed/unchanged owned paths. No generalized rollback or crash recovery is claimed. The next lifecycle invocation must detect filesystem/inventory/state mismatch and report incomplete health rather than infer ownership or auto-repair.

Post-install/update verification covers all requirements Section 18 checks without whole-repo scanning: payload/inventory hashes, one block, exact outer bytes, route targets, six TOMLs, evaluator/executor boundaries, installed references, write-confinement log, state/surface match, and protected-path evidence. Parsing/hashes are structural evidence, not target/Harness semantic-equivalence proof.

## 13. Acceptance Criteria And Evidence

All `T2-AC1` through `T2-AC20` from plan v4 are controlling and must be individually rerun. Criterion evidence is:

| AC | Required primary evidence |
| --- | --- |
| 1 | read/open/spawn instrumentation proves exact discovery and no target execution |
| 2 | snapshot of deterministic READY/NO_OP/CONFLICT plan fields |
| 3 | install write/verify/state ordering fault probes |
| 4 | binary outer-byte fixtures, absent-created and later-outer-content cases |
| 5 | full marker matrix plus `--yes`/unknown `--force` bypass negatives |
| 6 | before/after complete tree hashes and state timestamp equality |
| 7 | synthetic old/new inventory replace/remove/create/collision transition table |
| 8 | unmanaged namespace/profile/dirty-overlap conflict fixtures |
| 9 | modified file/block backup pre-action/pre-success hashes and confirmation fixtures |
| 10 | missing historical backup remains informational |
| 11 | state-last uninstall, outer preservation, residue, final-state-delete fault |
| 12 | traversal/absolute/NUL/symlink/special/outside probes with outside canary |
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

- exact Node 24 `--test test/bundle/*.test.mjs test/lifecycle/*.test.mjs`;
- `npm test` with network disabled;
- `npm pack --pack-destination <temp>` and archive allowlist inspection;
- canonical local archive install/no-op/update/uninstall smoke in isolated temp repos;
- all marker, lifecycle, transition, containment, backup, failure-injection, state and secret-safety fixtures;
- fresh build/inventory/reference/profile/router verification;
- Task 1 accepted chain and 12 hashes before/after;
- exact write-universe before/after, complete status, no staged/committed delta, `git diff --check`.

Implementation Report identity: `universal-harness-adoption-task-2-implementation-report-20260712-v1`, persisted by main thread as `IMPLEMENTATION_REPORT.md`. It must include exact files/hashes, commands/statuses, T2-AC1..20 evidence, package/archive inventory, lifecycle/fault tables, protected state, unvalidated scope, and no self-acceptance.

Result QA must be fresh, read-only, producer-independent, calibration-bound, inspect actual files/output, rerun primary behavior, issue separate Implementation Verification/Semantic Validation/Overall/final PASS or FAIL, and perform no repair.

## 15. Stop Conditions

Stop and return to contract design or owning upstream task if:

- any authority/upstream/baseline hash mismatches;
- a Task 1 file or behavior is insufficient or would need modification;
- safe behavior needs an unowned write, target code execution, extra repository file, dependency, source/doc/CI edit, or Task 3/4 path;
- containment/ownership/marker/state cannot be proven;
- generalized merge/transaction/recovery/concurrency/multi-runtime behavior is needed;
- package creation requires registry/network/authentication/publication;
- any protected or unexplained dirty path changes.

Executor nested delegation is prohibited. No stage, commit, push, PR, publication, external target write, or secrets. Stop after Task 2 main-thread decision; Tasks 3 and 4 remain not started.
