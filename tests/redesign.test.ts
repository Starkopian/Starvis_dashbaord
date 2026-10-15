import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import catalog from '../lib/commands.generated.json';
import { modules } from '../lib/content';
describe('redesign content integrity', () => {
  it('only advertises existing command names in feature chips', () => {
    const names = new Set(catalog.commands.map((c) => c.name));
    for (const module of modules)
      for (const command of module.commands) expect(names.has(command)).toBe(true);
    const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
    for (const match of page.matchAll(/<code>\/(\w+)<\/code>/g))
      expect(names.has(match[1])).toBe(true);
  });
  it('retains a complete unique generated command catalog', () => {
    expect(catalog.commandCount).toBe(catalog.commands.length);
    expect(new Set(catalog.commands.map((c) => c.name)).size).toBe(catalog.commandCount);
    expect(catalog.entryCount).toBe(catalog.commands.reduce((n, c) => n + c.entries.length, 0));
    for (const name of ['play', 'joinvcsetup', 'logsetup', 'notifier'])
      expect(catalog.commands.some((c) => c.name === name)).toBe(true);
  });
  it('keeps 3D optional and isolates the scene from server rendering', () => {
    const stage = readFileSync(new URL('../components/mascot-stage.tsx', import.meta.url), 'utf8');
    expect(stage).toContain('prefers-reduced-motion');
    expect(stage).toContain('ssr: false');
    expect(stage).toContain('IntersectionObserver');
    expect(stage).toContain('visibilitychange');
    expect(stage).toContain('Use static view');
    expect(stage).toContain('my.spline.design/nexbotrobotcharacterconcept');
    expect(stage).toContain('referrerPolicy="no-referrer"');
    expect(stage).toContain('useState(false)');
  });
  it('keeps dedicated voice and creator-alert pages linked from home', () => {
    const page = readFileSync(new URL('../app/page.tsx', import.meta.url), 'utf8');
    expect(page).toContain("href: '/features/voice'");
    expect(page).toContain("href: '/features/alerts'");
    expect(
      readFileSync(new URL('../app/features/voice/page.tsx', import.meta.url), 'utf8'),
    ).toContain('/joinvcsetup');
    expect(
      readFileSync(new URL('../app/features/alerts/page.tsx', import.meta.url), 'utf8'),
    ).toContain('notifier');
  });
});
