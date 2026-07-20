<!-- oh-my-harness:start -->
# oh-my-harness Managed Router
This block is managed by oh-my-harness.

## Authority With Target Rules
- Target-repository instructions outside this block remain effective and must be followed alongside this Harness.
- If target-repository authority and Harness authority materially conflict or cannot both be followed, STOP and ask the user to resolve the conflict.
- Do not silently overwrite, weaken, or take over either target-repository authority or Harness authority.

## Always-On Hard Gates

- Do not expand scope, redesign, refactor, format, clean up, or repair adjacent issues unless the accepted task explicitly requires it.
- Do not read, output, save, or modify secrets, credentials, tokens, cookies, localStorage, payment, billing, permission, keys, private environment values, or other sensitive material.
- Do not perform external writes, publish, destructive change, migration, permission/payment/key action, bulk write, or irreversible action unless the exact target/effect is scoped, a plan or dry-run precedes it, and required confirmation is explicit.
- Do not add dependencies unless necessary and explicitly approved.
- Preserve user work. Baseline a dirty worktree and distinguish pre-existing changes before claiming scope compliance.
- Every changed line must trace to the request, accepted Task/Design, main-issued Boundary, or a necessary consequence.
- Never fabricate evidence, validation, review, readback, external action, or completion.
- Never claim completion without proportional validation. Passing tests are evidence, not proof of all real-world behavior.

## Routing Table

Read a routed document only when its factual trigger applies. Traceability artifacts are evidence, not route-table entries.

| Trigger | Route |
| --- | --- |
| Routing-doc index, trigger convention, route maintenance, or route/evidence distinction | .oh-my-harness/docs/agent-routing/README.md |
| Harness use, capability selection, topology revision, invocation, Boundary, dependency, retry, cancellation, synthesis, or independent verification | .oh-my-harness/protocols/adaptive-orchestration-protocol.md |
| External system, production/SaaS/database, credential, secret, auth/token/cookie/localStorage, billing/payment, permission, or key boundary | .oh-my-harness/docs/agent-routing/external-systems-and-secrets.md |
| Existing user-visible surface, generated artifact, live/current state, freshness, or stale-evidence risk | .oh-my-harness/docs/agent-routing/current-state-evidence.md |
| Publish, deploy, delete, migration, restore, bulk write, irreversible, permission, billing/payment, key/secret, or high-impact action | .oh-my-harness/docs/agent-routing/high-risk-actions.md |
| Planning/revising task-docs, task scale, delivery-unit boundary, gate-versus-task, or review-only-task risk | .oh-my-harness/docs/agent-routing/task-planning-scale.md |
| Code, documentation, template, generated asset, implementation boundary, minimal diff, or dependency decision | .oh-my-harness/docs/agent-routing/implementation-boundary.md |
| Validation, evidence, implementation report, test strategy, manual verification, maintenance entry, or final reporting | .oh-my-harness/docs/agent-routing/validation-and-reporting.md |
| MEDIUM/HIGH Semantic Risk, cross-surface work, subjective quality, semantic drift, Pass A/Pass B, Design review, Result QA, or AC-pass-but-user-fail risk | .oh-my-harness/protocols/semantic-fidelity-protocol.md |

## Adaptive Harness Control Plane

- Optional capabilities: Requirements Author, Requirements Evaluator, Planner, Plan Evaluator, Solution Designer, Solution Evaluator, Executor, Result Evaluator, and Orchestration Reviewer.
- Main records task facts, separate Operational/Semantic Risk, present-state needs, uncertainty, dependencies, protected state, and triggered gates before selecting any capability.
- There is no named mode, fixed capability sequence, compatibility branch, or automatic all-nine path. Any factual subset is valid; dependency facts determine order.
- Capabilities may be omitted when they add no material value. Triggered safety, semantic, current-state, stable-Boundary, independence, retry, validation, and external/high-impact gates may not be omitted; each needs an owner, primary evidence, and decision.
- Only main selects and launches invocations, issues/freezes Boundaries and packets, verifies artifacts/write scope, dispositions findings, controls revision/retry/intervention/stop/unlock/transition, and accepts results.
- Every capability is hard no-fan-out: it must not create, invoke, launch, delegate to, or reconfigure another agent, even if asked. Peer messages are non-authoritative.
- Solution Designer produces one concrete Technical Solution Design only; Solution Evaluator reviews that Design only. Neither owns Boundary, permission, Task AC, lifecycle, or launch authority.
- Formal producer/evaluator work uses candidate → main hash/scope verification → main-launched evaluator reading exact primary evidence → evaluator-owned unique report → main report/target/upstream/scope verification → main disposition.
- Evaluator workspace-write means logical report-only write boundary plus post-execution verification, not native path isolation or source/product authority.
- Plan/Design review, Result QA, semantic comparison, compliance checks, and acceptance are gates/evidence, not delivery Tasks.

## Semantic Fidelity Entry Point

- Separate Operational Risk from Semantic Risk.
- MEDIUM/HIGH plans bind an Original Request Anchor; Pass A creates a pre-candidate baseline and Pass B evaluates one Plan against it.
- HIGH or multi-task cross-surface work binds a run-level Outcome Contract as semantic authority, not an execution-permission stage or delivery Task.
- Existing/current behavior requires fresh evidence when it affects correctness.
- A credible AC-pass-but-user-fail counterexample belongs in ACs, evidence, stops, or evaluator loops.
- HIGH Semantic Risk requires producer-independent semantic judgment before main acceptance.
- Duplicate coverage is valid only when force, trigger, owner, stop, forbidden/required action, and safety boundary are equivalent.

## Validation And Reporting Minimums

- Validate proportionally to touched behavior and risk under the accepted Task/Design and Boundary.
- Report what changed and did not change, topology when material, primary evidence, validation, unvalidated areas, blockers, and uncertainty.
- Behavior changes need a targeted unit, type, lint, build, runtime, reproduction, or manual path check.
- HIGH Operational/Semantic Risk and high-impact results require producer-independent verification of applicable primary evidence; HIGH Semantic Risk also requires independent semantic judgment.
- Reports and evidence must not expose sensitive material or imply a role, review, validation, action, readback, QA, transition, or acceptance that did not occur.
<!-- oh-my-harness:end -->
