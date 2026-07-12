Identity: `adaptive-main-thread-orchestration-task-4-pr6-reacceptance-boundary-review-20260712-v1`

Decision: FAIL

Contract review summary:
- The impact diagnosis and one-file scope are correct, but the boundary lacks frozen calibration/route bindings, complete AC-to-evidence mapping, and a stable dirty-state/hash baseline.

Evidence reviewed:
- Task plan: `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md`, SHA `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`
- Requirements: `task-docs/main-thread-control-enhancement-requirements-20260711.md`, SHA `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`
- Contract: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_PR6_REACCEPTANCE_BOUNDARY_V1.md`, SHA `45ebbf96cb3c65431af380c5da02bc210f0a0f970a43be9b5dc13279ce261c4a`
- Impact analysis: `TASK4_PR6_TRANSITIVE_IMPACT_ANALYSIS_V1.md`, SHA `fa2af62181c66ca8d702ca19b8cb4dd01a4f49c15ca25abe34dfef74309f42d7`
- Accepted Task 2/3 reports, Result QA, main-thread acceptances, actual seven revised files, existing Task 4 matrix, prior Task 4 contract/report/QA/acceptance, current Git/index/untracked state
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Calibration identity verified: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`
- Relevant calibration case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-003`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-005`, `CAL-ADAPT-009`, `CAL-ADAPT-010`

Findings P0:
- None.

Blocking findings:
- [P1] The canonical calibration and triggered route bindings are not frozen.
  Calibration case id: `CAL-004`, `CAL-ADAPT-002`, `CAL-ADAPT-003`
  Evidence: Boundary lines 46–48 require a generic canonical calibration identity/path but never state the controlling path or SHA. The authority section also omits them. The triggered exact routes from `AGENTS.md`—adaptive orchestration, current-state evidence, task-planning scale, implementation boundary, validation/reporting, and semantic fidelity—are not listed.
  Required change: Freeze calibration path `task-docs/_harness/evaluator-calibration.md` and SHA `62a0fb...2f06`; enumerate every triggered route using its exact `AGENTS.md` path and require STOP on missing, mismatched, or unproved binding.

- [P1] Acceptance criteria lack concrete one-to-one evidence mappings, and approved `T4-AC1A` is not explicitly included.
  Calibration case id: `CAL-006`, `CAL-SEM-003`, `CAL-SEM-004`, `CAL-ADAPT-009`
  Evidence: The T4R table contains only AC requirements. The general validation list does not identify concrete evidence for each T4R criterion. `T4R-AC9` says `T4-AC1..T4-AC10`, while the approved plan separately defines mandatory `T4-AC1A`. Commands such as “existing validators applicable” leave validator selection to the executor.
  Required change: Add an AC-to-primary-evidence-and-command map for every T4R AC; explicitly require `T4-AC1A`; name exact validator commands and narrowly label structural outputs.

- [P1] Current dirty/protected state is not bound to a stable pre-launch identity.
  Calibration case id: `CAL-003`, `CAL-ADAPT-003`, `CAL-ADAPT-005`
  Evidence: Current state has exactly seven tracked modifications, an empty index, and 35 untracked paths. The boundary freezes only the matrix before-hash and three evaluator hashes. The impact analysis records only one of four revised Task 2 implementation hashes. No launch-baseline path/SHA, complete seven-file accepted-hash inventory, protected Task 4 inventory, or current status/untracked manifest is made a launch precondition.
  Required change: Bind all seven revised Task 2/3 implementation hashes, relevant accepted evidence paths/hashes, unchanged Task 4 protected hashes, calibration hash, and a complete current status/untracked manifest under a stable launch-baseline identity. Require pre-launch STOP on any mismatch or unexplained path.

Findings P2:
- None.

Findings P3:
- None.

Non-blocking suggestions:
- None.

Checklist:
- Matches approved task: PASS
- Scope minimal: PASS
- Allowed/protected paths explicit: PASS
- Executor cannot redesign: FAIL
- Triggered routes explicit: FAIL
- Acceptance criteria evidence: FAIL
- Safety gates: PASS
- Current-state evidence: FAIL
- Validation commands: FAIL
- Semantic fidelity: FAIL
