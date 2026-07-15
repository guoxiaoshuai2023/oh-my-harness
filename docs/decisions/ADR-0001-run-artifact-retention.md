# ADR-0001: Retain Product Assets, Not Raw Run Artifacts

- Status: Accepted
- Date: 2026-07-15

## Context

This repository historically tracked both the Harness product and the working evidence used to build it. Product assets include code, normative protocols, templates, calibration cases, runtime profiles, tests, examples, and public documentation. Working evidence includes task requirements, plan and contract iterations, launch baselines, reports, QA artifacts, retry records, and machine-specific inventories.

Both categories are useful, but they serve different audiences and lifetimes. Keeping every run artifact in the current tree makes the public product harder to inspect and encourages temporary execution state to become accidental project authority. Pull requests and Git history already preserve the development record without requiring raw run directories to remain in every checkout.

## Decision

The current tree retains durable product assets. In particular, `task-docs/_harness/` remains tracked because it contains normative protocols, reusable templates, calibration, and acceptance material that directly affects Harness behavior.

Repository-local execution artifacts belong under `task-docs/history/` or `task-docs/work/` and are ignored by this source repository. Root-level one-off `task-docs/*.md` files are not durable product assets. A future example may be added only as a deliberately selected, generalized teaching artifact with its own review; raw run output is not promoted by default.

This policy applies to the oh-my-harness source repository. Downstream repositories decide independently whether their own task evidence should be committed.

## Consequences

- The public tree presents the product rather than its development workspace.
- Pull requests, commits, and issue discussions remain the durable development history.
- Existing Git history is not rewritten; previously committed run artifacts and accepted machine-path or author metadata remain reachable there.
- Reusable evaluator lessons belong in calibration, behavior defects belong in regression tests, and lasting architectural rationale belongs in focused ADRs.
- CI rejects newly tracked run artifacts, root-level one-off task documents, and machine-local paths on fixed public surfaces.

## Non-Decisions

This ADR does not change Harness execution behavior, adaptive governance, installed bundle contents, package lifecycle, downstream retention policy, or release authority. It does not create an audited-run example and does not authorize Git history rewriting.
