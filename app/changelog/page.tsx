import { PageHeading } from '@/components/page-heading';
export const metadata = { title: 'Changelog' };
export default function Changelog() {
  return (
    <>
      <PageHeading
        eyebrow="A TRANSPARENT BUILD"
        title="What’s taking shape."
        description="Recent bot features and website updates from the current source. Availability in your server depends on the deployed bot version."
      />
      <div className="page-content">
        <div className="timeline">
          <article className="timeline-item">
            <span className="eyebrow">13 OCTOBER 2026 · SOURCE UPDATE</span>
            <h2>More ways to bring your community together.</h2>
            <p>
              Birthday celebrations, festival announcements and an AI chat lounge join the command
              directory. Discover /birthday, /setfest, /ask and /aichat, including setup options and
              permission requirements.
            </p>
            <p>
              AutoMod now exposes word filters, link policies, thresholds and exemptions. Use /clear
              for recent message cleanup. Role tools support paced bulk addition and removal for
              humans, bots or everyone, while /set panel keeps self-service role buttons available.
            </p>
            <p>
              Reliability improvements preserve deployment backups at startup, let bulk role jobs
              continue after individual member failures, and suppress mentions in AI lounge replies.
            </p>
          </article>
          <article className="timeline-item">
            <span className="eyebrow">WEBSITE FOUNDATION · LOCAL DEVELOPMENT</span>
            <h2>A new front door for STARVIS.</h2>
            <p>
              Public feature pages, browser-local interactive demos, a source-generated command
              directory and starter documentation. The site remains a focused public home for the
              bot and its capabilities.
            </p>
            <p>
              Existing music and verification systems remain in the Discord application. Production
              activation and live Discord validation are separate steps.
            </p>
          </article>
        </div>
      </div>
    </>
  );
}
