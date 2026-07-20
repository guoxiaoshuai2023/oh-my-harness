import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdir, mkdtemp, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { applyLifecyclePlan, createLifecyclePlan } from '../../src/installer/lifecycle.mjs';
import { canonicalBytes, setFilesystemObserverForTests, sha256 } from '../../src/installer/filesystem.mjs';
import { preparePackage, loadReleaseBundle } from '../../src/installer/package-bundle.mjs';
import { scanManagedBlock } from '../../src/installer/markers.mjs';
import {
  AGENT_PATHS, PRIOR_INVENTORY_CLASS, PRIOR_OBSOLETE_PATH, STATE_PATH,
} from '../../src/installer/state.mjs';
import {
  assertProtectedUnchanged, authenticPriorFixture, exactManagedSnapshot,
} from '../support/t05-migration-fixtures.mjs';
import { cloneRelease, readJson, treeSnapshot } from './test-helpers.mjs';

let packageRoot;
let release;

before(async () => {
  packageRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t05-release-'));
  await preparePackage({ packRoot: packageRoot, sourceRoot: path.resolve('.'), version: '0.1.0' });
  release = await loadReleaseBundle({ packageRoot, packageVersion: '0.1.0' });
});

after(async () => rm(packageRoot, { recursive: true, force: true }));

async function applyReady(operation, target, selectedRelease = release, faults = []) {
  const planned = await createLifecyclePlan({ operation, target, release: selectedRelease });
  assert.equal(planned.plan.status, 'READY');
  return applyLifecyclePlan({ planned, target, release: selectedRelease, faults });
}

test('authentic old-object six/42 installation previews and migrates to exact nine/49 without a parallel legacy runtime', async (t) => {
  const fixture = await authenticPriorFixture(t);
  const beforePreview = await treeSnapshot(fixture.target);
  const plan = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
  assert.equal(plan.plan.status, 'READY');
  assert.equal(plan.plan.installedClass, PRIOR_INVENTORY_CLASS);
  assert.equal(plan.plan.creates.length, 8);
  assert.deepEqual(plan.plan.removes, [PRIOR_OBSOLETE_PATH]);
  assert(plan.plan.replaces.length > 0);
  assert(plan.plan.backups.some((item) => item.sourcePath === STATE_PATH));
  assert(plan.plan.backups.some((item) => item.sourcePath === PRIOR_OBSOLETE_PATH));
  assert.equal(plan.plan.recoveryAction, 'none');
  assert.deepEqual(await treeSnapshot(fixture.target), beforePreview, 'preview must be a zero-write observation');

  for (const forbiddenOperation of ['install', 'uninstall']) {
    const forbidden = await createLifecyclePlan({ operation: forbiddenOperation, target: fixture.target, release });
    assert.equal(forbidden.plan.status, 'CONFLICT');
    assert(forbidden.plan.conflicts.some((item) => item.code === 'INCOMPATIBLE_INSTALLATION'));
  }

  const result = await applyLifecyclePlan({ planned: plan, target: fixture.target, release });
  assert.equal(result.report.success, true);
  const state = await readJson(fixture.target, STATE_PATH);
  assert.deepEqual(state.agents.map((item) => item.path), AGENT_PATHS);
  assert.equal(state.ownedFiles.length, release.files.size);
  assert.equal(await readFile(path.join(fixture.target, ...PRIOR_OBSOLETE_PATH.split('/'))).catch(() => null), null);
  for (const [relativePath, bytes] of release.files) {
    assert.deepEqual(await readFile(path.join(fixture.target, ...relativePath.split('/'))), bytes);
  }
  const activeText = Buffer.concat([...release.files.values()]).toString('utf8');
  assert(!activeText.includes('task-contract-template.md'));
  assert(!activeText.includes('full-v2'));
  assert(!activeText.includes('legacy selector'));
  assert.equal((await readFile(path.join(fixture.target, 'task-docs/history/synthetic-old-run/ACCEPTED_CONTRACT.md'), 'utf8')),
    'synthetic historical contract bytes\n');
  await assertProtectedUnchanged(fixture);

  const noOpBefore = await exactManagedSnapshot(fixture.target, release);
  const noOp = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
  assert.equal(noOp.plan.status, 'NO_OP');
  assert.deepEqual(await exactManagedSnapshot(fixture.target, release), noOpBefore);

  await applyReady('uninstall', fixture.target);
  assert.equal(await readFile(path.join(fixture.target, ...STATE_PATH.split('/'))).catch(() => null), null);
  for (const relativePath of release.files.keys()) {
    assert.equal(await readFile(path.join(fixture.target, ...relativePath.split('/'))).catch(() => null), null);
  }
  const agentsBytes = await readFile(path.join(fixture.target, 'AGENTS.md'));
  const agents = scanManagedBlock(agentsBytes);
  assert.equal(agents.status, 'absent');
  assert.deepEqual(agentsBytes, fixture.outerPrefix);
  await assertProtectedUnchanged(fixture);
});

test('ownership-first migration stops drift, missing ownership, marker drift, and unowned target collisions before mutation', async (t) => {
  await t.test('owned payload drift', async (subtest) => {
    const fixture = await authenticPriorFixture(subtest, { protectedContent: false });
    const driftPath = '.oh-my-harness/docs/architecture.md';
    await writeFile(path.join(fixture.target, ...driftPath.split('/')), 'third-party drift\n');
    const before = await treeSnapshot(fixture.target);
    const plan = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(plan.plan.status, 'CONFLICT');
    assert(plan.plan.conflicts.some((item) => item.code === 'OWNED_DRIFT' && item.path === driftPath));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });

  await t.test('missing prior-owned payload', async (subtest) => {
    const fixture = await authenticPriorFixture(subtest, { protectedContent: false });
    const missingPath = PRIOR_OBSOLETE_PATH;
    await unlink(path.join(fixture.target, ...missingPath.split('/')));
    const before = await treeSnapshot(fixture.target);
    const plan = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(plan.plan.status, 'INCOMPLETE_OR_UNOWNED');
    assert(plan.plan.conflicts.some((item) => item.code === 'MISSING_OWNED_SURFACE' && item.path === missingPath));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });

  await t.test('managed block drift', async (subtest) => {
    const fixture = await authenticPriorFixture(subtest, { protectedContent: false });
    const agentsPath = path.join(fixture.target, 'AGENTS.md');
    const agents = await readFile(agentsPath);
    const scan = scanManagedBlock(agents);
    const drift = Buffer.concat([scan.interval.subarray(0, scan.interval.length - 1), Buffer.from('third byte\n')]);
    await writeFile(agentsPath, Buffer.concat([scan.prefix, drift, scan.suffix]));
    const before = await treeSnapshot(fixture.target);
    const plan = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(plan.plan.status, 'CONFLICT');
    assert(plan.plan.conflicts.some((item) => item.code === 'OWNED_DRIFT' && item.path === 'AGENTS.md'));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });

  await t.test('unowned new-profile collision even with target bytes', async (subtest) => {
    const fixture = await authenticPriorFixture(subtest, { protectedContent: false });
    const addedPath = '.codex/agents/oh-my-harness-requirements-author.toml';
    await mkdir(path.dirname(path.join(fixture.target, ...addedPath.split('/'))), { recursive: true });
    await writeFile(path.join(fixture.target, ...addedPath.split('/')), release.files.get(addedPath));
    const before = await treeSnapshot(fixture.target);
    const plan = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(plan.plan.status, 'CONFLICT');
    assert(plan.plan.conflicts.some((item) => item.code === 'UNOWNED_DESTINATION' && item.path === addedPath));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });
});

test('migration writes sentinel and verifies every rollback backup before payload, then publishes state and deletes sentinel last', async (t) => {
  const fixture = await authenticPriorFixture(t, { protectedContent: false });
  const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
  const events = [];
  const restore = setFilesystemObserverForTests((event) => events.push(event));
  try {
    await applyLifecyclePlan({ planned, target: fixture.target, release });
  } finally {
    restore();
  }
  const sentinelPublished = events.findIndex((event) => event.operation === 'link'
    && event.path === '.oh-my-harness/.operation-in-progress.json');
  const backupWrites = events.map((event, index) => ({ event, index })).filter(({ event }) => (
    event.operation === 'open-write-exclusive' && event.path.startsWith('.oh-my-harness-backups/')
  ));
  const firstPayload = events.findIndex((event) => event.operation === 'open-write-temp'
    && !event.path.includes('.install-state'));
  const statePublished = events.findIndex((event) => event.operation === 'rename' && event.path === STATE_PATH);
  const sentinelDeleted = events.findIndex((event) => event.operation === 'unlink'
    && event.path === '.oh-my-harness/.operation-in-progress.json');
  assert(sentinelPublished >= 0);
  assert.equal(backupWrites.length, planned.plan.backups.length);
  assert(backupWrites.every(({ index }) => index > sentinelPublished && index < firstPayload));
  assert(firstPayload > sentinelPublished);
  assert(statePublished > firstPayload);
  assert(sentinelDeleted > statePublished);
});

test('same-process migration failure restores exact prior ownership and reports failure without target success', async (t) => {
  const fixture = await authenticPriorFixture(t);
  const priorStateSha = sha256(fixture.priorStateBytes);
  const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
  const failingPath = planned.plan.replaces[Math.min(2, planned.plan.replaces.length - 1)];
  let failure;
  try {
    await applyLifecyclePlan({ planned, target: fixture.target, release, faults: [`payload-write:${failingPath}`] });
  } catch (error) {
    failure = error;
  }
  assert(failure);
  assert.equal(failure.report.success, false);
  assert.equal(failure.report.updateApplied, false);
  assert.equal(failure.report.recoveryOutcome, 'prior-restored');
  assert.equal(sha256(await readFile(path.join(fixture.target, ...STATE_PATH.split('/')))), priorStateSha);
  assert.equal(await readFile(path.join(fixture.target, '.oh-my-harness/.operation-in-progress.json')).catch(() => null), null);
  assert.equal((await createLifecyclePlan({ operation: 'update', target: fixture.target, release })).plan.status, 'READY');
  await assertProtectedUnchanged(fixture);
});

test('restart recovery restores prior or finalizes target only for the exact operation and release', async (t) => {
  await t.test('partial transition restores prior and requires a fresh later update', async (subtest) => {
    const fixture = await authenticPriorFixture(subtest, { protectedContent: false });
    const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    const failingPath = planned.plan.replaces[Math.min(2, planned.plan.replaces.length - 1)];
    await assert.rejects(applyLifecyclePlan({
      planned, target: fixture.target, release, faults: [`payload-write:${failingPath}`, 'rollback-start'],
    }));
    const recovery = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(recovery.plan.status, 'READY');
    assert.equal(recovery.plan.recoveryAction, 'restore-prior');
    const recovered = await applyLifecyclePlan({ planned: recovery, target: fixture.target, release });
    assert.equal(recovered.report.recoveryOutcome, 'prior-restored');
    assert.equal(recovered.report.updateApplied, false);
    const fresh = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(fresh.plan.status, 'READY');
    assert.equal(fresh.plan.recoveryAction, 'none');
  });

  await t.test('fully published target with retained sentinel finalizes target', async (subtest) => {
    const fixture = await authenticPriorFixture(subtest, { protectedContent: false });
    const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    await assert.rejects(applyLifecyclePlan({
      planned, target: fixture.target, release, faults: ['sentinel-delete', 'rollback-start'],
    }));
    const recovery = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(recovery.plan.status, 'READY');
    assert.equal(recovery.plan.recoveryAction, 'finalize-target');
    const recovered = await applyLifecyclePlan({ planned: recovery, target: fixture.target, release });
    assert.equal(recovered.report.recoveryOutcome, 'target-finalized');
    assert.equal(recovered.report.updateApplied, true);
    assert.equal((await createLifecyclePlan({ operation: 'update', target: fixture.target, release })).plan.status, 'NO_OP');
  });
});

test('restart recovery stops on stale release, missing backup, third bytes, and wrong operation without mutation', async (t) => {
  async function interrupted(subtest, { protectedContent = false } = {}) {
    const fixture = await authenticPriorFixture(subtest, { protectedContent });
    const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    const failingPath = planned.plan.replaces[Math.min(2, planned.plan.replaces.length - 1)];
    await assert.rejects(applyLifecyclePlan({
      planned, target: fixture.target, release, faults: [`payload-write:${failingPath}`, 'rollback-start'],
    }));
    return { fixture, planned };
  }

  await t.test('missing backup', async (subtest) => {
    const { fixture, planned } = await interrupted(subtest);
    await unlink(path.join(fixture.target, ...planned.plan.backups[0].backupPath.split('/')));
    const before = await treeSnapshot(fixture.target);
    const recovery = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(recovery.plan.status, 'CONFLICT');
    assert(recovery.plan.conflicts.some((item) => item.code === 'RECOVERY_AMBIGUOUS'));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });

  await t.test('stale requested release and wrong operation', async (subtest) => {
    const { fixture } = await interrupted(subtest);
    const stale = cloneRelease(release, { version: '0.2.0' });
    const before = await treeSnapshot(fixture.target);
    const stalePlan = await createLifecyclePlan({ operation: 'update', target: fixture.target, release: stale });
    assert.equal(stalePlan.plan.status, 'CONFLICT');
    assert(stalePlan.plan.conflicts.some((item) => item.code === 'RECOVERY_IDENTITY_MISMATCH'));
    const wrong = await createLifecyclePlan({ operation: 'uninstall', target: fixture.target, release });
    assert.equal(wrong.plan.status, 'CONFLICT');
    assert(wrong.plan.conflicts.some((item) => item.code === 'RECOVERY_REQUIRED'));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });

  await t.test('canonical stale original-plan digest', async (subtest) => {
    const { fixture } = await interrupted(subtest, { protectedContent: true });
    const sentinelPath = path.join(fixture.target, '.oh-my-harness/.operation-in-progress.json');
    const authenticBefore = await treeSnapshot(fixture.target);
    const authenticRecovery = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(authenticRecovery.plan.status, 'READY');
    assert.equal(authenticRecovery.plan.recoveryAction, 'restore-prior');
    assert.deepEqual(await treeSnapshot(fixture.target), authenticBefore);
    const sentinel = JSON.parse(await readFile(sentinelPath, 'utf8'));
    const stalePlanSha256 = sentinel.planSha256 === '0'.repeat(64) ? '1'.repeat(64) : '0'.repeat(64);
    await writeFile(sentinelPath, canonicalBytes({ ...sentinel, planSha256: stalePlanSha256 }));
    const before = await treeSnapshot(fixture.target);
    const recovery = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(recovery.plan.status, 'CONFLICT');
    assert.equal(recovery.plan.recoveryAction, 'none');
    assert(recovery.plan.conflicts.some((item) => item.code === 'RECOVERY_IDENTITY_MISMATCH'
      && item.path === '.oh-my-harness/.operation-in-progress.json'));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });

  await t.test('third-state payload', async (subtest) => {
    const { fixture, planned } = await interrupted(subtest);
    const touched = planned.plan.replaces[0];
    await writeFile(path.join(fixture.target, ...touched.split('/')), 'third state after interruption\n');
    const before = await treeSnapshot(fixture.target);
    const recovery = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(recovery.plan.status, 'CONFLICT');
    assert(recovery.plan.conflicts.some((item) => item.code === 'RECOVERY_AMBIGUOUS'));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  });
});

test('current target update and uninstall also stop owned drift instead of treating a backup as overwrite authority', async (t) => {
  const fixture = await authenticPriorFixture(t, { protectedContent: false });
  await applyReady('update', fixture.target);
  const driftPath = '.oh-my-harness/docs/architecture.md';
  await writeFile(path.join(fixture.target, ...driftPath.split('/')), 'current target drift\n');
  for (const operation of ['update', 'uninstall']) {
    const before = await treeSnapshot(fixture.target);
    const plan = await createLifecyclePlan({ operation, target: fixture.target, release });
    assert.equal(plan.plan.status, 'CONFLICT');
    assert(plan.plan.conflicts.some((item) => item.code === 'OWNED_DRIFT' && item.path === driftPath));
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  }
});
