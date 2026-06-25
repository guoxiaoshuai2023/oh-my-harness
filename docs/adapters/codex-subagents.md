# Codex Subagent Adapter

This repo includes a runnable Codex-style subagent adapter under `.codex/agents/`.

The adapter is not the harness architecture itself. The architecture is the six logical responsibilities, router docs, protocols, templates, contracts, and evidence rules. The `.codex/agents/*.toml` files are one concrete way to expose those responsibilities in Codex.

Orchestration remains a main-thread workflow responsibility. It coordinates the six logical responsibilities and does not add a fixed seventh role.

## Optional Fan-Out Guard

`.codex/config.example.toml` is a copyable example for downstream repos that want a repo-local Codex config. If your Codex version supports those keys, copy it to `.codex/config.toml` to keep subagent fan-out at one level with `multi_agent.max_depth = 1`.

The example is optional because the six-role harness is the architecture; Codex config support and exact key availability are runtime details.

## Active Agents

| File | Agent name | Role |
| --- | --- | --- |
| `.codex/agents/harness-planner.toml` | `oh_my_harness_planner` | Produces task-docs plans only. |
| `.codex/agents/harness-plan-evaluator.toml` | `oh_my_harness_plan_evaluator` | Read-only strict plan review. |
| `.codex/agents/harness-solution-designer.toml` | `oh_my_harness_solution_designer` | Produces one task Execution Contract only. |
| `.codex/agents/harness-solution-evaluator.toml` | `oh_my_harness_solution_evaluator` | Read-only strict contract review. |
| `.codex/agents/harness-executor.toml` | `oh_my_harness_executor` | Executes exactly one frozen `ACCEPTED_CONTRACT.md`. |
| `.codex/agents/harness-result-evaluator.toml` | `oh_my_harness_result_evaluator` | Read-only independent result QA. |

## Why There Are No Legacy Shims By Default

The source architecture that inspired this repo had compatibility stop-shims for older two-role flows. This open-source template does not include those shims in `.codex/agents/` by default because they are migration aids, not active harness roles.

If a downstream project already has legacy agent names, create read-only STOP shims locally that point callers to:

- contract design -> `oh_my_harness_solution_designer`
- implementation -> `oh_my_harness_executor`
- contract review -> `oh_my_harness_solution_evaluator`
- result QA -> `oh_my_harness_result_evaluator`

Do not make legacy shims authoritative. Do not add a fixed seventh role.

## Porting Notes

- Rename `oh_my_harness_*` names if the downstream repo needs project-specific naming.
- Keep evaluator agents read-only.
- Keep executor bounded to one frozen `ACCEPTED_CONTRACT.md`.
- Keep route selection out of executor judgment; the accepted contract should list triggered route docs.
- Replace generic external-system language with project-specific commands only in downstream repos.
