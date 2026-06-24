# Agent Routing Docs

This directory contains trigger-based routed documentation for the generic harness. Read a routed doc only when its trigger applies. LOW semantic risk mechanical tasks must stay lightweight and must not read the full routing stack by default.

## Routed Docs

These files are route-table targets in `AGENTS.md`. Do not merge, rename, split, substitute, or move them without treating that as an architecture change.

- `docs/agent-routing/README.md`: index, trigger-based reading convention, route maintenance, and routed-doc versus traceability-artifact distinction.
- `docs/agent-routing/external-systems-and-secrets.md`: external system boundaries, credentials, auth, tokens, secrets, sensitive settings, and write gating.
- `docs/agent-routing/current-state-evidence.md`: current-state checks for user-visible surfaces, live data, generated artifacts, and stale evidence risks.
- `docs/agent-routing/high-risk-actions.md`: publish, deploy, delete, migration, restore, bulk write, permissions, billing/payment, keys/secrets, irreversible action, dry-run, and explicit confirmation stops.
- `docs/agent-routing/task-planning-scale.md`: task scale, LOW-risk lightweight handling, delivery-unit rule, no review-only task rule, and gate-vs-task distinction.
- `docs/agent-routing/implementation-boundary.md`: minimal implementation boundary, dependency decisions, no unrelated refactor, and artifact/template edit rules.
- `docs/agent-routing/validation-and-reporting.md`: validation by touched area, evidence standards, reporting minimums, and maintenance-entry expectations.
- `task-docs/_harness/semantic-fidelity-protocol.md`: Original Request Anchor, Operational Risk versus Semantic Risk, Outcome Contract, Pass A/Pass B, current-state evidence, AC-pass-but-user-fail handling, duplicate fidelity, and LOW-risk lightweight handling.

## Traceability Artifacts

These are evidence artifacts, not route-table targets:

- Source snapshots.
- Source coverage manifests.
- Rule preservation ledgers.
- Routing scenario fixtures.
- Accepted contracts, implementation reports, and result QA reports.

Keep them under `task-docs/` or a run directory. Do not add them as mandatory `AGENTS.md` route entries unless a future architecture change explicitly requires that.

## Maintenance Convention

- Keep routes trigger-based.
- Keep route paths stable.
- Keep always-on hard gates visible in `AGENTS.md`.
- Move long-form details into routed docs only when the router still retains the trigger and route.
- Preserve source fidelity during router refactors through source snapshots, coverage manifests, rule ledgers, and routing fixtures.
- Do not use route existence as a reason to read every route for ordinary low-risk work.
