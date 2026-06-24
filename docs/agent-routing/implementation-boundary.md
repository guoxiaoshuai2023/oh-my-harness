# Implementation Boundary Routing

Read this doc for code changes, documentation changes, template changes, generated assets, dependency decisions, minimal diffs, or no-unrelated-refactor boundaries.

## Minimal Boundary

- Touch only files required by the accepted task.
- Reuse existing project patterns before adding new abstractions.
- Do not refactor, format, rename, reorganize, or clean up adjacent code unless required to complete the task.
- Do not delete unrelated dead code.
- Remove only imports, variables, functions, files, or generated artifacts caused by your own changes.
- Every changed line must trace to the user request, the accepted contract, or a necessary consequence of that request.

## Dependencies

- Do not add dependencies by default.
- Add a dependency only when it is necessary, lower risk than local implementation, and explicitly approved.
- Prefer standard library or existing repo tooling for harness scripts.
- If a dependency is added, document why, where it is used, and how it was validated.

## Templates And Protocols

Harness templates and protocols are behavior-shaping artifacts. Changes to them can affect future agents, so:

- Keep wording precise.
- Preserve modal force when migrating rules.
- Avoid project-specific examples in generic templates unless clearly marked as examples.
- Update route fixtures when route triggers or paths change.
- Update adoption docs when the migration process changes.

## Generated Artifacts

Generated artifacts should be reproducible or clearly labeled as one-time evidence. Do not treat generated output as authoritative if the generator inputs, command, or timestamp are missing.
