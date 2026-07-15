# Task 1A Compatibility Contract-State Baseline

Identity: `universal-harness-adoption-task-1-compatibility-contract-state-baseline-20260713-v1`

Capture scope: path/status/type metadata only for dirty and untracked entries; no unknown untracked content was opened. Known task artifacts and implementation paths are hash-bound separately by their accepted evidence chains and contract.

## Git Evidence

```text
branch=codex/universal-nondestructive-harness-adoption
HEAD=60428957a99cf6f75d640c78cf6833576d47cc8d
origin/main=60428957a99cf6f75d640c78cf6833576d47cc8d
merge-base=60428957a99cf6f75d640c78cf6833576d47cc8d

-- staged --

-- committed delta --

-- full status --
 M README.md
 M docs/adapters/codex-subagents.md
 M docs/architecture.md
?? bin/oh-my-harness.mjs
?? docs/adoption/bundle-lifecycle-spec.md
?? docs/adoption/universal-harness-adoption-runbook.md
?? package-lock.json
?? package.json
?? packaging/bundle-map.json
?? packaging/managed-router-block.md
?? packaging/package-contract.json
?? packaging/schemas/bundle-inventory.schema.json
?? packaging/schemas/package-contract.schema.json
?? src/bundle/build-bundle.mjs
?? src/bundle/compiler.mjs
?? src/bundle/validation.mjs
?? src/installer/cli.mjs
?? src/installer/filesystem.mjs
?? src/installer/lifecycle.mjs
?? src/installer/markers.mjs
?? src/installer/package-bundle.mjs
?? src/installer/state.mjs
?? task-docs/handoffs/task-2-harness-retrospective-20260713/HANDOFF_HASHES.sha256
?? task-docs/handoffs/task-2-harness-retrospective-20260713/README.md
?? task-docs/handoffs/task-2-harness-retrospective-20260713/ROOT_CAUSE_AND_HARNESS_ITERATION.md
?? task-docs/handoffs/task-2-harness-retrospective-20260713/SOURCE_ARTIFACTS.md
?? task-docs/handoffs/task-2-harness-retrospective-20260713/TASK2_MAIN_PATH_EXECUTION_LOG.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/ACCEPTED_CONTRACT.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/ACCEPTED_CONTRACT_V7.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/COMPATIBILITY_CONTRACT_ITERATION-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-02.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-03.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-04.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-05.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-06.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_ITERATION-07.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-02.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-03.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-04.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-05.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-06.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_REVIEW-07.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_STATE_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/CONTRACT_STATE_BASELINE_V5.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/EXECUTOR_LAUNCH_BASELINE_V7.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/IMPLEMENTATION_REPORT.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/IMPLEMENTATION_REPORT_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/IMPLEMENTATION_REPORT_V3.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/MAIN_THREAD_DECISION.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/MAIN_THREAD_DECISION_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/NODE_RUNTIME_EVIDENCE.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/PROTECTED_SOURCE_HASHES.sha256
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/RESULT_QA.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/RESULT_QA_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/RESULT_QA_V3.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_BOUNDARY_MANIFEST.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_BOUNDARY_MANIFEST_V7.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_V4_FAILURE_ROUTING.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_V7_REPORT_FAILURE_ROUTING.md
?? task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/UNTRACKED_BASELINE.sha256
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/ACCEPTED_CONTRACT.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_ITERATION-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_ITERATION-02.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_ITERATION-03.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_ITERATION-04.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_ITERATION-05.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_REVIEW-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_REVIEW-02.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_REVIEW-03.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_REVIEW-04.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_REVIEW-05.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/CONTRACT_STATE_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/DIRTY_WORKTREE_BASELINE_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/FOCUSED_EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/IMPLEMENTATION_REPORT.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/IMPLEMENTATION_REPORT_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/MAIN_THREAD_ACCEPTANCE_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/NODE24_RUNTIME_EVIDENCE.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/RESULT_QA.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/RESULT_QA_LAUNCH_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/RESULT_QA_LAUNCH_BASELINE_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/RESULT_QA_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK1_ACCEPTED_EVIDENCE_CHAIN.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_BOUNDARY_MANIFEST.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_CONTRACT_EXHAUSTION_DECISION.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_CONTRACT_EXHAUSTION_DECISION_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_CONTRACT_RESUME_DECISION.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_CONTRACT_RESUME_DECISION_V2.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_EXHAUSTION_DECISION_V3.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_IMPLEMENTATION_RESUME_DECISION.md
?? task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_RESULT_QA_FAILURE_ROUTING.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/ACCEPTED_CONTRACT.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_ITERATION-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_ITERATION-02.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_ITERATION-03.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_REVIEW-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_REVIEW-02.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_REVIEW-02_ROOT_CAUSE.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_REVIEW-03.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_REVIEW_FINDING_DISPOSITION.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_REVIEW_OPERATIONAL_ATTEMPT-01.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/CONTRACT_STATE_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/EXECUTOR_LAUNCH_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/IMPLEMENTATION_REPORT.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/MAIN_THREAD_DECISION.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/PLAN_GAP_FINDING_ROUTING.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/PLAN_GAP_TEST_TRANSCRIPT.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/PLAN_V5_REVIEW_01_DISPOSITION.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/RESULT_QA.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/RESULT_QA_LAUNCH_BASELINE.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/TASK2_ACCEPTED_EVIDENCE_CHAIN.md
?? task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/TASK3_BOUNDARY_MANIFEST.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_ITERATION-01.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_ITERATION-02.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_ITERATION-03.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_REVIEW-01.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_REVIEW-02.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_REVIEW-03.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/CONTRACT_STATE_BASELINE_V2.md
?? task-docs/history/universal-nondestructive-harness-adoption-20260712/task-1-authority/TASK1_EXHAUSTION_DECISION.md
?? task-docs/universal-harness-adoption-accepted-planning-inputs-20260712-v2.md
?? task-docs/universal-harness-adoption-accepted-planning-inputs-20260712.md
?? task-docs/universal-harness-adoption-accepted-planning-inputs-20260713-v3.md
?? task-docs/universal-harness-adoption-external-plan-review-20260712-v1.md
?? task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md
?? task-docs/universal-harness-adoption-implementation-task-plan-20260712.md
?? task-docs/universal-harness-adoption-implementation-task-plan-20260713-v5.md
?? task-docs/universal-harness-adoption-plan-review-20260712-v1.md
?? task-docs/universal-harness-adoption-plan-review-20260712-v2.md
?? task-docs/universal-harness-adoption-plan-review-20260712-v3.md
?? task-docs/universal-harness-adoption-plan-review-20260712-v4.md
?? task-docs/universal-harness-adoption-plan-review-20260713-v5-r1.md
?? task-docs/universal-harness-adoption-plan-review-20260713-v5-r2.md
?? task-docs/universal-harness-adoption-plan-review-pass-a-20260712.md
?? task-docs/universal-harness-adoption-requirements-20260712.md
?? task-docs/universal-nondestructive-harness-adoption-accepted-planning-inputs-20260712-v2.md
?? task-docs/universal-nondestructive-harness-adoption-accepted-planning-inputs-20260712.md
?? task-docs/universal-nondestructive-harness-adoption-accepted-requirements-20260712.md
?? task-docs/universal-nondestructive-harness-adoption-implementation-task-plan-20260712.md
?? task-docs/universal-nondestructive-harness-adoption-mvp-requirements-20260712.md
?? task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v1.md
?? task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v2.md
?? task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v3.md
?? task-docs/universal-nondestructive-harness-adoption-plan-review-20260712-v4.md
?? task-docs/universal-nondestructive-harness-adoption-plan-review-pass-a-20260712.md
?? task-docs/universal-nondestructive-harness-adoption-requirements-20260712.md
?? task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v1.md
?? task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v2.md
?? task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v3.md
?? task-docs/universal-nondestructive-harness-adoption-requirements-review-20260712-v4.md
?? test/bundle/compiler.test.mjs
?? test/bundle/expected-data.mjs
?? test/bundle/semantic-ledgers.test.mjs
?? test/bundle/test-helpers.mjs
?? test/lifecycle/cli.test.mjs
?? test/lifecycle/lifecycle.test.mjs
?? test/lifecycle/package-validation.mjs
?? test/lifecycle/security.test.mjs
?? test/lifecycle/test-helpers.mjs

```

## Fixed Facts

- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD/origin/main/merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Staged delta: empty
- Committed branch delta: empty
- Writable compiler-test before SHA-256: `53935da125da726697759123f12c3f7cc05bcac569960e1389d8c1467de30477`
- Exact before bytes are preserved in `COMPILER_TEST_BEFORE.mjs`.
- Five candidate docs are unaccepted and protected at the hashes in `PLAN_GAP_FINDING_ROUTING.md`.
- Task 1 old accepted chain: `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c`.
- Task 2 accepted chain: `1e31a265e3692fd5e275e818850318de67e070da560b6a6a05060ca7dd59f448`.

Contract/review/baseline artifacts created after this capture are expected new known Markdown/code-evidence paths. The executor launch baseline must recapture full status after the accepted boundary is frozen and must explain every delta from this baseline.

