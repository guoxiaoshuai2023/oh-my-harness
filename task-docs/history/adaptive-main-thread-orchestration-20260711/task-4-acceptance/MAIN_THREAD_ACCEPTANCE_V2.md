# Task 4 Main-Thread Final Acceptance

Identity: `adaptive-main-thread-orchestration-task-4-main-thread-acceptance-20260711-v2`

Decision: `FINAL PASS`

Retry domain: `adaptive-main-thread-orchestration-task-4-acceptance-result-20260711-rd1`

Accepted candidate: immutable Task 4 v7 seven-file state

Captured: `2026-07-12T00:04:46+08:00`

## Decision

The main thread accepts Task 4. The user's substantive decision validly resumed the existing exhausted retry domain for one verification-only quality cycle. That cycle used one fresh, producer-independent, read-only Result Evaluator, produced a strict PASS, and made no implementation write. The main thread then inspected primary repository evidence rather than accepting the evaluator label by itself.

The retry budget is consumed successfully. This artifact closes the Task 4 acceptance decision; it does not authorize another evaluator, executor, implementation change, task, commit, push, PR, secret access, or external write.

## Resume And QA Evidence

| Artifact | Identity | SHA-256 | Decision/use |
| --- | --- | --- | --- |
| Verification resume boundary | `adaptive-main-thread-orchestration-task-4-verification-resume-boundary-20260711-v1` | `91e938597b97f6bb5323e142e18c81fc55a9920b97e644da1ccc87773235c78d` | same-domain substantive resume; zero-write; one verification cycle |
| Result QA v3 | `adaptive-main-thread-orchestration-task-4-result-qa-20260711-v3` | `5643130053a2aea06462b44ebdcb4dd3350bfb144ab4e786ddce6387dc8cfb12` | producer-independent strict PASS |
| Prior retry ledger/failure decision | `adaptive-main-thread-orchestration-task-4-v7-retry-ledger-failure-decision-20260711-v1` | `b3a3c04e11d0e9241af0a6e6486662bbd8f5fb25068d3abcc3b3cfcb1608c431` | prior exhaustion and stable domain preserved |

Historical `IMPLEMENTATION_REPORT_V2.md` SHA `189f367a9f15bc30045c19d36d9128e722e916db6c86e564c304a130702291df` and `RESULT_QA_V2.md` SHA `5e8e9120fa254da5cb4cbeb9a4329e29d3d0a0325c4b3c08e3ae7c846742c8c5` remain historical evidence only. They are not the accepted verdict for this cycle, and their earlier failure is not relabeled as PASS.

## Accepted Immutable Candidate

```text
8b4a374b3c20115ce2abf5203685dd9367331319c511c51262406340ac48d080  task-docs/_harness/templates/routing-scenario-matrix-template.md
ad0e4b2bfbd33d6a16ee37c0d1a91e1582ad255634cb583c358a416199190705  README.md
7fa1c00d3537cd6594547707513929292d0230f4b1f7a1903bd585b442c46d9f  docs/architecture.md
70aa603b0c875e63ae8149ff7e4d18cb36e98a604af24fb77024e07cccc98f41  docs/adoption/router-refactor-runbook.md
8e60a062235c755f6892f200de3aba6c148b5ab48f5ae61e7bf4a98ac46ac21e  examples/minimal-router/AGENTS.md
0eeb3024a00e06fdf0866adbd6936694044cc834c510aa9eedad21071f700ee1  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06  task-docs/_harness/evaluator-calibration.md
```

These hashes matched before the evaluator, after the evaluator, and during the main-thread review. No candidate was modified during the resumed cycle.

## Main-Thread Primary-Evidence Review

The main thread independently verified:

- controlling requirements SHA `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`;
- implementation plan SHA `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`;
- adaptive protocol SHA `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a`;
- v7 accepted contract, strict review, boundary manifest, and launch baseline hashes;
- all 26 Task 1-3 accepted implementation paths, all 12 Task 1-3 accepted evidence artifacts, and all 101 v7 protected files with zero mismatch;
- exact branch/ref state: branch `codex/adaptive-main-thread-orchestration`, with `HEAD`, `origin/main`, and merge base all `caf93131b6cb591644271105b1d8921459245341`;
- empty staged delta and empty committed `origin/main...HEAD` delta;
- the pre-boundary dirty state reconstructed exactly after excluding only the resume boundary and Result QA v3:
  - 28 tracked modifications and 71 untracked files;
  - short-status SHA `0e5fc1cdfdba1cea6490cd8e8b8c242806a74b079725a0ef5dd20cee1a1760d0`;
  - porcelain-v2 SHA `7d7c9d36964ab1a2e01ca6198e5e372fc74695e768043d8c255e87ed428ac1aa`;
  - untracked-path SHA `64ca48c8d05625aa1a7c81985c5b7edcf3509681616fdda53de83d8f58248f7b`;
  - untracked-content-manifest SHA `666fb5f154f95884bf65775c29961da9965e29eedc050b32e48ad31b9a78acf7`.

The only resumed-cycle additions before this acceptance are `TASK4_VERIFICATION_RESUME_BOUNDARY_V1.md` and `RESULT_QA_V3.md`. Both are gate artifacts, not implementation changes.

## Acceptance Results

| Criterion | Decision | Main-thread evidence |
| --- | --- | --- |
| T4-AC1 | PASS | AS-01 through AS-31 occur exactly once, remain ordered and field-complete, retain frozen row SHA `c4b5125a548e7ea7fc9dba22ac6d920a513eb49beb091650c19959414fdd98fc`, and AS-32 is absent. |
| T4-AC1A | PASS | RSM-005 preserves adaptive `MUST`, required-full-v2 `MUST`, and evidence-backed deliberate-full-v2 `MAY`; smoke output explicitly disclaims semantic proof. |
| T4-AC2 | PASS | CAL-ADAPT-001 through 010 occur once; CAL-ADAPT-010 has the complete 14-field schema and rejects exclusive explicit/policy narrowing. |
| T4-AC3 | PASS | README preserves adaptive default, required full v2, deliberate evidence-backed full v2, and no fixed default pipeline. |
| T4-AC4 | PASS | Architecture preserves main-thread topology ownership, non-exhaustive composition, all three states, and the adapter boundary. |
| T4-AC5 | PASS | Runbook preserves traceability, three-state modal force, and anti-automatic selection; the release checklist remains protected. |
| T4-AC6 | PASS | Minimal router demonstrates all three states and active main-thread control without making complete v2 the default; example README remains protected. |
| T4-AC7 | PASS | CC-NEGATIVE and CAL-ADAPT-010 preserve both AC-pass-but-user-fail classes and strict failure semantics. |
| T4-AC8 | PASS | Exact seven-file candidate scope; no validator, dependency, seventh role, protocol/profile/adapter/config/script change, external action, secret access, stage, commit, push, or PR. |
| T4-AC9 | PASS | Six CC fixtures are present; the original five retain frozen SHA `87cd09539350995f04585122b308365598a9f39199927782954a893865918236`; CC-DELIBERATE-FULL-V2 retains every required evidence and active-control field. |
| T4-AC10 | PASS | Task 1-3 26-path and 12-evidence inventories match with no upstream defect. |

AS-01 through AS-31 each have an explicit semantic decision and failure signal. The scenarios distinguish direct work, sourced synthesis, bounded execution/review, high semantic controls, high-impact STOP behavior, explicit full v2, delegation value, parallel dependency handling, evidence arbitration, replanning, stage-local and cumulative retry behavior, current-state freshness, context/handoff thresholds, reusable profiles, packet-driven depth, review specialization, strict evaluator behavior, protected boundaries, producer independence, nested delegation, route binding, unsupported findings, safety recovery, qualifying resume, and artifact-free operational budgets. No scenario is replaced by a structural ID check.

The six combined walkthrough decisions are accepted: `CC-LOW`, `CC-MEDIUM`, `CC-HIGH`, `CC-FULL-V2`, and `CC-DELIBERATE-FULL-V2` pass their positive semantics; `CC-NEGATIVE` passes as a fixture because its internal outcome is strict semantic FAIL.

CAL-ADAPT-001 through CAL-ADAPT-010 are accepted as durable failure classes. They cover mechanical full-loop selection, missing triggered gates, incomplete packets/route binding, unmanaged parallelism/voting, weakened profiles, retry resets, unsupported evaluator failures, artifact-free operational failures, structural-over-semantic proof, and complete-v2 authority narrowing.

## Three-State And Modal-Force Decision

The five affected public/routing/adoption/example surfaces consistently preserve:

1. Adaptive default: the main thread `MUST` choose the smallest sufficient topology and cannot run the full sequence merely because harness roles exist.
2. Required full v2: explicit user request or stricter downstream policy `MUST` run the complete six-role order.
3. Deliberate main-thread selection: without either requirement trigger, the main thread `MAY` choose complete v2 only when task-specific evidence records concrete facts, a smaller-topology comparison and gap, non-duplicative value for all six roles, gate/evidence/dependency/handoff ownership, positive cost/context value, and active synthesis/intervention/retry/arbitration/final acceptance.

HIGH risk, broad scope, harness naming, role availability, and process inertia may inform task facts but cannot independently select complete v2. Triggered safety and semantic gates remain mandatory under every topology. The main thread remains active and owns synthesis, intervention, evidence arbitration, topology revision, and final acceptance.

## Validation And Limits

Passed validations:

- AS/CC counts, order, field completeness, absence of AS-32, and frozen hashes;
- CAL-ADAPT-001 through 010 inventory and CAL-ADAPT-010 14-field semantics;
- router fixture smoke/coverage check, explicitly not semantic-equivalence proof;
- all six Codex agent TOML files parse with `tomllib`;
- candidate, authority, upstream, evidence, and protected SHA-256 checks;
- branch/ref, staged/committed delta, complete dirty-state reconstruction, and `git diff --check`.

Not validated because it is outside this synthetic, documentation/configuration acceptance scope:

- no live fixture systems, browser flow, deployment, publication, network operation, credential use, or external-system action;
- no full Markdown link crawler; referenced and protected paths were checked directly.

These limits do not leave a frozen T4 acceptance criterion unverified.

## Final State

- Result QA v3: `STRICT PASS`.
- Main-thread independent decision: `FINAL PASS`.
- Retry domain: accepted and closed for this Task 4 result.
- Remaining blocking finding: none.
- Task 1-3: accepted, unchanged, and not reopened.
- Implementation writes during resumed cycle: none.
- Staged/committed delta: empty.
- Commit/push/PR: not performed.
- Other task execution: not started.
