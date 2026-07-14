import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdir, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { applyLifecyclePlan, createLifecyclePlan } from '../../src/installer/lifecycle.mjs';
import { setFilesystemObserverForTests } from '../../src/installer/filesystem.mjs';
import { preparePackage, loadReleaseBundle } from '../../src/installer/package-bundle.mjs';
import { scanManagedBlock } from '../../src/installer/markers.mjs';
import { STATE_PATH } from '../../src/installer/state.mjs';
import {
  ROOT, cloneRelease, git, readJson, targetFixture, treeSnapshot,
} from './test-helpers.mjs';

let packageRoot;
let release;

before(async () => {
  packageRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-lifecycle-release-'));
  await preparePackage({ packRoot: packageRoot, sourceRoot: ROOT, version: '0.1.0' });
  release = await loadReleaseBundle({ packageRoot, packageVersion: '0.1.0' });
});

after(async () => {
  await rm(packageRoot, { recursive: true, force: true });
});

async function apply(operation, target, selectedRelease = release, faults = []) {
  const planned = await createLifecyclePlan({ operation, target, release: selectedRelease });
  assert.equal(planned.plan.status, 'READY');
  return applyLifecyclePlan({ planned, target, release: selectedRelease, faults });
}

test('install materializes the complete fixed bundle, preserves binary outer bytes, and writes verified state last', async (t) => {
  const prefix = Buffer.from([0x00, 0xff, 0x41, 0x0d, 0x0a]);
  const { target } = await targetFixture(t, prefix);
  const planned = await createLifecyclePlan({ operation: 'install', target, release });
  assert.equal(planned.plan.status, 'READY');
  assert.equal(planned.plan.blockAction, 'append');
  assert.match(planned.envelope.planSha256, /^[0-9a-f]{64}$/);
  assert.equal(planned.plan.creates.length, release.files.size);
  await applyLifecyclePlan({ planned, target, release });

  for (const [relativePath, bytes] of release.files) {
    assert.deepEqual(await readFile(path.join(target, ...relativePath.split('/'))), bytes);
  }
  const agents = await readFile(path.join(target, 'AGENTS.md'));
  const scan = scanManagedBlock(agents);
  assert.deepEqual(scan.prefix, prefix);
  assert.equal(scan.suffix.length, 0);
  assert.deepEqual(scan.interval, release.managedBlock);
  const state = await readJson(target, STATE_PATH);
  assert.equal(state.verification.status, 'verified');
  assert.equal(state.installedVersion, '0.1.0');
  assert.equal(state.ownedFiles.length, release.files.size);
  assert.deepEqual(state.agents.map((item) => item.path), release.inventory.ownership.agentPaths);
  assert.equal(state.installer.packageName, '@guoxiaoshuai2023/oh-my-harness');
  assert.equal(state.installer.binaryName, 'oh-my-harness');
  assert.equal(await readFile(path.join(target, '.oh-my-harness/.operation-in-progress.json')).catch(() => null), null);
});

test('fresh unborn Git repository without an index installs while unrelated dirty content and Git metadata stay unchanged', async (t) => {
  const { target } = await targetFixture(t);
  git(target, ['init', '-q']);
  const head = (await readFile(path.join(target, '.git/HEAD'), 'utf8')).trim();
  assert.match(head, /^ref: refs\/heads\/[A-Za-z0-9][A-Za-z0-9._-]*$/);
  assert.equal(await readFile(path.join(target, '.git/index')).catch(() => null), null);
  assert.equal(await readFile(path.join(target, '.git', ...head.slice(5).split('/'))).catch(() => null), null);
  assert.equal(await readFile(path.join(target, '.git/packed-refs')).catch(() => null), null);
  await writeFile(path.join(target, 'unrelated-target-content.txt'), 'unrelated dirty content\n');
  const gitBefore = await treeSnapshot(path.join(target, '.git'));

  const planned = await createLifecyclePlan({ operation: 'install', target, release });
  assert.equal(planned.plan.status, 'READY');
  assert.equal(planned.plan.gitOverlap.status, 'clean');
  assert.deepEqual(planned.plan.gitOverlap.paths, []);
  await applyLifecyclePlan({ planned, target, release });

  assert.deepEqual(await treeSnapshot(path.join(target, '.git')), gitBefore);
  assert.equal((await readFile(path.join(target, 'unrelated-target-content.txt'))).toString(), 'unrelated dirty content\n');
  assert.equal((await readJson(target, STATE_PATH)).installedVersion, '0.1.0');
});

test('same-version install and update are byte-for-byte no-ops including state timestamps', async (t) => {
  const { target } = await targetFixture(t, 'target-owned\n');
  await apply('install', target);
  const beforeTree = await treeSnapshot(target);
  const beforeState = await readFile(path.join(target, ...STATE_PATH.split('/')));
  for (const operation of ['install', 'update']) {
    const planned = await createLifecyclePlan({ operation, target, release });
    assert.equal(planned.plan.status, 'NO_OP');
    assert.deepEqual(await treeSnapshot(target), beforeTree);
    assert.deepEqual(await readFile(path.join(target, ...STATE_PATH.split('/'))), beforeState);
  }
});

test('clean update enforces replace/remove/create asymmetry and rejects an unowned new collision', async (t) => {
  const changedPath = '.oh-my-harness/docs/architecture.md';
  const removedPath = '.oh-my-harness/docs/examples/minimal-router/README.md';
  const addedPath = '.oh-my-harness/docs/synthetic-new.md';
  const next = cloneRelease(release, {
    version: '0.2.0', replace: { [changedPath]: 'new architecture\n' },
    remove: [removedPath], add: { [addedPath]: 'new file\n' },
  });
  const first = await targetFixture(t);
  await apply('install', first.target);
  const plan = await createLifecyclePlan({ operation: 'update', target: first.target, release: next });
  assert.equal(plan.plan.status, 'READY');
  assert(plan.plan.replaces.includes(changedPath));
  assert(plan.plan.removes.includes(removedPath));
  assert(plan.plan.creates.includes(addedPath));
  await applyLifecyclePlan({ planned: plan, target: first.target, release: next });
  assert.equal((await readFile(path.join(first.target, ...changedPath.split('/')))).toString(), 'new architecture\n');
  assert.equal(await readFile(path.join(first.target, ...removedPath.split('/'))).catch(() => null), null);
  assert.equal((await readFile(path.join(first.target, ...addedPath.split('/')))).toString(), 'new file\n');

  const second = await targetFixture(t);
  await apply('install', second.target);
  await mkdir(path.dirname(path.join(second.target, ...addedPath.split('/'))), { recursive: true });
  await writeFile(path.join(second.target, ...addedPath.split('/')), 'target-owned collision\n');
  const collision = await createLifecyclePlan({ operation: 'update', target: second.target, release: next });
  assert.equal(collision.plan.status, 'CONFLICT');
  assert(collision.plan.conflicts.some((item) => item.code === 'UNOWNED_DESTINATION' && item.path === addedPath));
  assert.equal((await readJson(second.target, STATE_PATH)).installedVersion, '0.1.0');
});

test('modified managed content is disclosed, backed up before replacement, and missing historical backup is informational', async (t) => {
  const { target } = await targetFixture(t);
  await apply('install', target);
  const changedPath = '.oh-my-harness/docs/architecture.md';
  const modified = Buffer.from('private managed customization\n');
  await writeFile(path.join(target, ...changedPath.split('/')), modified);
  const next = cloneRelease(release, { version: '0.2.0', replace: { [changedPath]: 'released replacement\n' } });
  const planned = await createLifecyclePlan({ operation: 'update', target, release: next });
  assert.equal(planned.plan.status, 'READY');
  assert.deepEqual(planned.plan.modifiedManaged.map((item) => item.path), [changedPath]);
  assert.equal(planned.plan.backups.length, 1);
  const backupRelative = planned.plan.backups[0].backupPath;
  await applyLifecyclePlan({ planned, target, release: next });
  assert.deepEqual(await readFile(path.join(target, ...backupRelative.split('/'))), modified);
  const state = await readJson(target, STATE_PATH);
  assert(state.backups.some((item) => item.path === backupRelative));
  await unlink(path.join(target, ...backupRelative.split('/')));
  const noOp = await createLifecyclePlan({ operation: 'update', target, release: next });
  assert.equal(noOp.plan.status, 'NO_OP');
});

test('uninstall backs up drift, preserves outer bytes and backup residue, and deletes state last', async (t) => {
  const prefix = Buffer.from('prefix\r\n');
  const { target } = await targetFixture(t, prefix);
  await apply('install', target);
  const agentsPath = path.join(target, 'AGENTS.md');
  const installed = await readFile(agentsPath);
  const scan = scanManagedBlock(installed);
  const endOffset = scan.interval.indexOf('<!-- oh-my-harness:end -->');
  const driftedBlock = Buffer.concat([
    scan.interval.subarray(0, endOffset), Buffer.from('custom managed line\n'), scan.interval.subarray(endOffset),
  ]);
  const suffix = Buffer.from('\r\nouter-after-install\n');
  await writeFile(agentsPath, Buffer.concat([scan.prefix, driftedBlock, suffix]));
  const planned = await createLifecyclePlan({ operation: 'uninstall', target, release });
  assert.equal(planned.plan.status, 'READY');
  assert(planned.plan.modifiedManaged.some((item) => item.kind === 'managed-block'));
  const backup = planned.plan.backups.find((item) => item.sourcePath === 'AGENTS.md#managed-block');
  await applyLifecyclePlan({ planned, target, release });
  assert.deepEqual(await readFile(agentsPath), Buffer.concat([prefix, suffix]));
  assert.deepEqual(await readFile(path.join(target, ...backup.backupPath.split('/'))), driftedBlock);
  assert.equal(await readFile(path.join(target, ...STATE_PATH.split('/'))).catch(() => null), null);
  for (const relativePath of release.files.keys()) {
    assert.equal(await readFile(path.join(target, ...relativePath.split('/'))).catch(() => null), null);
  }
});

test('a pre-existing empty AGENTS.md remains target-owned after install and uninstall', async (t) => {
  const { target } = await targetFixture(t, Buffer.alloc(0));
  await apply('install', target);
  const state = await readJson(target, STATE_PATH);
  assert.equal(state.agentsMd.mode, 'managed-block');
  await apply('uninstall', target);
  assert.deepEqual(await readFile(path.join(target, 'AGENTS.md')), Buffer.alloc(0));
});

test('differing backup collision is a preflight conflict and an identical backup can be safely reused', async (t) => {
  const { target } = await targetFixture(t);
  await apply('install', target);
  const changedPath = '.oh-my-harness/docs/architecture.md';
  const drift = Buffer.from('drift requiring backup\n');
  await writeFile(path.join(target, ...changedPath.split('/')), drift);
  const next = cloneRelease(release, { version: '0.2.0', replace: { [changedPath]: 'released\n' } });
  const firstPlan = await createLifecyclePlan({ operation: 'update', target, release: next });
  const backupPath = firstPlan.plan.backups[0].backupPath;
  await mkdir(path.dirname(path.join(target, ...backupPath.split('/'))), { recursive: true });
  await writeFile(path.join(target, ...backupPath.split('/')), 'different collision\n');
  const conflict = await createLifecyclePlan({ operation: 'update', target, release: next });
  assert.equal(conflict.plan.status, 'CONFLICT');
  assert(conflict.plan.conflicts.some((item) => item.code === 'UNOWNED_DESTINATION' && item.path === backupPath));
  await writeFile(path.join(target, ...backupPath.split('/')), drift);
  const reusable = await createLifecyclePlan({ operation: 'update', target, release: next });
  assert.equal(reusable.plan.status, 'READY');
  await applyLifecyclePlan({ planned: reusable, target, release: next });
  assert.deepEqual(await readFile(path.join(target, ...backupPath.split('/'))), drift);
});

test('backup is verified before a destructive update write begins', async (t) => {
  const { target } = await targetFixture(t);
  await apply('install', target);
  const changedPath = '.oh-my-harness/docs/architecture.md';
  const drift = Buffer.from('drift before failed replacement\n');
  await writeFile(path.join(target, ...changedPath.split('/')), drift);
  const next = cloneRelease(release, { version: '0.2.0', replace: { [changedPath]: 'released\n' } });
  const planned = await createLifecyclePlan({ operation: 'update', target, release: next });
  await assert.rejects(applyLifecyclePlan({ planned, target, release: next, faults: ['payload-write'] }));
  assert.deepEqual(await readFile(path.join(target, ...planned.plan.backups[0].backupPath.split('/'))), drift);
  assert.deepEqual(await readFile(path.join(target, ...changedPath.split('/'))), drift);
});

test('sentinel publication faults precede every payload mutation and leave exact incomplete evidence', async (t) => {
  for (const fault of ['sentinel-parent', 'sentinel-temp-write', 'sentinel-link', 'sentinel-verify', 'sentinel-temp-cleanup']) {
    await t.test(fault, async (subtest) => {
      const { target } = await targetFixture(subtest);
      const planned = await createLifecyclePlan({ operation: 'install', target, release });
      await assert.rejects(applyLifecyclePlan({ planned, target, release, faults: [fault] }));
      assert.equal(await readFile(path.join(target, ...AGENT_PATH.split('/'))).catch(() => null), null);
      assert.equal(await readFile(path.join(target, ...STATE_PATH.split('/'))).catch(() => null), null);
      const next = await createLifecyclePlan({ operation: 'install', target, release });
      assert.equal(next.plan.status, 'INCOMPLETE_OR_UNOWNED');
    });
  }
});

const AGENT_PATH = '.codex/agents/oh-my-harness-planner.toml';

test('payload/state/sentinel faults withhold fresh success state and next invocation stops without repair', async (t) => {
  for (const fault of ['payload-write', 'payload-verify', 'state-write', 'state-verify', 'sentinel-delete']) {
    await t.test(fault, async (subtest) => {
      const { target } = await targetFixture(subtest);
      const planned = await createLifecyclePlan({ operation: 'install', target, release });
      await assert.rejects(applyLifecyclePlan({ planned, target, release, faults: [fault] }));
      assert.equal(await readFile(path.join(target, ...STATE_PATH.split('/'))).catch(() => null), null);
      const sentinel = await readFile(path.join(target, '.oh-my-harness/.operation-in-progress.json')).catch(() => null);
      assert(sentinel, 'truthful sentinel must remain');
      const before = await treeSnapshot(target);
      const next = await createLifecyclePlan({ operation: 'install', target, release });
      assert.equal(next.plan.status, 'INCOMPLETE_OR_UNOWNED');
      assert.deepEqual(await treeSnapshot(target), before);
    });
  }
});

test('post-rename and post-unlink verification failures report completed mutations truthfully', async (t) => {
  await t.test('post-rename', async (subtest) => {
    const { target } = await targetFixture(subtest);
    const planned = await createLifecyclePlan({ operation: 'install', target, release });
    const changedPath = planned.plan.creates.find((item) => item !== 'AGENTS.md');
    let renamed = false;
    let injected = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (event.operation === 'rename' && event.path === changedPath) renamed = true;
      else if (renamed && !injected && event.operation === 'open-read' && event.path === changedPath) {
        injected = true;
        throw new Error('injected post-rename verification read failure');
      }
    });
    let failure;
    try {
      await applyLifecyclePlan({ planned, target, release });
    } catch (error) {
      failure = error;
    } finally {
      restore();
    }
    assert(failure);
    assert.equal(injected, true);
    assert(failure.report.changed.includes(changedPath));
    assert(!failure.report.unchanged.includes(changedPath));
    assert.equal(failure.report.sentinel, 'present');
    assert.equal(failure.report.state, 'absent');
    assert.deepEqual(await readFile(path.join(target, ...changedPath.split('/'))), release.files.get(changedPath));
  });

  await t.test('post-unlink', async (subtest) => {
    const { target } = await targetFixture(subtest);
    await apply('install', target);
    const removedPath = '.oh-my-harness/docs/examples/minimal-router/README.md';
    const next = cloneRelease(release, { version: '0.2.0', remove: [removedPath] });
    const planned = await createLifecyclePlan({ operation: 'update', target, release: next });
    let unlinked = false;
    let injected = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (event.operation === 'unlink' && event.path === removedPath) unlinked = true;
      else if (unlinked && !injected && event.operation === 'lstat' && event.path === removedPath) {
        injected = true;
        throw new Error('injected post-unlink verification failure');
      }
    });
    let failure;
    try {
      await applyLifecyclePlan({ planned, target, release: next });
    } catch (error) {
      failure = error;
    } finally {
      restore();
    }
    assert(failure);
    assert.equal(injected, true);
    assert(failure.report.changed.includes(removedPath));
    assert(!failure.report.unchanged.includes(removedPath));
    assert.equal(failure.report.sentinel, 'present');
    assert.equal(failure.report.state, 'prior-preserved');
    assert.equal(await readFile(path.join(target, ...removedPath.split('/'))).catch(() => null), null);
  });
});

test('update restores exact prior state on final sentinel failure; uninstall state-delete failure keeps prior state', async (t) => {
  const updateFixture = await targetFixture(t);
  await apply('install', updateFixture.target);
  const oldState = await readFile(path.join(updateFixture.target, ...STATE_PATH.split('/')));
  const next = cloneRelease(release, { version: '0.2.0', replace: { '.oh-my-harness/docs/architecture.md': 'changed\n' } });
  const updatePlan = await createLifecyclePlan({ operation: 'update', target: updateFixture.target, release: next });
  await assert.rejects(applyLifecyclePlan({ planned: updatePlan, target: updateFixture.target, release: next, faults: ['sentinel-delete'] }));
  assert.deepEqual(await readFile(path.join(updateFixture.target, ...STATE_PATH.split('/'))), oldState);

  const uninstallFixture = await targetFixture(t);
  await apply('install', uninstallFixture.target);
  const uninstallState = await readFile(path.join(uninstallFixture.target, ...STATE_PATH.split('/')));
  const uninstallPlan = await createLifecyclePlan({ operation: 'uninstall', target: uninstallFixture.target, release });
  await assert.rejects(applyLifecyclePlan({ planned: uninstallPlan, target: uninstallFixture.target, release, faults: ['state-delete'] }));
  assert.deepEqual(await readFile(path.join(uninstallFixture.target, ...STATE_PATH.split('/'))), uninstallState);
  const nextUninstall = await createLifecyclePlan({ operation: 'uninstall', target: uninstallFixture.target, release });
  assert.equal(nextUninstall.plan.status, 'INCOMPLETE_OR_UNOWNED');
});

test('state restoration failure remains a hard failure with truthful sentinel evidence', async (t) => {
  const { target } = await targetFixture(t);
  await apply('install', target);
  const next = cloneRelease(release, { version: '0.2.0', replace: { '.oh-my-harness/docs/architecture.md': 'changed\n' } });
  const planned = await createLifecyclePlan({ operation: 'update', target, release: next });
  await assert.rejects(applyLifecyclePlan({
    planned, target, release: next, faults: ['sentinel-absence-verify', 'state-restore'],
  }), /state preservation failed/);
  assert(await readFile(path.join(target, '.oh-my-harness/.operation-in-progress.json')));
  const nextPlan = await createLifecyclePlan({ operation: 'update', target, release: next });
  assert.equal(nextPlan.plan.status, 'INCOMPLETE_OR_UNOWNED');
});
