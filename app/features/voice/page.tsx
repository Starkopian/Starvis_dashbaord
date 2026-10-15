import Link from 'next/link';
import { ArrowUpRight, LockKeyhole, MicVocal, SlidersHorizontal, UsersRound } from 'lucide-react';
import { PageHeading } from '@/components/page-heading';
import { VoiceDemo } from '@/components/demos';

export const metadata = { title: 'Voice rooms' };

export default function VoiceRooms() {
  return (
    <>
      <PageHeading
        eyebrow="A ROOM WHENEVER YOU NEED ONE"
        title="Meet in the moment."
        description="Give members a private place to talk without leaving a trail of empty channels behind."
      />
      <div className="page-content feature-page-shell">
        <div className="feature-intro">
          <VoiceDemo />
          <div className="prose">
            <span className="eyebrow">JOIN-TO-CREATE VOICE HUB</span>
            <h2>Every conversation gets its own room.</h2>
            <p>
              Use <code>/joinvcsetup</code> to create the STARVIS voice lounge. Joining a configured
              trigger creates a temporary room and gives the member room controls in Discord.
            </p>
            <Link className="button primary button-animated" href="/commands?q=joinvcsetup">
              Explore voice setup <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
        <div className="detail-card-grid">
          <article>
            <UsersRound className="action-icon action-icon-people" />
            <h3>Make space</h3>
            <p>Choose trigger rooms for duos, trios, squads, or a custom room.</p>
          </article>
          <article>
            <LockKeyhole className="action-icon action-icon-shield" />
            <h3>Keep control</h3>
            <p>Room owners can manage privacy and member access through the native panel.</p>
          </article>
          <article>
            <SlidersHorizontal className="action-icon action-icon-spark" />
            <h3>Stay flexible</h3>
            <p>Adjust the name, user limit and bitrate while the room is active.</p>
          </article>
          <article>
            <MicVocal className="action-icon action-icon-music" />
            <h3>Clear the clutter</h3>
            <p>Empty temporary rooms are cleaned up by the bot after the conversation ends.</p>
          </article>
        </div>
      </div>
    </>
  );
}
