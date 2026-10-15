import { PageHeading } from '@/components/page-heading';
import { publicStatus } from '@/lib/site';
export const metadata = { title: 'System status' };
export default async function Status() {
  const status = await publicStatus();
  return (
    <>
      <PageHeading
        eyebrow="VISIBILITY, NOT GUESSWORK"
        title="Here’s what we can verify."
        description="A transparent view of signals available to the public website. Unknown means there is no verified signal—not that a service is healthy."
      />
      <div className="page-content">
        <div className="status-list">
          {[
            ['Public website', 'This page was rendered by the website server.', status.website],
            ['Discord gateway', status.note, status.gateway],
            ['Music providers', 'No public provider-health integration is configured.', 'unknown'],
            [
              'Social notifications',
              'No public delivery-health integration is configured.',
              'unknown',
            ],
          ].map(([name, note, state]) => (
            <div className="status-row" key={name}>
              <div>
                <h3>{name}</h3>
                <p>{note}</p>
              </div>
              <span className={'status-badge ' + state}>{state}</span>
            </div>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 20 }}>
          Checked {status.checkedAt.replace('T', ' ').replace('Z', ' UTC')}. Refresh the page for a
          new check (cached up to 15 seconds).
        </p>
        <div className="notice">
          Historical uptime and incident history are not connected. No uptime percentage or past
          reliability figure is inferred from a single heartbeat.
        </div>
      </div>
    </>
  );
}
