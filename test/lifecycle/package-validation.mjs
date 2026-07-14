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
import { loadReleaseBundle } from '../../src/installer/package-bundle.mjs';

const ROOT = fileURLToPath(new URL('../..', import.meta.url));
const EXPECTED_CHILDREN = ['archive', 'cache', 'fixtures', 'home', 'logs', 'package', 'tmp', 'xdg'];

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

function isolatedEnvironment(root, npmExecutable) {
  const nodeDirectory = path.dirname(process.execPath);
  const npmDirectory = path.dirname(npmExecutable);
  return {
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
    npm_config_ignore_scripts: 'true',
    npm_config_audit: 'false',
    npm_config_fund: 'false',
    npm_config_update_notifier: 'false',
    npm_config_progress: 'false',
    npm_config_registry: 'http://127.0.0.1:9',
  };
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

async function stagePackage(packageRoot) {
  await cp(path.join(ROOT, 'bin'), path.join(packageRoot, 'bin'), { recursive: true, errorOnExist: true, force: false });
  await mkdir(path.join(packageRoot, 'src'));
  await cp(path.join(ROOT, 'src/installer'), path.join(packageRoot, 'src/installer'), { recursive: true, errorOnExist: true, force: false });
  await cp(path.join(ROOT, 'README.md'), path.join(packageRoot, 'README.md'), { errorOnExist: true, force: false });
  await cp(path.join(ROOT, 'package.json'), path.join(packageRoot, 'package.json'), { errorOnExist: true, force: false });
}

async function expectedArchivePaths(packageRoot, release) {
  const installer = (await readdir(path.join(packageRoot, 'src/installer'))).sort();
  return new Set([
    'package/package.json', 'package/README.md', 'package/bin/oh-my-harness.mjs',
    ...installer.map((name) => `package/src/installer/${name}`),
    ...[...release.files.keys()].map((name) => `package/dist/${name}`),
  ]);
}

async function inspectArchive(archivePath, packageRoot) {
  const archive = tarEntries(await readFile(archivePath));
  const release = await loadReleaseBundle({ packageRoot, packageVersion: '0.1.0' });
  const expected = await expectedArchivePaths(packageRoot, release);
  assertSetEqual(new Set(archive.keys()), expected, 'archive allowlist');
  const metadata = JSON.parse(archive.get('package/package.json').toString('utf8'));
  if (metadata.name !== '@guoxiaoshuai2023/oh-my-harness' || metadata.version !== '0.1.0'
      || metadata.bin?.['oh-my-harness'] !== 'bin/oh-my-harness.mjs'
      || metadata.engines?.node !== '>=24 <25' || metadata.dependencies || metadata.devDependencies) {
    throw new Error('packed package metadata does not match the fixed contract');
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
  return { archive, release };
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

export function chooseValidationExit(primaryStatus, cleanupFailed) {
  return primaryStatus !== 0 ? primaryStatus : cleanupFailed ? 1 : 0;
}

export async function validatePackage() {
  if (process.version !== 'v24.14.0') throw new Error(`package validation requires frozen Node v24.14.0, got ${process.version}`);
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
    await stagePackage(path.join(rootReal, 'package'));
    const npmExecutable = resolveExecutable('npm');
    const npxExecutable = resolveExecutable('npx');
    const environment = isolatedEnvironment(rootReal, npmExecutable);

    const injectedStatus = Number.parseInt(process.env.OH_MY_HARNESS_TEST_CHILD_STATUS ?? '0', 10);
    if (injectedStatus > 0) {
      const injected = spawnIsolated(process.execPath, ['-e', `process.exit(${injectedStatus})`], { cwd: rootReal, environment });
      primaryStatus = injected.status;
    }

    if (primaryStatus === 0) {
      const prepare = spawnIsolated(process.execPath, [
        path.join(ROOT, 'src/installer/package-bundle.mjs'), 'prepare', '--pack-root', path.join(rootReal, 'package'),
      ], { cwd: ROOT, environment });
      if (prepare.status !== 0) primaryStatus = prepare.status;
    }

    let archivePath = null;
    if (primaryStatus === 0) {
      const pack = spawnIsolated(npmExecutable, [
        'pack', '--ignore-scripts', '--offline', '--json', '--pack-destination', path.join(rootReal, 'archive'),
      ], { cwd: path.join(rootReal, 'package'), environment });
      if (pack.status !== 0) primaryStatus = pack.status;
      else {
        const archives = (await readdir(path.join(rootReal, 'archive'))).filter((name) => name.endsWith('.tgz'));
        if (archives.length !== 1) primaryStatus = 1;
        else archivePath = path.join(rootReal, 'archive', archives[0]);
      }
    }

    let archiveEvidence = null;
    if (primaryStatus === 0) {
      try {
        const inspected = await inspectArchive(archivePath, path.join(rootReal, 'package'));
        archiveEvidence = { fileCount: inspected.archive.size, sha256: hash(await readFile(archivePath)) };
      } catch {
        primaryStatus = 1;
      }
    }

    let smoke = null;
    if (primaryStatus === 0) {
      try {
        smoke = await localArchiveSmoke({
          npxExecutable, archivePath, fixtures: path.join(rootReal, 'fixtures'), environment,
        });
      } catch (error) {
        primaryStatus = Number.isInteger(error.childStatus) && error.childStatus !== 0 ? error.childStatus : 1;
      }
    }

    if (repositoryStatus() !== beforeStatus || (await forbiddenRepositoryResidue()).length) {
      if (primaryStatus === 0) primaryStatus = 1;
    }
    evidence = { rootReal, ownershipToken, archive: archiveEvidence, smoke };
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
