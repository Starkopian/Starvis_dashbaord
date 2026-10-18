import Link from 'next/link';
import { managedGuilds } from '@/lib/dashboard/server';
import { PageHeading } from '@/components/page-heading';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Dashboard', robots: { index: false, follow: false } };
export default async function Dashboard() {
  const guilds = await managedGuilds().catch(() => undefined);
  return (
    <>
      <PageHeading
        eyebrow="STARVIS CONTROL ROOM"
        title="Your servers. Your controls."
        description="Sign in with Discord to view servers you own or have permission to manage."
      />
      <div className="page-content">
        {guilds === null ? (
          <a className="button primary" href="/api/dashboard/auth/login">
            Continue with Discord
          </a>
        ) : guilds === undefined ? (
          <div className="notice">
            Discord permissions could not be verified. Access is temporarily unavailable.{' '}
            <a href="/api/dashboard/auth/login">Sign in again</a>
          </div>
        ) : (
          <>
            <form method="post" action="/api/dashboard/auth/logout">
              <button className="button" type="submit">
                Sign out
              </button>
            </form>
            <div className="status-list">
              {guilds.map((guild) => (
                <Link className="status-row" key={guild.id} href={`/dashboard/${guild.id}`}>
                  <div>
                    <h3>{guild.name}</h3>
                    <p>{guild.owner ? 'Server owner' : 'Manage Server access'}</p>
                  </div>
                  <span>Open overview →</span>
                </Link>
              ))}
            </div>
            {!guilds.length && <p>No manageable servers were returned by Discord.</p>}
          </>
        )}
        <div className="notice" style={{ marginTop: 24 }}>
          Server overview is available first. Configuration and role actions are not enabled in this
          release.
        </div>
      </div>
    </>
  );
}
