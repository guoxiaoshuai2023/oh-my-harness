# PR #6 Review Finding Routing

Identity: `adaptive-main-thread-orchestration-pr-6-finding-routing-20260712-v1`

Decision owner: main thread

Current PR: `#6`, head `e5f0bb7d50231b7064595bbf716f728e5b2ad653`

## Overall Decision

The PR review is a valid blocking `FAIL` because two evidence-backed P1 findings expose missing reusable invocation behavior. PR #6 must not merge until revised Task 2 and Task 3 results receive independent QA, Task 4 transitive impact is resolved, CI passes on the updated head, and a fresh producer-independent PR review returns strict PASS.

The prior Task 4 acceptance is retained as historical evidence but is not valid as the final delivery basis while this impact analysis is open.

## Finding Routes

| Finding | Main-thread validity | Owner | Required action |
| --- | --- | --- | --- |
| Evaluator canonical calibration is not guaranteed at invocation time | `ACCEPTED` | Task 3, with Task 2 packet carrier support | Create revised Task 3 boundary for the three evaluator profiles; Task 2 must add the non-optional packet binding. Independently QA and accept both results. |
| Reusable templates omit the deliberate complete-v2 state and evidence threshold | `ACCEPTED` | Task 2 | Create revised Task 2 boundary for exactly four templates. Preserve adaptive default, required complete v2, and evidence-backed deliberate complete v2 without making the complete sequence default. |
| CI was outside the old Task 1-4 implementation plan | `REJECTED AS UNSUPPORTED` | Current Git-delivery task, already directly authorized | The later direct user request explicitly required adding the minimal workflow. Repository boundary rules allow a line to trace to the direct user request or an accepted contract. No CI removal or prior-plan rewrite is required. |

## Dependency And No-Impact Decisions

- Task 1 is not reopened. Its normative protocol already preserves evidence-backed deliberate complete-v2 selection and does not own evaluator-profile calibration binding or the affected templates.
- Task 2 is reopened only for:
  - `task-docs/_harness/templates/task-packet-template.md`
  - `task-docs/_harness/templates/orchestration-prompt-template.md`
  - `task-docs/_harness/templates/plan-review-template.md`
  - `task-docs/_harness/templates/result-qa-template.md`
- Task 3 is reopened only for:
  - `.codex/agents/harness-plan-evaluator.toml`
  - `.codex/agents/harness-solution-evaluator.toml`
  - `.codex/agents/harness-result-evaluator.toml`
- Planner, solution-designer, executor, adapter, config, protocols, router, public docs, acceptance matrix, calibration content, scripts, and CI remain protected unless a later independent check proves a new blocking defect and the user expands scope.
- Task 4 must re-evaluate combined Task 2/3 compatibility, calibration application, three-state template behavior, protected scope, and producer-independent evidence against the revised identities.

## Counter And Stop State

- Retry/finding domain: `adaptive-main-thread-orchestration-pr-6-review-fix-20260712-rd1`.
- This user authorization is the substantive decision that permits reopening the protected Task 2/3 scopes.
- The current attempt receives one focused producer/review cycle per owning task followed by one combined Task 4 review cycle.
- A finding that requires any additional protected path, changes accepted semantics beyond the two findings, adds dependencies, or expands CI must stop and return to the user.
- PR #6 remains open and unmerged during remediation.
