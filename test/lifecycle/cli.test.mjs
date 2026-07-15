import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { main, parseArguments } from '../../src/installer/cli.mjs';
import { CONFLICT_CODES } from '../../src/installer/lifecycle.mjs';
import { preparePackage, loadReleaseBundle } from '../../src/installer/package-bundle.mjs';
import { captureStream, nonTtyInput, ROOT, targetFixture, treeSnapshot, ttyInput } from './test-helpers.mjs';
import { chooseValidationExit } from './package-validation.mjs';

let packageRoot;
let release;

before(async () => {
  packageRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-cli-release-'));
  await preparePackage({ packRoot: packageRoot, sourceRoot: ROOT, version: '0.1.0' });
  release = await loadReleaseBundle({ packageRoot, packageVersion: '0.1.0' });
});

after(async () => rm(packageRoot, { recursive: true, force: true }));

test('CLI parser accepts only the exact closed public syntax', () => {
  assert.deepEqual(parseArguments(['install', '--target', '/tmp/repo', '--dry-run', '--yes']), {
    operation: 'install', target: '/tmp/repo', dryRun: true, yes: true,
  });
  for (const argv of [
    [], ['other', '--target', 'x'], ['install'], ['install', '--target'],
    ['install', '--target', 'x', '--force'], ['install', '--target', 'x', '--yes', '--yes'],
    ['install', '--target', 'x', 'extra'], ['install', '--target', 'x', '--target', 'y'],
  ]) assert.throws(() => parseArguments(argv), /usage/);
});

test('dry-run prints the canonical plan and never prompts or writes', async (t) => {
  const { target } = await targetFixture(t, 'outer\n');
  const beforeTree = await treeSnapshot(target);
  const stdout = captureStream();
  const stderr = captureStream();
  const status = await main(['install', '--target', target, '--dry-run'], {
    stdin: nonTtyInput(), stdout: stdout.stream, stderr: stderr.stream, release,
  });
  assert.equal(status, 0);
  const envelope = JSON.parse(stdout.value());
  assert.equal(envelope.plan.status, 'READY');
  assert.match(envelope.planSha256, /^[0-9a-f]{64}$/);
  assert.deepEqual(await treeSnapshot(target), beforeTree);
  assert.equal(stderr.value(), '');
});

test('non-TTY requires explicit confirmation after the plan; --yes applies it', async (t) => {
  const declined = await targetFixture(t);
  const declinedOut = captureStream();
  assert.equal(await main(['install', '--target', declined.target], {
    stdin: nonTtyInput(), stdout: declinedOut.stream, stderr: captureStream().stream, release,
  }), 3);
  assert.equal(await readFile(path.join(declined.target, '.oh-my-harness/install-state.json')).catch(() => null), null);
  assert.equal(JSON.parse(declinedOut.value()).plan.status, 'READY');

  const accepted = await targetFixture(t);
  const acceptedOut = captureStream();
  assert.equal(await main(['install', '--target', accepted.target, '--yes'], {
    stdin: nonTtyInput(), stdout: acceptedOut.stream, stderr: captureStream().stream, release,
  }), 0);
  assert.match(acceptedOut.value(), /"status": "READY"/);
  assert.match(acceptedOut.value(), /"success": true/);
  assert(await readFile(path.join(accepted.target, '.oh-my-harness/install-state.json')));
});

test('TTY receives exactly one yes/no prompt and decline does not write', async (t) => {
  const { target } = await targetFixture(t);
  const stdout = captureStream();
  const status = await main(['install', '--target', target], {
    stdin: ttyInput('no\n'), stdout: stdout.stream, stderr: captureStream().stream, release,
  });
  assert.equal(status, 3);
  assert.equal((stdout.value().match(/Apply this exact/g) ?? []).length, 1);
  assert.equal(await readFile(path.join(target, '.oh-my-harness/install-state.json')).catch(() => null), null);

  const accepted = await targetFixture(t);
  const acceptedOut = captureStream();
  assert.equal(await main(['install', '--target', accepted.target], {
    stdin: ttyInput('yes\n'), stdout: acceptedOut.stream, stderr: captureStream().stream, release,
  }), 0);
  assert.equal((acceptedOut.value().match(/Apply this exact/g) ?? []).length, 1);
  assert(await readFile(path.join(accepted.target, '.oh-my-harness/install-state.json')));
});

test('--yes cannot bypass damaged markers and --force is a usage failure', async (t) => {
  const { target } = await targetFixture(t, '<!-- oh-my-harness:start -->\n');
  const before = await treeSnapshot(target);
  const conflictOut = captureStream();
  assert.equal(await main(['install', '--target', target, '--yes'], {
    stdin: nonTtyInput(), stdout: conflictOut.stream, stderr: captureStream().stream, release,
  }), 4);
  assert.deepEqual(await treeSnapshot(target), before);
  const forceError = captureStream();
  assert.equal(await main(['install', '--target', target, '--force'], {
    stdin: nonTtyInput(), stdout: captureStream().stream, stderr: forceError.stream, release,
  }), 2);
  assert.match(forceError.value(), /^usage:/);
});

test('identical target state produces byte-identical canonical plan envelopes', async (t) => {
  const first = await targetFixture(t, 'same\n');
  const second = await targetFixture(t, 'same\n');
  const run = async (target) => {
    const output = captureStream();
    const status = await main(['install', '--target', target, '--dry-run'], {
      stdin: nonTtyInput(), stdout: output.stream, stderr: captureStream().stream, release,
    });
    assert.equal(status, 0);
    const value = JSON.parse(output.value());
    delete value.plan.gitOverlap.evidence;
    return value;
  };
  const left = await run(first.target);
  const right = await run(second.target);
  assert.deepEqual(left.plan, right.plan);
  assert.equal(left.planSha256, right.planSha256);
});

test('package and lock metadata exactly bind the scoped identity, binary, engine, files, and single validator entry', async () => {
  const metadata = JSON.parse(await readFile(path.join(ROOT, 'package.json'), 'utf8'));
  const lock = JSON.parse(await readFile(path.join(ROOT, 'package-lock.json'), 'utf8'));
  assert.equal(metadata.name, '@guoxiaoshuai2023/oh-my-harness');
  assert.equal(metadata.version, '0.1.0');
  assert.equal(metadata.type, 'module');
  assert.equal(metadata.license, 'Apache-2.0');
  assert.deepEqual(metadata.engines, { node: '>=24 <25' });
  assert.deepEqual(metadata.bin, { 'oh-my-harness': 'bin/oh-my-harness.mjs' });
  assert.deepEqual(metadata.files, ['bin/oh-my-harness.mjs', 'src/installer/**', 'dist/**', 'README.md', 'package.json', 'LICENSE']);
  assert.equal(metadata.scripts.prepack, 'node src/installer/package-bundle.mjs prepare --pack-root "$OH_MY_HARNESS_PACK_ROOT"');
  assert.equal(metadata.scripts['validate:package'], 'node test/lifecycle/package-validation.mjs');
  assert.equal(Object.keys(metadata.scripts).filter((name) => name.includes('validate')).length, 1);
  assert.equal(metadata.dependencies, undefined);
  assert.equal(metadata.devDependencies, undefined);
  assert.equal(lock.packages[''].name, metadata.name);
  assert.equal(lock.packages[''].license, metadata.license);
  assert.deepEqual(lock.packages[''].bin, metadata.bin);
  assert.deepEqual(lock.packages[''].engines, metadata.engines);
  assert.deepEqual(CONFLICT_CODES, [
    'UNMANAGED_NAMESPACE', 'UNOWNED_DESTINATION', 'INVALID_MANAGED_MARKER',
    'UNVERIFIABLE_INSTALL_STATE', 'INCOMPATIBLE_INSTALLATION', 'DIRTY_OVERLAP',
    'UNSAFE_PATH', 'TARGET_CHANGED', 'IO_UNAVAILABLE',
  ]);
});

test('package validator preserves primary child status and cleanup status cannot mask it', async () => {
  assert.equal(chooseValidationExit(7, false), 7);
  assert.equal(chooseValidationExit(7, true), 7);
  assert.equal(chooseValidationExit(0, true), 1);
  const child = spawnSync(process.execPath, [path.join(ROOT, 'test/lifecycle/package-validation.mjs')], {
    cwd: ROOT, encoding: 'utf8', env: {
      PATH: process.env.PATH, TMPDIR: os.tmpdir(), OH_MY_HARNESS_TEST_CHILD_STATUS: '7',
    },
  });
  assert.equal(child.status, 7);
  const result = JSON.parse(child.stdout.trim());
  assert.equal(result.primaryStatus, 7);
  assert.equal(result.cleanupFailed, false);
});
