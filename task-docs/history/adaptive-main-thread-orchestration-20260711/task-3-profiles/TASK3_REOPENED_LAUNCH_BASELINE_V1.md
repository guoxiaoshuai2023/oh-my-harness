# Task 3 Reopened Launch Baseline v1

Identity: `adaptive-main-thread-orchestration-task-3-reopened-launch-baseline-20260712-v1`

State: `FROZEN BEFORE TASK 3 PRODUCER LAUNCH`

## Git And Branch State

- Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-adaptive-main-thread-orchestration`
- Branch: `codex/adaptive-main-thread-orchestration`
- HEAD: `e5f0bb7d50231b7064595bbf716f728e5b2ad653`
- HEAD tree: `b9f303325670b56a9479a436de9477aacb244947`
- `origin/main`: `caf93131b6cb591644271105b1d8921459245341`
- Merge base: `caf93131b6cb591644271105b1d8921459245341`
- PR: `#6`
- Staged delta: `empty`
- Committed `origin/main...HEAD` patch SHA-256: `4ec5f6cd44db0dbd2b2dd528bd274b8ec3fe3bb582a68ff2df2c1fc4bedad1e7`
- Active writer: none. Task 2 QA agent was closed before this baseline was created.
- Expected Task 3 implementation delta: exactly the three evaluator profiles listed below, added to the four already accepted Task 2 template modifications.

Complete committed changed-path baseline:

```text
M	.codex/agents/harness-executor.toml
M	.codex/agents/harness-plan-evaluator.toml
M	.codex/agents/harness-planner.toml
M	.codex/agents/harness-result-evaluator.toml
M	.codex/agents/harness-solution-designer.toml
M	.codex/agents/harness-solution-evaluator.toml
A	.github/workflows/ci.yml
M	AGENTS.md
M	README.md
M	docs/adapters/codex-subagents.md
M	docs/adoption/router-refactor-runbook.md
M	docs/agent-routing/README.md
M	docs/agent-routing/external-systems-and-secrets.md
M	docs/agent-routing/high-risk-actions.md
M	docs/agent-routing/implementation-boundary.md
M	docs/agent-routing/task-planning-scale.md
M	docs/agent-routing/validation-and-reporting.md
M	docs/architecture.md
M	examples/minimal-router/AGENTS.md
A	task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
A	task-docs/_harness/adaptive-orchestration-protocol.md
M	task-docs/_harness/evaluator-calibration.md
M	task-docs/_harness/run-directory-protocol.md
M	task-docs/_harness/semantic-fidelity-protocol.md
A	task-docs/_harness/templates/context-handoff-template.md
M	task-docs/_harness/templates/executor-report-template.md
M	task-docs/_harness/templates/orchestration-prompt-template.md
M	task-docs/_harness/templates/plan-review-template.md
M	task-docs/_harness/templates/plan-template.md
M	task-docs/_harness/templates/result-qa-template.md
M	task-docs/_harness/templates/routing-scenario-matrix-template.md
M	task-docs/_harness/templates/task-contract-template.md
A	task-docs/_harness/templates/task-packet-template.md
A	task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md
A	task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md
A	task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md
A	task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md
A	task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/RESULT_QA.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-01.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-02.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-03.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-04.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-05.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-01.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-02.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-03.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-04.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-05.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-07.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE_V7.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT_V2.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/MAIN_THREAD_ACCEPTANCE_V2.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA_V2.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA_V3.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST_V7.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V7_RETRY_LEDGER_FAILURE_DECISION.md
A	task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_VERIFICATION_RESUME_BOUNDARY_V1.md
A	task-docs/main-thread-control-enhancement-requirements-20260711.md
```

## Pre-Persistence Working State

The baseline path itself was absent when this snapshot was taken and is the only expected new untracked path created by freezing this artifact.

```text
 M task-docs/_harness/templates/orchestration-prompt-template.md
 M task-docs/_harness/templates/plan-review-template.md
 M task-docs/_harness/templates/result-qa-template.md
 M task-docs/_harness/templates/task-packet-template.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_MANIFEST_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V3.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V4.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V4.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V5.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V6.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V7.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_FAILURE_DECISION_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_IMPLEMENTATION_REPORT_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_IMPLEMENTATION_REPORT_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_LAUNCH_BASELINE_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_LAUNCH_BASELINE_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_MAIN_THREAD_ACCEPTANCE_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_OPERATIONAL_ATTEMPT_01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_RESULT_QA_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_RESULT_QA_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_MANIFEST_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V3.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V3.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V4.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V5.md
```

Complete pre-persistence untracked path/hash inventory:

```text
35a9fd03de0c00dee6e507dd8bb5d7b7c2f1016f150038316b53f94185878adc  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_FINDING_ROUTING.md
70b51824396209d0e98bc2418a881c93dc1101400121b5dac6e484e3da588bd5  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_ORIGINAL.md
30721931b057a82d11535a0f46da3e4ca2b12c833c07dc6b99a74e3fd540fdfd  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_RUNTIME.md
b849ea1aa89c29d042db018e3cdd25223677907737b4103564269784f934bddd  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/USER_REOPEN_AUTHORIZATION.md
f2ad6a6a68af2f69eb3a727f068ef7f3bb5b5546c8ea94469a22b712bd15efb7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_MANIFEST_V1.md
1d6ba3af64d3cc871df3e5b5d3f609b717e536edfad30b8e7cc316cae52e1741  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V1.md
e12be4ab6874099021ae0d23417598a08b4066fdb04d1180a0751faeac928077  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V2.md
dced5686a7ae55e314924619752108862269364fbbfeba150af0c76258bd2d4e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V3.md
a43941a2374004b14563967fec0aca387308f374667ed29ea063eaca88711d65  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V4.md
2ff1685bc4a1902f8924f4769e473a2d096b08efde0f080d3fe604681ce48b77  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V4.md
8a310e0df4cdf06ace567c3f1d3b8e0fcb6e3f11955de02a641efb26299c1609  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V5.md
75f4109254ccbdec4adad4ccd3bda491bc8cc6343db7f465a44f1f9be3932aed  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V6.md
d58821b2821c42e58279f522f6b969476fd9a40ad0e1f150f7160530cdaaad52  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V7.md
6e23e4e3aa69cd18a8f1839b8eba71dc08c8ed6da41c73e9a72f8e1f904f83e4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_FAILURE_DECISION_V1.md
69a040dff454095cc32602cce5b49119f3f6207f3f66a77a1338255decff8038  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_IMPLEMENTATION_REPORT_V1.md
34cb082d7965348111fba8e38ee796226c044aaede8c316f00b58a317eb52cb3  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_IMPLEMENTATION_REPORT_V2.md
9192bfee02153e4bf0ee31640932debebe11397bbcb2e94f493bc86f663352db  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_LAUNCH_BASELINE_V1.md
6fc6773c9c998c7febf73ec39bfa163f78d413f2fcee7feedaa53f3d0c57e34a  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_LAUNCH_BASELINE_V2.md
922e4fc6d93f4eb6393010bcfaad6f6ab20c34ee47d7c6a3094ca103771d130b  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_MAIN_THREAD_ACCEPTANCE_V2.md
dfcdb5fa2c09c9b4642364d8357c618bbb95de1c6216eb05fd7aa4792eb23156  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_OPERATIONAL_ATTEMPT_01.md
2d7208edcb90b8e871c445083364b33839dfbc8ad3e8c232040c9d623bccc8d7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_RESULT_QA_V1.md
b910faa3ed6e8aca348890bfdc255eef4457251f3a0db7cc5a4e8786c01cb60e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_RESULT_QA_V2.md
4adaba0e43029b7782ab6156db02160078a6c3c4f3f004939d1ad6c9c2b12fc0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_MANIFEST_V1.md
822d2a2d9f988af128f8c64b83cbfd5334ed097ec7606e3b9921aea4ed85242a  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V1.md
2fed95e6ae5e4e65d2a76321762319f561b9582a670c3080603ffee9715ddd10  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V2.md
01d3693ac001c82293e23944efbfae87380d51f0efbbd5af2c40bd5e12b45c41  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V3.md
e27a3a7cc44e6239116daf768c0992bbbdefea5973f627dd360f9da9a9579855  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V3.md
d384704b895406d91f3a7b9d5533ca06e03f1c06af39a6d9075e3bed6a22640e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V4.md
60c7e67ff73ad1fd2d2aa756955c0f5da7dd4aa23135b271e074b30cad6c3916  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V5.md
```

Dirty-path attribution:

- The four modified templates are the accepted Task 2 candidate state.
- Every untracked path is an authorized PR-review, reopened Task 2, or reopened Task 3 gate artifact listed above.
- No unexplained path exists.
- Every tracked path outside the four accepted Task 2 templates matches the index before Task 3; the index matches HEAD because staged delta is empty.
- During Task 3, every path except the three evaluator profiles is protected and read-only. Task 2 templates remain accepted dependencies, not Task 3 write authority.

## Accepted Task 2 Precondition

```text
34cb082d7965348111fba8e38ee796226c044aaede8c316f00b58a317eb52cb3  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_IMPLEMENTATION_REPORT_V2.md
b910faa3ed6e8aca348890bfdc255eef4457251f3a0db7cc5a4e8786c01cb60e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_RESULT_QA_V2.md
922e4fc6d93f4eb6393010bcfaad6f6ab20c34ee47d7c6a3094ca103771d130b  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_MAIN_THREAD_ACCEPTANCE_V2.md
036b7da81995cd999a6d06589cd279d6fc20a052782fa495e772986cf2a4c2b4  task-docs/_harness/templates/task-packet-template.md
```

Task 2 decision: independent Result QA `STRICT PASS`; main-thread acceptance `PASS`. The accepted task-packet evaluator interface requires canonical calibration identity/path, pre-verdict consultation, and return of consulted path plus relevant case IDs or post-consultation `N/A`.

## Task 3 Composite Boundary

```text
e27a3a7cc44e6239116daf768c0992bbbdefea5973f627dd360f9da9a9579855  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V3.md
d384704b895406d91f3a7b9d5533ca06e03f1c06af39a6d9075e3bed6a22640e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V4.md
60c7e67ff73ad1fd2d2aa756955c0f5da7dd4aa23135b271e074b30cad6c3916  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V5.md
01d3693ac001c82293e23944efbfae87380d51f0efbbd5af2c40bd5e12b45c41  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V3.md
4adaba0e43029b7782ab6156db02160078a6c3c4f3f004939d1ad6c9c2b12fc0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_MANIFEST_V1.md
```

Historical Task 3 boundary reviews v1 and v2 remain FAIL evidence and are not accepted authority. The v3 review listed above is the strict PASS.

## Allowed Profile Before Hashes

Only these three paths may change:

```text
dc7dba230901c89e888a1ab845f279d24ba34915eb183947345083c9930452d8  .codex/agents/harness-plan-evaluator.toml
8fb5bd35b8e3578de78410a1c5b2fb09789b329150b9ee6ae6c0770a163aed47  .codex/agents/harness-solution-evaluator.toml
3c3f2e562087264143b865f4834c9cb6757204c64ff5d70757361af053a0945c  .codex/agents/harness-result-evaluator.toml
```

Required names remain `oh_my_harness_plan_evaluator`, `oh_my_harness_solution_evaluator`, and `oh_my_harness_result_evaluator`. Each `sandbox_mode` must remain exactly `read-only`.

## Routed And Calibration Authority

```text
e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d  AGENTS.md
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  task-docs/_harness/adaptive-orchestration-protocol.md
8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364  docs/agent-routing/current-state-evidence.md
29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c  docs/agent-routing/task-planning-scale.md
d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8  docs/agent-routing/implementation-boundary.md
6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b  docs/agent-routing/validation-and-reporting.md
c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4  task-docs/_harness/semantic-fidelity-protocol.md
62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06  task-docs/_harness/evaluator-calibration.md
```

The canonical calibration path is `task-docs/_harness/evaluator-calibration.md`, SHA `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`. It is protected and may not be edited by Task 3.

## Task 1 No-Impact Evidence

```text
922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
```

Task 1 remains accepted and is not reopened. The PR finding concerns evaluator invocation binding and reusable templates, not Task 1 control-plane authority.

## Protected Inventory Rule

All files other than the three allowed evaluator profiles are protected. This includes:

- all four accepted Task 2 templates and all Task 2 reports, QA, acceptance, boundaries, reviews, baselines, and manifests;
- Task 1 and Task 4 implementation/evidence files;
- all six-role non-evaluator profiles, adapter, config, router, protocols, calibration, docs, examples, scripts, CI, requirements, plan, and existing history artifacts;
- this launch baseline and every untracked path/hash in the pre-persistence inventory.

Protection is mechanically evidenced by the HEAD tree identity, empty staged delta, the exact four-path pre-launch unstaged delta, complete untracked hash inventory, and the rule that post-execution tracked delta may add only the three allowed evaluator paths. Any other changed path, hash mismatch, or newly unexplained untracked path is a STOP.

## Producer Validation And Stops

The producer must verify this artifact's externally supplied final SHA, every authority and before hash above, and the complete inventory before writing. It must run TOML parse/name/sandbox checks, exact three-path scope proof, per-profile binding/stop/consult/return checks, the role-intelligence/modal-force ledger, negative primary-evidence tabletop, accepted Task 2 interface walkthrough, `git diff --check`, and pre/post protected inventory comparison.

Stop without repair on any mismatch, missing Task 2 precondition, need for another path, weakened evaluator boundary, task-specific/fixed-pipeline content, external action, secret access, staging, commit, push, merge, or delegation. The producer may return only an Implementation Report response; the main thread persists gate artifacts.

