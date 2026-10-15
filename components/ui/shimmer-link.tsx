import Link from 'next/link';
import type { ReactNode } from 'react';

// Adapted from Magic UI's Shimmer Button, distributed through 21st.dev (MIT).
// Uses native CSS instead of Tailwind utilities; see THIRD_PARTY_NOTICES.md.
export function ShimmerLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="button starvis-shimmer">
      <span className="shimmer-spark" aria-hidden="true" />
      <span className="shimmer-backdrop" aria-hidden="true" />
      <span className="shimmer-content">{children}</span>
    </Link>
  );
}
