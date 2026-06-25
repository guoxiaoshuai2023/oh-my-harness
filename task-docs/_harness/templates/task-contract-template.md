# Execution Contract: <Task Name>

## Contract Identity

- Task:
- Source plan:
- Contract iteration:
- Stable identity:

## Objective

Implement exactly this task:

- 

## Scope

In scope:

- 

Out of scope:

- 

Allowed write paths:

- 

Protected read-only paths:

- 

## Protected-Path Baseline Plan

Baseline mode:

- Before/after hashes / changed-path baseline / N/A with reason:

Before hashes for protected files:

| Path | Before hash | Command or evidence |
| --- | --- | --- |
|  |  |  |

Changed-path baseline for protected directories:

| Protected directory | Baseline command or evidence | Allowed changed paths, if any |
| --- | --- | --- |
|  |  |  |

After verification required:

- Recompute protected file hashes or rerun the changed-path baseline.
- A plain final diff is not sufficient proof when the worktree may contain unrelated changes.

## Semantic Boundaries

Use `N/A with reason` for LOW semantic risk tasks where these artifacts are not required.

- Semantic risk tier:
- Original Request Anchor identity/path:
- Pass A baseline identity/path:
- Outcome Contract identity/path:

Outcome ACs to preserve:

| Outcome AC | Source identity/path | Required evidence | Executor boundary |
| --- | --- | --- | --- |
|  |  |  |  |

AC-pass-but-user-fail counterexample:

-

Semantic decisions executor must not make:

-

Semantic stop conditions:

- Stop if a required semantic artifact is missing, mismatched, or cannot be loaded.
- Stop if execution would require reinterpreting user intent, changing route choice, changing Outcome ACs, or replacing outcome evidence with implementation-only evidence.

## Required Context

- Route docs to read:
- Files to inspect:
- External systems:
- Current-state evidence:

## Implementation Plan

1. 
2. 
3. 

## Acceptance Criteria

| AC | Requirement | Evidence | Validation |
| --- | --- | --- | --- |
| AC1 |  |  |  |

## Safety Gates And Stop Conditions

- Stop if:
- User confirmation required for:
- Secret handling:

## Validation Commands

```sh
<commands>
```

## Reporting Requirements

Implementation report must include:

- Changed files.
- Scope compliance.
- AC evidence.
- Validation results.
- What was not validated.
- Remaining risk.
