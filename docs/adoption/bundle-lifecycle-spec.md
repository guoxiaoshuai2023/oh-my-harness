# Bundle Lifecycle Specification

This release-repository-only specification defines the supported target lifecycle for the oh-my-harness package. It documents the accepted package behavior; it does not add recovery, publication, or installation modes.

## Fixed Identities And Runtime

- Package: `@guoxiaoshuai2023/oh-my-harness`
- Binary: `oh-my-harness`
- Managed payload namespace: `.oh-my-harness/`
- Installed agent prefix: `.codex/agents/oh-my-harness-`
- Lifecycle runtime: Node `>=24 <25`, standard library only
- Helper runtime: Python 3.11, only for the required `extract_agents_source.py`, `validate_router_fixture.py`, and `validate_rule_preservation.py` payload

The package name, binary, payload namespace, and agent prefix are distinct identities. Manual copying, an unscoped package command, a global install, or another runtime does not establish this lifecycle.

## Separate Authority Planes

The release plane fixes what a package contains. `packaging/bundle-map.json` maps release sources to installed destinations. The built `.oh-my-harness/bundle-inventory.json` is immutable and fixes package/version compatibility, every required destination and hash, the exact six installed agent paths, managed-block identity, ownership lists, and reference policy. It has no optional payload entries.

The target lifecycle plane decides whether those bytes may change a repository. Lifecycle code owns plan creation, conflict status, confirmation, containment, write order, verification, and result reporting. It may act only from current target evidence plus validated state reconciled with the installed immutable inventory.

The evidence plane contains tests, fixtures, package validation, hashes, TOML parsing, and documentation review. Those checks support acceptance only at their measured scope. They do not prove semantic equivalence, resolve target/Harness authority conflicts, or authorize a public release.

## Mutable State And Exact Ownership

`.oh-my-harness/install-state.json` is mutable canonical target state. It records installed and bundle versions, installer identity, a canonical-target hash, operation metadata, exact owned files and hashes, the six agent records, managed-block mode/hash, verification status, and backups created by the current successful install or update.

State is deliberately non-self-hashing. `ownedFiles` includes the installed immutable inventory and exact payload files, but never `install-state.json` itself. The state is valid only when its ownership exactly reconciles with the installed inventory and its target, package, version, agent, and managed-block identities validate.

Ownership consists only of:

1. Exact files listed by validated state and installed inventory.
2. Exactly one byte interval in `AGENTS.md` bounded by `<!-- oh-my-harness:start -->` and `<!-- oh-my-harness:end -->`.

Target content outside that interval remains target-owned. Paths or files are never adopted by prefix, similarity, content inference, or a claimed state record that disagrees with the immutable inventory.

## Planning And Asymmetric Update

Every operation first canonicalizes the target, validates the release inventory, inspects only the bounded lifecycle surface, parses old state when present, reads old owned files, validates marker shape, reconciles state with the installed inventory, checks exact Git overlap, and captures fingerprints for a final pre-write recheck.

- Install without state creates every release-owned destination only when absent. Any existing destination is an unowned collision. If exact same-version managed state and bytes already exist, install is `NO_OP`; any other existing installation is incompatible with install.
- Update requires validated old state. An old owned path may be replaced when the new release changes it, or removed when the new inventory no longer contains it. A path newly required by the new inventory is created only when absent; any occupant is an unowned collision.
- Uninstall requires validated old state, removes only its exact owned files and managed block, preserves target-owned `AGENTS.md` bytes, and preserves backups.

An unowned collision, damaged marker, unsafe path, exact dirty overlap outside validated ownership, incompatible inventory/state, or unverifiable ownership stops. There is no merge, name-based adoption, capability reconciliation, or ownership inference.

## Managed Block And Authority Conflict

The two reserved markers must be byte-exact, occur once each, and be ordered. Install appends the release block only when no reserved marker exists. Update replaces only the owned interval. Uninstall removes only that interval and its following LF when present, preserving the exact outer prefix and suffix.

Target-repository instructions outside the block remain effective alongside the Harness. If target and Harness authority materially conflict or cannot both be followed, the agent must `STOP` and ask the user to resolve the conflict. Neither side may be silently overwritten, weakened, or taken over.

## Drift, Backup, And Confirmation

Current bytes of every old owned file and the managed block are compared with validated state. Modified managed content is listed in `modifiedManaged`, including its path, kind, expected hash, and current hash. The plan also lists the deterministic backup destination `.oh-my-harness-backups/<operation-id>/<source-path>`; managed-block bytes use `AGENTS.md.managed-block` as the suffix.

The plan is printed before any mutation. Only `READY` may apply. `--dry-run` returns after printing. Without `--yes`, a TTY asks exactly once and a non-TTY does not mutate. Before applying, the CLI recreates the plan and requires identical canonical plan bytes, plan hash, paths, and target fingerprints.

Each required backup is written exclusively or reused only when its bytes already have the expected hash. Backups are verified before destructive payload work. They are target-owned history, excluded from release payload, preserved by uninstall, and may later be cleaned up by the target owner. Missing historical backups do not block an otherwise valid no-op; a differing collision does.

## Containment And Filesystem Types

All lifecycle paths are normalized repo-relative POSIX paths contained by the canonical target. Absolute paths, empty or dot paths, traversal, backslashes, NUL, symlink traversal, and unsupported special-file or parent types stop. Writes use exact contained destinations and recognized temporary paths. Target changes between confirmation and apply, or at a protected replacement point, stop as `TARGET_CHANGED`.

The lifecycle does not inspect adjacent target content to infer safety. Exact Git evidence is limited to planned or owned paths plus `AGENTS.md` and state; unsafe Git layout or unavailable required evidence stops.

## Transaction And Incomplete State

For every mutating operation, the order is:

1. Recheck the exact confirmed plan and target fingerprints.
2. Publish and verify `.oh-my-harness/.operation-in-progress.json`.
3. Write or reuse and verify required backups.
4. Apply only the planned payload and managed-block changes.
5. Verify content, outer `AGENTS.md` bytes, profiles, references, backups, and write confinement as applicable.
6. For install/update, write, parse, publish, and verify canonical install state last. For uninstall, verify owned removal and outer bytes, then delete state last.
7. Delete and verify absence of the operation sentinel. Only then report success.

A capturable failure never claims success. The result identifies changed and unchanged paths, recognized temporary residue, sentinel state, state status, created backups, and a safe error path/reason. Update and uninstall preserve or restore exact prior state where specified; failure to do so remains a hard failure. A later invocation that sees a sentinel, recognized temporary, unmanaged namespace, missing owned surface, or payload/state mismatch returns `INCOMPLETE_OR_UNOWNED` and does not attempt generalized recovery.

## No-Op And State-Last Rules

`NO_OP` means the same version, exact release files, managed block, and validated state already agree. It performs no prompt or write and does not refresh timestamps. Missing target-owned historical backup files do not change that result.

Install and update must not publish fresh success state until the release surface and backups verify. Uninstall must not delete state until every owned path and the managed block have been removed and outer bytes verify. These state-last rules keep the remaining state truthful about the last verified installation.

## Release And Evidence Boundary

The supported public command forms are:

```text
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>
npx --yes --package=./<packed-archive>.tgz oh-my-harness <operation> --target <repo>
```

Local `.tgz` smoke, fixtures, tests, hashes, and package validation can demonstrate a reproducible local release candidate. They do not establish a license, npm scope access or ownership, credentials, signing, publication, release creation, or external-write approval. Those remain later owner-controlled release actions.

Structural checks are never semantic proof. Hash equality proves byte equality, parsing proves shape, and fixtures prove their encoded scenarios. Adaptive default, required full v2, evidence-backed deliberate full v2, fact-triggered gates, finite retries/intervention, main-thread final authority, and the absence of a fixed seventh agent must still be reviewed for preserved meaning and modal force.
