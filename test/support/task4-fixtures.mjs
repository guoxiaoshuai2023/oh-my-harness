import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { applyLifecyclePlan, createLifecyclePlan } from '../../src/installer/lifecycle.mjs';
import { scanManagedBlock } from '../../src/installer/markers.mjs';
import { STATE_PATH } from '../../src/installer/state.mjs';
import {
  cloneRelease, initializeGit, readJson, targetFixture, treeSnapshot,
} from '../lifecycle/test-helpers.mjs';

export {
  cloneRelease, initializeGit, readJson, targetFixture, treeSnapshot,
};

export async function applyReady(operation, target, release, faults = []) {
  const planned = await createLifecyclePlan({ operation, target, release });
  assert.equal(planned.plan.status, 'READY');
  return applyLifecyclePlan({ planned, target, release, faults });
}

export function largeAgentsBytes() {
  const rows = ['# Target rules'];
  for (let index = 0; index < 12_000; index += 1) {
    rows.push(`- target-owned rule ${String(index).padStart(5, '0')}: preserve byte ${index % 251}`);
  }
  return Buffer.from(`${rows.join('\r\n')}\r\n`);
}

export async function verifyInstalledResult({ target, release, expectedOuter }) {
  const payloadHashes = [];
  for (const [relativePath, expected] of release.files) {
    const actual = await readFile(path.join(target, ...relativePath.split('/')));
    payloadHashes.push(actual.equals(expected));
  }
  const state = await readJson(target, STATE_PATH);
  const agents = await readFile(path.join(target, 'AGENTS.md'));
  const scan = scanManagedBlock(agents);
  const profilePaths = release.inventory.ownership.agentPaths;
  const profiles = await Promise.all(profilePaths.map((relativePath) => (
    readFile(path.join(target, ...relativePath.split('/')), 'utf8')
  )));
  const structural = {
    payload: payloadHashes.every(Boolean),
    state: state.verification.status === 'verified'
      && state.ownedFiles.length === release.files.size,
    managedBlock: scan.status === 'owned-pair' && scan.interval.equals(release.managedBlock),
    profiles: profiles.length === 9 && profiles.every((text) => (
      /^name\s*=\s*"[^"]+"/m.test(text)
      && /^description\s*=\s*"[^"]+"/m.test(text)
      && /^developer_instructions\s*=\s*"""/m.test(text)
    )),
    references: [...release.files.entries()].every(([relativePath, bytes]) => (
      relativePath.endsWith('bundle-inventory.json')
      || (!/(?:^|[\s"'`(])task-docs\/_harness(?=$|[\s"'`.,;:!?/)\]}])/m.test(bytes.toString('utf8'))
        && !/(?:^|[\s"'`(])docs\/agent-routing(?=$|[\s"'`.,;:!?/)\]}])/m.test(bytes.toString('utf8')))
    )),
  };
  const outerBytes = scan.prefix.equals(expectedOuter.prefix) && scan.suffix.equals(expectedOuter.suffix);
  return {
    structural,
    outerBytes,
    overall: Object.values(structural).every(Boolean) && outerBytes,
  };
}
