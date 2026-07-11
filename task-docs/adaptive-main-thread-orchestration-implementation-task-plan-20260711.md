# Adaptive Main-Thread Orchestration Implementation Task Plan

- Status: Implementation task plan; downstream execution is authorized only when the Pass B review artifact records final PASS and the accepted-planning-input manifest records all final identities and hashes
- Date: 2026-07-11
- Plan identity: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`
- Replaces: `adaptive-main-thread-orchestration-implementation-plan-20260711-v4`
- Requirements baseline: `adaptive-main-thread-orchestration-requirements-20260711-v4`
- Requirements path: `task-docs/main-thread-control-enhancement-requirements-20260711.md`
- Requirements SHA-256: `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`
- Planning topology: main-thread current-state analysis and plan authorship, followed by one independent read-only architecture review; no full v2 execution loop
- Pass A baseline identity/path: `adaptive-main-thread-orchestration-plan-review-pass-a-20260711-v1` / `task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md`
- Pass A baseline SHA-256: `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b`
- Pass B review path: `task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md`
- Accepted planning inputs manifest path: `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md`
- Independent review decision: See the Pass B review artifact; absence of a final PASS is an implementation blocker
- Implementation status: Not started

This plan converts the frozen requirements baseline into delivery units. It fixes the implementation boundary, dependencies, acceptance evidence, and validation strategy without authorizing edits to the harness. Later execution must create a task-specific stable boundary for each delivery unit before writing its files.

## 0. Original Request Anchor And Outcome Boundary

The authoritative request is to plan, but not implement, the evolution of `oh-my-harness` from a concrete fixed six-role sequence into adaptive main-thread governance.

> “使用 harness”默认应表示启用主线程的自适应治理能力，而不是无条件运行全部六个角色。

> “subagent 配置定义它如何思考，主线程 Prompt 定义它这次具体思考什么。”

> “固定安全底线，自适应执行流程。”
>
> “可跳过不适用的角色，不可跳过已触发的 gate。”

The frozen requirements file, identity, and SHA above are the semantic authority. A later task contract may narrow one delivery unit but must not reinterpret, supersede, or silently amend that baseline.

### Plan-Level Outcome Contract

- Embedded Outcome Contract identity: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5#plan-level-outcome-contract`

The implementation succeeds only if all of these remain true together:

- the main thread selects the smallest sufficient topology from task facts, risk, evidence needs, and delegation value;
- the complete v2 role sequence remains available for explicit requests or stricter downstream policy but is no longer the default meaning of “use the harness”;
- triggered safety, semantic, current-state, stable-boundary, dirty-worktree, and independent-verification gates cannot be skipped by choosing a lighter topology;
- static role profiles retain durable role intelligence and authority while current-task facts move into task packets and optional artifacts;
- retry controls cover stage-local quality loops, cumulative retry-domain quality failures, and artifact-free operational failures without allowing cosmetic resets;
- documentation, templates, calibration, runtime adapter, and adoption examples tell one coherent story;
- no seventh fixed agent or replacement fixed pipeline is introduced.

### AC-Pass-But-User-Fail Counterexample

All edited files parse, every requested heading exists, the six TOML files are shorter, and an acceptance matrix mentions all 31 scenario IDs. However, the copyable orchestration prompt still launches planner through result evaluator unconditionally, or the adaptive path permits HIGH-risk producer output to pass on self-review. File-level ACs pass, but the user still receives the old fixed pipeline or weakened governance. Final acceptance must therefore exercise topology decisions and triggered gates, not only inspect wording and file presence.

## 1. Planning Topology And Current-State Snapshot

This is a HIGH Semantic Risk planning task because it changes behavior-shaping instructions across the router, protocols, templates, and runtime profiles. It has no implementation or external-write component in this phase.

The selected planning topology is:

1. Main thread verifies the frozen baseline, current worktree, behavior-authority files, and existing conflicts.
2. Main thread performs the architecture judgment, chooses the minimum coherent change set, and writes this plan.
3. One independent read-only reviewer first reconstructs a stable requirements/architecture baseline without seeing this plan, then reviews this plan against that baseline.
4. Main thread resolves any findings and performs final document validation.

The complete v2 loop is not useful here: no solution contract or execution is authorized, and invoking all six roles would reproduce the behavior this work is intended to change. The focused independent review preserves semantic challenge without transferring requirements understanding or final plan ownership away from the main thread.

Current worktree before plan creation:

```text
## codex/release-checklist-fixture-path...origin/codex/release-checklist-fixture-path
?? task-docs/harness-finding-fix-hardening-task-plan-20260625.md
?? task-docs/main-thread-control-enhancement-requirements-20260710.md
?? task-docs/main-thread-control-enhancement-requirements-20260711.md
```

The branch name does not describe this architecture task. Read-only verification found that `HEAD` is `094729d20f5bccbe87446e4f69edf46c972ee22e`, `origin/main` is `40dd3187d9cbb1654aa596b419660c9dce9e96bb`, and the branch is one commit ahead through `094729d Align release checklist fixture path`. The committed delta is:

```text
M docs/adoption/open-source-release-checklist.md
```

That path overlaps Task 4's conditional write set. Implementation must not begin on the current branch.

### Implementation Branch Precondition

The default implementation strategy is a dedicated task branch based on a freshly verified latest `origin/main`, preferably `codex/adaptive-main-thread-orchestration`. Before Task 1 receives a contract, the main thread must:

1. preserve and verify the accepted-planning-input manifest containing the frozen requirements, accepted plan, Pass A baseline, and Pass B review identities, paths, and final hashes, plus hash the unrelated untracked files;
2. create or switch to the dedicated task branch from the verified `origin/main` base without carrying commit `094729d`;
3. transfer only the accepted planning/review artifacts and accepted-input manifest needed to govern implementation, preserving their identities and hashes;
4. record `HEAD`, merge base, `git status --short`, and `git diff --name-status origin/main...HEAD` as the committed changed-path baseline;
5. confirm that `docs/adoption/open-source-release-checklist.md` has no inherited architecture-task delta before Task 4.

Reusing `codex/release-checklist-fixture-path` is prohibited unless the user explicitly accepts mixing the existing PR work with this architecture task. Such an exception must identify commit `094729d`, the overlapping file, ownership of its existing change, and how Task 4 will distinguish inherited content from new work. Branch preparation is a precondition, not authorization to implement Task 1.

## 2. Current-State Gap Inventory

| Gap | Current evidence | Required implementation outcome |
| --- | --- | --- |
| G-01 Fixed sequence is the most concrete authority | `AGENTS.md` lines 30-36 and semantic protocol lines 18-25 state one v2 sequence for approved work. | Replace default-sequence authority with adaptive control selection while retaining full-v2 compatibility as an explicit mode. |
| G-02 Copyable prompt is unconditionally procedural | `orchestration-prompt-template.md` lines 17-35 always launch all six responsibilities and repeat until PASS. | Make preflight topology and gate selection the default; full v2 becomes an explicit selectable branch, not the template itself. |
| G-03 No central control-plane protocol | Router and risk docs describe gates, but no authority defines delegation value, topology changes, synthesis, intervention, or diminishing returns. | Add one adaptive orchestration protocol as the normative control-plane source rather than scattering the complete policy through every profile. |
| G-04 Task packets are not first-class | Existing plan and contract templates carry some fields, but there is no minimum packet for every delegation or proof of routed-rule binding. | Define a reusable task-packet shape with mandatory and triggered fields, runtime inheritance or explicit route binding, and bounded nested delegation. |
| G-05 Execution boundary is contract-file-specific | Executor/profile/run protocol assume every write starts from frozen `ACCEPTED_CONTRACT.md`. | Preserve that strong form while allowing a stable, citable, producer-nonmodifiable boundary for lighter delegated writes and requiring frozen/versioned form when risk triggers. |
| G-06 Context and handoff are run-directory-centric | Run protocol stores contracts and QA but does not represent optional topology state, decisions, obsolete branches, retry domains, or operational failures. | Add proportional handoff state that is required only when continuity risk exists and can survive context changes. |
| G-07 Retry rules are absent from runtime artifacts | Existing prompts repeat until PASS and do not count stage-local, retry-domain cumulative, or artifact-free failures. | Encode finite intervention/exhaustion semantics and prevent resets through renamed stages, boundaries, agents, tools, or topologies. |
| G-08 Parallelism has only a depth guard | `.codex/config.example.toml` limits depth, but there is no scope ownership, dependency, cancellation, synthesis, or nested budget protocol. | Give the main thread topology ownership; default subagents to no fan-out; require explicit bounded authorization and synthesis for any nested delegation. |
| G-09 Review capability is generic and lifecycle-bound | Plan, solution, and result evaluators are tied to fixed artifacts and long checklists rather than the actual judgment type. | Preserve independence and strict evidence while allowing task packets to select semantic, code, factual, UX, security, or external-state review. |
| G-10 Six profiles duplicate workflow and task shape | Across the six TOMLs, different profiles repeat substantial lifecycle assumptions, fixed handoffs, repo paths, or large output structures beyond their durable role intelligence. | Retain role mission, permissions, independence, evidence, and stop behavior; migrate current-task and artifact shape to the correct shared layer. |
| G-11 High-risk independent evidence is not consistently visible | High-risk and external-write routed docs require confirmation and reporting but do not clearly require producer-independent verification. | Make producer-independent evidence explicit for HIGH Operational Risk, HIGH Semantic Risk, and high-impact external writes while keeping main-thread final judgment distinct. |
| G-12 Public docs and example reinforce the old default | README, architecture, adapter, router-refactor runbook, and minimal example present the v2 sequence as the normal architecture. | Update explanatory/adoption surfaces after behavior authorities stabilize, without changing unrelated release or license content. |
| G-13 Calibration does not cover orchestration failures | Existing cases focus on evaluator evidence and semantic drift. | Add durable cases for mechanical full-loop use, skipped gates, weak packets, unmanaged parallel work, retry reset, unsupported FAIL handling, and operational retry. |
| G-14 No acceptance fixture for adaptive behavior | Existing routing fixture validates trigger/path mentions, not topology or loop behavior. | Add a human-reviewable scenario matrix that maps all 31 frozen scenarios to authority, fixture setup, expected decision, prohibited behavior, and evidence. |
| G-15 Current branch contains overlapping committed work | `codex/release-checklist-fixture-path` is one commit ahead of `origin/main`; commit `094729d` changes Task 4's conditional path `docs/adoption/open-source-release-checklist.md`. | Require a dedicated implementation branch from verified latest `origin/main` and a committed changed-path baseline before Task 1. |

## 3. Behavior Authority And Conflict Map

Implementation must make ownership explicit so the same rule is not maintained independently in several layers.

| Layer | Authority after implementation | Current conflict or dependency |
| --- | --- | --- |
| `AGENTS.md` | Always-on gates, route triggers, concise adaptive entry point, explicit full-v2 compatibility rule | Currently declares the fixed sequence directly. Must remain compact. |
| New adaptive orchestration protocol | Topology selection, task packets, route binding, delegation/fan-out, dependencies, synthesis, stable execution boundary, context threshold, retry/intervention, producer-independent verification | Missing today. This becomes the single detailed control-plane authority. |
| Semantic fidelity protocol | Operational/Semantic Risk distinction, anchors, Pass A/B, Outcome Contract, semantic comparison, AC-pass-but-user-fail | Currently also declares a universal v2 sequence; must defer topology to adaptive protocol while preserving semantic gates. |
| Routed safety/current-state/boundary docs | Trigger-specific controls and evidence | High-risk/external/validation/boundary docs need narrow additions where the frozen baseline creates a new mandatory control. Current-state rules are already substantially aligned. |
| Run-directory protocol | Optional durable run/context state, stable identities, frozen boundaries, retry and evidence persistence | Currently assumes one contract-review-executor-result-QA shape. |
| Templates | Optional artifact shapes selected by a task packet or triggered gate | Several templates require fixed v2 artifacts or fixed output forms. Templates must not become mandatory stages. |
| Evaluator calibration | Durable failure patterns and strict evidence rules | Must cover adaptive orchestration without turning calibration into another workflow engine. |
| Six TOML profiles | Runtime-specific durable role intelligence and actual permission boundaries | Currently duplicate lifecycle, paths, checklists, and output formats. |
| Adapter docs/config example | Codex mapping, inheritance/fan-out limitations, portability notes | Must explain task packet binding and the difference between profile policy and runtime enforcement. |
| README/architecture/adoption/example | Explanation, copying guidance, and migration examples | Must follow normative sources, not redefine them. |

Conflict resolution order for implementation is: frozen requirements baseline -> repo router and routed hard gates -> adaptive/semantic/run protocols -> task-specific stable boundary -> optional templates -> runtime profile -> explanatory/adoption docs. A lower layer may specialize presentation but may not weaken a higher-layer control.

## 4. Architecture Implementation Judgment

The minimum coherent architecture is one control plane plus reusable capabilities, not a set of named mini-pipelines.

The implementation should add `task-docs/_harness/adaptive-orchestration-protocol.md` and route orchestration triggers to it from `AGENTS.md`. That protocol should define the decision inputs and invariants, while orchestration modes remain non-exhaustive examples. It should also own the minimum task packet, route/gate binding, parallel ownership, topology changes, failure classification, both quality counters, operational-attempt budgets, context threshold, and independence rules.

The semantic protocol should continue to own Original Request Anchor, Pass A/B, Outcome Contract, and semantic comparison. It should no longer make the six-role order universally authoritative. The run protocol should own persistence and identities, including optional context/handoff and retry state. This separation avoids making every role profile a copy of the whole harness.

Every delegated write attempt must cite one stable boundary for that attempt. A concise task packet may be that boundary for LOW-risk local work if it is stable, citable, and not editable by the producer. Frozen/versioned form is mandatory when the baseline's semantic, operational, cross-context, protected-path, shared-state, or drift triggers apply. `ACCEPTED_CONTRACT.md` remains the compatible strong form, not the universal filename for all delegated writes.

Producer-independent verification is a triggered control, not synonymous with a named result evaluator. The main thread always makes final acceptance, but it cannot count its own review as independent when it produced the result. The selected verifier and evidence type must match the risk question.

## 5. Minimum Coherent Change Set

The following surfaces are the planned write set for implementation. Inclusion means “change only if required by the delivery unit's ACs,” not permission for general cleanup.

### Normative Control Surfaces

- `AGENTS.md`
- `docs/agent-routing/README.md`
- `docs/agent-routing/external-systems-and-secrets.md`
- `docs/agent-routing/high-risk-actions.md`
- `docs/agent-routing/task-planning-scale.md`
- `docs/agent-routing/implementation-boundary.md`
- `docs/agent-routing/validation-and-reporting.md`
- `task-docs/_harness/adaptive-orchestration-protocol.md` (new)
- `task-docs/_harness/semantic-fidelity-protocol.md`
- `task-docs/_harness/run-directory-protocol.md`

`docs/agent-routing/current-state-evidence.md` is inspected but is not in the default write set because its freshness and evidence-scale rules already satisfy the baseline. It may be added to a task boundary only if implementation uncovers a specific contradiction.

### Artifact And Runtime Surfaces

- `task-docs/_harness/templates/orchestration-prompt-template.md`
- `task-docs/_harness/templates/task-packet-template.md` (new)
- `task-docs/_harness/templates/context-handoff-template.md` (new)
- `task-docs/_harness/templates/plan-template.md`
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/task-contract-template.md`
- `task-docs/_harness/templates/executor-report-template.md`
- `task-docs/_harness/templates/result-qa-template.md`
- `task-docs/_harness/templates/routing-scenario-matrix-template.md`
- all six `.codex/agents/*.toml`
- `docs/adapters/codex-subagents.md`
- `.codex/config.example.toml` only if its comments must change to describe stronger default no-fan-out versus explicitly authorized bounded nesting; its `max_depth = 1` safety example must not be weakened casually

`solution-review-template.md` remains unchanged unless a concrete field conflict is proven: it is legitimately contract-specific and contracts remain supported. Changing every template for visual consistency is out of scope.

### Validation, Explanation, And Adoption Surfaces

- `task-docs/_harness/evaluator-calibration.md`
- `task-docs/_harness/adaptive-orchestration-acceptance-matrix.md` (new)
- `README.md`
- `docs/architecture.md`
- `docs/adoption/router-refactor-runbook.md`
- `docs/adoption/open-source-release-checklist.md` only if the new acceptance matrix adds a concrete release validation step
- `examples/minimal-router/AGENTS.md`
- `examples/minimal-router/README.md` only if copying instructions or route inventory change

No helper script is required by default. A new validator script is allowed only if Task 4 proves that deterministic structural checks cannot be expressed with existing tooling and a small standard-library script materially improves evidence. License, publication, CI, release policy, unrelated traceability scripts, and product-specific examples are excluded.

## 6. Delivery Units And Dependency Order

```text
Task 1: Adaptive control-plane authority
          |
          +--> Task 2: Task packets, boundaries, context, and retry artifacts --+
          |                                                               |
          +--> Task 3: Six reusable Codex role profiles -------------------+
                                                                          |
                                                                          v
                                      Task 4: Acceptance, calibration, and adoption closure
```

Task 1 establishes normative ownership. Tasks 2 and 3 may proceed in parallel only after Task 1 is accepted because they have disjoint write sets and both consume Task 1's terminology. Each must validate only its own outputs while parallel; combined template/profile compatibility is deferred to Task 4. Task 4 starts after Tasks 2 and 3 because it validates and explains their combined behavior. No two parallel tasks may edit the same file.

Accepted results are identity-bound, not permanently valid. Any revision to an accepted upstream task triggers transitive dependency impact analysis before downstream work resumes. The main thread must identify every downstream result, boundary, fixture, review, and evidence artifact that consumed or depended on the superseded identity. An affected result becomes `superseded`, must receive a new versioned boundary, and must rerun its affected ACs and independent acceptance. A result may remain accepted only when the main thread records concrete no-impact evidence showing that its inputs, assumptions, authority, behavior, and evidence remain valid under the new upstream identity. Task 4 may resume only after all affected upstream and downstream identities stabilize and Task 4 itself receives a new versioned boundary citing those identities.

## 7. Task 1 - Establish The Adaptive Control-Plane Authority

### User/Architecture Result

“Use the harness” resolves to adaptive main-thread governance, with one authoritative decision model and mandatory gate coverage. Full v2 remains available but is no longer the implicit default.

### In Scope

- Add the adaptive orchestration protocol and route it from the repo router.
- Define topology inputs, delegation value, modes as examples, route/gate binding, no-fan-out default, bounded nested delegation, dependency/cancellation/synthesis ownership, stable write boundaries, context threshold, quality/operational failure budgets, intervention, stop states, controlled resume, and producer-independent verification.
- Remove universal fixed-sequence authority from router and semantic protocol while retaining explicit full-v2 compatibility.
- Add narrow mandatory-control wording to external-write, high-risk, implementation-boundary, planning-scale, and validation routed docs.

### Out Of Scope

- Template redesign, TOML edits, calibration cases, README/adoption prose, runtime code, or task execution.
- Changing Pass A/B, Outcome Contract, secrets, confirmation, or dirty-worktree force.

### Allowed Write Areas

- `AGENTS.md`
- `docs/agent-routing/README.md`
- `docs/agent-routing/external-systems-and-secrets.md`
- `docs/agent-routing/high-risk-actions.md`
- `docs/agent-routing/task-planning-scale.md`
- `docs/agent-routing/implementation-boundary.md`
- `docs/agent-routing/validation-and-reporting.md`
- `task-docs/_harness/adaptive-orchestration-protocol.md`
- `task-docs/_harness/semantic-fidelity-protocol.md`

### Protected Paths

- all `.codex/agents/*.toml`
- `task-docs/_harness/templates/`
- `task-docs/_harness/run-directory-protocol.md`
- `task-docs/_harness/evaluator-calibration.md`
- the frozen requirements and this plan
- all pre-existing untracked files listed in Section 13

### Acceptance Criteria And Evidence

- T1-AC1: Router states adaptive governance as default and full v2 as explicit/compatible, without defining a replacement mandatory sequence. Evidence: router excerpts plus negative search for universal sequence language.
- T1-AC2: One protocol owns all topology and intervention invariants listed in the frozen baseline. Evidence: requirement-to-heading map covering delegation, packets, route binding, boundaries, context, parallelism, retry domains, operational attempts, stop states, and independence.
- T1-AC3: Triggered gates retain or strengthen modal force. Evidence: before/after force table for secrets, external writes, high-impact confirmation, current-state evidence, semantic gates, dirty worktree, validation, and independent verification.
- T1-AC4: HIGH risk means complete control coverage, not automatic six-role order. Evidence: explicit positive and negative examples in the protocol.
- T1-AC5: Route index and paths are valid and LOW-risk handling remains lightweight. Evidence: path check and targeted route review.
- T1-AC6: Semantic protocol still owns Original Request Anchor, Pass A/B, Outcome Contract, and AC-pass-but-user-fail handling. Evidence: semantic rule preservation table.
- T1-AC7: The adaptive protocol and validation/reporting route require proportional main-thread final reports to identify the selected material orchestration pattern, delegated work and integration, primary evidence inspected, intentionally omitted major stages for MEDIUM/HIGH work, unvalidated areas, blockers, and residual risks without claiming roles, validation, review, or external actions that did not occur. Evidence: authority excerpts and truthful-reporting positive/negative fixtures.
- T1-AC8: Before Task 1 acceptance, a focused positive/negative tabletop fixture proves that ordinary `task-docs` work does not automatically select full v2, an explicit full-v2 request still selects the complete flow, and every independently triggered safety or semantic route remains bound under a lighter topology. Evidence: three recorded cases with selected topology, triggered routes/gates, expected result, failure signal, and main-thread judgment.

### Validation

- Check Markdown paths and headings with targeted `rg` commands.
- Run the T1-AC8 focused tabletop fixture and require all three cases to pass before Task 1 acceptance.
- Run `python3 scripts/validate_router_fixture.py` against an updated completed router fixture if one is available at Task 1; otherwise defer only the full trigger/path matrix update to Task 4. The focused behavior fixture cannot be deferred.
- Review modal-force preservation manually; a string-presence check is not semantic proof.
- Run `git diff --check` and protected-path before/after verification.

### Stop Conditions

- Stop if implementing the control plane requires weakening any frozen gate or changing the baseline.
- Stop if two normative files remain independently authoritative for contradictory default workflows.
- Stop if a new route cannot be represented without breaking router portability or LOW-risk selective reading.

## 8. Task 2 - Implement Task Packets, Stable Boundaries, Context, And Retry Artifacts

### User/Architecture Result

The main thread can issue a complete bounded delegation, persist only the state a complex run needs, and control retries without forcing every task through plan/contract/result artifacts.

### In Scope

- Add a task-packet template with mandatory fields and triggered extensions.
- Make the orchestration prompt select topology and gates before invoking capabilities.
- Add an optional context/handoff template for dependencies, decisions, evidence freshness, branch state, quality counters, operational causes, intervention, stop state, and resume budget.
- Update run protocol and affected templates to support a stable task packet or stronger frozen/versioned contract boundary.
- Preserve full-v2 artifacts as valid strong forms.

### Out Of Scope

- TOML profiles, README/adoption docs, calibration, or runtime automation.
- Requiring durable packet/context files for simple direct work.
- Making review, semantic diff, result QA, or final acceptance delivery tasks.

### Allowed Write Areas

- `task-docs/_harness/run-directory-protocol.md`
- `task-docs/_harness/templates/orchestration-prompt-template.md`
- `task-docs/_harness/templates/task-packet-template.md`
- `task-docs/_harness/templates/context-handoff-template.md`
- `task-docs/_harness/templates/plan-template.md`
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/task-contract-template.md`
- `task-docs/_harness/templates/executor-report-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Protected Paths

- Task 1 accepted authority files
- all `.codex/agents/*.toml`
- `task-docs/_harness/evaluator-calibration.md`
- `task-docs/_harness/templates/solution-review-template.md` unless a documented contract-field blocker is accepted into a revised boundary
- frozen requirements, this plan, and Section 13 protected files

### Acceptance Criteria And Evidence

- T2-AC1: Every delegation packet requires bounded objective, authority source, scope/non-goals, permissions, expected result, evidence, stop/escalation, invocation/integration purpose, route/gate binding through proven runtime inheritance or explicit listing, and an explicit default that nested delegation is prohibited. Evidence: field-to-requirement map and incomplete-packet negative fixture.
- T2-AC2: Triggered extensions cover current-state source/freshness, dependencies and cancellation, shared-state ownership, protected paths and dirty-worktree baseline, external systems, exact confirmations and recovery controls, semantic artifacts, assumptions and unresolved questions, risk-specific review, deadlines/time limits, stable write-boundary escalation, and the depth/count/budget/scope/authority/output/synthesis fields for explicitly authorized nested delegation. Evidence: triggered-field matrix.
- T2-AC3: Runtime inheritance is either verifiably cited or routes/gates are explicitly bound in the packet. Evidence: two valid fixture variants and one discoverability-only failure variant.
- T2-AC4: Every delegated write uses a stable producer-nonmodifiable boundary; frozen/versioned escalation triggers match the baseline. Evidence: LOW-risk packet example, HIGH-risk frozen example, and mutation stop case.
- T2-AC5: Context/handoff remains optional for simple work. When triggered, it records goal/non-goals, current topology and mandatory gates, sourced facts and freshness, key decisions/reasons, assignments/dependencies, accepted outputs/evidence, still-relevant rejected approaches, quality/operational retry and intervention history, blockers, pending decisions, and next action. It distinguishes `pending`, `active`, `blocked`, `exhausted`, `completed`, `superseded`, and `cancelled`, and updates after material evidence, topology, handoff, intervention, exhaustion, or resume events rather than every trivial command. Evidence: context-field/state-to-requirement map, no-context LOW case, and a recoverable multi-stage state-transition fixture.
- T2-AC6: Stage-local quality, retry-domain cumulative quality, and cause-specific artifact-free operational counters are represented separately and cannot reset cosmetically. Valid quality failure requires evidence-supported review; rejected unsupported findings change the review path without consuming producer quality count. Evidence: cross-stage, unsupported-review, and timeout state-transition fixtures.
- T2-AC7: Parallel tasks have owner, prerequisites, shared-state boundary, obsolete condition, and synthesis; nested delegation has executable budgets. Evidence: packet/context fixture.
- T2-AC8: Report and QA templates accept the applicable authoritative boundary rather than falsely requiring `ACCEPTED_CONTRACT.md`, while existing full-v2 reports remain valid. Evidence: compatibility comparison.
- T2-AC9: Plan review no longer fails solely because the complete v2 handoff is absent; it still fails missing triggered semantic or safety controls. Evidence: adaptive-plan PASS fixture and skipped-gate FAIL fixture.
- T2-AC10: Stop-state artifacts distinguish blocked/exhausted goal advancement from separately bounded, pre-authorized or precisely confirmed safety recovery and record qualifying-event evidence plus the single resumed cycle/attempt. Evidence: safety-recovery and controlled-resume fixtures.
- T2-AC11: The copyable orchestration prompt's return contract implements T1-AC7 proportionally and rejects fabricated role, validation, review, or external-action claims. Evidence: LOW direct-work and MEDIUM/HIGH delegated-run report fixtures plus a false-completion negative case.

### Validation

- Check template placeholders and required fields with targeted `rg` assertions.
- Exercise the templates manually against direct, focused-agent, parallel, implementation-review, full-v2, cross-stage failure, and operational-timeout cases.
- Check internal paths and identity references.
- Run `git diff --check` and protected-path verification.

### Stop Conditions

- Stop if a template becomes a mandatory workflow stage rather than an optional/triggered artifact.
- Stop if lightweight delegated writes can mutate their own authority or HIGH-risk writes can avoid frozen/versioned boundaries.
- Stop if retry state cannot distinguish unsupported evaluator findings from valid quality failures or operational failures.

## 9. Task 3 - Refactor The Six Codex Profiles Into Reusable Capabilities

### User/Architecture Result

The same six profiles can serve different projects and task shapes because they define durable role intelligence while the main-thread packet supplies the current work.

### Per-Role Optimization

| Role | Core intelligence and boundary to retain | Move out of static profile | Destination | Non-regression proof |
| --- | --- | --- | --- | --- |
| Planner | Understand user-valued outcome, separate risk, control scope, decompose delivery units, define verifiable outcomes; no implementation authority | Complete six-role order, current repo paths, fixed handoff, current task ACs, preferred output file | Task packet; optional plan template; adaptive and semantic protocols | Non-executing/no-write instruction remains; fixtures show small and complex plans differ without scope drift |
| Plan evaluator | Independent intent/risk/verifiability review, evidence skepticism, strict unambiguous verdict, Pass A/B when triggered | Fixed v2 handoff checklist, large mandatory output form, current plan paths and task facts | Task packet; plan-review template; semantic protocol; calibration | `sandbox_mode = "read-only"`; missing evidence or triggered gate still FAILs; free-form analysis still yields evidence and decision |
| Solution designer | Convert confirmed objective into minimal executable authority, expose ambiguity, prevent executor redesign; no execution authority | Assumption that every task comes from full v2, fixed `ACCEPTED_CONTRACT.md` lifecycle, task-specific routes/paths/steps | Task packet; task-contract template when frozen boundary triggers; run protocol | No-write boundary remains; contract fixtures preserve scope, allowed/protected paths, semantic decisions, and stops |
| Solution evaluator | Independently detect ambiguity, overreach, unsafe authority, missing evidence, and executor-owned semantic decisions | Full contract lifecycle narration, long generic checklist, current files/routes/ACs | Task packet; optional solution-review template; calibration | `sandbox_mode = "read-only"`; no repair authority; strict evidence and no `PASS with caveats` remain |
| Executor | Execute only stable cited authority, preserve user work, stop on ambiguity, validate honestly, never reinterpret intent or expand scope | Mandatory `ACCEPTED_CONTRACT.md` filename for every task, fixed seven-step lifecycle, fixed report template and task paths | Task packet or frozen contract; run protocol; optional executor-report template | Boundary mutation and out-of-scope fixtures STOP; permissions do not expand; no self-approval or fabricated evidence |
| Result evaluator | Producer-independent inspection of actual result, regressions, user outcome, scope, and evidence; strict clear decision with evidence-supported failure origin/classification; no repair authority | Mandatory executor/report/contract sequence, four-layer fixed layout when not needed, current task checklist | Task packet; result-QA template when selected; calibration | `sandbox_mode = "read-only"`; self-proof and missing evidence fail; reviewer type matches assigned correctness question; failures identify the likely producer, prompt, boundary, review, intent, or environment origin |

### Shared Profile Rules To Retain

- actual read-only sandbox on evaluator profiles;
- explicit write/no-write and decision authority;
- independence from producer claims;
- facts versus assumptions and evidence awareness;
- no fabricated completion, validation, review, or external action;
- no silent expansion of assigned scope, write authority, decision authority, or task topology;
- stop/escalation for missing authority, evidence, safety confirmation, or material ambiguity;
- no subagent fan-out unless the task packet explicitly authorizes bounded nesting;
- application of inherited repo rules or explicitly bound routes/gates;
- role-specific mission and judgment quality;
- a minimum handoff containing the bounded result or finding, supporting evidence, material uncertainty, blockers, and stop/escalation state.

### In Scope

- Rewrite the six TOML descriptions/instructions to the boundaries above.
- Update Codex adapter documentation for task packets, route inheritance, role selection, no-fan-out default, bounded nesting, and full-v2 compatibility.
- Change config-example comments only if needed for accurate runtime-enforcement guidance.

### Out Of Scope

- Adding, deleting, or renaming the six roles; adding a seventh role; changing unrelated Codex settings; implementing a runtime scheduler.
- Moving mandatory safety entirely into ephemeral prompts.

### Allowed Write Areas

- `.codex/agents/harness-planner.toml`
- `.codex/agents/harness-plan-evaluator.toml`
- `.codex/agents/harness-solution-designer.toml`
- `.codex/agents/harness-solution-evaluator.toml`
- `.codex/agents/harness-executor.toml`
- `.codex/agents/harness-result-evaluator.toml`
- `docs/adapters/codex-subagents.md`
- `.codex/config.example.toml` only under the condition above

### Protected Paths

- Task 1 accepted authority files; Task 2 files remain disjoint concurrent work and must not be read as accepted dependencies until Task 4 integration
- role names and evaluator `sandbox_mode = "read-only"` values
- frozen requirements, this plan, and Section 13 protected files

### Acceptance Criteria And Evidence

- T3-AC1: Six names and six responsibilities remain; no seventh profile appears. Evidence: TOML inventory.
- T3-AC2: Each profile contains the shared boundaries, minimum handoff, no-silent-scope/authority-expansion rule, and its role-specific intelligence without embedding the complete lifecycle. Evidence: per-profile preservation ledger using the table above.
- T3-AC3: Task-specific files, routes, ACs, dependencies, artifact selection, and output depth come from the task packet. Evidence: two domain/complexity packets per selected role using the same profile.
- T3-AC4: Evaluators remain read-only, independent, evidence-based, strict, and unable to repair their review targets. Evidence: TOML parse, sandbox assertion, and negative fixtures.
- T3-AC5: Executor cannot reinterpret the objective, change its boundary, expand writes, or self-certify independent verification. Evidence: stop fixtures.
- T3-AC6: Profiles do not mechanically restate the six-role flow or require irrelevant checklist output. Evidence: targeted negative search plus qualitative review.
- T3-AC7: Default fan-out is prohibited and explicit nested delegation remains bounded by packet and runtime capability. Evidence: adapter/profile/config comparison.
- T3-AC8: The six profiles retain the capabilities and compatible input/output boundaries needed for later full-v2 composition without depending on Task 2's template text. Evidence: per-profile interface inventory; the combined walkthrough is a Task 4 acceptance check.

### Validation

- Parse all TOML with Python `tomllib`.
- Assert exactly three evaluator profiles retain `sandbox_mode = "read-only"` and executor does not gain evaluator/final-acceptance authority.
- Run targeted searches for embedded lifecycle sequence, mandatory repo-specific artifact paths, and fixed task content; manually judge legitimate compatibility references.
- Execute prompt-only fixture reviews for cross-project reuse, flexible output, strict FAIL, boundary stop, and no-fan-out.
- Run `git diff --check` and protected-path verification.

### Stop Conditions

- Stop if simplification removes an actual permission, independence, evidence, or stop boundary.
- Stop if a profile can function only because the main thread is expected to remember an undocumented mandatory rule.
- Stop if adaptive role selection makes the explicit full-v2 composition impossible.

## 10. Task 4 - Close Acceptance, Calibration, Documentation, And Adoption

### User/Architecture Result

The repository explains and demonstrates the adaptive architecture consistently, and all 31 frozen scenarios have concrete evidence that can distinguish real adaptive behavior from renamed procedural compliance.

### In Scope

- Add an adaptive orchestration acceptance matrix with one row per AS scenario.
- Update the reusable routing scenario template so its `task-docs/` scenario selects adaptive governance and applicable routes instead of unconditionally requiring the full v2 sequence.
- Add calibration cases for the recurring failure classes exposed by the baseline.
- Align README, architecture, adoption runbook/checklist when applicable, and minimal-router example with accepted behavior.
- Verify protocol, template, adapter, calibration, and adoption terminology and ownership.

### Out Of Scope

- LICENSE, publication, CI, release policy, new agent roles, product-specific examples, or unrelated router migration changes.
- Treating a structural scenario-ID check as semantic proof.

### Allowed Write Areas

- `task-docs/_harness/evaluator-calibration.md`
- `task-docs/_harness/adaptive-orchestration-acceptance-matrix.md`
- `task-docs/_harness/templates/routing-scenario-matrix-template.md`
- `README.md`
- `docs/architecture.md`
- `docs/adoption/router-refactor-runbook.md`
- `docs/adoption/open-source-release-checklist.md` only if a concrete new check is added
- `examples/minimal-router/AGENTS.md`
- `examples/minimal-router/README.md` only if needed
- a new stdlib-only validation script only after the exception test in Section 5 is met and the task boundary is revised explicitly

### Protected Paths

- all accepted Task 1-3 behavior files except read-only consistency checks
- existing traceability scripts and templates outside the allowed list
- frozen requirements, this plan, and Section 13 protected files

### Acceptance Criteria And Evidence

- T4-AC1: Matrix contains AS-01 through AS-31 exactly once with setup, expected behavior, failure signal, authority, implementation task, evidence type, and result field. Evidence: structural ID check plus semantic review.
- T4-AC1A: Reusable router fixture no longer treats `task-docs/` work as an unconditional full-v2 trigger and includes the adaptive protocol route when the final router requires it. Evidence: updated `RSM-005`, trigger-to-scenario map, and router fixture validator output scoped to trigger/path coverage.
- T4-AC2: Calibration covers at least mechanical full-loop selection, skipped triggered gate, incomplete packet/route binding, unmanaged parallel/conflict arbitration, profile simplification regression, cross-stage retry reset, unsupported evaluator FAIL, and artifact-free operational retry. Evidence: calibration inventory and target mapping.
- T4-AC3: README describes adaptive governance as the primary capability and full v2 as compatible/explicit, without marketing a new fixed taxonomy. Evidence: README/protocol comparison.
- T4-AC4: Architecture identifies authority ownership and adapter boundaries; adapter details remain in adapter docs. Evidence: cross-document terminology table.
- T4-AC5: Router-refactor adoption guidance preserves adaptive entry point and existing traceability semantics; release checklist changes only for a real validation command. Evidence: adoption diff review.
- T4-AC6: Minimal example demonstrates adaptive default without implying every downstream repo must copy the full stack. Evidence: example walkthrough.
- T4-AC7: AC-pass-but-user-fail counterexample is explicitly tested through a scenario where files parse and IDs exist but topology or independent gate behavior is wrong. Evidence: negative fixture result.
- T4-AC8: No unrelated release/license scope or seventh agent is introduced. Evidence: changed-path and inventory checks.
- T4-AC9: Accepted Task 2 templates can compose the accepted Task 3 profiles into the explicit full-v2 flow, while adaptive fixtures can omit roles without losing triggered controls. Evidence: combined compatibility walkthrough and recorded result.
- T4-AC10: Any integration or calibration finding against accepted Task 1, 2, or 3 output is routed back to the owning delivery unit under a new versioned stable boundary; Task 4 does not patch protected upstream files. Every upstream revision triggers transitive dependency impact analysis. Affected downstream accepted results are marked `superseded`, reissued under new versioned boundaries, and rerun through affected ACs and independent acceptance; unaffected results require recorded no-impact evidence. Task 4 resumes only under a new versioned boundary after all upstream identities stabilize. Evidence: finding-to-owner record, dependency impact map, superseded/no-impact decisions, revised identities, rerun evidence, and resumed Task 4 boundary.

### Validation

- Verify AS IDs are complete, ordered, and unique with `rg`, `sort`, and `uniq`.
- Parse all TOML and compile any changed/new Python scripts.
- Check Markdown links and referenced paths with targeted path existence checks.
- Run existing router and rule-preservation validators only for claims within their documented scope.
- Execute and record PASS/FAIL plus evidence for every AS-01 through AS-31 row; representative fixtures may share setup, but no scenario may be accepted solely from ID presence.
- Perform a manual semantic comparison across router, protocols, templates, profiles, calibration, README, architecture, adapter, adoption docs, and example.
- Run `git diff --check`, dirty-worktree changed-path verification, and protected-file hash checks.

### Stop Conditions

- Stop if scenario coverage is only textual mention without an executable/tabletop decision and evidence expectation.
- Stop if docs describe a different authority model from the accepted protocols/profiles.
- Stop if validation wording overclaims structural checks as semantic proof.
- Stop if integration or calibration exposes an upstream defect. Record the finding and owning task, do not modify the protected upstream path from Task 4, and reopen Task 1, 2, or 3 with a new versioned accepted boundary. Before resuming, perform transitive dependency impact analysis; mark affected downstream results and evidence `superseded`, revalidate them under new versioned boundaries, or record specific no-impact evidence. Resume Task 4 only after every affected dependency is independently accepted and Task 4 receives a new versioned boundary citing the stabilized upstream identities.

## 11. Acceptance Scenario Coverage Map

The acceptance matrix delivered by Task 4 must preserve this minimum mapping. “Fixture” means a tabletop/prompt fixture unless a deterministic runtime test is available.

| Scenario | Primary task(s) | Required implementation evidence |
| --- | --- | --- |
| AS-01 | T1, T4 | LOW-risk direct-work fixture omits all six roles and records proportional validation. |
| AS-02 | T1, T2, T4 | Research fixture uses source verification without executor/contract/result-QA artifacts, then records main-thread synthesis with citations. |
| AS-03 | T1, T2, T3, T4 | MEDIUM code fixture uses stable packet boundary and targeted reviewer. |
| AS-04 | T1, T2, T3, T4 | HIGH semantic fixture preserves anchor, Pass A, Outcome Contract, frozen boundary, and independent semantic evidence. |
| AS-05 | T1, T2, T4 | Destructive-write fixture requires frozen/versioned execution boundary, exact target, preview, confirmation, recovery, and independent readback. |
| AS-06 | T1, T2, T3, T4 | Explicit full-v2 fixture composes all six roles while retaining intervention control. |
| AS-07 | T1, T4 | Delegation-value fixture records why bounded direct inspection is cheaper and equally reliable, then declines an unnecessary subagent. |
| AS-08 | T1, T2, T4 | Parallel fixture proves disjoint ownership, dependencies, obsolete conditions, and synthesis. |
| AS-09 | T1, T2, T4 | Competitive proposals use equal inputs and evidence-based arbitration rather than voting. |
| AS-10 | T1, T2, T4 | New-evidence fixture cancels or replans invalid downstream work. |
| AS-11 | T1, T2, T4 | Two stage-local valid failures force main-thread artifact/evidence inspection, failure classification, and changed strategy before a third local attempt. |
| AS-12 | T1, T2, T4 | Cross-stage failures retain one retry-domain cumulative count and exhaust on the valid post-intervention third failure; an unrelated branch continues only with recorded dependency and shared-risk independence rationale. |
| AS-13 | T1, T3, T4 | Conflicting evaluator fixture resolves by authority, assumptions, freshness, and evidence. |
| AS-14 | T2, T4 | Multi-agent context resumes from concise durable state; LOW task proves no context artifact is required. |
| AS-15 | T3, T4 | Same profile operates in two project domains without embedded repo-specific paths. |
| AS-16 | T2, T3, T4 | Same role receives LOW and HIGH complexity packets and adjusts depth. |
| AS-17 | T3, T4 | Profile output focuses on assigned reasoning rather than lifecycle narration. |
| AS-18 | T3, T4 | Evaluator uses flexible analysis but returns evidence, unchecked areas, failure origin/classification, and strict verdict. |
| AS-19 | T3, T4 | Before/after role ledger proves permissions, independence, evidence, and stops did not regress. |
| AS-20 | T1, T2, T4 | Main thread integrates and directly validates a small safe remainder without restarting a full loop. |
| AS-21 | T1, T3, T4 | Reviewer-selection fixtures distinguish code, factual, UX, security, semantic, and external-state checks. |
| AS-22 | T2, T4 | Missing any mandatory packet field fails; triggered fields appear only when applicable. |
| AS-23 | T1, T2, T3, T4 | Stable boundary mutation stops the attempt and creates a new boundary identity; risk trigger upgrades to frozen/versioned identity. |
| AS-24 | T1, T3, T4 | Main-thread-produced HIGH-risk result uses a separate producer-independent verifier before acceptance. |
| AS-25 | T1, T2, T3, T4 | Default no-fan-out and authorized-nesting fixtures prove maximum depth, agent count, executable budget, nested scope, authority, expected outputs, stop conditions, and parent synthesis owner. |
| AS-26 | T1, T2, T3, T4 | Invocation proves runtime inheritance or explicitly lists routes/gates; discoverability-only case fails. |
| AS-27 | T1, T2, T3, T4 | Unsupported evaluator finding is rejected with decisive evidence, does not consume producer quality count, and causes the invalid review path to be changed. |
| AS-28 | T1, T2, T4 | Exhausted external-state fixture blocks goal advancement and permits only pre-authorized or precisely confirmed recovery with its own boundary, evidence, and applicable confirmations. |
| AS-29 | T1, T2, T4 | Qualifying event grants exactly one applicable resumed cycle/attempt and then restores stop state on failure. |
| AS-30 | T1, T2, T4 | Timeout before artifact consumes operational budget without fabricated producer/reviewer output; one bounded same-cause retry fails and forces intervention before a third attempt. |
| AS-31 | T1, T2, T4 | A post-intervention third same-cause operational failure blocks/exhausts across renamed agents, tools, and stages. |

## 12. Cross-Task Validation And Final Acceptance

Final implementation acceptance is a gate, not a delivery task. It occurs only after Tasks 1-4 produce their constructive artifacts.

The main thread must independently inspect:

- frozen baseline identity/hash and a requirement-to-evidence map;
- changed paths against each accepted task boundary;
- route/path validity and modal-force preservation;
- all TOML parse results and evaluator sandbox invariants;
- a recorded result and discriminating positive/negative evidence for every one of the 31 scenario rows;
- calibration coverage and strict verdict behavior;
- README/architecture/adapter/protocol/template/adoption consistency;
- protected paths and dirty-worktree evidence;
- the AC-pass-but-user-fail counterexample, including actual topology and independent-gate behavior.

Because this architecture change is HIGH Semantic Risk and changes future agent behavior, final results require producer-independent semantic review. Main-thread final acceptance remains separate from that reviewer evidence.

## 13. Dirty Worktree And Protected-Path Plan

The implementation worktree must preserve all pre-existing user work and branch history. At planning time these untracked files exist:

| Protected path | Planning-time SHA-256 | Rule |
| --- | --- | --- |
| `task-docs/harness-finding-fix-hardening-task-plan-20260625.md` | `6c6fb5845914055e276f3bd4b83f18cee494b2c54b185b4d4c83acbaea2a61df` | Read-only; unrelated plan. |
| `task-docs/main-thread-control-enhancement-requirements-20260710.md` | `1cf8e5929b3c5d8329d9fff72e141e472f4dcd0619ed72db19f44f097eeb6575` | Read-only side-conversation draft; not authority. |
| `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` | Frozen requirements authority; any hash change stops implementation. |

The current committed branch baseline is also protected:

| Item | Planning-time identity | Rule |
| --- | --- | --- |
| Current branch | `codex/release-checklist-fixture-path` | Must not be used for implementation without explicit user exception. |
| Current HEAD | `094729d20f5bccbe87446e4f69edf46c972ee22e` | Existing PR work; do not rewrite or silently absorb it. |
| Current `origin/main` | `40dd3187d9cbb1654aa596b419660c9dce9e96bb` | Planning-time base only; refresh/verify before creating the implementation branch. |
| Committed delta | `M docs/adoption/open-source-release-checklist.md` | Overlaps Task 4; exclude it by default through the independent branch strategy. |

The accepted requirements, implementation plan, Pass A baseline, Pass B review artifact, and accepted-planning-input manifest become protected implementation inputs. The manifest must record the identity, path, and final SHA-256 of the first four artifacts after plan review closes. The manifest and every recorded artifact hash must be verified before branch preparation and every task contract.

Before each delivery task, capture:

- `git status --short` and the task's exact allowed write paths;
- branch `HEAD`, merge base, and `git diff --name-status origin/main...HEAD` committed baseline;
- SHA-256 for protected files that overlap the task's directory;
- a changed-path baseline for protected directories where file hashes alone are insufficient;
- hashes/identities of accepted upstream task artifacts consumed by the task.
- accepted-planning-input manifest identity/path and verification result.

After each task, recompute hashes and compare changed paths. A plain final `git diff` is insufficient because untracked user files and prior task changes coexist. This newly created plan is also read-only during implementation unless the user explicitly requests a revised versioned plan.

## 14. Decisions Left To Single-Task Contracts Or Implementation

The architecture and task boundaries above are fixed. These lower-level decisions remain for the relevant task contract:

- exact heading order and prose inside the adaptive protocol and templates;
- whether a simple task packet is an inline prompt or persisted artifact, provided mandatory fields and stable-boundary rules hold;
- the per-run filename/location for context state when a durable handoff is triggered;
- the runtime-specific evidence used to prove inherited router/routed-doc application;
- the exact normalized operational-cause identifier and evidence record, without allowing cosmetic split/merge;
- which existing evaluator profile is selected for a specialist review when the runtime exposes only the six names;
- which representative fixtures are prompt/tabletop versus runnable checks;
- whether `.codex/config.example.toml`, release checklist, example README, or `solution-review-template.md` need a narrowly justified edit after contradiction review;
- whether a small structural validator is justified under Task 4's exception, and its exact CLI if so;
- exact migration wording and downstream opt-in examples that preserve local stricter policies.

These decisions may choose form, not weaken the required behavior. Any need to change the frozen requirements, add a seventh role, broaden release scope, or alter unrelated user files is a stop condition requiring a new user decision and a versioned requirements/plan update.

## 15. Plan Completion Criteria

This implementation plan is ready for downstream contracting only when:

- the frozen requirements identity and SHA match;
- Pass A and Pass B review artifacts have stable identities, paths, hashes, isolation evidence, final decision, and main-thread finding dispositions;
- one accepted-planning-input manifest persists the final identity, path, and SHA-256 for requirements, plan, Pass A, and Pass B, and is itself included in branch transfer and Task 1 protected inputs;
- the implementation branch precondition excludes the current committed release-checklist delta unless the user records an explicit exception;
- current gaps and conflicting authorities are evidenced;
- the four delivery units have disjoint write ownership, dependency order, ACs, evidence, validation, and stop conditions;
- all six role profiles have explicit keep/move/destination/non-regression requirements;
- all 31 acceptance scenarios map to implementation tasks and evidence;
- dirty-worktree protections and protected hashes are recorded;
- an independent focused reviewer finds no blocking coverage, dependency, or verifiability gap;
- structural checks and `git diff --check` pass;
- no implementation file has been changed as part of planning.
