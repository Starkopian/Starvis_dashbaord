import 'server-only';

export type PublicStatus = {
  website: 'operational';
  gateway: 'unknown';
  checkedAt: string;
  note: string;
};

export function webOrigin() {
  const configured = process.env.WEB_ORIGIN || 'http://127.0.0.1:3200';
  const url = new URL(configured);
  if (url.username || url.password || url.pathname !== '/' || url.search || url.hash)
    throw new Error('WEB_ORIGIN must be an origin');
  if (
    url.protocol !== 'https:' &&
    !(['127.0.0.1', 'localhost', '[::1]'].includes(url.hostname) && url.protocol === 'http:')
  )
    throw new Error('HTTPS is required outside loopback');
  return url.origin;
}

export const isSnowflake = (value: string) => /^\d{16,22}$/.test(value);

export async function publicStatus(): Promise<PublicStatus> {
  return {
    website: 'operational',
    gateway: 'unknown',
    checkedAt: new Date().toISOString(),
    note: 'Gateway telemetry is intentionally not exposed through the public website.',
  };
}
