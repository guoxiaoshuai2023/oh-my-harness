# Task 2 Execution Contract - Non-Destructive Lifecycle CLI

Identity: `universal-harness-adoption-task-2-contract-20260712-v3`

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
| Contract Review 02 | `universal-harness-adoption-task-2-contract-review-20260712-v2` | `6dc69326796c4565ed15041fde752695254b16e187dbb71d8a9f2592608eb503` |

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

Package archives and target fixtures live only under a newly created OS temporary root. Target-side same-directory atomic-write temporaries are limited to `.<basename>.oh-my-harness-tmp-<operation-id>`; state uses `.oh-my-harness/.install-state.json.oh-my-harness-tmp-<operation-id>`.

Before the first payload/block replacement or deletion, every non-no-op apply creates one UTF-8 canonical JSON detection sentinel at `.oh-my-harness/.operation-in-progress.json` (install creates the namespace directory and sentinel first). It contains only schema `1`, operation ID/type, target identity, prior state SHA or `null`, requested version or `null`, and plan SHA. It is transient detection metadata, not release payload, install-state ownership, recovery authority, or a transaction log. An existing sentinel or same-directory temporary always means incomplete operation and blocks every lifecycle mutation. The sentinel is deleted only after successful post-state verification for install/update, or after state-last deletion and preservation verification for uninstall. Sentinel-deletion failure makes the operation FAIL and leaves an observable incomplete state.

Task 1's six accepted evidence artifacts and 12 implementation files are protected and must verify before and after. Every pre-existing untracked file in the complete dirty-worktree baseline is protected byte-for-byte; Task 2 gate artifacts created after that baseline are additive and may not overwrite any baseline row.

## 4. Package And Public CLI Contract

`package.json` is closed to the Task 1 package contract:

- name `@guoxiaoshuai2023/oh-my-harness`;
- version `0.1.0` for local implementation acceptance, not a publication claim;
- `type: module`;
- engines Node `>=24 <25`;
- binary `oh-my-harness` -> `bin/oh-my-harness.mjs`;
- `files`, in this exact order and spelling: `bin/oh-my-harness.mjs`, `src/installer/**`, `dist/**`, `README.md`, `package.json`;
- no dependencies or devDependencies;
- `prepack` runs `node src/installer/package-bundle.mjs`; that command requires `dist/` to be absent, creates only `dist/bundle/**` through the accepted Task 1 compiler, and touches no other path;
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

`package-bundle.mjs` reads package version, requires `dist/` not to exist, invokes the accepted Task 1 compiler with repository root as read-only source and `dist/bundle` as output, and produces the fixed bundle consumed by the CLI. Existing `dist`, including a prior-looking bundle, is unexplained and causes STOP; the script never adopts or deletes it. It may not scan source membership or mutate Task 1 inputs. Runtime bundle access is package-relative `dist/bundle`; no branch/main/network source is accepted.

The executable package-validation sequence is fixed:

```sh
export PATH="/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
test "$(node --version)" = "v24.14.0"
test ! -e dist
tmp_root="$(mktemp -d)"
npm_config_offline=true npm pack --pack-destination "$tmp_root"
tar -tf "$tmp_root"/*.tgz
# Verify dist/bundle is a regular, symlink-free tree whose exact files and hashes
# match its just-built inventory. Only then remove dist/bundle and rmdir dist.
# Verify tmp_root is the exact mktemp result, then remove that owned temp root.
test ! -e dist
test ! -e "$tmp_root"
```

Cleanup is implemented by the Node package helper, not an unchecked shell `rm -rf dist`: it `lstat`s every generated component, rejects links/special files/unexpected entries, compares the exact generated file list and hashes to the just-built inventory, recursively removes only verified `dist/bundle`, and removes `dist` only with non-recursive `rmdir`. It separately validates that the temporary root is the exact newly-created `mktemp` directory for this process before recursively deleting that owned root. A mismatch stops cleanup, reports the residue, and fails acceptance; neither executor nor main thread removes unexplained residue.

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

Discovery reads only selected bundle inventory/payload, exact destinations and parent metadata through bounded `lstat`, root AGENTS, current inventory/state/sentinel, exact backup destination when needed, and directly overlapping Git status. It executes no target code.

For a target with `.git`, the CLI runs exactly one subprocess with these environment/config constraints: `GIT_OPTIONAL_LOCKS=0`, `GIT_LITERAL_PATHSPECS=1`, `GIT_CONFIG_NOSYSTEM=1`, `GIT_CONFIG_GLOBAL=/dev/null`, `GIT_TERMINAL_PROMPT=0`, `GIT_PAGER=cat`; and `git -c core.hooksPath=/dev/null -c core.fsmonitor=false -c core.untrackedCache=false -C <target> status --porcelain=v1 --untracked-files=all -- <exact-destination-pathspecs>`. Pathspecs are only literal exact planned files, exact state/sentinel/marker path, and exact backup files; no directory/parent pathspec or glob is permitted. Parent safety is inspected through `lstat`, not Git. Git failure is `CONFLICT`; no fallback scan occurs. Tests hash `.git/index` and inventory unrelated target paths before/after and assert output contains only exact pathspec matches. A target without `.git` reports `gitOverlap: not-a-git-repository`.

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

The scanner examines bytes left-to-right. An HTML-comment candidate begins at exact ASCII `<!--` and ends at the next exact `-->`, or EOF if unterminated. ASCII-lowercase the candidate body only for classification. A candidate is reserved marker-like when its body matches `^[\\t\\r\\n ]*oh-my-harness[\\t\\r\\n ]*:` case-insensitively. Reserved candidates are accepted only when the complete candidate bytes equal one exact marker above; every other reserved candidate conflicts. Token order is therefore `oh-my-harness` then colon then action; exact accepted action/case/spacing is fixed. Ordinary prose and non-comment product mentions are target-owned.

After classification, exactly one start and one later end are required for an existing owned block. Any missing, duplicate, nested, or reversed exact marker conflicts. Required negatives: start-only; end-only; two starts/one end; one start/two ends; two pairs; start-start-end-end; end-before-start; added/removed whitespace; case change; unknown/misspelled action after the reserved prefix; and unterminated reserved comment.

The current owned byte interval is deterministic: it starts at the first byte of the exact start marker and ends immediately after the exact end marker, plus exactly one following LF byte if present. No CR or additional LF is owned. The clean installed asset is required to equal that interval and ends in exactly one LF. For drift, backup and replacement/removal use that same located interval. Prefix is every byte before start; suffix is every byte after the owned interval; both must remain byte-identical. If the managed LF was removed, no suffix byte is consumed and replacement reintroduces the release LF. If CRLF or another byte follows end, it is suffix and remains untouched.

- No markers: install may append the complete block bytes at EOF without altering any existing byte. No separator byte may be inserted outside the managed block.
- Exact one ordered pair: valid only for update/uninstall with matching state ownership.
- Missing half, duplicate, nested, reversed, damaged, unowned, or lookalike `oh-my-harness` marker syntax is conflict before write.
- Update replaces exactly the owned interval defined above with the exact release asset; prefix/suffix are byte-identical.
- Uninstall removes exactly the current owned interval defined above. If install created an AGENTS file and it still consists only of the installed block, delete it; if target outer bytes were later added, remove only the block and preserve all outer bytes. A pre-existing empty/file mode remains a target-owned file.
- State mode is `created-file` or `managed-block`; it never owns outer bytes.

## 9. Install-State Contract

`.oh-my-harness/install-state.json` is canonical JSON: recursively sort object keys by Unicode code-point order; use the already prescribed array ordering; serialize with ECMAScript `JSON.stringify` and no whitespace; encode UTF-8 without BOM; append exactly one LF. No non-finite number is permitted. Schema version is integer `1`, there are no additional keys at any object level, and fields/types are:

```text
schemaVersion: 1
installedVersion: version matching ^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$
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
  timestamp: exact Date.toISOString() form YYYY-MM-DDTHH:mm:ss.sssZ
  priorVersion: null for install | version matching installedVersion grammar for update
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
  timestamp: exact Date.toISOString() form, not earlier than operation.timestamp
backups: sorted unique array of:
  path: validated path under ".oh-my-harness-backups/<operation-id>/"
  sourcePath: validated managed repo-relative source or "AGENTS.md#managed-block"
  sha256: 64 lowercase hex
  operationId: equal operation.id
```

`ownedFiles` contains every inventory payload and `.oh-my-harness/bundle-inventory.json`, but never state itself or the AGENTS block. `agents` is the exact six-entry subset and must agree with `ownedFiles`. Target identity is lowercase SHA-256 of the exact UTF-8 bytes of the absolute string returned by `fs.realpath(targetRoot)` with no Unicode or slash rewriting, never the raw user argument.

A malformed state, invalid path/type/enum, duplicate, self-ownership, identity/target mismatch, impossible ownership set, state-record inconsistency, unprovable marker ownership, existing operation sentinel/temp, or missing state-owned path is `CONFLICT`/incomplete and cannot mutate. With valid state and no sentinel/temp, an existing regular state-owned file whose bytes differ from its recorded hash, or an exactly locatable managed block whose interval differs from `blockSha256`, is confirmable managed-content drift: update/uninstall may proceed only through path-specific disclosure, verified backup, and confirmation. A drifted `bundle-inventory.json` is backed up as managed content but is not trusted; old ownership comes only from the validated state and the new release surface comes only from the package inventory. Drift or corruption of `install-state.json` itself is never auto-adopted or replaced and is `CONFLICT`.

Operation ID preimage is canonical JSON without the final LF, using the same canonicalizer, with exact fields `schemaVersion: 1`, `operation: "install"|"update"|"uninstall"`, `targetIdentity`, `invokerVersion`, `installedVersion` (null for install), `requestedVersion` (invoker version for install/update, null for uninstall), and `managed` (sorted `{path,sha256,kind}` current state entries, empty for install, plus `{path:"AGENTS.md#managed-block",sha256,kind:"managed-block"}` when state exists). Operation ID is the first 24 lowercase hex characters of SHA-256 over those UTF-8 bytes.

Compatibility is schema-based and exact: every accepted package inventory/state must use schema `1`, package `@guoxiaoshuai2023/oh-my-harness`, binary `oh-my-harness`, Node engine `>=24 <25`, valid version grammar, and internally equal bundle/installer versions. Install requires the invoking package version equal its inventory bundle version. Update may move between different valid versions, including an explicitly selected lower version, only when old state/old inventory and invoking package/new inventory all satisfy this v1 identity matrix. Uninstall may use any invoking package satisfying the same v1 matrix; it deletes only state ownership. Missing/unscoped/mismatched identity, engine, schema, or internal version equality is `CONFLICT`. A future incompatible lifecycle must increment schema; no guessing or coercion is permitted. Timestamp is written only for a successful candidate state. Same-version no-op never rewrites timestamps or state.

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

Any preflight conflict blocks the whole operation. The operation sentinel is written and verified after confirmation/recheck and before the first payload/block replacement/deletion. Its presence is the durable distinction between user drift and a prior incomplete operation. Capturable failure after sentinel creation leaves the sentinel in place, stops later lifecycle writes, preserves available verified backups, and reports exact changed, unchanged, temporary, sentinel, and state paths. No generalized rollback or crash recovery is claimed.

Residual-state rules are exact:

- payload/block write or payload verification fails before state work: install leaves state absent; update leaves previous state byte-identical; sentinel remains and classifies the surface as incomplete;
- state temporary write or verification-before-rename fails: previous state remains byte-identical (or absent for install); sentinel remains; the named temporary is removed only after exact-name/type/containment validation, otherwise also remains as reported residue;
- atomic state rename fails: previous state remains (or state is absent for install); report failure;
- state rename succeeds but post-state verification/read fails: the new state may remain, sentinel remains, success is forbidden, and the exact replacement is reported;
- successful post-state verification is followed by sentinel deletion; failure to delete it is FAIL even though the new state/payload may be complete;
- uninstall fails before final state deletion: old state and sentinel remain and the partial deletion set is reported;
- final state deletion fails: old state and sentinel remain and uninstall is FAIL;
- after successful final state deletion and preservation verification, uninstall deletes the sentinel; failure leaves incomplete residue and is FAIL;
- a next invocation seeing a sentinel or recognized temp reports incomplete health and stops without inference, repair, rollback, or state rewrite;
- without sentinel/temp, existing-byte hash differences are user drift; missing owned paths, invalid marker/state, or impossible mixed ownership are conflict and never confirmable drift.

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

## 17. Contract Review 02 Disposition

All five P1 findings are accepted and closed:

- a verified operation sentinel separates confirmable existing-byte drift from incomplete prior mutation without adding recovery behavior;
- Git overlap inspection disables optional writes/configured execution surfaces and uses literal exact-file pathspecs only;
- managed-block ownership is an exact marker-to-marker interval plus at most one LF, with deterministic prefix/suffix and backup bytes;
- package metadata exactly matches the accepted allowlist, generation starts only from absent `dist`, and cleanup removes only verified generated bytes plus the exact owned temporary root;
- canonical JSON/version/time/root hash/operation ID and the schema-v1 compatibility matrix are fixed.

No Task 1 output or Task 3/4 scope is changed.
