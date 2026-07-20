import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import {
  mkdir, mkdtemp, readFile, realpath, rm, stat, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { preparePackage, loadReleaseBundle } from '../../src/installer/package-bundle.mjs';
import { sha256 } from '../../src/installer/filesystem.mjs';
import {
  PRIOR_AGENT_PATHS, PRIOR_INVENTORY_SHA256, PRIOR_MANAGED_BLOCK_SHA256,
  PRIOR_OBSOLETE_PATH, PRIOR_OBSOLETE_SHA256, STATE_PATH,
} from '../../src/installer/state.mjs';
import { ROOT, git, treeSnapshot } from '../lifecycle/test-helpers.mjs';

export const PRIOR_REVISION = 'e51d1fbf7a1b9475ac27aa6025542fb12b3bfb7c';
export const PRIOR_MAP_SHA256 = '38ac29aefb45a64749f27d76464b3cbb1bda221ea6882def195595828e695774';

function archiveRevision(destination) {
  const archive = execFileSync('git', ['archive', PRIOR_REVISION], {
    cwd: ROOT, env: { PATH: process.env.PATH }, maxBuffer: 32 * 1024 * 1024,
  });
  execFileSync('/usr/bin/tar', ['-x', '-C', destination], {
    input: archive, env: { PATH: '/usr/bin:/bin' }, maxBuffer: 32 * 1024 * 1024,
  });
}

async function selectedSnapshot(target, paths) {
  const rows = [];
  for (const relativePath of [...paths].sort((left, right) => Buffer.from(left).compare(Buffer.from(right)))) {
    const absolute = path.join(target, ...relativePath.split('/'));
    const info = await stat(absolute);
    const bytes = await readFile(absolute);
    rows.push({ path: relativePath, sha256: sha256(bytes), mode: info.mode & 0o777, size: info.size, mtimeNs: info.mtimeNs?.toString() ?? String(info.mtimeMs) });
  }
  return rows;
}

export async function buildCurrentRelease(t) {
  const packageRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t05-current-'));
  t.after(() => rm(packageRoot, { recursive: true, force: true }));
  await preparePackage({ packRoot: packageRoot, sourceRoot: ROOT, version: '0.1.0' });
  return loadReleaseBundle({ packageRoot, packageVersion: '0.1.0' });
}

export async function authenticPriorFixture(t, { protectedContent = true } = {}) {
  const parent = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t05-prior-'));
  t.after(() => rm(parent, { recursive: true, force: true }));
  const sourceRoot = path.join(parent, 'source');
  const target = path.join(parent, 'target');
  await mkdir(sourceRoot);
  await mkdir(target);
  assert.equal(execFileSync('git', ['cat-file', '-t', PRIOR_REVISION], {
    cwd: ROOT, encoding: 'utf8', env: { PATH: process.env.PATH },
  }).trim(), 'commit');
  archiveRevision(sourceRoot);
  assert.equal(sha256(await readFile(path.join(sourceRoot, 'packaging/bundle-map.json'))), PRIOR_MAP_SHA256);

  const oldPackage = await import(pathToFileURL(path.join(sourceRoot, 'src/installer/package-bundle.mjs')).href);
  await oldPackage.preparePackage({ packRoot: sourceRoot, sourceRoot, version: '0.1.0' });
  const priorRelease = await oldPackage.loadReleaseBundle({ packageRoot: sourceRoot, packageVersion: '0.1.0' });
  assert.equal(sha256(priorRelease.inventoryBytes), PRIOR_INVENTORY_SHA256);
  assert.equal(sha256(priorRelease.managedBlock), PRIOR_MANAGED_BLOCK_SHA256);
  assert.equal(priorRelease.inventory.requiredFiles.length, 42);
  assert.equal(priorRelease.files.size, 44);
  assert.deepEqual(priorRelease.inventory.ownership.agentPaths, PRIOR_AGENT_PATHS);
  const obsolete = priorRelease.inventory.requiredFiles.filter((item) => item.destinationPath === PRIOR_OBSOLETE_PATH);
  assert.equal(obsolete.length, 1);
  assert.equal(obsolete[0].sourceSha256, PRIOR_OBSOLETE_SHA256);
  assert.equal(obsolete[0].destinationSha256, PRIOR_OBSOLETE_SHA256);

  const outerPrefix = Buffer.from('synthetic outer router before managed block\r\n');
  await writeFile(path.join(target, 'AGENTS.md'), outerPrefix);
  const oldLifecycle = await import(pathToFileURL(path.join(sourceRoot, 'src/installer/lifecycle.mjs')).href);
  const oldState = await import(pathToFileURL(path.join(sourceRoot, 'src/installer/state.mjs')).href);
  const oldPlan = await oldLifecycle.createLifecyclePlan({ operation: 'install', target, release: priorRelease });
  assert.equal(oldPlan.plan.status, 'READY');
  await oldLifecycle.applyLifecyclePlan({ planned: oldPlan, target, release: priorRelease });
  const priorStateBytes = await readFile(path.join(target, ...STATE_PATH.split('/')));
  const canonicalTarget = await realpath(target);
  const priorState = oldState.parseInstallState(priorStateBytes, { canonicalRoot: canonicalTarget });
  oldState.reconcileInstallStateInventory(priorState, priorRelease.inventory, priorRelease.inventoryBytes);

  const protectedPaths = [];
  if (protectedContent) {
    await writeFile(path.join(target, 'unowned-target.txt'), 'synthetic unowned bytes\n');
    await mkdir(path.join(target, '.oh-my-harness', 'unowned'), { recursive: true });
    await writeFile(path.join(target, '.oh-my-harness/unowned/opaque.txt'), 'synthetic namespace-unowned bytes\n');
    await mkdir(path.join(target, '.oh-my-harness-backups', 'pre-existing'), { recursive: true });
    await writeFile(path.join(target, '.oh-my-harness-backups/pre-existing/opaque.bin'), Buffer.from([0, 1, 2, 255]));
    await mkdir(path.join(target, 'task-docs/history/synthetic-old-run'), { recursive: true });
    await writeFile(path.join(target, 'task-docs/history/synthetic-old-run/ACCEPTED_CONTRACT.md'), 'synthetic historical contract bytes\n');
    await mkdir(path.join(target, 'task-docs/cases'), { recursive: true });
    await writeFile(path.join(target, 'task-docs/cases/synthetic-case.md'), 'synthetic central case bytes\n');
    git(target, ['init', '-q']);
    git(target, ['config', 'user.email', 'fixture@example.invalid']);
    git(target, ['config', 'user.name', 'Fixture']);
    await writeFile(path.join(target, 'git-seed.txt'), 'synthetic git seed\n');
    git(target, ['add', '--', 'git-seed.txt']);
    git(target, ['commit', '-qm', 'fixture seed']);
    protectedPaths.push(
      'unowned-target.txt', '.oh-my-harness/unowned/opaque.txt',
      '.oh-my-harness-backups/pre-existing/opaque.bin',
      'task-docs/history/synthetic-old-run/ACCEPTED_CONTRACT.md',
      'task-docs/cases/synthetic-case.md', '.git/HEAD', '.git/index', 'git-seed.txt',
    );
  }
  const priorOwnedTree = await treeSnapshot(target);
  const protectedBefore = protectedContent ? await selectedSnapshot(target, protectedPaths) : [];
  return {
    parent, sourceRoot, target, priorRelease, priorState, priorStateBytes,
    priorOwnedTree, oldLifecycle, oldState, outerPrefix, protectedPaths, protectedBefore,
  };
}

export async function assertProtectedUnchanged(fixture) {
  assert.deepEqual(await selectedSnapshot(fixture.target, fixture.protectedPaths), fixture.protectedBefore);
}

export async function exactManagedSnapshot(target, release) {
  return selectedSnapshot(target, [
    ...release.files.keys(), 'AGENTS.md', STATE_PATH,
  ]);
}
