# Task 3 Contract Review 02 Root-Cause Decision

Identity: `universal-harness-adoption-task-3-contract-review-root-cause-20260713-v1`

## Main-Thread Diagnosis

This is not a requirements or implementation-plan gap. It is not an implementation choice or reviewer preference. Contract v2 correctly added the relevant authorities but mislabeled three authority classes under one heading:

1. root `AGENTS.md` is the always-on router authority;
2. fact-triggered route-table paths are routed authority;
3. `task-docs/_harness/run-directory-protocol.md` and evaluator calibration are direct supporting authorities, not additional router targets.

That classification ambiguity matters because the adaptive protocol requires either proven inheritance or explicit packet/boundary binding. The selected mode for Task 3 will be explicit boundary and executor-packet binding, not assumed runtime inheritance.

## Disposition

Create one final focused Contract v3 that changes only authority classification:

- bind root `AGENTS.md` as always-on router authority;
- list the exact triggered route-table paths: adaptive orchestration, current-state evidence, task planning scale, implementation boundary, validation/reporting, and semantic fidelity;
- list run-directory protocol and calibration separately as direct supporting authorities;
- retain the same gate owners, five write paths, nine ACs, CLI semantics, stop conditions, and Task 4 prohibition.

No additional functionality, path, test taxonomy, implementation detail, or architecture layer is authorized. If focused review of this exact correction still identifies a blocking authority defect, stop rather than continue expanding the contract.
