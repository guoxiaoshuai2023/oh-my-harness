# Task 3 Revised Verification Contract

Identity: `universal-harness-adoption-task-3-contract-20260713-v4`

Intended accepted path: `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/ACCEPTED_CONTRACT_V2.md`

Status: `CONTRACT CANDIDATE - verification-only, producer-nonmodifiable after freeze`

## Objective

Revalidate the existing five Task 3 candidate documentation files against frozen `T3-AC1` through `T3-AC9`, the corrected Task 1 compatibility evidence, Task 2 no-impact evidence, and the complete required suite. The candidate docs must not be edited. Produce truthful verification evidence for fresh Result QA and main-thread acceptance.

## Frozen Authority

| Path | Identity | SHA-256 |
| --- | --- | --- |
| `task-docs/universal-harness-adoption-requirements-20260712.md` | requirements v5 | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md` | Plan v4 | `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb` |
| `task-docs/universal-harness-adoption-implementation-task-plan-20260713-v5.md` | Plan v5 | `9f17a1054778b45a1ac2d4c18f0ce0210c71e5ae9edcbc79cd6294384a839fc1` |
| `task-docs/universal-harness-adoption-accepted-planning-inputs-20260713-v3.md` | planning manifest v3 | `6b9d18b607b9979decdc91e2bf7f0926770f50680fcf0d8759a5d2ea6fd11f78` |
| `task-docs/history/universal-harness-adoption-20260712/task-1-bundle-compiler/TASK1_ACCEPTED_EVIDENCE_CHAIN_V2.md` | Task 1 chain v2 | `ebe43ec5e4458befff6490277b09bc9016834f59faa935c2d9120ac55cb3740f` |
| `task-docs/history/universal-harness-adoption-20260712/task-2-lifecycle-cli/TASK2_TRANSITIVE_NO_IMPACT.md` | Task 2 no-impact | `a177a1c9a377b532ec2e8b9a6bca46fdb6784fccf0506147b060763acc2fd9d2` |
| `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/PLAN_GAP_FINDING_ROUTING.md` | plan-gap routing | `d9363a91fe3837535d0eef12a85ec783984fce5910a13e3fde9842a108487ad0` |

The earlier Task 3 contract/report/QA/main decision remain protected history. Their Task 3 result is not accepted and their verdicts are not inherited. Every current AC must be reverified.

## Applicable Routes And Topology

The verification packet explicitly binds `AGENTS.md`, `task-docs/_harness/adaptive-orchestration-protocol.md`, `docs/agent-routing/current-state-evidence.md`, `docs/agent-routing/validation-and-reporting.md`, `docs/agent-routing/implementation-boundary.md`, and `task-docs/_harness/semantic-fidelity-protocol.md`. Current generated artifacts, documentation semantics, required-suite state, dirty worktree, and producer-independent verification trigger these routes.

Topology: one fresh verification executor -> response-only report persisted by main thread -> fresh producer-independent read-only Result QA -> main-thread primary-evidence acceptance. No nested delegation. Task 4 is blocked.

No network, target repo execution, external system, credentials, publication, stage, commit, push, PR, dependency install, or implementation write is authorized.

## Zero-Write Boundary And Protected State

Implementation write paths: none.

The five candidate docs are immutable verification inputs:

| Path | SHA-256 |
| --- | --- |
| `README.md` | `90c176504881d50a02c09207529ac1d44acce95b4561ff3f8bab6f43c256ec37` |
| `docs/architecture.md` | `06c2fbd715f4c5542f0e2da2d27098f962a996f8c85e3f57a4622fb84fd58b92` |
| `docs/adapters/codex-subagents.md` | `e9cc864999d887fd9dedb3336260c9fa29ea6cc993bc510844a736e11d77744c` |
| `docs/adoption/universal-harness-adoption-runbook.md` | `c1aa4236015fc07b3e8ac381b2b3bc6276bcaec66dd4716a2cc042a98f4e7c26` |
| `docs/adoption/bundle-lifecycle-spec.md` | `e6d7bebcdc93573fc3676353c9e7956bbfd4310474b0c45a032ae79dba8bdc82` |

All Task 1/2 implementation, evidence, package, lifecycle, Harness router/routes/protocols/templates/calibration/profiles/scripts, CI, requirements/plans, superseded history, and other worktree paths are protected. Tests and generated output may be read/run only. Temporary generated output must be in an owned OS temp directory and removed.

## Acceptance Criteria

- `T3-AC1`: README presents the canonical scoped install/update/uninstall and local archive commands; manual source copying and unscoped package forms are explicitly not valid managed installation.
- `T3-AC2`: architecture assigns non-conflicting authority across bundle map/inventory, lifecycle, state, managed block, target content, backups, fixtures, and docs.
- `T3-AC3`: adapter maps all six source and installed profile names while preserving role boundaries and calibration binding.
- `T3-AC4`: lifecycle spec defines immutable inventory, mutable non-self-hashing state, exact ownership, asymmetric update, marker ownership, containment, and state-last uninstall.
- `T3-AC5`: runbook explains preview/confirmation, modified-content backup, target-owned backup lifecycle, exact conflicts, no-op, incomplete state, and truthful STOP.
- `T3-AC6`: adaptive default, required full v2, evidence-backed deliberate full v2, main-thread authority, and no fixed seventh agent retain their accepted modal force.
- `T3-AC7`: docs state parsing/hashes/smoke are not semantic proof and material target/Harness authority conflict causes STOP.
- `T3-AC8`: local acceptance is distinct from license, npm scope access, credentials, signing, publication, and release authorization.
- `T3-AC9`: Node v24 lifecycle runtime and Python 3.11 helper-only prerequisite are distinguished, with all three Python helpers required payload.
- `T3R-AC10`: complete required suite passes 60/60 and focused compiler test passes 11/11 under Node v24.14.0.
- `T3R-AC11`: generated source-support README contains all four scoped package/binary commands and neither obsolete manual-copy command.
- `T3R-AC12`: package validation and lifecycle/compiler tests pass without residue; Task 1/2 accepted hashes and all five candidate-doc hashes remain unchanged.
- `T3R-AC13`: staged/committed delta remains empty and full dirty-path attribution contains no executor change.

## Validation

Use Node v24.14.0 by prepending the frozen runtime directory. Run:

```sh
node --test test/bundle/compiler.test.mjs
npm test
npm run validate:package
git diff --check
git diff --cached --name-status
git diff --name-status origin/main...HEAD
```

Build in an OS temporary directory and directly read `.oh-my-harness/docs/source-support/README.md`. Verify all four exact scoped commands from the Task 1 compatibility contract and absence of both obsolete `cp -R` commands; remove and verify removal of the temp directory.

Directly inspect all five docs and build a T3-AC1..9 evidence map with exact headings/lines and cross-surface terminology. Compare docs against root router, adaptive protocol, semantic protocol, adapter/profile facts, package CLI help, package metadata, lifecycle behavior, and calibration. Parsing, hashes, and tests are supporting evidence, not semantic proof.

Recompute Task 1's twelve current implementation hashes, Task 2's fourteen hashes and four gate artifacts, the two new dependency artifacts, candidate-doc hashes, full status, staged/committed delta, and residue.

## Reporting And Stop Conditions

Return a response-only Implementation Report with each AC decision, primary line/path evidence, command results, generated README evidence, dependency/protected hashes, dirty status, unvalidated areas, and any finding. Do not persist the report.

Stop without modifying anything on any frozen-authority, dependency, candidate-doc, protected hash, branch/base, or unexplained status mismatch; any stable test/package failure; any documentation AC failure; any need to edit a candidate doc or another protected path; or any need for Task 4, external, Git-delivery, dependency, or publication authority. A content defect returns to its owning Task 3 boundary; an upstream defect returns to the owning Task 1/2 boundary.

