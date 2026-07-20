import { constants as fsConstants, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { gunzipSync } from 'node:zlib';
import {
  cp, lstat, mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { validateReleaseContents } from '../../src/installer/package-bundle.mjs';
import { verifyTerminalSourceGate } from '../../tools/validate-release.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const EXPECTED_CHILDREN = ['archive', 'cache', 'fixtures', 'home', 'logs', 'package', 'tmp', 'xdg'];
const PRIOR_REVISION = 'e51d1fbf7a1b9475ac27aa6025542fb12b3bfb7c';
const PRIOR_MAP_SHA256 = '38ac29aefb45a64749f27d76464b3cbb1bda221ea6882def195595828e695774';
const PRIOR_INVENTORY_SHA256 = 'e83fd6f8a226206d3b1b1e4c48463e4d738d32d98349944225e074975bed8bcb';

function hash(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function resolveExecutable(name) {
  for (const directory of (process.env.PATH ?? '').split(path.delimiter).filter(Boolean)) {
    const candidate = path.resolve(directory, name);
    try {
      const info = statSync(candidate);
      if (info?.isFile() && (info.mode & 0o111)) return candidate;
    } catch {}
  }
  throw new Error(`${name} executable is unavailable under the verified PATH`);
}

function repositoryStatus() {
  const gitExecutable = resolveExecutable('git');
  const environment = [
    `PATH=${path.dirname(gitExecutable)}:/usr/bin:/bin`, 'HOME=/nonexistent',
    'XDG_CONFIG_HOME=/nonexistent', 'GIT_CONFIG_GLOBAL=/dev/null',
    'GIT_CONFIG_SYSTEM=/dev/null', 'GIT_CONFIG_NOSYSTEM=1',
    'GIT_TERMINAL_PROMPT=0', 'GIT_PAGER=cat', 'GIT_OPTIONAL_LOCKS=0', 'LC_ALL=C',
  ];
  const child = spawnSync('/usr/bin/env', [
    '-i', ...environment, gitExecutable, '--no-optional-locks',
    '-c', 'core.hooksPath=/dev/null', '-c', 'core.fsmonitor=false',
    '-c', 'core.untrackedCache=false', '-c', 'submodule.recurse=false',
    '-c', 'status.submoduleSummary=false', 'status', '--porcelain=v1', '-uall',
  ], { cwd: ROOT, encoding: 'utf8', env: {} });
  if (child.status !== 0) throw new Error('repository status could not be captured');
  return child.stdout;
}

async function forbiddenRepositoryResidue() {
  const forbidden = ['dist'];
  const entries = await readdir(ROOT);
  for (const name of entries) {
    if (name.endsWith('.tgz') || name === '.npm' || name === 'npm-cache' || name.startsWith('npm-debug')) forbidden.push(name);
  }
  const present = [];
  for (const name of new Set(forbidden)) {
    try { await lstat(path.join(ROOT, name)); present.push(name); } catch (error) { if (error.code !== 'ENOENT') throw error; }
  }
  return present;
}

function isolatedEnvironment(root, npmExecutable, { ignoreInstallScripts = false } = {}) {
  const nodeDirectory = path.dirname(process.execPath);
  const npmDirectory = path.dirname(npmExecutable);
  const environment = {
    PATH: `${nodeDirectory}:${npmDirectory}:/usr/bin:/bin`,
    HOME: path.join(root, 'home'),
    XDG_CONFIG_HOME: path.join(root, 'xdg'),
    TMPDIR: path.join(root, 'tmp'),
    npm_config_userconfig: path.join(root, 'user.npmrc'),
    npm_config_globalconfig: path.join(root, 'global.npmrc'),
    npm_config_cache: path.join(root, 'cache'),
    npm_config_logs_dir: path.join(root, 'logs'),
    npm_config_tmp: path.join(root, 'tmp'),
    npm_config_offline: 'true',
    npm_config_audit: 'false',
    npm_config_fund: 'false',
    npm_config_update_notifier: 'false',
    npm_config_progress: 'false',
    npm_config_registry: 'http://127.0.0.1:9',
  };
  if (ignoreInstallScripts) environment.npm_config_ignore_scripts = 'true';
  return environment;
}

function spawnIsolated(executable, args, { cwd, environment }) {
  const assignments = Object.entries(environment).map(([key, value]) => `${key}=${value}`);
  const child = spawnSync('/usr/bin/env', ['-i', ...assignments, executable, ...args], {
    cwd, encoding: 'utf8', env: {}, maxBuffer: 20 * 1024 * 1024,
  });
  if (child.error || child.signal || child.status === null) {
    return { status: 1, stdout: child.stdout ?? '', stderr: child.stderr ?? '', detail: child.error?.message ?? child.signal ?? 'missing status' };
  }
  return { status: child.status, stdout: child.stdout, stderr: child.stderr, detail: null };
}

async function fileManifest(root, relativePaths) {
  const rows = [];
  for (const relativePath of [...relativePaths].sort()) {
    const bytes = await readFile(path.join(root, ...relativePath.split('/')));
    rows.push({ path: relativePath, sha256: hash(bytes) });
  }
  return rows;
}

function extractPriorSource(destination) {
  const gitExecutable = resolveExecutable('git');
  const archived = spawnSync(gitExecutable, ['archive', PRIOR_REVISION], {
    cwd: ROOT, env: { PATH: process.env.PATH }, maxBuffer: 32 * 1024 * 1024,
  });
  if (archived.status !== 0 || !Buffer.isBuffer(archived.stdout)) throw new Error('exact prior Git archive is unavailable');
  const extracted = spawnSync('/usr/bin/tar', ['-x', '-C', destination], {
    input: archived.stdout, env: { PATH: '/usr/bin:/bin' }, maxBuffer: 32 * 1024 * 1024,
  });
  if (extracted.status !== 0) throw new Error('exact prior Git archive could not be extracted');
}

function tarEntries(archiveBytes) {
  const bytes = gunzipSync(archiveBytes);
  const entries = new Map();
  let offset = 0;
  while (offset + 512 <= bytes.length) {
    const header = bytes.subarray(offset, offset + 512);
    if (header.every((value) => value === 0)) break;
    const text = (start, length) => header.subarray(start, start + length).toString('utf8').replace(/\0.*$/s, '');
    const name = text(0, 100);
    const prefix = text(345, 155);
    const fullName = prefix ? `${prefix}/${name}` : name;
    const sizeText = text(124, 12).trim();
    const size = sizeText ? Number.parseInt(sizeText, 8) : 0;
    const type = String.fromCharCode(header[156] || 0x30);
    if (!Number.isSafeInteger(size) || size < 0 || entries.has(fullName)) throw new Error('archive has malformed or duplicate tar entries');
    const contentStart = offset + 512;
    const contentEnd = contentStart + size;
    if (contentEnd > bytes.length) throw new Error('archive tar entry exceeds archive bounds');
    if (type === '0' || type === '\0') entries.set(fullName, bytes.subarray(contentStart, contentEnd));
    else if (type !== '5') throw new Error(`archive contains unsupported entry type at ${fullName}`);
    offset = contentStart + Math.ceil(size / 512) * 512;
  }
  return entries;
}

async function stageFile(packageRoot, relativePath) {
  const destination = path.join(packageRoot, ...relativePath.split('/'));
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(path.join(ROOT, ...relativePath.split('/')), destination, { errorOnExist: true, force: false });
}

async function stagePackage(packageRoot) {
  await cp(path.join(ROOT, 'bin'), path.join(packageRoot, 'bin'), { recursive: true, errorOnExist: true, force: false });
  await mkdir(path.join(packageRoot, 'src'));
  await cp(path.join(ROOT, 'src/installer'), path.join(packageRoot, 'src/installer'), { recursive: true, errorOnExist: true, force: false });
  await cp(path.join(ROOT, 'src/bundle'), path.join(packageRoot, 'src/bundle'), { recursive: true, errorOnExist: true, force: false });
  const bundleMap = JSON.parse(await readFile(path.join(ROOT, 'packaging/bundle-map.json'), 'utf8'));
  const sourceFiles = new Set([
    'AGENTS.md', 'LICENSE', 'package.json', 'packaging/bundle-map.json', 'packaging/managed-router-block.md',
    'packaging/package-contract.json', 'packaging/schemas/bundle-inventory.schema.json',
    'packaging/schemas/package-contract.schema.json',
    ...bundleMap.entries.map((entry) => entry.source),
  ]);
  for (const relativePath of [...sourceFiles].sort()) await stageFile(packageRoot, relativePath);
}

async function expectedArchivePaths(packageRoot, release) {
  const installer = (await readdir(path.join(packageRoot, 'src/installer'))).sort();
  return new Set([
    'package/package.json', 'package/README.md', 'package/LICENSE', 'package/bin/oh-my-harness.mjs',
    ...installer.map((name) => `package/src/installer/${name}`),
    ...[...release.files.keys()].map((name) => `package/dist/${name}`),
  ]);
}

async function inspectArchive(archivePath, packageRoot) {
  const archive = tarEntries(await readFile(archivePath));
  const inventoryPath = 'package/dist/.oh-my-harness/bundle-inventory.json';
  const release = await validateReleaseContents({
    inventoryBytes: archive.get(inventoryPath),
    readPayload: async (relativePath) => archive.get(`package/dist/${relativePath}`) ?? null,
    packageVersion: '0.1.0',
  });
  if (release.inventory.requiredFiles.length !== 49
      || release.files.size !== 51
      || release.inventory.ownership.agentPaths.length !== 9
      || release.inventory.requiredFiles.filter(({ kind }) => kind === 'template').length !== 17
      || release.inventory.requiredFiles.some(({ assetId }) => assetId === 'template/task-contract')) {
    throw new Error('packed release does not match the exact current 9/17/49/51 release contract');
  }
  const expected = await expectedArchivePaths(packageRoot, release);
  assertSetEqual(new Set(archive.keys()), expected, 'archive allowlist');
  const metadata = JSON.parse(archive.get('package/package.json').toString('utf8'));
  if (metadata.name !== '@guoxiaoshuai2023/oh-my-harness' || metadata.version !== '0.1.0'
      || metadata.license !== 'Apache-2.0'
      || metadata.bin?.['oh-my-harness'] !== 'bin/oh-my-harness.mjs'
      || metadata.engines?.node !== '>=24 <25' || metadata.dependencies || metadata.devDependencies) {
    throw new Error('packed package metadata does not match the fixed contract');
  }
  if (!archive.get('package/LICENSE')?.equals(await readFile(path.join(packageRoot, 'LICENSE')))) {
    throw new Error('packed outer LICENSE does not match the staged Apache-2.0 license');
  }
  if (release.files.has('.oh-my-harness/LICENSE')) {
    throw new Error('outer npm LICENSE must not enter the installed Harness bundle');
  }
  if (metadata.scripts?.prepack !== 'node src/installer/package-bundle.mjs prepare --pack-root "$OH_MY_HARNESS_PACK_ROOT"'
      || metadata.scripts?.postpack !== 'node src/installer/package-bundle.mjs cleanup'
      || metadata.scripts?.['validate:package'] !== 'node test/lifecycle/package-validation.mjs') {
    throw new Error('packed package lifecycle metadata does not match the fixed contract');
  }
  for (const [relativePath, bytes] of release.files) {
    const packed = archive.get(`package/dist/${relativePath}`);
    if (!packed || hash(packed) !== hash(bytes)) throw new Error(`packed release hash mismatch: ${relativePath}`);
  }
  for (const [name, bytes] of archive) {
    const text = bytes.toString('utf8');
    if (text.includes(ROOT) || name.includes('task-docs/') || name.includes('/test/')
        || name.includes('install-state.json') || name.includes('.oh-my-harness-backups')) {
      throw new Error(`forbidden package content: ${name}`);
    }
    if (name.startsWith('package/src/installer/')) {
      if (/from\s+['"](?!node:|\.\.?\/)/.test(text) || /python/i.test(text)) {
        throw new Error(`installer runtime boundary violation: ${name}`);
      }
    }
  }
  return { archive, release, expected };
}

function parsePackJson(stdout, label) {
  let value;
  try {
    value = JSON.parse(stdout);
  } catch {
    throw new Error(`${label} did not return JSON metadata`);
  }
  if (!Array.isArray(value) || value.length !== 1 || !Array.isArray(value[0].files)) {
    throw new Error(`${label} returned an unexpected metadata shape`);
  }
  return value[0];
}

function packPaths(metadata) {
  return new Set(metadata.files.map((item) => item.path));
}

function expectedPackPaths(expectedArchivePaths) {
  return new Set([...expectedArchivePaths].map((item) => item.slice('package/'.length)));
}

async function assertPackCleanup(packageRoot) {
  if ((await lstat(path.join(packageRoot, 'dist')).then(() => true).catch((error) => {
    if (error.code === 'ENOENT') return false;
    throw error;
  }))) throw new Error('standard package lifecycle retained generated dist output');
  const archives = (await readdir(packageRoot)).filter((name) => name.endsWith('.tgz'));
  if (archives.length) throw new Error('standard package lifecycle wrote an archive into package source');
}

function comparablePackMetadata(metadata) {
  return {
    id: metadata.id, name: metadata.name, version: metadata.version, filename: metadata.filename,
    size: metadata.size, unpackedSize: metadata.unpackedSize, shasum: metadata.shasum,
    integrity: metadata.integrity, files: metadata.files,
  };
}

function assertSetEqual(actual, expected, label) {
  const extra = [...actual].filter((item) => !expected.has(item));
  const missing = [...expected].filter((item) => !actual.has(item));
  if (extra.length || missing.length) throw new Error(`${label} mismatch; extra=${extra.join(',')} missing=${missing.join(',')}`);
}

async function localArchiveSmoke({ npxExecutable, archivePath, fixtures, environment }) {
  const target = path.join(fixtures, 'target');
  await mkdir(target);
  const statuses = [];
  const operations = ['install', 'install', 'update', 'uninstall'];
  for (const [index, operation] of operations.entries()) {
    const child = spawnIsolated(npxExecutable, [
      '--yes', '--offline', `--package=${archivePath}`, 'oh-my-harness', operation, '--target', target, '--yes',
    ], { cwd: fixtures, environment });
    statuses.push({ operation, status: child.status });
    if (child.status !== 0) {
      const error = new Error(`local archive ${operation} failed with status ${child.status}`);
      error.childStatus = child.status;
      throw error;
    }
    if (!child.stdout.includes('"plan"')) throw new Error(`local archive ${operation} did not print a plan`);
    if ((index === 1 || index === 2) && !child.stdout.includes('"status": "NO_OP"')) {
      throw new Error(`local archive ${operation} did not prove same-version no-op`);
    }
  }
  if (await readFile(path.join(target, '.oh-my-harness/install-state.json')).then(() => true).catch(() => false)) {
    throw new Error('local archive uninstall retained install state');
  }
  return statuses;
}

async function localArchiveMigrationSmoke({ npxExecutable, archivePath, archiveRelease, fixtures, environment }) {
  const priorSource = path.join(fixtures, 'prior-source');
  const target = path.join(fixtures, 'prior-target');
  await mkdir(priorSource);
  await mkdir(target);
  extractPriorSource(priorSource);
  if (hash(await readFile(path.join(priorSource, 'packaging/bundle-map.json'))) !== PRIOR_MAP_SHA256) {
    throw new Error('exact prior map identity changed');
  }
  const priorBuild = spawnIsolated(process.execPath, [
    path.join(priorSource, 'src/installer/package-bundle.mjs'), 'prepare', '--pack-root', priorSource,
  ], { cwd: priorSource, environment });
  if (priorBuild.status !== 0) throw new Error(`exact prior package build failed with status ${priorBuild.status}`);
  const priorInventoryPath = path.join(priorSource, 'dist/.oh-my-harness/bundle-inventory.json');
  if (hash(await readFile(priorInventoryPath)) !== PRIOR_INVENTORY_SHA256) {
    throw new Error('exact prior inventory identity changed');
  }
  await writeFile(path.join(target, 'AGENTS.md'), 'synthetic archive outer router\r\n');
  const priorInstall = spawnIsolated(process.execPath, [
    path.join(priorSource, 'bin/oh-my-harness.mjs'), 'install', '--target', target, '--yes',
  ], { cwd: fixtures, environment });
  if (priorInstall.status !== 0) throw new Error(`exact prior install failed with status ${priorInstall.status}`);

  await writeFile(path.join(target, 'unowned-target.txt'), 'synthetic unowned archive fixture\n');
  await mkdir(path.join(target, '.oh-my-harness-backups/pre-existing'), { recursive: true });
  await writeFile(path.join(target, '.oh-my-harness-backups/pre-existing/opaque.bin'), Buffer.from([0, 2, 4, 255]));
  await mkdir(path.join(target, 'task-docs/history/synthetic-old-run'), { recursive: true });
  await writeFile(path.join(target, 'task-docs/history/synthetic-old-run/ACCEPTED_CONTRACT.md'), 'synthetic historical contract\n');
  await mkdir(path.join(target, 'task-docs/cases'), { recursive: true });
  await writeFile(path.join(target, 'task-docs/cases/synthetic-case.md'), 'synthetic central case\n');
  const protectedPaths = [
    'unowned-target.txt', '.oh-my-harness-backups/pre-existing/opaque.bin',
    'task-docs/history/synthetic-old-run/ACCEPTED_CONTRACT.md', 'task-docs/cases/synthetic-case.md',
  ];
  const protectedBefore = await fileManifest(target, protectedPaths);
  const invoke = (operation, extra = []) => spawnIsolated(npxExecutable, [
    '--yes', '--offline', `--package=${archivePath}`, 'oh-my-harness', operation,
    '--target', target, ...extra,
  ], { cwd: fixtures, environment });

  const preview = invoke('update', ['--dry-run']);
  if (preview.status !== 0) throw new Error(`archive prior migration preview failed with status ${preview.status}`);
  const previewPlan = JSON.parse(preview.stdout).plan;
  if (previewPlan.installedClass !== 'prior-six-42' || previewPlan.creates.length !== 8
      || JSON.stringify(previewPlan.removes) !== JSON.stringify(['.oh-my-harness/templates/task-contract-template.md'])
      || previewPlan.recoveryAction !== 'none') {
    throw new Error('archive prior migration preview did not expose the exact transition');
  }
  if (JSON.stringify(await fileManifest(target, protectedPaths)) !== JSON.stringify(protectedBefore)) {
    throw new Error('archive prior migration preview changed protected bytes');
  }

  const update = invoke('update', ['--yes']);
  if (update.status !== 0 || !update.stdout.includes('"success": true')) {
    throw new Error(`archive prior migration failed with status ${update.status}`);
  }
  for (const [relativePath, bytes] of archiveRelease.files) {
    if (!bytes.equals(await readFile(path.join(target, ...relativePath.split('/'))))) {
      throw new Error(`archive migration target mismatch: ${relativePath}`);
    }
  }
  if (await readFile(path.join(target, '.oh-my-harness/templates/task-contract-template.md')).then(() => true).catch(() => false)) {
    throw new Error('archive migration retained the obsolete Contract runtime template');
  }
  if (JSON.stringify(await fileManifest(target, protectedPaths)) !== JSON.stringify(protectedBefore)) {
    throw new Error('archive migration changed protected bytes');
  }

  const noOp = invoke('update', ['--yes']);
  if (noOp.status !== 0 || !noOp.stdout.includes('"status": "NO_OP"')) {
    throw new Error('archive migration same-release update was not an exact no-op');
  }
  const uninstall = invoke('uninstall', ['--yes']);
  if (uninstall.status !== 0 || !uninstall.stdout.includes('"success": true')) {
    throw new Error(`archive migrated uninstall failed with status ${uninstall.status}`);
  }
  if (await readFile(path.join(target, '.oh-my-harness/install-state.json')).then(() => true).catch(() => false)) {
    throw new Error('archive migrated uninstall retained state');
  }
  for (const relativePath of archiveRelease.files.keys()) {
    if (await readFile(path.join(target, ...relativePath.split('/'))).then(() => true).catch(() => false)) {
      throw new Error(`archive migrated uninstall retained owned payload: ${relativePath}`);
    }
  }
  if (JSON.stringify(await fileManifest(target, protectedPaths)) !== JSON.stringify(protectedBefore)) {
    throw new Error('archive migrated uninstall changed protected bytes');
  }
  return {
    priorRevision: PRIOR_REVISION,
    priorMapSha256: PRIOR_MAP_SHA256,
    priorInventorySha256: PRIOR_INVENTORY_SHA256,
    previewCreates: previewPlan.creates.length,
    previewRemoves: previewPlan.removes,
    protectedManifestSha256: hash(Buffer.from(JSON.stringify(protectedBefore))),
    updateStatus: update.status,
    noOpStatus: noOp.status,
    uninstallStatus: uninstall.status,
  };
}

export async function validateArchiveMigrationSourceFixture() {
  if (process.version !== 'v24.14.0') throw new Error(`archive migration source fixture requires frozen Node v24.14.0, got ${process.version}`);
  const root = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-t05-archive-source-'));
  const rootReal = await realpath(root);
  try {
    for (const child of ['archive', 'cache', 'fixtures', 'home', 'logs', 'tmp', 'xdg']) await mkdir(path.join(rootReal, child));
    await writeFile(path.join(rootReal, 'user.npmrc'), '', { flag: 'wx', mode: 0o600 });
    await writeFile(path.join(rootReal, 'global.npmrc'), '', { flag: 'wx', mode: 0o600 });
    const packageRoot = path.join(rootReal, 'package');
    await stagePackage(packageRoot);
    const npmExecutable = resolveExecutable('npm');
    const npxExecutable = resolveExecutable('npx');
    const environment = isolatedEnvironment(rootReal, npmExecutable);
    const packed = spawnIsolated(npmExecutable, ['pack', '--json', '--pack-destination', path.join(rootReal, 'archive')], {
      cwd: packageRoot, environment,
    });
    if (packed.status !== 0) throw new Error(`source-fixture npm pack failed with status ${packed.status}`);
    const metadata = parsePackJson(packed.stdout, 'source-fixture npm pack');
    await assertPackCleanup(packageRoot);
    const archivePath = path.join(rootReal, 'archive', metadata.filename);
    const inspected = await inspectArchive(archivePath, packageRoot);
    const installEnvironment = isolatedEnvironment(rootReal, npmExecutable, { ignoreInstallScripts: true });
    return await localArchiveMigrationSmoke({
      npxExecutable, archivePath, archiveRelease: inspected.release,
      fixtures: path.join(rootReal, 'fixtures'), environment: installEnvironment,
    });
  } finally {
    await rm(rootReal, { recursive: true, force: false });
  }
}

export function chooseValidationExit(primaryStatus, cleanupFailed) {
  return primaryStatus !== 0 ? primaryStatus : cleanupFailed ? 1 : 0;
}

export async function validatePackage() {
  if (process.version !== 'v24.14.0') throw new Error(`package validation requires frozen Node v24.14.0, got ${process.version}`);
  const sourceGate = await verifyTerminalSourceGate();
  const beforeStatus = repositoryStatus();
  const beforeResidue = await forbiddenRepositoryResidue();
  if (beforeResidue.length) throw new Error(`forbidden repository residue exists before validation: ${beforeResidue.join(', ')}`);
  const root = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-package-validation-'));
  const rootReal = await realpath(root);
  const ownershipToken = hash(Buffer.from(rootReal)).slice(0, 24);
  let primaryStatus = 0;
  let cleanupFailed = false;
  let evidence = null;
  try {
    for (const child of EXPECTED_CHILDREN) await mkdir(path.join(rootReal, child));
    await writeFile(path.join(rootReal, 'user.npmrc'), '', { flag: 'wx', mode: 0o600 });
    await writeFile(path.join(rootReal, 'global.npmrc'), '', { flag: 'wx', mode: 0o600 });
    const packageRoot = path.join(rootReal, 'package');
    const archiveRoot = path.join(rootReal, 'archive');
    await stagePackage(packageRoot);
    const npmExecutable = resolveExecutable('npm');
    const npxExecutable = resolveExecutable('npx');
    const environment = isolatedEnvironment(rootReal, npmExecutable);
    if (Object.hasOwn(environment, 'npm_config_ignore_scripts')
        || Object.hasOwn(environment, 'OH_MY_HARNESS_PACK_ROOT')) {
      throw new Error('standard package lifecycle environment is not scripts-enabled and private-variable-free');
    }

    const injectedStatus = Number.parseInt(process.env.OH_MY_HARNESS_TEST_CHILD_STATUS ?? '0', 10);
    if (injectedStatus > 0) {
      const injected = spawnIsolated(process.execPath, ['-e', `process.exit(${injectedStatus})`], { cwd: rootReal, environment });
      primaryStatus = injected.status;
    }

    let dryRunMetadata = null;
    let archivePath = null;
    if (primaryStatus === 0) {
      const dryRun = spawnIsolated(npmExecutable, ['pack', '--dry-run', '--json'], {
        cwd: packageRoot, environment,
      });
      if (dryRun.status !== 0) primaryStatus = dryRun.status;
      else try {
        dryRunMetadata = parsePackJson(dryRun.stdout, 'npm pack --dry-run --json');
        await assertPackCleanup(packageRoot);
        if ((await readdir(archiveRoot)).length !== 0) throw new Error('pack dry-run wrote an archive');
      } catch {
        primaryStatus = 1;
      }
    }

    let archiveEvidence = null;
    let archiveRelease = null;
    if (primaryStatus === 0) {
      const firstPack = spawnIsolated(npmExecutable, [
        'pack', '--json', '--pack-destination', archiveRoot,
      ], { cwd: packageRoot, environment });
      if (firstPack.status !== 0) primaryStatus = firstPack.status;
      else try {
        const firstMetadata = parsePackJson(firstPack.stdout, 'npm pack --json');
        await assertPackCleanup(packageRoot);
        const archives = (await readdir(archiveRoot)).filter((name) => name.endsWith('.tgz'));
        if (archives.length !== 1) throw new Error('real pack did not create exactly one archive');
        archivePath = path.join(archiveRoot, archives[0]);
        const firstInspected = await inspectArchive(archivePath, packageRoot);
        const expectedPaths = expectedPackPaths(firstInspected.expected);
        assertSetEqual(packPaths(dryRunMetadata), expectedPaths, 'dry-run package allowlist');
        assertSetEqual(packPaths(firstMetadata), expectedPaths, 'real package allowlist');
        if (JSON.stringify(comparablePackMetadata(dryRunMetadata))
            !== JSON.stringify(comparablePackMetadata(firstMetadata))) {
          throw new Error('dry-run and real pack metadata are not deterministic');
        }
        const firstHash = hash(await readFile(archivePath));
        await rm(archivePath, { force: false });
        if ((await readdir(archiveRoot)).length !== 0) throw new Error('first deterministic archive cleanup failed');

        const secondPack = spawnIsolated(npmExecutable, [
          'pack', '--json', '--pack-destination', archiveRoot,
        ], { cwd: packageRoot, environment });
        if (secondPack.status !== 0) {
          primaryStatus = secondPack.status;
        } else {
          const secondMetadata = parsePackJson(secondPack.stdout, 'repeated npm pack --json');
          await assertPackCleanup(packageRoot);
          const repeatedArchives = (await readdir(archiveRoot)).filter((name) => name.endsWith('.tgz'));
          if (repeatedArchives.length !== 1) throw new Error('repeated pack did not create exactly one archive');
          archivePath = path.join(archiveRoot, repeatedArchives[0]);
          const secondInspected = await inspectArchive(archivePath, packageRoot);
          archiveRelease = secondInspected.release;
          assertSetEqual(secondInspected.expected, firstInspected.expected, 'repeated archive allowlist');
          if (JSON.stringify(comparablePackMetadata(secondMetadata))
              !== JSON.stringify(comparablePackMetadata(firstMetadata))) {
            throw new Error('repeated pack metadata is not deterministic');
          }
          const secondHash = hash(await readFile(archivePath));
          if (secondHash !== firstHash) throw new Error('repeated package archive bytes are not deterministic');
          archiveEvidence = {
            fileCount: secondInspected.archive.size,
            sha256: secondHash,
            repeatedSha256: firstHash,
            dryRunFileCount: dryRunMetadata.files.length,
            scriptsEnabled: true,
            privatePackRootProvided: false,
          };
        }
      } catch {
        if (primaryStatus === 0) primaryStatus = 1;
      }
    }

    if (primaryStatus === 0 && !archiveEvidence) primaryStatus = 1;

    let smoke = null;
    if (primaryStatus === 0) {
      try {
        const installEnvironment = isolatedEnvironment(rootReal, npmExecutable, { ignoreInstallScripts: true });
        smoke = await localArchiveSmoke({
          npxExecutable, archivePath, fixtures: path.join(rootReal, 'fixtures'), environment: installEnvironment,
        });
      } catch (error) {
        primaryStatus = Number.isInteger(error.childStatus) && error.childStatus !== 0 ? error.childStatus : 1;
      }
    }

    let migrationSmoke = null;
    if (primaryStatus === 0) {
      try {
        const installEnvironment = isolatedEnvironment(rootReal, npmExecutable, { ignoreInstallScripts: true });
        migrationSmoke = await localArchiveMigrationSmoke({
          npxExecutable, archivePath, archiveRelease,
          fixtures: path.join(rootReal, 'fixtures'), environment: installEnvironment,
        });
      } catch (error) {
        primaryStatus = Number.isInteger(error.childStatus) && error.childStatus !== 0 ? error.childStatus : 1;
      }
    }

    if (repositoryStatus() !== beforeStatus || (await forbiddenRepositoryResidue()).length) {
      if (primaryStatus === 0) primaryStatus = 1;
    }
    evidence = { rootReal, ownershipToken, sourceGate, archive: archiveEvidence, smoke, migrationSmoke };
  } finally {
    try {
      if (await realpath(root) !== rootReal || !rootReal.startsWith(await realpath(os.tmpdir()))) throw new Error('temporary root identity changed');
      const children = (await readdir(rootReal)).sort();
      assertSetEqual(new Set(children), new Set([...EXPECTED_CHILDREN, 'global.npmrc', 'user.npmrc']), 'temporary child ownership');
      await rm(rootReal, { recursive: true, force: false });
      try { await lstat(rootReal); throw new Error('temporary root remains'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
    } catch {
      cleanupFailed = true;
    }
  }
  if (repositoryStatus() !== beforeStatus || (await forbiddenRepositoryResidue()).length) cleanupFailed = true;
  return { status: chooseValidationExit(primaryStatus, cleanupFailed), primaryStatus, cleanupFailed, evidence };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const result = await validatePackage();
    process.stdout.write(`${JSON.stringify(result)}\n`);
    process.exitCode = result.status;
  } catch (error) {
    process.stderr.write(`package validation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
