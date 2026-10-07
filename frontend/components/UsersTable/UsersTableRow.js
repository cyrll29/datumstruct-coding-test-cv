export default function UsersTableRow({
  user,
  isDeleting,
  onEdit,
  onDelete,
}) {
  const handleRowKeyDown = (event) => {
    if (isDeleting) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onEdit(user);
    }
  };

  const handleRowClick = () => {
    if (isDeleting) {
      return;
    }
    onEdit(user);
  };

  return (
    <tr
      tabIndex={isDeleting ? -1 : 0}
      role="button"
      aria-busy={isDeleting || undefined}
      className={`group neo-row border-b border-neo-shadow-dark/20 last:border-b-0 ${
        isDeleting
          ? "cursor-wait opacity-70"
          : "cursor-pointer"
      }`}
      onClick={handleRowClick}
      onKeyDown={handleRowKeyDown}
    >
      <td className="px-4 py-3 text-neo-text">{user.id}</td>
      <td className="px-4 py-3 text-neo-text">
        {isDeleting ? (
          <span className="text-neo-muted">Deleting…</span>
        ) : (
          user.name
        )}
      </td>
      <td className="px-4 py-3 text-neo-text">{user.username}</td>
      <td className="px-4 py-3 text-neo-text">{user.email}</td>
      <td className="px-4 py-3 text-right">
        <button
          type="button"
          aria-label={`Delete ${user.name}`}
          className={`inline-flex rounded-neo-control p-1.5 text-red-600 transition-opacity duration-150 focus-visible:pointer-events-auto focus-visible:opacity-100 disabled:cursor-not-allowed ${
            isDeleting
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100"
          }`}
          disabled={isDeleting}
          onClick={(event) => {
            event.stopPropagation();
            onDelete(user);
          }}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </button>
      </td>
    </tr>
  );
}
