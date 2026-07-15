# Task 2 Node 24 Runtime Evidence

Identity: `universal-harness-adoption-task-2-node24-runtime-evidence-20260712-v1`

## Verified Runtime

- Node executable: `/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node`
- Observed version: `v24.14.0`
- npm executable: `/opt/homebrew/bin/npm`
- Observed npm version when the Node 24 directory is prepended to `PATH`: `11.12.1`

The ordinary shell resolves `/opt/homebrew/bin/node` at `v25.9.0`; it is not authorized for Task 2 acceptance.

## Required Invocation

Every Node/npm validation and executor command must use:

```sh
export PATH="/Users/yurendao45/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH"
node --version
npm --version
```

The first command must report a version satisfying `>=24 <25`; otherwise execution stops before implementation or package generation. No runtime provisioning, download, network access, or dependency installation is authorized.

