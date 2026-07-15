# Task 2 Contract Resume Decision

Identity: `universal-harness-adoption-task-2-contract-resume-decision-20260712-v1`

Retry domain: `universal-harness-adoption-task-2-lifecycle-contract-20260712-rd1`

Prior exhaustion decision: `universal-harness-adoption-task-2-contract-exhaustion-decision-20260712-v1`

Prior exhaustion SHA-256: `31d4600b0ffd3c7a19d42e6b11e425161bf2388c6c096e3d780b40030dc326d4`

Status: `RESUMED FOR ONE CONTRACT/REVIEW CYCLE`

## Qualifying User Decision

The user made a substantive design decision that materially resolves the five open Task 2 contract premises:

1. Git overlap is limited to exact planned write paths through a read-only invocation that disables hooks, fsmonitor, optional locks, and submodule traversal; inability to prove no target-repo execution is a STOP. Non-Git repositories use filesystem evidence only.
2. `npm pack` validation runs under an OS temporary root with isolated cache/home and scripts, audit, fund, and update notifier disabled; repository archive/cache/metadata residue or cleanup failure is FAIL.
3. Apply performs final pre-write recheck, creates `.oh-my-harness/`, then exclusively/atomically writes and verifies an operation sentinel before payload mutation. A namespace created without a completed sentinel is observable incomplete/unowned state and must STOP on the next invocation.
4. Capturable failure cannot leave a new success claim. Fresh-install failure removes any fresh success state; update failure keeps the old accepted state and sentinel/filesystem mismatch marks it unhealthy. If a candidate new state was written and verification fails, restore the old state or delete the fresh state while retaining truthful incomplete evidence.
5. Plan and install state share one canonical JSON encoding: UTF-8, no BOM, recursive lexicographic object keys, fixed array ordering, two-space indentation, LF line endings, and one final newline. Plan SHA binds full canonical bytes without a self-hash field; install state never records or hashes itself.

This is qualifying new user authority, not a renamed retry or restatement of the failed v3 contract.

## Resume Boundary

- Maximum budget: one Task 2 contract production attempt and one fresh strict read-only contract review.
- Authorized write scope: this resume artifact, one new versioned Task 2 contract iteration, one review artifact, and, only after strict PASS, byte-identical accepted-boundary and boundary-manifest gate artifacts.
- Implementation write scope: none.
- Executor launch: prohibited in this resumed cycle.
- Task 3/4: prohibited.
- Git stage/commit/push, npm publication, registry authentication, secrets access, and external writes: prohibited.
- Prior contracts/reviews, requirements, plan, Task 1 chain, complete dirty baseline, and all implementation paths remain protected.

## Stop Rule

If the fresh strict review is `FAIL`, this retry domain immediately returns to `EXHAUSTED`. No automatic contract revision, second reviewer, implementation attempt, or downstream task may follow.

If the review is strict `PASS`, the main thread may freeze a byte-identical accepted boundary and manifest, then must stop. Executor authorization requires a later user instruction.

