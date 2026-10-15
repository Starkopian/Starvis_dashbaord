'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AudioLines, ShieldCheck, Users, ArrowUpRight } from 'lucide-react';
import { modules } from '@/lib/content';
import { MusicDemo, SecurityDemo, WelcomeDemo } from './demos';
const icons = [AudioLines, ShieldCheck, Users];
export function ModuleExplorer() {
  const [active, setActive] = useState(0);
  const item = modules[active];
  return (
    <section className="section module-section" id="explore">
      <div className="section-heading">
        <div>
          <span className="eyebrow">MEET YOUR SERVER’S NEW FAVORITE</span>
          <h2>
            Not just more features.
            <br />
            <span className="text-muted">More possibilities.</span>
          </h2>
        </div>
        <p>From the first hello to the last song of the night. Everything feels connected.</p>
      </div>
      <div className="module-tabs" role="tablist" aria-label="Explore STARVIS modules">
        {modules.map((m, i) => {
          const Icon = icons[i];
          return (
            <button
              id={'tab-' + m.id}
              key={m.id}
              role="tab"
              aria-selected={active === i}
              tabIndex={active === i ? 0 : -1}
              aria-controls="module-panel"
              onClick={() => setActive(i)}
              onKeyDown={(event) => {
                const target = event.key === 'ArrowRight' ? (i + 1) % modules.length
                  : event.key === 'ArrowLeft' ? (i + modules.length - 1) % modules.length
                  : event.key === 'Home' ? 0 : event.key === 'End' ? modules.length - 1 : null;
                if (target === null) return;
                event.preventDefault();
                setActive(target);
                document.getElementById('tab-' + modules[target].id)?.focus();
              }}
            >
              <Icon size={18} />
              {m.short}
              <span>0{i + 1}</span>
            </button>
          );
        })}
      </div>
      <div
        className="module-content"
        id="module-panel"
        role="tabpanel"
        aria-labelledby={'tab-' + item.id}
      >
        <div className="module-copy">
          <span className="eyebrow">{item.tag}</span>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <Link className="text-link" href={item.href}>
            Explore {item.short.toLowerCase()} <ArrowUpRight size={18} />
          </Link>
          <div className="module-note">
            <span className="status-dot" /> Real bot features. Safe website previews.
          </div>
        </div>
        {active === 0 ? <MusicDemo compact /> : active === 1 ? <SecurityDemo /> : <WelcomeDemo />}
      </div>
    </section>
  );
}
