# Universal Harness Adoption Plan Finding Routing

Identity: `universal-harness-adoption-plan-finding-routing-20260713-v1`

Status: `FROZEN FINDING ROUTING INPUT FOR PLAN V5`

## Bound Authority And Evidence

| Artifact | Path | Identity | SHA-256 |
| --- | --- | --- | --- |
| Implementation Plan v4 | `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | `universal-harness-adoption-implementation-plan-20260712-v4` | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| Task 3 Accepted Contract | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/ACCEPTED_CONTRACT.md` | `universal-harness-adoption-task-3-contract-20260713-v3` | `a952ed2c3f95882a964161a2266aa8dd344cdac8e155a6a04355ec8afb545d51` |
| Task 3 Implementation Report | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/IMPLEMENTATION_REPORT.md` | `universal-harness-adoption-task-3-implementation-report-20260713-v1` | `df1d9249ee91e006dd5f7d886d4cb28ae33b8210121a3c6e98d17efd59abef91` |
| Task 3 Result QA | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/RESULT_QA.md` | `universal-harness-adoption-task-3-result-qa-20260713-v1` | `8208d28689bb6ca170f99e3be349a89540a694d973460c91251c9fe69e2740f6` |
| Main-Thread Decision | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/MAIN_THREAD_DECISION.md` | `universal-harness-adoption-task-3-main-thread-decision-20260713-v1` | `fa9937863e93cf0a0520e740668443973ca9aa183844f51935c8dc34fe3aaecd` |
| Full failing transcript | `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/PLAN_GAP_TEST_TRANSCRIPT.md` | `universal-harness-adoption-task-3-plan-gap-test-transcript-20260713-v1` | `0297ab30e4208fd244f62e5e438c11f70a5a7a744c284e2bd7e04936c2b25261` |

## Finding Classification

- Failure origin: `Implementation Plan v4 delivery-ownership gap`.
- Task 3 content: `T3-AC1` through `T3-AC9` passed direct content and semantic inspection.
- Failing evidence: `test/bundle/compiler.test.mjs:78` still requires the manual-copy commands that `T3-AC1` requires README to remove.
- Stale assertion owner: the Task 1 bundle/compiler validation surface.
- Task 3 result: not accepted.
- Task 4: not started and not authorized.

Plan v4 simultaneously requires the README transition, a green required suite, and protection of Task 1 tests during Task 3. The frozen Task 3 boundary therefore cannot legally satisfy all three constraints. This is not a Task 3 implementation defect and must not be repaired by restoring manual-copy guidance or expanding the old Task 3 contract.

## Candidate Documentation Baseline

These files remain unchanged, unaccepted, and read-only until a revised Task 3 boundary is frozen:

| Path | SHA-256 |
| --- | --- |
| `README.md` | `90c176504881d50a02c09207529ac1d44acce95b4561ff3f8bab6f43c256ec37` |
| `docs/architecture.md` | `06c2fbd715f4c5542f0e2da2d27098f962a996f8c85e3f57a4622fb84fd58b92` |
| `docs/adapters/codex-subagents.md` | `e9cc864999d887fd9dedb3336260c9fa29ea6cc993bc510844a736e11d77744c` |
| `docs/adoption/universal-harness-adoption-runbook.md` | `c1aa4236015fc07b3e8ac381b2b3bc6276bcaec66dd4716a2cc042a98f4e7c26` |
| `docs/adoption/bundle-lifecycle-spec.md` | `e6d7bebcdc93573fc3676353c9e7956bbfd4310474b0c45a032ae79dba8bdc82` |

## Routing Decision

1. Preserve the five candidate docs byte-for-byte and do not treat them as accepted.
2. Create focused Plan v5 that changes delivery ownership only.
3. Assign one narrow Task 1 compatibility revision to the stale assertion only.
4. Revalidate Task 1, record Task 2 no-impact evidence, then rebind and revalidate Task 3.
5. Keep Task 4 blocked until Task 3 strict acceptance.
