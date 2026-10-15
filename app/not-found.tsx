import Link from 'next/link';
export default function NotFound() {
  return (
    <div className="section empty-state" style={{ border: 0, paddingTop: 120, paddingBottom: 120 }}>
      <span className="eyebrow">404 · A LITTLE OFF ORBIT</span>
      <h1 style={{ fontSize: 48, marginTop: 20 }}>Nothing here. Yet.</h1>
      <p>This page doesn’t exist, or that server address is invalid.</p>
      <Link className="button primary" href="/">
        Back to STARVIS
      </Link>
    </div>
  );
}
