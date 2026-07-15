import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import {
  mkdir, mkdtemp, readFile, readdir, realpath, rm, writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Writable, PassThrough } from 'node:stream';
import { preparePackage, loadReleaseBundle } from '../../src/installer/package-bundle.mjs';
import { canonicalBytes, sha256 } from '../../src/installer/filesystem.mjs';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));

export async function temporaryRoot(t, prefix = 'oh-my-harness-task2-') {
  const root = await mkdtemp(path.join(os.tmpdir(), prefix));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}

export async function targetFixture(t, agents = null) {
  const parent = await temporaryRoot(t);
  const target = path.join(parent, 'target');
  await mkdir(target);
  if (agents !== null) await writeFile(path.join(target, 'AGENTS.md'), agents);
  return { parent, target };
}

export async function buildRelease(t, version = '0.1.0') {
  const packageRoot = await temporaryRoot(t, 'oh-my-harness-package-');
  await preparePackage({ packRoot: packageRoot, sourceRoot: ROOT, version });
  return loadReleaseBundle({ packageRoot, packageVersion: version });
}

export function cloneRelease(release, { version = release.inventory.bundleVersion, replace = {}, remove = [], add = {} } = {}) {
  const files = new Map(release.files);
  const removed = new Set(remove);
  let required = release.inventory.requiredFiles
    .filter((item) => !removed.has(item.destinationPath))
    .map((item) => {
      const bytes = Object.hasOwn(replace, item.destinationPath) ? Buffer.from(replace[item.destinationPath]) : files.get(item.destinationPath);
      files.set(item.destinationPath, bytes);
      return { ...item, destinationSha256: sha256(bytes) };
    });
  for (const [destinationPath, value] of Object.entries(add)) {
    const bytes = Buffer.from(value);
    files.set(destinationPath, bytes);
    required.push({
      assetId: `synthetic/${destinationPath}`, sourcePath: 'synthetic/source',
      sourceSha256: sha256(bytes), destinationPath, destinationSha256: sha256(bytes),
      required: true, kind: 'test', transformations: ['reference-rewrite'],
    });
  }
  for (const destinationPath of remove) files.delete(destinationPath);
  required.sort((left, right) => Buffer.from(left.destinationPath).compare(Buffer.from(right.destinationPath)));
  const inventory = {
    ...release.inventory,
    bundleVersion: version,
    requiredFiles: required,
    ownership: { ...release.inventory.ownership, payloadPaths: required.map((item) => item.destinationPath) },
  };
  const inventoryBytes = Buffer.from(`${JSON.stringify(inventory, null, 2)}\n`);
  files.set('.oh-my-harness/bundle-inventory.json', inventoryBytes);
  return { ...release, inventory, inventoryBytes, files };
}

export async function treeSnapshot(root) {
  const rows = [];
  const walk = async (directory, prefix = '') => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => Buffer.from(left.name).compare(Buffer.from(right.name)));
    for (const entry of entries) {
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolute, relativePath);
      else if (entry.isFile()) rows.push([relativePath, sha256(await readFile(absolute))]);
      else rows.push([relativePath, entry.isSymbolicLink() ? 'symlink' : 'special']);
    }
  };
  await walk(root);
  return rows;
}

export async function readJson(root, relativePath) {
  return JSON.parse(await readFile(path.join(root, ...relativePath.split('/')), 'utf8'));
}

export function captureStream() {
  let value = '';
  const stream = new Writable({
    write(chunk, _encoding, callback) { value += chunk.toString(); callback(); },
  });
  return { stream, value: () => value };
}

export function nonTtyInput(content = '') {
  const input = new PassThrough();
  input.isTTY = false;
  input.end(content);
  return input;
}

export function ttyInput(content) {
  const input = new PassThrough();
  input.isTTY = true;
  input.end(content);
  return input;
}

export function git(target, args, env = {}) {
  return execFileSync('git', args, {
    cwd: target, encoding: 'utf8',
    env: { PATH: process.env.PATH, HOME: path.dirname(target), XDG_CONFIG_HOME: path.join(path.dirname(target), 'xdg'), GIT_CONFIG_NOSYSTEM: '1', ...env },
  }).trim();
}

export async function initializeGit(target) {
  await mkdir(path.join(path.dirname(target), 'xdg'), { recursive: true });
  git(target, ['init', '-q']);
  git(target, ['config', 'user.email', 'fixture@example.invalid']);
  git(target, ['config', 'user.name', 'Fixture']);
  await writeFile(path.join(target, 'seed.txt'), 'seed\n');
  git(target, ['add', '--', 'seed.txt']);
  git(target, ['commit', '-qm', 'seed']);
}

export function digest(value) {
  return createHash('sha256').update(value).digest('hex');
}
