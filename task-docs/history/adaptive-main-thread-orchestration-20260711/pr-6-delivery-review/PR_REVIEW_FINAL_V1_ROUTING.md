# PR #6 Final Review v1 Finding Routing

Identity: `adaptive-main-thread-orchestration-pr-6-final-review-routing-20260712-v1`

Review artifact SHA-256: `b047a84e7bb2b58e04e1326b3a2ba3725fd4eb70d09f881bb26f16597094ed4a`

Decision: `BOTH P1 FINDINGS ACCEPTED; NARROW CI REPAIR AUTHORIZED`

## Finding 1: Missing CI Regression Protection

Origin: delivery CI coverage, not Task 1-4 harness semantics.

The current CI SHA `5bbce6b5a3f516f96087b27a288f27a366ce05ff979536f464f8ceb8b694c55b` parses TOML but does not assert evaluator read-only/calibration invariants or the repaired template/matrix interface. This is a valid false-negative because pre-repair head `e5f0bb7d50231b7064595bbf716f728e5b2ad653` also passed.

Allowed implementation write: only `.github/workflows/ci.yml`.

Required result:

- assert exactly six profiles and evaluator `sandbox_mode = "read-only"`;
- assert all three evaluator prompts require packet-bound calibration identity/path, pre-verdict consultation, primary evidence, exact return fields, STOP, and no repair;
- assert the task packet carries the corresponding non-optional interface;
- assert all three reusable topology templates retain adaptive default, required complete v2, and deliberate complete v2;
- assert the acceptance matrix has eight combined evaluator-interface handoffs;
- retain the explicit statement that structural/smoke checks are not semantic proof.

## Finding 2: Full-Diff Whitespace And Immutable History

The 97 full-PR whitespace findings are confined to `task-docs/history/**`. These files are byte-addressed evidence and their hashes are embedded in later contracts, reports, QA, and acceptance artifacts. Normalizing them would destroy the accepted evidence chain and expand scope across historical records.

The correct final validation boundary is:

- run whitespace validation across the full normative PR diff;
- exclude `task-docs/history/**` explicitly as immutable, non-normative run evidence;
- preserve all history bytes;
- make the scope visible in CI rather than claiming an unqualified full-history whitespace pass.

CI must use the PR base/head range for pull requests and the current commit for main pushes. Checkout depth may change only as required to make that range available.

## Protected Scope

All harness behavior files, templates, profiles, protocols, matrix, docs, examples, scripts, prior evidence, dependencies, and external systems are protected. No semantic change, history normalization, new validator, new role, stage, force push, or merge is authorized.

Validation: parse workflow YAML where available, run every workflow command locally, run the new normative diff check, push to the same PR, require GitHub Actions success, and obtain another fresh full-PR strict review.
