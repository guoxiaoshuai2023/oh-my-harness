# Task 3 Contract State Baseline

Identity: `universal-harness-adoption-task-3-contract-state-baseline-20260713-v1`

Status: `FROZEN`

## Git State

- Worktree: `/Users/yurendao45/Vibe Coding Projects/oh-my-harness-universal-adoption`
- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- `origin/main`: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked working-tree delta: empty.
- Staged delta: empty.
- Committed branch delta against `origin/main`: empty.

## Accepted Dependencies

- Task 1 accepted evidence chain: `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c`.
- Task 2 accepted evidence chain: `1e31a265e3692fd5e275e818850318de67e070da560b6a6a05060ca7dd59f448`.
- All 12 Task 1 implementation hashes and all 14 Task 2 implementation hashes were recomputed and matched before this baseline.
- Original Task 2 dirty baseline: all 85 rows were already verified at Task 2 final acceptance and remain protected.

## Task 3 Documentation Before State

| Path | Before state |
| --- | --- |
| `README.md` | SHA-256 `ad0e4b2bfbd33d6a16ee37c0d1a91e1582ad255634cb583c358a416199190705` |
| `docs/architecture.md` | SHA-256 `7fa1c00d3537cd6594547707513929292d0230f4b1f7a1903bd585b442c46d9f` |
| `docs/adapters/codex-subagents.md` | SHA-256 `a4ac4f47a02cf25c855dc2b85115596763d2584d72deddfd12261fa692d40615` |
| `docs/adoption/universal-harness-adoption-runbook.md` | absent |
| `docs/adoption/bundle-lifecycle-spec.md` | absent |

## Protected Authority Before Hashes

| Path | SHA-256 |
| --- | --- |
| `AGENTS.md` | `e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d` |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` |
| `task-docs/_harness/semantic-fidelity-protocol.md` | `c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4` |
| `task-docs/_harness/evaluator-calibration.md` | `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06` |
| `.codex/agents/harness-executor.toml` | `c981644f5d6da31a623170653fcc9b9c84959062203f6347c86ca34d5722c5e7` |
| `.codex/agents/harness-plan-evaluator.toml` | `c8f3a0a9312a44d4cf31db5f67218fdd1bae2c55acb1dac84a88c6d6a84fba7b` |
| `.codex/agents/harness-planner.toml` | `dfba74e1660c1bfe79251393993cae57ae2c7e57fabd1521d346e7789c576265` |
| `.codex/agents/harness-result-evaluator.toml` | `5d70ba852c7135c94fb6007340b40589a71013223fc9258f81676783f9e770ec` |
| `.codex/agents/harness-solution-designer.toml` | `f772d114f7c6c19fe79c76af1b10ef05f152dbb6349625902c5c694247c27c3b` |
| `.codex/agents/harness-solution-evaluator.toml` | `d71a60a53e32a56d53c6e302c3d4ac9bc8a2a33205c1d4bc1b0c4cc5da19c6d5` |
| `docs/adoption/open-source-release-checklist.md` | `c214d3c44838d53aabfb363a7c37813b95e810411d7f21d515dd3aaab53659f7` |
| `docs/adoption/router-refactor-runbook.md` | `70aa603b0c875e63ae8149ff7e4d18cb36e98a604af24fb77024e07cccc98f41` |

Task 1/2 implementation paths and accepted evidence are protected by their frozen chains, not duplicated here.

## Existing Untracked Protection

Before creation of this baseline, the repository had 132 known project-source, test, planning, history, or handoff files outside the Task 3 run directory. A canonical sorted manifest of `SHA-256 + two spaces + relative path + LF` for those files had SHA-256:

`4516a778a0cddfa012d201fbad66ca6c877b1376b91030cd106bf151de2c0f0a`

Those 132 files are read-only. Task 3 may add gate artifacts only inside this run directory and may modify/create only the five exact documentation paths listed above. Any other changed or unexplained path stops execution or acceptance.
