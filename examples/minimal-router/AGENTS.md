# Example Repo Router

## Always-On Hard Gates

- Keep changes scoped to the user request.
- Do not read or expose secrets.
- Do not perform destructive or external writes without exact scope and explicit confirmation.
- Validate proportional to risk.

## Routing Table

| Trigger | Route |
| --- | --- |
| Using the harness, selecting or revising topology, delegation, stable write authority, retry, synthesis, or producer-independent verification | `task-docs/_harness/adaptive-orchestration-protocol.md` |
| External systems, secrets, or credentials | `docs/agent-routing/external-systems-and-secrets.md` |
| Current state or user-visible behavior matters | `docs/agent-routing/current-state-evidence.md` |
| High-impact action such as publish, deploy, delete, migration, restore, bulk write, billing, payment, permission, key, or secret action | `docs/agent-routing/high-risk-actions.md` |
| Planning scale or gate-vs-task boundary | `docs/agent-routing/task-planning-scale.md` |
| Implementation boundary, dependencies, or no-unrelated-refactor rule | `docs/agent-routing/implementation-boundary.md` |
| Validation or reporting | `docs/agent-routing/validation-and-reporting.md` |
| MEDIUM/HIGH semantic risk or v2 harness flow | `task-docs/_harness/semantic-fidelity-protocol.md` |

## Adaptive Harness

Using the harness means adaptive main-thread governance by default. The main thread MUST select the smallest sufficient direct/delegated/review composition; roles and stages may be omitted, but every fact-triggered gate must retain an owner, evidence, and decision. Give every delegation a complete packet and stable producer-nonmodifiable authority. Nested delegation is prohibited by default, and synthesis, topology revision, intervention, finite retry, evidence arbitration, and final acceptance remain active main-thread controls.

When the user explicitly requests the complete v2 loop or stricter local policy requires it, the main thread MUST use planner -> plan evaluator -> solution designer -> solution evaluator -> freeze `ACCEPTED_CONTRACT.md` -> executor -> result evaluator -> separate main-thread review. Without either trigger, it MAY deliberately select that sequence only with a task-specific record of concrete facts, a smaller viable topology and its specific gap, non-duplicative value for all six interfaces, gate owners/evidence/dependencies/handoffs/decisions, positive cost/context value, and confirmation that active main-thread controls remain. HIGH risk, the harness name, role availability, or process inertia never selects full v2 by itself; never treat a role PASS as final acceptance.
