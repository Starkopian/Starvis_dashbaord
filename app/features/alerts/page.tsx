import { ArrowUpRight, BellRing, RadioTower, Send, Video } from 'lucide-react';
import { PageHeading } from '@/components/page-heading';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { ShimmerLink } from '@/components/ui/shimmer-link';

export const metadata = { title: 'Creator alerts' };

export default function CreatorAlerts() {
  return (
    <>
      <PageHeading
        eyebrow="KEEP YOUR COMMUNITY IN THE LOOP"
        title="The next upload, right on time."
        description="Set up creator alerts from Discord and give every stream, video, and live moment a place to land."
      />
      <div className="page-content feature-page-shell">
        <section className="alerts-hero-card">
          <div>
            <span className="eyebrow">CREATOR ALERTS</span>
            <h2>One signal. The right channel.</h2>
            <p>
              Configure alerts in the bot, choose a destination, optional role and event types, then
              STARVIS delivers notifications when the provider has a supported update.
            </p>
            <ShimmerLink href="/commands?q=notifier">
              Open notifier reference <ArrowUpRight size={17} />
            </ShimmerLink>
          </div>
          <div className="creator-orbits" aria-hidden="true">
            <OrbitingCircles radius={105} duration={40}>
              <BellRing />
              <RadioTower />
              <Video />
              <Send />
            </OrbitingCircles>
            <BellRing className="creator-orbit-center" size={38} />
          </div>
        </section>
        <div className="detail-card-grid">
          <article>
            <Video className="action-icon action-icon-spark" />
            <h3>Video uploads</h3>
            <p>Keep a server updated when a configured YouTube creator publishes a video.</p>
          </article>
          <article>
            <RadioTower className="action-icon action-icon-music" />
            <h3>Live moments</h3>
            <p>Supported Twitch, YouTube and Kick live events can notify the selected channel.</p>
          </article>
          <article>
            <Send className="action-icon action-icon-people" />
            <h3>Your destination</h3>
            <p>Choose where alerts appear and whether a configured role should be mentioned.</p>
          </article>
        </div>
        <div className="notice">
          Availability depends on configured provider credentials, endpoints and each platform’s
          current restrictions. STARVIS does not guarantee delivery of every event.
        </div>
      </div>
    </>
  );
}
