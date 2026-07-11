# Adaptive Main-Thread Orchestration Prompt Template

Use the generic `oh-my-harness` adaptive governance model for this request:

<USER_REQUEST>

This is a main-thread workflow prompt. It coordinates available harness capabilities; it is not a seventh agent, a fixed role, or a delivery task. “Use the harness” does not by itself require all six roles or durable artifacts.

## Preflight: Understand Before Selecting Topology

1. Read `AGENTS.md` as the always-on hard gate/router. Read only fact-triggered routed docs.
2. Reconstruct the user-valued goal, non-goals, controlling sources, scope, protected state, and completion evidence. Separate facts, assumptions, inferences, and material questions.
3. Classify Operational Risk and Semantic Risk separately. Obtain fresh current-state evidence when present state can affect correctness.
4. Identify write/external authority, reversibility, dirty/shared state, dependencies, ambiguity, specialist judgment, independence needs, and AC-pass-but-user-fail risks.
5. For every triggered gate, assign an owner, required primary evidence, and decision point. Optional roles or stages never make a triggered gate optional.
6. Stop on material ambiguity, missing authority, unsafe action, contradictory current state, or a required user decision. Do not seek or expose secrets, expand scope, add dependencies, or perform external/high-impact actions without their exact scoped authority and confirmation.

## Select And Record One Of Three Complete-v2 States

Apply exactly one applicable state without creating a fixed default pipeline:

1. **Adaptive default — MUST:** absent a complete-v2 requirement trigger and absent a complete deliberate-selection record, the main thread `MUST` select the smallest sufficient topology from concrete task facts, risk, evidence needs, dependencies, and expected delegation value. It may choose direct work, one focused capability, disjoint parallel investigation, competitive alternatives, bounded implementation plus the appropriate targeted review, or another explainable composition.
2. **Required complete v2 — MUST:** when the user explicitly requests the complete v2 loop or stricter downstream policy requires it, the main thread `MUST` select the complete ordered composition in `Complete-v2 Execution Branch` below. Adaptive omission cannot override this requirement.
3. **Deliberate complete v2 — MAY:** without either requirement trigger, the main thread `MAY` select that same complete ordered composition only when it records all six task-specific fields below before launch. Missing or generic evidence makes this state invalid and returns selection to the adaptive default or a stop for missing authority; it never makes complete v2 automatic.

Harness presence, Operational or Semantic Risk labels (including `HIGH`), role availability, artifact availability, habit, or inertia never automatically selects complete v2. Risk and scope can trigger controls without dictating all six roles. Guidance that defaults to full v2 or says only explicit request/policy can select it is invalid.

### Deliberate Complete-v2 Selection Record — All Six Fields Required

1. Concrete task facts that make the complete composition relevant:
2. At least one smaller viable topology compared, including its specific control, evidence, or handoff gap:
3. Non-duplicative value for each of all six roles (`planner`, `plan evaluator`, `solution designer`, `solution evaluator`, `executor`, `result evaluator`):
4. Triggered gate owners, required primary evidence, dependencies, handoffs, and decisions across the composition:
5. Positive marginal value after coordination cost and context impact:
6. Active main-thread controls for synthesis, topology revision, intervention, finite retries, evidence arbitration, and final acceptance:

Record the selected state, its trigger or six-field evidence, rejected smaller alternative when deliberate, and decision owner in durable state when the task is MEDIUM/HIGH-risk, multi-agent, or multi-step.

- Delegate only for material specialization, independent judgment, context isolation, safe capacity, or time-to-evidence value.
- For MEDIUM/HIGH-risk, multi-agent, or multi-step work, make the selected topology, triggered gates, dependencies, and intentionally omitted major stages recoverable in a plan, task packet, context record, or equivalent durable state.
- Reassess topology when new evidence changes a premise, risk, boundary, dependency, or validation path. Cancel, supersede, redirect, reorder, split, combine, or replace invalid work.
- Create a durable context/handoff record only when loss of state creates material coordination or delivery risk. Simple direct work needs no packet file, context file, contract, run directory, or QA artifact.

## Issue Bounded Delegations

Every delegation receives a complete packet using `templates/task-packet-template.md` or equivalent stable content: objective and user-valued result, authority source, scope/non-goals, permissions, expected result, evidence/validation, stop/escalation/return, invocation and integration purpose, route/gate binding, and nested-delegation authority.

- Prove runtime inheritance of `AGENTS.md` and triggered routes or explicitly bind them; discoverability alone fails.
- Every evaluator packet must bind a non-optional canonical evaluator-calibration identity and path (default path `task-docs/_harness/evaluator-calibration.md`), instruct consultation before verdict, and require return fields `Consulted calibration path` and `Relevant calibration case IDs`. Missing binding is invalid and must `STOP` before launch. Case-ID `N/A` is allowed only after consultation and cannot replace the path or consultation.
- Nested delegation is prohibited by default. If authorized, cap depth, agent count, executable budget, scope, authority, shared state, outputs, stops, and parent synthesis.
- Every delegated write cites stable producer-nonmodifiable authority. A concise stable packet can govern eligible LOW-risk single-context work. Use a frozen/versioned boundary for MEDIUM/HIGH Semantic Risk, HIGH Operational Risk/high-impact external writes, cross-context/dependent/multiple write attempts, material protected/dirty/shared state, or credible drift from ambiguity/prior failure. A material boundary change stops the attempt and requires a new identity/version.

## Control Dependencies, Evidence, And Synthesis

- Before parallel launch, define each branch owner, prerequisites, distinct output, read/write/shared-state boundary, downstream consumer, obsolete/cancellation condition, and main-thread synthesis.
- Do not launch downstream work before prerequisites or let superseded/cancelled output flow downstream.
- Account for every material completed branch. Integrate returned work; do not forward it as the final result without main-thread judgment.
- Resolve disagreement by source authority, freshness, assumptions, reproducibility, scope relevance, and decisive primary evidence—not confidence, votes, or agent count.
- Use the review capability that matches the question: code, factual, UX, security, semantic, or external-state verification. Producer-independent verification is mandatory when triggered and cannot be satisfied by producer self-review.

## Classify Failures And Apply Finite Budgets

After every failure, classify the best-supported origin: implementation inside a valid boundary; prompt; missing/stale evidence; plan/contract; role/capability mismatch; evaluator misunderstanding/unsupported finding/wrong review type; unresolved user intent; or external environment/permission/tool/service/state.

Maintain separately:

- stage-local valid quality-failure count;
- retry-domain cumulative valid quality-failure count across stage/task/boundary/prompt/role/tool/topology labels;
- cause-specific artifact-free operational-attempt count.

Count a quality failure only when the controlling FAIL is evidence-supported, within the assigned review type, and tied to active authority. Reject unsupported findings with decisive evidence, leave producer quality counts unchanged, classify the review fault, and correct the review path. A timeout/startup/tool failure before reviewable output is operational only; never invent a producer artifact, reviewer result, or quality FAIL.

The first valid quality failure may receive one focused revision. A second stage-local or cumulative valid failure requires main-thread evidence inspection, diagnosis, and changed strategy before further affected goal advancement. One same-cause operational retry is allowed only after checking transience or correcting an invocation defect; a second requires intervention before a third invocation. Cosmetic relabeling never resets a count.

A post-intervention third cumulative valid quality failure makes the retry domain `exhausted`. A post-intervention third same-cause operational failure makes it `blocked` when progress depends on unavailable permission/service/environment/external state, otherwise exhausts that operational path. Stop automatic goal advancement and affected writes. Permit an independent branch only with recorded dependency/shared-premise/shared-state independence.

Safety recovery after a stop is limited to rollback, containment, isolation, evidence preservation, or state protection already authorized by the boundary or precisely confirmed by the user under a separate safety boundary and evidence. It cannot continue the failed goal.

Resume only after a substantive user decision or genuinely new independently verifiable external evidence materially changes the premise/diagnosis. Record the same domain, evidence, revised diagnosis/boundary, and exactly one producer/review cycle or one operational attempt. Failure restores the stop state.

## Complete-v2 Execution Branch

When the required complete-v2 state applies, or the deliberate complete-v2 state has the complete six-field decision record, use this exact order:

`planner` -> `plan evaluator` -> `solution designer` -> `solution evaluator` negotiation until strict PASS -> freeze the passing text as immutable `ACCEPTED_CONTRACT.md` -> `executor` -> `result evaluator` -> main-thread final review.

For this branch:

- Each transition has an owner, evidence, and decision; strict evaluators return only `PASS` or `FAIL`.
- Any P0/P1 finding, missing acceptance-criteria evidence, or unverified AC is `FAIL`; never use `PASS with caveats`.
- The executor handles exactly one frozen contract, cannot edit it, cannot execute later tasks, and cannot repair out-of-contract issues.
- Implementation failure may retry only under the same frozen contract and finite budgets. Contract insufficiency returns to a new versioned solution-design boundary. Semantic plan/contract failure returns upstream.
- The main thread inspects primary evidence and applies the same classification, intervention, exhaustion, recovery, resume, and synthesis rules. It never accepts solely from delegated PASS labels.

## Truthful Return Contract

Return proportionally:

- result and material scope/protected boundaries;
- selected topology and why, when material;
- delegated work, branch accounting, and how the main thread integrated it;
- applicable authoritative boundary identities;
- primary evidence inspected and validation actually performed;
- intentionally omitted major stages and rationale for MEDIUM/HIGH work;
- unvalidated areas, blockers, residual risks, and required user decisions;
- for full v2, final plan path, per-task `ACCEPTED_CONTRACT.md` and solution decision, executor report and Result QA decision, plus main-thread review state.

Do not imply that a role, delegation, review, validation, external action, confirmation, readback, artifact, or completion occurred when it did not. Distinguish executor/reviewer evidence from main-thread or independent final acceptance.
