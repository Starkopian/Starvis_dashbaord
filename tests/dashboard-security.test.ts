import { describe, it, expect } from 'vitest';
import {
  beginOAuthState,
  canManage,
  consumeOAuthState,
  createDashboardSession,
  readDashboardSession,
} from '../lib/dashboard/security';
describe('dashboard security boundary', () => {
  it('encrypts sessions and rejects tampering', () => {
    const secret = 'test-secret';
    const cookie = createDashboardSession(secret, 'private-token', 60);
    expect(cookie).not.toContain('private-token');
    expect(readDashboardSession(secret, cookie)?.token).toBe('private-token');
    expect(readDashboardSession(secret, `${cookie}tampered`)).toBeNull();
    expect(readDashboardSession('wrong-secret', cookie)).toBeNull();
  });
  it('requires browser-bound, unexpired OAuth state', () => {
    const secret = 'test-secret';
    const { state, cookie } = beginOAuthState(secret);
    expect(consumeOAuthState(secret, state, 'another-browser')).toBe(false);
    expect(consumeOAuthState(secret, state, cookie)).toBe(true);
    expect(consumeOAuthState(secret, `${state}extra`, cookie)).toBe(false);
    expect(consumeOAuthState('wrong-secret', state, cookie)).toBe(false);
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

