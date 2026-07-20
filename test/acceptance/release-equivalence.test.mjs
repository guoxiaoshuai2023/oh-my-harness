import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {
  readInstalledCapabilityRegistry,
  selectCapabilities,
} from '../support/t01-governance-fixtures.mjs';
import {
  decide,
  loadInstalledWorkTruthContract,
} from '../support/t02-work-truth-fixtures.mjs';
import {
  copyPhysicalReleaseForMutation,
  evaluateInstalledCapabilityContract,
  openPhysicalRelease,
  repositoryRootsForPhysicalTests,
  ROOT,
} from '../support/t04-release-equivalence-fixtures.mjs';

const ACCEPTED_RESULTS = Object.freeze({
  T01: 'f29c509d643353306a9f23b6a9f26c89f8d72f5b2b4b40bcf127073f13ee9fd8',
  T02: 'd1c03c865fda122b743cbe82b0d489f25d16c9eda8419548e328afb9a241acb8',
  T03: '798bc74b2918666ded7e1d4ed192dcaba514570864fab400cd9e79cffcf2f8ad',
});

export const FROZEN_RELEASE_ORACLE = Object.freeze({
  acceptedResults: ACCEPTED_RESULTS,
  capabilities: Object.freeze([
    ['requirements-author', 'oh_my_harness_requirements_author', 'Produces one source-backed Requirements candidate under a main-thread packet.'],
    ['requirements-evaluator', 'oh_my_harness_requirements_evaluator', 'Writes one strict independent Requirements review report from original sources.'],
    ['planner', 'oh_my_harness_planner', 'Produces one source-backed, acceptance-closed Task Plan candidate under a main-thread packet.'],
    ['plan-evaluator', 'oh_my_harness_plan_evaluator', 'Writes one strict independent Task Plan review report from exact primary evidence.'],
    ['solution-designer', 'oh_my_harness_solution_designer', 'Produces one concrete Technical Solution Design candidate for one frozen Task.'],
    ['solution-evaluator', 'oh_my_harness_solution_evaluator', 'Writes one strict independent Technical Solution Design review report.'],
    ['executor', 'oh_my_harness_executor', 'Executes exactly one Frozen Plan Task under one main-issued attempt Boundary.'],
    ['result-evaluator', 'oh_my_harness_result_evaluator', 'Writes one strict producer-independent QA report for an actual bounded result.'],
    ['orchestration-reviewer', 'oh_my_harness_orchestration_reviewer', 'Writes one strict advisory review of bounded orchestration governance.'],
  ].map(([id, name, mission]) => Object.freeze({ id, name, mission }))),
  reportCapable: Object.freeze([
    'requirements-evaluator', 'plan-evaluator', 'solution-evaluator', 'result-evaluator', 'orchestration-reviewer',
  ]),
});

const FROZEN_DECISION_SCENARIOS = Object.freeze([
  ['T02-AC1-proxy-rejection', 'acceptance-proxy', { closureComplete: true, actualResultObserved: false, proxyOnly: true }, 'RESULT_PROXY_STOP'],
  ['T02-AC6-lightweight', 'topology', { writePaths: [] }, 'ZERO_WRITE_TOPOLOGY'],
  ['T02-AC7-currentness', 'task3-currentness', {
    ownerCurrent: true, materialInputsCurrent: true, evidenceCurrent: true,
    affectedTaskAcNamed: true, consumerRevalidated: true, mainDispositionCurrent: true,
  }, 'CURRENTNESS_CLOSED'],
  ['T02-AC5-unobserved-state', 'task2-invariant-observation', {
    actorAllowed: true, deltaPaths: ['task'], allowedPaths: ['task'],
    actualReadback: 'claimed', expectedReadback: 'claimed', protectedUnchanged: true,
    attributionComplete: true, stateConflict: false,
  }, 'UNOBSERVED_STATE_INCOMPLETE'],
  ['T02-AC8-protected-precedence', 'conflict-error-precedence', {
    protectedOrExtraWrite: true, stateConflict: false, observationComplete: true,
    artifactComplete: true, strictVerdict: 'PASS',
  }, 'PROTECTED_WRITE_STOP'],
  ['T02-AC9-no-fabrication-waiver', 'waiver', {
    gate: 'no-fabrication', completeRecord: true, authorityPresent: true,
  }, 'NON_WAIVABLE_GATE_STOP'],
  ['T02-AC10-retry-history', 'retry-control', {
    counterKind: 'quality', cumulativeCount: 1,
  }, 'RETRY_IDENTITY_HISTORY_STOP'],
  ['T03-AC1-terminal-scan', 'run-learning-scan', {
    nonTrivial: true, terminalState: 'accepted', actor: 'main', terminalObservationCurrent: true,
    terminalEvidenceCurrent: true, stateConflict: false, predecessorEvidenceComplete: true,
    viewSetMatchesPersistence: true, runAlreadyTerminal: true, sameMainTerminalizationSession: true,
    priorScanObserved: false, priorScanConflict: false, priorScanStale: false,
    priorScanExact: false, contextSelected: false,
  }, 'SCAN_REQUIRED_INLINE'],
  ['T03-AC2-user-fail-trigger', 'run-learning-trigger', { 'ac-pass-but-user-fail': true }, 'LEARNING_TRIGGER_OBSERVED'],
  ['T03-AC3-privacy-precedence', 'run-learning-evidence', {
    sensitiveAccessOutsideAuthority: true, copiedSensitiveContent: false,
    safeEvidenceReferencesEstablished: true, identityConflict: false, ownerConflict: false,
    triggerTerminalConflict: false, protectedDelta: false, evidenceFieldsComplete: true,
    identitiesCurrent: true, fabricatedPlaceholder: false, physicalReadbackComplete: true,
  }, 'PRIVACY_SAFETY_STOP'],
  ['T03-AC5-review-isolation', 'run-learning-review', {
    selectedCapability: 'result-evaluator', reviewType: 'run-learning-case-review',
    uniqueReportPathAbsentBeforeLaunch: true, candidateBindingsExact: true,
    reportComplete: true, strictVerdict: 'PASS', reportOnlyDelta: true,
    reviewerRepairedOrLaunched: false,
  }, 'CASE_REVIEW_REPORT_VALID'],
  ['T03-AC7-no-automatic-change', 'learning-change-route', {
    reviewedCaseEvidence: true, laterExplicitHumanDecision: false, newTaskIdentity: false,
    mainBoundaryIssued: false, requestedHarnessMutation: true,
    requestedGlobalMust: false, requestedLaunch: false,
  }, 'AUTOMATIC_LEARNING_CHANGE_STOP'],
].map(([id, domain, facts, expectedCode]) => Object.freeze({ id, domain, facts: Object.freeze(facts), expectedCode })));

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function projection(entries, includeRequired) {
  return sha256(Buffer.from(`${entries.map((entry) => [entry.source, entry.destination, entry.kind, ...(includeRequired ? [String(entry.required)] : [])].join('\t')).join('\n')}\n`));
}

test('T-04 source target is exact 49 rows with both Architecture projections and no Contract row', async () => {
  const map = JSON.parse(await readFile(path.join(ROOT, 'packaging/bundle-map.json'), 'utf8'));
  assert.equal(map.entries.length, 49);
  assert.equal(new Set(map.entries.map(({ assetId }) => assetId)).size, 49);
  assert.equal(new Set(map.entries.map(({ source }) => source)).size, 49);
  assert.equal(new Set(map.entries.map(({ destination }) => destination)).size, 49);
  assert.equal(map.entries.some(({ assetId }) => assetId === 'template/task-contract'), false);
  assert.equal(projection(map.entries, false), 'b4d988390d4e214cd2d7887c800e3c5b7ba45d87edd7c7db147b7598fab15db5');
  assert.equal(projection(map.entries, true), 'a32fe9eff38a1d8dc7af91eba3e1c8068f4a5d9318f474d0a701516f56f59480');
});

test('physical release, installed registry, and installed work truth reject missing explicit roots', async () => {
  await assert.rejects(openPhysicalRelease(), /PHYSICAL_ROOT_REQUIRED/);
  await assert.rejects(readInstalledCapabilityRegistry(), /INSTALLED_CAPABILITY_ROOT_REQUIRED/);
  await assert.rejects(loadInstalledWorkTruthContract(), /INSTALLED_CONTRACT_ROOT_REQUIRED/);
  assert.deepEqual(PHYSICAL_MUTATION_PROBES.map(({ id }) => id), [
    'required-payload-omission',
    'corrupt-destination-hash',
    'installed-source-owner-drift',
    'installed-manifest-path-drift',
    'governing-decision-reversal',
    'profile-mission-mutation',
    'hard-no-fan-out-weakened',
    'report-only-duty-removed',
    'solution-scope-removed',
    'calibration-binding-mutation',
    'root-and-path-containment',
    'fabricated-ledger-no-effect',
    'happy-path-internal-provenance',
  ]);
  assert(PHYSICAL_MUTATION_PROBES.every(({ run }) => typeof run === 'function'));
  assert(PHYSICAL_MUTATION_PROBES.every(({ run }) => run.toString().includes('mutableFixture')));
  const copiedRootMechanism = copyPhysicalReleaseForMutation.toString();
  for (const requiredMechanism of ['mkdtemp', 'physicalRelease.readDestination', 'writeContained', 'openPhysicalRelease']) {
    assert(copiedRootMechanism.includes(requiredMechanism), requiredMechanism);
  }
});

const releaseRoot = process.env.OH_MY_HARNESS_RELEASE_EQUIVALENCE_ROOT;
const inventorySha256 = process.env.OH_MY_HARNESS_RELEASE_EQUIVALENCE_INVENTORY_SHA256;
const forbiddenRoots = (process.env.OH_MY_HARNESS_RELEASE_EQUIVALENCE_FORBIDDEN_ROOTS ?? '').split(path.delimiter).filter(Boolean);

const SOURCE_CONTRACT_PATHS = Object.freeze([
  'task-docs/_harness/adaptive-orchestration-protocol.md',
  'task-docs/_harness/run-directory-protocol.md',
  'task-docs/_harness/semantic-fidelity-protocol.md',
  'task-docs/_harness/templates/context-handoff-template.md',
  'task-docs/_harness/templates/task-board-template.md',
  'task-docs/_harness/templates/plan-template.md',
  'task-docs/_harness/templates/plan-review-template.md',
  'task-docs/_harness/templates/task-packet-template.md',
  'task-docs/_harness/templates/orchestration-prompt-template.md',
  'task-docs/_harness/templates/result-qa-template.md',
]);

function codeIs(...codes) {
  return (error) => {
    assert(codes.includes(error?.code), `expected ${codes.join(' or ')}, received ${error?.code ?? error}`);
    return true;
  };
}

function isContained(root, candidate) {
  return candidate === root || candidate.startsWith(`${root}${path.sep}`);
}

async function mutableFixture(t, physical, mutationId) {
  const fixture = await copyPhysicalReleaseForMutation({
    physicalRelease: physical,
    forbiddenRoots: physical.forbiddenRoots,
    mutationId,
  });
  t.after(async () => fixture.cleanup());
  return fixture;
}

async function installedRegistry(fixture) {
  const physical = await fixture.open();
  const registry = await readInstalledCapabilityRegistry({
    releaseRoot: fixture.releaseRoot,
    inventory: physical,
    forbiddenRoots: fixture.forbiddenRoots,
  });
  return { physical, registry };
}

async function installedContract(fixture) {
  const physical = await fixture.open();
  const contract = await loadInstalledWorkTruthContract({
    releaseRoot: fixture.releaseRoot,
    inventory: physical,
    forbiddenRoots: fixture.forbiddenRoots,
  });
  return { physical, contract };
}

const PHYSICAL_MUTATION_PROBES = Object.freeze([
  Object.freeze({
    id: 'required-payload-omission',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'payload-omission');
      await fixture.omitAsset('agent/planner');
      const opened = await fixture.open();
      await assert.rejects(readInstalledCapabilityRegistry({
        releaseRoot: fixture.releaseRoot,
        inventory: opened,
        forbiddenRoots: fixture.forbiddenRoots,
      }), codeIs('PHYSICAL_PATH_MISSING'));
    },
  }),
  Object.freeze({
    id: 'corrupt-destination-hash',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'corrupt-destination');
      await fixture.corruptAsset('docs/architecture');
      const opened = await fixture.open();
      await assert.rejects(opened.readDestination('docs/architecture'), codeIs('PHYSICAL_DESTINATION_HASH'));
    },
  }),
  Object.freeze({
    id: 'installed-source-owner-drift',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'source-owner-drift');
      await fixture.mutateRecord('protocol/adaptive-orchestration', 'topology.verification-only', (record) => ({
        ...record,
        sourceOwner: '.oh-my-harness/protocols/not-the-containing-owner.md',
      }));
      const opened = await fixture.open();
      await assert.rejects(loadInstalledWorkTruthContract({
        releaseRoot: fixture.releaseRoot,
        inventory: opened,
        forbiddenRoots: fixture.forbiddenRoots,
      }), codeIs('CONTRACT_SOURCE_OWNER'));
    },
  }),
  Object.freeze({
    id: 'installed-manifest-path-drift',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'manifest-path-drift');
      await fixture.mutateRecord('protocol/adaptive-orchestration', 'contract.manifest', (record) => ({
        ...record,
        paths: [...record.paths].reverse(),
      }));
      const opened = await fixture.open();
      await assert.rejects(loadInstalledWorkTruthContract({
        releaseRoot: fixture.releaseRoot,
        inventory: opened,
        forbiddenRoots: fixture.forbiddenRoots,
      }), codeIs('CONTRACT_MANIFEST_PATHS'));
    },
  }),
  Object.freeze({
    id: 'governing-decision-reversal',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'decision-reversal');
      await fixture.mutateRecord('protocol/adaptive-orchestration', 'topology.verification-only', (record) => ({
        ...record,
        result: { ...record.result, code: 'MUTATED_ZERO_WRITE_TOPOLOGY' },
      }));
      const { contract } = await installedContract(fixture);
      const observed = decide(contract, 'topology', { writePaths: [] }).result.code;
      assert.equal(observed, 'MUTATED_ZERO_WRITE_TOPOLOGY');
      assert.notEqual(observed, 'ZERO_WRITE_TOPOLOGY');
    },
  }),
  Object.freeze({
    id: 'profile-mission-mutation',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'profile-mission');
      await fixture.replaceText('agent/planner', {
        from: 'Produces one source-backed, acceptance-closed Task Plan candidate under a main-thread packet.',
        to: 'Produces one generic planning artifact without the frozen mission.',
      });
      const { registry } = await installedRegistry(fixture);
      assert.deepEqual(evaluateInstalledCapabilityContract(registry, FROZEN_RELEASE_ORACLE), {
        compliant: false,
        code: 'PROFILE_MISSION_STOP',
        capability: 'planner',
      });
    },
  }),
  Object.freeze({
    id: 'hard-no-fan-out-weakened',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'no-fan-out');
      await fixture.replaceText('agent/planner', {
        from: 'must not create, invoke, launch, delegate to, or reconfigure another agent',
        to: 'may create, invoke, launch, delegate to, or reconfigure another agent',
      });
      const { registry } = await installedRegistry(fixture);
      assert.deepEqual(evaluateInstalledCapabilityContract(registry, FROZEN_RELEASE_ORACLE), {
        compliant: false,
        code: 'PROFILE_MODAL_FORCE_STOP',
        capability: 'planner',
      });
    },
  }),
  Object.freeze({
    id: 'report-only-duty-removed',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'report-only');
      await fixture.replaceText('agent/plan-evaluator', {
        from: 'logical report-only write boundary plus post-execution verification',
        to: 'general workspace-write boundary plus post-execution verification',
      });
      const { registry } = await installedRegistry(fixture);
      assert.deepEqual(evaluateInstalledCapabilityContract(registry, FROZEN_RELEASE_ORACLE), {
        compliant: false,
        code: 'PROFILE_REPORT_AUTHORITY_STOP',
        capability: 'plan-evaluator',
      });
    },
  }),
  Object.freeze({
    id: 'solution-scope-removed',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'solution-scope');
      await fixture.replaceText('agent/solution-designer', {
        from: 'Boundary, Contract, permission artifact',
        to: 'Boundary and permission artifacts',
      });
      const { registry } = await installedRegistry(fixture);
      assert.deepEqual(evaluateInstalledCapabilityContract(registry, FROZEN_RELEASE_ORACLE), {
        compliant: false,
        code: 'SOLUTION_SCOPE_STOP',
        capability: 'solution-designer',
      });
    },
  }),
  Object.freeze({
    id: 'calibration-binding-mutation',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'calibration-binding');
      await fixture.replaceText('calibration/evaluator-calibration', {
        from: '# Evaluator Calibration',
        to: '# Mutated Evaluator Calibration',
      });
      const { registry } = await installedRegistry(fixture);
      assert.deepEqual(evaluateInstalledCapabilityContract(registry, FROZEN_RELEASE_ORACLE), {
        compliant: false,
        code: 'CALIBRATION_BINDING_STOP',
        capability: 'orchestration-reviewer',
      });
    },
  }),
  Object.freeze({
    id: 'root-and-path-containment',
    async run(t, { physical, repositoryRoots }) {
      await assert.rejects(openPhysicalRelease(), codeIs('PHYSICAL_ROOT_REQUIRED'));
      for (const repositoryRoot of repositoryRoots) {
        await assert.rejects(openPhysicalRelease({
          releaseRoot: repositoryRoot,
          forbiddenRoots: physical.forbiddenRoots,
          expectedInventorySha256: physical.inventorySha256,
        }), codeIs('PHYSICAL_ROOT_NOT_OWNED_TEMP'));
      }
      const fixture = await mutableFixture(t, physical, 'root-containment');
      await assert.rejects(openPhysicalRelease({
        releaseRoot: fixture.parentRoot,
        forbiddenRoots: fixture.forbiddenRoots,
        expectedInventorySha256: fixture.currentInventorySha256(),
      }), codeIs('PHYSICAL_PATH_MISSING'));
      const linkPath = await fixture.createRootSymlink();
      await assert.rejects(openPhysicalRelease({
        releaseRoot: linkPath,
        forbiddenRoots: fixture.forbiddenRoots,
        expectedInventorySha256: fixture.currentInventorySha256(),
      }), codeIs('PHYSICAL_ROOT_SYMLINK'));
      await fixture.mutateInventoryEntry('docs/architecture', (entry) => ({
        ...entry,
        destinationPath: '../outside-the-release.md',
      }), { synchronizeOwnership: true });
      const opened = await fixture.open();
      await assert.rejects(opened.readDestination('docs/architecture'), codeIs('PHYSICAL_PATH_UNSAFE'));
    },
  }),
  Object.freeze({
    id: 'fabricated-ledger-no-effect',
    async run(t, { physical }) {
      const fixture = await mutableFixture(t, physical, 'fabricated-ledger');
      const planner = physical.byAssetId.get('agent/planner');
      await fixture.omitAsset('agent/planner');
      const opened = await fixture.open({
        producerReadLedger: [{
          assetId: 'agent/planner',
          destinationPath: planner.destinationPath,
          observedSha256: planner.destinationSha256,
          producerClaim: true,
        }],
      });
      await assert.rejects(readInstalledCapabilityRegistry({
        releaseRoot: fixture.releaseRoot,
        inventory: opened,
        forbiddenRoots: fixture.forbiddenRoots,
      }), codeIs('PHYSICAL_PATH_MISSING'));
      assert.equal(opened.readLedger().some(({ assetId }) => assetId === 'agent/planner'), false);
      assert.equal(opened.readLedger().some(({ producerClaim }) => producerClaim === true), false);
    },
  }),
  Object.freeze({
    id: 'happy-path-internal-provenance',
    async run(t, { physical, repositoryRoots }) {
      const fixture = await mutableFixture(t, physical, 'happy-provenance');
      const copyLedger = fixture.copyLedger();
      assert.equal(copyLedger.length, 51);
      assert(copyLedger.every(({ sourceActualRealpath }) => isContained(physical.releaseRoot, sourceActualRealpath)));
      assert(copyLedger.every(({ sourceActualRealpath }) => repositoryRoots.every((root) => !isContained(root, sourceActualRealpath))));

      const opened = await fixture.open();
      const registry = await readInstalledCapabilityRegistry({
        releaseRoot: fixture.releaseRoot,
        inventory: opened,
        forbiddenRoots: fixture.forbiddenRoots,
      });
      assert.deepEqual(evaluateInstalledCapabilityContract(registry, FROZEN_RELEASE_ORACLE), {
        compliant: true,
        code: 'INSTALLED_CAPABILITY_CONTRACT_CLOSED',
      });
      assert.equal(selectCapabilities({ requiredCapabilities: registry.map(({ id }) => id) }, registry).size, 9);
      const contract = await loadInstalledWorkTruthContract({
        releaseRoot: fixture.releaseRoot,
        inventory: opened,
        forbiddenRoots: fixture.forbiddenRoots,
      });
      assert.deepEqual(contract.sourceContractPaths, SOURCE_CONTRACT_PATHS);
      assert(contract.paths.every((item) => item.startsWith('.oh-my-harness/')));
      for (const scenario of FROZEN_DECISION_SCENARIOS) {
        assert.equal(decide(contract, scenario.domain, scenario.facts).result.code, scenario.expectedCode, scenario.id);
      }
      const ledger = opened.readLedger();
      const readDestinations = new Set(ledger.map(({ destinationPath }) => destinationPath));
      for (const item of [...registry, ...contract.records]) {
        const destinationPath = item.profile ?? item.path;
        assert.equal(readDestinations.has(destinationPath), true, destinationPath);
      }
      assert(ledger.every(({ requestedPath, actualRealpath }) => (
        isContained(fixture.releaseRoot, requestedPath)
        && isContained(fixture.releaseRoot, actualRealpath)
        && repositoryRoots.every((root) => !isContained(root, actualRealpath))
      )));
    },
  }),
]);

test('physical installed bytes drive T-01/T-02/T-03 decisions against an independent Frozen oracle', {
  skip: !releaseRoot || !inventorySha256 || forbiddenRoots.length === 0,
}, async (t) => {
  const physical = await openPhysicalRelease({ releaseRoot, forbiddenRoots, expectedInventorySha256: inventorySha256 });
  const repositoryRoots = await repositoryRootsForPhysicalTests();
  for (const probe of PHYSICAL_MUTATION_PROBES) {
    await t.test(probe.id, async (subtest) => probe.run(subtest, { physical, repositoryRoots }));
  }
});
