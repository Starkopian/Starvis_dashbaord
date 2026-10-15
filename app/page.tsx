import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  AudioLines,
  ShieldCheck,
  Users,
  Radio,
  Mic,
  Sparkles,
  Terminal,
  ChevronRight,
} from 'lucide-react';
import { MascotStage } from '@/components/mascot-stage';
import { MusicDemo } from '@/components/demos';
import { ShimmerLink } from '@/components/ui/shimmer-link';
import catalog from '@/lib/commands.generated.json';
const capabilities = [
  {
    icon: ShieldCheck,
    title: 'A safer space to belong.',
    tag: 'SECURITY & MODERATION',
    description:
      'Verification, AutoMod, private logs and anti-nuke controls. Set boundaries without losing the human touch.',
    href: '/features/security',
    commands: '/verification · /automod · /antinuke',
  },
  {
    icon: Mic,
    title: 'Good company. Your own room.',
    tag: 'VOICE & COMMUNITY',
    description:
      'Join a trigger, create a room, make it yours. Temporary voice channels with controls right inside Discord.',
    href: '/features/voice',
    commands: '/joinvcsetup',
  },
  {
    icon: Radio,
    title: 'Never miss their next moment.',
    tag: 'CREATOR ALERTS',
    description:
      'Bring upload and live notifications into your community. Configure creator subscriptions through the notifier panel.',
    href: '/features/alerts',
    commands: '/notifier',
  },
];
export default function Home() {
  return (
    <div className="nova-home">
      <section className="nova-hero">
        <div className="nova-hero-copy">
          <span className="nova-kicker">
            <span /> YOUR DISCORD, WITH MORE POSSIBILITY
          </span>
          <h1>
            Not just a bot.
            <br />
            Your server’s
            <br />
            <em>main character.</em>
          </h1>
          <p>
            The soundtrack to your late nights. The guardian of your good vibes. The little
            companion that brings your whole community together.
          </p>
          <div className="nova-actions">
            <ShimmerLink href="/api/install">
              Add to Discord <ArrowUpRight size={18} />
            </ShimmerLink>
            <Link className="nova-text-link" href="/commands">
              Explore commands <ArrowRight size={16} />
            </Link>
          </div>
          <div className="nova-hero-note">
            <span>✦ ✦ ✦</span> Built for Discord. Made for your people.
          </div>
        </div>
        <MascotStage />
      </section>
      <div className="nova-rail">
        <span>
          ONE COMPANION.
          <br />
          <b>EVERY SIDE OF YOUR SERVER.</b>
        </span>
        <span>
          <AudioLines /> Music
        </span>
        <span>
          <ShieldCheck /> Protection
        </span>
        <span>
          <Users /> Community
        </span>
        <Link href="/commands">
          <Terminal /> {catalog.commandCount} commands <ArrowUpRight size={15} />
        </Link>
      </div>
      <section className="nova-section" id="explore">
        <div className="nova-heading">
          <div>
            <span className="nova-kicker">01 / FIND YOUR FREQUENCY</span>
            <h2>
              For the moments
              <br />
              that become <em>memories.</em>
            </h2>
          </div>
          <p>
            Less juggling bots. More being together.
            <br />
            Discover the tools behind your next great server.
          </p>
        </div>
        <div className="nova-music">
          <div className="nova-music-copy">
            <span className="nova-tag">
              <AudioLines size={15} /> MUSIC & AUDIO
            </span>
            <h3>
              Your people.
              <br />
              One shared soundtrack.
            </h3>
            <p>
              Queue up a favorite, discover something new, or let the next track take over. Native
              playback controls keep the conversation flowing.
            </p>
            <Link className="nova-text-link" href="/features/music">
              Find your rhythm <ArrowUpRight size={17} />
            </Link>
            <div className="nova-pills">
              <code>/play</code>
              <code>/queue</code>
              <code>/shuffle</code>
            </div>
          </div>
          <div className="nova-demo">
            <span>INTERACTIVE PREVIEW · NO AUDIO</span>
            <MusicDemo />
          </div>
        </div>
        <div className="nova-grid">
          {capabilities.map(({ icon: Icon, ...item }) => (
            <Link href={item.href} className="nova-card" key={item.tag}>
              <Icon size={28} />
              <span className="nova-kicker">{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div>
                <code>{item.commands}</code>
                <ArrowUpRight size={19} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="nova-commands">
        <div>
          <span className="nova-kicker">02 / SMALL COMMANDS. BIG POSSIBILITIES.</span>
          <h2>
            Your next great idea
            <br />
            starts with <em>a slash.</em>
          </h2>
          <p>
            Every command, parameter and permission in one searchable reference. Generated from the
            bot’s registered command definitions.
          </p>
          <Link className="button secondary" href="/commands">
            Open command center <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="nova-terminal">
          <div className="nova-terminal-top">
            <span>● ● ●</span>
            <small>STARVIS / COMMAND REFERENCE</small>
            <Terminal size={16} />
          </div>
          {[
            ['play', 'Set the mood.'],
            ['joinvcsetup', 'Make room for your people.'],
            ['logsetup', 'Keep the important details.'],
            ['notifier', 'Bring your favorite creators closer.'],
          ].map(([command, text]) => (
            <Link href={`/commands?q=${command}`} key={command}>
              <span>
                <b>/</b>
                {command}
              </span>
              <small>{text}</small>
              <ChevronRight size={16} />
            </Link>
          ))}
          <div className="nova-terminal-bottom">
            {catalog.entryCount} command paths. One place to explore.
          </div>
        </div>
      </section>
      <section className="nova-onboarding nova-section">
        <div className="nova-heading">
          <div>
            <span className="nova-kicker">03 / LESS SETUP. MORE SERVER.</span>
            <h2>
              Make yourself <em>at home.</em>
            </h2>
          </div>
          <Link className="nova-text-link" href="/docs">
            Read the getting-started guide <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="nova-steps">
          {[
            [
              '01',
              'Meet your new companion.',
              'Add STARVIS to a server you manage and review the requested permissions.',
            ],
            [
              '02',
              'Make it yours.',
              'Choose your modules in Discord. Configure roles, channels and the tools your community needs.',
            ],
            [
              '03',
              'Bring everyone together.',
              'Start a queue, open a voice room, or celebrate your community’s next milestone.',
            ],
          ].map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="nova-final">
        <Sparkles size={30} />
        <span className="nova-kicker">YOUR PEOPLE. YOUR SPACE. YOUR STARVIS.</span>
        <h2>
          A little more spark.
          <br />A lot more <em>community.</em>
        </h2>
        <Link className="button primary" href="/api/install">
          Let’s meet on Discord <ArrowUpRight size={18} />
        </Link>
        <p>Configure everything in Discord. No dashboard required.</p>
      </section>
    </div>
  );
}
