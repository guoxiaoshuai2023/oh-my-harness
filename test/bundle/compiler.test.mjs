import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import {
  applyRewrites,
  assertRuntimeReferenceClosure,
  buildBundle,
} from '../../src/bundle/compiler.mjs';
import { EXPECTED_PAIRS } from './expected-data.mjs';
import {
  ROOT,
  buildTemporary,
  createFixture,
  readJson,
  temporaryDirectory,
  treeHashes,
  writeJson,
} from './test-helpers.mjs';

test('package contract and schema fix the scoped stdlib-only release contract', async () => {
  const contract = await readJson('packaging/package-contract.json');
  assert.equal(contract.packageName, '@guoxiaoshuai2023/oh-my-harness');
  assert.equal(contract.binaryName, 'oh-my-harness');
  assert.equal(contract.binaryPath, 'bin/oh-my-harness.mjs');
  assert.equal(contract.nodeEngine, '>=24 <25');
  assert.deepEqual(contract.lifecycleRuntime, {
    language: 'node',
    standardLibraryOnly: true,
    pythonRequired: false,
    thirdPartyRuntimeDependencies: 0,
  });
  assert.equal(contract.helperRuntime.requiredPayload, true);
  assert.equal(contract.helperRuntime.requiredHelpers.length, 3);
  assert.deepEqual(contract.forbiddenCommandPatterns, ['npx oh-my-harness', '--package=oh-my-harness']);
  assert.ok(Object.values(contract.canonicalCommands).every((command) => command.includes('--package=')));
  assert.ok(Object.values(contract.canonicalCommands).every((command) => !command.includes('npx oh-my-harness')));
  assert.deepEqual(contract.packageFiles, ['bin/oh-my-harness.mjs', 'src/installer/**', 'dist/**', 'README.md', 'package.json']);
});

test('explicit map exactly matches the 42 accepted source and destination pairs', async () => {
  const map = await readJson('packaging/bundle-map.json');
  assert.equal(map.entries.length, 42);
  assert.deepEqual(map.entries.map(({ source, destination }) => [source, destination]), EXPECTED_PAIRS);
  assert.ok(map.entries.every(({ required }) => required === true));
  assert.equal(new Set(map.entries.map(({ assetId }) => assetId)).size, 42);
  assert.equal(new Set(map.entries.map(({ destination }) => destination)).size, 42);
  assert.equal(map.rewrites.length, 59);
  assert.deepEqual(map.calibrationBinding.dependentAssetIds, [
    'agent/plan-evaluator',
    'agent/solution-evaluator',
    'agent/result-evaluator',
    'calibration/adaptive-orchestration-acceptance-matrix',
    'template/orchestration-prompt',
    'template/plan-review',
    'template/result-qa',
    'template/task-packet',
  ]);
  const compiler = await readFile(path.join(ROOT, 'src/bundle/compiler.mjs'), 'utf8');
  assert.doesNotMatch(compiler, /\bglob(?:Sync)?\b/);
  assert.match(compiler, /for \(const entry of map\.entries\)/);
});

test('reference replacement is one non-cascading source-span pass', () => {
  const input = '.codex/agents/harness-*.toml and harness-result-evaluator.toml';
  const rewrites = [
    { from: '.codex/agents/harness-*.toml', to: '.codex/agents/oh-my-harness-*.toml' },
    { from: 'harness-result-evaluator.toml', to: 'oh-my-harness-result-evaluator.toml' },
    { from: 'harness-*.toml', to: 'forbidden-cascade.toml' },
  ];
  assert.equal(
    applyRewrites(input, rewrites),
    '.codex/agents/oh-my-harness-*.toml and oh-my-harness-result-evaluator.toml',
  );
});

test('support README rewrites both bare source paths and resolves them in the generated target', async (t) => {
  const { outputDir, result } = await buildTemporary(t);
  const destination = '.oh-my-harness/docs/source-support/README.md';
  const readme = await readFile(path.join(outputDir, destination), 'utf8');
  assert.match(readme, /^npx --yes --package=@guoxiaoshuai2023\/oh-my-harness@<version> oh-my-harness install --target <repo> --dry-run$/m);
  assert.match(readme, /^npx --yes --package=@guoxiaoshuai2023\/oh-my-harness@<version> oh-my-harness install --target <repo>$/m);
  assert.match(readme, /^npx --yes --package=@guoxiaoshuai2023\/oh-my-harness@<target-version> oh-my-harness update --target <repo>$/m);
  assert.match(readme, /^npx --yes --package=@guoxiaoshuai2023\/oh-my-harness@<compatible-version> oh-my-harness uninstall --target <repo>$/m);
  assert.ok(!readme.includes('cp -R .oh-my-harness/docs/agent-routing "$TARGET/docs/"'));
  assert.ok(!readme.includes('cp -R .oh-my-harness "$TARGET/task-docs/"'));
  assert.ok(!readme.includes('cp -R docs/agent-routing'));
  assert.ok(!readme.includes('cp -R task-docs/_harness'));
  assert.doesNotThrow(() => assertRuntimeReferenceClosure(readme, destination, result.inventory));
  for (const reference of ['.oh-my-harness/docs/agent-routing', '.oh-my-harness']) {
    assert.equal((await stat(path.join(outputDir, reference))).isDirectory(), true);
    assert.ok(result.inventory.requiredFiles.some(({ destinationPath }) => destinationPath.startsWith(`${reference}/`)));
  }
});

test('removing either bare rewrite authority makes the build fail without output', async (t) => {
  for (const sourceReference of ['docs/agent-routing', 'task-docs/_harness']) {
    const fixture = await createFixture(t);
    const map = await readJson('packaging/bundle-map.json', fixture);
    map.rewrites = map.rewrites.filter(({ from }) => from !== sourceReference);
    await writeJson('packaging/bundle-map.json', map, fixture);
    const base = await temporaryDirectory(t);
    const outputDir = path.join(base, sourceReference.replaceAll('/', '-'));
    await assert.rejects(
      buildBundle({ rootDir: fixture, outputDir, version: '0.0.0-task1' }),
      /rewrite table is incomplete or out of contract order/,
    );
    await assert.rejects(stat(outputDir), { code: 'ENOENT' });
  }
});

test('runtime validator independently rejects standalone bare source references', async (t) => {
  const { result } = await buildTemporary(t);
  for (const sourceReference of ['docs/agent-routing', 'task-docs/_harness']) {
    assert.throws(
      () => assertRuntimeReferenceClosure(sourceReference, 'direct-validator-fixture.md', result.inventory),
      new RegExp(`unknown source-only runtime reference.*${sourceReference.replaceAll('/', '\\/')}`),
    );
  }
});

test('runtime validator accepts installed targets that contain source-token substrings', async (t) => {
  const { result } = await buildTemporary(t);
  const content = [
    '.oh-my-harness/docs/agent-routing',
    '.oh-my-harness/docs/agent-routing/README.md',
    '.oh-my-harness/protocols/semantic-fidelity-protocol.md',
  ].join('\n');
  assert.doesNotThrow(() => assertRuntimeReferenceClosure(content, 'installed-target-fixture.md', result.inventory));
});

test('slash-terminated source references remain rejected or rewritten', async (t) => {
  const { result } = await buildTemporary(t);
  for (const sourceReference of ['docs/agent-routing/', 'task-docs/_harness/']) {
    assert.throws(
      () => assertRuntimeReferenceClosure(sourceReference, 'slash-regression-fixture.md', result.inventory),
      /unknown source-only runtime reference/,
    );
  }
  const map = await readJson('packaging/bundle-map.json');
  assert.equal(applyRewrites('docs/agent-routing/', map.rewrites), '.oh-my-harness/docs/agent-routing/');
  assert.equal(applyRewrites('task-docs/_harness/', map.rewrites), '.oh-my-harness/');
});

test('two clean builds are byte-for-byte deterministic with a closed inventory', async (t) => {
  const first = await buildTemporary(t);
  const second = await buildTemporary(t);
  const firstHashes = await treeHashes(first.outputDir);
  const secondHashes = await treeHashes(second.outputDir);
  assert.deepEqual(firstHashes, secondHashes);
  assert.equal(firstHashes.length, 44);
  const inventoryPath = path.join(first.outputDir, '.oh-my-harness/bundle-inventory.json');
  const inventoryBytes = await readFile(inventoryPath);
  const secondInventoryBytes = await readFile(path.join(second.outputDir, '.oh-my-harness/bundle-inventory.json'));
  assert.deepEqual(inventoryBytes, secondInventoryBytes);
  const inventory = JSON.parse(inventoryBytes);
  assert.equal(inventory.bundleVersion, '0.0.0-task1');
  assert.equal(inventory.requiredFiles.length, 42);
  assert.deepEqual(inventory.optionalFiles, []);
  assert.equal(inventory.ownership.payloadPaths.length, 42);
  assert.equal(inventory.ownership.agentPaths.length, 6);
  assert.equal(inventory.managedBlock.assetPath, '.oh-my-harness/managed-router-block.md');
  assert.ok(inventory.requiredFiles.every(({ sourceSha256, destinationSha256 }) => /^[0-9a-f]{64}$/.test(sourceSha256) && /^[0-9a-f]{64}$/.test(destinationSha256)));
  assert.ok(!inventory.ownership.payloadPaths.includes('.oh-my-harness/bundle-inventory.json'));
  assert.ok(!firstHashes.some(([relativePath]) => relativePath === '.codex/config.toml'));
  assert.ok(!firstHashes.some(([relativePath]) => /install-state|backup|__pycache__|\.pyc$/.test(relativePath)));
  assert.equal(createHash('sha256').update(inventoryBytes).digest('hex').length, 64);
});

test('negative contract, map, schema, source-reference, and collision fixtures fail precisely', async (t) => {
  const cases = [
    ['unscoped package identity', async (fixture) => {
      const contract = await readJson('packaging/package-contract.json', fixture);
      contract.packageName = 'oh-my-harness';
      await writeJson('packaging/package-contract.json', contract, fixture);
    }, /package contract schema validation failed|fixed identity mismatch/],
    ['duplicate destination', async (fixture) => {
      const map = await readJson('packaging/bundle-map.json', fixture);
      map.entries[1].destination = map.entries[0].destination;
      await writeJson('packaging/bundle-map.json', map, fixture);
    }, /duplicate asset, source, or destination|rewrite table/],
    ['missing map entry', async (fixture) => {
      const map = await readJson('packaging/bundle-map.json', fixture);
      map.entries.pop();
      await writeJson('packaging/bundle-map.json', map, fixture);
    }, /exactly 42 entries/],
    ['extra map entry', async (fixture) => {
      const map = await readJson('packaging/bundle-map.json', fixture);
      map.entries.push({
        ...map.entries[0],
        assetId: 'unexpected/extra',
        source: 'unexpected/extra.md',
        destination: '.oh-my-harness/unexpected/extra.md',
      });
      await writeJson('packaging/bundle-map.json', map, fixture);
    }, /exactly 42 entries/],
    ['unsafe destination', async (fixture) => {
      const map = await readJson('packaging/bundle-map.json', fixture);
      map.entries[0].destination = '../escape.md';
      await writeJson('packaging/bundle-map.json', map, fixture);
    }, /safe relative POSIX path|normalized relative path/],
    ['malformed schema contract', async (fixture) => {
      const schema = await readJson('packaging/schemas/package-contract.schema.json', fixture);
      schema.type = 'array';
      await writeJson('packaging/schemas/package-contract.schema.json', schema, fixture);
    }, /package contract schema validation failed/],
    ['unknown source reference', async (fixture) => {
      await writeFile(path.join(fixture, 'README.md'), '\nUnknown runtime reference: task-docs/_harness/not-installed.md\n', { flag: 'a' });
    }, /installed reference does not resolve/],
    ['missing required source', async (fixture) => {
      await rm(path.join(fixture, 'README.md'));
    }, /required source is unavailable/],
  ];
  for (const [name, mutate, expected] of cases) {
    const fixture = await createFixture(t);
    await mutate(fixture);
    const base = await temporaryDirectory(t);
    await assert.rejects(
      buildBundle({ rootDir: fixture, outputDir: path.join(base, name.replaceAll(' ', '-')), version: '0.0.0-task1' }),
      expected,
      name,
    );
  }

  const base = await temporaryDirectory(t);
  const outputDir = path.join(base, 'collision');
  await mkdir(outputDir);
  await writeFile(path.join(outputDir, 'existing'), 'collision');
  await assert.rejects(
    buildBundle({ rootDir: ROOT, outputDir, version: '0.0.0-task1' }),
    /output directory must be new or explicitly empty/,
  );
});

test('managed block modal downgrade fixture is rejected', async (t) => {
  const fixture = await createFixture(t);
  const blockPath = path.join(fixture, 'packaging/managed-router-block.md');
  const block = await readFile(blockPath, 'utf8');
  await writeFile(blockPath, block.replace('must be followed', 'should be followed'));
  const base = await temporaryDirectory(t);
  await assert.rejects(
    buildBundle({ rootDir: fixture, outputDir: path.join(base, 'output'), version: '0.0.0-task1' }),
    /does not exactly preserve/,
  );
});
