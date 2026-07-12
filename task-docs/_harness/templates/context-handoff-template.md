# Optional Context And Handoff: <Run Or Retry Domain>

Create this record only when losing state would create material coordination or delivery risk: dependent stages or agents, context transfer, shared facts or boundaries, expiring evidence, frozen decisions, or retry/intervention history. Simple self-contained work does not require this file. Update it after material evidence, topology change, handoff, intervention, exhaustion, or controlled resume—not after trivial commands.

## Record Identity And Trigger

- Context identity/version:
- Owner:
- Updated at:
- Durable-context trigger and risk if omitted:
- If no trigger exists: do not create or retain this artifact.

## Goal And Authority

- User-valued goal:
- Non-goals:
- Current controlling authority and stable identity:
- Protected state and write boundary:
- Original Request Anchor / Outcome Contract, when triggered:

## Current Topology And Gates

- Selected topology and rationale:
- Active capabilities/owners:
- Intentionally omitted major stages and rationale, when material:

| Triggered gate | Owner | Required evidence | Decision/state |
| --- | --- | --- | --- |
|  |  |  |  |

## Sourced Facts And Freshness

| Fact | Source/provenance | Captured at | Freshness limit or invalidation event | Current/stale |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Decisions And Relevant Rejections

| Decision or rejected approach | Reason and decisive evidence | Effect on boundary/topology | Still relevant? |
| --- | --- | --- | --- |
|  |  |  |  |

## Work, Dependency, And Branch State

Allowed states are exactly: `pending`, `active`, `blocked`, `exhausted`, `completed`, `superseded`, and `cancelled`.

- `pending`: authorized but prerequisites are not yet satisfied.
- `active`: bounded work is currently permitted.
- `blocked`: progress depends on unavailable permission, service, environment, user decision, or external state.
- `exhausted`: the finite quality domain or non-external operational path has reached its stop state.
- `completed`: accepted bounded output and evidence exist for this item.
- `superseded`: new authority or evidence invalidated this item; its output must not flow downstream.
- `cancelled`: the owner deliberately stopped work before completion; its output must not flow downstream.

| Work/branch ID | Owner | State | Prerequisites | Distinct output | Shared-state boundary/ownership | Downstream consumer | Obsolete/cancel condition | Accepted evidence | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |  |  |  |  |

Every parallel branch needs an owner, prerequisites, distinct output, shared-state boundary, downstream consumer, obsolete condition, and main-thread synthesis. An independent branch may continue after another domain stops only with recorded proof of no dependency, shared unresolved premise, shared mutable/protected-state risk, or exhaustion bypass.

## Accepted Outputs And Evidence

| Output/evidence | Producer | Primary source or command | Freshness | Main-thread use/decision |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

## Failure Classification And Separate Counters

- Retry-domain identity:
- Failed user-valued result:
- Controlling boundary:
- Root cause or unresolved premise:
- Dependent/shared mutable, protected, or external state in scope:

| Counter kind | Stable key | Count | Evidence for increment | State/next threshold |
| --- | --- | --- | --- | --- |
| Stage-local quality failures | <logical stage + active boundary> | 0 | Count only evidence-supported, in-review-type controlling FAILs | First may receive focused revision; second requires intervention before third local attempt |
| Retry-domain cumulative quality failures | <retry-domain identity> | 0 | Preserve across stages, tasks, boundaries, prompts, roles, tools, and topologies | At two, intervene before further goal advancement; post-intervention third valid failure exhausts domain |
| Artifact-free operational attempts | <retry-domain + normalized cause ID> | 0 | Invocation failed before reviewable artifact; no invented artifact/review/quality FAIL | First permits one checked bounded retry; second requires intervention; post-intervention third blocks or exhausts |

- Latest failure-origin classification: `implementation inside valid boundary` | `prompt` | `missing/stale evidence` | `plan/contract` | `role/capability mismatch` | `evaluator misunderstanding/unsupported finding/wrong review type` | `unresolved user intent` | `external environment/permission/tool/service/state`
- Decisive evidence and validity judgment:
- Unsupported review disposition and corrected review route, if any:
- Counter continuity across renamed stage/task/boundary/agent/tool/topology:

An unsupported or out-of-scope review finding does not increment producer quality counters. Reject it only with decisive evidence, record the evaluator/prompt/routing fault, and correct the review path. Operational failures never create a producer artifact, reviewer verdict, or quality count.

## Intervention And Stop State

- Intervention required because:
- Producer/reviewer artifacts or runtime evidence inspected:
- Active counter/domain/cause:
- Evidence-supported diagnosis:
- Changed strategy, input, reviewer, boundary, or runtime condition:
- Intervention completed before next attempt: yes/no
- Stop state: `none` | `blocked` | `exhausted`
- Stop-state scope and affected work:
- Independent branches allowed to continue, with independence proof:
- Prohibited goal-advancing attempts/writes:

## Safety Recovery — Separate From Goal Advancement

- Recovery needed: yes/no
- Recovery authority: `already authorized by controlling boundary` | `precisely confirmed by user after stop` | `not authorized`
- Separate safety boundary, exact rollback/containment/isolation/evidence-preservation/state-protection action:
- Applicable external/high-risk confirmation:
- Recovery evidence/readback:
- Proof the action does not continue the failed outcome:

Blocked or exhausted state does not forbid necessary safety recovery, but recovery is permitted only under the authority above. It must never be used as a route around the stop state.

## Qualifying Resume — Exactly One Cycle Or Attempt

- Qualifying event: `substantive user decision` | `genuinely new independently verifiable external evidence` | `none`
- Event/evidence and why it was unavailable or materially new:
- Relationship to the same retry domain:
- Revised diagnosis and new boundary identity/version:
- Resumed budget: `exactly one producer/review cycle` | `exactly one operational attempt` | `no resume`
- Attempt/cycle consumed: yes/no
- Result:
- On failure, restored state: `exhausted` | `blocked` | N/A

“Try again,” a renamed strategy/agent/task/tool, a task split, rephrased old evidence, or previously available information is not qualifying. A failed resumed cycle/attempt restores the stop state until another qualifying event; never ask for a routine retry count or grant an implicit larger budget.

## Blockers, Pending Decisions, And Next Action

- Current blockers:
- Pending material decisions/questions:
- Evidence that may expire:
- Single next authorized action:
- Main-thread synthesis still required:
