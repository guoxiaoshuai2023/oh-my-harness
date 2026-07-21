# oh-my-harness

[English](https://github.com/guoxiaoshuai2023/oh-my-harness) | [简体中文](https://github.com/guoxiaoshuai2023/oh-my-harness/blob/main/README.zh-CN.md)

**一套面向真实代码库的仓库级治理系统，适合让 AI 编码 agent 参与开发的团队。它让意图保持明确、让副作用受到约束，并让验收建立在证据上，同时不会把每个任务都变成沉重的多 agent 流水线。**

AI 编码 agent 会在信息不完整、推理不确定的情况下作出决定，并把决定应用到一个具有真实副作用的共享系统。Prompt 可以告诉 agent 你想要什么，但仅靠 prompt 无法让意图在长任务中始终稳定，也无法控制每次写入、分离生产与评估，或证明最终交付的行为就是你要求的行为。

`oh-my-harness` 把这些控制放进 repository，让它们能够跨越模型上下文、任务交接和工具变化持续生效。它适合那些已经不再把 agent 只用于一次性实验，而是让它们修改他人所依赖代码的团队。

## 你可能已经遇到这些问题

- `AGENTS.md` 越写越长，agent 却仍然漏掉最关键的那条规则。
- agent 完成了要求的文件，却解决了一个与用户真实意图略有不同的问题。
- tests 全绿，交付的却是 proxy result：schema 存在、command 成功退出或 count 对得上，但真实 workflow 仍然失败。
- 固定的多 agent pipeline 重复劳动、模糊 ownership，或者为简单任务引入了超出需要的协调成本。
- 当有人问“agent 为什么认为工作已经完成？”时，团队无法指出稳定的意图、明确的边界和 primary evidence。

增加 prompt 文本不能消除这些失败模式。增加 agent 可以带来更多判断能力，也会增加交接、authority 重叠和协调成本。真正缺少的是治理层：一种持久的方法，用来决定什么可以发生、谁可以作决定、哪些内容必须保持不动，以及什么证据才足够。

## 安装后有什么不同

| 之前 | 使用 `oh-my-harness` 之后 |
| --- | --- |
| 重要意图主要存在于聊天记录或模型记忆中。 | 当任务需要时，关键意图会绑定到稳定的 repository artifacts。 |
| 每个任务要么缺少过程，要么都套用同一套大型 workflow。 | Task facts 选择最小但足够的控制深度；简单任务仍然简单。 |
| “完成”可能只意味着文件存在或 tests 通过。 | 验收以可观察行为和 primary evidence 闭合；结构检查仍只是辅助证据。 |
| producer 可以自行评价自己的工作。 | 当独立性重要时，单独的 evaluator 检查实际结果并给出严格 `PASS` 或 `FAIL`；最终仍由 main 决定是否接受。 |
| agent roles 可能互相启动，责任边界逐渐模糊。 | 只有 main thread 可以启动工作、控制边界与 transition、处理 findings。每个可选 capability 都是 hard no-fan-out。 |
| installer 根据熟悉的文件名推断 ownership。 | installer 只修改 inventory 和 installation state 能证明由它拥有的精确 surface；发生 conflict 或 drift 时停止。 |

这不会让 agent 变得永不出错或完全自主。它让 agent 的运行前提、权限、证据和停止条件都可以被检查。

## 快速开始

> **当前发布状态：** npm package 尚未发布。试用当前实现的受支持方式，是在本地打包这个 repository，并从生成的 archive 运行 CLI。

你需要 Node.js 24（`>=24 <25`）。只有在运行这三个 validation helpers 时才需要 Python 3.11。三个 helpers 都会作为 required payload 安装，但运行 `install`、`update` 或 `uninstall` 不需要 Python。

在本 repository 的 checkout 中运行：

```sh
package_dir="$(mktemp -d)"
package_file="$(npm pack --pack-destination "$package_dir" --silent)"
package_path="$package_dir/$package_file"

npx --yes --package="$package_path" oh-my-harness install --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness install --target <repo>
```

先使用 `--dry-run`。它会打印精确 plan，并且不执行任何 mutation。交互式写操作会请求一次确认；非交互自动化必须先检查 plan，再明确添加 `--yes`。

安装过程会在 target repository 根目录的 `AGENTS.md` 中加入一个 managed block，在 `.oh-my-harness/` 下安装固定 Harness payload，并在 `.codex/agents/` 下加入九个可选 Codex capability profiles。它不会替换 `AGENTS.md` 的其余部分，也不会移除 repository 现有的 agents、skills、plugins、scripts、CI 或 domain rules。

本地测试后请移除 `package_dir`。本地打包和安装不代表 npm publication，也不构成 release authorization。

## 在真实工作中如何使用

你仍然像以前一样，向编码 agent 提出想要的结果。Harness 改变的是 agent 如何判断这个请求需要多深的控制和怎样的证据。

### 示例 1：低风险局部修改

**你的请求：**“修复这个 README 中的失效链接，并确认它能够解析。”

**Harness 的响应：** main thread 可以使用 lightweight path：检查相关文件、设置一个窄边界、直接完成修改，并运行与改动相称的链接检查。仅仅因为安装了 Harness，并不要求调用 capability 或创建持久 Run tree。

**你得到的结果：** 聚焦的 diff、对受影响链接的直接检查，以及明确说明哪些内容已验证、哪些没有验证。

### 示例 2：跨模块功能或复杂 bug

**你的请求：**“修复 API 与 storage layers 之间的 stale cache invalidation，同时不改变无关行为。”

**Harness 的响应：** Main 记录真实结果、non-goals、dependencies、protected state 和 failure signals。它只选择事实证明有必要的 planning、design、execution 和 independent-review capabilities，为每个 producer 提供稳定的写入边界，并把 transition authority 保留在 main。

**你得到的结果：** 围绕可观察行为而非 modules 组织的结果、来自受影响 runtime path 的证据、能够区分失败的 negative checks，以及在风险需要时可用的独立 finding 路径。

### 示例 3：migration 或安全敏感任务

**你的请求：**“把 production data 迁移到新 schema”，或“修改 authentication boundary”。

**Harness 的响应：** high-impact 和 external-system gates 会被触发。agent 必须确认精确 target 与 effect、检查 current state、保护 secrets、在可用时生成 plan 或 dry-run、为真实写操作取得明确 authority，并独立验证适用的结果和安全证据。缺少 authority、ownership 含糊、permission expansion 或证据冲突都会停止任务，把决定交还给你。

**你得到的结果：** 要么是在明确授权和边界内执行并附带证据的动作，要么是在不安全写入前诚实停止——而不是藏在成功 command 后面的自动 migration。

Harness 不会自动执行真实 consumer migration、发布 package、部署 service、promote central case，或重写自身的 governance rules。

## 为什么这个模型有效

实现从一个起点事实出发：

> AI 编码 agent 是一个不确定的决策者，它正在对具有真实副作用的共享系统采取行动。

由此得到的 control model 是一条因果链，而不是一组 workflow 仪式：

1. **意图不能只存在于模型记忆中。** 关键 goals、non-goals 和 decisions 需要当前上下文之外的稳定 authority。工作需要时，Harness 可以绑定 original requests、requirements、outcomes 和 current task truth。
2. **每个动作都需要边界。** Task 必须明确允许的 result、writes、protected state、dependencies、stop conditions 和 evidence。Producer 不能自行扩大边界。
3. **代码和 tests 不能单独定义正确性。** 验收必须以用户真正需要的行为闭合。Files、schemas、counts 和 green commands 可以支持判断，但不能替代真实结果。
4. **evaluation 必须能够反对 production。** Producer 创建 candidates；独立 evaluator 检查 primary evidence，并写入自己的 reports。Main 验证 identity 和 scope、disposition findings，并且只有 main 可以接受工作或推动 transition。
5. **更多 agent 不会自动带来更好结果。** Capability 同时增加判断能力和协调成本。Topology 根据 task facts 重新计算，可以是 main 直接工作，也可以是九个可选 capability 的任意子集。不存在固定 pipeline 或 automatic all-nine path。
6. **工具只能修改能够证明由自己拥有的内容。** Installer 使用 immutable bundle inventory 和已验证的 target state。未知内容、marker 损坏、ownership drift 或 unsafe paths 会导致停止，而不是尝试 best-effort merge。

Original Request Anchor、Pass A/Pass B、Outcome Contract、stable Boundary、Result QA 和 ownership state 等命名机制，是这些原则的具体实现。它们是按条件触发的控制，不是用户价值本身。

## 为什么可以放心安装

| 问题 | 当前行为 |
| --- | --- |
| **它会覆盖我现有的 `AGENTS.md` 吗？** | 不会。Install 只追加一个由 marker 分隔的 managed block。Update 只替换这个已拥有的 interval。Uninstall 只移除这个 interval，并保留精确的 outer bytes。Marker 损坏或含糊时，操作会停止。 |
| **它会移除现有 agents、skills、plugins、CI 或 rules 吗？** | 不会。这些 surfaces 仍归 target 所有。validated ownership 之外发生 destination collision 或 exact Git overlap 时，会在 mutation 前停止。 |
| **每个任务都必须使用全部九个 capabilities 吗？** | 不需要。任何基于事实的子集都有效，包括 main 直接工作、一个 capability、混合子集或全部九个。即使省略某个命名 capability，已触发的 gates 仍然是强制的。 |
| **遇到 ownership conflict 或 drift 会怎样？** | Plan 会报告 conflict，并且不应用。Managed content 被修改或缺失、state 不兼容、destination 无主、marker 损坏、path 不安全或 target 发生变化，都会触发停止。 |
| **update 和 uninstall 如何限制范围？** | 它们要求 validated installation state 与 installed inventory 一致。干净 update 会在破坏性 payload 工作前创建并验证 deterministic backups。Uninstall 会移除 state 证明属于当前的 files 和 managed block，之后只移除已记录、由 Harness 创建且仍为空的父目录。它会保留既有、未记录或非空的 target directories 和 content；backups 仍归 target 所有，并且 state 最后删除。 |
| **它会静默接管旧 installation 吗？** | 不会。只有 `update` 能识别一个精确的历史 six-profile/42-entry owned release，并把它转换成当前 nine-profile/49-entry release。不存在通用 adoption 或 migration mode。 |
| **它是否与 vendor 或 runtime 无关？** | governance architecture 是可移植的，但当前 installer MVP 是 Codex repo-local、single-runtime。其他 runtime 需要自己的 adapter 和 installation path。 |

Installer 会检查 repository containment、normalized paths、symlinks、special files、exact Git overlap 和最终 pre-write fingerprint。这些控制降低了意外写入风险，但并不声称能够原子性防护特权并发进程在 filesystem operation 前一刻替换已经检查过的 path。

## 适合谁，又不适合谁

以下情况适合使用 `oh-my-harness`：

- AI agent 修改的是真实共享 repository，而不是一次性示例；
- repository rules 已经超出单个可读 `AGENTS.md` 能承载的范围；
- 工作跨越多个步骤或 modules，意图漂移代价很高；
- safety、review independence、recovery 或 auditability 很重要；
- 你希望简单修改保持轻量，同时让复杂工作得到更强控制。

它目前不是：

- fully autonomous software-delivery system；
- 每次都启动固定 agent team 的 scheduler；
- 对 tests 或 review 能证明所有真实结果的保证；
- global 或 multi-runtime installer；
- arbitrary configuration merger 或 general migration framework；
- publish、deploy、执行真实 consumer migration、访问 secrets 或写入 external systems 的授权。

如果你只需要一个小型 routing pattern，请在采用完整 stack 前查看 [`examples/minimal-router/`](https://github.com/guoxiaoshuai2023/oh-my-harness/tree/main/examples%2Fminimal-router)。

## 技术参考

### Control model

`AGENTS.md` 是一个紧凑的 repository router。它让始终生效的 hard gates 保持可见，并且只在触发条件适用时把 agent 路由到详细文档。Main thread 记录 task facts、选择 capabilities、签发 stable boundaries、验证 artifacts 与 write scope、控制 retries 和 transitions，并作出 final acceptance decisions。

正式 producer/evaluator 工作遵循以下 ownership sequence：

```text
main issues a bounded producer packet
→ producer creates a candidate and evidence
→ main verifies candidate identity, hash, and write scope
→ main launches an independent evaluator against that exact candidate
→ evaluator writes a strict PASS or FAIL report
→ main verifies the report, dispositions findings, and decides the transition
```

Evaluator `workspace-write` 是 logical report-only boundary 加上 post-execution verification。它不是 native filesystem isolation、operating-system ACL，也不授予修复 product files 的权限。

### 可选 capability 参考

Codex adapter 提供九个可复用 interface：

- Requirements Author 和 Requirements Evaluator
- Planner 和 Plan Evaluator
- Solution Designer 和 Solution Evaluator
- Executor 和 Result Evaluator
- Orchestration Reviewer

只有 main 可以启动它们。每个 capability 都是 hard no-fan-out，不能启动或重新配置另一个 agent。Solution roles 只处理具体 Technical Solution Design；它们不拥有 execution permission 或 lifecycle transitions。Evaluators 和 reviewers 只能在 logical report-only authority 下写入各自唯一的 report。

`.codex/config.example.toml` 包含 `multi_agent.max_depth = 1`，仅作为佐证配置。该设置本身不授予 fan-out、isolation 或 lifecycle authority。

### Installer ownership 与 lifecycle

受管理的 installation surface 仅限：

- `.oh-my-harness/` 下的固定 release assets；
- 命名为 `.codex/agents/oh-my-harness-*.toml` 的九个可选 profiles；
- target 根目录 `AGENTS.md` 中的一个 managed router block。

Immutable bundle inventory 固定 required paths、hashes、agent paths、managed-block identity、ownership lists 和 reference policy。`.oh-my-harness/` 下可变的 installation-state record 记录精确的 target-owned installation state。Lifecycle planner 会在写入前核对二者。

同一 release 的 `install` 或 `update` 只有在 version、inventory、state、owned bytes 和 managed block 全部一致时才是 `NO_OP`。Drift、ownership 缺失、unowned collision、unsafe path、dirty overlap 或不兼容的 recovery evidence，会在正常 mutation 前停止。干净的 `update` 会把被替换或移除的 owned bytes 备份到 `.oh-my-harness-backups/<operation-id>/`。`uninstall` 保留这些 backups，并在 owned removal 验证完成后最后删除 state。

详细的 lifecycle 和 adoption specifications 位于 repository 的 [`docs/adoption/`](https://github.com/guoxiaoshuai2023/oh-my-harness/tree/main/docs%2Fadoption) 下。

### CLI 参考

公开 syntax 是封闭的：

```text
usage: oh-my-harness <install|update|uninstall> --target <repo> [--dry-run] [--yes]
```

使用 Quick Start 中的本地 packed archive：

```sh
npx --yes --package="$package_path" oh-my-harness install --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness install --target <repo>
npx --yes --package="$package_path" oh-my-harness update --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness update --target <repo>
npx --yes --package="$package_path" oh-my-harness uninstall --target <repo> --dry-run
npx --yes --package="$package_path" oh-my-harness uninstall --target <repo>
```

以下 registry 形式**目前不可使用**。如果 scoped package 将来正式发布，对应的 version-pinned lifecycle commands 将是：

```sh
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>
```

每个 command 都会在任何写入前打印精确 plan。`--dry-run` 在 planning 后返回。在 TTY 中，mutation 需要一次确认；非交互 mutation 需要 `--yes`。Manual copying、无范围的 `npx oh-my-harness` 和 `--package=oh-my-harness` 都不是有效的 managed installation paths。

### Repository tour

| Path | 用途 |
| --- | --- |
| `AGENTS.md` | Repository router、始终生效的 gates 和 adaptive control 入口。 |
| `docs/agent-routing/` | 用于 external systems、secrets、high-impact actions、current state、implementation scope、validation 和 planning scale 的 triggered rules。 |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | Capability selection、main-only lifecycle、boundaries、retry、state、learning 和 independent verification。 |
| `task-docs/_harness/semantic-fidelity-protocol.md` | Semantic risk、authority、Pass A/B、Design 和 user-failure controls。 |
| `task-docs/_harness/run-directory-protocol.md` | Proportional persistence、Context/Board/task state、evidence、QA、recovery 和 case custody。 |
| `task-docs/_harness/templates/` | Requirements、Plan、Technical Design、packet、report、traceability 和 learning templates。 |
| `.codex/agents/` | 九个可选 Codex capabilities 的 source profiles。 |
| `scripts/` | 用于 source extraction 和 structural checks 的标准库 Python helpers。 |
| `examples/minimal-router/` | 轻量 downstream router 示例。 |
| `docs/adoption/` | Installer lifecycle、migration boundary 和 release guidance。 |

### Traceability helpers

Installed Harness 包含三个 Python 3.11 helpers。它们提供 structural evidence，而不是 semantic proof。

缩减现有 `AGENTS.md` 前：

```sh
python3 scripts/extract_agents_source.py AGENTS.md \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md
```

完成 coverage manifest 和 rule-preservation ledger 后：

```sh
python3 scripts/validate_rule_preservation.py \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md \
  --ledger task-docs/rule-preservation-ledger.md
```

创建 routing scenario fixture 后：

```sh
python3 scripts/validate_router_fixture.py \
  --router AGENTS.md \
  --fixture task-docs/<routing-fixture>.md
```

这些 helpers 检查 source-block coverage、rule mapping、force-preservation fields、route paths、trigger text 和可选 Rule ID references。它们不替代 semantic equivalence review、evaluator review 或 main-thread acceptance。

### 安全与运行限制

- High-impact actions、external writes、secrets、permissions、billing、keys、production systems 和 destructive changes，需要适用的 plan/dry-run、精确 authority 和 stop controls。Harness 不授予这些权限。
- Passing tests、schemas、files、counts 和 producer reports 都是有范围的 evidence，而不是所有真实行为的证明。
- Logical evaluator report-only authority 通过 packet binding 和 post-execution scope checks 验证；它不是 native runtime path isolation。
- Complete-Run learning 是 source-only 且由 main 控制。它不能自动修改 Harness rules、启动工作或 promote central cases。真实 central-case mutation 需要后续明确的 human disposition 和单独授权的 custodian action。
- Package lifecycle 不提供 global installation、arbitrary runtime adaptation、arbitrary configuration merging 或 general migration engine。
- Local package evidence 不能证明 npm scope ownership、credentials、signing、public release 或 deployment authorization。

### Release 与 license 状态

Repository 当前声明 package version `0.1.0`、package identity `@guoxiaoshuai2023/oh-my-harness`、CLI binary `oh-my-harness`、Node engine `>=24 <25` 和 Apache-2.0 license。

Package 当前尚未发布。Local archives 和通过的 repository checks 只能证明其测量范围内的 local candidate；它们不授权也不证明 npm publication、signing、release creation、deployment 或真实 consumer migration。参见 [open-source release checklist](https://github.com/guoxiaoshuai2023/oh-my-harness/blob/main/docs%2Fadoption%2Fopen-source-release-checklist.md)。

[Apache License 2.0](https://github.com/guoxiaoshuai2023/oh-my-harness/blob/main/LICENSE) 包含在 npm package root 中，并且有意不安装到 `.oh-my-harness/`。
