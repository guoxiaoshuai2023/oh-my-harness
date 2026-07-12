# Frozen Or Versioned Execution Contract: <Task Name>

Use this strong boundary form when frozen/versioned authority is triggered or deliberately selected. Eligible LOW-risk single-context delegated writes may instead use a concise stable task packet. In explicit full v2, freeze the first strict solution-evaluator PASS text as immutable `ACCEPTED_CONTRACT.md`.

## Contract Identity And Authority

- Task:
- Source plan/request:
- Contract iteration/version:
- Stable identity/hash:
- Intended frozen path/reference:
- Boundary owner:
- Producer may modify or reinterpret this boundary: `no`
- Material-change rule: stop; return to the owner; issue a new identity/version before revised work

## Objective And User-Valued Outcome

Implement exactly this task:

-

Outcome evidence required:

-

## Scope And Permissions

In scope:

-

Out of scope/non-goals:

-

Allowed write paths/external effects, exactly:

-

Allowed reads/tools/commands:

-

Protected read-only paths/state:

-

Nested delegation: prohibited | bounded authorization copied from controlling packet

## Boundary-Level And Escalation Record

- MEDIUM/HIGH Semantic Risk affects result: yes/no
- HIGH Operational Risk or high-impact external write: yes/no
- Cross-context/handoff/dependent/multiple write attempts: yes/no
- Protected paths/dirty worktree/shared mutable state make scope proof material: yes/no
- Ambiguity/prior failure makes drift credible: yes/no
- Frozen/versioned form required: yes/no
- Boundary choice rationale:

## Protected-Path And Current-State Baseline

Baseline mode:

- Before/after hashes / recursive changed-path inventory / N/A with reason:

| Path or protected directory | Before identity/evidence | Exact allowed delta |
| --- | --- | --- |
|  |  |  |

Fresh current-state evidence:

- Source/provenance:
- Captured at/freshness limit:
- Contradiction stop condition:

After verification:

- Recompute protected identities/inventories and classify every delta. A plain final diff is insufficient when pre-existing/untracked state exists.

## Semantic Boundaries

Use `N/A with reason` only when the semantic trigger is absent.

- Semantic risk tier:
- Original Request Anchor identity/path:
- Pass A baseline identity/path:
- Outcome Contract identity/path:

| Outcome AC | Source identity/path | Required outcome evidence | Executor boundary |
| --- | --- | --- | --- |
|  |  |  |  |

AC-pass-but-user-fail counterexample and failure signal:

-

Semantic decisions the executor must not make:

-

Semantic stop conditions:

- Stop if a required semantic artifact is missing/mismatched.
- Stop if execution would require reinterpreting intent, changing route choice, changing Outcome ACs, or substituting implementation-only evidence.

## Router, Gates, Dependencies, And Context

- `AGENTS.md` binding:
- Triggered route docs/gates with owner, evidence, and decision:
- Runtime inheritance proof or explicit binding:
- Fact-triggered routes not active and reason:
- Dependencies/prerequisites:
- Shared-state ownership/restrictions:
- Cancellation/obsolete conditions:
- Main-thread synthesis:
- Durable context/handoff required and location, or no-trigger reason:
- External systems and exact authority/confirmation/recovery/readback:

## Implementation Plan

1.
2.
3.

The executor may implement only these steps and this one boundary. It may not execute later tasks or repair out-of-contract issues.

## Acceptance Criteria

| AC | Type | Requirement | Primary evidence | Validation |
| --- | --- | --- | --- | --- |
| AC1 | Outcome / Implementation / Safety |  |  |  |

## Failure, Retry, And Stop Conditions

- Valid quality-failure review type/evidence:
- Retry-domain identity and inherited cumulative count:
- Stage-local count:
- Cause-specific artifact-free operational count:
- Intervention required before:
- Exhaustion/blocking scope:
- Separately authorized safety-recovery boundary, if any:
- Qualifying resume evidence and exactly-one-cycle/attempt rule:
- Stop immediately if:
- User confirmation required for:
- Secret/sensitive handling:

## Validation Commands And Manual Checks

```sh
<commands>
```

- Required manual outcome/semantic checks:
- Required producer-independent review and assigned type:

## Reporting Requirements

The Implementation Report must cite this applicable authoritative boundary by identity/path and include:

- changed files/effects and exact scope compliance;
- protected/current-state before/after proof;
- every AC and its actual primary evidence;
- validation actually performed and not performed;
- topology, delegation/integration, and material omitted-stage rationale when applicable;
- blockers, residual risk, retry/stop state, and explicit non-actions;
- no claim of independent QA or main-thread acceptance unless it actually occurred.
