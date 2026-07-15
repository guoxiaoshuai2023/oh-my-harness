# PR #7 Root-Swap TOCTOU Finding Disposition

Identity: `universal-harness-adoption-pr7-root-toctou-finding-disposition-20260715-v1`

Status: `ACCEPTED RESIDUAL CONCURRENCY RISK`

PR head evaluated: `71c1299d1a2d86982c6972c48cf63ffe8881ed11`

## Finding

The producer-independent PR reviewer correctly observed a narrow time-of-check/time-of-use window: after the installer completes its final root and parent-path checks, a concurrently privileged process could replace the target root or a parent before the following path-based `open`, `rename`, or `unlink` syscall.

The risk is real. This disposition does not claim that the implementation eliminates it.

## Frozen Authority

- Requirements: `universal-harness-adoption-requirements-20260712-v5`, SHA-256 `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`.
- Accepted Task 2 parent boundary: `universal-harness-adoption-task-2-contract-20260712-v5`, SHA-256 `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`.
- Accepted Task 2 amendment: `universal-harness-adoption-task-2-contract-20260714-v7`, SHA-256 `467430f88c949af76591eee6ac76c453b2f7986a81acd0c0973fa0758d7d7b94`.
- Substantive user decision dated 2026-07-15: assess the finding against the frozen MVP threat model, accept the post-check/pre-syscall race as a residual concurrency risk when that model does not require adversarial atomic containment, and do not attempt to close it with additional `lstat` or recheck calls.

The requirements require the installer to canonicalize the target root, reject discovered symlinks and unsupported filesystem objects, and revalidate containment and path type immediately before each mutation. The observable checks and STOP behavior are mandatory. The same requirements explicitly exclude concurrent installer coordination. The accepted Task 2 boundary likewise excludes generalized concurrency and locking.

Neither frozen authority promises atomic resistance to a malicious concurrent process that changes the filesystem hierarchy after the final check but before the mutation syscall.

## Technical Boundary

The current implementation rechecks the pinned root identity and full parent chain after the test instrumentation hook and immediately before mutation. It uses Node standard-library no-follow and exclusive flags where applicable.

Node's public cross-platform standard library does not expose descriptor-relative `openat`, `renameat`, or `unlinkat` APIs that could pin the checked directory hierarchy through the mutation syscall. Fully eliminating the reported race would therefore require a native or operating-system-specific mutation architecture and a broader dependency, portability, and implementation authority decision.

Adding another path check would only move the race window and is not an accepted fix.

## Decision And Residual Risk

The finding is not a blocking defect under the frozen MVP threat model. It is accepted as a real residual concurrency risk:

- a malicious or concurrently privileged local process may redirect a mutation by replacing the target root or parent hierarchy during the final check-to-syscall window;
- the installer is not represented as providing adversarial atomic containment;
- every unsafe root, symlink, special file, containment failure, or target mismatch observed by the required checks must still STOP the operation;
- exact-path ownership, write confinement, and truthful failure reporting remain mandatory and are not waived.

If adversarial atomic containment becomes a product requirement, this finding must be reopened under an expanded architecture boundary. It must not be addressed by accumulating more path rechecks inside the current design.

## Delivery Consequence

The previous reviewer finding is dispositioned as non-blocking only within this explicit threat-model boundary. A fresh read-only PR review must evaluate the complete current diff against the frozen requirements, accepted contract, and this disposition. It must FAIL if the frozen authority actually requires adversarial atomic containment or if the implementation fails the mandatory pre-mutation checks and STOP behavior.
