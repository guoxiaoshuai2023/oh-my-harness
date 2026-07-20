# Routing Scenario Matrix: <Date>

This fixture proves route-trigger string/path coverage and encodes negative scenarios. It is supporting evidence, not semantic equivalence, QA, or main acceptance.

## Scenario Matrix

| ID | Facts | Expected routes/actions | Failure signal |
| --- | --- | --- | --- |
| RSM-LOW | LOW single-file mechanical change | Direct main work; proportional validation; only fact-triggered planning/implementation/validation routes | Any capability, Run tree, Context, Board, report, retrospective, case, or all-route read |
| RSM-HIGH-SUBSET | HIGH cross-surface implementation | Smallest fact-required subset; every triggered gate has owner/evidence/decision; independent semantic/result judgment | Automatic all-nine selection or dropped gate |
| RSM-REPORT | Formal evaluator review | Adaptive protocol plus validation; exact target/upstream; absent unique report; logical report-only verification | Collision overwrite, target mutation, extra write, summary substitution, or invalid unlock |
| RSM-DESIGN | Material execution uncertainty | Technical Solution Design candidate and matching review; main later owns Boundary | Solution role emits permission, Task AC, lifecycle, or launch |
| RSM-ROUTER | Router maintenance | Routing index, task scale, implementation boundary, and semantic route when risk triggers | Route moved/renamed or evidence artifact added as route without Architecture decision |

## AGENTS Trigger Coverage

| AGENTS trigger | Route | Positive scenario | Negative proof |
| --- | --- | --- | --- |
| Routing-doc index, trigger convention, route maintenance, or route/evidence distinction | docs/agent-routing/README.md | RSM-ROUTER | RSM-LOW excludes unrelated index reads |
| Harness use, capability selection, topology revision, invocation, Boundary, dependency, retry, cancellation, synthesis, or independent verification | task-docs/_harness/adaptive-orchestration-protocol.md | RSM-HIGH-SUBSET, RSM-REPORT | RSM-LOW proves Harness naming alone creates no invocation |
| External system, production/SaaS/database, credential, secret, auth/token/cookie/localStorage, billing/payment, permission, or key boundary | docs/agent-routing/external-systems-and-secrets.md | Exact external target/effect scenario | RSM-LOW excludes absent external facts |
| Existing user-visible surface, generated artifact, live/current state, freshness, or stale-evidence risk | docs/agent-routing/current-state-evidence.md | Fresh before/after current-state scenario | Old screenshot/report cannot substitute |
| Publish, deploy, delete, migration, restore, bulk write, irreversible, permission, billing/payment, key/secret, or high-impact action | docs/agent-routing/high-risk-actions.md | Exact preview/confirmation/readback/recovery scenario | No action before scoped confirmation |
| Planning/revising task-docs, task scale, delivery-unit boundary, gate-versus-task, or review-only-task risk | docs/agent-routing/task-planning-scale.md | RSM-LOW, RSM-ROUTER | Review gate never becomes delivery Task |
| Code, documentation, template, generated asset, implementation boundary, minimal diff, or dependency decision | docs/agent-routing/implementation-boundary.md | RSM-LOW, RSM-HIGH-SUBSET | Unrelated refactor/dependency fails |
| Validation, evidence, implementation report, test strategy, manual verification, maintenance entry, or final reporting | docs/agent-routing/validation-and-reporting.md | RSM-REPORT | Vague or fabricated validation fails |
| MEDIUM/HIGH Semantic Risk, cross-surface work, subjective quality, semantic drift, Pass A/Pass B, Design review, Result QA, or AC-pass-but-user-fail risk | task-docs/_harness/semantic-fidelity-protocol.md | RSM-HIGH-SUBSET, RSM-DESIGN | Structure-only success cannot override user-failure probe |

## Deterministic Smoke Check

Run:

    python3 scripts/validate_router_fixture.py --router AGENTS.md --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md

The command checks string/path coverage only. Independent semantic review must still inspect modal force, trigger, owner, forbidden/required action, stops, and safety boundary.
