# STARVIS 3D public-site redesign

Independent working copy of apps/web. The original site and bot runtime are unchanged.
No dashboard, authentication database, secrets, logs or user records were copied.

## Local operation

From the repository root, install with pnpm install, then:

```powershell
pnpm --filter @starvis/web-redesign dev
pnpm --filter @starvis/web-redesign typecheck
pnpm --filter @starvis/web-redesign test
pnpm --filter @starvis/web-redesign build
pnpm --filter @starvis/web-redesign start
pnpm --filter @starvis/web-redesign test:smoke
```

Preview: http://127.0.0.1:3200. Do not build while a production preview is serving
the same .next directory. The bot does not need to run. The existing web server
on 3100 is unaffected. Build uses Next's supported webpack option.
Copy .env.example only if needed; set the public Discord application ID and a
verified support destination. Never copy the bot's environment file here.
Without an application ID, installation deliberately redirects to support.

## Data inventory

- app/: all original public routes, legal pages, feature pages, command directory,
  documentation, status, roadmap, changelog, support, installation/status handlers.
- lib/content.ts: feature descriptions and documentation, reused with stale login
  language corrected. Content describes capabilities, not production guarantees.
- lib/commands.generated.json: freshly exported offline from registered command
  definitions (60 root commands, 155 paths at this revision). No bot login.
- public/brand/starvis.jpg: existing owner-provided mascot, unchanged.
- components/: original browser-local demos and functional explorers retained.
- THIRD_PARTY_NOTICES.md: existing attributions retained.

Regenerate the catalog without editing it manually:

```powershell
node node_modules/tsx/dist/cli.mjs --eval "import('./scripts/export-web-commands.ts').then(m => m.exportWebCommands('apps/web-redesign/lib/commands.generated.json'))"
```

## Design and research

Obsidian backgrounds, pearl typography, cyan and violet accents, spacious editorial
layout, orbit lines, floating capability labels, feature cards, perspective command
preview and an explicit Discord-first onboarding sequence. The homepage makes the local
branded 3D mascot the default and offers the user-supplied public Spline NEXBOT scene as
a switchable option under an explicit `frame-src` allowlist with `no-referrer`; it is
never downloaded, modified, or represented as a STARVIS-owned model. This preserves the
public scene's own watermark and avoids presenting it as our art. The supplied JPG remains
the static and reduced-motion fallback.

21st.dev's animated icon catalog was reviewed. It states that each source set retains
its own licence and attribution, so no unverified component or asset was bulk-copied.
The redesign uses the already-installed Lucide icons with original local CSS hover,
the MIT-licensed Magic UI Orbiting Circles, and a CSS adaptation of Magic UI's
Shimmer Button linked from 21st.dev. Attribution is retained in THIRD_PARTY_NOTICES.md.
Dedicated `/features/voice` and `/features/alerts` pages
now own the related home links.

Research consulted:
- https://r3f.docs.pmnd.rs/advanced/scaling-performance — pixel budget and render-loop
  control. Implementation caps DPR at 1.5 and suspends frames off-screen/hidden.
- https://r3f.docs.pmnd.rs/advanced/pitfalls — transient transforms use frame refs,
  not React state updates. Geometry is declarative and disposed with the scene.
- https://nextjs.org/docs/app/guides/lazy-loading — scene dynamically imported from
  a client component with SSR disabled; useful HTML is server-rendered.
- https://21st.dev/community/components — visual reference for modular landing
  sections and the licensed Magic UI shimmer/orbit treatments.

Reduced-motion defaults to the supplied JPG. Users may explicitly enable 3D or
switch back to static. WebGL failure has a static fallback. All useful content,
links, commands and demos remain outside the canvas. No scroll hijacking or audio
autoplay. Public status never claims gateway health without telemetry.

## Boundaries

No deployment, live Discord test or bot restart is part of this redesign.
Device-specific WebGL performance and provider-dependent bot functions still need
real-device/production validation. Website demos are simulations, not Discord actions.
