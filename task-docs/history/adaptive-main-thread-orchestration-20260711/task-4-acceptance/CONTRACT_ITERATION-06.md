# Revised Execution Contract: Task 4 v6 - Restore Complete-v2 Selection Authority

## Contract Identity

- Task identity: `adaptive-main-thread-orchestration-task-4-acceptance-v6`
- Contract iteration: `06`
- Stable identity: `adaptive-main-thread-orchestration-task-4-contract-20260711-v6`
- Failure origin being corrected: `Task 4 v5 semantic contract design`
- Semantic risk: `HIGH`

## Objective

Revise only the rejected Task 4 v5 surfaces so they preserve all three valid complete-v2 selection states: adaptive default, required full v2, and evidence-backed deliberate main-thread selection. Add one supplemental compatibility fixture and one durable calibration case that detect the v5 `only explicit request / stricter policy` regression. Revalidate the whole Task 4 result without reopening Task 1-3, adding AS-32, or treating any v5 PASS label as accepted evidence.

This is a revision boundary for the existing failed working state. It does not roll back v5 and does not authorize a redesign of accepted protocols, templates, profiles, adapters, routes, or scripts.

## Controlling Authority And Precedence

Authority order for this revision:

1. The user's direct v6 revision request and its fixed three-state requirements.
2. Requirements `adaptive-main-thread-orchestration-requirements-20260711-v4`, path `task-docs/main-thread-control-enhancement-requirements-20260711.md`, SHA-256 `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`.
3. Protected adaptive protocol, path `task-docs/_harness/adaptive-orchestration-protocol.md`, SHA-256 `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a`, especially `Composable, Non-Exhaustive Modes` and `Optional Stages, Mandatory Gates, And Route Binding`.
4. Frozen implementation plan `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`, SHA-256 `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`, only for unchanged Task 4 scope and original AS-to-task coverage.
5. This v6 execution contract.

The v5 contract, Implementation Report, and Result QA are protected failure evidence and current-state provenance only. They are not accepted behavioral authority. Where v5 says full v2 is preserved `only` for explicit request or stricter policy, this v6 contract rejects and supersedes that statement.

## Frozen Failure And No-Impact Inputs

| Artifact | Identity | Path | SHA-256 | Use in v6 |
| --- | --- | --- | --- | --- |
| v5 accepted contract | `adaptive-main-thread-orchestration-task-4-contract-20260711-v5` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT.md` | `e22d15063d04177a2fa14818002a1f3258afc3bc0ac7fd0929a76def95304cbc` | failed contract provenance; protected |
| v5 Implementation Report | `adaptive-main-thread-orchestration-task-4-implementation-report-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/IMPLEMENTATION_REPORT.md` | `06d6f04c80b8e5167ca3737bdc352a8a282257a3e98b432e0fd3e3203fd5d6c5` | rejected producer result; protected |
| v5 Result QA | `adaptive-main-thread-orchestration-task-4-result-qa-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/RESULT_QA.md` | `afa39325780133e47d0d44aecd456a40f3a5f642bf4f6d30107d58e32d317bbe` | controlling P1 finding; protected |
| Main-thread failure routing | `adaptive-main-thread-orchestration-task-4-v5-failure-decision-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_V5_FAILURE_DECISION.md` | `2a51239c5bc8e5c4668e2d58fa561e027db51dba9ffa6a824ced0b51fdfb890f` | owning-task and no-impact decision; protected |
| v6 contract-state baseline | `adaptive-main-thread-orchestration-task-4-v6-contract-state-baseline-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_STATE_BASELINE_V6.md` | `55492bb4d0c6eebfdfb4c0a203f55d3ccc95bbf574820ec0c043d257bfefec03` | complete dirty/protected baseline; protected |

Task 1-3 remain accepted and protected. The v6 baseline verifies all 26 accepted implementation paths and 12 accepted evidence artifacts. Task 1 already contains the correct deliberate-selection authority; Task 2 artifacts carry topology and gates without restricting the selection reason; Task 3 profiles are reusable capabilities and do not own topology. No upstream identity is superseded.

## Frozen Three-State Outcome Contract

Every revised surface must preserve these states as distinct and non-contradictory:

| State | Required meaning | Modal force | Forbidden compression |
| --- | --- | --- | --- |
| Adaptive default | The main thread normally selects the smallest sufficient topology from task facts, marginal delegation/review value, triggered gates, dependencies, evidence needs, and cost. Harness presence, HIGH risk, or six available roles does not mechanically launch full v2. | `MUST default adaptively`; full v2 is not automatic. | Do not redefine harness use, HIGH risk, or profile availability as full-v2 triggers. |
| Required full v2 | An explicit user request for the complete v2 loop, or a stricter applicable downstream policy, requires planner -> plan evaluator -> solution designer -> solution evaluator -> frozen accepted boundary -> executor -> result evaluator -> separate main-thread decision. | `MUST run` when either requirement trigger is present. | Do not treat an explicit request/policy as optional; do not drop intervention, retry, evidence, or final main-thread controls. |
| Deliberate main-thread selection | Without an explicit request or stricter policy, the main thread may deliberately select the complete sequence when task-specific evidence shows it is the clearest and most effective control coverage. | `MAY select` only with a recorded evidence-backed rationale. | Do not forbid this choice; do not select it from risk label, role availability, harness name, or process inertia alone; do not make it the default. |

Deliberate selection requires a decision record containing all of:

1. Concrete task facts that make separate planning, plan review, boundary design, boundary review, execution, and result review materially useful.
2. At least one smaller viable topology considered and the specific control/evidence/handoff gap it would leave for this task.
3. A role-to-control map showing non-duplicative value for all six interfaces.
4. Triggered gate owners, primary evidence, dependencies, handoffs, and decision points.
5. Cost/context impact and why complete v2 has positive marginal value despite that cost.
6. Confirmation that main-thread synthesis, intervention, finite retry budgets, topology revision, and final acceptance remain active.

HIGH Operational Risk, HIGH Semantic Risk, broad scope, or cross-module work may contribute evidence but never independently satisfies this record. A statement such as `HIGH risk therefore full v2` is invalid.

## Frozen Scenario And Regression Boundary

- AS-01 through AS-31 remain exactly 31 scenarios. No AS-32 is authorized.
- Their current 31 matrix rows, extracted as each line beginning `| AS-NN |` in order and joined with a final newline, have SHA-256 `c4b5125a548e7ea7fc9dba22ac6d920a513eb49beb091650c19959414fdd98fc`. Their setup, authority, expected behavior, evidence, failure signal, actual decision, and PASS/FAIL meaning must remain byte-identical.
- The five existing CC rows have extracted-row SHA-256 `87cd09539350995f04585122b308365598a9f39199927782954a893865918236`. Preserve them and add one supplemental sixth case; do not rewrite their prior meaning.
- CAL-ADAPT-001 through CAL-ADAPT-009 remain required and must be regression-checked. Add CAL-ADAPT-010 without renumbering or replacing them.
- All Task 4 ACs are rerun against current bytes and primary authority. No v5 PASS label is inherited.

## Supplemental Compatibility Fixture: CC-DELIBERATE-FULL-V2

Fixture identity: `CC-DELIBERATE-FULL-V2`.

Literal setup:

- Project Lattice user request: `Align policy approval semantics across API, worker, and UI without changing permission scope.`
- Synthetic modules: `api/policy.md`, `worker/policy.md`, and `ui/policy.md`.
- The user does not request full v2.
- No downstream policy requires a fixed sequence.
- Cross-module semantic ownership is unresolved; API output constrains worker behavior, worker state constrains UI evidence, and the result requires producer-independent semantic verification.
- The main thread compares a smaller `executor + semantic result evaluator` topology with full v2. The smaller topology would leave the delivery decomposition and producer-nonmodifiable multi-module boundary without independent challenge before execution.
- The main thread records the six-role value map: planner maps modules/dependencies; plan evaluator checks goal/coverage; solution designer freezes the multi-module boundary; solution evaluator checks ambiguity/permission-scope overreach; executor performs only the frozen work; result evaluator independently checks cross-module outcome and regressions.
- The record binds gate owners, primary evidence, handoffs, finite retry/intervention state, and separate main-thread acceptance.

Expected decision: `PASS — deliberate complete-v2 selection is allowed and justified`. The exact six-role sequence may be selected, while adaptive topology revision, intervention, retry, evidence, producer independence, and main-thread acceptance remain active.

Failure signals:

- full v2 is prohibited only because explicit request/policy is absent;
- HIGH/cross-module risk automatically selects full v2 without the six-field rationale;
- full v2 is described as the harness default;
- roles duplicate work without positive marginal value;
- the main thread becomes a passive relay or treats role PASS as final acceptance.

This is a supplemental CC fixture, not AS-32 and not a new orchestration mode or mandatory pipeline.

## Durable Calibration Requirement

Add `CAL-ADAPT-010 — Complete v2 is incorrectly limited to explicit request or stricter policy` with:

- bad pattern: reusable guidance says full v2 is available `only` for explicit request or stricter policy;
- why it fails: it removes evidence-backed deliberate main-thread selection preserved by requirements and adaptive protocol;
- controlling authority: requirements Supported Orchestration Modes and adaptive protocol Composable, Non-Exhaustive Modes;
- evidence needed: three-state wording, deliberate decision record, smaller-topology comparison, role-to-control map, and CC-DELIBERATE-FULL-V2 result;
- evaluator/main-thread response: strict FAIL, classify contract/semantic authority failure, stop implementation repair, return to owning boundary;
- positive fixture: Project Lattice evidence-backed deliberate selection passes;
- negative fixtures: `only explicit/policy` prohibition, risk-label automatic selection, default full loop, or passive main-thread relay fail.

Calibration detects recurring failure; it does not replace primary authority or semantic review.

## Scope And Write Authority

Only these seven implementation paths may be modified by a future v6 executor:

1. `task-docs/_harness/templates/routing-scenario-matrix-template.md`
2. `README.md`
3. `docs/architecture.md`
4. `docs/adoption/router-refactor-runbook.md`
5. `examples/minimal-router/AGENTS.md`
6. `task-docs/_harness/adaptive-orchestration-acceptance-matrix.md`
7. `task-docs/_harness/evaluator-calibration.md`

Current rejected-v5 before hashes:

```text
fa546900ca79f24610b7f235e085257932ad02a04917ed2f65ce9aaf9b1ed295  task-docs/_harness/templates/routing-scenario-matrix-template.md
2b123187572be899e24f0058b9c4fbb842e0dbd2430b3a655049dced3e1a87ca  README.md
623ba8a9aacf9d7f11e190315160accb9bd2edbe7c3de10f192b7c9b7ff59c4c  docs/architecture.md
e0bbbd5fed34ced6cba185dc02ec03ca07f478d6f434ebd9c73ed52c49d19ff2  docs/adoption/router-refactor-runbook.md
ab134915bc23a6d71c65df95462ef99061c72226fa5dbdfdc3ce94fd7a6471d1  examples/minimal-router/AGENTS.md
f8fbb5a05263856df4f3e2a4d9bbf000e63be937afb5621106b58c6c2ece08aa  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
08915572985ec72c7777ff6518ade0a2bce388ed11c05810fd534de3f4cff420  task-docs/_harness/evaluator-calibration.md
```

Everything else is protected/read-only, including:

- `docs/adoption/open-source-release-checklist.md` at `c214d3c44838d53aabfb363a7c37813b95e810411d7f21d515dd3aaab53659f7`;
- `examples/minimal-router/README.md` at `f17e3a71e3c24773167252fbe4d9b35466fae4b057e0c167f7828fb4b8c4ccc4`;
- Task 1-3 accepted implementation and evidence;
- all protocols, profiles, adapter, config, scripts, other templates, requirements, plan, planning artifacts;
- all v5/v6 contracts, reviews, reports, QA, decisions, manifests, and baselines.

No validator, dependency, seventh role, nested delegation, external action, secret access, stage, commit, push, or PR is authorized. If a protected change appears necessary, STOP and return to contract design; do not expand this boundary.

## Required Revision Outcome

1. Replace the incorrect `only explicit request / stricter policy` semantics in all five affected public/routing/adoption/example surfaces with the complete three-state model.
2. RSM-005 must express adaptive default, required full v2, and evidence-backed deliberate selection in one coherent routing case. Its structural validator remains smoke coverage only.
3. README must market adaptive governance as default while accurately explaining both required and deliberate complete-v2 paths.
4. Architecture must assign deliberate selection to main-thread topology authority, preserve non-exhaustive modes, and distinguish required triggers from discretionary evidence-backed choice.
5. Router-refactor runbook must tell adopters to preserve all three states and manually reject both `only explicit/policy` narrowing and HIGH-risk automatic full-loop selection.
6. Minimal router AGENTS must remain compact but state all three modes, deliberate-selection evidence threshold, mandatory gates, and active main-thread controls.
7. Acceptance matrix must preserve AS-01 through AS-31 byte-identically, preserve the five existing CC rows, add CC-DELIBERATE-FULL-V2 with a complete setup/decision/evidence/failure record, and update cross-document authority/terminology evidence.
8. Calibration must preserve CAL-ADAPT-001 through 009 and add complete CAL-ADAPT-010.
9. Re-run every T4 acceptance criterion and evidence check from current bytes. Record failures honestly; do not inherit v5 PASS.
10. Preserve all protected/current-state evidence and return a versioned v6 Implementation Report response only.

## Revised Acceptance Criteria

| AC | Revised requirement | Required evidence |
| --- | --- | --- |
| T4-AC1 | AS-01 through AS-31 remain exactly once, ordered, semantically decided, and byte-identical to the frozen AS-row hash; no AS-32 | Extracted-row hash, structural parser, and per-row semantic regression review |
| T4-AC1A | RSM-005 expresses adaptive default, required full v2, and evidence-backed deliberate full-v2 selection without contradiction | Three-state modal table comparison, manual RSM-005 review, router smoke output explicitly limited to structure |
| T4-AC2 | CAL-ADAPT-001 through 010 are complete, durable, authority-bound, and reusable | Ten-case field inventory and semantic calibration review |
| T4-AC3 | README presents adaptive default and both full-v2 paths accurately without a fixed taxonomy/default pipeline | README-to-requirements/AO semantic comparison and forbidden-wording check |
| T4-AC4 | Architecture preserves topology ownership, non-exhaustive composition, three states, and adapter boundary | Authority/ownership table and deliberate-selection decision-record fields |
| T4-AC5 | Router adoption preserves traceability and all three states; release checklist remains untouched | Runbook semantic diff and protected release-checklist hash |
| T4-AC6 | Minimal example demonstrates all three states compactly without making full v2 default or removing deliberate choice | Example walkthrough and protected example-README hash |
| T4-AC7 | AC-pass-but-user-fail coverage includes both the existing missing-independent-review negative and the v5 `only explicit/policy` narrowing | CC-NEGATIVE plus CAL-ADAPT-010 negative evidence and strict FAIL decisions |
| T4-AC8 | No unrelated scope, validator, dependency, seventh role, protocol/profile/adapter/config/script edit, external action, or protected-path change | Changed-path inventory and pre/post protected hashes |
| T4-AC9 | Six CC fixtures compose Task 2/3 correctly: five frozen v5 cases plus CC-DELIBERATE-FULL-V2; deliberate full v2 retains every adaptive control | Frozen five-row hash, new complete fixture/handoff/decision record, six-profile interface mapping, independent semantic judgment |
| T4-AC10 | Task 1-3 no-impact remains valid; any newly discovered upstream defect stops and routes to its owner with transitive impact analysis | 26 accepted hashes, 12 evidence hashes, no-impact record or stop/finding route |

All ACs require fresh v6 evidence. A structural PASS, v5 report statement, or v5 scenario PASS cannot satisfy semantic acceptance.

## Validation

Before any future write, verify the v6 accepted contract, v6 manifest, v6 launch baseline, v6 contract-state baseline, failure decision, all protected inventory entries, branch/refs, and seven before hashes. After changes, run at minimum:

```sh
git branch --show-current
git rev-parse HEAD origin/main
git merge-base HEAD origin/main
git diff --cached --name-status
git diff --name-status origin/main...HEAD
git status --short --branch --untracked-files=all

python3 - <<'PY'
from pathlib import Path
import hashlib, re

p = Path('task-docs/_harness/adaptive-orchestration-acceptance-matrix.md')
lines = p.read_text(encoding='utf-8').splitlines()
as_rows = [line for line in lines if re.match(r'^\| AS-\d\d \|', line)]
cc_rows = [line for line in lines if re.match(r'^\| CC-', line)]
assert len(as_rows) == 31
assert hashlib.sha256(('\n'.join(as_rows) + '\n').encode()).hexdigest() == 'c4b5125a548e7ea7fc9dba22ac6d920a513eb49beb091650c19959414fdd98fc'
assert [re.match(r'^\| (AS-\d\d) \|', row).group(1) for row in as_rows] == [f'AS-{i:02d}' for i in range(1, 32)]
assert len(cc_rows) == 6
assert any(row.startswith('| CC-DELIBERATE-FULL-V2 |') for row in cc_rows)
frozen_cc_rows = [row for row in cc_rows if not row.startswith('| CC-DELIBERATE-FULL-V2 |')]
assert hashlib.sha256(('\n'.join(frozen_cc_rows) + '\n').encode()).hexdigest() == '87cd09539350995f04585122b308365598a9f39199927782954a893865918236'
assert not any(row.startswith('| AS-32 |') for row in lines)
print('frozen AS rows and six-case CC inventory passed; semantic review remains required')
PY

python3 - <<'PY'
from pathlib import Path
text = Path('task-docs/_harness/evaluator-calibration.md').read_text(encoding='utf-8')
for number in range(1, 11):
    case = f'CAL-ADAPT-{number:03d}'
    assert text.count(f'### Case {case} ') == 1, case
print('CAL-ADAPT-001 through 010 heading inventory passed; semantic review remains required')
PY

python3 scripts/validate_router_fixture.py \
  --router AGENTS.md \
  --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md

/opt/homebrew/bin/python3.11 - <<'PY'
import glob, tomllib
paths = sorted(glob.glob('.codex/agents/*.toml'))
assert len(paths) == 6
for path in paths:
    with open(path, 'rb') as handle:
        tomllib.load(handle)
PY

git diff --check
```

Also record and independently review:

- exact three-state wording and modal force in each of the five affected public/routing/adoption/example surfaces;
- deliberate-selection six-field decision record and smaller-topology comparison;
- CAL-ADAPT-001 through 010 fields and authority;
- all six CC cases, including strict failure for `only explicit/policy`, risk-label automatic selection, default full loop, and passive relay;
- fresh T4-AC1 through T4-AC10 decisions;
- seven changed-path pre/post hashes, complete status/untracked hashes, 26 upstream accepted hashes, 12 upstream evidence hashes, and complete protected inventory;
- v5 failed artifacts and all v6 gate artifacts unchanged;
- structural validator described only as smoke/mention coverage.

## Upstream Finding Routing

If v6 work exposes a Task 1, Task 2, or Task 3 defect, STOP before modifying the protected path. Record the finding and owning task, issue a new versioned upstream boundary, perform transitive impact analysis, supersede and reaccept affected downstream results or record specific no-impact evidence, stabilize all upstream identities, and strictly review a new Task 4 boundary before resuming.

The known v5 finding is owned by Task 4 and does not authorize upstream edits.

## Stop Conditions

Stop without repair if:

- any frozen hash, branch/ref, dirty attribution, seven-path before state, or protected inventory mismatches;
- any implementation path outside the seven allowed paths is needed or changed;
- v5 files are rolled back wholesale or described as accepted;
- AS-01 through AS-31 change, AS-32 appears, or existing five CC meanings change;
- three-state wording is compressed, contradictory, or lacks deliberate-selection evidence requirements;
- HIGH risk, harness presence, role availability, or process inertia becomes an automatic full-v2 trigger;
- explicit request or stricter policy is treated as optional;
- structural checks are used as semantic proof;
- a validator/dependency/seventh role/nested delegation/external action/secret/stage/commit/push/PR is required.

## Review, Freeze, And Future Reporting Identities

This iteration must receive strict independent read-only review. Any P0/P1, missing AC evidence, mutable boundary, v5 accepted-dependency claim, three-state contradiction, or unverified protected state is `FAIL`.

Persist the iteration review as `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_ITERATION-06.md`, identity `adaptive-main-thread-orchestration-task-4-contract-review-iteration-06-20260711-v1`. It must explicitly decide the three-state model, deliberate-selection evidence threshold, no-fixed-pipeline rule, revised AC/fixture coverage, v5 dependency treatment, Task 1-3 no-impact, scope, and protected evidence.

On strict PASS only, freeze byte-identically as:

- accepted boundary: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/ACCEPTED_CONTRACT_V6.md`, identity `adaptive-main-thread-orchestration-task-4-contract-20260711-v6`;
- final review: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/CONTRACT_REVIEW_V6.md`, identity `adaptive-main-thread-orchestration-task-4-contract-review-20260711-v6`;
- boundary manifest: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_BOUNDARY_MANIFEST_V6.md`, identity `adaptive-main-thread-orchestration-task-4-boundary-manifest-20260711-v2`.

A later, separately authorized executor launch must first freeze `EXECUTOR_LAUNCH_BASELINE_V6.md`, identity `adaptive-main-thread-orchestration-task-4-executor-launch-baseline-20260711-v2`.

The future executor returns, but does not create, `adaptive-main-thread-orchestration-task-4-implementation-report-20260711-v2`, intended path `IMPLEMENTATION_REPORT_V2.md`. A fresh read-only evaluator returns `adaptive-main-thread-orchestration-task-4-result-qa-20260711-v2`, intended path `RESULT_QA_V2.md`. v5 report/QA paths remain immutable.

This contract iteration authorizes no implementation. Stop after strict review and boundary freeze.
