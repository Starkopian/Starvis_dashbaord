import { describe, it, expect } from 'vitest';
import { SessionStore, canManage } from '../lib/dashboard/security';
describe('dashboard security boundary', () => {
  it('rejects forged and expired sessions and revokes logout sessions', () => {
    let now = 1000;
    const store = new SessionStore(() => now);
    const id = store.create('private-token', 60);
    expect(store.get('forged')).toBeUndefined();
    expect(id).not.toContain('private-token');
    expect(store.get(id)?.token).toBe('private-token');
    now += 60001;
    expect(store.get(id)).toBeUndefined();
    const next = store.create('token', 60);
    store.revoke(next);
    expect(store.get(next)).toBeUndefined();
  });
  it('requires browser-bound one-use unexpired OAuth state', () => {
    let now = 0;
    const store = new SessionStore(() => now);
    const state = store.begin();
    expect(store.consume(state, 'another-browser')).toBe(false);
    expect(store.consume(state, state)).toBe(true);
    expect(store.consume(state, state)).toBe(false);
    const expired = store.begin();
    now += 300001;
    expect(store.consume(expired, expired)).toBe(false);
  });
  it('denies ordinary members and malformed permission bits', () => {
    expect(canManage({ permissions: '0' })).toBe(false);
    expect(canManage({ permissions: '268435456' })).toBe(false);
    expect(canManage({ permissions: 'invalid' })).toBe(false);
    expect(canManage({ owner: true })).toBe(true);
    expect(canManage({ permissions: '32' })).toBe(true);
    expect(canManage({ permissions: '8' })).toBe(true);
  });
});
