# Task 2 Execution Contract - Non-Destructive Lifecycle CLI

Identity: `universal-harness-adoption-task-2-contract-20260712-v4`

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
| Contract Review 03 | `universal-harness-adoption-task-2-contract-review-20260712-v3` | `eb369c459d080d9ada23e8ce4950851a2ad404378fd64365954515c8b216f50a` |
| Exhaustion decision | `universal-harness-adoption-task-2-contract-exhaustion-decision-20260712-v1` | `31d4600b0ffd3c7a19d42e6b11e425161bf2388c6c096e3d780b40030dc326d4` |
| Resume decision | `universal-harness-adoption-task-2-contract-resume-decision-20260712-v1` | `85d6fc75c904152657a9c9c60057f64c69b1d714600ba2101230fc4107fcea7c` |

Task identity: `universal-harness-adoption-task-2-lifecycle-cli`

Objective: deliver one Node-standard-library-only CLI that installs, same-version no-ops, updates, and uninstalls the accepted fixed Task 1 bundle through exact ownership, one managed AGENTS block, target-owned backups, containment checks, two-stage verification, and truthful incomplete-state reporting.

Original Request Anchor: requirements v5 Sections 1 and 11-19. The lifecycle must never silently overwrite target-owned content or broaden into repository capability analysis, arbitrary merging, generalized migration, transaction, or crash recovery.

AC-pass-but-user-fail anchor: tests and state parsing can pass while AGENTS outer bytes change, an unowned path is adopted, a modified managed file is replaced without a verified backup/confirmation, state records success before payload verification, or uninstall deletes target-owned content. Any such result is overall FAIL.

Triggered routed authority: `AGENTS.md`, `docs/agent-routing/external-systems-and-secrets.md`, `docs/agent-routing/current-state-evidence.md`, `docs/agent-routing/high-risk-actions.md`, `docs/agent-routing/task-planning-scale.md`, `docs/agent-routing/implementation-boundary.md`, `docs/agent-routing/validation-and-reporting.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`, and `task-docs/_harness/semantic-fidelity-protocol.md`. Direct run-level authority: `task-docs/_harness/run-directory-protocol.md`.

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

No other persistent repository file may be added or changed. Repository-local `dist/`, archive, npm cache/config/log, generated pack metadata outside the authorized `package.json`/`package-lock.json`, and fixture output are forbidden before, during, and after Task 2 validation. Package staging and all generated bundle/archive bytes exist only inside one operation-owned OS temporary root. The executor may not edit generated bytes by hand or retain them as implementation output.

Package staging, archives, npm home/cache/config/log/tmp, sanitized Git view, and target fixtures live only under a freshly created operation-owned OS temporary root whose real path and ownership token are recorded by the lifecycle test/pack helper.

Target atomic temporaries have fixed exact names, avoiding directory scans: `.oh-my-harness/.operation-in-progress.tmp`, `.oh-my-harness/.install-state.tmp`, and, for update restoration, OS-temporary in-memory/owned copies of the prior state. Payload atomic temporaries are `.<basename>.oh-my-harness-tmp` beside each exact planned file. Any exact recognized temp present at preflight is incomplete state and blocks mutation.

After final pre-write fingerprint recheck, apply follows this gate:

1. install creates exactly `.oh-my-harness/` if absent; update/uninstall require the valid owned namespace;
2. create the sentinel temp with exclusive `open(..., "wx")`, write/fsync/close canonical bytes, create the final sentinel exclusively with same-filesystem `link(temp, final)`, verify final bytes, then unlink temp;
3. only after final sentinel verification and temp absence may any payload, AGENTS block, state, or deletion mutation begin.

For fresh install, namespace creation is the only permitted mutation before sentinel completion. Failure leaves either no namespace, an exactly empty namespace, or a namespace containing only the exact sentinel temp/final residue. The next invocation classifies all three residue forms with no valid state as `INCOMPLETE_OR_UNOWNED` and stops; it never infers ownership or repairs. Update/uninstall sentinel failure leaves old state/payload unchanged and stops. The sentinel is transient detection metadata, not payload, ownership, recovery authority, or a generalized transaction log.

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
- `prepack` is declared as `node src/installer/package-bundle.mjs prepare --pack-root "$OH_MY_HARNESS_PACK_ROOT"`; publication is outside acceptance, while every local `npm pack` validation uses `--ignore-scripts` and invokes that same `prepare` mode explicitly in isolated staging;
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

## 5. Fixed Package Bundle And Isolated npm Pack

`package-bundle.mjs` has exactly three validation modes:

- `prepare --pack-root <absolute-temp-root>`: require the root was freshly created by the caller, is outside the repository, is a regular directory with mode limited to the current user, and is exactly empty. Exclusively create the ownership-token and provenance files, then create `package/`, copy the four source-backed Task 1 package surfaces, and materialize the fifth allowlisted surface by building the accepted Task 1 bundle directly to `package/dist/bundle`. Provenance contains root identity, source hashes, staged file hashes, and token. It never creates repository `dist/`.
- `verify --pack-root <root> --archive <root/archive/name.tgz>`: verify token/provenance, staged package, archive location, archive allowlist, bundle inventory/hashes, package identity, and absence of repository residue. It does not clean before lifecycle smoke consumes the archive.
- `cleanup --pack-root <root>`: reverify root realpath, token, provenance, and the closed allowed child set (`package`, `archive`, `fixtures`, `home`, `xdg`, `cache`, `logs`, `tmp`, the two empty npmrc files, token, and provenance); recursively remove only that exact owned temporary root. Any mismatch or removal failure reports residue and returns failure without touching another path.

The executable pack sequence is:

```sh
export PATH="/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:/opt/homebrew/bin:/usr/bin:/bin"
test "$(node --version)" = "v24.14.0"
test ! -e dist
pack_root="$(mktemp -d)"
node src/installer/package-bundle.mjs prepare --pack-root "$pack_root"
mkdir "$pack_root/archive" "$pack_root/home" "$pack_root/xdg" "$pack_root/cache" "$pack_root/logs" "$pack_root/tmp"
: > "$pack_root/user.npmrc"
: > "$pack_root/global.npmrc"
(
  cd "$pack_root/package"
  /usr/bin/env -i \
    PATH="$PATH" \
    HOME="$pack_root/home" \
    XDG_CONFIG_HOME="$pack_root/xdg" \
    TMPDIR="$pack_root/tmp" \
    npm_config_userconfig="$pack_root/user.npmrc" \
    npm_config_globalconfig="$pack_root/global.npmrc" \
    npm_config_cache="$pack_root/cache" \
    npm_config_logs_dir="$pack_root/logs" \
    npm_config_tmp="$pack_root/tmp" \
    npm_config_offline=true \
    npm_config_ignore_scripts=true \
    npm_config_audit=false \
    npm_config_fund=false \
    npm_config_update_notifier=false \
    npm_config_progress=false \
    npm_config_registry=http://127.0.0.1:9 \
    npm pack --ignore-scripts --pack-destination "$pack_root/archive"
)
node src/installer/package-bundle.mjs verify --pack-root "$pack_root" --archive "$pack_root/archive/"*.tgz
# Run local-archive smoke entirely under pack_root/fixtures.
node src/installer/package-bundle.mjs cleanup --pack-root "$pack_root"
test ! -e "$pack_root"
test ! -e dist
```

The clean environment passes no inherited npm token, auth, proxy, Git-routing, Node-option, or registry variable. Empty user/global npmrc files and the staging working directory prevent project/user configuration reads. Scripts, audit, fund, update notifier, progress, and network resolution are disabled. No registry authentication/read/publication is authorized. npm stdout/stderr must be secret-safe and remain inside captured test evidence; config/cache/log/tmp/archive metadata stays under `pack_root`. Cleanup failure, unexpected npm access, repository residue, or temporary-root residue is FAIL.

`npm pack` must produce an archive containing only package metadata/README, binary, installer modules, and generated fixed bundle. Planning/history/tests, state, backups, caches, secrets, source absolute paths, and unscoped installer guidance are forbidden.

## 6. Canonical Plan, Exact Discovery, And Git Overlap

All persisted plan/state/sentinel documents use one canonical JSON encoder:

- recursively sort object keys by ascending Unicode code point; all schema keys are ASCII;
- every schema-defined array uses the order specified below; path-bearing arrays sort by ascending UTF-8 byte sequence of normalized `path`, then by ascending canonical element bytes; duplicates are invalid;
- serialize with `JSON.stringify(canonicalObject, null, 2)`;
- encode UTF-8 without BOM, use LF only, and append exactly one final LF.

The closed plan schema contains no `planSha256` or other self-hash field:

```text
schemaVersion: 1
operation: "install" | "update" | "uninstall"
currentVersion: null | version
targetVersion: null for uninstall | version for install/update
status: "READY" | "NO_OP" | "CONFLICT" | "INCOMPLETE_OR_UNOWNED"
creates/replaces/removes/protected: sorted unique repo-relative path strings
blockAction: "append" | "replace" | "remove" | "none"
modifiedManaged: sorted unique [{path, kind:"payload"|"inventory"|"managed-block", expectedSha256, currentSha256}]
backups: sorted unique [{sourcePath, backupPath, sha256}]
conflicts: sorted unique [{code, path:null|repo-relative path}]
gitOverlap:
  status: "not-a-git-repository" | "clean" | "overlap" | "unsafe-git-layout"
  paths: sorted unique [{path, state:"staged"|"unstaged"|"untracked"|"deleted"}]
verification: fixed ordered unique enum strings naming planned payload, block, state, outer-byte, containment, and backup checks
```

Array ordering is exact: string path arrays sort by their UTF-8 bytes; `modifiedManaged` by `path` then `kind`; `backups` by `backupPath` then `sourcePath`; `conflicts` place `null` paths first and otherwise sort by path, then `code`; `gitOverlap.paths` by path then state. `verification` is the present applicable subset of this fixed order: `containment`, `inventory`, `payload-hashes`, `managed-block`, `outer-bytes`, `profiles`, `references`, `backups`, `state`, `write-confinement`. No array may contain canonical duplicates.

Hash the complete canonical plan bytes externally with lowercase SHA-256. Display the plan plus external hash before confirmation. Apply receives the expected hash as an immutable argument, regenerates canonical bytes after final pre-write recheck, and requires exact hash equality. The plan never contains unrelated target bytes.

Filesystem discovery reads only package inventory/payload, exact planned destinations, bounded parent metadata via `lstat`, root AGENTS, exact state/sentinel/temp names, exact backup destinations, and directly overlapping Git metadata. It executes no target code.

For a target without `.git`, `gitOverlap.status` is `not-a-git-repository` and only filesystem evidence is used. For a target whose `.git` is not a contained regular directory, whose index/HEAD/ref/object store cannot be safely bounded, whose object store uses alternates, or whose exact Git evidence cannot be proven non-executing, status is `unsafe-git-layout` and the whole operation stops.

For a supported Git repo, the installer creates a sanitized Git view under the operation-owned OS temporary root:

1. read only contained regular target Git metadata needed for exact status: `.git/index`, `.git/HEAD`, one validated loose HEAD ref or exact packed-refs row, and contained objects; reject symlinks, gitfiles/worktree indirection, alternates, symbolic-ref chains, and unsupported index/object formats;
2. create a temporary Git directory with a direct detached HEAD OID, copied index, minimal installer-owned config, and contained object-store alternate; create a shadow worktree containing copies of only exact planned regular files;
3. invoke exactly one trusted Git process against the temporary Git directory and shadow worktree, never the target Git directory/worktree.

The process uses `/usr/bin/env -i`, verified `/usr/bin/git` version `2.50.1 (Apple Git-155)`, `--no-optional-locks`, literal exact-file pathspecs only, and config/env that disables hooks, fsmonitor, untracked cache, submodule recursion/summary/diff, external diff, prompts, pager, global/system config, and inherited `GIT_DIR`, `GIT_WORK_TREE`, `GIT_INDEX_FILE`, filters, proxies, and tracing. Runtime path/version mismatch is STOP. It runs:

```text
git --no-optional-locks
  -c core.hooksPath=/dev/null
  -c core.fsmonitor=false
  -c core.untrackedCache=false
  -c submodule.recurse=false
  -c status.submoduleSummary=false
  -c diff.external=
  --git-dir=<temp-git-dir>
  --work-tree=<temp-shadow>
  status --porcelain=v1 --untracked-files=all --ignore-submodules=all
  -- <literal exact planned file paths>
```

The temporary view contains no target local config, hooks, worktree attributes, submodule worktrees, or executable filter configuration. Tests use malicious target hooks, filter/process commands, config includes, submodules, inherited Git variables, and outside canaries, proving zero execution/outside disclosure and unchanged target Git metadata. Any inability to prove this boundary is STOP, not fallback.

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

`.oh-my-harness/install-state.json` uses the Section 6 canonical JSON encoder, does not record or hash itself, has schema version integer `1`, permits no additional keys at any object level, and has these fields/types:

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

State arrays use the Section 6 comparator: `ownedFiles` and `agents` sort by path; `backups` sort by backup path then source path. Canonical duplicates are invalid.

`ownedFiles` contains every inventory payload and `.oh-my-harness/bundle-inventory.json`, but never state itself or the AGENTS block. `agents` is the exact six-entry subset and must agree with `ownedFiles`. Target identity is lowercase SHA-256 of the exact UTF-8 bytes of the absolute string returned by `fs.realpath(targetRoot)` with no Unicode or slash rewriting, never the raw user argument.

A malformed state, invalid path/type/enum, duplicate, self-ownership, identity/target mismatch, impossible ownership set, state-record inconsistency, unprovable marker ownership, existing operation sentinel/temp, or missing state-owned path is `CONFLICT`/incomplete and cannot mutate. With valid state and no sentinel/temp, an existing regular state-owned file whose bytes differ from its recorded hash, or an exactly locatable managed block whose interval differs from `blockSha256`, is confirmable managed-content drift: update/uninstall may proceed only through path-specific disclosure, verified backup, and confirmation. A drifted `bundle-inventory.json` is backed up as managed content but is not trusted; old ownership comes only from the validated state and the new release surface comes only from the package inventory. Drift or corruption of `install-state.json` itself is never auto-adopted or replaced and is `CONFLICT`.

Operation ID preimage uses the Section 6 canonical encoder without its final LF and with exact fields `schemaVersion: 1`, `operation: "install"|"update"|"uninstall"`, `targetIdentity`, `invokerVersion`, `installedVersion` (null for install), `requestedVersion` (invoker version for install/update, null for uninstall), and `managed` (sorted `{path,sha256,kind}` current state entries, empty for install, plus `{path:"AGENTS.md#managed-block",sha256,kind:"managed-block"}` when state exists). Operation ID is the first 24 lowercase hex characters of SHA-256 over those UTF-8 bytes.

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

Any preflight conflict blocks the whole operation. The verified sentinel precedes every payload/block/state/create/replace/remove mutation. Its presence, an exact recognized temp, or an empty/unowned fresh namespace is the durable incomplete signal. Capturable failure keeps truthful sentinel/filesystem evidence, stops later writes, preserves verified user backups, and reports exact changed, unchanged, temporary, sentinel, and state paths. No generalized rollback or crash recovery is claimed.

The sentinel uses Section 6 canonical JSON with exactly: `schemaVersion:1`, `operationId`, `operation`, `targetIdentity`, `priorStateSha256:null|64-hex`, `requestedVersion:null|version`, and `planSha256:64-hex`. The plan hash is over full canonical plan bytes with no self-hash. No additional key is allowed.

Residual-state rules are exact:

- sentinel parent creation/write/link/verification/temp-cleanup faults occur before payload and are injected directly; fresh install leaves only no namespace, exact empty namespace, or exact sentinel residue, all classified `INCOMPLETE_OR_UNOWNED`; update/uninstall leave accepted state/payload unchanged;
- before state replacement, keep the exact old accepted state bytes in memory for update; fresh install has no old state;
- write candidate new state to the exact state temp, fsync and verify canonical bytes plus surface consistency, then atomically rename it to the canonical state path and verify the canonical path;
- if any capturable failure occurs after candidate rename and before commit, update atomically restores and verifies the exact old accepted state bytes; fresh install deletes the candidate state and verifies absence; sentinel remains and the surface is unhealthy;
- inability to restore old update state or delete fresh state is a hard FAIL with sentinel retained; because a state is accepted only when the complete surface verifies and no sentinel/temp exists, no new success claim is made;
- only after payload/block/new-state verification succeeds does apply delete the sentinel. If sentinel deletion or absence verification fails, update restores old state and fresh install deletes new state, verifies that result, retains/recreates truthful incomplete evidence when possible, and reports FAIL;
- update failure therefore preserves the prior accepted state bytes while sentinel/filesystem mismatch marks the target unhealthy; fresh-install failure leaves no success state;
- uninstall keeps old state until all owned deletion/preservation checks pass, deletes state last, verifies absence, then deletes sentinel. A capturable failure before commit retains/restores old state and sentinel; final state/sentinel failure is FAIL;
- next invocation seeing sentinel/temp, empty/unowned namespace without valid state, state/filesystem mismatch from partial payload, or invalid ownership reports `INCOMPLETE_OR_UNOWNED` and stops without inference, mutation, automatic repair, or rollback.

The success predicate is conjunctive: verified payload/inventory/block/outer bytes, valid canonical state with `verification.status:"verified"`, no recognized temp, no sentinel, and successful operation-specific preservation checks. Reports may claim success only after all predicates are rechecked.

Post-install/update verification covers all requirements Section 18 checks without whole-repo scanning: payload/inventory hashes, one block, exact outer bytes, route targets, six TOMLs, evaluator/executor boundaries, installed references, write-confinement log, state/surface match, and protected-path evidence. Parsing/hashes are structural evidence, not target/Harness semantic-equivalence proof.

## 13. Acceptance Criteria And Evidence

All `T2-AC1` through `T2-AC20` from plan v4 are controlling and must be individually rerun. Criterion evidence is:

| AC | Required primary evidence |
| --- | --- |
| 1 | read/open/spawn instrumentation proves exact discovery and no target execution |
| 2 | snapshot of deterministic READY/NO_OP/CONFLICT/INCOMPLETE_OR_UNOWNED plan fields and external plan hash |
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
| 16 | sentinel parent/temp/link/verify faults plus payload/state/restore/delete/verify fault matrix and truthful changed/unchanged/residue report |
| 17 | next-invocation incomplete mismatch detection without repair |
| 18 | output/state/log secret-safe assertions and opaque backup behavior |
| 19 | package/lock/bin/engine/files/no-dependency checks and local `.tgz` CLI smoke |
| 20 | scoped identity/version compatibility in inventory/state and mismatch negatives |

Any unverified AC, P0/P1, outer-byte drift, unowned mutation, false success, or structural-evidence overclaim is FAIL.

## 14. Required Validation

- prepend the verified Node 24 directory from `NODE24_RUNTIME_EVIDENCE.md`, assert `node --version` is `v24.14.0`, and stop otherwise;
- exact Node 24 `node --test test/bundle/*.test.mjs test/lifecycle/*.test.mjs`;
- `npm_config_offline=true npm test`;
- isolated staging `npm pack --ignore-scripts --pack-destination <temp/archive>` under the exact Section 5 clean environment, followed by executable helper verify/smoke/cleanup and residue checks;
- canonical local archive install/no-op/update/uninstall smoke in isolated temp repos;
- all marker, lifecycle, transition, containment, backup, failure-injection, state and secret-safety fixtures;
- fresh build/inventory/reference/profile/router verification;
- Task 1 accepted chain and 12 hashes before/after;
- exact persistent write-universe before/after; proof that repo `dist`, archive, npm cache/config/log, and metadata never appear; complete status; no staged/committed delta; `git diff --check`;
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

## 16. Prior Review Disposition

Contract Reviews 01-03 are controlling failure history, not accepted authority. Their supported findings are incorporated into the current normative sections. Earlier proposed mechanisms, including repository-local transient `dist`, direct target `git status`, underspecified sentinel/state commit behavior, and compact JSON encoding, are superseded by this v4 contract and must not be implemented.

The accepted parts retained from those reviews are Node `v24.14.0`, complete dirty-worktree protection, exact marker-byte ownership, T2-AC3/T2-AC12 outcome evidence, high-risk and secrets route binding, package identity/allowlist, and schema-v1 compatibility. No finding changes Task 1, the Task 2 objective, or Task 3/4 scope.

## 17. Resume Decision And Review 03 Disposition

This v4 iteration consumes the single resumed contract-production budget authorized by `TASK2_CONTRACT_RESUME_DECISION.md`.

All Contract Review 01-03 findings are incorporated. In particular:

- exact Git overlap uses a sanitized temporary Git directory and shadow worktree; target Git config, hooks, filters, attributes execution, submodules, inherited routing, metadata writes, and broad pathspecs are excluded or cause STOP;
- npm pack runs from isolated staging with scripts and network-adjacent features disabled, a clean environment, executable prepare/verify/cleanup modes, and no repository residue;
- sentinel creation, exclusive publication, schema, temp grammar, first-mutation window, and every failure residue are explicit;
- fresh/update state failure semantics restore/delete candidate success state and retain an unhealthy sentinel/filesystem signal, preserving T2-AC16;
- plan, sentinel, state, ordering, canonical bytes, and external plan hash are closed.

No implementation is authorized in this cycle. A strict PASS permits byte-identical boundary freeze only; FAIL immediately re-exhausts retry domain `universal-harness-adoption-task-2-lifecycle-contract-20260712-rd1`.
