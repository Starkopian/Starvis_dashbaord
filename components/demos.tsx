'use client';
import { useEffect, useState } from 'react';
import {
  AudioLines,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat2,
  Volume2,
  ListMusic,
  ShieldCheck,
  LockKeyhole,
  CircleCheck,
  MessageSquare,
  Users,
  Mic,
  Eye,
  EyeOff,
  Unlock,
  Lock,
  ArrowUpRight,
  Check,
  Send,
  Ticket,
  Download,
  Sparkles,
  Crown,
  Radio,
  RotateCcw,
} from 'lucide-react';
const tracks = [
  {
    name: 'Midnight Frequency',
    artist: 'STARVIS Sessions',
    album: 'AFTER HOURS',
    duration: 224,
    color: 'violet',
  },
  {
    name: 'Golden Hour',
    artist: 'Demo Collective',
    album: 'SLOW SUNRISE',
    duration: 198,
    color: 'amber',
  },
  {
    name: 'Orbiting You',
    artist: 'STARVIS Sessions',
    album: 'DEEP SPACE',
    duration: 256,
    color: 'cyan',
  },
];
const time = (s: number) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
export function DemoLabel({ children = 'INTERACTIVE DEMO' }: { children?: string }) {
  return (
    <span className="demo-label">
      <span /> {children} · NO SERVER ACTIONS
    </span>
  );
}
export function MusicDemo({ compact = false }: { compact?: boolean }) {
  const [index, setIndex] = useState(0),
    [playing, setPlaying] = useState(false),
    [progress, setProgress] = useState(42),
    [volume, setVolume] = useState(68),
    [shuffle, setShuffle] = useState(false),
    [repeat, setRepeat] = useState(false),
    [queue, setQueue] = useState(!compact);
  const track = tracks[index];
  const next = () => {
    setIndex((i) =>
      shuffle ? (i + 1 + Math.floor(Math.random() * 2)) % tracks.length : (i + 1) % tracks.length,
    );
    setProgress(0);
  };
  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => {
      if (progress >= track.duration) {
        if (!repeat)
          setIndex((i) =>
            shuffle
              ? (i + 1 + Math.floor(Math.random() * 2)) % tracks.length
              : (i + 1) % tracks.length,
          );
        setProgress(0);
      } else setProgress((p) => p + 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [playing, track.duration, progress, repeat, shuffle]);
  return (
    <div className="demo music-demo">
      <div className="demo-title">
        <span>
          <AudioLines size={17} /> THE LISTENING ROOM
        </span>
        <DemoLabel>SIMULATED PLAYER</DemoLabel>
      </div>
      <div className="player-main">
        <div className={'album-art ' + track.color}>
          <div className="album-orbit" />
          <span>
            STARVIS
            <br />
            SESSIONS
          </span>
          <strong>{String(index + 1).padStart(2, '0')}</strong>
          <small>{track.album}</small>
        </div>
        <div className="track-info">
          <span className="eyebrow">{playing ? 'NOW PLAYING' : 'READY WHEN YOU ARE'}</span>
          <h3>{track.name}</h3>
          <p>{track.artist}</p>
          <div className="audio-wave" data-playing={playing} aria-hidden="true">
            {Array.from({ length: 22 }, (_, i) => (
              <i key={i} style={{ height: 8 + ((i * 17) % 33), animationDelay: i * 0.06 + 's' }} />
            ))}
          </div>
          <span className="muted small">Fictional tracks · silent preview</span>
        </div>
      </div>
      <div className="progress-row">
        <span>{time(progress)}</span>
        <input
          aria-label="Track progress"
          type="range"
          min="0"
          max={track.duration}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
        />
        <span>{time(track.duration)}</span>
      </div>
      <div className="player-controls">
        <button
          className="icon-button"
          aria-label="Shuffle"
          aria-pressed={shuffle}
          onClick={() => setShuffle(!shuffle)}
        >
          <Shuffle size={18} />
        </button>
        <button
          className="icon-button"
          aria-label="Previous track"
          onClick={() => {
            setIndex((i) => (i + 2) % 3);
            setProgress(0);
          }}
        >
          <SkipBack size={20} />
        </button>
        <button
          className="play-button"
          aria-label={playing ? 'Pause demo' : 'Play demo'}
          onClick={() => setPlaying(!playing)}
        >
          {playing ? (
            <Pause size={22} fill="currentColor" />
          ) : (
            <Play size={22} fill="currentColor" />
          )}
        </button>
        <button className="icon-button" aria-label="Next track" onClick={next}>
          <SkipForward size={20} />
        </button>
        <button
          className="icon-button"
          aria-label="Repeat"
          aria-pressed={repeat}
          onClick={() => setRepeat(!repeat)}
        >
          <Repeat2 size={19} />
        </button>
        <span className="control-divider" />
        <Volume2 size={17} />
        <input
          className="volume"
          aria-label="Volume"
          type="range"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
        <button
          className="icon-button"
          aria-label="Show queue"
          aria-expanded={queue}
          onClick={() => setQueue(!queue)}
        >
          <ListMusic size={20} />
        </button>
      </div>
      {queue && (
        <div className="queue-list">
          <div className="queue-heading">
            <span>UP NEXT</span>
            <span>
              {volume}% volume · Repeat {repeat ? 'on' : 'off'}
            </span>
          </div>
          {tracks.map((t, i) => (
            <button
              key={t.name}
              className={i === index ? 'queue-track active' : 'queue-track'}
              onClick={() => {
                setIndex(i);
                setProgress(0);
              }}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <span>
                {t.name}
                <small>{t.artist}</small>
              </span>
              <span>{time(t.duration)}</span>
              {i === index ? <AudioLines size={15} /> : <Play size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
const incidents = [
  {
    label: 'Suspicious link',
    detail: 'A simulated phishing URL was held for review.',
    result: 'LINK HELD',
    icon: LockKeyhole,
  },
  {
    label: 'Message flood',
    detail: 'A fictional burst exceeded the example rate limit.',
    result: 'TIMEOUT SIMULATED',
    icon: MessageSquare,
  },
  {
    label: 'Rapid role changes',
    detail: 'An example role-change burst triggered an anti-nuke rule.',
    result: 'ALERT CREATED',
    icon: ShieldCheck,
  },
];
export function SecurityDemo() {
  const [selected, setSelected] = useState(0),
    [run, setRun] = useState(false);
  const incident = incidents[selected];
  const Icon = incident.icon;
  return (
    <div className="demo security-demo">
      <div className="demo-title">
        <span>
          <ShieldCheck size={17} /> SECURITY CONSOLE
        </span>
        <DemoLabel />
      </div>
      <div className="security-core">
        <div className={'shield-orb ' + (run ? 'protected' : '')}>
          <ShieldCheck size={46} />
        </div>
        <span className="eyebrow">{run ? 'SIMULATION COMPLETE' : 'A LITTLE LESS WORRY'}</span>
        <h3>{run ? 'A clear signal. A clear response.' : 'See the guardrails in action.'}</h3>
        <p>Explore an example rule. Actual enforcement depends on your server configuration.</p>
      </div>
      <div className="segmented">
        {incidents.map((i, n) => (
          <button
            key={i.label}
            aria-pressed={selected === n}
            onClick={() => {
              setSelected(n);
              setRun(false);
            }}
          >
            {i.label}
          </button>
        ))}
      </div>
      <button className="button secondary full" onClick={() => setRun(true)}>
        <Icon size={16} /> Run example event <ArrowUpRight size={16} />
      </button>
      <div className="incident-result" aria-live="polite">
        {run ? (
          <>
            <span className="status-dot" />
            <div>
              <strong>{incident.result}</strong>
              <p>{incident.detail}</p>
            </div>
            <Check size={19} />
          </>
        ) : (
          <>
            <Radio size={18} />
            <span>Ready for a simulated event. No real message is scanned.</span>
          </>
        )}
      </div>
    </div>
  );
}
export function WelcomeDemo() {
  const [name, setName] = useState('Nova'),
    [style, setStyle] = useState('Aurora');
  return (
    <div className="demo">
      <div className="demo-title">
        <span>
          <Sparkles size={17} /> A BETTER FIRST HELLO
        </span>
        <DemoLabel />
      </div>
      <div className={'welcome-preview ' + style.toLowerCase()}>
        <div className="avatar">N</div>
        <span className="eyebrow">A NEW CHAPTER STARTS HERE</span>
        <h3>Welcome, {name.trim() || 'friend'}.</h3>
        <p>You belong here. Make yourself at home.</p>
        <span className="pill">THE STARVIS COMMUNITY · EXAMPLE</span>
      </div>
      <div className="form-row">
        <label>
          Display name
          <input value={name} maxLength={24} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Card mood
          <select value={style} onChange={(e) => setStyle(e.target.value)}>
            <option>Aurora</option>
            <option>Midnight</option>
            <option>Golden</option>
          </select>
        </label>
      </div>
    </div>
  );
}
const members = [
  { name: 'Nova', xp: 24680, weekly: 2540, voice: 96 },
  { name: 'Atlas', xp: 21420, weekly: 3120, voice: 112 },
  { name: 'Luna', xp: 19780, weekly: 2180, voice: 84 },
];
export function LevelingDemo() {
  const [filter, setFilter] = useState<'xp' | 'weekly' | 'voice'>('xp');
  return (
    <div className="demo">
      <div className="demo-title">
        <span>
          <Crown size={17} /> EVERY CONTRIBUTION COUNTS
        </span>
        <DemoLabel />
      </div>
      <div className="rank-hero">
        <div className="avatar">N</div>
        <div>
          <h3>
            Nova <span className="pill">LEVEL 42</span>
          </h3>
          <p>3,250 / 5,000 XP to the next level</p>
          <div className="xp-bar">
            <span />
          </div>
        </div>
        <strong>
          #1<small>demo ranking</small>
        </strong>
      </div>
      <div className="segmented">
        {(
          [
            ['xp', 'All-time XP'],
            ['weekly', 'This week'],
            ['voice', 'Voice hours'],
          ] as const
        ).map(([key, label]) => (
          <button key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>
            {label}
          </button>
        ))}
      </div>
      <ol className="leaderboard">
        {[...members]
          .sort((a, b) => b[filter] - a[filter])
          .map((m, i) => (
            <li key={m.name}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <div className="mini-avatar">{m.name[0]}</div>
              <strong>{m.name}</strong>
              <span>
                {m[filter].toLocaleString('en-US')} {filter === 'voice' ? 'h' : 'XP'}
              </span>
            </li>
          ))}
      </ol>
      <p className="small muted">
        Fictional members and activity. Actual eligibility and rewards follow your server’s rules.
      </p>
    </div>
  );
}
export function TicketDemo() {
  const [state, setState] = useState<'closed' | 'open' | 'claimed' | 'resolved'>('closed'),
    [message, setMessage] = useState(''),
    [messages, setMessages] = useState<string[]>([]);
  const transcript = () => {
    const url = URL.createObjectURL(
      new Blob(
        [
          'STARVIS DEMO TRANSCRIPT — fictional local data\nStatus: ' +
            state +
            '\n' +
            messages.join('\n'),
        ],
        { type: 'text/plain' },
      ),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = 'starvis-demo-transcript.txt';
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="demo">
      <div className="demo-title">
        <span>
          <Ticket size={17} /> SUPPORT WITH CONTEXT
        </span>
        <DemoLabel />
      </div>
      <div className="ticket-header">
        <span># help-nova</span>
        <span className="pill">{state === 'closed' ? 'NOT CREATED' : state.toUpperCase()}</span>
      </div>
      <div className="ticket-messages" aria-live="polite">
        <p>
          <strong>STARVIS</strong>
          <br />
          {state === 'closed'
            ? 'Create a demo ticket to explore the workflow.'
            : 'Hey Nova. Tell us what you need a hand with.'}
        </p>
        {messages.map((m, i) => (
          <p key={i}>
            <strong>You · demo</strong>
            <br />
            {m}
          </p>
        ))}
        {state === 'claimed' && (
          <p>
            <strong>Support team · demo</strong>
            <br />
            Your ticket has been claimed.
          </p>
        )}
        {state === 'resolved' && (
          <p>
            <CircleCheck size={16} /> Resolved. A local transcript is ready.
          </p>
        )}
      </div>
      {state === 'closed' ? (
        <button className="button primary full" onClick={() => setState('open')}>
          Create demo ticket <Ticket size={17} />
        </button>
      ) : (
        <>
          <form
            className="message-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (message.trim()) {
                setMessages((m) => [...m, message.trim()]);
                setMessage('');
              }
            }}
          >
            <input
              aria-label="Demo ticket message"
              placeholder="Type a demo message…"
              maxLength={300}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={state === 'resolved'}
            />
            <button
              className="icon-button"
              aria-label="Send demo message"
              disabled={state === 'resolved' || !message.trim()}
            >
              <Send size={17} />
            </button>
          </form>
          <div className="button-row">
            {state === 'open' && (
              <button className="button secondary" onClick={() => setState('claimed')}>
                Claim ticket
              </button>
            )}
            {state !== 'resolved' && (
              <button className="button secondary" onClick={() => setState('resolved')}>
                Resolve
              </button>
            )}
            {state === 'resolved' && (
              <button className="button secondary" onClick={transcript}>
                <Download size={15} /> Transcript
              </button>
            )}
            <button
              className="icon-button"
              aria-label="Reset ticket demo"
              onClick={() => {
                setState('closed');
                setMessages([]);
                setMessage('');
              }}
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
export function VerificationDemo() {
  const [verified, setVerified] = useState(false),
    [role, setRole] = useState('Gaming');
  return (
    <div className="demo">
      <div className="demo-title">
        <span>
          <CircleCheck size={17} /> A THOUGHTFUL FRONT DOOR
        </span>
        <DemoLabel />
      </div>
      <div className="verification-preview">
        <div className="shield-orb">
          <ShieldCheck size={36} />
        </div>
        <h3>{verified ? 'You’re part of the community.' : 'A quick hello. A safer server.'}</h3>
        <p>
          {verified
            ? 'This is a simulated role selection. No Discord roles were changed.'
            : 'Try the simplest verification flow, then choose an interest.'}
        </p>
        {!verified ? (
          <button className="button primary" onClick={() => setVerified(true)}>
            <Check size={17} /> Verify in demo
          </button>
        ) : (
          <>
            <label className="role-label">
              Choose your interest
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option>Gaming</option>
                <option>Music</option>
                <option>Creators</option>
              </select>
            </label>
            <span className="pill cyan">
              <CircleCheck size={14} /> Verified · {role}
            </span>
            <button className="text-button" onClick={() => setVerified(false)}>
              Reset preview
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export function VoiceDemo() {
  const [locked, setLocked] = useState(false),
    [hidden, setHidden] = useState(false),
    [limit, setLimit] = useState('4'),
    [name, setName] = useState('Nova’s lounge');
  return (
    <div className="demo">
      <div className="demo-title">
        <span>
          <Mic size={17} /> YOUR OWN LITTLE CORNER
        </span>
        <DemoLabel />
      </div>
      <div className="voice-preview">
        <span className="pill cyan">
          <i className="status-dot" /> DEMO ROOM
        </span>
        <h3>{name.trim() || 'Your lounge'}</h3>
        <div className="voice-avatars">
          <span>N</span>
          <span>A</span>
          <span>L</span>
          <span>+</span>
        </div>
        <p>3 fictional members · {limit === '0' ? 'Unlimited' : limit} slots</p>
      </div>
      <div className="form-row">
        <label>
          Room name
          <input value={name} maxLength={32} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Room size
          <select value={limit} onChange={(e) => setLimit(e.target.value)}>
            <option value="2">Duo · 2</option>
            <option value="3">Trio · 3</option>
            <option value="4">Squad · 4</option>
            <option value="0">Unlimited</option>
          </select>
        </label>
      </div>
      <div className="button-row">
        <button
          className="button secondary"
          aria-pressed={locked}
          onClick={() => setLocked(!locked)}
        >
          {locked ? <Lock size={16} /> : <Unlock size={16} />} {locked ? 'Locked' : 'Public'}
        </button>
        <button
          className="button secondary"
          aria-pressed={hidden}
          onClick={() => setHidden(!hidden)}
        >
          {hidden ? <EyeOff size={16} /> : <Eye size={16} />} {hidden ? 'Hidden' : 'Visible'}
        </button>
        <span className="small muted">Local preview only</span>
      </div>
    </div>
  );
}
