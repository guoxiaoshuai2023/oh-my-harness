# Task 2 Result QA Failure Routing

Identity: `universal-harness-adoption-task-2-result-qa-failure-routing-20260712-v1`

Retry domain: `universal-harness-adoption-task-2-lifecycle-contract-20260712-rd1`

Status: `IMPLEMENTATION RESULT NOT ACCEPTED`

## Bound Evidence

- Accepted contract: `universal-harness-adoption-task-2-contract-20260712-v5`, SHA `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`
- Implementation Report: `universal-harness-adoption-task-2-implementation-report-20260712-v1`, SHA `367496aa77835c4ca2ef7ee2792186453f6cd129473ddec423f5817d420c87b2`
- Result QA: `universal-harness-adoption-task-2-result-qa-20260712-v1`, SHA `3603bd517fa817bca0c7422bb609fb3ec57e3ce78c7c20060c1d9ea0a9656f9f`
- Result QA decision: `FAIL`

## Main-Thread Finding Assessment

All four P1 findings are accepted as requirements/safety defects, not implementation preferences:

1. **State/inventory ownership reconciliation:** `parseInstallState` admits arbitrary `.oh-my-harness/*` ownership, and update/uninstall do not prove the exact state path/kind/released-hash set against the immutable old inventory. This can delete target-owned content and bypass modified-content backup. It violates T2-AC9, T2-AC11, and T2-AC15.
2. **Mutation truthfulness:** atomic rename can succeed before verification fails, while changed-path bookkeeping occurs only after the helper returns. The report can call a changed path unchanged, violating T2-AC16.
3. **Discovery instrumentation:** recursive Git object inspection uses raw filesystem reads without observer evidence. The existing test cannot prove T2-AC1's claimed access boundary.
4. **Marker conflict truthfulness:** marker parsing throws a plain error that is remapped to `IO_UNAVAILABLE`, producing a false extra conflict beside `INVALID_MANAGED_MARKER`. This violates T2-AC2's closed truthful plan.

All defects are inside the frozen Task 2 objective and existing 14-file write boundary. No requirements, plan, Task 1, Task 3/4, documentation, CI, profile, protocol, dependency, publication, or external-write change is needed.

## Split Assessment

Task 2 should **not** be split into separately acceptable delivery units for these findings.

Reason: ownership reconciliation, backup planning, mutation reporting, discovery evidence, and marker conflict mapping are coupled lifecycle safety invariants. A partial unit cannot be independently accepted without leaving install/update/uninstall unsafe, and all corrections share the same state/lifecycle/filesystem/tests boundary. Splitting would increase handoff and partial-acceptance risk without isolating a user-valued result.

A future authorized attempt should instead be one focused implementation revision under the unchanged accepted contract, limited to:

- exact old-state versus immutable-old-inventory reconciliation and two negative fixtures;
- mutation bookkeeping at rename/unlink or final filesystem readback plus post-mutation failure fixtures;
- complete Git metadata observer instrumentation and a discriminating special-object fixture;
- lifecycle-typed marker errors and exact conflict-array fixture.

## Scope And No-Impact

- The 14 candidate implementation files remain as rejected working state; they are not rolled back and are not accepted.
- Task 1 accepted files/evidence remain unchanged and valid.
- No real downstream repo, registry, external system, or secret was accessed.
- Task 3 and Task 4 remain not started.
- No stage, commit, push, PR, or publication occurred.

