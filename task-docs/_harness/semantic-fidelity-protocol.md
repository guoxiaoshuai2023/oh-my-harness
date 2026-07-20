# Semantic Fidelity Protocol

Read this protocol for MEDIUM/HIGH Semantic Risk, cross-surface work, subjective quality, current-user-value drift, Pass A/Pass B planning review, Technical Solution Design review, Result QA, or a credible AC-pass-but-user-fail risk. The adaptive orchestration protocol owns capability selection; this protocol owns semantic gates that remain mandatory in any selected topology.

## Risk And Authority

- Operational Risk covers write impact, publish, delete, permission, payment, key, data, reversibility, and recovery.
- Semantic Risk covers wrong compression, replacement, omission, route substitution, invented preference, or loss of user intent.
- LOW semantic-risk mechanical work stays direct and proportional when no other gate triggers.
- MEDIUM/HIGH work binds an Original Request Anchor from verbatim user language, exact requirements, or source excerpts. A planner summary is not a substitute.
- HIGH or multi-task cross-surface work binds one run-level Outcome Contract stating the user goal/non-goals, required outcomes, forbidden substitutions, protected state, required evidence, stops, and stable identity. It is an upstream semantic Boundary, not an execution-permission stage or delivery Task.
- Current user decision outranks current accepted Requirements, which outrank the current Run Outcome, Frozen Task Plan, accepted Technical Solution Design when triggered, and main-issued attempt Boundary. Context, Board, packet, report, receipt, disposition, state, and message cannot invent upstream authority.

## Pass A And Pass B

MEDIUM/HIGH Plan evaluation uses two independent views:

1. Pass A reads only the Original Request Anchor, current-state/safety context, and repository facts. It produces an invocation-specific immutable baseline before receiving planner-authored content.
2. Main exact-hash-binds the original Pass A report. Pass B reads that frozen baseline, one Plan candidate, current upstream, acceptance criteria/evidence, and applicable routed rules.

Pass B checks result fidelity, non-goals, delivery-unit validity, ownership, dependency closure, feasibility, evidence, negative signals, consumer/revalidation, and credible user-failure states. Main alone dispositions findings and transitions the Plan.

## Outcome And Task Closure

Every delivery Task closes:

- observable user-valued result and explicit non-goals;
- owner and decision owner;
- prerequisites and dependency order;
- acceptance criteria and primary evidence;
- discriminating failure signal, including credible AC-pass-but-user-fail behavior;
- protected upstream/downstream and downstream consumer/revalidation;
- blocker, supersession, obsolete, cancellation, and accepted-output conditions;
- Technical Solution Design trigger based on execution uncertainty.

Prompts, schemas, filenames, roles, counts, PASS labels, and intermediate artifacts cannot substitute for the result unless that artifact is itself the user-valued outcome.

Subjective, preference-bound, aesthetic, or irreversible results must name the observable artifact, evaluation dimensions, evidence, and decision owner. If standards are missing or insufficient, stop and return to the user. Main may decide only under an exact frozen user-authorized rubric; evaluators remain advisory and never invent a preference or own final acceptance.

### Executable Acceptance And Subjective Authority

Acceptance closure requires a physically read-back Task identity, observable result, and complete closure fields, plus a physically read-back, nonempty, exact AC-to-primary-evidence-to-expectation/path-to-owner-to-consumer/revalidation ledger. Every AC has exactly one owned ledger row and no row remains unresolved. A prompt, schema, filename, template, role, count, report, intermediate artifact, hash, parse result, command exit, or caller boolean may support the result but cannot replace the Task/result/ledger bytes. A structurally complete Task with only proxy observation stops.

For subjective work, the physically read-back observable artifact, evaluation dimensions, primary artifact evidence, preference source, decision owner, exact frozen user-authorized rubric, delegation scope, advisory evaluator report, strict decision path, and main decision are all hash-bound material evidence. An evaluator claim to final authority always stops. If standards are missing or insufficient, dimensions remain unresolved, delegation is absent, or the main decision falls outside the delegated rubric, the decision returns to the user. Main may decide only inside the exact delegated rubric; neither main nor evaluator may invent a preference or fill a missing rubric. Caller booleans cannot substitute for any artifact, rubric, report, or decision bytes.

### Complete-Run Learning Evidence

A learning trigger does not make evidence sufficient. Before any formal retrospective or case candidate, main physically reads and hash-binds the current Run/end/scan/authority/contract identities; evidence for every selected trigger; an ordered factual timeline; reproduction or deterministic replay with environment boundary, expected signal, and observed signal; root-cause evidence and unresolved alternatives; applicability, duplicate, owner, routing, side-effect, protected-state, privacy/redaction, and currentness facts. Missing timestamps and unresolved causes remain labelled missing or unresolved. Evidence stores safe references and hashes, not raw private or sensitive values; a hash never grants permission to read protected content.

Privacy and safety outrank learning value, evidence conflict outranks insufficiency, and insufficiency outranks candidate creation. Sensitive access outside authority, copied private content, or inability to form a safe reference stops. Hash, owner, currentness, trigger, terminal, or protected-state conflict stops. Missing, stale, corrupt, fabricated, placeholder, or incomplete evidence yields no candidate. Only complete current privacy-safe physical readback is sufficient. A missing human promotion preference is not evidence insufficiency and is never fabricated.

The adjacent records are the executable projection of this semantic source. They provide results to the generic interpreter; templates only declare inputs and evidence interfaces. A prose/record mismatch is strict FAIL.

<!-- oh-my-harness-work-truth:v1:start -->
{"version":1,"id":"acceptance.actual-result","domain":"acceptance-proxy","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":10,"when":{"op":"all","conditions":[{"op":"exists","fact":"taskObservationIdentity"},{"op":"sameHash","left":"taskObservationIdentity","right":"taskExpectedIdentity"},{"op":"eq","fact":"taskIdentityObserved","value":true},{"op":"eq","fact":"actualResultObserved","value":true},{"op":"eq","fact":"closureFieldsComplete","value":true},{"op":"exists","fact":"ledgerObservationIdentity"},{"op":"sameHash","left":"ledgerObservationIdentity","right":"ledgerExpectedIdentity"},{"op":"eq","fact":"ledgerObserved","value":true},{"op":"eq","fact":"ledgerNonempty","value":true},{"op":"eq","fact":"uniqueAcOwnership","value":true},{"op":"eq","fact":"ledgerExactAgainstTask","value":true},{"op":"eq","fact":"unresolvedLedgerRows","value":false},{"op":"eq","fact":"proxyOnly","value":false}]},"result":{"eligible":true,"code":"ACTUAL_RESULT_CLOSED"}}
{"version":1,"id":"acceptance.proxy-stop","domain":"acceptance-proxy","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":20,"when":{"op":"eq","fact":"proxyOnly","value":true},"result":{"eligible":false,"code":"RESULT_PROXY_STOP"}}
{"version":1,"id":"acceptance.incomplete-stop","domain":"acceptance-proxy","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":100,"when":{"op":"all","conditions":[]},"result":{"eligible":false,"code":"ACCEPTANCE_INCOMPLETE_STOP"}}
{"version":1,"id":"subjective.evaluator-final-stop","domain":"subjective-authority","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":1,"when":{"op":"eq","fact":"evaluatorClaimsFinal","value":true},"result":{"decisionOwner":"user","accept":false,"code":"EVALUATOR_FINAL_AUTHORITY_STOP"}}
{"version":1,"id":"subjective.main-delegated","domain":"subjective-authority","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":10,"when":{"op":"all","conditions":[{"op":"eq","fact":"standardsSufficient","value":true},{"op":"eq","fact":"rubricFrozen","value":true},{"op":"eq","fact":"rubricDelegatesMain","value":true},{"op":"exists","fact":"artifactObservationIdentity"},{"op":"sameHash","left":"artifactObservationIdentity","right":"artifactExpectedIdentity"},{"op":"sameHash","left":"reportArtifactIdentity","right":"artifactObservationIdentity"},{"op":"sameHash","left":"decisionArtifactIdentity","right":"artifactObservationIdentity"},{"op":"readbackMatches","actualFact":"artifactDimensions","expectedFact":"rubricDimensions"},{"op":"readbackMatches","actualFact":"artifactDimensions","expectedFact":"reportDimensions"},{"op":"eq","fact":"primaryEvidenceObserved","value":true},{"op":"eq","fact":"preferenceSourceObserved","value":true},{"op":"eq","fact":"decisionOwnerObserved","value":true},{"op":"exists","fact":"rubricObservationIdentity"},{"op":"sameHash","left":"rubricObservationIdentity","right":"rubricExpectedIdentity"},{"op":"sameHash","left":"reportRubricIdentity","right":"rubricObservationIdentity"},{"op":"sameHash","left":"decisionRubricIdentity","right":"rubricObservationIdentity"},{"op":"eq","fact":"delegationScopeObserved","value":true},{"op":"exists","fact":"advisoryReportObservationIdentity"},{"op":"sameHash","left":"advisoryReportObservationIdentity","right":"advisoryReportExpectedIdentity"},{"op":"sameHash","left":"decisionReportIdentity","right":"advisoryReportObservationIdentity"},{"op":"eq","fact":"strictDecisionPathObserved","value":true},{"op":"exists","fact":"mainDecisionObservationIdentity"},{"op":"sameHash","left":"mainDecisionObservationIdentity","right":"mainDecisionExpectedIdentity"},{"op":"eq","fact":"mainDecisionWithinDelegation","value":true},{"op":"eq","fact":"evaluatorAdvisoryOnly","value":true},{"op":"eq","fact":"unresolvedDimensions","value":false},{"op":"eq","fact":"evaluatorClaimsFinal","value":false}]},"result":{"decisionOwner":"main","accept":"main-decision-required","code":"FROZEN_RUBRIC_DELEGATES_MAIN"}}
{"version":1,"id":"subjective.return-user","domain":"subjective-authority","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":20,"when":{"op":"any","conditions":[{"op":"eq","fact":"standardsSufficient","value":false},{"op":"eq","fact":"rubricFrozen","value":false},{"op":"eq","fact":"rubricDelegatesMain","value":false},{"op":"eq","fact":"delegationScopeObserved","value":false},{"op":"eq","fact":"mainDecisionWithinDelegation","value":false},{"op":"eq","fact":"unresolvedDimensions","value":true}]},"result":{"decisionOwner":"user","accept":false,"code":"RETURN_TO_USER"}}
{"version":1,"id":"subjective.incomplete-stop","domain":"subjective-authority","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":100,"when":{"op":"all","conditions":[]},"result":{"decisionOwner":"user","accept":false,"code":"SUBJECTIVE_AUTHORITY_INCOMPLETE_STOP"}}
{"version":1,"id":"run-learning.evidence-index","domain":"run-learning-evidence","kind":"projection","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","fields":["runIdentity","terminalObservationIdentity","scanIdentity","authorityIdentity","contractDigest","triggerEvidence","timeline","replayProcedure","environmentBoundary","expectedFailureSignal","actualFailureSignal","rootCauseEvidence","alternativeHypotheses","applicabilityInputs","duplicateInputs","ownerRouting","sideEffectBoundary","privacyClassifications","protectedManifestIdentity","currentnessIdentity"],"forbiddenFields":["rawSecrets","rawPrivateContent","fabricatedTimeline","callerEvidenceSufficient"]}
{"version":1,"id":"run-learning.evidence-privacy-stop","domain":"run-learning-evidence","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":1,"when":{"op":"any","conditions":[{"op":"eq","fact":"sensitiveAccessOutsideAuthority","value":true},{"op":"eq","fact":"copiedSensitiveContent","value":true},{"op":"eq","fact":"safeEvidenceReferencesEstablished","value":false}]},"result":{"sufficient":false,"createCandidate":false,"code":"PRIVACY_SAFETY_STOP"}}
{"version":1,"id":"run-learning.evidence-conflict-stop","domain":"run-learning-evidence","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":2,"when":{"op":"any","conditions":[{"op":"eq","fact":"identityConflict","value":true},{"op":"eq","fact":"ownerConflict","value":true},{"op":"eq","fact":"triggerTerminalConflict","value":true},{"op":"eq","fact":"protectedDelta","value":true}]},"result":{"sufficient":false,"createCandidate":false,"code":"EVIDENCE_CONFLICT_STOP"}}
{"version":1,"id":"run-learning.evidence-insufficient","domain":"run-learning-evidence","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":3,"when":{"op":"any","conditions":[{"op":"eq","fact":"evidenceFieldsComplete","value":false},{"op":"eq","fact":"identitiesCurrent","value":false},{"op":"eq","fact":"fabricatedPlaceholder","value":true},{"op":"eq","fact":"physicalReadbackComplete","value":false}]},"result":{"sufficient":false,"createCandidate":false,"code":"EVIDENCE_INSUFFICIENT_NO_CANDIDATE"}}
{"version":1,"id":"run-learning.evidence-sufficient","domain":"run-learning-evidence","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":10,"when":{"op":"all","conditions":[{"op":"eq","fact":"safeEvidenceReferencesEstablished","value":true},{"op":"eq","fact":"evidenceFieldsComplete","value":true},{"op":"eq","fact":"identitiesCurrent","value":true},{"op":"eq","fact":"physicalReadbackComplete","value":true},{"op":"eq","fact":"fabricatedPlaceholder","value":false},{"op":"eq","fact":"identityConflict","value":false},{"op":"eq","fact":"ownerConflict","value":false},{"op":"eq","fact":"triggerTerminalConflict","value":false},{"op":"eq","fact":"protectedDelta","value":false},{"op":"eq","fact":"sensitiveAccessOutsideAuthority","value":false},{"op":"eq","fact":"copiedSensitiveContent","value":false}]},"result":{"sufficient":true,"createCandidate":true,"code":"EVIDENCE_SUFFICIENT"}}
{"version":1,"id":"run-learning.evidence-incomplete-stop","domain":"run-learning-evidence","kind":"decision","sourceOwner":"task-docs/_harness/semantic-fidelity-protocol.md","priority":100,"when":{"op":"all","conditions":[]},"result":{"sufficient":false,"createCandidate":false,"code":"EVIDENCE_INCOMPLETE_STOP"}}
<!-- oh-my-harness-work-truth:v1:end -->

## Technical Solution Design Fidelity

Technical Solution Design is selected only for material execution uncertainty. It specifies the chosen implementation path, predicted affected surfaces, order/dependencies, state/error/failure handling, irreversible points, validation/negative probes, and return-upstream conditions. Predicted impact is not attempt permission.

The Solution Designer produces one Design candidate and the Solution Evaluator reviews exactly that candidate. Neither changes the Frozen Task result, scope, owner, dependencies, ACs, evidence, failure signal, or consumer. Neither creates or reviews an attempt Boundary, permission artifact, lifecycle decision, or agent invocation. Main derives and freezes the Boundary after Design acceptance.

## Current-State And Semantic Evidence

When existing behavior, generated output, live data, or current configuration affects correctness, inspect fresh current state. LOW needs the smallest deterministic check; MEDIUM needs focused before/after evidence; HIGH needs enough primary evidence to rule out drift, stale assumptions, and unintended impact.

A credible AC-pass-but-user-fail counterexample belongs in ACs, evidence, stops, or evaluator loops. Duplicate coverage is valid only when force, trigger, stop condition, forbidden action, required action, owner, and safety boundary are equivalent. Topic similarity, file existence, parsing, counts, and structural fixtures are supporting evidence only.

## Independent Judgment And Stops

HIGH Semantic Risk requires producer-independent semantic judgment against the controlling Anchor, Outcome, accepted Task/Design, actual result, and primary evidence before main final acceptance. The verifier issues strict PASS or FAIL, never PASS with caveats, and cannot repair the target or accept it.

Stop and return to the true owner when current authority conflicts, a material source or preference is missing, a downstream layer would patch upstream intent, present state contradicts the plan, a proxy is proposed as the result, a semantic gate lacks owner/evidence/decision, or structural success contradicts an end-to-end or negative probe. No waiver, count, role, report, or test command cures a semantic contradiction.
