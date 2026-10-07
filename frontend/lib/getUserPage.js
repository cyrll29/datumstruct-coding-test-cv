export function getUserPage({ users, page, rowsPerPage }) {
  const safeRowsPerPage = Math.max(1, rowsPerPage);
  const totalPages = Math.max(1, Math.ceil(users.length / safeRowsPerPage));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (clampedPage - 1) * safeRowsPerPage;
  const rows = users.slice(startIndex, startIndex + safeRowsPerPage);

  return {
    page: clampedPage,
    totalPages,
    rows,
  };
}

export function parsePageInput(rawValue, totalPages) {
  const trimmed = String(rawValue).trim();
  if (trimmed === "") {
    return 1;
  }

  const parsed = Number.parseInt(trimmed, 10);
  if (Number.isNaN(parsed)) {
    return 1;
  }

  return Math.min(Math.max(1, parsed), totalPages);
}
