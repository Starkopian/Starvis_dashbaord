# STARVIS 3D redesign

This folder is an independent redesign. Use [REDESIGN.md](REDESIGN.md) for the
current setup, research, inventory and boundaries. Preview runs on **3200** with
`pnpm --filter @starvis/web-redesign dev`; production uses the same filter with
`build` then `start`. The original site remains in `apps/web` on port 3100.

The notes below are preserved historical documentation from the source site;
their command counts, old hero description and package commands are not the
redesign's current configuration. See REDESIGN.md instead.

## Original website documentation (historical)

A separate Next.js public website for STARVIS. The Discord bot remains a separate runtime.
Public preview: http://127.0.0.1:3100.

## Run locally

From D:\Discord\Starvis:

```powershell
pnpm install
pnpm web:dev
```

Production-local checks:

```powershell
pnpm web:test
pnpm --filter @starvis/web typecheck
pnpm web:build
pnpm web:start
```

With the preview running, use `pnpm --filter @starvis/web test:smoke` for read-only
public-route and public-status checks. It does not contact Discord.

Run only one web server on port 3100 at a time. Do not build into the same .next
directory while a production preview is serving it. No bot startup is needed for
public pages or tests.

## What is implemented

- Public home, feature, music, security, community, command, docs, support, status,
  roadmap, changelog, privacy, terms and credits pages.
- Browser-local music, security, welcome, activity ranking, ticket, verification
  and temporary voice demos. Fictional data; no Discord mutations or real audio.
- Mascot-led violet/cyan design using the owner-supplied STARVIS image, optimized
  responsive images and reduced-motion-aware CSS. The old WebGL hero is no longer loaded.
- Command catalog generated from registered bot definitions: 53 root commands,
  122 executable paths at initial export.
- The website is intentionally public and contains no dashboard, Discord sign-in flow,
  server configuration editor, or private bot telemetry bridge.

Regenerate commands after changing bot definitions:

```powershell
node node_modules/tsx/dist/cli.mjs scripts/export-web-commands.ts
```

This imports definitions, not src/index.ts startup; it does not register commands
or contact Discord.

## Environment

Copy .env.example to .env.local locally and fill only fresh credentials.
Never copy the bot's .env wholesale. Never put credentials in NEXT_PUBLIC_ variables.

- WEB_ORIGIN: exact website origin, no path/query. Default http://127.0.0.1:3100.
  HTTPS is mandatory outside loopback.
- DISCORD_CLIENT_ID: your existing bot application ID.
- STARVIS_SUPPORT_URL: optional verified HTTPS support link.

Bot installation is a separate flow requesting basic text/voice permissions without Administrator. Administrative
modules need deliberately configured additional permissions and correct role hierarchy.

## Deployment boundary and limitations

No deployment was performed. The public status page does not claim live bot telemetry,
historical uptime, or health that it cannot verify. Unknown telemetry stays unknown.
The CSP permits inline Next.js bootstrapping scripts; nonce-based CSP is a future
hardening option, not claimed here.

## Verification

Tests cover public helpers and page-boundary assumptions. They never start the bot,
send Discord messages, or make external requests. Passing checks do not prove a live
Discord installation or runtime health.

See THIRD_PARTY_NOTICES.md for 21st.dev-discovered Lucide/Magic UI attribution.
