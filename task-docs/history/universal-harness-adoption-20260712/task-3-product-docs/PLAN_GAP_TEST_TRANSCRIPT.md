# Task 3 Plan-Gap Test Transcript

Identity: `universal-harness-adoption-task-3-plan-gap-test-transcript-20260713-v1`

Command runtime: Node v24.14.0, npm 11.12.1

Command:

```sh
export PATH="/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
npm test
```

Exit status: `1`

## Complete Output

```text

> @guoxiaoshuai2023/oh-my-harness@0.1.0 test
> node --test test/bundle/*.test.mjs test/lifecycle/*.test.mjs

✔ package contract and schema fix the scoped stdlib-only release contract (4.867542ms)
✔ explicit map exactly matches the 42 accepted source and destination pairs (2.336916ms)
✔ reference replacement is one non-cascading source-span pass (0.114708ms)
✖ support README rewrites both bare source paths and resolves them in the generated target (112.816334ms)
✔ removing either bare rewrite authority makes the build fail without output (378.706834ms)
✔ runtime validator independently rejects standalone bare source references (176.2415ms)
✔ runtime validator accepts installed targets that contain source-token substrings (205.003833ms)
✔ slash-terminated source references remain rejected or rewritten (275.91475ms)
✔ two clean builds are byte-for-byte deterministic with a closed inventory (214.020375ms)
✔ negative contract, map, schema, source-reference, and collision fixtures fail precisely (1103.578041ms)
✔ managed block modal downgrade fixture is rejected (48.127208ms)
✔ managed block ledger preserves headings, nine routes, integration clauses, and modal force (127.865167ms)
✔ six-profile normalized ledger preserves distinct missions and evaluator boundaries (229.907291ms)
✔ calibration path and regenerated hash are internally consistent (287.699458ms)
✔ all helpers remain required transformed Python payload with structural-evidence disclaimers (204.637459ms)
✔ runtime reference closure excludes provenance and has no dangling transformed target (253.472583ms)
✔ CLI parser accepts only the exact closed public syntax (125.022791ms)
✔ dry-run prints the canonical plan and never prompts or writes (15.996792ms)
✔ non-TTY requires explicit confirmation after the plan; --yes applies it (517.043166ms)
✔ TTY receives exactly one yes/no prompt and decline does not write (513.362083ms)
✔ --yes cannot bypass damaged markers and --force is a usage failure (5.932166ms)
✔ identical target state produces byte-identical canonical plan envelopes (14.426708ms)
✔ package and lock metadata exactly bind the scoped identity, binary, engine, files, and single validator entry (0.519542ms)
✔ package validator preserves primary child status and cleanup status cannot mask it (116.697ms)
✔ install materializes the complete fixed bundle, preserves binary outer bytes, and writes verified state last (669.827042ms)
✔ same-version install and update are byte-for-byte no-ops including state timestamps (573.56525ms)
✔ clean update enforces replace/remove/create asymmetry and rejects an unowned new collision (871.014166ms)
✔ modified managed content is disclosed, backed up before replacement, and missing historical backup is informational (514.997958ms)
✔ uninstall backs up drift, preserves outer bytes and backup residue, and deletes state last (433.4895ms)
✔ a pre-existing empty AGENTS.md remains target-owned after install and uninstall (361.600042ms)
✔ differing backup collision is a preflight conflict and an identical backup can be safely reused (419.562875ms)
✔ backup is verified before a destructive update write begins (422.609084ms)
▶ sentinel publication faults precede every payload mutation and leave exact incomplete evidence
  ✔ sentinel-parent (12.937792ms)
  ✔ sentinel-temp-write (12.252375ms)
  ✔ sentinel-link (17.121042ms)
  ✔ sentinel-verify (17.485167ms)
  ✔ sentinel-temp-cleanup (17.554583ms)
✔ sentinel publication faults precede every payload mutation and leave exact incomplete evidence (77.865041ms)
▶ payload/state/sentinel faults withhold fresh success state and next invocation stops without repair
  ✔ payload-write (18.1805ms)
  ✔ payload-verify (236.943791ms)
  ✔ state-write (257.457125ms)
  ✔ state-verify (250.71775ms)
  ✔ sentinel-delete (256.054541ms)
✔ payload/state/sentinel faults withhold fresh success state and next invocation stops without repair (1019.844709ms)
▶ post-rename and post-unlink verification failures report completed mutations truthfully
  ✔ post-rename (19.1585ms)
  ✔ post-unlink (269.513875ms)
✔ post-rename and post-unlink verification failures report completed mutations truthfully (288.960458ms)
✔ update restores exact prior state on final sentinel failure; uninstall state-delete failure keeps prior state (614.935875ms)
✔ state restoration failure remains a hard failure with truthful sentinel evidence (310.400458ms)
✔ marker scanner accepts only one byte-exact ordered pair and rejects the full damaged matrix (121.817708ms)
✔ damaged managed markers produce only the terminal primary marker conflict (15.767834ms)
✔ unmanaged namespace and prefixed profile collisions stop with zero writes and no name-based adoption (32.350584ms)
✔ traversal, absolute, empty, NUL, symlink, and special parents stop without outside access (69.905042ms)
✔ state traversal, wrong-target copies, malformed state, and unscoped identity cannot authorize mutation (2317.587667ms)
✔ installed inventory rejects forged in-namespace ownership and state-hash backup bypass (733.71675ms)
✔ final pre-write recheck detects target mutation and creates no sentinel (10.423417ms)
✔ sanitized exact Git overlap ignores target hooks/config/filters and reports only exact planned overlap (115.234167ms)
✔ special unrelated Git objects are observed and stop within the bounded Git discovery surface (103.532208ms)
✔ disclosure, state, reports, and logs are content-safe while backup bytes stay opaque and exact (395.609667ms)
✔ instrumented discovery and writes stay on the exact lifecycle surface and never inspect adjacent target content (337.940916ms)
ℹ tests 60
ℹ suites 0
ℹ pass 59
ℹ fail 1
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 6643.6045

✖ failing tests:

test at test/bundle/compiler.test.mjs:78:1
✖ support README rewrites both bare source paths and resolves them in the generated target (112.816334ms)
  AssertionError [ERR_ASSERTION]: The input did not match the regular expression /^cp -R \.oh-my-harness\/docs\/agent-routing "\$TARGET\/docs\/"$/m. Input:
  
  '# oh-my-harness\n' +
    '\n' +
    '**A portable agent harness for teams that want AI coding agents to move fast without losing scope, safety, or intent.**\n' +
    '\n' +
    'Most agent workflows start simple: one `AGENTS.md`, a few rules, and a lot of trust. Then the repo grows. Rules get long, safety constraints get buried, task plans drift, and "the tests passed" stops being enough evidence that the agent did the right thing.\n' +
    '\n' +
    '`oh-my-harness` gives you a reusable architecture for that next stage: a small repo-level router, adaptive main-thread governance, trigger-based detailed docs, semantic fidelity gates, stable execution boundaries, targeted independent review, and traceability artifacts that make agent work auditable.\n' +
    '\n' +
    '## Why This Exists\n' +
    '\n' +
    'AI agents are good at doing work. They are less reliable when the work depends on:\n' +
    '\n' +
    "- preserving a user's exact intent across multiple steps,\n" +
    '- separating low-risk edits from high-risk operations,\n' +
    '- avoiding accidental scope expansion,\n' +
    '- proving that governance rules were moved, not weakened,\n' +
    '- validating behavior with evidence instead of vague confidence.\n' +
    '\n' +
    '`oh-my-harness` turns those concerns into a practical repo structure that a project can install, adapt, and enforce.\n' +
    '\n' +
    '## What You Get\n' +
    '\n' +
    '- **A compact `AGENTS.md` router** that keeps always-on hard gates and route triggers visible every session.\n' +
    '- **Trigger-based routed docs** so agents read only the rules relevant to the current task.\n' +
    '- **Adaptive governance by default**: the main thread selects the smallest sufficient mix of direct work, reusable capabilities, durable artifacts, and targeted review while preserving every fact-triggered gate.\n' +
    '- **Complete-v2 compatibility without a default pipeline**: planner -> plan evaluator -> solution designer -> solution evaluator -> frozen contract -> executor -> result evaluator -> main-thread review is required when explicitly requested or imposed by stricter downstream policy, and remains available as an evidence-backed deliberate main-thread choice.\n' +
    '- **Semantic fidelity controls** for MEDIUM/HIGH-risk work: Original Request Anchor, Pass A/Pass B, Outcome Contract, semantic diff, and AC-pass-but-user-fail handling.\n' +
    '- **Traceability templates** for source snapshots, coverage manifests, rule preservation ledgers, and routing scenario matrices.\n' +
    '- **Ready-to-use Codex subagent configs** for the six logical harness responsibilities.\n' +
    '- **A non-destructive package lifecycle** for installing, updating, and uninstalling the exact managed surface without adopting files by name.\n' +
    '- **Zero-dependency helper scripts** for extracting `AGENTS.md` source blocks, checking rule-preservation traceability, and running router fixture smoke/coverage checks.\n' +
    '- **Adoption docs** for migrating an existing project into the harness safely.\n' +
    '\n' +
    '## Repository Tour\n' +
    '\n' +
    '| Path | What it contains |\n' +
    '| --- | --- |\n' +
    '| `.codex/agents/` | Optional Codex subagent adapter for the six v2 harness roles. |\n' +
    '| `.oh-my-harness/docs/adapters/config.example.toml` | Optional Codex repo-config example for one-level subagent fan-out. |\n' +
    '| `AGENTS.md` | The generic repo-level router used by agents in this repo. |\n' +
    '| `.oh-my-harness/docs/architecture.md` | High-level explanation of the harness model. |\n' +
    '| `.oh-my-harness/docs/adapters/codex-subagents.md` | How the Codex subagent TOML files map to the generic harness. |\n' +
    '| `.oh-my-harness/docs/agent-routing/` | Detailed route docs for secrets, external systems, high-risk actions, current-state evidence, implementation boundaries, validation, and planning scale. |\n' +
    '| `.oh-my-harness/protocols/adaptive-orchestration-protocol.md` | Normative topology, delegation, packet, boundary, dependency, retry, intervention, synthesis, and independent-verification rules. |\n' +
    '| `.oh-my-harness/protocols/semantic-fidelity-protocol.md` | Semantic risk protocol and v2 loop rules. |\n' +
    '| `.oh-my-harness/protocols/run-directory-protocol.md` | Run directory, accepted contract, evidence, and result QA conventions. |\n' +
    '| `.oh-my-harness/templates/` | Copyable templates for plans, reviews, contracts, reports, ledgers, snapshots, and routing fixtures. |\n' +
    '| `.oh-my-harness/scripts/` | Standard-library Python helpers for snapshot extraction, rule-preservation structural checks, and router fixture smoke/coverage checks. |\n' +
    '| `.oh-my-harness/docs/examples/minimal-router/` | A small downstream example for projects that want the router pattern without the full stack. |\n' +
    '| `.oh-my-harness/docs/adoption/` | Migration guidance and release checks. The universal adoption runbook and bundle lifecycle spec are release-repository-only; they are not installed payload. |\n' +
    '\n' +
    '## Quick Start\n' +
    '\n' +
    'The lifecycle CLI requires Node `>=24 <25` and uses only the Node standard library. Choose an exact package version, then preview and install:\n' +
    '\n' +
    '` ` `sh\n' +
    'npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run\n' +
    'npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>\n' +
    '` ` `\n' +
    '\n' +
    'Use the target release for an update and an installer version compatible with the installed state for uninstall:\n' +
    '\n' +
    '` ` `sh\n' +
    'npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>\n' +
    'npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>\n' +
    '` ` `\n' +
    '\n' +
    'For local acceptance of a packed archive, use the same binary and lifecycle:\n' +
    '\n' +
    '` ` `sh\n' +
    'npx --yes --package=./<packed-archive>.tgz oh-my-harness <operation> --target <repo>\n' +
    '` ` `\n' +
    '\n' +
    'Each mutating command prints its exact plan before applying it. In a TTY it asks once for confirmation; automation must add `--yes` after inspecting the plan. Manual copying, `npx oh-my-harness`, and `--package=oh-my-harness` are not valid managed installation paths.\n' +
    '\n' +
    'The package always installs three required Python 3.11 helpers: `extract_agents_source.py`, `validate_router_fixture.py`, and `validate_rule_preservation.py`. Python is used only when running those helpers; install, update, and uninstall do not require Python.\n' +
    '\n' +
    'Before shrinking an existing `AGENTS.md`, create source traceability artifacts:\n' +
    '\n' +
    '` ` `sh\n' +
    'python3 .oh-my-harness/scripts/extract_agents_source.py AGENTS.md \\\n' +
    '  --snapshot task-docs/agents-source-snapshot.md \\\n' +
    '  --coverage task-docs/agents-source-coverage.md\n' +
    '` ` `\n' +
    '\n' +
    'After you complete the source coverage manifest and rule preservation ledger, run the structural preservation check:\n' +
    '\n' +
    '` ` `sh\n' +
    'python3 .oh-my-harness/scripts/validate_rule_preservation.py \\\n' +
    '  --snapshot task-docs/agents-source-snapshot.md \\\n' +
    '  --coverage task-docs/agents-source-coverage.md \\\n' +
    '  --ledger task-docs/rule-preservation-ledger.md\n' +
    '` ` `\n' +
    '\n' +
    'This helper checks source block coverage, rule-ledger mapping, strong-force preservation, and duplicate coverage evidence. It does not replace semantic equivalence review of the migrated wording.\n' +
    '\n' +
    'After you build a routing scenario fixture, run the smoke/coverage check:\n' +
    '\n' +
    '` ` `sh\n' +
    'python3 .oh-my-harness/scripts/validate_router_fixture.py \\\n' +
    '  --router AGENTS.md \\\n' +
    '  --fixture task-docs/<routing-fixture>.md\n' +
    '` ` `\n' +
    '\n' +
    'This helper checks trigger text, route paths, and optional ledger Rule ID mentions. It is not a semantic equivalence verifier and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.\n' +
    '\n' +
    'For adoption details, use the [router refactor runbook](.oh-my-harness/docs/adoption/router-refactor-runbook.md) and the [open-source release checklist](.oh-my-harness/docs/adoption/open-source-release-checklist.md). Repository maintainers also have the release-only `universal-harness-adoption-runbook.md` and `bundle-lifecycle-spec.md` in the adoption-docs directory; those two files explain the package lifecycle but are intentionally outside the installed bundle.\n' +
    '\n' +
    '## How It Works\n' +
    '\n' +
    '`oh-my-harness` separates three things that often get mixed together:\n' +
    '\n' +
    '1. **Routing**: `AGENTS.md` tells the agent which detailed doc to read for the current trigger.\n' +
    '2. **Execution control**: the main thread chooses and revises an evidence-backed topology; named roles and stages are optional, but triggered safety, semantic, current-state, stable-boundary, validation, and independence gates are mandatory.\n' +
    '3. **Semantic preservation**: high-risk or ambiguous work is checked against the original user intent, not just local acceptance criteria.\n' +
    '\n' +
    'This keeps low-risk work lightweight while giving high-risk work enough structure to prevent drift. Every delegation receives a complete task packet and stable producer-nonmodifiable authority. Nested delegation is prohibited by default, and stage-local, retry-domain cumulative, and artifact-free operational budgets remain finite across renamed roles, tools, or stages.\n' +
    '\n' +
    'The complete v2 sequence is a compatibility composition, not the default meaning of “use the harness.” It MUST run when explicitly requested or required by stricter downstream policy. Without either requirement trigger, the main thread MAY deliberately select it only when a task-specific record identifies concrete facts that make separate planning, plan review, boundary design, boundary review, execution, and result review materially useful; compares a smaller viable topology and its control/evidence/handoff gap; maps non-duplicative value for all six interfaces; binds gate owners, primary evidence, dependencies, handoffs, and decisions; shows positive marginal value despite cost and context; and keeps synthesis, topology revision, intervention, finite retries, evidence arbitration, and final acceptance active. HIGH risk, the harness name, role availability, or process inertia never selects the full sequence by itself, and role PASS labels never replace main-thread judgment.\n' +
    '\n' +
    '## Codex Subagent Adapter\n' +
    '\n' +
    'The repo includes `.codex/agents/oh-my-harness-*.toml` for six reusable capability interfaces:\n' +
    '\n' +
    '- `oh_my_harness_planner`\n' +
    '- `oh_my_harness_plan_evaluator`\n' +
    '- `oh_my_harness_solution_designer`\n' +
    '- `oh_my_harness_solution_evaluator`\n' +
    '- `oh_my_harness_executor`\n' +
    '- `oh_my_harness'... 1767 more characters
  
      at TestContext.<anonymous> (file:///Users/yurendao45/Vibe%20Coding%20Projects/oh-my-harness-universal-adoption/test/bundle/compiler.test.mjs:82:10)
      at async Test.run (node:internal/test_runner/test:1125:7)
      at async Test.processPendingSubtests (node:internal/test_runner/test:787:7) {
    generatedMessage: true,
    code: 'ERR_ASSERTION',
    actual: '# oh-my-harness\n\n**A portable agent harness for teams that want AI coding agents to move fast without losing scope, safety, or intent.**\n\nMost agent workflows start simple: one `AGENTS.md`, a few rules, and a lot of trust. Then the repo grows. Rules get long, safety constraints get buried, task plans drift, and "the tests passed" stops being enough evidence that the agent did the right thing.\n\n`oh-my-harness` gives you a reusable architecture for that next stage: a small repo-level router, adaptive main-thread governance, trigger-based detailed docs, semantic fidelity gates, stable execution boundaries, targeted independent review, and traceability artifacts that make agent work auditable.\n\n## Why This Exists\n\nAI agents are good at doing work. They are less reliable when the work depends on:\n\n- preserving a user\'s exact intent across multiple steps,\n- separating low-risk edits from high-risk operations,\n- avoiding accidental scope expansion,\n- proving that governance rules were moved, not weakened,\n- validating behavior with evidence instead of vague confidence.\n\n`oh-my-harness` turns those concerns into a practical repo structure that a project can install, adapt, and enforce.\n\n## What You Get\n\n- **A compact `AGENTS.md` router** that keeps always-on hard gates and route triggers visible every session.\n- **Trigger-based routed docs** so agents read only the rules relevant to the current task.\n- **Adaptive governance by default**: the main thread selects the smallest sufficient mix of direct work, reusable capabilities, durable artifacts, and targeted review while preserving every fact-triggered gate.\n- **Complete-v2 compatibility without a default pipeline**: planner -> plan evaluator -> solution designer -> solution evaluator -> frozen contract -> executor -> result evaluator -> main-thread review is required when explicitly requested or imposed by stricter downstream policy, and remains available as an evidence-backed deliberate main-thread choice.\n- **Semantic fidelity controls** for MEDIUM/HIGH-risk work: Original Request Anchor, Pass A/Pass B, Outcome Contract, semantic diff, and AC-pass-but-user-fail handling.\n- **Traceability templates** for source snapshots, coverage manifests, rule preservation ledgers, and routing scenario matrices.\n- **Ready-to-use Codex subagent configs** for the six logical harness responsibilities.\n- **A non-destructive package lifecycle** for installing, updating, and uninstalling the exact managed surface without adopting files by name.\n- **Zero-dependency helper scripts** for extracting `AGENTS.md` source blocks, checking rule-preservation traceability, and running router fixture smoke/coverage checks.\n- **Adoption docs** for migrating an existing project into the harness safely.\n\n## Repository Tour\n\n| Path | What it contains |\n| --- | --- |\n| `.codex/agents/` | Optional Codex subagent adapter for the six v2 harness roles. |\n| `.oh-my-harness/docs/adapters/config.example.toml` | Optional Codex repo-config example for one-level subagent fan-out. |\n| `AGENTS.md` | The generic repo-level router used by agents in this repo. |\n| `.oh-my-harness/docs/architecture.md` | High-level explanation of the harness model. |\n| `.oh-my-harness/docs/adapters/codex-subagents.md` | How the Codex subagent TOML files map to the generic harness. |\n| `.oh-my-harness/docs/agent-routing/` | Detailed route docs for secrets, external systems, high-risk actions, current-state evidence, implementation boundaries, validation, and planning scale. |\n| `.oh-my-harness/protocols/adaptive-orchestration-protocol.md` | Normative topology, delegation, packet, boundary, dependency, retry, intervention, synthesis, and independent-verification rules. |\n| `.oh-my-harness/protocols/semantic-fidelity-protocol.md` | Semantic risk protocol and v2 loop rules. |\n| `.oh-my-harness/protocols/run-directory-protocol.md` | Run directory, accepted contract, evidence, and result QA conventions. |\n| `.oh-my-harness/templates/` | Copyable templates for plans, reviews, contracts, reports, ledgers, snapshots, and routing fixtures. |\n| `.oh-my-harness/scripts/` | Standard-library Python helpers for snapshot extraction, rule-preservation structural checks, and router fixture smoke/coverage checks. |\n| `.oh-my-harness/docs/examples/minimal-router/` | A small downstream example for projects that want the router pattern without the full stack. |\n| `.oh-my-harness/docs/adoption/` | Migration guidance and release checks. The universal adoption runbook and bundle lifecycle spec are release-repository-only; they are not installed payload. |\n\n## Quick Start\n\nThe lifecycle CLI requires Node `>=24 <25` and uses only the Node standard library. Choose an exact package version, then preview and install:\n\n` ` `sh\nnpx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run\nnpx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>\n` ` `\n\nUse the target release for an update and an installer version compatible with the installed state for uninstall:\n\n` ` `sh\nnpx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>\nnpx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>\n` ` `\n\nFor local acceptance of a packed archive, use the same binary and lifecycle:\n\n` ` `sh\nnpx --yes --package=./<packed-archive>.tgz oh-my-harness <operation> --target <repo>\n` ` `\n\nEach mutating command prints its exact plan before applying it. In a TTY it asks once for confirmation; automation must add `--yes` after inspecting the plan. Manual copying, `npx oh-my-harness`, and `--package=oh-my-harness` are not valid managed installation paths.\n\nThe package always installs three required Python 3.11 helpers: `extract_agents_source.py`, `validate_router_fixture.py`, and `validate_rule_preservation.py`. Python is used only when running those helpers; install, update, and uninstall do not require Python.\n\nBefore shrinking an existing `AGENTS.md`, create source traceability artifacts:\n\n` ` `sh\npython3 .oh-my-harness/scripts/extract_agents_source.py AGENTS.md \\\n  --snapshot task-docs/agents-source-snapshot.md \\\n  --coverage task-docs/agents-source-coverage.md\n` ` `\n\nAfter you complete the source coverage manifest and rule preservation ledger, run the structural preservation check:\n\n` ` `sh\npython3 .oh-my-harness/scripts/validate_rule_preservation.py \\\n  --snapshot task-docs/agents-source-snapshot.md \\\n  --coverage task-docs/agents-source-coverage.md \\\n  --ledger task-docs/rule-preservation-ledger.md\n` ` `\n\nThis helper checks source block coverage, rule-ledger mapping, strong-force preservation, and duplicate coverage evidence. It does not replace semantic equivalence review of the migrated wording.\n\nAfter you build a routing scenario fixture, run the smoke/coverage check:\n\n` ` `sh\npython3 .oh-my-harness/scripts/validate_router_fixture.py \\\n  --router AGENTS.md \\\n  --fixture task-docs/<routing-fixture>.md\n` ` `\n\nThis helper checks trigger text, route paths, and optional ledger Rule ID mentions. It is not a semantic equivalence verifier and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.\n\nFor adoption details, use the [router refactor runbook](.oh-my-harness/docs/adoption/router-refactor-runbook.md) and the [open-source release checklist](.oh-my-harness/docs/adoption/open-source-release-checklist.md). Repository maintainers also have the release-only `universal-harness-adoption-runbook.md` and `bundle-lifecycle-spec.md` in the adoption-docs directory; those two files explain the package lifecycle but are intentionally outside the installed bundle.\n\n## How It Works\n\n`oh-my-harness` separates three things that often get mixed together:\n\n1. **Routing**: `AGENTS.md` tells the agent which detailed doc to read for the current trigger.\n2. **Execution control**: the main thread chooses and revises an evidence-backed topology; named roles and stages are optional, but triggered safety, semantic, current-state, stable-boundary, validation, and independence gates are mandatory.\n3. **Semantic preservation**: high-risk or ambiguous work is checked against the original user intent, not just local acceptance criteria.\n\nThis keeps low-risk work lightweight while giving high-risk work enough structure to prevent drift. Every delegation receives a complete task packet and stable producer-nonmodifiable authority. Nested delegation is prohibited by default, and stage-local, retry-domain cumulative, and artifact-free operational budgets remain finite across renamed roles, tools, or stages.\n\nThe complete v2 sequence is a compatibility composition, not the default meaning of “use the harness.” It MUST run when explicitly requested or required by stricter downstream policy. Without either requirement trigger, the main thread MAY deliberately select it only when a task-specific record identifies concrete facts that make separate planning, plan review, boundary design, boundary review, execution, and result review materially useful; compares a smaller viable topology and its control/evidence/handoff gap; maps non-duplicative value for all six interfaces; binds gate owners, primary evidence, dependencies, handoffs, and decisions; shows positive marginal value despite cost and context; and keeps synthesis, topology revision, intervention, finite retries, evidence arbitration, and final acceptance active. HIGH risk, the harness name, role availability, or process inertia never selects the full sequence by itself, and role PASS labels never replace main-thread judgment.\n\n## Codex Subagent Adapter\n\nThe repo includes `.codex/agents/oh-my-harness-*.toml` for six reusable capability interfaces:\n\n- `oh_my_harness_planner`\n- `oh_my_harness_plan_evaluator`\n- `oh_my_harness_solution_designer`\n- `oh_my_harness_solution_evaluator`\n- `oh_my_harness_executor`\n- `oh_my_harness'... 1767 more characters,
    expected: /^cp -R \.oh-my-harness\/docs\/agent-routing "\$TARGET\/docs\/"$/m,
    operator: 'match',
    diff: 'simple'
  }

```
