import {
  byteCompare, canonicalBytes, canonicalTarget, ensureContainedParents,
  exactGitOverlap, fingerprintContained, inspectContained, LifecycleError,
  linkContainedFile, payloadTempPath, publishContainedFile, readContainedFile,
  removeContainedFile, removeEmptyContainedDirectory,
  sha256, writeAtomicContained, writeExclusiveContained,
} from './filesystem.mjs';
import { appendManagedBlock, removeManagedBlock, replaceManagedBlock, scanManagedBlock } from './markers.mjs';
import {
  AGENT_PATHS, BINARY_NAME, buildInstallState, operationId, PACKAGE_NAME,
  managedDirectoryCandidates, parseInstallState, reconcileInstallStateInventory, releaseOwnedFiles,
  SENTINEL_PATH, SENTINEL_TEMP_PATH,
  sentinelDocument, STATE_PATH, STATE_TEMP_PATH, targetIdentity, validateInventory,
} from './state.mjs';

export const CONFLICT_CODES = [
  'UNMANAGED_NAMESPACE', 'UNOWNED_DESTINATION', 'INVALID_MANAGED_MARKER',
  'UNVERIFIABLE_INSTALL_STATE', 'INCOMPATIBLE_INSTALLATION', 'DIRTY_OVERLAP',
  'UNSAFE_PATH', 'TARGET_CHANGED', 'IO_UNAVAILABLE',
];

const VERIFICATION_ORDER = [
  'containment', 'inventory', 'payload-hashes', 'managed-block', 'outer-bytes',
  'profiles', 'references', 'backups', 'state', 'write-confinement',
];

function uniqueSorted(items, comparator = byteCompare) {
  const sorted = [...items].sort(comparator);
  return sorted.filter((item, index) => index === 0 || comparator(sorted[index - 1], item) !== 0);
}

function conflictSort(left, right) {
  if (left.path === null && right.path !== null) return -1;
  if (left.path !== null && right.path === null) return 1;
  return byteCompare(left.path ?? '', right.path ?? '') || byteCompare(left.code, right.code);
}

function modifiedSort(left, right) {
  return byteCompare(left.path, right.path) || byteCompare(left.kind, right.kind);
}

function backupSort(left, right) {
  return byteCompare(left.backupPath ?? left.path, right.backupPath ?? right.path)
    || byteCompare(left.sourcePath, right.sourcePath);
}

function addConflict(conflicts, code, pathValue = null) {
  if (!CONFLICT_CODES.includes(code)) throw new LifecycleError('internal conflict code is outside the closed enum');
  conflicts.push({ code, path: pathValue });
}

function planEnvelope(plan) {
  const planBytes = canonicalBytes(plan);
  return { schemaVersion: 1, plan, planSha256: sha256(planBytes) };
}

function basePlan(operation, release) {
  return {
    schemaVersion: 1,
    operation,
    currentVersion: null,
    targetVersion: operation === 'uninstall' ? null : release.inventory.bundleVersion,
    status: 'READY',
    creates: [], replaces: [], removes: [], protected: [], blockAction: 'none',
    modifiedManaged: [], backups: [], conflicts: [],
    gitOverlap: { status: 'not-a-git-repository', paths: [] },
    verification: [],
  };
}

async function literalAgents(root) {
  const info = await inspectContained(root, 'AGENTS.md');
  if (info.type === 'absent') return { exists: false, bytes: Buffer.alloc(0), mode: 0o644, scan: scanManagedBlock(Buffer.alloc(0)) };
  if (info.type !== 'file') throw new LifecycleError('AGENTS.md has an unsupported filesystem type', {
    code: 'UNSAFE_PATH', exitCode: 4, safePath: 'AGENTS.md',
  });
  const bytes = await readContainedFile(root, 'AGENTS.md');
  return { exists: true, bytes, mode: info.mode, scan: scanManagedBlock(bytes) };
}

function backupPath(operationIdentifier, sourcePath) {
  const suffix = sourcePath === 'AGENTS.md#managed-block' ? 'AGENTS.md.managed-block' : sourcePath;
  return `.oh-my-harness-backups/${operationIdentifier}/${suffix}`;
}

function managedForOperation(state) {
  if (!state) return [];
  return [
    ...state.ownedFiles.map(({ path: filePath, sha256: digest, kind }) => ({ path: filePath, sha256: digest, kind })),
    { path: 'AGENTS.md#managed-block', sha256: state.agentsMd.blockSha256, kind: 'managed-block' },
  ];
}

async function inspectExistingState(root) {
  const stateInfo = await inspectContained(root, STATE_PATH);
  if (stateInfo.type === 'absent') return { state: null, bytes: null, error: null };
  if (stateInfo.type !== 'file') return { state: null, bytes: null, error: new LifecycleError('install state is not a regular file', { code: 'UNVERIFIABLE_INSTALL_STATE', exitCode: 4, safePath: STATE_PATH }) };
  const bytes = await readContainedFile(root, STATE_PATH);
  try {
    return { state: parseInstallState(bytes, { canonicalRoot: root }), bytes, error: null };
  } catch (error) {
    return { state: null, bytes, error };
  }
}

async function exactRecognizedTemps(root, paths) {
  const recognized = [SENTINEL_PATH, SENTINEL_TEMP_PATH, STATE_TEMP_PATH,
    ...paths.map((filePath) => payloadTempPath(filePath))];
  const present = [];
  for (const relativePath of uniqueSorted(recognized)) {
    const info = await inspectContained(root, relativePath);
    if (info.type !== 'absent') present.push(relativePath);
  }
  return present;
}

function asConflict(error) {
  if (error instanceof LifecycleError && CONFLICT_CODES.includes(error.code)) {
    return { code: error.code, path: error.safePath };
  }
  return { code: 'IO_UNAVAILABLE', path: error?.safePath ?? null };
}

function classifyStateSurface(state, currentBytes, agents) {
  const modified = [];
  for (const file of state.ownedFiles) {
    const bytes = currentBytes.get(file.path);
    if (bytes && sha256(bytes) !== file.sha256) {
      modified.push({ path: file.path, kind: file.kind, expectedSha256: file.sha256, currentSha256: sha256(bytes) });
    }
  }
  if (agents.scan.status === 'owned-pair' && agents.scan.intervalSha256 !== state.agentsMd.blockSha256) {
    modified.push({
      path: 'AGENTS.md', kind: 'managed-block', expectedSha256: state.agentsMd.blockSha256,
      currentSha256: agents.scan.intervalSha256,
    });
  }
  return modified.sort(modifiedSort);
}

async function captureFingerprints(root, paths) {
  const result = new Map();
  for (const relativePath of uniqueSorted(paths)) {
    try {
      result.set(relativePath, await fingerprintContained(root, relativePath));
    } catch (error) {
      result.set(relativePath, `unsafe:${error.code ?? 'IO_UNAVAILABLE'}`);
    }
  }
  return result;
}

function planPaths(plan, state, release) {
  return uniqueSorted([
    ...release.files.keys(), ...(state?.ownedFiles.map((item) => item.path) ?? []),
    'AGENTS.md', STATE_PATH, SENTINEL_PATH, SENTINEL_TEMP_PATH, STATE_TEMP_PATH,
    ...plan.backups.map((item) => item.backupPath),
  ]);
}

export async function createLifecyclePlan({ operation, target, release }) {
  if (!['install', 'update', 'uninstall'].includes(operation)) throw new LifecycleError('unsupported lifecycle operation');
  validateInventory(release.inventory, { packageVersion: release.inventory.bundleVersion });
  const root = await canonicalTarget(target);
  const plan = basePlan(operation, release);
  const conflicts = [];
  const namespaceInfo = await inspectContained(root, '.oh-my-harness');
  const stateResult = await inspectExistingState(root);
  const state = stateResult.state;
  const stateBytes = stateResult.bytes;
  plan.currentVersion = state?.installedVersion ?? null;

  const knownOwned = uniqueSorted([
    ...release.files.keys(), ...(state?.ownedFiles.map((item) => item.path) ?? []),
    'AGENTS.md',
  ]);
  let recognizedTemps = [];
  let incomplete = false;
  try {
    recognizedTemps = await exactRecognizedTemps(root, knownOwned);
    incomplete = recognizedTemps.length > 0;
  } catch (error) {
    const mapped = asConflict(error);
    addConflict(conflicts, mapped.code, mapped.path);
  }
  if (stateResult.error) addConflict(conflicts, asConflict(stateResult.error).code, asConflict(stateResult.error).path);
  if (namespaceInfo.type !== 'absent' && namespaceInfo.type !== 'directory') addConflict(conflicts, 'UNSAFE_PATH', '.oh-my-harness');
  if (!state && namespaceInfo.type === 'directory') {
    incomplete = true;
    addConflict(conflicts, 'UNMANAGED_NAMESPACE', '.oh-my-harness');
    plan.protected.push('.oh-my-harness');
  }
  if (!state && operation !== 'install') {
    incomplete = true;
    addConflict(conflicts, 'UNVERIFIABLE_INSTALL_STATE', STATE_PATH);
  }

  let agents;
  try {
    agents = await literalAgents(root);
  } catch (error) {
    addConflict(conflicts, asConflict(error).code, asConflict(error).path);
    agents = { exists: false, bytes: Buffer.alloc(0), mode: 0o644, scan: { status: 'invalid' } };
  }

  const oldBytes = new Map();
  let surfaceMissing = false;
  if (state) {
    for (const item of state.ownedFiles) {
      try {
        const info = await inspectContained(root, item.path);
        if (info.type !== 'file') {
          surfaceMissing = true;
          addConflict(conflicts, info.type === 'absent' ? 'UNVERIFIABLE_INSTALL_STATE' : 'UNSAFE_PATH', item.path);
        } else oldBytes.set(item.path, await readContainedFile(root, item.path));
      } catch (error) {
        surfaceMissing = true;
        addConflict(conflicts, asConflict(error).code, item.path);
      }
    }
    if (agents.scan.status !== 'owned-pair') {
      surfaceMissing = true;
      addConflict(conflicts, 'INVALID_MANAGED_MARKER', 'AGENTS.md');
    }
    if (surfaceMissing) incomplete = true;
    const inventoryRecord = state.ownedFiles.find((item) => item.path === '.oh-my-harness/bundle-inventory.json');
    const installedInventoryBytes = oldBytes.get('.oh-my-harness/bundle-inventory.json');
    if (inventoryRecord && installedInventoryBytes && sha256(installedInventoryBytes) === inventoryRecord.sha256) {
      try {
        const installedInventory = JSON.parse(installedInventoryBytes.toString('utf8'));
        validateInventory(installedInventory);
        if (installedInventory.bundleVersion !== state.installedVersion) {
          throw new LifecycleError('installed inventory version disagrees with state', {
            code: 'INCOMPATIBLE_INSTALLATION', exitCode: 4,
            safePath: '.oh-my-harness/bundle-inventory.json',
          });
        }
        reconcileInstallStateInventory(state, installedInventory, installedInventoryBytes);
      } catch (error) {
        const mapped = asConflict(error);
        addConflict(conflicts, mapped.code === 'IO_UNAVAILABLE' ? 'INCOMPATIBLE_INSTALLATION' : mapped.code,
          mapped.path ?? '.oh-my-harness/bundle-inventory.json');
      }
    }
  }

  const identifier = operationId({
    operation, targetIdentity: targetIdentity(root), invokerVersion: release.inventory.bundleVersion,
    installedVersion: state?.installedVersion ?? null,
    requestedVersion: operation === 'uninstall' ? null : release.inventory.bundleVersion,
    managed: managedForOperation(state),
  });

  const releaseOwned = releaseOwnedFiles(release.inventory, release.inventoryBytes);
  const releaseByPath = new Map(releaseOwned.map((item) => [item.path, item]));
  const oldByPath = new Map(state?.ownedFiles.map((item) => [item.path, item]) ?? []);

  if (operation === 'install' && state) {
    const modified = classifyStateSurface(state, oldBytes, agents);
    const sameVersion = state.installedVersion === release.inventory.bundleVersion;
    const sameFiles = state.ownedFiles.length === releaseOwned.length
      && state.ownedFiles.every((item, index) => item.path === releaseOwned[index].path
        && item.sha256 === releaseOwned[index].sha256 && oldBytes.get(item.path)
        && sha256(oldBytes.get(item.path)) === item.sha256);
    const sameBlock = agents.scan.status === 'owned-pair'
      && agents.scan.intervalSha256 === state.agentsMd.blockSha256
      && state.agentsMd.blockSha256 === release.inventory.managedBlock.sha256;
    if (sameVersion && sameFiles && sameBlock && conflicts.length === 0) plan.status = 'NO_OP';
    else addConflict(conflicts, 'INCOMPATIBLE_INSTALLATION', STATE_PATH);
  } else if (operation === 'install') {
    plan.creates = releaseOwned.map((item) => item.path);
    if (!agents.exists) plan.creates.push('AGENTS.md');
    plan.blockAction = 'append';
    if (agents.scan.status !== 'absent') addConflict(conflicts, 'INVALID_MANAGED_MARKER', 'AGENTS.md');
    for (const item of releaseOwned) {
      const info = await inspectContained(root, item.path).catch((error) => {
        addConflict(conflicts, asConflict(error).code, item.path);
        return { type: 'invalid' };
      });
      if (info.type !== 'absent' && info.type !== 'invalid') addConflict(conflicts, 'UNOWNED_DESTINATION', item.path);
      if (info.type !== 'absent' && info.type !== 'invalid') plan.protected.push(item.path);
    }
  } else if (state && operation === 'update') {
    const modified = classifyStateSurface(state, oldBytes, agents);
    plan.modifiedManaged = modified;
    for (const item of releaseOwned) {
      const old = oldByPath.get(item.path);
      if (!old) {
        plan.creates.push(item.path);
        const info = await inspectContained(root, item.path).catch((error) => {
          addConflict(conflicts, asConflict(error).code, item.path);
          return { type: 'invalid' };
        });
        if (info.type !== 'absent' && info.type !== 'invalid') addConflict(conflicts, 'UNOWNED_DESTINATION', item.path);
        if (info.type !== 'absent' && info.type !== 'invalid') plan.protected.push(item.path);
      } else if (old.sha256 !== item.sha256 || sha256(oldBytes.get(item.path) ?? Buffer.alloc(0)) !== item.sha256) {
        plan.replaces.push(item.path);
      }
    }
    for (const item of state.ownedFiles) if (!releaseByPath.has(item.path)) plan.removes.push(item.path);
    const blockMatchesRelease = agents.scan.status === 'owned-pair'
      && agents.scan.intervalSha256 === release.inventory.managedBlock.sha256;
    plan.blockAction = blockMatchesRelease ? 'none' : 'replace';
    const cleanSurface = modified.length === 0 && plan.creates.length === 0
      && plan.replaces.length === 0 && plan.removes.length === 0 && blockMatchesRelease;
    if (state.installedVersion === release.inventory.bundleVersion && cleanSurface && conflicts.length === 0) plan.status = 'NO_OP';
  } else if (state && operation === 'uninstall') {
    plan.modifiedManaged = classifyStateSurface(state, oldBytes, agents);
    plan.removes = state.ownedFiles.map((item) => item.path);
    plan.blockAction = 'remove';
  }

  for (const item of plan.modifiedManaged) {
    const sourcePath = item.kind === 'managed-block' ? 'AGENTS.md#managed-block' : item.path;
    plan.backups.push({ sourcePath, backupPath: backupPath(identifier, sourcePath), sha256: item.currentSha256 });
  }
  for (const backup of plan.backups) {
    try {
      const info = await inspectContained(root, backup.backupPath);
      if (info.type === 'file') {
        if (sha256(await readContainedFile(root, backup.backupPath)) !== backup.sha256) {
          addConflict(conflicts, 'UNOWNED_DESTINATION', backup.backupPath);
          plan.protected.push(backup.backupPath);
        }
      } else if (info.type !== 'absent') addConflict(conflicts, 'UNSAFE_PATH', backup.backupPath);
    } catch (error) {
      const mapped = asConflict(error);
      addConflict(conflicts, mapped.code, mapped.path ?? backup.backupPath);
    }
  }
  if (agents.exists) plan.protected.push('AGENTS.md');
  if (state?.backups.length) plan.protected.push('.oh-my-harness-backups');

  const gitPaths = uniqueSorted([...release.files.keys(), ...(state?.ownedFiles.map((item) => item.path) ?? []), 'AGENTS.md', STATE_PATH]);
  plan.gitOverlap = await exactGitOverlap(root, gitPaths);
  const gitEvidence = plan.gitOverlap.evidence;
  if (plan.gitOverlap.status === 'unsafe-git-layout') addConflict(conflicts, 'IO_UNAVAILABLE', '.git');
  if (plan.gitOverlap.status === 'overlap') {
    const owned = new Set(state?.ownedFiles.map((item) => item.path) ?? []);
    if (state) owned.add('AGENTS.md');
    for (const row of plan.gitOverlap.paths) if (!owned.has(row.path)) addConflict(conflicts, 'DIRTY_OVERLAP', row.path);
  }

  plan.creates = uniqueSorted(plan.creates);
  plan.replaces = uniqueSorted(plan.replaces);
  plan.removes = uniqueSorted(plan.removes);
  plan.protected = uniqueSorted(plan.protected);
  plan.modifiedManaged = uniqueSorted(plan.modifiedManaged, modifiedSort);
  plan.backups = uniqueSorted(plan.backups, backupSort);
  plan.conflicts = uniqueSorted(conflicts, conflictSort);
  plan.gitOverlap = { status: plan.gitOverlap.status, paths: uniqueSorted(plan.gitOverlap.paths, (left, right) => byteCompare(left.path, right.path) || byteCompare(left.state, right.state)) };
  plan.verification = VERIFICATION_ORDER.filter((item) => item !== 'backups' || plan.backups.length > 0)
    .filter((item) => !(operation === 'uninstall' && ['inventory', 'payload-hashes', 'profiles', 'references', 'state'].includes(item)));
  if (incomplete) plan.status = 'INCOMPLETE_OR_UNOWNED';
  else if (plan.conflicts.length) plan.status = 'CONFLICT';

  const envelope = planEnvelope(plan);
  const paths = planPaths(plan, state, release);
  const fingerprints = await captureFingerprints(root, paths);
  const modifiedBytes = new Map();
  for (const item of plan.modifiedManaged) {
    if (item.kind === 'managed-block') modifiedBytes.set('AGENTS.md#managed-block', agents.scan.interval);
    else modifiedBytes.set(item.path, oldBytes.get(item.path));
  }
  return {
    plan, envelope,
    context: {
      root, release, state, stateBytes, oldBytes, agents, operationId: identifier,
      fingerprints, paths, modifiedBytes, targetIdentity: targetIdentity(root),
      gitEvidence,
    },
  };
}

function faultController(faults) {
  const set = faults instanceof Set ? faults : new Set(faults ?? []);
  return (name, safePath = null) => {
    if (set.has(name) || set.has(name.split(':')[0])) {
      throw new LifecycleError(`injected ${name} failure`, { safePath });
    }
  };
}

async function createSentinel(context, envelope, operation, trigger) {
  const { root, stateBytes, operationId: id, release } = context;
  const namespace = await inspectContained(root, '.oh-my-harness');
  if (operation === 'install' && namespace.type === 'absent') {
    await ensureContainedParents(root, SENTINEL_PATH, {
      onDirectoryCreated: (directory) => {
        context.createdDirectories.add(directory);
        if (directory === '.oh-my-harness') context.namespaceCreated = true;
      },
    });
    trigger('sentinel-parent');
  } else if (namespace.type !== 'directory') {
    throw new LifecycleError('owned namespace is unavailable', { safePath: '.oh-my-harness' });
  }
  const document = sentinelDocument({
    operationId: id, operation, targetIdentity: context.targetIdentity,
    priorStateSha256: stateBytes ? sha256(stateBytes) : null,
    requestedVersion: operation === 'uninstall' ? null : release.inventory.bundleVersion,
    planSha256: envelope.planSha256,
  });
  const bytes = canonicalBytes(document);
  try {
    trigger('sentinel-temp-write', SENTINEL_TEMP_PATH);
    await writeExclusiveContained(root, SENTINEL_TEMP_PATH, bytes, { mode: 0o600 });
    trigger('sentinel-link', SENTINEL_PATH);
    await linkContainedFile(root, SENTINEL_TEMP_PATH, SENTINEL_PATH, {
      onMutation: () => { context.sentinelPublished = true; },
    });
    trigger('sentinel-verify', SENTINEL_PATH);
    if (!(await readContainedFile(root, SENTINEL_PATH)).equals(bytes)) throw new Error('sentinel bytes differ');
    trigger('sentinel-temp-cleanup', SENTINEL_TEMP_PATH);
    await removeContainedFile(root, SENTINEL_TEMP_PATH);
    if ((await inspectContained(root, SENTINEL_TEMP_PATH)).type !== 'absent') throw new Error('sentinel temp remains');
    return bytes;
  } catch (error) {
    throw error instanceof LifecycleError ? error : new LifecycleError('operation sentinel creation failed', { safePath: SENTINEL_PATH });
  }
}

async function verifyBackups(root, backups) {
  for (const backup of backups) {
    const bytes = await readContainedFile(root, backup.backupPath);
    if (sha256(bytes) !== backup.sha256) throw new LifecycleError('backup verification failed', { safePath: backup.backupPath });
  }
}

async function verifyReleaseSurface(context, expectedAgentsOuter) {
  const { root, release } = context;
  for (const [relativePath, expected] of release.files) {
    const actual = await readContainedFile(root, relativePath);
    if (!actual.equals(expected)) throw new LifecycleError('payload verification failed', { safePath: relativePath });
  }
  const agents = await literalAgents(root);
  if (agents.scan.status !== 'owned-pair' || !agents.scan.interval.equals(release.managedBlock)
      || !agents.scan.prefix.equals(expectedAgentsOuter.prefix)
      || !agents.scan.suffix.equals(expectedAgentsOuter.suffix)) {
    throw new LifecycleError('managed block or outer-byte verification failed', { safePath: 'AGENTS.md' });
  }
}

async function verifyStateSurface(root, stateBytes, release) {
  const state = parseInstallState(stateBytes, { canonicalRoot: root });
  for (const directory of state.managedDirectories) {
    await inspectContained(root, directory, { allowMissing: false, expect: 'directory' });
  }
  for (const item of state.ownedFiles) {
    if (sha256(await readContainedFile(root, item.path)) !== item.sha256) {
      throw new LifecycleError('state does not match installed payload', { safePath: item.path });
    }
  }
  const agents = await literalAgents(root);
  if (agents.scan.status !== 'owned-pair' || agents.scan.intervalSha256 !== state.agentsMd.blockSha256
      || state.installedVersion !== release.inventory.bundleVersion) {
    throw new LifecycleError('state does not match managed block or release version', { safePath: STATE_PATH });
  }
  return state;
}

async function writeCandidateState(context, operation, backups, trigger, onMutation) {
  const timestamp = new Date().toISOString();
  const state = buildInstallState({
    inventory: context.release.inventory, inventoryBytes: context.release.inventoryBytes,
    canonicalRoot: context.root, operation, operationId: context.operationId,
    priorVersion: context.state?.installedVersion ?? null,
    agentsMode: context.state?.agentsMd.mode ?? (context.agents.exists ? 'managed-block' : 'created-file'),
    timestamp, verificationTimestamp: timestamp,
    managedDirectories: context.createdDirectories,
    backups: backups.map((item) => ({
      path: item.backupPath, sourcePath: item.sourcePath, sha256: item.sha256, operationId: context.operationId,
    })),
  });
  const bytes = canonicalBytes(state);
  trigger('state-write', STATE_TEMP_PATH);
  const tempInfo = await inspectContained(context.root, STATE_TEMP_PATH);
  if (tempInfo.type !== 'absent') throw new LifecycleError('state temp already exists', { safePath: STATE_TEMP_PATH });
  await writeExclusiveContained(context.root, STATE_TEMP_PATH, bytes, { mode: 0o600 });
  trigger('state-verify', STATE_TEMP_PATH);
  const candidate = await readContainedFile(context.root, STATE_TEMP_PATH);
  if (!candidate.equals(bytes)) throw new LifecycleError('candidate state bytes differ', { safePath: STATE_TEMP_PATH });
  parseInstallState(candidate, { canonicalRoot: context.root });
  await verifyReleaseSurface(context, context.expectedOuter);
  const stateBefore = await inspectContained(context.root, STATE_PATH);
  if (context.state ? stateBefore.type !== 'file' : stateBefore.type !== 'absent') {
    throw new LifecycleError('state changed before replacement', { code: 'TARGET_CHANGED', exitCode: 4, safePath: STATE_PATH });
  }
  await publishContainedFile(context.root, STATE_TEMP_PATH, STATE_PATH, {
    replace: context.state !== null, before: stateBefore, onMutation,
  });
  const canonicalState = await readContainedFile(context.root, STATE_PATH);
  if (!canonicalState.equals(bytes)) throw new LifecycleError('canonical state replacement did not verify', { safePath: STATE_PATH });
  await verifyStateSurface(context.root, canonicalState, context.release);
  return bytes;
}

async function restoreOldState(context, trigger) {
  if (!context.stateBytes) return;
  trigger('state-restore', STATE_PATH);
  const current = await inspectContained(context.root, STATE_PATH);
  if (current.type === 'file') await writeAtomicContained(context.root, STATE_PATH, context.stateBytes, { replace: true, mode: 0o600, exactTemp: STATE_TEMP_PATH });
  else if (current.type === 'absent') await writeAtomicContained(context.root, STATE_PATH, context.stateBytes, { replace: false, mode: 0o600, exactTemp: STATE_TEMP_PATH });
  else throw new LifecycleError('old state could not be restored', { safePath: STATE_PATH });
  if (!(await readContainedFile(context.root, STATE_PATH)).equals(context.stateBytes)) {
    throw new LifecycleError('old state restoration did not verify', { safePath: STATE_PATH });
  }
}

async function retainSentinel(context, sentinelBytes) {
  const info = await inspectContained(context.root, SENTINEL_PATH);
  if (info.type === 'absent') await writeExclusiveContained(context.root, SENTINEL_PATH, sentinelBytes, { mode: 0o600 });
}

async function recheckPlan(original, target, release) {
  const fresh = await createLifecyclePlan({ operation: original.plan.operation, target, release });
  const originalBytes = canonicalBytes(original.plan);
  const freshBytes = canonicalBytes(fresh.plan);
  const fingerprintsMatch = original.context.paths.length === fresh.context.paths.length
    && original.context.paths.every((item, index) => item === fresh.context.paths[index]
      && original.context.fingerprints.get(item) === fresh.context.fingerprints.get(item));
  if (!freshBytes.equals(originalBytes) || fresh.envelope.planSha256 !== original.envelope.planSha256
      || !fingerprintsMatch) {
    throw new LifecycleError('target changed after plan confirmation', { code: 'TARGET_CHANGED', exitCode: 4 });
  }
  return fresh;
}

function resultReport(plan, changed, temporary, sentinel, state, backups, directories, error = null) {
  const changedSet = new Set(changed);
  const planned = uniqueSorted([...plan.creates, ...plan.replaces, ...plan.removes, ...(plan.blockAction !== 'none' ? ['AGENTS.md'] : [])]);
  return {
    operation: plan.operation,
    success: error === null,
    changed: uniqueSorted(changed),
    unchanged: planned.filter((item) => !changedSet.has(item)),
    temporary: uniqueSorted(temporary), sentinel, state,
    backups: backups.map((item) => item.backupPath).sort(byteCompare),
    directories: {
      removed: uniqueSorted(directories.removed),
      preserved: uniqueSorted(directories.preserved),
    },
    error: error ? { path: error.safePath ?? null, reason: error.message } : null,
  };
}

export async function applyLifecyclePlan({ planned, target, release, faults = [] }) {
  if (planned.plan.status !== 'READY') throw new LifecycleError('only a READY plan may be applied', { exitCode: 4 });
  const fresh = await recheckPlan(planned, target, release);
  const { plan, envelope, context } = fresh;
  const trigger = faultController(faults);
  const changed = [];
  const temporary = [];
  const createdBackups = [];
  const directories = { removed: [], preserved: [] };
  let sentinelBytes = null;
  let oldStateDeleted = false;
  let committed = false;
  context.expectedOuter = { prefix: context.agents.scan.prefix, suffix: context.agents.scan.suffix };
  context.createdDirectories = new Set(context.state?.managedDirectories ?? []);
  const recordCreatedDirectory = (directory) => context.createdDirectories.add(directory);

  try {
    sentinelBytes = await createSentinel(context, envelope, plan.operation, trigger);
    for (const backup of plan.backups) {
      const bytes = context.modifiedBytes.get(backup.sourcePath);
      if (!bytes || sha256(bytes) !== backup.sha256) throw new LifecycleError('backup source changed', { code: 'TARGET_CHANGED', exitCode: 4, safePath: backup.sourcePath });
      trigger(`backup-write:${backup.backupPath}`, backup.backupPath);
      await writeExclusiveContained(context.root, backup.backupPath, bytes, { mode: 0o600 });
      createdBackups.push(backup);
    }
    await verifyBackups(context.root, createdBackups);

    if (plan.operation === 'install' || plan.operation === 'update') {
      for (const relativePath of plan.creates) {
        if (relativePath === 'AGENTS.md') continue;
        trigger(`payload-write:${relativePath}`, relativePath);
        await writeAtomicContained(context.root, relativePath, release.files.get(relativePath), {
          replace: false, onMutation: () => changed.push(relativePath),
          onDirectoryCreated: recordCreatedDirectory,
        });
      }
      for (const relativePath of plan.replaces) {
        trigger(`payload-write:${relativePath}`, relativePath);
        await writeAtomicContained(context.root, relativePath, release.files.get(relativePath), {
          replace: true, onMutation: () => changed.push(relativePath),
          onDirectoryCreated: recordCreatedDirectory,
        });
      }
      for (const relativePath of plan.removes) {
        trigger(`payload-delete:${relativePath}`, relativePath);
        await removeContainedFile(context.root, relativePath, { onMutation: () => changed.push(relativePath) });
      }
      if (plan.blockAction === 'append') {
        const bytes = appendManagedBlock(context.agents.bytes, release.managedBlock);
        await writeAtomicContained(context.root, 'AGENTS.md', bytes, {
          replace: context.agents.exists, mode: context.agents.mode,
          onMutation: () => changed.push('AGENTS.md'),
        });
      } else if (plan.blockAction === 'replace') {
        const bytes = replaceManagedBlock(context.agents.bytes, release.managedBlock);
        await writeAtomicContained(context.root, 'AGENTS.md', bytes, {
          replace: true, mode: context.agents.mode, onMutation: () => changed.push('AGENTS.md'),
        });
      }
      trigger('payload-verify');
      await verifyReleaseSurface(context, context.expectedOuter);
      await verifyBackups(context.root, createdBackups);
      await writeCandidateState(context, plan.operation, createdBackups, trigger,
        () => changed.push(STATE_PATH));
    } else {
      for (const relativePath of plan.removes) {
        trigger(`payload-delete:${relativePath}`, relativePath);
        await removeContainedFile(context.root, relativePath, { onMutation: () => changed.push(relativePath) });
      }
      const removal = removeManagedBlock(context.agents.bytes);
      if (context.state.agentsMd.mode === 'created-file' && removal.bytes.length === 0) {
        await removeContainedFile(context.root, 'AGENTS.md', { onMutation: () => changed.push('AGENTS.md') });
      } else {
        await writeAtomicContained(context.root, 'AGENTS.md', removal.bytes, {
          replace: true, mode: context.agents.mode, onMutation: () => changed.push('AGENTS.md'),
        });
      }
      for (const item of context.state.ownedFiles) {
        if ((await inspectContained(context.root, item.path)).type !== 'absent') throw new LifecycleError('owned removal did not verify', { safePath: item.path });
      }
      const postAgents = await inspectContained(context.root, 'AGENTS.md');
      if (postAgents.type === 'file') {
        const bytes = await readContainedFile(context.root, 'AGENTS.md');
        if (!bytes.equals(Buffer.concat([context.agents.scan.prefix, context.agents.scan.suffix]))) {
          throw new LifecycleError('AGENTS.md outer bytes changed during uninstall', { safePath: 'AGENTS.md' });
        }
      } else if (!(context.state.agentsMd.mode === 'created-file'
          && context.agents.scan.prefix.length === 0 && context.agents.scan.suffix.length === 0)) {
        throw new LifecycleError('AGENTS.md preservation did not verify', { safePath: 'AGENTS.md' });
      }
      await verifyBackups(context.root, createdBackups);
      trigger('state-delete', STATE_PATH);
      await removeContainedFile(context.root, STATE_PATH, {
        onMutation: () => {
          oldStateDeleted = true;
          changed.push(STATE_PATH);
        },
      });
    }

    trigger('sentinel-delete', SENTINEL_PATH);
    await removeContainedFile(context.root, SENTINEL_PATH);
    trigger('sentinel-absence-verify', SENTINEL_PATH);
    if ((await inspectContained(context.root, SENTINEL_PATH)).type !== 'absent') throw new LifecycleError('sentinel deletion did not verify', { safePath: SENTINEL_PATH });
    committed = true;
    if (plan.operation === 'uninstall') {
      const recorded = new Set(context.state.managedDirectories);
      const candidates = managedDirectoryCandidates(context.state.ownedFiles)
        .sort((left, right) => right.split('/').length - left.split('/').length || byteCompare(right, left));
      for (const directory of candidates) {
        if (!recorded.has(directory)) {
          const info = await inspectContained(context.root, directory).catch(() => ({ type: 'unsafe' }));
          if (info.type !== 'absent') directories.preserved.push(directory);
          continue;
        }
        const outcome = await removeEmptyContainedDirectory(context.root, directory).catch(() => 'preserved');
        if (outcome === 'removed') directories.removed.push(directory);
        else if (outcome === 'preserved') directories.preserved.push(directory);
      }
    }
    return { exitCode: 0, report: resultReport(plan, changed, temporary, 'absent', plan.operation === 'uninstall' ? 'absent' : 'verified', createdBackups, directories) };
  } catch (error) {
    const failure = error instanceof LifecycleError ? error : new LifecycleError('lifecycle write or verification failed');
    try {
      if (!committed) {
        const currentStateInfo = await inspectContained(context.root, STATE_PATH).catch(() => ({ type: 'absent' }));
        if (plan.operation === 'install' && currentStateInfo.type === 'file') {
          trigger('state-delete-after-failure', STATE_PATH);
          await removeContainedFile(context.root, STATE_PATH);
        } else if (plan.operation === 'update' && currentStateInfo.type === 'file') {
          const currentStateBytes = await readContainedFile(context.root, STATE_PATH);
          if (!currentStateBytes.equals(context.stateBytes)) await restoreOldState(context, trigger);
        } else if (plan.operation === 'uninstall' && oldStateDeleted) {
          await restoreOldState(context, trigger);
        }
        if (sentinelBytes) await retainSentinel(context, sentinelBytes);
      }
    } catch (restoreError) {
      failure.message = `${failure.message}; state preservation failed`;
      failure.report = { preservationFailure: restoreError.safePath ?? STATE_PATH };
      if (sentinelBytes) await retainSentinel(context, sentinelBytes).catch(() => {});
    }
    for (const tempPath of [SENTINEL_TEMP_PATH, STATE_TEMP_PATH, ...context.paths.map(payloadTempPath)]) {
      if ((await inspectContained(context.root, tempPath).catch(() => ({ type: 'absent' }))).type !== 'absent') temporary.push(tempPath);
    }
    const sentinelState = (await inspectContained(context.root, SENTINEL_PATH).catch(() => ({ type: 'absent' }))).type === 'file' ? 'present' : 'absent';
    if (context.namespaceCreated) changed.push('.oh-my-harness');
    if (sentinelState === 'present') changed.push(SENTINEL_PATH);
    const stateState = (await inspectContained(context.root, STATE_PATH).catch(() => ({ type: 'absent' }))).type === 'file'
      ? (plan.operation === 'update' || plan.operation === 'uninstall' ? 'prior-preserved' : 'present') : 'absent';
    failure.report = resultReport(plan, changed, temporary, sentinelState, stateState, createdBackups, directories, failure);
    throw failure;
  }
}

export async function runLifecycle({ operation, target, release, dryRun = false, confirmed = false, faults = [] }) {
  const planned = await createLifecyclePlan({ operation, target, release });
  if (planned.plan.status === 'INCOMPLETE_OR_UNOWNED') return { exitCode: 5, planned, report: null };
  if (planned.plan.status === 'CONFLICT') return { exitCode: 4, planned, report: null };
  if (planned.plan.status === 'NO_OP' || dryRun) return { exitCode: 0, planned, report: null };
  if (!confirmed) return { exitCode: 3, planned, report: null };
  try {
    const result = await applyLifecyclePlan({ planned, target, release, faults });
    return { ...result, planned };
  } catch (error) {
    return { exitCode: error.exitCode ?? 5, planned, report: error.report, error };
  }
}
