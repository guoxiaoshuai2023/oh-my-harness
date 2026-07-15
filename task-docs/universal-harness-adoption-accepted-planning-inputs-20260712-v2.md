# Universal Harness Adoption Accepted Planning Inputs v2

Identity: `universal-harness-adoption-accepted-planning-inputs-20260712-v2`

Status: `FROZEN PLANNING INPUT MANIFEST`

This manifest supersedes accepted manifest v1 after new npm current-state evidence and the user's scoped-package decision. It freezes plan v4 for later contracting but does not authorize contracting, implementation, Git delivery, registry access, or publication. Its own SHA-256 is recorded externally after final bytes are written to avoid self-reference.

## Accepted Inputs

| Role | Path | Identity | SHA-256 | Decision |
| --- | --- | --- | --- | --- |
| Requirements | `task-docs/universal-harness-adoption-requirements-20260712.md` | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` | User-frozen `PASS` |
| Isolated Pass A | `task-docs/universal-harness-adoption-plan-review-pass-a-20260712.md` | `universal-harness-adoption-plan-review-pass-a-20260712-v1` | `595c7519b9f607a1496df87007467acd637094a2cde89dc0266e0b8123d695cc` | Frozen baseline |
| Current-state finding and user decision | `task-docs/universal-harness-adoption-external-plan-review-20260712-v1.md` | `universal-harness-adoption-external-plan-review-20260712-v1` | `80f7122ee3aa609f9baeeebb2f9b30394f6f8df1bf46154e699f1e9ab0c89212` | P1/P2 accepted; scoped package fixed |
| Implementation plan | `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` | Accepted after strict Pass B |
| Final Pass B | `task-docs/universal-harness-adoption-plan-review-20260712-v4.md` | `universal-harness-adoption-plan-review-20260712-v4` | `7b81dd19130612e713cc4d0108d53c56df37db55e5788018c06d18d47462c60b` | Strict `PASS` |

Canonical evaluator calibration used by the fresh Pass B reviewer:

- Path: `task-docs/_harness/evaluator-calibration.md`
- SHA-256: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`

## Superseded Planning Authority

The following remain byte-preserved history and must not authorize Task 1:

| Artifact | Path | SHA-256 | Supersession reason |
| --- | --- | --- | --- |
| Plan v3 | `task-docs/universal-harness-adoption-implementation-task-plan-20260712.md` | `8ee3ea376647413e7096724ecf1c814d6e901fe7397a1da5f2e82a671d2e3331` | Assumed occupied unscoped npm identity |
| Pass B v3 | `task-docs/universal-harness-adoption-plan-review-20260712-v3.md` | `b687e2411454ae7118521e8d6471b11f9f340ca282cbdba3c7cd3e43e814eba9` | PASS depended on stale package-name assumption |
| Accepted manifest v1 | `task-docs/universal-harness-adoption-accepted-planning-inputs-20260712.md` | `6ad45199c0b85e28d76f4f46662eecce1870abc5bd352e06d4cd93d657453a26` | Invalidated by new current-state evidence |

Earlier Pass B v1/v2 FAIL artifacts and all `universal-nondestructive-harness-adoption-*` history remain protected evidence only.

## Accepted Package And Runtime Decisions

- npm package identity: `@guoxiaoshuai2023/oh-my-harness`
- CLI binary: `oh-my-harness`
- product/repository name: `oh-my-harness`
- installed namespace: `.oh-my-harness/`
- installed agent prefix: `oh-my-harness-*`
- canonical public command selection: explicit scoped `npx --package=@guoxiaoshuai2023/oh-my-harness@<version>` followed by binary `oh-my-harness`
- unscoped `npx oh-my-harness` or unscoped `--package=oh-my-harness`: forbidden valid-install guidance and required negative fixture
- shorter scoped command: accepted only after direct package-resolution and binary-execution proof
- lifecycle runtime: selected supported Node plus Node standard library only
- helper runtime: Python 3.11 only when running the three required shipped Python validators
- lifecycle launch does not require Python
- local `.tgz` build/validation is allowed without registry authentication
- npm scope access, credentials, license, signing, publication, and release creation are not accepted or authorized

## Main-Thread Semantic Comparison

The main thread compared plan v4 with requirements v5, frozen Pass A, the external current-state finding, and plan v3's previously accepted non-package coverage.

Result: `PASS`.

Plan v4 changes only the disproven package-name assumption and the previously unassigned Python helper prerequisite. It preserves:

- the fixed-inventory, namespace, managed-block, ownership, backup, and lifecycle architecture;
- deterministic compiler -> lifecycle package -> docs -> final package/CI dependency direction;
- update replace/remove/create, no-op, collision, containment, wrong-target, invalid-state, state-last uninstall, and incomplete-operation controls;
- all twelve acceptance scenarios and the outer-byte AC-pass-but-user-fail result;
- adaptive main-thread orchestration, full-v2 compatibility, six profile boundaries, evaluator calibration, executor authority, modal force, and independent semantic evidence;
- secret-safe dirty-state handling and protected superseded history;
- local implementation acceptance separated from public registry operations.

No requirements-level ambiguity or blocking Pass B finding remains.

## Updated Git And Dirty-State Baseline

- Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-universal-adoption`
- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked branch delta: empty
- Staged delta: empty
- Final untracked count after this manifest: 34
- Untracked location: `task-docs/` only
- Package/installer/CLI implementation paths present: none

Later boundaries must inventory unknown untracked content by path/status/type metadata without opening it, hash only explicitly authorized known non-sensitive planning/history artifacts, preserve every pre-existing path, and stop on unknown overlap.

## Accepted Delivery Sequence

1. Task 1 establishes deterministic compiler, map, schemas, marker, scoped package contract, required helper mapping, and provisional bundle evidence.
2. Task 2 creates scoped package metadata, binary, state compatibility, and complete Node lifecycle behavior.
3. Task 3 documents canonical scoped commands and Node-versus-Python prerequisites.
4. Task 4 generates the sole final package/inventory identity, rejects unscoped commands, runs all three packed helpers under Python 3.11, and proves all twelve outcomes and semantic non-regression.

Each later write requires a versioned producer-nonmodifiable boundary and applicable independent evidence under adaptive governance. This manifest does not mandate complete v2 and does not start Task 1.

## Stop State

- Task 1 contracting: `NOT AUTHORIZED BY THIS TURN`
- Implementation: `NOT STARTED`
- Registry authentication/publication: `NOT AUTHORIZED`

Any change to requirements, Pass A, external finding/user decision, plan v4, Pass B v4, scoped package identity, runtime prerequisites, delivery ownership, or this manifest requires a new versioned planning authority.
