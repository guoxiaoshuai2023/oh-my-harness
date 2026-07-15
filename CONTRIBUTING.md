# Contributing to oh-my-harness

Contributions should improve the durable Harness product without adding unrelated execution state to the public tree. Keep pull requests narrow, explain the user-facing or architectural result, and validate the affected behavior directly.

## Durable Project Content

Track source code, package inputs, normative protocols, reusable templates, calibration cases, runtime profiles, tests, public documentation, and deliberately maintained examples.

`task-docs/_harness/` is product content and remains tracked. Local planning and run evidence belongs under `task-docs/work/` or `task-docs/history/`; both locations are ignored in this source repository. Do not commit root-level one-off `task-docs/*.md`, raw contracts, launch baselines, result reports, local absolute paths, caches, archives, credentials, or secrets.

If a run produces lasting value, move the durable lesson to the layer that owns it:

- evaluator judgment pattern: calibration case;
- behavior defect: regression test;
- long-lived architectural rationale: focused ADR;
- reusable user guidance: public documentation or a reviewed example.

Do not convert raw run output into a product artifact by renaming or copying it.

## Change Boundaries

- Preserve existing user work and unrelated dirty paths.
- Do not change Harness behavior, bundle mapping, runtime profiles, protocols, or package contracts as part of repository cleanup.
- Do not add dependencies without explicit approval and a demonstrated need.
- Never include secrets, credentials, private keys, tokens, or sensitive local data in code, fixtures, documentation, logs, or pull requests.
- Keep structural checks honest about their scope; they are not semantic proof.

The retention policy is documented in `docs/decisions/ADR-0001-run-artifact-retention.md`. It is a policy for this source repository, not a requirement that downstream adopters ignore their own task evidence.

## Validation

Use Node.js 24 for the lifecycle package and Python 3.11 for the shipped helper validators and repository checks. Before opening a pull request, run the checks relevant to the change. The complete repository suite is:

```sh
npm test
node --test test/acceptance/*.test.mjs
npm run validate:package
node tools/validate-release.mjs
python3 -m py_compile scripts/*.py
python3 -m unittest discover -s test/repository-hygiene -p 'test_*.py'
python3 tools/check_repository_hygiene.py
git diff --check
```

The router validator is a smoke/coverage check, not semantic equivalence proof. Changes to normative Harness assets also require review of modal force, authority, routing, and user outcomes.

## Pull Requests

Describe the problem, the bounded change, validation performed, validation not performed, and remaining risk. Avoid mixing product work with repository cleanup. A pull request must not rely on ignored local artifacts as authority that reviewers cannot access.

By contributing, you agree that your contribution is licensed under the repository's Apache License 2.0.
