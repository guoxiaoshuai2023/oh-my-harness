# Universal Harness Adoption External Plan Review And Finding Routing

Identity: `universal-harness-adoption-external-plan-review-20260712-v1`

Decision: `FAIL`

Status: `PERSISTED CURRENT-STATE FINDING AND MAIN-THREAD ROUTING DECISION`

## Reviewed Inputs

| Input | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Plan | `universal-harness-adoption-implementation-plan-20260712-v3` | `8ee3ea376647413e7096724ecf1c814d6e901fe7397a1da5f2e82a671d2e3331` |
| Pass B | `universal-harness-adoption-plan-review-20260712-v3` | `b687e2411454ae7118521e8d6471b11f9f340ca282cbdba3c7cd3e43e814eba9` |
| Accepted manifest | `universal-harness-adoption-accepted-planning-inputs-20260712-v1` | `6ad45199c0b85e28d76f4f46662eecce1870abc5bd352e06d4cd93d657453a26` |

## P1 - Unscoped npm Identity Is Owned By Another Project

Read-only current-state command independently rerun by the main thread:

```bash
npm view oh-my-harness name version description repository homepage maintainers --json
```

Observed non-sensitive result:

- package: `oh-my-harness`
- current version: `0.18.0`
- repository: `github.com/kyu1204/oh-my-harness`
- maintainer account: `pb1123love`

The reviewed repository is `github.com/guoxiaoshuai2023/oh-my-harness`. Therefore the unscoped registry package is an unrelated project. Plan v3's assumption that `npx oh-my-harness...` would execute this repository's installer is false and unsafe.

Main-thread disposition: `ACCEPTED P1`.

The user's substantive package decision is authoritative for plan v4:

- npm package identity: `@guoxiaoshuai2023/oh-my-harness`
- product/repository name: `oh-my-harness`
- CLI binary: `oh-my-harness`
- installed namespace: `.oh-my-harness/`
- installed agent prefix: `oh-my-harness-*`

Canonical public command shape:

```bash
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> \
  oh-my-harness install --target <repo>

npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> \
  oh-my-harness update --target <repo>

npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> \
  oh-my-harness uninstall --target <repo>
```

A shorter scoped form is not accepted unless direct testing proves that it resolves the scoped package and invokes the intended binary. Unscoped `npx oh-my-harness` must be a negative fixture and must never appear as valid installation guidance.

Registry authentication, scope-access verification, credentials, publication, signing, and release creation remain outside implementation acceptance.

## P2 - Python Helper Runtime Boundary Is Unassigned

Plan v3 correctly keeps the lifecycle CLI Node-only and ships three required Python helpers, but it does not assign the user/runtime prerequisite clearly enough.

Main-thread disposition: `ACCEPTED P2`.

Plan v4 must fix:

- install/update/uninstall require only the selected supported Node runtime and Node standard library;
- Python 3.11 is required only to run the three shipped Python helper validators;
- Python is not required merely to launch lifecycle commands;
- the three helpers remain required payload and are not rewritten to Node or made optional;
- Task 3 owns README/adoption prerequisite documentation;
- Task 4 compiles and runs applicable helpers from the final packed installation layout.

## No-Impact Findings

The new evidence does not invalidate requirements v5 or the rest of plan v3's architecture:

- fixed inventory, namespace, managed block, exact ownership, and target preservation remain valid;
- the four-delivery-unit dependency direction remains valid;
- lifecycle permissions and all twelve scenario families remain valid;
- adaptive orchestration, six profiles, calibration, executor/evaluator boundaries, and modal-force preservation remain valid;
- dirty-state handling and local-versus-publication separation remain valid;
- excluded capability-catalog, equivalence, migration, merge, multi-runtime, transaction, and crash-recovery systems remain excluded.

## Authority And Stop State

- Requirements v5 remains frozen and read-only.
- Plan v3, Pass B v3, and accepted manifest v1 remain preserved as superseded planning history.
- Accepted manifest v1 must not authorize Task 1 contracting after this current-state finding.
- Plan v4 requires a fresh focused read-only Pass B and a new accepted manifest.
- Task 1 contracting: `NOT AUTHORIZED`.
- Implementation: `NOT STARTED`.
- Registry publication: `NOT AUTHORIZED`.
