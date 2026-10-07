export default function LoadingPanel({ message = "Loading users…" }) {
  return (
    <section
      className="neo-raised flex w-full max-w-4xl items-center justify-center rounded-neo-card bg-neo-surface px-6 py-16 sm:px-8"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading"
    >
      <p className="text-sm font-medium text-neo-muted">{message}</p>
    </section>
  );
}
