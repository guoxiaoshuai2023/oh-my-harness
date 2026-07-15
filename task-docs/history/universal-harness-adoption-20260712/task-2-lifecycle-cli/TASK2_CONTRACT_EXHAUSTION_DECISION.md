# Task 2 Contract Exhaustion Decision

Identity: `universal-harness-adoption-task-2-contract-exhaustion-decision-20260712-v1`

Retry domain: `universal-harness-adoption-task-2-lifecycle-contract-20260712-rd1`

Status: `EXHAUSTED`

Main-thread decision: `STOP`

## Scope And Authority

The exhausted result is the stable, executable Task 2 lifecycle boundary required before any Task 2 implementation. It includes the lifecycle safety model, package-validation boundary, persisted state/plan/sentinel encoding, and evidence needed for T2-AC1 through T2-AC20. Renaming the contract, reviewer, role, prompt, or topology does not create a new retry domain.

Task 1 remains accepted and unchanged. Task 2 implementation has not started. Tasks 3 and 4 have not started.

## Quality-Failure Ledger

| Cycle | Contract | Review | Decision | Main-thread handling |
| --- | --- | --- | --- | --- |
| 1 | `universal-harness-adoption-task-2-contract-20260712-v1`, SHA `78bf692372d40a853de57e7fd94139e6db7dfcc1c33141aa8ecedf9b2671915c` | `universal-harness-adoption-task-2-contract-review-20260712-v1`, SHA `eea09c753943630df133ea16fc8a767f13e43d2a4d8e6268b71df68cc42678b9` | FAIL | Accepted six P1 findings; added transient package authority, state/marker/failure detail, Node 24 evidence, full dirty baseline, stronger AC3/AC12 evidence, and high-risk route binding. |
| 2 | `universal-harness-adoption-task-2-contract-20260712-v2`, SHA `43dfa7d6c23676b15f9421fca96f3e0e9a8b70b378b8b05b5eb537b4b6d5cf38` | `universal-harness-adoption-task-2-contract-review-20260712-v2`, SHA `6dc69326796c4565ed15041fde752695254b16e187dbb71d8a9f2592608eb503` | FAIL | Performed required main-thread intervention before a third attempt; introduced detection-only sentinel strategy, sanitized Git invocation, exact marker-byte ownership, package provenance/cleanup rules, and canonical state/compatibility definitions. |
| 3 | `universal-harness-adoption-task-2-contract-20260712-v3`, SHA `ed1d131c2159f376dcd0e2dffd01307d235b8dd6fea5d1785d56708201ece3ee` | `universal-harness-adoption-task-2-contract-review-20260712-v3`, SHA `eb369c459d080d9ada23e8ce4950851a2ad404378fd64365954515c8b216f50a` | FAIL | Third post-intervention cumulative valid quality failure; retry domain exhausted under `task-docs/_harness/adaptive-orchestration-protocol.md`. |

All three reviews were fresh, read-only, calibration-bound, within the assigned contract-review role, and supported by primary contract/repo evidence. No finding is rejected as reviewer misunderstanding or out of scope.

## Unresolved Root Causes

1. A target Git overlap probe must not execute target filters/config/includes, write Git metadata, or read unrelated target content. The current direct `git status` strategy does not prove that boundary.
2. Local npm packaging needs an executable post-pack verifier/cleanup protocol plus a closed, secret-free npm config/cache/log environment.
3. Incomplete-operation detection needs a fully specified first-mutation window, sentinel schema, exact temporary names, and fault behavior.
4. The state commit protocol must preserve T2-AC16 without leaving a success-encoded state after failed verification.
5. Plan/sentinel/path ordering and hash preimages require complete lexical schemas.

These are contract-design defects, not implementation defects. No executor may resolve them implicitly.

## Protected State And No-Impact Decision

- The Task 1 accepted evidence chain and all 12 Task 1 implementation hashes remain valid; none of the Task 2 contract findings changes the accepted bundle compiler, map, schema, marker asset, or package identity.
- All 85 rows in `DIRTY_WORKTREE_BASELINE_V2.md` remain protected.
- Task 2 implementation paths remain absent.
- Contract iterations and reviews are historical evidence and are not accepted execution authority.
- No `ACCEPTED_CONTRACT.md`, boundary manifest, launch baseline, Implementation Report, Result QA, or Task 2 acceptance artifact exists.

## Stop And Resume Rule

Do not create another goal-advancing Task 2 contract, launch an executor, or start Tasks 3/4 automatically.

Resume this same retry domain only after either:

- a substantive user decision materially selects or changes the unresolved lifecycle design premise; or
- genuinely new independently verifiable evidence proves a previously rejected mechanism safe and executable.

A generic request to retry, renamed strategy, new reviewer, or restatement of current evidence is not qualifying. Any qualifying resume must first persist a versioned resume decision, bind the unchanged retry-domain identity, state the revised diagnosis and protected baseline, and provide at most one producer/review cycle. Failure returns the domain immediately to `EXHAUSTED`.

