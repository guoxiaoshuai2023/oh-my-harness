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
| Release bundle | The package build maps fixed sources into an immutable inventory and an exact installed payload. |
| Target lifecycle | The Node CLI plans and applies ownership-checked install, update, and uninstall operations. |

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

## Package And Lifecycle Authority Planes

Release, target lifecycle, and evidence are separate planes. A fact in one plane does not silently grant authority in another.

| Surface | Authority | Limit |
| --- | --- | --- |
| `packaging/bundle-map.json` | Selects the release sources, installed destinations, reference rewrites, managed-block source, and calibration dependents used by the bundle build. | It is build input, not target ownership or permission to mutate a repository. |
| Installed `.oh-my-harness/bundle-inventory.json` | Immutable release manifest for package identity, version, exact required destination hashes, six agent paths, managed-block identity, and reference policy. | It does not record mutable target history and cannot authorize replacement without validated installed state. |
| Lifecycle code | Owns planning, conflict classification, confirmation, containment, write order, verification, and truthful result reporting. | It cannot infer ownership, merge target content, repair incomplete installs, or publish a release. |
| Managed `install-state.json` | Mutable, canonical target state within the managed namespace: installed version, target identity, exact owned files, six agents, managed-block mode, verification, operation, and backups. | It is deliberately non-self-hashing: the state file is not listed as one of its own owned files. It must reconcile with the installed immutable inventory. |
| Managed `AGENTS.md` block | Owns exactly one byte-exact interval between the oh-my-harness start and end markers. | Target instructions outside the interval remain target-owned and effective. Damaged or ambiguous markers stop the lifecycle. |
| Current target content | Supplies present-state evidence, including drift and exact Git overlap. | Names, prefixes, or similarity never establish Harness ownership. Modified managed bytes require disclosure, backup, and confirmation. |
| `.oh-my-harness-backups/<operation-id>/` | Preserves exact modified managed bytes before replacement or removal. Backups are target-owned after creation. | They are not installed release payload. Later absence or target cleanup is non-blocking and is not performed by uninstall. |
| Tests, fixtures, and local package validation | Provide reproducible structural and runtime evidence for the release candidate. | Passing checks do not prove semantic equivalence, target-rule compatibility, npm ownership, signing, publication, or public release. |
| Product docs | Explain the supported architecture, commands, lifecycle contract, and release boundary. | Documentation does not override code or frozen package inputs. A discrepancy is a stop condition, not permission to invent behavior. |

Install creates only absent required destinations. Update and uninstall first validate the old canonical state and reconcile it with the installed immutable inventory. Update may replace an old owned path, remove an old owned path no longer in the new inventory, or create a newly required path only when that destination is absent. An unowned collision or unverifiable ownership stops without merge or inference. Install/update publish verified state last; uninstall removes state only after owned content and the managed block have been removed and verified.

The CLI writes an operation sentinel before payload mutation. A capturable failure never reports success; a retained sentinel, recognized temporary file, missing owned surface, or payload/state mismatch makes a later invocation stop as `INCOMPLETE_OR_UNOWNED`. Generalized recovery and reconciliation are intentionally outside this lifecycle.

The package lifecycle requires Node `>=24 <25` and only the Node standard library. Python 3.11 is reserved for the three required installed helper validators. Local `.tgz` package, fixture, and CI evidence can establish a reproducible local candidate; license, npm scope access/ownership, credentials, signing, publication, and release creation require later owner and external-write authority.

Material target-repository authority and Harness authority conflicts cause `STOP`; neither the managed block nor the lifecycle may weaken or take over target rules. Likewise, parsing, hashes, TOML validity, package smoke checks, fixtures, and structural validators are evidence at their actual scope, never semantic proof.

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
