# Task 4 Contract Review v1 Disposition

Identity: `universal-harness-adoption-task-4-contract-review-disposition-20260714-v1`

Decision: `ACCEPT BOTH P1 FINDINGS; REVISE CONTRACT ONLY`

## Main-Thread Judgment

The two P1 findings are supported by frozen authority and are not reviewer preferences.

1. Route/gate and nested-delegation binding is required by `task-docs/_harness/adaptive-orchestration-protocol.md` for every delegated invocation. Adding it does not expand Task 4; it makes the existing executor authority explicit.
2. Requirements v5 and Plan v4 require discriminating behavior variants for AS-06, AS-07, AS-08, and AS-11 that v1 compressed too far. Restoring those variants closes semantic and verifiability gaps without adding a scenario, objective, path, or architecture layer.

No requirements or plan revision is needed. Task 1-3 remain accepted and protected. Contract v1 remains unaccepted history. Task 4 implementation remains not started.

## Authorized Revision

Contract v2 may only:

- bind the applicable router/routes and assign gate ownership/evidence/decision;
- prohibit executor route selection and nested delegation;
- record why external-system and high-impact-action routes are not triggered by local synthetic verification;
- restore the omitted AS-06/07/08/11 behaviors and corresponding T4-AC2/T4-AC3 evidence threshold;
- update its identity/hash.

The v1 objective, allowed write set, protected paths, all other ACs, publication boundary, and upstream finding routing remain unchanged.
