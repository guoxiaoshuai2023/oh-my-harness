Identity: `adaptive-main-thread-orchestration-task-2-boundary-review-20260712-v1`

Decision: FAIL

Contract review summary:
- The intended four-template scope matches the authorized Task 2 reopening, but the boundary has multiple P1 launch blockers involving route binding, semantic authority, protected-state proof, write-producing validation, and acceptance evidence.

Evidence reviewed:
- Task plan: `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md`, identity `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`, including its Outcome Contract and dirty-worktree requirements.
- Contract: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V4.md`, identity `adaptive-main-thread-orchestration-task-2-contract-20260712-v4`, verified SHA-256 `2ff1685bc4a1902f8924f4769e473a2d096b08efde0f080d3fe604681ce48b77`.
- Additional authority: requirements v4, adaptive and semantic protocols, current `AGENTS.md`, accepted planning-input manifest, `PR_REVIEW_ORIGINAL.md`, and `PR_REVIEW_FINDING_ROUTING.md`.
- Current state: branch/head matched `codex/adaptive-main-thread-orchestration` at `e5f0bb7d50231b7064595bbf716f728e5b2ad653`; all four allowed before-hashes and controlling hashes matched.
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-003`, `CAL-006`, `CAL-SEM-001`, `CAL-SEM-003`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-005`, `CAL-ADAPT-009`, `CAL-ADAPT-010`

Blocking findings:

- [P1] Triggered routed documents and gate ownership are not explicitly bound.
  Calibration case id: `CAL-ADAPT-002`, `CAL-ADAPT-003`
  Evidence:
  - The candidate’s controlling-evidence table names the adaptive protocol but does not bind `AGENTS.md`, prove runtime inheritance, or list the other triggered routes.
  - This HIGH-semantic-risk template revision triggers at least:
    - `task-docs/_harness/adaptive-orchestration-protocol.md`
    - `docs/agent-routing/current-state-evidence.md`
    - `docs/agent-routing/task-planning-scale.md`
    - `docs/agent-routing/implementation-boundary.md`
    - `docs/agent-routing/validation-and-reporting.md`
    - `task-docs/_harness/semantic-fidelity-protocol.md`
  - Saying routed documents are protected does not prove they govern execution. Route selection is therefore left for the executor to reconstruct.
  Required route:
  - Return to solution design and issue a new versioned boundary that proves inheritance or explicitly binds `AGENTS.md`, every triggered route, and each gate’s owner, evidence, and decision point.

- [P1] The HIGH-semantic-risk authority chain omits the frozen Original Request Anchor, Pass A baseline, and Outcome Contract.
  Calibration case id: `CAL-SEM-001`, `CAL-SEM-003`, `CAL-ADAPT-002`
  Evidence:
  - The candidate declares Semantic Risk `HIGH` but does not cite the accepted plan, frozen Pass A identity/path, or plan-level Outcome Contract.
  - Requirements v4 contains source language, but it does not replace the required frozen semantic comparison chain.
  - “Independent semantic review” is required, but the contract does not specify the semantic authorities that review must compare.
  Required route:
  - Bind the accepted plan and frozen semantic artifacts—or a revised run-level Outcome Contract preserving them—and require producer-independent comparison against those exact identities before acceptance.

- [P1] A required validation command writes outside the four-path authority.
  Calibration case id: `N/A`
  Evidence:
  - Line 95 requires `python3.11 -m py_compile scripts/*.py`.
  - `py_compile` creates or updates `scripts/__pycache__/*.pyc`, while scripts and every non-template implementation path are protected.
  - Deleting those artifacts afterward would itself be an unauthorized protected-path write.
  Required route:
  - Replace this with a write-free validation method in a new versioned boundary. No generated cache path may be added because direct authorization limits implementation writes to the four templates.

- [P1] Dirty-worktree and protected-path scope proof is incomplete.
  Calibration case id: `CAL-003`, `CAL-ADAPT-003`
  Evidence:
  - Current state includes pre-existing untracked PR-review artifacts, this Task 2 candidate, and the Task 3 reopened boundary.
  - The candidate records hashes for the four allowed templates and selected controlling files, but it does not freeze the complete launch `git status`, branch/head baseline, protected untracked inventory/hashes, or a comparison method that can detect mutation of already-untracked files.
  - The approved plan explicitly requires pre-task status, HEAD/merge-base, protected-directory baselines, and after-state comparison because a final diff cannot distinguish such changes.
  Required route:
  - Add a complete pre-launch changed-path/protected-state baseline and exact post-attempt comparison to the next versioned boundary.

- [P1] Outcome-level evidence for three-state behavior and preservation is underspecified.
  Calibration case id: `CAL-006`, `CAL-SEM-001`, `CAL-SEM-004`, `CAL-ADAPT-009`, `CAL-ADAPT-010`
  Evidence:
  - The validation section requires modal-force comparison and generic negative checks, but not an end-to-end application of all three changed reusable templates to `CC-DELIBERATE-FULL-V2` or an equivalent complete scenario.
  - CAL-ADAPT-010 requires the complete deliberate-selection decision and discriminating failure-signal checks, not merely wording or field presence.
  - The preservation comparison explicitly names verdict, evidence, independence, stable-boundary, and no-repair controls, but does not concretely map safety and semantic-control preservation requested by the user.
  Required route:
  - Add an AC-to-evidence map requiring a positive deliberate-full-v2 walkthrough, automatic/default/only-explicit negative cases, and a before/after force ledger covering safety, semantic, current-state, strict-verdict, independence, stable-boundary, evidence, and no-repair controls.

Non-blocking suggestions:
- None.

Checklist:
- Matches approved task: PASS
- Scope minimal: PASS
- Allowed/protected paths explicit: FAIL
- Executor cannot redesign: PASS
- Triggered routes explicit: FAIL
- Acceptance criteria evidence: FAIL
- Safety gates: FAIL
- Current-state evidence: FAIL
- Validation commands: FAIL
- Semantic fidelity: FAIL
