# Universal Harness Adoption Plan Review - Pass B v2

Identity: `universal-harness-adoption-plan-review-20260712-v2`

Decision: `FAIL`

Reviewer: producer-independent `oh_my_harness_plan_evaluator` invocation `019f5517-fbff-7de3-853e-76a2c6604b48`

## Inputs

- Requirements v5 SHA-256: `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`
- Pass A v1 SHA-256: `595c7519b9f607a1496df87007467acd637094a2cde89dc0266e0b8123d695cc`
- Prior Pass B v1 SHA-256: `224f22dfb43088c86f00b948626afad42a7e30943ebf5f9199c64fdfa1063823`
- Reviewed plan v2 SHA-256: `23ad79022c385044c6e6b34aefa35f667eb8e68a209adb42101368955cfd6c2c`
- Consulted calibration path: `task-docs/_harness/evaluator-calibration.md`
- Calibration SHA-256: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`
- Relevant calibration case IDs: `CAL-003`, `CAL-SEM-001`, `CAL-SEM-002`, `CAL-SEM-003`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-005`, `CAL-ADAPT-009`, `CAL-ADAPT-010`

## Regression Result

The reviewer confirmed that v2 fixed:

- three evaluators versus six total profiles;
- install/update no-op and collision coverage;
- backup re-verification, wrong-target, invalid-state, and force/confirmation criteria;
- acyclic provisional-versus-final package identity;
- exact local package/binary/command relationship;
- Task 4 upstream write protection;
- adaptive post-plan handoff without mandatory full v2;
- direct behavioral mapping for all twelve scenarios.

## Blocking Findings

### P1 - Two Broad Untracked-Hash Statements Contradict Secret-Safe Handling

The plan still referred to “all untracked hashes” in the current-state implementation precondition and Task 4 evidence, while its detailed dirty-worktree section correctly limited unknown untracked entries to path/type metadata and selective hashes for known authorized non-sensitive artifacts.

Main-thread disposition: `ACCEPTED`. Every occurrence will use the same metadata-only/authorized-selective-hash rule.

### P1 - Exact Backups Cannot Also Promise Secret-Free Contents

`T2-AC18` said backups contain no secret values, but a required byte-exact backup of user-modified managed content must preserve arbitrary bytes. The installer must not inspect, alter, echo, or semantically classify those bytes merely to claim secret absence.

Main-thread disposition: `ACCEPTED`. Backups will be opaque exact recovery artifacts. Secret-safety applies to disclosure, logs, state, errors, reports, and fixtures; backup verification may copy/hash the authorized managed bytes without exposing their content.

## Non-Blocking Finding

### P2 - Task 1 Cannot Claim A Runnable npm Binary Before Task 2 Owns `bin/**`

Task 1's package criterion and `npm pack` evidence implied a runnable package even though Task 2 owns the actual binary and installer implementation.

Main-thread disposition: `ACCEPTED`. Plan v3 will make Task 1 own only the deterministic bundle compiler, fixed map/schema/marker, and package contract. Task 2 will create the actual `package.json`, lockfile, `bin/**`, and lifecycle modules as one coherent package/CLI unit. Task 4 will produce the only final packed identity.

## Coverage And Failure Origin

All twelve scenarios and the semantic non-regression strategy were otherwise accepted. The architecture remains fixed-bundle and namespace/ownership driven.

Failure origin: plan safety wording and Task 1/2 package ownership boundary.

## Main-Thread Next Action

Issue plan v3 with these corrections and obtain a new strict Pass B decision. Do not begin contracting or implementation.
