# Universal Harness Adoption Plan Review - Pass B v1

Identity: `universal-harness-adoption-plan-review-20260712-v1`

Decision: `FAIL`

Reviewer: producer-independent `oh_my_harness_plan_evaluator` invocation `019f5517-fbff-7de3-853e-76a2c6604b48`

## Inputs

- Requirements: `universal-harness-adoption-requirements-20260712-v5`, SHA-256 `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`
- Pass A: `universal-harness-adoption-plan-review-pass-a-20260712-v1`, SHA-256 `595c7519b9f607a1496df87007467acd637094a2cde89dc0266e0b8123d695cc`
- Reviewed plan: `universal-harness-adoption-implementation-plan-20260712-v1`, SHA-256 `ca3690cd529365549601fcdc0c1a8ce3898f697fbc8c4223c654cdcf665d0005`
- Canonical calibration: `task-docs/_harness/evaluator-calibration.md`, SHA-256 `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`
- Consulted calibration path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-003`, `CAL-SEM-001`, `CAL-SEM-002`, `CAL-SEM-003`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-005`, `CAL-ADAPT-009`

The reviewer independently verified the listed hashes and current repo facts. It did not implement, repair, publish, or modify the plan.

## Findings

### P1 - Evaluator Count Is Incorrect

`T1-AC7` says “all six evaluator profiles” bind calibration. The repo has six total profiles and three evaluators. Literal compliance could wrongly extend evaluator-only calibration behavior to planner, designer, or executor.

Required correction: bind installed canonical calibration for the three evaluator profiles while preserving all six profiles' distinct role boundaries.

Main-thread disposition: `ACCEPTED`.

### P1 - Lifecycle AC Coverage Is Incomplete

The candidate plan omitted direct criteria for:

- matching-version update no-op;
- install-time unmanaged `.oh-my-harness/`, unowned profile, and overlapping dirty/untracked destination conflicts;
- second backup verification before reporting success;
- obvious wrong-target state detection;
- invalid-state update/uninstall STOP behavior and install only when no unmanaged namespace conflict exists;
- force/confirmation inability to bypass every ownership, containment, and verification gate.

Main-thread disposition: `ACCEPTED`.

### P1 - Task 1/3/4 Bundle Identity Is Cyclic

Task 1 claimed a final release artifact and hashes while Task 3 could later modify mapped README/adoption sources and Task 4 could rebuild or modify package metadata. That can invalidate upstream accepted bytes without reacceptance.

Required correction: Task 1 owns the deterministic compiler, fixed map/schema/marker/package contract, and provisional determinism evidence. Task 4 alone produces the final package/inventory identity from stable accepted Task 1/2/3 inputs, without modifying upstream package metadata or production code. Expected mapped-doc changes supersede provisional payload hashes and require final Task 4 regeneration/revalidation.

Main-thread disposition: `ACCEPTED`.

### P1 - Recursive Untracked Hashing Violates Secret Safety

The candidate plan required recursively hashing every untracked file. Future untracked content may contain `.env`, credentials, or unrelated private material, so content hashing is not a generally safe preservation mechanism.

Required correction: use path/status/type metadata for unknown untracked content; hash only known, explicitly authorized, non-sensitive planning/history artifacts. Unknown overlaps with allowed writes cause STOP rather than content inspection.

Main-thread disposition: `ACCEPTED`.

### P1 - Reviewer Requires Complete V2 For Every Delivery Unit

The reviewer required every future task to use solution designer -> solution evaluator -> frozen `ACCEPTED_CONTRACT.md` -> executor -> result evaluator -> main-thread review.

Main-thread disposition: `REJECTED AS UNSUPPORTED REVIEW FINDING`.

Reason: frozen requirements v5 do not require complete v2. `AGENTS.md` and the adaptive orchestration protocol state that full v2 is required only by explicit user request or stricter policy, and may otherwise be deliberately selected only with task-specific evidence. This user explicitly required adaptive governance and prohibited mechanical full-loop use. The later HIGH-risk tasks do require versioned producer-nonmodifiable boundaries, complete triggered-control coverage, producer-independent verification, and main-thread acceptance; those gates do not mandate all six named roles.

This unsupported finding is classified as evaluator misunderstanding of topology authority and does not count as a planner quality failure. The accepted findings above independently keep the overall v1 review decision at `FAIL`.

### P2 - Command Identity Is Too Conceptual

The public package placeholder, binary, stable channel, and local archive command relationship should be fixed before Task 1 authority.

Main-thread disposition: `ACCEPTED`. The revised plan will fix local package name/binary/command forms while keeping registry ownership and actual publish external.

### P2 - Task 4 Generic Harness Write Area Is Unnecessary

Allowing Task 4 to add a reusable matrix under `task-docs/_harness/` broadens the Harness maintenance surface beyond final acceptance needs.

Main-thread disposition: `ACCEPTED`. Acceptance fixtures/evidence will remain under test/tool planning surfaces; existing protocols/templates/calibration stay protected.

## Coverage Summary

The reviewer found strong coverage for fixed bundle architecture, inventory/state separation, mapping, managed block, outer bytes, update asymmetry, containment, incomplete state, adaptive semantics, profiles, publication boundary, and AS-02/05/08/09/10/11/12. AS-06 and AS-07 need the direct AC corrections above. All twelve scenario IDs were present, but ID presence alone was not accepted as evidence.

## Failure Origin

Plan acceptance-criteria coverage and dependency/write-boundary design.

## Main-Thread Next Action

Issue plan v2 with the accepted corrections, preserve Pass A, and submit exact v2 bytes for a new strict Pass B decision. Do not begin contracting or implementation.
