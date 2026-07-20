# Unified Adaptive Harness Architecture

oh-my-harness is one main-thread-controlled governance system. Task facts select the smallest useful subset of optional capabilities; triggered gates remain mandatory; main owns every launch, Boundary, verification, transition, and acceptance.

## Layers

| Layer | Responsibility |
| --- | --- |
| Router | AGENTS.md keeps hard gates, route triggers, the nine-capability entry, semantic triggers, and validation minimums visible. |
| Routed rules | docs/agent-routing and the three Harness protocols provide fact-triggered long-form rules. |
| Capability profiles | .codex/agents contains nine stable missions; dynamic objective, sources, paths, ACs, commands, dependencies, and budgets stay packet-owned. |
| Active templates | Optional Requirements, Plan, Technical Design, packet, report, Context, QA, and traceability shapes. |
| Evidence | Governance behavior tests, current-state checks, route fixtures, source snapshots, coverage manifests, and rule ledgers support decisions without becoming authority. |
| Release/target lifecycle | Bundle and installer planes map a separately accepted source identity into owned installed payload. Source changes are not release closure. |

## Capability Plane

| Capability | Stable mission | Logical write boundary |
| --- | --- | --- |
| Requirements Author | one source-backed Requirements candidate | one packet path |
| Requirements Evaluator | strict independent Requirements review | one unique report |
| Planner | one acceptance-closed Task Plan candidate | one packet path |
| Plan Evaluator | strict independent Plan/current-upstream review | one unique report |
| Solution Designer | one concrete Technical Solution Design candidate | one packet path |
| Solution Evaluator | strict independent Technical Solution Design review | one unique report |
| Executor | exactly one Task under one main-issued Boundary | Boundary-limited product/report writes |
| Result Evaluator | strict independent actual-result QA | one unique report |
| Orchestration Reviewer | strict advisory review of bounded governance | one unique report |

All nine are independently selectable and hard no-fan-out. A capability must not create, invoke, launch, delegate to, or reconfigure another agent. Only main starts a new invocation.

The five evaluator/reviewer profiles use report-capable workspace-write because they must create their own reports. Their authority is logical report-only write boundary plus post-execution verification. It is not native path isolation, runtime attestation, or source/product permission.

## Fact Selection And Gate Ownership

Before acting, main records the user result/non-goals, Operational Risk, Semantic Risk, current-state needs, uncertainty, protected state, write/external authority, dependencies, and triggered gates. It chooses a capability only for task-specific production value, independent judgment, context isolation, or time-to-evidence improvement.

No mode label, fixed order, compatibility branch, or capability count selects behavior. Dependency facts determine order. LOW direct work with no trigger creates no invocation or durable governance artifact. HIGH risk requires complete safety/semantic/current-state/Boundary/independence/retry/validation coverage, not every capability.

## Authority And Lifecycle

Main-exclusive actions:

- select/revise topology and issue every packet;
- create/freeze/version attempt Boundaries;
- launch every producer/evaluator invocation;
- verify artifact identity/hash/completion, protected inputs, and actual write scope;
- classify findings/failures, authorize retry/intervention, stop/unlock/transition, and accept.

Formal exchange:

    main producer packet/launch
      → producer candidate
      → main candidate hash/scope verification
      → main evaluator packet/launch
      → evaluator reads exact candidate/upstream and writes unique report
      → main report/target/upstream/scope verification
      → main finding disposition and transition

Producer and evaluator paths are invocation-specific and absent before launch. A receipt is an optional main-owned derivative and cannot impersonate evaluator voice. Peer messages are limited to question, clarification, artifact-ready notice, and evidence/finding reference; they cannot change authority.

## Technical Solution Design And Boundary

A Task is an acceptance-closed result unit. Technical Solution Design is selected only when implementation path, affected surface, order, state/error/failure handling, irreversible points, or validation strategy is materially uncertain.

The Solution Designer chooses one concrete path; the Solution Evaluator reviews exactly that Design. Neither creates/reviews attempt permission, changes the Task, or owns lifecycle. A Design's predicted affected surface is not permission.

After Design acceptance, main derives the attempt Boundary from the Frozen Task, accepted Design when present, current state, protected state, and triggered gates. Inline, packet-carried, and persisted/versioned forms all fix allowed actions/paths, protected state, evidence/negative probes, validation, stops, identity, and material-change behavior. New Runs do not select a separate permission-document workflow; older Run permission artifacts remain history only.

## Report Integrity And Recovery

Integrity precedes verdict:

1. target/upstream/protected mutation or extra/unattributable write: invalid/STOP;
2. target/upstream binding mismatch: invalid/STOP;
3. collision, parent preparation, permission, runtime/tool, or missing terminal report: operational incomplete/unavailable;
4. partial/unavailable/malformed report: incomplete/invalid;
5. complete verified strict FAIL/PASS: quality evidence for main disposition, never automatic transition.

A retry uses a new invocation and new absent report path. Collision is not overwritten, partial output is not promoted, and missing evidence is not recreated from transcript/summary. Permission expansion requires explicit user confirmation. Unisolated writers are serialized.

## Finite Failure Control

Stage-local valid quality failures, retry-domain cumulative quality failures, and normalized-cause operational attempts remain separate. The first valid quality failure may receive focused revision; the second requires intervention before a third; a post-intervention third exhausts. The first same-cause operational failure may receive one checked retry; the second requires intervention before third; a post-intervention third blocks/exhausts the path. Rename, role, tool, task split, Boundary, or topology change does not reset the domain.

## Semantic And Evidence Architecture

MEDIUM/HIGH plans bind an Original Request Anchor; Pass A freezes a pre-candidate baseline and Pass B evaluates one Plan against it. HIGH or multi-task cross-surface work binds a run-level Outcome Contract as semantic authority. Current user-visible or generated state is inspected fresh when it affects correctness. Credible AC-pass-but-user-fail behavior is encoded in ACs, evidence, stops, or evaluator loops.

Structural checks prove only their measured structure. Exact source behavior, end-to-end traces, discriminating negatives, producer-independent verification, and main primary-evidence inspection decide acceptance.

## Recoverable Work Truth

Continuity-sensitive work needs enough durable truth to recover authority and evidence without turning every small Task into a workflow. Persistence is therefore selected by independent facts. A self-contained Task stays inline. Loss-of-memory risk adds Living Context; multi-task dependency, blocker, consumer-readiness, retry-summary, or wrong-unlock risk adds Task Board; detailed acceptance evidence, attempts, findings, waivers, intervention, or retry history adds per-task state. These views can coexist, but none is created merely to complete an artifact set.

Each view has one controlling scope and one writer. Main owns all state changes. Context carries Run-level goal, authority, topology, gates and next action; Board indexes Tasks and records readiness; per-task state carries full AC evidence and attempt/finding/retry truth. Cross-references use exact identities and hashes. Durable publication stages Task State, then Board, then Context, reads all participating bytes back, and advances the commit root only when the complete allowed delta agrees. Partial publication, a protected write, wrong writer, or conflicting hash retains the last fully verified state and stops automatic advancement.

The lifecycle vocabulary is exactly `pending`, `active`, `blocked`, `exhausted`, `completed`, `superseded`, and `cancelled`. Acceptance is a binding event, not another state. Only main may take a permitted transition, and downstream unlock is a separate current-readiness decision. Compaction may shorten narrative, but it preserves failures and finding dispositions, all retry counters, intervention/exhaustion/resume state, waivers, rejected or pending decisions, blockers, and exact authority/evidence/readback/QA/accepted-state identities.

Acceptance closes on the observed user-valued result and an exact AC-to-primary-evidence-to-expectation-to-owner-to-consumer chain. Prompts, schemas, files, templates, counts, hashes, reports, parser success and command exits remain supporting evidence. Subjective work additionally binds the observable artifact, dimensions, primary evidence and exact frozen user-authorized rubric. Main may decide only within explicit delegated preference authority; otherwise the unresolved choice returns to the user, and evaluators stay advisory.

The governing source plane remains the adaptive, run-directory and semantic protocols plus their seven active interfaces. Versioned JSON-line records are embedded adjacent executable projections, not a parallel authority or runtime service. Protocols alone own decisions; templates declare required decisions and evidence fields. The explicit-root loader rejects missing paths or blocks, fallback, path escape, symlinks, malformed or duplicate-key JSON, unknown fields/operators, owner/domain duplication, unresolved interfaces and contradictions. The generic interpreter has no domain result defaults. Every decision carries source-byte and field provenance, and every normative field must affect a causal trace.

Two physical prevention paths keep the state model from proving itself. Task 2 runs in a fresh external temporary directory, attributes an authorized staged mutation, reads exact bytes back, and compares complete before/after manifests including protected tracked, untracked and ignored sentinels. Wrong writers, bypasses, leakage, unobserved corruption, Board/State conflict and object-only claims stop. Task 3 reads the current source-derived capability registry and exact profile bytes, binds currentness and the remaining write set into the topology input, and chooses verification-only with Result Evaluator and without the uniquely resolved Executor only when the write set is empty. Registry/profile drift, stale or blocked evidence, duplicate resolution, or an unexpected write invalidates the decision and returns to main without repair.

Omitted, reversed and contradictory protocol/interface records are replayed from exact temporary source copies through the same loader and decision path. Valid reversal must change behavior and fail the independent frozen expectation; structural green is insufficient. Independent semantic review also compares every adjacent record with prose for force, trigger, owner, required and forbidden action, result and stop. Neither representation silently wins a contradiction.

## Complete-Run Learning And Human Case Custody

Learning begins only after one non-trivial requirement Run reaches `accepted`, `blocked`, `exhausted`, or `stopped`. Main binds the physical terminal observation, current evidence index, persistence result, participating views, history, and learning-contract digest, then performs one lightweight scan. Task completion is not a Run end, and a clean scan creates no retrospective, case, or empty directory.

The existing eight persistence outcomes remain authoritative. Context, when selected, uniquely stores the canonical scan in `failureScan`; otherwise main holds canonical inline bytes in the uninterrupted terminalization session. Board and Task State can contribute references but never own scan truth. An exact repeat is a no-op, conflict or staleness stops, and a fresh session opening an already-terminal Run without exact history fails closed. Planned reentry or session end with continuing work first transfers unchanged inline bytes to source-selected Context through ordinary publication. This preserves at-most-once behavior without claiming native crash recovery.

All seventeen learning triggers and privacy/evidence precedence are protocol-owned executable projections. Only a trigger plus sufficient privacy-safe primary evidence creates the bottom-up pair:

    task-docs/history/<run>/learning/RETROSPECTIVE-<version>.md
      → task-docs/history/<run>/learning/cases/candidates/NEGATIVE_CASE-<version>.md
      → fact-selected Result Evaluator writes one report only
      → main verifies and dispositions routing only
      → later explicit human disposition and human-authorized custodian, if separately authorized

The retrospective template exposes evidence and candidate fields but owns no decision. Candidate/review/main disposition never equals promotion. Controlled temporary-root evidence proves distinct create, update, merge, downgrade, reject, supersede, and retire plans with exact prestates, deltas, complete postimages, reciprocal links, immutable consumption history, human/custodian provenance, and false-postimage rejection. The real central library is not written by this behavior.

Per-run learning and `task-docs/cases/` are source-only human evidence, not installed payload or runtime authority. They cannot modify Harness/calibration/protocol/template/profile/validator/test/package/state/topology, emit a global `MUST`, or launch an agent, Loop, Task, or enhancement. A reviewed case may inform a later human decision, but any Harness change still requires a new acceptance-closed Task and main-issued Boundary. Release and migration layers must preserve this separation and never create, adopt, remove, or promote cases automatically.

## Source, Installed, And Currentness Boundary

This source plane can be accepted independently as a runnable nine-capability Harness. That acceptance binds exact behavior evidence and affected-source/expectation manifests; it is not a whole-repository or installed/package identity.

The current bundle map, generated payload, installer state, and release tests remain downstream currentness consumers until separately migrated and accepted. Later work that changes a behavior-shaping source names affected upstream Tasks/ACs, reruns primary evidence, and receives a main no-impact, reopen/reaccept, or supersession transition before acceptance. Only the release-integration owner may issue the final source-to-installed/package identity.

## Router Traceability

When shrinking a router, use source snapshots, coverage manifests, rule-preservation ledgers, and routing scenarios. scripts/validate_rule_preservation.py and scripts/validate_router_fixture.py check mechanical traceability only. Semantic review must still compare modal force, trigger, owner, required/forbidden action, stops, and safety boundary.
