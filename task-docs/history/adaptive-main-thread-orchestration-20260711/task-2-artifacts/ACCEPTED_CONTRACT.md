# Execution Contract: Task 2 - Task Packets, Boundaries, Context, And Retry Artifacts

## Contract Identity

- Task identity: `adaptive-main-thread-orchestration-task-2-artifacts`
- Source plan: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`
- Contract iteration: `03`
- Stable identity: `adaptive-main-thread-orchestration-task-2-contract-20260711-v3`
- Intended frozen path after strict solution-evaluator PASS: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md`
- Semantic Risk: `HIGH`
- Operational Risk: `LOW` (local, reversible repository documentation/template writes only)

## Objective And Outcome Boundary

Implement exactly Task 2 from plan v5: give the main thread reusable task-packet, stable-boundary, optional context/handoff, retry-state, report, QA, and orchestration-prompt artifacts that express the accepted adaptive authority without forcing simple work through durable ceremony.

Preserve the frozen Original Request Anchor in requirements v4, especially “使用 harness” means adaptive main-thread governance rather than unconditional six-role execution, “subagent configuration defines how; the main-thread prompt defines what,” and “optional roles, mandatory triggered gates.” Preserve the plan-level Outcome Contract and T2-AC1 through T2-AC11 as outcome checks, not merely file-presence checks.

AC-pass-but-user-fail boundary: structural checks may all pass while the copyable prompt still mechanically invokes all six roles, a writer can mutate its own authority, a lighter topology drops a triggered gate, context becomes mandatory ceremony, unsupported reviews consume producer quality counts, or retry counts reset after relabeling. Any such result is a semantic FAIL.

The executor must not choose new topology policy, reinterpret the Anchor or Outcome Contract, weaken a triggered gate, change retry-domain semantics, choose different acceptance scenarios, or substitute implementation-only evidence for a Task 2 outcome.

## Will Do / Will Not Do

Will do:

- Add the task-packet and optional context/handoff templates.
- Update the run protocol and orchestration prompt for adaptive topology, stable authority, bounded delegation, evidence integration, finite retries, intervention, and truthful reporting.
- Narrowly align the plan, plan-review, task-contract, executor-report, and result-QA templates with an applicable stable boundary while preserving full-v2 compatibility.
- Execute and report the exact required maps, comparisons, negative cases, and manual scenarios in this contract.

Will not do:

- No Task 3 profile, adapter, or config implementation. Task 3 content reads remain prohibited; only the exact opaque hash/stat integrity reads authorized below are allowed, and they must not expose or behaviorally consume content.
- No Task 4 calibration, acceptance-matrix, routing-fixture, README, architecture, adoption, example, or script implementation.
- No Task 1 or frozen-planning revision.
- No dependency, runtime automation, staging, commit, push, PR, publish, deployment, external-system operation, secret access, cleanup, refactor, or adjacent repair.
- No durable packet/context requirement for simple direct work and no replacement fixed pipeline or seventh role.

## Serialized Execution And Launch Gate

Execution is strictly serialized:

1. Task 3's executor must finish first under its own accepted boundary.
2. Task 3 must then receive independent Result QA and main-thread acceptance.
3. All Task 3 writers and reviewers must be stopped; no other repository writer may run concurrently with Task 2.
4. Immediately before Task 2 launch, the main thread must create and freeze `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md` with stable identity `adaptive-main-thread-orchestration-task-2-executor-launch-baseline-20260711-v1`.
5. The main thread must supply the final SHA-256 of that baseline and the frozen `ACCEPTED_CONTRACT.md` in an immutable launch packet. The executor must verify both before any write and after all validation.
6. Task 2's executor runs alone. The main thread must not persist the Implementation Report or make any repository write until the executor's post-write state checks finish.

Task 3 is a sequencing and state-attribution predecessor only. It is not a Task 2 behavior dependency. The baseline may name the main-thread-accepted Task 3 changed paths and acceptance identity solely to classify pre-existing worktree state. The Task 2 executor must not open, parse, search, quote, render, or inspect diffs of Task 3 implementation files or Task 3 report/QA content, derive wording from them, validate Task 3 behavior, or rely on them to satisfy a Task 2 AC. Opaque path/status attribution and hash-only/stat integrity reads of the exact accepted Task 3 implementation paths and their exact-path binary patch stream are permitted solely to prove immutability; semantic consumption is forbidden.

### Required `EXECUTOR_LAUNCH_BASELINE.md` Content

The main thread, not the executor, must record:

- baseline identity, creation time, worktree, accepted Task 2 contract identity/path, and the contract's final SHA-256;
- Task 3 Result QA and main-thread-acceptance identities/paths/hashes as acceptance-gate attestations, without embedding Task 3 implementation content;
- the complete, deterministically sorted list of exact accepted Task 3 implementation paths and one opaque SHA-256 for the current bytes of every listed path; path hashes are integrity identities only and must not be accompanied by excerpts, parsed values, or behavioral descriptions;
- branch, `HEAD`, local `origin/main`, merge base, and exact outputs of `git status --short --branch --untracked-files=all`, `git diff --cached --name-status`, and `git diff --name-status origin/main...HEAD`;
- SHA-256 of the staged and committed binary patches, even when empty;
- one SHA-256 for the complete unstaged Task 3 binary patch stream produced by a deterministic literal command of the form `git diff --binary -- <exact accepted Task 3 path 1> ... <exact accepted Task 3 path N>`; the baseline must record the exact command with the sorted paths expanded, must not use a glob or directory shorthand, and must record only the opaque digest rather than patch content;
- complete untracked-file inventory and SHA-256 for every untracked file except the self-referential baseline itself; the baseline path must appear in the inventory with its final hash supplied by the immutable launch packet after the file is finalized;
- exact pre-write hashes/absence state for all nine Task 2 allowed paths;
- complete recursive path/hash inventories for `task-docs/_harness/`, `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/`, and `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/`;
- the explicit frozen-input, Task 1 artifact, nine-file Task 1 authority, current-state-route, calibration, and solution-review-template hashes in this contract;
- every accepted Task 1 changed path and every accepted Task 3 changed path, classified only for worktree attribution;
- a classification for every path in the full status output; no `unknown` or unexplained path is permitted;
- the assertion that no writer remains active and that Task 2 starts from this immutable snapshot.

Required launch invariants:

- Branch: `codex/adaptive-main-thread-orchestration`.
- `HEAD`, local `origin/main`, and merge base: `caf93131b6cb591644271105b1d8921459245341`.
- Staged delta: empty.
- Committed delta `origin/main...HEAD`: empty.
- All exact hashes/absence states below match.
- Every accepted Task 3 path hash and the complete exact-path unstaged binary-patch hash match the opaque identities frozen in the launch baseline.
- The only worktree changes are frozen planning/control artifacts, accepted Task 1 paths, accepted Task 3 paths, and Task 2 contracting/launch artifacts classified in the baseline.

Any mismatch, unexplained delta, concurrent writer, missing Task 3 acceptance gate, Task 3 path-hash mismatch, Task 3 exact-path patch-hash mismatch, or inability to freeze the baseline stops Task 2 without repair; Task 2 must not edit, restore, normalize, or otherwise repair Task 3 state. Before writing and after validation, the Task 2 executor is explicitly authorized to recompute only the frozen per-path SHA-256 values, file stat/path identity, and the SHA-256 of the exact deterministic Task 3 binary-patch command recorded in the baseline. It must not display or inspect the patch stream or file contents. After the executor returns and before report persistence or Result QA, the main thread must independently recompute the same per-path and patch-stream identities and require exact matches. The executor must also repeat the remaining state/inventory checks, recompute the launch-baseline and accepted-contract hashes, and prove that every delta from launch state is one of the nine allowed Task 2 path changes. A plain final diff is insufficient.

## Triggered Routes And Gates

The executor must explicitly bind and apply these routes; repository discoverability alone is insufficient:

| Route | Frozen/current identity | Triggered gate |
| --- | --- | --- |
| `AGENTS.md` | Task 1 authority hash below | Always-on router, scope, secrets, protected work, validation. |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | Task 1 authority hash below | Harness topology, packet/boundary, delegation, context, retry, synthesis, and truthful return behavior. |
| `docs/agent-routing/current-state-evidence.md` | `8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364` | Fresh pre/post worktree, target-file, protected-state, and baseline evidence. |
| `docs/agent-routing/task-planning-scale.md` | Task 1 authority hash below | `task-docs` delivery-unit scale, optional stages, mandatory gates, and no review-only task. |
| `docs/agent-routing/implementation-boundary.md` | Task 1 authority hash below | Exact nine-path write boundary, stable producer-nonmodifiable authority, no dependencies or unrelated edits. |
| `docs/agent-routing/validation-and-reporting.md` | Task 1 authority hash below | Proportional checks, independent semantic/result review, exact report content, and no fabricated claims. |
| `task-docs/_harness/semantic-fidelity-protocol.md` | Task 1 authority hash below | Anchor, Pass A/B, Outcome Contract, semantic comparison, and AC-pass-but-user-fail gate. |

`docs/agent-routing/external-systems-and-secrets.md` and `docs/agent-routing/high-risk-actions.md` are not fact-triggered: Task 2 authorizes no external system, secret operation, publish, deploy, delete, migration, permission/payment/key action, bulk write, destructive action, or irreversible action. Their accepted Task 1 hashes remain protected, but the executor must not manufacture those routes as active workflow. If such a fact appears, stop; do not activate or perform it under this contract.

## Frozen Inputs And Required Pre/Post Verification

Every row must exist at the exact path and match before the first write and after validation.

### Accepted-Planning-Input Manifest And Every Entry

| Artifact | Stable identity | Path | SHA-256 |
| --- | --- | --- | --- |
| Manifest | `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md` | `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780` |
| Requirements v4 | `adaptive-main-thread-orchestration-requirements-20260711-v4` | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` |
| Plan v5 | `adaptive-main-thread-orchestration-implementation-plan-20260711-v5` | `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md` | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` |
| Pass A | `adaptive-main-thread-orchestration-plan-review-pass-a-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md` | `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b` |
| Pass B | `adaptive-main-thread-orchestration-plan-review-20260711-v2` | `task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md` | `2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204` |

### Accepted Task 1 Artifacts

| Artifact | Stable identity | Path | SHA-256 |
| --- | --- | --- | --- |
| Implementation Report | `adaptive-main-thread-orchestration-task-1-implementation-report-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md` | `922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed` |
| Result QA | `adaptive-main-thread-orchestration-task-1-result-qa-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md` | `3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e` |
| Main-thread acceptance | `adaptive-main-thread-orchestration-task-1-main-thread-acceptance-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md` | `a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4` |

### Nine Frozen Task 1 Authority Files

| Path | SHA-256 |
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

Additional protected current-state/review inputs:

| Path | SHA-256 |
| --- | --- |
| `docs/agent-routing/current-state-evidence.md` | `8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364` |
| `task-docs/_harness/evaluator-calibration.md` | `bba777700d41953f08055784083e5cfb9c7bf2ab280571a656627a738c9010f3` |
| `task-docs/_harness/templates/solution-review-template.md` | `251743fb7ce574c2dae42a35cacac034aa167e70466bad11c351979ca8aa37ff` |

## Write Scope And Exact Before Baselines

Allowed executor write paths, exclusively:

| Path | Required launch state |
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

Every other path is read-only. Specifically protected:

- all frozen inputs, Task 1 artifacts, Task 1 authority, current-state route, calibration, and solution-review template above;
- the accepted Task 2 contract, its iterations/review, `EXECUTOR_LAUNCH_BASELINE.md`, and every pre-launch file in the Task 2 artifact directory;
- all other files under `task-docs/_harness/` and `task-docs/_harness/templates/`;
- all Task 3-owned paths (`.codex/agents/*.toml`, `docs/adapters/codex-subagents.md`, and `.codex/config.example.toml`) and all Task 3 contract/report/QA/acceptance artifacts; these are no-content-read paths except for the exact hash-only/stat integrity operations authorized by the launch baseline;
- all Task 4-owned calibration, matrix, routing-fixture, README, architecture, adoption, example, and script paths;
- all other repository files and external state.

The full recursive launch inventories are frozen protected-directory baselines. Post-state may differ under `task-docs/_harness/` only at the nine allowed paths. The Task 1 and Task 2 artifact-directory inventories must remain byte-identical during executor work. Main-thread persistence of the report occurs only after these executor checks.

## External Systems And Secrets

- External systems: none; network and external connectors are out of scope.
- External writes/readbacks: none.
- Secrets/sensitive data: do not seek, read, expose, save, or quote any secret, credential, token, cookie, localStorage, billing, payment, permission, key, or private environment value. Evidence must remain redacted.
- User confirmation: none is required for the authorized local nine-path implementation. Any action outside it requires a new contract/user decision and is not authorized here.

## Step-By-Step Execution Plan

1. Verify the frozen accepted contract and immutable launch baseline; verify serialized Task 3 acceptance, no active writer, branch/HEAD/base, empty staged/committed deltas, full status attribution, every frozen hash, every allowed baseline, complete protected-directory inventories, every opaque Task 3 path hash, and the exact-path unstaged Task 3 binary-patch hash. Stop on any mismatch and do not repair Task 3.
2. Inspect only the nine allowed target paths, the explicitly triggered authority/routes, frozen requirements/plan/Pass A/Pass B, Task 1 accepted authority/evidence, calibration, and protected solution-review template. Do not inspect Task 3 implementation content; Task 3 access is limited to opaque hash/stat recomputation using the exact frozen path list and patch command.
3. Add `task-packet-template.md` with every non-optional packet field, triggered extensions, proven-inheritance-or-explicit-binding choice, stable-boundary escalation, and explicit no-fan-out default with fully bounded authorized nesting.
4. Add `context-handoff-template.md` as optional/triggered state: required fields, seven states, dependencies/freshness, separate counters, classifications, interventions, exhaustion/blocking, safety recovery, qualifying resume evidence, and exactly one resumed cycle/attempt.
5. Update `run-directory-protocol.md` so concise stable packets and frozen/versioned contracts are both valid producer-nonmodifiable authorities; preserve `ACCEPTED_CONTRACT.md` and full-v2 artifacts as strong compatible forms; make context/report artifacts proportional.
6. Replace the orchestration prompt's fixed default with preflight goal/risk/current-state/topology/gate selection, bounded packet issuance, dependency/cancellation/synthesis control, evidence arbitration, valid-failure classification, finite retry/intervention/exhaustion/resume handling, and truthful return requirements. Preserve the exact explicit full-v2 branch fixed below.
7. Narrowly align the five remaining allowed templates with the applicable authoritative boundary: adaptive plan/review controls, optional frozen contract use, report identity/boundary fields, independent QA, Outcome AC preservation, and strict verdicts. Do not change the protected solution-review template.
8. Execute every AC fixture and all eight frozen manual scenarios below. Record exact input, expected result, actual result, evidence, forbidden behavior check, and failure signal; string presence alone is not semantic proof.
9. Run all validation and complete pre/post hash, inventory, diff, and semantic checks. Stop on unexplained state.
10. Return the exact Implementation Report content to the main thread. Do not persist it. After executor checks finish, the main thread persists and hashes it, then supplies it for independent Result QA and main-thread acceptance.

## Frozen Manual Scenario Specifications

For every scenario, the executor must instantiate the updated templates and record an evidence-backed `PASS` or `FAIL`; it must not alter these expected decisions.

| ID | Fixed input | Expected topology/state | Required gates/evidence | Forbidden behavior | Failure signal |
| --- | --- | --- | --- | --- | --- |
| `T2-MS-01 direct` | One fully specified, reversible local documentation correction; LOW Operational and Semantic Risk; no external/current-state ambiguity; mechanically verifiable. | Direct main-thread work; no delegated role, packet file, context file, contract, or Result QA artifact required. | Exact scope/protected state, smallest structural validation, direct primary-evidence inspection, truthful proportional report. | Launching roles or creating durable ceremony merely because the harness is used. | Any mandatory role/artifact, skipped validation, or fabricated delegation/review. |
| `T2-MS-02 focused-agent` | One bounded read-only repository/factual investigation where context isolation adds value and no implementation exists. | One focused capability receives a complete read-only packet; default no-fan-out; main thread inspects evidence and synthesizes. No executor/contract/result-QA lifecycle. | Mandatory packet fields, route binding, source/provenance/freshness when applicable, bounded output and stop conditions, integration purpose and cited evidence. | Mutable/uncitable prompt, nested delegation, implementation artifacts, or forwarding the result without synthesis. | Missing packet field/binding/evidence or unsynthesized/fabricated result. |
| `T2-MS-03 parallel` | Two independent read-only module investigations with disjoint scopes and no shared writes; both inform one decision. | Two branches with owners, prerequisites, distinct outputs, shared-state restrictions, obsolete/cancel conditions, and one main-thread synthesis; durable context is triggered. | Complete packets, dependency/state map, freshness, branch accounting, conflict arbitration by authority/evidence, and integrated conclusion. | Duplicate scope, shared writes, majority vote, unmanaged fan-out, ignored branch, or downstream launch before prerequisites. | Any unowned/shared work, missing obsolete condition, or no synthesis. |
| `T2-MS-04 implementation-review` | Bounded MEDIUM-risk local code change with clear requirements, fresh before state, deterministic targeted tests, and a code-correctness review need. | Main-thread stable/versioned boundary -> one focused writer -> targeted producer-independent code reviewer -> main-thread evidence review; planner and solution-designer agents omitted. | Current-state evidence, exact writes/protected state, stable producer-nonmodifiable authority, targeted tests/diff, applicable semantic artifacts, independent review, truthful omitted-stage rationale. | Writer mutates boundary, generic wrong reviewer, self-review called independent, or forced full v2. | Boundary drift, missing current-state/test/review evidence, or omitted triggered semantic/safety control. |
| `T2-MS-05 explicit-full-v2` | User explicitly requests the complete v2 loop for one approved task. | Exact six-role order: `planner` -> `plan evaluator` -> `solution designer` -> `solution evaluator` negotiation until strict PASS -> freeze the passing text as immutable `ACCEPTED_CONTRACT.md` -> `executor` -> `result evaluator` -> main-thread final review. | Each transition has owner/evidence/decision; evaluators return only strict PASS/FAIL; any P0/P1, missing AC evidence, or unverified AC is FAIL. First valid failure permits one focused revision; a second local or cumulative valid failure requires main-thread evidence inspection, classification, and changed strategy before another attempt. Implementation failure retries only under the same frozen contract; contract insufficiency returns to new versioned solution design; semantic plan/contract failure returns upstream. | Adaptive omission of a requested role, freeze before strict solution-evaluator PASS, `PASS with caveats`, executor contract edits, passive/infinite forwarding, or resetting counters across stage/boundary names. | Wrong order/transition, non-strict verdict, missing freeze, unsupported retry, third attempt without intervention, or main-thread acceptance based only on delegated PASS. |
| `T2-MS-06 cross-stage-valid-failures` | One retry domain: plan/review has valid evidence-backed failure #1 then passes after focused revision; contract/review has valid failure #2; main thread intervenes and changes strategy before further goal advancement; revised contract passes; implementation/QA has valid post-intervention failure #3. | Stage-local counts remain stage-specific; retry-domain cumulative count progresses `1 -> 2 -> 3`; intervention is recorded before work after #2; the post-intervention third valid failure sets the domain `exhausted`. An unrelated branch continues only with recorded dependency/shared-state/protected-state independence. | Producer and reviewer artifacts, decisive evidence, stable retry-domain identity, failure classifications, counter transitions, intervention and changed input, exhaustion scope, independent-branch rationale. | Counter reset by stage/task/boundary/topology rename, execution before intervention, automatic fourth attempt, freezing whole request without analysis, or renamed split around exhaustion. | Any wrong count/state, absent intervention evidence, continued affected work, or unsupported independent-branch claim. |
| `T2-MS-07 unsupported-review` | Producer output satisfies its valid boundary, but an evaluator of the wrong type issues an out-of-scope/unsupported FAIL contradicted by decisive primary evidence; it may be a third apparent FAIL string. | Main thread rejects and records the finding as evaluator misunderstanding/wrong review type, leaves producer stage-local and cumulative quality counts unchanged, corrects the review route/packet, and does not exhaust the producer. | Decisive evidence, assigned review type, rejection rationale, failure-origin classification, unchanged counters, and corrected next review path. | Counting the string as producer failure, blindly rerunning producer, accepting by confidence/vote, or silently discarding evaluator output. | Producer count increments, domain exhausts, or no evidence-backed review-path correction exists. |
| `T2-MS-08 operational-timeout` | Agent invocation times out before any reviewable artifact; one bounded same-cause retry after a transience/invocation check also times out; after intervention a third invocation under a renamed agent/tool fails from the same unresolved runtime cause. | No producer/reviewer artifact and no quality count. Cause-specific operational count progresses `1 -> 2`; intervention occurs before attempt 3; post-intervention count `3` makes the domain `blocked` if runtime availability is external, otherwise exhausts that operational path. | Runtime evidence, normalized cause ID, transience/defect check, finite count, intervention/change, same-cause proof across relabeling, blocker/exhaustion state and qualifying-resume rule. | Fabricated artifact/review/quality FAIL, automatic third attempt, cause splitting by rename, indefinite retries, or routine user-selected retry count. | Any invented artifact, quality-count change, missing intervention, reset counter, or fourth automatic attempt. |

## Acceptance Criteria And Required Evidence

| AC | Outcome requirement | Required evidence and validation |
| --- | --- | --- |
| T2-AC1 | Every delegation packet requires bounded objective, authority source, scope/non-goals, permissions, expected result, evidence, stop/escalation, invocation/integration purpose, route/gate binding, and default no-fan-out. | Field-to-requirement map plus incomplete-packet negative fixture proving omission fails. |
| T2-AC2 | Triggered extensions cover freshness, dependencies/cancellation, shared-state ownership, protected/dirty state, external systems, confirmations/recovery, semantic artifacts, assumptions/questions, review type, time limits, boundary escalation, and fully bounded nested delegation. | Trigger-to-field matrix with positive and not-triggered cases; nesting includes depth, agent count, executable budget, scope, authority, outputs, stops, and parent synthesis. |
| T2-AC3 | A packet accepts proved runtime inheritance or explicit route/gate binding and rejects discoverability alone. | Runtime-inheritance positive, explicit-binding positive, and discoverability-only FAIL fixtures. |
| T2-AC4 | Every delegated write has stable producer-nonmodifiable authority; escalation triggers exactly match Task 1 authority. | LOW stable-packet, HIGH frozen/versioned, and material-boundary-mutation STOP fixtures. |
| T2-AC5 | Context is absent for simple work and complete when continuity risk triggers it, with all seven states and material update events. | Context field/state map; `T2-MS-01` no-context case; recoverable multi-stage transitions through relevant states and updates after evidence, topology, handoff, intervention, exhaustion, and resume rather than trivial commands. |
| T2-AC6 | Stage-local quality, retry-domain cumulative quality, and cause-specific artifact-free operational counts remain separate and resist cosmetic reset; unsupported review does not consume producer quality count. | `T2-MS-06`, `T2-MS-07`, and `T2-MS-08` state-transition evidence. |
| T2-AC7 | Parallel work records owner, prerequisites, shared-state boundary, obsolete condition, and synthesis; nested delegation has executable budgets. | `T2-MS-03` packet/context plus a separate authorized-nesting positive and default-no-fan-out negative. |
| T2-AC8 | Report and QA templates cite the applicable authoritative boundary, while existing full-v2 reports remain valid. | Before/after compatibility comparison covering concise packet, frozen/versioned contract, and `T2-MS-05` full-v2 forms. |
| T2-AC9 | Plan review accepts adaptive plans without a complete-v2 handoff and still fails missing triggered controls. | Adaptive-plan strict PASS fixture and skipped-triggered-gate strict FAIL fixture; no `PASS with caveats`. |
| T2-AC10 | Stop artifacts separate exhausted advancement from separately authorized safety recovery and record qualifying resume evidence plus exactly one resumed cycle/attempt. | Recovery fixture: only pre-authorized or precisely confirmed containment/rollback under its own boundary/evidence, never goal advancement. Resume fixture: substantive decision or genuinely new independent evidence, revised diagnosis/boundary, one cycle/attempt, then restored stop state on failure. |
| T2-AC11 | The orchestration return contract proportionally reports topology, delegation/integration, primary evidence, omitted stages where material, unvalidated areas, blockers, and risk, and rejects fabricated activity. | `T2-MS-01` LOW report, `T2-MS-04` MEDIUM/HIGH delegated report, and false-completion negative fixture covering invented role, validation, review, external action, and readback. |

All maps and fixtures must identify the target file/heading, fixed input, expected decision/state, actual decision/state, primary evidence, prohibited behavior checked, and discriminating failure signal. Mechanical `rg` checks support but do not replace manual semantic judgment.

## Validation Commands And Checks

Run before writing and repeat applicable state/hash checks after validation:

```sh
git branch --show-current
git rev-parse HEAD origin/main
git merge-base HEAD origin/main
git status --short --branch --untracked-files=all
git diff --cached --name-status
git diff --name-status origin/main...HEAD
git diff --cached --binary | sha256sum
git diff --binary origin/main...HEAD | sha256sum
git ls-files --others --exclude-standard
find task-docs/_harness -type f -print0 | LC_ALL=C sort -z | xargs -0 sha256sum
find task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane -type f -print0 | LC_ALL=C sort -z | xargs -0 sha256sum
find task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts -type f -print0 | LC_ALL=C sort -z | xargs -0 sha256sum
sha256sum task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md task-docs/main-thread-control-enhancement-requirements-20260711.md task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md
sha256sum task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
sha256sum AGENTS.md docs/agent-routing/README.md docs/agent-routing/external-systems-and-secrets.md docs/agent-routing/high-risk-actions.md docs/agent-routing/task-planning-scale.md docs/agent-routing/implementation-boundary.md docs/agent-routing/validation-and-reporting.md task-docs/_harness/adaptive-orchestration-protocol.md task-docs/_harness/semantic-fidelity-protocol.md
sha256sum docs/agent-routing/current-state-evidence.md task-docs/_harness/evaluator-calibration.md task-docs/_harness/templates/solution-review-template.md
test -f task-docs/_harness/templates/task-packet-template.md
test -f task-docs/_harness/templates/context-handoff-template.md
rg -n "bounded objective|non-goals|permissions|evidence|stop|escalation|nested delegation|route|gate|inheritance" task-docs/_harness/templates/task-packet-template.md
rg -n "pending|active|blocked|exhausted|completed|superseded|cancelled" task-docs/_harness/templates/context-handoff-template.md
rg -n "stage-local|retry.domain|operational|qualifying|resume|safety recovery|intervention" task-docs/_harness/run-directory-protocol.md task-docs/_harness/templates/context-handoff-template.md task-docs/_harness/templates/orchestration-prompt-template.md
rg -n "planner|plan evaluator|solution designer|solution evaluator|ACCEPTED_CONTRACT.md|executor|result evaluator|main-thread" task-docs/_harness/templates/orchestration-prompt-template.md
git diff --check -- task-docs/_harness/run-directory-protocol.md task-docs/_harness/templates/orchestration-prompt-template.md task-docs/_harness/templates/task-packet-template.md task-docs/_harness/templates/context-handoff-template.md task-docs/_harness/templates/plan-template.md task-docs/_harness/templates/plan-review-template.md task-docs/_harness/templates/task-contract-template.md task-docs/_harness/templates/executor-report-template.md task-docs/_harness/templates/result-qa-template.md
git diff --name-only
git diff --cached --name-only
```

Also perform manually and report:

- complete nine-path diff inspection and requirement-to-file/heading map;
- all T2-AC fixtures and all eight frozen manual scenarios;
- before/after hashes for the nine allowed paths and every frozen/protected row;
- complete launch/post recursive inventory comparison, allowing differences only at the nine paths;
- executor pre/post and main-thread post-execution exact recomputation of every accepted Task 3 path SHA-256 and the SHA-256 of the complete unstaged binary patch from the literal exact-path command frozen in the launch baseline; command output must be piped directly to `sha256sum` and must not be opened, quoted, or inspected;
- Result QA independent recomputation of those same opaque per-path and patch-stream identities from the same sorted path list and exact command, with a hard FAIL on any mismatch;
- main-thread semantic comparison to requirements v4, Pass A, plan-level Outcome Contract, T2 outcome, and AC-pass-but-user-fail boundary;
- independent result-evaluator verification of every AC, actual files/diff/state, report, scenarios, and protected evidence before main-thread acceptance.

## Safety Gates And Stop Conditions

Stop immediately, make no compensating edit, and report the blocker if:

- Task 3 is not independently accepted first, any other writer is active, or Task 2 would overlap another execution;
- the accepted contract or launch baseline is missing/mismatched/mutable, or pre/post launch-baseline verification fails;
- branch/HEAD/base, staged/committed state, any frozen hash, allowed baseline, absence state, full inventory, or status attribution mismatches;
- any unexplained delta appears before, during, or after execution;
- execution requires opening, parsing, quoting, diff-inspecting, or behaviorally depending on Task 3 implementation beyond the exact authorized hash/stat operations, or changing a Task 3/Task 4/Task 1/protected path;
- any accepted Task 3 per-path hash or exact-path unstaged binary-patch hash differs at executor pre-check, executor post-check, main-thread post-execution check, or Result QA recomputation; Task 2 must stop and must not repair the mismatch;
- a required route, Anchor, Pass A, Outcome Contract, Outcome AC, or current-state fact is missing or contradictory;
- a template becomes mandatory ceremony, creates a replacement fixed pipeline, skips a triggered gate, or permits a producer to mutate authority;
- HIGH/frozen escalation, independent verification, strict verdict, retry counting, intervention, exhaustion, safety recovery, or controlled resume cannot be represented exactly;
- any scenario's expected decision is ambiguous or implementation would require the executor to redesign policy;
- a dependency, secret/sensitive access, external action, high-impact action, staging, commit, push, PR, or out-of-scope write would be needed.

No user confirmation is needed for the exact local write scope. Any boundary change is a stop and return to solution design/main thread; the executor must not ask to broaden scope during the attempt.

## Reporting And Persistence Requirements

The executor must return, but must not write, one complete report with:

- Report identity: `adaptive-main-thread-orchestration-task-2-implementation-report-20260711-v1`.
- Required persistence path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md`.
- Contract and launch-baseline identities/paths/final hashes.
- Serialized Task 3 acceptance attestation; the exact accepted Task 3 path list; launch, executor pre/post, and main-thread post-execution opaque path/patch hashes; and explicit confirmation that no Task 3 content was opened, parsed, quoted, diff-inspected, or used as a behavior dependency.
- Changed files, exact before/after hashes, nine-path diff, full scope/protected-inventory proof, and unexplained-delta result.
- Triggered routes/gates and external/high-risk not-triggered classification.
- T2-AC1 through T2-AC11 decisions with all required maps, comparisons, fixtures, and primary evidence.
- All eight manual scenarios with fixed input, expected and actual topology/state, gates/evidence, forbidden behavior result, and failure signal.
- Validation commands/results, semantic review, what was not validated, blockers, and residual risks.
- Explicit confirmation that Task 3 and Task 4 were not implemented, no Task 3 implementation content was consumed, and no external action/secret/dependency/stage/commit/push/PR occurred.

After the executor has returned and all executor post-state checks are complete, the main thread must first independently recompute every frozen Task 3 path hash and the exact-path unstaged binary-patch hash and stop on any mismatch. It must then persist that exact response at the required path, compute its SHA-256, and freeze it before Result QA. Persistence is a main-thread gate action outside executor write authority; the main thread must not alter report substance. Result QA must independently recompute the same opaque Task 3 per-path and patch-stream identities using the baseline's sorted path list and exact literal command, then inspect primary evidence and every T2 AC. Because Semantic Risk is HIGH, producer self-review is insufficient and main-thread final acceptance must consume an independent semantic PASS. Do not report Task 2 complete from the executor response alone.
