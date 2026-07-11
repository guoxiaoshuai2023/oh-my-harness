# Codex Subagent Adapter

This repository exposes six reusable harness capabilities under `.codex/agents/`. The profiles define durable role behavior; they are not a scheduler and do not make every role a mandatory stage.

The main thread owns topology selection and revision, task packets, dependencies, synthesis, evidence arbitration, intervention, and final acceptance. It selects only capabilities that add material value while preserving every triggered gate. The harness architecture remains the router, protocols, templates, stable boundaries, evidence rules, and six logical responsibilities; the Codex profiles are one runtime adapter for those responsibilities, not a fixed seventh orchestrator.

## Profile And Packet Ownership

A profile owns its role mission, actual write or read-only authority, independence, evidence discipline, scope and stop behavior, default no-fan-out rule, and minimum handoff. Those controls remain active across projects and complexity levels.

The main-thread packet owns the current objective and source, scope and non-goals, files and external systems, allowed reads and writes, risks, routes and gates, dependencies, expected result, evidence and validation depth, stop and return conditions, artifact choice, and requested output depth. Conditional facts such as current-state evidence, semantic boundaries, protected paths, confirmations, and nesting budgets also belong in the packet when triggered. A missing material field is a reason to stop, not permission for a profile to reconstruct the task from generic workflow assumptions.

Each invocation must apply repository rules through either verifiable runtime inheritance of `AGENTS.md` and the triggered routed documents, or an explicit packet list of those routes and gates. Rule discoverability by itself is not evidence of application.

## Capability Interfaces

| File / capability | Packet inputs | Handoff | Non-transferable authority |
| --- | --- | --- | --- |
| `harness-planner.toml` / `oh_my_harness_planner` | Controlling request or anchor, scope/non-goals, risk/routes, evidence needs, packet limits | Bounded plan, outcome/evidence mapping, assumptions, uncertainty, blockers | No implementation or final acceptance |
| `harness-plan-evaluator.toml` / `oh_my_harness_plan_evaluator` | Controlling source, plan, applicable semantic boundary, evidence | Strict decision, findings/evidence, unchecked areas, likely failure origin | Read-only; no plan repair |
| `harness-solution-designer.toml` / `oh_my_harness_solution_designer` | Confirmed objective, authority, allowed/protected state, routes/gates, acceptance evidence | Stable executable boundary with actions, checks, and stops | No execution or goal reinterpretation |
| `harness-solution-evaluator.toml` / `oh_my_harness_solution_evaluator` | Proposed boundary plus controlling task, semantic, safety, and evidence context | Strict decision and ambiguity, overreach, safety, and evidence findings | Read-only; no boundary repair |
| `harness-executor.toml` / `oh_my_harness_executor` | One stable cited boundary plus launch/current-state baseline | Bounded result, exact changed scope, validation evidence, uncertainty, blockers | No boundary mutation, scope growth, independent-verification claim, or final acceptance |
| `harness-result-evaluator.toml` / `oh_my_harness_result_evaluator` | Boundary, producer report, actual state/diff, acceptance and outcome evidence | Strict decision, independently inspected evidence, unchecked areas, failure classification | Read-only; no repair or final main-thread acceptance |

The planner and solution designer may write only the planning or boundary artifact explicitly authorized by their packets. The three evaluator profiles retain `sandbox_mode = "read-only"`. Executor writes remain limited by the cited stable authority. Profile selection never transfers main-thread topology or acceptance ownership.

## Fan-Out And Runtime Limits

Subagents do not create other agents by default. A packet may authorize nesting only when it fixes maximum depth and agent count, nested calls or another executable time/iteration budget, objective and scope, read/write authority, shared-state restrictions, expected output, stop conditions, and parent synthesis ownership. Nested work inherits the parent boundary and cannot widen it. If the runtime cannot enforce or the invocation cannot prove all required bounds, the parent must not delegate.

`.codex/config.example.toml` is an optional copyable example for runtimes that support its keys. Its `multi_agent.max_depth = 1` value must not be treated as enforcement of agent count, calls, time or cost, scope, write authority, output size, or synthesis ownership. Those policy limits come from the packet, profiles, and accepted Task 1 authority and require runtime capability evidence where enforcement matters.

## Explicit Full-v2 Compatibility

The complete v2 composition remains supported when explicitly requested or required by stricter downstream policy. In that compatibility mode the ordered responsibilities are planner, plan evaluator, solution designer, solution evaluator, executor, result evaluator, followed by separate main-thread final review. The accepted boundary may use `ACCEPTED_CONTRACT.md` as the frozen strong form. Each handoff must satisfy the next capability interface, evaluator decisions remain strict, and route, retry, intervention, evidence, and producer-independence gates remain active.

That compatibility mode does not redefine the adaptive default. Outside an explicit full-v2 selection, the main thread may omit roles whose controls are otherwise satisfied, but it may not omit a triggered gate.

## Porting Notes

- Keep role names or rename them consistently for the downstream repository; do not merge responsibilities or add a fixed orchestrator profile.
- Keep evaluator sandboxes read-only and keep producer-independent review separate from producer claims.
- Bind local routes and gates in every invocation through proven inheritance or the packet.
- Put project paths, acceptance criteria, commands, domain checklists, and desired response depth in packets, not copied static profiles.
- Treat templates as optional artifact shapes selected by the packet, not mandatory stages.
- Describe runtime enforcement only to the extent supported by authoritative runtime evidence.
