# Task 4 Focused Repair Resume Decision

Identity: `universal-harness-adoption-task-4-focused-repair-resume-decision-20260714-v1`

Decision: `AUTHORIZE ONE FOCUSED IMPLEMENTATION AND PRODUCER-INDEPENDENT QA CYCLE`

Retry domain: `universal-harness-adoption-task-4-execution-20260714-rd1`

## Bound Failure Evidence

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Accepted contract | `universal-harness-adoption-task-4-contract-20260714-v2` | `b5b2f5e3b79afff5dad4a51c190eac3b486f409a0eafdf68956fe3620d824f5e` |
| Failed Implementation Report | `universal-harness-adoption-task-4-implementation-report-20260714-v3` | `3fe1eb9d30875683f66bc355ae49e6fedb94dca4f56b0dfc4d2cd203bdd85c6a` |
| Failed Result QA | `universal-harness-adoption-task-4-result-qa-20260714-v1` | `5a85d8e80f69bf487728a6e621585af2647cf2b5b0997ad6270e1b0f69794ffb` |
| Main-thread FAIL decision | `universal-harness-adoption-task-4-main-thread-decision-20260714-v1` | `60571da8528e5f301cae9eb835dfd8ee350c9d4baf9acf6696f5094dc5e0a9bd` |

The user accepts both P1 findings as Task 4 implementation/evidence defects contained by the existing accepted contract. Requirements, plans, accepted contract, review, Task 1-3 results, and package behavior remain unchanged and protected.

## Focused Repair Authority

The executor may modify only:

1. `test/acceptance/scenario-matrix.mjs`;
2. `test/acceptance/universal-adoption.test.mjs`;
3. `test/support/task4-fixtures.mjs`, only to remove helper code that exists solely for the rejected AS-03 evidence;
4. `tools/validate-release.mjs`.

All other paths, including `.github/workflows/ci.yml`, are read-only.

The only authorized outcomes are:

- remove AS-03 reads and hashes of unrelated target-owned content;
- prove AS-03 using lifecycle access instrumentation, exact changed-path/write-confinement evidence, and permitted `AGENTS.md` outer-byte comparison;
- run packed `validate_router_fixture.py` with the packed transformed routing-scenario matrix rather than the router itself;
- remove helper code made unused solely by those corrections;
- update directly corresponding matrix language and tests.

No new objective, feature, dependency, architecture, write path, contract interpretation, or upstream repair is authorized.

## Required Cycle

One fresh executor may implement the focused repair, rerun the complete required suite, acceptance fixtures, package validation, release validation, protected hashes, residue checks, and `git diff --check`, then return a new complete Implementation Report.

Only a complete report may proceed to one fresh producer-independent read-only Result Evaluator. The evaluator must directly verify both P1 fixes, all Task 4 ACs/scenarios, report truthfulness, package/Harness non-regression, protected state, and cleanup. If either implementation or QA fails, this retry domain immediately stops; no further automatic repair cycle is authorized.

No stage, commit, push, PR, publication, secret access, dependency installation, or external write is authorized.

