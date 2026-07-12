# Generic Harness Architecture

`oh-my-harness` packages a repeatable information architecture for agent-governed repos.

## Layers

| Layer | Responsibility |
| --- | --- |
| Router | `AGENTS.md` keeps always-on gates, route triggers, adaptive entry, explicit full-v2 compatibility, semantic entry points, and validation minimums visible. |
| Routed docs | `docs/agent-routing/*` carries detailed rules that are read only when their triggers apply. |
| Harness protocols | `task-docs/_harness/*` defines adaptive topology, stable authority, finite retry/intervention, proportional run state, semantic fidelity, and artifact contracts. |
| Traceability artifacts | Source snapshots, coverage manifests, rule ledgers, and routing fixtures support rule-preservation review during migration. |
| Templates | Reusable Markdown files make the harness portable without hard-coding one project's domain. |
| Runtime adapters | `.codex/agents/*` maps the six logical responsibilities into one concrete subagent configuration format. |
| Scripts | Small stdlib-only helpers automate source block extraction, rule-preservation structural checks, and router fixture smoke/coverage checks. |

## Router Pattern

The router should be short and stable. It should answer:

- What must always be true?
- Which trigger sends an agent to which routed doc?
- Where is adaptive topology authority, and when is full v2 required or deliberately justified?
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

`scripts/validate_rule_preservation.py` checks the structural traceability layer: each source block appears once in the coverage manifest, coverage Rule IDs are represented in the ledger, strong `MUST` / `MUST NOT` / `STOP` force is not downgraded, and duplicate rows explicitly assert equivalence across force, trigger, stop condition, forbidden action, required action, and safety boundary.

The router fixture validator is not a semantic equivalence verifier and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.

## Risk Model

The harness separates two different risks:

- `Operational Risk`: damage from writes, publishes, deletes, migrations, permissions, payments, keys, data loss, or hard-to-recover changes.
- `Semantic Risk`: damage from losing, compressing, substituting, or misrouting user intent or project rules.

LOW semantic risk work should stay lightweight. MEDIUM/HIGH semantic risk work uses anchors, Pass A/Pass B baselines, outcome contracts, semantic diff, and strict evaluator loops.

## Authority Ownership

| Concern | Authoritative owner | Boundary |
| --- | --- | --- |
| Always-on gates and fact-triggered route entry | `AGENTS.md` and `docs/agent-routing/*` | Route existence is not invocation evidence; a delegation proves inheritance or explicitly binds routes/gates. |
| Topology selection/revision, delegation value, dependencies, synthesis, failure classification, finite budgets, intervention, recovery, and final acceptance | `task-docs/_harness/adaptive-orchestration-protocol.md` and the main thread | Roles/stages are optional; triggered gates are mandatory. The main thread cannot delegate final acceptance. Deliberate complete-v2 selection requires a task-specific six-field evidence record rather than a risk label or available-role count. |
| Anchor, Pass A/B, Outcome Contract, semantic comparison, and AC-pass-but-user-fail controls | `task-docs/_harness/semantic-fidelity-protocol.md` | Semantic controls augment the selected topology; they do not create a seventh role or competing pipeline. |
| Packet, context, stable boundary, report, and independent-QA shapes | Run-directory protocol and Task 2 templates | Every delegation is complete; durable artifacts are created only when triggered; producers cannot alter their authority. |
| Reusable role mission, permission, independence, evidence, and stop behavior | Six logical capability profiles | Current project paths, ACs, commands, topology, and output depth remain packet-owned. |
| Runtime mapping and enforcement details | `docs/adapters/codex-subagents.md` and the concrete adapter | Adapter docs describe runtime mechanics only; they do not redefine harness authority. |

Adaptive governance is the default entry: the main thread MUST select the smallest sufficient composition and record material omissions for MEDIUM/HIGH work. The exact six-interface full-v2 sequence MUST run when the user explicitly requests it or stricter downstream policy requires it. Without either requirement trigger, the main thread MAY deliberately select the same sequence when a complete task-specific record shows that it is the clearest and most effective control coverage.

That deliberate record identifies concrete task facts; compares at least one smaller viable topology and its specific control, evidence, or handoff gap; maps non-duplicative value for planner, plan evaluator, solution designer, solution evaluator, executor, and result evaluator; binds triggered gate owners, primary evidence, dependencies, handoffs, and decision points; explains cost/context impact and positive marginal value; and confirms that synthesis, topology revision, intervention, finite retry budgets, evidence arbitration, and final acceptance remain active. HIGH Operational or Semantic Risk, broad scope, harness presence, role availability, and process inertia may inform the facts but never independently select full v2. These modes remain composable and non-exhaustive, and the runtime adapter still maps capabilities without owning topology.

## Adapter Pattern

The six logical responsibilities are runtime-independent, reusable capabilities rather than a mandatory lifecycle. This repo includes a Codex adapter in `.codex/agents/` so the harness is usable out of the box, but those TOML files are not the source of truth by themselves.

The source of truth is:

- `AGENTS.md` for always-on gates and route triggers.
- `docs/agent-routing/*` for detailed triggered rules.
- `task-docs/_harness/adaptive-orchestration-protocol.md` for topology and control-plane authority.
- Other `task-docs/_harness/*` files for semantic, run-state, and artifact protocols.
- `task-docs/_harness/templates/*` for artifact shapes.

Downstream projects may replace `.codex/agents/` with another runtime adapter as long as they preserve the six responsibilities and strict boundaries. Runtime-specific launch, sandbox, and enforcement claims belong in adapter documentation, not in the generic architecture or profiles.

## Portability Boundaries

This repo intentionally avoids embedding any single product, platform, industry, or internal-system domain. Downstream repos should replace generic route examples with their real commands and stop conditions while preserving the router architecture.
