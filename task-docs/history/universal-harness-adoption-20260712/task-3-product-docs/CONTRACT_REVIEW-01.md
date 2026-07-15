# Task 3 Contract Review 01

Identity: `universal-harness-adoption-task-3-contract-review-20260713-v1`

Decision: `FAIL`

## Inputs And Hashes

All supplied hashes matched:

- Requirements: `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`
- Implementation plan v4: `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb`
- Task 1 accepted chain: `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c`
- Task 2 accepted chain: `1e31a265e3692fd5e275e818850318de67e070da560b6a6a05060ca7dd59f448`
- State baseline: `badb42eb6588837c7c7497b26b3100c6e10165d283d16cafdcd083418f982f68`
- Proposed contract: `5b3dad96b99f4b47d0fdd2b44ed38533b524941e72e45375ca53782cf79dfcee`
- Calibration: `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06`
- Accepted planning inputs: `20485d9b63b70f7a7720f5b34c1b2fd8ddab8e7a3ec6d18871511371d283646d`

Current state also matched the baseline: HEAD/origin/main/merge base were `60428957a99cf6f75d640c78cf6833576d47cc8d`; tracked and staged deltas were empty; all 12 Task 1 and 14 Task 2 implementation hashes matched; listed protected authorities matched; the three existing documentation hashes and two absent states matched; 132 protected untracked paths remained outside the Task 3 run directory.

Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`.

Relevant case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-004`, `CAL-ADAPT-003`, `CAL-ADAPT-009`, `CAL-ADAPT-010`.

## Scope And Dependency Review

- The objective, in-scope work, exclusions, and downstream handoff match frozen Plan Task 3.
- Task 1 and Task 2 chains are correctly bound and hash-valid.
- The contract permits documenting accepted interfaces but forbids modifying production, package, schema, marker, tests, or evidence.
- Task 4 fixtures, final inventory/package identity, CI expansion, and release acceptance remain excluded.
- The five documentation paths are accurate and minimal; all other paths are protected.
- The three mapped source docs and two release-only docs are classified consistently with the frozen bundle map.
- No contract inflation was found.

## AC Coverage

| AC | Decision | Reason |
| --- | --- | --- |
| T3-AC1 | FAIL | The mandatory CLI comparison invokes unsupported `--help` without fixing its expected nonzero semantics. |
| T3-AC2 | PASS | Authority matrix and wording review are concrete. |
| T3-AC3 | PASS | Six source/installed names and calibration binding are explicitly verified. |
| T3-AC4 | PASS | Normative spec requirements are concrete. |
| T3-AC5 | PASS | Runbook outcome evidence is complete. |
| T3-AC6 | FAIL | Controlling routed authority is not explicitly bound. |
| T3-AC7 | FAIL | Applicable protocol/gate set is not fixed in the boundary. |
| T3-AC8 | PASS | Local acceptance and external publication are separated. |
| T3-AC9 | PASS | Runtime prerequisite evidence is explicit. |

## Findings

### [P1] Triggered route and gate authority is not bound

Classification: `contract ambiguity or unsafe authority`.

Calibration case: `CAL-ADAPT-003`.

The repository router supplies fact-triggered routes, and the adaptive protocol requires every delegated invocation either to prove runtime inheritance or explicitly list triggered route documents and gates. Route discoverability alone is insufficient. Contract v1 mentions routed docs as protected but neither proves runtime inheritance nor lists exact triggered routes and gate owners/evidence/decisions. This leaves authority selection to the executor for T3-AC6 and T3-AC7.

Required correction: freeze verifiable inheritance or exact triggered route/gate bindings in the execution boundary.

### [P1] Mandatory `--help` validation has undefined failure semantics

Classification: `contract ambiguity or unsafe authority`.

Calibration case: `CAL-006`.

Contract v1 mandates `node bin/oh-my-harness.mjs --help`, but the accepted CLI supports only `install`, `update`, and `uninstall`. `--help` emits usage on stderr and exits `2`. Contract v1 does not say whether that is expected evidence or a failed check, forcing the executor to decide or modify protected CLI behavior.

Required correction: bind the comparison to an accepted read-only interface with explicit expected output and exit status.

## Unchecked Areas

- The contract was not executed.
- No Task 1/2 suite or package validation was run by the reviewer.
- No external system, registry, credential, publication operation, or target repo was accessed.

## Overall Decision

The contract cannot be frozen while route/gate authority and CLI validation semantics remain unresolved.

Decision: `FAIL`.
