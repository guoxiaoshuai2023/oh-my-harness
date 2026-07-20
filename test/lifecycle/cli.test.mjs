import assert from 'node:assert/strict';
import { after, before, test } from 'node:test';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { main, parseArguments } from '../../src/installer/cli.mjs';
import { applyLifecyclePlan, CONFLICT_CODES, createLifecyclePlan } from '../../src/installer/lifecycle.mjs';
import { preparePackage, loadReleaseBundle } from '../../src/installer/package-bundle.mjs';
import { captureStream, nonTtyInput, ROOT, targetFixture, treeSnapshot, ttyInput } from './test-helpers.mjs';
import { chooseValidationExit, validateArchiveMigrationSourceFixture } from './package-validation.mjs';
import { authenticPriorFixture } from '../support/t05-migration-fixtures.mjs';

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

test('CLI previews exact prior migration and reports bounded restart recovery without adding a recover command', async (t) => {
  const fixture = await authenticPriorFixture(t, { protectedContent: false });
  const before = await treeSnapshot(fixture.target);
  const preview = captureStream();
  assert.equal(await main(['update', '--target', fixture.target, '--dry-run'], {
    stdin: nonTtyInput(), stdout: preview.stream, stderr: captureStream().stream, release,
  }), 0);
  const envelope = JSON.parse(preview.value());
  assert.equal(envelope.plan.installedClass, 'prior-six-42');
  assert.equal(envelope.plan.recoveryAction, 'none');
  assert.equal(envelope.plan.creates.length, 8);
  assert.deepEqual(envelope.plan.removes, ['.oh-my-harness/templates/task-contract-template.md']);
  assert.deepEqual(await treeSnapshot(fixture.target), before);

  const planned = await createLifecyclePlan({ operation: 'update', target: fixture.target, release });
  const failingPath = planned.plan.replaces[Math.min(2, planned.plan.replaces.length - 1)];
  await assert.rejects(applyLifecyclePlan({
    planned, target: fixture.target, release, faults: [`payload-write:${failingPath}`, 'rollback-start'],
  }));
  const recoveryPreview = captureStream();
  assert.equal(await main(['update', '--target', fixture.target, '--dry-run'], {
    stdin: nonTtyInput(), stdout: recoveryPreview.stream, stderr: captureStream().stream, release,
  }), 0);
  assert.equal(JSON.parse(recoveryPreview.value()).plan.recoveryAction, 'restore-prior');
  const recoveredOut = captureStream();
  assert.equal(await main(['update', '--target', fixture.target, '--yes'], {
    stdin: nonTtyInput(), stdout: recoveredOut.stream, stderr: captureStream().stream, release,
  }), 0);
  assert.match(recoveredOut.value(), /"recoveryAction": "restore-prior"/);
  assert.match(recoveredOut.value(), /"recoveryOutcome": "prior-restored"/);
  assert.match(recoveredOut.value(), /"updateApplied": false/);
  assert.throws(() => parseArguments(['recover', '--target', fixture.target]), /usage/);
});

test('scripts-enabled local archive migrates authentic prior state, no-ops, uninstalls, and preserves protected fixture bytes', async () => {
  const evidence = await validateArchiveMigrationSourceFixture();
  assert.equal(evidence.priorRevision, 'e51d1fbf7a1b9475ac27aa6025542fb12b3bfb7c');
  assert.equal(evidence.priorInventorySha256, 'e83fd6f8a226206d3b1b1e4c48463e4d738d32d98349944225e074975bed8bcb');
  assert.equal(evidence.previewCreates, 8);
  assert.deepEqual(evidence.previewRemoves, ['.oh-my-harness/templates/task-contract-template.md']);
  assert.equal(evidence.updateStatus, 0);
  assert.equal(evidence.noOpStatus, 0);
  assert.equal(evidence.uninstallStatus, 0);
  assert.match(evidence.protectedManifestSha256, /^[0-9a-f]{64}$/);
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
    'PRIOR_IDENTITY_MISMATCH', 'OWNED_DRIFT', 'MISSING_OWNED_SURFACE',
    'RECOVERY_IDENTITY_MISMATCH', 'RECOVERY_AMBIGUOUS', 'RECOVERY_REQUIRED',
    'UNSAFE_PATH', 'TARGET_CHANGED', 'IO_UNAVAILABLE',
  ]);
});

test('package validator preserves primary child status and cleanup status cannot mask it', async () => {
  assert.equal(chooseValidationExit(7, false), 7);
  assert.equal(chooseValidationExit(7, true), 7);
  assert.equal(chooseValidationExit(0, true), 1);
  const receiptPath = process.env.OH_MY_HARNESS_SOURCE_GATE_RECEIPT;
  const receiptSha256 = process.env.OH_MY_HARNESS_SOURCE_GATE_RECEIPT_SHA256;
  assert.equal(typeof receiptPath, 'string', 'parent source-gate receipt path is required');
  assert.equal(path.isAbsolute(receiptPath), true, 'parent source-gate receipt path must be absolute');
  assert.match(receiptSha256 ?? '', /^[0-9a-f]{64}$/, 'parent source-gate receipt SHA-256 is required');
  const childEnvironment = {
    PATH: process.env.PATH,
    TMPDIR: os.tmpdir(),
    OH_MY_HARNESS_SOURCE_GATE_RECEIPT: receiptPath,
    OH_MY_HARNESS_SOURCE_GATE_RECEIPT_SHA256: receiptSha256,
    OH_MY_HARNESS_TEST_CHILD_STATUS: '7',
  };
  const spawnValidator = (env) => spawnSync(
    process.execPath,
    [path.join(ROOT, 'test/lifecycle/package-validation.mjs')],
    { cwd: ROOT, encoding: 'utf8', env },
  );
  const child = spawnValidator(childEnvironment);
  assert.equal(child.status, 7);
  const result = JSON.parse(child.stdout.trim());
  assert.equal(result.primaryStatus, 7);
  assert.equal(result.cleanupFailed, false);

  const missingReceiptPath = { ...childEnvironment };
  delete missingReceiptPath.OH_MY_HARNESS_SOURCE_GATE_RECEIPT;
  const missingReceiptHash = { ...childEnvironment };
  delete missingReceiptHash.OH_MY_HARNESS_SOURCE_GATE_RECEIPT_SHA256;
  for (const [name, env, expected] of [
    ['missing receipt path', missingReceiptPath, /exact main-bound terminal source-gate receipt/],
    ['missing receipt hash', missingReceiptHash, /exact main-bound terminal source-gate receipt/],
    ['malformed receipt hash', { ...childEnvironment, OH_MY_HARNESS_SOURCE_GATE_RECEIPT_SHA256: 'not-a-sha256' }, /receipt identity is malformed/],
  ]) {
    const rejected = spawnValidator(env);
    assert.equal(rejected.status, 1, name);
    assert.match(rejected.stderr, expected, name);
    assert.doesNotMatch(rejected.stdout, /"primaryStatus":7/, name);
  }
});
