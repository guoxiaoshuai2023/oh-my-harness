# Task 4 v7 Executor Launch Baseline

Identity: `adaptive-main-thread-orchestration-task-4-executor-launch-baseline-20260711-v2`

Status: `FROZEN`

Captured: `2026-07-11T22:50:29+08:00`

Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-adaptive-main-thread-orchestration`

This file freezes the exact pre-executor v7 state. Its own final SHA-256 is supplied externally. The future executor and Result Evaluator must verify this file and every inventory entry before/after their work. Any mismatch or unexplained path requires STOP without repair.

## Branch And Delta State

```text
branch codex/adaptive-main-thread-orchestration
HEAD caf93131b6cb591644271105b1d8921459245341
origin/main caf93131b6cb591644271105b1d8921459245341
merge-base caf93131b6cb591644271105b1d8921459245341
base-ref origin/main
staged-delta <empty>
committed-origin-main-to-HEAD-delta <empty>
active-writer <none; v7 contract reviewer closed>
```

Complete status before this self-referential baseline:

```text
## codex/adaptive-main-thread-orchestration...origin/main
 M .codex/agents/harness-executor.toml
 M .codex/agents/harness-plan-evaluator.toml
 M .codex/agents/harness-planner.toml
 M .codex/agents/harness-result-evaluator.toml
 M .codex/agents/harness-solution-designer.toml
 M .codex/agents/harness-solution-evaluator.toml
 M AGENTS.md
 M README.md
 M docs/adapters/codex-subagents.md
 M docs/adoption/router-refactor-runbook.md
 M docs/agent-routing/README.md
 M docs/agent-routing/external-systems-and-secrets.md
 M docs/agent-routing/high-risk-actions.md
 M docs/agent-routing/implementation-boundary.md
 M docs/agent-routing/task-planning-scale.md
 M docs/agent-routing/validation-and-reporting.md
 M docs/architecture.md
 M examples/minimal-router/AGENTS.md
 M task-docs/_harness/evaluator-calibration.md
 M task-docs/_harness/run-directory-protocol.md
 M task-docs/_harness/semantic-fidelity-protocol.md
 M task-docs/_harness/templates/executor-report-template.md
 M task-docs/_harness/templates/orchestration-prompt-template.md
 M task-docs/_harness/templates/plan-review-template.md
 M task-docs/_harness/templates/plan-template.md
 M task-docs/_harness/templates/result-qa-template.md
 M task-docs/_harness/templates/routing-scenario-matrix-template.md
 M task-docs/_harness/templates/task-contract-template.md
?? task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
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
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-02.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-03.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-04.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-05.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-01.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-02.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-03.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-04.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-05.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-07.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST_V7.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md
?? task-docs/main-thread-control-enhancement-requirements-20260711.md
```

The launch-baseline path itself is the only expected addition to this snapshot and becomes protected immediately after creation.

## Complete Pre-Launch Untracked Hashes

Exactly 67 untracked files existed before this baseline:

```text
f8fbb5a05263856df4f3e2a4d9bbf000e63be937afb5621106b58c6c2ece08aa  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
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
e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md
895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md
8b357b28961c2c51b960872fd15d6564c241945b3a75a65242ebb467b7c933ae  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-01.md
726bcff84251820a5d62f750cf51fb66fa8dcf087ca25228b859e8731ab7ffe9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-02.md
1c716547b936dcce38576a7ad0f2f578ed5f931e0e23958fd84e3b2cf52d5de6  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-03.md
1d7c4eb6fb53e68d802ad31a86d1fdfe5a563ce0331c340a611c7dd88724adb4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-04.md
e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-05.md
4de6b362f175ded434a06ad5f1ff6add5809c6ce4154758141db7031ba178a07  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md
895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md
74cdf78ac3b10bb28a736677a5b40e6a4995ed2121b192560ae5beeced8a6844  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW.md
a81af014b028946f42cf778985ad4292a182278a5654729f57a80f5239db948f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-01.md
1871bb8f9c4e97ba3eb08585975f9e4f0258d2e6678a3b1ad2470dc68109305d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-02.md
89c8ee65fad825421c44a7cf8ce53c54671cae311f9bc797570314939073ece6  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-03.md
ce0c9ad0ca3269b0d268698aa54023bc19229917bf6066bb4c65ad27a479ce5f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-04.md
aebe0b43d2d433a43a4d0bdf2a9602c9a3dd015f74afdfdf3b7ff702cfad41e0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-05.md
16ede8c538b1b034473fab98e1fc619ef7377c801f6df0fd27bfb48fcea12348  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md
c7038c93c74a507991f0667ed4c04e016f34faa022fe9f09b8a747411cff9015  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-07.md
83923a74d2d19bf3153e8f428395f93864c7ba978ffbffc7f4301cab88bfe06b  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md
ad67b9076343c81e93c828c097802cf9cdd55bb163809890077dd057b07f1b99  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE.md
55492bb4d0c6eebfdfb4c0a203f55d3ccc95bbf574820ec0c043d257bfefec03  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md
684fb420e06b796b0614a6fa63bbb6fe59a4d6335990db47aed0c679e14e2332  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE.md
06d6f04c80b8e5167ca3737bdc352a8a282257a3e98b432e0fd3e3203fd5d6c5  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md
afa39325780133e47d0d44aecd456a40f3a5f642bf4f6d30107d58e32d317bbe  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md
52bdb6e66454a6300bf27b2c998bf68ae4911b2f45d2060a0c400bd5a79f35fb  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST.md
cd3be6ccf4a745bf97a63e99665a512fe53ce90c424c46ff1f6ab9dc1a1b85d9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST_V7.md
2a51239c5bc8e5c4668e2d58fa561e027db51dba9ffa6a824ced0b51fdfb890f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md
f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f  task-docs/main-thread-control-enhancement-requirements-20260711.md
```

## Dirty-Path Attribution

Exactly 28 tracked modifications and 67 untracked paths existed before this baseline. Every path is classified; there is no unexplained path.

- `.codex/agents/harness-executor.toml`: Task 1-3 accepted implementation path; protected/read-only.
- `.codex/agents/harness-plan-evaluator.toml`: Task 1-3 accepted implementation path; protected/read-only.
- `.codex/agents/harness-planner.toml`: Task 1-3 accepted implementation path; protected/read-only.
- `.codex/agents/harness-result-evaluator.toml`: Task 1-3 accepted implementation path; protected/read-only.
- `.codex/agents/harness-solution-designer.toml`: Task 1-3 accepted implementation path; protected/read-only.
- `.codex/agents/harness-solution-evaluator.toml`: Task 1-3 accepted implementation path; protected/read-only.
- `AGENTS.md`: Task 1-3 accepted implementation path; protected/read-only.
- `README.md`: Task 4 rejected-v5 working state; authorized v7 implementation candidate only.
- `docs/adapters/codex-subagents.md`: Task 1-3 accepted implementation path; protected/read-only.
- `docs/adoption/router-refactor-runbook.md`: Task 4 rejected-v5 working state; authorized v7 implementation candidate only.
- `docs/agent-routing/README.md`: Task 1-3 accepted implementation path; protected/read-only.
- `docs/agent-routing/external-systems-and-secrets.md`: Task 1-3 accepted implementation path; protected/read-only.
- `docs/agent-routing/high-risk-actions.md`: Task 1-3 accepted implementation path; protected/read-only.
- `docs/agent-routing/implementation-boundary.md`: Task 1-3 accepted implementation path; protected/read-only.
- `docs/agent-routing/task-planning-scale.md`: Task 1-3 accepted implementation path; protected/read-only.
- `docs/agent-routing/validation-and-reporting.md`: Task 1-3 accepted implementation path; protected/read-only.
- `docs/architecture.md`: Task 4 rejected-v5 working state; authorized v7 implementation candidate only.
- `examples/minimal-router/AGENTS.md`: Task 4 rejected-v5 working state; authorized v7 implementation candidate only.
- `task-docs/_harness/adaptive-orchestration-acceptance-matrix.md`: Task 4 rejected-v5 working state; authorized v7 implementation candidate only.
- `task-docs/_harness/adaptive-orchestration-protocol.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/evaluator-calibration.md`: Task 4 rejected-v5 working state; authorized v7 implementation candidate only.
- `task-docs/_harness/run-directory-protocol.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/semantic-fidelity-protocol.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/context-handoff-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/executor-report-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/orchestration-prompt-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/plan-review-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/plan-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/result-qa-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/routing-scenario-matrix-template.md`: Task 4 rejected-v5 working state; authorized v7 implementation candidate only.
- `task-docs/_harness/templates/task-contract-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/_harness/templates/task-packet-template.md`: Task 1-3 accepted implementation path; protected/read-only.
- `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-01.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-02.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_ITERATION-03.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/CONTRACT_REVIEW.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/TASK1_BOUNDARY_MANIFEST.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-01.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-02.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_ITERATION-03.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-01.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/CONTRACT_REVIEW_ITERATION-02.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/EXECUTOR_LAUNCH_BASELINE.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/RESULT_QA.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_BOUNDARY_MANIFEST.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-01.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_ITERATION-02.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/CONTRACT_REVIEW_ITERATION-01.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/EXECUTOR_LAUNCH_BASELINE.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_BOUNDARY_MANIFEST.md`: frozen planning/upstream evidence or run artifact; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-01.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-02.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-03.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-04.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-05.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-01.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-02.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-03.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-04.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-05.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-07.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST_V7.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md`: Task 4 v5/v6/v7 contract, review, report, QA, decision, manifest, or baseline; protected/read-only.
- `task-docs/main-thread-control-enhancement-requirements-20260711.md`: frozen planning/upstream evidence or run artifact; protected/read-only.

## Rejected-v5 Working-State Before Hashes

These are the only seven implementation writes authorized by the accepted v7 boundary:

```text
fa546900ca79f24610b7f235e085257932ad02a04917ed2f65ce9aaf9b1ed295  task-docs/_harness/templates/routing-scenario-matrix-template.md
2b123187572be899e24f0058b9c4fbb842e0dbd2430b3a655049dced3e1a87ca  README.md
623ba8a9aacf9d7f11e190315160accb9bd2edbe7c3de10f192b7c9b7ff59c4c  docs/architecture.md
e0bbbd5fed34ced6cba185dc02ec03ca07f478d6f434ebd9c73ed52c49d19ff2  docs/adoption/router-refactor-runbook.md
ab134915bc23a6d71c65df95462ef99061c72226fa5dbdfdc3ce94fd7a6471d1  examples/minimal-router/AGENTS.md
f8fbb5a05263856df4f3e2a4d9bbf000e63be937afb5621106b58c6c2ece08aa  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
08915572985ec72c7777ff6518ade0a2bce388ed11c05810fd534de3f4cff420  task-docs/_harness/evaluator-calibration.md
```

## Task 1-3 Accepted Implementation Hashes

Exactly 26 protected accepted paths:

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

## Task 1-3 Accepted Evidence Hashes

Exactly 12 protected accepted artifacts:

```text
66d7acb121060cf9e70dd224c2b5a312e19227f105db907534e6ffe7dc9d47e7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/ACCEPTED_CONTRACT.md
922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md
3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md
a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md
fd4b5db2166f9e68221dbf0ba25af21e5a8b48ead44d489ce32ad5bcfddd4fd7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/ACCEPTED_CONTRACT.md
1f2579efe94d5785acb48997f1a268189ee91b804cf0a49e3cf96b06824b3880  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/IMPLEMENTATION_REPORT.md
27a23d0ad9263bdf6650018a20fd9dc290caa1d8c037332caf726c8c65bba5a5  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/RESULT_QA.md
a30324a4821bd64defcf05934728b4e5ab3e7585e9087d10760cde0518723e83  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md
c5bda16f29229b92fb6eecbbcbf5cb0d272e48125d422d63ad9a25410d87de31  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/ACCEPTED_CONTRACT.md
115e8f0dc72b0da05dfacf29824e3e89d0ee87ea74db736817384d665ea60ef9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/IMPLEMENTATION_REPORT.md
6e9ad7a40731e7e66afd0784690740f17fc4c3183d106bdb47b15af52c67ada0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/RESULT_QA.md
6e4f29c46e9731ac2186052408c7cfc4a315aa5105cf7363747b681822855e5f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md
```

## v5 Failure And v6/v7 Contract Chain

```text
e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md
895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md
8b357b28961c2c51b960872fd15d6564c241945b3a75a65242ebb467b7c933ae  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-01.md
726bcff84251820a5d62f750cf51fb66fa8dcf087ca25228b859e8731ab7ffe9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-02.md
1c716547b936dcce38576a7ad0f2f578ed5f931e0e23958fd84e3b2cf52d5de6  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-03.md
1d7c4eb6fb53e68d802ad31a86d1fdfe5a563ce0331c340a611c7dd88724adb4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-04.md
e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-05.md
4de6b362f175ded434a06ad5f1ff6add5809c6ce4154758141db7031ba178a07  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md
895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md
74cdf78ac3b10bb28a736677a5b40e6a4995ed2121b192560ae5beeced8a6844  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW.md
a81af014b028946f42cf778985ad4292a182278a5654729f57a80f5239db948f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-01.md
1871bb8f9c4e97ba3eb08585975f9e4f0258d2e6678a3b1ad2470dc68109305d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-02.md
89c8ee65fad825421c44a7cf8ce53c54671cae311f9bc797570314939073ece6  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-03.md
ce0c9ad0ca3269b0d268698aa54023bc19229917bf6066bb4c65ad27a479ce5f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-04.md
aebe0b43d2d433a43a4d0bdf2a9602c9a3dd015f74afdfdf3b7ff702cfad41e0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-05.md
16ede8c538b1b034473fab98e1fc619ef7377c801f6df0fd27bfb48fcea12348  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md
c7038c93c74a507991f0667ed4c04e016f34faa022fe9f09b8a747411cff9015  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-07.md
83923a74d2d19bf3153e8f428395f93864c7ba978ffbffc7f4301cab88bfe06b  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md
ad67b9076343c81e93c828c097802cf9cdd55bb163809890077dd057b07f1b99  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE.md
55492bb4d0c6eebfdfb4c0a203f55d3ccc95bbf574820ec0c043d257bfefec03  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md
684fb420e06b796b0614a6fa63bbb6fe59a4d6335990db47aed0c679e14e2332  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE.md
06d6f04c80b8e5167ca3737bdc352a8a282257a3e98b432e0fd3e3203fd5d6c5  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md
afa39325780133e47d0d44aecd456a40f3a5f642bf4f6d30107d58e32d317bbe  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md
52bdb6e66454a6300bf27b2c998bf68ae4911b2f45d2060a0c400bd5a79f35fb  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST.md
cd3be6ccf4a745bf97a63e99665a512fe53ce90c424c46ff1f6ab9dc1a1b85d9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST_V7.md
2a51239c5bc8e5c4668e2d58fa561e027db51dba9ffa6a824ced0b51fdfb890f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md
```

This inventory includes v5 report/QA/failure evidence, v6 failed contract review, v7 accepted contract/reviews/manifest, and all earlier Task 4 gate artifacts. V5 result evidence remains rejected provenance and is not accepted authority.

## Complete Protected Inventory

The 101 current files below are protected/read-only. The seven authorized implementation paths are excluded.

```text
c981644f5d6da31a623170653fcc9b9c84959062203f6347c86ca34d5722c5e7  .codex/agents/harness-executor.toml
dc7dba230901c89e888a1ab845f279d24ba34915eb183947345083c9930452d8  .codex/agents/harness-plan-evaluator.toml
dfba74e1660c1bfe79251393993cae57ae2c7e57fabd1521d346e7789c576265  .codex/agents/harness-planner.toml
3c3f2e562087264143b865f4834c9cb6757204c64ff5d70757361af053a0945c  .codex/agents/harness-result-evaluator.toml
f772d114f7c6c19fe79c76af1b10ef05f152dbb6349625902c5c694247c27c3b  .codex/agents/harness-solution-designer.toml
8fb5bd35b8e3578de78410a1c5b2fb09789b329150b9ee6ae6c0770a163aed47  .codex/agents/harness-solution-evaluator.toml
b1c24d76fd08e2b160d4606919423294a89e128c78d9c606f43b4b2f9ee4f307  .codex/config.example.toml
632d7bd14194c580475453e823e40490ccd91303469f7e97605c21a0c3ebf7ec  .git
b22de8756fa3e401743a92505496ce0ddd039fe1a30aa213e5cfab25183690b9  .gitignore
e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d  AGENTS.md
a4ac4f47a02cf25c855dc2b85115596763d2584d72deddfd12261fa692d40615  docs/adapters/codex-subagents.md
c214d3c44838d53aabfb363a7c37813b95e810411d7f21d515dd3aaab53659f7  docs/adoption/open-source-release-checklist.md
a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787  docs/agent-routing/README.md
8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364  docs/agent-routing/current-state-evidence.md
6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c  docs/agent-routing/external-systems-and-secrets.md
6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd  docs/agent-routing/high-risk-actions.md
d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8  docs/agent-routing/implementation-boundary.md
29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c  docs/agent-routing/task-planning-scale.md
6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b  docs/agent-routing/validation-and-reporting.md
f17e3a71e3c24773167252fbe4d9b35466fae4b057e0c167f7828fb4b8c4ccc4  examples/minimal-router/README.md
82b51867e009f1e4444b56b11976f381391c082e5fe542f3d9abcda4fb161b91  scripts/extract_agents_source.py
feba7621f2f04946c9b3eb8e3199cecf9cfb5bd4cf66b976ad3aed78b3ce1f97  scripts/validate_router_fixture.py
989c844e8819d493680046186df3c75fadbe38b6dfdee61662c75f13115c0dfe  scripts/validate_rule_preservation.py
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  task-docs/_harness/adaptive-orchestration-protocol.md
63c9d2e7146f899889f06de72f7e5cc321f0710614cd6528dbb779b040b89f7c  task-docs/_harness/run-directory-protocol.md
c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4  task-docs/_harness/semantic-fidelity-protocol.md
b0d9febe4206f9a8771252ba91e7d27a589f0f5c54ba5811ce4d683724ff1a13  task-docs/_harness/templates/context-handoff-template.md
8df582472530af51178066c598afe480355feb821e615bebbce711d068afacc1  task-docs/_harness/templates/executor-report-template.md
1ea9e541176853f90e45096ce62b7163f4acf27fbeb3be4f7f236d27724440a3  task-docs/_harness/templates/orchestration-prompt-template.md
5f012a023141f1455506a7736c0ec880e73b20e18df15c20de5255b9b44d09c9  task-docs/_harness/templates/plan-review-template.md
2779a4fa18ea7297d6fb56258e20e7203dd4ce6570cd06e77e9fb907d3a48bdd  task-docs/_harness/templates/plan-template.md
2ebfbcc8f24bca78be0d10bd7c4cba14d6e7f1c3e52baef07bca3a47f5994a08  task-docs/_harness/templates/result-qa-template.md
963fd2dd84963cd3e755b29dca70d668fb043bca60fc5c4d61371c829902c288  task-docs/_harness/templates/rule-preservation-ledger-template.md
251743fb7ce574c2dae42a35cacac034aa167e70466bad11c351979ca8aa37ff  task-docs/_harness/templates/solution-review-template.md
5891681d391f6559addd6b9b2c49f2800407f85ba95274c6adcdbef9224bdd7d  task-docs/_harness/templates/source-coverage-manifest-template.md
ec90ce20aa4153191ffaa9ff432af43da3ca09ed490c4eb56ec9ab3b7527392b  task-docs/_harness/templates/source-snapshot-template.md
0b426b1cae5aae3bb62169684467168737840d3ef4359f1070ea77e0a4bc1b55  task-docs/_harness/templates/task-contract-template.md
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
e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md
895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md
8b357b28961c2c51b960872fd15d6564c241945b3a75a65242ebb467b7c933ae  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-01.md
726bcff84251820a5d62f750cf51fb66fa8dcf087ca25228b859e8731ab7ffe9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-02.md
1c716547b936dcce38576a7ad0f2f578ed5f931e0e23958fd84e3b2cf52d5de6  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-03.md
1d7c4eb6fb53e68d802ad31a86d1fdfe5a563ce0331c340a611c7dd88724adb4  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-04.md
e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-05.md
4de6b362f175ded434a06ad5f1ff6add5809c6ce4154758141db7031ba178a07  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md
895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md
74cdf78ac3b10bb28a736677a5b40e6a4995ed2121b192560ae5beeced8a6844  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW.md
a81af014b028946f42cf778985ad4292a182278a5654729f57a80f5239db948f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-01.md
1871bb8f9c4e97ba3eb08585975f9e4f0258d2e6678a3b1ad2470dc68109305d  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-02.md
89c8ee65fad825421c44a7cf8ce53c54671cae311f9bc797570314939073ece6  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-03.md
ce0c9ad0ca3269b0d268698aa54023bc19229917bf6066bb4c65ad27a479ce5f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-04.md
aebe0b43d2d433a43a4d0bdf2a9602c9a3dd015f74afdfdf3b7ff702cfad41e0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-05.md
16ede8c538b1b034473fab98e1fc619ef7377c801f6df0fd27bfb48fcea12348  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md
c7038c93c74a507991f0667ed4c04e016f34faa022fe9f09b8a747411cff9015  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-07.md
83923a74d2d19bf3153e8f428395f93864c7ba978ffbffc7f4301cab88bfe06b  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md
ad67b9076343c81e93c828c097802cf9cdd55bb163809890077dd057b07f1b99  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE.md
55492bb4d0c6eebfdfb4c0a203f55d3ccc95bbf574820ec0c043d257bfefec03  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md
684fb420e06b796b0614a6fa63bbb6fe59a4d6335990db47aed0c679e14e2332  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/EXECUTOR_LAUNCH_BASELINE.md
06d6f04c80b8e5167ca3737bdc352a8a282257a3e98b432e0fd3e3203fd5d6c5  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md
afa39325780133e47d0d44aecd456a40f3a5f642bf4f6d30107d58e32d317bbe  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md
52bdb6e66454a6300bf27b2c998bf68ae4911b2f45d2060a0c400bd5a79f35fb  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST.md
cd3be6ccf4a745bf97a63e99665a512fe53ce90c424c46ff1f6ab9dc1a1b85d9  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST_V7.md
2a51239c5bc8e5c4668e2d58fa561e027db51dba9ffa6a824ced0b51fdfb890f  task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md
f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f  task-docs/main-thread-control-enhancement-requirements-20260711.md
```

Protected absent paths:

```text
scripts/validate_adaptive_orchestration.py
task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT_V2.md
task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA_V2.md
task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/MAIN_THREAD_ACCEPTANCE_V2.md
```

The launch baseline itself becomes protected after creation and is omitted from the recursive inventory. Its external SHA closes that reference.

## Launch Decision

- Accepted v7 boundary, strict review, v7 manifest, failure decision, v6 baseline, all manifest entries, all 26 accepted implementation paths, all 12 accepted evidence artifacts, and all protected paths matched.
- All 67 pre-launch untracked and 28 tracked dirty paths are explained.
- Seven implementation before hashes match rejected-v5 current bytes.
- Staged and committed deltas are empty.
- No writer is active.
- Launch is permitted only for one fresh v7 executor, nested delegation prohibited, under the byte-identical accepted v7 boundary.

