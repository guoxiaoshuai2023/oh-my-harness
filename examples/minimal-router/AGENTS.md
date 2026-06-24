# Example Repo Router

## Always-On Hard Gates

- Keep changes scoped to the user request.
- Do not read or expose secrets.
- Do not perform destructive or external writes without exact scope and explicit confirmation.
- Validate proportional to risk.

## Routing Table

| Trigger | Route |
| --- | --- |
| External systems, secrets, or credentials | `docs/agent-routing/external-systems-and-secrets.md` |
| Current state or user-visible behavior matters | `docs/agent-routing/current-state-evidence.md` |
| High-impact action such as publish, deploy, delete, migration, restore, bulk write, billing, payment, permission, key, or secret action | `docs/agent-routing/high-risk-actions.md` |
| Planning scale or gate-vs-task boundary | `docs/agent-routing/task-planning-scale.md` |
| Implementation boundary, dependencies, or no-unrelated-refactor rule | `docs/agent-routing/implementation-boundary.md` |
| Validation or reporting | `docs/agent-routing/validation-and-reporting.md` |
| MEDIUM/HIGH semantic risk or v2 harness flow | `task-docs/_harness/semantic-fidelity-protocol.md` |

## V2 Harness

Use planner -> plan evaluator -> solution designer -> solution evaluator -> freeze `ACCEPTED_CONTRACT.md` -> executor -> result evaluator -> main-thread review for complex `task-docs/` work.
