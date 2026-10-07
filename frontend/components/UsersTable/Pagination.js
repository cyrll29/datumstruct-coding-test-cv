const ROWS_PER_PAGE_OPTIONS = [5, 10, 20];

export default function Pagination({
  page,
  totalPages,
  rowsPerPage,
  pageDraft,
  onRowsPerPageChange,
  onPrevious,
  onNext,
  onPageDraftChange,
  onPageCommit,
}) {
  const isFirstPage = page <= 1;
  const isLastPage = page >= totalPages;

  const handlePageKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onPageCommit();
    }
  };

  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <label className="flex flex-wrap items-center gap-2 text-sm text-neo-muted">
        <span className="font-medium text-neo-text">Rows per page</span>
        <select
          className="neo-control cursor-pointer px-3 py-2 text-sm"
          value={rowsPerPage}
          onChange={(event) => onRowsPerPageChange(Number(event.target.value))}
          aria-label="Rows per page"
        >
          {ROWS_PER_PAGE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <div className="flex flex-wrap items-center gap-2 sm:justify-end">
        <button
          type="button"
          className="neo-control px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onPrevious}
          disabled={isFirstPage}
          aria-label="Previous page"
        >
          Previous
        </button>

        <label className="flex items-center gap-2 text-sm text-neo-muted">
          <span className="font-medium text-neo-text">Page</span>
          <input
            type="text"
            inputMode="numeric"
            className="neo-control w-16 px-3 py-2 text-center text-sm"
            value={pageDraft}
            onChange={(event) => onPageDraftChange(event.target.value)}
            onBlur={onPageCommit}
            onKeyDown={handlePageKeyDown}
            aria-label="Page number"
          />
          <span>
            of {totalPages}
          </span>
        </label>

        <button
          type="button"
          className="neo-control px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
          onClick={onNext}
          disabled={isLastPage}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}
