import { constants as fsConstants } from 'node:fs';
import {
  access, chmod, copyFile, lstat, mkdir, mkdtemp, open, readFile, readdir, realpath,
  rename, rm, rmdir, unlink, writeFile,
} from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

let observer = null;

export function setFilesystemObserverForTests(nextObserver) {
  const previous = observer;
  observer = nextObserver;
  return () => { observer = previous; };
}

function observe(operation, safePath, detail = null) {
  observer?.({ operation, path: safePath, detail });
}

export function recordFilesystemEventForTests(operation, safePath, detail = null) {
  observe(operation, safePath, detail);
}

export class LifecycleError extends Error {
  constructor(message, { code = 'IO_UNAVAILABLE', exitCode = 5, safePath = null, report = null } = {}) {
    super(message);
    this.name = 'LifecycleError';
    this.code = code;
    this.exitCode = exitCode;
    this.safePath = safePath;
    this.report = report;
  }
}

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function sortedObject(value) {
  if (Array.isArray(value)) return value.map(sortedObject);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, sortedObject(value[key])]));
  }
  return value;
}

export function canonicalBytes(value) {
  return Buffer.from(`${JSON.stringify(sortedObject(value), null, 2)}\n`, 'utf8');
}

export function canonicalPreimageBytes(value) {
  const bytes = canonicalBytes(value);
  return bytes.subarray(0, bytes.length - 1);
}

export function byteCompare(left, right) {
  return Buffer.from(left).compare(Buffer.from(right));
}

export function assertSafeRelativePath(value, label = 'path') {
  if (typeof value !== 'string' || value.length === 0 || value.includes('\0')
      || value.includes('\\') || path.posix.isAbsolute(value)) {
    throw new LifecycleError(`${label} is not a normalized repository-relative path`, {
      code: 'UNSAFE_PATH', exitCode: 4, safePath: typeof value === 'string' ? value : null,
    });
  }
  if (value === '.' || path.posix.normalize(value) !== value || value.split('/').includes('..')) {
    throw new LifecycleError(`${label} is not a normalized repository-relative path`, {
      code: 'UNSAFE_PATH', exitCode: 4, safePath: value,
    });
  }
  return value;
}

export function containedPath(root, relativePath) {
  assertSafeRelativePath(relativePath);
  const resolved = path.resolve(root, ...relativePath.split('/'));
  const relative = path.relative(root, resolved);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new LifecycleError('path escapes the canonical target root', {
      code: 'UNSAFE_PATH', exitCode: 4, safePath: relativePath,
    });
  }
  return resolved;
}

export async function canonicalTarget(targetArgument) {
  let root;
  try {
    const initial = await lstat(targetArgument);
    if (!initial.isDirectory() || initial.isSymbolicLink()) throw new Error('target is not a regular directory');
    root = await realpath(targetArgument);
    const final = await lstat(root);
    if (!final.isDirectory() || final.isSymbolicLink()) throw new Error('target is not a regular directory');
  } catch (error) {
    throw new LifecycleError('target repository is unavailable or unsafe', { code: 'UNSAFE_PATH', exitCode: 4 });
  }
  return root;
}

export async function inspectContained(root, relativePath, { allowMissing = true, expect = null } = {}) {
  const absolute = containedPath(root, relativePath);
  const parts = relativePath.split('/');
  let current = root;
  for (let index = 0; index < parts.length; index += 1) {
    current = path.join(current, parts[index]);
    observe('lstat', parts.slice(0, index + 1).join('/'));
    let info;
    try {
      info = await lstat(current);
    } catch (error) {
      if (error.code === 'ENOENT' && allowMissing) return { type: 'absent', absolute };
      throw new LifecycleError('required path is unavailable', {
        code: 'IO_UNAVAILABLE', exitCode: 4, safePath: relativePath,
      });
    }
    const leaf = index === parts.length - 1;
    if (info.isSymbolicLink()) {
      throw new LifecycleError('path resolves through a symbolic link', {
        code: 'UNSAFE_PATH', exitCode: 4, safePath: relativePath,
      });
    }
    if (!leaf && !info.isDirectory()) {
      throw new LifecycleError('path has a non-directory parent', {
        code: 'UNSAFE_PATH', exitCode: 4, safePath: relativePath,
      });
    }
    if (leaf) {
      const type = info.isDirectory() ? 'directory' : info.isFile() ? 'file' : 'special';
      if (type === 'special' || (expect && expect !== type)) {
        throw new LifecycleError('path has an unsupported filesystem type', {
          code: 'UNSAFE_PATH', exitCode: 4, safePath: relativePath,
        });
      }
      return { type, absolute, mode: info.mode & 0o777 };
    }
  }
  throw new LifecycleError('path inspection failed', { safePath: relativePath });
}

export async function readContainedFile(root, relativePath) {
  const inspected = await inspectContained(root, relativePath, { allowMissing: false, expect: 'file' });
  let handle;
  try {
    observe('open-read', relativePath);
    handle = await open(inspected.absolute, fsConstants.O_RDONLY | (fsConstants.O_NOFOLLOW ?? 0));
    const info = await handle.stat();
    if (!info.isFile()) throw new Error('not a regular file');
    return await handle.readFile();
  } catch (error) {
    throw new LifecycleError('regular file could not be read safely', {
      code: 'IO_UNAVAILABLE', exitCode: 4, safePath: relativePath,
    });
  } finally {
    await handle?.close().catch(() => {});
  }
}

export async function fingerprintContained(root, relativePath) {
  const inspected = await inspectContained(root, relativePath);
  if (inspected.type === 'absent') return 'absent';
  if (inspected.type === 'file') return `file:${inspected.mode.toString(8)}:${sha256(await readContainedFile(root, relativePath))}`;
  return `${inspected.type}:${inspected.mode.toString(8)}`;
}

export async function ensureContainedParents(root, relativePath) {
  assertSafeRelativePath(relativePath);
  const parts = relativePath.split('/').slice(0, -1);
  let currentRelative = '';
  for (const part of parts) {
    currentRelative = currentRelative ? `${currentRelative}/${part}` : part;
    const inspected = await inspectContained(root, currentRelative);
    if (inspected.type === 'absent') {
      try {
        observe('mkdir', currentRelative);
        await mkdir(containedPath(root, currentRelative), { mode: 0o755 });
      } catch (error) {
        if (error.code !== 'EEXIST') {
          throw new LifecycleError('parent directory could not be created', { safePath: currentRelative });
        }
      }
      await inspectContained(root, currentRelative, { allowMissing: false, expect: 'directory' });
    } else if (inspected.type !== 'directory') {
      throw new LifecycleError('path has a non-directory parent', {
        code: 'UNSAFE_PATH', exitCode: 4, safePath: currentRelative,
      });
    }
  }
}

export function payloadTempPath(relativePath) {
  const directory = path.posix.dirname(relativePath);
  const basename = path.posix.basename(relativePath);
  return directory === '.' ? `.${basename}.oh-my-harness-tmp` : `${directory}/.${basename}.oh-my-harness-tmp`;
}

export async function writeAtomicContained(root, relativePath, bytes, {
  replace = false, mode = 0o644, exactTemp = null, onMutation = null,
} = {}) {
  assertSafeRelativePath(relativePath);
  await ensureContainedParents(root, relativePath);
  const before = await inspectContained(root, relativePath);
  if ((!replace && before.type !== 'absent') || (replace && before.type !== 'file')) {
    throw new LifecycleError('destination changed before write', {
      code: 'TARGET_CHANGED', exitCode: 4, safePath: relativePath,
    });
  }
  const tempRelative = exactTemp ?? payloadTempPath(relativePath);
  assertSafeRelativePath(tempRelative);
  const tempBefore = await inspectContained(root, tempRelative);
  if (tempBefore.type !== 'absent') {
    throw new LifecycleError('recognized temporary path already exists', {
      code: 'TARGET_CHANGED', exitCode: 4, safePath: tempRelative,
    });
  }
  const tempAbsolute = containedPath(root, tempRelative);
  let handle;
  try {
    observe('open-write-temp', tempRelative);
    handle = await open(tempAbsolute, 'wx', mode);
    await handle.writeFile(bytes);
    await handle.sync();
    await handle.close();
    handle = null;
    await chmod(tempAbsolute, replace ? before.mode : mode);
    const rechecked = await inspectContained(root, relativePath);
    if (rechecked.type !== before.type || (replace && rechecked.mode !== before.mode)) {
      throw new LifecycleError('destination changed before atomic replacement', {
        code: 'TARGET_CHANGED', exitCode: 4, safePath: relativePath,
      });
    }
    await rename(tempAbsolute, containedPath(root, relativePath));
    onMutation?.();
    observe('rename', relativePath, tempRelative);
    const actual = await readContainedFile(root, relativePath);
    if (!actual.equals(Buffer.from(bytes))) throw new Error('written bytes did not verify');
  } catch (error) {
    if (error instanceof LifecycleError) throw error;
    throw new LifecycleError('file write or verification failed', { safePath: relativePath });
  } finally {
    await handle?.close().catch(() => {});
    await unlink(tempAbsolute).then(() => observe('unlink-temp', tempRelative)).catch(() => {});
  }
}

export async function writeExclusiveContained(root, relativePath, bytes, { mode = 0o644 } = {}) {
  await ensureContainedParents(root, relativePath);
  const inspected = await inspectContained(root, relativePath);
  if (inspected.type !== 'absent') {
    if (inspected.type === 'file' && (await readContainedFile(root, relativePath)).equals(Buffer.from(bytes))) return 'reused';
    throw new LifecycleError('backup destination collides with different content', {
      code: 'UNOWNED_DESTINATION', exitCode: 4, safePath: relativePath,
    });
  }
  const absolute = containedPath(root, relativePath);
  let handle;
  try {
    observe('open-write-exclusive', relativePath);
    handle = await open(absolute, 'wx', mode);
    await handle.writeFile(bytes);
    await handle.sync();
  } catch (error) {
    throw new LifecycleError('exclusive file creation failed', { safePath: relativePath });
  } finally {
    await handle?.close().catch(() => {});
  }
  if (!(await readContainedFile(root, relativePath)).equals(Buffer.from(bytes))) {
    throw new LifecycleError('exclusive file verification failed', { safePath: relativePath });
  }
  return 'created';
}

export async function removeContainedFile(root, relativePath, { onMutation = null } = {}) {
  const inspected = await inspectContained(root, relativePath, { allowMissing: false, expect: 'file' });
  try {
    await unlink(inspected.absolute);
  } catch {
    throw new LifecycleError('file deletion failed', { safePath: relativePath });
  }
  onMutation?.();
  observe('unlink', relativePath);
  if ((await inspectContained(root, relativePath)).type !== 'absent') {
    throw new LifecycleError('file deletion did not verify', { safePath: relativePath });
  }
}

export async function removeEmptyContainedDirectory(root, relativePath) {
  try {
    const inspected = await inspectContained(root, relativePath);
    if (inspected.type === 'directory') await rmdir(inspected.absolute);
  } catch (error) {
    if (!['ENOENT', 'ENOTEMPTY'].includes(error.code)) throw error;
  }
}

async function validateObjectTree(root, relativeDirectory) {
  observe('readdir', relativeDirectory);
  const entries = await readdir(containedPath(root, relativeDirectory), { withFileTypes: true });
  for (const entry of entries) {
    const relativePath = `${relativeDirectory}/${entry.name}`;
    assertSafeRelativePath(relativePath, 'Git object path');
    observe('lstat', relativePath);
    const info = await lstat(containedPath(root, relativePath));
    if (info.isSymbolicLink() || (!info.isDirectory() && !info.isFile())) {
      throw new LifecycleError('Git object store has an unsafe layout', {
        code: 'IO_UNAVAILABLE', exitCode: 4, safePath: relativePath,
      });
    }
    if (info.isDirectory()) await validateObjectTree(root, relativePath);
  }
}

async function resolveGitExecutable(targetRoot) {
  for (const directory of (process.env.PATH ?? '').split(path.delimiter).filter(Boolean)) {
    const candidate = path.resolve(directory, 'git');
    try {
      const resolved = await realpath(candidate);
      const info = await lstat(resolved);
      const relative = path.relative(targetRoot, resolved);
      if (info.isFile() && (info.mode & 0o111) && (relative.startsWith('..') || path.isAbsolute(relative))) return resolved;
    } catch {}
  }
  throw new LifecycleError('trusted Git executable could not be established', { code: 'IO_UNAVAILABLE', exitCode: 4 });
}

function parseGitStatus(output) {
  const rows = [];
  for (const line of output.split('\n').filter(Boolean)) {
    if (line.length < 4) throw new LifecycleError('Git status output was not parseable', { code: 'IO_UNAVAILABLE', exitCode: 4 });
    const x = line[0];
    const y = line[1];
    const filePath = line.slice(3);
    if (x === '?' && y === '?') rows.push({ path: filePath, state: 'untracked' });
    else {
      if (x !== ' ') rows.push({ path: filePath, state: x === 'D' ? 'deleted' : 'staged' });
      if (y !== ' ') rows.push({ path: filePath, state: y === 'D' ? 'deleted' : 'unstaged' });
    }
  }
  return rows;
}

function safeSymbolicReference(value) {
  const match = value.match(/^refs\/(heads|tags)\/(.+)$/);
  if (!match) return false;
  const segments = match[2].split('/');
  return segments.every((segment) => /^[A-Za-z0-9._-]+$/.test(segment)
    && segment !== '.' && !segment.includes('..') && !segment.endsWith('.') && !segment.endsWith('.lock'));
}

function inheritedObjectRoutingPresent() {
  return ['GIT_ALTERNATE_OBJECT_DIRECTORIES', 'GIT_OBJECT_DIRECTORY', 'GIT_REPLACE_REF_BASE']
    .some((name) => typeof process.env[name] === 'string' && process.env[name].length > 0);
}

export async function exactGitOverlap(targetRoot, relativePaths) {
  const dotGit = await inspectContained(targetRoot, '.git');
  if (dotGit.type === 'absent') return { status: 'not-a-git-repository', paths: [], evidence: null };
  if (dotGit.type !== 'directory') return { status: 'unsafe-git-layout', paths: [], evidence: null };
  if (inheritedObjectRoutingPresent()) return { status: 'unsafe-git-layout', paths: [], evidence: null };
  let indexInfo;
  let packedRefs = [];
  try {
    await inspectContained(targetRoot, '.git/HEAD', { allowMissing: false, expect: 'file' });
    indexInfo = await inspectContained(targetRoot, '.git/index');
    if (!['absent', 'file'].includes(indexInfo.type)) throw new Error('unsafe Git index');
    await inspectContained(targetRoot, '.git/objects', { allowMissing: false, expect: 'directory' });
    if ((await inspectContained(targetRoot, '.git/objects/info/alternates')).type !== 'absent') {
      return { status: 'unsafe-git-layout', paths: [], evidence: null };
    }
    if ((await inspectContained(targetRoot, '.git/refs/replace')).type !== 'absent') {
      return { status: 'unsafe-git-layout', paths: [], evidence: null };
    }
    const packedInfo = await inspectContained(targetRoot, '.git/packed-refs');
    if (packedInfo.type === 'file') {
      packedRefs = (await readContainedFile(targetRoot, '.git/packed-refs')).toString('ascii').split('\n');
      if (packedRefs.some((line) => /^[0-9a-f]{40} refs\/replace\//.test(line))) {
        return { status: 'unsafe-git-layout', paths: [], evidence: null };
      }
    } else if (packedInfo.type !== 'absent') throw new Error('unsafe packed refs');
    await validateObjectTree(targetRoot, '.git/objects');
  } catch {
    return { status: 'unsafe-git-layout', paths: [], evidence: null };
  }

  const head = (await readContainedFile(targetRoot, '.git/HEAD')).toString('ascii').trim();
  let oid = null;
  let reference = null;
  let unborn = false;
  if (/^[0-9a-f]{40}$/.test(head)) oid = head;
  else if (head.startsWith('ref: ') && safeSymbolicReference(head.slice(5))) {
    reference = head.slice(5);
    const loose = `.git/${reference}`;
    const looseInfo = await inspectContained(targetRoot, loose);
    if (looseInfo.type === 'file') {
      const value = (await readContainedFile(targetRoot, loose)).toString('ascii').trim();
      if (/^[0-9a-f]{40}$/.test(value)) oid = value;
    } else if (looseInfo.type === 'absent') {
      const matches = packedRefs.filter((line) => line.endsWith(` ${reference}`));
      if (matches.length === 1 && /^[0-9a-f]{40} /.test(matches[0])) oid = matches[0].slice(0, 40);
      else if (matches.length === 0 && reference.startsWith('refs/heads/')) unborn = true;
    }
  }
  if ((!oid && !unborn) || (oid && indexInfo.type !== 'file')) {
    return { status: 'unsafe-git-layout', paths: [], evidence: null };
  }

  let temporaryRoot;
  try {
    temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-git-'));
    const token = sha256(Buffer.from(temporaryRoot)).slice(0, 24);
    const tempGit = path.join(temporaryRoot, 'git');
    const shadow = path.join(temporaryRoot, 'shadow');
    await mkdir(path.join(tempGit, 'objects', 'info'), { recursive: true });
    await mkdir(path.join(tempGit, 'refs', 'heads'), { recursive: true });
    await mkdir(shadow, { recursive: true });
    await writeFile(path.join(tempGit, 'HEAD'), unborn ? `ref: ${reference}\n` : `${oid}\n`, { flag: 'wx' });
    if (indexInfo.type === 'file') {
      await writeFile(path.join(tempGit, 'index'), await readContainedFile(targetRoot, '.git/index'), { flag: 'wx' });
    }
    await writeFile(path.join(tempGit, 'config'), '[core]\n\trepositoryformatversion = 0\n\tbare = false\n\thooksPath = /dev/null\n', { flag: 'wx' });
    await writeFile(path.join(tempGit, 'objects', 'info', 'alternates'), `${containedPath(targetRoot, '.git/objects')}\n`, { flag: 'wx' });

    const paths = [...new Set(relativePaths)].sort(byteCompare);
    for (const relativePath of paths) {
      assertSafeRelativePath(relativePath);
      const inspected = await inspectContained(targetRoot, relativePath);
      if (inspected.type === 'file') {
        const destination = path.join(shadow, ...relativePath.split('/'));
        await mkdir(path.dirname(destination), { recursive: true });
        await writeFile(destination, await readContainedFile(targetRoot, relativePath), { flag: 'wx', mode: inspected.mode });
      } else if (inspected.type !== 'absent') {
        return { status: 'unsafe-git-layout', paths: [], evidence: null };
      }
    }

    const executable = await resolveGitExecutable(targetRoot);
    const versionChild = spawnSync(executable, ['--version'], { encoding: 'utf8', env: { PATH: path.dirname(executable), LC_ALL: 'C' } });
    observe('spawn', '.git', 'git-version');
    if (versionChild.status !== 0 || versionChild.signal || versionChild.error) {
      return { status: 'unsafe-git-layout', paths: [], evidence: null };
    }
    const cleanEnv = [
      `PATH=${path.dirname(executable)}`,
      `HOME=${path.join(temporaryRoot, 'home')}`,
      `XDG_CONFIG_HOME=${path.join(temporaryRoot, 'xdg')}`,
      'GIT_CONFIG_GLOBAL=/dev/null', 'GIT_CONFIG_SYSTEM=/dev/null', 'GIT_CONFIG_NOSYSTEM=1',
      'GIT_NO_REPLACE_OBJECTS=1', 'GIT_TERMINAL_PROMPT=0', 'GIT_PAGER=cat',
      'GIT_OPTIONAL_LOCKS=0', 'GIT_LITERAL_PATHSPECS=1', 'LC_ALL=C',
    ];
    await mkdir(path.join(temporaryRoot, 'home'));
    await mkdir(path.join(temporaryRoot, 'xdg'));
    const args = [
      '-i', ...cleanEnv, executable, '--no-optional-locks',
      '-c', 'core.hooksPath=/dev/null', '-c', 'core.fsmonitor=false',
      '-c', 'core.untrackedCache=false', '-c', 'submodule.recurse=false',
      '-c', 'status.submoduleSummary=false', '-c', 'diff.external=',
      '-c', 'status.renames=false', `--git-dir=${tempGit}`, `--work-tree=${shadow}`,
      'status', '--porcelain=v1', '--untracked-files=all', '--ignore-submodules=all', '--', ...paths,
    ];
    const child = spawnSync('/usr/bin/env', args, { encoding: 'utf8', cwd: temporaryRoot, env: {} });
    observe('spawn', '.git', 'sanitized-status');
    if (child.status !== 0 || child.signal || child.error || child.stderr) {
      return { status: 'unsafe-git-layout', paths: [], evidence: {
        failure: 'status', status: child.status,
      } };
    }
    const overlap = parseGitStatus(child.stdout).sort((left, right) => byteCompare(left.path, right.path) || byteCompare(left.state, right.state));
    return {
      status: overlap.length ? 'overlap' : 'clean',
      paths: overlap,
      evidence: { executable, version: versionChild.stdout.trim(), temporaryRoot: await realpath(temporaryRoot), ownershipToken: token },
    };
  } catch {
    return { status: 'unsafe-git-layout', paths: [], evidence: { failure: 'exception' } };
  } finally {
    if (temporaryRoot) await rm(temporaryRoot, { recursive: true, force: true }).catch(() => {});
  }
}

export async function directoryTree(root) {
  const result = [];
  const walk = async (directory, prefix = '') => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((a, b) => byteCompare(a.name, b.name));
    for (const entry of entries) {
      const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolute, relative);
      else if (entry.isFile()) result.push({ path: relative, sha256: sha256(await readFile(absolute)) });
      else result.push({ path: relative, type: 'special' });
    }
  };
  await walk(root);
  return result;
}
