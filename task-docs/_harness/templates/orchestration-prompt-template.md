# Adaptive Main-Thread Orchestration Prompt

Apply the oh-my-harness adaptive governance model to:

<USER_REQUEST>

## Preflight

1. Read AGENTS.md and only fact-triggered routes.
2. Reconstruct the user result/non-goals and exact controlling sources.
3. Classify Operational Risk and Semantic Risk separately.
4. Inspect fresh current state when present behavior affects correctness.
5. Record protected state, write/external authority, reversibility, dependencies, uncertainty, evidence needs, and AC-pass-but-user-fail risk.
6. Assign an owner, primary evidence, and decision to every triggered gate.
7. Stop for material ambiguity, missing authority, unsafe scope, conflicting current state, or a required user/product choice.
8. Select inline, Context, Board, and Task State independently from their factual triggers; do not create empty sibling artifacts.
9. When durable views participate, bind one main update identity, validate next bytes, publish/read back Task State → Board → Context, and stop on any conflict or partial publication.
10. After one non-trivial requirement Run reaches `accepted`, `blocked`, `exhausted`, or `stopped`, physically bind the terminal/evidence/persistence/history facts and consume the source scan decision exactly once. Task completion is not a Run end.
11. Keep a Context-absent first scan as canonical main-owned inline truth in the uninterrupted terminalization session. Before planned reentry or session end with continuing work, transfer those exact unchanged bytes to source-selected Context; lost history stops and never rescans. Board and Task State never own `failureScan`.
12. A clean scan creates no learning directory. Only a source trigger plus sufficient privacy-safe evidence may create the exact retrospective/candidate pair. Main separately selects the existing Result Evaluator for report-only case review and dispositions it; no review or main action is a human promotion.

## Select Capabilities From Facts

Optional registry: Requirements Author, Requirements Evaluator, Planner, Plan Evaluator, Solution Designer, Solution Evaluator, Executor, Result Evaluator, Orchestration Reviewer.

- Select the smallest fact-required subset. Record task-specific value for every selection and gate ownership for every omission.
- No named mode, fixed order, compatibility branch, role-count target, or automatic all-nine selection is valid.
- Dependency facts determine invocation order.
- LOW direct work with no trigger uses proportional validation and creates no invocation or durable governance artifact.
- HIGH risk requires all triggered controls, not all capabilities.
- Reassess topology when a premise, risk, dependency, Boundary, write set, or evidence path changes.
- For exact zero-write remaining work, derive verification-only selection from the current source registry and source topology decision, exclude its named Executor, and prove a zero-delta sentinel. If a write appears, stop without mutation and return to main.

## Main-Only Lifecycle

Only main selects/launches every invocation, issues/freezes Boundaries and packets, verifies artifacts/write scope, selects/launches evaluators, dispositions findings, controls retry/intervention/stop/unlock/transition, and accepts.

Every invoked capability is hard no-fan-out: it must not create, invoke, launch, delegate to, or reconfigure another agent. Peer messages are non-authoritative.

For formal producer/evaluator exchange:

1. main assigns an invocation and absent candidate path, packets exact upstream/protected state, then launches producer;
2. producer writes only its candidate and returns identity/path/completion;
3. main computes candidate hash and verifies identity, completion, upstream/protected state, and actual writes;
4. main assigns a new evaluator invocation and absent unique report path, binds exact target/upstream hashes and calibration, then launches evaluator;
5. evaluator reads exact primary evidence and writes only its report under a logical report-only write boundary plus post-execution verification;
6. main computes report hash, verifies report/target/upstream/protected scope, then dispositions findings and decides transition.

Integrity/binding failures outrank verdict. Operational/partial/unavailable output never unlocks. Recovery uses a new invocation/path; permission expansion needs explicit confirmation.

Complete-Run learning remains main-only and non-authoritative. Never let a retrospective, candidate, review, disposition, or central case mutate Harness/package/state, generate a global `MUST`, or start work. A central source case requires a later explicit human disposition and human-authorized custodian under a separately authorized action. A later Harness change additionally requires a new Task and main-issued Boundary. Per-run learning and central cases stay outside installed/package inventory.

## Technical Solution Design

Select Solution Design only for material execution uncertainty. Designer produces one concrete Technical Solution Design; evaluator reviews that Design only. Neither owns Boundary, permission, Task AC, lifecycle, or launch. Main derives the attempt Boundary after Design acceptance. Inline, packet-carried, and persisted/versioned Boundary forms retain allowed actions/paths, protected state, evidence, validation, stops, identity, and material-change rule.

## Finite Failure Control

Keep stage-local quality, cumulative retry-domain quality, and normalized-cause operational counters separate. First valid quality failure may get focused revision; second requires intervention before a third; post-intervention third exhausts. First same-cause operational failure may get one checked retry; second requires intervention before third; post-intervention third blocks/exhausts the path. Rename or topology change never resets a domain.

## Truthful Return

Report the result/scope, topology when material, invoked capabilities and integration, primary evidence, Boundary identities, validation, unvalidated areas, blockers, and uncertainty. Do not imply a role, artifact, QA, external action, readback, transition, or acceptance that did not occur.

The adjacent interface declares the orchestration facts and observations that must be supplied to the governing source decisions. It cannot authorize verifier writes or define a transition result.

<!-- oh-my-harness-work-truth:v1:start -->
{"version":1,"id":"interface.orchestration","domain":"interface:orchestration","kind":"interface","sourceOwner":"task-docs/_harness/templates/orchestration-prompt-template.md","requires":["persistence.inline","ownership.wrong-writer","publication.partial-stop","readiness.ready","task3.current","topology.verification-only","retry-control.quality-exhausted","run-learning.scan-storage-inline","run-learning.scan-history-unavailable","run-learning.scan-transfer","run-learning.triggered","run-learning.evidence-privacy-stop","run-learning.artifact-create","run-learning.review-valid","learning-change.automatic-stop","central-case.create","central-case.postimage-valid"],"emits":["persistenceFacts","stateOwnerAndActorFacts","stateTransitionFacts","publicationAndReadbackFacts","conflictFacts","currentnessFacts","remainingActionsAndWriteSet","topologyDecision","retryDecision","completeRunTerminalEvidenceFacts","scanStorageAndHistoryFacts","canonicalInlineOrContextScanObservation","continuityTransferAndReentryFacts","learningTriggerAndEvidenceFacts","retrospectiveCandidateObservation","caseReviewIntegrityObservation","humanCustodyFixtureObservation","learningChangeBarrierDecision"],"references":["contextBoardTaskStateIdentities","contractDigest","registryProfileHashes","mainUpdateIdentity","runAuthorityAndEvidenceHashes","caseCandidateAndReviewHashes","protectedAndPackageManifest"],"forbids":["verifierWrites","automaticUnlock","nonMainTransition","retryReset","fabricatedObservation","taskLevelRetrospective","boardOrTaskFailureScanOwner","automaticCasePromotion","automaticHarnessChange","automaticLearningLaunch"]}
<!-- oh-my-harness-work-truth:v1:end -->
