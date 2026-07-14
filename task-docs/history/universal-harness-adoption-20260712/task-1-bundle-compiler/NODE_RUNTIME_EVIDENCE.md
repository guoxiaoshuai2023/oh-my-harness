# Task 1 Node Runtime Evidence

Identity: `universal-harness-adoption-task-1-node-runtime-evidence-20260712-v1`

Captured: `2026-07-12 Asia/Shanghai`

## Supported Major Decision

Primary current-state source: `https://nodejs.org/en/about/previous-releases`

The official release table reports Node 24 (`Krypton`) as LTS, Node 26 as Current, and Node 25 as EOL. The package contract therefore selects the supported LTS major `>=24 <25` for this MVP rather than the machine's default Node 25 executable.

## Local Executable Evidence

Default executable, recorded but not authorized for Task 1 validation:

```text
/opt/homebrew/bin/node
v25.9.0
```

Exact Task 1 validation executable:

```text
/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
v24.14.0
SHA-256 20a18709f0154d668f1bd6f6ea8c2a7ae001447b4b2c339732f22e57a8767a55
```

Python helper validation remains separate:

```text
/opt/homebrew/bin/python3.11
Python 3.11.14
```

This evidence authorizes only local Task 1 compilation/tests. It does not verify npm scope access, publish, authenticate, or create a release.
