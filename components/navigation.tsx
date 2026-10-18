'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BellRing,
  Command,
  Headphones,
  Menu,
  Mic,
  ShieldCheck,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import { MascotMark } from './brand';
export function Navigation() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const links = [
    ['Music', '/features/music', Headphones],
    ['Security', '/features/security', ShieldCheck],
    ['Community', '/features/community', UsersRound],
    ['Voice', '/features/voice', Mic],
    ['Alerts', '/features/alerts', BellRing],
    ['Commands', '/commands', Command],
    ['Docs', '/docs', Sparkles],
    ['Dashboard', '/dashboard', ShieldCheck],
  ] as const;
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" href="/" onClick={() => setOpen(false)} aria-label="STARVIS home">
          <MascotMark />
          <span>
            STARVIS<span className="brand-period">.</span>
          </span>
        </Link>
        <button
          className="icon-button mobile-menu"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          className={open ? 'main-nav open' : 'main-nav'}
          aria-label="Main navigation"
        >
          {links.map(([label, href, Icon]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? 'page' : undefined}
              onClick={() => setOpen(false)}
            >
              <Icon className="nav-link-icon" size={15} aria-hidden="true" />
              {label}
            </Link>
          ))}
          <Link href="/support" onClick={() => setOpen(false)}>
            Support
          </Link>
        </nav>
      </div>
    </header>
  );
}
