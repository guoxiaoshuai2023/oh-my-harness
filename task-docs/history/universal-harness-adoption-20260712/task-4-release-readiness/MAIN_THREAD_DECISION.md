# Task 4 Main-Thread Decision

Identity: `universal-harness-adoption-task-4-main-thread-decision-20260714-v1`

Decision: `FAIL`

## Bound Evidence

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Accepted contract | `universal-harness-adoption-task-4-contract-20260714-v2` | `b5b2f5e3b79afff5dad4a51c190eac3b486f409a0eafdf68956fe3620d824f5e` |
| V4 launch baseline | `universal-harness-adoption-task-4-executor-launch-baseline-20260714-v4` | `78c107ceb0c424e153f375b86e14ffedde5dbca734c8cd946520329a887a09be` |
| Implementation Report V3 | `universal-harness-adoption-task-4-implementation-report-20260714-v3` | `3fe1eb9d30875683f66bc355ae49e6fedb94dca4f56b0dfc4d2cd203bdd85c6a` |
| Result QA | `universal-harness-adoption-task-4-result-qa-20260714-v1` | `5a85d8e80f69bf487728a6e621585af2647cf2b5b0997ad6270e1b0f69794ffb` |

## Independent Main-Thread Review

The main thread inspected the primary requirements, contract, actual Task 4 implementation files, and evaluator evidence. Both P1 findings are supported.

### P1: AS-03 Uses Forbidden Adjacent-Content Evidence

Requirements line 408 limits non-modification evidence to write-confinement logs, exact allowed-path before/after evidence, Git changed paths where available, and `AGENTS.md` outer-byte comparison. It explicitly forbids reading or hashing unrelated target agents, skills, plugins, scripts, CI, or domain content merely to prove they were untouched.

The Task 4 matrix nevertheless names selected target-owned hashes as primary evidence. `test/acceptance/universal-adoption.test.mjs` calls `selectedPathHashes` on six adjacent target-owned files before and after lifecycle execution, and `test/support/task4-fixtures.mjs` implements that function with `readFile`. The test therefore consumes the exact content it claims remains uninspected. T4-AC2, T4-AC3, T4-AC5, and AS-03 are not satisfied.

### P1: Packed Router Helper Uses A Tautological Fixture

The accepted contract requires each packed Python helper to execute against an appropriate deterministic fixture. `tools/validate-release.mjs` writes the managed router block to a temporary `AGENTS.md` and passes that same file as both `--router` and `--fixture` to `validate_router_fixture.py`.

The helper reads both inputs and verifies router-trigger/route mention coverage in the fixture. Passing the router itself as the fixture makes the coverage check self-fulfilling and fails to validate the shipped transformed routing-scenario matrix. T4-AC6 is not satisfied.

## Acceptance Result

- T4-AC1: PASS
- T4-AC2: FAIL
- T4-AC3: FAIL
- T4-AC4: PASS
- T4-AC5: FAIL
- T4-AC6: FAIL
- T4-AC7: PASS
- T4-AC8: PASS
- T4-AC9: PASS
- T4-AC10: PASS as the producer-independent QA gate was performed; overall acceptance still fails
- T4-AC11: PASS
- AS-03: FAIL
- AS-01, AS-02, and AS-04 through AS-12: PASS, with AS-10 producing its required negative outcome

Passing mechanical suites do not override these semantic/evidence defects. The implementation report's T4-AC5 and T4-AC6 PASS claims are not accepted.

## Classification And Scope

- Requirements defect: `NO`
- Plan defect: `NO`
- Contract insufficiency: `NO`
- Upstream Task 1/2/3 defect: `NO`
- Protected-path or scope violation: `NO`
- Task 4 implementation/evidence defects inside the frozen write boundary: `YES`
- Task 4 accepted: `NO`

Task 1, Task 2, and Task 3 accepted evidence remains unaffected. The transformed product package itself passed modal-force, profile, adaptive/full-v2, target-authority, package-surface, and protected-hash review; the failures are in Task 4 acceptance evidence and release-validation implementation.

## Operational And Retry State

The single user-authorized resumed executor attempt completed and returned a report. One producer-independent quality cycle completed with strict `FAIL`. No further executor or quality cycle is authorized automatically in this turn.

Both fixes appear legally containable within the existing accepted Task 4 write boundary, so no contract revision is indicated by current evidence. A future focused repair must receive a new finite implementation/QA authorization, preserve the current candidate baseline, correct only the two supported defects, produce a new report, and undergo fresh producer-independent Result QA.

No stage, commit, push, PR, publication, registry access, secret access, dependency installation, or external write occurred.

