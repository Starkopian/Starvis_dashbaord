import { PageHeading } from '@/components/page-heading';
import { CommandExplorer } from '@/components/command-explorer';

export const metadata = { title: 'Command directory' };

export default function Commands() {
  return (
    <>
      <PageHeading
        eyebrow="THE POWER BEHIND YOUR COMMUNITY"
        title="Your wish. Our command."
        description="One console. Every possibility. Explore the real STARVIS toolkit, find your next move and make it happen in Discord."
      />
      <div className="page-content">
        <CommandExplorer />
      </div>
    </>
  );
}
