import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import {
  lstat, mkdir, mkdtemp, readFile, rm, symlink, unlink, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { after, before, test } from 'node:test';
import { parseArguments } from '../../src/installer/cli.mjs';
import { setFilesystemObserverForTests } from '../../src/installer/filesystem.mjs';
import {
  applyLifecyclePlan, createLifecyclePlan, runLifecycle,
} from '../../src/installer/lifecycle.mjs';
import { scanManagedBlock } from '../../src/installer/markers.mjs';
import { loadReleaseBundle, preparePackage } from '../../src/installer/package-bundle.mjs';
import { STATE_PATH } from '../../src/installer/state.mjs';
import {
  applyReady, cloneRelease, initializeGit, largeAgentsBytes, readJson,
  targetFixture, treeSnapshot, verifyInstalledResult,
} from '../support/task4-fixtures.mjs';
import { ROOT } from '../lifecycle/test-helpers.mjs';
import { SCENARIO_MATRIX } from './scenario-matrix.mjs';

let packageRoot;
let release;

before(async () => {
  packageRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-task4-acceptance-release-'));
  await preparePackage({ packRoot: packageRoot, sourceRoot: ROOT, version: '0.1.0' });
  release = await loadReleaseBundle({ packageRoot, packageVersion: '0.1.0' });
});

after(async () => rm(packageRoot, { recursive: true, force: true }));

test('T4-AC2 matrix completely and discriminatingly maps AS-01 through AS-12', () => {
  assert.deepEqual(SCENARIO_MATRIX.map(({ id }) => id), Array.from({ length: 12 }, (_, index) => `AS-${String(index + 1).padStart(2, '0')}`));
  assert.equal(new Set(SCENARIO_MATRIX.flatMap(({ acs }) => acs)).has('T4-AC2'), true);
  for (const row of SCENARIO_MATRIX) {
    assert(row.acs.length > 0, row.id);
    for (const field of ['setup', 'expectedDecision', 'primaryEvidence', 'failureSignals']) {
      assert(row[field].length >= 40, `${row.id} ${field}`);
    }
  }
  const matrixText = JSON.stringify(SCENARIO_MATRIX);
  for (const required of [
    'OWNED_DRIFT', 'before mutation', 'restore-prior', 'finalize-target',
    'unmanaged namespace', 'unowned prefixed profile', 'exact dirty overlap', 'update-new-path collision',
    'Missing-half', 'duplicate', 'nested', 'reversed', 'damaged', 'lookalike',
    'Empty, absolute, NUL, traversal, symlink-parent', 'FIFO parent', 'force bypass',
  ]) assert(matrixText.includes(required), required);
});

test('AS-01 empty repository installs the complete current nine-profile scoped release', async (t) => {
  const { parent, target } = await targetFixture(t);
  const xdg = path.join(parent, 'xdg');
  await mkdir(xdg);
  const gitEnvironment = {
    PATH: process.env.PATH,
    HOME: parent,
    XDG_CONFIG_HOME: xdg,
    GIT_CONFIG_NOSYSTEM: '1',
    GIT_CONFIG_GLOBAL: '/dev/null',
    GIT_CONFIG_SYSTEM: '/dev/null',
    GIT_OPTIONAL_LOCKS: '0',
    LC_ALL: 'C',
  };
  const git = (args) => spawnSync('git', args, {
    cwd: target, env: gitEnvironment, encoding: 'utf8',
  });
  const initialized = git(['init', '-q']);
  assert.equal(initialized.status, 0, initialized.stderr);
  const symbolicHead = git(['symbolic-ref', '-q', 'HEAD']);
  assert.equal(symbolicHead.status, 0, symbolicHead.stderr);
  const headRef = symbolicHead.stdout.trim();
  assert.match(headRef, /^refs\/heads\/[^/]+$/);
  assert.notEqual(git(['rev-parse', '--verify', 'HEAD']).status, 0);
  assert.equal(await readFile(path.join(target, '.git/index')).catch(() => null), null);
  assert.equal(await readFile(path.join(target, '.git', ...headRef.split('/'))).catch(() => null), null);
  const tracked = git(['ls-files', '-z']);
  assert.equal(tracked.status, 0, tracked.stderr);
  assert.equal(tracked.stdout.length, 0);
  const gitBefore = await treeSnapshot(path.join(target, '.git'));

  const planned = await createLifecyclePlan({ operation: 'install', target, release });
  assert.equal(planned.plan.status, 'READY');
  assert.equal(planned.plan.gitOverlap.status, 'clean');
  assert.deepEqual(planned.plan.gitOverlap.paths, []);
  assert.equal(planned.plan.creates.length, release.files.size + 1);
  const result = await applyLifecyclePlan({ planned, target, release });
  assert.equal(result.report.success, true);
  assert.deepEqual(await treeSnapshot(path.join(target, '.git')), gitBefore);
  for (const [relativePath, expected] of release.files) {
    assert.deepEqual(await readFile(path.join(target, ...relativePath.split('/'))), expected, relativePath);
  }
  const agents = await readFile(path.join(target, 'AGENTS.md'));
  const scan = scanManagedBlock(agents);
  assert.equal(scan.status, 'owned-pair');
  assert.deepEqual(scan.interval, release.managedBlock);
  assert.equal(release.inventory.requiredFiles.length, 49);
  assert.equal(release.files.size, 51);
  assert.equal(release.inventory.ownership.agentPaths.length, 9);
  assert.equal(release.inventory.requiredFiles.filter(({ kind }) => kind === 'template').length, 17);
  assert.equal(release.inventory.requiredFiles.some(({ assetId }) => assetId === 'template/task-contract'), false);
  const state = await readJson(target, STATE_PATH);
  assert.equal(state.verification.status, 'verified');
  assert.equal(state.installer.packageName, '@guoxiaoshuai2023/oh-my-harness');
  assert.equal(state.installer.binaryName, 'oh-my-harness');
  assert.equal(await readFile(path.join(target, '.oh-my-harness/.operation-in-progress.json')).catch(() => null), null);
});

test('AS-02 large existing AGENTS.md retains byte-identical outer content and one managed block', async (t) => {
  const outer = largeAgentsBytes();
  const { target } = await targetFixture(t, outer);
  await applyReady('install', target, release);
  const installed = await readFile(path.join(target, 'AGENTS.md'));
  const scan = scanManagedBlock(installed);
  assert.equal(scan.status, 'owned-pair');
  assert.deepEqual(scan.prefix, outer);
  assert.equal(scan.suffix.length, 0);
  assert.equal(installed.toString('utf8').split('<!-- oh-my-harness:start -->').length - 1, 1);
  assert.equal(installed.toString('utf8').split('<!-- oh-my-harness:end -->').length - 1, 1);
});

test('AS-03 existing ecosystem remains untouched with exact write confinement', async (t) => {
  const outer = Buffer.from('target authority\n');
  const { target } = await targetFixture(t, outer);
  const owned = {
    '.codex/agents/target-owned.toml': 'target agent\n',
    '.codex/skills/custom/SKILL.md': 'target skill\n',
    '.plugins/custom/plugin.json': '{"target":true}\n',
    'scripts/target-owned.sh': '#!/bin/sh\nexit 0\n',
    '.github/workflows/target.yml': 'name: target\n',
    'opaque-adjacent.txt': 'do not inspect\n',
  };
  for (const [relativePath, content] of Object.entries(owned)) {
    const absolute = path.join(target, ...relativePath.split('/'));
    await mkdir(path.dirname(absolute), { recursive: true });
    await writeFile(absolute, content);
  }
  const ownedPaths = Object.keys(owned);
  const events = [];
  const restore = setFilesystemObserverForTests((event) => events.push(event));
  let result;
  try {
    result = await applyReady('install', target, release);
  } finally {
    restore();
  }
  const lifecyclePaths = new Set([
    ...release.files.keys(), 'AGENTS.md', STATE_PATH, '.oh-my-harness/.operation-in-progress.json',
  ]);
  const allowedEventPaths = new Set(['.git']);
  const addPathAndParents = (relativePath) => {
    for (let current = relativePath; current !== '.'; current = path.posix.dirname(current)) {
      allowedEventPaths.add(current);
    }
  };
  for (const relativePath of [
    '.oh-my-harness/.operation-in-progress.tmp', '.oh-my-harness/.install-state.tmp',
  ]) addPathAndParents(relativePath);
  for (const relativePath of lifecyclePaths) {
    addPathAndParents(relativePath);
    addPathAndParents(path.posix.join(
      path.posix.dirname(relativePath), `.${path.posix.basename(relativePath)}.oh-my-harness-tmp`,
    ));
  }
  assert(events.length > 0);
  assert.deepEqual(events.filter(({ path: eventPath }) => !allowedEventPaths.has(eventPath)), []);
  assert(!events.some(({ path: eventPath }) => ownedPaths.includes(eventPath)));

  const expectedChanged = [...release.files.keys(), 'AGENTS.md', STATE_PATH].sort();
  assert.deepEqual([...result.report.changed].sort(), expectedChanged);
  const installedAgents = scanManagedBlock(await readFile(path.join(target, 'AGENTS.md')));
  assert.equal(installedAgents.status, 'owned-pair');
  assert.deepEqual(installedAgents.prefix, outer);
  assert.equal(installedAgents.suffix.length, 0);
});

test('AS-04 same-version install and update are exact no-ops including timestamps', async (t) => {
  const { target } = await targetFixture(t, 'target-owned\n');
  await applyReady('install', target, release);
  const beforeTree = await treeSnapshot(target);
  const beforeState = await readFile(path.join(target, ...STATE_PATH.split('/')));
  for (const operation of ['install', 'update']) {
    const planned = await createLifecyclePlan({ operation, target, release });
    assert.equal(planned.plan.status, 'NO_OP');
    assert.deepEqual(await treeSnapshot(target), beforeTree);
    assert.deepEqual(await readFile(path.join(target, ...STATE_PATH.split('/'))), beforeState);
  }
});

test('AS-05 clean update replaces, removes, and creates exactly the planned paths', async (t) => {
  const changedPath = '.oh-my-harness/bundle-inventory.json';
  const removedPath = '.oh-my-harness/docs/examples/minimal-router/README.md';
  const addedPath = '.oh-my-harness/docs/task4-new-required.md';
  const next = cloneRelease(release, {
    version: '0.2.0', remove: [removedPath], add: { [addedPath]: 'task4 new required\n' },
  });
  const { target } = await targetFixture(t, 'outer\n');
  await applyReady('install', target, release);
  const planned = await createLifecyclePlan({ operation: 'update', target, release: next });
  assert.equal(planned.plan.status, 'READY');
  assert.deepEqual(planned.plan.replaces, [changedPath]);
  assert.deepEqual(planned.plan.removes, [removedPath]);
  assert.deepEqual(planned.plan.creates, [addedPath]);
  const result = await applyLifecyclePlan({ planned, target, release: next });
  assert(result.report.changed.includes(changedPath));
  assert(result.report.changed.includes(removedPath));
  assert(result.report.changed.includes(addedPath));
  assert.deepEqual(await readFile(path.join(target, ...changedPath.split('/'))), next.inventoryBytes);
  assert.equal(await readFile(path.join(target, ...removedPath.split('/'))).catch(() => null), null);
  assert.equal((await readFile(path.join(target, ...addedPath.split('/')))).toString(), 'task4 new required\n');
  assert.equal((await readJson(target, STATE_PATH)).installedVersion, '0.2.0');
  assert.equal(scanManagedBlock(await readFile(path.join(target, 'AGENTS.md'))).status, 'owned-pair');
});

test('AS-06 modified managed bytes stop update before backup or mutation even when confirmed', async (t) => {
  const { target } = await targetFixture(t);
  await applyReady('install', target, release);
  const changedPath = '.oh-my-harness/docs/architecture.md';
  const modified = Buffer.from('target-owned modified managed bytes\n');
  await writeFile(path.join(target, ...changedPath.split('/')), modified);
  const next = cloneRelease(release, { version: '0.2.0', replace: { [changedPath]: 'clean release replacement\n' } });

  const before = await treeSnapshot(target);
  for (const confirmed of [false, true]) {
    const stopped = await runLifecycle({ operation: 'update', target, release: next, confirmed });
    assert.equal(stopped.exitCode, 4);
    assert.equal(stopped.planned.plan.status, 'CONFLICT');
    assert.deepEqual(stopped.planned.plan.modifiedManaged.map(({ path: itemPath }) => itemPath), [changedPath]);
    assert(stopped.planned.plan.conflicts.some(({ code, path: itemPath }) => (
      code === 'OWNED_DRIFT' && itemPath === changedPath
    )));
    assert.deepEqual(stopped.planned.plan.backups, []);
    assert.deepEqual(await treeSnapshot(target), before);
  }
});

test('AS-07 every install/update ownership collision stops with zero writes', async (t) => {
  await t.test('unmanaged namespace', async (subtest) => {
    const { target } = await targetFixture(subtest);
    await mkdir(path.join(target, '.oh-my-harness'));
    await writeFile(path.join(target, '.oh-my-harness/target.txt'), 'target-owned\n');
    const before = await treeSnapshot(target);
    const planned = await createLifecyclePlan({ operation: 'install', target, release });
    assert.equal(planned.plan.status, 'INCOMPLETE_OR_UNOWNED');
    assert(planned.plan.conflicts.some(({ code, path: itemPath }) => code === 'UNMANAGED_NAMESPACE' && itemPath === '.oh-my-harness'));
    assert.deepEqual(await treeSnapshot(target), before);
  });

  await t.test('unowned prefixed profile', async (subtest) => {
    const { target } = await targetFixture(subtest);
    const profile = '.codex/agents/oh-my-harness-planner.toml';
    await mkdir(path.dirname(path.join(target, ...profile.split('/'))), { recursive: true });
    await writeFile(path.join(target, ...profile.split('/')), 'target-owned profile\n');
    const before = await treeSnapshot(target);
    const planned = await createLifecyclePlan({ operation: 'install', target, release });
    assert.equal(planned.plan.status, 'CONFLICT');
    assert(planned.plan.conflicts.some(({ code, path: itemPath }) => code === 'UNOWNED_DESTINATION' && itemPath === profile));
    assert.deepEqual(await treeSnapshot(target), before);
  });

  await t.test('exact planned dirty overlap', async (subtest) => {
    const { target } = await targetFixture(subtest);
    await initializeGit(target);
    await writeFile(path.join(target, 'AGENTS.md'), 'untracked target rules\n');
    const before = await treeSnapshot(target);
    const planned = await createLifecyclePlan({ operation: 'install', target, release });
    assert.equal(planned.plan.status, 'CONFLICT');
    assert(planned.plan.conflicts.some(({ code, path: itemPath }) => code === 'DIRTY_OVERLAP' && itemPath === 'AGENTS.md'));
    assert.deepEqual(await treeSnapshot(target), before);
  });

  await t.test('update newly-required path collision', async (subtest) => {
    const { target } = await targetFixture(subtest);
    await applyReady('install', target, release);
    const added = '.oh-my-harness/docs/task4-new-collision.md';
    const next = cloneRelease(release, { version: '0.2.0', add: { [added]: 'release bytes\n' } });
    await writeFile(path.join(target, ...added.split('/')), 'target-owned collision\n');
    const before = await treeSnapshot(target);
    const planned = await createLifecyclePlan({ operation: 'update', target, release: next });
    assert.equal(planned.plan.status, 'CONFLICT');
    assert(planned.plan.conflicts.some(({ code, path: itemPath }) => code === 'UNOWNED_DESTINATION' && itemPath === added));
    assert.deepEqual(await treeSnapshot(target), before);
  });
});

test('AS-08 all damaged/lookalike marker variants stop without repair or derivative IO failure', async (t) => {
  const start = '<!-- oh-my-harness:start -->';
  const end = '<!-- oh-my-harness:end -->';
  const variants = new Map([
    ['missing-end', `${start}\nbody\n`],
    ['missing-start', `body\n${end}\n`],
    ['duplicate', `${start}\n${end}\n${start}\n${end}\n`],
    ['nested', `${start}\n${start}\n${end}\n${end}\n`],
    ['reversed', `${end}\n${start}\n`],
    ['damaged', '<!-- oh-my-harness: start -->\n'],
    ['unowned-lookalike', '<!-- oh-my-harness:unknown -->\n'],
  ]);
  for (const [name, bytes] of variants) {
    await t.test(name, async (subtest) => {
      const { target } = await targetFixture(subtest, bytes);
      const before = await readFile(path.join(target, 'AGENTS.md'));
      const planned = await createLifecyclePlan({ operation: 'install', target, release });
      assert.equal(planned.plan.status, 'CONFLICT');
      assert.deepEqual(planned.plan.conflicts, [{ code: 'INVALID_MANAGED_MARKER', path: 'AGENTS.md' }]);
      assert(!planned.plan.conflicts.some(({ code }) => code === 'IO_UNAVAILABLE'));
      const confirmed = await runLifecycle({ operation: 'install', target, release, confirmed: true });
      assert.equal(confirmed.exitCode, 4);
      assert.deepEqual(await readFile(path.join(target, 'AGENTS.md')), before);
      assert.equal(await readFile(path.join(target, ...STATE_PATH.split('/'))).catch(() => null), null);
    });
  }
});

test('AS-09 safe uninstall preserves target content/backups, deletes state last, and reports final-delete failure', async (t) => {
  const { target } = await targetFixture(t, 'target outer\n');
  await writeFile(path.join(target, 'target-owned.txt'), 'preserve me\n');
  await applyReady('install', target, release);
  const driftPath = '.oh-my-harness/docs/architecture.md';
  const drift = Buffer.from('uninstall drift\n');
  await writeFile(path.join(target, ...driftPath.split('/')), drift);
  const driftBefore = await treeSnapshot(target);
  const driftPlan = await createLifecyclePlan({ operation: 'uninstall', target, release });
  assert.equal(driftPlan.plan.status, 'CONFLICT');
  assert(driftPlan.plan.conflicts.some(({ code, path: itemPath }) => code === 'OWNED_DRIFT' && itemPath === driftPath));
  assert.deepEqual(driftPlan.plan.backups, []);
  assert.deepEqual(await treeSnapshot(target), driftBefore);
  await writeFile(path.join(target, ...driftPath.split('/')), release.files.get(driftPath));
  const planned = await createLifecyclePlan({ operation: 'uninstall', target, release });
  assert.equal(planned.plan.status, 'READY');
  const events = [];
  const restore = setFilesystemObserverForTests((event) => events.push(event));
  let result;
  try {
    result = await applyLifecyclePlan({ planned, target, release });
  } finally {
    restore();
  }
  assert.equal(result.report.success, true);
  assert.equal((await readFile(path.join(target, 'target-owned.txt'))).toString(), 'preserve me\n');
  assert(result.report.backups.some((backupPath) => backupPath.endsWith('.oh-my-harness/install-state.json.prior')));
  assert.equal((await readFile(path.join(target, 'AGENTS.md'))).toString(), 'target outer\n');
  assert.equal(await readFile(path.join(target, ...STATE_PATH.split('/'))).catch(() => null), null);
  for (const relativePath of release.files.keys()) {
    assert.equal(await readFile(path.join(target, ...relativePath.split('/'))).catch(() => null), null);
  }
  assert.equal(await readFile(path.join(target, '.codex')).catch(() => null), null);
  assert.equal(await readFile(path.join(target, '.oh-my-harness')).catch(() => null), null);
  assert(result.report.directories.removed.includes('.codex/agents'));
  assert(result.report.directories.removed.includes('.codex'));
  assert(result.report.directories.removed.includes('.oh-my-harness'));
  assert.deepEqual(result.report.directories.preserved, []);
  const stateDelete = events.findIndex((event) => event.operation === 'unlink' && event.path === STATE_PATH);
  assert(stateDelete > 0);
  for (const relativePath of planned.plan.removes) {
    const payloadDelete = events.findIndex((event) => event.operation === 'unlink' && event.path === relativePath);
    assert(payloadDelete >= 0 && payloadDelete < stateDelete, relativePath);
  }

  const failed = await targetFixture(t);
  await applyReady('install', failed.target, release);
  const failedResult = await runLifecycle({
    operation: 'uninstall', target: failed.target, release, confirmed: true, faults: ['state-delete'],
  });
  assert.notEqual(failedResult.exitCode, 0);
  assert.equal(failedResult.report.success, false);
  assert.equal(failedResult.report.state, 'prior-preserved');
  assert.equal(failedResult.report.recoveryOutcome, 'prior-restored');
  assert(await readFile(path.join(failed.target, ...STATE_PATH.split('/'))));
  const followUp = await createLifecyclePlan({ operation: 'uninstall', target: failed.target, release });
  assert.equal(followUp.plan.status, 'READY');
  assert.equal(followUp.plan.recoveryAction, 'none');

  const preExisting = await targetFixture(t);
  await mkdir(path.join(preExisting.target, '.codex/agents'), { recursive: true });
  await applyReady('install', preExisting.target, release);
  const preExistingResult = await applyReady('uninstall', preExisting.target, release);
  assert(preExistingResult.report.directories.preserved.includes('.codex/agents'));
  assert(preExistingResult.report.directories.preserved.includes('.codex'));
  assert.equal((await lstat(path.join(preExisting.target, '.codex/agents'))).isDirectory(), true);

  const populated = await targetFixture(t);
  await applyReady('install', populated.target, release);
  await writeFile(path.join(populated.target, '.codex/agents/target-owned.toml'), 'target owned\n');
  const populatedResult = await applyReady('uninstall', populated.target, release);
  assert.equal((await readFile(path.join(populated.target, '.codex/agents/target-owned.toml'))).toString(), 'target owned\n');
  assert(populatedResult.report.directories.preserved.includes('.codex/agents'));
  assert(populatedResult.report.directories.preserved.includes('.codex'));
});

test('AS-10 one changed outer byte defeats otherwise passing structural checks', async (t) => {
  const originalOuter = Buffer.from('owner rules\n');
  const { target } = await targetFixture(t, originalOuter);
  await applyReady('install', target, release);
  const agentsPath = path.join(target, 'AGENTS.md');
  const installed = await readFile(agentsPath);
  const scan = scanManagedBlock(installed);
  const changedOuter = Buffer.from(scan.prefix);
  changedOuter[0] ^= 1;
  await writeFile(agentsPath, Buffer.concat([changedOuter, scan.interval, scan.suffix]));
  const evidence = await verifyInstalledResult({
    target, release, expectedOuter: { prefix: originalOuter, suffix: Buffer.alloc(0) },
  });
  assert.deepEqual(evidence.structural, {
    payload: true, state: true, managedBlock: true, profiles: true, references: true,
  });
  assert.equal(evidence.outerBytes, false);
  assert.equal(evidence.overall, false);
});

test('AS-11 containment rejects the complete path/type matrix and every bypass', async (t) => {
  for (const unsafePath of ['', '/tmp/oh-my-harness-task4-outside', 'bad\0path', '../outside.txt']) {
    await t.test(`unsafe inventory ${JSON.stringify(unsafePath)}`, async (subtest) => {
      const { parent, target } = await targetFixture(subtest);
      const canary = path.join(parent, 'outside.txt');
      await writeFile(canary, 'outside canary\n');
      const unsafe = cloneRelease(release, { add: { [unsafePath]: 'unsafe\n' } });
      const events = [];
      const restore = setFilesystemObserverForTests((event) => events.push(event));
      try {
        await assert.rejects(
          runLifecycle({ operation: 'install', target, release: unsafe, confirmed: true }),
          /safe relative|path|unsafe/i,
        );
      } finally {
        restore();
      }
      assert.equal((await readFile(canary)).toString(), 'outside canary\n');
      assert(!events.some(({ path: eventPath }) => eventPath?.includes('outside')));
      assert.equal(await readFile(path.join(target, ...STATE_PATH.split('/'))).catch(() => null), null);
    });
  }

  const symlinkFixture = await targetFixture(t);
  const outside = path.join(symlinkFixture.parent, 'outside-directory');
  await mkdir(outside);
  await writeFile(path.join(outside, 'canary'), 'outside\n');
  await symlink(outside, path.join(symlinkFixture.target, '.codex'));
  const symlinkResult = await runLifecycle({ operation: 'install', target: symlinkFixture.target, release, confirmed: true });
  assert.equal(symlinkResult.exitCode, 4);
  assert.equal((await readFile(path.join(outside, 'canary'))).toString(), 'outside\n');

  const regularFixture = await targetFixture(t);
  await writeFile(path.join(regularFixture.target, '.codex'), 'not a directory\n');
  const regularResult = await runLifecycle({ operation: 'install', target: regularFixture.target, release, confirmed: true });
  assert.equal(regularResult.exitCode, 4);

  const fifoFixture = await targetFixture(t);
  const fifo = spawnSync('/usr/bin/mkfifo', [path.join(fifoFixture.target, '.codex')], { env: {} });
  assert.equal(fifo.status, 0);
  const fifoResult = await runLifecycle({ operation: 'install', target: fifoFixture.target, release, confirmed: true });
  assert.equal(fifoResult.exitCode, 4);

  assert.throws(() => parseArguments(['install', '--target', '/tmp/repo', '--force']), /usage/);
});

test('AS-12 exact restart recovery restores partial prior state or finalizes a complete target', async (t) => {
  const changedPath = '.oh-my-harness/docs/architecture.md';
  const next = cloneRelease(release, { version: '0.2.0', replace: { [changedPath]: 'next release\n' } });

  const partial = await targetFixture(t);
  await applyReady('install', partial.target, release);
  const partialResult = await runLifecycle({
    operation: 'update', target: partial.target, release: next, confirmed: true,
    faults: [`payload-write:${changedPath}`, 'rollback-start'],
  });
  assert.notEqual(partialResult.exitCode, 0);
  assert.equal(partialResult.report.success, false);
  assert.equal(partialResult.report.sentinel, 'present');
  const restorePlan = await createLifecyclePlan({ operation: 'update', target: partial.target, release: next });
  assert.equal(restorePlan.plan.status, 'READY');
  assert.equal(restorePlan.plan.recoveryAction, 'restore-prior');
  const restored = await applyLifecyclePlan({ planned: restorePlan, target: partial.target, release: next });
  assert.equal(restored.report.recoveryOutcome, 'prior-restored');
  assert.equal(restored.report.updateApplied, false);
  const fresh = await createLifecyclePlan({ operation: 'update', target: partial.target, release: next });
  assert.equal(fresh.plan.status, 'READY');
  assert.equal(fresh.plan.recoveryAction, 'none');

  const complete = await targetFixture(t);
  await applyReady('install', complete.target, release);
  const completeResult = await runLifecycle({
    operation: 'update', target: complete.target, release: next, confirmed: true,
    faults: ['sentinel-delete', 'rollback-start'],
  });
  assert.notEqual(completeResult.exitCode, 0);
  assert.equal(completeResult.report.success, false);
  const finalizePlan = await createLifecyclePlan({ operation: 'update', target: complete.target, release: next });
  assert.equal(finalizePlan.plan.status, 'READY');
  assert.equal(finalizePlan.plan.recoveryAction, 'finalize-target');
  const finalized = await applyLifecyclePlan({ planned: finalizePlan, target: complete.target, release: next });
  assert.equal(finalized.report.recoveryOutcome, 'target-finalized');
  assert.equal(finalized.report.updateApplied, true);
  assert.equal((await createLifecyclePlan({ operation: 'update', target: complete.target, release: next })).plan.status, 'NO_OP');
});
