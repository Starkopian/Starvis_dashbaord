'use client';
import { useRef, useState, useEffect } from 'react';
import {
  Search,
  Copy,
  Check,
  ArrowUpRight,
  Terminal,
  Layers,
  ShieldCheck,
  Hash,
  AudioLines,
  Users,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import catalog from '@/lib/commands.generated.json';
type Option = {
  name: string;
  description: string;
  required?: boolean;
  type: number;
  choices?: { name: string; value: string | number }[];
  min_value?: number;
  max_value?: number;
};
const commands = catalog.commands.flatMap((c) =>
  c.entries.map((e) => ({
    ...e,
    category: c.category,
    permissions: c.defaultMemberPermissions,
    notes: [...new Set([...c.permissionNotes, ...e.permissionNotes])],
  })),
);
const CORE_CATEGORIES = [
  'music',
  'moderation',
  'antinuke',
  'shield',
  'verification',
];

const COMMUNITY_CATEGORIES = [
  'aichat',
  'birthdays',
  'festivals',
  'levels',
  'member-events',
];

const OTHER_CATEGORIES = [
  'general',
  'roles',
  'cases',
  'voicehub',
  'invites',
  'notifier',
];

const categoryLabels: Record<string, string> = {
  music: 'Music & Audio',
  moderation: 'Moderation & Logs',
  antinuke: 'Anti-Nuke Protection',
  shield: 'Security & AutoMod',
  verification: 'Verification Gates',
  aichat: 'AI Chat & Gemini',
  birthdays: 'Member Birthdays',
  festivals: 'Worldwide Festivals',
  levels: 'Levels & Leaderboard',
  'member-events': 'Welcomes & Goodbyes',
  general: 'General & Bot Info',
  roles: 'Role Management',
  cases: 'Tickets & Cases',
  voicehub: 'Voice Hub Channels',
  invites: 'Invite Tracking',
  notifier: 'Content Alerts',
};

const label = (s: string) => categoryLabels[s] || s.replaceAll('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const icon = (s: string) =>
  s === 'music'
    ? AudioLines
    : ['moderation', 'shield', 'antinuke', 'cases', 'verification'].includes(s)
      ? ShieldCheck
      : ['levels', 'member-events', 'invites', 'birthdays', 'festivals'].includes(s)
        ? Users
        : Hash;

export function CommandExplorer({ initialQuery = '' }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery),
    [category, setCategory] = useState('all'),
    [selected, setSelected] = useState(''),
    [copied, setCopied] = useState(''),
    [copyError, setCopyError] = useState('');
  const search = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const q = params.get('q');
      if (q) setQuery(q);
      const cat = params.get('category');
      if (cat) setCategory(cat);
    }

    const key = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        search.current?.focus();
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, []);

  const isMatchingCategory = (cmdCategory: string) => {
    if (category === 'all') return true;
    if (category === 'core') return CORE_CATEGORIES.includes(cmdCategory);
    if (category === 'community') return COMMUNITY_CATEGORIES.includes(cmdCategory);
    if (category === 'others') return OTHER_CATEGORIES.includes(cmdCategory);
    return cmdCategory === category;
  };

  const results = commands.filter(
    (c) =>
      isMatchingCategory(c.category) &&
      (c.path + ' ' + c.description).toLowerCase().includes(query.replace(/^\//, '').toLowerCase()),
  );

  // Group results by category order
  const categoryOrder = [
    ...CORE_CATEGORIES,
    ...COMMUNITY_CATEGORIES,
    ...OTHER_CATEGORIES,
  ];

  const groupedResults: { category: string; commands: typeof results }[] = [];
  if (category !== 'all' && !['core', 'community', 'others'].includes(category)) {
    groupedResults.push({ category, commands: results });
  } else {
    for (const cat of categoryOrder) {
      const catCmds = results.filter((c) => c.category === cat);
      if (catCmds.length > 0) {
        groupedResults.push({ category: cat, commands: catCmds });
      }
    }
    const remaining = results.filter((c) => !categoryOrder.includes(c.category));
    if (remaining.length > 0) {
      const remainingCats = [...new Set(remaining.map((c) => c.category))];
      for (const rCat of remainingCats) {
        groupedResults.push({
          category: rCat,
          commands: remaining.filter((c) => c.category === rCat),
        });
      }
    }
  }

  const active =
    results.find((c) => c.path === selected) ||
    results.find((c) => c.path === '/play') ||
    results[0];
  const path = active ? (active.path.startsWith('/') ? active.path : '/' + active.path) : '';

  async function copy() {
    try {
      await navigator.clipboard.writeText(path);
      setCopied(path);
      setCopyError('');
    } catch {
      setCopyError('Clipboard unavailable. Select and copy the command below.');
    }
  }

  const categoryDisplayTitle =
    category === 'all'
      ? 'All commands'
      : category === 'core'
        ? 'Core Capabilities'
        : category === 'community'
          ? 'Community & Engagement'
          : category === 'others'
            ? 'Other & Utilities'
            : label(category);

  return (
    <div className="command-studio">
      <div className="studio-topbar">
        <span>
          <Terminal size={17} /> STARVIS <b>/</b> COMMAND CENTER
        </span>
        <span className="studio-version">
          <i className="status-dot" /> SOURCE-SYNCED CATALOG
        </span>
      </div>
      <div className="studio-search">
        <Search size={22} />
        <input
          ref={search}
          aria-label="Search commands"
          placeholder="What would you like STARVIS to do?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <kbd>Ctrl K</kbd>
        <span>{catalog.entryCount} commands</span>
      </div>
      <div className="studio-body">
        <aside className="studio-sidebar">
          <span className="studio-label">EXPLORE MODULES</span>
          <button
            className={category === 'all' ? 'selected' : ''}
            onClick={() => setCategory('all')}
            aria-pressed={category === 'all'}
          >
            <Layers size={16} /> All commands <small>{commands.length}</small>
          </button>

          <span className="studio-group-label">CORE CAPABILITIES</span>
          {CORE_CATEGORIES.map((c) => {
            const Icon = icon(c);
            const count = commands.filter((x) => x.category === c).length;
            if (!count) return null;
            return (
              <button
                key={c}
                className={category === c ? 'selected' : ''}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                <Icon size={16} />
                {label(c)}
                <small>{count}</small>
              </button>
            );
          })}

          <span className="studio-group-label">COMMUNITY & SOCIAL</span>
          {COMMUNITY_CATEGORIES.map((c) => {
            const Icon = icon(c);
            const count = commands.filter((x) => x.category === c).length;
            if (!count) return null;
            return (
              <button
                key={c}
                className={category === c ? 'selected' : ''}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                <Icon size={16} />
                {label(c)}
                <small>{count}</small>
              </button>
            );
          })}

          <span className="studio-group-label">OTHER & UTILITIES</span>
          <button
            className={category === 'others' ? 'selected' : ''}
            aria-pressed={category === 'others'}
            onClick={() => setCategory('others')}
          >
            <SlidersHorizontal size={16} />
            All Other Modules
            <small>{commands.filter((x) => OTHER_CATEGORIES.includes(x.category)).length}</small>
          </button>
          {OTHER_CATEGORIES.map((c) => {
            const Icon = icon(c);
            const count = commands.filter((x) => x.category === c).length;
            if (!count) return null;
            return (
              <button
                key={c}
                className={category === c ? 'selected' : ''}
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
              >
                <Icon size={16} />
                {label(c)}
                <small>{count}</small>
              </button>
            );
          })}

          <div className="sidebar-note">
            <Sparkles size={19} />
            <strong>
              Small commands.
              <br />
              Big possibilities.
            </strong>
            <p>Explore the real tools behind your community.</p>
          </div>
        </aside>
        <div className="studio-results">
          <div className="results-heading">
            <span>{categoryDisplayTitle}</span>
            <small aria-live="polite">{results.length} results</small>
          </div>
          <div className="results-scroll">
            {groupedResults.map((group) => {
              const GroupIcon = icon(group.category);
              return (
                <div key={group.category} className="command-category-section">
                  <div className="category-group-header">
                    <GroupIcon size={14} />
                    <span>{label(group.category)}</span>
                    <span className="category-group-badge">{group.commands.length}</span>
                  </div>
                  {group.commands.map((c) => {
                    const Icon = icon(c.category);
                    return (
                      <button
                        key={c.path}
                        className={'command-result ' + (active?.path === c.path ? 'selected' : '')}
                        aria-pressed={active?.path === c.path}
                        onClick={() => {
                          setSelected(c.path);
                          setCopied('');
                        }}
                      >
                        <span className="result-icon">
                          <Icon size={17} />
                        </span>
                        <span>
                          <strong>{c.path.startsWith('/') ? c.path : '/' + c.path}</strong>
                          <small>{c.description}</small>
                        </span>
                        <ChevronRight size={15} />
                      </button>
                    );
                  })}
                </div>
              );
            })}
            {!results.length && (
              <div className="empty-state">
                <Search size={26} />
                <h3>No signal found.</h3>
                <p>Try another search or module.</p>
                <button
                  className="button secondary"
                  onClick={() => {
                    setQuery('');
                    setCategory('all');
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>
        </div>
        <section className="command-inspector" aria-label="Selected command details">
          {active ? (
            <>
              <div className="inspector-breadcrumb">
                <span>{label(active.category)}</span>
                <ChevronRight size={12} />
                <span>Command reference</span>
              </div>
              <div className="inspector-heading">
                <span className="inspector-glyph">
                  <Terminal size={26} />
                </span>
                <span className="pill cyan">SLASH COMMAND</span>
              </div>
              <h2>{path}</h2>
              <p className="inspector-description">{active.description}</p>
              <div className="syntax-box">
                <div>
                  <span>COMMAND SYNTAX</span>
                  <button aria-label={'Copy ' + path} onClick={copy}>
                    {copied === path ? <Check size={14} /> : <Copy size={14} />}{' '}
                    {copied === path ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <code>
                  <span>{path}</span>
                  {active.options.map((o) => (
                    <em key={o.name}>
                      {' '}
                      {o.required ? '<' : '['}
                      {o.name}
                      {o.required ? '>' : ']'}
                    </em>
                  ))}
                </code>
              </div>
              {copyError && <p role="status">{copyError}</p>}
              <div className="inspector-section">
                <h3>
                  <ShieldCheck size={16} /> Permission check
                </h3>
                <div className="permission-chips">
                  {active.permissions.length ? (
                    active.permissions.map((p) => <span key={p}>{p}</span>)
                  ) : (
                    <span>No default restriction</span>
                  )}
                </div>
                {active.notes.map((n) => (
                  <p key={n}>{n}</p>
                ))}
              </div>
              <div className="inspector-section">
                <h3>
                  <SlidersHorizontal size={16} /> Parameters <span>{active.options.length}</span>
                </h3>
                {active.options.length ? (
                  (active.options as Option[]).map((o) => (
                    <div className="parameter" key={o.name}>
                      <div>
                        <code>{o.name}</code>
                        <span className={o.required ? 'required' : ''}>
                          {o.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                      <p>{o.description}</p>
                      {o.choices && (
                        <small>Choices: {o.choices.map((v) => v.name).join(' · ')}</small>
                      )}
                      {o.min_value !== undefined && <small>Minimum {o.min_value}</small>}
                      {o.max_value !== undefined && <small>Maximum {o.max_value}</small>}
                    </div>
                  ))
                ) : (
                  <p>No parameters needed. You’re ready to go.</p>
                )}
              </div>
              <div className="inspector-tip">
                <Sparkles size={16} />
                <p>
                  Run this command in Discord. Your server configuration and role hierarchy still
                  apply.
                </p>
                <ArrowUpRight size={15} />
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Terminal size={35} />
              <h3>
                Your next command
                <br />
                starts here.
              </h3>
            </div>
          )}
        </section>
      </div>
      <div className="studio-status">
        <span>
          <i className="status-dot" /> {catalog.commandCount} registered root commands
        </span>
        <span>READ THE COMMAND. KNOW THE POSSIBILITIES.</span>
      </div>
    </div>
  );
}
