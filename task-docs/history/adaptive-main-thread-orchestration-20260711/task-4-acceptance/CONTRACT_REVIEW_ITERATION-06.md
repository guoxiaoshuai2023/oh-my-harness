# Task 4 Contract Review - Iteration 06

Identity: `adaptive-main-thread-orchestration-task-4-contract-review-iteration-06-20260711-v1`

Reviewed identity: `adaptive-main-thread-orchestration-task-4-contract-20260711-v6`

Reviewed SHA-256: `4de6b362f175ded434a06ad5f1ff6add5809c6ce4154758141db7031ba178a07`

Decision: FAIL

Contract review summary:
- The three-state correction is semantically sound, but three P1 boundary gaps leave route selection, calibration semantics, and the meaning of “stage” unresolved for the executor.

Evidence reviewed:
- Task plan: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`, SHA-256 `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`; Task 4 scope and ACs at [implementation task plan](/Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-adaptive-main-thread-orchestration/task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md:426).
- Contract: `adaptive-main-thread-orchestration-task-4-contract-20260711-v6`, verified SHA-256 `4de6b362f175ded434a06ad5f1ff6add5809c6ce4154758141db7031ba178a07`, at [CONTRACT_ITERATION-06.md](/Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-adaptive-main-thread-orchestration/task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md:1).
- Controlling evidence: requirements and protected adaptive protocol hashes matched; v5 contract/report/QA and failure-decision hashes matched; v6 baseline hash matched.
- Current state: correct branch; `HEAD`, `origin/main`, and merge base all `caf93131b6cb591644271105b1d8921459245341`; empty staged and committed deltas; 28 tracked modifications and 61 untracked files.
- Frozen evidence: all seven rejected-v5 before hashes matched; AS-row hash and five-CC-row hash matched; all 26 Task 1–3 implementation hashes, 12 accepted evidence hashes, and all 93 protected-inventory hashes independently matched.
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-004`, `CAL-ADAPT-003`

Blocking findings:
- [P1] Triggered routed documents and gates are not explicitly bound.
  Calibration case id: `CAL-004`, `CAL-ADAPT-003`
  Evidence:
  - The contract names the adaptive protocol as controlling authority but contains no `Triggered Routes And Gates` section. Its section inventory moves from authority and state directly to scope, outcomes, ACs, and validation.
  - This task triggers exact routes for router/trigger maintenance, harness topology, current-state evidence, `task-docs/` work, implementation boundaries, validation/reporting, and HIGH semantic fidelity. Re-running AS-05, AS-24, and AS-28–31 also requires synthetic-only external-system and high-risk route bindings.
  - The protected [task-contract template](/Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-adaptive-main-thread-orchestration/task-docs/_harness/templates/task-contract-template.md:106) requires exact route/gate binding with owner, evidence, decision, inheritance proof, and inactive-route reasons.
  - The v5 contract had exact bindings at [CONTRACT_ITERATION-05.md](/Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-adaptive-main-thread-orchestration/task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-05.md:108); v6 dropped them.
  Required change:
  - Add an explicit route/gate section binding the exact paths from `AGENTS.md`, with owner/evidence/decision and inactive-route reasoning. Bind external/high-risk routes strictly for synthetic fixture reasoning and reiterate that they authorize no real action. The executor must not choose routes.

- [P1] CAL-ADAPT-010 is not contractually field-complete under the calibration schema.
  Calibration case id: `CAL-004`
  Evidence:
  - The contract’s calibration requirement at [CONTRACT_ITERATION-06.md](/Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-adaptive-main-thread-orchestration/task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md:97) defines the core failure pattern but does not freeze all mandatory schema values.
  - Missing explicit values include `Category`, `Case type`, exact `Applies to` evaluator list, `Evaluator incorrectly decided`, exact `New evaluator rule`, and `Relevant prompt/template targets`.
  - T4-AC2 nevertheless requires a complete ten-case field inventory, leaving the executor to decide those behavior-shaping semantics.
  Required change:
  - Specify every stable-schema field and its exact intended value for CAL-ADAPT-010, or explicitly bind the schema and freeze all semantic values that cannot be mechanically derived.

- [P1] The contract literally prohibits any “stage,” contradicting its future execution model.
  Calibration case id: `CAL-004`
  Evidence:
  - Scope states that no “stage” is authorized at [CONTRACT_ITERATION-06.md](/Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-adaptive-main-thread-orchestration/task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md:143).
  - The stop conditions require stopping if a “stage” is required at [CONTRACT_ITERATION-06.md](/Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-adaptive-main-thread-orchestration/task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md:261).
  - The same contract anticipates a separately authorized executor launch and subsequent result review. The executor cannot safely infer that “stage” means only an additional or newly invented stage.
  Required change:
  - Replace the unqualified prohibition with “no new/additional workflow stage” or another exact formulation that permits the single contracted execution while prohibiting topology expansion.

Non-blocking suggestions:
- N/A

AC/fixture/no-impact/scope summary:
- Three-state semantics and modal force: substantively correct.
- Deliberate-selection threshold: executable and rejects risk-only, harness-presence, role-availability, and inertia rationales.
- T4-AC1A/3/4/5/6 and T4-AC9: explicitly cover all three states and fresh v6 evidence.
- CC-DELIBERATE-FULL-V2: literal and discriminates prohibition, automatic risk selection, default-loop selection, duplicate roles, and passive relay.
- AS-01–31 and five existing CC meanings: frozen hashes verified; no AS-32.
- v5 treatment and future v2 report/QA identities: correct and versioned.
- Task 1–3 no-impact: supported by current authority and verified 26-path/12-artifact hashes.
- Scope: exactly seven writable rejected-v5 surfaces; named conditional and upstream surfaces are protected.
- T4-AC2 remains unexecutable without semantic invention because CAL-ADAPT-010’s complete field values are not frozen.

Residual uncertainty:
- V6 review/freeze/manifest/launch artifacts do not yet exist, as expected before strict contract acceptance. No implementation or contract validation run was performed.

Checklist:
- Matches approved task: PASS
- Scope minimal: PASS
- Allowed/protected paths explicit: PASS
- Executor cannot redesign: FAIL
- Triggered routes explicit: FAIL
- Acceptance criteria evidence: FAIL
- Safety gates: FAIL
- Current-state evidence: PASS
- Validation commands: PASS
- Semantic fidelity: FAIL

This read-only review authorizes no implementation, freeze, executor launch, external action, or artifact creation.

