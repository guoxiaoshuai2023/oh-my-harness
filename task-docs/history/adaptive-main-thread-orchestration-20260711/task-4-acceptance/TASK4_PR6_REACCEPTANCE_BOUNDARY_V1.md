# Task 4 PR #6 Reacceptance Boundary v1

Identity: `adaptive-main-thread-orchestration-task-4-pr6-reacceptance-boundary-20260712-v1`

State: `CANDIDATE - REQUIRES STRICT READ-ONLY REVIEW`

Operational Risk: `LOW`

Semantic Risk: `HIGH`

## Objective

Repair only the Task 4 acceptance matrix evidence made stale by accepted Task 2/3 revisions, then perform full producer-independent Task 4 reacceptance. Preserve all previously accepted adaptive orchestration semantics.

## Authority

- Frozen requirements: `adaptive-main-thread-orchestration-requirements-20260711-v4`, SHA `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`.
- Implementation plan: `adaptive-main-thread-orchestration-implementation-plan-20260711-v5`, SHA `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`.
- Transitive impact analysis: `adaptive-main-thread-orchestration-task-4-pr6-transitive-impact-analysis-20260712-v1`.
- Revised Task 2 accepted evidence and task-packet hashes listed in that analysis.
- Revised Task 3 accepted evidence and profile hashes listed below.
- Existing Task 4 v7 implementation remains candidate content; previous Task 4 acceptance is superseded only as final delivery authority pending this reacceptance.

## Allowed Write

Exactly one implementation path:

```text
0eeb3024a00e06fdf0866adbd6936694044cc834c510aa9eedad21071f700ee1  task-docs/_harness/adaptive-orchestration-acceptance-matrix.md
```

Main-thread persistence of this boundary, review, launch baseline, report, QA, impact, and final acceptance artifacts is gate activity outside producer authority.

## Protected Paths

Every other path is protected, including all Task 1-3 implementation/evidence; all protocols, templates, profiles, calibration, docs, examples, scripts, CI, adapter, config, requirements, plan, prior Task 4 files, and current untracked artifacts. The index must remain empty. No implementation path may be added.

## Required Matrix Revision

1. Preserve AS-01 through AS-31 and their scenario identities; do not add AS-32.
2. Preserve all six combined fixture identities: CC-LOW, CC-MEDIUM, CC-HIGH, CC-FULL-V2, CC-NEGATIVE, and CC-DELIBERATE-FULL-V2.
3. Update only the three evaluator current-accepted hashes in AS-19:
   - plan evaluator `c8f3a0a9312a44d4cf31db5f67218fdd1bae2c55acb1dac84a88c6d6a84fba7b`;
   - solution evaluator `d71a60a53e32a56d53c6e302c3d4ac9bc8a2a33205c1d4bc1b0c4cc5da19c6d5`;
   - result evaluator `5d70ba852c7135c94fb6007340b40589a71013223fc9258f81676783f9e770ec`.
4. Update AS-19 judgments to recognize mandatory packet-bound canonical calibration while preserving each role's distinct intelligence, read-only sandbox, independence, strict verdict, primary evidence, no repair, and stop boundaries.
5. Add a concise combined-interface invariant applying to every evaluator invocation in the combined walkthrough: evaluator packet supplies canonical calibration identity/path, requires pre-verdict consultation, and requires return of consulted path plus relevant case IDs or post-consultation N/A.
6. Explicitly make missing/ambiguous/unreadable/non-packet-bound calibration, discoverability-only fallback, or N/A without consultation a STOP/FAIL.
7. Preserve adaptive default, required full v2, and evidence-backed deliberate full v2. Do not make full v2 automatic or explicit/policy-only.
8. Preserve CC-NEGATIVE as an AC-pass-but-user-fail strict failure even when structural/calibration fields pass.
9. Do not rewrite unrelated fixture facts or claim live role execution.

## Acceptance Criteria

| AC | Requirement |
| --- | --- |
| T4R-AC1 | Matrix contains exactly AS-01..AS-31 and no AS-32; all 31 retain a semantic decision and failure signal. |
| T4R-AC2 | All six CC fixtures remain, preserve their prior outcomes, and every evaluator invocation composes with the revised Task 2 packet and revised Task 3 profiles. |
| T4R-AC3 | AS-19 contains the exact three revised evaluator hashes and a complete no-regression modal-force judgment. |
| T4R-AC4 | Missing calibration binding/consultation/return fields produces STOP/FAIL; calibration never substitutes for primary evidence. |
| T4R-AC5 | Adaptive default, required complete v2, and evidence-backed deliberate complete v2 remain complete and non-contradictory. |
| T4R-AC6 | CC-NEGATIVE still fails on missing producer-independent semantic review even if structural/calibration checks pass. |
| T4R-AC7 | CAL-ADAPT-001..010 remain unchanged and applicable; no new calibration case is required. |
| T4R-AC8 | Exact one-file implementation scope; all upstream and protected hashes remain unchanged; staged delta is empty. |
| T4R-AC9 | Full T4-AC1..T4-AC10, AS-01..AS-31, six-CC, terminology/authority, and AC-pass-but-user-fail regression review passes against revised Task 2/3 identities. |
| T4R-AC10 | Previous Task 4 acceptance is treated as superseded historical evidence and a fresh producer-independent Result QA plus main-thread acceptance decide delivery. |

## Validation

- Hash all revised Task 2/3 accepted artifacts and seven changed implementation paths before and after.
- Parse all six TOMLs with Python 3.11 and assert evaluator sandboxes remain `read-only`.
- Count unique AS IDs: exactly 31, AS-01..AS-31; assert no AS-32.
- Count combined fixture IDs: exactly six expected values.
- Verify exact evaluator hashes and calibration interface/negative conditions in the matrix.
- Review every AS and CC semantically; structural ID checks are not semantic proof.
- Verify CAL-ADAPT-001..010 unchanged and relevant cases consulted.
- Run existing router fixture smoke and label it structural only.
- Run existing validators applicable to repository fixtures.
- Run `git diff --check`, complete changed-path/status/untracked/protected comparison, and confirm empty index.

## Reporting And Stops

Producer returns an Implementation Report only; main thread persists it. Fresh read-only Result QA must inspect actual files and primary evidence and return strict PASS/FAIL with consulted calibration path/case IDs.

Stop without repair if another implementation path is needed; any upstream/protected hash changes; AS/CC identity or semantic outcome changes unexpectedly; safety, semantic, evaluator, or topology force weakens; structural checks are used as semantic proof; staged/committed/external action is required; or an unexplained dirty path appears.

No nested delegation, dependency, secret access, external write, stage, commit, push, merge, or PR creation is authorized.
