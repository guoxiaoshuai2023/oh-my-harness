# Current State Evidence Routing

Read this doc when a task depends on present behavior, live data, existing user-visible surfaces, generated artifacts, current configuration, or any state that may have changed since earlier notes were written.

## When Current-State Evidence Is Required

Require fresh evidence when the task:

- Modifies an existing user-visible surface.
- Depends on current data, current configuration, current generated output, or current production state.
- Uses screenshots, reports, cached artifacts, or prior plans that may be stale.
- Changes behavior where a reproduction or focused runtime check is practical.
- Has MEDIUM/HIGH semantic risk and user value depends on preserving present behavior.

## Evidence Scale

Use proportional evidence:

- LOW risk: inspect the relevant file or run the smallest deterministic check.
- MEDIUM risk: capture a focused before state and verify the affected path after the change.
- HIGH risk: capture enough before/after evidence to rule out semantic drift, stale assumptions, and unintended impact.

Do not use old screenshots, old reports, planner assumptions, or memory as current-state evidence when current state is easy to inspect.

## Evidence Examples

- File content or diff for repository state.
- Test output for code behavior.
- Browser screenshot for UI layout.
- API read-only response with sensitive fields redacted.
- Database count or query result that does not expose private data.
- Generated artifact hash, render, or parse result.

## Stop Conditions

Stop or ask for direction when:

- Current state cannot be inspected and a safe assumption would materially affect correctness.
- The check requires credentials or sensitive data outside scope.
- The task would overwrite user work or generated state without a clear recovery path.
- Current-state evidence contradicts the plan, accepted contract, or user request.
