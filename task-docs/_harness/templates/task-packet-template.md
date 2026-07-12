# Task Packet: <Invocation Name>

Use this template for delegated work. The packet may be inline or persisted, but every field in `Required Invocation Boundary` must be completed. Short answers are valid; omitted meaning is not. The main thread owns this packet and any stable write boundary. The producer must not edit or reinterpret its authority.

## Packet Identity And Purpose

- Packet identity/version:
- Invocation owner:
- Assigned capability or review type:
- Why this invocation adds value:
- How the main thread will integrate or act on the result:

## Required Invocation Boundary

- Bounded objective:
- User-valued result:
- Controlling authority source(s), with identity/path or citation:
- In-scope work:
- Explicit non-goals:
- Allowed reads/files:
- Allowed writes/files: `none (read-only)` | <exact paths>
- Allowed tools/commands:
- External systems and permitted operations: `none` | <exact systems/actions>
- Permissions and decision authority:
- Expected artifact, decision, or handoff:
- Required evidence and provenance:
- Validation depth and checks:
- Stop conditions:
- Escalation and return conditions:

## Router And Gate Binding

Choose and complete at least one valid binding. Repository discoverability by itself is invalid.

- Binding mode: `proved runtime inheritance` | `explicit binding`
- Runtime-inheritance mechanism and verifiable evidence, if used:
- `AGENTS.md` identity/path applied:
- Explicit triggered route docs, if inheritance is not proved:
- Triggered gates, each with owner, required evidence, and decision point:
- Fact-triggered routes considered but not triggered, with factual reason when material:

If runtime inheritance cannot be demonstrated, explicitly list every triggered route and gate. A statement that rules “exist in the repo” does not bind them.

## Evaluator-Only Canonical Calibration Binding

Complete this section for every evaluator invocation. For an ordinary producer invocation, state `not applicable — producer invocation`; that producer-only value is not valid in an evaluator packet.

- Evaluator invocation: yes | no — producer invocation
- Canonical evaluator-calibration identity: <stable identity/version or content SHA-256; required for every evaluator>
- Canonical evaluator-calibration path: `task-docs/_harness/evaluator-calibration.md`
- Pre-verdict instruction: consult the canonical evaluator-calibration source above before deciding; independently inspect the assigned primary evidence rather than treating calibration as outcome proof.
- Required evaluator return field: `Consulted calibration path: <the path actually consulted>`
- Required evaluator return field: `Relevant calibration case IDs: <applicable case IDs> | N/A`

For an evaluator, the identity, canonical path, consultation instruction, and both return fields are non-optional. `N/A` is permitted only for `Relevant calibration case IDs` after the canonical source was consulted. It cannot replace the identity, path, consultation, primary-evidence inspection, or verdict.

## Delegation And Fan-Out Authority

- Nested delegation: `prohibited` by default | `authorized within the bounds below`

If authorized, every field below is mandatory. A blank field or unenforceable budget means nested delegation is prohibited.

- Maximum nested depth:
- Maximum total nested agent count:
- Executable budget: <cost/time limit, or maximum calls plus deadline/iteration cap>
- Nested bounded objective and scope:
- Nested read/write/tool/external authority:
- Shared-state restrictions and ownership:
- Expected nested outputs:
- Dependencies and prerequisites:
- Nested stop/cancellation conditions:
- Parent synthesis owner and required synthesis:

Nested work inherits this packet, cannot widen it, and remains cancellable or supersedable by the main thread.

## Triggered Extensions

Complete only the rows whose trigger is present. Mark a considered but absent trigger `not triggered` with a short factual reason; do not invent the route or ceremony.

| Trigger | Required packet extension | Value or `not triggered` reason |
| --- | --- | --- |
| Present state or changing facts affect correctness | Verified source/provenance, captured-at time, freshness limit, stale-evidence rule, and required readback |  |
| Dependencies, parallel work, or downstream consumers | Owner, prerequisites, distinct output, downstream consumer, cancellation/obsolete condition, and synthesis step |  |
| Shared mutable state | Exact ownership, read/write exclusion, conflict-safe integration, and protected-state restriction |  |
| Dirty worktree or protected paths | Before baseline, allowed delta, protected inventory/hashes, and after comparison |  |
| External system read or write | Exact system, target, operation/effect, authority, evidence, and external boundary |  |
| High-impact action | Exact confirmation state, preview/dry-run, recovery, readback, and stop-before-action gate |  |
| MEDIUM/HIGH Semantic Risk | Original Request Anchor and required semantic comparison artifacts |  |
| HIGH Semantic Risk or multi-task cross-surface work | Outcome Contract identity and producer-independent semantic verification |  |
| Credible AC-pass-but-user-fail risk | Outcome evidence, counterexample, and discriminating failure signal |  |
| Assumptions or unresolved questions could affect the result | Known assumptions, questions, smallest safe treatment, and escalation point |  |
| Specialist or independent review is required | Assigned review type, independence requirement, decisive primary evidence, and strict verdict rule |  |
| Deadline, expiring evidence, or bounded runtime | Deadline/freshness window and finite call/time/iteration budget |  |
| Delegated write | Stable authoritative boundary identity/reference, allowed writes, protected state, required evidence, stops, and producer-nonmodifiable rule |  |
| Frozen/versioned write boundary required | Escalation trigger, boundary identity/version/path, freeze owner, and restart rule |  |
| Authorized nested delegation | Depth, count, executable budget, scope, authority, outputs, stops, shared state, and parent synthesis fields above |  |

## Stable Write-Boundary Decision

Complete this section for any delegated write; otherwise state `read-only — not applicable`.

- Boundary form: `concise stable packet` | `frozen/versioned boundary`
- Boundary identity/reference and version:
- Main-thread or contract owner:
- Objective, exact allowed writes, and protected state:
- Required evidence and stop conditions:
- Producer may modify or reinterpret this boundary: `no`
- Material-change behavior: `stop; create a new identity/version before revised work`
- Escalation check:
  - MEDIUM/HIGH Semantic Risk affects the result: yes/no
  - HIGH Operational Risk or high-impact external write: yes/no
  - cross-context, handoff, dependent agent, or multiple write attempts: yes/no
  - protected paths, dirty worktree, or shared mutable state make scope proof material: yes/no
  - ambiguity or prior failure makes drift credible: yes/no
- Decision rationale:

Any `yes` escalation trigger requires a frozen/versioned boundary. `ACCEPTED_CONTRACT.md` is one compatible strong form, not a universal filename.

## Return Contract

- Return the bounded result or finding:
- Cite supporting primary evidence and freshness:
- Report validation actually performed:
- Separate facts, assumptions, inferences, and uncertainty:
- Report blockers and stop/escalation state:
- Report remaining risk and unchecked areas:
- Evaluator only — Consulted calibration path: <required exact path returned by the evaluator>
- Evaluator only — Relevant calibration case IDs: <applicable IDs, or `N/A` only after consultation>
- Do not claim main-thread acceptance, independent review, external action, readback, validation, or another role's work unless it actually occurred.

## Packet Validity Check

The packet is invalid and the invocation must not start when any required field is absent, authority is mutable or uncitable, route/gate binding relies only on discoverability, a triggered extension is omitted, nested delegation lacks every bound and executable budget, or the expected result cannot be integrated into the run. An evaluator packet is also invalid and must `STOP` before launch when its canonical calibration identity/path, pre-verdict consultation instruction, or either required calibration return field is absent. A prefilled or returned case-ID `N/A` does not cure missing consultation.
