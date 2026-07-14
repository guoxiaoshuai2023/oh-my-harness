#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildBundle } from './compiler.mjs';

function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const flag = argv[index];
    const value = argv[index + 1];
    if (!['--version', '--output'].includes(flag) || value === undefined) {
      throw new Error('usage: build-bundle.mjs --version <version> --output <directory>');
    }
    if (Object.hasOwn(values, flag)) throw new Error(`duplicate argument: ${flag}`);
    values[flag] = value;
  }
  if (!values['--version'] || !values['--output']) {
    throw new Error('usage: build-bundle.mjs --version <version> --output <directory>');
  }
  return { version: values['--version'], outputDir: path.resolve(values['--output']) };
}

try {
  const { version, outputDir } = parseArguments(process.argv.slice(2));
  const rootDir = fileURLToPath(new URL('../..', import.meta.url));
  const result = await buildBundle({ rootDir, outputDir, version });
  process.stdout.write(`built ${result.outputFileCount} deterministic files for ${version}\n`);
} catch (error) {
  process.stderr.write(`bundle build failed: ${error.message}\n`);
  process.exitCode = 1;
}
