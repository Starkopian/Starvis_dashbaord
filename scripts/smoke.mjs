// Read-only HTTP smoke checks. Never follows an external redirect or contacts Discord.
import assert from 'node:assert/strict';
const base = new URL(process.env.WEB_TEST_URL || 'http://127.0.0.1:3200');
if (!['127.0.0.1', 'localhost', '[::1]'].includes(base.hostname)) {
  throw new Error('This smoke check is restricted to a local preview');
}
const paths = [
  '/',
  '/features',
  '/features/music',
  '/features/security',
  '/features/community',
  '/features/voice',
  '/features/alerts',
  '/commands?q=joinvcsetup',
  '/docs',
  '/support',
  '/status',
  '/changelog',
  '/roadmap',
  '/privacy',
  '/terms',
  '/credits',
];
for (const path of paths) {
  const response = await fetch(new URL(path, base), {
    redirect: 'manual',
    signal: AbortSignal.timeout(15000),
  });
  assert.equal(response.status, 200, path);
  assert.match(await response.text(), /STARVIS/);
  console.log('PASS public page', path);
}
const dashboard = await fetch(new URL('/dashboard', base), { redirect: 'manual' });
assert.equal(dashboard.status, 404);
const status = await fetch(new URL('/api/status', base)).then((r) => r.json());
assert.deepEqual(Object.keys(status).sort(), ['checkedAt', 'gateway', 'note', 'website']);
assert.equal(status.gateway, 'unknown');
console.log('PASS public pages, dashboard removal and honest public status');
