import Link from 'next/link';
import { PageHeading } from '@/components/page-heading';
import { SecurityDemo, VerificationDemo } from '@/components/demos';
export const metadata = { title: 'Security' };
export default function Security() {
  return (
    <>
      <PageHeading
        eyebrow="PROTECT THE PLACE YOU BUILT"
        title="A welcoming server needs good boundaries."
        description="Layer moderation, verification and permission safeguards around your community. Configure the rules; keep the decisions visible."
      />
      <div className="page-content">
        <div className="demo-grid">
          <SecurityDemo />
          <VerificationDemo />
        </div>
        <div className="feature-details">
          {[
            [
              'Moderation & AutoMod',
              'Use explicit policies for message floods, suspicious content and moderation actions. Review provider-dependent AI decisions rather than assuming perfect detection.',
            ],
            [
              'Verification, your way',
              'Choose button, CAPTCHA, password or web verification. Apply account-age and avatar policies with safe role hierarchy checks.',
            ],
            [
              'Anti-nuke & private logs',
              'Configure containment thresholds and trusted actors. Keep audit events in channels with deliberate administrator-only permissions.',
            ],
          ].map(([t, p]) => (
            <article key={t} className="feature-detail">
              <h3>{t}</h3>
              <p>{p}</p>
            </article>
          ))}
        </div>
        <div className="notice">
          No anti-abuse system guarantees detection of every scam or alternate account. These demos
          illustrate rules, not a live scan or a claim of perfect protection.
        </div>
        <Link className="button secondary" href="/docs#verification">
          Read the security setup guide
        </Link>
      </div>
    </>
  );
}
