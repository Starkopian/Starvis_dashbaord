import { PageHeading } from '@/components/page-heading';
import { DocsExplorer } from '@/components/docs-explorer';
export const metadata = { title: 'Documentation' };
export default function Docs() {
  return (
    <>
      <PageHeading
        eyebrow="A LITTLE GUIDANCE GOES A LONG WAY"
        title="From hello to know-how."
        description="Practical starting points for the features already in the bot. Search a guide, then use the command directory for exact options."
      />
      <div className="page-content">
        <DocsExplorer />
      </div>
    </>
  );
}
