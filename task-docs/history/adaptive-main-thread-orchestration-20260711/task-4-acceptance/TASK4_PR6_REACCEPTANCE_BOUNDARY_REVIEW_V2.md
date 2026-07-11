Identity: `adaptive-main-thread-orchestration-task-4-pr6-reacceptance-boundary-review-20260712-v2`

Decision: FAIL

Contract review summary:
- The composite closes the hash, scope, launch-baseline, and evidence-mapping gaps, but omits three authorities required to semantically revalidate the frozen Task 4 scenarios.

Evidence reviewed:
- Requirements: `task-docs/main-thread-control-enhancement-requirements-20260711.md`, SHA `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`
- Task plan: `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md`, SHA `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`
- Contract v1: `TASK4_PR6_REACCEPTANCE_BOUNDARY_V1.md`, SHA `45ebbf96cb3c65431af380c5da02bc210f0a0f970a43be9b5dc13279ce261c4a`
- Contract v2 addendum: `TASK4_PR6_REACCEPTANCE_BOUNDARY_V2.md`, SHA `dede69256bcab80887e2270d1d9726e190a721a379c0e16a828f0d69707f6142`
- Prior review: `TASK4_PR6_REACCEPTANCE_BOUNDARY_REVIEW_V1.md`, SHA `0d8d7cd2155dcf697e911f9294b6b0d6c683890326973479b896fa445ca40629`
- Impact analysis: `TASK4_PR6_TRANSITIVE_IMPACT_ANALYSIS_V1.md`, SHA `fa2af62181c66ca8d702ca19b8cb4dd01a4f49c15ca25abe34dfef74309f42d7`
- Revised Task 2/3 accepted evidence and actual seven implementation files
- Matrix, routing fixture, actual router/routes, prior Task 4 contract/report/QA/acceptance, and current Git/index/untracked state
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Calibration SHA: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`
- Relevant calibration case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-003`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-005`, `CAL-ADAPT-009`, `CAL-ADAPT-010`

Findings P0:
- None.

Findings P1:
- [P1] The frozen route set is incomplete for the mandatory all-scenario semantic reacceptance.
  Calibration case id: `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-009`
  Evidence:
  - V2 lines 13–24 freezes and binds a route set that omits:
    - `docs/agent-routing/README.md`, SHA `a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787`
    - `docs/agent-routing/external-systems-and-secrets.md`, SHA `6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c`
    - `docs/agent-routing/high-risk-actions.md`, SHA `6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd`
  - V2 line 26 incorrectly treats the absence of live external action as removing the external/high-risk authorities from fixture review.
  - The actual matrix defines `RR`, `ES`, and `HR` as controlling authorities. AS-02, AS-05, AS-21, AS-24, AS-26, and AS-28 through AS-31 cite those authorities.
  - T4R-AC1 and T4R-AC9 require semantic review of every AS row, while T4-AC1A requires router-fixture route-semantics review. Those outcomes cannot be independently verified against a packet that does not bind the cited primary authorities.
  - The prior Task 4 v7 boundary correctly bound external/high-risk routes for synthetic fixture reasoning while separately prohibiting live actions.
  Required change:
  - Freeze the three omitted exact paths and hashes, include them in the launch-baseline route inventory, and bind them in producer and reviewer packets with the same mismatch/unreadable/discoverability-only STOP semantics.
  - State that they authorize read-only synthetic semantic evaluation only; no live external or high-impact action is authorized.
  - Map the affected AS and routing checks explicitly to these primary authorities before another strict review.

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
- Safety gates: FAIL
- Current-state evidence: PASS
- Validation commands: PASS
- Semantic fidelity: FAIL

Decision: FAIL
