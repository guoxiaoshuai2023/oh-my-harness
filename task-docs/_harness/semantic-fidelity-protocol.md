# Semantic Fidelity Protocol

Read this doc for MEDIUM/HIGH semantic risk, cross-surface work, subjective quality, recommendation logic, semantic drift concerns, plan evaluation Pass A/Pass B, solution review, result QA, or any credible `AC-pass-but-user-fail` risk. The adaptive orchestration protocol owns topology selection; this protocol owns the semantic gates that every selected topology must preserve.

## Semantic Fidelity Protocol

- Separate `Operational Risk` from `Semantic Risk`. Operational Risk covers write impact, publish, delete, permission, payment, key, data, or recovery risk. Semantic Risk covers wrong compression, replacement, omission, route substitution, or loss of user intent.
- LOW semantic risk mechanical tasks remain lightweight. Do not add unnecessary process or mandatory all-route reads when the task is narrow and mechanically verifiable.
- MEDIUM/HIGH semantic risk plans must include an `Original Request Anchor` sourced from verbatim user language, requirements text, or source excerpts. A planner summary is not a substitute.
- MEDIUM/HIGH semantic risk plan evaluation uses `Pass A` / `Pass B`. Pass A looks only at the Original Request Anchor, current-state/safety context, and repo-file facts; it must produce a stable baseline before reading planner-authored plan content. Pass B evaluates the plan against the frozen Pass A baseline.
- HIGH semantic risk or multi-task cross-surface work must freeze a run-level `Outcome Contract`. The Outcome Contract is a boundary/gate, not a delivery task.
- After Plan Evaluator PASS and before solution design, the main thread performs a concise semantic diff against the Original Request Anchor, Pass A baseline, Outcome Contract, and task/AC/evidence.
- When a task modifies an existing user-visible surface or depends on current state, require current-state evidence. MEDIUM risk needs lightweight evidence; HIGH risk needs fuller evidence.
- A credible `AC-pass-but-user-fail` counterexample must be represented in acceptance criteria, evidence requirements, stop conditions, or evaluator loops. Do not package that check as a review-only task.
- Duplicate coverage is valid only when force, trigger, stop condition, forbidden action, required action, and safety boundary are equivalent. Topic similarity alone is not enough.
- HIGH Semantic Risk requires producer-independent semantic judgment against the controlling anchor and outcome boundary before main-thread final acceptance. Producer self-review and main-thread acceptance do not replace that evidence.
- Semantic fidelity augments the available logical responsibilities. Do not add a fixed seventh agent, and do not convert semantic review, Pass A/B, contract review, result QA, compliance, or final acceptance into a delivery task.

## Adaptive Topology And Full-v2 Compatibility

- Use `task-docs/_harness/adaptive-orchestration-protocol.md` to select and revise the execution topology. Omitting a named role does not omit an Original Request Anchor, Pass A/B, Outcome Contract, semantic comparison, current-state evidence, or `AC-pass-but-user-fail` control when its trigger applies.
- HIGH semantic risk requires complete triggered semantic-control coverage, not automatic invocation of all six roles. A lighter topology must identify an owner, evidence, and decision for every triggered semantic gate.
- The complete v2 flow remains available and must run when explicitly requested: planner -> plan evaluator -> solution designer -> solution evaluator negotiation until strict PASS -> freeze `ACCEPTED_CONTRACT.md` -> executor -> result evaluator -> main-thread final review.
- In the full v2 flow, the executor handles only the frozen `ACCEPTED_CONTRACT.md` for one approved task. It must not execute later tasks or repair out-of-contract issues.
- In the full v2 flow, the result evaluator independently verifies the implementation report, repo state, external-system evidence when applicable, and every acceptance criterion. The main thread then inspects the primary evidence and performs final review before moving to the next task.
- Harness review is a gate, not a task. Planner must not turn plan review, solution contract review, result QA, compliance checks, or final acceptance into delivery tasks.
- Evaluators must not output `PASS with caveats`; any P0/P1 finding, missing acceptance-criteria evidence, or unverified acceptance criterion is a FAIL.

## Pass A / Pass B

Use Pass A / Pass B when semantic risk is MEDIUM or HIGH.

Pass A inputs:

- Original Request Anchor.
- Current-state evidence and safety context.
- Repo-file facts.

Pass A must not read planner-authored plan content before producing the baseline. The output should have a stable identity, such as a file hash or explicit baseline ID.

Pass B inputs:

- Frozen Pass A baseline.
- Planner-authored plan.
- Acceptance criteria and evidence requirements.
- Relevant route docs and safety constraints.

Pass B evaluates whether the plan preserves user intent, scope, constraints, and acceptance evidence.

## Outcome Contract

For HIGH semantic risk or multi-task cross-surface work, freeze a run-level Outcome Contract before executing tasks.

The contract should state:

- User goal and non-goals.
- Required outcomes.
- Forbidden substitutions.
- Protected paths or state.
- Required evidence.
- Stop conditions.
- Stable identity.

The Outcome Contract is not a task. It is a boundary that later plan reviews, solution reviews, result QA, and main-thread review must cite.
