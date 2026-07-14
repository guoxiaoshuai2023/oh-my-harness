#!/usr/bin/env node
import { main } from '../src/installer/cli.mjs';

process.exitCode = await main(process.argv.slice(2));
