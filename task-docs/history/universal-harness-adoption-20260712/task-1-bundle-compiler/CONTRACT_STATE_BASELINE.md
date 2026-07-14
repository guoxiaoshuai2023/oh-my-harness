# Task 1 Contract-State Baseline

Identity: `universal-harness-adoption-task-1-contract-state-baseline-20260712-v1`

Status: `FROZEN PRE-CONTRACT BASELINE`

## Git State

- Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-universal-adoption`
- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked delta against `origin/main`: empty
- Staged delta: empty
- Pre-run untracked files: 34, all known non-sensitive Markdown planning/history artifacts under `task-docs/`
- Active implementation writer: none

## Frozen Planning Inputs

| Input | Identity | SHA-256 |
| --- | --- | --- |
| Requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Plan | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Accepted planning inputs | `universal-harness-adoption-accepted-planning-inputs-20260712-v2` | `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d` |

## Protected Hash Inventories

- `PROTECTED_SOURCE_HASHES.sha256`
  - Entries: 43
  - SHA-256: `0e5e14f3e3512a3a102fa51a712b63c5ed097f0acd08ad7cfb8521922b142040`
- `UNTRACKED_BASELINE.sha256`
  - Entries: 34
  - SHA-256: `44668aa118a56e6ffed3745764ee96abc6a965b103b56c39716db3f797e8f939`

Both inventories passed `shasum -a 256 -c` before contract design. The untracked inventory covers only the explicitly authorized known Markdown task artifacts present before this run. Unknown future untracked content must be handled by path/status/type metadata without content reads.

## Path-State Baseline

The following Task 1 allowed-write roots are absent:

- `packaging/`
- `src/bundle/`
- `test/bundle/`

The following Task 2-4 or publication paths are also absent and protected:

- `package.json`
- `package-lock.json`
- `bin/`
- `src/installer/`
- `test/lifecycle/`
- `test/acceptance/`
- `tools/`

Existing source Harness files are read-only inputs. Gate artifacts created under this run directory after the baseline are main-thread-owned evidence and are never executor write authority.

## Required Post-State Proof

- Re-run both hash inventories.
- Confirm all new non-gate implementation paths are below the three Task 1 roots.
- Confirm every existing tracked delta is absent and no Task 2-4 path exists.
- Record full status and classify every new run artifact versus implementation path.
- Stop on any unexplained delta or protected-hash mismatch.
