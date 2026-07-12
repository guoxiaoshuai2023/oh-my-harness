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

## Delegated Write Boundaries

- Every delegated write attempt must cite a stable authoritative boundary that identifies the objective, allowed writes, protected state, required evidence, and stop conditions.
- The producer must not edit or reinterpret its controlling boundary. A material boundary change stops the attempt and requires a new identity or version.
- A concise stable packet may govern LOW-risk single-context work. Use a frozen or versioned boundary for MEDIUM/HIGH semantic risk affecting the result, HIGH operational risk or high-impact external writes, cross-context or dependent writes, protected paths or shared mutable state, or credible boundary drift.
- Preserve unrelated work with before/after hashes or a changed-path baseline when a final diff cannot distinguish pre-existing or untracked state.

## Templates And Protocols

Harness templates and protocols are behavior-shaping artifacts. Changes to them can affect future agents, so:

- Keep wording precise.
- Preserve modal force when migrating rules.
- Avoid project-specific examples in generic templates unless clearly marked as examples.
- Update route fixtures when route triggers or paths change.
- Update adoption docs when the migration process changes.

## Generated Artifacts

Generated artifacts should be reproducible or clearly labeled as one-time evidence. Do not treat generated output as authoritative if the generator inputs, command, or timestamp are missing.
