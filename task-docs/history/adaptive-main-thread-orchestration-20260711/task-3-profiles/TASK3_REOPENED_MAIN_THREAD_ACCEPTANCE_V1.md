# Task 3 Reopened Main-Thread Acceptance v1

Identity: `adaptive-main-thread-orchestration-task-3-revision-main-thread-acceptance-20260712-v1`

Decision: `PASS`

## Accepted Evidence

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Implementation Report | `adaptive-main-thread-orchestration-task-3-revision-implementation-report-20260712-v1` | `6b043d7ee4ed9d1b3d3f611b873054da7dc288db94333ea82c0968ea6ae1b661` |
| Independent Result QA | `adaptive-main-thread-orchestration-task-3-revision-result-qa-20260712-v1` | `9838fc822cd50df1796f84a71d66d8f48fb21316101ea1bd2cb395cd96fe77fc` |

The accepted boundary is the Task 3 v3-v5 composite recorded in `TASK3_REOPENED_BOUNDARY_MANIFEST_V1.md`. Independent QA verified `T3R-AC1` through `T3R-AC8` and returned `STRICT PASS` with no P0-P3 findings.

## Main-Thread Independent Check

The main thread inspected the actual profile bytes and diff and reran Python 3.11 `tomllib`, exact name, exact `sandbox_mode = "read-only"`, required-field, staged-state, and `git diff --check` checks. It confirmed:

- all three evaluator profiles require main-thread packet-bound canonical calibration identity/path on every invocation and stop before review when invalid;
- all three consult the supplied source before deciding and return `Consulted calibration path` plus `Relevant calibration case IDs`, with `N/A` only after consultation;
- calibration selects recurring failure patterns and cannot replace primary request, plan, boundary, diff, state, command, or outcome evidence;
- plan, boundary, and result evaluator intelligence remain distinct;
- strict verdict, independence, primary evidence, no repair/redesign/execution/fabrication/self-acceptance, stop/escalation, route binding, and bounded nesting remain in force;
- no profile gained topology ownership or a fixed six-role sequence;
- Task 3's tracked implementation delta is exactly the three authorized evaluator profiles, added to the four already accepted Task 2 template changes; the index remains empty.

Accepted profile hashes:

| Path | SHA-256 |
| --- | --- |
| `.codex/agents/harness-plan-evaluator.toml` | `c8f3a0a9312a44d4cf31db5f67218fdd1bae2c55acb1dac84a88c6d6a84fba7b` |
| `.codex/agents/harness-solution-evaluator.toml` | `d71a60a53e32a56d53c6e302c3d4ac9bc8a2a33205c1d4bc1b0c4cc5da19c6d5` |
| `.codex/agents/harness-result-evaluator.toml` | `5d70ba852c7135c94fb6007340b40589a71013223fc9258f81676783f9e770ec` |

Accepted Task 2 dependency identities remain unchanged: packet `036b7da81995cd999a6d06589cd279d6fc20a052782fa495e772986cf2a4c2b4`, report `34cb082d7965348111fba8e38ee796226c044aaede8c316f00b58a317eb52cb3`, QA `b910faa3ed6e8aca348890bfdc255eef4457251f3a0db7cc5a4e8786c01cb60e`, and main-thread acceptance `922e4fc6d93f4eb6393010bcfaad6f6ab20c34ee47d7c6a3094ca103771d130b`.

Task 1 remains no-impact and is not reopened.

## Transitive Effect

The previous Task 3 acceptance is superseded only for the three evaluator calibration bindings. Task 4's prior final acceptance cannot serve as current delivery authority until the combined Task 2 template/Task 3 profile compatibility walkthrough, protected-state comparison, and producer-independent Task 4 reacceptance are rerun against these new accepted identities.

No stage, commit, push, merge, external write, secret access, or Task 4 acceptance occurred in this decision.
