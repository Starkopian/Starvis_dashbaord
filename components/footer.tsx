import Link from 'next/link';
import { MascotMark } from './brand';
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand" href="/">
            <MascotMark /> STARVIS.
          </Link>
          <p>Your community. In its element.</p>
          <span className="eyebrow">YOUR PEOPLE. YOUR SPACE. YOUR STARVIS.</span>
          <small className="availability-note">Built for Discord communities.</small>
        </div>
        <div className="footer-links">
          <div>
            <strong>Explore</strong>
            <Link href="/features">Features</Link>
            <Link href="/commands">Commands</Link>
          </div>
          <div>
            <strong>Resources</strong>
            <Link href="/docs">Documentation</Link>
            <Link href="/support">Support</Link>
            <Link href="/status">System status</Link>
          </div>
          <div>
            <strong>Behind the bot</strong>
            <Link href="/changelog">Changelog</Link>
            <Link href="/roadmap">Roadmap</Link>
            <Link href="/privacy">Privacy & data</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/credits">Credits</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} STARVIS. Built for communities.</span>
        <span>Independent project. Not affiliated with Discord.</span>
      </div>
    </footer>
  );
}
