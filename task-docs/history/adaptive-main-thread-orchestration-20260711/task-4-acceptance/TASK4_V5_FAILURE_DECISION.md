# Task 4 v5 Failure Decision And Finding Routing

Identity: `adaptive-main-thread-orchestration-task-4-v5-failure-decision-20260711-v1`

Status: `FINAL FAIL — RETURN TO TASK 4 CONTRACT DESIGN`

## Decision

Task 4 v5 is not accepted. Its implementation remains a failed-run working state and must not be cited as an accepted Task 4 result. No v5 implementation path is rolled back or normalized; revision and reacceptance require a new versioned Task 4 boundary.

## Frozen Failed-Run Evidence

| Artifact | Identity | Path | SHA-256 | Decision |
| --- | --- | --- | --- | --- |
| v5 accepted contract | `adaptive-main-thread-orchestration-task-4-contract-20260711-v5` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md` | `e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc` | contract passed review but contains the later-proven semantic defect |
| Implementation Report | `adaptive-main-thread-orchestration-task-4-implementation-report-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md` | `06d6f04c80b8e5167ca3737bdc352a8a282257a3e98b432e0fd3e3203fd5d6c5` | producer PASS claim rejected |
| Result QA | `adaptive-main-thread-orchestration-task-4-result-qa-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md` | `afa39325780133e47d0d44aecd456a40f3a5f642bf4f6d30107d58e32d317bbe` | `FAIL` |

## P1 Finding

Failure origin: `Task 4 semantic contract design`.

Owning task: `Task 4 — Close Acceptance, Calibration, Documentation, And Adoption`.

The requirements permit the complete governed flow when either the user explicitly requests it or the main thread judges the complete role sequence to be the clearest control coverage. The protected adaptive protocol preserves the same authority: complete v2 may be explicitly requested or deliberately selected as the clearest control coverage.

Task 4 v5 instead required RSM-005 and public/adoption/example surfaces to preserve full v2 only for an explicit request or stricter downstream policy. That wording removed the valid deliberate-main-thread selection path. Structural checks, AS IDs, calibration IDs, and the explicit-request CC-FULL-V2 case could all pass while this user-valued authority was lost.

This is the controlling AC-pass-but-user-fail counterexample for the failed run: no explicit full-v2 request and no stricter policy exist, but the main thread has evidence that the complete six-role sequence is the clearest control coverage. Requirements and protocol allow that choice; v5 reusable/public guidance forbids or omits it.

## Transitive No-Impact Decision For Task 1-3

Task 1, Task 2, and Task 3 remain accepted. They are not reopened.

| Upstream task | No-impact evidence | Decision |
| --- | --- | --- |
| Task 1 control-plane authority | The accepted adaptive protocol still says complete v2 may be `explicitly requested or deliberately selected as the clearest control coverage`. Requirements line 183 and protocol line 53 agree. The P1 finding is that Task 4 failed to preserve this accepted authority, not that Task 1 defined it incorrectly. All nine Task 1 accepted implementation hashes remain unchanged. | no impact |
| Task 2 packets, context, boundaries, and run artifacts | The accepted Task 2 interfaces carry topology, gates, evidence, stable authority, retries, and handoffs selected by the main thread. They do not impose the v5 `only explicit/policy` restriction. All nine Task 2 accepted implementation hashes remain unchanged. | no impact |
| Task 3 profiles and Codex adapter | The six accepted profiles remain reusable capabilities and do not own topology selection. They support both adaptive compositions and complete-v2 composition without restricting why the main thread may select it. All eight Task 3 accepted implementation hashes remain unchanged. | no impact |

The complete 26-path Task 1-3 accepted implementation inventory and all 12 accepted contract/report/QA/main-thread-acceptance artifacts were recomputed after the v5 failure and match their accepted hashes. No protected upstream byte changed during Task 4 v5. No accepted upstream identity is superseded.

## v5 Working-State Treatment

The following v5 implementation paths remain in place as rejected working state so v6 can make a bounded revision without destructive rollback:

```text
08915572985ec72c7777ff6518ade0a2bce388ed11c05810fd534de3f4cff420  task-docs/_harness/evaluator-calibration.md
f8fbb5a05263856df4f3e2a4d9bbf000e63be937afb5621106b58c6c2ece08aa  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
fa546900ca79f24610b7f235e085257932ad02a04917ed2f65ce9aaf9b1ed295  task-docs/_harness/templates/routing-scenario-matrix-template.md
2b123187572be899e24f0058b9c4fbb842e0dbd2430b3a655049dced3e1a87ca  README.md
623ba8a9aacf9d7f11e190315160accb9bd2edbe7c3de10f192b7c9b7ff59c4c  docs/architecture.md
e0bbbd5fed34ced6cba185dc02ec03ca07f478d6f434ebd9c73ed52c49d19ff2  docs/adoption/router-refactor-runbook.md
ab134915bc23a6d71c65df95462ef99061c72226fa5dbdfdc3ce94fd7a6471d1  examples/minimal-router/AGENTS.md
```

These bytes are neither rolled back nor accepted. A v6 executor may change them only under a new strictly reviewed boundary. The release checklist, example README, Task 1-3 files, protocols, profiles, adapter, config, scripts, other templates, and every v5 contract/report/QA/manifest/baseline remain protected.

## Required Finding Route

1. Freeze the complete post-v5 dirty state and this decision as v6 contracting inputs.
2. Create a versioned Task 4 v6 contract that preserves adaptive default, required full v2, and evidence-backed deliberate main-thread full-v2 selection as three distinct states.
3. Add a supplemental `CC-DELIBERATE-FULL-V2` fixture and `CAL-ADAPT-010`; do not add AS-32 or mutate the frozen meaning of AS-01 through AS-31.
4. Revalidate every Task 4 AC. No v5 PASS label is inherited as acceptance evidence.
5. Strictly review and freeze the v6 boundary before any implementation revision.
6. Rerun producer-independent Result QA and main-thread acceptance under new identities.

Until those steps complete, Task 4 remains failed and no whole-system acceptance may be claimed.
