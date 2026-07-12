# Adaptive Orchestration Protocol

This is the normative control-plane authority for harness-managed work. Read it when the user asks to use the harness, when the main thread must choose or revise an execution topology, when work may be delegated or parallelized, or when intervention, retry, cancellation, synthesis, or independent-verification decisions are material.

The default meaning of “use the harness” is adaptive main-thread governance. It is not automatic invocation of all six harness roles. The main thread must select the smallest sufficient topology that delivers the user-valued outcome while preserving every triggered gate. The complete v2 flow remains an explicit compatible option.

## Authority And Accountability

- The main thread owns the user-goal reconstruction, separate Operational Risk and Semantic Risk classifications, topology selection and revision, dependency control, evidence arbitration, synthesis, intervention, final acceptance, and user-facing report.
- Workflow stages and named roles are selectable. A triggered safety, semantic, current-state, stable-boundary, validation, or independence gate is mandatory even when the topology omits the role commonly associated with it.
- Evidence, not role count, artifact count, or a `PASS` label, determines completion. The main thread must inspect primary evidence proportional to risk before accepting a result.
- Adaptive discretion must be explainable from task facts, risk, evidence needs, dependencies, and expected delegation value. It does not permit arbitrary process changes or exceptions to repository rules.
- A subagent result is an input to main-thread judgment. Forwarding outputs between roles without inspecting evidence, resolving disagreements, and choosing the next action is not orchestration.

## Topology Decision And Revision

Before acting, classify or inspect the factors that can change the reliable execution shape:

- task kind: answer, research, planning, design, implementation, review, external action, or a mixture;
- Operational Risk and Semantic Risk, ambiguity, source authority, blast radius, reversibility, and protected state;
- whether present state affects correctness and therefore requires fresh evidence;
- whether the work is mechanically verifiable or needs specialist or independent judgment;
- whether implementation exists, whether a stable or frozen boundary is triggered, and whether durable continuity state is needed;
- dependency shape, shared mutable state, write conflicts, cancellation conditions, and safe parallel opportunities;
- expected evidence or risk reduction from each additional agent or review pass compared with its coordination and context cost.

For short LOW-risk work, the decision may remain concise and implicit. For MEDIUM/HIGH-risk, multi-agent, or multi-step work, the selected topology, triggered gates, key dependencies, and intentionally omitted major stages must be recoverable from a plan, task packet, run context, or equivalent durable record.

Topology is revisable. New evidence that changes a premise, risk classification, dependency, boundary, or validation path requires the main thread to reassess affected work. It must cancel, supersede, redirect, reorder, split, combine, or replace invalid downstream work instead of preserving the original topology for procedural consistency.

## Delegation Value And Bounded Fan-Out

Delegate only when the invocation is expected to add material specialization, independent judgment, context isolation, safe execution capacity, or real time-to-evidence improvement. Decline or stop delegation when direct work is equally reliable, returned evidence is duplicative, coordination cost exceeds likely value, or another round is unlikely to reduce a material risk. The existence of a matching role is not itself a reason to invoke it.

A subagent must not create or invoke another agent by default. Nested delegation is allowed only when the main-thread boundary explicitly states all of the following:

- maximum depth and maximum agent count;
- nested objective, scope, read/write authority, and shared-state restrictions;
- expected outputs, dependencies, stop conditions, and parent synthesis owner;
- an executable cost/time budget when supported, or a substitute maximum-call, deadline, or iteration budget.

If no enforceable budget can be stated, nested delegation is prohibited. Nested work inherits the parent boundary, cannot widen it, and remains cancellable or supersedable by the main thread.

## Composable, Non-Exhaustive Modes

These are examples that may be combined or adapted; they are not an exhaustive taxonomy, decision tree, or set of mandatory pipelines:

- direct main-thread work for small, reversible, mechanically verifiable work or bounded synthesis;
- one focused capability for a bounded investigation, plan, design, implementation, or review;
- parallel independent investigation of disjoint modules, facts, hypotheses, or sources;
- competitive alternatives under equal goals and constraints when material design uncertainty justifies them;
- bounded implementation plus a targeted code, factual, UX, security, semantic, or external-state review;
- the complete governed v2 flow when explicitly requested or deliberately selected as the clearest control coverage.

A valid topology not named above may be selected without changing this list when the main thread can explain its value, bind every triggered route and gate, define authority and dependencies, and supply proportional evidence. Research without implementation need not create executor or result-QA artifacts. HIGH risk requires complete triggered-control coverage, not automatic use of all six named roles.

## Optional Stages, Mandatory Gates, And Route Binding

Planning, solution design, named-role execution, and generic evaluator passes are optional stages unless explicitly requested or required by a stricter downstream rule. Skipping a stage never skips its underlying control. Before each protected transition, every triggered gate must have an owner, required evidence, and decision.

Always use `AGENTS.md` as the router. Read only routes whose factual triggers apply; do not turn adaptive orchestration into an all-route read for ordinary LOW-risk work. Every delegated invocation must bind applicable router rules by either:

1. citing verifiable runtime inheritance of `AGENTS.md` and the triggered routed docs; or
2. explicitly listing the triggered route docs and gates in its task packet or authoritative boundary.

Route discoverability alone is not proof that a delegated context applied a rule. If inheritance cannot be demonstrated, explicit binding is mandatory. The following governance floors remain invariant across topologies:

- exact scope, no unrelated work, dependency approval, and protected/dirty-worktree handling;
- no unauthorized secret or sensitive-data access and redacted evidence;
- exact external-write target and effect, scoped authority, applicable readback, and all fact-triggered confirmation and recovery controls;
- fresh current-state evidence whenever present state materially affects correctness;
- Original Request Anchor, Pass A/Pass B, Outcome Contract, semantic comparison, and `AC-pass-but-user-fail` controls under the triggers owned by the semantic-fidelity protocol;
- proportional validation, truthful reporting, and producer-independent verification when triggered.

## Task Packets And Stable Write Boundaries

Every delegation must receive a bounded task packet that identifies the objective and user-valued result, controlling source, scope and non-goals, allowed reads/writes/tools/external systems, expected result, evidence and validation depth, stop and return conditions, reason for delegation, route/gate binding, and nested-delegation authority. Add current-state, semantic, protected-path, dependency, external-system, recovery, or coordination fields when their triggers apply. Task packets may be concise; required meaning may not be omitted for brevity.

Every delegated write attempt must cite a stable, citable authoritative execution boundary that identifies the objective, allowed writes, protected state, required evidence, and stop conditions. The producer must not edit or reinterpret that boundary during the attempt. A material boundary change stops the attempt and requires a new identity or version before work resumes.

A concise stable packet can govern a LOW-risk, single-context write when boundary drift is not material. Use a frozen or versioned boundary when MEDIUM/HIGH Semantic Risk affects the result, HIGH Operational Risk or a high-impact external write is involved, work crosses contexts or dependent write attempts, protected paths or shared mutable state make scope proof material, or ambiguity/prior failure makes drift credible. `ACCEPTED_CONTRACT.md` remains a compatible strong boundary form, not a universal filename for every delegated write.

## Parallel Ownership, Dependencies, Cancellation, And Synthesis

Parallelism is justified only by faster evidence, genuinely independent concerns, or valuable competing judgments. Before launch, define for each branch its distinct scope and output, read/write ownership, shared-state restrictions, prerequisites, downstream consumers, obsolete/cancellation condition, and main-thread synthesis step.

Do not run parallel write-heavy work against the same files or mutable external state without an explicit conflict-safe integration strategy. Do not start downstream work before its required upstream evidence exists. When new evidence invalidates a branch, cancel or mark it superseded and prevent its output from silently reaching downstream work.

The main thread must account for every material completed branch and integrate the conclusion. When evidence conflicts, compare source authority, freshness, assumptions, reproducibility, scope relevance, and whether the dispute is factual, semantic, or a tradeoff. Majority vote, agent count, and confidence are not decision rules. Inspect decisive primary evidence when available; stop or ask the user when unresolved disagreement materially affects intent or protected state.

## Durable Context Threshold And Work State

Create a durable context or handoff record only when losing state would create material coordination or delivery risk, such as multi-stage or multi-agent dependencies, context transfer, shared facts or boundaries, expiring evidence, frozen decisions, or retry/intervention history. Simple self-contained tasks do not require one.

When triggered, keep the record concise and current: goal and non-goals; topology and gates; sourced facts and freshness; decisions; assignments, dependencies, and work state; accepted evidence; relevant rejected approaches; counters, classifications, retry domains, interventions, stop/resume state; blockers; and next action. Distinguish at least `pending`, `active`, `blocked`, `exhausted`, `completed`, `superseded`, and `cancelled`. Update after material evidence, topology changes, handoffs, interventions, exhaustion, or controlled resume, not after every trivial command.

## Failure Classification And Validity

After every failure, the main thread must classify the best-supported origin as one or more of: implementation failure inside a valid boundary; prompt failure; missing or stale evidence; plan or contract failure; role/capability mismatch; evaluator misunderstanding, unsupported finding, or wrong review type; unresolved user-intent ambiguity; or external environment, permission, tool, service, or state blocker.

A valid quality-failure cycle is a completed producer attempt plus its controlling review or validation decision for the same logical work and retry domain. A standalone review decision is one attempt. Count a quality failure only when the `FAIL` is evidence-supported, within the assigned review type, and tied to the active boundary or a real unresolved blocker. Do not count an unsupported finding, reviewer misunderstanding, wrong review capability, or out-of-scope objection as producer failure. Rejecting such a finding requires decisive evidence and classification of the review, prompt, or routing fault.

An invocation that fails before producing a reviewable artifact is an operational-attempt failure, not a quality failure. Record the event and its best-supported cause; do not invent a producer artifact, reviewer decision, or quality `FAIL`.

## Quality And Operational Retry Budgets

Maintain two quality-failure counts:

- a stage-local count for the active logical stage and boundary; and
- a retry-domain cumulative count across planning, design, contract, implementation, review, renamed stages, changed boundaries, roles, prompts, and topologies.

The first valid quality failure may receive one focused revision. A second valid failure in the same stage requires main-thread intervention before a third local attempt. Independently, when the retry-domain cumulative count reaches two, intervene before any further goal-advancing delegated attempt in that domain. Returning upstream may start a new stage-local count, but no stage, boundary, task, role, prompt, or topology change resets the cumulative count unless evidence establishes a genuinely different retry domain.

Maintain a separate finite operational-attempt count within the retry domain, keyed by normalized, evidence-supported cause. After the first failure, one bounded retry is allowed only after checking plausible transience or correcting a concrete invocation defect. A second same-cause failure requires intervention before a third attempt. Renaming an agent, command, stage, tool, or topology does not reset the cause budget. Group symptoms only with evidence of a shared root cause, and do not split one cause cosmetically to renew attempts.

## Required Intervention

Before a third quality attempt after either applicable quality count reaches two, inspect producer and reviewer artifacts plus decisive evidence, record the likely root cause, identify the active retry domain and counter, and change strategy. Before a third same-cause operational attempt, inspect available runtime evidence, identify the cause, and change a condition plausibly relevant to it.

Valid interventions include clarifying or narrowing the packet, adding authoritative/current-state evidence, rejecting an unsupported finding with evidence, changing the review capability, performing bounded integration directly, splitting/combining/reordering work, returning to planning or boundary design, requesting a material user decision, or stopping on a real blocker. Re-forwarding the same finding or relabeling the same attempt without changed input is not intervention. The main thread may intervene earlier when retry is unsafe, impossible, or predictably useless.

## Retry Domains, Exhaustion, Safety Recovery, And Resume

A retry domain covers the failed user-valued result, controlling boundary, root cause, and dependent branch or shared mutable, protected, or external state whose correctness depends on the unresolved failure. It is not automatically the whole request, and cosmetic task splits or renamed agents, stages, boundaries, prompts, strategies, or topologies do not create a new domain.

Independent branches may continue only when the main thread records that they have no dependency on the failed result, no shared unresolved premise, no shared mutable or protected-state risk, and are not a route around exhaustion.

A post-intervention third cumulative valid quality failure exhausts the retry domain. A post-intervention third same-cause operational failure makes the domain `blocked` when progress depends on unavailable permission, service, environment, or external state, and otherwise exhausts that operational path. Stop automatic goal-advancing delegated attempts and implementation writes in the affected domain. Read-only diagnosis and truthful reporting remain allowed.

Blocked or exhausted state stops goal advancement, not necessary safety recovery. Rollback, containment, isolation, evidence preservation, or state protection may occur only when already authorized by the accepted boundary or precisely confirmed by the user after the stop. Recovery needs its own explicit safety boundary, evidence, and applicable external/high-risk confirmations, and must not be used to keep pursuing the failed outcome.

Resume only after a substantive user decision or genuinely new independently verifiable external evidence materially changes the failed premise or diagnosis. “Try again,” a renamed strategy, a different agent, a task split, rephrased old evidence, or previously available information is not qualifying. Record the event, evidence, relationship to the same domain, revised diagnosis/boundary, and finite resumed budget. The maximum default resumed budget is one producer/review cycle or one operational attempt; failure returns the domain to `exhausted` or `blocked` until another qualifying event.

## Producer-Independent Verification And Final Acceptance

HIGH Operational Risk, HIGH Semantic Risk, and high-impact external writes or results require producer-independent verification of applicable outcome, safety, semantic, and external-state evidence before final acceptance. The verifier must not be the result producer and must inspect relevant primary evidence. Producer self-report, producer-run checklists, and producer self-review are insufficient. Automated checks and immutable readback may contribute evidence, but HIGH Semantic Risk also requires independent semantic judgment.

The main thread always owns final acceptance and cannot delegate it. When a subagent produced the result, the main thread may satisfy the independent-verification role only by directly inspecting the relevant primary evidence. When the main thread produced the result, a separate context, reviewer, or qualifying independent process is required. Main-thread final acceptance consumes independent evidence; it does not replace it.

Final reports must be proportional and truthful. State the result and material scope, the selected topology and why when material, delegated work and its integration, primary evidence inspected, intentionally omitted major stages and rationale for MEDIUM/HIGH work, unvalidated areas, blockers, and residual risks. Never imply that a role, review, validation, external action, readback, or completion occurred when it did not.

## Full-v2 Compatibility

When the user explicitly requests the complete v2 loop, use: planner -> plan evaluator -> solution designer -> solution evaluator negotiation until strict PASS -> freeze `ACCEPTED_CONTRACT.md` -> executor -> result evaluator -> main-thread final review. A stricter downstream repository may also require this flow.

Full v2 remains subject to this protocol: route and gate binding, stable authority, valid-failure checks, both quality counters, operational-attempt budgets, intervention, exhaustion, and truthful reporting still apply. An evaluator must not return `PASS with caveats`; a P0/P1 finding, missing required acceptance evidence, or unverified acceptance criterion is a FAIL. The explicit flow does not turn the main thread into a passive relay or authorize infinite forwarding.

## Control-Coverage Examples

These examples illustrate gate preservation; they do not extend the mode list into a taxonomy.

- Positive lightweight topology: a bounded MEDIUM-risk code change can use a stable main-thread boundary, one focused implementer, targeted independent code review, proportional tests, and main-thread evidence inspection. Planner and solution-designer agents may be omitted because their controls are supplied by the stable boundary and main-thread decision.
- Explicit full v2: a user-requested complete flow uses all six responsibilities in order, while the main thread binds routes, validates each transition, counts failures, intervenes before invalid repetition, and performs final review.
- Rejected lightweight topology: a small implementation that includes a high-impact external write and HIGH Semantic Risk cannot omit exact confirmation, fresh current-state evidence when state matters, Original Request Anchor/Outcome Contract and semantic comparison, a frozen/versioned boundary, protected-state controls, applicable readback, or producer-independent verification merely because planner or designer roles were omitted.
