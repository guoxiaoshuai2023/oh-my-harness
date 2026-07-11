# Task 2 Reopened Boundary v5 Addendum

Identity: `adaptive-main-thread-orchestration-task-2-contract-20260712-v5`

State: `CANDIDATE COMPOSITE BOUNDARY`

This addendum incorporates `TASK2_REOPENED_BOUNDARY_V4.md` SHA `2ff1685bc4a1902f8924f4769e473a2d096b08efde0f080d3fe604681ce48b77` except where explicitly overridden below. The composite v5 boundary is the immutable pair of those two files. It resolves `TASK2_REOPENED_BOUNDARY_REVIEW_V1.md` SHA `1d6ba3af64d3cc871df3e5b5d3f609b717e536edfad30b8e7cc316cae52e1741`. Strict independent PASS on this composite is required before implementation.

## Frozen Semantic Chain

- Original Request Anchor: requirements v4 and the verbatim anchor at plan v5 lines 20-32; requirements identity `adaptive-main-thread-orchestration-requirements-20260711-v4`, path `task-docs/main-thread-control-enhancement-requirements-20260711.md`, SHA `f6546d509dc20f651920ff07cdccf3165044321da819f64065551aa59b904d3f`.
- Pass A baseline: identity `adaptive-main-thread-orchestration-plan-review-pass-a-20260711-v1`, path `task-docs/adaptive-main-thread-orchestration-plan-review-pass-a-20260711.md`, SHA `4e72d3a64fbf4719daf16bd0a42554d92f526b3b678cdb5af5a2c13b1a5c4e7b`.
- Plan and embedded Outcome Contract: identity `adaptive-main-thread-orchestration-implementation-plan-20260711-v5#plan-level-outcome-contract`, path `task-docs/adaptive-main-thread-orchestration-implementation-task-plan-20260711.md`, whole-file SHA `c0cf9b7d3311af2789c9040098bf4b455986fe8610b02efbe1c71edc29d142e4`.
- Accepted-planning-input manifest: identity `adaptive-main-thread-orchestration-accepted-planning-inputs-20260711-v1`, SHA `b4a31a3db776aa70a3d08cf737c770c7522f223bce3a15bc57aa64cdaca05780`.

Producer and independent QA must compare the four-template result against all three semantic authorities, including the AC-pass-but-user-fail counterexample at plan lines 48-50.

## Explicit Route And Gate Binding

The implementation packet explicitly binds these paths; repository discoverability alone is not used:

| Route | SHA-256 | Gate owner/evidence/decision |
| --- | --- | --- |
| `AGENTS.md` | `e5f3646813b10977a9ca93f1abae7d5b34b23b472465a740098bc146b5eadf0d` | Main thread owns scope/router binding; before/after hash and exact four-path decision. |
| `task-docs/_harness/adaptive-orchestration-protocol.md` | `8b89c09c4001abd677b6a284a74ad292e62dea94b799af402b71411c63f8572a` | Producer applies three-state topology and calibration packet rules; QA decides semantic preservation. |
| `docs/agent-routing/current-state-evidence.md` | `8fff20d09f5265a54a915125b9ac999534711863836307a45900ef9f47991364` | Main thread freezes launch state; producer and QA compare post-state. |
| `docs/agent-routing/task-planning-scale.md` | `29d6c65557757b0ac963f18fe630551d8768c71e1c03fb99bf40bdc3fac7e81c` | Main thread keeps review gates outside delivery scope and prevents fixed-loop ceremony. |
| `docs/agent-routing/implementation-boundary.md` | `d5b71bf4bde3625514b67997c572ec03f7f564fe99fde8077839887918aed9e8` | Producer may write exactly four paths; scope proof is a mandatory decision. |
| `docs/agent-routing/validation-and-reporting.md` | `6c66815595a0807aa95d8ba3a424639127bb46b3920cc12f0e9a061611dc8a7b` | Producer reports primary evidence; independent QA and main thread decide. |
| `task-docs/_harness/semantic-fidelity-protocol.md` | `c067e71f884be71b2875bfceaaec6945a1f92d9a4d5ebe250a5f62cf89b3b3c4` | Anchor/Pass A/Outcome comparison and negative counterexample are mandatory. |

External-system and high-risk routes are not fact-triggered because no external action, secret, publish, delete, permission, payment, migration, or irreversible action is authorized. Discovery of such a fact stops the task.

## Mandatory Launch Baseline

Before any Task 2 implementation write, the main thread must create and freeze `TASK2_REOPENED_LAUNCH_BASELINE_V1.md`. It must record:

- composite boundary identities/paths/hashes and review PASS artifact;
- branch, HEAD, `origin/main`, merge base, PR head, full `git status --short --branch --untracked-files=all`, staged delta, and committed `origin/main...HEAD` delta;
- exact four allowed before hashes;
- complete sorted untracked-file path/hash inventory, including PR-review and boundary/review artifacts;
- hashes for all files under the PR-review artifact directory and reopened Task 2/3 gate-artifact paths;
- hashes of all routed/semantic authorities above and Task 1 accepted evidence;
- classification of every dirty path and assertion that no other writer is active;
- expected delta: only the four Task 2 implementation paths, followed by main-thread gate artifacts.

The producer must verify the baseline before writing and after validation. Any mismatch or unexplained path stops without repair. Result QA must independently repeat the comparison.

## Write-Free Validation Override

The v4 `py_compile` command is removed. Use this write-free script syntax check instead:

```sh
python3.11 - <<'PY'
from pathlib import Path
for path in sorted(Path('scripts').glob('*.py')):
    compile(path.read_text(encoding='utf-8'), str(path), 'exec')
print('script syntax compile passed without bytecode writes')
PY
```

No cache creation or cleanup is authorized.

## AC-To-Evidence Addendum

In addition to T2R-AC1 through T2R-AC7:

| AC | Required evidence |
| --- | --- |
| T2R-AC8 | Apply orchestration + plan-review + result-QA templates end to end to `CC-DELIBERATE-FULL-V2`; show selection record, review decision, and QA decision with active main-thread controls. |
| T2R-AC9 | Negative walkthroughs strictly reject: automatic HIGH-risk full v2, default full v2, only-explicit/policy narrowing, incomplete six-field deliberate record, passive relay, and calibration-path omission. |
| T2R-AC10 | Before/after force ledger covers safety, semantic, current-state, strict verdict, independence, stable boundary, primary evidence, no repair, no fabrication, and stop/escalation; no force downgrade. |
| T2R-AC11 | Complete dirty-state baseline and post-state proof show exactly four implementation files changed and every protected/untracked artifact preserved. |

Structural marker checks and router smoke are labeled structural only. Semantic PASS requires the positive/negative walkthroughs and independent comparison with Anchor, Pass A, and Outcome Contract.

## Implementation Report Schema

The report must include composite boundary/review/launch identities and hashes; exact changed paths and before/after hashes; T2R-AC1 through T2R-AC11 decisions with primary evidence; route/gate binding; positive and negative walkthrough results; force ledger; validation command outputs; full dirty/protected comparison; unchanged paths; unvalidated areas; residual risks; stop/counter state; no Task 3 execution; and explicit non-actions.

All v4 stop conditions remain. No implementation starts until this composite receives strict independent PASS.
