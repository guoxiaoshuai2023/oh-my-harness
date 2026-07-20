import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import {
  access,
  cp,
  lstat,
  mkdir,
  mkdtemp,
  readFile,
  realpath,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import {
  ROOT,
  copyWorkTruthSources,
  decide,
  loadWorkTruthContract,
  manifestDelta,
  manifestTree,
  project,
  sha256,
  validateEnum,
} from './t02-work-truth-fixtures.mjs';

export const RETROSPECTIVE_TEMPLATE = 'task-docs/_harness/templates/retrospective-case-template.md';
export const CANONICAL_ROOT = '/Users/yurendao45/Vibe Coding Projects/oh-my-harness';

export const REQUIRED_T03_IDS = Object.freeze([
  'run.end-vocabulary',
  'run-learning.scan-storage-context',
  'run-learning.scan-storage-inline',
  'run-learning.scan-transfer',
  'run-learning.triggers',
  'run-learning.evidence-index',
  'run-learning.artifact-create',
  'run-learning.review-valid',
  'learning-change.automatic-stop',
  'central-case.content',
  'central-case.create',
  'central-case.update',
  'central-case.merge',
  'central-case.downgrade',
  'central-case.reject',
  'central-case.supersede',
  'central-case.retire',
  'central-case.postimage-valid',
]);

function canonical(value) {
  if (Array.isArray(value)) return `[${value.map(canonical).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonical(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function canonicalBytes(value) {
  return Buffer.from(`${canonical(value)}\n`);
}

async function writeExclusive(absolute, bytes) {
  await mkdir(path.dirname(absolute), { recursive: true });
  await writeFile(absolute, bytes, { flag: 'wx' });
}

async function writeReplace(absolute, bytes) {
  await mkdir(path.dirname(absolute), { recursive: true });
  await writeFile(absolute, bytes);
}

async function observe(absolute) {
  const bytes = await readFile(absolute);
  return { bytes, hash: sha256(bytes), value: JSON.parse(bytes.toString('utf8')) };
}

async function observeOptional(absolute) {
  try {
    return await observe(absolute);
  } catch (error) {
    if (error?.code === 'ENOENT') return null;
    throw error;
  }
}

function manifestIdentity(manifest) {
  return sha256(canonical(manifest));
}

function sameSet(left, right) {
  return canonical([...left].sort()) === canonical([...right].sort());
}

function containsPlaceholder(value) {
  if (typeof value === 'string') return /\b(?:TBD|PLACEHOLDER|FABRICATED)\b/i.test(value);
  if (Array.isArray(value)) return value.some(containsPlaceholder);
  if (value !== null && typeof value === 'object') return Object.values(value).some(containsPlaceholder);
  return false;
}

export async function inspectT03SourceAvailability(sourceRoot = ROOT) {
  const contract = await loadWorkTruthContract(sourceRoot);
  const missingRecordIds = REQUIRED_T03_IDS.filter((id) => !contract.byId.has(id));
  let templatePresent = true;
  try {
    await access(path.join(sourceRoot, RETROSPECTIVE_TEMPLATE));
  } catch {
    templatePresent = false;
  }
  return { contract, missingRecordIds, templatePresent };
}

export async function assertT03SourceAvailable(sourceRoot = ROOT) {
  const availability = await inspectT03SourceAvailability(sourceRoot);
  if (availability.missingRecordIds.length > 0) throw new Error(`T03_SOURCE_RECORDS_MISSING:${availability.missingRecordIds.join(',')}`);
  if (!availability.templatePresent) throw new Error(`T03_TEMPLATE_MISSING:${RETROSPECTIVE_TEMPLATE}`);
  return availability.contract;
}

export function triggerIds(contract) {
  const record = contract.byId.get('run-learning.triggers');
  assert.equal(record?.value.kind, 'projection');
  return [...record.value.fields];
}

async function controlledRoot(prefix) {
  const root = await mkdtemp(path.join(os.tmpdir(), `oh-my-harness-t03-${prefix}-`));
  return await assertControlledFixtureRoot(root);
}

export async function assertControlledFixtureRoot(root) {
  const resolved = path.resolve(root);
  const info = await lstat(resolved);
  const actual = await realpath(resolved);
  const temp = await realpath(os.tmpdir());
  if (info.isSymbolicLink()) throw new Error('T03_FIXTURE_ROOT_SYMLINK');
  if (!actual.startsWith(`${temp}${path.sep}oh-my-harness-t03-`)) throw new Error('T03_FIXTURE_ROOT_NOT_CONTROLLED');
  for (const repository of [ROOT, CANONICAL_ROOT]) {
    const normalized = path.resolve(repository);
    if (actual === normalized || actual.startsWith(`${normalized}${path.sep}`) || normalized.startsWith(`${actual}${path.sep}`)) {
      throw new Error('T03_FIXTURE_ROOT_REPOSITORY_COLLISION');
    }
  }
  return actual;
}

async function makeFixture(sourceRoot, prefix) {
  const root = await controlledRoot(prefix);
  const source = path.join(root, 'source');
  await copyWorkTruthSources(sourceRoot, source);
  const templateTarget = path.join(source, RETROSPECTIVE_TEMPLATE);
  await mkdir(path.dirname(templateTarget), { recursive: true });
  await cp(path.join(sourceRoot, RETROSPECTIVE_TEMPLATE), templateTarget, { errorOnExist: true });
  const contract = await assertT03SourceAvailable(source);
  await mkdir(path.join(root, 'run'), { recursive: true });
  await mkdir(path.join(root, 'protected'), { recursive: true });
  for (const [name, value] of [
    ['harness-source.txt', 'harness-protected\n'],
    ['package.txt', 'package-protected\n'],
    ['git-index.txt', 'index-protected\n'],
    ['launch-log.txt', 'no-launch\n'],
  ]) await writeExclusive(path.join(root, 'protected', name), Buffer.from(value));
  return { root, source, contract };
}

function projectionObject(contract, id, values) {
  const record = contract.byId.get(id)?.value;
  assert.equal(record?.kind, 'projection', `${id} must be a source projection`);
  return Object.fromEntries(record.fields.map((field) => {
    if (!Object.hasOwn(values, field)) throw new Error(`T03_PROJECTION_VALUE_MISSING:${id}:${field}`);
    return [field, values[field]];
  }));
}

function evidenceValues({ runIdentity, terminalHash, scanIdentity, contractDigest, selectedTriggers, protectedManifestIdentity, currentnessIdentity }) {
  return {
    runIdentity,
    terminalObservationIdentity: terminalHash,
    scanIdentity,
    authorityIdentity: 'synthetic-authority-hash',
    contractDigest,
    triggerEvidence: selectedTriggers.map((id) => ({ id, references: [`evidence:${id}`], hash: sha256(id) })),
    timeline: [{ order: 1, source: terminalHash, fact: 'terminal Run observed' }],
    replayProcedure: ['read terminal bytes', 'read evidence bytes', 'observe discriminating signal'],
    environmentBoundary: 'synthetic-controlled-fixture',
    expectedFailureSignal: selectedTriggers.length > 0 ? 'selected learning trigger' : 'no trigger',
    actualFailureSignal: selectedTriggers.length > 0 ? selectedTriggers[0] : 'clean terminal evidence',
    rootCauseEvidence: [{ layer: 'implementation', references: ['evidence:root-cause'] }],
    alternativeHypotheses: [{ label: 'unresolved-alternative', status: 'not-supported' }],
    applicabilityInputs: { appliesWhen: ['same source fact'], excludes: ['unrelated Runs'] },
    duplicateInputs: { candidatesCompared: [], equivalent: false },
    ownerRouting: { owner: 'human-maintainer', route: 'human-consideration-only' },
    sideEffectBoundary: { mayWriteHarness: false, mayLaunch: false },
    privacyClassifications: [{ reference: 'evidence:root-cause', classification: 'synthetic-safe' }],
    protectedManifestIdentity,
    currentnessIdentity,
  };
}

function evidenceDecisionFacts(observation, expected, requiredFields, protectedBefore, protectedAfter) {
  const value = observation.value;
  const complete = requiredFields.every((field) => Object.hasOwn(value, field));
  const privacy = Array.isArray(value.privacyClassifications) ? value.privacyClassifications : [];
  const unsafePrivacy = privacy.some((entry) => entry?.classification === 'sensitive-outside-authority' || entry?.safeReference === false);
  const copiedSensitive = privacy.some((entry) => entry?.copiedSensitiveContent === true);
  const triggerEvidenceIds = Array.isArray(value.triggerEvidence) ? value.triggerEvidence.map(({ id }) => id) : [];
  const identityConflict = value.runIdentity !== expected.runIdentity
    || value.terminalObservationIdentity !== expected.terminalObservationIdentity
    || value.scanIdentity !== expected.scanIdentity
    || value.authorityIdentity !== expected.authorityIdentity
    || value.contractDigest !== expected.contractDigest;
  return {
    sensitiveAccessOutsideAuthority: unsafePrivacy,
    copiedSensitiveContent: copiedSensitive,
    safeEvidenceReferencesEstablished: privacy.length > 0 && !unsafePrivacy && !copiedSensitive,
    identityConflict,
    ownerConflict: value.ownerRouting?.owner !== 'human-maintainer',
    triggerTerminalConflict: !sameSet(triggerEvidenceIds, expected.selectedTriggers),
    protectedDelta: canonical(protectedBefore) !== canonical(protectedAfter),
    evidenceFieldsComplete: complete,
    identitiesCurrent: value.currentnessIdentity === expected.currentnessIdentity
      && value.protectedManifestIdentity === manifestIdentity(protectedBefore),
    fabricatedPlaceholder: containsPlaceholder(value),
    physicalReadbackComplete: complete && observation.hash === sha256(observation.bytes),
  };
}

function renderTemplateSection(template, heading, nextHeading, value) {
  const start = template.indexOf(heading);
  const end = nextHeading ? template.indexOf(nextHeading, start + heading.length) : template.length;
  if (start < 0 || end < 0) throw new Error(`T03_TEMPLATE_SECTION_MISSING:${heading}`);
  let rendered = template.slice(start, end).trimEnd();
  for (const [field, fieldValue] of Object.entries(value)) rendered = rendered.replaceAll(`{{${field}}}`, canonical(fieldValue));
  if (/\{\{[^}]+\}\}/.test(rendered)) throw new Error(`T03_TEMPLATE_UNRESOLVED:${heading}`);
  return Buffer.from(`${rendered}\n`);
}

async function initialRunFiles(fixture, scenario) {
  const runIdentity = scenario.runIdentity ?? 'synthetic-run-01';
  const terminalState = scenario.terminalState ?? 'accepted';
  const authorityPath = path.join(fixture.root, 'run', 'run-authority.json');
  await writeExclusive(authorityPath, canonicalBytes({
    runIdentity,
    authorityIdentity: 'synthetic-authority-hash',
    nonTrivial: scenario.nonTrivial ?? true,
    currentActor: scenario.actor ?? 'main',
    persistenceFacts: {
      continuityRisk: scenario.continuityRisk ?? false,
      multiTaskRisk: scenario.multiTaskRisk ?? false,
      detailRisk: scenario.detailRisk ?? false,
    },
  }));
  const authorityObservation = await observe(authorityPath);
  const terminal = {
    runIdentity,
    nonTrivial: authorityObservation.value.nonTrivial,
    terminalState,
    authorityIdentity: authorityObservation.value.authorityIdentity,
    currentEvidenceIdentity: scenario.currentEvidenceIdentity ?? sha256(canonical({ runIdentity, terminalState, evidence: 'synthetic-terminal-evidence' })),
  };
  const terminalPath = path.join(fixture.root, 'run', 'terminal.json');
  await writeExclusive(terminalPath, canonicalBytes(terminal));
  const terminalObservation = await observe(terminalPath);
  const terminalVocabulary = fixture.contract.byId.get('run.end-vocabulary').value.values;
  if (terminalVocabulary.includes(terminalState)) validateEnum(fixture.contract, 'run.end-vocabulary', terminalState);

  const persistence = decide(fixture.contract, 'persistence', authorityObservation.value.persistenceFacts);
  const contextSelected = persistence.result.representations.includes('context');
  const storage = decide(fixture.contract, 'run-learning-scan-storage', { contextSelected });

  for (const representation of persistence.result.representations) {
    if (representation === 'inline') continue;
    const file = representation === 'context' ? 'context.json' : representation === 'task-board' ? 'task-board.json' : 'task-state.json';
    const value = representation === 'context'
      ? { runIdentity, failureScan: null }
      : { runIdentity, referenceOnly: true };
    await writeExclusive(path.join(fixture.root, 'run', file), canonicalBytes(value));
  }

  const predecessorPath = path.join(fixture.root, 'run', 'predecessor-evidence.json');
  await writeExclusive(predecessorPath, canonicalBytes({
    runIdentity,
    evidenceIdentity: terminal.currentEvidenceIdentity,
    status: scenario.predecessorArtifact === 'incomplete' ? 'partial' : 'complete',
  }));
  const predecessorObservation = await observe(predecessorPath);
  const representationFiles = {
    context: 'context.json',
    'task-board': 'task-board.json',
    'task-state': 'task-state.json',
  };
  const actualRepresentations = [];
  for (const [representation, file] of Object.entries(representationFiles)) {
    if (await observeOptional(path.join(fixture.root, 'run', file))) actualRepresentations.push(representation);
  }
  if (persistence.result.representations.includes('inline')) actualRepresentations.push('inline');
  const sessionPresent = scenario.history !== 'lost' && scenario.terminalSessionArtifact !== 'missing';
  const transition = {
    runIdentity,
    terminalObservationIdentity: scenario.history === 'state-conflict' ? sha256(`conflict:${terminalObservation.hash}`) : terminalObservation.hash,
    terminalEvidenceIdentity: terminal.currentEvidenceIdentity,
    actor: authorityObservation.value.currentActor,
    predecessorEvidenceIdentity: predecessorObservation.hash,
    selectedRepresentations: persistence.result.representations,
    actualRepresentations,
    transitionState: 'terminal-observed',
    sessionIdentity: sessionPresent ? sha256(canonical({ runIdentity, terminal: terminalObservation.hash, actor: authorityObservation.value.currentActor })) : null,
    continuityBoundary: sessionPresent ? 'same-main-terminalization-session' : null,
  };
  const transitionPath = path.join(fixture.root, 'run', 'terminal-transition.json');
  await writeExclusive(transitionPath, canonicalBytes(transition));
  const transitionObservation = await observe(transitionPath);
  return {
    runIdentity,
    terminalState,
    terminalObservation,
    currentEvidenceIdentity: terminal.currentEvidenceIdentity,
    authorityObservation,
    predecessorObservation,
    transitionObservation,
    actualRepresentations,
    persistence,
    contextSelected,
    storage,
  };
}

export async function runLearningScanScenario(sourceRoot = ROOT, scenario = {}) {
  const fixture = await makeFixture(sourceRoot, 'scan');
  try {
    const allTriggerIds = triggerIds(fixture.contract);
    const requested = new Set(scenario.triggerIds ?? []);
    const terminalState = scenario.terminalState ?? 'accepted';
    if (terminalState === 'blocked') requested.add('run-blocked');
    if (terminalState === 'exhausted') requested.add('run-exhausted');
    const selectedTriggerIds = allTriggerIds.filter((id) => requested.has(id));
    const failureHistoryPath = path.join(fixture.root, 'run', 'failure-history.json');
    await writeExclusive(failureHistoryPath, canonicalBytes({
      runIdentity: scenario.runIdentity ?? 'synthetic-run-01',
      terminalState,
      entries: selectedTriggerIds.map((id) => ({
        id,
        evidenceReference: `evidence:${id}`,
        observationIdentity: sha256(canonical({ id, reference: `evidence:${id}` })),
      })),
    }));
    const failureHistoryObservation = await observe(failureHistoryPath);
    const terminalEvidenceIdentity = failureHistoryObservation.hash;
    const initial = await initialRunFiles(fixture, { ...scenario, currentEvidenceIdentity: terminalEvidenceIdentity });
    const observedTriggerIds = new Set(failureHistoryObservation.value.entries
      .filter(({ id, evidenceReference, observationIdentity }) => allTriggerIds.includes(id)
        && observationIdentity === sha256(canonical({ id, reference: evidenceReference })))
      .map(({ id }) => id));
    if (initial.terminalState === 'blocked') observedTriggerIds.add('run-blocked');
    if (initial.terminalState === 'exhausted') observedTriggerIds.add('run-exhausted');
    const triggerFacts = Object.fromEntries(allTriggerIds.map((id) => [id, observedTriggerIds.has(id)]));
    const triggerProjection = project(fixture.contract, 'run-learning.triggers', triggerFacts);
    const trigger = decide(fixture.contract, 'run-learning-trigger', triggerProjection.value);
    const selectedTriggers = allTriggerIds.filter((id) => triggerProjection.value[id]);
    const scanIdentity = sha256(canonical({
      runIdentity: initial.runIdentity,
      terminalObservationIdentity: initial.terminalObservation.hash,
      terminalEvidenceIdentity: initial.currentEvidenceIdentity,
      contractDigest: fixture.contract.contractDigest,
    }));
    const protectedBefore = await manifestTree(path.join(fixture.root, 'protected'));
    const expectedCurrentnessIdentity = sha256(canonical({
      runIdentity: initial.runIdentity,
      terminalObservationIdentity: initial.terminalObservation.hash,
      terminalEvidenceIdentity: initial.currentEvidenceIdentity,
      contractDigest: fixture.contract.contractDigest,
    }));
    const fullEvidence = evidenceValues({
      runIdentity: initial.runIdentity,
      terminalHash: initial.terminalObservation.hash,
      scanIdentity,
      contractDigest: fixture.contract.contractDigest,
      selectedTriggers,
      protectedManifestIdentity: manifestIdentity(protectedBefore),
      currentnessIdentity: expectedCurrentnessIdentity,
    });
    const evidenceSource = { ...fullEvidence };
    const evidenceArtifact = scenario.evidenceArtifact ?? ({
      privacy: 'privacy-boundary',
      conflict: 'identity-conflict',
      'protected-delta': 'protected-delta',
      missing: 'missing-field',
      stale: 'stale-identity',
      fabricated: 'fabricated-placeholder',
    }[scenario.evidence] ?? 'sufficient');
    if (evidenceArtifact === 'missing-field') delete evidenceSource.timeline;
    if (evidenceArtifact === 'stale-identity') evidenceSource.currentnessIdentity = sha256(`stale:${expectedCurrentnessIdentity}`);
    if (evidenceArtifact === 'identity-conflict') evidenceSource.authorityIdentity = 'conflicting-authority-hash';
    if (evidenceArtifact === 'fabricated-placeholder') evidenceSource.actualFailureSignal = 'TBD PLACEHOLDER';
    if (evidenceArtifact === 'privacy-boundary') {
      evidenceSource.privacyClassifications = [{
        reference: 'outside-authority-sensitive-reference',
        classification: 'sensitive-outside-authority',
        safeReference: false,
        copiedSensitiveContent: true,
      }];
    }
    const evidencePath = path.join(fixture.root, 'run', 'evidence-index.json');
    await writeExclusive(evidencePath, canonicalBytes(evidenceSource));
    const evidenceObservation = await observe(evidencePath);
    if (evidenceArtifact === 'protected-delta') {
      await writeExclusive(path.join(fixture.root, 'protected', 'unexpected-delta.txt'), Buffer.from('synthetic protected delta\n'));
    }
    const protectedAfter = await manifestTree(path.join(fixture.root, 'protected'));
    const requiredEvidence = fixture.contract.byId.get('run-learning.evidence-index').value.fields;
    const evidenceComplete = requiredEvidence.every((field) => Object.hasOwn(evidenceObservation.value, field));
    const evidenceProjection = evidenceComplete ? project(fixture.contract, 'run-learning.evidence-index', evidenceObservation.value) : null;
    const evidenceFacts = evidenceDecisionFacts(evidenceObservation, {
      runIdentity: initial.runIdentity,
      terminalObservationIdentity: initial.terminalObservation.hash,
      scanIdentity,
      authorityIdentity: 'synthetic-authority-hash',
      contractDigest: fixture.contract.contractDigest,
      selectedTriggers,
      currentnessIdentity: expectedCurrentnessIdentity,
    }, requiredEvidence, protectedBefore, protectedAfter);
    const evidence = decide(fixture.contract, 'run-learning-evidence', evidenceFacts);

    let priorObservation = null;
    if (['exact', 'conflict', 'stale'].includes(scenario.history)) {
      const priorRecord = {
        scanIdentity: scenario.history === 'conflict' ? sha256(`conflict:${scanIdentity}`) : scanIdentity,
        terminalObservationIdentity: scenario.history === 'stale' ? sha256(`stale:${initial.terminalObservation.hash}`) : initial.terminalObservation.hash,
        runIdentity: initial.runIdentity,
        contractDigest: fixture.contract.contractDigest,
      };
      const bytes = canonicalBytes(priorRecord);
      if (initial.contextSelected) {
        const contextPath = path.join(fixture.root, 'run', 'context.json');
        const context = (await observe(contextPath)).value;
        await writeReplace(contextPath, canonicalBytes({ ...context, failureScan: priorRecord }));
        priorObservation = await observe(contextPath);
        priorObservation.value = priorObservation.value.failureScan;
      } else {
        const priorPath = path.join(fixture.root, 'runtime', 'inline-scan-observation.json');
        await writeExclusive(priorPath, bytes);
        priorObservation = await observe(priorPath);
      }
    }
    const priorObserved = priorObservation !== null;
    const priorTerminalMatches = priorObserved && priorObservation.value.terminalObservationIdentity === initial.terminalObservation.hash;
    const priorIdentityMatches = priorObserved && priorObservation.value.scanIdentity === scanIdentity;

    const transition = initial.transitionObservation.value;
    const sameTerminalizationSession = typeof transition.sessionIdentity === 'string'
      && transition.sessionIdentity.length > 0
      && transition.continuityBoundary === 'same-main-terminalization-session'
      && transition.transitionState === 'terminal-observed';
    const scanFacts = {
      nonTrivial: initial.authorityObservation.value.nonTrivial,
      terminalState: initial.terminalState,
      actor: transition.actor,
      terminalObservationCurrent: transition.terminalObservationIdentity === initial.terminalObservation.hash,
      terminalEvidenceCurrent: transition.terminalEvidenceIdentity === initial.currentEvidenceIdentity,
      stateConflict: transition.terminalObservationIdentity !== initial.terminalObservation.hash,
      predecessorEvidenceComplete: transition.predecessorEvidenceIdentity === initial.predecessorObservation.hash
        && initial.predecessorObservation.value.status === 'complete',
      viewSetMatchesPersistence: sameSet(transition.selectedRepresentations, transition.actualRepresentations)
        && sameSet(transition.selectedRepresentations, initial.persistence.result.representations),
      runAlreadyTerminal: fixture.contract.byId.get('run.end-vocabulary').value.values.includes(initial.terminalState),
      sameMainTerminalizationSession: sameTerminalizationSession,
      priorScanObserved: priorObserved,
      priorScanConflict: priorObserved && priorTerminalMatches && !priorIdentityMatches,
      priorScanStale: priorObserved && !priorTerminalMatches,
      priorScanExact: priorObserved && priorTerminalMatches && priorIdentityMatches,
      contextSelected: initial.contextSelected,
    };
    const before = await manifestTree(path.join(fixture.root, 'run'));
    const scan = decide(fixture.contract, 'run-learning-scan', scanFacts);
    const artifact = decide(fixture.contract, 'run-learning-artifact', {
      scanCode: scan.result.code,
      triggerCode: trigger.result.code,
      evidenceCode: evidence.result.code,
    });
    const scanRecord = {
      scanIdentity,
      runIdentity: initial.runIdentity,
      terminalState: initial.terminalState,
      terminalObservationIdentity: initial.terminalObservation.hash,
      evidenceIndexIdentity: evidenceObservation.hash,
      contractDigest: fixture.contract.contractDigest,
      persistenceDecision: initial.persistence.trace.matchedDecisionIds[0],
      storageCode: initial.storage.result.code,
      triggerIds: selectedTriggers,
      triggerCode: trigger.result.code,
      evidenceCode: evidence.result.code,
      completionCode: artifact.result.code,
      formalArtifacts: [],
    };
    let inlineScan = null;
    let retrospectiveObservation = null;
    let candidateObservation = null;
    let retrospectiveValue = null;
    let candidateValue = null;
    if (scan.result.performScan) {
      if (artifact.result.code === 'CREATE_RUN_RETROSPECTIVE_AND_CANDIDATE') {
        const retrospectiveIdentity = sha256(canonical({ scanIdentity, type: 'retrospective', version: 1 }));
        const candidateIdentity = sha256(canonical({ scanIdentity, retrospectiveIdentity, type: 'negative-case', version: 1 }));
        const retrospective = project(fixture.contract, 'run-learning.retrospective', projectionObject(fixture.contract, 'run-learning.retrospective', {
          identity: retrospectiveIdentity,
          status: 'candidate',
          sourceRunIdentity: initial.runIdentity,
          terminalState: initial.terminalState,
          scanIdentity,
          authorityIdentities: ['synthetic-authority-hash'],
          evidenceIndexIdentity: evidenceObservation.hash,
          facts: [{ fact: 'terminal learning signal', evidence: evidenceObservation.hash }],
          timeline: fullEvidence.timeline,
          replayProcedure: fullEvidence.replayProcedure,
          actualFailureSignal: fullEvidence.actualFailureSignal,
          rootCause: { primary: 'implementation', evidence: ['evidence:root-cause'] },
          uncertainty: ['alternative hypothesis not supported'],
          candidateIdentity,
          privacySafety: { referencesOnly: true, copiedSensitiveContent: false },
          routingRecommendation: { route: 'human-consideration-only', authoritative: false },
          noAuthorityDeclarations: { promotion: false, harnessChange: false, package: false, launch: false },
        })).value;
        const candidate = project(fixture.contract, 'run-learning.candidate', projectionObject(fixture.contract, 'run-learning.candidate', {
          identity: candidateIdentity,
          status: 'unreviewed',
          sourceRunIdentity: initial.runIdentity,
          terminalIdentity: initial.terminalObservation.hash,
          scanIdentity,
          retrospectiveIdentity,
          triggerIds: selectedTriggers,
          facts: retrospective.facts,
          evidenceReferences: fullEvidence.triggerEvidence,
          timeline: fullEvidence.timeline,
          replayProcedure: fullEvidence.replayProcedure,
          actualFailureSignal: fullEvidence.actualFailureSignal,
          rootCauseLayers: [{ layer: 'implementation', role: 'primary', evidence: ['evidence:root-cause'] }],
          applicabilityPredicates: ['same source condition'],
          generalizationBoundary: 'only evidence-equivalent Runs',
          nonApplicabilityBoundary: 'unrelated tasks and clean Runs',
          duplicateComparison: { compared: [], result: 'no duplicate observed' },
          privacySafety: { referencesOnly: true, copiedSensitiveContent: false },
          proposedOwnerRoute: { owner: 'human-maintainer', route: 'human-consideration-only' },
          expectedSideEffects: [],
          noAuthorityDeclarations: { promotion: false, harnessChange: false, package: false, launch: false },
        })).value;
        retrospectiveValue = retrospective;
        candidateValue = candidate;
        const template = await readFile(path.join(fixture.source, RETROSPECTIVE_TEMPLATE), 'utf8');
        const retrospectiveBytes = renderTemplateSection(template, '## Retrospective', '## Per-Run Negative-Case Candidate', retrospective);
        const candidateBytes = renderTemplateSection(template, '## Per-Run Negative-Case Candidate', '## Independent Review And Human Boundary', candidate);
        const retrospectivePath = path.join(fixture.root, 'run', 'learning', 'RETROSPECTIVE-v1.md');
        const candidatePath = path.join(fixture.root, 'run', 'learning', 'cases', 'candidates', 'NEGATIVE_CASE-v1.md');
        await writeExclusive(retrospectivePath, retrospectiveBytes);
        await writeExclusive(candidatePath, candidateBytes);
        retrospectiveObservation = { hash: sha256(await readFile(retrospectivePath)), identity: retrospectiveIdentity, path: 'learning/RETROSPECTIVE-v1.md' };
        candidateObservation = { hash: sha256(await readFile(candidatePath)), identity: candidateIdentity, path: 'learning/cases/candidates/NEGATIVE_CASE-v1.md' };
        scanRecord.formalArtifacts = [retrospectiveObservation, candidateObservation];
      }
      scanRecord.scanObservationIdentity = sha256(canonicalBytes(scanRecord));
      const scanBytes = canonicalBytes(scanRecord);
      if (initial.storage.result.storage === 'failureScan') {
        const contextPath = path.join(fixture.root, 'run', 'context.json');
        const context = (await observe(contextPath)).value;
        await writeReplace(contextPath, canonicalBytes({ ...context, failureScan: scanRecord }));
        assert.deepEqual((await observe(contextPath)).value.failureScan, scanRecord);
      } else {
        const inlinePath = path.join(fixture.root, 'runtime', 'inline-scan-observation.json');
        await writeReplace(inlinePath, scanBytes);
        inlineScan = await observe(inlinePath);
      }
    }
    const afterFirst = await manifestTree(path.join(fixture.root, 'run'));
    const firstDelta = manifestDelta(before, afterFirst);
    const repeatBefore = await manifestTree(path.join(fixture.root, 'run'));
    let repeat = scan;
    if (scan.result.performScan) {
      let repeatedObservation;
      if (initial.storage.result.storage === 'failureScan') {
        repeatedObservation = await observe(path.join(fixture.root, 'run', 'context.json'));
        repeatedObservation.value = repeatedObservation.value.failureScan;
      } else {
        repeatedObservation = await observe(path.join(fixture.root, 'runtime', 'inline-scan-observation.json'));
      }
      const reentryPath = path.join(fixture.root, 'runtime', 'reentry-session.json');
      await writeExclusive(reentryPath, canonicalBytes({
        runIdentity: initial.runIdentity,
        sessionType: 'fresh-reentry',
        priorObservationIdentity: repeatedObservation.hash,
      }));
      const reentryObservation = await observe(reentryPath);
      const repeatPriorTerminalMatches = repeatedObservation.value.terminalObservationIdentity === initial.terminalObservation.hash;
      const repeatPriorIdentityMatches = repeatedObservation.value.scanIdentity === scanIdentity;
      repeat = decide(fixture.contract, 'run-learning-scan', {
        ...scanFacts,
        sameMainTerminalizationSession: reentryObservation.value.sessionType !== 'fresh-reentry',
        priorScanObserved: true,
        priorScanConflict: repeatPriorTerminalMatches && !repeatPriorIdentityMatches,
        priorScanStale: !repeatPriorTerminalMatches,
        priorScanExact: repeatPriorTerminalMatches && repeatPriorIdentityMatches,
      });
    }
    const repeatAfter = await manifestTree(path.join(fixture.root, 'run'));
    return {
      contractDigest: fixture.contract.contractDigest,
      persistence: initial.persistence,
      storage: initial.storage,
      scan,
      trigger,
      selectedTriggers,
      evidence,
      evidenceProjection,
      artifact,
      scanRecord,
      inlineScan,
      retrospectiveObservation,
      candidateObservation,
      retrospectiveValue,
      candidateValue,
      before,
      afterFirst,
      firstDelta,
      repeat,
      repeatDelta: manifestDelta(repeatBefore, repeatAfter),
      observations: {
        terminal: { path: 'run/terminal.json', hash: initial.terminalObservation.hash },
        terminalSession: {
          path: 'run/terminal-transition.json',
          hash: initial.transitionObservation.hash,
          present: sameTerminalizationSession,
          sessionIdentity: transition.sessionIdentity,
        },
        predecessor: { path: 'run/predecessor-evidence.json', hash: initial.predecessorObservation.hash },
        triggerHistory: { path: 'run/failure-history.json', hash: failureHistoryObservation.hash, selectedTriggers },
        evidence: {
          path: 'run/evidence-index.json',
          hash: evidenceObservation.hash,
          classification: evidenceArtifact,
          facts: evidenceFacts,
          protectedBeforeIdentity: manifestIdentity(protectedBefore),
          protectedAfterIdentity: manifestIdentity(protectedAfter),
        },
        scanFacts,
      },
    };
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
}

export async function runInlineTransferScenario(sourceRoot = ROOT, scenario = {}) {
  const fixture = await makeFixture(sourceRoot, 'transfer');
  try {
    const initial = await initialRunFiles(fixture, { ...scenario, continuityRisk: false, multiTaskRisk: false, detailRisk: false });
    const scanIdentity = sha256(canonical({ runIdentity: initial.runIdentity, terminal: initial.terminalObservation.hash, contract: fixture.contract.contractDigest }));
    const scanRecord = {
      scanIdentity,
      scanObservationIdentity: sha256(canonical({ scanIdentity, observation: 'inline-first' })),
      runIdentity: initial.runIdentity,
      terminalObservationIdentity: initial.terminalObservation.hash,
      contractDigest: fixture.contract.contractDigest,
      completionCode: 'SCAN_COMPLETE_NO_FORMAL_ARTIFACT',
    };
    const inlineBytes = canonicalBytes(scanRecord);
    const runtime = path.join(fixture.root, 'runtime');
    await mkdir(runtime, { recursive: true });
    const inlinePath = path.join(runtime, 'inline-scan.json');
    if (scenario.missingInline !== true) await writeExclusive(inlinePath, inlineBytes);
    const inlineObservation = await observeOptional(inlinePath);
    const transition = initial.transitionObservation.value;
    const terminal = initial.terminalObservation.value;
    const predecessor = initial.predecessorObservation.value;
    const first = decide(fixture.contract, 'run-learning-scan', {
      nonTrivial: initial.authorityObservation.value.nonTrivial,
      terminalState: terminal.terminalState,
      actor: transition.actor,
      terminalObservationCurrent: transition.terminalObservationIdentity === initial.terminalObservation.hash,
      terminalEvidenceCurrent: transition.terminalEvidenceIdentity === terminal.currentEvidenceIdentity,
      stateConflict: transition.runIdentity !== terminal.runIdentity,
      predecessorEvidenceComplete: predecessor.status === 'complete' && transition.predecessorEvidenceIdentity === initial.predecessorObservation.hash,
      viewSetMatchesPersistence: sameSet(transition.selectedRepresentations, transition.actualRepresentations),
      runAlreadyTerminal: fixture.contract.byId.get('run.end-vocabulary').value.values.includes(terminal.terminalState),
      sameMainTerminalizationSession: transition.actor === 'main' && transition.continuityBoundary === 'same-main-terminalization-session' && transition.sessionIdentity !== null,
      priorScanObserved: false, priorScanConflict: false, priorScanStale: false, priorScanExact: false, contextSelected: false,
    });
    const requestPath = path.join(runtime, 'continuity-transfer-request.json');
    await writeExclusive(requestPath, canonicalBytes({
      runIdentity: initial.runIdentity,
      plannedContinuityTransfer: true,
      continuityRisk: true,
      multiTaskRisk: false,
      detailRisk: false,
      inlineScanIdentity: inlineObservation?.hash ?? null,
    }));
    const requestObservation = await observe(requestPath);
    const transferPersistence = decide(fixture.contract, 'persistence', {
      continuityRisk: requestObservation.value.continuityRisk,
      multiTaskRisk: requestObservation.value.multiTaskRisk,
      detailRisk: requestObservation.value.detailRisk,
    });
    const before = await manifestTree(path.join(fixture.root, 'run'));
    const contextPath = path.join(fixture.root, 'run', 'context.json');
    const contextBefore = await observeOptional(contextPath);
    const transfer = decide(fixture.contract, 'run-learning-scan-transfer', {
      plannedContinuityTransfer: requestObservation.value.plannedContinuityTransfer === true,
      exactInlineScanObserved: inlineObservation !== null
        && inlineObservation.hash === requestObservation.value.inlineScanIdentity
        && canonical(inlineObservation.value) === canonical(scanRecord),
      contextSelected: transferPersistence.result.representations.includes('context'),
      contextScanAbsent: contextBefore === null || contextBefore.value.failureScan === null,
    });
    let contextObservation = null;
    if (transfer.result.code === 'PUBLISH_INLINE_SCAN_TO_CONTEXT') {
      await writeExclusive(contextPath, canonicalBytes({ runIdentity: initial.runIdentity, failureScan: scanRecord }));
      contextObservation = await observe(contextPath);
    }
    const after = await manifestTree(path.join(fixture.root, 'run'));
    const contextScan = contextObservation?.value.failureScan ?? null;
    const contextPriorObserved = contextScan !== null;
    const contextPriorIdentityMatches = contextScan?.scanIdentity === scanIdentity;
    const contextPriorTerminalMatches = contextScan?.terminalObservationIdentity === initial.terminalObservation.hash;
    const later = contextObservation
      ? decide(fixture.contract, 'run-learning-scan', {
        nonTrivial: initial.authorityObservation.value.nonTrivial,
        terminalState: terminal.terminalState,
        actor: transition.actor,
        terminalObservationCurrent: transition.terminalObservationIdentity === initial.terminalObservation.hash,
        terminalEvidenceCurrent: transition.terminalEvidenceIdentity === terminal.currentEvidenceIdentity,
        stateConflict: transition.runIdentity !== terminal.runIdentity,
        predecessorEvidenceComplete: predecessor.status === 'complete' && transition.predecessorEvidenceIdentity === initial.predecessorObservation.hash,
        viewSetMatchesPersistence: transferPersistence.result.representations.includes('context') && contextObservation.value.runIdentity === terminal.runIdentity,
        runAlreadyTerminal: fixture.contract.byId.get('run.end-vocabulary').value.values.includes(terminal.terminalState),
        sameMainTerminalizationSession: false,
        priorScanObserved: contextPriorObserved,
        priorScanConflict: contextPriorObserved && !contextPriorIdentityMatches,
        priorScanStale: contextPriorObserved && contextPriorIdentityMatches && !contextPriorTerminalMatches,
        priorScanExact: contextPriorObserved && contextPriorIdentityMatches && contextPriorTerminalMatches,
        contextSelected: transferPersistence.result.representations.includes('context'),
      })
      : null;
    return {
      first,
      transfer,
      later,
      inlineBytes,
      contextObservation,
      exactBytesPreserved: contextObservation ? canonical(contextObservation.value.failureScan) === canonical(scanRecord) : true,
      delta: manifestDelta(before, after),
      observations: {
        terminal: { path: 'run/terminal.json', hash: initial.terminalObservation.hash },
        terminalSession: { path: 'run/terminal-transition.json', hash: initial.transitionObservation.hash },
        inlineScan: inlineObservation && { path: 'runtime/inline-scan.json', hash: inlineObservation.hash },
        transferRequest: { path: 'runtime/continuity-transfer-request.json', hash: requestObservation.hash },
        context: contextObservation && { path: 'run/context.json', hash: contextObservation.hash },
      },
    };
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
}

export async function runCaseReviewScenario(sourceRoot = ROOT, scenario = {}) {
  const fixture = await makeFixture(sourceRoot, 'review');
  try {
    const candidate = path.join(fixture.root, 'run', 'learning', 'cases', 'candidates', 'NEGATIVE_CASE-v1.md');
    await writeExclusive(candidate, Buffer.from('candidate evidence\n'));
    const candidateBytes = await readFile(candidate);
    const candidateObservation = { bytes: candidateBytes, hash: sha256(candidateBytes) };
    const bindingPath = path.join(fixture.root, 'run', 'learning', 'cases', 'review-inputs', 'binding.json');
    await writeExclusive(bindingPath, canonicalBytes({
      invocationIdentity: 'run-learning-case-review-invocation-01',
      candidatePath: 'learning/cases/candidates/NEGATIVE_CASE-v1.md',
      candidateHash: candidateObservation.hash,
      reviewType: 'run-learning-case-review',
    }));
    const bindingObservation = await observe(bindingPath);
    const invocationPath = path.join(fixture.root, 'run', 'learning', 'cases', 'review-inputs', 'invocation.json');
    await writeExclusive(invocationPath, canonicalBytes({
      invocationIdentity: bindingObservation.value.invocationIdentity,
      selectedCapability: scenario.capability ?? 'result-evaluator',
      reviewType: bindingObservation.value.reviewType,
      bindingIdentity: bindingObservation.hash,
      reportPath: 'learning/cases/reviews/EVALUATOR_REPORT-invocation-01.md',
      permissions: { reportOnly: true, mayRepair: false, mayLaunch: false },
    }));
    const invocationObservation = await observe(invocationPath);
    const report = path.join(fixture.root, 'run', 'learning', 'cases', 'reviews', 'EVALUATOR_REPORT-invocation-01.md');
    if (scenario.collision) await writeExclusive(report, canonicalBytes({ collision: true }));
    const before = await manifestTree(path.join(fixture.root, 'run'));
    const protectedBefore = await manifestTree(path.join(fixture.root, 'protected'));
    if (!scenario.collision) {
      const bindingMismatch = scenario.bindingMismatch === true || scenario.reviewArtifact === 'binding-mismatch';
      await writeExclusive(report, canonicalBytes({
        reviewType: invocationObservation.value.reviewType,
        invocationIdentity: invocationObservation.value.invocationIdentity,
        invocationHash: invocationObservation.hash,
        bindingIdentity: bindingMismatch ? sha256(`mismatch:${bindingObservation.hash}`) : bindingObservation.hash,
        candidateHash: bindingMismatch ? sha256(`mismatch:${candidateObservation.hash}`) : candidateObservation.hash,
        completion: scenario.partial ? 'partial' : 'complete',
        strictVerdict: scenario.verdict ?? 'PASS',
        promotionAuthority: false,
      }));
    }
    if (scenario.extraWrite) await writeExclusive(path.join(fixture.root, 'run', 'learning', 'cases', 'reviews', 'repair.md'), Buffer.from('forbidden repair\n'));
    if (scenario.launched === true || scenario.launchArtifact === 'present') {
      await writeReplace(path.join(fixture.root, 'protected', 'launch-log.txt'), Buffer.from('forbidden reviewer launch\n'));
    }
    const after = await manifestTree(path.join(fixture.root, 'run'));
    const protectedAfter = await manifestTree(path.join(fixture.root, 'protected'));
    const physicalDelta = fileDelta(before, after);
    const delta = [...physicalDelta.add, ...physicalDelta.replace, ...physicalDelta.remove].sort();
    const expectedReport = 'learning/cases/reviews/EVALUATOR_REPORT-invocation-01.md';
    const reportObservation = await observeOptional(report);
    const reportValue = reportObservation?.value ?? {};
    const reportComplete = reportObservation !== null && [
      'reviewType', 'invocationIdentity', 'invocationHash', 'bindingIdentity', 'candidateHash',
      'completion', 'strictVerdict', 'promotionAuthority',
    ].every((field) => Object.hasOwn(reportValue, field)) && reportValue.completion === 'complete';
    const candidateBindingsExact = reportComplete
      && bindingObservation.value.candidateHash === candidateObservation.hash
      && bindingObservation.value.candidatePath === 'learning/cases/candidates/NEGATIVE_CASE-v1.md'
      && bindingObservation.value.reviewType === invocationObservation.value.reviewType
      && invocationObservation.value.bindingIdentity === bindingObservation.hash
      && reportValue.bindingIdentity === bindingObservation.hash
      && reportValue.candidateHash === candidateObservation.hash
      && reportValue.invocationHash === invocationObservation.hash
      && reportValue.invocationIdentity === invocationObservation.value.invocationIdentity;
    const launchDelta = canonical(protectedBefore) !== canonical(protectedAfter);
    const review = decide(fixture.contract, 'run-learning-review', {
      selectedCapability: invocationObservation.value.selectedCapability,
      reviewType: invocationObservation.value.reviewType,
      uniqueReportPathAbsentBeforeLaunch: !before.some(({ path: item }) => item === expectedReport),
      candidateBindingsExact,
      reportComplete,
      strictVerdict: reportValue.strictVerdict,
      reportOnlyDelta: physicalDelta.add.length === 1 && physicalDelta.add[0] === expectedReport
        && physicalDelta.replace.length === 0 && physicalDelta.remove.length === 0,
      reviewerRepairedOrLaunched: launchDelta || physicalDelta.add.some((item) => item !== expectedReport)
        || physicalDelta.replace.length > 0 || physicalDelta.remove.length > 0,
    });
    return {
      review,
      delta,
      before,
      after,
      observations: {
        candidate: { path: 'learning/cases/candidates/NEGATIVE_CASE-v1.md', hash: candidateObservation.hash },
        bindingManifest: { path: 'learning/cases/review-inputs/binding.json', hash: bindingObservation.hash, matches: candidateBindingsExact },
        invocation: { path: 'learning/cases/review-inputs/invocation.json', hash: invocationObservation.hash },
        report: reportObservation && { path: expectedReport, hash: reportObservation.hash },
        protectedBeforeIdentity: manifestIdentity(protectedBefore),
        protectedAfterIdentity: manifestIdentity(protectedAfter),
        launchDelta,
      },
    };
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
}

function centralSemanticContent(value) {
  const clone = structuredClone(value);
  delete clone.contentIdentity;
  return sha256(canonical(clone));
}

export function centralCase(overrides = {}) {
  const value = {
    caseIdentity: 'case-a',
    version: 1,
    status: 'active',
    sourceRunIdentities: ['synthetic-run-01'],
    contentIdentity: '',
    facts: [{ fact: 'synthetic fact', evidence: 'evidence:fact' }],
    evidenceReferences: [{ reference: 'evidence:fact', hash: sha256('synthetic fact') }],
    reproduction: ['replay synthetic fixture'],
    failureSignal: 'synthetic failure signal',
    rootCauseLayers: [{ layer: 'implementation', role: 'primary' }],
    applicabilityBoundary: ['same synthetic condition'],
    generalizationBoundary: 'evidence-equivalent only',
    nonApplicabilityBoundary: 'all unrelated conditions',
    reviewIdentities: ['review-hash'],
    humanDispositionIdentity: 'human-disposition-hash',
    provenance: { action: 'create', priorContentIdentity: null, reason: 'synthetic controlled fixture' },
    supersedes: [],
    mergedFrom: [],
    successor: null,
    custodianAuthorizationIdentity: 'custodian-authorization-hash',
    sourceContractIdentity: 'contract-hash',
    downstreamConsumptionState: 'not-yet-consumed',
    downstreamConsumptionHistory: [],
    ...structuredClone(overrides),
  };
  value.contentIdentity = centralSemanticContent(value);
  return value;
}

function caseFileMap(manifest) {
  return new Map(manifest.filter(({ type }) => type === 'file').map((entry) => [entry.path, entry.hash]));
}

function fileDelta(before, after) {
  const left = caseFileMap(before);
  const right = caseFileMap(after);
  const add = [...right.keys()].filter((key) => !left.has(key));
  const replace = [...right.keys()].filter((key) => left.has(key) && left.get(key) !== right.get(key));
  const remove = [...left.keys()].filter((key) => !right.has(key));
  return { add: add.sort(), replace: replace.sort(), remove: remove.sort() };
}

function prefixPreserved(prior, next) {
  return canonical(next.slice(0, prior.length)) === canonical(prior);
}

function validateCustodyPostimages(contract, plan, preCases, postCases) {
  const pre = new Map(preCases.map((value) => [value.caseIdentity, value]));
  const post = new Map(postCases.map((value) => [value.caseIdentity, value]));
  for (const value of postCases) {
    try {
      validateEnum(contract, 'central-case.status', value.status);
      project(contract, 'central-case.content', value);
    } catch {
      return false;
    }
    if (value.contentIdentity !== centralSemanticContent(value)) return false;
    if (!Number.isInteger(value.version) || value.version < 1) return false;
  }
  const added = [...post.keys()].filter((id) => !pre.has(id));
  const replaced = [...post.keys()].filter((id) => pre.has(id) && canonical(pre.get(id)) !== canonical(post.get(id)));
  const removed = [...pre.keys()].filter((id) => !post.has(id));
  if (added.length !== plan.addCount || replaced.length !== plan.replaceCount || removed.length !== plan.deleteCount) return false;
  if (plan.action === 'reject') return postCases.length === preCases.length && canonical(preCases) === canonical(postCases);
  if (plan.action === 'create') {
    const next = post.get(added[0]);
    return next.version === 1 && next.status === 'active' && next.supersedes.length === 0 && next.mergedFrom.length === 0
      && next.successor === null && next.downstreamConsumptionState === 'not-yet-consumed' && next.downstreamConsumptionHistory.length === 0;
  }
  if (plan.action === 'update') {
    const prior = preCases[0]; const next = post.get(prior.caseIdentity);
    return next.version === prior.version + 1 && next.status === prior.status && next.provenance.priorContentIdentity === prior.contentIdentity
      && prefixPreserved(prior.downstreamConsumptionHistory, next.downstreamConsumptionHistory);
  }
  if (plan.action === 'merge') {
    const successor = post.get(added[0]);
    const expectedMerged = preCases.map(({ caseIdentity }) => caseIdentity).sort();
    if (successor.version !== 1 || successor.status !== 'active' || canonical([...successor.mergedFrom].sort()) !== canonical(expectedMerged)) return false;
    if (successor.downstreamConsumptionState !== 'not-yet-consumed') return false;
    return preCases.every((prior) => {
      const next = post.get(prior.caseIdentity);
      return next.status === 'merged' && next.version === prior.version + 1 && next.successor === successor.caseIdentity
        && prefixPreserved(prior.downstreamConsumptionHistory, next.downstreamConsumptionHistory)
        && next.downstreamConsumptionState === 'closed-no-new-consumption';
    });
  }
  if (plan.action === 'downgrade') {
    const prior = preCases[0]; const next = post.get(prior.caseIdentity);
    return next.status === 'downgraded' && next.version === prior.version + 1 && next.downstreamConsumptionState === 'reference-only'
      && canonical(next.facts) === canonical(prior.facts) && canonical(next.evidenceReferences) === canonical(prior.evidenceReferences)
      && canonical(next.reproduction) === canonical(prior.reproduction) && canonical(next.applicabilityBoundary) !== canonical(prior.applicabilityBoundary)
      && prefixPreserved(prior.downstreamConsumptionHistory, next.downstreamConsumptionHistory) && next.successor === null;
  }
  if (plan.action === 'supersede') {
    const prior = preCases[0]; const predecessor = post.get(prior.caseIdentity); const successor = post.get(added[0]);
    return predecessor.status === 'superseded' && predecessor.version === prior.version + 1 && predecessor.successor === successor.caseIdentity
      && predecessor.downstreamConsumptionState === 'closed-no-new-consumption'
      && prefixPreserved(prior.downstreamConsumptionHistory, predecessor.downstreamConsumptionHistory)
      && successor.status === 'active' && successor.version === 1 && canonical(successor.supersedes) === canonical([prior.caseIdentity])
      && successor.downstreamConsumptionState === 'not-yet-consumed';
  }
  if (plan.action === 'retire') {
    const prior = preCases[0]; const next = post.get(prior.caseIdentity);
    return next.status === 'retired' && next.version === prior.version + 1 && next.successor === null
      && next.downstreamConsumptionState === 'closed-no-new-consumption'
      && canonical(next.facts) === canonical(prior.facts) && canonical(next.evidenceReferences) === canonical(prior.evidenceReferences)
      && canonical(next.reproduction) === canonical(prior.reproduction)
      && prefixPreserved(prior.downstreamConsumptionHistory, next.downstreamConsumptionHistory);
  }
  return false;
}

function bindCaseAuthorities(value, bindings, priorIdentityMap = new Map()) {
  const bound = structuredClone(value);
  bound.reviewIdentities = bound.reviewIdentities.map((identity) => identity === 'review-hash' ? bindings.review : identity);
  if (bound.humanDispositionIdentity === 'human-disposition-hash') bound.humanDispositionIdentity = bindings.human;
  if (bound.custodianAuthorizationIdentity === 'custodian-authorization-hash') bound.custodianAuthorizationIdentity = bindings.custodian;
  if (bound.sourceContractIdentity === 'contract-hash') bound.sourceContractIdentity = bindings.contract;
  if (priorIdentityMap.has(bound.provenance?.priorContentIdentity)) {
    bound.provenance.priorContentIdentity = priorIdentityMap.get(bound.provenance.priorContentIdentity);
  }
  bound.contentIdentity = centralSemanticContent(bound);
  return bound;
}

async function readCaseDirectory(root) {
  const values = [];
  for (const name of (await readdir(root)).filter((item) => item.endsWith('.md')).sort()) {
    values.push((await observe(path.join(root, name))).value);
  }
  return values;
}

function caseAuthorityBindingsComplete(cases, bindings) {
  return cases.every((value) => canonical(value.reviewIdentities) === canonical([bindings.review])
    && value.humanDispositionIdentity === bindings.human
    && value.custodianAuthorizationIdentity === bindings.custodian
    && value.sourceContractIdentity === bindings.contract);
}

export async function runCustodyScenario(sourceRoot = ROOT, scenario) {
  const fixture = await makeFixture(sourceRoot, 'custody');
  try {
    const central = path.join(fixture.root, 'central-source', 'task-docs', 'cases');
    await mkdir(central, { recursive: true });
    const input = path.join(fixture.root, 'custody-inputs');
    await mkdir(input, { recursive: true });
    const rawPreCases = (scenario.preCases ?? []).map((value) => centralCase(value));
    const rawPostCases = (scenario.postCases ?? rawPreCases).map((value) => centralCase(value));
    const sourcePath = path.join(input, 'source-evidence.json');
    await writeExclusive(sourcePath, canonicalBytes({
      sourceRunIdentities: Array.from({ length: scenario.sourceCount ?? 1 }, (_, index) => `synthetic-run-${index + 1}`),
      evidenceIdentity: sha256(canonical(rawPostCases.map(({ caseIdentity, contentIdentity }) => ({ caseIdentity, contentIdentity })))),
    }));
    const sourceObservation = await observe(sourcePath);
    const candidatePath = path.join(input, 'case-candidate.json');
    await writeExclusive(candidatePath, canonicalBytes({
      action: scenario.action,
      sourceEvidenceIdentity: sourceObservation.hash,
      targetCaseIdentities: rawPostCases.map(({ caseIdentity }) => caseIdentity),
    }));
    const candidateObservation = await observe(candidatePath);

    const artifactVariant = scenario.custodyArtifact ?? scenario.custodyArtifacts ?? 'current';
    const missingAll = artifactVariant === 'missing';
    let reviewObservation = null;
    if (!missingAll && artifactVariant !== 'review-missing') {
      const reviewPath = path.join(input, 'independent-review.json');
      await writeExclusive(reviewPath, canonicalBytes({
        reviewType: 'central-case-candidate-review',
        candidateIdentity: scenario.reviewCurrent === false || artifactVariant === 'review-stale'
          ? sha256(`stale:${candidateObservation.hash}`) : candidateObservation.hash,
        completion: 'complete',
        strictVerdict: 'PASS',
        promotionAuthority: false,
      }));
      reviewObservation = await observe(reviewPath);
    }
    let mainObservation = null;
    if (!missingAll && artifactVariant !== 'main-missing') {
      const mainPath = path.join(input, 'main-disposition.json');
      await writeExclusive(mainPath, canonicalBytes({
        reviewIdentity: scenario.mainDispositionCurrent === false || artifactVariant === 'main-stale'
          ? sha256(`stale:${reviewObservation?.hash ?? 'missing'}`) : reviewObservation?.hash ?? null,
        disposition: 'eligible-for-human-custody',
        action: scenario.action,
      }));
      mainObservation = await observe(mainPath);
    }
    let humanObservation = null;
    if (!missingAll && artifactVariant !== 'human-missing') {
      const enumerated = rawPostCases.map(({ caseIdentity }) => caseIdentity);
      if (scenario.humanEnumeratedChangesOnly === false) enumerated.pop();
      const humanPath = path.join(input, 'human-disposition.json');
      await writeExclusive(humanPath, canonicalBytes({
        mainDispositionIdentity: scenario.humanDispositionCurrent === false || artifactVariant === 'human-stale'
          ? sha256(`stale:${mainObservation?.hash ?? 'missing'}`) : mainObservation?.hash ?? null,
        decision: 'authorize-controlled-fixture-custody',
        action: scenario.action,
        enumeratedCaseIdentities: enumerated,
        semanticIntentIdentity: scenario.semanticConflict === true
          ? sha256(`conflict:${scenario.action}`) : sha256(canonical({ action: scenario.action })),
        applicabilityStrictlyNarrower: scenario.applicabilityStrictlyNarrower ?? true,
      }));
      humanObservation = await observe(humanPath);
    }
    const targetRoot = scenario.realRepositoryTarget === true
      ? path.join(sourceRoot, 'task-docs', 'cases')
      : scenario.containedSourceOnlyTarget === false
        ? path.join(fixture.root, 'central-source', 'task-docs', 'outside-cases')
        : central;
    let custodianObservation = null;
    if (!missingAll && artifactVariant !== 'custodian-missing') {
      const custodianPath = path.join(input, 'custodian-authorization.json');
      await writeExclusive(custodianPath, canonicalBytes({
        humanDispositionIdentity: scenario.custodianAuthorizationCurrent === false || artifactVariant === 'custodian-stale'
          ? sha256(`stale:${humanObservation?.hash ?? 'missing'}`) : humanObservation?.hash ?? null,
        custodian: 'case-library-custodian',
        targetRoot,
        sourceOnly: true,
      }));
      custodianObservation = await observe(custodianPath);
    }
    const bindings = {
      review: reviewObservation?.hash ?? null,
      human: humanObservation?.hash ?? null,
      custodian: custodianObservation?.hash ?? null,
      contract: fixture.contract.contractDigest,
    };
    const boundPreCases = rawPreCases.map((value) => bindCaseAuthorities(value, bindings));
    const priorIdentityMap = new Map(rawPreCases.map((value, index) => [value.contentIdentity, boundPreCases[index].contentIdentity]));
    const boundPostCases = rawPostCases.map((value) => bindCaseAuthorities(value, bindings, priorIdentityMap));
    if (scenario.contentComplete === false && boundPostCases[0]) {
      delete boundPostCases[0].failureSignal;
      boundPostCases[0].contentIdentity = centralSemanticContent(boundPostCases[0]);
    }
    for (const value of boundPreCases) await writeExclusive(path.join(central, `${value.caseIdentity}.md`), canonicalBytes(value));
    const before = await manifestTree(central);
    const protectedBefore = await manifestTree(path.join(fixture.root, 'protected'));
    if (scenario.protectedOrPackageDelta === true) {
      await writeExclusive(path.join(fixture.root, 'protected', 'custody-delta.txt'), Buffer.from('forbidden protected delta\n'));
    }
    const protectedAfter = await manifestTree(path.join(fixture.root, 'protected'));
    const runAuthorityPath = path.join(input, 'run-authority.json');
    await writeExclusive(runAuthorityPath, canonicalBytes({
      currentActor: scenario.actorMatchesCustodian === false ? 'main' : 'case-library-custodian',
      targetRoot,
    }));
    const runAuthorityObservation = await observe(runAuthorityPath);
    const expectedAddedIds = boundPostCases.map(({ caseIdentity }) => caseIdentity)
      .filter((identity) => !boundPreCases.some((value) => value.caseIdentity === identity));
    const targetDescriptorPath = path.join(input, 'target-descriptor.json');
    await writeExclusive(targetDescriptorPath, canonicalBytes({
      targetRoot,
      expectedAbsentCaseIdentities: expectedAddedIds,
      observedExistingTargetIdentities: scenario.targetAbsent === false ? expectedAddedIds : [],
      reservedExistingSuccessorIdentities: scenario.successorAbsent === false ? expectedAddedIds : [],
      enumeratedPaths: scenario.duplicateIdentityOrPath === true ? ['duplicate.md', 'duplicate.md'] : boundPostCases.map(({ caseIdentity }) => `${caseIdentity}.md`),
    }));
    const targetDescriptorObservation = await observe(targetDescriptorPath);
    const libraryEntries = before.filter(({ type }) => type === 'file').map(({ path: item, hash }) => ({ path: item, hash }));
    if (scenario.preimageConflict === true) {
      if (libraryEntries[0]) libraryEntries[0].hash = sha256(`conflict:${libraryEntries[0].hash}`);
      else libraryEntries.push({ path: 'ghost-case.md', hash: sha256('ghost-case') });
    }
    const expectedLibraryIdentity = manifestIdentity({ targetRoot: central, entries: before.filter(({ type }) => type === 'file').map(({ path: item, hash }) => ({ path: item, hash })) });
    const libraryPath = path.join(input, 'library-manifest.json');
    await writeExclusive(libraryPath, canonicalBytes({
      targetRoot: central,
      entries: libraryEntries,
      currentnessIdentity: scenario.libraryManifestCurrent === false || artifactVariant === 'library-stale'
        ? sha256(`stale:${expectedLibraryIdentity}`) : expectedLibraryIdentity,
    }));
    const libraryObservation = await observe(libraryPath);
    const proposalPath = path.join(input, 'postimage-proposal.json');
    await writeExclusive(proposalPath, canonicalBytes({ action: scenario.action, cases: boundPostCases }));
    const proposalObservation = await observe(proposalPath);
    const preCases = await readCaseDirectory(central);
    const postCases = proposalObservation.value.cases;
    const targetStatuses = preCases.map(({ status }) => status).sort();
    const actualLibraryEntries = before.filter(({ type }) => type === 'file').map(({ path: item, hash }) => ({ path: item, hash }));
    const reviewCurrent = reviewObservation !== null
      && reviewObservation.value.candidateIdentity === candidateObservation.hash
      && reviewObservation.value.completion === 'complete' && reviewObservation.value.strictVerdict === 'PASS';
    const mainDispositionCurrent = mainObservation !== null
      && mainObservation.value.reviewIdentity === reviewObservation?.hash
      && mainObservation.value.disposition === 'eligible-for-human-custody';
    const humanDispositionCurrent = humanObservation !== null
      && humanObservation.value.mainDispositionIdentity === mainObservation?.hash
      && humanObservation.value.decision === 'authorize-controlled-fixture-custody';
    const custodianAuthorizationCurrent = custodianObservation !== null
      && custodianObservation.value.humanDispositionIdentity === humanObservation?.hash
      && custodianObservation.value.targetRoot === targetRoot;
    const authorityBindingsComplete = bindings.review !== null && bindings.human !== null && bindings.custodian !== null
      && caseAuthorityBindingsComplete([...preCases, ...postCases], bindings);
    const proposalIds = postCases.map(({ caseIdentity }) => caseIdentity);
    const contentComplete = postCases.every((value) => fixture.contract.byId.get('central-case.content').value.fields.every((field) => Object.hasOwn(value, field)));
    const commonFacts = {
      phase: 'plan',
      action: proposalObservation.value.action,
      sourceCount: sourceObservation.value.sourceRunIdentities.length,
      targetCount: preCases.length,
      targetStatus: preCases[0]?.status,
      targetStatusKey: targetStatuses.join(','),
      targetAbsent: expectedAddedIds.every((identity) => !targetDescriptorObservation.value.observedExistingTargetIdentities.includes(identity)),
      applicabilityStrictlyNarrower: humanObservation?.value.applicabilityStrictlyNarrower === true,
      containedSourceOnlyTarget: targetRoot === central && targetDescriptorObservation.value.targetRoot === central,
      actorMatchesCustodian: runAuthorityObservation.value.currentActor === 'case-library-custodian'
        && (custodianObservation === null || custodianObservation.value.custodian === runAuthorityObservation.value.currentActor),
      protectedOrPackageDelta: canonical(protectedBefore) !== canonical(protectedAfter),
      realRepositoryTarget: targetRoot === path.join(sourceRoot, 'task-docs', 'cases') || targetRoot === path.join(CANONICAL_ROOT, 'task-docs', 'cases'),
      humanDispositionCurrent: humanDispositionCurrent && authorityBindingsComplete,
      custodianAuthorizationCurrent: custodianAuthorizationCurrent && authorityBindingsComplete,
      reviewCurrent: reviewCurrent && authorityBindingsComplete,
      mainDispositionCurrent: mainDispositionCurrent && authorityBindingsComplete,
      libraryManifestCurrent: libraryObservation.value.targetRoot === central && libraryObservation.value.currentnessIdentity === expectedLibraryIdentity,
      preimageConflict: canonical(libraryObservation.value.entries) !== canonical(actualLibraryEntries),
      duplicateIdentityOrPath: new Set(proposalIds).size !== proposalIds.length
        || new Set(targetDescriptorObservation.value.enumeratedPaths).size !== targetDescriptorObservation.value.enumeratedPaths.length,
      successorAbsent: expectedAddedIds.every((identity) => !targetDescriptorObservation.value.reservedExistingSuccessorIdentities.includes(identity)),
      contentComplete,
      semanticConflict: humanObservation?.value.semanticIntentIdentity !== sha256(canonical({ action: proposalObservation.value.action })),
      humanEnumeratedChangesOnly: sameSet(humanObservation?.value.enumeratedCaseIdentities ?? [], proposalIds),
    };
    const plan = decide(fixture.contract, 'central-case-custody', commonFacts);
    const postimageMatchesPlan = plan.result.code === 'CUSTODY_ACTION_READY'
      && validateCustodyPostimages(fixture.contract, plan.result, preCases, postCases);
    if (plan.result.code === 'CUSTODY_ACTION_READY' && (postimageMatchesPlan || scenario.publishFalsePostimage)) {
      const postIds = new Set(postCases.map(({ caseIdentity }) => caseIdentity));
      for (const value of postCases) await writeReplace(path.join(central, `${value.caseIdentity}.md`), canonicalBytes(value));
      for (const value of preCases) if (!postIds.has(value.caseIdentity)) await rm(path.join(central, `${value.caseIdentity}.md`));
    }
    const after = await manifestTree(central);
    const delta = fileDelta(before, after);
    const readback = decide(fixture.contract, 'central-case-custody', {
      ...commonFacts,
      phase: 'readback',
      postimageMatchesPlan: postimageMatchesPlan && delta.add.length === plan.result.addCount
        && delta.replace.length === plan.result.replaceCount && delta.remove.length === plan.result.deleteCount,
    });
    return {
      plan,
      readback,
      before,
      after,
      delta,
      postimageMatchesPlan,
      observations: {
        sourceEvidence: { path: 'custody-inputs/source-evidence.json', hash: sourceObservation.hash },
        candidate: { path: 'custody-inputs/case-candidate.json', hash: candidateObservation.hash },
        review: reviewObservation && { path: 'custody-inputs/independent-review.json', hash: reviewObservation.hash, current: reviewCurrent },
        mainDisposition: mainObservation && { path: 'custody-inputs/main-disposition.json', hash: mainObservation.hash, current: mainDispositionCurrent },
        humanDisposition: humanObservation && { path: 'custody-inputs/human-disposition.json', hash: humanObservation.hash, current: humanDispositionCurrent },
        custodianAuthorization: custodianObservation && { path: 'custody-inputs/custodian-authorization.json', hash: custodianObservation.hash, current: custodianAuthorizationCurrent },
        runAuthority: { path: 'custody-inputs/run-authority.json', hash: runAuthorityObservation.hash },
        targetDescriptor: { path: 'custody-inputs/target-descriptor.json', hash: targetDescriptorObservation.hash },
        libraryManifest: { path: 'custody-inputs/library-manifest.json', hash: libraryObservation.hash },
        proposal: { path: 'custody-inputs/postimage-proposal.json', hash: proposalObservation.hash },
        authorityBindings: { ...bindings, complete: authorityBindingsComplete },
        protectedBeforeIdentity: manifestIdentity(protectedBefore),
        protectedAfterIdentity: manifestIdentity(protectedAfter),
        decisionFacts: commonFacts,
      },
    };
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
}

export async function runLearningBarrierScenario(sourceRoot = ROOT, scenario = {}) {
  const fixture = await makeFixture(sourceRoot, 'barrier');
  try {
    const requestPath = path.join(fixture.root, 'run', 'learning-change-request.json');
    await writeExclusive(requestPath, canonicalBytes({
      requestedHarnessMutation: scenario.requestedHarnessMutation ?? false,
      requestedGlobalMust: scenario.requestedGlobalMust ?? false,
      requestedLaunch: scenario.requestedLaunch ?? false,
    }));
    const requestObservation = await observe(requestPath);
    const authorityPath = path.join(fixture.root, 'run', 'learning-change-authority.json');
    await writeExclusive(authorityPath, canonicalBytes({
      reviewedCaseEvidenceIdentity: scenario.reviewedCaseEvidence === true ? sha256('reviewed-case-evidence') : null,
      laterExplicitHumanDecisionIdentity: scenario.laterExplicitHumanDecision === true ? sha256('human-decision') : null,
      newTaskIdentity: scenario.newTaskIdentity === true ? sha256('new-task') : null,
      mainBoundaryIdentity: scenario.mainBoundaryIssued === true ? sha256('main-boundary') : null,
    }));
    const authorityObservation = await observe(authorityPath);
    const before = await manifestTree(path.join(fixture.root, 'protected'));
    const decision = decide(fixture.contract, 'learning-change-route', {
      requestedHarnessMutation: requestObservation.value.requestedHarnessMutation === true,
      requestedGlobalMust: requestObservation.value.requestedGlobalMust === true,
      requestedLaunch: requestObservation.value.requestedLaunch === true,
      reviewedCaseEvidence: authorityObservation.value.reviewedCaseEvidenceIdentity !== null,
      laterExplicitHumanDecision: authorityObservation.value.laterExplicitHumanDecisionIdentity !== null,
      newTaskIdentity: authorityObservation.value.newTaskIdentity !== null,
      mainBoundaryIssued: authorityObservation.value.mainBoundaryIdentity !== null,
    });
    const after = await manifestTree(path.join(fixture.root, 'protected'));
    return {
      decision,
      before,
      after,
      zeroDelta: canonical(before) === canonical(after),
      observations: {
        request: { path: 'run/learning-change-request.json', hash: requestObservation.hash },
        authority: { path: 'run/learning-change-authority.json', hash: authorityObservation.hash },
      },
    };
  } finally {
    await rm(fixture.root, { recursive: true, force: true });
  }
}

export async function inspectPackageAbsence(sourceRoot = ROOT) {
  const paths = ['packaging/bundle-map.json', 'src/bundle/compiler.mjs', 'src/bundle/validation.mjs'];
  const before = Object.fromEntries(await Promise.all(paths.map(async (relative) => [relative, sha256(await readFile(path.join(sourceRoot, relative)))])));
  const map = JSON.parse(await readFile(path.join(sourceRoot, 'packaging/bundle-map.json'), 'utf8'));
  const serialized = canonical(map);
  const containsHistory = serialized.includes('task-docs/history/');
  const containsCases = serialized.includes('task-docs/cases/');
  const after = Object.fromEntries(await Promise.all(paths.map(async (relative) => [relative, sha256(await readFile(path.join(sourceRoot, relative)))])));
  return { before, after, containsHistory, containsCases, unchanged: canonical(before) === canonical(after) };
}

export async function assertRealLearningPathsAbsent(sourceRoot = ROOT) {
  const candidates = [
    path.join(sourceRoot, 'task-docs', 'cases'),
    path.join(CANONICAL_ROOT, 'task-docs', 'cases'),
  ];
  for (const candidate of candidates) {
    try {
      await access(candidate);
      return false;
    } catch {}
  }
  return true;
}

export async function directoryFiles(root) {
  const result = [];
  async function walk(current, relative = '') {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const childRelative = relative ? `${relative}/${entry.name}` : entry.name;
      if (entry.isDirectory()) await walk(path.join(current, entry.name), childRelative);
      else result.push(childRelative);
    }
  }
  await walk(root);
  return result.sort();
}

export function hashEvidence(value) {
  return createHash('sha256').update(canonical(value)).digest('hex');
}
