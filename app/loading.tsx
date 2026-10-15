export default function Loading() {
  return (
    <div className="section" role="status" aria-label="Loading page">
      <div className="skeleton" style={{ width: '35%', height: 45, marginBottom: 25 }} />
      <div className="skeleton" style={{ width: '65%', marginBottom: 12 }} />
      <div className="skeleton" style={{ width: '50%' }} />
      <span className="small muted">Loading STARVIS…</span>
    </div>
  );
}
