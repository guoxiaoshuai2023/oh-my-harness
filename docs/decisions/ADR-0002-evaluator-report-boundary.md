# ADR-0002: Evaluator-Owned Report Boundary

- Status: accepted source architecture
- Decision owner: main thread

## Context

Formal evaluator/reviewer capabilities must preserve their exact original verdict/findings without modifying the candidate, upstream authority, source/product state, or another agent's artifact. The current runtime can create an ordinary workspace file but does not prove native path-level ACL, runtime identity attestation, or restart recovery.

## Decision

Use one invocation-specific evaluator-owned report file under a logical report-only write boundary plus post-execution verification.

Before launch, main binds reviewer role/invocation, exact target identity/version/path/hash, exact upstream hashes, an absent unique report path, prohibited surfaces, review type, canonical calibration identity/path, completion states, strict verdict schema, and failure rules. Main baselines target/upstream/protected hashes and changed paths and prepares the report parent.

The evaluator reads exact primary evidence and writes only its report. At terminal, main computes the report hash and verifies binding, required fields, target/upstream/protected immutability, and exact changed scope before consuming verdict. A main receipt is optional derivative evidence and cannot replace or rewrite evaluator voice.

Integrity failures precede verdict. Mutation/extra write/binding mismatch makes review invalid. Collision, path preparation, permission, runtime, or missing terminal report is operational incomplete/unavailable. Partial/unavailable/malformed output cannot unlock. Any retry uses a new invocation and new absent report path; permission expansion requires explicit user confirmation.

## Consequences

- Evaluator/reviewer profiles use report-capable workspace-write without claiming native isolation.
- Main exclusively dispositions findings, controls retry/transition, and accepts.
- Evaluators never repair targets or launch agents.
- Unisolated writers are serialized.
- A stronger native channel can be evaluated later but is not required for the current logical boundary.

## Rejected Alternatives

- Read-only runtime with chat-only review: cannot preserve an evaluator-owned durable original report.
- Broad workspace write described as native isolation: false claim.
- Main-authored summary as formal report: loses evaluator ownership and exact voice.
- Shared/reused report path: creates collision and provenance ambiguity.
