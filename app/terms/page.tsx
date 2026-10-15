import Link from 'next/link';
import { PageHeading } from '@/components/page-heading';
export const metadata = { title: 'Terms & use' };
export default function Terms() {
  return (
    <>
      <PageHeading
        eyebrow="KEEP IT FAIR. KEEP IT CLEAR."
        title="Using STARVIS responsibly."
        description="A foundation notice for this installation, not a subscription contract. The operator must review and complete public terms before production launch."
      />
      <div className="page-content prose">
        <h2>Permission to manage a server</h2>
        <p>
          Use administrative features only for servers you are authorized to manage. Do not attempt
          to bypass role hierarchy, access another server’s records, abuse provider APIs or use
          automation to harass members.
        </p>
        <h2>Discord and third-party services</h2>
        <p>
          Discord and audio, social or AI providers have their own policies and availability limits.
          STARVIS is an independent project and is not affiliated with Discord or those providers.
          Supported sources may change.
        </p>
        <h2>Availability and previews</h2>
        <p>
          No uptime guarantee, perfect scam-detection guarantee or paid service level is offered by
          this website. Interactive demonstrations are fictional and are not evidence of live
          provider performance. Configuration features are available only when their backend is
          actually implemented and enabled.
        </p>
        <h2>Administration and support</h2>
        <p>
          Server administrators are responsible for permission choices, moderation policies and
          communicating enabled data collection to their members. See the{' '}
          <Link href="/privacy">privacy and data notice</Link> and{' '}
          <Link href="/support">support page</Link> for this installation’s current boundaries.
        </p>
      </div>
    </>
  );
}
