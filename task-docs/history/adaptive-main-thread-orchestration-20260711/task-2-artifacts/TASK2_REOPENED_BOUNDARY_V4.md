# Task 2 Reopened Boundary: Calibration Binding And Three-State Templates

Identity: `adaptive-main-thread-orchestration-task-2-contract-20260712-v4`

State: `CANDIDATE - ACCEPTED ONLY BY STRICT INDEPENDENT BOUNDARY REVIEW`

Semantic Risk: `HIGH`

Operational Risk: `LOW`

## Objective

Correct the two Task 2-owned portions of the evidence-backed PR #6 review findings without reopening unrelated Task 2 behavior:

1. make canonical evaluator calibration identity/path an unavoidable field for every evaluator invocation packet and require the evaluator's calibration-consultation return fields; and
2. make the reusable orchestration, plan-review, and result-QA templates preserve and evaluate all three complete-v2 states: adaptive default, required complete v2, and evidence-backed deliberate complete v2.

This is a focused revision to the previously accepted Task 2 result. It does not replace adaptive orchestration, introduce a new stage, make complete v2 the default, or change the accepted retry, context, stable-boundary, safety, or semantic model.

## Controlling Evidence

| Authority | Path | SHA-256/use |
| --- | --- | --- |
| Requirements v4 | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` |
| Adaptive protocol | `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` |
| Canonical calibration | `task-docs/_harness/evaluator-calibration.md` | `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06` |
| Original PR review | `task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_ORIGINAL.md` | `70b51824396209d0e98bc2418a881c93dc1101400121b5dac6e484e3da588bd5` |
| Finding route | `task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_FINDING_ROUTING.md` | `35a9fd03de0c00dee6e507dd8bb5d7b7c2f1016f150038316b53f94185878adc` |
| Prior Task 2 acceptance | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-2-artifacts/MAIN_THREAD_ACCEPTANCE.md` | historical accepted state, superseded only for affected surfaces |

CAL-ADAPT-005 and CAL-ADAPT-010 are directly applicable. Structural checks cannot replace independent semantic review.

## Allowed Writes And Before Hashes

Only these four implementation paths may change:

```text
a84164c98a5e625a0c49619e1295dee1c54b33ea2f6913d46014ec6aa7c7389a  task-docs/_harness/templates/task-packet-template.md
1ea9e541176853f90e45096ce62b7163f4acf27fbeb3be4f7f236d27724440a3  task-docs/_harness/templates/orchestration-prompt-template.md
5f012a023141f1455506a7736c0ec880e73b20e18df15c20de5255b9b44d09c9  task-docs/_harness/templates/plan-review-template.md
2ebfbcc8f24bca78be0d10bd7c4cba14d6e7f1c3e52baef07bca3a47f5994a08  task-docs/_harness/templates/result-qa-template.md
```

Every other implementation path is protected. In particular, all protocols, router/routed docs, calibration content, acceptance matrix, profiles, adapter, config, scripts, README, architecture, adoption/example docs, CI, requirements, plan, prior contracts/reports/QA/acceptance, and Task 1/3/4 implementation files are read-only.

Main-thread persistence of this boundary, its review, Implementation Report, Result QA, and acceptance artifacts is gate-artifact authority outside the producer write set.

## Required Behavior

### Canonical Calibration Packet Binding

`task-packet-template.md` must make these fields non-optional for every evaluator invocation:

- canonical evaluator-calibration identity;
- canonical evaluator-calibration path, defaulting to `task-docs/_harness/evaluator-calibration.md` for this harness;
- instruction to consult that source before deciding;
- required return field `Consulted calibration path`;
- required return field `Relevant calibration case IDs`, containing applicable IDs or explicit `N/A` after consultation.

The packet must distinguish this evaluator-only binding from ordinary producer calls. An evaluator packet missing identity/path or the required return contract is invalid and must stop before launch. `N/A` applies only to relevant case IDs after consultation; it cannot replace the canonical path or consultation itself.

### Three-State Reusable Control Model

The three affected reusable templates must preserve these states with exact force:

1. Adaptive default: main thread `MUST` select the smallest sufficient topology; harness presence, risk labels, role availability, or inertia never automatically select complete v2.
2. Required complete v2: explicit user request or stricter downstream policy `MUST` select the complete ordered composition.
3. Deliberate complete v2: absent those requirement triggers, main thread `MAY` select complete v2 only when a task-specific decision record contains:
   - concrete task facts;
   - comparison with at least one smaller viable topology and its specific control/evidence/handoff gap;
   - non-duplicative value for all six roles;
   - triggered gate owners, primary evidence, dependencies, handoffs, and decisions;
   - positive marginal value after cost/context impact;
   - active main-thread synthesis, topology revision, intervention, finite retries, evidence arbitration, and final acceptance.

`orchestration-prompt-template.md` must make all three selection branches executable and recordable. `plan-review-template.md` and `result-qa-template.md` must independently verify the applicable branch, deliberate evidence completeness, anti-automatic selection, and continued main-thread control. Missing deliberate evidence is strict FAIL when that path was selected.

## Acceptance Criteria

| AC | Requirement |
| --- | --- |
| T2R-AC1 | Every evaluator packet has non-optional canonical calibration identity/path, consultation instruction, and return contract. |
| T2R-AC2 | `N/A` is permitted only for relevant case IDs after consultation; missing calibration path/consultation stops invocation. |
| T2R-AC3 | Orchestration template expresses adaptive `MUST`, required full-v2 `MUST`, and deliberate evidence-backed `MAY` without a fixed default pipeline. |
| T2R-AC4 | Plan-review template checks all three states, the complete deliberate threshold, anti-automatic selectors, and strict failure behavior. |
| T2R-AC5 | Result-QA template checks all three states, the complete deliberate threshold, active main-thread controls, and calibration return fields. |
| T2R-AC6 | Existing packet fields, stable-boundary rules, evaluator independence, strict verdicts, evidence requirements, and AC-pass-but-user-fail controls are preserved or strengthened. |
| T2R-AC7 | Only four allowed files change; no dependency, external action, CI change, profile change, or semantic expansion occurs. |

## Validation

Run and report:

```sh
python3.11 -m py_compile scripts/*.py
python3.11 scripts/validate_router_fixture.py --router AGENTS.md --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md
git diff --check -- task-docs/_harness/templates/task-packet-template.md task-docs/_harness/templates/orchestration-prompt-template.md task-docs/_harness/templates/plan-review-template.md task-docs/_harness/templates/result-qa-template.md
```

Also perform:

- exact four-path changed-scope proof and before/after hashes;
- field-level evaluator packet audit;
- three-state modal-force comparison for all three reusable templates;
- deliberate-selection six-field completeness and negative checks for automatic/default/only-explicit narrowing;
- calibration identity/path and return-contract checks;
- preservation comparison for existing strict verdict, evidence, independence, stable-boundary, and no-repair requirements.

## Reporting And Stop Conditions

The producer returns an Implementation Report in its response and does not create gate artifacts. Report identity: `adaptive-main-thread-orchestration-task-2-revision-implementation-report-20260712-v1`.

Stop without repair if any controlling hash or allowed before hash mismatches; another implementation path is needed; a fourth orchestration state or fixed pipeline is introduced; calibration becomes optional; `N/A` can bypass consultation; required full v2 becomes optional; deliberate full v2 becomes automatic; any existing gate weakens; or a dependency, external action, secret access, stage, commit, push, PR, or merge would be required.

No nested delegation is authorized. Task 3 implementation must not run concurrently. Independent Result QA and main-thread acceptance are required after implementation.
