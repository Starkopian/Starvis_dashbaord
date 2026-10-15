# Historical source-site verification

These copied results are NOT evidence for the redesign. Current redesign checks
are recorded separately in REDESIGN-VERIFICATION.md.

Verified against the local production build; no publication or live Discord actions.

- Website: historical verification record from before the dashboard removal.
- Existing bot: 213 tests passed across 25 test files.
- Existing bot TypeScript check and production build passed.
- Next.js production build and its TypeScript phase passed.
- HTTP smoke: historical verification record; it must be refreshed after this dashboard-removal
  change before being treated as current evidence.
- Browser: desktop homepage, narrow mobile layout, mobile navigation, mobile static
  hero fallback, command search, music play/skip, security simulation, ticket
  create/claim/resolve and verification interest selection.
- Browser error log was empty on the final homepage check. A non-fatal upstream
  Three.js Clock deprecation warning was seen during the initial WebGL check.
- Added keyboard arrow/Home/End navigation to the module tabs; reduced-motion
  fallbacks are implemented but OS-level reduced-motion emulation was not tested.

The browser connection briefly timed out; it recovered and the ticket and
verification checks were repeated successfully. Screenshot: artifacts/homepage-desktop.jpg.

Not proven by these checks: live Discord installation integration, internet hosting,
or every combination of demo control. This file records a prior verification pass;
run the current local checks after changes before treating it as evidence.
