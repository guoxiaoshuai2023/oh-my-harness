# Task 3 Result QA

Identity: `universal-harness-adoption-task-3-result-qa-20260713-v1`

Decision: `FAIL`

Implementation Verification: `FAIL`

Semantic Validation: `PASS`

## Inputs And Scope

Accepted Contract, boundary manifest, executor baseline, Implementation Report, QA launch baseline, requirements, Plan v4, accepted planning inputs, Task 1 chain, Task 2 chain, contract-state baseline, all candidate hashes, all 12 Task 1 hashes, all 14 Task 2 hashes, and 12 protected-authority hashes independently matched.

The exact implementation delta is the five authorized paths:

1. `README.md`
2. `docs/architecture.md`
3. `docs/adapters/codex-subagents.md`
4. `docs/adoption/universal-harness-adoption-runbook.md`
5. `docs/adoption/bundle-lifecycle-spec.md`

The first three are mapped bundle sources; the two new adoption docs are correctly release-repository-only. The bundle map was unchanged. The Implementation Report was truthful.

## Acceptance Criteria

| AC | Result | Independent evidence |
| --- | --- | --- |
| T3-AC1 | PASS | Scoped install/update/uninstall and local archive forms are primary; manual/unscoped forms appear only as invalid guidance; generated README has no legacy copy commands. |
| T3-AC2 | PASS | Architecture separates map, inventory, code, state, block, target, backup, fixture, and docs authority. |
| T3-AC3 | PASS | Six exact source/installed pairs, role boundaries, and generated evaluator calibration bindings verified. |
| T3-AC4 | PASS | Spec covers immutable inventory, non-self-hashing state, exact ownership, asymmetric update, marker, containment, and state-last uninstall. |
| T3-AC5 | PASS | Runbook covers summary/confirmation, backups, cleanup, nine conflicts, no-op, incomplete state, and truthful stops. |
| T3-AC6 | PASS | Adaptive default, required/deliberate full v2, main-thread authority, mandatory gates, finite intervention, and no seventh agent retain force. |
| T3-AC7 | PASS | Structural evidence is not semantic proof; material authority conflict requires `STOP`. |
| T3-AC8 | PASS | Local evidence is separated from license, npm scope, credentials, signing, publication, release, and external authority. |
| T3-AC9 | PASS | Node `>=24 <25`/stdlib lifecycle, Python 3.11 helper-only, and all three required helpers are explicit. |

No modal-force downgrade, authority substitution, identity conflation, fixed-pipeline redefinition, or structural-evidence overclaim was found.

## Validation

- Exact CLI usage: PASS; Node `v24.14.0`, exit `2`, empty stdout, exact LF-terminated usage stderr.
- Manual/unscoped negatives, links 3/3, fixed paths, generated 44-file bundle, six profiles, calibration binding, and 3/2 mapped split: PASS.
- `npm run validate:package`: PASS; status `0`, primary `0`, cleanup failure `false`, 53 archive entries, lifecycle smoke all status `0`.
- `git diff --check`: PASS.
- `npm test`: FAIL, 59/60.
- Isolated `support README rewrites both bare source paths` test: FAIL, 0/1 at `test/bundle/compiler.test.mjs:82`.

The protected test requires the generated README to contain two manual-copy commands. T3-AC1 requires replacing that guidance. A content-only PASS cannot override this required validation failure.

## Failure Origin

Primary origin: `frozen Plan v4 delivery-ownership gap`.

- Candidate implementation defect: no; restoring copy commands violates T3-AC1.
- Contract v3 defect: no; it correctly freezes five docs, protects tests, validates the suite, and stops on contradiction.
- Task 1 was not defective against its provisional pre-Task-3 state; the physical assertion became stale only after the planned Task 3 transition.
- Plan v4 requires Task 3 to remove manual-copy guidance, protects Task 1/2 tests during Task 3, and protects accepted Task 1/2 files during Task 4. It assigns no delivery boundary that may reconcile the stale assertion.

The smallest owner is a revised planning-level delivery-ownership decision. Task 3 executor and Task 4 may not implicitly repair the protected test.

## Finding

### [P1] Required dependency validation remains red with no authorized owner

Calibration case: `CAL-002`.

Reproduction:

- `npm test`
- `node --test --test-name-pattern='support README rewrites both bare source paths' test/bundle/compiler.test.mjs`

Required action: return to planning-level ownership; do not reintroduce forbidden manual-copy guidance or expand Task 3/4 authority implicitly.

## Protected And External State

- HEAD/origin/main/merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`.
- Staged/committed delta: empty.
- Protected untracked count/digest: 132 / `4516a778a0cddfa012d201fbad66ca6c877b1376b91030cd106bf151de2c0f0a`.
- Task 1: 12/12; Task 2: 14/14; protected authorities: 12/12.
- No package/cache/temp residue, secrets, registry access, publication, stage, commit, push, PR, or external write.

Calibration consulted: `task-docs/_harness/evaluator-calibration.md`; cases `CAL-001`, `CAL-002`, `CAL-003`, `CAL-006`, `CAL-SEM-004`, `CAL-ADAPT-009`, `CAL-ADAPT-010`.

## Overall Decision

All nine content ACs and semantic boundaries pass, but strict Task 3 acceptance is illegal while required validation is red.

Decision: `FAIL`.
