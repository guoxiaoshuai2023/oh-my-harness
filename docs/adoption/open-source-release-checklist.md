# Open Source Release Checklist

Use this before publishing `oh-my-harness` to GitHub.

## Required Decisions

- Choose a license. Common options include MIT, Apache-2.0, BSD-3-Clause, and MPL-2.0. This repo intentionally does not choose one for you.
- Decide whether to include a `CODE_OF_CONDUCT.md`.
- Decide whether to include `CONTRIBUTING.md`.
- Decide whether to accept issues, discussions, pull requests, or all three.
- Decide package/runtime policy if scripts grow beyond the Python standard library.

## Repository Hygiene

- Confirm no secret values are present:

```sh
rg -n "(token|secret|password|client_secret|api_key|private_key)" .
```

- Confirm route files exist:

```sh
python3 scripts/validate_router_fixture.py --router AGENTS.md --fixture task-docs/_harness/templates/routing-scenario-matrix-template.md
```

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
