import { spawnSync } from 'node:child_process';
import { lstat, mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  byteCompare, canonicalBytes, canonicalTarget, containedRootIdentity, ensureContainedParents,
  containedPath, exactGitOverlap, fingerprintContained, inspectContained, LifecycleError,
  linkContainedFile, payloadTempPath, pinContainedRoot, publishContainedFile, readContainedFile,
  removeContainedFile, removeEmptyContainedDirectory,
  sha256, writeAtomicContained, writeExclusiveContained,
} from './filesystem.mjs';
import { appendManagedBlock, removeManagedBlock, replaceManagedBlock, scanManagedBlock } from './markers.mjs';
import {
  AGENT_PATHS, BINARY_NAME, buildInstallState, classifyInstalledInventory, operationId, PACKAGE_NAME,
  managedDirectoryCandidates, parseInstallState, parseOperationSentinel,
  PRIOR_INVENTORY_CLASS, PRIOR_OBSOLETE_PATH,
  reconcileInstallStateInventory, releaseOwnedFiles,
  SENTINEL_PATH, SENTINEL_TEMP_PATH,
  sentinelDocument, STATE_PATH, STATE_TEMP_PATH, TARGET_INVENTORY_CLASS, targetIdentity, validateInventory,
} from './state.mjs';

export const CONFLICT_CODES = [
  'UNMANAGED_NAMESPACE', 'UNOWNED_DESTINATION', 'INVALID_MANAGED_MARKER',
  'UNVERIFIABLE_INSTALL_STATE', 'INCOMPATIBLE_INSTALLATION', 'DIRTY_OVERLAP',
  'PRIOR_IDENTITY_MISMATCH', 'OWNED_DRIFT', 'MISSING_OWNED_SURFACE',
  'RECOVERY_IDENTITY_MISMATCH', 'RECOVERY_AMBIGUOUS', 'RECOVERY_REQUIRED',
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
  const precedence = new Map([
    ['UNSAFE_PATH', 1], ['IO_UNAVAILABLE', 1],
    ['RECOVERY_IDENTITY_MISMATCH', 2], ['RECOVERY_AMBIGUOUS', 2], ['RECOVERY_REQUIRED', 2],
    ['UNVERIFIABLE_INSTALL_STATE', 3], ['INCOMPATIBLE_INSTALLATION', 3],
    ['PRIOR_IDENTITY_MISMATCH', 4], ['INVALID_MANAGED_MARKER', 5], ['MISSING_OWNED_SURFACE', 5],
    ['OWNED_DRIFT', 7], ['UNOWNED_DESTINATION', 8], ['DIRTY_OVERLAP', 8],
    ['UNMANAGED_NAMESPACE', 8], ['TARGET_CHANGED', 9],
  ]);
  const priority = (precedence.get(left.code) ?? 99) - (precedence.get(right.code) ?? 99);
  if (priority) return priority;
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
    installedClass: null,
    priorInventorySha256: null,
    requestedInventorySha256: operation === 'uninstall' ? null : sha256(release.inventoryBytes),
    recoveryAction: 'none',
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
  const suffix = sourcePath === 'AGENTS.md#managed-block' ? 'AGENTS.md.managed-block'
    : sourcePath === STATE_PATH ? `${STATE_PATH}.prior` : sourcePath;
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

async function recoveryConflictPlan(operation, root, release, code, safePath = SENTINEL_PATH) {
  const plan = basePlan(operation, release);
  plan.status = 'CONFLICT';
  plan.recoveryAction = 'none';
  plan.conflicts = [{ code, path: safePath }];
  const envelope = planEnvelope(plan);
  return {
    plan, envelope,
    context: {
      root, release, state: null, stateBytes: null, oldBytes: new Map(), agents: await literalAgents(root),
      operationId: null, fingerprints: new Map(), paths: [], modifiedBytes: new Map(),
      rootIdentity: await containedRootIdentity(root), targetIdentity: targetIdentity(root), gitEvidence: null,
    },
  };
}

async function exactTargetClosure(root, release) {
  try {
    for (const [relativePath, expected] of release.files) {
      if (!(await readContainedFile(root, relativePath)).equals(expected)) return false;
    }
    const agents = await literalAgents(root);
    if (agents.scan.status !== 'owned-pair' || !agents.scan.interval.equals(release.managedBlock)) return false;
    const stateBytes = await readContainedFile(root, STATE_PATH);
    const state = parseInstallState(stateBytes, { canonicalRoot: root });
    reconcileInstallStateInventory(state, release.inventory, release.inventoryBytes);
    return state.installedVersion === release.inventory.bundleVersion;
  } catch {
    return false;
  }
}

function parseRecoveryGitStatus(output) {
  const rows = [];
  for (const line of output.split('\n').filter(Boolean)) {
    if (line.length < 4) throw new LifecycleError('Git status output was not parseable', {
      code: 'IO_UNAVAILABLE', exitCode: 4, safePath: '.git',
    });
    const x = line[0];
    const y = line[1];
    const filePath = line.slice(3);
    if (x === '?' && y === '?') rows.push({ path: filePath, state: 'untracked' });
    else {
      if (x !== ' ') rows.push({ path: filePath, state: x === 'D' ? 'deleted' : 'staged' });
      if (y !== ' ') rows.push({ path: filePath, state: y === 'D' ? 'deleted' : 'unstaged' });
    }
  }
  return rows.sort((left, right) => byteCompare(left.path, right.path) || byteCompare(left.state, right.state));
}

function safeRecoveryGitReference(value) {
  const match = value.match(/^refs\/(heads|tags)\/(.+)$/);
  if (!match) return false;
  return match[2].split('/').every((segment) => /^[A-Za-z0-9._-]+$/.test(segment)
    && segment !== '.' && !segment.includes('..') && !segment.endsWith('.') && !segment.endsWith('.lock'));
}

async function exactOriginalGitOverlap(root, paths, originalFiles) {
  const current = await exactGitOverlap(root, paths);
  if (!['clean', 'overlap'].includes(current.status)) {
    return { status: current.status, paths: current.paths };
  }
  const executable = current.evidence?.executable;
  if (typeof executable !== 'string') throw new LifecycleError('trusted Git evidence is unavailable', {
    code: 'IO_UNAVAILABLE', exitCode: 4, safePath: '.git',
  });
  const head = (await readContainedFile(root, '.git/HEAD')).toString('ascii').trim();
  let oid = null;
  let reference = null;
  let unborn = false;
  if (/^[0-9a-f]{40}$/.test(head)) oid = head;
  else if (head.startsWith('ref: ') && safeRecoveryGitReference(head.slice(5))) {
    reference = head.slice(5);
    const looseInfo = await inspectContained(root, `.git/${reference}`);
    if (looseInfo.type === 'file') {
      const value = (await readContainedFile(root, `.git/${reference}`)).toString('ascii').trim();
      if (/^[0-9a-f]{40}$/.test(value)) oid = value;
    } else if (looseInfo.type === 'absent') {
      const packedInfo = await inspectContained(root, '.git/packed-refs');
      const packed = packedInfo.type === 'file'
        ? (await readContainedFile(root, '.git/packed-refs')).toString('ascii').split('\n') : [];
      const matches = packed.filter((line) => line.endsWith(` ${reference}`));
      if (matches.length === 1 && /^[0-9a-f]{40} /.test(matches[0])) oid = matches[0].slice(0, 40);
      else if (matches.length === 0 && reference.startsWith('refs/heads/')) unborn = true;
    }
  }
  if (!oid && !unborn) throw new LifecycleError('Git HEAD could not be reconstructed', {
    code: 'IO_UNAVAILABLE', exitCode: 4, safePath: '.git/HEAD',
  });

  let temporaryRoot;
  try {
    temporaryRoot = await mkdtemp(path.join(os.tmpdir(), 'oh-my-harness-recovery-git-'));
    const tempGit = path.join(temporaryRoot, 'git');
    const shadow = path.join(temporaryRoot, 'shadow');
    await mkdir(path.join(tempGit, 'objects', 'info'), { recursive: true });
    await mkdir(path.join(tempGit, 'refs', 'heads'), { recursive: true });
    await mkdir(shadow);
    await writeFile(path.join(tempGit, 'HEAD'), unborn ? `ref: ${reference}\n` : `${oid}\n`, { flag: 'wx' });
    const indexInfo = await inspectContained(root, '.git/index');
    if (indexInfo.type === 'file') {
      await writeFile(path.join(tempGit, 'index'), await readContainedFile(root, '.git/index'), { flag: 'wx' });
    }
    await writeFile(path.join(tempGit, 'config'), '[core]\n\trepositoryformatversion = 0\n\tbare = false\n\thooksPath = /dev/null\n', { flag: 'wx' });
    await writeFile(path.join(tempGit, 'objects', 'info', 'alternates'), `${containedPath(root, '.git/objects')}\n`, { flag: 'wx' });
    for (const [relativePath, file] of originalFiles) {
      const destination = path.join(shadow, ...relativePath.split('/'));
      await mkdir(path.dirname(destination), { recursive: true });
      await writeFile(destination, file.bytes, { flag: 'wx', mode: file.mode });
    }
    const cleanEnv = [
      `PATH=${path.dirname(executable)}`, `HOME=${path.join(temporaryRoot, 'home')}`,
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
    if (child.status !== 0 || child.signal || child.error || child.stderr) {
      throw new LifecycleError('original Git status could not be reconstructed', {
        code: 'IO_UNAVAILABLE', exitCode: 4, safePath: '.git',
      });
    }
    const overlap = parseRecoveryGitStatus(child.stdout);
    return { status: overlap.length ? 'overlap' : 'clean', paths: overlap };
  } finally {
    if (temporaryRoot) {
      await rm(temporaryRoot, { recursive: true, force: true });
      try {
        await lstat(temporaryRoot);
        throw new LifecycleError('temporary recovery Git view remains', {
          code: 'IO_UNAVAILABLE', exitCode: 5, safePath: '.git',
        });
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
    }
  }
}

async function originalRecoveryPlanSha256({
  operation, root, release, plan, priorState, priorStateBytes, agents,
}) {
  const originalPlan = structuredClone(plan);
  originalPlan.recoveryAction = 'none';
  originalPlan.protected = [];
  if (agents.exists) originalPlan.protected.push('AGENTS.md');
  if (priorState.backups.length) originalPlan.protected.push('.oh-my-harness-backups');
  originalPlan.protected = uniqueSorted(originalPlan.protected);
  const gitPaths = uniqueSorted([
    ...release.files.keys(), ...priorState.ownedFiles.map((item) => item.path),
    'AGENTS.md', STATE_PATH,
  ]);
  const backups = new Map(plan.backups.map((item) => [item.sourcePath, item]));
  const originalFiles = new Map();
  for (const item of priorState.ownedFiles) {
    const current = await inspectContained(root, item.path);
    let bytes;
    let mode = 0o644;
    if (current.type === 'file') {
      const currentBytes = await readContainedFile(root, item.path);
      if (sha256(currentBytes) === item.sha256) {
        bytes = currentBytes;
        mode = current.mode;
      }
    }
    if (!bytes) {
      const backup = backups.get(item.path);
      if (!backup) throw new LifecycleError('original recovery bytes are unavailable', {
        code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: item.path,
      });
      bytes = await readContainedFile(root, backup.backupPath);
    }
    originalFiles.set(item.path, { bytes, mode });
  }
  let priorBlock = agents.scan.interval;
  if (agents.scan.intervalSha256 !== priorState.agentsMd.blockSha256) {
    const backup = backups.get('AGENTS.md#managed-block');
    if (!backup) throw new LifecycleError('original managed block is unavailable', {
      code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: 'AGENTS.md',
    });
    priorBlock = await readContainedFile(root, backup.backupPath);
  }
  originalFiles.set('AGENTS.md', {
    bytes: Buffer.concat([agents.scan.prefix, priorBlock, agents.scan.suffix]),
    mode: agents.mode,
  });
  originalFiles.set(STATE_PATH, { bytes: priorStateBytes, mode: 0o600 });
  const gitOverlap = await exactOriginalGitOverlap(root, gitPaths, originalFiles);
  originalPlan.gitOverlap = {
    status: gitOverlap.status,
    paths: uniqueSorted(gitOverlap.paths, (left, right) => byteCompare(left.path, right.path)
      || byteCompare(left.state, right.state)),
  };
  originalPlan.verification = VERIFICATION_ORDER.filter((item) => item !== 'backups'
    || originalPlan.backups.length > 0)
    .filter((item) => !(operation === 'uninstall'
      && ['inventory', 'payload-hashes', 'profiles', 'references', 'state'].includes(item)));
  return sha256(canonicalBytes(originalPlan));
}

async function createRecoveryPlan({ operation, root, release, sentinelBytes }) {
  let sentinel;
  try {
    sentinel = parseOperationSentinel(sentinelBytes);
  } catch {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_IDENTITY_MISMATCH');
  }
  if (sentinel.operation !== operation || sentinel.targetIdentity !== targetIdentity(root)) {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_REQUIRED');
  }
  const requestedInventorySha256 = operation === 'uninstall' ? null : sha256(release.inventoryBytes);
  if (sentinel.requestedInventorySha256 !== requestedInventorySha256
      || sentinel.requestedVersion !== (operation === 'uninstall' ? null : release.inventory.bundleVersion)) {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_IDENTITY_MISMATCH');
  }
  const stateBackupPath = backupPath(sentinel.operationId, STATE_PATH);
  let priorStateBytes = null;
  try {
    const current = await inspectContained(root, STATE_PATH);
    if (current.type === 'file') {
      const bytes = await readContainedFile(root, STATE_PATH);
      if (sha256(bytes) === sentinel.priorStateSha256) priorStateBytes = bytes;
    }
    if (!priorStateBytes) {
      const backup = await readContainedFile(root, stateBackupPath);
      if (sha256(backup) !== sentinel.priorStateSha256) throw new Error('state backup mismatch');
      priorStateBytes = backup;
    }
  } catch {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_AMBIGUOUS', STATE_PATH);
  }
  let priorState;
  let priorInventoryBytes;
  let priorInventory;
  let installedClass;
  try {
    priorState = parseInstallState(priorStateBytes, { canonicalRoot: root });
    const inventoryRecord = priorState.ownedFiles.find((item) => item.path === '.oh-my-harness/bundle-inventory.json');
    if (!inventoryRecord || inventoryRecord.sha256 !== sentinel.priorInventorySha256) throw new Error('prior inventory state mismatch');
    const currentInventory = await inspectContained(root, '.oh-my-harness/bundle-inventory.json');
    if (currentInventory.type === 'file') {
      const bytes = await readContainedFile(root, '.oh-my-harness/bundle-inventory.json');
      if (sha256(bytes) === sentinel.priorInventorySha256) priorInventoryBytes = bytes;
    }
    if (!priorInventoryBytes) {
      if (operation === 'uninstall' && sha256(release.inventoryBytes) === sentinel.priorInventorySha256) {
        priorInventoryBytes = release.inventoryBytes;
      } else {
        priorInventoryBytes = await readContainedFile(root, backupPath(sentinel.operationId, '.oh-my-harness/bundle-inventory.json'));
      }
    }
    if (sha256(priorInventoryBytes) !== sentinel.priorInventorySha256) throw new Error('prior inventory backup mismatch');
    priorInventory = JSON.parse(priorInventoryBytes.toString('utf8'));
    installedClass = classifyInstalledInventory(priorInventory, priorInventoryBytes);
    reconcileInstallStateInventory(priorState, priorInventory, priorInventoryBytes);
  } catch {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_AMBIGUOUS', '.oh-my-harness/bundle-inventory.json');
  }
  const releaseOwned = releaseOwnedFiles(release.inventory, release.inventoryBytes);
  const releaseByPath = new Map(releaseOwned.map((item) => [item.path, item]));
  const priorByPath = new Map(priorState.ownedFiles.map((item) => [item.path, item]));
  const plan = basePlan(operation, release);
  plan.currentVersion = priorState.installedVersion;
  plan.installedClass = installedClass;
  plan.priorInventorySha256 = sha256(priorInventoryBytes);
  plan.recoveryAction = 'restore-prior';
  if (operation === 'update') {
    plan.creates = releaseOwned.filter((item) => !priorByPath.has(item.path)).map((item) => item.path);
    plan.replaces = releaseOwned.filter((item) => priorByPath.has(item.path)
      && priorByPath.get(item.path).sha256 !== item.sha256).map((item) => item.path);
    plan.removes = priorState.ownedFiles.filter((item) => !releaseByPath.has(item.path)).map((item) => item.path);
    plan.blockAction = priorState.agentsMd.blockSha256 === release.inventory.managedBlock.sha256 ? 'none' : 'replace';
  } else if (operation === 'uninstall') {
    plan.removes = priorState.ownedFiles.map((item) => item.path);
    plan.blockAction = 'remove';
  } else {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_AMBIGUOUS');
  }
  for (const relativePath of uniqueSorted(operation === 'update' ? [...plan.replaces, ...plan.removes] : [])) {
    const item = priorByPath.get(relativePath);
    plan.backups.push({ sourcePath: relativePath, backupPath: backupPath(sentinel.operationId, relativePath), sha256: item.sha256 });
  }
  if (plan.blockAction !== 'none') {
    plan.backups.push({
      sourcePath: 'AGENTS.md#managed-block', backupPath: backupPath(sentinel.operationId, 'AGENTS.md#managed-block'),
      sha256: priorState.agentsMd.blockSha256,
    });
  }
  plan.backups.push({ sourcePath: STATE_PATH, backupPath: stateBackupPath, sha256: sha256(priorStateBytes) });
  plan.creates = uniqueSorted(plan.creates);
  plan.replaces = uniqueSorted(plan.replaces);
  plan.removes = uniqueSorted(plan.removes);
  plan.backups = uniqueSorted(plan.backups, backupSort);
  if (sha256(canonicalBytes(plan.backups)) !== sentinel.backupManifestSha256) {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_IDENTITY_MISMATCH');
  }
  const identifier = operationId({
    operation, targetIdentity: targetIdentity(root), invokerVersion: release.inventory.bundleVersion,
    installedVersion: priorState.installedVersion,
    requestedVersion: operation === 'uninstall' ? null : release.inventory.bundleVersion,
    priorInventorySha256: sha256(priorInventoryBytes), requestedInventorySha256,
    managed: managedForOperation(priorState),
  });
  if (identifier !== sentinel.operationId) {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_IDENTITY_MISMATCH');
  }
  const agents = await literalAgents(root);
  if (agents.scan.status !== 'owned-pair'
      || agents.scan.prefix.length !== sentinel.outerPrefixLength
      || sha256(agents.scan.prefix) !== sentinel.outerPrefixSha256
      || sha256(agents.scan.suffix) !== sentinel.outerSuffixSha256) {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_AMBIGUOUS', 'AGENTS.md');
  }
  let originalPlanSha256;
  try {
    originalPlanSha256 = await originalRecoveryPlanSha256({
      operation, root, release, plan, priorState, priorStateBytes, agents,
    });
  } catch (error) {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_AMBIGUOUS', error.safePath ?? '.git');
  }
  if (originalPlanSha256 !== sentinel.planSha256) {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_IDENTITY_MISMATCH');
  }
  try {
    await verifyBackups(root, plan.backups);
    for (const relativePath of uniqueSorted([...plan.creates, ...plan.replaces, ...plan.removes])) {
      const info = await inspectContained(root, relativePath);
      if (info.type === 'absent') continue;
      if (info.type !== 'file') throw new Error('unsafe type');
      const digest = sha256(await readContainedFile(root, relativePath));
      const priorDigest = priorByPath.get(relativePath)?.sha256;
      const targetDigest = releaseByPath.get(relativePath)?.sha256;
      if (digest !== priorDigest && digest !== targetDigest) throw new Error('third state');
    }
    if (agents.scan.intervalSha256 !== priorState.agentsMd.blockSha256
        && agents.scan.intervalSha256 !== release.inventory.managedBlock.sha256) throw new Error('third block');
  } catch {
    return recoveryConflictPlan(operation, root, release, 'RECOVERY_AMBIGUOUS');
  }
  if (operation === 'update' && await exactTargetClosure(root, release)) plan.recoveryAction = 'finalize-target';
  plan.protected = ['AGENTS.md', '.oh-my-harness-backups'];
  plan.verification = [...VERIFICATION_ORDER];
  const envelope = planEnvelope(plan);
  const paths = planPaths(plan, priorState, release);
  const fingerprints = await captureFingerprints(root, paths);
  const oldBytes = new Map();
  for (const item of priorState.ownedFiles) {
    const row = plan.backups.find((backup) => backup.sourcePath === item.path);
    if (row) oldBytes.set(item.path, await readContainedFile(root, row.backupPath));
  }
  return {
    plan, envelope,
    context: {
      root, release, state: priorState, stateBytes: priorStateBytes, oldBytes, agents,
      operationId: identifier, fingerprints, paths, modifiedBytes: new Map(),
      rootIdentity: await containedRootIdentity(root), targetIdentity: targetIdentity(root), gitEvidence: null,
      installedInventory: priorInventory, installedInventoryBytes: priorInventoryBytes, installedClass,
      recoverySentinel: sentinel, expectedOuter: { prefix: agents.scan.prefix, suffix: agents.scan.suffix },
    },
  };
}

export async function createLifecyclePlan({ operation, target, release }) {
  if (!['install', 'update', 'uninstall'].includes(operation)) throw new LifecycleError('unsupported lifecycle operation');
  validateInventory(release.inventory, { packageVersion: release.inventory.bundleVersion });
  const root = await canonicalTarget(target);
  const sentinelInfo = await inspectContained(root, SENTINEL_PATH);
  if (sentinelInfo.type === 'file') {
    return createRecoveryPlan({ operation, root, release, sentinelBytes: await readContainedFile(root, SENTINEL_PATH) });
  }
  if (sentinelInfo.type !== 'absent') return recoveryConflictPlan(operation, root, release, 'RECOVERY_AMBIGUOUS');
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
  let installedInventory = null;
  let installedInventoryBytes = null;
  let installedClass = null;
  let surfaceMissing = false;
  if (state) {
    for (const item of state.ownedFiles) {
      try {
        const info = await inspectContained(root, item.path);
        if (info.type !== 'file') {
          surfaceMissing = true;
          addConflict(conflicts, info.type === 'absent' ? 'MISSING_OWNED_SURFACE' : 'UNSAFE_PATH', item.path);
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
    installedInventoryBytes = oldBytes.get('.oh-my-harness/bundle-inventory.json');
    if (inventoryRecord && installedInventoryBytes && sha256(installedInventoryBytes) === inventoryRecord.sha256) {
      try {
        installedInventory = JSON.parse(installedInventoryBytes.toString('utf8'));
        installedClass = classifyInstalledInventory(installedInventory, installedInventoryBytes);
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
  plan.installedClass = installedClass;
  plan.priorInventorySha256 = installedInventoryBytes ? sha256(installedInventoryBytes) : null;

  const identifier = operationId({
    operation, targetIdentity: targetIdentity(root), invokerVersion: release.inventory.bundleVersion,
    installedVersion: state?.installedVersion ?? null,
    requestedVersion: operation === 'uninstall' ? null : release.inventory.bundleVersion,
    priorInventorySha256: installedInventoryBytes ? sha256(installedInventoryBytes) : null,
    requestedInventorySha256: operation === 'uninstall' ? null : sha256(release.inventoryBytes),
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
    for (const item of modified) addConflict(conflicts, 'OWNED_DRIFT', item.path);
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
    if (installedClass === PRIOR_INVENTORY_CLASS
        && (plan.removes.length !== 1 || plan.removes[0] !== PRIOR_OBSOLETE_PATH)) {
      addConflict(conflicts, 'PRIOR_IDENTITY_MISMATCH', '.oh-my-harness/bundle-inventory.json');
    }
    const blockMatchesRelease = agents.scan.status === 'owned-pair'
      && agents.scan.intervalSha256 === release.inventory.managedBlock.sha256;
    plan.blockAction = blockMatchesRelease ? 'none' : 'replace';
    const cleanSurface = modified.length === 0 && plan.creates.length === 0
      && plan.replaces.length === 0 && plan.removes.length === 0 && blockMatchesRelease;
    if (state.installedVersion === release.inventory.bundleVersion && cleanSurface && conflicts.length === 0) plan.status = 'NO_OP';
  } else if (state && operation === 'uninstall') {
    plan.modifiedManaged = classifyStateSurface(state, oldBytes, agents);
    for (const item of plan.modifiedManaged) addConflict(conflicts, 'OWNED_DRIFT', item.path);
    if (installedClass === PRIOR_INVENTORY_CLASS) addConflict(conflicts, 'INCOMPATIBLE_INSTALLATION', STATE_PATH);
    plan.removes = state.ownedFiles.map((item) => item.path);
    plan.blockAction = 'remove';
  }

  if (state && conflicts.length === 0 && plan.status !== 'NO_OP' && plan.modifiedManaged.length === 0
      && ['update', 'uninstall'].includes(operation)) {
    if (operation === 'update') {
      for (const relativePath of uniqueSorted([...plan.replaces, ...plan.removes])) {
        const bytes = oldBytes.get(relativePath);
        if (bytes) {
          plan.backups.push({
            sourcePath: relativePath, backupPath: backupPath(identifier, relativePath), sha256: sha256(bytes),
          });
        }
      }
    }
    if (plan.blockAction !== 'none' && agents.scan.status === 'owned-pair') {
      plan.backups.push({
        sourcePath: 'AGENTS.md#managed-block', backupPath: backupPath(identifier, 'AGENTS.md#managed-block'),
        sha256: agents.scan.intervalSha256,
      });
    }
    if (stateBytes) {
      plan.backups.push({
        sourcePath: STATE_PATH, backupPath: backupPath(identifier, STATE_PATH), sha256: sha256(stateBytes),
      });
    }
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
    if (state) {
      owned.add('AGENTS.md');
      owned.add(STATE_PATH);
    }
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
  const rootIdentity = await containedRootIdentity(root);
  const modifiedBytes = new Map();
  for (const item of plan.backups) {
    if (item.sourcePath === 'AGENTS.md#managed-block') modifiedBytes.set(item.sourcePath, agents.scan.interval);
    else if (item.sourcePath === STATE_PATH) modifiedBytes.set(item.sourcePath, stateBytes);
    else modifiedBytes.set(item.sourcePath, oldBytes.get(item.sourcePath));
  }
  return {
    plan, envelope,
    context: {
      root, release, state, stateBytes, oldBytes, agents, operationId: identifier,
      installedInventory, installedInventoryBytes, installedClass,
      fingerprints, paths, modifiedBytes, rootIdentity, targetIdentity: targetIdentity(root),
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
    priorInventorySha256: context.installedInventoryBytes ? sha256(context.installedInventoryBytes) : null,
    requestedInventorySha256: operation === 'uninstall' ? null : sha256(release.inventoryBytes),
    requestedVersion: operation === 'uninstall' ? null : release.inventory.bundleVersion,
    planSha256: envelope.planSha256,
    backupManifestSha256: sha256(canonicalBytes(envelope.plan.backups)),
    outerPrefixLength: context.agents.scan.prefix?.length ?? context.agents.bytes.length,
    outerPrefixSha256: sha256(context.agents.scan.prefix ?? context.agents.bytes),
    outerSuffixSha256: sha256(context.agents.scan.suffix ?? Buffer.alloc(0)),
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

async function removeIfExact(root, relativePath, expectedBytes, trigger, changed) {
  const info = await inspectContained(root, relativePath);
  if (info.type === 'absent') return;
  if (info.type !== 'file' || !(await readContainedFile(root, relativePath)).equals(expectedBytes)) {
    throw new LifecycleError('rollback found an ambiguous third-state path', {
      code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: relativePath,
    });
  }
  trigger(`rollback-delete:${relativePath}`, relativePath);
  await removeContainedFile(root, relativePath, { onMutation: () => changed.push(relativePath) });
}

async function restoreExact(root, relativePath, priorBytes, targetBytes, trigger, changed) {
  const info = await inspectContained(root, relativePath);
  if (info.type === 'file') {
    const current = await readContainedFile(root, relativePath);
    if (current.equals(priorBytes)) return;
    if (!targetBytes || !current.equals(targetBytes)) {
      throw new LifecycleError('rollback found an ambiguous third-state path', {
        code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: relativePath,
      });
    }
    trigger(`rollback-write:${relativePath}`, relativePath);
    await writeAtomicContained(root, relativePath, priorBytes, {
      replace: true, onMutation: () => changed.push(relativePath),
    });
    return;
  }
  if (info.type !== 'absent') {
    throw new LifecycleError('rollback found an unsafe path type', {
      code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: relativePath,
    });
  }
  trigger(`rollback-write:${relativePath}`, relativePath);
  await writeAtomicContained(root, relativePath, priorBytes, {
    replace: false, onMutation: () => changed.push(relativePath),
  });
}

async function verifyPriorSurface(context) {
  if (!context.state || !context.stateBytes || !context.installedInventory || !context.installedInventoryBytes) return;
  const parsed = parseInstallState(await readContainedFile(context.root, STATE_PATH), { canonicalRoot: context.root });
  reconcileInstallStateInventory(parsed, context.installedInventory, context.installedInventoryBytes);
  for (const item of parsed.ownedFiles) {
    if (sha256(await readContainedFile(context.root, item.path)) !== item.sha256) {
      throw new LifecycleError('prior payload restoration did not verify', {
        code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: item.path,
      });
    }
  }
  const agents = await literalAgents(context.root);
  if (agents.scan.status !== 'owned-pair' || agents.scan.intervalSha256 !== parsed.agentsMd.blockSha256
      || !agents.scan.prefix.equals(context.expectedOuter.prefix)
      || !agents.scan.suffix.equals(context.expectedOuter.suffix)) {
    throw new LifecycleError('prior managed block restoration did not verify', {
      code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: 'AGENTS.md',
    });
  }
}

async function rollbackTransition(context, plan, trigger, changed) {
  const root = context.root;
  trigger('rollback-start', SENTINEL_PATH);
  if (plan.operation === 'install') {
    for (const relativePath of [...plan.creates].reverse()) {
      if (relativePath !== 'AGENTS.md') await removeIfExact(root, relativePath, context.release.files.get(relativePath), trigger, changed);
    }
    const agents = await literalAgents(root);
    if (agents.scan.status === 'owned-pair' && agents.scan.interval.equals(context.release.managedBlock)) {
      const restored = Buffer.concat([context.expectedOuter.prefix, context.expectedOuter.suffix]);
      if (!context.agents.exists && restored.length === 0) {
        await removeContainedFile(root, 'AGENTS.md', { onMutation: () => changed.push('AGENTS.md') });
      } else {
        await writeAtomicContained(root, 'AGENTS.md', restored, {
          replace: true, mode: context.agents.mode, onMutation: () => changed.push('AGENTS.md'),
        });
      }
    } else if (!agents.bytes.equals(context.agents.bytes)) {
      throw new LifecycleError('install rollback found ambiguous AGENTS.md bytes', {
        code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: 'AGENTS.md',
      });
    }
    if ((await inspectContained(root, STATE_PATH)).type === 'file') {
      const state = await readContainedFile(root, STATE_PATH);
      const parsed = parseInstallState(state, { canonicalRoot: root });
      if (parsed.operation.id !== context.operationId) {
        throw new LifecycleError('install rollback found unrelated state', {
          code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: STATE_PATH,
        });
      }
      await removeContainedFile(root, STATE_PATH, { onMutation: () => changed.push(STATE_PATH) });
    }
  } else if (plan.operation === 'update') {
    await verifyBackups(root, plan.backups);
    const bySource = new Map(plan.backups.map((item) => [item.sourcePath, item]));
    for (const relativePath of [...plan.creates].reverse()) {
      await removeIfExact(root, relativePath, context.release.files.get(relativePath), trigger, changed);
    }
    for (const relativePath of uniqueSorted([...plan.replaces, ...plan.removes])) {
      const backup = bySource.get(relativePath);
      if (!backup) throw new LifecycleError('required rollback backup is missing', {
        code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: relativePath,
      });
      await restoreExact(root, relativePath, await readContainedFile(root, backup.backupPath),
        context.release.files.get(relativePath), trigger, changed);
    }
    if (plan.blockAction === 'replace') {
      const backup = bySource.get('AGENTS.md#managed-block');
      if (!backup) throw new LifecycleError('managed block rollback backup is missing', {
        code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: 'AGENTS.md',
      });
      const priorBlock = await readContainedFile(root, backup.backupPath);
      const agents = await literalAgents(root);
      if (!agents.scan.prefix.equals(context.expectedOuter.prefix) || !agents.scan.suffix.equals(context.expectedOuter.suffix)) {
        throw new LifecycleError('outer AGENTS.md bytes changed during rollback', {
          code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: 'AGENTS.md',
        });
      }
      if (!agents.scan.interval.equals(priorBlock)) {
        if (!agents.scan.interval.equals(context.release.managedBlock)) {
          throw new LifecycleError('managed block is in a third state', {
            code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: 'AGENTS.md',
          });
        }
        await writeAtomicContained(root, 'AGENTS.md', replaceManagedBlock(agents.bytes, priorBlock), {
          replace: true, mode: agents.mode, onMutation: () => changed.push('AGENTS.md'),
        });
      }
    }
    const stateBackup = bySource.get(STATE_PATH);
    if (!stateBackup) throw new LifecycleError('prior state rollback backup is missing', {
      code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: STATE_PATH,
    });
    context.stateBytes = await readContainedFile(root, stateBackup.backupPath);
    await restoreOldState(context, trigger);
    await verifyPriorSurface(context);
  } else {
    await verifyBackups(root, plan.backups);
    for (const item of context.state.ownedFiles) {
      await restoreExact(root, item.path, context.release.files.get(item.path), context.release.files.get(item.path), trigger, changed);
    }
    const backup = plan.backups.find((item) => item.sourcePath === 'AGENTS.md#managed-block');
    if (backup) {
      const priorBlock = await readContainedFile(root, backup.backupPath);
      const agents = await literalAgents(root);
      if (agents.scan.status === 'absent') {
        await writeAtomicContained(root, 'AGENTS.md', Buffer.concat([
          context.expectedOuter.prefix, priorBlock, context.expectedOuter.suffix,
        ]), { replace: agents.exists, mode: context.agents.mode, onMutation: () => changed.push('AGENTS.md') });
      }
    }
    const stateBackup = plan.backups.find((item) => item.sourcePath === STATE_PATH);
    if (!stateBackup) throw new LifecycleError('prior state rollback backup is missing', {
      code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: STATE_PATH,
    });
    context.stateBytes = await readContainedFile(root, stateBackup.backupPath);
    await restoreOldState(context, trigger);
    await verifyPriorSurface(context);
  }
  for (const tempPath of [SENTINEL_TEMP_PATH, STATE_TEMP_PATH, ...context.paths.map(payloadTempPath)]) {
    if ((await inspectContained(root, tempPath)).type === 'file') await removeContainedFile(root, tempPath);
  }
  if ((await inspectContained(root, SENTINEL_PATH)).type === 'file') {
    trigger('rollback-sentinel-delete', SENTINEL_PATH);
    await removeContainedFile(root, SENTINEL_PATH, { onMutation: () => changed.push(SENTINEL_PATH) });
  }
  if (plan.operation === 'install') {
    const candidates = [...context.createdDirectories]
      .sort((left, right) => right.split('/').length - left.split('/').length || byteCompare(right, left));
    for (const directory of candidates) await removeEmptyContainedDirectory(root, directory);
  }
}

async function applyRecoveryPlan(context, plan, trigger) {
  const changed = [];
  const temporary = [];
  const directories = { removed: [], preserved: [] };
  context.createdDirectories = new Set(context.state?.managedDirectories ?? []);
  if (plan.recoveryAction === 'finalize-target') {
    if (!await exactTargetClosure(context.root, context.release)) {
      throw new LifecycleError('target closure changed before recovery finalization', {
        code: 'RECOVERY_AMBIGUOUS', exitCode: 5,
      });
    }
    await verifyBackups(context.root, plan.backups);
    for (const tempPath of [SENTINEL_TEMP_PATH, STATE_TEMP_PATH, ...context.paths.map(payloadTempPath)]) {
      const info = await inspectContained(context.root, tempPath);
      if (info.type === 'file') {
        trigger(`recovery-temp-delete:${tempPath}`, tempPath);
        await removeContainedFile(context.root, tempPath, { onMutation: () => changed.push(tempPath) });
      } else if (info.type !== 'absent') {
        throw new LifecycleError('recovery temporary path is ambiguous', {
          code: 'RECOVERY_AMBIGUOUS', exitCode: 5, safePath: tempPath,
        });
      }
    }
    trigger('recovery-sentinel-delete', SENTINEL_PATH);
    await removeContainedFile(context.root, SENTINEL_PATH, { onMutation: () => changed.push(SENTINEL_PATH) });
    if ((await inspectContained(context.root, SENTINEL_PATH)).type !== 'absent') {
      throw new LifecycleError('recovery sentinel deletion did not verify', { safePath: SENTINEL_PATH });
    }
    const report = resultReport(plan, changed, temporary, 'absent', 'verified', plan.backups, directories);
    report.recoveryOutcome = 'target-finalized';
    report.updateApplied = true;
    return { exitCode: 0, report };
  }
  if (plan.recoveryAction !== 'restore-prior') {
    throw new LifecycleError('recovery action is unavailable', {
      code: 'RECOVERY_AMBIGUOUS', exitCode: 5,
    });
  }
  await rollbackTransition(context, plan, trigger, changed);
  const report = resultReport(plan, changed, temporary, 'absent', 'prior-restored', plan.backups, directories);
  report.recoveryOutcome = 'prior-restored';
  report.updateApplied = false;
  return { exitCode: 0, report };
}

async function recheckPlan(original, target, release) {
  const fresh = await createLifecyclePlan({ operation: original.plan.operation, target, release });
  const originalBytes = canonicalBytes(original.plan);
  const freshBytes = canonicalBytes(fresh.plan);
  const fingerprintsMatch = original.context.paths.length === fresh.context.paths.length
    && original.context.paths.every((item, index) => item === fresh.context.paths[index]
      && original.context.fingerprints.get(item) === fresh.context.fingerprints.get(item));
  if (!freshBytes.equals(originalBytes) || fresh.envelope.planSha256 !== original.envelope.planSha256
      || fresh.context.rootIdentity !== original.context.rootIdentity
      || !fingerprintsMatch) {
    throw new LifecycleError('target changed after plan confirmation', { code: 'TARGET_CHANGED', exitCode: 4 });
  }
  return fresh;
}

function resultReport(plan, changed, temporary, sentinel, state, backups, directories, error = null, {
  unverifiedBackups = [], preservationFailure = null, recoveryOutcome = null,
} = {}) {
  const changedSet = new Set(changed);
  const planned = uniqueSorted([...plan.creates, ...plan.replaces, ...plan.removes, ...(plan.blockAction !== 'none' ? ['AGENTS.md'] : [])]);
  return {
    operation: plan.operation,
    success: error === null,
    changed: uniqueSorted(changed),
    unchanged: planned.filter((item) => !changedSet.has(item)),
    temporary: uniqueSorted(temporary), sentinel, state,
    backups: backups.map((item) => item.backupPath).sort(byteCompare),
    unverifiedBackups: uniqueSorted(unverifiedBackups.map((item) => item.backupPath)),
    directories: {
      removed: uniqueSorted(directories.removed),
      preserved: uniqueSorted(directories.preserved),
    },
    preservationFailure,
    recoveryOutcome,
    recoveryAction: plan.recoveryAction ?? 'none',
    updateApplied: plan.operation === 'update' ? error === null : null,
    error: error ? { path: error.safePath ?? null, reason: error.message } : null,
  };
}

async function reconcileBackupEvidence(root, backups) {
  const verified = [];
  const unverified = [];
  for (const backup of backups) {
    try {
      const info = await inspectContained(root, backup.backupPath);
      if (info.type === 'absent') continue;
      if (info.type !== 'file' || sha256(await readContainedFile(root, backup.backupPath)) !== backup.sha256) {
        unverified.push(backup);
      } else {
        verified.push(backup);
      }
    } catch {
      unverified.push(backup);
    }
  }
  return { verified, unverified };
}

export async function applyLifecyclePlan({ planned, target, release, faults = [] }) {
  if (planned.plan.status !== 'READY') throw new LifecycleError('only a READY plan may be applied', { exitCode: 4 });
  const fresh = await recheckPlan(planned, target, release);
  const { plan, envelope, context } = fresh;
  const releaseRootPin = await pinContainedRoot(context.root, context.rootIdentity);
  const trigger = faultController(faults);
  if (plan.recoveryAction !== 'none') {
    try {
      return await applyRecoveryPlan(context, plan, trigger);
    } finally {
      releaseRootPin();
    }
  }
  const changed = [];
  const temporary = [];
  const createdBackups = [];
  const mutatedBackupPaths = new Set();
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
      await writeExclusiveContained(context.root, backup.backupPath, bytes, {
        mode: 0o600, onMutation: () => mutatedBackupPaths.add(backup.backupPath),
      });
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
          const info = await inspectContained(context.root, directory);
          if (info.type !== 'absent') directories.preserved.push(directory);
          continue;
        }
        const outcome = await removeEmptyContainedDirectory(context.root, directory);
        if (outcome === 'removed') directories.removed.push(directory);
        else if (outcome === 'preserved') directories.preserved.push(directory);
      }
    }
    return { exitCode: 0, report: resultReport(plan, changed, temporary, 'absent', plan.operation === 'uninstall' ? 'absent' : 'verified', createdBackups, directories) };
  } catch (error) {
    const failure = error instanceof LifecycleError ? error : new LifecycleError('lifecycle write or verification failed');
    let preservationFailure = null;
    let recoveryOutcome = null;
    try {
      if (!committed) {
        const physicalSentinel = await inspectContained(context.root, SENTINEL_PATH).catch(() => ({ type: 'absent' }));
        if (physicalSentinel.type === 'file') {
          for (const tempPath of [SENTINEL_TEMP_PATH, STATE_TEMP_PATH, ...context.paths.map(payloadTempPath)]) {
            if ((await inspectContained(context.root, tempPath).catch(() => ({ type: 'absent' }))).type === 'file') {
              await removeContainedFile(context.root, tempPath);
            }
          }
          await rollbackTransition(context, plan, trigger, changed);
          recoveryOutcome = 'prior-restored';
        } else {
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
      }
    } catch (restoreError) {
      failure.message = `${failure.message}; state preservation failed`;
      preservationFailure = {
        path: restoreError.safePath ?? STATE_PATH,
        reason: restoreError.message ?? 'state preservation failed',
      };
      if (sentinelBytes) await retainSentinel(context, sentinelBytes).catch(() => {});
    }
    for (const tempPath of [SENTINEL_TEMP_PATH, STATE_TEMP_PATH, ...context.paths.map(payloadTempPath)]) {
      if ((await inspectContained(context.root, tempPath).catch(() => ({ type: 'absent' }))).type !== 'absent') temporary.push(tempPath);
    }
    const sentinelState = (await inspectContained(context.root, SENTINEL_PATH).catch(() => ({ type: 'absent' }))).type === 'file' ? 'present' : 'absent';
    if (context.namespaceCreated) changed.push('.oh-my-harness');
    if (sentinelState === 'present') changed.push(SENTINEL_PATH);
    let stateState = 'absent';
    const stateInfo = await inspectContained(context.root, STATE_PATH).catch(() => ({ type: 'unsafe' }));
    if (stateInfo.type === 'file') {
      try {
        const stateBytes = await readContainedFile(context.root, STATE_PATH);
        stateState = context.stateBytes && stateBytes.equals(context.stateBytes)
          ? 'prior-preserved' : 'present-unverified';
      } catch {
        stateState = 'unverifiable';
      }
    } else if (stateInfo.type !== 'absent') {
      stateState = 'unverifiable';
    }
    const backupEvidence = await reconcileBackupEvidence(context.root, plan.backups);
    for (const backupPath of mutatedBackupPaths) {
      if (!backupEvidence.verified.some((item) => item.backupPath === backupPath)
          && !backupEvidence.unverified.some((item) => item.backupPath === backupPath)) {
        const backup = plan.backups.find((item) => item.backupPath === backupPath);
        if (backup) backupEvidence.unverified.push(backup);
      }
    }
    failure.report = resultReport(plan, changed, temporary, sentinelState, stateState,
      backupEvidence.verified, directories, failure, {
        unverifiedBackups: backupEvidence.unverified, preservationFailure, recoveryOutcome,
      });
    throw failure;
  } finally {
    releaseRootPin();
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
