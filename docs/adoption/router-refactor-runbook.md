# Router Refactor Runbook

Use this runbook to move a large project-specific AGENTS.md into the trigger-based unified Harness router without weakening rules.

## 1. Freeze Scope And Evidence

Record the user result/non-goals, allowed/protected paths, separate Operational/Semantic Risk, current-state needs, triggered gates, stable Boundary, and validation. Treat a rule-heavy or safety-sensitive migration as HIGH Semantic Risk.

Before rewriting, capture an immutable source snapshot and coverage skeleton:

    python3 scripts/extract_agents_source.py AGENTS.md \
      --snapshot task-docs/agents-source-snapshot-<date>.md \
      --coverage task-docs/agents-source-coverage-<date>.md

Do not snapshot sensitive content unless exact authority and redaction exist.

## 2. Close Source Coverage

Classify every source block exactly once as normative Rule ID, non-normative, or duplicate covered by a Rule ID. Duplicate coverage is valid only when force, trigger, owner, stop condition, forbidden action, required action, and safety boundary are equivalent.

For every rule, record source block/excerpt/force, target route/heading/excerpt/force, router summary, trigger, ownership, and fidelity judgment. MUST, MUST NOT, and STOP force cannot be downgraded.

Run the structural helper:

    python3 scripts/validate_rule_preservation.py \
      --snapshot task-docs/<source-snapshot>.md \
      --coverage task-docs/<source-coverage>.md \
      --ledger task-docs/<rule-ledger>.md

The helper proves mechanical traceability only, not semantic equivalence.

## 3. Preserve Stable Routes

Move long-form rules into fact-triggered routes while keeping route paths stable. Merging, renaming, splitting, substituting, or moving a routed document is an Architecture decision, not an incidental refactor.

The router keeps:

- always-on hard gates;
- exact trigger → route rows;
- the nine optional capability registry and main-only lifecycle;
- no named mode, fixed order, compatibility branch, or automatic all-capability path;
- mandatory gate ownership under omitted capabilities;
- LOW direct/no-artifact behavior;
- Original Request Anchor, Pass A/B, Outcome, Technical Design, current-state, and AC-pass-but-user-fail triggers;
- validation/reporting minimums and independent verification.

All capability invocations are hard no-fan-out. A task packet cannot authorize a capability to launch another agent. Only main issues each separate invocation.

## 4. Build Routing And Behavior Fixtures

The routing scenario matrix provides forward and reverse trigger/path coverage, LOW non-route proof, HIGH-with-subset gate closure, Technical-Design-only negative cases, main-owned producer/evaluator artifact exchange, logical report-only verification, and renamed fixed-workflow rejection.

Run:

    python3 scripts/validate_router_fixture.py \
      --router AGENTS.md \
      --fixture task-docs/<routing-fixture>.md \
      --ledger task-docs/<rule-ledger>.md

The smoke check cannot prove modal force or behavior. Manually inspect the source router/protocols/templates, end-to-end traces, and discriminating negative probes. Reject a migration where strings/counts pass but LOW ceremony, fixed order, dropped gates, capability fan-out, Solution-owned permission, invalid-report unlock, or false isolation claims survive.

## 5. Verify Artifact Lifecycle

For formal delegated review, main must bind an absent candidate/report path, exact target/upstream hashes, protected baseline, one writer, canonical evaluator calibration, strict verdict schema, and postflight scope check. Evaluator workspace-write is a logical report-only write boundary plus post-execution verification. Collision, partial/unavailable output, mutation, extra write, or binding mismatch cannot unlock.

## 6. Report Precisely

Report snapshot and changed-path hashes, coverage/ledger/scenario evidence, selected capability topology when material, triggered gates, intentionally omitted capabilities/artifacts, validation commands, unvalidated areas, and remaining risk. Structural green status never replaces producer-independent semantic review or main acceptance.
