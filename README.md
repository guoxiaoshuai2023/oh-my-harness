# oh-my-harness

**A portable agent harness for teams that want AI coding agents to move fast without losing scope, safety, or intent.**

Most agent workflows start simple: one `AGENTS.md`, a few rules, and a lot of trust. Then the repo grows. Rules get long, safety constraints get buried, task plans drift, and "the tests passed" stops being enough evidence that the agent did the right thing.

`oh-my-harness` gives you a reusable architecture for that next stage: a small repo-level router, adaptive main-thread governance, trigger-based detailed docs, semantic fidelity gates, stable execution boundaries, targeted independent review, and traceability artifacts that make agent work auditable.

## Why This Exists

AI agents are good at doing work. They are less reliable when the work depends on:

- preserving a user's exact intent across multiple steps,
- separating low-risk edits from high-risk operations,
- avoiding accidental scope expansion,
- proving that governance rules were moved, not weakened,
- validating behavior with evidence instead of vague confidence.

`oh-my-harness` turns those concerns into a practical repo structure that a project can install, adapt, and enforce.

## What You Get

- **A compact `AGENTS.md` router** that keeps always-on hard gates and route triggers visible every session.
- **Trigger-based routed docs** so agents read only the rules relevant to the current task.
- **Adaptive governance by default**: the main thread selects the smallest sufficient mix of direct work, reusable capabilities, durable artifacts, and targeted review while preserving every fact-triggered gate.
- **Complete-v2 compatibility without a default pipeline**: planner -> plan evaluator -> solution designer -> solution evaluator -> frozen contract -> executor -> result evaluator -> main-thread review is required when explicitly requested or imposed by stricter downstream policy, and remains available as an evidence-backed deliberate main-thread choice.
- **Semantic fidelity controls** for MEDIUM/HIGH-risk work: Original Request Anchor, Pass A/Pass B, Outcome Contract, semantic diff, and AC-pass-but-user-fail handling.
- **Traceability templates** for source snapshots, coverage manifests, rule preservation ledgers, and routing scenario matrices.
- **Ready-to-use Codex subagent configs** for the six logical harness responsibilities.
- **A non-destructive package lifecycle** for installing, updating, and uninstalling the exact managed surface without adopting files by name.
- **Zero-dependency helper scripts** for extracting `AGENTS.md` source blocks, checking rule-preservation traceability, and running router fixture smoke/coverage checks.
- **Adoption docs** for migrating an existing project into the harness safely.

## Repository Tour

| Path | What it contains |
| --- | --- |
| `.codex/agents/` | Optional Codex subagent adapter for the six v2 harness roles. |
| `.codex/config.example.toml` | Optional Codex repo-config example for one-level subagent fan-out. |
| `AGENTS.md` | The generic repo-level router used by agents in this repo. |
| `docs/architecture.md` | High-level explanation of the harness model. |
| `docs/adapters/codex-subagents.md` | How the Codex subagent TOML files map to the generic harness. |
| `docs/agent-routing/` | Detailed route docs for secrets, external systems, high-risk actions, current-state evidence, implementation boundaries, validation, and planning scale. |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | Normative topology, delegation, packet, boundary, dependency, retry, intervention, synthesis, and independent-verification rules. |
| `task-docs/_harness/semantic-fidelity-protocol.md` | Semantic risk protocol and v2 loop rules. |
| `task-docs/_harness/run-directory-protocol.md` | Run directory, accepted contract, evidence, and result QA conventions. |
| `task-docs/_harness/templates/` | Copyable templates for plans, reviews, contracts, reports, ledgers, snapshots, and routing fixtures. |
| `scripts/` | Standard-library Python helpers for snapshot extraction, rule-preservation structural checks, and router fixture smoke/coverage checks. |
| `examples/minimal-router/` | A small downstream example for projects that want the router pattern without the full stack. |
| `docs/adoption/` | Migration guidance and release checks. The universal adoption runbook and bundle lifecycle spec are release-repository-only; they are not installed payload. |

## Universal Harness Adoption

Universal Harness Adoption installs a fixed oh-my-harness release into an existing Codex repository without taking ownership of that repository's existing governance. An immutable bundle inventory and an installation-state record confine the managed installation surface and ownership to three surfaces:

- release assets under `.oh-my-harness/`;
- six Codex agent profiles named `.codex/agents/oh-my-harness-*.toml`;
- one marker-delimited managed router block in the target repository's root `AGENTS.md`.

Everything outside those owned files and the managed block remains target-owned. The bytes before and after the managed `AGENTS.md` block are preserved. Existing agents, skills, plugins, scripts, CI, domain rules, and other frameworks remain in place; a path, ownership, or marker conflict stops the operation instead of triggering a general merge.

Lifecycle operations are ownership-aware. A same-version reinstall is a no-op only when the installation state, owned files, and managed block are unchanged and conflict-free. Updating or uninstalling user-modified managed content requires a deterministic backup under `.oh-my-harness-backups/<operation-id>/`, path-specific disclosure, and explicit confirmation. These auxiliary writes sit outside the managed installation surface: the backups are target-owned recovery artifacts, not Harness-owned installation content. Uninstall removes only state-proven Harness files, the managed block, and empty parent directories that the Harness recorded as creating.

The current MVP is a Codex repo-local, single-runtime installer. It does not provide global installation, multi-runtime installation, arbitrary configuration merging, or a general migration framework.

## Quick Start

The product and repository are named `oh-my-harness`. The npm package identity is `@guoxiaoshuai2023/oh-my-harness`, and its CLI binary is `oh-my-harness`.

The lifecycle CLI requires Node.js 24 (`>=24 <25`) and uses only the Node standard library. Python 3.11 is required only when running the three Python helper validators shipped in the installed Harness; Python is not required to launch `install`, `update`, or `uninstall`.

The npm package has not been published as part of the current implementation acceptance. To verify and use the actual package locally from this repository, pack it into an OS temporary directory and invoke the binary from that archive:

```sh
package_dir="$(mktemp -d)"
package_file="$(npm pack --pack-destination "$package_dir" --silent)"
package_path="$package_dir/$package_file"

npx --yes --package="$package_path" oh-my-harness install --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness install --target <repo>
npx --yes --package="$package_path" oh-my-harness update --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness update --target <repo>
npx --yes --package="$package_path" oh-my-harness uninstall --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness uninstall --target <repo>
```

Remove the temporary directory after local testing. When a package version is formally published, registry commands become available in this form:

```sh
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>
```

Append `--dry-run` to any lifecycle operation to produce a plan without applying it. Each mutating command prints its exact plan before applying it. In a TTY it asks once for confirmation; automation must add the CLI's `--yes` flag after inspecting the plan. Manual copying, unscoped `npx oh-my-harness`, and `--package=oh-my-harness` are not valid managed installation paths.

The package always installs three required Python 3.11 helpers: `extract_agents_source.py`, `validate_router_fixture.py`, and `validate_rule_preservation.py`.

Before every mutation, the installer checks path normalization, repository-root containment, symlinks, and special files. A detected unsafe path stops the operation. This MVP does not claim atomic protection against a privileged concurrent process replacing a checked path in the remaining interval before the filesystem syscall; eliminating that race requires an OS-specific or native descriptor-relative mutation architecture outside the current scope.

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
  --fixture task-docs/<routing-fixture>.md
```

This helper checks trigger text, route paths, and optional ledger Rule ID mentions. It is not a semantic equivalence verifier and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.

For adoption details, use the [router refactor runbook](docs/adoption/router-refactor-runbook.md) and the [open-source release checklist](docs/adoption/open-source-release-checklist.md). Repository maintainers also have the release-only `universal-harness-adoption-runbook.md` and `bundle-lifecycle-spec.md` in the adoption-docs directory; those two files explain the package lifecycle but are intentionally outside the installed bundle.

## How It Works

`oh-my-harness` separates three things that often get mixed together:

1. **Routing**: `AGENTS.md` tells the agent which detailed doc to read for the current trigger.
2. **Execution control**: the main thread chooses and revises an evidence-backed topology; named roles and stages are optional, but triggered safety, semantic, current-state, stable-boundary, validation, and independence gates are mandatory.
3. **Semantic preservation**: high-risk or ambiguous work is checked against the original user intent, not just local acceptance criteria.

This keeps low-risk work lightweight while giving high-risk work enough structure to prevent drift. Every delegation receives a complete task packet and stable producer-nonmodifiable authority. Nested delegation is prohibited by default, and stage-local, retry-domain cumulative, and artifact-free operational budgets remain finite across renamed roles, tools, or stages.

The complete v2 sequence is a compatibility composition, not the default meaning of “use the harness.” It MUST run when explicitly requested or required by stricter downstream policy. Without either requirement trigger, the main thread MAY deliberately select it only when a task-specific record identifies concrete facts that make separate planning, plan review, boundary design, boundary review, execution, and result review materially useful; compares a smaller viable topology and its control/evidence/handoff gap; maps non-duplicative value for all six interfaces; binds gate owners, primary evidence, dependencies, handoffs, and decisions; shows positive marginal value despite cost and context; and keeps synthesis, topology revision, intervention, finite retries, evidence arbitration, and final acceptance active. HIGH risk, the harness name, role availability, or process inertia never selects the full sequence by itself, and role PASS labels never replace main-thread judgment.

## Codex Subagent Adapter

The repo includes `.codex/agents/*.toml` for six reusable capability interfaces:

- `oh_my_harness_planner`
- `oh_my_harness_plan_evaluator`
- `oh_my_harness_solution_designer`
- `oh_my_harness_solution_evaluator`
- `oh_my_harness_executor`
- `oh_my_harness_result_evaluator`

These files are an adapter for Codex, not a scheduler, mandatory pipeline, or separate architecture. The main thread owns topology, packets, synthesis, intervention, and final acceptance; project facts and validation depth belong in each packet. Other agent runtimes can implement the same responsibilities with their own config format. See `docs/adapters/codex-subagents.md`.

Optional fan-out guard: `.codex/config.example.toml` shows a repo-local Codex config with `multi_agent.max_depth = 1`. Copy it to `.codex/config.toml` only if your Codex version supports those repo-local config keys.

## Use It When

- Your `AGENTS.md` is becoming too long to be useful.
- You want agent work to be scoped, reviewable, and evidence-backed.
- You need reusable task planning and execution contracts.
- You are migrating project-specific rules into routed docs.
- You want a public template for safer open-source agent workflows.

## Not A Framework Lock-In

This repo does not require a specific agent vendor, IDE, CI system, or task runner. The managed lifecycle is a Node standard-library CLI, while the installed harness is mostly Markdown plus three Python 3.11 validation helpers. You can use it with subagents, human reviewers, a single agent session, or your own orchestration layer.

That architectural portability is separate from the current adoption MVP, which installs only the six repo-local Codex profiles described above.

## Open Source Status

This project is licensed under the [Apache License 2.0](LICENSE). The license is included at the npm package root and is intentionally not installed into `.oh-my-harness/`.

Local archive acceptance is not a public release, npm scope proof, signing, or publication authorization. Scope ownership/access, credentials, signing, publication, and release creation remain later owner-controlled work. See `docs/adoption/open-source-release-checklist.md`.
