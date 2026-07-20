import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CAPABILITIES,
  MANDATORY_GATES,
  ORIGINAL_SIX,
  allSubsets,
  completeGateRecords,
  dependencyOrder,
  readAllProfiles,
  readSourceCapabilityRegistry,
  readText,
  selectCapabilities,
} from '../support/t01-governance-fixtures.mjs';

test('AC1: all 512 source-derived fact-selected subsets are representable without a stored workflow', async () => {
  const sourceCapabilities = await readSourceCapabilityRegistry();
  assert.deepEqual(sourceCapabilities.map(({ id }) => id), CAPABILITIES.map(({ id }) => id));
  assert.deepEqual(sourceCapabilities.map(({ name }) => name), CAPABILITIES.map(({ name }) => name));
  assert.deepEqual(sourceCapabilities.map(({ mission }) => mission), CAPABILITIES.map(({ mission }) => mission));
  assert.equal(new Set(sourceCapabilities.map(({ mission }) => mission)).size, 9);

  const subsets = allSubsets(sourceCapabilities.map(({ id }) => id));
  assert.equal(subsets.length, 512);
  for (const requiredCapabilities of subsets) {
    const selected = selectCapabilities({ requiredCapabilities, triggeredGates: [], gateRecords: [] }, sourceCapabilities);
    assert.deepEqual([...selected].sort(), [...requiredCapabilities].sort());
  }
  assert.ok(subsets.some((subset) => subset.length === 1));
  assert.ok(subsets.some((subset) => subset.length === 9));
  assert.ok(subsets.some((subset) => subset.length === ORIGINAL_SIX.length && ORIGINAL_SIX.every((id) => subset.includes(id))));

  const sameSet = ['planner', 'solution-designer', 'executor'];
  assert.notDeepEqual(
    dependencyOrder(sameSet, [['planner', 'solution-designer'], ['solution-designer', 'executor']]),
    dependencyOrder(sameSet, [['executor', 'solution-designer'], ['solution-designer', 'planner']]),
  );
});

test('AC1 negative: any selector fact outside the explicit allowed schema fails', async () => {
  const sourceCapabilities = await readSourceCapabilityRegistry();
  for (const invalid of [
    { namedMode: 'governed-complete' },
    { fixedSequence: ORIGINAL_SIX },
    { parallelLegacyBranch: true },
    { autoAllNine: true },
    { workflowPreset: 'governed-complete' },
    { orderedCapabilities: ORIGINAL_SIX },
    { compatibilityLane: 'classic-governed' },
    { selectCompleteCapabilitySet: true },
    { workflowBlueprint: { order: ORIGINAL_SIX } },
  ]) {
    const field = Object.keys(invalid)[0];
    assert.throws(
      () => selectCapabilities({ requiredCapabilities: ORIGINAL_SIX, triggeredGates: [], gateRecords: [], ...invalid }, sourceCapabilities),
      new RegExp('unexpected selection fact: ' + field),
    );
  }
});

test('AC2: LOW direct work creates no role or durable artifact and keeps validation', async () => {
  const sourceCapabilities = await readSourceCapabilityRegistry();
  const selected = selectCapabilities({
    requiredCapabilities: [],
    lowDirect: true,
    artifactEvents: [],
    validation: ['focused-check'],
    triggeredGates: [],
    gateRecords: [],
  }, sourceCapabilities);
  assert.equal(selected.size, 0);
  assert.throws(() => selectCapabilities({
    requiredCapabilities: ['planner'],
    lowDirect: true,
    artifactEvents: ['packet'],
    validation: ['focused-check'],
    triggeredGates: [],
    gateRecords: [],
  }, sourceCapabilities));
});

test('AC3: HIGH may use fewer than nine capabilities only with every triggered gate closed', async () => {
  const sourceCapabilities = await readSourceCapabilityRegistry();
  const selected = selectCapabilities({
    requiredCapabilities: ['solution-designer', 'solution-evaluator', 'executor', 'result-evaluator'],
    semanticRisk: 'HIGH',
    triggeredGates: MANDATORY_GATES,
    gateRecords: completeGateRecords(),
  }, sourceCapabilities);
  assert.equal(selected.size, 4);
  assert.throws(() => selectCapabilities({
    requiredCapabilities: ['solution-designer', 'executor'],
    semanticRisk: 'HIGH',
    triggeredGates: MANDATORY_GATES,
    gateRecords: completeGateRecords().filter(({ gate }) => gate !== 'independence'),
  }, sourceCapabilities), /dropped triggered gate: independence/);
});

test('AC4: exact nine stable source profiles hard-prohibit all fan-out', async () => {
  const profiles = await readAllProfiles();
  assert.equal(profiles.length, 9);
  assert.equal(new Set(profiles.map(({ parsed }) => parsed.name)).size, 9);
  for (const profile of profiles) {
    assert.equal(profile.parsed.name, profile.name, profile.profile);
    assert.match(profile.parsed.developer_instructions, /must not create, invoke, launch, delegate to, or reconfigure another agent/i, profile.profile);
    assert.doesNotMatch(profile.parsed.developer_instructions, /nested delegation|bounded nesting|unless the packet.*agent/i, profile.profile);
    assert.doesNotMatch(profile.parsed.developer_instructions, /ACCEPTED_CONTRACT|fixed (?:six|nine)|full[- ]?v2|legacy workflow/i, profile.profile);
  }
  const config = await readText('.codex/config.example.toml');
  assert.match(config, /max_depth = 1/);
  assert.match(config, /corroborating configuration/i);
  assert.match(config, /does not grant.*fan-out/i);
});

test('AC4 negative: dynamic workflow facts do not belong in stable profiles', async () => {
  const profiles = await readAllProfiles();
  for (const profile of profiles) {
    assert.doesNotMatch(profile.content, /current_task_path|acceptance_criteria\s*=|commands\s*=|max_nested|agent_count|iteration_budget/i, profile.profile);
  }
});

test('AC5: Solution pair is Technical Solution Design-only and cannot own permission or lifecycle', async () => {
  const profiles = new Map((await readAllProfiles()).map((profile) => [profile.id, profile]));
  const designer = profiles.get('solution-designer').parsed.developer_instructions;
  const evaluator = profiles.get('solution-evaluator').parsed.developer_instructions;
  assert.match(designer, /one concrete Technical Solution Design candidate/i);
  assert.match(evaluator, /strict Technical Solution Design review/i);
  for (const text of [designer, evaluator]) {
    assert.match(text, /must not.*Boundary/i);
    assert.match(text, /must not.*Contract/i);
    assert.match(text, /must not.*(?:permission|Task acceptance criteria|lifecycle)/i);
  }
  const template = await readText('task-docs/_harness/templates/technical-solution-design-template.md');
  assert.match(template, /chosen implementation path/i);
  assert.match(template, /state.*error.*failure handling/is);
  assert.match(template, /negative probes/i);
  assert.match(template, /predicted affected surface.*not.*attempt permission/is);
});
