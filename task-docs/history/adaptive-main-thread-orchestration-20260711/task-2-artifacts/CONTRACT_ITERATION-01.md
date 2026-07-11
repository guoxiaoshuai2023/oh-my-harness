# Execution Contract: Task 2 - Task Packets, Boundaries, Context, And Retry Artifacts

## Contract Identity

- Task identity: `adaptive-main-thread-orchestration-task-2-artifacts`
- Source plan: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`
- Contract iteration: `01`
- Stable identity: `adaptive-main-thread-orchestration-task-2-contract-20260711-v1`
- Semantic risk: `HIGH`

## Objective

Implement exactly Task 2 from the frozen plan: give the main thread reusable task-packet, stable-boundary, optional context/handoff, retry-state, report, QA, and orchestration-prompt artifacts that express the accepted adaptive authority without forcing simple work through durable ceremony.

Task 2 must not implement profile, adapter, config, calibration, adoption, README, architecture, or Task 4 integration work.

## Frozen Inputs And Accepted Upstream

| Input | Identity | Path | SHA-256 |
| --- | --- | --- | --- |
| Requirements | `adaptive-main-thread-orchestration-requirements-20260711-v4` | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` |
| Implementation plan | `adaptive-main-thread-orchestration-implementation-plan-20260711-v5` | `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md` | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` |
| Accepted planning inputs | `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md` | `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780` |
| Task 1 Implementation Report | `adaptive-main-thread-orchestration-task-1-implementation-report-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md` | `922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed` |
| Task 1 Result QA | `adaptive-main-thread-orchestration-task-1-result-qa-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md` | `3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e` |
| Task 1 main-thread acceptance | `adaptive-main-thread-orchestration-task-1-main-thread-acceptance-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md` | `a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4` |

Task 1 is accepted `PASS`. The executor may consume only the frozen Task 1 authority below as upstream behavior authority and must not reinterpret or modify it.

| Frozen Task 1 authority path | SHA-256 |
| --- | --- |
| `AGENTS.md` | `e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d` |
| `docs/agent-routing/README.md` | `a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787` |
| `docs/agent-routing/external-systems-and-secrets.md` | `6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c` |
| `docs/agent-routing/high-risk-actions.md` | `6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd` |
| `docs/agent-routing/task-planning-scale.md` | `29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c` |
| `docs/agent-routing/implementation-boundary.md` | `d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8` |
| `docs/agent-routing/validation-and-reporting.md` | `6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b` |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` |
| `task-docs/_harness/semantic-fidelity-protocol.md` | `c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4` |

## Scope And Write Authority

Allowed write paths, exclusively:

1. `task-docs/_harness/run-directory-protocol.md`
2. `task-docs/_harness/templates/orchestration-prompt-template.md`
3. `task-docs/_harness/templates/task-packet-template.md` (new)
4. `task-docs/_harness/templates/context-handoff-template.md` (new)
5. `task-docs/_harness/templates/plan-template.md`
6. `task-docs/_harness/templates/plan-review-template.md`
7. `task-docs/_harness/templates/task-contract-template.md`
8. `task-docs/_harness/templates/executor-report-template.md`
9. `task-docs/_harness/templates/result-qa-template.md`

Everything else is read-only. In particular:

- all Task 1 authority and acceptance artifacts;
- all six `.codex/agents/*.toml`, `docs/adapters/codex-subagents.md`, and `.codex/config.example.toml` are Task 3-owned concurrent paths;
- `task-docs/_harness/evaluator-calibration.md` and `task-docs/_harness/templates/solution-review-template.md`;
- README, architecture, adoption docs, examples, scripts, all other routed docs, and all frozen planning/history artifacts;
- Task 3 contract, implementation, report, and QA artifacts.

The Task 2 executor must not read Task 3 in-progress or unaccepted outputs as accepted dependencies. It may rely only on the frozen inputs and accepted Task 1 authority listed above.

## Before Baseline

- Required branch: `codex/adaptive-main-thread-orchestration`
- Required HEAD/origin/main/merge base: `caf93131b6cb591644271105b1d8921459245341`
- Required staged delta: empty
- Required committed delta `origin/main...HEAD`: empty

| Allowed path | Before state |
| --- | --- |
| `task-docs/_harness/run-directory-protocol.md` | `8daa629d5e99f788d0c01ff944437358fd0e25c59ab67d6028760ab3bdfec2c9` |
| `task-docs/_harness/templates/orchestration-prompt-template.md` | `620fd9fd9e842294288c3029b2d8a51c3ba7faa273bd481eecf81d26f66fa0a5` |
| `task-docs/_harness/templates/task-packet-template.md` | absent |
| `task-docs/_harness/templates/context-handoff-template.md` | absent |
| `task-docs/_harness/templates/plan-template.md` | `975b9b97ed5ba71c843ad389ad07f5f1ca251c65dfe4042390ae9c2cc2f91775` |
| `task-docs/_harness/templates/plan-review-template.md` | `8234aed284cd593ccb47e7f1799beb3260e53e664cacf1084281c6d6e7eee799` |
| `task-docs/_harness/templates/task-contract-template.md` | `f0129b0879ef6744e92e11ef58984c71e409fbde37b1897bbd855e0937054485` |
| `task-docs/_harness/templates/executor-report-template.md` | `252e0e73fce9eea090956e463a83545d1a66968ea031f0b92f5615ca089021bc` |
| `task-docs/_harness/templates/result-qa-template.md` | `acaadee2c9a3b1197bf00720961f2cf665acbcecc6a06f3d7d40386bdc6a53f1` |

Concurrent Task 3 changes may appear elsewhere in the worktree. They are neither Task 2 inputs nor Task 2 scope violations. Task 2 scope is proven by before/after hashes and a path-limited diff for the nine allowed paths, plus verification that the executor did not write any other path.

## Semantic And Execution Boundaries

- Original Request Anchor: frozen requirements §§1-17 and especially §§7-15.
- Pass A baseline: `adaptive-main-thread-orchestration-plan-review-pass-a-20260711-v1`, frozen through the accepted planning-input manifest.
- Outcome boundary: frozen requirements v4 plus plan v5 Task 2 outcome and T2-AC1 through T2-AC11.
- Task packets are delegation inputs and may be inline or persisted. Templates are optional artifacts, not mandatory workflow stages.
- Every delegated write attempt needs stable, citable, producer-nonmodifiable authority. Frozen/versioned escalation remains mandatory for the triggers fixed by Task 1.
- Full-v2 artifacts remain valid strong forms; adaptive support must not invalidate them.
- The executor must not decide new topology policy, weaken a triggered gate, change retry-domain semantics, or make context mandatory for simple work.

AC-pass-but-user-fail counterexample: every template contains the requested labels, but the orchestration prompt still mechanically invokes all six roles, a delegated writer can alter its own boundary, or retry counters reset when the stage name changes. Any such result is a semantic FAIL even if structural checks pass.

## Implementation Requirements

1. Verify every frozen input, Task 1 authority hash, branch invariant, allowed-path baseline, and protected state before writing; stop on mismatch.
2. Implement a task-packet template with universal mandatory fields and clearly triggered extensions, including route inheritance/binding and default no-fan-out.
3. Implement an optional context/handoff template with material-update triggers, work states, dependencies, evidence freshness, separate quality/operational counters, intervention, exhaustion, safety recovery, and controlled resume.
4. Update run protocol so stable task packets and stronger frozen/versioned contracts are both valid, with full-v2 compatibility.
5. Update orchestration prompt to select topology and gates before invocation, issue bounded packets, integrate evidence, intervene on failures, and report truthfully.
6. Narrowly align plan, plan-review, task-contract, executor-report, and result-QA templates with applicable authority rather than a universal `ACCEPTED_CONTRACT.md` lifecycle.
7. Run all AC fixtures and return the complete evidence in the Implementation Report response. Do not create the report artifact; the main thread persists it.

## Acceptance Criteria

| AC | Requirement and required evidence |
| --- | --- |
| T2-AC1 | Every delegation packet requires bounded objective, authoritative sources, scope/non-goals, permissions, expected result, evidence, stop/escalation, invocation/integration purpose, route/gate binding, and default no-fan-out. Provide a field map and incomplete-packet negative fixture. |
| T2-AC2 | Triggered extensions cover freshness, dependencies/cancellation, shared-state ownership, protected/dirty state, external systems, confirmations/recovery, semantic artifacts, assumptions/questions, review type, time limits, boundary escalation, and fully bounded nested delegation. Provide a trigger matrix. |
| T2-AC3 | Accept either proved runtime inheritance or explicit route/gate binding; reject discoverability alone. Provide two positive and one negative fixture. |
| T2-AC4 | Every delegated write has stable producer-nonmodifiable authority; escalation triggers match Task 1. Provide LOW, HIGH frozen, and mutation-stop fixtures. |
| T2-AC5 | Context is optional for simple work and complete when triggered, including all seven work states and material update events. Provide field/state map, LOW no-context case, and recoverable multi-stage transition. |
| T2-AC6 | Keep stage-local quality, retry-domain cumulative quality, and cause-specific artifact-free operational counts separate and non-resettable by relabeling. Unsupported evaluator findings do not consume producer quality count. Provide cross-stage, unsupported-review, and timeout fixtures. |
| T2-AC7 | Parallel work records owner, prerequisites, shared-state boundary, obsolete condition, and synthesis; nested delegation has executable budgets. Provide packet/context fixture. |
| T2-AC8 | Report/QA templates use the applicable authoritative boundary and preserve full-v2 compatibility. Provide comparison evidence. |
| T2-AC9 | Plan review accepts adaptive plans without a complete v2 handoff but fails missing triggered controls. Provide PASS and FAIL fixtures. |
| T2-AC10 | Stop states separate exhausted advancement from authorized safety recovery and record qualifying resume evidence plus exactly one resumed cycle/attempt. Provide recovery/resume fixtures. |
| T2-AC11 | Orchestration return contract proportionally reports topology, delegation/integration, primary evidence, omitted stages where material, unvalidated areas, blockers, and risk; it rejects fabricated activity. Provide LOW, MEDIUM/HIGH, and false-completion fixtures. |

## Validation And Evidence

Run at minimum:

```sh
git branch --show-current
git rev-parse HEAD origin/main
git merge-base HEAD origin/main
git diff --cached --name-status
git diff --name-status origin/main...HEAD
test -f task-docs/_harness/templates/task-packet-template.md
test -f task-docs/_harness/templates/context-handoff-template.md
rg -n "bounded objective|non-goals|permissions|evidence|stop|escalation|nested delegation|route|gate" task-docs/_harness/templates/task-packet-template.md
rg -n "pending|active|blocked|exhausted|completed|superseded|cancelled" task-docs/_harness/templates/context-handoff-template.md
rg -n "stage-local|retry domain|operational|qualifying|resume|safety recovery" task-docs/_harness/{run-directory-protocol.md,templates/context-handoff-template.md,templates/orchestration-prompt-template.md}
git diff --check -- task-docs/_harness/run-directory-protocol.md task-docs/_harness/templates/
```

Also perform and record:

- all T2 fixtures named above, with input, expected decision, actual decision, and failure signal;
- requirement-to-file/heading map;
- before/after hashes for all nine allowed paths;
- pre/post verification of every frozen input and Task 1 authority hash;
- scoped changed-path proof and confirmation that no Task 3 output was consumed as an accepted dependency;
- manual semantic review that templates remain optional and no replacement fixed pipeline was created.

## Stop Conditions

Stop without repair or scope expansion if:

- any frozen input, Task 1 authority, branch invariant, or allowed-path baseline mismatches;
- implementation requires a Task 3, calibration, solution-review, README, architecture, adoption, script, example, or Task 1 change;
- a template becomes mandatory ceremony or a second contradictory topology authority;
- a delegated writer can mutate its own authority or HIGH-risk work can avoid frozen/versioned boundaries;
- quality, operational, and unsupported-review failures cannot be represented distinctly;
- a Task 3 in-progress result is needed as an accepted dependency;
- secrets, external writes, dependencies, staging, commits, pushes, or PRs would be required.

## Reporting Requirements

Return one complete Implementation Report in the executor response containing identity, changed files, scope proof, T2-AC1 through T2-AC11 decisions, all maps and fixtures, commands/results, pre/post hashes, what was not validated, residual risks, blockers, and explicit confirmation that Task 3 and Task 4 were not implemented. Do not create or edit gate artifacts outside the allowed write paths.
