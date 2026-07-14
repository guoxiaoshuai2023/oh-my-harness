# Task 1 v4 Failure Routing Decision

Identity: `universal-harness-adoption-task-1-v4-failure-routing-20260712-v1`

Decision: `RETURN TO TASK 1 CONTRACT DESIGN`

## Frozen Failed Evidence

| Artifact | SHA-256 |
| --- | --- |
| v4 Accepted Contract | `458c6c2cbba7e3ee1148f51b42b2a7127bb57983479002e58ac6537def62a27d` |
| v1 Implementation Report | `db243283d05f0535b6eba82253e1f4adc63a58b34a05b921a0897d62cfca702b` |
| v1 Result QA | `8e527897cfc27b1ff16a3e1719188f47cead1da1f3bf837582b20f3c9e2cc465` |
| v1 Main-Thread Decision | `70243728ebed35c1b81ae45cfdafc9bd44eea9d996b98fe045221628fe767bdb` |

## Finding And Origin

- Finding: generated support README retains bare `docs/agent-routing` and `task-docs/_harness` references, although only the slash-terminated forms are rewritten and rejected by source-reference validation.
- Failure origin: Task 1 contract/reference-rewrite authority design.
- Owning task: Task 1.
- The v4 implementation and report are rejected evidence, not accepted Task 1 output.
- T1-AC6 failed; all T1 acceptance criteria must be revalidated under a revised boundary.

## Candidate-State Decision

The 12 files under `packaging/**`, `src/bundle/**`, and `test/bundle/**` remain byte-for-byte in their failed-run state. They are the revised-contract baseline and must not be rolled back, discarded, or treated as accepted output. Only a new versioned Task 1 boundary may authorize focused changes.

## Dependency Routing

- Task 1 remains open.
- Tasks 2, 3, and 4 have not begun and receive no accepted dependency from v4.
- Requirements v5 and implementation plan v4 remain unchanged and authoritative.
- No implementation repair is authorized by this decision artifact itself.
