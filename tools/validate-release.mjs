#!/usr/bin/env node
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import {
  cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { assertRuntimeReferenceClosure } from '../src/bundle/compiler.mjs';
import { validateReleaseContents } from '../src/installer/package-bundle.mjs';

export const ROOT = fileURLToPath(new URL('..', import.meta.url));
const VERSION = '0.1.0';
const PROFILE_PATHS = [
  '.codex/agents/oh-my-harness-executor.toml',
  '.codex/agents/oh-my-harness-orchestration-reviewer.toml',
  '.codex/agents/oh-my-harness-plan-evaluator.toml',
  '.codex/agents/oh-my-harness-planner.toml',
  '.codex/agents/oh-my-harness-requirements-author.toml',
  '.codex/agents/oh-my-harness-requirements-evaluator.toml',
  '.codex/agents/oh-my-harness-result-evaluator.toml',
  '.codex/agents/oh-my-harness-solution-designer.toml',
  '.codex/agents/oh-my-harness-solution-evaluator.toml',
];
const REPORT_CAPABLE_PROFILE_PATHS = new Set([
  '.codex/agents/oh-my-harness-orchestration-reviewer.toml',
  '.codex/agents/oh-my-harness-plan-evaluator.toml',
  '.codex/agents/oh-my-harness-requirements-evaluator.toml',
  '.codex/agents/oh-my-harness-result-evaluator.toml',
  '.codex/agents/oh-my-harness-solution-evaluator.toml',
]);
const PROFILE_MISSIONS = new Map([
  ['.codex/agents/oh-my-harness-requirements-author.toml', {
    name: 'oh_my_harness_requirements_author',
    description: 'Produces one source-backed Requirements candidate under a main-thread packet.',
    mission: /Produce exactly one source-backed Requirements candidate at the path authorized by the main-thread packet\./,
  }],
  ['.codex/agents/oh-my-harness-requirements-evaluator.toml', {
    name: 'oh_my_harness_requirements_evaluator',
    description: 'Writes one strict independent Requirements review report from original sources.',
    mission: /Independently inspect the exact Requirements candidate, original request sources, and current facts named by the main-thread packet\./,
  }],
  ['.codex/agents/oh-my-harness-planner.toml', {
    name: 'oh_my_harness_planner',
    description: 'Produces one source-backed, acceptance-closed Task Plan candidate under a main-thread packet.',
    mission: /Produce exactly one acceptance-closed Task Plan candidate at the path authorized by the main-thread packet\./,
  }],
  ['.codex/agents/oh-my-harness-plan-evaluator.toml', {
    name: 'oh_my_harness_plan_evaluator',
    description: 'Writes one strict independent Task Plan review report from exact primary evidence.',
    mission: /Independently inspect the exact Task Plan candidate and exact upstream sources named by the main-thread packet\./,
  }],
  ['.codex/agents/oh-my-harness-solution-designer.toml', {
    name: 'oh_my_harness_solution_designer',
    description: 'Produces one concrete Technical Solution Design candidate for one frozen Task.',
    mission: /produce exactly one concrete Technical Solution Design candidate for one Frozen Plan Task at the path authorized by the main-thread packet\./,
    solutionRole: 'Designer',
    forbiddenAuthorityConcepts: new Map([
      ['Boundary', /\bBoundary\b/],
      ['execution Contract', /\bContract\b/],
      ['permission artifact', /\bpermission artifact\b/],
      ['Task acceptance criteria', /\bTask acceptance criteria\b/],
      ['lifecycle decision', /\blifecycle decision\b/],
      ['agent-launch instruction', /\bagent-launch instruction\b/],
    ]),
  }],
  ['.codex/agents/oh-my-harness-solution-evaluator.toml', {
    name: 'oh_my_harness_solution_evaluator',
    description: 'Writes one strict independent Technical Solution Design review report.',
    mission: /Perform one strict Technical Solution Design review of the exact candidate and exact Frozen Plan\/upstream evidence named by the main-thread packet\./,
    solutionRole: 'Evaluator',
    forbiddenAuthorityConcepts: new Map([
      ['Boundary', /\bBoundary\b/],
      ['execution Contract', /\bContract\b/],
      ['permission artifact', /\bpermission artifact\b/],
      ['Task acceptance criteria', /\bTask acceptance criteria\b/],
      ['lifecycle decision', /\blifecycle decision\b/],
    ]),
  }],
  ['.codex/agents/oh-my-harness-executor.toml', {
    name: 'oh_my_harness_executor',
    description: 'Executes exactly one Frozen Plan Task under one main-issued attempt Boundary.',
    mission: /Execute exactly one Frozen Plan Task under exactly one current main-issued Boundary or packet/,
  }],
  ['.codex/agents/oh-my-harness-result-evaluator.toml', {
    name: 'oh_my_harness_result_evaluator',
    description: 'Writes one strict producer-independent QA report for an actual bounded result.',
    mission: /Independently inspect the actual result, exact controlling Boundary\/upstream, producer evidence, current state, and every assigned acceptance criterion\./,
  }],
  ['.codex/agents/oh-my-harness-orchestration-reviewer.toml', {
    name: 'oh_my_harness_orchestration_reviewer',
    description: 'Writes one strict advisory review of bounded orchestration governance.',
    mission: /Independently review the exact bounded topology, packet, routing, intervention, transition, or acceptance rationale named by the main-thread packet\./,
  }],
]);
const MANAGED_ROUTE_DESTINATIONS = [
  '.oh-my-harness/docs/agent-routing/README.md',
  '.oh-my-harness/protocols/adaptive-orchestration-protocol.md',
  '.oh-my-harness/docs/agent-routing/external-systems-and-secrets.md',
  '.oh-my-harness/docs/agent-routing/current-state-evidence.md',
  '.oh-my-harness/docs/agent-routing/high-risk-actions.md',
  '.oh-my-harness/docs/agent-routing/task-planning-scale.md',
  '.oh-my-harness/docs/agent-routing/implementation-boundary.md',
  '.oh-my-harness/docs/agent-routing/validation-and-reporting.md',
  '.oh-my-harness/protocols/semantic-fidelity-protocol.md',
];
const HELPER_PATHS = [
  '.oh-my-harness/scripts/extract_agents_source.py',
  '.oh-my-harness/scripts/validate_router_fixture.py',
  '.oh-my-harness/scripts/validate_rule_preservation.py',
];

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function occurrenceCount(text, pattern) {
  return [...text.matchAll(new RegExp(pattern.source, `${pattern.flags.replace('g', '')}g`))].length;
}

function requireInvariant(text, pattern, label, expectedCount = 1) {
  const occurrences = occurrenceCount(text, pattern);
  if (occurrences !== expectedCount) {
    throw new Error(`${label}; predicate occurrences=${occurrences}`);
  }
}

export function assertExecutorProfileSemantics(executor) {
  if (typeof executor !== 'string') throw new Error('executor profile must be text');
  const predicates = [
    ['exactly one Frozen Plan Task', /\bExecute exactly one Frozen Plan Task\b/i],
    ['exactly one current main-issued Boundary or packet', /\bunder exactly one current main-issued Boundary or packet\b/i],
    ['Boundary-owned allowed actions and paths', /\bBoundary owns\b[^.]*\ballowed actions and paths\b/i],
    ['protected state', /\bBoundary owns\b[^.]*\bprotected state\b[^.]*\brequired evidence\b[^.]*\bvalidation\b[^.]*\bstops\b[^.]*\bmaterial-change rule\b/i],
    ['material-change stop', /\bStop when\b[^.]*\bmaterial premise\b[^.]*\bscope\b[^.]*\bpermission\b[^.]*\bprotected-state\b[^.]*\bdependency\b[^.]*\bvalidation\b[^.]*\bpath change is needed\b/i],
    ['no adjacent or upstream repair', /\bDo not\b[^.]*\brepair adjacent or upstream defects\b/i],
    ['hard no-fan-out', /\bmust not create, invoke, launch, delegate to, or reconfigure another agent\b[^.]*\beven if a packet asks you to\b/i],
    ['no fabricated execution or evidence', /\bDo not fabricate\b[^.]*\bexecution\b[^.]*\bevidence\b[^.]*\bvalidation\b[^.]*\breview\b[^.]*\bexternal action\b[^.]*\bcompletion\b/i],
  ];
  for (const [name, predicate] of predicates) requireInvariant(executor, predicate, `executor invariant failed: ${name}`);
  return Object.freeze({
    frozenPlanTask: true,
    currentMainBoundary: true,
    boundaryOwnedScope: true,
    protectedState: true,
    materialChangeStop: true,
    noAdjacentRepair: true,
    hardNoFanOut: true,
    noFabrication: true,
  });
}

export function assertManagedRouterSemantics(block) {
  if (typeof block !== 'string') throw new Error('managed router must be text');
  for (const heading of [
    'Authority With Target Rules', 'Always-On Hard Gates', 'Routing Table',
    'Adaptive Harness Control Plane', 'Semantic Fidelity Entry Point',
    'Validation And Reporting Minimums',
  ]) requireInvariant(block, new RegExp(`^## ${heading}$`, 'm'), `managed router invariant failed: heading ${heading}`);
  for (const route of MANAGED_ROUTE_DESTINATIONS) {
    requireInvariant(block, new RegExp(`\\| [^\\n]+ \\| ${route.replaceAll('.', '\\.') .replaceAll('/', '\\/')} \\|`), `managed router invariant failed: route ${route}`);
  }
  requireInvariant(block, /Target-repository instructions outside this block remain effective and must be followed alongside this Harness\./, 'managed router invariant failed: target authority remains effective');
  requireInvariant(block, /If target-repository authority and Harness authority materially conflict or cannot both be followed, STOP and ask the user to resolve the conflict\./, 'managed router invariant failed: conflict returns to user');
  requireInvariant(block, /Do not silently overwrite, weaken, or take over either target-repository authority or Harness authority\./, 'managed router invariant failed: no authority takeover');
  requireInvariant(block, /There is no named mode, fixed capability sequence, compatibility branch, or automatic all-nine path\./, 'managed router invariant failed: no fixed topology');
  requireInvariant(block, /Only main selects and launches invocations, issues\/freezes Boundaries and packets,[^.]*accepts results\./, 'managed router invariant failed: main-only lifecycle');
  return Object.freeze({ targetAuthority: true, conflictStop: true, exactRoutes: MANAGED_ROUTE_DESTINATIONS.length });
}

function profileDescription(text, profilePath) {
  const match = text.match(/^description = "([^"]+)"$/m);
  if (!match) throw new Error(`profile invariant failed: description missing for ${profilePath}`);
  return match[1];
}

function assertSolutionForbiddenAuthority(text, { solutionRole, forbiddenAuthorityConcepts }) {
  const modalSentences = [...text.matchAll(/[^.\r\n]*\bmust not produce or review\b[^.\r\n]*\./gi)];
  if (modalSentences.length !== 1) {
    throw new Error(`solution invariant failed: ${solutionRole} forbidden-authority modal sentence uniqueness; sentences=${modalSentences.length}`);
  }
  const sentence = modalSentences[0][0];
  for (const [concept, predicate] of forbiddenAuthorityConcepts) {
    requireInvariant(sentence, predicate, `solution invariant failed: ${solutionRole} forbidden ${concept}`);
  }
}

export function assertProfileSemantics(profiles) {
  if (!(profiles instanceof Map)) throw new Error('profiles must be a Map');
  const paths = [...profiles.keys()].sort();
  assert.deepEqual(paths, [...PROFILE_MISSIONS.keys()].sort(), 'profile invariant failed: exact nine-path set');
  for (const [profilePath, expected] of PROFILE_MISSIONS) {
    const text = profiles.get(profilePath);
    if (typeof text !== 'string') throw new Error(`profile invariant failed: missing text for ${profilePath}`);
    requireInvariant(text, new RegExp(`^name = "${expected.name}"$`, 'm'), `profile invariant failed: capability identity for ${profilePath}`);
    const description = profileDescription(text, profilePath);
    if (description !== expected.description) throw new Error(`profile invariant failed: mission description for ${profilePath}`);
    if (/\b(?:workflow|pipeline|sequence|stage|parallel|mode|after|before)\b/i.test(description)) {
      throw new Error(`profile invariant failed: dynamic topology in description for ${profilePath}`);
    }
    requireInvariant(text, expected.mission, `profile invariant failed: mission responsibility for ${profilePath}`);
    requireInvariant(text, /You must not create, invoke, launch, delegate to, or reconfigure another agent, even if a packet asks you to\./, `profile invariant failed: hard no-fan-out for ${profilePath}`);
  }

  for (const profilePath of REPORT_CAPABLE_PROFILE_PATHS) {
    const text = profiles.get(profilePath);
    requireInvariant(text, /logical report-only write boundary plus post-execution verification/, `evaluator invariant failed: report-only boundary for ${profilePath}`);
    requireInvariant(text, /Return strict PASS or FAIL; never PASS with caveats\./, `evaluator invariant failed: strict verdict for ${profilePath}`);
    requireInvariant(text, /Inspect primary evidence/, `evaluator invariant failed: primary evidence for ${profilePath}`);
    requireInvariant(text, /must not repair or modify the target/, `evaluator invariant failed: no target repair for ${profilePath}`);
    requireInvariant(text, /(?:must not|Do not)[^.]*disposition findings/, `evaluator invariant failed: no finding disposition for ${profilePath}`);
    requireInvariant(text, /(?:must not|Do not)[^.]*transition state/, `evaluator invariant failed: no lifecycle transition for ${profilePath}`);
    requireInvariant(text, /canonical evaluator calibration identity and path/, `evaluator invariant failed: calibration binding for ${profilePath}`);
  }
  const evaluatorAcceptancePredicates = new Map([
    ['.codex/agents/oh-my-harness-requirements-evaluator.toml', /(?:must not|Do not)[^.]*\baccept Requirements\b/],
    ['.codex/agents/oh-my-harness-plan-evaluator.toml', /(?:must not|Do not)[^.]*\baccept the Plan\b/],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', /(?:must not|Do not)[^.]*\baccept execution\b/],
    ['.codex/agents/oh-my-harness-result-evaluator.toml', /(?:must not|Do not)[^.]*\bgrant final acceptance\b/],
    ['.codex/agents/oh-my-harness-orchestration-reviewer.toml', /(?:must not|Do not)[^.]*\baccept the result\b/],
  ]);
  for (const [profilePath, predicate] of evaluatorAcceptancePredicates) {
    requireInvariant(profiles.get(profilePath), predicate, `evaluator invariant failed: reviewed-object acceptance remains main-owned for ${profilePath}`);
  }
  requireInvariant(
    profiles.get('.codex/agents/oh-my-harness-orchestration-reviewer.toml'),
    /must not[^.]*change topology/,
    'evaluator invariant failed: orchestration topology remains main-owned',
  );

  const designer = profiles.get('.codex/agents/oh-my-harness-solution-designer.toml');
  const evaluator = profiles.get('.codex/agents/oh-my-harness-solution-evaluator.toml');
  requireInvariant(designer, /produce exactly one concrete Technical Solution Design candidate for one Frozen Plan Task/, 'solution invariant failed: Designer Technical-Design-only mission');
  requireInvariant(evaluator, /Perform one strict Technical Solution Design review of the exact candidate/, 'solution invariant failed: Evaluator Design-only mission');
  assertSolutionForbiddenAuthority(designer, PROFILE_MISSIONS.get('.codex/agents/oh-my-harness-solution-designer.toml'));
  assertSolutionForbiddenAuthority(evaluator, PROFILE_MISSIONS.get('.codex/agents/oh-my-harness-solution-evaluator.toml'));
  requireInvariant(designer, /Do not[^.]*\b(?:accept|acceptance)\b/, 'solution invariant failed: Designer no final acceptance');
  requireInvariant(evaluator, /Do not[^.]*\b(?:accept|acceptance)\b/, 'solution invariant failed: Evaluator no final acceptance');
  requireInvariant(designer, /Do not implement/, 'solution invariant failed: Designer no implementation');
  return Object.freeze({ profiles: profiles.size, evaluatorProfiles: REPORT_CAPABLE_PROFILE_PATHS.size, hardNoFanOut: true });
}

export function assertCalibrationBindings({ profiles, calibrationBytes, matrix, inventoryItems }) {
  if (!(profiles instanceof Map) || !Buffer.isBuffer(calibrationBytes)
      || typeof matrix !== 'string' || !Array.isArray(inventoryItems)) {
    throw new Error('calibration invariant failed: malformed physical inputs');
  }
  const calibrationSha256 = sha256(calibrationBytes);
  const bindingPattern = /Installed canonical evaluator calibration for this bundle: path `\.oh-my-harness\/calibration\/evaluator-calibration\.md`; SHA-256 `([0-9a-f]{64})`\./g;
  for (const [profilePath, text] of profiles) {
    const hashes = [...text.matchAll(bindingPattern)].map((match) => match[1]);
    if (REPORT_CAPABLE_PROFILE_PATHS.has(profilePath)) {
      if (hashes.length !== 1 || hashes[0] !== calibrationSha256) {
        throw new Error(`calibration invariant failed: exact evaluator binding for ${profilePath}`);
      }
    } else if (hashes.length !== 0) {
      throw new Error(`calibration invariant failed: producer or sixth-profile binding for ${profilePath}`);
    }
  }
  const ledgerHashes = [...matrix.matchAll(/Installed transformed calibration SHA-256: `([0-9a-f]{64})`/g)].map((match) => match[1]);
  if (ledgerHashes.length !== 1 || ledgerHashes[0] !== calibrationSha256) {
    throw new Error('calibration invariant failed: exact matrix hash relationship');
  }
  requireInvariant(matrix, /Canonical evaluator calibration path: \.oh-my-harness\/calibration\/evaluator-calibration\.md/, 'calibration invariant failed: installed matrix path');
  const profileBindings = inventoryItems.filter(({ transformations }) => transformations.includes('calibration-binding'));
  for (const item of profileBindings) {
    if (item.transformations.filter((value) => value === 'calibration-binding').length !== 1) {
      throw new Error(`calibration invariant failed: duplicate inventory evaluator binding for ${item.destinationPath}`);
    }
  }
  assert.deepEqual(
    profileBindings.map(({ destinationPath }) => destinationPath).sort(),
    [...REPORT_CAPABLE_PROFILE_PATHS].sort(),
    'calibration invariant failed: inventory evaluator binding set',
  );
  const matrixBindings = inventoryItems.filter(({ transformations }) => transformations.includes('calibration-ledger-binding'));
  for (const item of matrixBindings) {
    if (item.transformations.filter((value) => value === 'calibration-ledger-binding').length !== 1) {
      throw new Error(`calibration invariant failed: duplicate inventory matrix binding for ${item.destinationPath}`);
    }
  }
  assert.deepEqual(
    matrixBindings.map(({ destinationPath }) => destinationPath),
    ['.oh-my-harness/calibration/adaptive-orchestration-acceptance-matrix.md'],
    'calibration invariant failed: one matrix ledger binding',
  );
  return Object.freeze({ calibrationSha256, evaluatorBindings: profileBindings.length, matrixBindings: matrixBindings.length });
}

function rejectPositiveLegacySemantics(protocol) {
  const positiveLegacy = [
    /(?:select|enable|run|use|support|offer)[^.\n]{0,80}\b(?:full-v2|complete[ -]v2)\b/i,
    /\b(?:full-v2|complete[ -]v2)\b[^.\n]{0,80}\b(?:mode|pipeline|branch|workflow)\b/i,
    /\bfixed (?:six|nine)[ -]role (?:sequence|pipeline|workflow)\b/i,
    /\bexecution Contract (?:stage|Loop|template|authority|mode)\b/i,
    /\bparallel legacy workflow\b/i,
    /\bbounded-nesting (?:workflow|selector|mode)\b/i,
    /\bagent self-launch\b/i,
  ];
  for (const pattern of positiveLegacy) {
    const match = protocol.match(pattern);
    if (match) throw new Error(`adaptive invariant failed: prohibited legacy positive: ${match[0]}`);
  }
}

function assertMainExclusiveAuthority(protocol) {
  const startHeadingPattern = /^## Main-Exclusive Authority$/gm;
  const endHeadingPattern = /^## Technical Solution Design And Attempt Boundary$/gm;
  const startHeadings = [...protocol.matchAll(startHeadingPattern)];
  const endHeadings = [...protocol.matchAll(endHeadingPattern)];
  if (startHeadings.length !== 1) {
    throw new Error(`adaptive invariant failed: Main-Exclusive Authority start heading uniqueness; headings=${startHeadings.length}`);
  }
  if (endHeadings.length !== 1) {
    throw new Error(`adaptive invariant failed: Main-Exclusive Authority end heading uniqueness; headings=${endHeadings.length}`);
  }
  const start = startHeadings[0];
  const end = endHeadings[0];
  if (start.index >= end.index) {
    throw new Error('adaptive invariant failed: Main-Exclusive Authority heading order');
  }
  const afterStartHeading = start.index + start[0].length;
  const nextHeading = protocol.slice(afterStartHeading).match(/^## [^\r\n]+$/m);
  if (!nextHeading || afterStartHeading + nextHeading.index !== end.index) {
    throw new Error('adaptive invariant failed: Main-Exclusive Authority next level-2 heading');
  }
  const section = protocol.slice(afterStartHeading, end.index);
  const lists = [...section.matchAll(/^Only main may:[ \t]*\r?\n(?:[ \t]*\r?\n)?((?:- [^\r\n]+(?:\r?\n|$))+)/gm)];
  if (lists.length !== 1) {
    throw new Error(`adaptive invariant failed: Only main may list uniqueness; lists=${lists.length}`);
  }
  const list = lists[0][1];
  const actionFamilies = [
    ['goal and topology selection', /- reconstruct the user goal and select or revise topology;/],
    ['packet invocation and cancellation', /- issue packets, launch an invocation, or cancel\/supersede work;/],
    ['Boundary lifecycle', /- create, freeze, version, or amend an attempt Boundary;/],
    ['artifact and protected-scope verification', /- verify artifacts, hashes, protected inputs, and actual write scope;/],
    ['evaluator selection and launch', /- select and launch an evaluator or reviewer;/],
    ['finding retry transition and acceptance', /- classify failures and findings, authorize revision or retry, intervene, stop, unlock, transition, waive where allowed, or accept;/],
    ['evidence arbitration and synthesis', /- arbitrate conflicting evidence and produce the user-facing synthesis\./],
  ];
  for (const [label, predicate] of actionFamilies) {
    requireInvariant(list, predicate, `adaptive invariant failed: main-owned ${label}`);
  }
  requireInvariant(
    section,
    /Every capability is hard no-fan-out\./,
    'adaptive invariant failed: capability hard no-fan-out declaration',
  );
  requireInvariant(
    section,
    /An invoked capability must not create, invoke, launch, delegate to, or reconfigure another agent/,
    'adaptive invariant failed: capability no-fan-out modal prohibition',
  );
  return Object.freeze({ mainOwnedActionFamilies: actionFamilies.length });
}

export function assertAdaptiveProtocolSemantics(protocol) {
  if (typeof protocol !== 'string') throw new Error('adaptive protocol must be text');
  rejectPositiveLegacySemantics(protocol);
  requireInvariant(protocol, /The Harness is one main-thread-controlled adaptive system\./, 'adaptive invariant failed: one main-controlled system');
  requireInvariant(protocol, /The main thread selects the smallest fact-required subset of optional capabilities and owns every invocation and transition\./, 'adaptive invariant failed: fact-selected optional subset');
  requireInvariant(protocol, /Capability availability, risk labels, Harness naming, prior sequence, or artifact availability never select a workflow\./, 'adaptive invariant failed: facts not presets select topology');
  requireInvariant(protocol, /There are no selectable mode labels, stored role sequences, parallel compatibility branches, or automatic all-capability path\./, 'adaptive invariant failed: no fixed or parallel workflow');
  requireInvariant(protocol, /For LOW self-contained work with no gate or continuity trigger, main works directly, performs proportional validation, and creates no role invocation, Run tree, Context, Board, report, retrospective, or case\./, 'adaptive invariant failed: lightweight direct path');
  requireInvariant(protocol, /Capabilities and durable artifacts are optional\. Triggered gates are mandatory\./, 'adaptive invariant failed: optional capabilities and mandatory gates');
  requireInvariant(protocol, /Omitting a capability cannot omit the control commonly associated with it\./, 'adaptive invariant failed: omitted capability preserves gate');
  const mainExclusiveAuthority = assertMainExclusiveAuthority(protocol);
  requireInvariant(protocol, /Main derives the attempt-specific Boundary from the Frozen Task, accepted Design when present, current facts, protected state, and triggered gates\./, 'adaptive invariant failed: main owns Boundary');
  requireInvariant(protocol, /The Boundary may be:\n\n- inline for simple direct work;\n- carried by a delegated Task Packet; or\n- persisted and versioned when continuity/, 'adaptive invariant failed: equivalent Boundary forms');
  requireInvariant(protocol, /The five evaluator\/reviewer capabilities inspect primary evidence, issue strict PASS or FAIL, never repair or modify their target, and never start a producer, revision, or later invocation\./, 'adaptive invariant failed: evaluator lifecycle boundary');
  return Object.freeze({
    adaptiveSystem: true,
    mainOnlyLifecycle: true,
    lightweightPath: true,
    mandatoryGates: true,
    legacyWorkflow: false,
    mainOwnedActionFamilies: mainExclusiveAuthority.mainOwnedActionFamilies,
  });
}

function assertSafeManifestPath(relativePath) {
  if (typeof relativePath !== 'string' || !relativePath
      || relativePath.includes('\\') || relativePath.includes('\0')
      || path.posix.isAbsolute(relativePath) || path.posix.normalize(relativePath) !== relativePath
      || relativePath.split('/').includes('..')) {
    throw new Error(`terminal source-gate receipt has an unsafe manifest path: ${relativePath}`);
  }
}

export async function verifyTerminalSourceGate({
  sourceRoot = ROOT,
  receiptPath = process.env.OH_MY_HARNESS_SOURCE_GATE_RECEIPT,
  expectedReceiptSha256 = process.env.OH_MY_HARNESS_SOURCE_GATE_RECEIPT_SHA256,
} = {}) {
  if (!receiptPath || !expectedReceiptSha256) {
    throw new Error('release work requires an exact main-bound terminal source-gate receipt path and SHA-256');
  }
  if (!path.isAbsolute(receiptPath) || !/^[0-9a-f]{64}$/.test(expectedReceiptSha256)) {
    throw new Error('terminal source-gate receipt identity is malformed');
  }
  const [rootReal, receiptReal, receiptBytes] = await Promise.all([
    realpath(sourceRoot), realpath(receiptPath), readFile(receiptPath),
  ]);
  if (receiptReal === rootReal) throw new Error('terminal source-gate receipt cannot be the source root');
  if (sha256(receiptBytes) !== expectedReceiptSha256) throw new Error('terminal source-gate receipt hash mismatch');
  let receipt;
  try { receipt = JSON.parse(receiptBytes); } catch { throw new Error('terminal source-gate receipt is not valid JSON'); }
  assert.deepEqual(Object.keys(receipt).sort(), [
    'finalSourceManifestSha256', 'gateIdentity', 'gateReportSha256', 'gitHead',
    'schemaVersion', 'sourceFiles', 'sourceRootRealpath', 'state', 'upstreamTransitions',
  ]);
  assert.equal(receipt.schemaVersion, 1);
  assert.equal(receipt.state, 'SOURCE_GATED');
  assert.equal(receipt.sourceRootRealpath, rootReal);
  assert.match(receipt.gateIdentity, /^[A-Za-z0-9][A-Za-z0-9._:-]{7,255}$/);
  assert.match(receipt.gateReportSha256, /^[0-9a-f]{64}$/);
  assert.match(receipt.gitHead, /^[0-9a-f]{40}$/);
  assert.equal(receipt.gitHead, repositoryHead(rootReal));
  assert(Array.isArray(receipt.upstreamTransitions) && receipt.upstreamTransitions.length === 3);
  assert(receipt.upstreamTransitions.every((value) => /^[0-9a-f]{64}$/.test(value)));
  assert(Array.isArray(receipt.sourceFiles) && receipt.sourceFiles.length > 0);
  const paths = receipt.sourceFiles.map(({ path: relativePath }) => relativePath);
  assert.deepEqual(paths, [...paths].sort((left, right) => Buffer.from(left).compare(Buffer.from(right))));
  assert.equal(new Set(paths).size, paths.length);
  for (const entry of receipt.sourceFiles) {
    assert.deepEqual(Object.keys(entry).sort(), ['path', 'sha256']);
    assertSafeManifestPath(entry.path);
    assert.match(entry.sha256, /^[0-9a-f]{64}$/);
    const absolute = path.resolve(rootReal, ...entry.path.split('/'));
    if (absolute === rootReal || !absolute.startsWith(`${rootReal}${path.sep}`)) throw new Error(`source manifest escapes root: ${entry.path}`);
    const physical = await realpath(absolute);
    if (physical !== absolute) throw new Error(`source manifest path is missing, redirected, or symlinked: ${entry.path}`);
    const bytes = await readFile(physical);
    if (sha256(bytes) !== entry.sha256) throw new Error(`source changed after terminal gate: ${entry.path}`);
  }
  const canonical = `${receipt.sourceFiles.map((entry) => `${entry.path}\t${entry.sha256}`).join('\n')}\n`;
  assert.equal(sha256(Buffer.from(canonical)), receipt.finalSourceManifestSha256);
  return Object.freeze({
    gateIdentity: receipt.gateIdentity,
    finalSourceManifestSha256: receipt.finalSourceManifestSha256,
    receiptSha256: expectedReceiptSha256,
    sourceFiles: receipt.sourceFiles.length,
  });
}

function resolveExecutable(name) {
  for (const directory of (process.env.PATH ?? '').split(path.delimiter).filter(Boolean)) {
    const candidate = path.resolve(directory, name);
    try {
      const info = statSync(candidate);
      if (info.isFile() && (info.mode & 0o111)) return candidate;
    } catch {}
  }
  throw new Error(`${name} is unavailable under the verified PATH`);
}

function repositoryHead(root) {
  const git = resolveExecutable('git');
  const child = spawnSync(git, ['--no-optional-locks', 'rev-parse', '--verify', 'HEAD'], {
    cwd: root,
    env: {
      PATH: `${path.dirname(git)}:/usr/bin:/bin`, HOME: '/nonexistent',
      XDG_CONFIG_HOME: '/nonexistent', GIT_CONFIG_NOSYSTEM: '1',
      GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_SYSTEM: '/dev/null',
      GIT_OPTIONAL_LOCKS: '0', LC_ALL: 'C',
    },
    encoding: 'utf8',
  });
  if (child.status !== 0 || !/^[0-9a-f]{40}\n$/.test(child.stdout)) {
    throw new Error('terminal source-gate repository HEAD could not be verified');
  }
  return child.stdout.trim();
}

function run(executable, args, { cwd, environment, label }) {
  const assignments = Object.entries(environment).map(([key, value]) => `${key}=${value}`);
  const child = spawnSync('/usr/bin/env', ['-i', ...assignments, executable, ...args], {
    cwd, env: {}, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
  });
  if (child.error || child.signal || child.status !== 0) {
    throw new Error(`${label} failed: status=${child.status} signal=${child.signal ?? 'none'} detail=${child.error?.message ?? child.stderr.trim()}`);
  }
  return child.stdout;
}

function isolatedEnvironment(root, executables) {
  return {
    PATH: [...new Set([
      path.dirname(process.execPath), path.dirname(executables.npm), path.dirname(executables.python),
      '/usr/bin', '/bin',
    ])].join(path.delimiter),
    HOME: path.join(root, 'home'),
    XDG_CONFIG_HOME: path.join(root, 'xdg'),
    TMPDIR: path.join(root, 'tmp'),
    PYTHONPYCACHEPREFIX: path.join(root, 'pycache'),
    npm_config_userconfig: path.join(root, 'user.npmrc'),
    npm_config_globalconfig: path.join(root, 'global.npmrc'),
    npm_config_cache: path.join(root, 'cache'),
    npm_config_logs_dir: path.join(root, 'logs'),
    npm_config_tmp: path.join(root, 'tmp'),
    npm_config_offline: 'true',
    npm_config_audit: 'false',
    npm_config_fund: 'false',
    npm_config_update_notifier: 'false',
    npm_config_progress: 'false',
    npm_config_registry: 'http://127.0.0.1:9',
    LC_ALL: 'C',
  };
}

function repositoryStatus() {
  const git = resolveExecutable('git');
  const child = spawnSync(git, ['--no-optional-locks', '-c', 'core.hooksPath=/dev/null', '-c', 'core.fsmonitor=false', 'status', '--porcelain=v1', '-uall'], {
    cwd: ROOT, env: {
      PATH: `${path.dirname(git)}:/usr/bin:/bin`, HOME: '/nonexistent',
      XDG_CONFIG_HOME: '/nonexistent', GIT_CONFIG_NOSYSTEM: '1',
      GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_SYSTEM: '/dev/null',
      GIT_OPTIONAL_LOCKS: '0', LC_ALL: 'C',
    }, encoding: 'utf8',
  });
  if (child.status !== 0) throw new Error('could not capture repository status');
  return child.stdout;
}

async function repositoryResidue() {
  const names = ['dist', 'node_modules', '.npm', 'npm-cache', '__pycache__'];
  const present = [];
  for (const name of names) {
    try { await lstat(path.join(ROOT, name)); present.push(name); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  for (const name of await readdir(ROOT)) if (name.endsWith('.tgz') || name.startsWith('npm-debug')) present.push(name);
  return [...new Set(present)].sort();
}

async function stageFile(stageRoot, relativePath) {
  const destination = path.join(stageRoot, ...relativePath.split('/'));
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(ROOT, ...relativePath.split('/')), destination, { errorOnExist: true, force: false });
}

async function stagePackage(stageRoot) {
  await mkdir(stageRoot);
  await cp(path.join(ROOT, 'bin'), path.join(stageRoot, 'bin'), { recursive: true, errorOnExist: true, force: false });
  await mkdir(path.join(stageRoot, 'src'));
  await cp(path.join(ROOT, 'src/installer'), path.join(stageRoot, 'src/installer'), { recursive: true, errorOnExist: true, force: false });
  await cp(path.join(ROOT, 'src/bundle'), path.join(stageRoot, 'src/bundle'), { recursive: true, errorOnExist: true, force: false });
  const bundleMap = JSON.parse(await readFile(path.join(ROOT, 'packaging/bundle-map.json'), 'utf8'));
  const sourceFiles = new Set([
    'AGENTS.md', 'LICENSE', 'README.md', 'package.json',
    'packaging/bundle-map.json', 'packaging/managed-router-block.md',
    'packaging/package-contract.json', 'packaging/schemas/bundle-inventory.schema.json',
    'packaging/schemas/package-contract.schema.json',
    ...bundleMap.entries.map((entry) => entry.source),
  ]);
  for (const relativePath of [...sourceFiles].sort()) await stageFile(stageRoot, relativePath);
  return { sourceFiles: [...sourceFiles].sort() };
}

function releaseTreeHashes(release) {
  return [...release.files.entries()]
    .map(([relativePath, bytes]) => [relativePath, sha256(bytes)])
    .sort(([left], [right]) => Buffer.from(left).compare(Buffer.from(right)));
}

function tarEntries(archiveBytes) {
  const bytes = gunzipSync(archiveBytes);
  const entries = new Map();
  let offset = 0;
  while (offset + 512 <= bytes.length) {
    const header = bytes.subarray(offset, offset + 512);
    if (header.every((value) => value === 0)) break;
    const text = (start, length) => header.subarray(start, start + length).toString('utf8').replace(/\0.*$/s, '');
    const name = text(0, 100);
    const prefix = text(345, 155);
    const fullName = prefix ? `${prefix}/${name}` : name;
    const sizeText = text(124, 12).trim();
    const size = sizeText ? Number.parseInt(sizeText, 8) : 0;
    const type = String.fromCharCode(header[156] || 0x30);
    if (!Number.isSafeInteger(size) || size < 0 || entries.has(fullName)) throw new Error(`malformed archive entry: ${fullName}`);
    const contentStart = offset + 512;
    const contentEnd = contentStart + size;
    if (contentEnd > bytes.length) throw new Error(`archive entry exceeds bounds: ${fullName}`);
    if (type === '0' || type === '\0') entries.set(fullName, bytes.subarray(contentStart, contentEnd));
    else if (type !== '5') throw new Error(`unsupported archive entry type ${type}: ${fullName}`);
    offset = contentStart + Math.ceil(size / 512) * 512;
  }
  return entries;
}

async function expectedPackagePaths(stageRoot, release) {
  const installer = (await readdir(path.join(stageRoot, 'src/installer'))).sort();
  return [
    'LICENSE', 'README.md', 'package.json', 'bin/oh-my-harness.mjs',
    ...installer.map((name) => `src/installer/${name}`),
    ...[...release.files.keys()].map((name) => `dist/${name}`),
  ].sort();
}

function assertExactSet(actual, expected, label) {
  const actualSet = new Set(actual);
  const expectedSet = new Set(expected);
  const extra = [...actualSet].filter((item) => !expectedSet.has(item));
  const missing = [...expectedSet].filter((item) => !actualSet.has(item));
  if (extra.length || missing.length) throw new Error(`${label} mismatch; extra=${extra.join(',')} missing=${missing.join(',')}`);
}

async function releaseFromArchive(archive) {
  return validateReleaseContents({
    inventoryBytes: archive.get('package/dist/.oh-my-harness/bundle-inventory.json'),
    readPayload: async (relativePath) => archive.get(`package/dist/${relativePath}`) ?? null,
    packageVersion: VERSION,
  });
}

async function assertPackCleanup(stageRoot) {
  try {
    await lstat(path.join(stageRoot, 'dist'));
    throw new Error('standard package lifecycle retained generated dist output');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const archives = (await readdir(stageRoot)).filter((name) => name.endsWith('.tgz'));
  assert.deepEqual(archives, []);
}

function comparablePackMetadata(metadata) {
  return {
    id: metadata.id, name: metadata.name, version: metadata.version,
    filename: metadata.filename, size: metadata.size, unpackedSize: metadata.unpackedSize,
    shasum: metadata.shasum, integrity: metadata.integrity, files: metadata.files,
  };
}

export function findUnscopedInstallCommands(text) {
  return text.split(/\r?\n/).map((line) => line.trim()).filter((line) => {
    const command = line.replace(/^\$\s*/, '').replace(/^```(?:sh|shell|bash)?\s*/, '');
    return /^npx\s+(?:--yes\s+)?oh-my-harness(?:\s|$)/.test(command)
      || (/^npx\s/.test(command) && /--package=oh-my-harness(?:@|\s|$)/.test(command));
  });
}

async function guidanceEvidence(archive) {
  assert.equal(findUnscopedInstallCommands('npx oh-my-harness install --target repo').length, 1);
  assert.equal(findUnscopedInstallCommands('npx --yes --package=oh-my-harness oh-my-harness install --target repo').length, 1);
  assert.equal(findUnscopedInstallCommands('npx --yes --package=@guoxiaoshuai2023/oh-my-harness@1.0.0 oh-my-harness install --target repo').length, 0);
  const sourceSurfaces = [
    'README.md', 'docs/architecture.md', 'docs/adapters/codex-subagents.md',
    'docs/adoption/universal-harness-adoption-runbook.md', 'docs/adoption/bundle-lifecycle-spec.md',
    'bin/oh-my-harness.mjs',
  ];
  const violations = [];
  for (const relativePath of sourceSurfaces) {
    const text = await readFile(path.join(ROOT, relativePath), 'utf8');
    for (const command of findUnscopedInstallCommands(text)) violations.push(`${relativePath}:${command}`);
  }
  for (const [name, bytes] of archive) {
    for (const command of findUnscopedInstallCommands(bytes.toString('utf8'))) violations.push(`${name}:${command}`);
  }
  assert.deepEqual(violations, []);
  const readme = await readFile(path.join(ROOT, 'README.md'), 'utf8');
  const runbook = await readFile(path.join(ROOT, 'docs/adoption/universal-harness-adoption-runbook.md'), 'utf8');
  for (const operation of ['install', 'update', 'uninstall']) {
    assert(readme.includes(`oh-my-harness ${operation} --target <repo>`));
    assert(runbook.includes(`oh-my-harness ${operation} --target <repo> --dry-run`));
  }
  assert(readme.includes('--package=@guoxiaoshuai2023/oh-my-harness@'));
  return { scannedSourceSurfaces: sourceSurfaces.length, scannedArchiveFiles: archive.size, negativeFixtures: 2 };
}

async function documentationAndCiEvidence(release) {
  const documentPaths = [
    'README.md', 'docs/architecture.md', 'docs/adapters/codex-subagents.md',
    'docs/adoption/universal-harness-adoption-runbook.md', 'docs/adoption/bundle-lifecycle-spec.md',
  ];
  const documents = (await Promise.all(documentPaths.map((relativePath) => readFile(path.join(ROOT, relativePath), 'utf8')))).join('\n');
  for (const required of [
    '@guoxiaoshuai2023/oh-my-harness', 'oh-my-harness install', '.oh-my-harness',
    'oh-my-harness-', 'Node `>=24 <25`', 'Python 3.11', 'target', 'authority',
    'publication', 'evidence',
  ]) assert(documents.includes(required), required);
  const cli = await readFile(path.join(ROOT, 'src/installer/cli.mjs'), 'utf8');
  assert(cli.includes('usage: oh-my-harness <install|update|uninstall> --target <repo> [--dry-run] [--yes]'));
  assert(!cli.includes('npx oh-my-harness'));

  const ci = await readFile(path.join(ROOT, '.github/workflows/ci.yml'), 'utf8');
  for (const required of [
    'actions/setup-python@v5', 'python-version: "3.11"', 'python -m py_compile scripts/*.py',
    'Parse Codex agent profiles', 'Run router fixture smoke check', 'Validate unified source-governance structure',
    'actions/setup-node@v4', 'node-version: "24.14.0"', 'npm test',
    'source-gate', 'needs: source-gate', 'OH_MY_HARNESS_SOURCE_GATE_RECEIPT',
    'node --test test/acceptance/*.test.mjs', 'npm run validate:package', 'node tools/validate-release.mjs',
  ]) assert(ci.includes(required), required);
  const kindCounts = release.inventory.requiredFiles.reduce((counts, item) => {
    counts[item.kind] = (counts[item.kind] ?? 0) + 1;
    return counts;
  }, {});
  assert.equal(kindCounts.protocol, 3);
  assert.equal(kindCounts.template, 17);
  assert.equal(kindCounts.calibration, 2);
  return {
    sourceDocuments: documentPaths.length, cliBinarySyntax: true,
    packedProtocols: kindCounts.protocol, packedTemplates: kindCounts.template,
    packedCalibration: kindCounts.calibration, existingCiChecksRetained: true,
    nodePackageAcceptanceChecksInCi: true, unpublishedBoundary: true,
  };
}

export async function semanticEvidence(release) {
  const block = release.managedBlock.toString('utf8');
  const managedRouter = assertManagedRouterSemantics(block);
  const modality = Object.fromEntries(['must', 'must not', 'Do not', 'STOP', 'required'].map((token) => [token, block.split(token).length - 1]));
  assert(Object.values(modality).every((count) => count > 0));

  const profiles = new Map();
  for (const profilePath of PROFILE_PATHS) {
    const bytes = release.files.get(profilePath);
    if (!bytes) throw new Error(`profile invariant failed: missing release payload ${profilePath}`);
    profiles.set(profilePath, bytes.toString('utf8'));
  }
  const profileSemantics = assertProfileSemantics(profiles);
  const executor = profiles.get('.codex/agents/oh-my-harness-executor.toml');
  assertExecutorProfileSemantics(executor);
  const calibrationBindings = assertCalibrationBindings({
    profiles,
    calibrationBytes: release.files.get('.oh-my-harness/calibration/evaluator-calibration.md'),
    matrix: release.files.get('.oh-my-harness/calibration/adaptive-orchestration-acceptance-matrix.md').toString('utf8'),
    inventoryItems: release.inventory.requiredFiles,
  });
  const adaptive = release.files.get('.oh-my-harness/protocols/adaptive-orchestration-protocol.md').toString('utf8');
  const adaptiveSemantics = assertAdaptiveProtocolSemantics(adaptive);
  return {
    managedBlockSha256: sha256(release.managedBlock), modality,
    routeRows: managedRouter.exactRoutes,
    profiles: profileSemantics.profiles,
    evaluatorProfiles: profileSemantics.evaluatorProfiles,
    targetAuthority: managedRouter.targetAuthority,
    conflictStop: managedRouter.conflictStop,
    adaptiveSystem: adaptiveSemantics.adaptiveSystem,
    mainOnlyLifecycle: adaptiveSemantics.mainOnlyLifecycle,
    lightweightPath: adaptiveSemantics.lightweightPath,
    mandatoryGates: adaptiveSemantics.mandatoryGates,
    legacyWorkflow: adaptiveSemantics.legacyWorkflow,
    executorBoundary: true,
    evaluatorBoundary: true,
    calibrationSha256: calibrationBindings.calibrationSha256,
  };
}

async function extractArchive(archive, destination) {
  for (const [name, bytes] of archive) {
    const absolute = path.join(destination, ...name.split('/'));
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, bytes, { flag: 'wx' });
  }
}

async function pythonEvidence({ archive, root, environment, python }) {
  const extracted = path.join(root, 'extracted');
  await mkdir(extracted);
  await extractArchive(archive, extracted);
  const installedRoot = path.join(extracted, 'package/dist');
  const helperFiles = HELPER_PATHS.map((relativePath) => path.join(installedRoot, ...relativePath.split('/')));
  const pythonVersion = run(python, ['--version'], { cwd: extracted, environment, label: 'Python version' }).trim();
  assert.match(pythonVersion, /^Python 3\.11\./);
  run(python, ['-m', 'py_compile', ...helperFiles], { cwd: extracted, environment, label: 'packed helper compilation' });

  const fixtureRoot = path.join(root, 'python-fixtures');
  await mkdir(fixtureRoot);
  const source = path.join(fixtureRoot, 'AGENTS.md');
  const snapshot = path.join(fixtureRoot, 'snapshot.md');
  const draft = path.join(fixtureRoot, 'coverage-draft.md');
  await writeFile(source, '# Rules\n\n- MUST preserve target authority.\n');
  run(python, [helperFiles[0], source, '--snapshot', snapshot, '--coverage', draft, '--prefix', 'PACKED-SRC'], {
    cwd: fixtureRoot, environment, label: 'packed extract_agents_source.py',
  });
  assert((await readFile(snapshot, 'utf8')).includes('PACKED-SRC-0002'));
  assert((await readFile(draft, 'utf8')).includes('PACKED-SRC-0002'));

  const router = path.join(installedRoot, 'AGENTS.md');
  const routerFixture = path.join(installedRoot, '.oh-my-harness/templates/routing-scenario-matrix-template.md');
  await writeFile(router, releaseManagedBlockFromArchive(archive));
  const routerOutput = run(python, [helperFiles[1], '--router', router, '--fixture', routerFixture], {
    cwd: installedRoot, environment, label: 'packed validate_router_fixture.py',
  });
  assert(routerOutput.includes('router fixture smoke/coverage check passed'));

  const coverage = path.join(fixtureRoot, 'coverage.md');
  const ledger = path.join(fixtureRoot, 'ledger.md');
  await writeFile(coverage, [
    '| Source block ID | Original heading/context | Original excerpt | Classification | Force | Coverage rationale |',
    '| --- | --- | --- | --- | --- | --- |',
    '| `PACKED-SRC-0001` | Rules | heading | Non-normative | `CONTEXT` | Heading context only. |',
    '| `PACKED-SRC-0002` | Rules | MUST preserve target authority. | Rule ID: `PACKED-RULE-001` | `MUST` | Preserves target authority. |',
    '',
  ].join('\n'));
  await writeFile(ledger, [
    '# Rule ledger', '', '### PACKED-RULE-001', '',
    '- Source block ID(s): `PACKED-SRC-0002`', '- Original force: MUST',
    '- Target force: MUST', '- Force preserved: yes', '- Fidelity judgment: PRESERVED', '',
  ].join('\n'));
  const ruleOutput = run(python, [helperFiles[2], '--snapshot', snapshot, '--coverage', coverage, '--ledger', ledger], {
    cwd: fixtureRoot, environment, label: 'packed validate_rule_preservation.py',
  });
  assert(ruleOutput.includes('rule preservation structural check passed'));
  return { pythonVersion, compiledHelpers: helperFiles.length, executedHelpers: helperFiles.length, tomlProfiles: 9 };
}

function releaseManagedBlockFromArchive(archive) {
  const bytes = archive.get('package/dist/.oh-my-harness/managed-router-block.md');
  if (!bytes) throw new Error('packed managed block is missing');
  return bytes;
}

async function parsePackedToml({ archive, root, environment, python }) {
  const paths = PROFILE_PATHS.map((relativePath) => path.join(root, 'extracted/package/dist', ...relativePath.split('/')));
  const code = 'import pathlib,sys,tomllib\nfor p in sys.argv[1:]:\n tomllib.loads(pathlib.Path(p).read_text(encoding="utf-8"))\nprint(f"parsed={len(sys.argv)-1}")';
  const output = run(python, ['-c', code, ...paths], { cwd: root, environment, label: 'packed TOML parse' });
  assert.equal(output.trim(), 'parsed=9');
}

async function packStage({ stageRoot, archiveRoot, environment, npm, dryRun = false }) {
  const args = ['pack', '--offline', '--json'];
  if (dryRun) args.push('--dry-run');
  else args.push('--pack-destination', archiveRoot);
  const output = run(npm, args, { cwd: stageRoot, environment, label: dryRun ? 'npm pack --dry-run --json' : 'npm pack archive' });
  const parsed = JSON.parse(output);
  assert(Array.isArray(parsed) && parsed.length === 1);
  return parsed[0];
}

export async function validateRelease() {
  if (process.version !== 'v24.14.0') throw new Error(`release validation requires Node v24.14.0, got ${process.version}`);
  const sourceGate = await verifyTerminalSourceGate();
  const beforeStatus = repositoryStatus();
  assert.deepEqual(await repositoryResidue(), []);
  const root = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-task4-release-'));
  const rootReal = await realpath(root);
  let cleanupFailed = false;
  try {
    for (const child of ['archive-a', 'archive-b', 'cache', 'home', 'logs', 'tmp', 'xdg', 'pycache']) {
      await mkdir(path.join(rootReal, child));
    }
    await writeFile(path.join(rootReal, 'user.npmrc'), '', { flag: 'wx', mode: 0o600 });
    await writeFile(path.join(rootReal, 'global.npmrc'), '', { flag: 'wx', mode: 0o600 });
    const executables = {
      npm: resolveExecutable('npm'), python: resolveExecutable('python3.11'),
    };
    const environment = isolatedEnvironment(rootReal, executables);
    assert.equal(Object.hasOwn(environment, 'npm_config_ignore_scripts'), false);
    assert.equal(Object.hasOwn(environment, 'OH_MY_HARNESS_PACK_ROOT'), false);
    const npmVersion = run(executables.npm, ['--version'], { cwd: rootReal, environment, label: 'npm version' }).trim();
    const stageA = path.join(rootReal, 'package-a');
    const stageB = path.join(rootReal, 'package-b');
    const stagedA = await stagePackage(stageA);
    const stagedB = await stagePackage(stageB);
    assert.deepEqual(stagedA.sourceFiles, stagedB.sourceFiles);
    await assertPackCleanup(stageA);
    await assertPackCleanup(stageB);

    const dryRun = await packStage({ stageRoot: stageA, archiveRoot: null, environment, npm: executables.npm, dryRun: true });
    await assertPackCleanup(stageA);
    assert.deepEqual(await readdir(path.join(rootReal, 'archive-a')), []);
    assert.deepEqual(await readdir(path.join(rootReal, 'archive-b')), []);

    const packedA = await packStage({ stageRoot: stageA, archiveRoot: path.join(rootReal, 'archive-a'), environment, npm: executables.npm });
    await assertPackCleanup(stageA);
    const packedB = await packStage({ stageRoot: stageB, archiveRoot: path.join(rootReal, 'archive-b'), environment, npm: executables.npm });
    await assertPackCleanup(stageB);
    assert.deepEqual(comparablePackMetadata(dryRun), comparablePackMetadata(packedA));
    assert.deepEqual(comparablePackMetadata(packedA), comparablePackMetadata(packedB));
    assert.deepEqual((await readdir(path.join(rootReal, 'archive-a'))).sort(), [packedA.filename]);
    assert.deepEqual((await readdir(path.join(rootReal, 'archive-b'))).sort(), [packedB.filename]);
    const archivePathA = path.join(rootReal, 'archive-a', packedA.filename);
    const archivePathB = path.join(rootReal, 'archive-b', packedB.filename);
    const archiveBytesA = await readFile(archivePathA);
    const archiveBytesB = await readFile(archivePathB);
    assert.deepEqual(archiveBytesA, archiveBytesB);
    const packageIdentity = sha256(archiveBytesA);
    const archiveA = tarEntries(archiveBytesA);
    const archiveB = tarEntries(archiveBytesB);
    const releaseA = await releaseFromArchive(archiveA);
    const releaseB = await releaseFromArchive(archiveB);
    const treeA = releaseTreeHashes(releaseA);
    const treeB = releaseTreeHashes(releaseB);
    assert.deepEqual(treeA, treeB);
    assert.equal(treeA.length, 51);
    assert.equal(releaseA.inventory.requiredFiles.length, 49);
    assert.equal(releaseA.inventory.requiredFiles.filter(({ kind }) => kind === 'template').length, 17);
    assert.equal(releaseA.inventory.ownership.agentPaths.length, 9);
    assert.equal(releaseA.inventory.requiredFiles.some(({ assetId }) => assetId === 'template/task-contract'), false);
    assert.deepEqual(releaseA.inventoryBytes, releaseB.inventoryBytes);
    const payloadIdentity = sha256(Buffer.from(`${JSON.stringify(treeA)}\n`));
    const inventoryIdentity = sha256(releaseA.inventoryBytes);
    const expectedPaths = await expectedPackagePaths(stageA, releaseA);
    assertExactSet(dryRun.files.map(({ path: filePath }) => filePath), expectedPaths, 'npm dry-run file inventory');
    assertExactSet(packedA.files.map(({ path: filePath }) => filePath), expectedPaths, 'first npm pack file inventory');
    assertExactSet(packedB.files.map(({ path: filePath }) => filePath), expectedPaths, 'second npm pack file inventory');
    assertExactSet([...archiveA.keys()], expectedPaths.map((item) => `package/${item}`), 'first packed archive file inventory');
    assertExactSet([...archiveB.keys()], expectedPaths.map((item) => `package/${item}`), 'second packed archive file inventory');
    const metadata = JSON.parse(archiveA.get('package/package.json').toString('utf8'));
    assert.equal(metadata.name, '@guoxiaoshuai2023/oh-my-harness');
    assert.equal(metadata.license, 'Apache-2.0');
    assert.deepEqual(metadata.bin, { 'oh-my-harness': 'bin/oh-my-harness.mjs' });
    assert.deepEqual(metadata.engines, { node: '>=24 <25' });
    assert.equal(metadata.dependencies, undefined);
    assert.equal(metadata.devDependencies, undefined);
    assert.deepEqual(archiveA.get('package/LICENSE'), await readFile(path.join(stageA, 'LICENSE')));
    assert.equal(releaseA.files.has('.oh-my-harness/LICENSE'), false);
    for (const name of archiveA.keys()) {
      assert(!/(?:^|\/)(?:install-state\.json|\.operation-in-progress\.json|__pycache__)(?:\/|$)/.test(name), name);
      assert(!name.includes('.oh-my-harness-backups') && !name.includes('task-docs/history') && !name.includes('/test/'), name);
    }
    for (const [name, bytes] of archiveA) {
      const text = bytes.toString('utf8');
      assert(!text.includes(ROOT), `local absolute path in ${name}`);
      assert(!/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9]{20,}/.test(text), `secret-like content in ${name}`);
    }
    for (const item of releaseA.inventory.requiredFiles) {
      const content = releaseA.files.get(item.destinationPath).toString('utf8');
      assertRuntimeReferenceClosure(content, item.destinationPath, releaseA.inventory);
      assert(!/(?:^|[\s"'`(])task-docs\/_harness(?=$|[\s"'`.,;:!?/)\]}])/m.test(content), item.destinationPath);
      assert(!/(?:^|[\s"'`(])docs\/agent-routing(?=$|[\s"'`.,;:!?/)\]}])/m.test(content), item.destinationPath);
    }
    const semantic = await semanticEvidence(releaseA);
    const guidance = await guidanceEvidence(archiveA);
    const documentationAndCi = await documentationAndCiEvidence(releaseA);
    const python = await pythonEvidence({ archive: archiveA, root: rootReal, environment, python: executables.python });
    await parsePackedToml({ archive: archiveA, root: rootReal, environment, python: executables.python });

    assert.equal(repositoryStatus(), beforeStatus);
    assert.deepEqual(await repositoryResidue(), []);
    return {
      status: 'PASS', nodeVersion: process.version, npmVersion,
      package: {
        name: metadata.name, binary: 'oh-my-harness', version: metadata.version,
        fileCount: archiveA.size, dryRunFileCount: dryRun.files.length,
        packageIdentity, payloadIdentity, inventoryIdentity,
        twoBuildPathsBytesHashesIdentical: true, twoArchivesIdentical: true,
        twoArchiveMetadataIdentical: true,
      },
      packLifecycle: {
        scriptsEnabled: true, privatePackRootProvided: false,
        manualDistMaterialization: false, postpackRemovedDist: true,
        dryRuns: 1, realPacks: 2, stagedSourceFiles: stagedA.sourceFiles.length,
      },
      references: { requiredFiles: releaseA.inventory.requiredFiles.length, installedFiles: releaseA.files.size, closure: true, sourceOnlyRuntimePaths: 0 },
      sourceGate, python, semantic, guidance, documentationAndCi,
      cleanup: { repositoryStatusUnchanged: true, repositoryResidue: [], ownedTemporaryRootRemoved: true },
    };
  } finally {
    try {
      if (await realpath(root) !== rootReal || !rootReal.startsWith(await realpath(os.tmpdir()))) throw new Error('temporary root identity changed');
      await rm(rootReal, { recursive: true, force: false });
      try { await lstat(rootReal); throw new Error('temporary release root remains'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    } catch {
      cleanupFailed = true;
    }
    if (cleanupFailed) throw new Error('owned temporary release root cleanup failed');
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await validateRelease();
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`release validation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
