import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { managedGuilds } from '@/lib/dashboard/server';
import { PageHeading } from '@/components/page-heading';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Server overview', robots: { index: false, follow: false } };
export default async function ServerDashboard({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  if (!/^\d{16,22}$/.test(guildId)) notFound();
  const guilds = await managedGuilds();
  if (!guilds) redirect('/dashboard');
  const guild = guilds.find((g) => g.id === guildId);
  if (!guild) notFound();
  return (
    <>
      <PageHeading
        eyebrow="SERVER OVERVIEW"
        title={guild.name}
        description="Your server permissions were checked with Discord for this request."
      />
      <div className="page-content">
        <Link href="/dashboard">← All servers</Link>
        <div className="status-list">
          <div className="status-row">
            <div>
              <h3>Your access</h3>
              <p>{guild.owner ? 'Server owner' : 'Manage Server'}</p>
            </div>
            <span className="status-badge operational">Verified</span>
          </div>
          <div className="status-row">
            <div>
              <h3>Bot connection</h3>
              <p>Bot telemetry has not been connected to this dashboard.</p>
            </div>
            <span className="status-badge unknown">Unknown</span>
          </div>
          <div className="status-row">
            <div>
              <h3>Security and role controls</h3>
              <p>
                Use the existing Discord controls while dashboard action authorization is
                implemented.
              </p>
            </div>
            <span>Unavailable</span>
          </div>
        </div>
      </div>
    </>
  );
}
