# External Systems And Secrets Routing

Read this doc before interacting with external APIs, production systems, SaaS admin panels, databases, credentials, auth state, tokens, cookies, localStorage, billing, payment, permissions, keys, or other sensitive settings.

## Boundaries

- Prefer read-only inspection when it can answer the task safely.
- Use the smallest relevant command, query, or UI action.
- Do not read, output, save, or modify secret values unless the user explicitly scoped that exact action and the task cannot be completed without it.
- Do not include secret values in reports, docs, screenshots, logs, commits, examples, fixtures, or chat.
- Do not change auth, billing, payment, permission, key, credential, deployment, or production settings without exact scope, a plan or dry-run, and explicit user confirmation.
- When a project has a domain-specific runbook for an external system, route to that runbook before improvising commands.
- When external state matters, capture current-state evidence before making decisions.

## External Writes

External writes include API mutations, admin saves, database writes, production config changes, deploys, publishes, permission edits, billing changes, payment changes, key rotations, secret creation/deletion, and bulk edits.

Before any external write:

1. Confirm the exact target.
2. Confirm the intended effect.
3. Identify rollback or recovery if applicable.
4. Prefer dry-run, preview, or plan mode when available.
5. Get explicit user confirmation for high-impact actions.

Generic approval is not enough for high-impact writes. The confirmation must identify the action and target.

## Evidence

Acceptable evidence should be redacted and scoped:

- Command name and non-sensitive output.
- UI path without hidden values.
- Object identifiers that are not secrets.
- Before/after summaries.
- Screenshots that do not expose sensitive values.

Stop if the only available evidence would expose secret material.
