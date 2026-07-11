# Task 1 Execution Contract: Establish The Adaptive Control-Plane Authority

- Status: Contract iteration 01; implementation is not authorized until strict independent PASS and freeze
- Contract identity: `adaptive-main-thread-orchestration-task-1-contract-20260711-v1`
- Task identity: `adaptive-main-thread-orchestration-task-1-control-plane`
- Source plan identity: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`
- Source plan SHA-256: `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`
- Requirements identity: `adaptive-main-thread-orchestration-requirements-20260711-v4`
- Requirements SHA-256: `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`
- Outcome Contract identity: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5#plan-level-outcome-contract`
- Accepted planning inputs manifest: `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1`
- Implementation authorization: Not granted by this iteration

## 1. Objective

Implement exactly plan Task 1, **Establish The Adaptive Control-Plane Authority**.

The delivered architecture must make adaptive main-thread governance the default meaning of using the harness, establish one authoritative control-plane protocol, preserve every triggered safety and semantic gate, and retain the complete v2 flow as an explicit compatible option rather than the universal default.

The executor must not begin Task 2, Task 3, or Task 4 work.

## 2. Required Inputs

Before any implementation write, recompute these hashes and stop on any mismatch:

| Artifact | Identity | Path | Required SHA-256 |
| --- | --- | --- | --- |
| Requirements | `adaptive-main-thread-orchestration-requirements-20260711-v4` | `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` |
| Plan | `adaptive-main-thread-orchestration-implementation-plan-20260711-v5` | `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md` | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` |
| Pass A | `adaptive-main-thread-orchestration-plan-review-pass-a-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md` | `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b` |
| Pass B | `adaptive-main-thread-orchestration-plan-review-20260711-v2` | `task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md` | `2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204` |
| Accepted inputs | `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md` | `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780` |
| Planning delivery | `adaptive-main-thread-orchestration-planning-delivery-report-20260711-v1` | `task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md` | `dcc7087f519e06772a28005160c478d87d428ba47caea7d8df4fb18194efff4e` |

Read the current `AGENTS.md` and only the routed docs required by this contract. The frozen requirements and plan remain the semantic authority if current fixed-loop wording conflicts with the target outcome.

## 3. Scope

### In Scope

- Add one normative adaptive orchestration protocol.
- Route adaptive orchestration triggers from `AGENTS.md` and the routing index.
- Replace universal fixed-sequence authority with adaptive topology selection while retaining explicit full-v2 compatibility.
- Define topology inputs, delegation value, route/gate binding, no-fan-out default, bounded nested delegation, dependencies, cancellation, synthesis, stable write boundaries, context threshold, quality and operational retry budgets, intervention, stop states, controlled resume, final reporting, and producer-independent verification.
- Align only the routed control docs needed to make those controls authoritative.
- Preserve semantic-fidelity ownership of Original Request Anchor, Pass A/B, Outcome Contract, semantic comparison, and AC-pass-but-user-fail.
- Produce Task 1 evidence, including modal-force preservation and the focused router tabletop specified in this contract.

### Out Of Scope

- Task packet, context/handoff, plan, contract, report, QA, or routing scenario template changes.
- Any `.codex/agents/*.toml` or `.codex/config*.toml` change.
- Evaluator calibration or acceptance-matrix changes.
- README, architecture, adapter, adoption, example, script, LICENSE, release, CI, or publication work.
- Implementing Task 2, Task 3, or Task 4 behavior.
- Stage, commit, push, PR creation, deployment, publish, external-system write, dependency addition, or secret access.

## 4. Allowed Implementation Write Paths

The executor may modify or create only these paths:

1. `AGENTS.md`
2. `docs/agent-routing/README.md`
3. `docs/agent-routing/external-systems-and-secrets.md`
4. `docs/agent-routing/high-risk-actions.md`
5. `docs/agent-routing/task-planning-scale.md`
6. `docs/agent-routing/implementation-boundary.md`
7. `docs/agent-routing/validation-and-reporting.md`
8. `task-docs/_harness/adaptive-orchestration-protocol.md` (new)
9. `task-docs/_harness/semantic-fidelity-protocol.md`

Implementation evidence must be returned in the executor's report. This contract does not authorize a new fixture, template, calibration, or evidence file outside the run artifacts already created by the main thread.

## 5. Allowed-Path Before Hashes

| Path | Before SHA-256 |
| --- | --- |
| `AGENTS.md` | `3dd796802bfef24a6946ab4b288747c38f3b8857b8e4e05383b430b2621e002c` |
| `docs/agent-routing/README.md` | `51cb3d8d4cdf86eeb567e48bf331080dbdf30f9d3c19074b163eda7c7755e7ae` |
| `docs/agent-routing/external-systems-and-secrets.md` | `0c69d22eaf201a2f4863fef38b173654f2ef5423b0e463d10a58ad0aa6f81ba1` |
| `docs/agent-routing/high-risk-actions.md` | `971565fd3454fc18b3b8d7f23f2a34e68c85493ccd1c1fcef9afc2237175a3f7` |
| `docs/agent-routing/task-planning-scale.md` | `a424df42428fd01623e0163dfc8b665cb5a8a4f66b027be362a9226580420e67` |
| `docs/agent-routing/implementation-boundary.md` | `f4cab09afc1c980da06dce182b0e6afe76cb913cdbfd51d4a3c3304e58208d4d` |
| `docs/agent-routing/validation-and-reporting.md` | `2f7f4df774fdd14db19ab87a8e6ec4a28b64b17bacd799c174002ced0fefa082` |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | `ABSENT` |
| `task-docs/_harness/semantic-fidelity-protocol.md` | `9e8725d0adb481e690a054018911c98a431eb5dc0c9ffdcb9781477c872e14c1` |

## 6. Protected Paths And Before Hashes

All paths outside Section 4 are read-only during Task 1. The following high-value protected paths have explicit before hashes; the global changed-path rule in Section 7 protects the rest.

### Frozen Planning Inputs

| Path | Before SHA-256 |
| --- | --- |
| `task-docs/main-thread-control-enhancement-requirements-20260711.md` | `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f` |
| `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md` | `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4` |
| `task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md` | `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b` |
| `task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md` | `2623cd263751381fee707cf1fdb6ed3eac48674301e56dc2577b54a9aac44204` |
| `task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md` | `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780` |
| `task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md` | `dcc7087f519e06772a28005160c478d87d428ba47caea7d8df4fb18194efff4e` |

### Task 2-4 And Other Behavior Surfaces

| Path | Before SHA-256 |
| --- | --- |
| `docs/agent-routing/current-state-evidence.md` | `8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364` |
| `task-docs/_harness/run-directory-protocol.md` | `8daa629d5e99f788d0c01ff944437358fd0e25c59ab67d6028760ab3bdfec2c9` |
| `task-docs/_harness/evaluator-calibration.md` | `bba777700d41953f08055784083e5cfb9c7bf2ab280571a656627a738c9010f3` |
| `README.md` | `64f528978c422d3917f7a48b4f302870fa05ea1b0caff396d5141f8dd0c4a421` |
| `docs/architecture.md` | `196d0560a6dbd0ac57210a541c62d05f7b2e9e211ef91b7b684d87fd56bf32fc` |
| `docs/adapters/codex-subagents.md` | `c71af3f5d0163952f2b7260bd1341c637c2f34e07af48ee2888a78250d7e82b6` |
| `.codex/config.example.toml` | `b1c24d76fd08e2b160d4606919423294a89e128c78d9c606f43b4b2f9ee4f307` |
| `docs/adoption/router-refactor-runbook.md` | `66e2d8a4b00bce4fc40ba010af40766e257a51a86d53f1a96a44d0a278237eaa` |
| `docs/adoption/open-source-release-checklist.md` | `c214d3c44838d53aabfb363a7c37813b95e810411d7f21d515dd3aaab53659f7` |
| `examples/minimal-router/AGENTS.md` | `4b72e3058de2fcff8c26c1dd7e6274367df65cd0a334e39b1f3d4033ce10c9be` |
| `examples/minimal-router/README.md` | `f17e3a71e3c24773167252fbe4d9b35466fae4b057e0c167f7828fb4b8c4ccc4` |

### Codex Profiles

| Path | Before SHA-256 |
| --- | --- |
| `.codex/agents/harness-executor.toml` | `a2964674bbeaa437de491ac825bbedd236484c0e249e2092542af04cf2194fea` |
| `.codex/agents/harness-plan-evaluator.toml` | `1d21073b6b2b2ff83d57daa7c065d3101442d3bd270b2fe91d76b4ebdf7223e4` |
| `.codex/agents/harness-planner.toml` | `98f761cee22565f43f031f7a7b618b1ec0ee5efe870a527b0f9313f786babfc6` |
| `.codex/agents/harness-result-evaluator.toml` | `59f526f8974193d61fc296b15540338146de9d000a3cc28415e3849755c8bab1` |
| `.codex/agents/harness-solution-designer.toml` | `028fa348181dbf37fde30ecca8b7681e5fd4f40fed59076db8e615c60edd9ba4` |
| `.codex/agents/harness-solution-evaluator.toml` | `533196b7b75baad7c44ba9761b1f84c0c8be78175e84019ea2b3109020191f4c` |

### Templates

| Path | Before SHA-256 |
| --- | --- |
| `task-docs/_harness/templates/executor-report-template.md` | `252e0e73fce9eea090956e463a83545d1a66968ea031f0b92f5615ca089021bc` |
| `task-docs/_harness/templates/orchestration-prompt-template.md` | `620fd9fd9e842294288c3029b2d8a51c3ba7faa273bd481eecf81d26f66fa0a5` |
| `task-docs/_harness/templates/plan-review-template.md` | `8234aed284cd593ccb47e7f1799beb3260e53e664cacf1084281c6d6e7eee799` |
| `task-docs/_harness/templates/plan-template.md` | `975b9b97ed5ba71c843ad389ad07f5f1ca251c65dfe4042390ae9c2cc2f91775` |
| `task-docs/_harness/templates/result-qa-template.md` | `acaadee2c9a3b1197bf00720961f2cf665acbcecc6a06f3d7d40386bdc6a53f1` |
| `task-docs/_harness/templates/routing-scenario-matrix-template.md` | `bda51f3d4808a495b1dec80cec4da9956b47ff42bc0ef71411ff71e8209ed9e4` |
| `task-docs/_harness/templates/rule-preservation-ledger-template.md` | `963fd2dd84963cd3e755b29dca70d668fb043bca60fc5c4d61371c829902c288` |
| `task-docs/_harness/templates/solution-review-template.md` | `251743fb7ce574c2dae42a35cacac034aa167e70466bad11c351979ca8aa37ff` |
| `task-docs/_harness/templates/source-coverage-manifest-template.md` | `5891681d391f6559addd6b9b2c49f2800407f85ba95274c6adcdbef9224bdd7d` |
| `task-docs/_harness/templates/source-snapshot-template.md` | `ec90ce20aa4153191ffaa9ff432af43da3ca09ed490c4eb56ec9ab3b7527392b` |
| `task-docs/_harness/templates/task-contract-template.md` | `f0129b0879ef6744e92e11ef58984c71e409fbde37b1897bbd855e0937054485` |

### Scripts

| Path | Before SHA-256 |
| --- | --- |
| `scripts/extract_agents_source.py` | `82b51867e009f1e4444b56b11976f381391c082e5fe542f3d9abcda4fb161b91` |
| `scripts/validate_router_fixture.py` | `feba7621f2f04946c9b3eb8e3199cecf9cfb5bd4cf66b976ad3aed78b3ce1f97` |
| `scripts/validate_rule_preservation.py` | `989c844e8819d493680046186df3c75fadbe38b6dfdee61662c75f13115c0dfe` |

These Task 2/4 paths must remain absent during Task 1:

- `task-docs/_harness/templates/task-packet-template.md`
- `task-docs/_harness/templates/context-handoff-template.md`
- `task-docs/_harness/adaptive-orchestration-acceptance-matrix.md`

## 7. Branch And Changed-Path Baseline

- Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-adaptive-main-thread-orchestration`
- Branch: `codex/adaptive-main-thread-orchestration`
- HEAD: `caf93131b6cb591644271105b1d8921459245341`
- `origin/main`: `caf93131b6cb591644271105b1d8921459245341`
- Merge base: `caf93131b6cb591644271105b1d8921459245341`
- Initial committed delta, `git diff --name-status origin/main...HEAD`: empty
- Initial untracked files: the six frozen planning/delivery artifacts listed in Section 2
- `docs/adoption/open-source-release-checklist.md` baseline: `c214d3c44838d53aabfb363a7c37813b95e810411d7f21d515dd3aaab53659f7`
- Commit `094729d20f5bccbe87446e4f69edf46c972ee22e` is already an ancestor of official `origin/main`; no unmerged old-branch delta was inherited.

Contract/review/accepted-boundary artifacts under `task-docs/history/adaptive-main-thread-orchestration-20260711/task-1-control-plane/` are control artifacts created before implementation. They are not implementation write paths and become read-only once the accepted boundary is frozen.

At implementation completion:

- tracked working-tree changes must be a subset of Section 4;
- untracked implementation files may include only the new adaptive protocol plus pre-existing control artifacts;
- all Section 6 hashes must match;
- the three protected absent paths must remain absent;
- no stage, commit, push, PR, or external write may exist.

## 8. Implementation Steps

1. Reverify Section 2 inputs, Section 6 protected hashes, branch identity, and changed-path baseline.
2. Add `task-docs/_harness/adaptive-orchestration-protocol.md` as the single detailed authority for adaptive control-plane behavior.
3. Update `AGENTS.md` concisely so adaptive governance is the default, route triggers reach the new protocol, triggered gates remain visible, and explicit full v2 remains available.
4. Update `docs/agent-routing/README.md` to list and explain the new normative route without turning all-route reading into a default.
5. Make only the necessary narrow control additions to external-system, high-risk, planning-scale, implementation-boundary, and validation/reporting routed docs.
6. Update semantic-fidelity protocol so it retains semantic ownership but defers topology selection to the adaptive protocol and treats full v2 as explicit compatibility rather than universal default.
7. Produce a requirement-to-heading map, modal-force preservation table, and focused router tabletop results in the Implementation Report.
8. Run all Section 12 checks, reverify protected paths, and report any unvalidated behavior honestly.

The executor may choose exact prose and heading order only within these fixed boundaries. It may not redesign authority ownership, add another protocol/role, or move Task 2-4 content into Task 1.

## 9. Modal-Force Preservation Requirements

The implementation must preserve or strengthen, never downgrade, the following controls. Topic similarity is insufficient; force, trigger, required action, forbidden action, stop condition, and independence boundary must remain equivalent.

| Control family | Current authority | Required preserved force/effect |
| --- | --- | --- |
| Scope and unrelated work | `AGENTS.md`; implementation-boundary route | Only scoped files/actions; no adjacent cleanup, refactor, dependency, or out-of-contract repair. |
| Secrets and sensitive data | `AGENTS.md`; external-systems route | Do not read, expose, save, or modify outside exact authorization; evidence remains redacted. |
| External writes | `AGENTS.md`; external-systems route | Exact target/effect, scoped authority, preview/dry-run when available, required confirmation, and applicable readback. |
| High-impact actions | `AGENTS.md`; high-risk route | STOP without exact action/target, preview/plan when available, explicit confirmation, and recovery consideration. |
| Current-state evidence | `AGENTS.md`; current-state route | Fresh evidence whenever present state materially affects correctness; stale assumptions are not evidence. |
| Semantic fidelity | `AGENTS.md`; semantic protocol | Original Request Anchor, Pass A/B isolation, Outcome Contract, semantic comparison, and AC-pass-but-user-fail controls remain mandatory when triggered. |
| Dirty worktree and protected paths | `AGENTS.md`; implementation-boundary route; plan | Preserve unrelated work and verify hashes/changed paths; final diff alone is insufficient where untracked/prior work exists. |
| Validation and truthful reporting | `AGENTS.md`; validation/reporting route | Proportional validation; no fabricated execution, role use, external action, review, evidence, or completion. |
| HIGH-risk independence | requirements and plan; adaptive protocol target | HIGH Operational Risk, HIGH Semantic Risk, and high-impact external writes require producer-independent evidence distinct from main-thread final acceptance. |
| LOW-risk lightweight behavior | `AGENTS.md`; planning-scale and semantic routes | LOW-risk work does not inherit full-route reads, full v2, or durable artifacts without a real trigger. |

The Implementation Report must show before wording, after wording/path, trigger, source force, target force, and a main-thread-verifiable fidelity judgment for each family.

## 10. Acceptance Criteria

### T1-AC1 - Adaptive Default And Full-v2 Compatibility

Router states adaptive governance as default and full v2 as explicit/compatible, without defining a replacement mandatory sequence.

Evidence:

- router excerpts and route paths;
- negative search for wording that makes all six roles universal for ordinary harness use;
- explicit full-v2 compatibility excerpt.

### T1-AC2 - One Detailed Control-Plane Authority

One adaptive protocol owns topology and intervention invariants.

Evidence:

- requirement-to-heading map covering topology inputs, delegation value, packets, route binding, stable boundaries, context threshold, parallelism, retry domains, quality counters, operational attempts, intervention, stop states, controlled resume, synthesis, independence, and final acceptance/reporting;
- no contradictory second detailed authority.

### T1-AC3 - Gate And Modal-Force Preservation

Triggered gates retain or strengthen force.

Evidence:

- complete Section 9 modal-force preservation table with before/after citations;
- protected current-state route remains unchanged unless a separately accepted boundary exists, which this contract does not grant;
- no safety or semantic downgrade.

### T1-AC4 - Complete Control Coverage Without Mandatory Six-role Order

HIGH risk requires complete triggered-control coverage but does not automatically require all six named roles.

Evidence:

- one positive lightweight topology example with all triggered controls;
- one explicit full-v2 example;
- one negative example rejecting skipped gates.

### T1-AC5 - Valid Routes And Lightweight LOW-risk Handling

Route index and paths are valid; LOW-risk selective reading remains intact.

Evidence:

- every `AGENTS.md` route target exists after implementation;
- adaptive trigger maps to the new protocol;
- ordinary LOW-risk case does not route to unrelated docs or full v2.

### T1-AC6 - Semantic Protocol Ownership Preserved

Semantic protocol still owns Original Request Anchor, Pass A/B, Outcome Contract, semantic comparison, and AC-pass-but-user-fail handling.

Evidence:

- semantic rule preservation map;
- topology-selection wording defers to adaptive protocol without weakening semantic triggers;
- no semantic review is converted into a delivery task or seventh role.

### T1-AC7 - Truthful Proportional Final Reporting

Adaptive protocol and validation/reporting route require proportional main-thread final reports.

Evidence:

- requirements for selected material topology, delegated work and integration, primary evidence inspected, omitted major stages for MEDIUM/HIGH work, unvalidated areas, blockers, and residual risks;
- negative case rejects fabricated role, validation, review, or external-action claims.

### T1-AC8 - Focused Router Positive/Negative Tabletop

Before Task 1 acceptance, all three cases in Section 11 must pass. This focused behavior evidence cannot be deferred to Task 4.

Evidence:

- recorded case inputs, risk classification, selected topology, triggered routes/gates, expected non-routes, decision, and failure signal;
- main-thread review of each case;
- clear statement that this tabletop does not replace Task 4's full routing scenario matrix.

## 11. Focused Router Tabletop Fixture

The executor must evaluate these cases against the implemented router/protocol and include the completed table in the Implementation Report. It must not modify `routing-scenario-matrix-template.md` or create Task 4's acceptance matrix.

| Case | Input and risk | Expected topology | Required routes/gates | Expected non-routes/omissions | Failure signal |
| --- | --- | --- | --- | --- | --- |
| `T1-RT-01` ordinary task-docs work | User asks for a small reversible documentation edit under `task-docs/`; LOW Operational Risk and LOW Semantic Risk; current state does not materially affect the result. | Main-thread direct work or one focused capability, with smallest sufficient check. | Planning-scale route when task scaling is needed; implementation/validation routes only when their triggers apply. | No automatic full v2, Pass A/B, Outcome Contract, execution contract, all-route read, or independent HIGH-risk review. | Merely saying “task-docs” or “use harness” launches all six roles or all routes. |
| `T1-RT-02` explicit full v2 | User explicitly requests the complete v2 loop for a MEDIUM/HIGH semantic-risk task. | Planner -> plan evaluator -> solution designer -> solution evaluator -> frozen accepted contract -> executor -> result evaluator -> main-thread review, with active intervention controls. | Adaptive orchestration route, semantic route, planning/implementation/validation routes, plus any fact-triggered safety routes. | No omission of an explicitly requested role; no passive infinite forwarding. | Adaptive selection is used to ignore full v2, or full v2 bypasses retry/intervention/gate controls. |
| `T1-RT-03` lightweight topology with triggered gates | A bounded change is operationally simple to implement but performs a high-impact external write and has HIGH Semantic Risk. | Smallest topology that still includes a stable/frozen boundary, exact confirmation, producer-independent evidence, semantic controls, and main-thread final judgment. | External-system, high-risk, current-state when present state matters, semantic, implementation-boundary, validation/reporting, and adaptive orchestration controls. | Planner/designer agents may be omitted if controls are otherwise complete; secrets remain unread unless exactly authorized. | Lightweight topology drops confirmation, fresh evidence, semantic anchor/outcome boundary, protected state, or producer-independent verification. |

## 12. Validation Commands And Checks

Run from the dedicated worktree. Commands are read-only except for the implementation edits already authorized by Section 4.

```sh
test "$(git branch --show-current)" = "codex/adaptive-main-thread-orchestration"
test "$(git merge-base HEAD origin/main)" = "caf93131b6cb591644271105b1d8921459245341"
test "$(git rev-parse HEAD)" = "caf93131b6cb591644271105b1d8921459245341"

shasum -a 256 \
  task-docs/main-thread-control-enhancement-requirements-20260711.md \
  task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md \
  task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md \
  task-docs/adaptive-main-thread-orchestration-plan-review-20260711.md \
  task-docs/adaptive-main-thread-orchestration-accepted-planning-inputs-20260711.md \
  task-docs/adaptive-main-thread-orchestration-planning-delivery-report-20260711.md

test -f task-docs/_harness/adaptive-orchestration-protocol.md

rg -n "adaptive|full v2|main thread|route|gate" \
  AGENTS.md \
  task-docs/_harness/adaptive-orchestration-protocol.md \
  task-docs/_harness/semantic-fidelity-protocol.md

rg -n "Original Request Anchor|Pass A|Pass B|Outcome Contract|AC-pass-but-user-fail" \
  AGENTS.md task-docs/_harness/semantic-fidelity-protocol.md

git diff --check
git diff --name-status origin/main
git ls-files --others --exclude-standard
```

Also perform these non-mechanical checks:

- verify every `AGENTS.md` routed path exists;
- compare all Section 6 hashes after implementation;
- verify protected absent paths remain absent;
- inspect the complete diff for modal-force and scope fidelity;
- execute and record all Section 11 tabletop cases;
- confirm that no structural/string check is claimed as semantic proof;
- confirm no stage, commit, push, PR, or external write occurred.

If latest `origin/main` changes after this boundary is frozen, stop. Do not rebase, merge, or update the branch inside Task 1. Return to the main thread for a new branch/boundary impact decision.

## 13. Reporting Requirements

The Task 1 Implementation Report must include:

- accepted boundary identity and SHA-256;
- branch, HEAD, `origin/main`, merge base, status, and changed-path evidence;
- files changed and reason for each;
- explicit confirmation that no Task 2-4 path changed;
- before/after verification for all Section 6 protected paths;
- T1-AC1 through T1-AC8 result and evidence mapping;
- requirement-to-heading map for the adaptive protocol;
- completed modal-force preservation table;
- completed `T1-RT-01` through `T1-RT-03` tabletop results;
- validation commands and summarized outputs;
- what was not validated;
- remaining risk, blockers, and evidence limitations;
- explicit statement that no stage, commit, push, PR, dependency, external write, or secret access occurred.

The executor must not claim independent review, Task 1 acceptance, Task 2 readiness, or implementation completion beyond the evidence it actually produced.

## 14. Stop Conditions

Stop without implementation or stop further writes and report the blocker if any of these occurs:

- any Section 2 or Section 6 hash mismatches;
- branch, HEAD, merge base, or committed changed-path baseline differs from Section 7;
- latest `origin/main` changes after freeze and proceeding would require merge/rebase/boundary reinterpretation;
- implementation requires a path outside Section 4;
- implementation requires changing a template, TOML, calibration, README, architecture, adapter, adoption doc, example, script, or Task 2-4 artifact;
- adaptive/default/full-v2 wording cannot be made coherent without weakening a safety or semantic gate;
- route selection, stable-boundary trigger, independent-verification trigger, or semantic ownership remains materially ambiguous;
- a required route path cannot exist without an unplanned architecture change;
- T1-RT-01, T1-RT-02, or T1-RT-03 cannot pass under the implemented authority;
- protected or unrelated user work changes;
- secret access, external write, stage, commit, push, PR, dependency addition, or other unauthorized action would be required;
- the executor would need to reinterpret the frozen requirements, plan Outcome Contract, or this boundary.

No finding may be repaired by expanding scope. Return it to the main thread for a revised versioned boundary.

## 15. Freeze And Executor Boundary

This contract becomes executable only when:

1. an independent read-only contract reviewer returns strict PASS with no P0/P1 finding and no missing AC/protected-path evidence;
2. the main thread confirms the review against the actual contract text;
3. the exact passing text is copied unchanged to `ACCEPTED_CONTRACT.md`;
4. the accepted boundary receives a final SHA-256 and stable identity.

After freeze, the executor may read only the accepted boundary as Task 1 execution authority plus the frozen inputs and routed sources it cites. The executor must not edit the accepted boundary or this contract iteration.

Completion of contracting is a stop point. Do not execute Section 8 or any implementation write during the current task.
