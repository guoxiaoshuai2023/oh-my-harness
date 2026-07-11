# Task 4 Revised Boundary Manifest

Identity: `adaptive-main-thread-orchestration-task-4-boundary-manifest-20260711-v2`

Status: `FROZEN`

Task identity: `adaptive-main-thread-orchestration-task-4-acceptance-v7`

This manifest freezes the revised Task 4 boundary after the v5 result failure and the v6 contract-review failure. Its final SHA-256 is supplied externally after creation. It does not authorize implementation or executor launch by itself.

## Accepted Revised Boundary

- Identity: `adaptive-main-thread-orchestration-task-4-contract-20260711-v7`
- Path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md`
- SHA-256: `895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d`
- Source iteration: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md`, SHA-256 `895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d`
- Byte identity: `cmp -s` passed between source iteration and accepted boundary.
- Final strict review: `adaptive-main-thread-orchestration-task-4-contract-review-20260711-v7`, path `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md`, SHA-256 `83923a74d2d19bf3153e8f428395f93864c7ba978ffbffc7f4301cab88bfe06b`, decision `PASS`.

## Revised Contract Chain

| Artifact identity | Path | SHA-256 | State |
| --- | --- | --- | --- |
| `adaptive-main-thread-orchestration-task-4-v5-failure-decision-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md` | `2a51239c5bc8e5c4668e2d58fa561e027db51dba9ffa6a824ced0b51fdfb890f` | frozen finding route |
| `adaptive-main-thread-orchestration-task-4-v6-contract-state-baseline-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md` | `55492bb4d0c6eebfdfb4c0a203f55d3ccc95bbf574820ec0c043d257bfefec03` | frozen dirty/protected state |
| `adaptive-main-thread-orchestration-task-4-contract-20260711-v6` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-06.md` | `4de6b362f175ded434a06ad5f1ff6add5809c6ce4154758141db7031ba178a07` | superseded; review FAIL |
| `adaptive-main-thread-orchestration-task-4-contract-review-iteration-06-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md` | `16ede8c538b1b034473fab98e1fc619ef7377c801f6df0fd27bfb48fcea12348` | `FAIL` |
| `adaptive-main-thread-orchestration-task-4-contract-20260711-v7` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_ITERATION-07.md` | `895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d` | accepted source |
| `adaptive-main-thread-orchestration-task-4-contract-review-iteration-07-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-07.md` | `c7038c93c74a507991f0667ed4c04e016f34faa022fe9f09b8a747411cff9015` | `PASS` |
| `adaptive-main-thread-orchestration-task-4-contract-review-20260711-v7` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V7.md` | `83923a74d2d19bf3153e8f428395f93864c7ba978ffbffc7f4301cab88bfe06b` | `STRICT PASS` |
| `adaptive-main-thread-orchestration-task-4-contract-20260711-v7` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V7.md` | `895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d` | `FROZEN` |

## Frozen Authority And Failed-Run Evidence

| Artifact | Path | SHA-256 | Treatment |
| --- | --- | --- | --- |
| Requirements v4 | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` | controlling authority |
| Adaptive protocol | `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` | controlling protected authority |
| Implementation plan v5 | `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md` | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` | unchanged Task 4 scope/AS mapping only |
| v5 accepted contract | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md` | `e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc` | protected failed provenance; not accepted behavior |
| v5 Implementation Report | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md` | `06d6f04c80b8e5167ca3737bdc352a8a282257a3e98b432e0fd3e3203fd5d6c5` | rejected result evidence |
| v5 Result QA | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md` | `afa39325780133e47d0d44aecd456a40f3a5f642bf4f6d30107d58e32d317bbe` | `FAIL`; controlling P1 finding |

## Rejected-v5 Implementation Before State

These current bytes are retained without rollback and are not accepted. They are the only implementation write candidates under v7:

```text
fa546900ca79f24610b7f235e085257932ad02a04917ed2f65ce9aaf9b1ed295  task-docs/_harness/templates/routing-scenario-matrix-template.md
2b123187572be899e24f0058b9c4fbb842e0dbd2430b3a655049dced3e1a87ca  README.md
623ba8a9aacf9d7f11e190315160accb9bd2edbe7c3de10f192b7c9b7ff59c4c  docs/architecture.md
e0bbbd5fed34ced6cba185dc02ec03ca07f478d6f434ebd9c73ed52c49d19ff2  docs/adoption/router-refactor-runbook.md
ab134915bc23a6d71c65df95462ef99061c72226fa5dbdfdc3ce94fd7a6471d1  examples/minimal-router/AGENTS.md
f8fbb5a05263856df4f3e2a4d9bbf000e63be937afb5621106b58c6c2ece08aa  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
08915572985ec72c7777ff6518ade0a2bce388ed11c05810fd534de3f4cff420  task-docs/_harness/evaluator-calibration.md
```

## Upstream No-Impact And Protected State

- All 26 Task 1-3 accepted implementation hashes and 12 accepted evidence hashes are frozen in `CONTRACT_STATE_BASELINE_V6.md` and were independently reverified during strict v7 review.
- The v6 baseline's 93-entry protected inventory remains controlling. All entries matched during v7 review.
- `docs/adoption/open-source-release-checklist.md` and `examples/minimal-router/README.md` are protected.
- Protocols, profiles, adapter, config, scripts, other templates, requirements, plan, all failure/contract/review/report/QA/manifest/baseline artifacts are protected.
- Task 1-3 are not superseded or reopened.

## Freeze Decision

- Three-state authority: `PASS`.
- Deliberate-selection evidence threshold: `PASS`.
- Exact route/gate binding: `PASS`.
- CAL-ADAPT-010 field completeness: `PASS`.
- No-fixed-pipeline and stage-boundary semantics: `PASS`.
- Scope, dirty state, Task 1-3 no-impact, and protected evidence: `PASS`.
- Task 4 v5 remains failed and unaccepted.
- Task 4 v7 implementation has not started.
- `EXECUTOR_LAUNCH_BASELINE_V7.md` has not been created and is required before a separately authorized executor launch.
- No implementation file was modified during v6/v7 contracting.
- No stage, commit, push, PR, dependency, validator, nested delegation, secret access, or external action occurred.
