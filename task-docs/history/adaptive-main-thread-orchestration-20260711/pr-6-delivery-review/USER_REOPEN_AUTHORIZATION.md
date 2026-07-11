# User Authorization To Reopen PR #6 Findings

Identity: `adaptive-main-thread-orchestration-pr-6-reopen-authorization-20260712-v1`

Source: direct user message in the parent thread on 2026-07-12, Asia/Shanghai.

## Verbatim Authorization

> 授权基于 PR #6 reviewer finding，聚焦重开 Task 2 和 Task 3，并重新验收受影响的 Task 4。
>
> 先持久化原 PR review artifact、reviewer identity/可取得的运行信息、完整 findings 和主线程 finding-routing decision。无法取得的信息必须如实标记，不得补造。
>
> Task 2 仅允许修改：
> - task-docs/_harness/templates/task-packet-template.md
> - task-docs/_harness/templates/orchestration-prompt-template.md
> - task-docs/_harness/templates/plan-review-template.md
> - task-docs/_harness/templates/result-qa-template.md
>
> Task 2 必须：
> - 将 evaluator canonical calibration binding 变成 evaluator invocation 的不可省略字段；
> - 记录 canonical source identity/path；
> - 要求返回 consulted path 和相关 case IDs 或 N/A；
> - 在三个 reusable templates 中完整表达 adaptive default、required full v2、evidence-backed deliberate full v2；
> - deliberate selection 不得成为默认流程，必须保留完整 evidence threshold。
>
> Task 3 仅允许修改三个 evaluator TOML：
> - harness-plan-evaluator.toml
> - harness-solution-evaluator.toml
> - harness-result-evaluator.toml
>
> Task 3 必须：
> - 每次调用绑定 task packet 提供的 canonical evaluator calibration；
> - 报告 consulted path 和相关 case IDs/N/A；
> - 保持 read-only sandbox、independence、strict PASS/FAIL、primary evidence 和 no-repair 边界。
>
> Task 1 不默认重开，只记录 no-impact evidence。
>
> Task 2/3 分别建立新版 boundary、独立 Result QA 和主线程验收。随后执行 Task 4 transitive impact analysis；旧 Task 4 acceptance 在影响判断完成前不得继续作为最终交付依据。基于新的 Task 2/3 identities 重新完成 combined compatibility 和 producer-independent Task 4 验收。
>
> 修复提交到现有 PR #6，不创建新 PR，不 force push。更新后运行 CI 和 fresh read-only PR review。全部 strict PASS 后停止，等待我明确授权合并。

This artifact supplies the direct source citation only. It does not broaden any listed write set or authorize merge.
