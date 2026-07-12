# Task 4 PR #6 Reacceptance Boundary v3 Intervention Addendum

Identity: `adaptive-main-thread-orchestration-task-4-pr6-reacceptance-boundary-20260712-v3`

State: `CANDIDATE COMPOSITE BOUNDARY - THIRD AND FINAL AUTOMATIC CONTRACT REVIEW`

This addendum incorporates v1 SHA `45ebbf96cb3c65431af380c5da02bc210f0a0f970a43be9b5dc13279ce261c4a` and v2 SHA `dede69256bcab80887e2270d1d9726e190a721a379c0e16a828f0d69707f6142`. It resolves review v2 SHA `a4aaa6549a32fb2a9e049766a7a3960c419ac22ee6e2e184f86c159110a03fd8` after main-thread inspection of the matrix authority keys and affected scenarios.

This is the third review call in the stable Task 4 PR #6 reacceptance contract-review stage. A strict FAIL exhausts this automatic boundary-review path and no producer may launch.

## Additional Frozen Read-Only Route Authorities

The following are added to the v2 route/calibration table and to the mandatory launch-baseline inventory:

| Authority | Path | SHA-256 | Use |
| --- | --- | --- | --- |
| Route index and trigger convention | `docs/agent-routing/README.md` | `a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787` | Controls RR route-table/traceability semantics and RSM-005 route review. |
| External systems and secrets | `docs/agent-routing/external-systems-and-secrets.md` | `6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c` | Controls synthetic external-state, freshness, secret, and no-live-write decisions in ES-citing fixtures. |
| High-risk actions | `docs/agent-routing/high-risk-actions.md` | `6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd` | Controls synthetic confirmation, dry-run, rollback, irreversibility, and independent-evidence decisions in HR-citing fixtures. |

These routes are mandatory primary authorities for read-only synthetic fixture evaluation. They do not authorize a live external read/write, secret access, publish, deploy, delete, migration, permission, payment, key, or irreversible action. Any such live need remains a STOP.

The producer/reviewer packet must bind all v2 routes plus these three paths and exact hashes. Missing, mismatched, unreadable, ambiguous, discoverability-only, or unproved binding is a STOP before review.

## Affected Scenario-To-Authority Map

| Scenario/check | Required authority use and primary evidence |
| --- | --- |
| AS-02 | RR and route-index trigger semantics prove the applicable lightweight routing decision; inspect the actual row and route source. |
| AS-05 | HR plus external/current-state routes govern synthetic high-impact confirmation/evidence without authorizing a live action. |
| AS-21 | ES/current-state authorities distinguish factual evidence questions from execution and external claims. |
| AS-24 | HR/ES/current-state authorities govern stale evidence, high-impact controls, and safe stop behavior. |
| AS-26 | RR route index and router prove inheritance-or-explicit-binding; discoverability-only remains invalid. |
| AS-28 through AS-31 | ES/current-state/run authority preserves one operational cause across attempts, intervention, renamed labels, blocking, and no automatic extra call. |
| T4-AC1A / RSM-005 | Router, RR index, adaptive protocol, actual RSM-005 text, trigger-to-route map, and smoke output together support the manual semantic decision; smoke is structural only. |
| T4R-AC1 / T4R-AC9 | Every AS row is reviewed against every authority key it cites, including RR, ES, and HR; missing cited authority is unverified and therefore FAIL. |

## Override

V2's sentence that external/high-impact routes are not triggered is replaced with:

> Live external or high-impact actions are not authorized or executed. External/high-impact route documents are nevertheless triggered as read-only semantic authorities wherever the frozen synthetic fixtures cite ES or HR.

All v1/v2 allowed/protected paths, ACs, exact commands, launch-baseline requirements, reporting rules, and stops remain unchanged.
