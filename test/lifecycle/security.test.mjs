import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdirSync, renameSync, rmSync, symlinkSync } from 'node:fs';
import { cp, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { applyLifecyclePlan, createLifecyclePlan } from '../../src/installer/lifecycle.mjs';
import { canonicalBytes, setFilesystemObserverForTests, sha256 } from '../../src/installer/filesystem.mjs';
import { scanManagedBlock } from '../../src/installer/markers.mjs';
import {
  cleanupPackage, preparePackage, loadReleaseBundle,
} from '../../src/installer/package-bundle.mjs';
import { STATE_PATH } from '../../src/installer/state.mjs';
import {
  cloneRelease, git, initializeGit, ROOT, targetFixture, treeSnapshot,
} from './test-helpers.mjs';

let packageRoot;
let release;

before(async () => {
  packageRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-security-release-'));
  await preparePackage({ packRoot: packageRoot, sourceRoot: ROOT, version: '0.1.0' });
  release = await loadReleaseBundle({ packageRoot, packageVersion: '0.1.0' });
});

after(async () => rm(packageRoot, { recursive: true, force: true }));

async function install(target) {
  const planned = await createLifecyclePlan({ operation: 'install', target, release });
  assert.equal(planned.plan.status, 'READY');
  await applyLifecyclePlan({ planned, target, release });
}

test('marker scanner accepts only one byte-exact ordered pair and rejects the full damaged matrix', () => {
  const start = '<!-- oh-my-harness:start -->';
  const end = '<!-- oh-my-harness:end -->';
  assert.equal(scanManagedBlock(Buffer.from('ordinary oh-my-harness prose')).status, 'absent');
  assert.equal(scanManagedBlock(Buffer.from(`${start}\nbody\n${end}\nouter`)).status, 'owned-pair');
  const invalid = [
    start, end, `${start}${start}${end}`, `${start}${end}${end}`, `${start}${end}${start}${end}`,
    `${start}${start}${end}${end}`, `${end}${start}`, '<!-- oh-my-harness: start -->',
    '<!-- OH-MY-HARNESS:start -->', '<!-- oh-my-harness:unknown -->',
    '<!-- oh-my-harness:stat -->', '<!-- oh-my-harness:start',
    `<!-- oh-my-harness:start  -->${end}`, `${start}<!-- oh-my-harness:end  -->`,
  ];
  for (const value of invalid) assert.throws(() => scanManagedBlock(Buffer.from(value)), /marker|markers|syntax/);
});

test('damaged managed markers produce only the terminal primary marker conflict', async (t) => {
  const { target } = await targetFixture(t, '<!-- oh-my-harness:start -->');
  const planned = await createLifecyclePlan({ operation: 'install', target, release });
  assert.equal(planned.plan.status, 'CONFLICT');
  assert.deepEqual(planned.plan.conflicts, [{ code: 'INVALID_MANAGED_MARKER', path: 'AGENTS.md' }]);
});

test('unmanaged namespace and prefixed profile collisions stop with zero writes and no name-based adoption', async (t) => {
  const namespace = await targetFixture(t);
  await mkdir(path.join(namespace.target, '.oh-my-harness'));
  await writeFile(path.join(namespace.target, '.oh-my-harness/target.txt'), 'owned by target\n');
  const beforeNamespace = await treeSnapshot(namespace.target);
  const namespacePlan = await createLifecyclePlan({ operation: 'install', target: namespace.target, release });
  assert.equal(namespacePlan.plan.status, 'INCOMPLETE_OR_UNOWNED');
  assert.deepEqual(await treeSnapshot(namespace.target), beforeNamespace);

  const profile = await targetFixture(t);
  await mkdir(path.join(profile.target, '.codex/agents'), { recursive: true });
  const profilePath = '.codex/agents/oh-my-harness-planner.toml';
  await writeFile(path.join(profile.target, ...profilePath.split('/')), 'target profile\n');
  const beforeProfile = await treeSnapshot(profile.target);
  const profilePlan = await createLifecyclePlan({ operation: 'install', target: profile.target, release });
  assert.equal(profilePlan.plan.status, 'CONFLICT');
  assert(profilePlan.plan.conflicts.some((item) => item.code === 'UNOWNED_DESTINATION' && item.path === profilePath));
  assert.deepEqual(await treeSnapshot(profile.target), beforeProfile);
});

test('traversal, absolute, empty, NUL, symlink, and special parents stop without outside access', async (t) => {
  for (const unsafePath of ['../outside.txt', '/tmp/outside.txt', '', 'bad\0path']) {
    const fixture = await targetFixture(t);
    const unsafe = cloneRelease(release, { add: { [unsafePath]: 'unsafe\n' } });
    const outside = path.join(fixture.parent, 'outside.txt');
    await writeFile(outside, 'canary\n');
    const events = [];
    const restore = setFilesystemObserverForTests((event) => events.push(event));
    await assert.rejects(createLifecyclePlan({ operation: 'install', target: fixture.target, release: unsafe }));
    restore();
    assert.equal((await readFile(outside)).toString(), 'canary\n');
    assert(!events.some((event) => event.operation.includes('open') && event.path.includes('outside')));
  }

  const symlinkFixture = await targetFixture(t);
  const outsideDirectory = path.join(symlinkFixture.parent, 'outside');
  await mkdir(outsideDirectory);
  await writeFile(path.join(outsideDirectory, 'canary'), 'outside\n');
  await symlink(outsideDirectory, path.join(symlinkFixture.target, '.codex'));
  const symlinkPlan = await createLifecyclePlan({ operation: 'install', target: symlinkFixture.target, release });
  assert.equal(symlinkPlan.plan.status, 'CONFLICT');
  assert.equal((await readFile(path.join(outsideDirectory, 'canary'))).toString(), 'outside\n');

  const specialFixture = await targetFixture(t);
  await writeFile(path.join(specialFixture.target, '.codex'), 'not a directory\n');
  const specialPlan = await createLifecyclePlan({ operation: 'install', target: specialFixture.target, release });
  assert.equal(specialPlan.plan.status, 'CONFLICT');

  const fifoFixture = await targetFixture(t);
  const fifo = spawnSync('/usr/bin/mkfifo', [path.join(fifoFixture.target, '.codex')], { env: {} });
  assert.equal(fifo.status, 0);
  const fifoPlan = await createLifecyclePlan({ operation: 'install', target: fifoFixture.target, release });
  assert.equal(fifoPlan.plan.status, 'CONFLICT');
});

test('mutation-boundary parent swaps stop before any outside write or deletion', async (t) => {
  await t.test('backup exclusive create', async (subtest) => {
    const fixture = await targetFixture(subtest);
    await install(fixture.target);
    const managedPath = '.oh-my-harness/docs/architecture.md';
    await writeFile(path.join(fixture.target, ...managedPath.split('/')), 'drift requiring backup\n');
    const next = cloneRelease(release, { version: '0.2.0', replace: { [managedPath]: 'replacement\n' } });
    const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release: next });
    const backupPath = planned.plan.backups[0].backupPath;
    const outside = path.join(fixture.parent, 'outside-backups');
    await mkdir(outside);
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'open-write-exclusive' && event.path === backupPath) {
        const backupRoot = path.join(fixture.target, '.oh-my-harness-backups');
        rmSync(backupRoot, { recursive: true, force: true });
        symlinkSync(outside, backupRoot);
        swapped = true;
      }
    });
    try {
      await assert.rejects(applyLifecyclePlan({ planned, target: fixture.target, release: next }), /symbolic link|unsafe/i);
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal(await readFile(path.join(outside, ...backupPath.split('/').slice(1))).catch(() => null), null);
  });

  await t.test('sentinel exclusive create', async (subtest) => {
    const fixture = await targetFixture(subtest);
    const planned = await createLifecyclePlan({ operation: 'install', target: fixture.target, release });
    const outside = path.join(fixture.parent, 'outside-sentinel');
    await mkdir(outside);
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'open-write-exclusive'
          && event.path === '.oh-my-harness/.operation-in-progress.tmp') {
        const namespace = path.join(fixture.target, '.oh-my-harness');
        rmSync(namespace, { recursive: true, force: true });
        symlinkSync(outside, namespace);
        swapped = true;
      }
    });
    try {
      await assert.rejects(applyLifecyclePlan({ planned, target: fixture.target, release }), /symbolic link|unsafe/i);
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal(await readFile(path.join(outside, '.operation-in-progress.tmp')).catch(() => null), null);
  });

  await t.test('target root swap', async (subtest) => {
    const fixture = await targetFixture(subtest);
    const planned = await createLifecyclePlan({ operation: 'install', target: fixture.target, release });
    const original = `${fixture.target}-original`;
    const outside = path.join(fixture.parent, 'outside-root');
    await mkdir(outside);
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'open-write-exclusive'
          && event.path === '.oh-my-harness/.operation-in-progress.tmp') {
        renameSync(fixture.target, original);
        symlinkSync(outside, fixture.target);
        swapped = true;
      }
    });
    try {
      await assert.rejects(applyLifecyclePlan({ planned, target: fixture.target, release }), /target root|unsafe/i);
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal(await readFile(path.join(outside, '.oh-my-harness/.operation-in-progress.tmp')).catch(() => null), null);
  });

  await t.test('state exclusive create', async (subtest) => {
    const fixture = await targetFixture(subtest);
    const planned = await createLifecyclePlan({ operation: 'install', target: fixture.target, release });
    const outside = path.join(fixture.parent, 'outside-state');
    await mkdir(outside);
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'open-write-exclusive'
          && event.path === '.oh-my-harness/.install-state.tmp') {
        const namespace = path.join(fixture.target, '.oh-my-harness');
        rmSync(namespace, { recursive: true, force: true });
        symlinkSync(outside, namespace);
        swapped = true;
      }
    });
    try {
      await assert.rejects(applyLifecyclePlan({ planned, target: fixture.target, release }), /symbolic link|unsafe/i);
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal(await readFile(path.join(outside, '.install-state.tmp')).catch(() => null), null);
  });

  await t.test('payload temporary create', async (subtest) => {
    const fixture = await targetFixture(subtest);
    const planned = await createLifecyclePlan({ operation: 'install', target: fixture.target, release });
    const payloadPath = '.codex/agents/oh-my-harness-executor.toml';
    const outside = path.join(fixture.parent, 'outside-payload');
    await mkdir(outside);
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'open-write-temp' && event.detail === payloadPath) {
        const codex = path.join(fixture.target, '.codex');
        rmSync(codex, { recursive: true, force: true });
        symlinkSync(outside, codex);
        swapped = true;
      }
    });
    try {
      await assert.rejects(applyLifecyclePlan({ planned, target: fixture.target, release }), /symbolic link|unsafe/i);
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal(await readFile(path.join(outside, 'agents/oh-my-harness-executor.toml')).catch(() => null), null);
  });

  await t.test('payload deletion', async (subtest) => {
    const fixture = await targetFixture(subtest);
    await install(fixture.target);
    const payloadPath = '.codex/agents/oh-my-harness-executor.toml';
    const outside = path.join(fixture.parent, 'outside-delete');
    await mkdir(path.join(outside, 'agents'), { recursive: true });
    await writeFile(path.join(outside, 'agents/oh-my-harness-executor.toml'), 'outside canary\n');
    const planned = await createLifecyclePlan({ operation: 'uninstall', target: fixture.target, release });
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'before-unlink' && event.path === payloadPath) {
        const codex = path.join(fixture.target, '.codex');
        rmSync(codex, { recursive: true, force: true });
        symlinkSync(outside, codex);
        swapped = true;
      }
    });
    try {
      await assert.rejects(applyLifecyclePlan({ planned, target: fixture.target, release }), /symbolic link|unsafe/i);
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal((await readFile(path.join(outside, 'agents/oh-my-harness-executor.toml'))).toString(), 'outside canary\n');
  });

  await t.test('payload replacement', async (subtest) => {
    const fixture = await targetFixture(subtest);
    await install(fixture.target);
    const managedPath = '.oh-my-harness/docs/architecture.md';
    const next = cloneRelease(release, { version: '0.2.0', replace: { [managedPath]: 'replacement\n' } });
    const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release: next });
    const outside = path.join(fixture.parent, 'outside-replace');
    await mkdir(path.join(outside, 'docs'), { recursive: true });
    await writeFile(path.join(outside, 'docs/architecture.md'), 'outside canary\n');
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'before-rename' && event.path === managedPath) {
        const namespace = path.join(fixture.target, '.oh-my-harness');
        rmSync(namespace, { recursive: true, force: true });
        symlinkSync(outside, namespace);
        swapped = true;
      }
    });
    try {
      await assert.rejects(applyLifecyclePlan({ planned, target: fixture.target, release: next }), /symbolic link|unsafe|unavailable/i);
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal((await readFile(path.join(outside, 'docs/architecture.md'))).toString(), 'outside canary\n');
  });

  await t.test('managed directory removal', async (subtest) => {
    const fixture = await targetFixture(subtest);
    await install(fixture.target);
    const planned = await createLifecyclePlan({ operation: 'uninstall', target: fixture.target, release });
    const outside = path.join(fixture.parent, 'outside-directory-remove');
    await mkdir(path.join(outside, 'agents'), { recursive: true });
    await writeFile(path.join(outside, 'agents/canary'), 'outside canary\n');
    let swapped = false;
    const restore = setFilesystemObserverForTests((event) => {
      if (!swapped && event.operation === 'before-rmdir' && event.path === '.codex/agents') {
        const codex = path.join(fixture.target, '.codex');
        rmSync(codex, { recursive: true, force: true });
        symlinkSync(outside, codex);
        swapped = true;
      }
    });
    let result;
    try {
      result = await applyLifecyclePlan({ planned, target: fixture.target, release });
    } finally {
      restore();
    }
    assert.equal(swapped, true);
    assert.equal((await readFile(path.join(outside, 'agents/canary'))).toString(), 'outside canary\n');
    assert(result.report.directories.preserved.includes('.codex/agents'));
    assert(result.report.directories.preserved.includes('.codex'));
  });
});

test('state traversal, wrong-target copies, malformed state, and unscoped identity cannot authorize mutation', async (t) => {
  const original = await targetFixture(t);
  await install(original.target);
  const statePath = path.join(original.target, ...STATE_PATH.split('/'));

  const wrongTarget = await targetFixture(t);
  await cp(path.join(original.target, '.oh-my-harness'), path.join(wrongTarget.target, '.oh-my-harness'), { recursive: true });
  await cp(path.join(original.target, '.codex'), path.join(wrongTarget.target, '.codex'), { recursive: true });
  await cp(path.join(original.target, 'AGENTS.md'), path.join(wrongTarget.target, 'AGENTS.md'));
  const beforeWrong = await treeSnapshot(wrongTarget.target);
  const wrongPlan = await createLifecyclePlan({ operation: 'uninstall', target: wrongTarget.target, release });
  assert.equal(wrongPlan.plan.status, 'INCOMPLETE_OR_UNOWNED');
  assert.deepEqual(await treeSnapshot(wrongTarget.target), beforeWrong);

  for (const mutate of [
    (state) => ({ ...state, unexpected: true }),
    (state) => ({ ...state, installer: { ...state.installer, packageName: 'oh-my-harness' } }),
    (state) => ({ ...state, ownedFiles: [...state.ownedFiles, { path: '../outside', sha256: '0'.repeat(64), kind: 'payload' }] }),
    (state) => ({ ...state, ownedFiles: [{ path: 'target-owned.txt', sha256: '0'.repeat(64), kind: 'payload' }, ...state.ownedFiles] }),
  ]) {
    const fixture = await targetFixture(t);
    await install(fixture.target);
    const localStatePath = path.join(fixture.target, ...STATE_PATH.split('/'));
    const state = JSON.parse(await readFile(localStatePath, 'utf8'));
    await writeFile(localStatePath, canonicalBytes(mutate(state)));
    const before = await treeSnapshot(fixture.target);
    const plan = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
    assert.equal(plan.plan.status, 'INCOMPLETE_OR_UNOWNED');
    assert.deepEqual(await treeSnapshot(fixture.target), before);
  }
});

test('installed inventory rejects forged in-namespace ownership and state-hash backup bypass', async (t) => {
  const forged = await targetFixture(t);
  await install(forged.target);
  const targetOwnedPath = '.oh-my-harness/target-owned.txt';
  const targetOwnedBytes = Buffer.from('target-owned\n');
  await writeFile(path.join(forged.target, ...targetOwnedPath.split('/')), targetOwnedBytes);
  const forgedStatePath = path.join(forged.target, ...STATE_PATH.split('/'));
  const forgedState = JSON.parse(await readFile(forgedStatePath, 'utf8'));
  forgedState.ownedFiles.push({ path: targetOwnedPath, sha256: sha256(targetOwnedBytes), kind: 'payload' });
  forgedState.ownedFiles.sort((left, right) => Buffer.from(left.path).compare(Buffer.from(right.path)));
  await writeFile(forgedStatePath, canonicalBytes(forgedState));
  const forgedBefore = await treeSnapshot(forged.target);
  const forgedPlan = await createLifecyclePlan({ operation: 'uninstall', target: forged.target, release });
  assert.equal(forgedPlan.plan.status, 'CONFLICT');
  assert.deepEqual(forgedPlan.plan.conflicts, [{ code: 'UNVERIFIABLE_INSTALL_STATE', path: STATE_PATH }]);
  assert.deepEqual(await treeSnapshot(forged.target), forgedBefore);
  assert.deepEqual(await readFile(path.join(forged.target, ...targetOwnedPath.split('/'))), targetOwnedBytes);

  const bypass = await targetFixture(t);
  await install(bypass.target);
  const managedPath = '.oh-my-harness/docs/architecture.md';
  const drifted = Buffer.from('drift hidden by forged state hash\n');
  await writeFile(path.join(bypass.target, ...managedPath.split('/')), drifted);
  const bypassStatePath = path.join(bypass.target, ...STATE_PATH.split('/'));
  const bypassState = JSON.parse(await readFile(bypassStatePath, 'utf8'));
  bypassState.ownedFiles.find((item) => item.path === managedPath).sha256 = sha256(drifted);
  await writeFile(bypassStatePath, canonicalBytes(bypassState));
  const bypassBefore = await treeSnapshot(bypass.target);
  const bypassPlan = await createLifecyclePlan({ operation: 'update', target: bypass.target, release });
  assert.equal(bypassPlan.plan.status, 'CONFLICT');
  assert.deepEqual(bypassPlan.plan.conflicts, [{ code: 'UNVERIFIABLE_INSTALL_STATE', path: STATE_PATH }]);
  assert.deepEqual(bypassPlan.plan.modifiedManaged, []);
  assert.deepEqual(bypassPlan.plan.backups, []);
  assert.deepEqual(await treeSnapshot(bypass.target), bypassBefore);
});

test('final pre-write recheck detects target mutation and creates no sentinel', async (t) => {
  const { target } = await targetFixture(t, 'before\n');
  const planned = await createLifecyclePlan({ operation: 'install', target, release });
  await writeFile(path.join(target, 'AGENTS.md'), 'after\n');
  await assert.rejects(applyLifecyclePlan({ planned, target, release }), /changed after plan/);
  assert.equal(await readFile(path.join(target, '.oh-my-harness/.operation-in-progress.json')).catch(() => null), null);
  assert.equal((await readFile(path.join(target, 'AGENTS.md'))).toString(), 'after\n');
});

test('sanitized exact Git overlap ignores target hooks/config/filters and reports only exact planned overlap', async (t) => {
  const { parent, target } = await targetFixture(t);
  await initializeGit(target);
  const canary = path.join(parent, 'hook-canary');
  await mkdir(path.join(target, '.git/hooks'), { recursive: true });
  await writeFile(path.join(target, '.git/hooks/pre-commit'), `#!/bin/sh\necho ran > "${canary}"\n`, { mode: 0o755 });
  await writeFile(path.join(target, '.git/config'), `[core]\n\thooksPath = .git/hooks\n[include]\n\tpath = ${path.join(parent, 'outside-config')}\n[filter "evil"]\n\tprocess = ${path.join(parent, 'outside-command')}\n`);
  await mkdir(path.join(target, '.codex/agents'), { recursive: true });
  const overlap = '.codex/agents/oh-my-harness-planner.toml';
  await writeFile(path.join(target, ...overlap.split('/')), 'untracked overlap\n');
  const events = [];
  const restore = setFilesystemObserverForTests((event) => events.push(event));
  const planned = await createLifecyclePlan({ operation: 'install', target, release });
  restore();
  assert.equal(planned.plan.gitOverlap.status, 'overlap');
  assert(planned.plan.gitOverlap.paths.some((item) => item.path === overlap && item.state === 'untracked'));
  assert(planned.plan.conflicts.some((item) => item.code === 'DIRTY_OVERLAP' && item.path === overlap));
  assert.equal(await readFile(canary).catch(() => null), null);
  assert(!events.some((event) => event.path === '.git/config'));
  assert.equal(events.filter((event) => event.operation === 'spawn' && event.detail === 'sanitized-status').length, 1);
});

test('unborn Git reports only exact planned untracked or staged overlap', async (t) => {
  const overlap = '.codex/agents/oh-my-harness-planner.toml';

  const untracked = await targetFixture(t);
  git(untracked.target, ['init', '-q']);
  await mkdir(path.join(untracked.target, '.codex/agents'), { recursive: true });
  await writeFile(path.join(untracked.target, ...overlap.split('/')), 'untracked overlap\n');
  await writeFile(path.join(untracked.target, 'unrelated.txt'), 'unrelated\n');
  const untrackedBefore = await treeSnapshot(untracked.target);
  const untrackedPlan = await createLifecyclePlan({ operation: 'install', target: untracked.target, release });
  assert.equal(untrackedPlan.plan.gitOverlap.status, 'overlap');
  assert.deepEqual(untrackedPlan.plan.gitOverlap.paths, [{ path: overlap, state: 'untracked' }]);
  assert(untrackedPlan.plan.conflicts.some((item) => item.code === 'DIRTY_OVERLAP' && item.path === overlap));
  assert.deepEqual(await treeSnapshot(untracked.target), untrackedBefore);

  const staged = await targetFixture(t);
  git(staged.target, ['init', '-q']);
  await mkdir(path.join(staged.target, '.codex/agents'), { recursive: true });
  await writeFile(path.join(staged.target, ...overlap.split('/')), 'staged overlap\n');
  git(staged.target, ['add', '--', overlap]);
  const stagedBefore = await treeSnapshot(staged.target);
  const stagedPlan = await createLifecyclePlan({ operation: 'install', target: staged.target, release });
  assert.equal(stagedPlan.plan.gitOverlap.status, 'overlap');
  assert.deepEqual(stagedPlan.plan.gitOverlap.paths, [{ path: overlap, state: 'staged' }]);
  assert(stagedPlan.plan.conflicts.some((item) => item.code === 'DIRTY_OVERLAP' && item.path === overlap));
  assert.deepEqual(await treeSnapshot(staged.target), stagedBefore);
});

test('target and inherited alternate or replacement routing stops before sanitized Git execution', async (t) => {
  await t.test('target alternates', async (subtest) => {
    const { parent, target } = await targetFixture(subtest);
    await initializeGit(target);
    await writeFile(path.join(target, '.git/objects/info/alternates'), `${path.join(parent, 'outside-objects')}\n`);
    const events = [];
    const restore = setFilesystemObserverForTests((event) => events.push(event));
    const planned = await createLifecyclePlan({ operation: 'install', target, release }).finally(restore);
    assert.equal(planned.plan.gitOverlap.status, 'unsafe-git-layout');
    assert(planned.plan.conflicts.some((item) => item.code === 'IO_UNAVAILABLE' && item.path === '.git'));
    assert(!events.some((event) => event.operation === 'spawn'));
  });

  await t.test('target replacements', async (subtest) => {
    const { target } = await targetFixture(subtest);
    await initializeGit(target);
    await mkdir(path.join(target, '.git/refs/replace'));
    const planned = await createLifecyclePlan({ operation: 'install', target, release });
    assert.equal(planned.plan.gitOverlap.status, 'unsafe-git-layout');
    assert(planned.plan.conflicts.some((item) => item.code === 'IO_UNAVAILABLE' && item.path === '.git'));
  });

  await t.test('inherited alternates', async (subtest) => {
    assert.equal(Object.hasOwn(process.env, 'GIT_ALTERNATE_OBJECT_DIRECTORIES'), false);
    const { parent, target } = await targetFixture(subtest);
    await initializeGit(target);
    process.env.GIT_ALTERNATE_OBJECT_DIRECTORIES = path.join(parent, 'outside-objects');
    try {
      const planned = await createLifecyclePlan({ operation: 'install', target, release });
      assert.equal(planned.plan.gitOverlap.status, 'unsafe-git-layout');
      assert(planned.plan.conflicts.some((item) => item.code === 'IO_UNAVAILABLE' && item.path === '.git'));
    } finally {
      delete process.env.GIT_ALTERNATE_OBJECT_DIRECTORIES;
    }
  });
});

test('package cleanup removes only an exact validated generated bundle', async (t) => {
  const cleanRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-clean-package-'));
  t.after(() => rm(cleanRoot, { recursive: true, force: true }));
  await preparePackage({ packRoot: cleanRoot, sourceRoot: ROOT, version: '0.1.0' });
  await cleanupPackage({ packRoot: cleanRoot, version: '0.1.0' });
  assert.equal(await readFile(path.join(cleanRoot, 'dist/.oh-my-harness/bundle-inventory.json')).catch(() => null), null);

  const protectedRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-protected-package-'));
  t.after(() => rm(protectedRoot, { recursive: true, force: true }));
  await preparePackage({ packRoot: protectedRoot, sourceRoot: ROOT, version: '0.1.0' });
  await writeFile(path.join(protectedRoot, 'dist/unowned-output.txt'), 'must remain\n');
  await assert.rejects(cleanupPackage({ packRoot: protectedRoot, version: '0.1.0' }), /ownership/);
  assert.equal((await readFile(path.join(protectedRoot, 'dist/unowned-output.txt'))).toString(), 'must remain\n');
});

test('special unrelated Git objects are observed and stop within the bounded Git discovery surface', async (t) => {
  const { target } = await targetFixture(t);
  await initializeGit(target);
  await writeFile(path.join(target, 'unrelated-target-content.txt'), 'opaque adjacent content\n');
  const specialPath = '.git/objects/unrelated-special';
  const fifo = spawnSync('/usr/bin/mkfifo', [path.join(target, ...specialPath.split('/'))], { env: {} });
  assert.equal(fifo.status, 0);
  const events = [];
  const restore = setFilesystemObserverForTests((event) => events.push(event));
  let planned;
  try {
    planned = await createLifecyclePlan({ operation: 'install', target, release });
  } finally {
    restore();
  }
  assert.equal(planned.plan.gitOverlap.status, 'unsafe-git-layout');
  assert(planned.plan.conflicts.some((item) => item.code === 'IO_UNAVAILABLE' && item.path === '.git'));
  assert(events.some((event) => event.operation === 'readdir' && event.path === '.git/objects'));
  assert(events.some((event) => event.operation === 'lstat' && event.path === specialPath));
  assert(!events.some((event) => event.path === 'unrelated-target-content.txt'));
  assert(!events.some((event) => event.operation === 'spawn'));
  assert.equal((await readFile(path.join(target, 'unrelated-target-content.txt'))).toString(), 'opaque adjacent content\n');
});

test('disclosure, state, reports, and logs are content-safe while backup bytes stay opaque and exact', async (t) => {
  const { target } = await targetFixture(t);
  await install(target);
  const managedPath = '.oh-my-harness/docs/architecture.md';
  const syntheticSensitiveBytes = Buffer.from('fixture-sensitive-value-that-must-not-be-disclosed\n');
  await writeFile(path.join(target, ...managedPath.split('/')), syntheticSensitiveBytes);
  const next = cloneRelease(release, { version: '0.2.0', replace: { [managedPath]: 'released\n' } });
  const planned = await createLifecyclePlan({ operation: 'update', target, release: next });
  const serializedPlan = canonicalBytes(planned.envelope).toString();
  assert(!serializedPlan.includes(syntheticSensitiveBytes.toString().trim()));
  const result = await applyLifecyclePlan({ planned, target, release: next });
  const serializedReport = canonicalBytes(result.report).toString();
  const state = await readFile(path.join(target, ...STATE_PATH.split('/')));
  assert(!serializedReport.includes(syntheticSensitiveBytes.toString().trim()));
  assert(!state.includes(syntheticSensitiveBytes));
  const backup = planned.plan.backups[0].backupPath;
  assert.deepEqual(await readFile(path.join(target, ...backup.split('/'))), syntheticSensitiveBytes);
});

test('instrumented discovery and writes stay on the exact lifecycle surface and never inspect adjacent target content', async (t) => {
  const { target } = await targetFixture(t, 'outer\n');
  await writeFile(path.join(target, 'unrelated-target-content.txt'), 'opaque adjacent content\n');
  const events = [];
  const restore = setFilesystemObserverForTests((event) => events.push(event));
  let result;
  try {
    const planned = await createLifecyclePlan({ operation: 'install', target, release });
    result = await applyLifecyclePlan({ planned, target, release });
  } finally {
    restore();
  }
  assert(!events.some((event) => event.path === 'unrelated-target-content.txt'));
  assert(!events.some((event) => event.operation === 'spawn'));
  const unexpectedPaths = [...new Set(events.map((event) => event.path).filter((eventPath) => !(eventPath === 'AGENTS.md'
    || eventPath === '.git'
    || eventPath.startsWith('.AGENTS.md')
    || eventPath.startsWith('.oh-my-harness') || eventPath.startsWith('.codex'))))];
  assert.deepEqual(unexpectedPaths, []);
  const allowedChanged = new Set([...release.files.keys(), 'AGENTS.md', STATE_PATH]);
  assert(result.report.changed.every((item) => allowedChanged.has(item)));
  assert.equal((await readFile(path.join(target, 'unrelated-target-content.txt'))).toString(), 'opaque adjacent content\n');
});
