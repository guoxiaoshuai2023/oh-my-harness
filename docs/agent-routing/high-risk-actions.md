# High-Risk Actions Routing

Read this doc before publish, deploy, delete, migration, restore, bulk write, irreversible change, permission change, billing/payment action, key/secret action, production write, or other high-impact action.

## High-Impact Stops

Stop before any high-impact action unless all are true:

- The exact action is in scope.
- The exact target is identified.
- The expected effect is described.
- A plan, preview, dry-run, or equivalent has been produced when available.
- The user explicitly confirms the exact action and target.
- Recovery, rollback, or backup has been considered when relevant.
- The action uses a frozen or versioned execution boundary that the producer cannot change during the attempt.
- Applicable post-action evidence and producer-independent verification are defined.

Generic approval is not enough for high-impact actions.

Producer-independent verification must inspect the applicable outcome, safety, and external-state evidence before main-thread final acceptance. The producer's self-review cannot satisfy this gate, and final acceptance does not replace it.

## Common High-Risk Categories

- Publish, deploy, release, or live traffic switch.
- Delete, truncate, purge, or archive.
- Restore, migration, or irreversible conversion.
- Bulk write or broad modification.
- Permission, billing, payment, key, secret, credential, or auth change.
- Production database or SaaS admin mutation.
- Changing default routes, navigation, access control, or customer-facing configuration.

## Backup And Restore

If the target project has a backup or restore runbook, read it before acting. If restore or migration is not explicitly supported by the current runbook, stop and create a separate task plan instead of improvising.

## Reporting

Reports must include:

- Action and target.
- Whether a dry-run/preview was performed.
- Confirmation status.
- Validation performed.
- Producer-independent verification and applicable post-action evidence.
- What was not validated.
- Remaining risk.

Reports must not include secret values or sensitive admin material.
