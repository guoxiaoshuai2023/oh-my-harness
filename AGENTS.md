# oh-my-harness Repo Router

This file is the repo-level router for agents working in `oh-my-harness`. Keep session-global hard gates and route triggers visible here; read routed docs only when their trigger applies. LOW semantic risk mechanical tasks stay lightweight and must not read the full routed-doc stack by default.

## Always-On Hard Gates

- Do not expand scope, redesign, refactor, format, clean up, or repair adjacent issues unless the accepted task explicitly requires it.
- Do not read, output, save, or modify secrets, credentials, tokens, cookies, localStorage, payment, billing, permission, key, private environment values, or other sensitive material.
- Do not perform external system writes, publish actions, destructive changes, migrations, permission changes, billing/payment actions, key/secret actions, bulk writes, or irreversible actions unless the exact action is scoped, preceded by a plan or dry-run, and explicitly confirmed by the user.
- Do not add dependencies unless they are necessary for the accepted task and explicitly approved.
- Preserve existing user work. If the worktree is dirty, distinguish pre-existing changes from your own changes before claiming scope compliance.
- Every changed line must trace directly to the user request, the accepted contract, or a necessary consequence of that request.
- Never claim completion without validation proportional to the touched area and risk.

## Routing Table

Routed docs below are the only required `AGENTS.md` route targets. Traceability artifacts such as source snapshots, coverage manifests, rule ledgers, and scenario fixtures are evidence artifacts, not route-table entries.

| Trigger | Route |
| --- | --- |
| Routing-doc index, trigger convention, route maintenance, or routed-doc versus traceability-artifact distinction | `docs/agent-routing/README.md` |
| External API, production system, SaaS admin, database, credentials, secrets, auth, tokens, cookies, localStorage, billing, payment, permission, or key boundary | `docs/agent-routing/external-systems-and-secrets.md` |
| Existing user-visible surface, generated artifact, live data, current state, freshness requirement, stale screenshot risk, or evidence of present behavior | `docs/agent-routing/current-state-evidence.md` |
| Publish, deploy, delete, migration, restore, bulk write, irreversible change, permission change, billing/payment action, key/secret action, or other high-impact action | `docs/agent-routing/high-risk-actions.md` |
| Planning or revising `task-docs/` work, LOW semantic risk mechanical work, task scale, delivery-unit boundaries, gate-vs-task boundaries, or review-only task risk | `docs/agent-routing/task-planning-scale.md` |
| Code change, documentation change, template change, generated asset change, implementation boundary, minimal diff, no-unrelated-refactor boundary, or dependency decision | `docs/agent-routing/implementation-boundary.md` |
| Validation, implementation report, evidence standards, test strategy, manual verification, maintenance entry, or final reporting | `docs/agent-routing/validation-and-reporting.md` |
| MEDIUM/HIGH semantic risk, cross-surface work, subjective quality, semantic drift, `AC-pass-but-user-fail`, plan evaluation `Pass A`/`Pass B`, solution review, result QA, or any v2 harness flow | `task-docs/_harness/semantic-fidelity-protocol.md` |

## V2 Harness Sequence

- Approved `task-docs/` work uses the v2 sequence: `planner` -> `plan evaluator` -> `solution designer` -> `solution evaluator` negotiation until strict PASS -> freeze `ACCEPTED_CONTRACT.md` -> `executor` -> `result evaluator` -> `main-thread` independent review.
- The `executor` handles exactly one frozen `ACCEPTED_CONTRACT.md`; it must not execute later tasks, skip dependency order, write outside the contract, or repair out-of-contract problems.
- The main thread owns orchestration and independent review. Plan review, solution review, result QA, semantic diff, compliance checks, and final acceptance are gates/checks, not delivery tasks.
- Evaluators must not output `PASS with caveats`; any P0/P1 finding, missing acceptance-criteria evidence, or unverified acceptance criterion is a FAIL.
- Do not add a fixed seventh agent. Semantic fidelity augments the six logical responsibilities; it does not create a new mandatory delivery role.

## Semantic Fidelity Entry Point

- Always distinguish `Operational Risk` from `Semantic Risk`. Operational Risk covers write impact, publish, delete, permission, payment, key, data, and recovery risk. Semantic Risk covers wrong compression, replacement, omission, route substitution, or loss of user intent.
- LOW semantic risk mechanical tasks remain lightweight and must not gain unnecessary process or mandatory all-route reads.
- MEDIUM/HIGH semantic risk plans must include an `Original Request Anchor` from verbatim user language, requirements text, or source excerpts; a planner summary is not a substitute.
- MEDIUM/HIGH semantic risk plan evaluation uses `Pass A` / `Pass B`: `Pass A` reads only the Original Request Anchor, current-state/safety context, and repo-file facts before producing a stable baseline; `Pass B` evaluates the plan against that frozen baseline.
- HIGH semantic risk or multi-task cross-surface work must freeze a run-level `Outcome Contract`. The Outcome Contract is a boundary/gate, not a delivery task.
- A credible `AC-pass-but-user-fail` counterexample belongs in acceptance criteria, evidence requirements, stop conditions, or evaluator loops, not as a review-only delivery task.
- Duplicate coverage is valid only when force, trigger, stop condition, forbidden action, required action, and safety boundary are equivalent. Topic similarity alone is not enough.

## Validation And Reporting Minimums

- Validation must be proportional to touched area and risk, and must follow the accepted contract.
- Report what changed, what was not changed, what was validated, what was not validated, and remaining risks.
- Behavior-affecting changes need the smallest sufficient targeted check: unit test, type check, lint, build, focused runtime check, reproduction script, or manual path verification.
- Do not claim a bug is fixed unless the relevant behavior was directly checked.
- Passing tests are evidence, not proof of all real-world behavior.
- Reports, evidence, screenshots, logs, docs, and chat messages must not contain secret values or sensitive admin material.
