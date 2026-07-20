# Codex Capability Adapter

The TOML files in .codex/agents adapt the unified Harness capability registry to Codex. They are not a scheduler or workflow definition. Main chooses and launches every invocation from task facts.

## Exact Source Profiles

| Source profile | Capability name | Stable output |
| --- | --- | --- |
| harness-requirements-author.toml | oh_my_harness_requirements_author | one Requirements candidate |
| harness-requirements-evaluator.toml | oh_my_harness_requirements_evaluator | one strict Requirements report |
| harness-planner.toml | oh_my_harness_planner | one acceptance-closed Task Plan candidate |
| harness-plan-evaluator.toml | oh_my_harness_plan_evaluator | one strict Plan report |
| harness-solution-designer.toml | oh_my_harness_solution_designer | one concrete Technical Solution Design candidate |
| harness-solution-evaluator.toml | oh_my_harness_solution_evaluator | one strict Technical Solution Design report |
| harness-executor.toml | oh_my_harness_executor | one bounded Task result/producer evidence |
| harness-result-evaluator.toml | oh_my_harness_result_evaluator | one strict actual-result QA report |
| harness-orchestration-reviewer.toml | oh_my_harness_orchestration_reviewer | one strict advisory governance report |

Profiles store only stable mission, non-transferable authority, read/write boundary, evidence discipline, stops, no-fabrication, hard no-fan-out, and minimal handoff. Packets own current objective, sources, paths, commands, ACs, risk/routes, dependencies, schemas, budgets, identity, and output depth.

## Runtime Write Modes

Producer profiles use workspace-write only for their packet/Boundary-authorized candidate, product, or producer-report paths.

The five evaluator/reviewer profiles also use workspace-write because the evaluator must independently create one invocation-specific report. This is the narrowest usable current mode, but its governance name is logical report-only write boundary plus post-execution verification. It is not native path ACL, runtime identity attestation, target/source authority, or permission to repair.

Every evaluator packet supplies exact target/upstream hashes, one absent unique report path, prohibited surfaces, canonical evaluator calibration identity/path, strict verdict/completion schema, and error rules. Main baselines and verifies target/upstream/protected hashes and actual changed paths after terminal before consuming verdict.

## Hard No-Fan-Out

Every profile unconditionally prohibits creating, invoking, launching, delegating to, or reconfiguring another agent. A packet cannot override this. The capability returns a question, clarification, escalation, artifact-ready notice, or evidence/finding reference to main; main issues and launches any later invocation.

.codex/config.example.toml sets multi_agent.max_depth = 1 only as corroborating configuration. It neither grants fan-out nor proves path isolation or lifecycle authority.

## Main-Controlled Invocation

For every profile main:

1. records why the capability adds value;
2. issues a stable packet with exact routes/gates and one write boundary;
3. serializes unisolated writers and launches the invocation;
4. verifies identity, hashes, completion, protected state, and actual changed scope;
5. alone decides any evaluator launch, finding disposition, retry/intervention, transition, or acceptance.

Solution profiles are Technical Solution Design-only. Main always owns attempt Boundary/permission. Peer messages are non-authoritative.

## Source/Installed Currentness

These nine source profiles are the T-01 source behavior plane. The existing bundle mapping and installer-generated profile set remain downstream migration inputs until release integration updates mapping, rewrites, inventory, package assertions, and prior-state ownership. Do not call the intermediate package a unified release.

## Maintenance

- Keep capability names and missions distinct.
- Keep dynamic task facts out of profiles.
- Keep five evaluator/reviewer calibration and logical report-only bindings equivalent.
- Preserve hard no-fan-out and main-only lifecycle in profiles, config example, packet template, protocols, tests, and public docs.
- Treat parsing/counts as structure only; validate behavior and negative probes.
