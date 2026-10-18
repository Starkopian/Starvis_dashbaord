import { randomBytes, createHash } from 'node:crypto';

export interface DashboardSession {
  token: string;
  expiresAt: number;
}
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
/** Opaque cookies only. A restart deliberately revokes every session. */
export class SessionStore {
  private sessions = new Map<string, DashboardSession>();
  private states = new Map<string, number>();
  constructor(private now = Date.now) {}
  private prune() {
    for (const [id, s] of this.sessions) if (s.expiresAt <= this.now()) this.sessions.delete(id);
    for (const [id, expires] of this.states) if (expires <= this.now()) this.states.delete(id);
  }
  begin() {
    this.prune();
    if (this.states.size >= 1000) throw new Error('Authentication busy');
    const state = randomBytes(32).toString('base64url');
    this.states.set(digest(state), this.now() + 300_000);
    return state;
  }
  consume(state: string, cookie: string) {
    this.prune();
    if (!state || state !== cookie) return false;
    return this.states.delete(digest(state));
  }
  create(token: string, seconds: number) {
    this.prune();
    if (!token || !Number.isFinite(seconds) || seconds <= 0 || this.sessions.size >= 1000)
      throw new Error('Session unavailable');
    const id = randomBytes(32).toString('base64url');
    this.sessions.set(digest(id), {
      token,
      expiresAt: this.now() + Math.min(seconds, 1800) * 1000,
    });
    return id;
  }
  get(id: string) {
    this.prune();
    return this.sessions.get(digest(id));
  }
  revoke(id: string) {
    this.sessions.delete(digest(id));
  }
}
export function canManage(guild: { owner?: boolean; permissions?: string }) {
  if (guild.owner === true) return true;
  if (!guild.permissions || !/^\d+$/.test(guild.permissions)) return false;
  const bits = BigInt(guild.permissions);
  return (bits & (8n | 32n)) !== 0n;
}
