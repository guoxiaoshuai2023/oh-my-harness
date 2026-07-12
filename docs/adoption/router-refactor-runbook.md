# Router Refactor Runbook

Use this runbook to migrate a large project-specific `AGENTS.md` into the generic router architecture.

## 1. Freeze Scope

Define:

- User goal.
- Non-goals.
- Files allowed to change.
- Files protected as read-only.
- Operational Risk and Semantic Risk separately.
- Which current-state, safety, semantic, stable-boundary, validation, and producer-independence gates are fact-triggered.

If the source file contains many rules or safety gates, treat the migration as HIGH semantic risk.

## 2. Capture Source Snapshot

Before rewriting `AGENTS.md`, capture an immutable source snapshot.

```sh
python3 scripts/extract_agents_source.py AGENTS.md \
  --snapshot task-docs/agents-source-snapshot-<yyyymmdd>.md \
  --coverage task-docs/agents-source-coverage-<yyyymmdd>.md
```

Record the SHA-256 in the plan, contract, and final report.

The generated snapshot includes raw full source text and source block IDs. Do not snapshot files containing secrets, credentials, tokens, cookies, local storage, private keys, billing/payment data, permission data, or other sensitive material unless explicitly authorized and redacted.

## 3. Build Coverage Manifest

Every source block must appear exactly once as:

- Rule ID.
- Non-normative.
- Duplicate covered by Rule ID.

Duplicate coverage is valid only when force, trigger, stop condition, forbidden action, required action, and safety boundary are equivalent.

## 4. Build Rule Preservation Ledger

For every normative rule, record:

- Rule ID.
- Source block ID.
- Original excerpt.
- Original force.
- Handling.
- Target document and heading.
- Target excerpt.
- Router retained summary.
- Routing trigger.
- Target force.
- Force preserved.
- Fidelity judgment.

`MUST`, `MUST NOT`, and `STOP` cannot be downgraded.

Run the structural rule-preservation check after the coverage manifest and ledger are filled:

```sh
python3 scripts/validate_rule_preservation.py \
  --snapshot task-docs/<source-snapshot>.md \
  --coverage task-docs/<source-coverage>.md \
  --ledger task-docs/<rule-ledger>.md
```

This check proves mechanical traceability, not full semantic equivalence. It fails when a source block is missing or duplicated in coverage, a coverage Rule ID is missing from the ledger, a strong-force rule is downgraded, or a duplicate row lacks explicit equivalence evidence across force, trigger, stop condition, forbidden action, required action, and safety boundary.

## 5. Create Routed Docs

Move long-form details into routed docs. Keep route paths stable. Do not merge, rename, split, or substitute route docs during execution unless the plan explicitly allows that architecture change.

## 6. Rewrite Router And Preserve The Adaptive Entry

Rewrite `AGENTS.md` only after source coverage and rule ledger exist. The router must retain:

- Always-on hard gates.
- Routing table.
- Adaptive main-thread governance as the default harness entry and the adaptive protocol route trigger.
- Three distinct complete-v2 states with their modal force: the main thread MUST default to the smallest sufficient adaptive topology; full v2 MUST run for a direct user request or stricter downstream policy; and, without either requirement trigger, the main thread MAY deliberately select full v2 under the complete task-specific evidence record when it is the clearest control coverage.
- Semantic fidelity entry point.
- High-risk action stops.
- Validation/reporting minimums.

Do not replace the adaptive entry with a fixed topology taxonomy. Named roles and stages are optional, but every triggered gate still needs an owner, primary evidence, and decision. Required full-v2 triggers are not optional. A deliberate full-v2 choice without those triggers needs a task-specific record of concrete facts, a smaller viable topology and its specific gap, non-duplicative value for all six interfaces, gate owners/evidence/dependencies/handoffs/decisions, positive cost/context value, and active main-thread synthesis, topology revision, intervention, finite retries, evidence arbitration, and final acceptance. HIGH risk, the harness name, role availability, and process inertia are never sufficient selectors. Every delegation needs a complete packet and stable producer-nonmodifiable write authority; frozen/versioned authority is required when its escalation triggers apply. Keep nested delegation prohibited by default and preserve finite stage-local, retry-domain cumulative, and artifact-free operational budgets.

## 7. Create Routing Scenario Fixture

Build a forward and reverse fixture:

- Every router trigger maps to a scenario.
- Every Rule ID maps to a scenario or exact always-on hard gate.
- LOW-risk work proves it does not read the full route stack.
- Harness-managed `task-docs/` work proves adaptive route selection and fact-triggered gates rather than unconditional full v2.
- A required complete-v2 fixture proves an explicit request or stricter policy composes all six interfaces in order without weakening retry, intervention, independence, or main-thread acceptance.
- A deliberate complete-v2 fixture proves the main thread may select all six interfaces without either requirement trigger only under the complete task-specific evidence record.

Run the smoke/coverage check:

```sh
python3 scripts/validate_router_fixture.py \
  --router AGENTS.md \
  --fixture task-docs/<routing-fixture>.md \
  --ledger task-docs/<rule-ledger>.md
```

This helper checks that router triggers, route paths, and optional Rule IDs are mentioned in the fixture. It is not a semantic equivalence verifier and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.

Manually review `RSM-005` after the smoke check. Structural mention coverage cannot prove that adaptive omissions preserve every triggered gate or that all three states retain their modal force. Reject wording that makes explicit request/stricter policy the only complete-v2 path, and reject automatic full-v2 selection from HIGH risk, harness presence, role availability, or process inertia.

## 8. Report Precisely

Final report should include:

- Source snapshot SHA-256.
- Route docs created or changed.
- Coverage counts.
- Rule ledger counts.
- Scenario fixture counts.
- Validation commands.
- What was not validated.
- Remaining risk.
- Selected topology, triggered gates, intentionally omitted major stages when material, stable boundary identity, and separate main-thread acceptance.
