import { PageHeading } from '@/components/page-heading';
export const metadata = { title: 'Privacy & data' };
export default function Privacy() {
  return (
    <>
      <PageHeading
        eyebrow="CLARITY COMES FIRST"
        title="Your data, without the mystery."
        description="Implementation-specific privacy information for this STARVIS website. The deployment operator must add their contact details and review this notice before public launch."
      />
      <div className="page-content prose">
        <h2>Public browsing and demos</h2>
        <p>
          The site does not add advertising trackers or analytics. Interactive demos use fictional
          data and browser memory; they do not send messages, scan real users or change Discord
          settings. A demo transcript is downloaded only when you request it. Hosting infrastructure
          may keep request logs according to the operator’s configuration.
        </p>
        <h2>No website account system</h2>
        <p>
          This public website does not provide Discord sign-in, account profiles, server dashboards
          or configuration editors. It does not store Discord access tokens, guild lists or website
          sessions for visitors.
        </p>
        <h2>Support and deletion requests</h2>
        <p>
          Contact the installation’s server administrator or configured support contact for
          questions about data handled by the Discord bot. No public self-service account or
          data-deletion workflow exists on this website.
        </p>
        <h2>Bot data is separate</h2>
        <p>
          Moderation logs, verification records, activity tracking and other bot data follow the
          existing bot’s storage and server policies. This public site does not expose those
          records. Administrators must inform members about enabled features and choose appropriate
          retention rules.
        </p>
        <h2>Operator responsibilities before launch</h2>
        <p>
          Publish a real privacy contact, review data retention and backup handling, secure the
          website host, configure HTTPS and determine any applicable notices for the hosting region.
          This document describes the implementation; it is not a substitute for that review.
        </p>
      </div>
    </>
  );
}
