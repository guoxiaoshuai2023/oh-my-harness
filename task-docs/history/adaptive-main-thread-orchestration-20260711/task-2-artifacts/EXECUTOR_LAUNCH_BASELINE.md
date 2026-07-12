# Task 2 Executor Launch Baseline

Identity: `adaptive-main-thread-orchestration-task-2-executor-launch-baseline-20260711-v1`

Status: `FROZEN`

Created: `2026-07-11T17:08:34+08:00`

Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-adaptive-main-thread-orchestration`

Accepted Task 2 contract: `adaptive-main-thread-orchestration-task-2-contract-20260711-v3`

Accepted contract path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md`

Accepted contract SHA-256: `fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7`

This baseline's final SHA-256 is supplied externally in the immutable executor launch packet.

## Orchestration And Dependency State

- Task 3 Result QA: `adaptive-main-thread-orchestration-task-3-result-qa-20260711-v1`, path `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md`, SHA-256 `6e9ad7a40731e7e66afd0784690740f17fc4c3183d106bdb47b15af52c67ada0`.
- Task 3 main-thread acceptance: `adaptive-main-thread-orchestration-task-3-main-thread-acceptance-20260711-v1`, path `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md`, SHA-256 `6e4f29c46e9731ac2186052408c7cfc4a315aa5105cf7363747b681822855e5f`.
- Task 3 is accepted only as a sequencing/state-attribution predecessor. Its content is not a Task 2 behavior dependency.
- No writer remains active. Task 2 is the only authorized implementation task.
- Task 4 remains blocked.

## Branch And Delta Snapshot

```text
branch codex/adaptive-main-thread-orchestration
HEAD caf93131b6cb591644271105b1d8921459245341
origin/main caf93131b6cb591644271105b1d8921459245341
merge-base caf93131b6cb591644271105b1d8921459245341
base-ref origin/main
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
 M task-docs/_harness/semantic-fidelity-protocol.md
?? task-docs/_harness/adaptive-orchestration-protocol.md
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
?? task-docs/main-thread-control-enhancement-requirements-20260711.md
```

Complete tracked working-tree name-status:

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
M	task-docs/_harness/semantic-fidelity-protocol.md
```

Staged name-status: `<empty>`.

Committed `origin/main...HEAD` name-status: `<empty>`.

- Staged binary patch SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`
- Committed binary patch SHA-256: `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`

## Status Classification

Every path in the full status snapshot is classified; there are no unknown paths.

```text
 M .codex/agents/harness-executor.toml | accepted Task 3 implementation
 M .codex/agents/harness-plan-evaluator.toml | accepted Task 3 implementation
 M .codex/agents/harness-planner.toml | accepted Task 3 implementation
 M .codex/agents/harness-result-evaluator.toml | accepted Task 3 implementation
 M .codex/agents/harness-solution-designer.toml | accepted Task 3 implementation
 M .codex/agents/harness-solution-evaluator.toml | accepted Task 3 implementation
 M AGENTS.md | accepted Task 1 implementation
 M docs/adapters/codex-subagents.md | accepted Task 3 implementation
 M docs/agent-routing/README.md | accepted Task 1 implementation
 M docs/agent-routing/external-systems-and-secrets.md | accepted Task 1 implementation
 M docs/agent-routing/high-risk-actions.md | accepted Task 1 implementation
 M docs/agent-routing/implementation-boundary.md | accepted Task 1 implementation
 M docs/agent-routing/task-planning-scale.md | accepted Task 1 implementation
 M docs/agent-routing/validation-and-reporting.md | accepted Task 1 implementation
 M task-docs/_harness/semantic-fidelity-protocol.md | accepted Task 1 implementation
?? task-docs/_harness/adaptive-orchestration-protocol.md | accepted Task 1 implementation
?? task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md | frozen planning/control artifact
?? task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md | frozen planning/control artifact
?? task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md | frozen planning/control artifact
?? task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md | frozen planning/control artifact
?? task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md | frozen planning/control artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md | accepted Task 1 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md | Task 2 contracting/launch gate artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md | accepted Task 3 contract/report/QA/acceptance artifact
?? task-docs/main-thread-control-enhancement-requirements-20260711.md | frozen planning/control artifact
```

## Accepted Task 3 Opaque Integrity Identities

Deterministically sorted exact paths and current-byte SHA-256 values:

```text
c981644f5d6da31a623170653fcc9b9c84959062203f6347c86ca34d5722c5e7  .codex/agents/harness-executor.toml
dc7dba230901c89e888a1ab845f279d24ba34915eb183947345083c9930452d8  .codex/agents/harness-plan-evaluator.toml
dfba74e1660c1bfe79251393993cae57ae2c7e57fabd1521d346e7789c576265  .codex/agents/harness-planner.toml
3c3f2e562087264143b865f4834c9cb6757204c64ff5d70757361af053a0945c  .codex/agents/harness-result-evaluator.toml
f772d114f7c6c19fe79c76af1b10ef05f152dbb6349625902c5c694247c27c3b  .codex/agents/harness-solution-designer.toml
8fb5bd35b8e3578de78410a1c5b2fb09789b329150b9ee6ae6c0770a163aed47  .codex/agents/harness-solution-evaluator.toml
b1c24d76fd08e2b160d4606919423294a89e128c78d9c606f43b4b2f9ee4f307  .codex/config.example.toml
a4ac4f47a02cf25c855dc2b85115596763d2584d72deddfd12261fa692d40615  docs/adapters/codex-subagents.md
```

Exact unstaged binary-patch command:

```sh
git diff --binary -- .codex/agents/harness-executor.toml .codex/agents/harness-plan-evaluator.toml .codex/agents/harness-planner.toml .codex/agents/harness-result-evaluator.toml .codex/agents/harness-solution-designer.toml .codex/agents/harness-solution-evaluator.toml .codex/config.example.toml docs/adapters/codex-subagents.md | shasum -a 256
```

Opaque command-result SHA-256: `5fe4c13862ae87c379fca3f11903225a26ec32f9561fc2362729483ff218ad25`.

The executor may recompute only these per-path hashes, stat/path identities, and this exact patch-stream hash. It must pipe patch output directly to the hash command and must not open, parse, search, quote, render, inspect, or behaviorally consume Task 3 content. Any mismatch stops Task 2 without repair. The main thread and Result QA must independently recompute the same identities after Task 2.

## Untracked Inventory

Every untracked file except this self-referential baseline is frozen below. The immutable launch packet supplies this baseline's final SHA-256.

```text
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  task-docs/_harness/adaptive-orchestration-protocol.md
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

## Task 2 Allowed-Path Before State

```text
8daa629d5e99f788d0c01ff944437358fd0e25c59ab67d6028760ab3bdfec2c9  task-docs/_harness/run-directory-protocol.md
620fd9fd9e842294288c3029b2d8a51c3ba7faa273bd481eecf81d26f66fa0a5  task-docs/_harness/templates/orchestration-prompt-template.md
975b9b97ed5ba71c843ad389ad07f5f1ca251c65dfe4042390ae9c2cc2f91775  task-docs/_harness/templates/plan-template.md
8234aed284cd593ccb47e7f1799beb3260e53e664cacf1084281c6d6e7eee799  task-docs/_harness/templates/plan-review-template.md
f0129b0879ef6744e92e11ef58984c71e409fbde37b1897bbd855e0937054485  task-docs/_harness/templates/task-contract-template.md
252e0e73fce9eea090956e463a83545d1a66968ea031f0b92f5615ca089021bc  task-docs/_harness/templates/executor-report-template.md
acaadee2c9a3b1197bf00720961f2cf665acbcecc6a06f3d7d40386bdc6a53f1  task-docs/_harness/templates/result-qa-template.md
ABSENT  task-docs/_harness/templates/task-packet-template.md
ABSENT  task-docs/_harness/templates/context-handoff-template.md
```

Only these nine paths may change under Task 2.

## Recursive Protected Inventories

### task-docs/_harness

```text
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  task-docs/_harness/adaptive-orchestration-protocol.md
bba777700d41953f08055784083e5cfb9c7bf2ab280571a656627a738c9010f3  task-docs/_harness/evaluator-calibration.md
8daa629d5e99f788d0c01ff944437358fd0e25c59ab67d6028760ab3bdfec2c9  task-docs/_harness/run-directory-protocol.md
c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4  task-docs/_harness/semantic-fidelity-protocol.md
252e0e73fce9eea090956e463a83545d1a66968ea031f0b92f5615ca089021bc  task-docs/_harness/templates/executor-report-template.md
620fd9fd9e842294288c3029b2d8a51c3ba7faa273bd481eecf81d26f66fa0a5  task-docs/_harness/templates/orchestration-prompt-template.md
8234aed284cd593ccb47e7f1799beb3260e53e664cacf1084281c6d6e7eee799  task-docs/_harness/templates/plan-review-template.md
975b9b97ed5ba71c843ad389ad07f5f1ca251c65dfe4042390ae9c2cc2f91775  task-docs/_harness/templates/plan-template.md
acaadee2c9a3b1197bf00720961f2cf665acbcecc6a06f3d7d40386bdc6a53f1  task-docs/_harness/templates/result-qa-template.md
bda51f3d4808a495b1dec80cec4da9956b47ff42bc0ef71411ff71e8209ed9e4  task-docs/_harness/templates/routing-scenario-matrix-template.md
963fd2dd84963cd3e755b29dca70d668fb043bca60fc5c4d61371c829902c288  task-docs/_harness/templates/rule-preservation-ledger-template.md
251743fb7ce574c2dae42a35cacac034aa167e70466bad11c351979ca8aa37ff  task-docs/_harness/templates/solution-review-template.md
5891681d391f6559addd6b9b2c49f2800407f85ba95274c6adcdbef9224bdd7d  task-docs/_harness/templates/source-coverage-manifest-template.md
ec90ce20aa4153191ffaa9ff432af43da3ca09ed490c4eb56ec9ab3b7527392b  task-docs/_harness/templates/source-snapshot-template.md
f0129b0879ef6744e92e11ef58984c71e409fbde37b1897bbd855e0937054485  task-docs/_harness/templates/task-contract-template.md
```

### Task 1 control-plane history

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

### Task 2 contracting history

```text
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md
01b06516ad5338c2585b9e71f8c196d8d15a5fb282866315c074963a2d294db4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md
c30cca8556f4d41881a88689aab578ee4a41befb02d2b0fbb7fffabba797c62d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md
8f96f916838b891082239a88c3dc34ff6443da273d9834d6ea1feffcb91591d8  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md
493a881993a1981957795fe2db3cdfff1d36795b8730d8b8d74f73cdf6d79863  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md
0750a371c57f57e0b46dbcffe6a5bc7a29fe41d0a00e25982e6bc93de1471209  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md
ca612894e074e3c1dea93c720d00ef0fbc9895a7bd65a7ced6b8c5b292e00ef0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
```

This baseline file is excluded from its directory manifest to avoid recursion and is protected by the external launch SHA.

## Explicit Frozen Authorities

- Requirements v4: `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`
- Plan v5: `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`
- Pass A: `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b`
- Pass B: `2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204`
- Accepted planning-input manifest: `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780`
- Task 1 Implementation Report: `922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed`
- Task 1 Result QA: `3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e`
- Task 1 main-thread acceptance: `a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4`
- Current-state route: `8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364`
- Evaluator calibration: `bba777700d41953f08055784083e5cfb9c7bf2ab280571a656627a738c9010f3`
- Solution-review template: `251743fb7ce574c2dae42a35cacac034aa167e70466bad11c351979ca8aa37ff`
- Task 2 boundary manifest: `ca612894e074e3c1dea93c720d00ef0fbc9895a7bd65a7ced6b8c5b292e00ef0`

The nine Task 1 authority files and all triggered route hashes were recomputed and match the accepted contract.

## Launch Decision

All frozen invariants pass. Any contract/baseline hash mismatch, unexplained status path, concurrent writer, protected inventory change, Task 3 opaque identity mismatch, or Task 2 allowed-path baseline mismatch requires immediate stop without normalization or repair.

