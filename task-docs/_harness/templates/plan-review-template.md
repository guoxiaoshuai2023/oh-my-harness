# Plan Review: <Plan Title>

Decision: PASS | FAIL

Summary:

-

Mode:

- Pass A - Independent Intent Reconstruction | Pass B - Semantic Comparison | Standard LOW-risk review

## Review Inputs

- Plan path:
- Original Request Anchor identity/path:
- Outcome Contract identity/path, if any:
- Route docs read:
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md` | N/A
- Relevant calibration case IDs: CAL-... | N/A

## Pass A - Independent Intent Reconstruction

Use this section for MEDIUM/HIGH semantic risk. Produce and persist it before reading planner-authored plan content.

- Restricted input used:
  - Original Request Anchor / verbatim source excerpt:
  - Current-state/safety context:
  - Repo-file facts:
- Planner-authored plan content excluded before baseline: yes/no
- Reconstructed user-valued outcome:
- Required outcomes:
- Required non-goals / exclusions:
- Safety boundaries:
- Current-state facts:
- Likely semantic drift risks:
- Current-state evidence trigger:
- Pass A baseline identity:
- Baseline persistence path:

Isolation blocker:

- If restricted input, planner-authored content exclusion, baseline identity, or baseline persistence path cannot be proven, stop and output FAIL. Do not proceed to Pass B with an unproven or contaminated baseline.

## Pass B - Semantic Comparison

- Pass A baseline identity cited:
- Pass A baseline persistence path cited:
- Plan reviewed against the same frozen Pass A baseline: PASS/FAIL
- Pass B routing continuity:
  - Same evaluator instance that completed Pass A: yes/no/N/A
  - If a different evaluator instance was unavoidable, fallback package received the full persisted Pass A baseline, Pass A baseline identity, baseline persistence path, and explicit weaker-continuity note: yes/no/N/A
  - Fallback package path or note location, if applicable:
  - This continuity/fallback requirement is part of the existing plan-review gate, not a new agent, not a seventh agent, and not a delivery task.
- Outcome Contract quality and preservation: PASS/FAIL/N/A
- Semantic comparison summary:
- Semantic drift findings:
- AC-pass-but-user-fail counterexample considered:
- Failure routing if semantic comparison fails:

Pass B blocker:

- FAIL if Pass B does not cite the same persisted Pass A baseline identity, if the baseline cannot be loaded, if fallback continuity is undocumented, or if the plan is structurally complete but semantically drifts from the baseline.

## Standard LOW-Risk Review

Use this section when Pass A/B is not required.

- LOW semantic risk basis:
- Reason heavyweight semantic artifacts are not required:
- Route docs applied only when triggered:

## Findings

List findings by severity. Use `P0`, `P1`, `P2`, or `P3`.

| Severity | Finding | Evidence | Required fix | Calibration case |
| --- | --- | --- | --- | --- |
|  |  |  |  | CAL-... / N/A |

## Acceptance Check

- Original Request Anchor preserved: yes/no/not required
- Outcome Contract preserved: yes/no/not required
- Pass A restricted input and isolation proven: yes/no/not required
- Pass B cites the same baseline identity: yes/no/not required
- Same evaluator continuity or fallback package documented: yes/no/not required
- Operational Risk and Semantic Risk separated: yes/no
- Tasks are delivery units, not gates: yes/no
- LOW-risk work remains lightweight when applicable: yes/no/not applicable
- Acceptance criteria are verifiable: yes/no
- Outcome AC vs Implementation AC separation is sufficient: yes/no/not required
- Evidence requirements are sufficient: yes/no
- Stop conditions are explicit: yes/no
- Route docs applied only when triggered: yes/no
- Current-state evidence required when present behavior matters: yes/no/not applicable

## Overall Decision

`PASS` or `FAIL`

PASS only when every blocking checklist item is PASS, the plan uses the required v2 sequence, required Pass A/B isolation is proven, and there are no P0/P1 findings.

FAIL if any task is only a review/compliance/check/gate task without constructive output. FAIL if LOW semantic risk mechanical tasks are burdened with heavyweight semantic process without a real semantic ambiguity.

Do not output `PASS with caveats`. Any P0/P1 finding, missing acceptance-criteria evidence, contaminated Pass A baseline, missing baseline persistence, missing fallback package, or unverified required boundary is a FAIL.
