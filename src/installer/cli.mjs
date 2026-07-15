import { readFile } from 'node:fs/promises';
import { createInterface } from 'node:readline/promises';
import { canonicalBytes, LifecycleError } from './filesystem.mjs';
import { applyLifecyclePlan, createLifecyclePlan } from './lifecycle.mjs';
import { loadReleaseBundle, PACKAGE_ROOT } from './package-bundle.mjs';

const USAGE = 'usage: oh-my-harness <install|update|uninstall> --target <repo> [--dry-run] [--yes]';

export function parseArguments(argv) {
  if (!Array.isArray(argv) || argv.length < 3) throw new LifecycleError(USAGE, { exitCode: 2 });
  const operation = argv[0];
  if (!['install', 'update', 'uninstall'].includes(operation)) throw new LifecycleError(USAGE, { exitCode: 2 });
  let target = null;
  let dryRun = false;
  let yes = false;
  const seen = new Set();
  for (let index = 1; index < argv.length; index += 1) {
    const flag = argv[index];
    if (!['--target', '--dry-run', '--yes'].includes(flag) || seen.has(flag)) {
      throw new LifecycleError(USAGE, { exitCode: 2 });
    }
    seen.add(flag);
    if (flag === '--target') {
      if (index + 1 >= argv.length || argv[index + 1].startsWith('--')) throw new LifecycleError(USAGE, { exitCode: 2 });
      target = argv[++index];
    } else if (flag === '--dry-run') dryRun = true;
    else yes = true;
  }
  if (!target) throw new LifecycleError(USAGE, { exitCode: 2 });
  return { operation, target, dryRun, yes };
}

async function packageVersion() {
  const value = JSON.parse(await readFile(new URL('../../package.json', import.meta.url), 'utf8'));
  return value.version;
}

function writeJson(stream, value) {
  stream.write(canonicalBytes(value));
}

export async function main(argv, {
  stdin = process.stdin, stdout = process.stdout, stderr = process.stderr, release: suppliedRelease = null,
} = {}) {
  let options;
  try {
    options = parseArguments(argv);
  } catch (error) {
    stderr.write(`${USAGE}\n`);
    return 2;
  }

  let release = suppliedRelease;
  try {
    release ??= await loadReleaseBundle({ packageRoot: PACKAGE_ROOT, packageVersion: await packageVersion() });
  } catch (error) {
    stderr.write('oh-my-harness: fixed package bundle is unavailable or incompatible\n');
    return error.exitCode === 4 ? 4 : 5;
  }

  let planned;
  try {
    planned = await createLifecyclePlan({ operation: options.operation, target: options.target, release });
  } catch (error) {
    const safePath = error.safePath ? ` (${error.safePath})` : '';
    stderr.write(`oh-my-harness: planning failed${safePath}\n`);
    return error.exitCode ?? 5;
  }
  writeJson(stdout, planned.envelope);
  if (planned.plan.status === 'INCOMPLETE_OR_UNOWNED') return 5;
  if (planned.plan.status === 'CONFLICT') return 4;
  if (planned.plan.status === 'NO_OP' || options.dryRun) return 0;

  let confirmed = options.yes;
  if (!confirmed) {
    if (!stdin.isTTY) return 3;
    const prompt = createInterface({ input: stdin, output: stdout });
    try {
      const answer = await prompt.question('Apply this exact oh-my-harness plan? [y/N] ');
      confirmed = /^(?:y|yes)$/i.test(answer.trim());
    } finally {
      prompt.close();
    }
    if (!confirmed) return 3;
  }

  try {
    const result = await applyLifecyclePlan({ planned, target: options.target, release });
    writeJson(stdout, result.report);
    return result.exitCode;
  } catch (error) {
    if (error.report) writeJson(stderr, error.report);
    else {
      const safePath = error.safePath ? ` (${error.safePath})` : '';
      stderr.write(`oh-my-harness: operation failed${safePath}\n`);
    }
    return error.exitCode ?? 5;
  }
}
