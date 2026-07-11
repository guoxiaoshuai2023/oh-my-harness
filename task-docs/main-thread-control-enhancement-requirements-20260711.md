# Adaptive Main-Thread Orchestration Requirements

- Status: Frozen requirements baseline for downstream planning
- Date: 2026-07-11
- Baseline identity: `adaptive-main-thread-orchestration-requirements-20260711-v4`
- Replaces: `adaptive-main-thread-orchestration-requirements-20260711-v3`
- Revision scope: closes cross-stage retry-counter reset and artifact-free operational-attempt retry gaps identified during pre-planning review
- Canonical path: `task-docs/main-thread-control-enhancement-requirements-20260711.md`
- Scope: `oh-my-harness` orchestration architecture and Codex subagent role profiles
- Implementation status: Not started
- Change policy: downstream plans must cite the baseline identity and record the file SHA-256 they reviewed; any normative requirement change creates a new versioned baseline identity rather than silently replacing this one

This document fixes the requirements for evolving `oh-my-harness` from a harness whose normal path is expressed as one fixed role sequence into a harness governed adaptively by the main thread. It is an input to later planning and architecture work. It does not choose file-level changes, authorize implementation, or replace the safety and semantic protocols already present in the repo.

## 1. Original Request Anchor

The requirements below preserve these statements from the user request as the authoritative intent anchor:

> 增强 harness 的主线程主控能力，将当前偏固定流水线的 harness，升级为由主线程根据任务性质动态选择执行拓扑、subagent、审查强度、上下文管理和介入策略的自适应 harness。

> “使用 harness”默认应表示启用主线程的自适应治理能力，而不是无条件运行全部六个角色。

> “subagent 配置定义它如何思考，主线程 Prompt 定义它这次具体思考什么。”

> 并行必须服务于真实目标，而不是单纯增加 agent 数量。

> 同一阶段经过一次修订后仍再次失败，则第三次调用前必须介入。

> “固定安全底线，自适应执行流程。”
>
> “可跳过不适用的角色，不可跳过已触发的 gate。”

The request is not merely to reduce steps, increase parallelism, or shorten TOML files. The requested outcome is a stronger main-thread control plane that selects and changes the execution topology, supplies better task context, diagnoses failures, arbitrates evidence, and remains accountable for final acceptance without weakening triggered governance.

## 2. Background And Current Architecture Judgment

The current architecture already contains controls worth preserving: a trigger-based `AGENTS.md` router, separate Operational and Semantic Risk, Original Request Anchors, Pass A/Pass B isolation, Outcome Contracts, six logical responsibilities, frozen execution contracts, independent result QA, evaluator calibration, run directories, rule traceability, current-state evidence, and proportional validation.

The problem is not the existence of these controls. The problem is that workflow selection is under-specified while one complete workflow is over-specified:

- `AGENTS.md` names the v2 sequence as the path for approved `task-docs/` work.
- `task-docs/_harness/semantic-fidelity-protocol.md` repeats that sequence under `V2 Harness Gates`.
- `task-docs/_harness/templates/orchestration-prompt-template.md` unconditionally starts with planner, then plan evaluator, solution designer, solution evaluator, executor, result evaluator, and main-thread review.
- `README.md` presents the same full loop as a principal product capability.
- `docs/adapters/codex-subagents.md` says the main thread owns orchestration but defines no decision model for choosing, combining, changing, or stopping role use.
- Every `.codex/agents/*.toml` profile embeds substantial parts of the full lifecycle, handoff rules, task-independent checklists, and fixed output structure.

The repo therefore has two competing messages: LOW-risk work should remain lightweight, yet the most concrete reusable orchestration entry point invokes the whole sequence. A main thread following the concrete instructions can become a relay between role prompts rather than the party that understands the request, chooses the topology, evaluates marginal value, and intervenes when the system is not converging.

The architectural gap is a missing control policy between the router/risk model and the available roles. The target enhancement must fill that gap. It must not replace one universal sequence with several newly mandatory sequences.

## 3. Goal And Required Outcomes

The goal is to make the main thread the accountable control plane for harness-managed work. It must select the smallest sufficient combination of direct work, delegated capabilities, independent review, durable artifacts, and triggered gates needed to deliver the user's actual outcome.

The enhancement must produce these outcomes:

1. “Use the harness” activates adaptive main-thread governance by default, not automatic invocation of all six roles.
2. The main thread explicitly reasons about whether delegation, planning, a frozen contract, implementation, specialist review, parallelism, or durable context will improve the result.
3. The main thread may change the selected topology when new evidence invalidates an assumption, changes risk, or shows declining value from the current loop.
4. The six existing responsibilities remain available as reusable capabilities. They are not mandatory stages unless the user explicitly requests the full v2 loop or triggered governance requires the corresponding control.
5. Static subagent profiles describe durable role intelligence and authority boundaries. Task-specific structure is supplied by a main-thread task packet.
6. The main thread owns synthesis, dependency control, evidence arbitration, failure diagnosis, final acceptance, and the final user-facing report.
7. Safety, semantic fidelity, current-state evidence, protected-path handling, proportional validation, and honest completion reporting remain effective regardless of topology.
8. Repeated failure causes a bounded, recorded main-thread intervention before another attempt; it never causes indefinite forwarding of the same finding.
9. Durable context is created and maintained when continuity or coordination risk justifies it, without making it ceremony for simple tasks.
10. Every delegated write attempt has a stable authoritative execution boundary, and HIGH-risk results receive producer-independent verification before main-thread acceptance.

## 4. Non-Goals

This enhancement must not:

- add a fixed seventh orchestrator agent; the main thread is the orchestrator;
- delete the six existing capabilities simply because they become optional to invoke;
- abolish plans, contracts, Pass A/Pass B, Outcome Contracts, evaluator calibration, result QA, or run evidence when their gates apply;
- make direct execution an excuse for self-approval on work that requires independent evidence;
- make every task write a topology decision, context ledger, contract, or run directory;
- replace the current v2 loop with a larger decision tree that behaves like another fixed pipeline;
- treat agent count, artifact count, or a `PASS` string as evidence of user outcome;
- move necessary safety or authority controls into undocumented main-thread memory;
- decide exact file edits, template names, runtime APIs, or migration sequencing in this requirements phase;
- begin rewriting TOML files, protocols, routed docs, or harness behavior as part of this task.

## 5. Core Architecture Principles

### 5.1 Fixed Governance Floors, Adaptive Execution

Workflow stages are selectable. Triggered safety and semantic gates are not. The main thread may omit an inapplicable role, but it may not omit a control merely because no named role was invoked to perform it.

### 5.2 The Main Thread Synthesizes; It Does Not Relay

The main thread must understand the goal and source evidence, decide why each delegation exists, inspect returned evidence, resolve disagreements, and choose the next action. Forwarding one agent's output to another without a main-thread judgment is not sufficient orchestration.

### 5.3 Delegation Must Earn Its Cost

A delegation is justified only when it adds useful specialization, independent judgment, context isolation, safe execution capacity, or real parallel speed. The main thread must also recognize diminishing returns: another agent or review round is not useful when it is unlikely to add material evidence or reduce a material risk.

### 5.4 Profiles Define How; Task Packets Define What

A static role profile defines mission, reasoning posture, authority, independence, evidence standards, and stop behavior. The main-thread task packet defines the current objective, source facts, scope, files, risks, dependencies, expected output, and validation.

### 5.5 Evidence, Not Topology, Determines Completion

Completion depends on the requested outcome and evidence proportional to its risk. Running a complete loop cannot compensate for missing outcome evidence, and using a lightweight path does not imply weak validation.

### 5.6 Adaptation Must Remain Accountable

Main-thread discretion must be explainable from task properties, evidence, and triggered gates. “Adaptive” does not mean arbitrary, unauditable, or exempt from repo rules.

## 6. Responsibility Boundaries

### 6.1 Main Thread

The main thread is responsible for:

- reconstructing and preserving the user's goal, non-goals, constraints, and user-valued outcome;
- checking authoritative repo facts and present-state evidence needed to make the orchestration decision;
- classifying Operational Risk and Semantic Risk separately;
- selecting, composing, revising, and stopping the execution topology;
- deciding whether delegation has sufficient expected benefit;
- choosing the relevant review capability, such as code correctness, factual verification, UX, security, semantic fidelity, or external-state verification;
- writing task packets and resolving material ambiguity before work is delegated;
- controlling dependencies, parallel scopes, shared mutable state, and obsolete work;
- comparing evidence quality, assumptions, source authority, and freshness when agents disagree;
- diagnosing failure origin and intervening when loops do not converge;
- maintaining proportional context and handoff state when needed;
- inspecting enough primary evidence to make an independent final judgment;
- requesting user input only for decisions that materially affect intent, scope, safety, protected state, or irreversible consequences;
- issuing the final completion decision and user-facing report.

The main thread may perform bounded planning, integration, implementation, or review itself when that is the smallest reliable path. It must not use that authority to bypass a gate requiring producer-independent verification. When the main thread produced the result, its own review is self-review and cannot satisfy that gate.

### 6.2 Subagents

A subagent is responsible for the bounded work in its task packet and the durable role principles in its profile. It must:

- stay within its read/write and decision authority;
- distinguish facts, assumptions, inferences, and uncertainty;
- inspect the evidence needed for its assigned judgment;
- report blockers and stop conditions instead of silently expanding scope;
- return findings, artifacts, validation, and residual uncertainty in handoff-ready form;
- avoid claiming main-thread acceptance or work performed by another role.

A subagent does not own the overall topology, user-intent resolution, cross-agent arbitration, or final acceptance unless the main thread has explicitly delegated a narrow component of those activities without transferring final accountability.

A subagent must not create, invoke, or delegate to another agent by default. Bounded nested delegation is allowed only when the main-thread task packet explicitly authorizes it and fixes the maximum depth, maximum agent count, nested scope, read/write authority, expected outputs, stop conditions, and the parent subagent's synthesis responsibility. It must also set an executable budget: measurable cost/time limits when the runtime supports them, or substitute controls such as maximum nested calls, deadline, or fixed iteration budget when it does not. If no enforceable budget can be stated, nested delegation is prohibited. Nested agents inherit the same task boundary and may not widen it. The main thread retains topology ownership and may cancel or supersede nested work.

### 6.3 Triggered Gates

A gate is an invariant control activated by task facts or risk, not a role and not a delivery task. A gate may be performed by the main thread or an appropriate subagent unless its independence requirement excludes the producer. Its evidence and decision must exist before the protected transition occurs.

## 7. Adaptive Workflow Selection

Before acting, the main thread must make a proportional orchestration decision based on:

- task kind: answer, research, planning, design, implementation, review, external action, or a mixture;
- Operational Risk and Semantic Risk;
- ambiguity, missing context, and source authority;
- blast radius, reversibility, and protected state;
- whether current state affects the conclusion;
- whether implementation exists at all;
- whether the work is mechanically verifiable or needs specialist judgment;
- whether independence is necessary for credible evidence;
- dependency shape, write conflicts, and safe opportunities for parallel work;
- expected benefit and cost of each additional agent or review pass;
- continuity risk and whether durable handoff state is needed.

For a short LOW-risk task, the decision may remain concise and implicit in the main thread's execution. For MEDIUM/HIGH-risk, multi-agent, or multi-step work, the selected topology, mandatory gates, key dependencies, and intentionally omitted major stages must be recoverable from a plan, run context, task packet, or equivalent durable artifact.

The decision is not frozen for the entire run. New evidence that changes a premise, risk tier, dependency, or validation path must cause the main thread to reassess downstream work. It must cancel, redirect, reorder, split, combine, or replace work that is no longer valid rather than continue the original topology for procedural consistency.

## 8. Supported Orchestration Modes

The harness must support the following patterns as composable options, not as a closed taxonomy or mandatory pipelines:

| Mode | Appropriate use | Minimum main-thread responsibility |
| --- | --- | --- |
| Direct main-thread work | Small, local, reversible, mechanically verifiable work or bounded synthesis | Establish scope, apply triggered gates, perform work, validate, and report honestly. |
| Focused subagent | One bounded investigation, plan, design, implementation, or review benefits from isolation or specialist reasoning | Supply a complete task packet, inspect the result, and integrate it. |
| Parallel independent investigation | Distinct modules, facts, hypotheses, or sources can be examined without shared writes | Partition scope, track dependencies, compare evidence, and synthesize every relevant branch. |
| Competitive alternatives | Material design uncertainty justifies independent proposals under the same constraints | Keep inputs comparable, evaluate tradeoffs and evidence, and choose or combine deliberately. |
| Implementation plus targeted review | A bounded change has a clear execution boundary but warrants a specific independent check | Select the relevant reviewer type and verify the returned evidence against the actual change. |
| Full governed flow | The user explicitly requests the full v2 loop, or the main thread judges that using the complete role sequence is the clearest way to cover all triggered controls | Monitor every transition, diagnose loops, and perform independent final acceptance. |

Research without implementation must not be forced through executor/result-QA artifacts. A focused code change need not invoke separate planner and solution-designer agents when the main thread can establish the required execution boundary and no frozen/versioned-boundary trigger applies. Conversely, a task that looks small but triggers a high-impact action must still satisfy that gate.

HIGH Operational Risk, HIGH Semantic Risk, high-impact execution, or broad cross-surface scope requires complete coverage of every triggered control. It does not by itself require all six named roles in their fixed order. Only an explicit user request for the full v2 loop necessarily selects that complete role sequence; a downstream repo may also impose a stricter local rule.

An explicit user request for the complete v2 loop overrides the adaptive omission of roles. It does not remove the main thread's duty to monitor quality, intervene, and stop invalid repetition.

## 9. Mandatory Gates And Optional Stages

Planning, contract design, implementation by a named executor, and generic evaluator passes are workflow stages. They may be selected when useful. The following controls are mandatory whenever their trigger applies:

| Trigger | Required control | What adaptation may change |
| --- | --- | --- |
| Any task | No fabricated execution, validation, evidence, review, or completion; proportional final reporting | The report depth and artifact form may scale down. |
| Secret or sensitive-data boundary | Do not read, expose, save, or modify protected material outside exact authorized scope; evidence must remain redacted | The topology may be light, but the protection cannot be waived. |
| External-system write | Exact target and effect, scoped authority, applicable readback, and external-write boundary | Planning/review roles may vary; the write boundary remains. |
| Publish, delete, migration, restore, permission, payment, key, bulk, destructive, irreversible, or comparable high-impact action | Exact action and target, plan/preview/dry-run when available, explicit user confirmation, recovery consideration, and post-action evidence | Nonessential ceremony may be omitted; confirmation and safety evidence may not. |
| Present state materially affects the result | Fresh current-state evidence at a depth proportional to risk, with stale evidence identified | The evidence format may vary by domain. |
| MEDIUM/HIGH Semantic Risk | Original Request Anchor and a comparison that can detect drift from the source intent | The named role and artifact shape may vary. |
| MEDIUM/HIGH Semantic Risk with a planner-authored plan | Pass A/Pass B isolation, stable baseline identity, and comparison against that baseline | The implementation may choose how the baseline is persisted, not whether independence is proven. |
| HIGH Semantic Risk or multi-task cross-surface work | Run-level Outcome Contract and evidence that local tasks preserve the whole outcome | The delivery topology may vary; the outcome boundary remains. |
| Credible `AC-pass-but-user-fail` risk | Outcome-level acceptance evidence or an equivalent stop/review condition | It need not become a separate task. |
| Dirty worktree or protected paths | Preserve unrelated work and use before/after hashes or a changed-path baseline where a final diff is insufficient | The baseline technique may match the affected surface. |
| Behavior-affecting or risk-bearing result | Validation proportional to touched behavior and risk | The exact checks and reviewer type are task-specific. |
| Every delegated write attempt | A stable, citable authoritative execution boundary that the executor cannot modify during that attempt | LOW-risk boundaries may be concise task packets; triggered cases require frozen/versioned boundaries. |
| HIGH Operational Risk, HIGH Semantic Risk, or a high-impact external write/result | Producer-independent verification of the applicable outcome, safety, semantic, and external-state evidence before final acceptance | The verifier type may match the risk, but the producer may not self-verify this gate. |

Skipping a named role does not satisfy or cancel its underlying gate. If the main thread chooses a topology without a planner, contract designer, or result evaluator, it must still ensure that every triggered boundary has an owner, evidence, and decision.

Producer-independent verification means that a context, person, or verification process that did not produce the result independently inspects the relevant primary evidence. Producer self-report, producer-run checklists, and a producer's own review are insufficient. Automated CI, immutable tool output, or external-system readback may contribute evidence, but HIGH Semantic Risk still requires an independent semantic judgment. The main thread always owns final acceptance, but final acceptance consumes this independent verification and does not replace it. If a subagent produced the result, the main thread may act as the independent verifier only by directly inspecting primary evidence rather than relying on the subagent report; if the main thread produced the result, a separate context or reviewer is required.

## 10. Existing Subagent Profile Optimization Requirements

Optimizing the six current TOML profiles is a distinct required outcome of the later implementation. It must not be reduced to a general instruction to “make prompts shorter.” The optimization must separate durable role intelligence from task and topology data while preserving runtime-enforced boundaries.

### 10.1 Boundaries Shared By Every Role

Every role profile must retain the relevant subset of these durable controls:

- role mission and the kind of judgment it is expected to make;
- actual read/write or sandbox authority;
- independence requirements where the role evaluates another output;
- evidence-first reasoning and an explicit ban on treating self-report as proof;
- honest status reporting and a ban on fabricated work or validation;
- scope discipline and a prohibition on silently expanding authority;
- no nested delegation unless the main-thread task packet grants bounded fan-out authority;
- stop and escalation behavior for ambiguity, missing evidence, unsafe actions, or authority gaps;
- the role's minimal handoff obligations: result, supporting evidence, uncertainty, and blockers.

These controls must not depend only on the main thread remembering to restate them.

### 10.2 Per-Role Core Intelligence And Optimization Boundary

| Current profile | Durable core intelligence to retain | Task/topology content to move out | Non-degradation invariant |
| --- | --- | --- | --- |
| `harness-planner.toml` | Reconstruct the requested outcome; preserve non-goals; separate Operational and Semantic Risk; decompose only when decomposition creates valid delivery units; control scope, dependencies, evidence, and acceptance criteria. | The complete six-role lifecycle, mandatory downstream handoff sequence, current task paths/routes, and a large mandatory plan schema. | Planner remains non-executing and must not disguise gates as delivery tasks or replace source intent with its summary. |
| `harness-plan-evaluator.toml` | Independently test a plan against source intent, risk, scope, feasibility, and verifiability; detect semantic drift and unsupported assumptions; issue an evidence-backed clear decision. | Universal v2-handoff checks, task-specific route lists, exhaustive fixed checklist output, and formatting better supplied by an optional review template or task packet. | Read-only sandbox and evaluator independence remain; it must not repair the plan, accept missing evidence, or output a qualified PASS. |
| `harness-solution-designer.toml` | Convert an already confirmed objective into an executable boundary when a contract is warranted; make scope, allowed authority, evidence, validation, and stop conditions unambiguous. | Assumption that every invocation follows an approved planner task, repeated full lifecycle text, current files/routes/ACs, and mandatory template mechanics. | It remains non-executing, may not expand the confirmed goal, and must not leave semantic or authority decisions to the executor. |
| `harness-solution-evaluator.toml` | Adversarially inspect a proposed execution boundary for ambiguity, overreach, missing evidence, unsafe authority, and semantic weakening; issue an independent clear decision. | Fixed whole-harness sequence, task-specific checklist items, exact artifact paths supplied by the run, and large mandatory output layout. | Read-only sandbox and independence remain; it must not fix the contract, invent evidence, weaken safety, or output a qualified PASS. |
| `harness-executor.toml` | Implement only an explicit authoritative boundary; preserve unrelated work; stop on material ambiguity or insufficient authority; validate the affected result and report truthfully. | Requirement that every bounded task must originate from the complete v2 sequence, fixed current paths/routes/commands, and report structure already represented by an optional template. | Write authority remains narrowly scoped. For a lightweight path, a complete main-thread task packet may be the boundary; when a frozen `ACCEPTED_CONTRACT.md` is triggered, it remains immutable and controlling. The executor never reinterprets the user goal or expands scope. |
| `harness-result-evaluator.toml` | Independently inspect actual state, outcome evidence, regressions, scope compliance, and relevant safety/semantic boundaries; distinguish failure origin and give an evidence-backed unambiguous result. | The full lifecycle recap, task-specific ACs/routes, universal four-verdict formatting when not needed, and exhaustive checklist presentation. | Read-only sandbox, independent primary-evidence review, strict failure on missing required evidence, and no repair/redesign authority remain. Flexible analysis structure must still yield a clear decision, findings, evidence, unchecked areas, and failure classification. |

### 10.3 Content Carriers After Optimization

Content removed from a static profile must move to the correct durable owner rather than disappear:

| Content | Required owner |
| --- | --- |
| Current user outcome, task scope, files, routes, ACs, dependencies, risk, expected artifact, and validation | Main-thread task packet |
| Optional repeatable artifact shape | Template |
| Always-on safety and route triggers | `AGENTS.md` and triggered routed docs |
| Semantic-risk and run-level artifact rules | Semantic fidelity and run protocols |
| Durable examples of evaluator misjudgment | Evaluator calibration |
| Runtime-enforced sandbox or write authority | Runtime adapter configuration |

Removing duplicate text is valid only when its authoritative replacement is discoverable and still applies at invocation time. The implementation must not create a design where missing one ad hoc main-thread sentence silently removes an evaluator's independence, an executor's write boundary, or a safety stop.

Every subagent invocation must bind the applicable router and routed rules by one of two mechanisms:

1. The runtime provides verifiable inheritance of `AGENTS.md` and triggered routed docs, and the task packet cites that inheritance mechanism or evidence.
2. The main thread explicitly lists the triggered route docs and gates in the task packet.

Discoverability alone is insufficient. If automatic inheritance cannot be demonstrated for the invoked runtime and context, explicit task-packet binding is mandatory. The subagent's result must identify the binding it applied when route or gate compliance is material to acceptance.

## 11. Main-Thread Task Packet Requirements

Every delegation must receive a task packet with these minimum fields. The fields may be concise and need not use a fixed template, but none may be omitted:

- the exact bounded objective and user-valued result of this invocation;
- the authoritative request, source, or evidence the role must treat as controlling;
- in-scope work and explicit non-goals;
- allowed reads, writes, tools, files, and external systems, including an explicit read-only/no-write boundary when applicable;
- the expected artifact, decision, or handoff result;
- required evidence and validation depth;
- stop, escalation, and return conditions;
- why this capability is being used and how its result will affect the run;
- router/gate binding through cited runtime inheritance or an explicit list of triggered route docs and gates;
- nested-delegation authority, which defaults to prohibited and must state the bounded allowance when enabled.

The packet must add these fields when triggered by task facts:

- Original Request Anchor and semantic artifacts when semantic meaning matters;
- verified facts, source provenance, and freshness limits when facts or present state may change;
- protected paths, dirty-worktree baselines, external-write boundaries, confirmations, or recovery controls when those gates apply;
- dependencies, prerequisites, parallel work, downstream consumers, cancellation conditions, and shared-state ownership for coordinated work;
- maximum fan-out depth, maximum agent count, executable budget, nested scope, authority, outputs, and synthesis owner when nested delegation is authorized;
- known assumptions, unresolved questions, risk-specific review needs, time limits, and other conditions needed to prevent unsafe guessing.

The packet is proportional, not a universal form. A two-file mechanical review should not receive the same ceremony as a high-risk cross-system implementation, but proportionality may shorten required fields rather than remove them. A complex delegation must not rely on the subagent to reconstruct missing scope or user intent from a generic profile.

The main thread must update or replace a packet when its premises become stale. It must not continue a delegated task whose objective or dependency has become invalid.

### 11.1 Authoritative Boundary For Delegated Writes

Every delegated write attempt must start from a stable, citable authoritative execution boundary. The boundary may be a task packet, accepted contract, or another runtime representation, but for the duration of the attempt it must:

- identify the bounded objective, allowed writes, protected state, required evidence, and stop conditions;
- have an identity or reference that the executor and later verifier can cite;
- be controlled by the main thread or contract owner, not edited or reinterpreted by the executor;
- require the current attempt to stop if a material boundary change becomes necessary;
- require a new boundary identity or version before revised work begins.

A concise stable task packet is sufficient for a LOW-risk, single-context delegated write when boundary drift is not a material risk. The boundary must be frozen or versioned when any of these applies:

- MEDIUM/HIGH Semantic Risk affects what may be changed or what outcome must be preserved;
- HIGH Operational Risk or a high-impact external write is involved;
- work crosses contexts, handoffs, dependent agents, or multiple write attempts;
- protected paths, a dirty worktree, or shared mutable state make scope proof material;
- ambiguity or prior failure shows that silent boundary drift is a credible risk.

“Frozen/versioned” is a behavioral requirement, not a required filename. The implementation plan may choose its representation, but it may not let the executor mutate the controlling boundary in place.

## 12. Parallelism, Dependencies, Conflict, And Synthesis

Parallelism is permitted only when it improves time-to-evidence, covers genuinely independent concerns, or provides valuable competing judgments.

Before launching parallel work, the main thread must define:

- the reason parallelism adds value;
- a distinct scope and expected output for every branch;
- read/write ownership and any shared-state restriction;
- prerequisites and downstream dependencies;
- the condition under which a branch becomes obsolete;
- the main-thread synthesis or merge step.

Parallel write-heavy work must not target the same files or mutable external state without an explicit conflict-safe integration strategy. Downstream work must not begin before required upstream evidence or decisions exist.

When results conflict, the main thread must compare source authority, evidence freshness, assumptions, reproducibility, scope relevance, and whether the dispute is factual, semantic, or a tradeoff. Majority vote and agent confidence are not decision rules. If decisive evidence is available, the main thread must inspect it. If the unresolved difference materially affects user intent or a protected boundary, the main thread must ask the user or stop.

The main thread must account for every material completed branch. Returning several agent outputs without an integrated conclusion is an incomplete orchestration result.

## 13. Loop Counting, Failure Classification, And Intervention

The harness needs a default intervention threshold because the current producer/evaluator loops can otherwise repeat without diagnosing whether the producer, reviewer, prompt, boundary, or source intent is at fault.

### 13.1 Counting Semantics

Retry domain is the scope that exhaustion applies to; it is defined in Section 13.5.

A valid quality-failure cycle is one completed producer attempt followed by the controlling review or validation decision for the same logical stage, task, authoritative boundary, and retry domain. Examples include plan plus plan review, contract plus contract review, or implementation plus result QA. For a standalone review task, one completed reviewer decision is one attempt.

The harness must maintain both of these quality-failure counts:

- a stage-local count for the active logical stage and boundary, used to force diagnosis before a producer/reviewer pair repeats locally;
- a retry-domain cumulative count, which includes every valid quality-failure cycle in that domain across planning, design, contract, implementation, review, renamed stages, changed boundaries, and changed topologies.

The first valid quality-failure cycle may be returned for one focused revision. If the revised output validly fails again in the same stage, the stage-local count reaches two and the main thread must intervene before a third local attempt. Independently, whenever the retry-domain cumulative count reaches two, the main thread must intervene before any further goal-advancing delegated attempt in that domain, even if the next attempt moves to another stage.

This threshold gives the delegated pair one genuine correction opportunity. A second failure is evidence that another blind retry has declining value and that the fault may be in the prompt, context, boundary, role choice, or evaluator rather than only in the artifact.

A quality-failure cycle is valid only when the controlling `FAIL` is evidence-supported, within the assigned review type, and tied to the active boundary or a real unresolved blocker. The main thread must not dismiss a `FAIL` merely because it is inconvenient, but it also must not count an unsupported evaluator finding, reviewer misunderstanding, wrong review capability, or out-of-scope objection as a failed producer cycle. When the main thread rejects a `FAIL`, it must record the decisive evidence and classify the event as a review, prompt, or routing failure before choosing a corrected next step.

Rewording the same finding or rerunning an unchanged artifact does not create a meaningful new quality attempt. Returning to an upstream boundary may start a new stage-local count for that boundary, but it must not reset or reduce the retry-domain cumulative count. A stage, task, boundary, topology, prompt, or role change cannot reset the cumulative count unless the main thread establishes a genuinely different retry domain under Section 13.5.

### 13.2 Artifact-Free Operational Attempts

An invocation that fails before producing a reviewable artifact is an operational-attempt failure, not a quality-failure cycle. Examples include agent startup failure, timeout, tool or runtime crash, permission denial, unavailable external environment, and transport or service failure. The harness must record the attempt and must not invent a producer output, review decision, or quality `FAIL` merely to fit the cycle model.

Operational-attempt failures require a separate finite counter within the retry domain, keyed by a normalized, evidence-supported failure cause. Renaming the agent, command, stage, or tool does not reset this counter when the observed failure has the same underlying cause.

- After the first operational-attempt failure, the main thread may make one bounded retry only after checking whether the failure is plausibly transient or correcting a concrete invocation defect.
- If the same cause prevents artifact production again, the main thread must intervene before a third operational attempt by inspecting available logs and state, changing a relevant condition, selecting a viable alternative, or identifying an external blocker.
- If a post-intervention third operational attempt fails from the same unresolved cause, that operational path is exhausted and the retry domain becomes `blocked` or `exhausted` as defined in Section 13.5. It must not be retried automatically through another agent, stage, command, tool, or topology.

Different observed symptoms may be grouped as one cause only when evidence supports a shared root cause; they must not be split cosmetically to renew the budget. Conversely, unrelated infrastructure failures must not be merged solely to force exhaustion. The main thread must record the evidence for the cause identity and may intervene or stop earlier when retrying would be unsafe, impossible, or predictably useless.

### 13.3 Failure Classification

After every failure, the main thread must classify the likely origin as one or more of:

- implementation failure inside a valid boundary;
- prompt failure caused by missing, ambiguous, or contradictory delegation context;
- missing or stale evidence;
- plan or contract failure;
- role/capability mismatch;
- evaluator misunderstanding, unsupported finding, or wrong review type;
- unresolved user-intent ambiguity;
- external environment, permission, tool, or state blocker.

The main thread may intervene earlier than the default threshold when evidence already shows a wrong evaluator, unsafe boundary, invalid contract, material user ambiguity, or external blocker. Before a quality failure contributes to exhaustion, the main thread must confirm that the review decision is valid under Section 13.1. Before an operational failure contributes to its cause-specific budget, the main thread must confirm from available evidence that the invocation failed and record the best-supported cause without pretending that unavailable evidence is conclusive.

### 13.4 Required Intervention

Before a third quality attempt after either applicable quality counter reaches two, the main thread must inspect both sides' artifacts and decisive evidence, record the likely root cause, and change the strategy. Before a third same-cause operational attempt, it must inspect the available runtime evidence and change a condition that could plausibly affect that cause. Valid actions include:

- rewrite, narrow, or clarify the task packet;
- provide missing authoritative or current-state context;
- reject or correct an unsupported evaluator finding with evidence;
- perform a bounded integration judgment directly;
- change the reviewer or capability type;
- split, combine, or reorder work;
- return to planning or contract design;
- request a genuinely material user decision;
- stop and report a real blocker.

It is insufficient to forward the same finding again with no diagnosis or changed input.

The intervention must also identify the active retry domain, the applicable counter, and the evidence-supported failure or cause identity so the later exhaustion decision has a stable scope.

### 13.5 Retry Domain And Exhaustion

The exhaustion unit is a retry domain, not automatically the whole original request and not an arbitrary renamed subtask. A retry domain covers the failed user-valued result, controlling boundary, root cause, and any dependent branch, shared mutable state, protected path, or external state whose correctness or safety depends on the same unresolved failure.

The retry domain must resist cosmetic changes. A new agent, stage name, task split, topology, strategy, prompt, or boundary does not create a new domain when it is still trying to deliver the same failed result or depends on the same unresolved premise. A broad user request may contain multiple retry domains; independent deliverables may continue only when the main thread records that they have no dependency on the failed result, no shared mutable or protected-state risk, no shared unresolved premise, and are not being used to bypass exhaustion.

If the retry-domain cumulative third valid quality-failure cycle occurs after required intervention, the retry domain enters an `exhausted` state regardless of which stage produced that failure. If a post-intervention third operational attempt fails from the same unresolved cause, the domain is `blocked` when progress depends on unavailable permission, service, environment, or other external state, and otherwise `exhausted` for that operational path. In either case, no further delegated attempt or implementation write may start automatically to advance the affected domain through the same unresolved premise or operational cause. The main thread may perform read-only diagnosis and final reporting, but it must stop and report the blocker unless the resume conditions below are met.

Blocked or exhausted state stops goal-advancing work, not safety recovery. It must not prevent rollback, containment, isolation, evidence preservation, or state-protection writes that are already authorized by the accepted boundary or are precisely confirmed by the user after the stop state. Such recovery work must have its own explicit safety boundary, required evidence, and external/high-risk confirmations when applicable, and it must not be used to keep pursuing the blocked or exhausted outcome.

### 13.6 Controlled Resume

A blocked or exhausted retry domain may resume only when one of these qualifying events materially invalidates the prior diagnosis or changes a premise that caused failure:

- the user makes a substantive decision about intent, scope, tradeoff, protected state, or an alternative that was previously unresolved;
- genuinely new, independently verifiable external evidence becomes available and changes the feasibility, root cause, or required boundary.

A request to “try again,” a renamed strategy, a different agent, a new task split, rephrased existing evidence, or information already available before exhaustion is not a qualifying event.

Before resuming, the main thread must record the qualifying event, its evidence, the relationship to the same retry domain, the revised diagnosis and boundary, and the resumed retry budget. The default and maximum resumed budget is one producer/review cycle for quality work or one operational attempt for an operational blocker. The main thread must not ask the user to choose retry count as a routine process; if the resumed cycle or attempt fails, the retry domain returns to `exhausted` or `blocked` and cannot resume again without another qualifying event. An unlimited or implicit budget is forbidden.

## 14. Context, Handoff, And Progress Management

A durable context/handoff record is required when loss of state would create material coordination or delivery risk, including when:

- work has multiple dependent stages or agents;
- the run may resume in a new context;
- several branches share facts, decisions, or protected boundaries;
- current-state evidence may expire;
- a frozen artifact or rejected approach must survive handoff;
- retry and intervention history is needed to avoid repeating failure.

The record should contain only the current information needed to continue safely:

- goal, non-goals, current topology, and mandatory gates;
- confirmed facts with source and freshness;
- key decisions and reasons;
- agent assignments, dependencies, and state;
- accepted outputs and validation evidence;
- rejected approaches when the reason remains relevant;
- stage-local and retry-domain cumulative quality-failure counts, cause-specific operational-attempt counts, classifications, retry domains, and main-thread interventions;
- blocked or exhaustion state, independent-branch rationale, qualifying resume event, safety-recovery action, and remaining finite retry budget when applicable;
- blockers, pending decisions, next action, and evidence that may expire.

Work state must distinguish at least pending, active, blocked, exhausted, completed, superseded, and cancelled. The main thread must update the record after material evidence, decisions, topology changes, handoffs, interventions, exhaustion, or controlled resume, not after every trivial command.

Simple self-contained tasks must not be required to create this artifact. A context document that is stale, verbose, or never used for decisions is not compliance with this requirement.

## 15. Main-Thread Independent Acceptance And Final Reporting

The main thread always owns the final completion decision. A subagent `PASS`, checklist, implementation report, or confidence statement is a claim to inspect, not sufficient evidence by itself.

The main thread must inspect primary evidence proportional to risk. This may be a focused diff and deterministic check for a small change, source and freshness verification for research, user-path or runtime evidence for a behavior change, or the complete anchor/contract/result evidence chain for high-risk work.

The final report must state, proportionally:

- the result produced and material scope boundaries;
- the orchestration pattern used and why, when that choice was material;
- what was delegated and how returned work was integrated;
- what primary evidence the main thread checked;
- which normally available stages were intentionally not used and why for MEDIUM/HIGH-risk work;
- what was not validated;
- remaining risks, blockers, or required user decisions.

The report must not imply that a role, check, external action, or validation occurred when it did not.

## 16. Backward Compatibility And Migration Boundaries

The enhancement must preserve a coherent migration path:

- the complete v2 flow remains available and must run when the user explicitly requests it;
- downstream repos may deliberately retain a stricter fixed sequence;
- the six current role names may remain available while their profiles become reusable capabilities;
- existing `ACCEPTED_CONTRACT.md`, Implementation Report, Result QA, Original Request Anchor, Pass A/B, Outcome Contract, calibration, and run-directory artifacts remain valid when applicable;
- evaluator strictness, read-only sandboxes, executor scope control, and immutable accepted contracts must not regress during profile simplification;
- current tasks or historical run artifacts must remain understandable during transition;
- no fixed seventh role or mandatory external orchestration dependency may be introduced.

Migration must be assessed against behavior, not wording volume. A shorter profile that relies on discoverable authoritative controls is acceptable; a shorter profile that silently drops a boundary is not.

## 17. Acceptance Scenarios

These scenarios are intended to distinguish a genuinely adaptive implementation from one that only renames or hides the current fixed pipeline.

| ID | Scenario and expected behavior | Failure signal |
| --- | --- | --- |
| AS-01 | A small reversible documentation or code edit is handled directly by the main thread with the smallest sufficient check. | All six roles or full run artifacts are invoked only because the user said “use the harness.” |
| AS-02 | A read-only external research request uses source investigation and factual verification as needed, then the main thread synthesizes cited evidence. | The run creates an execution contract, executor, and result-QA loop despite having no implementation. |
| AS-03 | A bounded MEDIUM-risk code change with clear requirements uses a stable execution boundary and a targeted code reviewer without mandatory planner and solution-designer agents. | Either unnecessary roles are forced in, or delegated writes begin from a mutable/uncitable prompt. |
| AS-04 | HIGH semantic-risk cross-module work preserves an Original Request Anchor, independent intent baseline, Outcome Contract, frozen/versioned execution boundary, and producer-independent semantic review. | A lighter topology omits a triggered control, or the producer's own review is called independent. |
| AS-05 | A simple-looking task includes a destructive external write; the main thread still requires exact target, preview/dry-run when available, explicit confirmation, a frozen/versioned boundary, and producer-independent readback verification. | The safety or independent-verification gate is skipped because the implementation itself is small. |
| AS-06 | The user explicitly requests the complete v2 loop; the main thread runs it while monitoring evidence and intervention thresholds. | “Adaptive” is used to ignore the explicit full-loop request, or the main thread becomes a passive relay. |
| AS-07 | The main thread declines delegation when a bounded direct inspection is cheaper and equally reliable. | A subagent is invoked merely because a matching profile exists. |
| AS-08 | Independent modules or factual questions are investigated in parallel with distinct scopes and a defined synthesis step. | Agents duplicate work, write the same files, or return outputs that are never reconciled. |
| AS-09 | Competing solution proposals receive the same goal and constraints; the main thread selects based on evidence and tradeoffs. | The outcome is chosen by majority vote, confidence, or agent count. |
| AS-10 | New current-state evidence invalidates an upstream premise; affected downstream work is stopped or replanned. | Already-launched topology continues because the original plan said so. |
| AS-11 | A producer/reviewer cycle fails, is revised, and fails again in one stage; before a third local attempt the main thread inspects artifacts, classifies the fault, and changes strategy. | The same finding is forwarded into a third call without diagnosis. |
| AS-12 | Valid quality failures in planning and contract design remain cumulative within one retry domain. A post-intervention third valid failure in execution exhausts that domain, while unrelated deliverables continue only with a recorded independence rationale. | Changing stage, boundary, topology, or task name resets the domain count, the whole broad request freezes because one branch failed, or the failed result continues under a renamed split. |
| AS-13 | Two evaluators disagree; the main thread checks source authority, assumptions, freshness, and decisive evidence, then records a reasoned resolution. | Both answers are forwarded without conclusion or one wins by vote. |
| AS-14 | A multi-agent run resumes from concise context containing goal, decisions, evidence, retry state, blockers, and next action. | The run depends on replaying the whole conversation, or the context record is stale and misleading. |
| AS-15 | The same subagent profile is copied into projects with different domains and remains usable because project/task specifics arrive in the task packet. | The profile contains paths, routes, ACs, or domain checklists tied to this repo or one workflow. |
| AS-16 | The main thread gives the same role different packets for a LOW-complexity local task and a HIGH-complexity cross-domain task; the role adapts its depth without changing its core authority. | The role mechanically emits the same full harness checklist and lifecycle for both. |
| AS-17 | A subagent report focuses on its bounded reasoning and evidence rather than restating the complete six-role process. | Most of the output is generic workflow narration unrelated to the assigned problem. |
| AS-18 | An evaluator may organize analysis according to the actual risk, but still returns an unambiguous decision, concrete evidence, findings, unchecked areas, and failure origin. | Flexibility produces vague approval, `PASS with caveats`, or no evidence trail. |
| AS-19 | After profile simplification, evaluator sandboxes remain read-only, executor authority remains bounded, safety/stop rules remain discoverable, and missing evidence still fails. | Shorter profiles weaken permissions, independence, evidence standards, or escalation behavior. |
| AS-20 | A subagent completes most of a task and leaves a small bounded integration gap; the main thread completes and validates that gap directly when safe. | The entire multi-agent loop is restarted solely to preserve stage purity. |
| AS-21 | The main thread selects factual verification for contested external claims, code review for implementation correctness, UX review for user-flow quality, security review for protected boundaries, or semantic review for intent-drift risk as applicable. | Every result is sent to the same generic evaluator regardless of the judgment and evidence actually needed. |
| AS-22 | Every delegation packet contains the minimum objective, authority source, scope/non-goals, permissions, expected result, evidence, and stop/escalation fields; triggered fields are added for current state, dependencies, external systems, or semantic risk. | The main thread omits a minimum field by declaring it outside the “relevant subset.” |
| AS-23 | A delegated write cites one stable boundary for its attempt; a material change stops the attempt and creates a new identity, and cross-context or risk triggers upgrade the boundary to frozen/versioned form. | The executor edits its own instructions, or the main thread silently changes scope inside the same attempt. |
| AS-24 | A HIGH-risk result produced by the main thread is checked by a separate producer-independent verifier before the main thread issues final acceptance. | Main-thread self-review is described as both implementation and independent verification. |
| AS-25 | A subagent completes its bounded work without creating more agents. If nested delegation is useful, the task packet explicitly caps depth and agent count, adds measurable cost/time limits or executable substitute budgets, bounds scope and authority, and assigns synthesis to the parent. | A subagent expands fan-out on its own, delegates beyond budget, or receives nested authority with no enforceable budget. |
| AS-26 | A subagent invocation cites verifiable runtime inheritance of `AGENTS.md` and triggered routed docs, or the task packet explicitly lists the applicable routes and gates. | Rules are assumed to apply merely because they exist in the repo. |
| AS-27 | A third apparent failure is traced to an unsupported evaluator finding or wrong review type. The main thread records the rejected finding and changes the review path without exhausting the producer's retry domain. | Any third `FAIL` string automatically exhausts the target even when the finding lacks evidence. |
| AS-28 | A retry domain is exhausted after leaving partial external state. The main thread stops goal-advancing work but performs only accepted-boundary-authorized or precisely confirmed rollback, containment, isolation, or state-protection actions. | Exhaustion either blocks needed safety recovery or is used as permission to keep pursuing the failed outcome. |
| AS-29 | A qualifying event resumes a blocked or exhausted retry domain for exactly one applicable producer/review cycle or operational attempt. If it fails, the domain returns to its stop state without asking the user to choose a retry count. | The main thread creates an implicit larger retry budget or turns retry count into a routine user-facing decision. |
| AS-30 | An agent invocation times out before producing an artifact. The event is recorded as an operational failure without a fabricated review; one bounded retry fails from the same cause, so the main thread intervenes before a third attempt. | Artifact-free failures are omitted from retry accounting or represented by invented producer and evaluator outputs. |
| AS-31 | A post-intervention third invocation fails from the same unresolved permission, runtime, service, or environment cause. The retry domain becomes blocked or the operational path exhausted across changed agents, tools, and stages until a qualifying event permits one bounded attempt. | The main thread repeatedly changes invocation labels or tools and retries indefinitely without evidence that the cause changed. |

## 18. Success Criteria

The requirements are satisfied only when later implementation and validation demonstrate that:

- the main thread can explain its topology from task properties, risk, evidence needs, and delegation value rather than a fixed role order;
- LOW-risk work can complete without unnecessary roles or durable artifacts;
- research, planning, implementation, review, and external-action tasks can use materially different topologies;
- triggered safety and semantic controls remain present in every topology that needs them;
- HIGH-risk results have producer-independent verification distinct from producer self-review and main-thread final acceptance;
- high risk triggers complete control coverage without automatically forcing the six-role sequence unless the user explicitly requests it;
- topology can change when evidence or failure diagnosis changes the premise;
- parallel work has explicit scope, dependency, state ownership, and synthesis;
- review capability and evidence type match the actual correctness or risk question;
- two valid quality-failure cycles in one stage force local intervention, while the retry-domain cumulative quality count survives stage, boundary, topology, and role changes; a post-intervention third cumulative valid failure exhausts the domain;
- artifact-free invocation failures use a separate cause-specific operational-attempt budget without fabricated artifacts or reviews; a repeated same-cause failure forces intervention and a post-intervention third failure blocks or exhausts that path across renamed invocations;
- exhaustion scope covers the failed result and dependent/shared-risk branches without freezing unrelated deliverables that have a recorded independence rationale;
- unsupported evaluator findings, wrong review types, or reviewer misunderstandings do not count as valid producer failures unless confirmed by evidence;
- blocked or exhausted state stops goal-advancing work while preserving authorized or precisely confirmed rollback, containment, isolation, and state-protection paths;
- a blocked or exhausted retry domain resumes only after qualifying new evidence or a substantive user decision and receives exactly one applicable producer/review cycle or operational attempt before returning to its stop state if it fails;
- context/handoff records are recoverable when needed and absent when they add no value;
- each of the six profiles contains identifiable role-specific intelligence and no longer embeds the complete harness lifecycle as its normal task;
- one profile can serve different projects, domains, and complexity levels through different task packets;
- every task packet contains the non-optional minimum fields and adds conditional fields when their triggers apply;
- subagents cannot fan out by default, and any authorized nested delegation has explicit depth, agent-count, executable budget, authority, scope, and synthesis limits;
- every invocation proves runtime inheritance of router/routed rules or binds triggered routes and gates explicitly in its task packet;
- evaluator flexibility preserves read-only authority, independence, strict evidence, clear verdicts, and stop behavior;
- every delegated write attempt cites a stable producer-nonmodifiable boundary, with frozen/versioned form when boundary drift is a material risk;
- executor flexibility preserves that controlling boundary and never grants authority to reinterpret intent or expand scope;
- final acceptance is supported by main-thread inspection of primary evidence, not by delegated `PASS` labels;
- all acceptance scenarios above can be exercised with evidence that distinguishes correct adaptive behavior from procedural mimicry.

## 19. Decisions Reserved For The Implementation Plan

The later planner and architecture work must resolve these questions without weakening this baseline:

- which existing behavior-shaping documents and adapter files need changes, and the minimum coherent change set;
- the exact representation and location, if any, of an orchestration decision record;
- the exact representation, lifecycle, and update mechanism for durable context/handoff state;
- whether mode names appear in runtime instructions or remain explanatory documentation only;
- the smallest stable output contract required from each role for routing and automation;
- how optional artifact templates are selected and how task packets reference them;
- how the required stable execution boundary is represented and cited for lightweight writes, and how frozen/versioned identities are implemented for triggered cases;
- how review capability types are selected in runtimes that expose only the current six named profiles;
- how cancellation, superseded work, and dependency state are represented in runtimes with different multi-agent support;
- how retry/intervention history is persisted and validated without forcing a run directory on simple tasks;
- how stage-local and retry-domain cumulative quality counters coexist, and how count continuity is preserved across task decomposition, upstream returns, boundary changes, and topology changes;
- how operational failure causes are normalized and evidenced without merging unrelated failures or splitting one cause to renew its budget;
- how retry-domain identity, independent-branch rationale, qualifying resume events, fixed one-cycle or one-operational-attempt resumed budgets, and safety-recovery actions are represented across task decomposition and topology changes;
- how runtimes enforce or evidence default no-fan-out and bounded nested-delegation budgets when cost/time is not measurable;
- how runtimes prove inherited router/routed-doc application when task packets do not enumerate triggered routes;
- how evaluator calibration cases should be extended for adaptive orchestration, prompt failure, wrong reviewer selection, evidence conflict, and loop intervention;
- how acceptance scenarios are converted into fixtures or tests without turning the example modes into a new mandatory pipeline;
- migration order, compatibility wording, and downstream adoption guidance.

The implementation plan must not treat these open choices as permission to revisit the fixed requirements: the main thread owns adaptive orchestration and final judgment; triggered gates remain mandatory; role profiles become durable intelligence boundaries; task packets carry current-task structure; and repeated failure requires bounded intervention.
