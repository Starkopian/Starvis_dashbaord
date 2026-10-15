import { PageHeading } from '@/components/page-heading';
export const metadata = { title: 'Roadmap' };
export default function Roadmap() {
  return (
    <>
      <PageHeading
        eyebrow="THE NEXT CHAPTER"
        title="Built deliberately. Improved together."
        description="A scoped direction for the website, not a promise of delivery dates. Future capabilities will be enabled only after their backend and authorization are ready."
      />
      <div className="page-content">
        <div className="timeline">
          {[
            [
              'FOUNDATION',
              'Discover and explore',
              'Public pages, interactive demonstrations, searchable commands and documentation.',
            ],
            [
              'NEXT PHASE',
              'Expand native setup flows',
              'Keep server configuration inside Discord, with permission-checked commands and clear confirmation messages.',
            ],
            [
              'LATER',
              'More public guides',
              'Add focused documentation and examples for each module as the native Discord workflows mature.',
            ],
            [
              'ONGOING',
              'Verified operational insights',
              'Add real public health signals and a maintained release feed before showing historical metrics.',
            ],
          ].map(([stage, title, text]) => (
            <article className="timeline-item" key={stage}>
              <span className="eyebrow">{stage}</span>
              <h2>{title}</h2>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
