import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { applyRewrites, buildBundle } from '../../src/bundle/compiler.mjs';
import {
  assertAdaptiveProtocolSemantics,
  assertCalibrationBindings,
  assertExecutorProfileSemantics,
  assertManagedRouterSemantics,
  assertProfileSemantics,
} from '../../tools/validate-release.mjs';
import { HELPER_PAIRS, PROFILE_PAIRS, ROUTER_HEADINGS } from './expected-data.mjs';
import {
  ROOT,
  buildTemporary,
  createFixture,
  readJson,
  temporaryDirectory,
} from './test-helpers.mjs';

const EVALUATOR_SOURCES = new Set([
  '.codex/agents/harness-requirements-evaluator.toml',
  '.codex/agents/harness-plan-evaluator.toml',
  '.codex/agents/harness-solution-evaluator.toml',
  '.codex/agents/harness-result-evaluator.toml',
  '.codex/agents/harness-orchestration-reviewer.toml',
]);

function count(content, needle) {
  return content.split(needle).length - 1;
}

function removeInstalledBinding(content) {
  return content.replace(/\n\nInstalled canonical evaluator calibration for this bundle: path `\.oh-my-harness\/calibration\/evaluator-calibration\.md`; SHA-256 `[0-9a-f]{64}`\. This binding does not replace the main-thread packet requirement above\.\n\n/, '\n\n');
}

async function readSourceProfiles() {
  return new Map(await Promise.all(PROFILE_PAIRS.map(async ([sourcePath, destinationPath]) => [
    destinationPath,
    await readFile(path.join(ROOT, sourcePath), 'utf8'),
  ])));
}

async function readGeneratedProfiles(outputDir) {
  return new Map(await Promise.all(PROFILE_PAIRS.map(async ([, destinationPath]) => [
    destinationPath,
    await readFile(path.join(outputDir, destinationPath), 'utf8'),
  ])));
}

function withProfileMutation(profiles, profilePath, current, replacement) {
  const mutated = new Map(profiles);
  const text = mutated.get(profilePath);
  assert.equal(count(text, current), 1, `${profilePath}: ${current}`);
  mutated.set(profilePath, text.replace(current, replacement));
  return mutated;
}

test('managed block ledger preserves headings, nine routes, integration clauses, and modal force', async (t) => {
  const { outputDir } = await buildTemporary(t);
  const block = await readFile(path.join(outputDir, '.oh-my-harness/managed-router-block.md'), 'utf8');
  assert.equal(count(block, '<!-- oh-my-harness:start -->'), 1);
  assert.equal(count(block, '<!-- oh-my-harness:end -->'), 1);
  assert.ok(block.startsWith('<!-- oh-my-harness:start -->\n# oh-my-harness Managed Router\nThis block is managed by oh-my-harness.'));
  for (const heading of ROUTER_HEADINGS) assert.equal(count(block, `## ${heading}`), 1, heading);
  assert.equal(block.split('\n').filter((line) => line.startsWith('|')).length, 11);
  assert.match(block, /Target-repository instructions outside this block remain effective and must be followed alongside this Harness\./);
  assert.match(block, /materially conflict or cannot both be followed, STOP and ask the user/);
  assert.match(block, /Do not silently overwrite, weaken, or take over either target-repository authority or Harness authority\./);
  const modalLedger = {
    must: count(block, 'must'),
    mustNot: count(block, 'must not'),
    doNot: count(block, 'Do not'),
    stop: count(block, 'STOP'),
    required: count(block, 'required'),
  };
  assert.ok(modalLedger.must > 0 && modalLedger.mustNot > 0 && modalLedger.doNot > 0 && modalLedger.stop > 0 && modalLedger.required > 0);
  assert.equal(block, await readFile(path.join(ROOT, 'packaging/managed-router-block.md'), 'utf8'));
  assert.deepEqual(assertManagedRouterSemantics(block), {
    targetAuthority: true, conflictStop: true, exactRoutes: 9,
  });
  const mutations = [
    ['target authority', 'remain effective and must be followed', 'are advisory', /target authority remains effective/],
    ['conflict stop', 'STOP and ask the user to resolve the conflict', 'choose Harness authority', /conflict returns to user/],
    ['authority takeover', 'Do not silently overwrite, weaken, or take over', 'Silently replace', /no authority takeover/],
    ['exact route', '.oh-my-harness/docs/agent-routing/current-state-evidence.md', '.oh-my-harness/docs/agent-routing/stale-state.md', /route \.oh-my-harness\/docs\/agent-routing\/current-state-evidence\.md/],
    ['fixed topology', 'There is no named mode, fixed capability sequence, compatibility branch, or automatic all-nine path.', 'A fixed capability sequence is available.', /no fixed topology/],
    ['main lifecycle', 'Only main selects and launches invocations', 'Any capability selects and launches invocations', /main-only lifecycle/],
  ];
  for (const [name, current, replacement, expectedFailure] of mutations) {
    assert.equal(count(block, current), 1, name);
    assert.throws(() => assertManagedRouterSemantics(block.replace(current, replacement)), expectedFailure, name);
  }
});

test('nine-profile normalized ledger preserves distinct missions and evaluator boundaries', async (t) => {
  const { outputDir, result } = await buildTemporary(t);
  const map = await readJson('packaging/bundle-map.json');
  const descriptions = new Set();
  let readOnlyCount = 0;
  for (const [sourcePath, destinationPath] of PROFILE_PAIRS) {
    const source = await readFile(path.join(ROOT, sourcePath), 'utf8');
    const target = await readFile(path.join(outputDir, destinationPath), 'utf8');
    const normalized = EVALUATOR_SOURCES.has(sourcePath) ? removeInstalledBinding(target) : target;
    assert.equal(normalized, applyRewrites(source, map.rewrites), destinationPath);
    const description = target.match(/^description = "([^"]+)"$/m)?.[1];
    assert.ok(description);
    descriptions.add(description);
    if (/^sandbox_mode = "read-only"$/m.test(target)) readOnlyCount += 1;
    if (EVALUATOR_SOURCES.has(sourcePath)) {
      assert.match(target, new RegExp('SHA-256 `' + result.calibrationSha256 + '`'));
      assert.match(target, /path `\.oh-my-harness\/calibration\/evaluator-calibration\.md`/);
      assert.match(target, /This binding does not replace the main-thread packet requirement above\./);
      assert.equal(count(target, 'Installed canonical evaluator calibration for this bundle:'), 1);
    } else {
      assert.doesNotMatch(target, /^sandbox_mode = "read-only"$/m);
      assert.equal(count(target, 'Installed canonical evaluator calibration for this bundle:'), 0);
    }
  }
  assert.equal(descriptions.size, 9);
  assert.equal(readOnlyCount, 0);
  const profileBindings = result.inventory.requiredFiles.filter(({ transformations }) => transformations.includes('calibration-binding'));
  assert.equal(profileBindings.length, 5);
  assert.deepEqual(profileBindings.map(({ sourcePath }) => sourcePath).sort(), [...EVALUATOR_SOURCES].sort());
  assert(profileBindings.every(({ transformations }) => (
    transformations.length === 2
    && transformations[0] === 'reference-rewrite'
    && transformations[1] === 'calibration-binding'
  )));
});

test('source and generated profile semantics enforce all missions, no-fan-out, evaluator, and Solution boundaries', async (t) => {
  const sourceProfiles = await readSourceProfiles();
  const { outputDir } = await buildTemporary(t);
  const generatedProfiles = await readGeneratedProfiles(outputDir);
  const expected = { profiles: 9, evaluatorProfiles: 5, hardNoFanOut: true };
  assert.deepEqual(assertProfileSemantics(sourceProfiles), expected);
  assert.deepEqual(assertProfileSemantics(generatedProfiles), expected);

  const missions = [
    ['.codex/agents/oh-my-harness-requirements-author.toml', 'Produce exactly one source-backed Requirements candidate at the path authorized by the main-thread packet.', 'Summarize source material for main.'],
    ['.codex/agents/oh-my-harness-requirements-evaluator.toml', 'Independently inspect the exact Requirements candidate, original request sources, and current facts named by the main-thread packet.', 'Inspect selected Requirements notes.'],
    ['.codex/agents/oh-my-harness-planner.toml', 'Produce exactly one acceptance-closed Task Plan candidate at the path authorized by the main-thread packet.', 'Describe likely implementation files.'],
    ['.codex/agents/oh-my-harness-plan-evaluator.toml', 'Independently inspect the exact Task Plan candidate and exact upstream sources named by the main-thread packet.', 'Inspect a planning summary.'],
    ['.codex/agents/oh-my-harness-solution-designer.toml', 'produce exactly one concrete Technical Solution Design candidate for one Frozen Plan Task at the path authorized by the main-thread packet.', 'produce an execution permission artifact.'],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', 'Perform one strict Technical Solution Design review of the exact candidate and exact Frozen Plan/upstream evidence named by the main-thread packet.', 'Review an implementation result.'],
    ['.codex/agents/oh-my-harness-executor.toml', 'Execute exactly one Frozen Plan Task under exactly one current main-issued Boundary or packet', 'Execute work selected from the backlog'],
    ['.codex/agents/oh-my-harness-result-evaluator.toml', 'Independently inspect the actual result, exact controlling Boundary/upstream, producer evidence, current state, and every assigned acceptance criterion.', 'Inspect the producer summary.'],
    ['.codex/agents/oh-my-harness-orchestration-reviewer.toml', 'Independently review the exact bounded topology, packet, routing, intervention, transition, or acceptance rationale named by the main-thread packet.', 'Select and operate the topology.'],
  ];
  for (const [profilePath, current, replacement] of missions) {
    assert.throws(
      () => assertProfileSemantics(withProfileMutation(generatedProfiles, profilePath, current, replacement)),
      new RegExp(`mission responsibility for ${profilePath.replaceAll('.', '\\.').replaceAll('/', '\\/')}`),
      profilePath,
    );
  }

  const fanOut = 'You must not create, invoke, launch, delegate to, or reconfigure another agent, even if a packet asks you to.';
  for (const profilePath of generatedProfiles.keys()) {
    assert.throws(
      () => assertProfileSemantics(withProfileMutation(generatedProfiles, profilePath, fanOut, 'You may launch another agent when useful.')),
      new RegExp(`hard no-fan-out for ${profilePath.replaceAll('.', '\\.').replaceAll('/', '\\/')}`),
      profilePath,
    );
  }

  const evaluatorPaths = [...EVALUATOR_SOURCES].map((sourcePath) => PROFILE_PAIRS.find(([source]) => source === sourcePath)[1]);
  const evaluatorFamilies = [
    ['logical report-only write boundary plus post-execution verification', 'a general workspace write boundary', /report-only boundary/],
    ['Return strict PASS or FAIL; never PASS with caveats.', 'Return a qualified verdict.', /strict verdict/],
    ['Inspect primary evidence', 'Inspect the producer summary', /primary evidence/],
    ['must not repair or modify the target', 'may repair or modify the target', /no target repair/],
    ['disposition findings', 'summarize findings', /no finding disposition/],
    ['transition state', 'describe state', /no lifecycle transition/],
    ['canonical evaluator calibration identity and path', 'optional calibration notes', /calibration binding/],
  ];
  for (const profilePath of evaluatorPaths) {
    for (const [current, replacement, expectedFailure] of evaluatorFamilies) {
      assert.throws(
        () => assertProfileSemantics(withProfileMutation(generatedProfiles, profilePath, current, replacement)),
        expectedFailure,
        `${profilePath}: ${current}`,
      );
    }
  }
  const acceptanceClauses = new Map([
    ['.codex/agents/oh-my-harness-requirements-evaluator.toml', ['accept Requirements', 'report Requirements']],
    ['.codex/agents/oh-my-harness-plan-evaluator.toml', ['accept the Plan', 'report the Plan']],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', ['accept execution', 'report execution']],
    ['.codex/agents/oh-my-harness-result-evaluator.toml', ['grant final acceptance', 'report final status']],
    ['.codex/agents/oh-my-harness-orchestration-reviewer.toml', ['accept the result', 'report the result']],
  ]);
  for (const [profilePath, [current, replacement]] of acceptanceClauses) {
    assert.throws(
      () => assertProfileSemantics(withProfileMutation(generatedProfiles, profilePath, current, replacement)),
      /reviewed-object acceptance remains main-owned/,
      profilePath,
    );
  }
  assert.throws(
    () => assertProfileSemantics(withProfileMutation(
      generatedProfiles,
      '.codex/agents/oh-my-harness-orchestration-reviewer.toml',
      'change topology',
      'document topology',
    )),
    /no finding disposition|no lifecycle transition|no acceptance|orchestration topology/,
  );

  const solutionForbiddenConceptMutations = [
    ['.codex/agents/oh-my-harness-solution-designer.toml', 'Designer', 'Boundary', 'attempt outline'],
    ['.codex/agents/oh-my-harness-solution-designer.toml', 'Designer', 'Contract', 'coordination record', 'execution Contract'],
    ['.codex/agents/oh-my-harness-solution-designer.toml', 'Designer', 'permission artifact', 'implementation note'],
    ['.codex/agents/oh-my-harness-solution-designer.toml', 'Designer', 'Task acceptance criteria', 'Task context'],
    ['.codex/agents/oh-my-harness-solution-designer.toml', 'Designer', 'lifecycle decision', 'status summary'],
    ['.codex/agents/oh-my-harness-solution-designer.toml', 'Designer', 'agent-launch instruction', 'agent capability note'],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', 'Evaluator', 'Boundary', 'attempt outline'],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', 'Evaluator', 'Contract', 'coordination record', 'execution Contract'],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', 'Evaluator', 'permission artifact', 'implementation note'],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', 'Evaluator', 'Task acceptance criteria', 'Task context'],
    ['.codex/agents/oh-my-harness-solution-evaluator.toml', 'Evaluator', 'lifecycle decision', 'status summary'],
  ];
  for (const [profilePath, role, concept, replacement, expectedConcept = concept] of solutionForbiddenConceptMutations) {
    assert.throws(
      () => assertProfileSemantics(withProfileMutation(generatedProfiles, profilePath, concept, replacement)),
      new RegExp(`${role} forbidden ${expectedConcept}`),
      `${role}/${concept}`,
    );
  }
  assert.throws(
    () => assertProfileSemantics(withProfileMutation(
      generatedProfiles,
      '.codex/agents/oh-my-harness-solution-designer.toml',
      'Do not implement',
      'Do not draft implementation',
    )),
    /Designer no implementation/,
    'Designer/implementation',
  );
});

test('source and generated Executor bytes enforce current one-Task one-Boundary semantics', async (t) => {
  const source = await readFile(path.join(ROOT, '.codex/agents/harness-executor.toml'), 'utf8');
  const { outputDir } = await buildTemporary(t);
  const generated = await readFile(path.join(outputDir, '.codex/agents/oh-my-harness-executor.toml'), 'utf8');
  const expected = {
    frozenPlanTask: true,
    currentMainBoundary: true,
    boundaryOwnedScope: true,
    protectedState: true,
    materialChangeStop: true,
    noAdjacentRepair: true,
    hardNoFanOut: true,
    noFabrication: true,
  };
  assert.deepEqual(assertExecutorProfileSemantics(source), expected);
  assert.deepEqual(assertExecutorProfileSemantics(generated), expected);

  const mutations = [
    ['Frozen Plan Task', 'Execute exactly one Frozen Plan Task under', 'Execute a Frozen Plan Task under', /exactly one Frozen Plan Task/],
    ['current Boundary', 'under exactly one current main-issued Boundary or packet,', 'under a main-issued packet,', /exactly one current main-issued Boundary or packet/],
    ['allowed paths', 'The Boundary owns attempt-specific allowed actions and paths,', 'The Boundary describes attempt scope,', /Boundary-owned allowed actions and paths/],
    ['protected state', 'paths, protected state, required evidence', 'paths, mutable state, required evidence', /protected state/],
    ['material-change stop', 'Stop when a material premise, scope, permission, protected-state, dependency, validation, or path change is needed.', 'Continue after a material premise or path change.', /material-change stop/],
    ['adjacent repair', 'repair adjacent or upstream defects', 'repair adjacent defects', /no adjacent or upstream repair/],
    ['hard no-fan-out', 'create, invoke, launch, delegate to, or reconfigure another agent', 'create or reconfigure another agent', /hard no-fan-out/],
    ['fabrication', 'Do not fabricate execution, evidence, validation, review, external action, or completion.', 'Do not infer completion.', /no fabricated execution or evidence/],
  ];
  for (const [name, current, mutation, expectedFailure] of mutations) {
    assert.notEqual(generated.indexOf(current), -1, name);
    assert.throws(
      () => assertExecutorProfileSemantics(generated.replace(current, mutation)),
      expectedFailure,
      name,
    );
  }
});

test('source and generated adaptive protocol enforce selection, gates, main lifecycle, lightweight path, and legacy negatives', async (t) => {
  const source = await readFile(path.join(ROOT, 'task-docs/_harness/adaptive-orchestration-protocol.md'), 'utf8');
  const { outputDir } = await buildTemporary(t);
  const generated = await readFile(path.join(outputDir, '.oh-my-harness/protocols/adaptive-orchestration-protocol.md'), 'utf8');
  const expected = {
    adaptiveSystem: true, mainOnlyLifecycle: true, lightweightPath: true,
    mandatoryGates: true, legacyWorkflow: false, mainOwnedActionFamilies: 7,
  };
  assert.deepEqual(assertAdaptiveProtocolSemantics(source), expected);
  assert.deepEqual(assertAdaptiveProtocolSemantics(generated), expected);

  const invariantMutations = [
    ['fact-selected optional subset', 'selects the smallest fact-required subset of optional capabilities', 'selects a preferred capability preset', /fact-selected optional subset/],
    ['facts not presets', 'prior sequence, or artifact availability never select a workflow', 'prior sequence selects the workflow', /facts not presets select topology/],
    ['no fixed workflow', 'There are no selectable mode labels, stored role sequences, parallel compatibility branches, or automatic all-capability path.', 'Stored role sequences select the workflow.', /no fixed or parallel workflow/],
    ['lightweight', 'For LOW self-contained work with no gate or continuity trigger, main works directly, performs proportional validation, and creates no role invocation, Run tree, Context, Board, report, retrospective, or case.', 'LOW work creates a role invocation and Run tree.', /lightweight direct path/],
    ['mandatory gates', 'Capabilities and durable artifacts are optional. Triggered gates are mandatory.', 'Capabilities and gates are optional.', /optional capabilities and mandatory gates/],
    ['omitted capability gate', 'Omitting a capability cannot omit the control commonly associated with it.', 'Omitting a capability omits its control.', /omitted capability preserves gate/],
    ['main authority', 'Only main may:', 'Any capability may:', /Only main may list uniqueness; lists=0/],
    ['hard no-fan-out', 'must not create, invoke, launch, delegate to, or reconfigure another agent', 'may create, invoke, launch, delegate to, or reconfigure another agent', /capability no-fan-out modal prohibition/],
    ['Boundary owner', 'Main derives the attempt-specific Boundary', 'The Solution Designer derives the attempt-specific Boundary', /main owns Boundary/],
    ['Boundary forms', '- inline for simple direct work;', '- available only as a persisted stage;', /equivalent Boundary forms/],
    ['evaluator lifecycle', 'never repair or modify their target, and never start a producer, revision, or later invocation', 'may repair their target and start revision', /evaluator lifecycle boundary/],
  ];
  for (const [name, current, replacement, expectedFailure] of invariantMutations) {
    assert.equal(count(generated, current), 1, name);
    assert.throws(() => assertAdaptiveProtocolSemantics(generated.replace(current, replacement)), expectedFailure, name);
  }

  const mainActionMutations = [
    ['goal and topology selection', 'reconstruct the user goal and select or revise topology', 'summarize an assigned goal', /main-owned goal and topology selection/],
    ['packet invocation and cancellation', 'issue packets, launch an invocation, or cancel/supersede work', 'suggest packets and invocations', /main-owned packet invocation and cancellation/],
    ['Boundary lifecycle', 'create, freeze, version, or amend an attempt Boundary', 'read an attempt Boundary', /main-owned Boundary lifecycle/],
    ['artifact verification', 'verify artifacts, hashes, protected inputs, and actual write scope', 'list artifacts and hashes', /main-owned artifact and protected-scope verification/],
    ['evaluator selection', 'select and launch an evaluator or reviewer', 'receive an evaluator report', /main-owned evaluator selection and launch/],
    ['finding and transition', 'classify failures and findings, authorize revision or retry, intervene, stop, unlock, transition, waive where allowed, or accept', 'summarize failures and findings', /main-owned finding retry transition and acceptance/],
    ['arbitration and synthesis', 'arbitrate conflicting evidence and produce the user-facing synthesis', 'store conflicting evidence', /main-owned evidence arbitration and synthesis/],
  ];
  for (const [name, current, replacement, expectedFailure] of mainActionMutations) {
    assert.equal(count(generated, current), 1, name);
    assert.throws(() => assertAdaptiveProtocolSemantics(generated.replace(current, replacement)), expectedFailure, name);
  }
  const startHeading = '## Main-Exclusive Authority';
  const endHeading = '## Technical Solution Design And Attempt Boundary';
  const headingMutations = [
    ['missing start heading', generated.replace(startHeading, '## Main Authority'), /start heading uniqueness; headings=0/],
    ['duplicate start heading', `${generated}\n${startHeading}\n`, /start heading uniqueness; headings=2/],
    ['missing end heading', generated.replace(endHeading, '## Technical Design And Attempt Boundary'), /end heading uniqueness; headings=0/],
    ['duplicate end heading', `${generated}\n${endHeading}\n`, /end heading uniqueness; headings=2/],
    ['wrong heading order', generated.replace(startHeading, '__START__').replace(endHeading, startHeading).replace('__START__', endHeading), /Main-Exclusive Authority heading order/],
    ['intervening level-2 heading', generated.replace(endHeading, `## Unexpected Intervening Section\n\n${endHeading}`), /Main-Exclusive Authority next level-2 heading/],
  ];
  for (const [name, mutation, expectedFailure] of headingMutations) {
    assert.throws(() => assertAdaptiveProtocolSemantics(mutation), expectedFailure, name);
  }

  const onlyMainList = generated.match(/^Only main may:[ \t]*\r?\n(?:[ \t]*\r?\n)?(?:- [^\r\n]+(?:\r?\n|$))+/m)?.[0];
  assert.ok(onlyMainList, 'Only main may list fixture');
  assert.throws(
    () => assertAdaptiveProtocolSemantics(generated.replace(
      'Every capability is hard no-fan-out.',
      `${onlyMainList}\nEvery capability is hard no-fan-out.`,
    )),
    /Only main may list uniqueness; lists=2/,
    'duplicate Only main may list',
  );

  const legacyPositives = [
    'Select the full-v2 workflow for comprehensive work.',
    'The complete v2 pipeline is supported as a mode.',
    'Use a fixed six-role sequence for HIGH risk.',
    'Use a fixed nine-role workflow for unified runs.',
    'An execution Contract stage grants permission.',
    'A parallel legacy workflow remains available.',
    'Enable the bounded-nesting selector for compatibility.',
    'Agent self-launch is supported after handoff.',
  ];
  for (const positive of legacyPositives) {
    assert.throws(
      () => assertAdaptiveProtocolSemantics(`${generated}\n${positive}\n`),
      /prohibited legacy positive/,
      positive,
    );
  }
  assert.doesNotThrow(() => assertAdaptiveProtocolSemantics(`${generated}\nThe neutral contract.manifest data ledger remains a manifest.\n`));
});

test('calibration path and regenerated hash are internally consistent', async (t) => {
  const { outputDir, result } = await buildTemporary(t);
  const calibration = await readFile(path.join(outputDir, '.oh-my-harness/calibration/evaluator-calibration.md'));
  const hash = createHash('sha256').update(calibration).digest('hex');
  assert.equal(hash, result.calibrationSha256);
  const matrix = await readFile(path.join(outputDir, '.oh-my-harness/calibration/adaptive-orchestration-acceptance-matrix.md'), 'utf8');
  assert.equal(count(matrix, `Installed transformed calibration SHA-256: \`${result.calibrationSha256}\``), 1);
  assert.equal(count(matrix, 'Installed transformed calibration SHA-256:'), 1);
  assert.equal(count(matrix, 'Canonical evaluator calibration path: .oh-my-harness/calibration/evaluator-calibration.md'), 1);
  assert.doesNotMatch(matrix, new RegExp(result.calibrationSourceSha256));
  const matrixEntry = result.inventory.requiredFiles.find(({ assetId }) => assetId === 'calibration/adaptive-orchestration-acceptance-matrix');
  assert.deepEqual(matrixEntry.transformations, ['reference-rewrite', 'calibration-ledger-binding']);
  assert.equal(result.inventory.requiredFiles.filter(({ transformations }) => transformations.includes('calibration-ledger-binding')).length, 1);

  const profiles = await readGeneratedProfiles(outputDir);
  const inputs = {
    profiles,
    calibrationBytes: calibration,
    matrix,
    inventoryItems: result.inventory.requiredFiles,
  };
  const bindingResult = assertCalibrationBindings(inputs);
  assert.equal(bindingResult.calibrationSha256, hash);
  assert.equal(bindingResult.evaluatorBindings, 5);
  assert.equal(bindingResult.matrixBindings, 1);

  const evaluatorPath = '.codex/agents/oh-my-harness-plan-evaluator.toml';
  const bindingLine = profiles.get(evaluatorPath).match(/Installed canonical evaluator calibration[^\n]+/)[0];
  assert.throws(
    () => assertCalibrationBindings({ ...inputs, profiles: withProfileMutation(profiles, evaluatorPath, bindingLine, '') }),
    /exact evaluator binding/,
    'missing profile binding',
  );
  assert.throws(
    () => assertCalibrationBindings({
      ...inputs,
      profiles: withProfileMutation(profiles, evaluatorPath, hash, '0'.repeat(64)),
    }),
    /exact evaluator binding/,
    'stale profile hash',
  );
  assert.throws(
    () => assertCalibrationBindings({
      ...inputs,
      profiles: withProfileMutation(profiles, evaluatorPath, bindingLine, `${bindingLine}\n${bindingLine}`),
    }),
    /exact evaluator binding/,
    'duplicate profile binding',
  );
  const executorPath = '.codex/agents/oh-my-harness-executor.toml';
  const sixthProfiles = new Map(profiles);
  sixthProfiles.set(executorPath, `${sixthProfiles.get(executorPath)}\n${bindingLine}\n`);
  assert.throws(
    () => assertCalibrationBindings({ ...inputs, profiles: sixthProfiles }),
    /producer or sixth-profile binding/,
    'sixth profile binding',
  );
  assert.throws(
    () => assertCalibrationBindings({
      ...inputs,
      matrix: matrix.replace(`Installed transformed calibration SHA-256: \`${hash}\``, ''),
    }),
    /exact matrix hash relationship/,
    'missing matrix binding',
  );
  assert.throws(
    () => assertCalibrationBindings({
      ...inputs,
      matrix: matrix.replace(hash, '0'.repeat(64)),
    }),
    /exact matrix hash relationship/,
    'stale matrix binding',
  );
  assert.throws(
    () => assertCalibrationBindings({
      ...inputs,
      matrix: `${matrix}\nInstalled transformed calibration SHA-256: \`${hash}\`\n`,
    }),
    /exact matrix hash relationship/,
    'duplicate matrix binding',
  );
  const missingInventory = result.inventory.requiredFiles.map((item) => (
    item.destinationPath === evaluatorPath
      ? { ...item, transformations: item.transformations.filter((value) => value !== 'calibration-binding') }
      : item
  ));
  assert.throws(
    () => assertCalibrationBindings({ ...inputs, inventoryItems: missingInventory }),
    /inventory evaluator binding set/,
    'missing inventory binding',
  );
  const sixthInventory = result.inventory.requiredFiles.map((item) => (
    item.destinationPath === executorPath
      ? { ...item, transformations: [...item.transformations, 'calibration-binding'] }
      : item
  ));
  assert.throws(
    () => assertCalibrationBindings({ ...inputs, inventoryItems: sixthInventory }),
    /inventory evaluator binding set/,
    'extra inventory binding',
  );
  const duplicateInventory = result.inventory.requiredFiles.map((item) => (
    item.destinationPath === evaluatorPath
      ? { ...item, transformations: [...item.transformations, 'calibration-binding'] }
      : item
  ));
  assert.throws(
    () => assertCalibrationBindings({ ...inputs, inventoryItems: duplicateInventory }),
    /duplicate inventory evaluator binding/,
    'duplicate inventory binding',
  );
});

test('calibration change regenerates one matrix ledger and the exact five profile bindings', async (t) => {
  const baseline = await buildTemporary(t);
  const fixture = await createFixture(t);
  const calibrationPath = path.join(fixture, 'task-docs/_harness/evaluator-calibration.md');
  const calibration = await readFile(calibrationPath, 'utf8');
  await writeFile(calibrationPath, `${calibration}\nPost-intervention deterministic calibration fixture.\n`);
  const changed = await buildTemporary(t, fixture);
  assert.notEqual(changed.result.calibrationSha256, baseline.result.calibrationSha256);
  const matrix = await readFile(path.join(
    changed.outputDir,
    '.oh-my-harness/calibration/adaptive-orchestration-acceptance-matrix.md',
  ), 'utf8');
  assert.equal(count(matrix, `Installed transformed calibration SHA-256: \`${changed.result.calibrationSha256}\``), 1);
  assert.equal(count(matrix, baseline.result.calibrationSha256), 0);
  for (const [, destinationPath] of PROFILE_PAIRS.filter(([sourcePath]) => EVALUATOR_SOURCES.has(sourcePath))) {
    const profile = await readFile(path.join(changed.outputDir, destinationPath), 'utf8');
    assert.equal(count(profile, changed.result.calibrationSha256), 1, destinationPath);
    assert.equal(count(profile, baseline.result.calibrationSha256), 0, destinationPath);
  }
});

test('matrix calibration ledger rejects missing, duplicate, and pre-existing bindings', async (t) => {
  const sourceAnchor = 'Canonical evaluator calibration path: task-docs/_harness/evaluator-calibration.md';
  const cases = [
    ['missing anchor', (matrix) => matrix.replace(sourceAnchor, 'Calibration source is packet-bound.'), /exactly one installed calibration anchor; found 0/],
    ['duplicate anchor', (matrix) => `${matrix}\n${sourceAnchor}\n`, /exactly one installed calibration anchor; found 2/],
    ['pre-existing stale binding', (matrix) => matrix.replace(
      sourceAnchor,
      `${sourceAnchor}\nInstalled transformed calibration SHA-256: \`${'0'.repeat(64)}\``,
    ), /must not contain a pre-existing installed calibration binding/],
  ];
  for (const [name, mutate, expected] of cases) {
    const fixture = await createFixture(t);
    const matrixPath = path.join(fixture, 'task-docs/_harness/adaptive-orchestration-acceptance-matrix.md');
    await writeFile(matrixPath, mutate(await readFile(matrixPath, 'utf8')));
    const base = await temporaryDirectory(t);
    await assert.rejects(
      buildBundle({ rootDir: fixture, outputDir: path.join(base, name.replaceAll(' ', '-')), version: '0.0.0-task1' }),
      expected,
      name,
    );
  }
});

test('all helpers remain required transformed Python payload with structural-evidence disclaimers', async (t) => {
  const { outputDir, result } = await buildTemporary(t);
  const map = await readJson('packaging/bundle-map.json');
  const inventoryItems = new Map(result.inventory.requiredFiles.map((item) => [item.destinationPath, item]));
  for (const [sourcePath, destinationPath] of HELPER_PAIRS) {
    const source = await readFile(path.join(ROOT, sourcePath), 'utf8');
    const target = await readFile(path.join(outputDir, destinationPath), 'utf8');
    assert.equal(target, applyRewrites(source, map.rewrites));
    assert.equal(inventoryItems.get(destinationPath)?.required, true);
    assert.equal(inventoryItems.get(destinationPath)?.kind, 'python-helper');
  }
  const routerValidator = await readFile(path.join(outputDir, '.oh-my-harness/scripts/validate_router_fixture.py'), 'utf8');
  const ruleValidator = await readFile(path.join(outputDir, '.oh-my-harness/scripts/validate_rule_preservation.py'), 'utf8');
  assert.match(routerValidator, /not a semantic equivalence verifier/);
  assert.match(ruleValidator, /not a full semantic equivalence verifier/);
  assert.match(ruleValidator, /not replace semantic equivalence review of the migrated wording/);
});

test('runtime reference closure excludes provenance and has no dangling transformed target', async (t) => {
  const { outputDir, result } = await buildTemporary(t);
  const installed = new Set(result.inventory.requiredFiles.map(({ destinationPath }) => destinationPath));
  installed.add(result.inventory.managedBlock.assetPath);
  installed.add('.oh-my-harness/bundle-inventory.json');
  for (const item of result.inventory.requiredFiles) {
    const content = await readFile(path.join(outputDir, item.destinationPath), 'utf8');
    assert.doesNotMatch(content, /task-docs\/_harness\//);
    assert.doesNotMatch(content, /(?:^|[\s"'`(])task-docs\/_harness(?=$|[\s"'`.,;:!?/)\]}])/m);
    assert.doesNotMatch(content, /(?:^|[\s"'`(])docs\/agent-routing(?=$|[\s"'`.,;:!?/)\]}])/m);
    assert.doesNotMatch(content, /\.codex\/agents\/harness-/);
    assert.doesNotMatch(content, /\.codex\/config\.example\.toml/);
    assert.doesNotMatch(content, /\/Users\/|\/home\//);
    assert.doesNotMatch(content, /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/);
    assert.doesNotMatch(content, /AKIA[0-9A-Z]{16}/);
    assert.doesNotMatch(content, /gh[pousr]_[A-Za-z0-9]{20,}/);
  }
  assert.ok(result.inventory.requiredFiles.some(({ sourcePath }) => sourcePath.startsWith('task-docs/_harness/')));
  assert.ok([...installed].every((relativePath) => !/(?:^|\/)(?:task-docs|test|fixtures|history|bin|src\/installer)(?:\/|$)/.test(relativePath)));
  assert.ok([...installed].every((relativePath) => !/install-state|backup|__pycache__|\.pyc$/.test(relativePath)));
  assert.equal(installed.size, 51);
});
