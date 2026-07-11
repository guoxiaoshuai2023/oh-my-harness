# Routing Scenario Matrix - <YYYYMMDD>

## Purpose

This reusable routing scenario matrix validates the final `AGENTS.md` router. It is a documentation asset for future regression checks, not a plan review, solution review, result QA, final acceptance task, or one-time approval checklist.

Route docs are trigger-based: a task reads a routed doc when its trigger applies, and unrelated LOW-risk work must not read the full routed-doc stack by default.

## Input Artifact Identities And Hashes

| Artifact | Identity / SHA-256 |
| --- | --- |
| Final `AGENTS.md` |  |
| Rule preservation ledger |  |
| Source coverage manifest |  |
| Source snapshot |  |
| Outcome Contract, if any |  |
| Pass A baseline, if any |  |

## Scenario Matrix

| Scenario ID | Family | Expected routes | Expected actions | Expected stops | Expected evidence | Expected non-routes |
| --- | --- | --- | --- | --- | --- | --- |
| `RSM-001` | LOW-risk mechanical doc/code change | `docs/agent-routing/task-planning-scale.md` only when the LOW semantic risk, planning, task scale, or gate-vs-task trigger applies. | Keep the task lightweight, make only the scoped change, run the smallest relevant check, and avoid mandatory all-route reads. | Stop if the task is expanded into compliance, audit, broad refactor, or review-only delivery work. | Diff, lightweight validation, and note that route selection was trigger-based. | `docs/agent-routing/README.md`; `docs/agent-routing/external-systems-and-secrets.md`; `docs/agent-routing/current-state-evidence.md`; `docs/agent-routing/high-risk-actions.md`; `docs/agent-routing/implementation-boundary.md`; `docs/agent-routing/validation-and-reporting.md`; `task-docs/_harness/semantic-fidelity-protocol.md` unless independently triggered. |
| `RSM-002` | External system or secret boundary | `docs/agent-routing/external-systems-and-secrets.md`; plus `docs/agent-routing/high-risk-actions.md` when the action is high-impact. | Prefer read-only inspection, redact sensitive output, require plan/dry-run and explicit confirmation for high-impact writes. | Stop on secret exposure risk, unscoped external writes, or missing confirmation for sensitive actions. | Redacted command/UI evidence, target/effect summary, and no secret values. | Current-state, implementation, validation, and semantic routes unless independently triggered. |
| `RSM-003` | Current state dependent change | `docs/agent-routing/current-state-evidence.md`. | Capture fresh evidence before relying on present behavior, live data, generated output, or user-visible state. | Stop if stale screenshots, old reports, or planner assumptions are used as current facts. | Focused before/after evidence and validation of affected path. | External-system, high-risk, semantic, and validation routes unless independently triggered. |
| `RSM-004` | Publish, deploy, delete, migration, restore, bulk write, permission, billing, payment, key, or irreversible action | `docs/agent-routing/high-risk-actions.md`; plus `docs/agent-routing/external-systems-and-secrets.md` when sensitive systems are involved. | Require exact scope, target, effect, plan/dry-run when available, explicit confirmation, and rollback/backup consideration. | Stop before the action without exact confirmation or if restore/migration is unsupported by runbook. | Plan/dry-run, confirmation, validation, and remaining-risk report. | Task-planning, implementation, current-state, and semantic routes unless independently triggered. |
| `RSM-005` | Harness-managed `task-docs/` execution | `task-docs/_harness/adaptive-orchestration-protocol.md`; `docs/agent-routing/task-planning-scale.md`; `docs/agent-routing/validation-and-reporting.md`; plus current-state, implementation, semantic, external-system, or high-risk routes only when their facts trigger them. | **Adaptive default:** the main thread MUST select the smallest sufficient direct/delegated/review topology, issue a complete packet for every delegation, bind every triggered gate, preserve stable producer-nonmodifiable write authority, synthesize evidence, and retain finite retry/intervention controls. **Required full v2:** it MUST use planner -> plan evaluator -> solution designer -> solution evaluator -> frozen `ACCEPTED_CONTRACT.md` -> executor -> result evaluator -> separate main-thread review when the user explicitly requests complete v2 or stricter downstream policy requires it. **Deliberate full v2:** without either requirement trigger, the main thread MAY select that complete sequence only with a task-specific record of concrete facts, the gap left by a smaller viable topology, non-duplicative value for all six interfaces, gate owners/evidence/dependencies/handoffs/decisions, positive cost/context value, and active synthesis, topology revision, intervention, finite retry, and final acceptance. HIGH risk, the harness name, role availability, or process inertia never selects full v2 by itself. | Stop on incomplete or discoverability-only route binding, unclear/mutable write authority, a skipped triggered gate, out-of-scope/later-task execution, unsupported retry reset, passive main-thread relay, optional treatment of a required full-v2 trigger, or deliberate full-v2 selection without the complete evidence record. | Topology and omission rationale; gate owner/evidence/decision map; complete packet and stable boundary when delegated; for deliberate full v2, the complete six-field decision record and smaller-topology comparison; proportional implementation/result evidence; independent verification when triggered; separate main-thread acceptance. Router smoke output remains structural only and cannot prove these semantics. | Full-v2-only artifacts and untriggered semantic, external-system, high-risk, current-state, or implementation routes. |
| `RSM-006` | Implementation boundary or dependency decision | `docs/agent-routing/implementation-boundary.md`. | Touch only necessary files, preserve existing patterns, avoid unrelated refactor, and avoid new dependencies unless approved. | Stop if the change requires a new dependency without approval or would modify unrelated files. | Minimal diff, dependency rationale if any, and validation. | External-system, high-risk, current-state, task-planning, and semantic routes unless independently triggered. |
| `RSM-007` | Validation/reporting decision | `docs/agent-routing/validation-and-reporting.md`. | Run validation proportional to touched area and risk; report changed, unchanged, validated, not validated, and remaining risk. | Stop if validation is skipped without reason or evidence would expose sensitive data. | Named checks and results, with redaction. | External-system, high-risk, current-state, implementation, and semantic routes unless independently triggered. |
| `RSM-008` | MED/HIGH semantic risk or semantic drift | `task-docs/_harness/semantic-fidelity-protocol.md`. | Separate Operational Risk from Semantic Risk; require Original Request Anchor, Pass A/Pass B where applicable, Outcome Contract for HIGH/multi-task work, and semantic diff. | Stop if semantic drift, route substitution, missing anchor, missing Pass A baseline, missing Outcome Contract, or AC-pass-but-user-fail risk is not represented in AC/evidence/stops. | Original Request Anchor, Pass A baseline identity, Outcome Contract identity, semantic diff, and AC/evidence mapping. | Other route docs unless independently triggered. |
| `RSM-009` | Router maintenance | `docs/agent-routing/README.md`; `docs/agent-routing/task-planning-scale.md`; `docs/agent-routing/implementation-boundary.md`. | Preserve trigger-based route paths; keep routed docs distinct from traceability artifacts; update scenario fixture when route triggers or paths change. | Stop before merging, renaming, splitting, substituting, or moving route paths without architecture review. | Route-table diff, routed-doc/traceability distinction check, and proof LOW-risk work stays lightweight. | External-system, high-risk, current-state, validation, and semantic routes unless independently triggered. |

## AGENTS Trigger To Scenario ID

| AGENTS trigger | Route | Positive scenario coverage | Negative / non-route proof |
| --- | --- | --- | --- |
| Routing-doc index, trigger convention, route maintenance, or routed-doc versus traceability-artifact distinction | `docs/agent-routing/README.md` | `RSM-009` | `RSM-001` proves README is not read for unrelated LOW-risk work. |
| Using the harness, selecting or revising execution topology, delegation, parallelism, route/gate binding, stable write boundary, intervention, retry, cancellation, synthesis, or producer-independent verification | `task-docs/_harness/adaptive-orchestration-protocol.md` | `RSM-005` | `RSM-001` proves the adaptive protocol is not an automatic all-route/full-loop read for unrelated LOW-risk work. |
| External API, production system, SaaS admin, database, credentials, secrets, auth, tokens, cookies, localStorage, billing, payment, permission, or key boundary | `docs/agent-routing/external-systems-and-secrets.md` | `RSM-002`, `RSM-004` | `RSM-001` excludes external-system routing for unrelated LOW-risk work. |
| Existing user-visible surface, generated artifact, live data, current state, freshness requirement, stale screenshot risk, or evidence of present behavior | `docs/agent-routing/current-state-evidence.md` | `RSM-003` | `RSM-001` excludes current-state routing for unrelated LOW-risk work. |
| Publish, deploy, delete, migration, restore, bulk write, irreversible change, permission change, billing/payment action, key/secret action, or other high-impact action | `docs/agent-routing/high-risk-actions.md` | `RSM-004` | `RSM-001` excludes high-risk routing for unrelated LOW-risk work. |
| Planning or revising `task-docs/` work, LOW semantic risk mechanical work, task scale, delivery-unit boundaries, gate-vs-task boundaries, or review-only task risk | `docs/agent-routing/task-planning-scale.md` | `RSM-001`, `RSM-005`, `RSM-009` | `RSM-001` limits the route to planning scale only when that trigger applies. |
| Code change, documentation change, template change, generated asset change, implementation boundary, minimal diff, no-unrelated-refactor boundary, or dependency decision | `docs/agent-routing/implementation-boundary.md` | `RSM-006`, `RSM-009` | `RSM-001` excludes implementation routing unless the implementation-boundary trigger appears. |
| Validation, implementation report, evidence standards, test strategy, manual verification, maintenance entry, or final reporting | `docs/agent-routing/validation-and-reporting.md` | `RSM-005`, `RSM-007` | `RSM-001` excludes validation routing unless evidence standards affect acceptance. |
| MEDIUM/HIGH semantic risk, cross-surface work, subjective quality, semantic drift, `AC-pass-but-user-fail`, plan evaluation `Pass A`/`Pass B`, solution review, result QA, or any v2 harness flow | `task-docs/_harness/semantic-fidelity-protocol.md` | `RSM-005`, `RSM-008` | `RSM-001` excludes semantic protocol routing for LOW-risk mechanical work without semantic trigger. |

## Rule ID To Scenario ID

When a rule ledger exists, every Rule ID must map to a scenario ID or to exact `always-on hard gate` coverage.

| Rule ID | Scenario ID or always-on hard gate | Coverage rationale |
| --- | --- | --- |
| `AGENTS-RULE-0001` |  |  |

## LOW-Risk No-Full-Stack Proof

`RSM-001` proves that LOW-risk mechanical work does not read every routed doc by default. Route selection remains trigger-based.

## Deterministic Regression Checks

Use the helper script:

```sh
python3 scripts/validate_router_fixture.py --router AGENTS.md --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md
```
