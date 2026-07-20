# oh-my-harness

[English](README.md) | [简体中文](README.zh-CN.md)

**一个可移植的 agent Harness，适用于希望 AI 编码 agent 快速推进、同时不丢失范围、安全性或意图的团队。**

大多数 agent 工作流一开始都很简单：一个 `AGENTS.md`、几条规则，以及大量信任。随后仓库不断增长，规则变长，安全约束被淹没，Task Plan 逐渐漂移，而“测试通过了”不再足以证明 agent 做对了事情。

`oh-my-harness` 为这个下一阶段提供可复用的架构：一个小型仓库级路由器、自适应的 main-thread 治理、按触发条件提供的详细文档、语义保真 gate、稳定的执行 Boundary、针对性的独立审查，以及让 agent 工作可审计的可追溯 artifacts。

## 为什么需要它

AI agent 擅长完成工作。当工作依赖于以下事项时，它们的可靠性会下降：

- 在多步骤过程中保留用户的精确意图；
- 区分低风险编辑和高风险操作；
- 避免意外扩大范围；
- 证明治理规则被迁移而非被削弱；
- 用证据而非模糊的信心验证行为。

`oh-my-harness` 将这些关注点转化为可安装、可调整并可强制执行的实用仓库结构。

## 你将获得什么

- **紧凑的 `AGENTS.md` 路由器**，让每次会话的始终生效 hard gate 与路由触发条件保持可见。
- **按触发条件路由的文档**，使 agent 只读取当前 Task 相关的规则。
- **一个统一的自适应 control plane**：main thread 选择九种可选 capability 中任意由事实所需的子集，按依赖关系决定顺序，并在没有固定工作流的情况下保留每个已触发的 gate。
- **由 main 控制的 artifact 交换**：producer 写入 candidate，evaluator 写入独立拥有的 report，而 main 会在 disposition 或 transition 前验证精确 hash 和写入范围。
- **用于 MEDIUM/HIGH 风险工作的语义保真控制**：Original Request Anchor、Pass A/Pass B、Outcome Contract、semantic diff，以及对 AC-pass-but-user-fail 的处理。
- **可追溯性模板**，用于 source snapshot、coverage manifest、rule preservation ledger 和 routing scenario matrix。
- **可直接使用的 Codex capability profiles**，包括 Requirements Author/Evaluator、Planner/Plan Evaluator、Solution Designer/Evaluator、Executor/Result Evaluator 和 Orchestration Reviewer。
- **非破坏性的 package lifecycle**，用于安装、更新和卸载精确的受管理 surface，且不会仅按名称接管文件。
- **零依赖 helper scripts**，用于提取 `AGENTS.md` source block、检查 rule-preservation traceability，以及运行 router fixture smoke/coverage check。
- **adoption 文档**，用于将现有项目安全迁移到该 Harness。

## 仓库导览

| 路径 | 包含内容 |
| --- | --- |
| `.codex/agents/` | 九个可选的 Codex capability profiles，具有稳定职责与 hard no-fan-out。 |
| `.codex/config.example.toml` | 用于佐证的 depth 配置；它不授予 fan-out，也不证明隔离性。 |
| `AGENTS.md` | 本仓库中 agent 使用的通用仓库级路由器。 |
| `docs/architecture.md` | Harness 模型的高层说明。 |
| `docs/adapters/codex-subagents.md` | Codex subagent TOML 文件如何映射到通用 Harness。 |
| `docs/agent-routing/` | 关于 secrets、external systems、high-risk actions、current-state evidence、implementation boundaries、validation 和 planning scale 的详细路由文档。 |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | 规范性的 topology、delegation、packet、boundary、dependency、retry、intervention、synthesis 与独立验证规则。 |
| `task-docs/_harness/semantic-fidelity-protocol.md` | 语义风险、authority chain、Pass A/B、Design 和用户失败规则。 |
| `task-docs/_harness/run-directory-protocol.md` | 与比例相称的 artifact、candidate/report、Boundary、evidence 和 QA 约定。 |
| `task-docs/_harness/templates/` | 可复制的 Requirements、Plan、Technical Design、packet、report、ledger、snapshot 和 routing fixture 模板。 |
| `scripts/` | 用于 snapshot 提取、rule-preservation structural check，以及 router fixture smoke/coverage check 的标准库 Python helper。 |
| `examples/minimal-router/` | 面向希望采用路由模式但不使用完整 stack 的项目的精简 downstream 示例。 |
| `docs/adoption/` | 迁移指导和 release check。universal adoption runbook 与 bundle lifecycle spec 仅适用于 release repository；它们不是 installed payload。 |

## Universal Harness Adoption

Universal Harness Adoption 会将固定的 oh-my-harness release 安装到现有 Codex repository 中，而不接管该 repository 现有的治理。不可变的 bundle inventory 和 installation-state record 将受管理的安装 surface 与所有权限定在三个 surface：

- `.oh-my-harness/` 下的 release assets；
- 命名为 `.codex/agents/oh-my-harness-*.toml` 的九个可选 Codex capability profiles；
- target repository 根目录 `AGENTS.md` 中一个由 marker 分隔的 managed router block。

这些受拥有文件和 managed block 之外的所有内容仍归 target 所有。`AGENTS.md` managed block 前后的 bytes 会被保留。现有 agents、skills、plugins、scripts、CI、domain rules 和其他 frameworks 都会保留；path、ownership 或 marker conflict 会停止操作，而不是触发一般性的合并。

Lifecycle operations 具有 ownership awareness。只有 installation state、inventory、owned files 和 managed block 完全一致时，同一 release 的 reinstall 或 update 才是 no-op。drift 或缺少 owned surface 会在 mutation 前停止；既有 ownership 永远不会授权覆盖第三方 bytes。对于干净的 update，`.oh-my-harness-backups/<operation-id>/` 下确定性、经验证的 backup 会在破坏性 payload 工作前完成 rollback。唯一的历史兼容性输入是精确的 prior six-profile/42-entry owned release，`update` 接受它以转换为 unified nine-profile/49-entry release；它不是 install-adoption mode，也不是 parallel legacy runtime。Uninstall 仅移除 state 证明属于当前的文件、managed block，以及 Harness 记录为自己创建的空 parent directories。

当前 MVP 是一个 Codex repo-local、single-runtime installer。它不提供 global installation、multi-runtime installation、arbitrary configuration merging 或通用 migration framework。

## 快速开始

产品和仓库名为 `oh-my-harness`。npm package identity 为 `@guoxiaoshuai2023/oh-my-harness`，其 CLI binary 为 `oh-my-harness`。

Lifecycle CLI 需要 Node.js 24（`>=24 <25`），并且只使用 Node standard library。只有在运行已安装 Harness 附带的三个 Python helper validator 时才需要 Python 3.11；启动 `install`、`update` 或 `uninstall` 不需要 Python。

npm package 尚未作为当前 implementation acceptance 的一部分发布。要从本仓库本地验证并使用实际 package，请将其 pack 到 OS temporary directory，并从该 archive 调用 binary：

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

本地测试后请移除 temporary directory。当 package version 被正式发布后，可使用以下形式的 registry command：

```sh
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<version> oh-my-harness install --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<target-version> oh-my-harness update --target <repo>
npx --yes --package=@guoxiaoshuai2023/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>
```

为任意 lifecycle operation 添加 `--dry-run` 可生成 plan 而不应用它。每个 mutation command 都会在应用前打印其精确 plan。在 TTY 中，它会请求一次确认；自动化必须在检查 plan 后添加 CLI 的 `--yes` flag。手动复制、无范围限定的 `npx oh-my-harness` 和 `--package=oh-my-harness` 都不是有效的受管理安装路径。

package 始终会安装三个必需的 Python 3.11 helper：`extract_agents_source.py`、`validate_router_fixture.py` 和 `validate_rule_preservation.py`。

每次 mutation 前，installer 都会检查 path normalization、repository-root containment、symlink 和 special file。检测到 unsafe path 时会停止操作。该 MVP 不主张能原子性防护特权并发进程在 filesystem syscall 前剩余时间间隔内替换已检查 path；消除此 race 需要 OS-specific 或 native descriptor-relative mutation architecture，超出当前范围。

在缩减现有 `AGENTS.md` 前，请创建 source traceability artifacts：

```sh
python3 scripts/extract_agents_source.py AGENTS.md \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md
```

完成 source coverage manifest 和 rule preservation ledger 后，运行 structural preservation check：

```sh
python3 scripts/validate_rule_preservation.py \
  --snapshot task-docs/agents-source-snapshot.md \
  --coverage task-docs/agents-source-coverage.md \
  --ledger task-docs/rule-preservation-ledger.md
```

该 helper 会检查 source block coverage、rule-ledger mapping、strong-force preservation 和 duplicate coverage evidence。它不替代对已迁移措辞进行的 semantic equivalence review。

构建 routing scenario fixture 后，运行 smoke/coverage check：

```sh
python3 scripts/validate_router_fixture.py \
  --router AGENTS.md \
  --fixture task-docs/<routing-fixture>.md
```

该 helper 会检查 trigger text、route path 和可选的 ledger Rule ID mention。它不是 semantic equivalence verifier，也不替代 rule ledger review、force preservation review、duplicate equivalence judgment、evaluator review 或 main-thread review。

关于 adoption 的细节，请使用 [router refactor runbook](docs/adoption/router-refactor-runbook.md) 和 [open-source release checklist](docs/adoption/open-source-release-checklist.md)。repository maintainer 还可在 adoption-docs directory 中使用 release-only 的 `universal-harness-adoption-runbook.md` 和 `bundle-lifecycle-spec.md`；这两个文件说明 package lifecycle，但有意不包含在 installed bundle 中。

## 工作原理

`oh-my-harness` 区分了经常被混淆的三件事：

1. **Routing**：`AGENTS.md` 告诉 agent 在当前 trigger 下应读取哪份详细文档。
2. **Execution control**：main thread 选择并调整以 evidence 为基础的 topology；命名的 role 和 stage 都是可选的，但已触发的 safety、semantic、current-state、stable-boundary、validation 和 independence gate 是强制性的。
3. **Semantic preservation**：高风险或含糊的工作会根据原始用户意图检查，而不仅是根据局部 acceptance criteria。

这使低风险工作保持轻量，同时为高风险工作提供足够的结构来防止漂移。每次 delegation 都会得到完整的 task packet 和稳定、producer 不可修改的 Boundary。所有九种 capability 都无条件 hard no-fan-out；只有 main 可以启动每个独立 invocation。Stage-local、retry-domain cumulative 以及 artifact-free operational budget 在 role、tool 或 stage 更名后仍保持有限。

没有命名 mode 或已存储的 sequence。一个 Run 可以使用 direct main work、一种 capability、任意混合子集，或者在事实需要时使用全部九种 capability。HIGH risk 不会自动选择所有 capability。当省略某个 capability 时，其已触发的 safety、semantic、current-state、stable-Boundary、independence、retry 或 validation control 仍必须有 owner、primary evidence 和 decision。

正式的 producer/evaluator 工作遵循一个 ownership sequence：main 为 producer 创建 packet 并启动它，验证 candidate identity/hash/write scope，为 evaluator 创建针对精确 primary candidate/upstream 的 packet 并启动它，验证 evaluator-owned report 和 protected scope，然后仅由 main disposition finding 并决定 transition。Evaluator `workspace-write` 是 logical report-only write boundary 加上 post-execution verification，不是 native path isolation 或 source/product authority。

## Codex Capability Adapter

source repo 包含九个可复用 capability interface 的 `.codex/agents/*.toml`：

- `oh_my_harness_requirements_author`
- `oh_my_harness_requirements_evaluator`

- `oh_my_harness_planner`
- `oh_my_harness_plan_evaluator`
- `oh_my_harness_solution_designer`
- `oh_my_harness_solution_evaluator`
- `oh_my_harness_executor`
- `oh_my_harness_result_evaluator`
- `oh_my_harness_orchestration_reviewer`

这些文件是 Codex 的 adapter，而不是 scheduler、pipeline 或独立架构。main thread 拥有 topology、每次 launch、packets/Boundaries、artifact verification、synthesis、intervention 和 final acceptance；project facts 与 validation depth 属于每个 packet。Solution profiles 只处理具体的 Technical Solution Design。五个 evaluator/reviewer profile 仅在 logical report-only authority 下写入各自唯一的 report。其他 runtime 可以用自己的 config format 实现同样的职责。参见 `docs/adapters/codex-subagents.md`。

`.codex/config.example.toml` 将 `multi_agent.max_depth = 1` 展示为仅用于佐证的配置。它不授予 fan-out、path isolation 或 lifecycle authority；每种 capability 仍然 hard no-fan-out。

source governance plane 以及当前 release-source map 和 package assertion 现在公开这九种 capability。generated、installed 和 archive-derived acceptance 仍被精确的 terminal source receipt 限制；source bytes 本身不是 installed/package release identity。

## 适用场景

- 你的 `AGENTS.md` 正变得过长而不再实用。
- 你希望 agent 工作具有清晰范围、可审查性并以 evidence 为基础。
- 你需要可复用的 Task planning、Technical Solution Design 和稳定的 attempt Boundary。
- 你正在将项目特定规则迁移到 routed docs。
- 你希望获得面向更安全 open-source agent workflow 的公开模板。

## 不锁定特定框架

本仓库不要求特定的 agent vendor、IDE、CI system 或 task runner。受管理 lifecycle 是一个 Node standard-library CLI，而 installed harness 主要由 Markdown 加上三个 Python 3.11 validation helper 构成。你可以将它与 subagents、human reviewer、单个 agent session 或自己的 orchestration layer 一起使用。

这种架构可移植性独立于 release 或 rollout authority。installer 公开 unified nine-capability release，以及从精确的历史 six/42 owned installation 进行的一条封闭 ownership-first update path。它不授权 Universal Adoption、真实 consumer migration、package publication 或 deployment。

## 开源状态

本项目采用 [Apache License 2.0](LICENSE) 许可。该 license 包含在 npm package root 中，并且有意不安装到 `.oh-my-harness/`。

本地 archive acceptance 不是公开 release、npm scope proof、signing 或 publication authorization。scope ownership/access、credentials、signing、publication 和 release creation 仍是后续由 owner 控制的工作。参见 `docs/adoption/open-source-release-checklist.md`。
