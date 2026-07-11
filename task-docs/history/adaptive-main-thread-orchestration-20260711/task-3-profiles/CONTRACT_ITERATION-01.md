# Execution Contract: Task 3 - Reusable Codex Capability Profiles

## Contract Identity

- Task identity: `adaptive-main-thread-orchestration-task-3-profiles`
- Source plan: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`
- Contract iteration: `01`
- Stable identity: `adaptive-main-thread-orchestration-task-3-contract-20260711-v1`
- Semantic risk: `HIGH`

## Objective

Implement exactly Task 3 from the frozen plan: refactor the six existing Codex subagent profiles into cross-project reusable capabilities that retain durable role intelligence, permissions, independence, evidence, stop, and handoff boundaries while moving current-task and fixed-lifecycle content to runtime task packets and shared authority.

Update the Codex adapter accordingly. Modify the config example only if direct inspection proves a change is necessary for accurate runtime-enforcement guidance.

## Frozen Inputs And Accepted Upstream

| Input | Identity | Path | SHA-256 |
| --- | --- | --- | --- |
| Requirements | `adaptive-main-thread-orchestration-requirements-20260711-v4` | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` |
| Implementation plan | `adaptive-main-thread-orchestration-implementation-plan-20260711-v5` | `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md` | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` |
| Accepted planning inputs | `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md` | `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780` |
| Task 1 Implementation Report | `adaptive-main-thread-orchestration-task-1-implementation-report-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/IMPLEMENTATION_REPORT.md` | `922aa9f27ec1b0f80eb96cae33aab0fdd84d5a6f3d0f859f0d7a94cd2d80c8ed` |
| Task 1 Result QA | `adaptive-main-thread-orchestration-task-1-result-qa-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/RESULT_QA.md` | `3fe75241f9b333a9d5d9fd0f213104529d384b5da202891a1cbe4833b9ee802e` |
| Task 1 main-thread acceptance | `adaptive-main-thread-orchestration-task-1-main-thread-acceptance-20260711-v1` | `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/MAIN_THREAD_ACCEPTANCE.md` | `a30cbd262722bca84aa3beb601abb070f48f6eec3726e50fa148641b985f75b4` |

Task 1 is accepted `PASS`. The executor may consume only the frozen Task 1 authority below as upstream behavior authority and must not reinterpret or modify it.

| Frozen Task 1 authority path | SHA-256 |
| --- | --- |
| `AGENTS.md` | `e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d` |
| `docs/agent-routing/README.md` | `a13ef6144857dba8b8774e1bde5f6689f2711ae34fc6342400b47ce76609a787` |
| `docs/agent-routing/external-systems-and-secrets.md` | `6924dcd3a54ff9123e4558efd09032cbdca1c32448c6a705e529e1850558279c` |
| `docs/agent-routing/high-risk-actions.md` | `6565dba8f7aa302b3bf3a9508869248a99336780a7c5a2e4f19a2fbe66e3d3fd` |
| `docs/agent-routing/task-planning-scale.md` | `29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c` |
| `docs/agent-routing/implementation-boundary.md` | `d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8` |
| `docs/agent-routing/validation-and-reporting.md` | `6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b` |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` |
| `task-docs/_harness/semantic-fidelity-protocol.md` | `c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4` |

## Scope And Write Authority

Allowed write paths, exclusively:

1. `.codex/agents/harness-planner.toml`
2. `.codex/agents/harness-plan-evaluator.toml`
3. `.codex/agents/harness-solution-designer.toml`
4. `.codex/agents/harness-solution-evaluator.toml`
5. `.codex/agents/harness-executor.toml`
6. `.codex/agents/harness-result-evaluator.toml`
7. `docs/adapters/codex-subagents.md`
8. `.codex/config.example.toml`, conditionally only when the executor records why the existing example would otherwise give inaccurate runtime-enforcement guidance. Absence of a needed runtime capability must be documented, not simulated by unsupported config.

Everything else is read-only. In particular:

- all Task 1 authority and acceptance artifacts;
- all Task 2-owned run protocol and template paths;
- calibration, README, architecture, routed docs, adoption docs, examples, scripts, and frozen planning/history artifacts;
- Task 2 contract, implementation, report, and QA artifacts.

The Task 3 executor must not read Task 2 in-progress or unaccepted outputs as accepted dependencies. Profile/task-packet interface requirements come from frozen requirements, plan, and Task 1 authority, not from Task 2 template wording.

## Before Baseline

- Required branch: `codex/adaptive-main-thread-orchestration`
- Required HEAD/origin/main/merge base: `caf93131b6cb591644271105b1d8921459245341`
- Required staged delta: empty
- Required committed delta `origin/main...HEAD`: empty

| Allowed path | Before SHA-256 |
| --- | --- |
| `.codex/agents/harness-executor.toml` | `a2964674bbeaa437de491ac825bbedd236484c0e249e2092542af04cf2194fea` |
| `.codex/agents/harness-plan-evaluator.toml` | `1d21073b6b2b2ff83d57daa7c065d3101442d3bd270b2fe91d76b4ebdf7223e4` |
| `.codex/agents/harness-planner.toml` | `98f761cee22565f43f031f7a7b618b1ec0ee5efe870a527b0f9313f786babfc6` |
| `.codex/agents/harness-result-evaluator.toml` | `59f526f8974193d61fc296b15540338146de9d000a3cc28415e3849755c8bab1` |
| `.codex/agents/harness-solution-designer.toml` | `028fa348181dbf37fde30ecca8b7681e5fd4f40fed59076db8e615c60edd9ba4` |
| `.codex/agents/harness-solution-evaluator.toml` | `533196b7b75baad7c44ba9761b1f84c0c8be78175e84019ea2b3109020191f4c` |
| `docs/adapters/codex-subagents.md` | `c71af3f5d0163952f2b7260bd1341c637c2f34e07af48ee2888a78250d7e82b6` |
| `.codex/config.example.toml` | `b1c24d76fd08e2b160d4606919423294a89e128c78d9c606f43b4b2f9ee4f307` |

Concurrent Task 2 changes may appear elsewhere in the worktree. They are neither Task 3 inputs nor Task 3 scope violations. Task 3 scope is proven by before/after hashes and a path-limited diff for the eight allowed paths, plus verification that the executor did not write any other path.

## Semantic And Role Boundaries

- Original Request Anchor: frozen requirements §§1-17 and the six-profile specialization in §10.
- Pass A baseline: `adaptive-main-thread-orchestration-plan-review-pass-a-20260711-v1`, frozen through the accepted planning-input manifest.
- Outcome boundary: frozen requirements v4 plus plan v5 Task 3 outcome and T3-AC1 through T3-AC8.
- Preserve exactly six names and responsibilities; do not add, delete, rename, merge, or split roles.
- Keep actual sandbox/permission boundaries, especially `sandbox_mode = "read-only"` for all three evaluators.
- Static profiles define how a role reasons and stops. Runtime task packets define the current objective, paths, routes/gates, ACs, dependencies, artifact choice, and output depth.
- Profiles must retain repo-rule/explicit-route application, no-fan-out by default, evidence consciousness, no fabricated completion, no silent authority expansion, and minimum bounded handoff.
- The executor profile may implement only cited stable authority and cannot reinterpret intent, expand scope, mutate its boundary, self-approve, or self-certify producer-independent verification.
- Evaluators remain producer-independent, strict, read-only, evidence-based, and unable to repair reviewed work.
- Full-v2 composition remains possible without embedding it as the default lifecycle in every profile.

AC-pass-but-user-fail counterexample: TOML parses and contains shorter prompts, but evaluator independence or read-only force is weakened, executor can redefine its objective, profiles still mechanically require the complete six-role sequence, or the same profile cannot accept distinct project/task packets. Any such result is a semantic FAIL.

## Per-Role Required Outcome

| Role | Keep | Move to runtime/shared authority | Required non-regression evidence |
| --- | --- | --- | --- |
| Planner | outcome understanding, risk separation, scope control, delivery-unit decomposition, verifiability, no implementation authority | fixed six-role order, current paths/ACs/output file | small/complex cross-project fixtures and no-write assertion |
| Plan evaluator | independent intent/risk/verifiability review, evidence skepticism, strict verdict, triggered Pass A/B | fixed lifecycle checklist, current plan paths, mandatory long form | read-only assertion and adaptive PASS/skipped-gate FAIL fixtures |
| Solution designer | minimal executable authority, ambiguity exposure, executor non-redesign, no execution authority | universal full-v2/`ACCEPTED_CONTRACT.md` assumptions, current routes/steps | boundary fixture preserving scope/paths/semantic decisions/stops |
| Solution evaluator | ambiguity/overreach/safety/evidence review, strict independent verdict, no repair | lifecycle narration, generic fixed checklist, current files/ACs | read-only/no-repair assertions and strict negative fixture |
| Executor | cited stable authority, user-work preservation, stop on ambiguity, honest validation/reporting | universal filename/lifecycle/report structure and current task paths | boundary mutation, scope expansion, self-approval stop fixtures |
| Result evaluator | producer-independent actual-result/user-outcome/regression/scope/evidence review and strict decision | mandatory universal artifact sequence and irrelevant fixed layout | read-only/no-repair assertions, self-proof and missing-evidence FAIL fixtures |

## Implementation Requirements

1. Verify every frozen input, Task 1 authority hash, branch invariant, and allowed-path baseline before writing; stop on mismatch.
2. Inspect each current profile and produce a preservation/migration ledger before editing.
3. Rewrite only the six profiles so shared durable boundaries and role-specific intelligence remain, while fixed lifecycle/current-task content moves out conceptually to runtime packets or shared authority.
4. Update the adapter for adaptive role selection, packet responsibilities, route inheritance/explicit binding, no-fan-out default, bounded nesting, permissions, evidence, and explicit full-v2 compatibility.
5. Decide whether `.codex/config.example.toml` needs modification. If changed, document exact necessity and supported runtime effect; otherwise report it unchanged.
6. Run all AC fixtures and return complete evidence in the Implementation Report response. Do not create the report artifact; the main thread persists it.

## Acceptance Criteria

| AC | Requirement and required evidence |
| --- | --- |
| T3-AC1 | Exactly six names and responsibilities remain; no seventh profile. Provide TOML inventory. |
| T3-AC2 | Every profile retains shared boundaries, minimum handoff, no silent scope/authority expansion, and role intelligence without embedding the full lifecycle. Provide per-profile preservation ledger. |
| T3-AC3 | Current files, routes, ACs, dependencies, artifact choice, and output depth come from runtime packet. Provide two domain/complexity packets for selected roles using unchanged profiles. |
| T3-AC4 | Evaluators remain read-only, independent, evidence-based, strict, and unable to repair targets. Provide parse/sandbox assertions and negative fixtures. |
| T3-AC5 | Executor cannot reinterpret objective, alter boundary, expand writes, or self-certify independent verification. Provide stop fixtures. |
| T3-AC6 | Profiles do not mechanically restate full six-role flow or require irrelevant checklist output. Provide targeted negative search and qualitative review. |
| T3-AC7 | Default fan-out is prohibited; explicitly authorized nesting is packet- and runtime-bounded. Provide adapter/profile/config comparison. |
| T3-AC8 | Profiles retain compatible interfaces for later explicit full-v2 composition without depending on Task 2 template text. Provide per-profile interface inventory; do not perform Task 4 combined walkthrough. |

## Validation And Evidence

Run at minimum:

```sh
git branch --show-current
git rev-parse HEAD origin/main
git merge-base HEAD origin/main
git diff --cached --name-status
git diff --name-status origin/main...HEAD
python3 - <<'PY'
import glob, tomllib
paths = sorted(glob.glob('.codex/agents/*.toml'))
assert len(paths) == 6, paths
for path in paths:
    with open(path, 'rb') as f:
        tomllib.load(f)
print('\n'.join(paths))
PY
rg -n 'sandbox_mode = "read-only"' .codex/agents/*.toml
rg -n "fan-out|nested delegation|task packet|scope|authority|evidence|stop|escalat" .codex/agents/*.toml docs/adapters/codex-subagents.md .codex/config.example.toml
git diff --check -- .codex/agents docs/adapters/codex-subagents.md .codex/config.example.toml
```

Also perform and record:

- exact inventory and sandbox count for the three evaluator profiles;
- per-profile keep/move/destination/non-regression ledger;
- cross-project and complexity-varying packet fixtures without reading Task 2 output;
- evaluator strictness/no-repair, executor boundary, no-fan-out, flexible-output, and full-v2-interface fixtures;
- negative searches for universal lifecycle, hard-coded current task paths/ACs, and irrelevant mandatory forms, with manual classification of legitimate compatibility references;
- before/after hashes for all eight allowed paths;
- pre/post verification of every frozen input and Task 1 authority hash;
- scoped changed-path proof and confirmation that no Task 2 output was consumed as an accepted dependency.

## Stop Conditions

Stop without repair or scope expansion if:

- any frozen input, Task 1 authority, branch invariant, or allowed-path baseline mismatches;
- simplification would remove a real permission, evaluator independence, evidence standard, stop/escalation boundary, or role intelligence;
- a profile requires undocumented main-thread memory for a mandatory safety rule;
- explicit full-v2 composition becomes impossible;
- implementation requires Task 2, calibration, router/protocol, README, architecture, adoption, example, script, or Task 4 changes;
- a Task 2 in-progress result is needed as an accepted dependency;
- an unsupported config claim would be required;
- secrets, external writes, dependencies, staging, commits, pushes, or PRs would be required.

## Reporting Requirements

Return one complete Implementation Report in the executor response containing identity, changed files, scope proof, T3-AC1 through T3-AC8 decisions, preservation/interface ledgers, all fixtures and searches, config-example decision, commands/results, pre/post hashes, what was not validated, residual risks, blockers, and explicit confirmation that Task 2 and Task 4 were not implemented. Do not create or edit gate artifacts outside the allowed write paths.
