# Task 1 Main-Thread Decision

Identity: `universal-harness-adoption-task-1-main-thread-decision-20260712-v1`

Decision: `FAIL`

## Independent Finding Disposition

The Result QA P1 finding is accepted. Main-thread reproduction built the candidate bundle with the exact frozen Node 24 executable and directly observed these generated support-README lines:

```text
cp -R docs/agent-routing "$TARGET/docs/"
cp -R task-docs/_harness "$TARGET/task-docs/"
```

Neither bare source path exists in the output tree or immutable inventory. The passing test suite and producer report therefore overstate T1-AC6 reference closure.

## Failure Origin And Routing

- Failure origin: Task 1 contract/reference-authority insufficiency.
- The accepted v4 rewrite table authorizes slash-terminated directory forms but not these bare forms.
- Repair would require a revised, versioned Task 1 boundary with complete source-reference policy and negative fixtures.
- The current executor may not guess or expand the rewrite authority.
- No implementation repair or revised contract was started in this decision step.

## Criterion Decision

- T1-AC1 through T1-AC5: `PASS`
- T1-AC6: `FAIL`
- T1-AC7 through T1-AC11: `PASS`
- Overall Task 1: `FAIL`

## State And Scope

- The 12 candidate implementation files remain in their authorized Task 1 roots for evidence and potential revised-boundary work; they are not accepted Task 1 output.
- Protected source and pre-run untracked manifests still verify.
- Tracked and staged deltas remain empty.
- No commit, push, PR, publication, authentication, secret access, target mutation, or external write occurred.
- Tasks 2, 3, and 4 did not begin and are not authorized by this failed result.
