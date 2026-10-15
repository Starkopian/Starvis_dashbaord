'use client';

import Image from 'next/image';
export function MascotMark() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="brand-mascot"
      src="/brand/starvis.jpg"
      alt="STARVIS"
      width={48}
      height={48}
      loading="eager"
      onError={(e) => {
        const target = e.currentTarget;
        if (!target.src.includes('/assets/starvis.jpg')) {
          target.src = '/assets/starvis.jpg';
        }
      }}
    />
  );
}
export function StarMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 128 128"
      fill="none"
      aria-hidden="true"
    >
      <path d="M60 10Q68 52 112 62Q68 74 60 116Q52 74 10 62Q52 52 60 10Z" fill="currentColor" />
      <path d="m104 12 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" fill="currentColor" />
    </svg>
  );
}
