# Task 3 Executor Launch Baseline

Identity: `adaptive-main-thread-orchestration-task-3-executor-launch-baseline-20260711-v1`

Status: `FROZEN`

This baseline was created by the main thread after both Task 2 and Task 3 contracts were independently reviewed and frozen. Its SHA-256 is supplied outside this file in the immutable executor launch packet to avoid recursive self-hashing.

## Orchestration State

- Task 3 is the next and only authorized implementation task.
- No Task 2 executor or other Task 2 implementation writer is active, scheduled, or authorized to start while Task 3 is active.
- No Task 2 implementation output exists. All nine Task 2 implementation paths match the frozen pre-implementation baseline below.
- Task 4 is blocked.
- No other repository writer may run while the Task 3 executor is active.
- Task 3 may not consume Task 2 contract, template, report, or QA content as behavior authority.

## Branch And Delta Snapshot

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
 M AGENTS.md
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
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
?? task-docs/main-thread-control-enhancement-requirements-20260711.md
```

Complete tracked working-tree `git diff --name-status`:

```text
M	AGENTS.md
M	docs/agent-routing/README.md
M	docs/agent-routing/external-systems-and-secrets.md
M	docs/agent-routing/high-risk-actions.md
M	docs/agent-routing/implementation-boundary.md
M	docs/agent-routing/task-planning-scale.md
M	docs/agent-routing/validation-and-reporting.md
M	task-docs/_harness/semantic-fidelity-protocol.md
```

The complete staged delta and `origin/main...HEAD` committed delta are empty.

## Untracked Files

Every untracked file except this baseline is frozen below. This baseline's own external launch-message SHA completes the set.

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
22950668b6c2016090af775f069015016ac39875813cb72eb45e9dc6c8282db7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f  task-docs/main-thread-control-enhancement-requirements-20260711.md
```

## Allowed-Path Before Hashes

```text
98f761cee22565f43f031f7a7b618b1ec0ee5efe870a527b0f9313f786babfc6  .codex/agents/harness-planner.toml
1d21073b6b2b2ff83d57daa7c065d3101442d3bd270b2fe91d76b4ebdf7223e4  .codex/agents/harness-plan-evaluator.toml
028fa348181dbf37fde30ecca8b7681e5fd4f40fed59076db8e615c60edd9ba4  .codex/agents/harness-solution-designer.toml
533196b7b75baad7c44ba9761b1f84c0c8be78175e84019ea2b3109020191f4c  .codex/agents/harness-solution-evaluator.toml
a2964674bbeaa437de491ac825bbedd236484c0e249e2092542af04cf2194fea  .codex/agents/harness-executor.toml
59f526f8974193d61fc296b15540338146de9d000a3cc28415e3849755c8bab1  .codex/agents/harness-result-evaluator.toml
c71af3f5d0163952f2b7260bd1341c637c2f34e07af48ee2888a78250d7e82b6  docs/adapters/codex-subagents.md
b1c24d76fd08e2b160d4606919423294a89e128c78d9c606f43b4b2f9ee4f307  .codex/config.example.toml
```

Only these eight paths may change under Task 3. For `.codex/config.example.toml`, only comment lines may change under the contract's evidence gate; all non-comment bytes and `max_depth = 1` are immutable.

## Task 2 Pre-Implementation State

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

Task 2 paths may be used only for stat/hash comparison. Their content is not a Task 3 behavior dependency.

## Frozen Upstream Verification

Verification result: `PASS`.

- Requirements v4: `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`
- Plan v5: `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`
- Pass A: `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b`
- Pass B: `2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204`
- Accepted planning-input manifest: `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780`
- Task 1 Implementation Report: `922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed`
- Task 1 Result QA: `3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e`
- Task 1 main-thread acceptance: `a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4`
- Task 3 accepted contract: `c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31`
- Task 3 contract review: `2788b747605e7a87f9de1aca3b456a44465a58ad0a6ab1966177d73d6c30fbde`
- Task 3 boundary manifest: `22950668b6c2016090af775f069015016ac39875813cb72eb45e9dc6c8282db7`

The nine Task 1 authority paths, triggered routes, current-state route, calibration, and all contract-chain hashes were recomputed and match the accepted contract and boundary manifest.

## Complete Protected-Path Manifest

This is the complete SHA-256 inventory of every existing repository file outside the eight Task 3 allowed paths and this self-hashed baseline.

```text
632d7bd14194c580475453e823e40490ccd91303469f7e97605c21a0c3ebf7ec  ./.git
b22de8756fa3e401743a92505496ce0ddd039fe1a30aa213e5cfab25183690b9  ./.gitignore
e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d  ./AGENTS.md
64f528978c422d3917f7a48b4f302870fa05ea1b0caff396d5141f8dd0c4a421  ./README.md
c214d3c44838d53aabfb363a7c37813b95e810411d7f21d515dd3aaab53659f7  ./docs/adoption/open-source-release-checklist.md
66e2d8a4b00bce4fc40ba010af40766e257a51a86d53f1a96a44d0a278237eaa  ./docs/adoption/router-refactor-runbook.md
a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787  ./docs/agent-routing/README.md
8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364  ./docs/agent-routing/current-state-evidence.md
6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c  ./docs/agent-routing/external-systems-and-secrets.md
6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd  ./docs/agent-routing/high-risk-actions.md
d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8  ./docs/agent-routing/implementation-boundary.md
29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c  ./docs/agent-routing/task-planning-scale.md
6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b  ./docs/agent-routing/validation-and-reporting.md
196d0560a6dbd0ac57210a541c62d05f7b2e9e211ef91b7b684d87fd56bf32fc  ./docs/architecture.md
4b72e3058de2fcff8c26c1dd7e6274367df65cd0a334e39b1f3d4033ce10c9be  ./examples/minimal-router/AGENTS.md
f17e3a71e3c24773167252fbe4d9b35466fae4b057e0c167f7828fb4b8c4ccc4  ./examples/minimal-router/README.md
82b51867e009f1e4444b56b11976f381391c082e5fe542f3d9abcda4fb161b91  ./scripts/extract_agents_source.py
feba7621f2f04946c9b3eb8e3199cecf9cfb5bd4cf66b976ad3aed78b3ce1f97  ./scripts/validate_router_fixture.py
989c844e8819d493680046186df3c75fadbe38b6dfdee61662c75f13115c0dfe  ./scripts/validate_rule_preservation.py
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  ./task-docs/_harness/adaptive-orchestration-protocol.md
bba777700d41953f08055784083e5cfb9c7bf2ab280571a656627a738c9010f3  ./task-docs/_harness/evaluator-calibration.md
8daa629d5e99f788d0c01ff944437358fd0e25c59ab67d6028760ab3bdfec2c9  ./task-docs/_harness/run-directory-protocol.md
c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4  ./task-docs/_harness/semantic-fidelity-protocol.md
252e0e73fce9eea090956e463a83545d1a66968ea031f0b92f5615ca089021bc  ./task-docs/_harness/templates/executor-report-template.md
620fd9fd9e842294288c3029b2d8a51c3ba7faa273bd481eecf81d26f66fa0a5  ./task-docs/_harness/templates/orchestration-prompt-template.md
8234aed284cd593ccb47e7f1799beb3260e53e664cacf1084281c6d6e7eee799  ./task-docs/_harness/templates/plan-review-template.md
975b9b97ed5ba71c843ad389ad07f5f1ca251c65dfe4042390ae9c2cc2f91775  ./task-docs/_harness/templates/plan-template.md
acaadee2c9a3b1197bf00720961f2cf665acbcecc6a06f3d7d40386bdc6a53f1  ./task-docs/_harness/templates/result-qa-template.md
bda51f3d4808a495b1dec80cec4da9956b47ff42bc0ef71411ff71e8209ed9e4  ./task-docs/_harness/templates/routing-scenario-matrix-template.md
963fd2dd84963cd3e755b29dca70d668fb043bca60fc5c4d61371c829902c288  ./task-docs/_harness/templates/rule-preservation-ledger-template.md
251743fb7ce574c2dae42a35cacac034aa167e70466bad11c351979ca8aa37ff  ./task-docs/_harness/templates/solution-review-template.md
5891681d391f6559addd6b9b2c49f2800407f85ba95274c6adcdbef9224bdd7d  ./task-docs/_harness/templates/source-coverage-manifest-template.md
ec90ce20aa4153191ffaa9ff432af43da3ca09ed490c4eb56ec9ab3b7527392b  ./task-docs/_harness/templates/source-snapshot-template.md
f0129b0879ef6744e92e11ef58984c71e409fbde37b1897bbd855e0937054485  ./task-docs/_harness/templates/task-contract-template.md
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
ca612894e074e3c1dea93c720d00ef0fbc9895a7bd65a7ced6b8c5b292e00ef0  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
68a5f1f022d688ce5833a2f9e6f28cc9e1694f761756891632bf27ee6341996e  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md
2788b747605e7a87f9de1aca3b456a44465a58ad0a6ab1966177d73d6c30fbde  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md
681008e3d39193b37372baf2b4376ac978f2edadc666ffed5fa74299def2be8d  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md
22950668b6c2016090af775f069015016ac39875813cb72eb45e9dc6c8282db7  ./task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md
f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f  ./task-docs/main-thread-control-enhancement-requirements-20260711.md
```

Required-absent protected paths:

```text
task-docs/_harness/templates/task-packet-template.md
task-docs/_harness/templates/context-handoff-template.md
task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
```

## Pre-Write Decision

All launch conditions pass. Any mismatch in this file's external SHA, branch/base state, allowed-path baseline, Task 2 state, frozen upstream, untracked hash, or protected manifest requires an immediate stop without normalization or repair.

