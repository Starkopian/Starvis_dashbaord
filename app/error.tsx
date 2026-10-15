'use client';
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div
      className="section empty-state"
      role="alert"
      style={{ border: 0, paddingTop: 120, paddingBottom: 120 }}
    >
      <span className="eyebrow">LET’S TRY THAT AGAIN</span>
      <h1 style={{ fontSize: 40, marginTop: 20 }}>Something didn’t load.</h1>
      <p>
        No technical details or account information are exposed here. Retry, or ask the operator to
        check the server logs.
      </p>
      <button className="button primary" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
