# Task Packet: <Invocation Name>

Main owns this packet and every attempt Boundary. Complete all required fields before launch. A producer/evaluator must not edit or reinterpret this packet.

## Identity And Value

- Packet identity/version:
- Invocation identity:
- Assigned capability/review type:
- Why this invocation adds task-specific value:
- Main integration/decision after return:

## Exact Upstream And Objective

- Bounded objective and user-valued result:
- Controlling sources with identity/path/SHA-256:
- Current facts and freshness:
- In scope:
- Non-goals:
- Assumptions/uncertainty:

## Attempt Boundary

- Boundary form: inline | this packet | persisted/versioned
- Boundary identity/version/path:
- Main freeze owner:
- Allowed reads:
- Allowed actions and writes (exact paths):
- Allowed tools/commands:
- External operations: none | exact system/target/effect
- Protected state and before hashes/inventory:
- Expected artifact identity/path/completion values:
- Required evidence and negative probes:
- Validation:
- Stop/return conditions:
- Material-change rule: stop; return to main for a new identity/version
- Producer/evaluator may modify or reinterpret this Boundary: no
- Current Context/Board/Task State identities and SHA-256 values, when triggered:
- Currentness/topology input digest (authority, Task, material inputs, evidence, consumer, registry/profile bytes):
- Exact remaining actions and write-set digest:
- Zero-write verification topology and source-derived excluded capability, when applicable:
- Invalidation rule: any premise, evidence path, registry/profile byte, remaining action, or write-set change stops and returns to main before mutation.

Inline, packet-carried, and persisted/versioned forms carry the same permission, protected-state, evidence, validation, and stop semantics. A predicted affected surface from a Design is not permission.

## Candidate Or Producer Report Binding

- Producer path is absent before launch: yes/no
- Candidate/report identity and exact path:
- Allowed producer write set:
- Upstream/protected preflight hashes:
- Required terminal return: identity, path, completion, validation, uncertainty
- Main postflight: hash, identity/completion, upstream/protected immutability, actual changed paths

## Evaluator Report Binding

For a producer invocation state not applicable. Every formal evaluator/reviewer packet completes all other fields:

- Evaluator invocation: yes/no
- Exact target identity/version/path/SHA-256:
- Exact upstream paths/SHA-256 values:
- Unique report identity/path, absent before launch:
- Report parent prepared by main: yes/no
- Prohibited target/upstream/source/product paths:
- Review type and strict verdict: PASS or FAIL
- Completion values: partial | complete | unavailable
- Canonical evaluator calibration identity:
- Canonical evaluator calibration path: task-docs/_harness/evaluator-calibration.md
- Instruction: consult canonical calibration, then inspect exact primary evidence; calibration is not outcome proof
- Runtime label: logical report-only write boundary plus post-execution verification
- Required report fields: reviewer role, invocation, target identity/hash, review type, inspected evidence, strict verdict, findings, completion, calibration fields, unchecked areas, terminal self-hash boundary
- Required return fields: Consulted calibration path; Relevant calibration case IDs
- Main postflight: compute report SHA-256; verify report binding, target/upstream/protected immutability, and exact changed scope before consuming verdict

## Router And Triggered Gates

- AGENTS.md identity/path applied:
- Binding: proved runtime inheritance | explicit route list
- Triggered routed documents:
- Triggered gates, each with owner, primary evidence, and decision:
- Considered non-triggers and factual reason when material:

Repository discoverability alone is not route/gate binding.

## Hard No-Fan-Out

The invoked capability must not create, invoke, launch, delegate to, or reconfigure another agent, even if any packet text conflicts. Only main launches a separate later invocation. Allowed return messages are question, clarification, escalation, artifact-ready notice, or evidence/finding reference.

## Failure And Recovery Rules

- Target/upstream/protected mutation, extra write, unattributable delta, or binding mismatch: invalid/STOP; verdict is not consumed.
- Collision, parent preparation, permission, runtime/tool, or missing-report failure: operational incomplete/unavailable.
- Partial/unavailable/malformed report: incomplete/invalid; cannot unlock.
- Retry, when main authorizes it, uses a new invocation and new absent path; never overwrite or promote partial output.
- Permission expansion requires explicit user confirmation.
- Missing artifacts, review, validation, or readback must not be fabricated from messages or summaries.

## Return Contract

- Result/finding and completion:
- Artifact identity/path:
- Primary evidence inspected:
- Exact changed/acted-on scope:
- Validation performed:
- Facts, assumptions, inferences, uncertainty:
- Unchecked areas, blockers, and stop state:
- No claim of main acceptance, independent QA, external action, readback, or another role unless it occurred.

## Packet Validity

Do not launch when a required field is absent, target/report path collides, authority is mutable or uncitable, route/gate binding is discoverability-only, protected state cannot be baselined, a required permission/confirmation is missing, hard no-fan-out is weakened, or the returned artifact cannot be verified and integrated by main.

The adjacent interface binds state, currentness, and exact write-set inputs to the governing source records. It grants no transition, unlock, topology, or write decision.

<!-- oh-my-harness-work-truth:v1:start -->
{"version":1,"id":"interface.task-packet","domain":"interface:task-packet","kind":"interface","sourceOwner":"task-docs/_harness/templates/task-packet-template.md","requires":["readiness.ready","task3.current","topology.verification-only","publication.current"],"emits":["boundaryIdentity","currentStateIdentities","currentnessInputDigest","remainingActions","writeSetDigest","topologyInputDigest","materialChangeRule","zeroWriteVerificationBinding"],"references":["registryAndProfileHashes","affectedTaskAcEvidence","consumerRevalidation","expectedReadbackHashes"],"forbids":["producerTransition","producerUnlock","implicitExecutor","verifierMutation","staleTopologyReuse"]}
<!-- oh-my-harness-work-truth:v1:end -->
