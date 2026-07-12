# Task 2 Reopened Launch Baseline

Identity: `adaptive-main-thread-orchestration-task-2-reopened-launch-baseline-20260712-v1`

Status: `FROZEN PRE-IMPLEMENTATION STATE`

Owner: main thread

The baseline path itself was absent from the pre-persistence snapshot and is the only expected addition. Its final SHA is supplied in the immutable executor packet after creation. It becomes protected immediately.

## Accepted Composite Boundary

```text
2ff1685bc4a1902f8924f4769e473a2d096b08efde0f080d3fe604681ce48b77  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V4.md
8a310e0df4cdf06ace567c3f1d3b8e0fcb6e3f11955de02a641efb26299c1609  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V5.md
e12be4ab6874099021ae0d23417598a08b4066fdb04d1180a0751faeac928077  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V2.md
f2ad6a6a68af2f69eb3a727f068ef7f3bb5b5546c8ea94469a22b712bd15efb7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_MANIFEST_V1.md
```

Review v1 SHA `1d6ba3af64d3cc871df3e5b5d3f609b717e536edfad30b8e7cc316cae52e1741` is protected historical FAIL evidence.

## Branch And Delta State

```text
branch codex/adaptive-main-thread-orchestration
HEAD e5f0bb7d50231b7064595bbf716f728e5b2ad653
origin/main caf93131b6cb591644271105b1d8921459245341
merge-base caf93131b6cb591644271105b1d8921459245341
PR #6 head e5f0bb7d50231b7064595bbf716f728e5b2ad653
staged binary patch SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
committed origin/main...HEAD binary patch SHA-256 4ec5f6cd44db0dbd2b2dd528bd274b8ec3fe3bb582a68ff2df2c1fc4bedad1e7
pre-persistence status SHA-256 9e5dcc55beae8096f794b71fe77efc2425b88789231f5025e55779fcab64c768
pre-persistence untracked content-manifest SHA-256 86577dd290893f7dd2790c9a2b543a6da58be9ae89dcbabac72afea1e24d3ae4
active writer none
```

The non-empty committed patch is the already-pushed PR #6 head, not a remediation working-tree delta. The index is empty.

## Complete Pre-Persistence Status

```text
## codex/adaptive-main-thread-orchestration...origin/codex/adaptive-main-thread-orchestration
?? task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_FINDING_ROUTING.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_ORIGINAL.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_RUNTIME.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/USER_REOPEN_AUTHORIZATION.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_MANIFEST_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V4.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V5.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_MANIFEST_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V1.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V2.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V3.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V3.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V4.md
?? task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V5.md
```

## Complete Pre-Persistence Untracked Hashes

```text
35a9fd03de0c00dee6e507dd8bb5d7b7c2f1016f150038316b53f94185878adc  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_FINDING_ROUTING.md
70b51824396209d0e98bc2418a881c93dc1101400121b5dac6e484e3da588bd5  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_ORIGINAL.md
30721931b057a82d11535a0f46da3e4ca2b12c833c07dc6b99a74e3fd540fdfd  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_RUNTIME.md
b849ea1aa89c29d042db018e3cdd25223677907737b4103564269784f934bddd  task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/USER_REOPEN_AUTHORIZATION.md
f2ad6a6a68af2f69eb3a727f068ef7f3bb5b5546c8ea94469a22b712bd15efb7  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_MANIFEST_V1.md
1d6ba3af64d3cc871df3e5b5d3f609b717e536edfad30b8e7cc316cae52e1741  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V1.md
e12be4ab6874099021ae0d23417598a08b4066fdb04d1180a0751faeac928077  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_REVIEW_V2.md
2ff1685bc4a1902f8924f4769e473a2d096b08efde0f080d3fe604681ce48b77  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V4.md
8a310e0df4cdf06ace567c3f1d3b8e0fcb6e3f11955de02a641efb26299c1609  task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/TASK2_REOPENED_BOUNDARY_V5.md
4adaba0e43029b7782ab6156db02160078a6c3c4f3f004939d1ad6c9c2b12fc0  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_MANIFEST_V1.md
822d2a2d9f988af128f8c64b83cbfd5334ed097ec7606e3b9921aea4ed85242a  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V1.md
2fed95e6ae5e4e65d2a76321762319f561b9582a670c3080603ffee9715ddd10  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V2.md
01d3693ac001c82293e23944efbfae87380d51f0efbbd5af2c40bd5e12b45c41  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_REVIEW_V3.md
e27a3a7cc44e6239116daf768c0992bbbdefea5973f627dd360f9da9a9579855  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V3.md
d384704b895406d91f3a7b9d5533ca06e03f1c06af39a6d9075e3bed6a22640e  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V4.md
60c7e67ff73ad1fd2d2aa756955c0f5da7dd4aa23135b271e074b30cad6c3916  task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/TASK3_REOPENED_BOUNDARY_V5.md
```

## Allowed Before Hashes

```text
a84164c98a5e625a0c49619e1295dee1c54b33ea2f6913d46014ec6aa7c7389a  task-docs/_harness/templates/task-packet-template.md
1ea9e541176853f90e45096ce62b7163f4acf27fbeb3be4f7f236d27724440a3  task-docs/_harness/templates/orchestration-prompt-template.md
5f012a023141f1455506a7736c0ec880e73b20e18df15c20de5255b9b44d09c9  task-docs/_harness/templates/plan-review-template.md
2ebfbcc8f24bca78be0d10bd7c4cba14d6e7f1c3e52baef07bca3a47f5994a08  task-docs/_harness/templates/result-qa-template.md
```

## Protected Authority Hashes

```text
e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d  AGENTS.md
8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a  task-docs/_harness/adaptive-orchestration-protocol.md
8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364  docs/agent-routing/current-state-evidence.md
29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c  docs/agent-routing/task-planning-scale.md
d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8  docs/agent-routing/implementation-boundary.md
6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b  docs/agent-routing/validation-and-reporting.md
c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4  task-docs/_harness/semantic-fidelity-protocol.md
62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06  task-docs/_harness/evaluator-calibration.md
f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f  task-docs/main-thread-control-enhancement-requirements-20260711.md
4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b  task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md
c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4  task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md
b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780  task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md
```

Every path not in the four-file allowed list is protected from the producer. The only permitted post-launch implementation delta is those four paths. All listed untracked files and this baseline must remain byte-identical.
