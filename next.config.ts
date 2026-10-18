import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';
const config: NextConfig = {
  poweredByHeader: false,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['@libsql/client'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === 'production' ? '' : " 'unsafe-eval'"}; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://cdn.discordapp.com; font-src 'self'; connect-src 'self'; frame-src https://my.spline.design; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'`,
          },
        ],
      },
    ];
  },
};
export default config;

// Lets `next dev` use local Cloudflare binding emulation without changing the
// production Node.js runtime or the site's normal development workflow.
initOpenNextCloudflareForDev();
