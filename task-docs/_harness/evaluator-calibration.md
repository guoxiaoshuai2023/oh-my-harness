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
| CAL-ADAPT-001 | mechanical full loop selected because harness artifacts exist |
| CAL-ADAPT-002 | light topology skips a triggered gate |
| CAL-ADAPT-003 | incomplete packet or discoverability-only route binding |
| CAL-ADAPT-004 | unmanaged parallel work or vote-based arbitration |
| CAL-ADAPT-005 | profile simplification weakens durable role boundaries |
| CAL-ADAPT-006 | relabeling resets a retry-domain count |
| CAL-ADAPT-007 | unsupported FAIL consumes producer quality count |
| CAL-ADAPT-008 | artifact-free operational failure is omitted or fabricated |
| CAL-ADAPT-009 | structural checks are treated as semantic proof |
| CAL-ADAPT-010 | complete-v2 selection authority narrowing |

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

## Adaptive Orchestration Calibration Cases

The adaptive cases use the stable schema above and additionally make the bad pattern, controlling rule, required evaluator/main-thread response, and reusable positive/negative fixture explicit. Scenario references point to `task-docs/_harness/adaptive-orchestration-acceptance-matrix.md`; they select evidence but do not replace independent inspection.

### Case CAL-ADAPT-001 - mechanical full loop selected because harness artifacts exist

Case id:
- CAL-ADAPT-001

Category:
- mechanical full-loop selection

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- A LOW mechanical task launches all six roles or creates a run directory, packet, contract, report, and QA merely because the request names the harness, profiles, or `task-docs/`.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Why it fails:
- Adaptive governance selects the smallest sufficient topology from task facts and triggered gates. Role or artifact existence is not a trigger and adds ceremony without evidence value.

Controlling rule:
- Adaptive protocol `Topology Decision And Revision`, `Delegation Value And Bounded Fan-Out`, and `Composable, Non-Exhaustive Modes`; run-directory protocol `Proportional Artifact Decision`.

Missing evidence / evidence needed:
- No fact-based topology record, delegation-value comparison, artifact trigger, or proof that direct exact validation is insufficient.

Required evaluator/main-thread response:
- Evaluator returns strict FAIL for the unjustified topology. Main thread removes untriggered roles/artifacts, retains applicable routes/gates, and records direct evidence; it does not treat lighter process as weaker evidence.

New evaluator rule:
- Fail mechanical full-loop selection that is justified only by harness/profile/task-doc existence.

Reusable positive/negative case:
- Positive: AS-01 and CC-LOW use exact one-file evidence with no role/artifact. Negative: the same Maple edit launches a full v2 sequence solely because “harness” appears.

Relevant prompt/template targets:
- `task-docs/_harness/templates/orchestration-prompt-template.md`
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Case CAL-ADAPT-002 - light topology skips a triggered gate

Case id:
- CAL-ADAPT-002

Category:
- optional stage confused with optional gate

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- A “small” or “adaptive” topology omits a triggered safety, semantic, current-state, stable-boundary, or producer-independence control together with the role commonly associated with it.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Why it fails:
- Roles and stages are selectable; triggered gates are mandatory and require an owner, primary evidence, and decision regardless of topology size.

Controlling rule:
- Adaptive protocol `Optional Stages, Mandatory Gates, And Route Binding` and `Producer-Independent Verification And Final Acceptance`; semantic protocol `Adaptive Topology And Full-v2 Compatibility`.

Missing evidence / evidence needed:
- Gate-owner/evidence/decision map and applicable confirmation, Anchor/Outcome, fresh-state, frozen-boundary, readback, or independent-review evidence.

Required evaluator/main-thread response:
- Return strict FAIL, identify the exact omitted gate and failure origin, and stop the protected transition. Main thread adds the missing control or selects a topology that can satisfy it; it must not add unrelated stages.

New evaluator rule:
- Evaluate control coverage, not role count. Any triggered gate without owner, evidence, and decision is blocking.

Reusable positive/negative case:
- Positive: AS-04 and CC-HIGH omit planner/designer profiles but preserve frozen semantic authority and separate review. Negative: AS-05 calls deletion “small” and proceeds without confirmation/readback independence.

Relevant prompt/template targets:
- `task-docs/_harness/templates/task-packet-template.md`
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Case CAL-ADAPT-003 - incomplete packet or discoverability-only route binding

Case id:
- CAL-ADAPT-003

Category:
- invalid delegation authority

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- A delegation omits a required packet field or says only that rules exist in the repository without proving runtime inheritance or explicitly binding triggered routes/gates.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Why it fails:
- Concision cannot omit required meaning, and route discoverability is not evidence that a delegated context applied the rules.

Controlling rule:
- Adaptive protocol `Task Packets And Stable Write Boundaries`; task packet `Required Invocation Boundary`, `Router And Gate Binding`, and `Packet Validity Check`.

Missing evidence / evidence needed:
- Every required packet field; proved inheritance trace or explicit route/gate list; each gate's owner, evidence, and decision.

Required evaluator/main-thread response:
- Mark the packet invalid and STOP before launch. Main thread completes the missing authority and route binding under a stable identity rather than asking the producer to infer it.

New evaluator rule:
- Never launch or pass an incomplete packet or a discoverability-only binding.

Reusable positive/negative case:
- Positive: AS-26 invocation A proves inheritance and B explicitly binds. Negative: AS-22 packet A omits `Explicit non-goals`, or AS-26 C says only `rules exist in repo`.

Relevant prompt/template targets:
- `task-docs/_harness/templates/task-packet-template.md`
- `docs/adapters/codex-subagents.md`

### Case CAL-ADAPT-004 - unmanaged parallel work or vote-based arbitration

Case id:
- CAL-ADAPT-004

Category:
- unsafe coordination and invalid synthesis

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- Parallel branches share writes or mutable state without ownership; lack prerequisites, obsolete/cancellation conditions, downstream consumer, or synthesis; or competing outputs are resolved by votes, confidence, or agent count.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Why it fails:
- Parallelism needs disjoint or conflict-safe ownership and dependency control. Evidence conflicts are resolved by authority, freshness, assumptions, reproducibility, relevance, and decisive evidence, not popularity.

Controlling rule:
- Adaptive protocol `Parallel Ownership, Dependencies, Cancellation, And Synthesis`.

Missing evidence / evidence needed:
- Per-branch owner, prerequisites, distinct output, shared-state restrictions, consumer, obsolete condition, synthesis step, and evidence-arbitration table.

Required evaluator/main-thread response:
- STOP unsafe branches or mark invalid work superseded; prevent output propagation; inspect decisive evidence and synthesize explicitly. Do not average or vote.

New evaluator rule:
- Fail unmanaged shared writes, incomplete branch state, unsynthesized outputs, and vote-based arbitration.

Reusable positive/negative case:
- Positive: AS-08 uses two disjoint packets and waits for both; AS-09 selects by source fit. Negative: both branches edit one file or proposal B wins two votes to one.

Relevant prompt/template targets:
- `task-docs/_harness/templates/context-handoff-template.md`
- `task-docs/_harness/templates/orchestration-prompt-template.md`

### Case CAL-ADAPT-005 - profile simplification weakens durable role boundaries

Case id:
- CAL-ADAPT-005

Category:
- reusable profile regression

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- A shorter or more generic profile weakens sandbox, permission, producer independence, evidence discipline, stop behavior, mission, or role intelligence, or embeds project paths/ACs.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Why it fails:
- Profiles own durable role boundaries across projects and complexity levels. Current task facts belong in packets; simplification cannot lower modal force or transfer authority.

Controlling rule:
- Codex adapter `Profile And Packet Ownership` and `Capability Interfaces`; accepted six profile boundaries.

Missing evidence / evidence needed:
- Before/after six-role ledger comparing permissions, sandbox, independence, evidence, stops, mission, and packet/profile ownership.

Required evaluator/main-thread response:
- Fail the regression and route it to the owning profile task. Downstream task execution stops; documentation or calibration must not conceal or repair a protected upstream defect.

New evaluator rule:
- Require every current profile boundary to be equivalent or stronger than its accepted source on all durable control dimensions.

Reusable positive/negative case:
- Positive: AS-15/16/19 show generic profiles with packet-driven depth and unchanged authority. Negative: result evaluator loses read-only sandbox or may repair failures.

Relevant prompt/template targets:
- `.codex/agents/harness-*.toml`
- `docs/adapters/codex-subagents.md`

### Case CAL-ADAPT-006 - relabeling resets a retry-domain count

Case id:
- CAL-ADAPT-006

Category:
- retry budget evasion

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- A stage, task, boundary, prompt, tool, agent, strategy, or topology is renamed and the same failed user-valued result/root cause is given a fresh cumulative or operational budget.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Why it fails:
- Retry-domain cumulative quality and normalized-cause operational counts survive cosmetic relabeling; only evidence of a genuinely different domain or qualifying resume can change the budget.

Controlling rule:
- Adaptive protocol `Quality And Operational Retry Budgets` and `Retry Domains, Exhaustion, Safety Recovery, And Resume`; context handoff counter fields.

Missing evidence / evidence needed:
- Stable retry-domain identity, failed result, root cause, boundary and dependency comparison, cumulative/operational ledger, and qualifying-event evidence if resumed.

Required evaluator/main-thread response:
- Restore the inherited count, intervene at two, and block/exhaust at the post-intervention third failure. Reject relabeling as a new domain.

New evaluator rule:
- Treat cosmetic stage/task/boundary/tool/agent changes as the same domain unless decisive evidence proves otherwise.

Reusable positive/negative case:
- Positive: AS-12 and AS-31 preserve counts across stage/tool changes. Negative: execution is renamed “verification” and starts again at zero.

Relevant prompt/template targets:
- `task-docs/_harness/templates/context-handoff-template.md`
- `task-docs/_harness/templates/result-qa-template.md`

### Case CAL-ADAPT-007 - unsupported FAIL consumes producer quality count

Case id:
- CAL-ADAPT-007

Category:
- invalid failure counting and wrong review type

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- Any raw evaluator FAIL increments the producer count even when the finding is unsupported, outside the assigned review type, based on stale/missing evidence, or caused by evaluator misunderstanding.

Evaluator incorrectly decided:
- FAIL against the producer, with count increment

Expected decision:
- Reject the unsupported finding; producer count unchanged

Why it fails:
- A quality failure is valid only when evidence-supported, in scope for the assigned review type, and tied to active authority. Wrong-review failures belong to evaluator/prompt/routing diagnosis.

Controlling rule:
- Adaptive protocol `Failure Classification And Validity`; run-directory protocol `Failure, Retry, Intervention, And Stop State`.

Missing evidence / evidence needed:
- Exact review assignment, decisive primary evidence, finding-to-authority comparison, and counter ledger.

Required evaluator/main-thread response:
- Reject with evidence, classify evaluator misunderstanding/unsupported finding/wrong review type, correct the reviewer/packet, and leave producer stage-local and cumulative counts unchanged.

New evaluator rule:
- A FAIL string is not a valid producer failure without scope, authority, and decisive evidence.

Reusable positive/negative case:
- Positive: AS-27 rejects a UX reviewer's unit-test objection and keeps count 2. Negative: that objection becomes producer failure 3 and exhausts the domain.

Relevant prompt/template targets:
- `task-docs/_harness/templates/result-qa-template.md`
- `.codex/agents/harness-result-evaluator.toml`

### Case CAL-ADAPT-008 - artifact-free operational failure is omitted or fabricated

Case id:
- CAL-ADAPT-008

Category:
- operational failure misrepresented as quality output

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- A timeout/startup/tool/service failure before reviewable output is ignored, or a producer artifact, reviewer verdict, or quality FAIL is fabricated to fit the lifecycle.

Evaluator incorrectly decided:
- PASS, or quality FAIL against a nonexistent artifact

Expected decision:
- Record operational attempt only; no quality decision

Why it fails:
- Pre-artifact failures consume a separate normalized-cause operational budget and cannot truthfully create producer/reviewer evidence.

Controlling rule:
- Adaptive protocol `Failure Classification And Validity` and `Quality And Operational Retry Budgets`; context handoff artifact-free counter.

Missing evidence / evidence needed:
- Complete runtime log, normalized evidence-supported cause, transience/invocation-defect check, operational counter, and proof quality count remains unchanged.

Required evaluator/main-thread response:
- Record operational count, permit only the bounded checked retry, intervene before a third same-cause attempt, and never fabricate artifacts or reviews.

New evaluator rule:
- Separate artifact-free operational attempts from quality cycles in evidence, counters, and reports.

Reusable positive/negative case:
- Positive: AS-30 records two `ETIMEDOUT` attempts, operational 2 and quality 0. Negative: a fake producer report and FAIL are created for each timeout.

Relevant prompt/template targets:
- `task-docs/_harness/templates/context-handoff-template.md`
- `task-docs/_harness/templates/executor-report-template.md`

### Case CAL-ADAPT-009 - structural checks are treated as semantic proof

Case id:
- CAL-ADAPT-009

Category:
- structural evidence overclaim

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- All IDs, fields, paths, or trigger strings parse and a smoke validator passes, so the evaluator declares topology, authority, outcome, independence, or rule semantics correct without inspecting the row decisions and primary evidence.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL when semantic/independence evidence is absent

Why it fails:
- Structural checks prove only shape or mention coverage. They cannot prove gate preservation, semantic outcome, producer independence, force equivalence, or user success.

Controlling rule:
- Result evaluator profile structural-check limit; CAL-SEM-004; router validator's explicit non-semantic boundary; adaptive protocol evidence rule.

Missing evidence / evidence needed:
- Independent per-scenario judgment, discriminating failure signal, controlling authority, primary outcome/state evidence, and separate semantic/independence review where triggered.

Required evaluator/main-thread response:
- Label structural results narrowly, perform the missing semantic review, and return strict FAIL if a triggered semantic or independence gate remains unverified.

New evaluator rule:
- Never upgrade IDs, parsing, path existence, or smoke coverage into semantic PASS.

Reusable positive/negative case:
- Positive: every AS row has an independent evidence decision and CC-NEGATIVE fails despite structural PASS. Negative: all 31 IDs parse and Harbor self-review is accepted as independent.

Relevant prompt/template targets:
- `task-docs/_harness/templates/result-qa-template.md`
- `task-docs/_harness/templates/routing-scenario-matrix-template.md`
- `scripts/validate_router_fixture.py`

### Case CAL-ADAPT-010 - complete v2 incorrectly limited to explicit request or stricter policy

Case id:
- CAL-ADAPT-010

Category:
- complete-v2 selection authority narrowing

Case type:
- synthetic

Applies to:
- `plan_evaluator`
- `solution_evaluator`
- `result_evaluator`

Task pattern / bad pattern:
- Reusable routing, public, adoption, example, contract, or evaluator guidance says the complete governed v2 flow is available `only` when explicitly requested or required by stricter downstream policy, omitting evidence-backed deliberate main-thread selection.

Evaluator incorrectly decided:
- PASS

Expected decision:
- FAIL

Why it fails:
- Requirements and the adaptive protocol preserve three distinct states: adaptive default, required complete v2 for explicit request or stricter policy, and deliberate main-thread selection when task-specific evidence shows the complete sequence is the clearest control coverage. The bad pattern removes the third state even though structural checks and explicit-request fixtures can still pass.

Controlling rule:
- Requirements `Supported Orchestration Modes`, especially `Full governed flow`; adaptive protocol `Composable, Non-Exhaustive Modes`, `Optional Stages, Mandatory Gates, And Route Binding`, and `Authority And Accountability`.

Missing evidence / evidence needed:
- Three-state wording with correct modal force; a deliberate-selection record containing concrete task facts, smaller-topology comparison, six-role non-duplicative value map, gate owners/evidence/handoffs, cost/context value, and active main-thread controls; plus the complete `CC-DELIBERATE-FULL-V2` decision and failure-signal checks.

Required evaluator/main-thread response:
- Return strict FAIL, classify a semantic contract/authority failure, reject implementation-only repair under the defective boundary, route to the owning contract, and require revised authority plus fresh producer-independent Result QA.

New evaluator rule:
- Fail any reusable or controlling guidance that makes explicit request or stricter policy the exclusive complete-v2 selection path. Also fail risk-label automatic full v2, default full-loop behavior, duplicate-role ceremony, or passive main-thread relay. Accept deliberate selection only when the complete six-field task-specific evidence record is present.

Reusable positive/negative case:
- Positive: `CC-DELIBERATE-FULL-V2` Project Lattice has no explicit request or fixed policy, compares a smaller topology, proves distinct value for all six interfaces, binds gates/evidence/handoffs, and retains adaptive intervention and main-thread acceptance. Negative: the same case is prohibited for lacking explicit request/policy, selected automatically from HIGH risk, treated as the harness default, or run with a passive relay.

Relevant prompt/template targets:
- `task-docs/_harness/templates/routing-scenario-matrix-template.md`
- `task-docs/_harness/templates/orchestration-prompt-template.md`
- `task-docs/_harness/templates/plan-review-template.md`
- `task-docs/_harness/templates/result-qa-template.md`
