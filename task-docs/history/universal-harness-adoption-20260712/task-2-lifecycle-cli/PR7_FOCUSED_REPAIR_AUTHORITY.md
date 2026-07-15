# PR #7 Focused Repair Authority And Schema v1 Amendment

Identity: `universal-harness-adoption-pr7-focused-repair-authority-20260715-v1`

Status: `ACTIVE DIRECT USER AUTHORITY`

## Authority

This amendment records the user's substantive decision to resolve the four P1 findings from the full PR review without reopening the complete v2 loop.

It is subordinate to the frozen requirements and changes neither the Universal Harness Adoption product scope nor the accepted lifecycle architecture:

- requirements: `universal-harness-adoption-requirements-20260712-v5`, SHA-256 `b38ce58bef4046d5b1b70ade5198eddfcaa3ebea2fd53b820acb0e63c407cb0d`;
- accepted Task 2 parent boundary: `universal-harness-adoption-task-2-contract-20260712-v5`, SHA-256 `6b449cd7cd8e06f8dc16d9c5ab089b722ff82915538b2e72b1d6019e33f3ea9f`;
- accepted Task 2 amendment: `universal-harness-adoption-task-2-contract-20260714-v7`, SHA-256 `467430f88c949af76591eee6ac76c453b2f7986a81acd0c0973fa0758d7d7b94`;
- accepted root-swap residual-risk disposition: `universal-harness-adoption-pr7-root-toctou-finding-disposition-20260715-v1`, SHA-256 `abf1381a50b1565f4f5222ab555cc6d0cfddf77dbca1c7d9c72bc6e326d526a0`.

The direct repair authority is limited to:

- propagating an observed unsafe managed-directory condition as a lifecycle failure;
- making temporary Git-view cleanup failure terminate planning;
- adding direct regression tests for those behaviors;
- defining `managedDirectories` as part of the first unpublished schema v1 authority; and
- refreshing the current Task 2 and affected Task 4 implementation hashes after complete validation.

No dependency, package identity change, runtime expansion, generalized concurrency architecture, publication, or unrelated behavior change is authorized.

## Schema v1 Amendment

No npm package or install-state schema from this project has been publicly released. The first released `install-state.json` schema remains integer version `1`. The closed top-level schema in Section 9 of the parent Task 2 boundary is amended to include this field immediately after `ownedFiles`:

```text
managedDirectories: sorted unique array of validated repo-relative directory paths
```

Its normative semantics are:

- an entry records a managed parent directory actually created by this Harness installation;
- the array may be empty and is sorted with the canonical UTF-8 byte comparator;
- an entry does not confer ownership over the directory's contents;
- update carries forward validated recorded entries and may add only newly created managed parents;
- uninstall considers recorded directories deepest-first and removes one only when it is still safely contained, is a regular directory, and is empty;
- a pre-existing, unrecorded, non-empty, or already absent directory is preserved or treated as absent as applicable;
- an observed symlink, special file, root mismatch, containment failure, or unsafe parent is a terminating lifecycle failure and must not be converted into successful preservation;
- `install-state.json` still does not record or hash itself, and all other schema v1 keys and exact-key rules remain unchanged.

Because this amendment defines the first unpublished schema rather than migrating a released state format, it does not add compatibility coercion, migration, or schema guessing. A future incompatible released-state change must increment the schema as already required by the parent boundary.

## Finding Disposition

1. Observed unsafe-directory failures are implementation defects and must propagate as failure.
2. `managedDirectories` is authorized by this amendment and is no longer an additional-key violation in the first unpublished schema v1.
3. The prior Task 2 and Task 4 evidence chains remain historical; a new current evidence chain must bind the post-repair hashes instead of claiming that old hashes still match.
4. Temporary Git-view cleanup failure is an implementation defect and must not return a successful overlap result.

The post-check/pre-syscall adversarial replacement window remains only the explicitly documented residual concurrency risk. This amendment does not claim to eliminate it and does not authorize additional `lstat` loops as a substitute for descriptor-relative system calls.
