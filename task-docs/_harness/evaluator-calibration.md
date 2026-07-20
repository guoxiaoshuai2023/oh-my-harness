# Evaluator Calibration

This is the canonical calibration source for Requirements Evaluator, Plan Evaluator, Solution Evaluator, Result Evaluator, and Orchestration Reviewer. Cases are recurring failure-pattern selectors. They never substitute for exact target/upstream reads, current-state evidence, commands, diffs, behavior, or assigned acceptance criteria.

Every evaluator packet binds this file by canonical identity/path before launch. Every report records Consulted calibration path and Relevant calibration case IDs. Use N/A for case IDs only after consultation finds no relevant case.

## Strict Decision Rule

- Return strict PASS or FAIL; never PASS with caveats.
- Any P0/P1, missing required acceptance evidence, unverified required AC, wrong target/upstream binding, or unavailable required primary evidence is FAIL or incomplete/invalid under the artifact rules.
- Evaluator workspace-write is only a logical report-only write boundary plus post-execution verification. It is not native isolation or source/product authority.
- The evaluator must not repair or modify the target, launch another agent, start revision, disposition findings, transition state, or accept.
- Integrity and binding failures are classified before verdict content.

## Case Schema

Each case records: case ID, category, applies-to capabilities, task pattern, incorrect decision, expected decision, missing/decisive evidence, evaluator rule, likely fault origin, AC-pass-but-user-fail angle, and relevant templates/protocols.

## Case Inventory

| Case ID | Category | Applies to |
| --- | --- | --- |
| CAL-001 | producer self-proof treated as independent evidence | all five |
| CAL-002 | actual user-visible/runtime behavior unverified | Solution, Result |
| CAL-003 | current-state-dependent result uses stale evidence | all five |
| CAL-004 | Boundary leaves material redesign to Executor | Plan, Solution, Result |
| CAL-005 | sensitive data leaks into evidence | all five |
| CAL-006 | missing AC evidence still passed | all five |
| CAL-SEM-001 | outcome evidence downgraded to implementation proxy | Requirements, Plan, Result |
| CAL-SEM-002 | Pass A contaminated by Plan content | Plan, Orchestration |
| CAL-SEM-003 | Task split loses whole outcome/currentness | Plan, Result, Orchestration |
| CAL-SEM-004 | structural smoke overclaimed as semantic proof | all five |
| CAL-ADAPT-001 | LOW work receives automatic capability/artifact ceremony | Plan, Orchestration, Result |
| CAL-ADAPT-002 | omitted capability drops a triggered gate | Plan, Orchestration, Result |
| CAL-ADAPT-003 | incomplete packet or discoverability-only route binding | all five |
| CAL-ADAPT-004 | unmanaged parallel writers or vote arbitration | Plan, Orchestration, Result |
| CAL-ADAPT-005 | stable profile carries dynamic facts or weakened authority | all five |
| CAL-ADAPT-006 | relabelling resets retry domain | Orchestration, Result |
| CAL-ADAPT-007 | unsupported finding consumes producer failure budget | all five |
| CAL-ADAPT-008 | artifact-free operational failure omitted or fabricated | all five |
| CAL-ADAPT-009 | counts/strings/fixtures treated as behavior | all five |
| CAL-ADAPT-011 | capability attempts fan-out | all five |
| CAL-ADAPT-012 | Solution role creates or reviews attempt permission | Solution, Orchestration |
| CAL-ADAPT-013 | false runtime report-isolation claim | all five |
| CAL-ADAPT-014 | invalid report unlocks or recovery reuses path | all five |
| CAL-ADAPT-015 | peer message or receipt impersonates authority | all five |
| CAL-ADAPT-016 | renamed fixed workflow survives unified selection | Plan, Orchestration, Result |

## Core Evidence Cases

### CAL-001 — Producer self-proof

- Pattern: producer report/checklist is the only support for completion.
- Incorrect: PASS from producer narrative.
- Expected: FAIL until evaluator independently reads actual state and decisive evidence.
- Rule: self-report is a claim; repeat or directly inspect applicable files, diffs, behavior, commands, current state, and AC evidence.
- Relevant templates/protocols: `task-docs/_harness/templates/executor-report-template.md`, `task-docs/_harness/templates/result-qa-template.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`.
- Fault origin: missing independent evidence or wrong review prompt.
- User-failure angle: every checkbox passes while the result is absent.

### CAL-002 — Actual behavior unverified

- Pattern: a UI, CLI, generated artifact, interaction, export, or runtime result is accepted from code inspection only.
- Incorrect: PASS.
- Expected: FAIL when the assigned user-visible/runtime behavior lacks direct verification.
- Rule: inspect the actual output or closest authorized affected-path reproduction; name any impossible check as unverified.
- Relevant templates/protocols: `docs/agent-routing/current-state-evidence.md`, `docs/agent-routing/validation-and-reporting.md`, `task-docs/_harness/templates/result-qa-template.md`.
- Fault origin: evidence/validation gap.
- User-failure angle: implementation exists but the user-observable path fails.

### CAL-003 — Stale current state

- Pattern: correctness depends on current behavior/configuration but only an old screenshot/report/plan assumption is supplied.
- Incorrect: PASS.
- Expected: FAIL or incomplete until fresh evidence within the applicable freshness boundary exists.
- Rule: compare authority, capture time, reproducibility, and source freshness; older evidence cannot overrule current primary state.
- Relevant templates/protocols: `docs/agent-routing/current-state-evidence.md`, `task-docs/_harness/templates/context-handoff-template.md`, `task-docs/_harness/semantic-fidelity-protocol.md`.
- Fault origin: stale evidence.
- User-failure angle: structurally valid change targets obsolete state.

### CAL-004 — Boundary leaves redesign to Executor

- Pattern: allowed actions, protected state, result meaning, validation, or stops remain for the Executor to choose.
- Incorrect: PASS because the Boundary is short or the producer is trusted.
- Expected: FAIL and route the uncertainty to the Plan, Design, or main Boundary owner.
- Rule: an Executor consumes a frozen Task, accepted Design when present, and one main-issued Boundary; it cannot invent material semantics or permission.
- Relevant templates/protocols: `task-docs/_harness/templates/task-packet-template.md`, `task-docs/_harness/templates/technical-solution-design-template.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`.
- Fault origin: Plan/Design/Boundary defect.
- User-failure angle: implementation checks pass for the Executor's invented interpretation.

### CAL-005 — Sensitive evidence leak

- Pattern: a report/log captures secrets, credentials, tokens, cookies, localStorage, billing, keys, or private configuration.
- Incorrect: PASS because evidence is useful.
- Expected: FAIL/STOP; preserve only redacted evidence and route required authority.
- Rule: evidence quality never authorizes sensitive access or disclosure.
- Relevant templates/protocols: `docs/agent-routing/external-systems-and-secrets.md`, `docs/agent-routing/validation-and-reporting.md`, `task-docs/_harness/templates/result-qa-template.md`.
- Fault origin: safety/boundary failure.
- User-failure angle: delivery succeeds by violating protected state.

### CAL-006 — Missing AC evidence

- Pattern: most tests pass but one required AC or negative probe is absent/unverified.
- Incorrect: qualified PASS.
- Expected: strict FAIL.
- Rule: every assigned AC and triggered gate needs applicable primary evidence; no caveat, average, or majority cures a missing criterion.
- Relevant templates/protocols: `task-docs/_harness/templates/plan-review-template.md`, `task-docs/_harness/templates/result-qa-template.md`, `docs/agent-routing/validation-and-reporting.md`.
- Fault origin: implementation/evidence/plan depending on ownership.
- User-failure angle: aggregate green status hides the unmet criterion.

## Semantic Drift Cases

### CAL-SEM-001 — Outcome replaced by proxy

- Pattern: a real outcome AC is converted into file, prompt, schema, count, role, or command-exit evidence.
- Incorrect: PASS because the proxy exists.
- Expected: FAIL until observable outcome, owner, primary evidence, negative signal, decision path, and consumer close.
- Rule: implementation artifacts support but do not replace user-valued results.
- Relevant templates/protocols: `task-docs/_harness/templates/requirements-template.md`, `task-docs/_harness/templates/plan-template.md`, `task-docs/_harness/semantic-fidelity-protocol.md`.
- Fault origin: Requirements/Plan or result-evidence drift.
- User-failure angle: every deliverable exists while the requested outcome does not.

### CAL-SEM-002 — Pass A contamination

- Pattern: Pass A reads planner-authored outline or candidate before freezing its baseline.
- Incorrect: PASS because final Plan matches the contaminated baseline.
- Expected: FAIL/STOP; produce a new independent baseline under a new invocation.
- Rule: Pass A reads only Original Request Anchor, current-state/safety context, and repo facts before Plan content.
- Relevant templates/protocols: `task-docs/_harness/semantic-fidelity-protocol.md`, `task-docs/_harness/templates/plan-review-template.md`, `task-docs/_harness/templates/orchestration-prompt-template.md`.
- Fault origin: planning/orchestration authority failure.
- User-failure angle: drift is normalized before review.

### CAL-SEM-003 — Split loses whole result or currentness

- Pattern: all Tasks pass locally but no owner revalidates the combined outcome, or later shared-source changes retain stale upstream PASS.
- Incorrect: PASS from per-Task labels.
- Expected: FAIL until dependencies, integration owner, affected ACs, rerun evidence, and main currentness transition close.
- Rule: a Task result is bound to exact evidence and affected surfaces; later material changes require no-impact, reopen/reaccept, or supersession.
- Relevant templates/protocols: `task-docs/_harness/semantic-fidelity-protocol.md`, `task-docs/_harness/templates/context-handoff-template.md`, `task-docs/_harness/templates/executor-report-template.md`.
- Fault origin: Plan/ownership/currentness.
- User-failure angle: local closure produces an inconsistent system.

### CAL-SEM-004 — Smoke check overclaim

- Pattern: parser, hash, string, count, route fixture, or schema check is represented as semantic equivalence.
- Incorrect: PASS.
- Expected: FAIL when required behavior, modal force, owner, stops, or negative probes are not independently inspected.
- Rule: structural checks prove only encoded structure; combine them with actual source/behavior and semantic judgment.
- Relevant templates/protocols: `task-docs/_harness/templates/routing-scenario-matrix-template.md`, `docs/agent-routing/validation-and-reporting.md`, `task-docs/_harness/semantic-fidelity-protocol.md`.
- Fault origin: evidence/review mismatch.
- User-failure angle: structure is green while authority or behavior is reversed.

## Adaptive Governance Cases

### CAL-ADAPT-001 — LOW ceremony

- Pattern: LOW one-file/no-trigger work creates capability invocations or durable governance artifacts because the Harness is named.
- Incorrect: PASS as thorough governance.
- Expected: FAIL.
- Rule: use direct main work plus proportional validation and zero invocation/artifact events when no trigger exists.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `docs/agent-routing/task-planning-scale.md`, `task-docs/_harness/templates/orchestration-prompt-template.md`.
- Fault origin: topology/prompt.
- User-failure angle: proportionality is lost even when the edit is correct.

### CAL-ADAPT-002 — Dropped triggered gate

- Pattern: an optional capability is omitted and its safety, semantic, stable-Boundary, current-state, independence, retry, or validation control disappears too.
- Incorrect: PASS because fewer roles is adaptive.
- Expected: FAIL.
- Rule: every triggered gate keeps an owner, primary evidence, and decision regardless of selected capabilities.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/templates/task-packet-template.md`, `task-docs/_harness/templates/orchestration-prompt-template.md`.
- Fault origin: topology/packet.
- User-failure angle: lightweight label bypasses a mandatory control.

### CAL-ADAPT-003 — Invalid packet/route binding

- Pattern: packet omits exact objective, upstream, write/protected scope, evidence, stops, calibration/report binding, or relies on repository discoverability.
- Incorrect: PASS or launch.
- Expected: STOP before invocation.
- Rule: require complete stable packet content and proved inheritance or explicit route/gate binding.
- Relevant templates/protocols: `task-docs/_harness/templates/task-packet-template.md`, `task-docs/_harness/templates/orchestration-prompt-template.md`, `docs/agent-routing/README.md`.
- Fault origin: packet/orchestration.
- User-failure angle: capability operates under inferred authority.

### CAL-ADAPT-004 — Parallel ownership/arbitration failure

- Pattern: unisolated writers overlap, downstream starts early, or votes/confidence decide conflicting evidence.
- Incorrect: PASS.
- Expected: FAIL/STOP.
- Rule: serialize writers; for read-only branches record distinct scope, dependency, state restrictions, consumer, cancellation, and main synthesis. Arbitrate from source authority, freshness, reproducibility, and scope.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/run-directory-protocol.md`, `task-docs/_harness/templates/context-handoff-template.md`.
- Fault origin: orchestration/topology.
- User-failure angle: unattributable writes or majority opinion replace truth.

### CAL-ADAPT-005 — Profile boundary drift

- Pattern: stable profile embeds current paths, commands, ACs, budgets, sequence, or grants broader authority.
- Incorrect: PASS because TOML parses and the role still sounds related.
- Expected: FAIL.
- Rule: profiles contain stable mission/non-transferable authority only; dynamic facts stay packet-owned; all profiles remain hard no-fan-out.
- Relevant templates/protocols: `.codex/agents/harness-planner.toml`, `.codex/config.example.toml`, `task-docs/_harness/templates/task-packet-template.md`.
- Fault origin: profile implementation.
- User-failure angle: reusable capability silently changes meaning across tasks.

### CAL-ADAPT-006 — Retry reset by rename

- Pattern: the same failed user result/root cause gets a fresh budget after stage, task, Boundary, prompt, role, tool, or topology rename.
- Incorrect: PASS.
- Expected: FAIL; continue cumulative/cause counts.
- Rule: first valid failure may get focused revision, second requires intervention before third, and post-intervention third exhausts; operational cause budgets remain separate.
- Relevant templates/protocols: `task-docs/_harness/run-directory-protocol.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/templates/result-qa-template.md`.
- Fault origin: retry/orchestration.
- User-failure angle: infinite retries hide exhaustion.

### CAL-ADAPT-007 — Unsupported finding counted

- Pattern: wrong review type, misunderstanding, or out-of-scope objection increments producer quality failures.
- Incorrect: treat as valid producer FAIL.
- Expected: reject with decisive evidence, classify reviewer/prompt/routing fault, and leave producer quality count unchanged.
- Rule: only evidence-supported in-scope controlling FAIL counts.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/templates/result-qa-template.md`, `task-docs/_harness/templates/governance-review-template.md`.
- Fault origin: review mismatch.
- User-failure angle: good work exhausts under irrelevant findings.

### CAL-ADAPT-008 — Operational artifact fabrication

- Pattern: timeout/startup/tool/report-write failure produces no reviewable artifact, but state records a candidate, report, or quality verdict.
- Incorrect: PASS/FAIL as if review occurred.
- Expected: operational incomplete/unavailable only.
- Rule: preserve exact error; never invent missing artifact/review/readback; apply normalized-cause finite retry.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/run-directory-protocol.md`, `task-docs/_harness/templates/result-qa-template.md`.
- Fault origin: operational/runtime plus no-fabrication breach.
- User-failure angle: transition is based on nonexistent evidence.

### CAL-ADAPT-009 — Fixture becomes authority

- Pattern: registry/subset model, filenames, counts, or source strings pass while end-to-end source behavior fails.
- Incorrect: PASS.
- Expected: FAIL.
- Rule: fixture evidence must stay joined to actual profiles/protocols/templates/docs, artifact traces, and discriminating negative probes.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-acceptance-matrix.md`, `task-docs/_harness/templates/governance-review-template.md`, `docs/agent-routing/validation-and-reporting.md`.
- Fault origin: evidence mismatch.
- User-failure angle: toy model passes but runnable Harness does not.

### CAL-ADAPT-011 — Capability fan-out

- Pattern: any capability creates, invokes, launches, delegates to, or reconfigures another agent, including when a packet appears to authorize it.
- Incorrect: PASS because depth/count is bounded.
- Expected: invocation invalid/STOP.
- Rule: hard no-fan-out is unconditional; only main launches each new invocation.
- Relevant templates/protocols: `.codex/agents/harness-executor.toml`, `task-docs/_harness/templates/task-packet-template.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`.
- Fault origin: profile/packet/orchestration.
- User-failure angle: lifecycle authority escapes main while counts remain bounded.

### CAL-ADAPT-012 — Solution owns permission

- Pattern: Solution Designer emits a Boundary/permission artifact, Solution Evaluator reviews it, or either changes Task AC/lifecycle.
- Incorrect: PASS because the artifact is executable.
- Expected: FAIL and return to the true owner.
- Rule: Solution pair produces/reviews one concrete Technical Solution Design only; main later derives attempt permission.
- Relevant templates/protocols: `.codex/agents/harness-solution-designer.toml`, `.codex/agents/harness-solution-evaluator.toml`, `task-docs/_harness/templates/technical-solution-design-template.md`, `task-docs/_harness/templates/solution-review-template.md`.
- Fault origin: Solution mission/Architecture boundary.
- User-failure angle: renamed permission workflow survives under Design terminology.

### CAL-ADAPT-013 — False report isolation

- Pattern: workspace-write plus a successful hash check is described as native path ACL, runtime isolation, or source/product write authority.
- Incorrect: PASS.
- Expected: FAIL.
- Rule: label logical report-only write boundary plus post-execution verification; verify exact changed paths and protected hashes every invocation.
- Relevant templates/protocols: `docs/decisions/ADR-0002-evaluator-report-boundary.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/templates/result-qa-template.md`.
- Fault origin: runtime/evidence claim.
- User-failure angle: a logical restriction is overstated as enforcement.

### CAL-ADAPT-014 — Invalid report/recovery unlock

- Pattern: collision, missing parent, permission/runtime failure, partial/unavailable report, target/upstream mutation, extra write, or binding mismatch still unlocks; retry reuses path or overwrites collision.
- Incorrect: consume verdict or PASS.
- Expected: invalid/incomplete/operational status under integrity precedence; no unlock.
- Rule: recovery uses new invocation/new absent path after cause classification; permission expansion requires confirmation.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/run-directory-protocol.md`, `task-docs/_harness/templates/task-packet-template.md`.
- Fault origin: artifact lifecycle/orchestration.
- User-failure angle: formal review appears complete despite corrupt ownership.

### CAL-ADAPT-015 — Peer/receipt authority impersonation

- Pattern: peer message changes scope/permission/retry/disposition/acceptance, or a main receipt/summary is presented as evaluator report.
- Incorrect: PASS.
- Expected: FAIL/STOP.
- Rule: allowed messages are question, clarification, artifact-ready notice, and evidence/finding reference; receipts are derivative; main dispositions original reports.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/run-directory-protocol.md`, `task-docs/_harness/templates/context-handoff-template.md`.
- Fault origin: communication/lifecycle.
- User-failure angle: exact owner voice and decision chain are lost.

### CAL-ADAPT-016 — Renamed fixed workflow

- Pattern: labels are removed but a fixed prior order, parallel compatibility branch, designer-owned permission loop, or automatic all-capability selection remains.
- Incorrect: PASS from terminology/count checks.
- Expected: FAIL.
- Rule: source must support arbitrary fact-selected subsets, dependency-induced order, direct LOW work, all-nine hard no-fan-out, Technical-Design-only Solution roles, and main-owned lifecycle without selectable legacy behavior.
- Relevant templates/protocols: `task-docs/_harness/adaptive-orchestration-protocol.md`, `task-docs/_harness/templates/orchestration-prompt-template.md`, `task-docs/_harness/templates/technical-solution-design-template.md`.
- Fault origin: semantic implementation drift.
- User-failure angle: migration is cosmetic while old behavior remains.

## Applying Calibration

1. Bind the canonical identity/path in the packet.
2. Read exact target and upstream primary evidence.
3. Select relevant cases; do not force a match.
4. Apply the assigned review type and strict evidence standard.
5. Record case IDs or N/A, inspected evidence, unchecked areas, verdict, findings, and completion.
6. Write only the unique report. Main later verifies report/target/upstream/protected scope and dispositions findings.

Calibration is updated only by a separately authorized source change. A report cannot amend this file, and a calibration match never creates a global rule or final acceptance.
