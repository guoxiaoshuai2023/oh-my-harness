# Universal Harness Adoption Runbook

This release-repository-only runbook explains how to adopt the managed package lifecycle. It is not part of the installed bundle. The normative ownership and transaction rules are in [Bundle Lifecycle Specification](bundle-lifecycle-spec.md).

## Before You Begin

- Use Node `>=24 <25`. Install, update, and uninstall use only the Node standard library.
- Python 3.11 is needed only to run the three required installed helpers: `extract_agents_source.py`, `validate_router_fixture.py`, and `validate_rule_preservation.py`.
- Choose an exact package version. A locally packed `.tgz` can be used for acceptance, but local acceptance is not npm publication, scope ownership proof, signing, or release authorization.
- Preserve target-repository rules. The lifecycle owns only its exact files and one marked `AGENTS.md` block; target content outside that block remains effective.

## Preview And Apply

Preview every operation first:

```sh
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo> --dry-run
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo> --dry-run
```

For a local archive:

```sh
npx --yes --package=./<packed-archive>.tgz oh-my-harness <operation> --target <repo> --dry-run
```

The CLI prints a canonical JSON plan. Review its operation, current and target versions, status, creates, replaces, removes, protected paths, managed-block action, modified managed paths, backup paths, exact Git overlap, conflicts, and verification list. A `READY` plan is the only plan that can be applied.

Run the same command without `--dry-run` to apply. A TTY receives exactly one `Apply this exact oh-my-harness plan? [y/N]` prompt. A decline or a non-TTY invocation without `--yes` exits without writes. Automation may add `--yes` only after treating the printed plan as the confirmation boundary; `--yes` never bypasses a conflict or incomplete state.

## Interpret The Plan

| Status | Meaning and action |
| --- | --- |
| `READY` | The exact plan may be confirmed. The CLI rechecks the target before writing. |
| `NO_OP` | The managed surface already matches. No prompt or write occurs, and state timestamps do not change. |
| `CONFLICT` | A closed conflict code explains why ownership or safe mutation cannot be established. Resolve it outside this operation under separate authority, then preview again. |
| `INCOMPLETE_OR_UNOWNED` | A sentinel, recognized temporary, unmanaged namespace, missing managed surface, or unverifiable prior state prevents mutation. The CLI reports no success and performs no generalized recovery. |

The exact conflict codes are:

| Code | Boundary represented |
| --- | --- |
| `UNMANAGED_NAMESPACE` | `.oh-my-harness` exists without validated managed state. |
| `UNOWNED_DESTINATION` | A required new destination or deterministic backup path contains bytes the lifecycle cannot own or safely reuse. |
| `INVALID_MANAGED_MARKER` | The reserved `AGENTS.md` marker syntax is damaged, duplicated, missing, or out of order. |
| `UNVERIFIABLE_INSTALL_STATE` | Canonical prior ownership cannot be established. |
| `INCOMPATIBLE_INSTALLATION` | Package, inventory, version, or installed ownership identities disagree. |
| `DIRTY_OVERLAP` | Exact Git dirty evidence overlaps a destination not already owned by the validated installation. |
| `UNSAFE_PATH` | Containment, normalization, symlink, or regular-file/directory requirements fail. |
| `TARGET_CHANGED` | Target fingerprints or the confirmed plan changed before or during apply. |
| `IO_UNAVAILABLE` | Required bounded filesystem or Git evidence is unavailable. |

Do not treat similarly named files as managed, edit install state to claim them, merge around a conflict, or remove an incomplete-operation sentinel and call the operation complete. Stop and return the target to its owner for an explicit, separately bounded recovery decision.

## Modified Managed Content And Backups

Update and uninstall disclose every managed file or managed-block interval whose current hash differs from validated state. Each disclosed item receives a deterministic backup path under `.oh-my-harness-backups/<operation-id>/`. The backup is written or an identical existing backup is reused, then verified before destructive payload work begins.

Backups are target-owned after creation. Uninstall preserves them. A target owner may archive or delete them later under the target's own policy; later absence of a historical backup is informational and does not invalidate an otherwise exact no-op. The lifecycle never treats a differing backup collision as safe.

## Operation Expectations

- Install creates the fixed release payload only at absent destinations and appends one managed `AGENTS.md` block. Existing managed state makes an identical install a no-op; otherwise install stops rather than converting it into update.
- Update validates old state against the installed immutable inventory. It replaces or removes only old owned paths and creates a newly required path only when absent. It never adopts an unowned collision.
- Uninstall removes only validated owned files and the managed block, preserves all outer `AGENTS.md` bytes, verifies removal, and deletes install state last. An `AGENTS.md` created solely for the block is removed only when no outer bytes remain.

Install and update write verified state last. Every mutating operation publishes an in-progress sentinel before payload writes and removes it only after the operation verifies. A capturable failure reports `success: false`, preserves or restores the prior state where specified, and leaves truthful sentinel or temporary evidence when completion is uncertain. The next invocation stops rather than guessing or repairing.

## Migrating From Manual Copies

Manual copying and unscoped npm commands are not managed installation. The CLI does not adopt files based on names, prefixes, or matching content. Before first install, the target owner must explicitly preserve, relocate, or remove any old manually copied files that collide with the fixed destinations; that preparation is a separate target change, not an oh-my-harness lifecycle operation. Then rerun the dry-run and require a `READY` plan with no unexplained conflicts.

Use only the scoped public forms shown above. `npx oh-my-harness` and `--package=oh-my-harness` are unsupported. Do not use a global-install or multi-runtime substitute.

## Acceptance And Release Boundary

Local acceptance ends with reproducible package construction, fixture behavior, the Task 1/2 test suite, package validation, and review of the actual docs and authority relationships. Structural checks, hashes, TOML parsing, package smoke, and fixture results prove only their measured properties; they are not semantic proof.

Public release remains separate. License selection, npm scope access and ownership, credentials, signing, publication, release creation, and external writes require later owner authority and applicable confirmation. This runbook does not authorize them.
