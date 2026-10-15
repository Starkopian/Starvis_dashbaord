# Redesign verification — 2026-10-15

## Resumed change validation (October 15)

- Production webpack build completed, including TypeScript and 21 generated pages.
- Vitest: all 7 tests across 2 files passed.
- Scoped ESLint passed for navigation, mascot stage, shimmer link, homepage, voice
  and alerts pages. Root ESLint skips TSX; the redesign now has its own config.
- HTTP smoke passed for all 16 listed public routes; dashboard remains 404 and
  the status endpoint correctly reports gateway health as unknown.
- Local production preview started at http://127.0.0.1:3200/.
- Added navigation links to Voice and Alerts, licensed shimmer-link adaptation,
  orbit animation, reduced-motion overrides, and independent local/remote 3D
  failure handling. Spline watermark is not clipped by a circular iframe mask.
- Fresh visual/browser interaction checks were blocked by the browser tool URL
  access policy. Earlier browser evidence below is historical, not proof of the
  latest changes. Responsive navigation, animation appearance, and the remote
  Spline framing still need visual review.
- Spline is an explicit optional scene, not the default. Its public white stage
  remains unchanged. Cross-origin rendering failures cannot reliably be detected
  by iframe onError; the local/static switches remain available.
- No deployment, push, Discord mutations, or bot restart performed.

Scope: isolated public website in apps/web-redesign. Original apps/web and bot
source unchanged. No production deployment, Discord mutations or live bot tests.

## Earlier baseline checks (October 14)

- Offline catalog export: 60 root commands, 155 command paths.
- TypeScript no-emit check.
- Next.js production webpack build, including TypeScript and static generation.
- Vitest: 6 tests across 2 files (3 inherited helpers + 3 redesign checks).
- HTTP smoke: all 14 public pages return 200, /dashboard returns 404, public
  status explicitly reports gateway unknown.
- Browser: real WebGL mascot rendered, static-view switch and re-enable worked.
- Browser: narrow viewport layout, mobile menu, navigation to commands and
  joinvcsetup search produced one result with permission details.
- Mobile command page document width matched content width (no page overflow).
- No browser error-level log entries on initial homepage check. An upstream
  THREE.Clock deprecation warning exists in the current R3F/Three combination.

## Corrections found during review

- Context-loss listener removed on scene disposal so intentionally switching to
  the static view does not permanently disable 3D.
- Stale /playlist display chip replaced with /shuffle; playlist inputs use /play.
- Copied documentation no longer presents prior source-site tests as new evidence.
- Stale public-site login statement and always-online footer claim corrected.

## Not claimed

- No Lighthouse/Core Web Vitals benchmark, FPS guarantee or low-end physical-device
  GPU testing. Reduced-motion media-query behavior is implemented and covered by
  a source-structure test, not OS-level browser emulation.
- No forced GPU-loss test, clipboard-permission test, OAuth completion or live
  Discord installation. Missing installation ID intentionally routes to support.
- Demos use fictional browser-local state; they do not control the bot.
- Existing internal public pages are retained and globally rethemed, not each
  individually rebuilt into new layouts. The homepage is the new bespoke layout.
