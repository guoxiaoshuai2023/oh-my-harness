# Example Repo Router

## Always-On Hard Gates

- Keep changes scoped to the request and preserve user work.
- Do not read/expose secrets or perform destructive/external writes without exact scope and confirmation.
- Do not add dependencies without approval.
- Validate proportionally and never fabricate evidence or completion.

## Routing Table

| Trigger | Route |
| --- | --- |
| Harness use, capability selection, topology revision, invocation, Boundary, retry, synthesis, or independent verification | task-docs/_harness/adaptive-orchestration-protocol.md |
| External systems, secrets, auth, credentials, payments, permissions, or keys | docs/agent-routing/external-systems-and-secrets.md |
| Current state, generated output, or user-visible behavior matters | docs/agent-routing/current-state-evidence.md |
| Publish, deploy, delete, migration, restore, bulk write, permission, payment, key, or irreversible action | docs/agent-routing/high-risk-actions.md |
| Planning scale or gate-versus-task boundary | docs/agent-routing/task-planning-scale.md |
| Code/docs/template change, dependency, minimal diff, or implementation Boundary | docs/agent-routing/implementation-boundary.md |
| Validation, evidence, or reporting | docs/agent-routing/validation-and-reporting.md |
| MEDIUM/HIGH Semantic Risk, Pass A/B, Technical Design, Result QA, or AC-pass-but-user-fail | task-docs/_harness/semantic-fidelity-protocol.md |

## Unified Adaptive Harness

Main selects the smallest fact-required subset of nine optional capabilities and chooses order from dependencies. No named mode, fixed order, compatibility branch, or automatic all-nine path exists. LOW no-trigger work stays direct with proportional validation and no durable governance artifact. Every triggered gate still has an owner, primary evidence, and decision.

Only main launches invocations, issues/freezes Boundaries and packets, verifies artifacts/write scope, dispositions findings, controls retry/intervention/transition, and accepts. Every capability is hard no-fan-out and returns to main. Solution roles create/review Technical Solution Design only; main owns attempt permission.

Formal evaluation uses an absent unique report path and exact target/upstream hashes. Evaluator workspace-write is logical report-only write boundary plus post-execution verification, not native isolation. Invalid, operational, partial, or binding-failed review cannot unlock; main verifies and dispositions the original report.
