import InlineAlert from "@/components/Feedback/InlineAlert";

export default function UsersTableHeader({
  deleteError,
  searchQuery,
  onSearchChange,
  onAddUser,
}) {
  return (
    <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-neo-text">
          Users
        </h1>
        <p className="mt-1 text-sm text-neo-muted">
          Click a row to edit that user.
        </p>
        {deleteError ? (
          <div className="mt-2">
            <InlineAlert message={deleteError} />
          </div>
        ) : null}
      </div>
      <div className="flex w-full flex-col gap-3 self-start sm:w-auto sm:flex-row sm:items-center sm:self-center">
        <input
          id="user-search"
          type="search"
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Search name, username, or email"
          aria-label="Search users by name, username, or email"
          className="neo-inset w-full rounded-neo-control bg-neo-surface px-3 py-2 text-sm text-neo-text placeholder:text-neo-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neo-muted sm:w-72"
        />
        <button
          type="button"
          className="neo-control shrink-0 self-start px-4 py-2 text-sm font-medium"
          onClick={onAddUser}
        >
          Add user
        </button>
      </div>
    </header>
  );
}
