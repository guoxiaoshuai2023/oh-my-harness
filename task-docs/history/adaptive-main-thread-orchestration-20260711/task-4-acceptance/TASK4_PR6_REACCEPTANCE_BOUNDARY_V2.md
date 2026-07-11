# Task 4 PR #6 Reacceptance Boundary v2 Addendum

Identity: `adaptive-main-thread-orchestration-task-4-pr6-reacceptance-boundary-20260712-v2`

State: `CANDIDATE COMPOSITE BOUNDARY - REQUIRES STRICT READ-ONLY REVIEW`

This addendum incorporates v1 SHA `45ebbf96cb3c65431af380c5da02bc210f0a0f970a43be9b5dc13279ce261c4a` except where expanded below. It resolves review v1 by freezing routes/calibration, evidence mappings, exact validators, accepted hashes, and a mandatory launch-baseline protocol. One-file implementation scope is unchanged.

## Frozen Calibration And Route Binding

| Authority | Path | SHA-256 |
| --- | --- | --- |
| Repo router | `AGENTS.md` | `e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d` |
| Adaptive orchestration | `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` |
| Current-state evidence | `docs/agent-routing/current-state-evidence.md` | `8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364` |
| Planning scale | `docs/agent-routing/task-planning-scale.md` | `29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c` |
| Implementation boundary | `docs/agent-routing/implementation-boundary.md` | `d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8` |
| Validation/reporting | `docs/agent-routing/validation-and-reporting.md` | `6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b` |
| Semantic fidelity | `task-docs/_harness/semantic-fidelity-protocol.md` | `c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4` |
| Run-directory state | `task-docs/_harness/run-directory-protocol.md` | `63c9d2e7146f899889f06de72f7e5cc321f0710614cd6528dbb779b040b89f7c` |
| Codex adapter | `docs/adapters/codex-subagents.md` | `a4ac4f47a02cf25c855dc2b85115596763d2584d72deddfd12261fa692d40615` |
| Canonical evaluator calibration | `task-docs/_harness/evaluator-calibration.md` | `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06` |

Every producer/reviewer packet must explicitly bind these triggered routes and the canonical calibration identity/path. Missing, mismatched, unreadable, ambiguous, discoverability-only, or unproved binding is a STOP. Evaluators consult calibration before verdict and return the consulted path plus relevant case IDs or post-consultation `N/A`.

External/high-impact routes are not triggered because this task permits no external, secret, publish, delete, migration, permission, payment, key, deployment, or irreversible action. Discovery of one is a STOP.

## Accepted Implementation And Evidence Hashes

Revised seven-file implementation chain:

| Path | Accepted SHA-256 |
| --- | --- |
| `task-docs/_harness/templates/task-packet-template.md` | `036b7da81995cd999a6d06589cd279d6fc20a052782fa495e772986cf2a4c2b4` |
| `task-docs/_harness/templates/orchestration-prompt-template.md` | `24f782c5811c42ac5cee98b377e8a45cc4814db5726cb19c5201fd1baec144ab` |
| `task-docs/_harness/templates/plan-review-template.md` | `158e627a8b388a470783e92cb9d08224e82441787c1b424c75ba8a5ad5c1b5ab` |
| `task-docs/_harness/templates/result-qa-template.md` | `c463a41b38e11b046e8529698add887f70ad060ac91fa6ae21aaf5d66463b8a8` |
| `.codex/agents/harness-plan-evaluator.toml` | `c8f3a0a9312a44d4cf31db5f67218fdd1bae2c55acb1dac84a88c6d6a84fba7b` |
| `.codex/agents/harness-solution-evaluator.toml` | `d71a60a53e32a56d53c6e302c3d4ac9bc8a2a33205c1d4bc1b0c4cc5da19c6d5` |
| `.codex/agents/harness-result-evaluator.toml` | `5d70ba852c7135c94fb6007340b40589a71013223fc9258f81676783f9e770ec` |

Revised accepted gate evidence:

| Artifact | SHA-256 |
| --- | --- |
| Task 2 Implementation Report v2 | `34cb082d7965348111fba8e38ee796226c044aaede8c316f00b58a317eb52cb3` |
| Task 2 Result QA v2 | `b910faa3ed6e8aca348890bfdc255eef4457251f3a0db7cc5a4e8786c01cb60e` |
| Task 2 main-thread acceptance v2 | `922e4fc6d93f4eb6393010bcfaad6f6ab20c34ee47d7c6a3094ca103771d130b` |
| Task 3 Implementation Report v1 | `6b043d7ee4ed9d1b3d3f611b873054da7dc288db94333ea82c0968ea6ae1b661` |
| Task 3 Result QA v1 | `9838fc822cd50df1796f84a71d66d8f48fb21316101ea1bd2cb395cd96fe77fc` |
| Task 3 main-thread acceptance v1 | `eee8a274357405954cca19c365d5c333234160bf31ca068049d331fb4288176b` |

Unchanged Task 4 protected implementation baseline:

| Path | SHA-256 |
| --- | --- |
| `task-docs/_harness/templates/routing-scenario-matrix-template.md` | `8b4a374b3c20115ce2abf5203685dd9367331319c511c51262406340ac48d080` |
| `README.md` | `ad0e4b2bfbd33d6a16ee37c0d1a91e1582ad255634cb583c358a416199190705` |
| `docs/architecture.md` | `7fa1c00d3537cd6594547707513929292d0230f4b1f7a1903bd585b442c46d9f` |
| `docs/adoption/router-refactor-runbook.md` | `70aa603b0c875e63ae8149ff7e4d18cb36e98a604af24fb77024e07cccc98f41` |
| `examples/minimal-router/AGENTS.md` | `8e60a062235c755f6892f200de3aba6c148b5ab48f5ae61e7bf4a98ac46ac21e` |
| `task-docs/_harness/evaluator-calibration.md` | `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06` |

Historical Task 4 evidence remains immutable: v7 contract `895fc3c33bbb881d976b49c93678acc095a81067285871e7fb2670c7ab91a82d`, v7 review `83923a74d2d19bf3153e8f428395f93864c7ba978ffbffc7f4301cab88bfe06b`, v7 manifest `cd3be6ccf4a745bf97a63e99665a512fe53ce90c424c46ff1f6ab9dc1a1b85d9`, verification-resume boundary `91e938597b97f6bb5323e142e18c81fc55a9920b97e644da1ccc87773235c78d`, implementation report v2 `189f367a9f15bc30045c19d36d9128e722e916db6c86e564c304a130702291df`, QA v3 `5643130053a2aea06462b44ebdcb4dd3350bfb144ab4e786ddce6387dc8cfb12`, and superseded acceptance v2 `28da2fb25f46638610235d8788a18fc71c9c8e9e50e8aa02b5fc8008c40d03d2`.

## Mandatory Launch Baseline

Before producer launch, the main thread must create and freeze:

- path: `task-docs/history/adaptive-main-thread-orchestration-20260711/task-4-acceptance/TASK4_PR6_REACCEPTANCE_LAUNCH_BASELINE_V1.md`;
- identity: `adaptive-main-thread-orchestration-task-4-pr6-reacceptance-launch-baseline-20260712-v1`.

It must record branch, HEAD, `origin/main`, merge base, HEAD tree, complete status, staged and committed deltas, all untracked path hashes, all seven revised implementation hashes, all six revised accepted gate hashes, all unchanged Task 4 protected hashes, route/calibration hashes, matrix before hash, every dirty-path attribution, no-active-writer assertion, and the expected one-file Task 4 delta. The baseline file is the sole expected post-snapshot addition. Its final SHA must be externally supplied in the immutable producer packet.

Producer and QA must verify the baseline's final SHA and inventory before/after. Any mismatch or unexplained path is STOP without repair.

## AC-To-Primary-Evidence Map

| AC | Required primary evidence | Exact check |
| --- | --- | --- |
| T4R-AC1 / T4-AC1 | Matrix row parse plus manual semantic review of every row | Python structural check below; reviewer records AS-01..31 decisions/failure signals. |
| T4-AC1A | Actual RSM-005 text, router path, and smoke output | `python3.11 scripts/validate_router_fixture.py --router AGENTS.md --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md`; label smoke/coverage only, then manually verify adaptive route semantics. |
| T4R-AC2 / T4-AC9 | Actual six CC rows, complete packet/handoff sections, revised Task 2/3 bytes | Six-case manual composition ledger with each evaluator calibration binding and outcome. |
| T4R-AC3 | Actual AS-19 hashes and full three evaluator profile bytes | Exact SHA comparison plus per-role permission/independence/evidence/stop/mission ledger. |
| T4R-AC4 | Packet/profile text and negative walkthroughs | Missing/ambiguous/unreadable/non-packet binding, fallback, no-consultation N/A, and missing-primary-evidence cases each STOP/FAIL. |
| T4R-AC5 / T4-AC3..6 | Matrix plus README/architecture/runbook/example/protocol/template authority text | Three-state terminology/modal-force table across all affected surfaces; no implementation write outside matrix. |
| T4R-AC6 / T4-AC7 | CC-NEGATIVE and semantic protocol | Manual AC-pass-but-user-fail walkthrough proves structural/calibration PASS cannot replace producer-independent semantic review. |
| T4R-AC7 / T4-AC2 | Calibration source bytes and inventory | Verify SHA and CAL-ADAPT-001..010 exact ordered headings; consult relevant cases without editing. |
| T4R-AC8 / T4-AC8 | Complete Git/status/hash inventory | Launch baseline pre/post comparison, exact one-file Task 4 attribution, empty index, no seventh agent/dependency/release change. |
| T4R-AC9 / T4-AC1..10 | Requirements/plan/actual public surfaces and all scenario evidence | Whole-system semantic comparison; structural commands are supporting evidence only. |
| T4R-AC10 / T4-AC10 | Impact analysis, revised upstream acceptance, old/new Task 4 evidence | Supersession/no-impact/dependency map and fresh independent QA/main-thread decisions. |

## Exact Structural Commands

The producer and QA run these exact commands or byte-equivalent read-only checks:

```sh
python3.11 scripts/validate_router_fixture.py \
  --router AGENTS.md \
  --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md

python3.11 - <<'PY'
from pathlib import Path
import re
import tomllib

matrix = Path("task-docs/_harness/adaptive-orchestration-acceptance-matrix.md").read_text()
as_ids = re.findall(r"^\| (AS-\d{2}) \|", matrix, re.MULTILINE)
assert as_ids == [f"AS-{n:02d}" for n in range(1, 32)]
assert "AS-32" not in matrix
cc_ids = re.findall(r"^\| (CC-[A-Z0-9-]+) \|", matrix, re.MULTILINE)
assert cc_ids == [
    "CC-LOW", "CC-MEDIUM", "CC-HIGH", "CC-FULL-V2",
    "CC-NEGATIVE", "CC-DELIBERATE-FULL-V2",
]
for path in sorted(Path(".codex/agents").glob("*.toml")):
    with path.open("rb") as handle:
        data = tomllib.load(handle)
    if "evaluator" in path.name:
        assert data["sandbox_mode"] == "read-only"
print("structural matrix/profile checks passed; not semantic proof")
PY

git diff --check
```

Also compile every `scripts/*.py` source in memory without writing bytecode, compare exact before/after hashes, and run the full current `.github/workflows/ci.yml` command set before delivery. No new validator is authorized.

## Reporting And Review

Implementation Report must map T4R-AC1..10 and T4-AC1, T4-AC1A, T4-AC2..10 to primary evidence; include 31 AS semantic decisions, six CC decisions, CAL-ADAPT-001..10, modal-force table, route/calibration returns, protected inventories, exact commands/output, unchanged areas, and non-actions.

Fresh producer-independent Result QA must inspect actual file bytes and rerun the complete evidence map. Structural PASS alone is insufficient. Main-thread acceptance remains separate.

All v1 stop conditions remain. No producer launch occurs until the v1/v2 composite receives strict independent PASS and the launch baseline is frozen.
