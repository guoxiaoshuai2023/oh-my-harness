# Task 2 Reopened Boundary v6 Result-Recovery Addendum

Identity: `adaptive-main-thread-orchestration-task-2-contract-20260712-v6`

State: `CANDIDATE RESULT-RECOVERY BOUNDARY`

This addendum incorporates Task 2 v4/v5 and their strict review. It responds only to `TASK2_REOPENED_FAILURE_DECISION_V1.md`; it does not change T2R semantics or expand implementation scope.

## Frozen Candidate State

```text
036b7da81995cd999a6d06589cd279d6fc20a052782fa495e772986cf2a4c2b4  task-docs/_harness/templates/task-packet-template.md
24f782c5811c42ac5cee98b377e8a45cc4814db5726cb19c5201fd1baec144ab  task-docs/_harness/templates/orchestration-prompt-template.md
158e627a8b388a470783e92cb9d08224e82441787c1b424c75ba8a5ad5c1b5ab  task-docs/_harness/templates/plan-review-template.md
c463a41b38e11b046e8529698add887f70ad060ac91fa6ae21aaf5d66463b8a8  task-docs/_harness/templates/result-qa-template.md
```

The focused producer cycle must verify these bytes and the full composite outcome. It must not modify them unless it finds a concrete in-boundary defect; no such defect is currently known. Any modification must remain within these four paths and receive complete before/after evidence.

## New Launch Baseline Requirement

Before the focused producer cycle, main thread creates and freezes exact path `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_LAUNCH_BASELINE_V2.md`.

It must contain every v1 field plus these exact Task 1 accepted-evidence rows:

```text
922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
```

The baseline uses the same main-thread owner and self-reference protocol: pre-persistence snapshot, baseline as sole expected addition, final externally supplied SHA, producer pre/post verification, and independent QA comparison.

It must also freeze current candidate hashes, the v1 report/QA/failure decision, all reopened boundaries/reviews/manifests, current complete status/untracked hashes, branch/refs/index/committed patch, routes/semantic chain, and every existing untracked artifact.

## Focused Producer And QA Outcome

- Producer returns `adaptive-main-thread-orchestration-task-2-revision-implementation-report-20260712-v2` and must explicitly verify the three Task 1 rows from the new baseline.
- Fresh Result QA must re-evaluate T2R-AC1 through T2R-AC11 from primary files. Prior content PASS labels are evidence only, not inherited verdicts.
- Exact calibration binding and consulted-path/case-ID return rules remain mandatory for QA.
- Task 2 acceptance requires strict PASS and main-thread primary-evidence review.

All prior allowed/protected paths, routes, semantic authorities, validations, report fields, and stop conditions remain. Task 3 remains blocked.
