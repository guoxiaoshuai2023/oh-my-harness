# Universal Harness Adoption Implementation Task Plan v5

Plan identity: `universal-harness-adoption-implementation-plan-20260713-v5`

Status: `FOCUSED PLAN REVISION - accepted only through a revised planning-input manifest after strict review`

Canonical path: `task-docs/universal-harness-adoption-implementation-task-plan-20260713-v5.md`

## 1. Authority And Scope

This plan is a focused delivery-ownership revision to:

- Plan v4 path: `task-docs/universal-harness-adoption-implementation-task-plan-20260712-v4.md`
- Plan v4 identity: `universal-harness-adoption-implementation-plan-20260712-v4`
- Plan v4 SHA-256: `d753417df1634f45c3bad7c5559586af0dee1627b06a19a4b45e100f512122cb`
- Requirements v5 identity: `universal-harness-adoption-requirements-20260712-v5`
- Requirements v5 SHA-256: `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`
- Finding routing: `task-docs/history/universal-harness-adoption-20260712/task-3-product-docs/PLAN_GAP_FINDING_ROUTING.md`

Requirements v5 remains unchanged. Plan v4 remains the full architecture and delivery baseline except where this document explicitly supersedes delivery ownership, dependency propagation, and revalidation after the stale Task 1 compiler-test assertion. No other Task 1-4 objective, AC, write set, package behavior, or architecture changes.

### Original Request Anchor

> A user should be able to install a complete, fixed Harness release into an existing repository with one stable command, and update or uninstall it with one stable command.
>
> Installation, update, and uninstall must not silently overwrite or take ownership of target-owned content or uncommitted/untracked work. Modified Harness-owned content may be replaced or removed only after deterministic backup, explicit path-specific disclosure, and explicit confirmation.
>
> The product should be safe by namespace and precise ownership, not by attempting to understand and reconcile every governance system in the repository.

The immediate correction is narrower: README must use the accepted scoped lifecycle CLI and must not retain manual-copy guidance, while the compiler test must validate that accepted documentation state rather than demand the superseded commands.

## 2. Confirmed Gap

Task 3 correctly changed README under `T3-AC1`. The protected assertion at `test/bundle/compiler.test.mjs:78` still requires:

```text
cp -R .oh-my-harness/docs/agent-routing "$TARGET/docs/"
cp -R .oh-my-harness "$TARGET/task-docs/"
```

That assertion belongs to Task 1 bundle/compiler validation. Plan v4 protected Task 1 tests from Task 3 and protected all accepted Task 1/2 files from Task 4. No delivery unit could legally update the assertion, so required-suite acceptance became impossible despite correct Task 3 content.

## 3. Minimal Coherent Revision

The only new implementation delivery is a narrow Task 1 compatibility revision. It does not reopen the compiler, mapping, payload, installer, lifecycle, requirements, or Harness behavior.

Dependency sequence:

```text
focused Task 1 compatibility revision
-> Task 1 revalidation and new accepted evidence identity
-> Task 2 transitive no-impact verification
-> revised Task 3 boundary over the existing five-file candidate baseline
-> Task 3 full revalidation and acceptance
-> stop; Task 4 remains unauthorized
```

## 4. Delivery Unit 1A - Align Task 1 README Compiler Assertion

**User/architecture result**

Task 1 compiler validation checks the accepted installed README lifecycle guidance: scoped package plus binary commands are present, and the old manual-copy commands are not required or emitted as valid installation guidance.

**Dependencies**

- frozen requirements v5 and Plan v4 plus this focused revision;
- Task 1's prior accepted compiler/map/payload behavior;
- the five Task 3 candidate docs as read-only evidence, especially README SHA `90c176504881d50a02c09207529ac1d44acce95b4561ff3f8bab6f43c256ec37`.

**In scope**

- revise only the README-content assertions in the test beginning at `test/bundle/compiler.test.mjs:78` that directly encode the manual-copy transition;
- assert generated README contains canonical scoped lifecycle CLI guidance using package `@guoxiaoshuai2023/oh-my-harness` and binary `oh-my-harness`;
- assert generated README does not present either old `cp -R` manual-copy command as required content or a valid managed installation path;
- retain the test's generated-target/reference-closure purpose where it remains consistent with the accepted README.

**Allowed implementation write path**

- `test/bundle/compiler.test.mjs` only.

**Protected paths**

- Task 1 compiler, bundle map, schemas, marker source, package contract, payload sources, and the other eleven accepted Task 1 implementation paths;
- all Task 2 implementation and evidence;
- all five Task 3 candidate docs;
- requirements, Plan v4, protocols, profiles, templates, calibration, scripts, package metadata, installer/lifecycle code, CI, and Task 4 surfaces.

**Acceptance criteria**

- `P5-T1-AC1`: the only implementation diff is the directly stale README assertion in `test/bundle/compiler.test.mjs`.
- `P5-T1-AC2`: the positive assertion checks the generated README's scoped `--package=@guoxiaoshuai2023/oh-my-harness@...` command and `oh-my-harness` binary relationship.
- `P5-T1-AC3`: negative assertions reject both old manual-copy commands as required/valid installation guidance.
- `P5-T1-AC4`: no compiler, mapping, payload, inventory, lifecycle, package, or Harness behavior changes.
- `P5-T1-AC5`: the focused compiler test and complete Node v24 required suite pass.

**Evidence and validation**

- before/after hash and focused diff for the one test file;
- generated README direct inspection;
- focused `node --test test/bundle/compiler.test.mjs`;
- full `npm test` under frozen Node v24.14.0;
- `npm run validate:package` under Node v24.14.0;
- Task 1 11 protected implementation hashes and five candidate-doc hashes before/after;
- `git diff --check`, staged/committed delta, and dirty-path attribution.

**Stop conditions**

- any necessary fix touches compiler, bundle map, payload, installer, package metadata, candidate docs, or another test;
- the scoped CLI assertion cannot be made against generated README without changing behavior;
- another stable failure appears under the frozen Node v24 runtime;
- a finding is merely an alternate test-implementation preference without requirements, safety, semantic, ownership, or verifiability basis.

**Downstream handoff**

Produce a new Task 1 compatibility acceptance chain identifying the unchanged production/bundle hashes and the revised test hash. Earlier Task 1 evidence remains history and must not be silently reused where it binds the old test hash.

## 5. Transitive Impact And Revalidation

### Focused Handoff Gates

This ownership revision uses the smallest sufficient implementation topology and does not mechanically invoke unrelated roles. Task 1A and revised Task 3 each use this explicit handoff:

```text
main-thread focused contract design
-> independent read-only strict contract review
-> freeze one versioned, producer-nonmodifiable ACCEPTED_CONTRACT.md
-> one fresh executor constrained to that boundary
-> persist the executor's Implementation Report
-> fresh producer-independent read-only Result QA
-> main-thread primary-evidence acceptance
```

Task 1A's executor has the single test-file write authority defined above. Revised Task 3's executor is verification-only over the five immutable candidate docs unless a new evidence-based content defect requires stopping and returning to its owning boundary. Task 2's no-impact artifact remains a read-only dependency gate and is not converted into an implementation task. These gates do not add a fixed seventh agent or make complete v2 the default.

### Task 1

Task 1 must receive a narrow versioned execution boundary for Delivery Unit 1A, independent contract review, focused implementation, producer-independent Result QA, and main-thread acceptance. Its evidence must prove production behavior and eleven other implementation paths are byte-identical while the stale test assertion alone changes.

### Task 2

Task 2 is not reopened for implementation. After Task 1 compatibility acceptance, a versioned no-impact artifact must:

- bind the new Task 1 evidence identity and hashes;
- recompute all fourteen accepted Task 2 implementation hashes;
- explain why a test-only Task 1 assertion change does not alter Task 2 package/lifecycle behavior;
- rerun Task 2-relevant lifecycle/package evidence under Node v24.14.0, including `npm run validate:package` and the complete required suite;
- mark any older Task 2 chain that binds an old Task 1 test identity as superseded for downstream use, without rewriting Task 2 accepted artifacts.

Any Task 2 behavior/hash mismatch stops and returns to the owning task.

### Task 3

Task 3's earlier result remains unaccepted. A revised versioned Task 3 boundary must bind:

- new Plan v5 accepted planning manifest;
- new Task 1 compatibility acceptance chain;
- Task 2 no-impact artifact;
- the five candidate documentation hashes from the finding-routing artifact.

The candidate docs are the implementation baseline and remain read-only unless a new evidence-based finding proves a Task 3 content defect. The expected execution is verification-only. It must revalidate `T3-AC1` through `T3-AC9`, generated README scoped commands, both manual-copy negatives, package/compiler/lifecycle non-regression, all protected hashes, and the complete 60/60 suite under Node v24.14.0. It then receives fresh producer-independent Result QA and main-thread acceptance.

### Task 4

Task 4 remains unauthorized until Task 3 strict PASS. Plan v5 does not change Task 4's objective or write set. When later authorized, Task 4 must consume the new Task 1 and Task 3 identities plus Task 2 no-impact evidence, not stale chains.

## 6. AC-Pass-But-User-Fail Counterexample

A patch makes `npm test` green by restoring the two manual-copy commands to README. The test passes, but `T3-AC1` and the user's managed lifecycle outcome fail. Overall decision: `FAIL`.

A second invalid substitution weakens the test to check only that README exists or contains `oh-my-harness`; this passes structurally but does not prove scoped package/binary guidance or the manual-copy negative. Overall decision: `FAIL`.

## 7. Plan-Level Acceptance

- `P5-AC1`: the ownership gap has exactly one implementation owner and one write path.
- `P5-AC2`: no Task 1 behavior or production artifact is authorized to change.
- `P5-AC3`: the assertion verifies scoped lifecycle CLI and rejects old manual-copy guidance.
- `P5-AC4`: Task 1, Task 2, and Task 3 dependency propagation and supersession are explicit.
- `P5-AC5`: complete required-suite and Task 3 acceptance are jointly achievable under the revised authority.
- `P5-AC6`: candidate docs remain unchanged and unaccepted until fresh Task 3 QA.
- `P5-AC7`: Task 4 remains blocked.
- `P5-AC8`: requirements v5, Plan v4 history, and all unrelated delivery-unit boundaries remain unchanged.

## 8. Planning Stop State

Until strict focused Plan v5 review and a revised accepted-planning-input manifest exist:

- Task 1 compatibility contracting: `NOT AUTHORIZED`;
- Task 3 revised contracting: `NOT AUTHORIZED`;
- Task 4: `NOT AUTHORIZED`;
- implementation, stage, commit, push, PR, package publication, credentials, and external writes: `NOT AUTHORIZED`.
