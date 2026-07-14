# Task 3 Contract Review 02

Identity: `universal-harness-adoption-task-3-contract-review-20260713-v2`

Decision: `FAIL`

## Inputs And State

Requirements, plan, Task 1 chain, Task 2 chain, contract-state baseline, prior review/disposition, calibration, and Contract v2 all matched their supplied SHA-256 values. Current state matched all 12 Task 1 hashes, 14 Task 2 hashes, protected authority hashes, Task 3 before states, and the 132-file protected digest.

Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`.

Relevant case IDs: `CAL-003`, `CAL-004`, `CAL-006`, `CAL-SEM-004`, `CAL-ADAPT-002`, `CAL-ADAPT-003`, `CAL-ADAPT-009`, `CAL-ADAPT-010`.

## Prior Finding Closure

- CLI usage semantics: `CLOSED`. Contract v2 fixes exit `2`, empty stdout, exact LF-terminated stderr, evidence meaning, and no authority to modify the CLI.
- Route/gate authority: `NOT CLOSED`. Gate owners are identified, but Contract v2 omits explicit root `AGENTS.md` binding and places the non-routed run-directory protocol under the triggered-route heading.

## Full Review

The reviewer marked scope, five-path write set, protected paths, Task 1/2 dependencies, T3-AC1 through T3-AC9, validation, stop conditions, external-write prohibition, semantic fidelity, no Task 4 authorization, and no contract inflation as `PASS`. Only exact route classification failed.

## Finding

### [P1] Triggered route binding remains inexact

Classification: `contract ambiguity or unsafe authority`.

Calibration case: `CAL-ADAPT-003`.

Contract v2 does not state the selected binding mode, does not explicitly bind root `AGENTS.md`, and does not separate the direct run-directory protocol from actual route-table targets. Required correction: explicitly select packet/boundary binding, bind root `AGENTS.md`, list only exact fact-triggered route-table paths as routed authority, and classify the run-directory protocol separately as direct run-level authority. Existing gate ownership and all delivery boundaries must remain unchanged.

## Overall Decision

Decision: `FAIL`.
