# Task 2 Contract Review 01

Identity: `universal-harness-adoption-task-2-contract-review-20260712-v1`

Reviewed contract identity: `universal-harness-adoption-task-2-contract-20260712-v1`

Reviewed contract SHA-256: `78bf692372d40a853de57e7fd94139e6db7dfcc1c33141aa8ecedf9b2671915c`

Reviewer: fresh `oh_my_harness_solution_evaluator`, read-only and independent of contract production

Calibration consulted: `task-docs/_harness/evaluator-calibration.md`

Relevant calibration cases: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-001`, `CAL-ADAPT-002`, `CAL-ADAPT-003`

## Decision

`FAIL`

The contract is correctly limited to Task 2, but unresolved write-boundary, lifecycle-semantics, current-state, route-binding, and AC-evidence defects would require executor redesign or leave required outcomes unverified.

## Findings

### P1 - Package Generation Boundary

The exact write universe prohibits repository writes outside 13 named files and requires temporary output under the OS temporary directory, while `prepack` regenerates package-local `dist/bundle` and `npm pack` requires that bundle. The contract does not define a temporary package-root/staging mechanism or transient `dist/**` authority.

Required correction: freeze one executable packaging flow and exact commands, either with explicitly authorized transient repository `dist/**` plus cleanup evidence, or an exact OS-temporary staging layout containing the necessary read-only Task 1 build inputs.

Calibration: `CAL-004`.

### P1 - State, Drift, Marker, And Failure Semantics

The contract calls wrong hashes a conflict while also treating current-byte mismatch as modified managed content eligible for backup and confirmed replacement. The state description lacks complete enum/nullability/kind definitions. State-write and post-state verification failure outcomes are not fully distinguished. Damaged/lookalike marker syntax lacks a closed grammar and fixture list.

Required correction: define the complete state schema; distinguish invalid state/inventory metadata from permitted managed-content drift; define residual state/reporting for state-write and state-verification failures; freeze damaged/lookalike marker recognition and cases.

Calibration: `CAL-004`.

### P1 - Node 24 Current-State Prerequisite

The contract requires Node 24 but the ordinary PATH resolves Node `v25.9.0`, and the contract-state baseline does not identify an approved Node 24 runtime or exact invocation.

Required correction: bind a verified local Node 24 executable and exact commands, or establish an authorized provisioning prerequisite and stop condition before launch.

Calibration: `CAL-003`.

### P1 - Dirty-Worktree Preservation

The accepted plan requires path/status/type metadata for every untracked entry and secret-safe hashes for known non-sensitive artifacts. The first baseline groups untracked content by category, and unchanged `git status` cannot detect mutation of an existing untracked file.

Required correction: freeze the complete path/status/type inventory and appropriate hashes before launch, then compare it after Task 2.

Calibration: `CAL-003`.

### P1 - T2-AC3 And T2-AC12 Evidence

T2-AC3 maps only to ordering fault probes and does not directly prove complete fixed payload, exact inventory hashes, and exactly one substantive block. T2-AC12 uses an outside canary, which proves non-mutation but not absence of outside reads.

Required correction: map T2-AC3 to complete installed-tree/inventory/hash and single-block runtime evidence; map T2-AC12 to read/open/write/delete instrumentation plus the outside canary.

Calibration: `CAL-006`, `CAL-SEM-001`.

### P1 - Missing High-Risk Route

The contract declares the high-risk route untriggered although Task 2 implements and exercises replacement and deletion and the accepted plan classifies it as HIGH Operational Risk.

Required correction: bind `docs/agent-routing/high-risk-actions.md` and identify gate owner, plan/confirmation evidence, backup/recovery boundary, post-action evidence, and producer-independent decision.

Calibration: `CAL-ADAPT-002`, `CAL-ADAPT-003`.

## Checklist

| Check | Result |
| --- | --- |
| Matches approved task | PASS |
| Scope minimal | PASS |
| Allowed/protected paths explicit | FAIL |
| Executor cannot redesign | FAIL |
| Triggered routes explicit | FAIL |
| Acceptance-criteria evidence | FAIL |
| Safety gates | FAIL |
| Current-state evidence | FAIL |
| Validation commands | FAIL |
| Semantic fidelity | FAIL |

