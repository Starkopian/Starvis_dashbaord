import Link from 'next/link';
import { PageHeading } from '@/components/page-heading';
import { MusicDemo } from '@/components/demos';
export const metadata = { title: 'Music' };
export default function Music() {
  return (
    <>
      <PageHeading
        eyebrow="THE SOUND OF BEING TOGETHER"
        title="Good company. Great soundtrack."
        description="Search, queue, shuffle and settle in. STARVIS brings listening controls into Discord, so the conversation doesn’t have to stop."
      />
      <div className="page-content">
        <div className="feature-intro">
          <MusicDemo />
          <div className="prose">
            <h2>Your listening room, in Discord.</h2>
            <p>
              Start with <code>/play</code>. Manage the queue, explore playlists and control
              playback from the native music panel. AI DJ commands are available in the bot when the
              required provider is configured.
            </p>
            <h3>Try the controls.</h3>
            <p>
              This player is a silent, local simulation with fictional tracks. Play, pause, scrub,
              adjust volume, open the queue or choose the next track. It never starts real playback.
            </p>
            <p>
              <Link href="/commands?q=play">View music commands →</Link>
            </p>
          </div>
        </div>
        <div className="feature-details">
          {[
            [
              'A shared queue',
              'See what is next, select a track and keep a shared listening session organized.',
            ],
            [
              'Playlists, with context',
              'Supported links and playlists are resolved by the existing music engine. Source availability and limits can vary.',
            ],
            [
              'Made for the voice channel',
              'Keep the controls close to the conversation, with native Discord interactions.',
            ],
          ].map(([title, text]) => (
            <article className="feature-detail" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <div className="notice">
          Playback depends on configured audio providers, permissions and source availability. We do
          not promise uninterrupted playback or universal platform access.
        </div>
      </div>
    </>
  );
}
