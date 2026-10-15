'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { docs } from '@/lib/content';
export function DocsExplorer() {
  const [query, setQuery] = useState('');
  const results = docs.filter((d) =>
    (d.title + ' ' + d.category + ' ' + d.text).toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <label className="search-field">
        <Search size={18} />
        <input
          aria-label="Search documentation"
          placeholder="Search the guides…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="doc-layout">
        <aside className="doc-sidebar" aria-label="Guide sections">
          {results.map((d) => (
            <a href={'#' + d.id} key={d.id}>
              {d.title}
            </a>
          ))}
        </aside>
        <div>
          {results.map((d) => (
            <article className="doc-article" id={d.id} key={d.id}>
              <span className="eyebrow">{d.category}</span>
              <h2>{d.title}</h2>
              <p>{d.text}</p>
            </article>
          ))}
          {!results.length && (
            <div className="empty-state">
              <h2>No guide found.</h2>
              <p>Try a different feature or a shorter search.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
