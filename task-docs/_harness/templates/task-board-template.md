# Task Board: <Run>

- Board identity/version/SHA-256:
- Run identity:
- Main owner/writer:
- Current authority and Frozen Plan identities/SHA-256:
- Shared update identity and expected Context/Task State hashes:

Create this Board only for multiple Tasks plus dependency, blocker, retry-summary, consumer-readiness, or wrong-unlock risk. A continuity trigger alone does not force it, and the Board does not force per-task State without the separate detail trigger.

## Task Index And Readiness

| Task ID | Observable result label | Owner | State | Prerequisites | Readiness | Blocker | Retry summary | Current accepted evidence identity | Consumer/revalidation | Obsolete condition | Next action | Task State identity/SHA-256 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  | pending/active/blocked/exhausted/completed/superseded/cancelled |  |  |  |  |  |  |  |  |  |

## Integrity And Publication

- Readiness source and last recomputation identity:
- Separate main unlock decision/evidence:
- Board readback identity/SHA-256:
- Conflicts with accepted authority or per-task evidence: STOP; accepted authority prevails while main repairs state.
- Partial shared publication: retain last verified view identities; do not advance.

The Board owns only task index/readiness truth. It references per-task State identity/hash and must not own the full AC/evidence, attempt, finding, intervention, or waiver ledger. Only main writes the Board or unlocks downstream work. A state label, PASS report, or Board row never creates acceptance.

The adjacent interface declares this unique ownership and protocol dependencies. It defines no decision result.

<!-- oh-my-harness-work-truth:v1:start -->
{"version":1,"id":"interface.task-board","domain":"interface:task-board","kind":"interface","sourceOwner":"task-docs/_harness/templates/task-board-template.md","requires":["persistence.board","ownership.board-main","state.vocabulary","readiness.ready","publication.current"],"emits":["taskId","resultLabel","owner","state","prerequisites","readiness","blocker","retrySummary","currentEvidenceIdentity","consumerRevalidation","obsoleteCondition","nextAction"],"references":["taskStateIdentityAndHash","contextIdentityAndHash"],"forbids":["fullAcEvidence","attemptLedger","findingLedger","interventionRecord","fullWaiverLedger","automaticUnlock"]}
<!-- oh-my-harness-work-truth:v1:end -->
