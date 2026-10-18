import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from 'node:crypto';

export interface DashboardSession {
  token: string;
  expiresAt: number;
}

type SealedPayload =
  | { purpose: 'oauth-state'; state: string; expiresAt: number }
  | { purpose: 'dashboard-session'; token: string; expiresAt: number };

const SESSION_LIFETIME_SECONDS = 1_800;
const STATE_LIFETIME_MS = 300_000;

function keyFor(secret: string) {
  return createHash('sha256').update(`starvis-dashboard-cookie:v1:${secret}`).digest();
}

/**
 * Encrypt and authenticate server-only data before putting it in an HttpOnly cookie.
 * Worker callbacks can execute in a different isolate from the sign-in request, so
 * process-local maps cannot safely hold OAuth state or sessions.
 */
function seal(payload: SealedPayload, secret: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', keyFor(secret), iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
  return ['v1', iv.toString('base64url'), cipher.getAuthTag().toString('base64url'), encrypted.toString('base64url')].join('.');
}

function unseal(value: string, secret: string): SealedPayload | null {
  const [version, iv, tag, encrypted, ...extra] = value.split('.');
  if (version !== 'v1' || !iv || !tag || !encrypted || extra.length !== 0) return null;
  try {
    const decipher = createDecipheriv('aes-256-gcm', keyFor(secret), Buffer.from(iv, 'base64url'));
    decipher.setAuthTag(Buffer.from(tag, 'base64url'));
    const payload = JSON.parse(
      Buffer.concat([decipher.update(Buffer.from(encrypted, 'base64url')), decipher.final()]).toString('utf8'),
    ) as SealedPayload;
    if (!payload || !Number.isFinite(payload.expiresAt) || payload.expiresAt <= Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function beginOAuthState(secret: string, now = Date.now()) {
  const state = randomBytes(32).toString('base64url');
  return {
    state,
    cookie: seal({ purpose: 'oauth-state', state, expiresAt: now + STATE_LIFETIME_MS }, secret),
  };
}

export function consumeOAuthState(secret: string, state: string, cookie: string) {
  const payload = unseal(cookie, secret);
  if (!payload || payload.purpose !== 'oauth-state' || !state) return false;
  const expected = Buffer.from(payload.state);
  const received = Buffer.from(state);
  return expected.length === received.length && timingSafeEqual(expected, received);
}

export function createDashboardSession(secret: string, token: string, seconds: number, now = Date.now()) {
  if (!token || !Number.isFinite(seconds) || seconds <= 0) throw new Error('Session unavailable');
  const expiresAt = now + Math.min(seconds, SESSION_LIFETIME_SECONDS) * 1000;
  return seal({ purpose: 'dashboard-session', token, expiresAt }, secret);
}

export function readDashboardSession(secret: string, cookie: string): DashboardSession | null {
  const payload = unseal(cookie, secret);
  if (!payload || payload.purpose !== 'dashboard-session') return null;
  return { token: payload.token, expiresAt: payload.expiresAt };
}
export function canManage(guild: { owner?: boolean; permissions?: string }) {
  if (guild.owner === true) return true;
  if (!guild.permissions || !/^\d+$/.test(guild.permissions)) return false;
  const bits = BigInt(guild.permissions);
  return (bits & (8n | 32n)) !== 0n;
}

