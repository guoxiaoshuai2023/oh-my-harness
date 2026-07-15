import { createHash } from 'node:crypto';
import { LifecycleError } from './filesystem.mjs';

export const START_MARKER = Buffer.from('<!-- oh-my-harness:start -->');
export const END_MARKER = Buffer.from('<!-- oh-my-harness:end -->');

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

function markerError(message) {
  throw new LifecycleError(message, {
    code: 'INVALID_MANAGED_MARKER', exitCode: 4, safePath: 'AGENTS.md',
  });
}

export function scanManagedBlock(input) {
  const bytes = Buffer.from(input);
  const candidates = [];
  let offset = 0;
  while (offset < bytes.length) {
    const start = bytes.indexOf('<!--', offset, 'ascii');
    if (start < 0) break;
    const close = bytes.indexOf('-->', start + 4, 'ascii');
    const end = close < 0 ? bytes.length : close + 3;
    const candidate = bytes.subarray(start, end);
    const bodyEnd = close < 0 ? candidate.length : candidate.length - 3;
    const body = candidate.subarray(4, bodyEnd).toString('ascii').toLowerCase();
    if (/^[\t\r\n ]*oh-my-harness[\t\r\n ]*:/.test(body)) {
      if (candidate.equals(START_MARKER)) candidates.push({ type: 'start', start, end });
      else if (candidate.equals(END_MARKER)) candidates.push({ type: 'end', start, end });
      else markerError('reserved oh-my-harness marker syntax is damaged');
    }
    offset = end;
  }

  if (candidates.length === 0) {
    return { status: 'absent', prefix: bytes, suffix: Buffer.alloc(0), interval: null };
  }
  if (candidates.length !== 2 || candidates[0].type !== 'start' || candidates[1].type !== 'end') {
    markerError('managed markers must be exactly one ordered start/end pair');
  }
  const start = candidates[0].start;
  let end = candidates[1].end;
  if (bytes[end] === 0x0a) end += 1;
  const interval = bytes.subarray(start, end);
  return {
    status: 'owned-pair',
    start,
    end,
    interval,
    intervalSha256: sha256(interval),
    prefix: bytes.subarray(0, start),
    suffix: bytes.subarray(end),
  };
}

export function appendManagedBlock(existing, releaseBlock) {
  const scan = scanManagedBlock(existing);
  if (scan.status !== 'absent') markerError('AGENTS.md already contains managed markers');
  return Buffer.concat([Buffer.from(existing), Buffer.from(releaseBlock)]);
}

export function replaceManagedBlock(existing, releaseBlock) {
  const scan = scanManagedBlock(existing);
  if (scan.status !== 'owned-pair') markerError('AGENTS.md has no owned managed block');
  return Buffer.concat([scan.prefix, Buffer.from(releaseBlock), scan.suffix]);
}

export function removeManagedBlock(existing) {
  const scan = scanManagedBlock(existing);
  if (scan.status !== 'owned-pair') markerError('AGENTS.md has no owned managed block');
  return { bytes: Buffer.concat([scan.prefix, scan.suffix]), scan };
}
