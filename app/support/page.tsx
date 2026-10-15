import Link from 'next/link';
import { BookOpen, Terminal, Activity, ArrowUpRight } from 'lucide-react';
import { PageHeading } from '@/components/page-heading';
export const metadata = { title: 'Support' };
export const dynamic = 'force-dynamic';
export default function Support() {
  let support: string | null = null;
  try {
    const u = new URL(process.env.STARVIS_SUPPORT_URL || '');
    if (u.protocol === 'https:') support = u.href;
  } catch {}
  return (
    <>
      <PageHeading
        eyebrow="LET’S FIGURE IT OUT"
        title="A little help, right here."
        description="Start with the setup guide, look up an exact command or check which services have verified telemetry."
      />
      <div className="page-content">
        <div className="content-grid">
          {[
            [
              BookOpen,
              'Read the guides',
              'Permission checks, setup basics and feature-specific pointers.',
              '/docs',
            ],
            [
              Terminal,
              'Find a command',
              'Search real command definitions and required options.',
              '/commands',
            ],
            [
              Activity,
              'Check system status',
              'Current availability, with unknown states clearly marked.',
              '/status',
            ],
          ].map(([Icon, title, text, href]) => {
            const I = Icon as typeof BookOpen;
            return (
              <Link className="feature-card" href={String(href)} key={String(href)}>
                <I size={26} />
                <h2>{String(title)}</h2>
                <p>{String(text)}</p>
                <span className="text-link">
                  Open resource <ArrowUpRight size={16} />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="notice">
          {support ? (
            <a href={support} target="_blank" rel="noopener noreferrer">
              Open the configured STARVIS support community ↗
            </a>
          ) : (
            'A public support invite has not been configured for this installation. Contact your server’s administrator; no unverified invite is shown here.'
          )}
        </div>
        <div className="prose">
          <h2>Before you report a problem</h2>
          <ul>
            <li>Include the command, approximate time and the error text.</li>
            <li>Check the bot is present and has the permissions required by that feature.</li>
            <li>
              Remove tokens, passwords, verification codes and private member data from screenshots.
            </li>
            <li>
              If installation is unavailable, the operator needs to configure the application ID for
              this website.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
