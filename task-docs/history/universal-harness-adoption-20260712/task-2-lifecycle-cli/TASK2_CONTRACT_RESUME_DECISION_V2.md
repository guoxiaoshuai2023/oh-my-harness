# Task 2 Contract Resume Decision V2

Identity: `universal-harness-adoption-task-2-contract-resume-decision-20260712-v2`

Retry domain: `universal-harness-adoption-task-2-lifecycle-contract-20260712-rd1`

Prior exhaustion identity: `universal-harness-adoption-task-2-contract-exhaustion-decision-20260712-v2`

Prior exhaustion SHA-256: `a714bfbc46dc034b36a876051f1661b02ef552b3e57e1b2f893846cb0a641a18`

Status: `RESUMED WITH ONE CONTRACT/REVIEW GATE`

## Qualifying User Decisions

The user fixed the remaining contract premises:

1. Final operation sentinel path is exactly `.oh-my-harness/.operation-in-progress.json`. It is a temporary Harness-owned control file, created exclusively, removed only after success-state verification. Uninstall removes install state before sentinel cleanup; any failure forbids success.
2. Canonical plan excludes self-hash. The apply/confirmation envelope contains `planSha256`, a lowercase 64-hex SHA-256 over the complete canonical plan bytes.
3. Conflict codes are a closed nine-value enum: `UNMANAGED_NAMESPACE`, `UNOWNED_DESTINATION`, `INVALID_MANAGED_MARKER`, `UNVERIFIABLE_INSTALL_STATE`, `INCOMPATIBLE_INSTALLATION`, `DIRTY_OVERLAP`, `UNSAFE_PATH`, `TARGET_CHANGED`, and `IO_UNAVAILABLE`. Runtime extension and `OTHER` are forbidden.
4. Package validation has one entry: `npm run validate:package`, implemented by `node test/lifecycle/package-validation.mjs`. It owns isolated OS-temporary npm pack validation, exact child exit propagation, `finally` cleanup, cleanup-failure reporting, and repository-residue rejection.

These decisions directly close Contract Review 04. Adding `test/lifecycle/package-validation.mjs` is an explicit, narrow Task 2 write-set authorization.

## Main-Thread Review Standard

One fresh focused strict reviewer may assess only:

- whether Contract Reviews 01-04 are closed;
- T2-AC1 through T2-AC20 coverage and evidence;
- write/protected-path authority;
- safety, secrets, high-risk, containment, ownership, and truthful-failure boundaries.

The main thread must independently classify any new finding. An implementation preference, speculative hardening, or alternative design is not blocking unless it traces to frozen requirements, plan AC, direct user authority, or a necessary safety invariant.

## Authorized Topology And Budget

1. Main thread produces one final versioned Task 2 contract.
2. One fresh read-only focused strict contract review.
3. If strict PASS and the main thread independently agrees, freeze a byte-identical accepted boundary and manifest, then launch one fresh executor under that boundary.
4. Persist Implementation Report, run one fresh producer-independent Result QA, and perform main-thread acceptance.
5. Stop after Task 2 decision; Tasks 3/4 remain prohibited.

If contract review is valid `FAIL`, do not expand the contract again automatically. Return the retry domain to `EXHAUSTED`, stop implementation, and record whether the remaining problem indicates Task 2 should be split into coherent delivery units.

No stage, commit, push, PR, npm publication, registry authentication, secrets access, or external target write is authorized.

