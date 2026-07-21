# oh-my-harness

[English](https://github.com/guoxiaoshuai2023/oh-my-harness) | [简体中文](https://github.com/guoxiaoshuai2023/oh-my-harness/blob/main/README.zh-CN.md)

**Repository-level governance for teams that let AI coding agents change real codebases. It keeps intent explicit, side effects bounded, and acceptance tied to evidence—without turning every task into a heavyweight multi-agent workflow.**

An AI coding agent makes decisions with incomplete information and uncertain reasoning, then applies those decisions to a shared system with real side effects. A prompt can tell the agent what you want. It cannot, by itself, keep that intent stable across a long task, control every write, separate production from evaluation, or prove that the delivered behavior is the behavior you asked for.

`oh-my-harness` puts those controls in the repository, where they can survive model context, handoffs, and tool changes. It is for teams whose agents have moved beyond disposable experiments and now touch code that other people depend on.

## You may already recognize the problem

- Your `AGENTS.md` keeps growing, yet the rule that mattered is still the rule the agent missed.
- The agent finishes the requested files but solves a subtly different problem from the one the user meant.
- Tests are green, but the result is a proxy: a schema exists, a command exits successfully, or a count matches while the real workflow still fails.
- A fixed multi-agent pipeline repeats work, obscures ownership, or launches more coordination than the task needs.
- When someone asks “Why did the agent consider this complete?”, the team cannot point to stable intent, an explicit boundary, and primary evidence.

More prompt text does not remove these failure modes. More agents can add useful judgment, but they also add handoffs, overlapping authority, and coordination cost. The missing layer is governance: a durable way to decide what may happen, who may decide it, what must remain untouched, and what evidence is sufficient.

## What changes after installation

| Before | With `oh-my-harness` |
| --- | --- |
| Important intent lives mainly in chat history or model memory. | Material intent is bound to stable repository artifacts when the task needs them. |
| Every task inherits either too little process or the same large workflow. | Task facts select the smallest useful control depth; simple work stays simple. |
| “Done” can mean files exist or tests pass. | Acceptance closes on observable behavior and primary evidence; structural checks remain supporting evidence. |
| Producers can grade their own work. | When independence matters, a separate evaluator inspects the actual result and reports strict `PASS` or `FAIL`; main still decides acceptance. |
| Agent roles can launch one another or blur responsibility. | Only the main thread launches work, controls boundaries and transitions, and resolves findings. Every optional capability is hard no-fan-out. |
| Installers infer ownership from familiar names. | The installer changes only the exact surface proven by its inventory and installation state, and stops on conflict or drift. |

This does not make an agent infallible or autonomous. It makes the agent's operating assumptions, permissions, evidence, and stop conditions inspectable.

## Quick Start

> **Current release status:** the npm package is not published. The supported way to try the current implementation is to pack this repository locally and run the CLI from that archive.

You need Node.js 24 (`>=24 <25`). Python 3.11 is needed only if you run the three validation helpers. All three helpers are installed as required payload, but they are not needed to run `install`, `update`, or `uninstall`.

From a checkout of this repository:

```sh
package_dir="$(mktemp -d)"
package_file="$(npm pack --pack-destination "$package_dir" --silent)"
package_path="$package_dir/$package_file"

npx --yes --package="$package_path" oh-my-harness install --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness install --target <repo>
```

Start with `--dry-run`. It prints the exact plan and performs no mutation. An interactive write asks once for confirmation; non-interactive automation must inspect the plan and add `--yes` explicitly.

The install adds a managed block to the target repository's root `AGENTS.md`, installs the fixed Harness payload under `.oh-my-harness/`, and adds nine optional Codex capability profiles under `.codex/agents/`. It does not replace the rest of `AGENTS.md` or remove the repository's existing agents, skills, plugins, scripts, CI, or domain rules.

Remove `package_dir` after local testing. Local packing and installation are not npm publication or release authorization.

## How you use it in real work

You continue asking your coding agent for outcomes. The Harness changes how the agent decides what control and evidence that request requires.

### Example 1: a low-risk local edit

**You ask:** “Fix the broken link in this README and verify it resolves.”

**The Harness response:** The main thread can use the lightweight path: inspect the relevant files, apply a narrow boundary, make the edit directly, and run a proportional link check. No capability invocation or durable Run tree is required merely because the Harness is installed.

**You get:** A focused diff, a direct check of the affected link, and a clear statement of what was and was not validated.

### Example 2: a cross-module feature or complex bug

**You ask:** “Fix stale cache invalidation across the API and storage layers without changing unrelated behavior.”

**The Harness response:** Main records the real result, non-goals, dependencies, protected state, and failure signals. It selects only the planning, design, execution, and independent-review capabilities justified by those facts, gives each producer a stable write boundary, and keeps transition authority in main.

**You get:** A result organized around observable behavior rather than modules, evidence from the affected runtime path, discriminating negative checks, and an independent finding path when the risk warrants it.

### Example 3: a migration or security-sensitive task

**You ask:** “Migrate production data to a new schema,” or “change an authentication boundary.”

**The Harness response:** High-impact and external-system gates activate. The agent must identify the exact target and effect, inspect current state, protect secrets, produce a plan or dry-run when available, require explicit authority for the real write, and independently verify the applicable outcome and safety evidence. Missing authority, ambiguous ownership, permission expansion, or conflicting evidence stops the task and returns the decision to you.

**You get:** Either a bounded, explicitly authorized action with evidence, or an honest stop before an unsafe write—not an automatic migration hidden behind a successful command.

The Harness does not automatically perform a real consumer migration, publish a package, deploy a service, promote a central case, or rewrite its own governance rules.

## Why this model works

The implementation follows from one starting fact:

> An AI coding agent is an uncertain decision-maker acting on a shared system with real side effects.

From there, the control model is a chain of consequences—not a collection of workflow ceremonies:

1. **Intent cannot live only in model memory.** Material goals, non-goals, and decisions need stable authority outside the current context. The Harness can bind original requests, requirements, outcomes, and current task truth when the work warrants it.
2. **Every action needs a boundary.** A task must name the allowed result, writes, protected state, dependencies, stop conditions, and evidence. Producers cannot expand that boundary themselves.
3. **Code and tests do not define correctness alone.** Acceptance must close on the behavior the user actually needs. Files, schemas, counts, and green commands can support that decision; they cannot substitute for it.
4. **Evaluation must be able to disagree with production.** Producers create candidates. Independent evaluators inspect primary evidence and write their own reports. Main verifies identities and scope, dispositions findings, and alone accepts or transitions the work.
5. **More agents are not automatically better.** Capabilities add judgment and coordination cost. The topology is recomputed from task facts, from direct main work through any subset of nine optional capabilities. There is no fixed pipeline or automatic all-nine path.
6. **A tool may change only what it can prove it owns.** The installer uses an immutable bundle inventory plus validated target state. Unknown content, marker damage, ownership drift, or unsafe paths cause a stop instead of a best-effort merge.

The named mechanisms—Original Request Anchor, Pass A/Pass B, Outcome Contract, stable Boundary, Result QA, and ownership state—are implementations of these principles. They are triggered controls, not user value by themselves.

## Why it is safe to adopt

| Question | Current behavior |
| --- | --- |
| **Will it overwrite my existing `AGENTS.md`?** | No. Install appends one marker-delimited managed block. Update replaces only that owned interval. Uninstall removes only that interval, preserving the exact outer bytes. Damaged or ambiguous markers stop the operation. |
| **Will it remove my existing agents, skills, plugins, CI, or rules?** | No. Those surfaces remain target-owned. A destination collision or exact Git overlap outside validated ownership stops before mutation. |
| **Must every task use all nine capabilities?** | No. Any factual subset is valid, including direct main work, one capability, a mixed subset, or all nine. Triggered gates remain mandatory even when a named capability is omitted. |
| **What happens on ownership conflict or drift?** | The plan reports a conflict and does not apply. Modified or missing managed content, incompatible state, unowned destinations, marker damage, unsafe paths, and target changes are stop conditions. |
| **How are update and uninstall confined?** | They require validated installation state reconciled with the installed inventory. Clean updates create and verify deterministic backups before destructive payload work. Uninstall removes state-proven current files and the managed block, then removes only recorded empty Harness-created parent directories. It preserves pre-existing, unrecorded, or non-empty target directories and content, keeps backups target-owned, and deletes state last. |
| **Does it silently adopt an older installation?** | No. Only `update` recognizes one exact historical six-profile/42-entry owned release and converts it to the current nine-profile/49-entry release. There is no generic adoption or migration mode. |
| **Is it vendor- or runtime-independent?** | The governance architecture is portable, but the current installer MVP is Codex repo-local and single-runtime. Other runtimes would need their own adapter and installation path. |

The installer checks repository containment, normalized paths, symlinks, special files, exact Git overlap, and a final pre-write fingerprint. These controls reduce accidental writes; they do not claim atomic protection against a privileged concurrent process replacing a checked path immediately before a filesystem operation.

## Who it is for—and who it is not for

`oh-my-harness` is a fit when:

- AI agents modify a real, shared repository rather than disposable examples;
- your repository rules have outgrown a single readable `AGENTS.md`;
- work spans multiple steps or modules and intent drift is expensive;
- safety, review independence, recovery, or auditability matters;
- you want simple edits to remain lightweight while complex work receives stronger controls.

It is not currently:

- a fully autonomous software-delivery system;
- a scheduler that always launches a fixed team of agents;
- a guarantee that tests or review can prove every real-world outcome;
- a global or multi-runtime installer;
- an arbitrary configuration merger or general migration framework;
- authorization to publish, deploy, migrate a real consumer, access secrets, or write to external systems.

If you only need a small routing pattern, see [`examples/minimal-router/`](https://github.com/guoxiaoshuai2023/oh-my-harness/tree/main/examples%2Fminimal-router) before adopting the full stack.

## Technical Reference

### Control model

`AGENTS.md` is a compact repository router. It keeps always-on hard gates visible and routes the agent to detailed documents only when their triggers apply. The main thread records task facts, selects capabilities, issues stable boundaries, verifies artifacts and write scope, controls retries and transitions, and makes final acceptance decisions.

Formal producer/evaluator work follows this ownership sequence:

```text
main issues a bounded producer packet
→ producer creates a candidate and evidence
→ main verifies candidate identity, hash, and write scope
→ main launches an independent evaluator against that exact candidate
→ evaluator writes a strict PASS or FAIL report
→ main verifies the report, dispositions findings, and decides the transition
```

Evaluator `workspace-write` is a logical report-only boundary plus post-execution verification. It is not native filesystem isolation, an operating-system ACL, or permission to repair product files.

### Optional capability reference

The Codex adapter exposes nine reusable interfaces:

- Requirements Author and Requirements Evaluator
- Planner and Plan Evaluator
- Solution Designer and Solution Evaluator
- Executor and Result Evaluator
- Orchestration Reviewer

Only main launches them. Every capability is hard no-fan-out and cannot launch or reconfigure another agent. Solution roles handle concrete Technical Solution Design only; they do not own execution permission or lifecycle transitions. Evaluators and reviewers write only their unique reports under logical report-only authority.

`.codex/config.example.toml` includes `multi_agent.max_depth = 1` as corroborating configuration. That setting does not itself grant fan-out, isolation, or lifecycle authority.

### Installer ownership and lifecycle

The managed installation surface is limited to:

- fixed release assets under `.oh-my-harness/`;
- nine optional profiles named `.codex/agents/oh-my-harness-*.toml`;
- one managed router block in the target root `AGENTS.md`.

An immutable bundle inventory fixes the required paths, hashes, agent paths, managed-block identity, ownership lists, and reference policy. The mutable installation-state record beneath `.oh-my-harness/` records the exact target-owned installation state. The lifecycle planner reconciles both before a write.

Same-release `install` or `update` is `NO_OP` only when version, inventory, state, owned bytes, and managed block agree. Drift, missing ownership, unowned collision, unsafe path, dirty overlap, or incompatible recovery evidence stops before normal mutation. Clean `update` backs up replaced or removed owned bytes under `.oh-my-harness-backups/<operation-id>/`. `uninstall` preserves those backups and deletes state last, after owned removal verifies.

The repository keeps the detailed lifecycle and adoption specifications under [`docs/adoption/`](https://github.com/guoxiaoshuai2023/oh-my-harness/tree/main/docs%2Fadoption).

### CLI reference

The public syntax is closed:

```text
usage: oh-my-harness <install|update|uninstall> --target <repo> [--dry-run] [--yes]
```

Using the locally packed archive from Quick Start:

```sh
npx --yes --package="$package_path" oh-my-harness install --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness install --target <repo>
npx --yes --package="$package_path" oh-my-harness update --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness update --target <repo>
npx --yes --package="$package_path" oh-my-harness uninstall --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness uninstall --target <repo>
```

The registry forms below are **not usable today**. If the scoped package is published in the future, its version-pinned lifecycle commands would be:

```sh
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>
```

Each command prints its exact plan before any write. `--dry-run` returns after planning. In a TTY, mutation requires one confirmation; non-interactive mutation requires `--yes`. Manual copying, unscoped `npx oh-my-harness`, and `--package=oh-my-harness` are not valid managed installation paths.

### Repository tour

| Path | Purpose |
| --- | --- |
| `AGENTS.md` | Repository router, always-on gates, and adaptive control entry point. |
| `docs/agent-routing/` | Triggered rules for external systems, secrets, high-impact actions, current state, implementation scope, validation, and planning scale. |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | Capability selection, main-only lifecycle, boundaries, retry, state, learning, and independent verification. |
| `task-docs/_harness/semantic-fidelity-protocol.md` | Semantic risk, authority, Pass A/B, Design, and user-failure controls. |
| `task-docs/_harness/run-directory-protocol.md` | Proportional persistence, Context/Board/task state, evidence, QA, recovery, and case custody. |
| `task-docs/_harness/templates/` | Requirements, Plan, Technical Design, packet, report, traceability, and learning templates. |
| `.codex/agents/` | Source profiles for the nine optional Codex capabilities. |
| `scripts/` | Standard-library Python helpers for source extraction and structural checks. |
| `examples/minimal-router/` | A lightweight downstream router example. |
| `docs/adoption/` | Installer lifecycle, migration boundary, and release guidance. |

### Traceability helpers

The installed Harness includes three Python 3.11 helpers. They provide structural evidence, not semantic proof.

Before shrinking an existing `AGENTS.md`:

```sh
python3 scripts/extract_agents_source.py AGENTS.md \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md
```

After completing the coverage manifest and rule-preservation ledger:

```sh
python3 scripts/validate_rule_preservation.py \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md \
  --ledger task-docs/rule-preservation-ledger.md
```

After building a routing scenario fixture:

```sh
python3 scripts/validate_router_fixture.py \
  --router AGENTS.md \
  --fixture task-docs/<routing-fixture>.md
```

These helpers check source-block coverage, rule mapping, force-preservation fields, route paths, trigger text, and optional Rule ID references. They do not replace semantic equivalence review, evaluator review, or main-thread acceptance.

### Security and operating limits

- High-impact actions, external writes, secrets, permissions, billing, keys, production systems, and destructive changes require the applicable plan/dry-run, exact authority, and stop controls. The Harness does not grant those permissions.
- Passing tests, schemas, files, counts, and producer reports are scoped evidence, not proof of all real-world behavior.
- Logical evaluator report-only authority is verified through packet binding and post-execution scope checks; it is not native runtime path isolation.
- Complete-Run learning is source-only and main-controlled. It cannot automatically modify Harness rules, launch work, or promote central cases. Real central-case mutation requires a later explicit human disposition and separately authorized custodian action.
- The package lifecycle does not provide global installation, arbitrary runtime adaptation, arbitrary configuration merging, or a general migration engine.
- Local package evidence does not establish npm scope ownership, credentials, signing, public release, or deployment authorization.

### Release and license status

The repository currently declares package version `0.1.0`, package identity `@guoxiaoshuai2023/oh-my-harness`, CLI binary `oh-my-harness`, Node engine `>=24 <25`, and Apache-2.0 licensing.

The package is not currently published. Local archives and passing repository checks demonstrate only the measured local candidate; they do not authorize or prove npm publication, signing, release creation, deployment, or real consumer migration. See the [open-source release checklist](https://github.com/guoxiaoshuai2023/oh-my-harness/blob/main/docs%2Fadoption%2Fopen-source-release-checklist.md).

The [Apache License 2.0](https://github.com/guoxiaoshuai2023/oh-my-harness/blob/main/LICENSE) is included at the npm package root and is intentionally not installed into `.oh-my-harness/`.
