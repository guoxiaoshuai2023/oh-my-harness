# Task 1 Boundary Manifest

- Status: Frozen pre-implementation control-artifact inventory
- Manifest identity: `adaptive-main-thread-orchestration-task-1-boundary-manifest-20260711-v1`
- Task identity: `adaptive-main-thread-orchestration-task-1-control-plane`
- Accepted boundary identity: `adaptive-main-thread-orchestration-task-1-contract-20260711-v3`
- Accepted boundary path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md`
- Accepted planning inputs manifest: `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1`
- Implementation status: Not started

This manifest freezes the exact untracked contract/review/accepted-boundary inventory before Task 1 implementation. Its own final SHA-256 is supplied outside executor write authority by the future immutable executor launch packet.

## 1. Exact Control-Artifact Inventory

| Artifact | Stable identity or role | Canonical path | Frozen SHA-256 |
| --- | --- | --- | --- |
| Contract iteration 01 | `adaptive-main-thread-orchestration-task-1-contract-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md` | `7e7b19c9f945cfc0a805a194ae363d701ed04952a5e50574f4807b5df24cc9e2` |
| Contract iteration 02 | `adaptive-main-thread-orchestration-task-1-contract-20260711-v2` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md` | `607415f1f45a58a830260b0a91cb0a1166446512e6a152911ae6385c019e912b` |
| Contract iteration 03 | `adaptive-main-thread-orchestration-task-1-contract-20260711-v3` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md` | `66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7` |
| Final contract review | `adaptive-main-thread-orchestration-task-1-contract-review-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md` | `88369047b5a9642585418f20adfb57a772a1bf4fa7dd00b7892d86cf73374d7e` |
| Accepted execution boundary | `adaptive-main-thread-orchestration-task-1-contract-20260711-v3` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md` | `66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7` |

No other contract iteration, contract review, accepted boundary, implementation report, result QA, or Task 1 control artifact existed when this inventory was frozen.

## 2. Accepted Planning Inputs Reference

| Artifact | Identity | Path | Frozen SHA-256 |
| --- | --- | --- | --- |
| Accepted planning inputs manifest | `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md` | `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780` |
| Planning delivery report | `adaptive-main-thread-orchestration-planning-delivery-report-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md` | `dcc7087f519e06772a28005160c478d87d428ba47caea7d8df4fb18194efff4e` |

The accepted planning inputs manifest contains the requirements, plan, Pass A, and Pass B identities, paths, and hashes. All remain read-only.

## 3. Future Immutable Executor Launch Packet

Before Task 1 implementation, the main thread must supply these exact fields outside executor write authority:

- accepted boundary identity: `adaptive-main-thread-orchestration-task-1-contract-20260711-v3`;
- accepted boundary path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md`;
- accepted boundary SHA-256: `66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7`;
- boundary manifest identity: `adaptive-main-thread-orchestration-task-1-boundary-manifest-20260711-v1`;
- boundary manifest path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md`;
- boundary manifest expected SHA-256: computed after this file is complete and reported in the contracting handoff;
- explicit read-only authority for this manifest and every listed artifact;
- required pre-write and post-validation verification of this manifest's own hash and every listed path/hash.

If the launch packet omits or changes any field, or any recomputed hash differs, implementation must not begin or must stop immediately.

## 4. Freeze Rules

- This manifest and all listed artifacts are read-only.
- Do not add, delete, rename, rewrite, normalize, or replace a listed control artifact during implementation.
- Do not create another contract/review/boundary artifact during implementation.
- The only authorized new implementation file is `task-docs/_harness/adaptive-orchestration-protocol.md`; all other writes are limited to the accepted boundary's exact allowed paths.
- Before and after implementation, compare the exact control-artifact inventory and every SHA-256.
- A manifest-file mismatch, entry mismatch, missing path, or unexpected control artifact is a FAIL and stop condition.

Creation and verification of this manifest completes contracting only. It does not begin Task 1 implementation.
