# Plan Review: <Plan Title>

Decision: PASS | FAIL

Summary:

-

Mode:

- Pass A - Independent Intent Reconstruction | Pass B - Semantic Comparison | Standard LOW-risk review

## Review Inputs

- Plan path/identity:
- Original Request Anchor identity/path:
- Outcome Contract identity/path, if any:
- Current-state/safety evidence:
- Route docs and triggered gates reviewed:
- Selected topology and complete-v2 state: adaptive default | required complete v2 | deliberate complete v2
- Canonical evaluator-calibration identity from invocation packet:
- Canonical evaluator-calibration path from invocation packet: `task-docs/_harness/evaluator-calibration.md`
- Consulted calibration path: `task-docs/_harness/evaluator-calibration.md`
- Calibration consultation completed before verdict: yes/no
- Relevant calibration case IDs: CAL-... | `N/A` after consultation

An evaluator invocation packet missing the canonical calibration identity/path, pre-verdict consultation instruction, or required return contract is invalid: `STOP` before review. `N/A` is valid only for relevant case IDs after consultation and cannot replace the canonical path or consultation.

## Pass A - Independent Intent Reconstruction

Use this section for MEDIUM/HIGH Semantic Risk. Produce and persist it before reading planner-authored plan content.

- Restricted input used:
  - Original Request Anchor / verbatim source excerpt:
  - Current-state/safety context:
  - Repo-file facts:
- Planner-authored plan content excluded before baseline: yes/no
- Reconstructed user-valued outcome:
- Required outcomes:
- Required non-goals/exclusions:
- Safety and protected-state boundaries:
- Current-state facts/freshness:
- Likely semantic drift risks:
- Pass A baseline identity:
- Baseline persistence path:

Isolation blocker:

- If restricted input, exclusion, stable identity, or persistence cannot be proven, output `FAIL`. Do not proceed to Pass B with a contaminated/unproven baseline.

## Pass B - Semantic Comparison

- Same frozen Pass A identity/path cited:
- Same-evaluator continuity or documented full-baseline fallback package:
- Outcome Contract quality/preservation: PASS/FAIL/N/A
- Outcome AC versus implementation-only evidence separation: PASS/FAIL/N/A
- Semantic comparison summary:
- Semantic drift findings:
- AC-pass-but-user-fail counterexample and discriminating evidence:
- Failure routing if semantic comparison fails:

Pass B blocker:

- `FAIL` if the same persisted baseline cannot be loaded/cited, continuity fallback is undocumented, triggered semantic controls are missing, or a structurally complete plan drifts from the source outcome.

## Standard LOW-Risk Review

- LOW Semantic Risk basis:
- Why heavyweight semantic artifacts are not required:
- Fact-triggered routes applied and non-triggered routes omitted:
- Smallest sufficient validation/evidence:

## Adaptive Topology And Gate Review

- Topology follows task facts, risk, dependencies, evidence needs, and delegation value: PASS/FAIL
- Adaptive-default state `MUST` select the smallest sufficient topology when neither required nor fully evidenced deliberate complete v2 applies: PASS/FAIL/N/A
- Required-complete-v2 state `MUST` preserve the exact complete composition when explicitly requested or required by stricter downstream policy: PASS/FAIL/N/A
- Deliberate-complete-v2 state `MAY` be selected without those triggers only with the complete six-field record below: PASS/FAIL/N/A
- Harness presence, risk labels (including HIGH), role/artifact availability, habit, or inertia did not automatically select complete v2: PASS/FAIL
- Guidance does not default to complete v2 or narrow complete-v2 authority to only explicit request/policy: PASS/FAIL
- Optional roles/stages omitted only when their controls are otherwise owned: PASS/FAIL/N/A
- Every triggered gate has owner, evidence, and decision point: PASS/FAIL
- Plan avoids forcing full v2, contracts, context, or QA artifacts without a trigger: PASS/FAIL
- Stable producer-nonmodifiable write boundary selected at the correct level: PASS/FAIL/N/A
- Route binding uses proved inheritance or explicit binding rather than discoverability: PASS/FAIL/N/A
- Dependencies, shared state, cancellation/obsolete conditions, and synthesis are sufficient: PASS/FAIL/N/A
- Review capability/independence matches the correctness question: PASS/FAIL/N/A
- Context threshold is proportional: PASS/FAIL/N/A
- Retry/intervention/exhaustion/resume continuity is sufficient when relevant: PASS/FAIL/N/A
- AC-pass-but-user-fail risk is outcome-tested rather than string-tested: PASS/FAIL/N/A

### Deliberate Complete-v2 Six-Field Threshold

Complete when deliberate complete v2 was selected; otherwise mark every row `N/A` with the selected-state evidence.

- Concrete task facts support the complete composition: PASS/FAIL/N/A
- At least one smaller viable topology is compared with its specific control/evidence/handoff gap: PASS/FAIL/N/A
- All six roles have non-duplicative task-specific value: PASS/FAIL/N/A
- Triggered gate owners, primary evidence, dependencies, handoffs, and decisions are complete: PASS/FAIL/N/A
- Positive marginal value remains after coordination cost and context impact: PASS/FAIL/N/A
- Main-thread synthesis, topology revision, intervention, finite retries, evidence arbitration, and final acceptance remain active: PASS/FAIL/N/A

Missing or generic evidence in any applicable row is strict `FAIL`. A deliberate selection record cannot be inferred from risk, role count, or the existence of harness artifacts.

## Findings

List findings by severity. Use `P0`, `P1`, `P2`, or `P3`.

| Severity | Finding | Primary evidence | Required fix | Calibration case |
| --- | --- | --- | --- | --- |
|  |  |  |  | CAL-... / N/A |

## Acceptance Check

- Original Request Anchor preserved: yes/no/not required
- Outcome Contract preserved: yes/no/not required
- Pass A isolation and same-baseline Pass B proven: yes/no/not required
- Operational Risk and Semantic Risk separated: yes/no
- Tasks are delivery units, not review gates: yes/no
- LOW-risk work remains lightweight: yes/no/not applicable
- Acceptance criteria are verifiable and evidence-backed: yes/no
- Outcome ACs remain outcome-level when required: yes/no/not required
- Current-state evidence is fresh when triggered: yes/no/not applicable
- Protected/external/high-impact/secret gates are complete when triggered: yes/no/not applicable
- Stop conditions and failure routing are explicit: yes/no
- No fabricated or assumed evidence: yes/no

## Overall Decision

`PASS` or `FAIL`

The Overall Decision must match the top-level `Decision`. PASS only when every applicable blocking item passes and there are no P0/P1 findings. A plan need not contain a complete-v2 handoff unless the user explicitly requested it, stricter downstream policy requires it, or the main thread supplied a complete deliberate-selection record. Conversely, an adaptive topology must `FAIL` if it omits any triggered safety, semantic, current-state, stable-boundary, evidence, or independence control. Required complete v2 becoming optional, deliberate complete v2 becoming automatic, only-explicit/policy narrowing, incomplete deliberate evidence, or passive main-thread relay is `FAIL`.

Do not output `PASS with caveats`. Any P0/P1 finding, missing acceptance-criteria evidence, contaminated Pass A baseline, unverified required boundary, or skipped triggered gate is `FAIL`.
