import Link from 'next/link';
import { AudioLines, ShieldCheck, Users, ArrowUpRight } from 'lucide-react';
import { PageHeading } from '@/components/page-heading';
import { modules } from '@/lib/content';
import { TicketDemo, VerificationDemo } from '@/components/demos';
export const metadata = { title: 'Features' };
export default function Features() {
  const icons = [AudioLines, ShieldCheck, Users];
  return (
    <>
      <PageHeading
        eyebrow="THOUGHTFULLY CONNECTED"
        title="Everything your community can become."
        description="A soundtrack for the moment, protection for your people and tools that make a server feel like home. Explore the features and try safe, browser-local previews."
      />
      <div className="page-content">
        <div className="content-grid">
          {modules.map((m, i) => {
            const Icon = icons[i];
            return (
              <Link href={m.href} className="feature-card" key={m.id}>
                <Icon size={27} />
                <h2>{m.short}</h2>
                <p>{m.description}</p>
                <span className="text-link">
                  Take a closer look <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="section-heading" style={{ marginTop: 75 }}>
          <div>
            <span className="eyebrow">LESS FRICTION. MORE CONNECTION.</span>
            <h2>
              A warm welcome.
              <br />A helping hand.
            </h2>
          </div>
          <p>
            Try a ticket lifecycle or a simple verification flow. Nothing here changes your Discord
            server.
          </p>
        </div>
        <div className="demo-grid">
          <TicketDemo />
          <VerificationDemo />
        </div>
      </div>
    </>
  );
}
