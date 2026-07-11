# Task 4 Verification-Only Resume Boundary

Identity: `adaptive-main-thread-orchestration-task-4-verification-resume-boundary-20260711-v1`

Status: `FROZEN - ONE VERIFICATION CYCLE AUTHORIZED`

Retry domain: `adaptive-main-thread-orchestration-task-4-acceptance-result-20260711-rd1`

Captured: `2026-07-11T23:51:30+08:00`

This artifact records the substantive user decision that resumes the existing exhausted retry domain for one producer-independent, read-only verification cycle. It is a zero-write acceptance boundary, not an implementation contract. Its final SHA-256 is supplied externally after creation, and it becomes protected immediately.

## Qualifying User Decision And Revised Diagnosis

The user made the following substantive decisions:

- The current seven Task 4 v7 candidate files are the intended content state and must not be modified further.
- The Task 4 content defect is resolved. The remaining unmet outcome is valid run authorization followed by final independent acceptance of the immutable candidate state.
- The retry domain remains `adaptive-main-thread-orchestration-task-4-acceptance-result-20260711-rd1`; this is not a renamed or reset domain.
- The domain is resumed for at most one verification-only quality cycle. There is no executor, implementation contract iteration, implementation write, nested delegation, stage, commit, push, PR, external write, or secret access.
- Historical v7 Implementation Report v2 and Result QA v2 remain historical evidence only and cannot supply this cycle's accepted verdict.
- A strict FAIL immediately returns this retry domain to `exhausted`; the main thread must stop without automatic retry.

This decision materially changes the prior governance diagnosis by supplying the qualifying user authorization required by `TASK4_V7_RETRY_LEDGER_FAILURE_DECISION.md`. It does not change Task 4 scope, requirements, implementation content, or the accepted Task 1-3 upstream state.

## Immutable Candidate State

The evaluator must verify these exact bytes directly. All seven paths are protected by this boundary; the verification cycle has no authority to modify them.

```text
8b4a374b3c20115ce2abf5203685dd9367331319c511c51262406340ac48d080  task-docs/_harness/templates/routing-scenario-matrix-template.md
ad0e4b2bfbd33d6a16ee37c0d1a91e1582ad255634cb583c358a416199190705  README.md
7fa1c00d3537cd6594547707513929292d0230f4b1f7a1903bd585b442c46d9f  docs/architecture.md
70aa603b0c875e63ae8149ff7e4d18cb36e98a604af24fb77024e07cccc98f41  docs/adoption/router-refactor-runbook.md
8e60a062235c755f6892f200de3aba6c148b5ab48f5ae61e7bf4a98ac46ac21e  examples/minimal-router/AGENTS.md
0eeb3024a00e06fdf0866adbd6936694044cc834c510aa9eedad21071f700ee1  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06  task-docs/_harness/evaluator-calibration.md
```

Any mismatch requires strict FAIL and immediate exhaustion. The evaluator must not repair, normalize, regenerate, or rewrite a candidate.

## Controlling Authority And Historical Evidence

| Artifact | SHA-256 | Use in this cycle |
| --- | --- | --- |
| Requirements v4 | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` | controlling requirements |
| Implementation plan v5 | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` | controlling Task 4 outcomes and scenario mapping |
| Adaptive protocol | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` | controlling orchestration and retry semantics |
| Task 4 v7 accepted boundary | `895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d` | frozen content acceptance boundary |
| Task 4 v7 strict contract review | `83923a74d2d19bf3153e8f428395f93864c7ba978ffbffc7f4301cab88bfe06b` | historical strict boundary review |
| Task 4 v7 boundary manifest | `cd3be6ccf4a745bf97a63e99665a512fe53ce90c424c46ff1f6ab9dc1a1b85d9` | frozen v7 inventory and provenance |
| Task 4 v7 launch baseline | `b84427543ddaac1de7be7200ec6029e7dc6756cf62c90d1d77233e398c7427c6` | protected/upstream hash inventory |
| Task 4 v7 Implementation Report v2 | `189f367a9f15bc30045c19d36d9128e722e916db6c86e564c304a130702291df` | historical evidence only; not an accepted verdict |
| Task 4 v7 Result QA v2 | `5e8e9120fa254da5cb4cbeb9a4329e29d3d0a0325c4b3c08e3ae7c846742c8c5` | historical FAIL evidence only; not this cycle's verdict |
| Task 4 retry ledger/failure decision | `b3a3c04e11d0e9241af0a6e6486662bbd8f5fb25068d3abcc3b3cfcb1608c431` | controlling prior exhaustion diagnosis and stable retry-domain identity |

The v5 failed contract/report/QA, v5 failure decision, v6/v7 contract chain, and all other entries protected by the v7 launch baseline remain read-only historical provenance. A failed historical artifact must not be promoted into accepted authority.

## Upstream And Protected Baseline

Before this boundary was created, the main thread independently reverified the inventories embedded in `EXECUTOR_LAUNCH_BASELINE_V7.md`:

- Task 1-3 accepted implementation inventory: exactly 26 paths, zero hash mismatches.
- Task 1-3 accepted evidence inventory: exactly 12 artifacts, zero hash mismatches.
- Complete protected inventory: exactly 101 files, zero hash mismatches.
- Task 1-3 remain accepted and are not reopened or superseded.
- No Task 1-3 defect is implied by the v7 retry-governance failure; the accepted protocol retains deliberate, evidence-backed main-thread full-v2 selection.

The evaluator must repeat these checks from primary files, not rely solely on this summary. This boundary, the intended Result QA v3 path after main-thread persistence, and any final main-thread acceptance artifact are additional gate artifacts outside the historical 101-entry inventory and are protected immediately upon creation.

## Branch And Dirty-Worktree Baseline

Pre-boundary state:

```text
branch codex/adaptive-main-thread-orchestration
HEAD caf93131b6cb591644271105b1d8921459245341
origin/main caf93131b6cb591644271105b1d8921459245341
merge-base caf93131b6cb591644271105b1d8921459245341
staged-delta <empty>
committed-origin-main-to-HEAD-delta <empty>
tracked-modifications 28
untracked-files 71
git-status-short-sha256 0e5fc1cdfdba1cea6490cd8e8b8c242806a74b079725a0ef5dd20cee1a1760d0
git-status-porcelain-v2-sha256 7d7c9d36964ab1a2e01ca6198e5e372fc74695e768043d8c255e87ed428ac1aa
untracked-path-list-sha256 64ca48c8d05625aa1a7c81985c5b7edcf3509681616fdda53de83d8f58248f7b
untracked-content-manifest-sha256 666fb5f154f95884bf65775c29961da9965e29eedc050b32e48ad31b9a78acf7
git-diff-check PASS
active-writer <none>
```

Relative to the 67-file pre-v7-launch untracked inventory, the 71-file pre-boundary inventory adds exactly these attributable gate artifacts:

```text
task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE_V7.md
task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT_V2.md
task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA_V2.md
task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V7_RETRY_LEDGER_FAILURE_DECISION.md
```

This boundary file is the only authorized addition before evaluator launch. Result QA v3 is the only authorized addition during evaluator handoff, and it must be persisted byte-for-byte by the main thread after the read-only evaluator returns. A final acceptance artifact is conditionally authorized only after strict PASS and main-thread primary-evidence review. No existing dirty path may be overwritten, deleted, staged, committed, or otherwise changed.

## Verification-Only Quality Cycle

Retry budget: exactly one verification cycle.

Topology:

```text
frozen resume boundary
-> one fresh producer-independent read-only Result Evaluator
-> main-thread persistence of exact evaluator response
-> main-thread primary-evidence review
-> final acceptance artifact only on strict PASS
-> stop
```

The evaluator must directly verify:

- frozen requirements and implementation plan;
- T4-AC1 through T4-AC10;
- AS-01 through AS-31 and the absence of AS-32;
- `CC-LOW`, `CC-MEDIUM`, `CC-HIGH`, `CC-FULL-V2`, `CC-NEGATIVE`, and `CC-DELIBERATE-FULL-V2`;
- CAL-ADAPT-001 through CAL-ADAPT-010;
- adaptive default, required full v2, and evidence-backed deliberate full v2 as three distinct compatible states;
- modal-force preservation and the prohibition on automatic full-v2 selection from HIGH risk, harness naming, role availability, or inertia;
- all 26 Task 1-3 accepted implementation hashes, all 12 accepted evidence hashes, and the complete protected inventory;
- exact seven-file scope, candidate hashes, dirty-worktree attribution, empty staged/committed delta, and absence of implementation writes during this cycle;
- retry-domain continuity, the prior exhaustion ledger, this qualifying user decision, this one-cycle authorization, and the truthfulness of its own verdict.

The evaluator may organize its analysis freely but must return explicit `Implementation Verification`, `Semantic Validation`, `Overall Decision`, and final `Decision` verdicts. Any unverified criterion, protected mismatch, candidate drift, unsupported evidence claim, or P0/P1 finding is strict FAIL.

## Output And Stop Conditions

The evaluator is read-only and must not create or edit files. It returns one complete artifact in its response:

- Identity: `adaptive-main-thread-orchestration-task-4-result-qa-20260711-v3`
- Intended path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA_V3.md`

The main thread persists that response exactly and computes its SHA-256.

If Result QA v3 is strict PASS, the main thread must personally inspect primary repo evidence before deciding whether to create:

- Identity: `adaptive-main-thread-orchestration-task-4-main-thread-acceptance-20260711-v2`
- Intended path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/MAIN_THREAD_ACCEPTANCE_V2.md`

If Result QA v3 is FAIL, inconclusive, missing required evidence, or not strict PASS, the retry domain immediately returns to `exhausted`. The main thread must not create a final acceptance artifact, start another evaluator, create a new contract, modify implementation, or automatically retry.

Regardless of verdict, this cycle ends after the main-thread decision. No other task may start, and no stage, commit, push, PR, external write, secret access, executor, or nested delegation is authorized.
