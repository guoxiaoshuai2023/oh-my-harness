# Task Planning Scale Routing

Read this doc when planning or revising `task-docs/` work, especially LOW semantic risk mechanical work, task scale decisions, or any plan that may accidentally turn review gates into delivery tasks.

## Planning Scale

- Prefer the smallest plan that produces a verifiable deliverable.
- Do not default to heavyweight compliance, audit, or multi-round process for ordinary low-risk work.
- Increase process weight for high-impact actions, MEDIUM/HIGH semantic risk, broad cross-surface changes, irreversible actions, or external system writes.
- Ordinary tasks should be short, executable, and verifiable: goal, boundary, key steps, acceptance criteria, evidence, and validation.
- Task list entries must be delivery units that create user-visible effect, executable assets, verifiable state, maintainable configuration, or necessary delivery docs.
- Review, plan evaluation, solution review, result QA, semantic diff, compliance checks, and final acceptance are harness gates/checks, not delivery tasks.
- Risk control must serve delivery. When no specific risk exists, prefer direct, reversible, inspectable implementation.
- LOW semantic risk mechanical tasks stay lightweight and must not be forced to read every routed doc by default.

## Delivery Unit Test

A task is a valid delivery unit when it produces at least one of:

- A code or config change.
- A documentation artifact the user asked for.
- A generated asset or report.
- A verified state change.
- A reusable template, fixture, or runbook.

A task is not a delivery unit when it is only:

- Plan review.
- Contract review.
- Result QA.
- Compliance review.
- Final acceptance.
- Semantic diff.

Those are gates and should live in acceptance criteria, evidence requirements, stop conditions, validation commands, or evaluator loops.
