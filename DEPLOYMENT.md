# STARVIS website deployment

This folder is the standalone STARVIS website and dashboard source published to the
`Starkopian/Starvis_dashbaord` repository. It is packaged for Cloudflare Workers,
not for a static Pages export, because the dashboard includes server-side Discord
OAuth and permission checks.

## Required production configuration

Set these as Cloudflare Worker secrets or environment variables; never commit
their values:

- `DASHBOARD_DISCORD_CLIENT_ID`
- `DASHBOARD_DISCORD_CLIENT_SECRET`
- `WEB_ORIGIN` (the exact public HTTPS Worker URL or custom domain)

Register exactly this redirect URL in the Discord application:

`WEB_ORIGIN/api/dashboard/auth/callback`

OAuth state and the short-lived Discord access token are encrypted and authenticated in
`HttpOnly`, `Secure`, `SameSite=Lax` cookies. This is deliberately stateless so the
login request and callback may be served by different Cloudflare Worker isolates. The
cookie lifetime is capped at 30 minutes; logout removes the browser cookie. Add a
durable server-side revocation store before introducing dashboard mutation endpoints.

## Deploy

```sh
pnpm install
pnpm run deploy:worker
```

The current OAuth session store is deliberately single-instance and fails closed
when OAuth configuration is absent. Before enabling OAuth on a multi-isolate
deployment, migrate it to durable, atomic session storage. The site exposes no
bot token and currently has no dashboard mutation endpoint.

