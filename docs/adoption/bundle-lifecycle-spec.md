# Bundle Lifecycle Specification

This release-repository-only specification defines the supported target lifecycle for the oh-my-harness package. It documents the accepted package behavior, including bounded same-operation recovery; it adds no recovery command, publication authority, legacy selector, or installation mode.

## Fixed Identities And Runtime

- Package: `@guoxiaoshuai2023/oh-my-harness`
- Binary: `oh-my-harness`
- Managed payload namespace: `.oh-my-harness/`
- Installed agent prefix: `.codex/agents/oh-my-harness-`
- Lifecycle runtime: Node `>=24 <25`, standard library only
- Helper runtime: Python 3.11, only for the required `extract_agents_source.py`, `validate_router_fixture.py`, and `validate_rule_preservation.py` payload
- Repository and outer npm package license: Apache-2.0; `LICENSE` is not installed payload

The package name, binary, payload namespace, and agent prefix are distinct identities. Manual copying, an unscoped package command, a global install, or another runtime does not establish this lifecycle.

## Terminal Source Gate Before Release Work

Every release-shaping source byte, including tests and release tooling, is finalized before one main-owned terminal source gate binds an exact changed-source manifest and the applicable upstream currentness transitions. Bundle generation, installation, and packing remain locked until that gate is strict green. Any later source delta invalidates the gate and discards all generated, installed, and packed evidence before a new manifest and gate may be issued.

Release tooling requires `OH_MY_HARNESS_SOURCE_GATE_RECEIPT` to name an absolute, main-issued JSON receipt and `OH_MY_HARNESS_SOURCE_GATE_RECEIPT_SHA256` to bind its exact bytes. The closed receipt binds `SOURCE_GATED` state, source realpath, Git HEAD, gate/report identities, exactly three upstream transition identities, and a byte-ordered source-path/SHA-256 manifest plus its aggregate SHA-256. Before every build/package validation, tooling reopens each named source file, rejects missing/symlinked/changed bytes, and requires the aggregate to match. A receipt cannot authorize a different checkout or survive a source delta.

The current unified release is the exact Architecture set: nine profiles, 17 templates, 49 unique required mapped payloads, and 51 generated files (49 payloads plus the managed router and inventory). Those figures support exact membership and behavior evidence; they are never semantic acceptance by themselves. Active Contract/full-v2/legacy workflow assets, Run artifacts, Context/Board, learning/cases, runtime outboxes, and generic Target Repository Architecture product assets are excluded. Historical Run Contract bytes remain outside the release and readable in their original repositories.

## Separate Authority Planes

The release plane fixes what a package contains. `packaging/bundle-map.json` maps release sources to installed destinations. The built `.oh-my-harness/bundle-inventory.json` is immutable and fixes package/version compatibility, every required destination and hash, the exact nine installed agent paths, managed-block identity, ownership lists, and reference policy. It has no optional payload entries.

The target lifecycle plane decides whether those bytes may change a repository. Lifecycle code owns plan creation, conflict status, confirmation, containment, write order, verification, and result reporting. It may act only from current target evidence plus validated state reconciled with the installed immutable inventory.

The evidence plane contains tests, fixtures, package validation, hashes, TOML parsing, and documentation review. Those checks support acceptance only at their measured scope. They do not prove semantic equivalence, resolve target/Harness authority conflicts, or authorize a public release.

## Mutable State And Exact Ownership

`.oh-my-harness/install-state.json` is mutable canonical target state. It records installed and bundle versions, installer identity, a canonical-target hash, operation metadata, exact owned files and hashes, the nine agent records, managed-block mode/hash, verification status, and backups created by the current successful install or update.

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

The lifecycle recognizes exactly two installed-input classes: strict current nine/49 state, and the exact historical six-profile/42-entry inventory/state/payload/marker identity. Only `update` may consume the historical class. `install` does not adopt it, prior-state uninstall is not added, and no legacy runtime remains after conversion. The exact transition creates eight target paths, removes only the prior-owned obsolete Contract template, replaces only clean prior-owned bytes, and publishes target-only state.

## Managed Block And Authority Conflict

The two reserved markers must be byte-exact, occur once each, and be ordered. Install appends the release block only when no reserved marker exists. Update replaces only the owned interval. Uninstall removes only that interval and its following LF when present, preserving the exact outer prefix and suffix.

Target-repository instructions outside the block remain effective alongside the Harness. If target and Harness authority materially conflict or cannot both be followed, the agent must `STOP` and ask the user to resolve the conflict. Neither side may be silently overwritten, weakened, or taken over.

## Drift, Backup, And Confirmation

Current bytes of every old owned file and the managed block are compared with validated state. Modified managed content is listed in `modifiedManaged`, including its path, kind, expected hash, and current hash, and stops as `OWNED_DRIFT` before mutation. Missing owned content stops as `MISSING_OWNED_SURFACE`. Backups never turn drift into authority. For a clean transition, the plan lists deterministic rollback backups at `.oh-my-harness-backups/<operation-id>/<source-path>`; managed-block and prior-state bytes use fixed noncolliding suffixes.

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

A capturable failure never claims success. It identifies changed/unchanged paths, temporary residue, sentinel/state status, verified or unverified backups, a safe error, and any bounded rollback outcome. After sentinel publication the process makes one rollback attempt and reports the original operation as failed even when exact prior state is restored. If interruption evidence remains, only the same operation and exact requested release may preview `finalize-target` when target state/payload is complete or `restore-prior` when every touched byte and backup proves rollback. Missing/stale/mismatched/third-state evidence stops as an explicit recovery conflict without mutation. The sentinel is deleted last; it is never discarded to manufacture success.

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

Local `.tgz` smoke, fixtures, tests, hashes, and package validation can demonstrate a reproducible local release candidate. The repository and packed npm package carry Apache-2.0, while the installed `.oh-my-harness/` payload does not include `LICENSE`. Local evidence does not establish npm scope access or ownership, credentials, signing, publication, release creation, or external-write approval. Those remain later owner-controlled release actions.

Structural checks are never semantic proof. Hash equality proves byte equality, parsing proves shape, and fixtures prove their encoded scenarios. The unified source governance plane uses nine fact-selected optional capabilities, unconditional no-fan-out, Technical-Design-only Solution roles, main-owned Boundaries, evaluator-owned reports, finite retry/intervention, and main final authority. Installed and package evidence must execute those behaviors from unchanged physical destination bytes against an independent Frozen-AC oracle; an inventory, count, source fallback, or producer-authored semantic ledger cannot substitute.
