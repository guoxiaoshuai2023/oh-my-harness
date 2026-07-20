# Complete-Run Retrospective And Negative-Case Candidate

Use this optional template only after the source decisions select `CREATE_RUN_RETROSPECTIVE_AND_CANDIDATE` for one non-trivial terminal Run with a defined trigger and sufficient privacy-safe primary evidence. A clean scan creates no file or directory from this template.

This template is an evidence shape, not a decision record. It cannot promote a case, authorize a Harness or package change, create a global rule, start an agent/Loop/Task/enhancement, or substitute for independent review, main disposition, explicit human disposition, a human-authorized case custodian, a new Task, or a main-issued Boundary. Never copy secrets or raw private content; bind safe references and hashes instead.

## Retrospective

- identity: `{{identity}}`
- status: `{{status}}`
- sourceRunIdentity: `{{sourceRunIdentity}}`
- terminalState: `{{terminalState}}`
- scanIdentity: `{{scanIdentity}}`
- authorityIdentities: `{{authorityIdentities}}`
- evidenceIndexIdentity: `{{evidenceIndexIdentity}}`
- facts: `{{facts}}`
- timeline: `{{timeline}}`
- replayProcedure: `{{replayProcedure}}`
- actualFailureSignal: `{{actualFailureSignal}}`
- rootCause: `{{rootCause}}`
- uncertainty: `{{uncertainty}}`
- candidateIdentity: `{{candidateIdentity}}`
- privacySafety: `{{privacySafety}}`
- routingRecommendation: `{{routingRecommendation}}`
- noAuthorityDeclarations: `{{noAuthorityDeclarations}}`

## Per-Run Negative-Case Candidate

- identity: `{{identity}}`
- status: `{{status}}`
- sourceRunIdentity: `{{sourceRunIdentity}}`
- terminalIdentity: `{{terminalIdentity}}`
- scanIdentity: `{{scanIdentity}}`
- retrospectiveIdentity: `{{retrospectiveIdentity}}`
- triggerIds: `{{triggerIds}}`
- facts: `{{facts}}`
- evidenceReferences: `{{evidenceReferences}}`
- timeline: `{{timeline}}`
- replayProcedure: `{{replayProcedure}}`
- actualFailureSignal: `{{actualFailureSignal}}`
- rootCauseLayers: `{{rootCauseLayers}}`
- applicabilityPredicates: `{{applicabilityPredicates}}`
- generalizationBoundary: `{{generalizationBoundary}}`
- nonApplicabilityBoundary: `{{nonApplicabilityBoundary}}`
- duplicateComparison: `{{duplicateComparison}}`
- privacySafety: `{{privacySafety}}`
- proposedOwnerRoute: `{{proposedOwnerRoute}}`
- expectedSideEffects: `{{expectedSideEffects}}`
- noAuthorityDeclarations: `{{noAuthorityDeclarations}}`

## Independent Review And Human Boundary

- The existing Result Evaluator may be fact-selected for review type `run-learning-case-review` and writes only one unique report.
- Main verifies the report and dispositions routing; strict PASS or FAIL is evidence only.
- Only a later explicit human disposition, executed by a named human-authorized case custodian under a separate authorized action, may mutate the source-only central case library.
- Central cases and per-run learning stay outside default installed/package inventory.
- Case evidence can inform a later human decision to authorize a separate Harness Task; it never authorizes or launches that Task itself.

Terminal self-hash boundary: the writer does not predict this artifact's final SHA-256. The responsible main/custodian computes and binds it after physical readback.
