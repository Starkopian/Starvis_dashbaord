import { PageHeading } from '@/components/page-heading';
export const metadata = { title: 'Credits' };
export default function Credits() {
  return (
    <>
      <PageHeading
        eyebrow="BUILT ON GOOD WORK"
        title="Credit where it belongs."
        description="A focused selection of open-source tools and patterns, with STARVIS’s own identity at the center."
      />
      <div className="page-content prose">
        <h2>21st.dev discovery</h2>
        <p>
          <a href="https://21st.dev/" target="_blank" rel="noopener noreferrer">
            21st.dev
          </a>{' '}
          helped identify component and icon families. Its marketplace is not a blanket license: we
          use selected upstream open-source implementations, not copied preview assets or paid
          templates.
        </p>
        <h2>Icons and motion patterns</h2>
        <p>
          <a href="https://lucide.dev/license">Lucide</a> icons are used under ISC, with
          Feather-derived portions under MIT. The orbiting layout and shimmer treatment adapt{' '}
          <a href="https://github.com/magicuidesign/magicui">Magic UI</a> patterns under MIT. Full
          notices are included in the source distribution.
        </p>
        <h2>STARVIS visuals</h2>
        <p>
          The robot mascot was supplied by the STARVIS owner. Its cyan and violet star eyes define
          the current website palette. Demo album art, gradients and layouts are built in code. The
          current hero uses optimized responsive images and lightweight CSS motion, with animation
          disabled for reduced-motion preferences.
        </p>
        <h2>Application foundation</h2>
        <p>
          Next.js, React and LibSQL provide the application foundation. No third-party demo performs
          live Discord actions.
        </p>
      </div>
    </>
  );
}
