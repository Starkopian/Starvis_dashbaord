'use client';

import Image from 'next/image';
import { AudioLines, ShieldCheck, Sparkles } from 'lucide-react';
export function HeroArt() {
  return (
    <div className="mascot-stage">
      <div className="mascot-orbit" aria-hidden="true" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="mascot-image"
        src="/brand/starvis.jpg"
        alt="STARVIS robot mascot with glowing cyan and violet star eyes"
        width={1024}
        height={1024}
        loading="eager"
        onError={(e) => {
          const target = e.currentTarget;
          if (!target.src.includes('/assets/starvis.jpg')) {
            target.src = '/assets/starvis.jpg';
          }
        }}
      />
      <div className="mascot-chip chip-music">
        <span>
          <AudioLines size={18} />
        </span>
        <div>
          Set the mood<small>YOUR SHARED SOUNDTRACK</small>
        </div>
        <i />
      </div>
      <div className="mascot-chip chip-security">
        <span>
          <ShieldCheck size={18} />
        </span>
        <div>
          Keep your people safe<small>YOUR RULES. YOUR COMMUNITY.</small>
        </div>
      </div>
      <div className="mascot-signature">
        <Sparkles size={13} /> A LITTLE PERSONALITY. A LOT OF POSSIBILITY.
      </div>
    </div>
  );
}
