# Open Source Release Checklist

Use this before publishing `oh-my-harness` to GitHub.

## Required Decisions

- Choose a license. No license has been selected for this repo. License selection is a release-blocking owner decision before publication.
- Decide whether to include a `CODE_OF_CONDUCT.md`.
- Decide whether to include `CONTRIBUTING.md`.
- Decide whether to accept issues, discussions, pull requests, or all three.
- Decide package/runtime policy if scripts grow beyond the Python standard library.

## Repository Hygiene

- Confirm no secret values are present:

```sh
rg -n "(token|secret|password|client_secret|api_key|private_key)" .
```

- Confirm route files exist with the router fixture smoke/coverage check:

```sh
python3 scripts/validate_router_fixture.py --router AGENTS.md --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md
```

This check verifies trigger, route, path, and optional rule mentions only. It is not semantic proof and does not replace rule ledger review, force preservation review, duplicate equivalence judgment, evaluator review, or main-thread review.

- Confirm scripts compile and subagent TOML parses:

```sh
python3 -m py_compile scripts/extract_agents_source.py scripts/validate_router_fixture.py
python3 - <<'PY'
import pathlib, tomllib
for path in sorted(pathlib.Path(".codex/agents").glob("*.toml")):
    tomllib.loads(path.read_text())
    print(path)
PY
```

## Suggested GitHub Files

- `LICENSE`
- `CODE_OF_CONDUCT.md`
- `CONTRIBUTING.md`
- `.github/ISSUE_TEMPLATE/`
- `.github/pull_request_template.md`

Add them only after the project owner chooses the policies.
