"use client";

export default function ErrorPanel({ title, message, onRetry }) {
  return (
    <section
      className="neo-raised w-full max-w-4xl rounded-neo-card bg-neo-surface p-6 sm:p-8"
      role="alert"
      aria-labelledby="users-error-title"
    >
      <h2
        id="users-error-title"
        className="text-xl font-semibold tracking-tight text-neo-text"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm text-neo-muted">{message}</p>
      {onRetry ? (
        <button
          type="button"
          className="neo-control mt-4 px-4 py-2 text-sm font-medium"
          onClick={onRetry}
        >
          Try again
        </button>
      ) : null}
    </section>
  );
}
