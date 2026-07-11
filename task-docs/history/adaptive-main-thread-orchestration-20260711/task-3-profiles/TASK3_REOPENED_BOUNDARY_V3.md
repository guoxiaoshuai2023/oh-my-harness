# Task 3 Reopened Boundary: Evaluator Calibration Invocation Contract

Identity: `adaptive-main-thread-orchestration-task-3-contract-20260712-v3`

State: `CANDIDATE - ACCEPTED ONLY BY STRICT INDEPENDENT BOUNDARY REVIEW`

Semantic Risk: `HIGH`

Operational Risk: `LOW`

## Objective

Correct the Task 3-owned PR #6 finding by making each evaluator profile require the task packet's canonical evaluator-calibration binding on every invocation, consult it before deciding, and report the consulted path plus relevant case IDs or `N/A`, while preserving the previously accepted reusable role intelligence and hard boundaries.

Task 3 does not own topology, the canonical calibration content, or the packet schema. Revised Task 2 acceptance is a precondition for Task 3 implementation because Task 2 defines the packet fields that these profiles consume.

## Controlling Evidence

| Authority | Path | SHA-256/use |
| --- | --- | --- |
| Requirements v4 | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` |
| Adaptive protocol | `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` |
| Canonical calibration | `task-docs/_harness/evaluator-calibration.md` | `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06` |
| Original PR review | `task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_ORIGINAL.md` | `70b51824396209d0e98bc2418a881c93dc1101400121b5dac6e484e3da588bd5` |
| Finding route | `task-docs/history/adaptive-main-thread-orchestration-20260711/pr-6-delivery-review/PR_REVIEW_FINDING_ROUTING.md` | `35a9fd03de0c00dee6e507dd8bb5d7b7c2f1016f150038316b53f94185878adc` |
| Prior Task 3 acceptance | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-3-profiles/MAIN_THREAD_ACCEPTANCE.md` | historical accepted state, superseded only for the three evaluator calibration bindings |

CAL-ADAPT-005 is directly applicable. Primary evidence remains mandatory; calibration selects recurring failure patterns and never substitutes for actual inspection.

## Precondition

Before Task 3 implementation starts, revised Task 2 must have:

- an independently accepted packet schema with non-optional evaluator calibration identity/path;
- required evaluator return fields for consulted path and relevant IDs or `N/A`;
- a stable accepted Task 2 revision identity and hashes supplied in the Task 3 launch packet.

If Task 2 does not pass or changes this interface, stop and revise/re-review this boundary before implementation.

## Allowed Writes And Before Hashes

Only these three implementation paths may change:

```text
dc7dba230901c89e888a1ab845f279d24ba34915eb183947345083c9930452d8  .codex/agents/harness-plan-evaluator.toml
8fb5bd35b8e3578de78410a1c5b2fb09789b329150b9ee6ae6c0770a163aed47  .codex/agents/harness-solution-evaluator.toml
3c3f2e562087264143b865f4834c9cb6757204c64ff5d70757361af053a0945c  .codex/agents/harness-result-evaluator.toml
```

Every other implementation path is protected, including the other three profiles, adapter, config, all templates/protocols/calibration/router/docs/scripts/CI, requirements/plan, prior artifacts, and Task 1/2/4 files.

Main-thread persistence of boundary/review/report/QA/acceptance artifacts is outside producer authority.

## Required Profile Behavior

Each of the three evaluator profiles must state, with role-appropriate wording:

- every invocation must receive from its main-thread task packet the canonical evaluator-calibration identity and path;
- the evaluator must stop before review if that identity/path is absent, ambiguous, unreadable, or not bound through the packet;
- the evaluator must consult the supplied canonical source before deciding;
- calibration is an evidence selector and does not replace primary request, boundary, diff, state, command, or outcome evidence;
- the returned handoff must identify `Consulted calibration path` and `Relevant calibration case IDs`, using explicit `N/A` only when no case is relevant after consultation;
- the evaluator may not repair the target, reinterpret scope, expand topology, fabricate evidence, or issue a qualified PASS.

The change must remain concise and reusable. Do not copy CAL cases or task-specific paths/ACs into profiles. The canonical path is supplied by the packet; profiles must not silently fall back to repository discoverability.

## Preserved Non-Regression Boundaries

- `sandbox_mode = "read-only"` remains exact for all three profiles.
- Independent review of primary evidence remains mandatory.
- Strict `PASS`/`FAIL`, no `PASS with caveats`, and failure on missing required evidence remain.
- No repair, rewrite, execution, external action, self-acceptance, or silent authority expansion.
- No fixed six-role pipeline or topology ownership enters a profile.
- No nested delegation without packet authorization and enforceable bounds.
- Role-specific intelligence remains distinct: plan fidelity/feasibility, boundary ambiguity/authority, and actual result/regression/outcome evidence.

## Acceptance Criteria

| AC | Requirement |
| --- | --- |
| T3R-AC1 | All three profiles require packet-supplied canonical calibration identity/path on every invocation and stop when missing. |
| T3R-AC2 | All three require consultation before decision and return consulted path plus relevant IDs or post-consultation `N/A`. |
| T3R-AC3 | Calibration is explicitly an evidence selector, never a substitute for primary evidence. |
| T3R-AC4 | All three TOML files parse; names and exact `read-only` sandboxes remain unchanged. |
| T3R-AC5 | Independence, strict verdict, no-repair, no-fabrication, stop/escalation, and primary-evidence force are preserved or strengthened. |
| T3R-AC6 | Profiles remain generic and do not absorb task paths, current ACs, complete workflow order, or copied calibration cases. |
| T3R-AC7 | Only three allowed evaluator files change; no adapter/config/template/protocol/calibration/CI/dependency/external action changes. |

## Validation

Run and report:

```sh
python3.11 - <<'PY'
from pathlib import Path
import tomllib
paths = [
    Path('.codex/agents/harness-plan-evaluator.toml'),
    Path('.codex/agents/harness-solution-evaluator.toml'),
    Path('.codex/agents/harness-result-evaluator.toml'),
]
for path in paths:
    with path.open('rb') as handle:
        data = tomllib.load(handle)
    assert data['sandbox_mode'] == 'read-only'
PY
git diff --check -- .codex/agents/harness-plan-evaluator.toml .codex/agents/harness-solution-evaluator.toml .codex/agents/harness-result-evaluator.toml
```

Also perform:

- exact three-path scope proof and before/after hashes;
- per-profile calibration binding/stop/consult/return-field comparison;
- before/after modal-force ledger for read-only, independence, strict verdict, primary evidence, no repair, no fabrication, stops, and nesting;
- negative checks for optional calibration, discoverability-only fallback, copied case text, task-specific content, and fixed topology;
- interface walkthrough using the independently accepted revised Task 2 evaluator packet fields.

## Reporting And Stop Conditions

The producer returns an Implementation Report in its response and does not create gate artifacts. Report identity: `adaptive-main-thread-orchestration-task-3-revision-implementation-report-20260712-v1`.

Stop without repair if Task 2 precondition is absent or changed; any controlling/before hash mismatches; another path is needed; an evaluator sandbox/independence/evidence/strict/no-repair boundary weakens; calibration becomes optional or discoverability-only; task-specific/full-pipeline content enters a profile; or a dependency, external action, secret access, stage, commit, push, PR, or merge would be required.

No nested delegation is authorized. Task 2 and Task 3 implementation are serialized. Independent Result QA and main-thread acceptance are required after implementation.
