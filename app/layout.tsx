import type { Metadata } from 'next';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import './globals.css';
import './responsive.css';
import './premium.css';
import './redesign.css';
export const metadata: Metadata = {
  title: { default: 'STARVIS — Your community. In its element.', template: '%s · STARVIS' },
  description:
    'Music, security and community tools for Discord. Explore STARVIS, try interactive demos and discover the commands that power your server.',
  robots: { index: true, follow: true },
  icons: { icon: '/brand/starvis.jpg', apple: '/brand/starvis.jpg' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Navigation />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
