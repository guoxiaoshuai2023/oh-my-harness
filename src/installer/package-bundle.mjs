import { mkdir, readFile, realpath } from 'node:fs/promises';
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

export async function loadReleaseBundle({ packageRoot = PACKAGE_ROOT, packageVersion = '0.1.0' } = {}) {
  const bundleRoot = path.join(packageRoot, 'dist');
  let inventoryBytes;
  try {
    inventoryBytes = await readFile(path.join(bundleRoot, '.oh-my-harness', 'bundle-inventory.json'));
  } catch {
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
    const bytes = await readFile(path.join(bundleRoot, ...item.destinationPath.split('/'))).catch(() => null);
    if (!bytes || sha256(bytes) !== item.destinationSha256) packageError('fixed package payload hash mismatch', item.destinationPath);
    files.set(item.destinationPath, bytes);
  }
  const blockPath = inventory.managedBlock.assetPath;
  const block = await readFile(path.join(bundleRoot, ...blockPath.split('/'))).catch(() => null);
  if (!block || sha256(block) !== inventory.managedBlock.sha256 || block.at(-1) !== 0x0a) {
    packageError('fixed managed block hash or newline mismatch', blockPath);
  }
  files.set(blockPath, block);
  files.set('.oh-my-harness/bundle-inventory.json', inventoryBytes);
  validateReferences(files, inventory);
  return {
    packageRoot: await realpath(packageRoot), bundleRoot, inventory, inventoryBytes,
    files, ownedFiles: releaseOwnedFiles(inventory, inventoryBytes), managedBlock: block,
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

function parsePrepareArguments(argv) {
  if (argv.length !== 3 || argv[0] !== 'prepare' || argv[1] !== '--pack-root' || !argv[2]) {
    throw new Error('usage: package-bundle.mjs prepare --pack-root <absolute-directory>');
  }
  return argv[2];
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const packRoot = parsePrepareArguments(process.argv.slice(2));
    const result = await preparePackage({ packRoot });
    process.stdout.write(`${JSON.stringify({ packRoot: result.packRoot, outputFileCount: result.outputFileCount })}\n`);
  } catch (error) {
    process.stderr.write(`package bundle preparation failed: ${error.message}\n`);
    process.exitCode = 1;
  }
}
