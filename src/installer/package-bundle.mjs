import {
  lstat, mkdir, readFile, readdir, realpath, rm,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { canonicalBytes, LifecycleError, sha256 } from './filesystem.mjs';
import { releaseOwnedFiles, validateInventory } from './state.mjs';

export const PACKAGE_ROOT = fileURLToPath(new URL('../..', import.meta.url));

function packageError(message, safePath = null) {
  throw new LifecycleError(message, { code: 'INCOMPATIBLE_INSTALLATION', exitCode: 4, safePath });
}

function validateProfile(bytes, relativePath) {
  const text = bytes.toString('utf8');
  if (text.includes('\u0000') || !/^name\s*=\s*"[^"]+"/m.test(text)
      || !/^description\s*=\s*"[^"]+"/m.test(text)
      || !/^developer_instructions\s*=\s*"""/m.test(text)) {
    packageError('agent profile is not structurally valid TOML', relativePath);
  }
  let triple = false;
  for (const line of text.split('\n')) {
    const occurrences = line.split('"""').length - 1;
    if (occurrences % 2) triple = !triple;
    if (occurrences === 0 && !triple && line.trim() && !line.trim().startsWith('#')
        && !line.includes('=') && !/^\s*\[[^\]]+\]\s*$/.test(line)) {
      packageError('agent profile has an invalid TOML statement', relativePath);
    }
  }
  if (triple) packageError('agent profile has an unterminated TOML string', relativePath);
}

function validateReferences(files, inventory) {
  const installed = new Set(files.keys());
  const directories = new Set();
  for (const filePath of installed) {
    let directory = path.posix.dirname(filePath);
    while (directory !== '.') {
      directories.add(directory);
      directory = path.posix.dirname(directory);
    }
  }
  const pattern = /(?:\.oh-my-harness(?:\/[A-Za-z0-9_.*-]+)+|\.codex\/agents\/oh-my-harness-[A-Za-z0-9*-]+\.toml)/g;
  for (const [filePath, bytes] of files) {
    if (filePath.endsWith('bundle-inventory.json')) continue;
    const text = bytes.toString('utf8');
    for (const reference of text.match(pattern) ?? []) {
      if (!installed.has(reference) && !directories.has(reference)
          && !(reference.includes('*') && [...installed].some((candidate) => {
            const expression = new RegExp(`^${reference.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('*', '.*')}$`);
            return expression.test(candidate);
          }))) packageError('installed runtime reference does not resolve', filePath);
    }
  }
  for (const agentPath of inventory.ownership.agentPaths) validateProfile(files.get(agentPath), agentPath);
}

export async function validateReleaseContents({ inventoryBytes, readPayload, packageVersion = '0.1.0' }) {
  if (!inventoryBytes) {
    packageError('fixed package bundle is unavailable', '.oh-my-harness/bundle-inventory.json');
  }
  let inventory;
  try {
    inventory = JSON.parse(inventoryBytes.toString('utf8'));
  } catch {
    packageError('fixed package inventory is not valid JSON', '.oh-my-harness/bundle-inventory.json');
  }
  validateInventory(inventory, { packageVersion });
  const files = new Map();
  for (const item of inventory.requiredFiles) {
    const bytes = await readPayload(item.destinationPath);
    if (!bytes || sha256(bytes) !== item.destinationSha256) packageError('fixed package payload hash mismatch', item.destinationPath);
    files.set(item.destinationPath, bytes);
  }
  const blockPath = inventory.managedBlock.assetPath;
  const block = await readPayload(blockPath);
  if (!block || sha256(block) !== inventory.managedBlock.sha256 || block.at(-1) !== 0x0a) {
    packageError('fixed managed block hash or newline mismatch', blockPath);
  }
  files.set(blockPath, block);
  files.set('.oh-my-harness/bundle-inventory.json', inventoryBytes);
  validateReferences(files, inventory);
  return {
    inventory, inventoryBytes, files, ownedFiles: releaseOwnedFiles(inventory, inventoryBytes), managedBlock: block,
  };
}

export async function loadReleaseBundle({ packageRoot = PACKAGE_ROOT, packageVersion = '0.1.0' } = {}) {
  const bundleRoot = path.join(packageRoot, 'dist');
  const inventoryPath = '.oh-my-harness/bundle-inventory.json';
  const inventoryBytes = await readFile(path.join(bundleRoot, ...inventoryPath.split('/'))).catch(() => null);
  const release = await validateReleaseContents({
    inventoryBytes,
    readPayload: (relativePath) => readFile(path.join(bundleRoot, ...relativePath.split('/'))).catch(() => null),
    packageVersion,
  });
  return {
    packageRoot: await realpath(packageRoot), bundleRoot, ...release,
  };
}

export async function preparePackage({ packRoot, sourceRoot = PACKAGE_ROOT, version = '0.1.0' }) {
  if (!path.isAbsolute(packRoot)) throw new Error('pack root must be absolute');
  const canonicalPackRoot = await realpath(packRoot);
  const outputDir = path.join(canonicalPackRoot, 'dist');
  await mkdir(outputDir, { recursive: false });
  const { buildBundle } = await import('../bundle/compiler.mjs');
  const result = await buildBundle({ rootDir: await realpath(sourceRoot), outputDir, version });
  const release = await loadReleaseBundle({ packageRoot: canonicalPackRoot, packageVersion: version });
  return { ...result, releaseFileCount: release.files.size, packRoot: canonicalPackRoot };
}

function expectedBundleDirectories(files) {
  const directories = new Set();
  for (const relativePath of files.keys()) {
    let directory = path.posix.dirname(relativePath);
    while (directory !== '.') {
      directories.add(directory);
      directory = path.posix.dirname(directory);
    }
  }
  return directories;
}

async function generatedBundleTree(root, relativeDirectory = '') {
  const files = new Set();
  const directories = new Set();
  const directory = relativeDirectory ? path.join(root, ...relativeDirectory.split('/')) : root;
  for (const entry of await readdir(directory)) {
    const relativePath = relativeDirectory ? `${relativeDirectory}/${entry}` : entry;
    const absolute = path.join(root, ...relativePath.split('/'));
    const info = await lstat(absolute);
    if (info.isDirectory()) {
      directories.add(relativePath);
      const nested = await generatedBundleTree(root, relativePath);
      for (const item of nested.files) files.add(item);
      for (const item of nested.directories) directories.add(item);
    } else if (info.isFile()) files.add(relativePath);
    else packageError('generated package output has an unsafe entry', relativePath);
  }
  return { files, directories };
}

function assertExactSet(actual, expected, label) {
  const extra = [...actual].filter((item) => !expected.has(item));
  const missing = [...expected].filter((item) => !actual.has(item));
  if (extra.length || missing.length) {
    throw new Error(`${label} does not match generated package ownership`);
  }
}

async function assertOwnedGeneratedBundle(outputDir, version) {
  const release = await loadReleaseBundle({ packageRoot: path.dirname(outputDir), packageVersion: version });
  const tree = await generatedBundleTree(outputDir);
  assertExactSet(tree.files, new Set(release.files.keys()), 'generated package files');
  assertExactSet(tree.directories, expectedBundleDirectories(release.files), 'generated package directories');
}

export async function cleanupPackage({ packRoot = PACKAGE_ROOT, version = '0.1.0' } = {}) {
  if (!path.isAbsolute(packRoot)) throw new Error('pack root must be absolute');
  const canonicalPackRoot = await realpath(packRoot);
  const outputDir = path.join(canonicalPackRoot, 'dist');
  const outputInfo = await lstat(outputDir);
  if (!outputInfo.isDirectory() || outputInfo.isSymbolicLink()
      || await realpath(outputDir) !== outputDir) {
    throw new Error('generated package output is not an owned package-local directory');
  }
  await assertOwnedGeneratedBundle(outputDir, version);
  await rm(outputDir, { recursive: true, force: false });
  try {
    await lstat(outputDir);
    throw new Error('generated package output cleanup did not verify');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return { packRoot: canonicalPackRoot, removed: 'dist' };
}

function parseArguments(argv) {
  if (argv[0] === 'prepare'
      && (argv.length === 1 || (argv.length === 3 && argv[1] === '--pack-root'))) {
    return { operation: 'prepare', packRoot: argv[2] || PACKAGE_ROOT };
  }
  if (argv[0] === 'cleanup' && argv.length === 1) {
    return { operation: 'cleanup', packRoot: PACKAGE_ROOT };
  }
  throw new Error('usage: package-bundle.mjs prepare [--pack-root <absolute-directory>] | cleanup');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const { operation, packRoot } = parseArguments(process.argv.slice(2));
    if (operation === 'prepare') {
      await preparePackage({ packRoot });
    } else await cleanupPackage({ packRoot });
  } catch (error) {
    process.stderr.write(`package bundle lifecycle failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
