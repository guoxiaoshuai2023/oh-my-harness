# Generic Harness Architecture

`oh-my-harness` packages a repeatable information architecture for agent-governed repos.

## Layers

| Layer | Responsibility |
| --- | --- |
| Router | `AGENTS.md` keeps always-on gates, route triggers, v2 sequence, semantic entry points, and validation minimums visible. |
| Routed docs | `docs/agent-routing/*` carries detailed rules that are read only when their triggers apply. |
| Harness protocols | `task-docs/_harness/*` defines task loops, run directories, semantic fidelity, and artifact contracts. |
| Traceability artifacts | Source snapshots, coverage manifests, rule ledgers, and routing fixtures support rule-preservation review during migration. |
| Templates | Reusable Markdown files make the harness portable without hard-coding one project's domain. |
| Runtime adapters | `.codex/agents/*` maps the six logical responsibilities into one concrete subagent configuration format. |
| Scripts | Small stdlib-only helpers automate source block extraction and router fixture smoke/coverage checks. |

## Router Pattern

The router should be short and stable. It should answer:

- What must always be true?
- Which trigger sends an agent to which routed doc?
- What is the authoritative task loop?
- When does semantic fidelity protocol activate?
- What validation/reporting minimums apply to every task?

The router should not carry every long-form rule, command list, runbook, or domain explanation. Those belong in routed docs.

## Traceability Pattern

When refactoring an existing instruction file into a router, do not rely on memory or "roughly equivalent" rewrite claims.

Use four evidence artifacts:

| Artifact | Purpose |
| --- | --- |
| Source snapshot | Immutable raw full-text copy of the source with stable block IDs and SHA-256. Do not snapshot secret-bearing files unless explicitly authorized and redacted. |
| Source coverage manifest | One row for every source block, classified as Rule ID, Non-normative, or Duplicate. |
| Rule preservation ledger | One entry for every normative rule, mapping source force to target force and route trigger. |
| Routing scenario fixture | Forward and reverse coverage of route triggers and Rule IDs. The validator is a smoke/coverage check for trigger, route, path, and rule mentions only. |

The router fixture validator is not a semantic equivalence verifier and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.

## Risk Model

The harness separates two different risks:

- `Operational Risk`: damage from writes, publishes, deletes, migrations, permissions, payments, keys, data loss, or hard-to-recover changes.
- `Semantic Risk`: damage from losing, compressing, substituting, or misrouting user intent or project rules.

LOW semantic risk work should stay lightweight. MEDIUM/HIGH semantic risk work uses anchors, Pass A/Pass B baselines, outcome contracts, semantic diff, and strict evaluator loops.

## Adapter Pattern

The six logical responsibilities are runtime-independent. This repo includes a Codex adapter in `.codex/agents/` so the harness is usable out of the box, but those TOML files are not the source of truth by themselves.

The source of truth is:

- `AGENTS.md` for always-on gates and route triggers.
- `docs/agent-routing/*` for detailed triggered rules.
- `task-docs/_harness/*` for semantic and run protocols.
- `task-docs/_harness/templates/*` for artifact shapes.

Downstream projects may replace `.codex/agents/` with another runtime adapter as long as they preserve the six responsibilities and strict boundaries.

## Portability Boundaries

This repo intentionally avoids embedding any single product, platform, industry, or internal-system domain. Downstream repos should replace generic route examples with their real commands and stop conditions while preserving the router architecture.
