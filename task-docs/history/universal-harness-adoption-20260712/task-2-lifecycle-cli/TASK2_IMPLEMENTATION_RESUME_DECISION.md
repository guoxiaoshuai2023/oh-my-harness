# Task 2 Implementation Resume Decision

Identity: `universal-harness-adoption-task-2-implementation-resume-decision-20260713-v1`

Retry domain: `universal-harness-adoption-task-2-lifecycle-contract-20260712-rd1`

Prior exhaustion: `universal-harness-adoption-task-2-exhaustion-decision-20260712-v3`

Prior exhaustion SHA-256: `1f8cccb0337632df36d0887306e5b642e9bbea14c3da1baa7ae04b66ec3346ff`

Status: `RESUMED FOR ONE FOCUSED IMPLEMENTATION/RESULT-QA CYCLE`

## Qualifying User Decision

The user confirms that Result QA v1's four P1 findings are implementation defects inside accepted Contract v5. Requirements, implementation plan, contract semantics, Task 1, Task 3/4, and the Task 2 write set do not change.

## Exclusive Repair Scope

1. Prove ownership jointly from validated install state, immutable installed inventory, and current filesystem evidence; forged in-namespace ownership and state-hash backup bypass must fail.
2. Record actual mutation immediately at rename/unlink, so later verification failure reports changed paths truthfully.
3. Route every Git metadata/object discovery read through unified instrumentation and add a discriminating negative fixture.
4. Preserve damaged marker as the terminal primary `INVALID_MANAGED_MARKER` conflict without derived `IO_UNAVAILABLE`.
5. Add only the corresponding negative regression tests.

## Authority And Budget

- Accepted contract remains `universal-harness-adoption-task-2-contract-20260712-v5`, SHA `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`.
- Result QA v1 SHA: `3603bd517fa817bca0c7422bb609fb3ec57e3ce78c7c20060c1d9ea0a9656f9f`.
- Failure routing SHA: `d9b89ebbb9fed829f33a9376b28cc7a36a9380a98d315f230fece42d5d9f3a9c`.
- One fresh executor may modify only the existing 14 Task 2 paths.
- One fresh producer-independent Result QA follows.
- Main thread independently inspects original evidence and decides acceptance.
- Contract, requirements, plan, Task 1, gate artifacts, and all non-Task-2 paths remain protected.
- No nested delegation, dependency, Task 3/4, stage, commit, push, PR, publication, registry access, secrets, or external target write.

## Stop Rule

If this cycle's Result QA is `FAIL`, the retry domain immediately returns to `EXHAUSTED`; no automatic retry or boundary expansion follows.

