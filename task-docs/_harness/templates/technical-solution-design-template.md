# Technical Solution Design: <Task>

- Design identity/version/path:
- Producer invocation:
- Completion: complete | partial | blocked | unavailable
- Frozen Task/Plan identity/path/SHA-256:
- Exact upstream identities/SHA-256:
- Design trigger and material execution uncertainty:

## Result And Boundaries

- Frozen Task result and non-goals:
- Design does not change result, owner, dependencies, ACs, evidence, failure signal, or consumer:
- This predicted affected surface is not attempt permission. Main alone issues the Boundary after Design acceptance.

## Chosen Implementation Path

- Selected approach and why:
- Rejected approaches and decisive evidence:
- Assumptions and material uncertainty:

## Predicted Affected Surface

| File/module/state | Expected change/effect | Owner/protection | Dependency |
| --- | --- | --- | --- |
|  |  |  |  |

## Order And Dependencies

1. Step → prerequisite → verification

## State, Error, And Failure Handling

- Starting state and invariants:
- Error precedence:
- Partial/operational failure behavior:
- Recovery boundary:
- Irreversible points (none if none):

## Validation And Negative Probes

| AC/invariant | Primary behavior evidence | Discriminating negative probe | Failure signal |
| --- | --- | --- | --- |
|  |  |  |  |

## Stops And Return Upstream

- Stop when authority, Task, Architecture/interface, permission, protected state, dependency, or user choice must change.
- Stop when required behavior depends on a locked downstream result.
- Return unresolved Plan defects to Plan owner; Design defects to Design owner; attempt permission to main Boundary owner.

The Solution Designer must not create a Boundary, Contract, permission artifact, Task AC change, lifecycle decision, or agent invocation. It returns this one candidate to main.
