# Result QA Artifact

Identity: `universal-harness-adoption-task-2-result-qa-20260713-v2`

Decision: PASS

Implementation Verification: PASS

Semantic Validation: PASS

## Inputs And Hash Verification

All supplied authorities were independently rehashed and matched:

| Input | SHA-256 | Result |
| --- | --- | --- |
| Accepted Contract v5 | `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f` | PASS |
| Focused resume decision | `f49ef9c1ba74bab2739dd5dd8d5143ad37511ca8b2e4fbf2c68a1780ab0b728e` | PASS |
| QA launch baseline v2 | `2533f6962a1e2509dd1f2a8080ec4b295cb7027a612b975f763278c8fe392d7e` | PASS |
| Implementation Report v2 | `7a3ebf73a3465b4990a0b67c422565f6d8e7d024097db8ea533ae97b43248551` | PASS |
| Evaluator calibration | `62a0fb9b101165a27b7c41b30872514e7fa1b33ce1da8ca7f12f15145b1a2f06` | PASS |
| Prior Result QA | `3603bd517fa817bca0c7422bb609fb3ec57e3ce78c7c20060c1d9ea0a9656f9f` | PASS |
| Failure routing | `d9b89ebbb9fed829f33a9376b28cc7a36a9380a98d315f230fece42d5d9f3a9c` | PASS |
| Task 1 accepted chain | `792f1469cd339aebeaa63c157f06870f4b71dbd5398dcce1bedd427d77978e1c` | PASS |

Repository identity also matched:

- Branch: `codex/universal-nondestructive-harness-adoption`
- HEAD, `origin/main`, merge base: `60428957a99cf6f75d640c78cf6833576d47cc8d`
- Tracked delta: empty
- Staged delta: empty
- Committed branch delta: empty

## Calibration Binding

- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: `CAL-001`, `CAL-002`, `CAL-003`, `CAL-004`, `CAL-005`, `CAL-006`, `CAL-SEM-001`, `CAL-SEM-004`, `CAL-ADAPT-006`, `CAL-ADAPT-009`
- Application: producer self-report was treated only as a claim; runtime behavior, source, package output, repository state, protected hashes, and every acceptance criterion were independently checked.

## Prior P1 Reproduction Results

1. Forged ownership and state-hash backup bypass: PASS

   - A canonical state with forged ownership of `.oh-my-harness/target-owned.txt` produced exactly:
     `UNVERIFIABLE_INSTALL_STATE` at `.oh-my-harness/install-state.json`.
   - The target-owned canary remained byte-identical.
   - A drifted managed file whose state hash was forged to match current bytes produced the same exact conflict.
   - No backup, replacement, deletion, sentinel, or other lifecycle mutation occurred.

2. Mutation reporting after rename/unlink failure: PASS

   - Injected failure after successful rename reported the renamed profile under `changed`, excluded it from `unchanged`, retained truthful sentinel state, and left no success state.
   - Injected failure after successful unlink reported the removed payload under `changed`, excluded it from `unchanged`, retained the sentinel, and reported prior state preserved.
   - Final filesystem readback matched both reports.

3. Complete Git metadata/object instrumentation: PASS

   - An unrelated FIFO under `.git/objects` produced `unsafe-git-layout`.
   - Observer evidence included `readdir` for `.git/objects` and `lstat` for the exact special-object path.
   - No Git process spawned after the unsafe object was discovered.
   - Adjacent target content was neither observed nor changed.

4. Damaged marker terminal conflict: PASS

   - A start-only marker produced exactly:
     `[{code:"INVALID_MANAGED_MARKER",path:"AGENTS.md"}]`.
   - No derivative `IO_UNAVAILABLE` appeared.
   - Status was `CONFLICT` and the target remained unchanged.

All independent temporary fixtures were removed.

## Implementation Verification

Implementation Verification: PASS

- All 14 authorized Task 2 files exist and match the QA candidate hashes.
- Exactly six files differ from the focused rejected-candidate baseline, all within the authorized repair scope:
  `filesystem.mjs`, `lifecycle.mjs`, `markers.mjs`, `state.mjs`, `lifecycle.test.mjs`, and `security.test.mjs`.
- The other eight Task 2 files remain byte-identical.
- Source inspection confirmed:
  - exact state/inventory ownership reconciliation;
  - mutation bookkeeping immediately after rename/unlink;
  - unified Git object traversal instrumentation;
  - lifecycle-typed marker failures.
- Package identity is exactly `@guoxiaoshuai2023/oh-my-harness`.
- CLI binary is exactly `oh-my-harness` → `bin/oh-my-harness.mjs`.
- Engine is exactly `>=24 <25`; no dependencies or devDependencies exist.
- Lifecycle runtime uses Node standard-library modules only.
- The generated bundle retains exactly three required Python helpers, but Python is not used to launch or implement the lifecycle CLI.

## T2-AC1 Through T2-AC20

- T2-AC1: PASS  
  Exact discovery/source inspection, observer evidence, sanitized Git fixture, special-object negative, no target execution, and no adjacent-content access verified.

- T2-AC2: PASS  
  Canonical plan/envelope and external hash behavior passed; READY, NO_OP, CONFLICT, and INCOMPLETE states were exercised. Damaged marker output is exact and terminal.

- T2-AC3: PASS  
  Fresh installation matched the fixed 44-file release surface, exact six agents, one managed block, verified state, and payload-verification/state-write ordering fault probes.

- T2-AC4: PASS  
  Binary prefix/suffix, CRLF suffix, created-file behavior, pre-existing empty AGENTS, and later target-owned outer content were preserved.

- T2-AC5: PASS  
  Full damaged-marker matrix rejected; `--force` returned usage failure; `--yes` did not bypass conflicts.

- T2-AC6: PASS  
  Same-version install and update returned NO_OP with complete tree, state bytes, timestamps, and outer bytes unchanged.

- T2-AC7: PASS  
  Synthetic update independently exercised replacement, removal, absent-only creation, and unowned-new-path collision.

- T2-AC8: PASS  
  Unmanaged namespace, prefixed profile, backup collision, and dirty Git overlap stopped before lifecycle mutation.

- T2-AC9: PASS  
  Managed drift was disclosed and backed up before replacement. The prior forged-state-hash backup bypass now conflicts without mutation.

- T2-AC10: PASS  
  Removal of a historical target-owned backup remained informational and did not cause recreation or block NO_OP.

- T2-AC11: PASS  
  State-last uninstall, outer-byte preservation, backup residue, state-delete fault, and forged in-namespace ownership rejection passed.

- T2-AC12: PASS  
  Traversal, absolute, empty, NUL, symlink, non-directory, FIFO, outside-canary, and exact observed-access fixtures passed.

- T2-AC13: PASS  
  Post-plan AGENTS mutation produced `TARGET_CHANGED` before sentinel creation or payload mutation.

- T2-AC14: PASS  
  Copied state under a different canonical root was rejected without mutation.

- T2-AC15: PASS  
  Malformed, incompatible, unscoped, traversal-bearing, insufficient, and inventory-inconsistent state could not authorize lifecycle actions.

- T2-AC16: PASS  
  Sentinel parent/temp/link/verify/cleanup faults, payload/state/sentinel faults, restoration faults, and post-rename/post-unlink truthfulness probes passed.

- T2-AC17: PASS  
  Subsequent invocation detected sentinel, temporary, and state/filesystem mismatch residue without repair or ownership inference.

- T2-AC18: PASS  
  Synthetic sensitive bytes were absent from plans, reports, state, and logs. Backups remained opaque and byte-exact.

- T2-AC19: PASS  
  Package, lock, bin, engine, files allowlist, no-dependency boundary, 53-file archive, and isolated local `.tgz` lifecycle smoke passed.

- T2-AC20: PASS  
  Scoped package/binary/engine/version identity was present in inventory/state; unscoped and mismatched identities were rejected.

## Semantic And Scope Validation

Semantic Validation: PASS

Credible AC-pass-but-user-fail cases were actively checked:

- target-owned in-namespace deletion through forged state: prevented;
- hidden managed drift and backup omission through a forged state hash: prevented;
- false “unchanged” reporting after a completed mutation: prevented;
- AGENTS outer-byte drift: not observed;
- marker damage obscured by a derivative conflict: prevented;
- unowned destination adoption: prevented;
- state success before payload verification: prevented by ordering and fault probes.

Scope validation passed:

- No Task 1, Task 3, Task 4, tracked source, dependency, documentation, CI, contract, or protected artifact was modified by the repair.
- No registry, publication, authentication, secret, external target, stage, commit, push, or PR action occurred.
- The resumed retry remained the original retry domain and used only its single authorized producer/result-QA cycle.

## Protected-State And Dirty-Worktree Verification

- Original dirty baseline: 85/85 exact type and SHA-256 matches.
- Task 1 accepted implementation: 12/12 hashes match.
- Task 2 candidate: 14/14 hashes match after all validation.
- Protected source manifest: 43/43 checks pass.
- Pre-run untracked manifest: 34/34 checks pass.
- Authority chain checked directly: 8/8 hashes match.
- Current untracked inventory: exactly 125 files:
  - 85 original baseline files;
  - 14 authorized Task 2 implementation files;
  - 26 Task 2 gate/history additions under the authorized run directory.
- No unexpected untracked path exists.
- `git diff --check`: PASS.
- `git diff --cached --check`: PASS.
- Tracked, staged, and branch-commit deltas remain empty.
- No repository `dist`, `.tgz`, `node_modules`, npm cache/config/log, sentinel, state temp, or package-validation residue was found.

## Commands And Evidence

All controlling commands used Node from the required runtime directory.

- `node --version` → `v24.14.0`
- `npm --version` → `11.12.1`
- Focused regressions:
  `node --test test/lifecycle/lifecycle.test.mjs test/lifecycle/security.test.mjs`
  → PASS, 36/36
- Independent custom prior-P1 probes → PASS for all four failure domains
- Full Task 1+2 suite:
  `node --test test/bundle/*.test.mjs test/lifecycle/*.test.mjs`
  → PASS, 60/60
- Offline npm suite:
  `npm_config_offline=true npm test`
  → PASS, 60/60
- Isolated package validation:
  `npm run validate:package`
  → status 0, primary status 0, cleanup failure false
- Package evidence:
  - archive files: 53
  - archive SHA-256: `61ca3f512b9ce6b9622bebcb63be79f79c125ff22715d742ce550a4559da1488`
  - install/no-op install/no-op update/uninstall: all status 0
  - validator temporary root verified absent afterward
- Independent package/runtime-boundary build:
  - release files: 44
  - Node-only lifecycle: PASS
  - exactly three required Python helper payloads: PASS
  - temporary build root removed
- Corrected protected-hash parser:
  - dirty baseline 85/85
  - Task 1 12/12
  - Task 2 14/14
  - authority hashes 8/8
- An initial evaluator-only baseline parser used an incorrect Markdown regex and exited before evaluating rows; the corrected parser above supplied the controlling result.

Evidence independently checked:

- File/diff: all implementation files, repaired source, tests, package metadata, lockfile, manifests, and current untracked inventory.
- Command: focused tests, full tests, offline npm tests, isolated package validation, direct negative probes, hashes, Git checks, and residue checks.
- External state: N/A; prohibited and unnecessary.
- Current-state evidence: fresh source hashes, Git state, test output, package output, archive evidence, and final residue checks.
- Calibration consulted path: `task-docs/_harness/evaluator-calibration.md`
- Relevant calibration case IDs: listed above.

## Findings Ordered By Severity

Blocking findings:

- None.

Non-blocking findings:

- None.

## What Was Not Validated

The following were excluded by Contract v5 and were not performed:

- real downstream repository mutation;
- registry resolution, publication, authentication, signing, or release;
- global installation;
- process-kill or power-loss simulation;
- generalized crash recovery, migration, concurrency, or unsupported Git-layout support;
- execution of the shipped Python helpers as lifecycle commands.

## Checklist

- Contract followed: PASS
- No out-of-scope changes: PASS
- Required evidence independently checked: PASS
- Acceptance criteria verified: PASS
- Required tests/checks run: PASS
- Security/secrets safe: PASS
- Current-state evidence: PASS
- Semantic fidelity: PASS

## Overall Decision

Overall Decision: PASS

- Implementation Verification: PASS
- Semantic Validation: PASS
- T2-AC1 through T2-AC20: PASS
- P0/P1 findings: none

## Decision: STRICT PASS
