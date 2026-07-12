# Task 4 Contract State Baseline

Identity: `adaptive-main-thread-orchestration-task-4-contract-state-baseline-20260711-v1`

Status: `FROZEN`

Created: `2026-07-11T18:25:52+08:00`

Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-adaptive-main-thread-orchestration`

This baseline freezes the Task 4 contracting state. Its final SHA-256 is bound externally by the Task 4 contract and boundary manifest to avoid recursive self-hashing.

## Branch And Delta State

```text
branch codex/adaptive-main-thread-orchestration
HEAD caf93131b6cb591644271105b1d8921459245341
origin/main caf93131b6cb591644271105b1d8921459245341
merge-base caf93131b6cb591644271105b1d8921459245341
base-ref origin/main
staged-delta <empty>
committed-origin-main-to-HEAD-delta <empty>
```

Complete `git status --short --branch --untracked-files=all`:

```text
## codex/adaptive-main-thread-orchestration...origin/main
 M .codex/agents/harness-executor.toml
 M .codex/agents/harness-plan-evaluator.toml
 M .codex/agents/harness-planner.toml
 M .codex/agents/harness-result-evaluator.toml
 M .codex/agents/harness-solution-designer.toml
 M .codex/agents/harness-solution-evaluator.toml
 M AGENTS.md
 M docs/adapters/codex-subagents.md
 M docs/agent-routing/README.md
 M docs/agent-routing/external-systems-and-secrets.md
 M docs/agent-routing/high-risk-actions.md
 M docs/agent-routing/implementation-boundary.md
 M docs/agent-routing/task-planning-scale.md
 M docs/agent-routing/validation-and-reporting.md
 M task-docs/_harness/run-directory-protocol.md
 M task-docs/_harness/semantic-fidelity-protocol.md
 M task-docs/_harness/templates/executor-report-template.md
 M task-docs/_harness/templates/orchestration-prompt-template.md
 M task-docs/_harness/templates/plan-review-template.md
 M task-docs/_harness/templates/plan-template.md
 M task-docs/_harness/templates/result-qa-template.md
 M task-docs/_harness/templates/task-contract-template.md
?? task-docs/_harness/adaptive-orchestration-protocol.md
?? task-docs/_harness/templates/context-handoff-template.md
?? task-docs/_harness/templates/task-packet-template.md
?? task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md
?? task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md
?? task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md
?? task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md
?? task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/RESULT_QA.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE.md
?? task-docs/main-thread-control-enhancement-requirements-20260711.md
```

Complete tracked working-tree `git diff --name-status`:

```text
M	.codex/agents/harness-executor.toml
M	.codex/agents/harness-plan-evaluator.toml
M	.codex/agents/harness-planner.toml
M	.codex/agents/harness-result-evaluator.toml
M	.codex/agents/harness-solution-designer.toml
M	.codex/agents/harness-solution-evaluator.toml
M	AGENTS.md
M	docs/adapters/codex-subagents.md
M	docs/agent-routing/README.md
M	docs/agent-routing/external-systems-and-secrets.md
M	docs/agent-routing/high-risk-actions.md
M	docs/agent-routing/implementation-boundary.md
M	docs/agent-routing/task-planning-scale.md
M	docs/agent-routing/validation-and-reporting.md
M	task-docs/_harness/run-directory-protocol.md
M	task-docs/_harness/semantic-fidelity-protocol.md
M	task-docs/_harness/templates/executor-report-template.md
M	task-docs/_harness/templates/orchestration-prompt-template.md
M	task-docs/_harness/templates/plan-review-template.md
M	task-docs/_harness/templates/plan-template.md
M	task-docs/_harness/templates/result-qa-template.md
M	task-docs/_harness/templates/task-contract-template.md
```

## Untracked Paths And Hashes

Every untracked file except this self-referential baseline is frozen below. This baseline path appears in the status snapshot and its final hash is supplied by the contract.

```text
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  task-docs/_harness/adaptive-orchestration-protocol.md
b0d9febe4206f9a8771252ba91e7d27a589f0f5c54ba5811ce4d683724ff1a13  task-docs/_harness/templates/context-handoff-template.md
a84164c98a5e625a0c49619e1295dee1c54b33ea2f6913d46014ec6aa7c7389a  task-docs/_harness/templates/task-packet-template.md
b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780  task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md
c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4  task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md
2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204  task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md
4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b  task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md
dcc7087f519e06772a28005160c478d87d428ba47caea7d8df4fb18194efff4e  task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md
66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md
7e7b19c9f945cfc0a805a194ae363d701ed04952a5e50574f4807b5df24cc9e2  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md
607415f1f45a58a830260b0a91cb0a1166446512e6a152911ae6385c019e912b  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md
66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md
88369047b5a9642585418f20adfb57a772a1bf4fa7dd00b7892d86cf73374d7e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md
922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
69999e508564e0fbcfc87e363d3c19083348f7aede46757f3c2990665a46ce20  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md
01b06516ad5338c2585b9e71f8c196d8d15a5fb282866315c074963a2d294db4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md
c30cca8556f4d41881a88689aab578ee4a41befb02d2b0fbb7fffabba797c62d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md
8f96f916838b891082239a88c3dc34ff6443da273d9834d6ea1feffcb91591d8  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md
493a881993a1981957795fe2db3cdfff1d36795b8730d8b8d74f73cdf6d79863  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md
0750a371c57f57e0b46dbcffe6a5bc7a29fe41d0a00e25982e6bc93de1471209  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md
7d263316d3e473e569b2ba250b6ad65d1622e9bfd4c1160172011fc4f0ffd071  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md
1f2579efe94d5785acb48997f1a268189ee91b804cf0a49e3cf96b06824b3880  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md
a30324a4821bd64defcf05934728b4e5ab3e7585e9087d10760cde0518723e83  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md
27a23d0ad9263bdf6650018a20fd9dc290caa1d8c037332caf726c8c65bba5a5  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/RESULT_QA.md
ca612894e074e3c1dea93c720d00ef0fbc9895a7bd65a7ced6b8c5b292e00ef0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
68a5f1f022d688ce5833a2f9e6f28cc9e1694f761756891632bf27ee6341996e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md
2788b747605e7a87f9de1aca3b456a44465a58ad0a6ab1966177d73d6c30fbde  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md
681008e3d39193b37372baf2b4376ac978f2edadc666ffed5fa74299def2be8d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md
c8e0d23edee0e3f0d1ce3ffa3951a9dd4b39ad9bbb731deaf7cd44a0f8a2f9c8  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md
115e8f0dc72b0da05dfacf29824e3e89d0ee87ea74db736817384d665ea60ef9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md
6e4f29c46e9731ac2186052408c7cfc4a315aa5105cf7363747b681822855e5f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md
6e9ad7a40731e7e66afd0784690740f17fc4c3183d106bdb47b15af52c67ada0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md
22950668b6c2016090af775f069015016ac39875813cb72eb45e9dc6c8282db7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f  task-docs/main-thread-control-enhancement-requirements-20260711.md
```

## Task 1-3 Accepted Implementation Paths

These 26 current path hashes were recomputed from the worktree and are protected during Task 4.

```text
e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d  AGENTS.md
a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787  docs/agent-routing/README.md
6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c  docs/agent-routing/external-systems-and-secrets.md
6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd  docs/agent-routing/high-risk-actions.md
29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c  docs/agent-routing/task-planning-scale.md
d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8  docs/agent-routing/implementation-boundary.md
6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b  docs/agent-routing/validation-and-reporting.md
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  task-docs/_harness/adaptive-orchestration-protocol.md
c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4  task-docs/_harness/semantic-fidelity-protocol.md
63c9d2e7146f899889f06de72f7e5cc321f0710614cd6528dbb779b040b89f7c  task-docs/_harness/run-directory-protocol.md
1ea9e541176853f90e45096ce62b7163f4acf27fbeb3be4f7f236d27724440a3  task-docs/_harness/templates/orchestration-prompt-template.md
a84164c98a5e625a0c49619e1295dee1c54b33ea2f6913d46014ec6aa7c7389a  task-docs/_harness/templates/task-packet-template.md
b0d9febe4206f9a8771252ba91e7d27a589f0f5c54ba5811ce4d683724ff1a13  task-docs/_harness/templates/context-handoff-template.md
2779a4fa18ea7297d6fb56258e20e7203dd4ce6570cd06e77e9fb907d3a48bdd  task-docs/_harness/templates/plan-template.md
5f012a023141f1455506a7736c0ec880e73b20e18df15c20de5255b9b44d09c9  task-docs/_harness/templates/plan-review-template.md
0b426b1cae5aae3bb62169684467168737840d3ef4359f1070ea77e0a4bc1b55  task-docs/_harness/templates/task-contract-template.md
8df582472530af51178066c598afe480355feb821e615bebbce711d068afacc1  task-docs/_harness/templates/executor-report-template.md
2ebfbcc8f24bca78be0d10bd7c4cba14d6e7f1c3e52baef07bca3a47f5994a08  task-docs/_harness/templates/result-qa-template.md
dfba74e1660c1bfe79251393993cae57ae2c7e57fabd1521d346e7789c576265  .codex/agents/harness-planner.toml
dc7dba230901c89e888a1ab845f279d24ba34915eb183947345083c9930452d8  .codex/agents/harness-plan-evaluator.toml
f772d114f7c6c19fe79c76af1b10ef05f152dbb6349625902c5c694247c27c3b  .codex/agents/harness-solution-designer.toml
8fb5bd35b8e3578de78410a1c5b2fb09789b329150b9ee6ae6c0770a163aed47  .codex/agents/harness-solution-evaluator.toml
c981644f5d6da31a623170653fcc9b9c84959062203f6347c86ca34d5722c5e7  .codex/agents/harness-executor.toml
3c3f2e562087264143b865f4834c9cb6757204c64ff5d70757361af053a0945c  .codex/agents/harness-result-evaluator.toml
a4ac4f47a02cf25c855dc2b85115596763d2584d72deddfd12261fa692d40615  docs/adapters/codex-subagents.md
b1c24d76fd08e2b160d4606919423294a89e128c78d9c606f43b4b2f9ee4f307  .codex/config.example.toml
```

## Task 4 Allowed-Path Before State

```text
bba777700d41953f08055784083e5cfb9c7bf2ab280571a656627a738c9010f3  task-docs/_harness/evaluator-calibration.md
bda51f3d4808a495b1dec80cec4da9956b47ff42bc0ef71411ff71e8209ed9e4  task-docs/_harness/templates/routing-scenario-matrix-template.md
64f528978c422d3917f7a48b4f302870fa05ea1b0caff396d5141f8dd0c4a421  README.md
196d0560a6dbd0ac57210a541c62d05f7b2e9e211ef91b7b684d87fd56bf32fc  docs/architecture.md
66e2d8a4b00bce4fc40ba010af40766e257a51a86d53f1a96a44d0a278237eaa  docs/adoption/router-refactor-runbook.md
c214d3c44838d53aabfb363a7c37813b95e810411d7f21d515dd3aaab53659f7  docs/adoption/open-source-release-checklist.md
4b72e3058de2fcff8c26c1dd7e6274367df65cd0a334e39b1f3d4033ce10c9be  examples/minimal-router/AGENTS.md
f17e3a71e3c24773167252fbe4d9b35466fae4b057e0c167f7828fb4b8c4ccc4  examples/minimal-router/README.md
ABSENT  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
```

No validator script is authorized by this baseline or the first contract iteration.

## Accepted Evidence Chains

### Task 1 history

```text
66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md
7e7b19c9f945cfc0a805a194ae363d701ed04952a5e50574f4807b5df24cc9e2  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md
607415f1f45a58a830260b0a91cb0a1166446512e6a152911ae6385c019e912b  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md
66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md
88369047b5a9642585418f20adfb57a772a1bf4fa7dd00b7892d86cf73374d7e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md
922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
69999e508564e0fbcfc87e363d3c19083348f7aede46757f3c2990665a46ce20  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md
```

### Task 2 history

```text
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md
01b06516ad5338c2585b9e71f8c196d8d15a5fb282866315c074963a2d294db4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md
c30cca8556f4d41881a88689aab578ee4a41befb02d2b0fbb7fffabba797c62d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md
8f96f916838b891082239a88c3dc34ff6443da273d9834d6ea1feffcb91591d8  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md
493a881993a1981957795fe2db3cdfff1d36795b8730d8b8d74f73cdf6d79863  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md
0750a371c57f57e0b46dbcffe6a5bc7a29fe41d0a00e25982e6bc93de1471209  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md
7d263316d3e473e569b2ba250b6ad65d1622e9bfd4c1160172011fc4f0ffd071  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md
1f2579efe94d5785acb48997f1a268189ee91b804cf0a49e3cf96b06824b3880  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md
a30324a4821bd64defcf05934728b4e5ab3e7585e9087d10760cde0518723e83  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md
27a23d0ad9263bdf6650018a20fd9dc290caa1d8c037332caf726c8c65bba5a5  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/RESULT_QA.md
ca612894e074e3c1dea93c720d00ef0fbc9895a7bd65a7ced6b8c5b292e00ef0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
```

### Task 3 history

```text
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
68a5f1f022d688ce5833a2f9e6f28cc9e1694f761756891632bf27ee6341996e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md
2788b747605e7a87f9de1aca3b456a44465a58ad0a6ab1966177d73d6c30fbde  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md
681008e3d39193b37372baf2b4376ac978f2edadc666ffed5fa74299def2be8d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md
c8e0d23edee0e3f0d1ce3ffa3951a9dd4b39ad9bbb731deaf7cd44a0f8a2f9c8  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md
115e8f0dc72b0da05dfacf29824e3e89d0ee87ea74db736817384d665ea60ef9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md
6e4f29c46e9731ac2186052408c7cfc4a315aa5105cf7363747b681822855e5f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md
6e9ad7a40731e7e66afd0784690740f17fc4c3183d106bdb47b15af52c67ada0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md
22950668b6c2016090af775f069015016ac39875813cb72eb45e9dc6c8282db7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
```

## Complete Protected-Path Inventory

Every existing repository file outside the nine Task 4 allowed paths and this baseline is frozen below.

```text
c981644f5d6da31a623170653fcc9b9c84959062203f6347c86ca34d5722c5e7  ./.codex/agents/harness-executor.toml
dc7dba230901c89e888a1ab845f279d24ba34915eb183947345083c9930452d8  ./.codex/agents/harness-plan-evaluator.toml
dfba74e1660c1bfe79251393993cae57ae2c7e57fabd1521d346e7789c576265  ./.codex/agents/harness-planner.toml
3c3f2e562087264143b865f4834c9cb6757204c64ff5d70757361af053a0945c  ./.codex/agents/harness-result-evaluator.toml
f772d114f7c6c19fe79c76af1b10ef05f152dbb6349625902c5c694247c27c3b  ./.codex/agents/harness-solution-designer.toml
8fb5bd35b8e3578de78410a1c5b2fb09789b329150b9ee6ae6c0770a163aed47  ./.codex/agents/harness-solution-evaluator.toml
b1c24d76fd08e2b160d4606919423294a89e128c78d9c606f43b4b2f9ee4f307  ./.codex/config.example.toml
632d7bd14194c580475453e823e40490ccd91303469f7e97605c21a0c3ebf7ec  ./.git
b22de8756fa3e401743a92505496ce0ddd039fe1a30aa213e5cfab25183690b9  ./.gitignore
e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d  ./AGENTS.md
a4ac4f47a02cf25c855dc2b85115596763d2584d72deddfd12261fa692d40615  ./docs/adapters/codex-subagents.md
a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787  ./docs/agent-routing/README.md
8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364  ./docs/agent-routing/current-state-evidence.md
6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c  ./docs/agent-routing/external-systems-and-secrets.md
6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd  ./docs/agent-routing/high-risk-actions.md
d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8  ./docs/agent-routing/implementation-boundary.md
29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c  ./docs/agent-routing/task-planning-scale.md
6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b  ./docs/agent-routing/validation-and-reporting.md
82b51867e009f1e4444b56b11976f381391c082e5fe542f3d9abcda4fb161b91  ./scripts/extract_agents_source.py
feba7621f2f04946c9b3eb8e3199cecf9cfb5bd4cf66b976ad3aed78b3ce1f97  ./scripts/validate_router_fixture.py
989c844e8819d493680046186df3c75fadbe38b6dfdee61662c75f13115c0dfe  ./scripts/validate_rule_preservation.py
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  ./task-docs/_harness/adaptive-orchestration-protocol.md
63c9d2e7146f899889f06de72f7e5cc321f0710614cd6528dbb779b040b89f7c  ./task-docs/_harness/run-directory-protocol.md
c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4  ./task-docs/_harness/semantic-fidelity-protocol.md
b0d9febe4206f9a8771252ba91e7d27a589f0f5c54ba5811ce4d683724ff1a13  ./task-docs/_harness/templates/context-handoff-template.md
8df582472530af51178066c598afe480355feb821e615bebbce711d068afacc1  ./task-docs/_harness/templates/executor-report-template.md
1ea9e541176853f90e45096ce62b7163f4acf27fbeb3be4f7f236d27724440a3  ./task-docs/_harness/templates/orchestration-prompt-template.md
5f012a023141f1455506a7736c0ec880e73b20e18df15c20de5255b9b44d09c9  ./task-docs/_harness/templates/plan-review-template.md
2779a4fa18ea7297d6fb56258e20e7203dd4ce6570cd06e77e9fb907d3a48bdd  ./task-docs/_harness/templates/plan-template.md
2ebfbcc8f24bca78be0d10bd7c4cba14d6e7f1c3e52baef07bca3a47f5994a08  ./task-docs/_harness/templates/result-qa-template.md
963fd2dd84963cd3e755b29dca70d668fb043bca60fc5c4d61371c829902c288  ./task-docs/_harness/templates/rule-preservation-ledger-template.md
251743fb7ce574c2dae42a35cacac034aa167e70466bad11c351979ca8aa37ff  ./task-docs/_harness/templates/solution-review-template.md
5891681d391f6559addd6b9b2c49f2800407f85ba95274c6adcdbef9224bdd7d  ./task-docs/_harness/templates/source-coverage-manifest-template.md
ec90ce20aa4153191ffaa9ff432af43da3ca09ed490c4eb56ec9ab3b7527392b  ./task-docs/_harness/templates/source-snapshot-template.md
0b426b1cae5aae3bb62169684467168737840d3ef4359f1070ea77e0a4bc1b55  ./task-docs/_harness/templates/task-contract-template.md
a84164c98a5e625a0c49619e1295dee1c54b33ea2f6913d46014ec6aa7c7389a  ./task-docs/_harness/templates/task-packet-template.md
b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780  ./task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md
c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4  ./task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md
2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204  ./task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md
4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b  ./task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md
dcc7087f519e06772a28005160c478d87d428ba47caea7d8df4fb18194efff4e  ./task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md
66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md
7e7b19c9f945cfc0a805a194ae363d701ed04952a5e50574f4807b5df24cc9e2  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md
607415f1f45a58a830260b0a91cb0a1166446512e6a152911ae6385c019e912b  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md
66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md
88369047b5a9642585418f20adfb57a772a1bf4fa7dd00b7892d86cf73374d7e  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md
922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
69999e508564e0fbcfc87e363d3c19083348f7aede46757f3c2990665a46ce20  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md
01b06516ad5338c2585b9e71f8c196d8d15a5fb282866315c074963a2d294db4  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md
c30cca8556f4d41881a88689aab578ee4a41befb02d2b0fbb7fffabba797c62d  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md
8f96f916838b891082239a88c3dc34ff6443da273d9834d6ea1feffcb91591d8  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md
493a881993a1981957795fe2db3cdfff1d36795b8730d8b8d74f73cdf6d79863  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md
0750a371c57f57e0b46dbcffe6a5bc7a29fe41d0a00e25982e6bc93de1471209  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md
7d263316d3e473e569b2ba250b6ad65d1622e9bfd4c1160172011fc4f0ffd071  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md
1f2579efe94d5785acb48997f1a268189ee91b804cf0a49e3cf96b06824b3880  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md
a30324a4821bd64defcf05934728b4e5ab3e7585e9087d10760cde0518723e83  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md
27a23d0ad9263bdf6650018a20fd9dc290caa1d8c037332caf726c8c65bba5a5  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/RESULT_QA.md
ca612894e074e3c1dea93c720d00ef0fbc9895a7bd65a7ced6b8c5b292e00ef0  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
68a5f1f022d688ce5833a2f9e6f28cc9e1694f761756891632bf27ee6341996e  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md
2788b747605e7a87f9de1aca3b456a44465a58ad0a6ab1966177d73d6c30fbde  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md
681008e3d39193b37372baf2b4376ac978f2edadc666ffed5fa74299def2be8d  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md
c8e0d23edee0e3f0d1ce3ffa3951a9dd4b39ad9bbb731deaf7cd44a0f8a2f9c8  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md
115e8f0dc72b0da05dfacf29824e3e89d0ee87ea74db736817384d665ea60ef9  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md
6e4f29c46e9731ac2186052408c7cfc4a315aa5105cf7363747b681822855e5f  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md
6e9ad7a40731e7e66afd0784690740f17fc4c3183d106bdb47b15af52c67ada0  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md
22950668b6c2016090af775f069015016ac39875813cb72eb45e9dc6c8282db7  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f  ./task-docs/main-thread-control-enhancement-requirements-20260711.md
```

Required-absent protected paths:

```text
task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
scripts/validate_adaptive_orchestration.py
```

The acceptance matrix is absent now but is an authorized Task 4 creation. The validator path remains protected absent unless a revised boundary separately proves and authorizes the plan exception.

## Contracting Decision

- Task 1, Task 2, and Task 3 are independently accepted and have no blocking finding.
- Staged and committed deltas are empty.
- Task 4 implementation has not started.
- Any unexplained status, accepted-path hash, upstream evidence-chain hash, or protected inventory mismatch stops Task 4 rather than being normalized.

