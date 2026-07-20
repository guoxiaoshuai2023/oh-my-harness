import assert from 'node:assert/strict';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';

import {
  ACTIVE_SOURCE_PATHS,
  CAPABILITIES,
  ORIGINAL_SIX,
  ROOT,
  readAllProfiles,
  readSourceCapabilityRegistry,
  readText,
  selectCapabilities,
} from '../support/t01-governance-fixtures.mjs';

const LEGACY_PATTERNS = [
  /complete[- ]v2/i,
  /full[- ]?v2 compatibility/i,
  /required full[- ]?v2/i,
  /deliberate full[- ]?v2/i,
  /freeze ACCEPTED_CONTRACT\.md/i,
  /ACCEPTED_CONTRACT\.md remains.*(?:compatible|strong boundary)/i,
  /legacy-boundary-contract/i,
  /nested delegation.*(?:authorized|allowed)/i,
  /bounded nesting.*(?:authorized|allowed)/i,
];

async function walk(relativeDirectory) {
  const entries = await readdir(path.join(ROOT, relativeDirectory), { withFileTypes: true });
  const result = [];
  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name);
    if (entry.isDirectory()) result.push(...await walk(relativePath));
    else result.push(relativePath);
  }
  return result;
}

test('AC12: active new-Run authority has no fixed/full-v2, Contract, parallel legacy, or bounded-nesting selector', async () => {
  for (const relativePath of ACTIVE_SOURCE_PATHS) {
    const content = await readText(relativePath);
    for (const pattern of LEGACY_PATTERNS) assert.doesNotMatch(content, pattern, relativePath + ' matches ' + pattern);
  }
});

test('AC12: obsolete task-contract input and execution Contract have no active source selector', async () => {
  const roots = ['AGENTS.md', 'README.md', '.codex', 'task-docs/_harness', 'docs', 'examples', '.github'];
  const candidates = [];
  for (const root of roots) {
    const full = path.join(ROOT, root);
    const stat = await import('node:fs/promises').then(({ stat }) => stat(full));
    candidates.push(...(stat.isDirectory() ? await walk(root) : [root]));
  }
  const hits = [];
  for (const relativePath of candidates) {
    const content = await readFile(path.join(ROOT, relativePath), 'utf8');
    if (/task-contract-template|ACCEPTED_CONTRACT\.md/.test(content)) hits.push(relativePath);
  }
  assert.deepEqual(hits, []);
  await assert.rejects(stat(path.join(ROOT, 'task-docs/_harness/templates/task-contract-template.md')), { code: 'ENOENT' });
});

test('AC12 positive: main-owned Boundary retains permission, protected state, evidence, and stops in all forms', async () => {
  const adaptive = await readText('task-docs/_harness/adaptive-orchestration-protocol.md');
  const packet = await readText('task-docs/_harness/templates/task-packet-template.md');
  const combined = adaptive + '\n' + packet;
  assert.match(combined, /inline.*packet.*persisted/is);
  assert.match(combined, /allowed (?:actions|writes|paths)/i);
  assert.match(combined, /protected state/i);
  assert.match(combined, /required evidence/i);
  assert.match(combined, /stop conditions/i);
  assert.match(combined, /main.*(?:issues|freezes|owns).*Boundary/is);
});

test('AC13: retained safety, independence, retry, no-fabrication, QA, and main acceptance rules remain effective', async () => {
  const sources = await Promise.all([
    readText('AGENTS.md'),
    readText('task-docs/_harness/adaptive-orchestration-protocol.md'),
    readText('task-docs/_harness/semantic-fidelity-protocol.md'),
    readText('task-docs/_harness/run-directory-protocol.md'),
    readText('task-docs/_harness/evaluator-calibration.md'),
  ]);
  const combined = sources.join('\n');
  assert.match(combined, /protected state/i);
  assert.match(combined, /no-fabrication|must not fabricate|do not fabricate/i);
  assert.match(combined, /strict PASS or FAIL/i);
  assert.match(combined, /first valid.*failure.*focused revision/is);
  assert.match(combined, /second.*intervention.*third/is);
  assert.match(combined, /post-intervention third.*(?:exhaust|blocked)/is);
  assert.match(combined, /producer-independent Result QA/i);
  assert.match(combined, /main.*final acceptance/is);
  assert.match(combined, /AC-pass-but-user-fail/i);
});

test('AC13 negative: counts and files cannot pass a renamed legacy or authority-breaching behavior', async () => {
  const profiles = await readAllProfiles();
  const sourceCapabilities = await readSourceCapabilityRegistry();
  assert.equal(profiles.length, 9);
  const renamedLegacyFacts = {
    requiredCapabilities: ORIGINAL_SIX,
    triggeredGates: [],
    gateRecords: [],
    workflowTopology: { mode: 'governed-complete', order: ORIGINAL_SIX },
  };
  assert.throws(
    () => selectCapabilities(renamedLegacyFacts, sourceCapabilities),
    /unexpected selection fact: workflowTopology/,
  );

  const authorityBreaches = {
    solutionOwnsPermission: true,
    evaluatorMayRepair: true,
    lowCreatesArtifacts: true,
  };
  for (const [field, value] of Object.entries(authorityBreaches)) {
    assert.throws(
      () => selectCapabilities({ requiredCapabilities: ORIGINAL_SIX, triggeredGates: [], gateRecords: [], [field]: value }, sourceCapabilities),
      new RegExp('unexpected selection fact: ' + field),
    );
  }
});

test('AC14: source-only end-to-end inputs include all nine profiles and no T-02 through T-05 output', async () => {
  const manifest = [
    ...CAPABILITIES.map(({ profile }) => profile),
    'task-docs/_harness/adaptive-orchestration-protocol.md',
    'task-docs/_harness/semantic-fidelity-protocol.md',
    'task-docs/_harness/run-directory-protocol.md',
    'task-docs/_harness/templates/task-packet-template.md',
    'task-docs/_harness/templates/orchestration-prompt-template.md',
    'task-docs/_harness/templates/governance-review-template.md',
    'task-docs/_harness/templates/technical-solution-design-template.md',
    'test/support/t01-governance-fixtures.mjs',
  ];
  assert.equal(manifest.filter((item) => item.startsWith('.codex/agents/')).length, 9);
  for (const relativePath of manifest) {
    assert.doesNotMatch(relativePath, /TASK_BOARD|task-board-template|retrospective|task-docs\/cases|packaging|src\/bundle|src\/installer|migration/i);
    const content = await readText(relativePath);
    assert.ok(content.length > 0, relativePath);
  }
});

test('source profile identity set is exact and mission-distinct', async () => {
  const sourceCapabilities = await readSourceCapabilityRegistry();
  assert.deepEqual(sourceCapabilities.map(({ name }) => name).sort(), CAPABILITIES.map(({ name }) => name).sort());
  assert.deepEqual(sourceCapabilities.map(({ mission }) => mission).sort(), CAPABILITIES.map(({ mission }) => mission).sort());
  assert.equal(new Set(sourceCapabilities.map(({ mission }) => mission)).size, 9);
  assert.equal(new Set(sourceCapabilities.map(({ sourceHash }) => sourceHash)).size, 9);
});

test('calibration has 25 evidence-routing fields with nonempty existing paths', async () => {
  const calibration = await readText('task-docs/_harness/evaluator-calibration.md');
  const headings = [...calibration.matchAll(/^### (CAL-[A-Z0-9-]+)\b.*$/gm)];
  assert.deepEqual(headings.map((heading) => heading[1]), [
    'CAL-001', 'CAL-002', 'CAL-003', 'CAL-004', 'CAL-005', 'CAL-006',
    'CAL-SEM-001', 'CAL-SEM-002', 'CAL-SEM-003', 'CAL-SEM-004',
    'CAL-ADAPT-001', 'CAL-ADAPT-002', 'CAL-ADAPT-003', 'CAL-ADAPT-004',
    'CAL-ADAPT-005', 'CAL-ADAPT-006', 'CAL-ADAPT-007', 'CAL-ADAPT-008',
    'CAL-ADAPT-009', 'CAL-ADAPT-011', 'CAL-ADAPT-012', 'CAL-ADAPT-013',
    'CAL-ADAPT-014', 'CAL-ADAPT-015', 'CAL-ADAPT-016',
  ]);
  for (let index = 0; index < headings.length; index += 1) {
    const start = headings[index].index;
    const end = headings[index + 1]?.index ?? calibration.indexOf('\n## Applying Calibration');
    const body = calibration.slice(start, end);
    const routing = body.match(/^- Relevant templates\/protocols:\s*(.+)$/m);
    assert.ok(routing?.[1].trim(), headings[index][1]);
    const paths = [...routing[1].matchAll(/`([^`]+)`/g)].map((match) => match[1]);
    assert.ok(paths.length > 0, headings[index][1] + ' has no routed path');
    for (const relativePath of paths) {
      const details = await stat(path.join(ROOT, relativePath));
      assert.ok(details.isFile() || details.isDirectory(), headings[index][1] + ': ' + relativePath);
    }
  }
});
