import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildBundle } from '../../src/bundle/compiler.mjs';

export const ROOT = fileURLToPath(new URL('../..', import.meta.url));

export async function readJson(relativePath, root = ROOT) {
  return JSON.parse(await readFile(path.join(root, relativePath), 'utf8'));
}

export async function temporaryDirectory(t) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-task1-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  return directory;
}

export async function buildTemporary(t, rootDir = ROOT) {
  const base = await temporaryDirectory(t);
  const outputDir = path.join(base, 'output');
  const result = await buildBundle({ rootDir, outputDir, version: '0.0.0-task1' });
  return { base, outputDir, result };
}

export async function createFixture(t) {
  const fixture = await temporaryDirectory(t);
  const map = await readJson('packaging/bundle-map.json');
  const files = new Set([
    'AGENTS.md',
    'packaging/package-contract.json',
    'packaging/bundle-map.json',
    'packaging/managed-router-block.md',
    'packaging/schemas/package-contract.schema.json',
    'packaging/schemas/bundle-inventory.schema.json',
    ...map.entries.map(({ source }) => source),
  ]);
  for (const relativePath of files) {
    const destination = path.join(fixture, relativePath);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(path.join(ROOT, relativePath), destination);
  }
  return fixture;
}

export async function writeJson(relativePath, value, root) {
  await writeFile(path.join(root, relativePath), `${JSON.stringify(value, null, 2)}\n`);
}

export async function treeHashes(root) {
  const result = [];
  const walk = async (directory, prefix = '') => {
    const entries = await readdir(directory, { withFileTypes: true });
    entries.sort((left, right) => Buffer.from(left.name).compare(Buffer.from(right.name)));
    for (const entry of entries) {
      const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
      const absolutePath = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolutePath, relativePath);
      else {
        const content = await readFile(absolutePath);
        result.push([relativePath, createHash('sha256').update(content).digest('hex')]);
      }
    }
  };
  await walk(root);
  return result;
}
