# Task 2 Main-Thread Acceptance V2

Identity: `universal-harness-adoption-task-2-main-thread-acceptance-20260713-v2`

Decision: `PASS`

## Authority

- Retry domain: original Task 2 retry domain resumed once by substantive user decision.
- Accepted Contract v5 SHA-256: `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`.
- Focused resume decision SHA-256: `f49ef9c1ba74bab2739dd5dd8d5143ad37511ca8b2e4fbf2c68a1780ab0b728e`.
- Focused executor launch baseline SHA-256: `5f70b6c6398a7e52ff31a007db82863d91d6b6b7016f2abce3f87dbad5259996`.
- Implementation Report v2 SHA-256: `7a3ebf73a3465b4990a0b67c422565f6d8e7d024097db8ea533ae97b43248551`.
- Result QA launch baseline v2 SHA-256: `2533f6962a1e2509dd1f2a8080ec4b295cb7027a612b975f763278c8fe392d7e`.
- Producer-independent Result QA v2 SHA-256: `595dca2d5a3f4bb0ba9161b4c93599513c478ea4e2ff2acfc2a94ef42643ea8c`.
- Result QA v2 decision: `STRICT PASS`.

## Main-Thread Independent Review

The main thread inspected primary source, tests, the prior P1 evidence, the focused implementation report, and the producer-independent Result QA. It did not accept the executor or evaluator verdict without direct checks.

The four authorized defects are closed:

1. install-state ownership must exactly reconcile with the validated installed immutable inventory before it can authorize backup, replacement, or deletion; forged in-namespace ownership and a forged current-state hash now terminate with `UNVERIFIABLE_INSTALL_STATE` and no mutation;
2. successful rename and unlink mutations are recorded immediately at the mutation boundary, so later verification failures truthfully classify the affected path as changed;
3. Git object metadata discovery uses the common observer for each recursive `readdir` and `lstat`, while adjacent target content remains outside discovery;
4. malformed managed markers throw the canonical lifecycle `INVALID_MANAGED_MARKER` conflict and do not produce a derivative `IO_UNAVAILABLE`.

The corresponding regression tests distinguish the prior rejected behavior from the accepted behavior. No unrelated refactor or write-set expansion was found.

## Acceptance Criteria

- T2-AC1 through T2-AC20: `PASS`.
- Package identity: `@guoxiaoshuai2023/oh-my-harness`.
- Binary identity: `oh-my-harness`.
- Lifecycle runtime: Node standard library only, Node `v24.14.0` used for controlling validation.
- Python boundary: the three Python helper validators remain required payload; Python is not required to launch install/update/uninstall.
- AC-pass-but-user-fail checks: forged ownership deletion, backup bypass, false unchanged reporting, marker-conflict masking, AGENTS outer-byte drift, unowned adoption, and premature success state were all rejected or not observed.

## Validation Evidence

Main-thread controlling checks:

- focused lifecycle/security suite: `36/36 PASS`;
- full Task 1 and Task 2 suite before Result QA: `60/60 PASS`;
- `npm run validate:package`: PASS, primary status `0`, cleanup failure `false`;
- package archive: 53 files, SHA-256 `61ca3f512b9ce6b9622bebcb63be79f79c125ff22715d742ce550a4559da1488`;
- packed install, same-version install no-op, update no-op, and uninstall: status `0` each;
- original dirty baseline: `85/85` exact matches;
- Task 1 implementation: `12/12` accepted hashes match;
- Task 2 candidate: `14/14` final hashes match the QA launch baseline;
- tracked, staged, and committed branch deltas: empty;
- `git diff --check` and cached check: PASS;
- repository archive/cache/temp/sentinel residue: none found.

The producer-independent evaluator additionally ran direct custom probes for each original P1, the full 60-test suite, offline npm tests, isolated package validation, package/runtime-boundary checks, and protected inventory checks. It reported no P0, P1, or non-blocking finding.

## Scope And Remaining Boundaries

- Exactly six authorized Task 2 files changed from the focused rejected-candidate baseline: four installer modules and two regression-test files.
- The other eight Task 2 implementation files remained byte-identical.
- Task 1 remained byte-identical and accepted.
- Task 3 and Task 4 did not start.
- No stage, commit, push, PR, npm publication, registry authentication, secret access, or external target mutation occurred.

Not validated because Contract v5 excludes it: real downstream-repository mutation, registry publication/authentication/signing, global installation, process-kill or power-loss recovery, generalized migration/concurrency, unsupported Git layouts, and execution of Python helpers as lifecycle commands.

## Final Decision

Task 2 is accepted as `PASS` under Accepted Contract v5. The resumed one-cycle budget is consumed and closed successfully. No further Task 2 retry is authorized or required by this decision.
