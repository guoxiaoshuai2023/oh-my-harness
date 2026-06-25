# oh-my-harness

**A portable agent harness for teams that want AI coding agents to move fast without losing scope, safety, or intent.**

Most agent workflows start simple: one `AGENTS.md`, a few rules, and a lot of trust. Then the repo grows. Rules get long, safety constraints get buried, task plans drift, and "the tests passed" stops being enough evidence that the agent did the right thing.

`oh-my-harness` gives you a reusable architecture for that next stage: a small repo-level router, trigger-based detailed docs, semantic fidelity gates, execution contracts, result QA, and traceability artifacts that make agent work auditable.

## Why This Exists

AI agents are good at doing work. They are less reliable when the work depends on:

- preserving a user's exact intent across multiple steps,
- separating low-risk edits from high-risk operations,
- avoiding accidental scope expansion,
- proving that governance rules were moved, not weakened,
- validating behavior with evidence instead of vague confidence.

`oh-my-harness` turns those concerns into a practical repo structure that any project can copy, adapt, and enforce.

## What You Get

- **A compact `AGENTS.md` router** that keeps always-on hard gates and route triggers visible every session.
- **Trigger-based routed docs** so agents read only the rules relevant to the current task.
- **A v2 task loop**: planner -> plan evaluator -> solution designer -> solution evaluator -> frozen contract -> executor -> result evaluator -> main-thread review.
- **Semantic fidelity controls** for MEDIUM/HIGH-risk work: Original Request Anchor, Pass A/Pass B, Outcome Contract, semantic diff, and AC-pass-but-user-fail handling.
- **Traceability templates** for source snapshots, coverage manifests, rule preservation ledgers, and routing scenario matrices.
- **Ready-to-use Codex subagent configs** for the six logical harness responsibilities.
- **Zero-dependency helper scripts** for extracting `AGENTS.md` source blocks, checking rule-preservation traceability, and running router fixture smoke/coverage checks.
- **Adoption docs** for migrating an existing project into the harness safely.

## Repository Tour

| Path | What it contains |
| --- | --- |
| `.codex/agents/` | Optional Codex subagent adapter for the six v2 harness roles. |
| `AGENTS.md` | The generic repo-level router used by agents in this repo. |
| `docs/architecture.md` | High-level explanation of the harness model. |
| `docs/adapters/codex-subagents.md` | How the Codex subagent TOML files map to the generic harness. |
| `docs/agent-routing/` | Detailed route docs for secrets, external systems, high-risk actions, current-state evidence, implementation boundaries, validation, and planning scale. |
| `task-docs/_harness/semantic-fidelity-protocol.md` | Semantic risk protocol and v2 loop rules. |
| `task-docs/_harness/run-directory-protocol.md` | Run directory, accepted contract, evidence, and result QA conventions. |
| `task-docs/_harness/templates/` | Copyable templates for plans, reviews, contracts, reports, ledgers, snapshots, and routing fixtures. |
| `scripts/` | Standard-library Python helpers for snapshot extraction, rule-preservation structural checks, and router fixture smoke/coverage checks. |
| `examples/minimal-router/` | A small downstream example for projects that want the router pattern without the full stack. |
| `docs/adoption/` | Migration runbook and open-source release checklist. |

## Quick Start

Copy the harness into a target repo:

```sh
TARGET=/path/to/target-repo
mkdir -p "$TARGET/docs" "$TARGET/task-docs" "$TARGET/scripts"
cp AGENTS.md "$TARGET/"
cp -R .codex "$TARGET/"
cp -R docs/agent-routing "$TARGET/docs/"
cp -R task-docs/_harness "$TARGET/task-docs/"
cp scripts/extract_agents_source.py \
  scripts/validate_rule_preservation.py \
  scripts/validate_router_fixture.py \
  "$TARGET/scripts/"
```

Before shrinking an existing `AGENTS.md`, create source traceability artifacts:

```sh
python3 scripts/extract_agents_source.py AGENTS.md \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md
```

After you complete the source coverage manifest and rule preservation ledger, run the structural preservation check:

```sh
python3 scripts/validate_rule_preservation.py \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md \
  --ledger task-docs/rule-preservation-ledger.md
```

This helper checks source block coverage, rule-ledger mapping, strong-force preservation, and duplicate coverage evidence. It does not replace semantic equivalence review of the migrated wording.

After you build a routing scenario fixture, run the smoke/coverage check:

```sh
python3 scripts/validate_router_fixture.py \
  --router AGENTS.md \
  --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md
```

This helper checks trigger text, route paths, and optional ledger Rule ID mentions. It is not a semantic equivalence verifier and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.

## How It Works

`oh-my-harness` separates three things that often get mixed together:

1. **Routing**: `AGENTS.md` tells the agent which detailed doc to read for the current trigger.
2. **Execution control**: task work moves through planning, contract review, execution, result QA, and final review.
3. **Semantic preservation**: high-risk or ambiguous work is checked against the original user intent, not just local acceptance criteria.

This keeps low-risk work lightweight while giving high-risk work enough structure to prevent drift.

## Codex Subagent Adapter

The repo includes `.codex/agents/*.toml` for the six active v2 roles:

- `oh_my_harness_planner`
- `oh_my_harness_plan_evaluator`
- `oh_my_harness_solution_designer`
- `oh_my_harness_solution_evaluator`
- `oh_my_harness_executor`
- `oh_my_harness_result_evaluator`

These files are an adapter for Codex, not a separate architecture. Other agent runtimes can implement the same responsibilities with their own config format. See `docs/adapters/codex-subagents.md`.

## Use It When

- Your `AGENTS.md` is becoming too long to be useful.
- You want agent work to be scoped, reviewable, and evidence-backed.
- You need reusable task planning and execution contracts.
- You are migrating project-specific rules into routed docs.
- You want a public template for safer open-source agent workflows.

## Not A Framework Lock-In

This repo does not require a specific agent vendor, IDE, CI system, task runner, or programming language. The harness is mostly Markdown plus two small Python scripts. You can use it with subagents, human reviewers, a single agent session, or your own orchestration layer.

## Open Source Status

This repo is structured for open-source publication, but no license has been selected yet. License selection is a release-blocking owner decision before publishing. See `docs/adoption/open-source-release-checklist.md`.
