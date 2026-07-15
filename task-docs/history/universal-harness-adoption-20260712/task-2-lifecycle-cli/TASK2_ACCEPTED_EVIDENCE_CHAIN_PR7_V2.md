# Task 2 PR #7 Current Accepted Evidence Chain

Identity: `universal-harness-adoption-task-2-accepted-evidence-chain-20260715-v3`

Status: `ACCEPTED UNDER DIRECT USER AUTHORITY - PR DELIVERY REVIEW PENDING`

## Authority And Evidence

| Artifact | Identity | SHA-256 |
| --- | --- | --- |
| Frozen requirements | `universal-harness-adoption-requirements-20260712-v5` | `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d` |
| Accepted Task 2 parent boundary | `universal-harness-adoption-task-2-contract-20260712-v5` | `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f` |
| Accepted Task 2 amendment | `universal-harness-adoption-task-2-contract-20260714-v7` | `467430f88c949af76591eee6ac76c453b2f7986a81acd0c0973fa0758d7d7b94` |
| Root-swap residual-risk disposition | `universal-harness-adoption-pr7-root-toctou-finding-disposition-20260715-v1` | `abf1381a50b1565f4f5222ab555cc6d0cfddf77dbca1c7d9c72bc6e326d526a0` |
| Focused repair and schema authority | `universal-harness-adoption-pr7-focused-repair-authority-20260715-v1` | `2c420905e83ab473d707734a0550aadd9f0307d3f2e3462efde516a0364addcf` |
| Main-thread focused verification | `universal-harness-adoption-pr7-focused-repair-verification-20260715-v1` | `e29edc7f808e30d87dd2f6cb6fa3f320789db2d896c72763b017fdc33b1644c2` |

The prior evidence chain `universal-harness-adoption-task-2-accepted-evidence-chain-20260714-v2` remains immutable historical evidence for commit `fc5cddd`. It is superseded as current hash authority by this chain and must not be used to claim that later lifecycle, state, or test bytes still match.

## Current Task 2 Implementation Paths

| Path | SHA-256 |
| --- | --- |
| `package.json` | `4ac76602df29dcd335dcfa10caaa1a203682ce47862ee816123ca88e7eb70a74` |
| `package-lock.json` | `84d86095b95ad5c34529320c7bb531964f53be9025f137f17b091396400ec184` |
| `bin/oh-my-harness.mjs` | `b1e19bfac413012fd1b8c28b374b9469420ae44c8c552ebb23b4e96efec26df9` |
| `src/installer/cli.mjs` | `0eea231c0da370b0d69efbb52157208dd383350cd775fbcd2fd617a3a03c5d82` |
| `src/installer/filesystem.mjs` | `378dd9ad2d7bd7d26e7a1e80119a53c151a63534f8abdde8fff5eef503c730fc` |
| `src/installer/lifecycle.mjs` | `fca817f7a81947149e19139ea599fe3afaad66ebd23190f42b2dffb11a233621` |
| `src/installer/markers.mjs` | `0ed248f49d3fdf223409264704d452246a1a74ea7fd4ed5a0663828af43ae7d0` |
| `src/installer/package-bundle.mjs` | `df94880ea67c7f7f065b5ce3215a86e84dad4da8db9c2f871c0969ca28d0b85e` |
| `src/installer/state.mjs` | `4dece5d2b93f9937bbe1fddbfa88f16b71ec2373ce713ba935e4c11472bc17a8` |
| `test/lifecycle/cli.test.mjs` | `f83b172363e478a310abb75dddeecb39d6f6ecb3e66367a9686c10623111e12e` |
| `test/lifecycle/lifecycle.test.mjs` | `49504a3ed5e3305d39170e969f92e9c555f65654cb16a2e867d89a4754fe404a` |
| `test/lifecycle/package-validation.mjs` | `ef78beb199058a23a3e9eb3fb5a86933ddfe0f6512c97979b9b6d6ba784d0bea` |
| `test/lifecycle/security.test.mjs` | `6e326215298d433cc4e8ec97703040b4e195545edf55c48ff608487f97d043b1` |
| `test/lifecycle/test-helpers.mjs` | `f77ed80cc195d4d4b4bf908f256f19de1d976fa55763f928c97f0c19a845975e` |

## Affected Task 4 Acceptance Paths

| Path | SHA-256 |
| --- | --- |
| `test/acceptance/universal-adoption.test.mjs` | `0c357a1e58d5459097ed9383874e3199647e51f06f76fe4f1ef24e324f33c1c6` |
| `test/acceptance/scenario-matrix.mjs` | `c235d3213b74e7b7d8389459b80ad74344d8616a1372120f2815bd8a1158879d` |
| `tools/validate-release.mjs` | `269239ec97994daa4d1dcea791ff358a7cd32334ec0218a167a69a581af49d12` |

These Task 4 paths were not modified by the focused repair. Their current hashes are rebound because the old Task 4 acceptance artifact predates the direct PR repair commits. The complete acceptance suite (`28/28`) and release validator passed against the current Task 2 implementation.

## Accepted Current Result

- Detected unsafe managed-directory state terminates uninstall instead of becoming a successful preservation result.
- Temporary Git-view cleanup failure terminates planning instead of returning clean or overlap evidence.
- `managedDirectories` is a required exact field of the first unpublished schema v1 under the focused authority amendment.
- Standard package lifecycle, empty initialized Git support, exact overlap, package identity, payload/inventory semantics, and Task 1/Task 3 behavior remain unchanged.
- The absolute-path post-check/pre-syscall concurrency window remains an explicitly accepted residual risk and is not represented as eliminated.

Git delivery remains gated by one fresh read-only review of the focused repair diff and by hosted CI after push. This chain authorizes neither merge nor publication.
