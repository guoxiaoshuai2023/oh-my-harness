# Task 4 Contract Review v1

Identity: `universal-harness-adoption-task-4-contract-review-20260714-v1`

Decision: `FAIL`

## Contract Review Summary

The contract is correctly limited to Task 4 and protects Task 1-3, but it lacks mandatory delegated-route authority and weakens several required behavioral scenario proofs.

## Hash Verification

- Requirements, Plan v4, focused Plan v5, accepted planning inputs, Task 3 evidence chain, proposed contract, and canonical calibration all match the supplied SHA-256 values.
- Branch is `codex/universal-nondestructive-harness-adoption`; HEAD, `origin/main`, and merge base are all `60428957a99cf6f75d640c78cf6833576d47cc8d`.
- All listed Task 1 12/12, Task 2 14/14, and Task 3 5/5 protected hashes match.
- CI hash `b6fd776b776452ea6aba0fe98c249ab1de30b4e8e66ecaaca75e22f1a81f7180`, `package.json` hash `c1d5d7faa6a1dea906305f78f91869b8c7dd0d3d4e8e22f7f8dcd5f4aa08f2b9`, and lockfile hash `84d86095b95ad5c34529320c7bb531964f53be9025f137f17b091396400ec184` match.
- `test/acceptance/**`, `test/support/**`, and `tools/**` are currently absent as stated.

## Evidence Reviewed

- Task plan: Requirements v5; Plan v4, especially Task 4 and scenario coverage; focused Plan v5; accepted-planning-input manifest v3; Task 3 accepted evidence chain.
- Contract: `CONTRACT_ITERATION-01.md`, SHA-256 `575b9e24bb804df37b7427ece893c249873c623fdc9c643dccce5b38ae7d1820`.
- Repository evidence: AGENTS router, required routed docs, current CI, package metadata, protected hashes, branch/base, allowed-area state, and full dirty-path metadata.
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`.
- Relevant calibration case IDs: `CAL-001`, `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-001`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-009`, `CAL-ADAPT-010`.

## Blocking Findings

### P0

None.

### P1 - Missing Delegated Route And Nested-Delegation Authority

Calibration case IDs: `CAL-ADAPT-002`, `CAL-ADAPT-003`

`AGENTS.md` requires the adaptive, current-state, planning-scale, implementation-boundary, validation/reporting, and semantic-fidelity routes for this work. The adaptive protocol requires explicit runtime inheritance or exact route binding and nested-delegation authority in every packet. Plan v4 likewise requires a bounded producer under a stable boundary with triggered controls. Contract v1 moves from planning authority directly to dependencies and execution scope without route-binding or nested-delegation authority.

Required change:

- bind `AGENTS.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`, `docs/agent-routing/current-state-evidence.md`, `docs/agent-routing/task-planning-scale.md`, `docs/agent-routing/implementation-boundary.md`, `docs/agent-routing/validation-and-reporting.md`, and `task-docs/_harness/semantic-fidelity-protocol.md`;
- assign owners, evidence, and decisions for stable-boundary, current-state, semantic, validation, and independence gates;
- prohibit executor nested delegation and route selection;
- state why external/high-risk routes are not triggered by the authorized local synthetic work.

### P1 - Incomplete AS-06, AS-07, AS-08, And AS-11 Evidence

Calibration case IDs: `CAL-006`, `CAL-SEM-001`, `CAL-ADAPT-009`

The abbreviated scenario rows omit:

- AS-06 backup verification both before destructive mutation and again before success, plus prohibition on recreating a later user-deleted backup;
- AS-07 install unmanaged-namespace/profile/overlapping-dirty collisions and update newly-required-path collision;
- AS-08 reversed-marker and unowned/lookalike-marker cases and explicit no-guess/no-normalize/no-repair behavior;
- AS-11 NUL-path rejection and force/confirmation-bypass rejection.

Required change: restore these discriminating behaviors and failure signals as mandatory direct evidence under AS-06/07/08/11 and T4-AC2/T4-AC3. Scenario IDs, a generic collision, one backup hash, or a subset of marker/containment variants cannot satisfy them.

## Non-Blocking Suggestions

- P2: None.
- P3: None.

## T4-AC1 Through T4-AC11 Coverage

- `T4-AC1`: PASS - CI preservation, Node/package/lifecycle additions, Python 3.11, and no-dependency outcome are covered and achievable without package metadata changes.
- `T4-AC2`: FAIL - matrix shape is required, but several scenario definitions are semantically incomplete.
- `T4-AC3`: FAIL - direct lifecycle evidence is required, but AS-06/07/08/11 omit required discriminating behaviors.
- `T4-AC4`: PASS - AS-10 structural-PASS/outer-byte-change overall-FAIL is explicit.
- `T4-AC5`: PASS - exact write-confinement evidence without whole-repository scanning is explicit.
- `T4-AC6`: PASS - packed reference closure, six TOMLs, calibration, and all three Python helpers are covered.
- `T4-AC7`: PASS - producer-independent semantic review and structural-evidence limits are explicit.
- `T4-AC8`: PASS - two-build determinism, inventory/package identity, dry-run, and archive inspection are explicit.
- `T4-AC9`: PASS - required cross-surface command/runtime/authority/publication consistency remains outcome-level.
- `T4-AC10`: PASS - fresh whole-system Result QA and separate main-thread evidence inspection are mandatory.
- `T4-AC11`: PASS - scoped positives and direct unscoped-command negatives are explicit.

## AS-01 Through AS-12 Coverage

- Adequate: `AS-01`, `AS-02`, `AS-03`, `AS-04`, `AS-05`, `AS-09`, `AS-10`, `AS-12`.
- Incomplete: `AS-06`, `AS-07`, `AS-08`, `AS-11`, for the omissions identified above.
- None is reduced solely to a structural ID check, but the incomplete rows still permit insufficient behavior evidence.

## Allowed And Protected Authority

- Path authority: PASS. Allowed writes exactly match Plan v4: new `test/acceptance/**`, new `test/support/**`, new `tools/**`, and `.github/workflows/ci.yml`.
- Protected-state authority: PASS. Task 1 12 paths, Task 2 14 paths including package metadata, Task 3 five docs, all planning/history/Harness assets, tracked paths, and pre-existing untracked paths are protected with adequate current hashes and launch-baseline requirements.
- Delegated execution authority: FAIL because route/gate and nested-delegation authority are absent.

## Task 3 Waiver Handling

PASS. The contract truthfully preserves that Task 3 had no producer-independent Result QA, treats the waiver as a disclosed Task-3-only residual risk, and requires fresh producer-independent whole-system Task 4 QA.

## Unchecked And Uncertain Areas

- No tests, package builds, archives, lifecycle fixtures, or implementation commands were executed.
- Unknown untracked content was not opened; only path/status metadata was inspected.
- The required separate executor launch baseline and active-writer check do not yet exist.
- No external system, registry, target repository, secret, or network action was accessed.

## Failure Origin

Contract authority and contract-to-plan semantic/verifiability conversion defects. This is not a requirements gap, Plan v4 gap, implementation-choice objection, or implementation defect; Task 4 implementation has not started.

## Calibration

- Consulted calibration path: `task-docs/_harness/evaluator-calibration.md`
- Verified identity: `sha256:62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`
- Relevant case IDs: `CAL-001`, `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-001`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-009`, `CAL-ADAPT-010`

## Stop State

`STOP`. Do not freeze v1 as `ACCEPTED_CONTRACT.md`, launch an executor, or authorize Task 4 writes. Revise under a new contract identity/hash and obtain fresh strict review.
