# Orchestration Prompt Template

Use the generic `oh-my-harness` v2 six-role workflow for this request:

<USER_REQUEST>

This is a main-thread workflow prompt. It coordinates the existing harness responsibilities; it is not a seventh agent, not a new fixed role, and not a delivery task by itself.

## Preflight

- Read `AGENTS.md` as the always-on hard gate/router.
- Read routed docs only when the `AGENTS.md` trigger applies.
- Preserve LOW semantic risk lightweight handling.
- Do not perform external writes, high-impact actions, destructive actions, permission/billing/payment/key actions, or secret handling unless the user explicitly scoped and confirmed the exact action.
- Do not add dependencies, new fixed roles, or out-of-scope files unless the user explicitly approves.

## Process

1. Run `planner` to create a task-docs plan. Do not implement anything.
2. Run `plan evaluator` to review the plan.
3. If plan review fails, send the findings back to a new `planner` run. Repeat until strict PASS.
4. For each approved task, in dependency order:
   - Run `solution designer` for that single task. It must produce one execution contract and must not implement.
   - Run `solution evaluator` to review the contract.
   - If solution review fails, send findings back to a new `solution designer` run for the same task. Repeat negotiation until strict PASS.
   - Freeze the accepted contract text as that task run's `ACCEPTED_CONTRACT.md`.
   - Run `executor` in a fresh context. It may implement only the frozen `ACCEPTED_CONTRACT.md` and must not edit the accepted contract.
   - Run `result evaluator` to independently verify the implementation report, diff, evidence, and every AC.
   - If result QA finds implementation failure, send findings back to a new `executor` run with the same frozen `ACCEPTED_CONTRACT.md`.
   - If result QA finds contract insufficiency, stop execution and return to `solution designer` for a revised contract before any further execution.
   - If result QA finds semantic plan/contract failure, route back to planning or solution design as appropriate. The result evaluator must not repair or redesign.
   - Main thread must independently review before moving to the next task.
5. Do not skip task dependencies.
6. Do not merge later task writes into the current task.
7. Stop before any publish, deploy, delete, migration, restore, bulk write, irreversible action, permission change, billing/payment action, key/secret action, or other high-impact action unless the user explicitly confirms the exact action.

## Return

- Final plan path.
- Per-task `ACCEPTED_CONTRACT.md` path and solution review decision.
- Per-task executor report path and result QA decision.
- Final evidence summary.
- What was not validated.
- Remaining risks or unresolved blockers.
