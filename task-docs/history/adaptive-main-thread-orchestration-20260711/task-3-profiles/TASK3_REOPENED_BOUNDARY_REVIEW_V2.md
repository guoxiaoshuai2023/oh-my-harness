Identity: `adaptive-main-thread-orchestration-task--3-boundary-review-20260712-v2`

Decision: FAIL

Blocking findings:

- [P1] The incorporated route/semantic binding imports Task 2-specific obligations that conflict with Task 3’s three-profile boundary.
  Calibration case id: `CAL-004`, `CAL-SEM-003`, `CAL-ADAPT-002`, `CAL-ADAPT-003`
  Evidence:
  - Task 3 v4 line 11 incorporates Task 2 v5’s “identities, paths, hashes, gates, evidence owners, and decision points” unchanged.
  - Task 2 v5 requires comparison of a “four-template result,” an exact four-path decision, application of three-state topology rules, and producer authority over exactly four paths.
  - Task 3 v3 instead authorizes exactly three evaluator profiles and protects all templates and topology ownership.
  - The incorporated `TASK2_REOPENED_BOUNDARY_V5.md` reference supplies neither its repository-relative path nor expected SHA in Task 3 v4.
  - Applying the incorporation literally violates Task 3 scope; adapting it requires the executor or QA to reinterpret the boundary.
  Required change:
  - Replace the incorporation with a Task 3-specific table listing the exact seven routed paths and hashes.
  - Give Task 3-specific owners, evidence, and decisions based on the exact three-profile scope.
  - Bind the Original Request Anchor, Pass A, Outcome Contract, and accepted-input manifest directly by identity/path/hash.
  - Reference Task 2 v5 only as the accepted packet-interface dependency, using its exact path and accepted composite hashes.

- [P1] The mandatory dirty-worktree launch baseline has no explicit owner or allowed repository path.
  Calibration case id: `CAL-003`, `CAL-006`
  Evidence:
  - Task 3 v4 line 28 requires creation of `TASK3_REOPENED_LAUNCH_BASELINE_V1.md` by basename only.
  - It does not assign creation/freezing to the main thread or identify an exact repository-relative write path.
  - Task 3 v3 allows producer writes only to three evaluator files and identifies main-thread persistence for boundary/review/report/QA/acceptance artifacts, but not this launch-baseline artifact.
  - The current worktree contains nine untracked remediation artifacts. No reopened launch baseline or revised Task 2 strict-PASS/report/QA/acceptance artifacts currently exist.
  Required change:
  - Assign launch-baseline creation and freezing explicitly to the main thread.
  - Specify its exact path and classify it as an authorized gate-artifact write outside producer authority.
  - Define the pre-persistence snapshot, post-persistence baseline hash, and producer/QA comparison points so the baseline cannot ambiguously inventory or authorize itself.

Contract review summary:
- The addendum closes the name, role-ledger, negative-tabletop, report-schema, Task 2 precondition, calibration, and evaluator-invariant gaps, but route incorporation and launch-baseline authority remain materially ambiguous.

Evidence reviewed:
- Task plan: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`, SHA-256 `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`
- Contract: Task 3 v3 SHA-256 `e27a3a7cc44e6239116daf768c0992bbbdefea5973f627dd360f9da9a9579855`; v4 SHA-256 `d384704b895406d91f3a7b9d5533ca06e03f1c06af39a6d9075e3bed6a22640e`
- Prior review: SHA-256 `822d2a2d9f988af128f8c64b83cbfd5334ed097ec7606e3b9921aea4ed85242a`
- Authorization: PR finding routing SHA-256 `35a9fd03de0c00dee6e507dd8bb5d7b7c2f1016f150038316b53f94185878adc` routes the accepted finding to exactly the three evaluator profiles with Task 2 carrier support.
- Current facts: branch `codex/adaptive-main-thread-orchestration`, HEAD `e5f0bb7d50231b7064595bbf716f728e5b2ad653`, `origin/main`/merge base `caf93131b6cb591644271105b1d8921459245341`; all three before-hashes, exact names, and `read-only` sandboxes match.
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-003`, `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-005`, `CAL-ADAPT-009`

Non-blocking suggestions:
- [P2] Persist a direct user-request citation or verbatim authorization anchor; the current routing artifact records that authorization occurred but does not identify its source.

Checklist:
- Matches approved task: PASS
- Scope minimal: PASS
- Allowed/protected paths explicit: FAIL
- Executor cannot redesign: FAIL
- Triggered routes explicit: FAIL
- Acceptance criteria evidence: PASS
- Safety gates: PASS
- Current-state evidence: FAIL
- Validation commands: PASS
- Semantic fidelity: FAIL
