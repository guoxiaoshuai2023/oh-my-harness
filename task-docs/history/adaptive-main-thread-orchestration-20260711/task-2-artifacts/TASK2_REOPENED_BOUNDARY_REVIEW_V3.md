Identity: `adaptive-main-thread-orchestration-task-2-boundary-review-20260712-v3`

Decision: FAIL

Strict verdict: **STRICT FAIL**

Contract review summary:
- V6 correctly restores the omitted baseline evidence, but improperly authorizes the producer to modify the frozen candidate based on an unspecified defect determination.

Evidence reviewed:
- Task plan: `adaptive-main-thread-orchestration-implementation-task-plan-20260711.md`, SHA `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`
- Contract: v4 SHA `2ff1685b…`, v5 SHA `8a310e0d…`, v6 SHA `75f41092…`
- Failure decision: SHA `6e23e4e3…`
- Result QA v1: SHA `2d7208ed…`
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-ADAPT-003`

Blocking findings:
- [P1] V6 leaves semantic defect identification and repair to the producer.
  Calibration case id: `CAL-004`, `CAL-ADAPT-003`
  Evidence:
  - The failure decision establishes that T2R-AC1–AC10 passed, identifies only the pre-write baseline omission, and authorizes one focused recovery cycle.
  - V6 line 7 says it responds only to that omission and does not change semantics or scope.
  - V6 line 18 nevertheless permits the producer to modify the four frozen candidate files if it independently “finds a concrete in-boundary defect,” without specifying that defect, required change, or expected resulting bytes.
  - This contradicts the recovery-only boundary, allows the recorded candidate hashes to change, and requires the producer to make a semantic decision.
  Required change:
  - Make the four recorded candidate hashes read-only for this recovery cycle. Require verification and a fresh report/QA only. Any hash mismatch or newly perceived content defect must STOP and return to the boundary owner for a new versioned, independently reviewed boundary; the producer must not repair it under v6.

Non-blocking suggestions:
- None.

Checklist:
- Matches approved task: FAIL
- Scope minimal: FAIL
- Allowed/protected paths explicit: PASS
- Executor cannot redesign: FAIL
- Triggered routes explicit: PASS
- Acceptance criteria evidence: PASS
- Safety gates: PASS
- Current-state evidence: PASS
- Validation commands: PASS
- Semantic fidelity: FAIL
