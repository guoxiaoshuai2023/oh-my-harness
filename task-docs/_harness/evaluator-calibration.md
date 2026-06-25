# Evaluator Calibration

Use this file to record synthetic or example cases where an evaluator passed work that should have failed, or failed work for the wrong reason. Add new cases after the incident is understood, then update the relevant evaluator prompt or template with the durable rule.

This file is the canonical calibration source for `plan_evaluator`, `solution_evaluator`, and `result_evaluator`.

## Stable Schema

Every calibration case must use these fields:

- Case id
- Category
- Case type: synthetic or example
- Applies to: `plan_evaluator`, `solution_evaluator`, `result_evaluator`, or a listed combination
- Task pattern
- Evaluator incorrectly decided
- Expected decision
- Missing evidence
- New evaluator rule
- Relevant prompt/template targets

Semantic calibration cases also use these fields when applicable:

- Semantic risk tier
- Original intent
- Planner / plan drift
- Incorrect PASS reason
- Expected FAIL reason
- Evidence required
- Applicable harness stages
- Likely fault origin
- AC-pass-but-user-fail angle

Evaluators must report:

- Calibration consulted: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: case ids that influenced the decision, or `N/A`

Relevant calibration case IDs are evidence selectors, not a substitute for independently checking files, commands, state, and acceptance criteria.

Passing decisions must remain strict:

- Do not add caveats, concerns, conditions, qualifiers, notes, or warnings to a passing decision. If any are needed, output FAIL.

## Case Inventory

| Case id | Category |
| --- | --- |
| CAL-001 | self-proof treated as independent evidence |
| CAL-002 | missing user-visible or runtime QA passed |
| CAL-003 | current-state dependent work without fresh evidence |
| CAL-004 | contract allows executor redesign |
| CAL-005 | sensitive data written into evidence |
| CAL-006 | missing acceptance-criteria evidence still passed |
| CAL-SEM-001 | outcome AC downgraded to implementation-only evidence |
| CAL-SEM-002 | Pass A contaminated by planner-authored content |
| CAL-SEM-003 | multi-task split loses whole outcome |
| CAL-SEM-004 | smoke test overclaimed as semantic or rule-preservation proof |

## Calibration Cases

### Case CAL-001 - self-proof treated as independent evidence

Case id:
- CAL-001

Category:
- self-proof treated as independent evidence

Case type:
- synthetic

Applies to:
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- A designer, executor, or implementation report says work is complete and validated, but the only proof is its own checklist, summary, or narrative.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Missing evidence:
- No independent diff inspection, file readback, command output, runtime check, current-state evidence, or acceptance-criteria artifact was checked by the evaluator.

New evaluator rule:
- Treat self-proof as a claim, not evidence. The evaluator must independently check the relevant files, diffs, commands, runtime behavior, current state, or evidence artifacts before PASS.

Relevant prompt/template targets:
- `task-docs/_harness/templates/solution-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Case CAL-002 - missing user-visible or runtime QA passed

Case id:
- CAL-002

Category:
- missing user-visible or runtime QA passed

Case type:
- synthetic

Applies to:
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- A visual, page, CLI, generated artifact, interaction, export, or runtime behavior task passes using code inspection only.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Missing evidence:
- No focused runtime command, rendered artifact, browser or UI check, screenshot, output file inspection, interaction path, or affected workflow evidence was verified.

New evaluator rule:
- Require user-visible or runtime QA when the accepted outcome depends on rendered output, interaction, generated artifacts, or live behavior. If that verification is blocked or not evidenced, FAIL instead of inferring correctness from code.

Relevant prompt/template targets:
- `task-docs/_harness/templates/solution-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Case CAL-003 - current-state dependent work without fresh evidence

Case id:
- CAL-003

Category:
- current-state dependent work without fresh evidence

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- A task depends on current files, generated output, UI state, external state, or user-visible behavior, but the plan, contract, or result relies on stale screenshots, old reports, cached assumptions, or planner narrative.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Missing evidence:
- No fresh source read, before/after artifact, focused runtime output, current-state capture, timestamped evidence, or state readback was checked.

New evaluator rule:
- When current state affects correctness, require fresh evidence from the relevant boundary before PASS. If the evidence is stale, absent, or assumed, FAIL or report the blocker.

Relevant prompt/template targets:
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/solution-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Case CAL-004 - contract allows executor redesign

Case id:
- CAL-004

Category:
- contract allows executor redesign

Case type:
- synthetic

Applies to:
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- An Execution Contract tells the executor to choose the final approach, redesign the solution, decide additional files, fix adjacent issues, or adjust scope as needed after the contract is accepted.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Missing evidence:
- Contract lacks a frozen objective, allowed write paths, protected paths, explicit stop conditions, or a boundary that forbids executor redesign.

New evaluator rule:
- The solution evaluator must fail any contract that leaves design decisions to the executor. The result evaluator must fail any implementation where the executor redesigned beyond the frozen accepted contract.

Relevant prompt/template targets:
- `task-docs/_harness/templates/task-contract-template.md`
- `task-docs/_harness/templates/solution-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Case CAL-005 - sensitive data written into evidence

Case id:
- CAL-005

Category:
- sensitive data written into evidence

Case type:
- synthetic

Applies to:
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- Evidence, screenshots, logs, reports, task docs, fixtures, prompt output, or final messages include secret values or sensitive settings such as tokens, client secrets, cookies, local storage, private keys, payment data, billing data, permission data, or credential material.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Missing evidence:
- Evaluator accepted evidence that contained sensitive data, or did not inspect changed artifacts and reports for secret-bearing output.

New evaluator rule:
- Fail if secret or sensitive values are read, written, exposed, saved, or quoted outside an explicitly authorized narrow use. Require redacted, secret-safe evidence before PASS.

Relevant prompt/template targets:
- `task-docs/_harness/templates/solution-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`
- `task-docs/_harness/templates/source-snapshot-template.md`

### Case CAL-006 - missing acceptance-criteria evidence still passed

Case id:
- CAL-006

Category:
- missing acceptance-criteria evidence still passed

Case type:
- synthetic

Applies to:
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- One or more acceptance criteria are unchecked, mapped only to vague prose, listed as "not checked", or supported only by self-report while the decision is still PASS.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Missing evidence:
- AC-to-evidence mapping is incomplete, validation commands are missing, or evaluator did not require a concrete artifact for each acceptance criterion.

New evaluator rule:
- PASS is allowed only when every required AC has concrete independent evidence. Any missing, vague, blocked, or self-reported AC evidence requires FAIL.

Relevant prompt/template targets:
- `task-docs/_harness/templates/solution-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

## Semantic Drift Calibration Cases

### Case CAL-SEM-001 - outcome AC downgraded to implementation-only evidence

Case id:
- CAL-SEM-001

Category:
- outcome AC downgraded to implementation-only evidence

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- A plan, contract, or result proves that files changed or commands ran, but does not prove the user-valued outcome that those changes were meant to deliver.

Semantic risk tier:
- MEDIUM

Original intent:
- The user requested an observable outcome, not only an implementation artifact.

Planner / plan drift:
- Outcome acceptance criteria were converted into code-change or artifact-existence checks.

Evaluator incorrectly decided:
- PASS

Incorrect PASS reason:
- The changed files, generated files, or commands match the contract.

Expected decision:
- FAIL

Expected FAIL reason:
- Implementation evidence alone does not prove the user-valued outcome.

Missing evidence:
- No before/after behavior evidence, rendered artifact inspection, output inspection, current-state check, or user-path validation tied to the original outcome.

Evidence required:
- Evidence that directly demonstrates the requested outcome, plus implementation evidence when relevant.

New evaluator rule:
- Keep Outcome ACs separate from Implementation ACs. FAIL when an outcome AC is satisfied only by implementation evidence.

Relevant prompt/template targets:
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/solution-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

Applicable harness stages:
- Plan Evaluator Pass B, Solution Evaluator, Result Evaluator, main-thread review.

Likely fault origin:
- plan framing, contract conversion, result validation.

AC-pass-but-user-fail angle:
- AC says "file changed" or "test ran"; user fails because the promised outcome is not observable.

### Case CAL-SEM-002 - Pass A contaminated by planner-authored content

Case id:
- CAL-SEM-002

Category:
- Pass A contaminated by planner-authored content

Case type:
- synthetic

Applies to:
- `plan_evaluator`

Task pattern:
- A MEDIUM/HIGH semantic risk plan review reads planner-authored plan content before producing the Pass A baseline, then uses that contaminated baseline to approve the same plan.

Semantic risk tier:
- MEDIUM

Original intent:
- Pass A should reconstruct the request from source anchors, safety context, and repo facts before seeing planner interpretation.

Planner / plan drift:
- The evaluator lets planner wording define the baseline instead of independently reconstructing user intent.

Evaluator incorrectly decided:
- PASS

Incorrect PASS reason:
- The plan matches the evaluator baseline, but the baseline was derived from the plan.

Expected decision:
- FAIL

Expected FAIL reason:
- Pass A/B isolation was not proven, so semantic comparison is not independent.

Missing evidence:
- No restricted-input record, no statement that planner-authored content was excluded before baseline, no stable baseline identity, or no baseline persistence path.

Evidence required:
- Restricted input list, explicit exclusion of planner-authored content before baseline, baseline identity, and persisted baseline path.

New evaluator rule:
- For MEDIUM/HIGH semantic risk, fail plan review when Pass A isolation cannot be proven. Pass B must cite the same frozen baseline identity.

Relevant prompt/template targets:
- `task-docs/_harness/templates/plan-review-template.md`

Applicable harness stages:
- Plan Evaluator Pass A and Pass B, main-thread review.

Likely fault origin:
- plan review process.

AC-pass-but-user-fail angle:
- ACs may pass against the planner's compressed version of the request while the original user intent was never independently reconstructed.

### Case CAL-SEM-003 - multi-task split loses whole outcome

Case id:
- CAL-SEM-003

Category:
- multi-task split loses whole outcome

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- A multi-task plan splits work into locally valid tasks, but no task or run-level contract preserves the whole requested outcome across task boundaries.

Semantic risk tier:
- HIGH

Original intent:
- The user asked for one coherent end-to-end outcome.

Planner / plan drift:
- The plan decomposes the work into fragments and loses the final user path, combined artifact, or cross-surface behavior.

Evaluator incorrectly decided:
- PASS

Incorrect PASS reason:
- Each individual task has plausible local ACs.

Expected decision:
- FAIL

Expected FAIL reason:
- Local task ACs do not preserve or verify the whole outcome.

Missing evidence:
- No run-level Outcome Contract, no cross-task dependency evidence, no final whole-outcome validation, or no stop condition for cross-task drift.

Evidence required:
- Run-level outcome contract when required, per-task evidence mapping back to the whole outcome, and final validation of the combined result.

New evaluator rule:
- For HIGH semantic risk or multi-task cross-surface work, require a run-level Outcome Contract and evidence that task ACs preserve the whole requested outcome.

Relevant prompt/template targets:
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`
- `task-docs/_harness/templates/orchestration-prompt-template.md`

Applicable harness stages:
- Plan Evaluator Pass B, Solution Evaluator, Result Evaluator, main-thread review.

Likely fault origin:
- planning decomposition, contract boundaries, final result QA.

AC-pass-but-user-fail angle:
- Every task AC passes, but the final end-to-end user outcome is incomplete or incoherent.

### Case CAL-SEM-004 - smoke test overclaimed as semantic or rule-preservation proof

Case id:
- CAL-SEM-004

Category:
- smoke test overclaimed as semantic or rule-preservation proof

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern:
- A script or fixture confirms that trigger strings, route paths, or rule IDs are mentioned, then the evaluator treats that smoke result as proof of semantic equivalence, rule preservation, duplicate equivalence, or force preservation.

Semantic risk tier:
- MEDIUM

Original intent:
- The validation should prove only the mechanical coverage it actually checks.

Planner / plan drift:
- Evidence wording upgrades a smoke/coverage check into a semantic verifier.

Evaluator incorrectly decided:
- PASS

Incorrect PASS reason:
- The smoke check passed and all expected strings were present.

Expected decision:
- FAIL

Expected FAIL reason:
- Mechanical string coverage does not prove semantic equivalence or rule preservation.

Missing evidence:
- No rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread semantic review was performed.

Evidence required:
- Clear labeling of the smoke check boundary plus separate human/evaluator review for semantic preservation when required.

New evaluator rule:
- Do not overclaim smoke or coverage checks. PASS only when the evidence label matches the check's actual scope, and require separate semantic/rule-preservation review when those claims matter.

Relevant prompt/template targets:
- `scripts/validate_router_fixture.py`
- `README.md`
- `docs/architecture.md`
- `docs/adoption/router-refactor-runbook.md`
- `docs/adoption/open-source-release-checklist.md`

Applicable harness stages:
- Plan Evaluator Pass B, Solution Evaluator, Result Evaluator, main-thread review.

Likely fault origin:
- validation wording, final reporting, evidence interpretation.

AC-pass-but-user-fail angle:
- AC says "fixture validator passed"; user fails because a rule was weakened even though its trigger string appeared in the fixture.
