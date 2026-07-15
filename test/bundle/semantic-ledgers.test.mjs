import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { applyRewrites } from '../../src/bundle/compiler.mjs';
import { HELPER_PAIRS, PROFILE_PAIRS, ROUTER_HEADINGS } from './expected-data.mjs';
import { ROOT, buildTemporary, readJson } from './test-helpers.mjs';

const EVALUATOR_SOURCES = new Set([
  '.codex/agents/harness-plan-evaluator.toml',
  '.codex/agents/harness-solution-evaluator.toml',
  '.codex/agents/harness-result-evaluator.toml',
]);

function count(content, needle) {
  return content.split(needle).length - 1;
}

function removeInstalledBinding(content) {
  return content.replace(/\n\nInstalled canonical evaluator calibration for this bundle: path `\.oh-my-harness\/calibration\/evaluator-calibration\.md`; SHA-256 `[0-9a-f]{64}`\. This binding does not replace the main-thread packet requirement above\.\n\n/, '\n\n');
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
});

test('six-profile normalized ledger preserves distinct missions and evaluator boundaries', async (t) => {
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
    } else {
      assert.doesNotMatch(target, /^sandbox_mode = "read-only"$/m);
    }
  }
  assert.equal(descriptions.size, 6);
  assert.equal(readOnlyCount, 3);
});

test('calibration path and regenerated hash are internally consistent', async (t) => {
  const { outputDir, result } = await buildTemporary(t);
  const calibration = await readFile(path.join(outputDir, '.oh-my-harness/calibration/evaluator-calibration.md'));
  const hash = createHash('sha256').update(calibration).digest('hex');
  assert.equal(hash, result.calibrationSha256);
  const matrix = await readFile(path.join(outputDir, '.oh-my-harness/calibration/adaptive-orchestration-acceptance-matrix.md'), 'utf8');
  assert.match(matrix, new RegExp(result.calibrationSha256));
  assert.doesNotMatch(matrix, new RegExp(result.calibrationSourceSha256));
  assert.match(matrix, /\.oh-my-harness\/calibration\/evaluator-calibration\.md/);
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
  assert.equal(installed.size, 44);
});
