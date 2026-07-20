# Living Context Handoff: <Run>

- Run/context identity/version/SHA-256:
- Main curator and updated-at:
- Current goal/non-goals:
- Current authority identities/SHA-256:
- Phase and one next authorized action:

## Topology And Gates

- Selected fact-required capabilities and value:
- Dependency order:
- Triggered gates with owner/evidence/decision:
- Omitted capabilities/artifacts and reason:
- Protected state and current Boundary:

## Current Truth And Evidence Index

| Fact/decision | Source/freshness | Owner | Current evidence identity | Effect |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Optional State References

- Task Board identity/SHA-256, only when the independent Board trigger exists:
- Per-task State identities/SHA-256, only when their independent detail triggers exist:
- Macro milestones/global blockers affected by those references:

Do not copy controlling task rows, readiness, full AC evidence, attempts, findings, or waivers into Context. When Board or Task State exists, Context references exact identities and hashes only.

## Failure And Retry Ledger

| Counter | Domain/cause | Count | Evidence | Intervention/next limit |
| --- | --- | --- | --- | --- |
| Stage-local quality |  |  |  |  |
| Cumulative retry-domain quality |  |  |  |  |
| Cause-specific operational |  |  |  |  |

- Valid/unsupported findings and main disposition:
- Intervention/root cause/changed strategy:
- Stop/exhaustion/resume evidence and finite resumed budget:
- Waiver fields and non-waivable gates:

## Handoff Integrity

- Failures, retries, interventions, waivers, rejected/pending decisions, blockers, and exact evidence identities preserved through compaction:
- Candidate/report identities and main postflight state:
- Conflicts stop automatic advancement; accepted authority prevails:
- Every capability remains hard no-fan-out; main launches every invocation:

This Context records Run macro truth and evidence references. It does not create scope, permission, ACs, finding disposition, transition, or acceptance.

The adjacent interface declares this template's unique macro ownership and protocol dependencies. It defines no decision result.

<!-- oh-my-harness-work-truth:v1:start -->
{"version":1,"id":"interface.context","domain":"interface:context","kind":"interface","sourceOwner":"task-docs/_harness/templates/context-handoff-template.md","requires":["persistence.context","ownership.context-main","compaction.preserved","publication.current"],"emits":["runIdentity","goalAndNonGoals","authorityIdentities","phaseAndTopology","milestones","globalBlockersAndGates","runRetryWaiverSummary","pendingDecisions","failureScan","nextAction"],"references":["taskBoardIdentityAndHash","taskStateIdentitiesAndHashes"],"forbids":["controllingTaskRows","taskReadiness","fullAcEvidence","attemptLedger","findingLedger","fullWaiverLedger"]}
<!-- oh-my-harness-work-truth:v1:end -->
