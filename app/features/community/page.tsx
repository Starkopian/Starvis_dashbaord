import { PageHeading } from '@/components/page-heading';
import { WelcomeDemo, LevelingDemo, VoiceDemo, TicketDemo } from '@/components/demos';
export const metadata = { title: 'Community' };
export default function Community() {
  return (
    <>
      <PageHeading
        eyebrow="BECAUSE A SERVER IS ITS PEOPLE"
        title="Turn members into regulars."
        description="Celebrate the first hello, recognize contributions, make room for conversations and help people when they need it."
      />
      <div className="page-content">
        <div className="demo-grid">
          <WelcomeDemo />
          <LevelingDemo />
          <VoiceDemo />
          <TicketDemo />
        </div>
        <div className="feature-details">
          {[
            [
              'Welcome & role tools',
              'Onboard members with configurable announcements and role menus. Website previews do not alter saved bot configuration.',
            ],
            [
              'Creator alerts',
              'Configure supported YouTube, Twitch and Kick sources through the bot notifier system. API credentials and provider constraints apply.',
            ],
            [
              'Activity that means something',
              'Recognize eligible messages and voice activity. Actual XP, cooldowns, rewards and rankings follow your server’s configuration.',
            ],
          ].map(([t, p]) => (
            <article className="feature-detail" key={t}>
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
