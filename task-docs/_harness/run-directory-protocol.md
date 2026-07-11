# Run Directory Protocol

Use this protocol only when a harness run needs durable evidence, cross-context continuity, frozen or versioned authority, retry history, or independent review. A simple self-contained task may use an inline task packet or direct main-thread boundary and must not create a run directory, packet file, context file, contract, report, or QA artifact merely because the harness is used.

## Proportional Artifact Decision

Before creating durable files, record the factual trigger and choose only the artifacts needed to preserve authority or continuity:

- A concise stable task packet may govern LOW-risk, single-context delegated work.
- A durable context/handoff record is triggered only when losing current facts, decisions, dependencies, boundaries, or retry state creates material risk.
- A frozen or versioned boundary is required when MEDIUM/HIGH Semantic Risk affects the result; HIGH Operational Risk or a high-impact external write is involved; work crosses contexts, handoffs, dependent agents, or multiple write attempts; protected paths, a dirty worktree, or shared mutable state make scope proof material; or ambiguity/prior failure makes boundary drift credible.
- Implementation reports and producer-independent QA artifacts are created when selected by the topology or required by a triggered evidence/independence gate. They are not universal stages.

`ACCEPTED_CONTRACT.md`, Implementation Reports, Result QA, Original Request Anchors, Pass A/B baselines, and Outcome Contracts remain valid strong full-v2 forms.

## Optional Directory Shape

Create a run directory under `task-docs/history/<run-slug>/` only when the decision above triggers durable state.

```text
task-docs/history/<run-slug>/
  00-planning-docs/                 # only when semantic/planning gates trigger
    ORIGINAL_REQUEST_ANCHOR.md
    PASS_A_BASELINE.md
    OUTCOME_CONTRACT.md
  context/                          # only when continuity risk triggers it
    CONTEXT_HANDOFF.md
  task-1-<short-name>/              # use only the artifacts selected/triggered
    TASK_PACKET.md
    CONTRACT_ITERATION-01.md
    ACCEPTED_CONTRACT.md
    IMPLEMENTATION_REPORT.md
    RESULT_QA.md
```

Do not create empty folders or placeholder ceremony. An inline stable packet can be cited without being copied into this shape.

## Stable Identities And Authority

Record stable identities for each artifact that controls later work or must survive a handoff, including as applicable:

- task packet or other authoritative execution boundary;
- Original Request Anchor, Pass A baseline, and Outcome Contract;
- accepted frozen/versioned contract;
- context/handoff state;
- implementation report and independent QA;
- source snapshot and traceability artifacts.

A stable identity can be a SHA-256, a deterministic ID plus hash, or both. The main thread or contract owner controls the authority. A producer must not edit or reinterpret its own controlling boundary. If a material objective, scope, write, protected-state, evidence, route, gate, or stop condition changes, stop the current attempt and issue a new identity/version before work resumes.

### Concise Stable Packet

For an eligible LOW-risk delegated write, the task packet is authoritative only when it is citable and fixes the objective, allowed writes, protected state, required evidence, and stop conditions. The producer must receive the same stable text/identity that later verification cites.

### Frozen Or Versioned Boundary

When an escalation trigger applies, use a boundary whose passing text and identity cannot be changed in place. `ACCEPTED_CONTRACT.md` is the compatible full-v2 form:

- solution designer writes a contract iteration;
- solution evaluator reviews it read-only;
- failed contracts are revised in new iterations;
- the first strict PASS text is frozen as `ACCEPTED_CONTRACT.md`;
- executor reads that one frozen contract for the attempt and cannot modify it.

Other frozen/versioned representations are valid only when they provide equivalent stable authority and evidence.

## Route And Gate Binding

Every delegated invocation must either cite verifiable runtime inheritance of `AGENTS.md` and every triggered routed document or explicitly list those routes and gates in its task packet/boundary. Repository discoverability alone is insufficient. Each triggered gate needs an owner, required evidence, and decision before its protected transition.

## Context, Dependencies, And Branch State

When continuity risk triggers context, use `templates/context-handoff-template.md` and keep it concise. Record goal/non-goals, topology/gates, sourced facts/freshness, decisions, assignments, dependencies, accepted evidence, relevant rejections, counters/classifications, interventions, stop/resume state, blockers, and next action.

Distinguish `pending`, `active`, `blocked`, `exhausted`, `completed`, `superseded`, and `cancelled`. Update after material evidence, topology change, handoff, intervention, exhaustion, or controlled resume—not after every command.

Parallel branches must record owner, prerequisites, distinct output, shared-state boundary, downstream consumer, obsolete/cancellation condition, and main-thread synthesis. Do not start downstream work before prerequisites. Do not let superseded/cancelled output flow downstream.

## Dirty Worktree Baselines

When the worktree may contain unrelated changes:

- record protected read-only paths and pre-existing classifications;
- capture before/after hashes or recursive changed-path inventories for protected state;
- define the exact allowed delta;
- preserve untracked and prior-task work.

A plain final diff is not sufficient when it cannot distinguish pre-existing state from the current attempt.

## Failure, Retry, Intervention, And Stop State

Keep three counters separate:

1. stage-local valid quality failures for the active logical stage/boundary;
2. retry-domain cumulative valid quality failures across renamed stages, tasks, boundaries, prompts, roles, tools, and topologies;
3. artifact-free operational attempts keyed by retry domain and normalized evidence-supported cause.

A quality failure counts only when a reviewable producer attempt and controlling evidence-supported, in-scope review/validation FAIL exist. An unsupported finding, evaluator misunderstanding, wrong review type, or out-of-scope objection does not consume producer quality counts; reject it with decisive evidence, classify the review/prompt/routing fault, and correct the review path. An invocation that produces no reviewable artifact consumes only its cause-specific operational count; never invent an artifact, review, or quality FAIL.

The first valid quality failure may receive one focused revision. A second stage-local or cumulative valid failure requires main-thread intervention before further affected goal advancement. A first same-cause operational failure permits one bounded retry only after a transience/invocation-defect check; the second requires intervention before a third attempt. Intervention inspects decisive artifacts/runtime evidence, names the domain/cause/counter, diagnoses the failure, and changes a relevant strategy, input, reviewer, boundary, or runtime condition.

A post-intervention third cumulative valid quality failure sets the retry domain `exhausted`. A post-intervention third same-cause operational failure sets it `blocked` when unavailable permission/service/environment/external state controls progress, otherwise exhausts that operational path. No automatic affected goal-advancing delegation or implementation write may continue. An independent branch continues only with recorded dependency, shared-premise, and shared mutable/protected-state independence.

Blocked/exhausted state does not prohibit necessary rollback, containment, isolation, evidence preservation, or state protection. Such safety recovery must already be authorized by the controlling boundary or precisely confirmed by the user after the stop, use its own explicit safety boundary/evidence/applicable confirmations, and never continue the failed outcome.

Resume requires a substantive user decision or genuinely new independently verifiable external evidence that materially changes the premise or diagnosis. Record the evidence, relationship to the same domain, revised diagnosis/boundary, and a budget of exactly one producer/review cycle or one operational attempt. Failure restores `exhausted` or `blocked`; a rename, split, “try again,” rephrasing, or previously available information is not qualifying.

## Reports And Independent QA

Reports cite the applicable authoritative boundary—concise stable packet, frozen/versioned contract, or other accepted stable representation—by identity and path/reference. They state what changed, scope/protected-state proof, actual evidence and validation, selected topology and integration when material, omitted major stages and rationale for MEDIUM/HIGH work, unvalidated areas, blockers, and remaining risk. They must not fabricate roles, reviews, validation, external actions, readback, or acceptance.

Independent QA cites the same boundary, inspects actual state and primary evidence rather than producer self-report, uses the assigned review type, and issues only strict `PASS` or `FAIL`. Existing full-v2 Implementation Report and Result QA artifacts remain valid by citing `ACCEPTED_CONTRACT.md` as the applicable frozen boundary.

The main thread owns synthesis and final acceptance. A delegated PASS is evidence to inspect, not acceptance by itself.
