import { describe, expect, it, vi } from 'vitest';
vi.mock('server-only', () => ({}));
import { isSnowflake, publicStatus, webOrigin } from '../lib/site';

describe('public-site helpers', () => {
  it('accepts only Discord snowflake-shaped installation IDs', () => {
    expect(isSnowflake('111111111111111111')).toBe(true);
    expect(isSnowflake('not-a-snowflake')).toBe(false);
  });

  it('does not claim gateway health without a public telemetry source', async () => {
    await expect(publicStatus()).resolves.toMatchObject({
      website: 'operational',
      gateway: 'unknown',
    });
  });

  it('keeps the configured web origin constrained to an origin', () => {
    expect(webOrigin()).toMatch(/^https?:\/\//);
  });
});
