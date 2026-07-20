# Validation And Reporting Routing

Read this doc for validation, implementation reports, evidence standards, test strategy, manual verification, maintenance entries, or final reporting.

## Validation Minimums

- Validation must be proportional to touched area and risk.
- Behavior-affecting changes need the smallest sufficient targeted check: unit test, type check, lint, build, focused runtime check, reproduction script, or manual path verification.
- Documentation-only changes need structural checks when practical: link/path checks, spell-sensitive grep checks, template placeholder checks, or script dry-runs.
- Refactors require evidence that intended behavior was preserved.
- Bug fixes should reproduce the bug before fixing when practical. If not practical, explain why and validate the closest affected path.
- Do not claim a bug is fixed unless the relevant behavior was directly checked.
- Passing tests are evidence, not proof of all real-world behavior.
- HIGH Operational Risk, HIGH Semantic Risk, and high-impact external writes or results require producer-independent verification of the applicable primary evidence before main-thread final acceptance. Producer self-review is insufficient; HIGH Semantic Risk also requires independent semantic judgment.
- Formal evaluators write one unique report under a logical report-only write boundary plus post-execution verification. Main verifies report binding, target/upstream immutability, protected state, and exact changed scope before consuming the strict verdict.

## Reporting Minimums

Final reports should state:

- What changed.
- What did not change, when relevant to scope.
- The selected topology and why when material.
- What was delegated and how returned work was integrated.
- Exact candidate/report identities and main pre/post verification when a formal producer/evaluator lifecycle ran.
- What primary evidence the main thread inspected.
- Which normally available major stages were intentionally omitted and why for MEDIUM/HIGH-risk work.
- What was validated.
- What was not validated.
- Blockers, when present.
- Remaining risks or uncertainty.
- Any follow-up needed before release or publication.

Reports must not imply that a role, review, validation, external action, readback, or completion occurred when it did not.

## Evidence Quality

Good evidence is specific, scoped, repeatable, and redacted. Avoid vague claims such as "looks good" or "tests pass" without naming the check.

Reports, evidence, screenshots, logs, docs, and chat messages must not contain secret values or sensitive admin material.

## Maintenance Entries

For changes to harness architecture, include the touched maintenance surface:

- `AGENTS.md` router.
- Routed doc path.
- Harness protocol path.
- Template path.
- Script path.
- Example path.
- Traceability artifact path.
