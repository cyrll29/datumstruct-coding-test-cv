"use client";

import { useCallback, useMemo, useState } from "react";
import { filterUsersByQuery } from "@/lib/filterUsers";
import { getUserPage, parsePageInput } from "@/lib/getUserPage";

const DEFAULT_ROWS_PER_PAGE = 10;

export default function useUserPagination(users) {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [pageDraft, setPageDraft] = useState("1");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = useMemo(
    () => filterUsersByQuery(users, searchQuery),
    [users, searchQuery],
  );

  const { page: currentPage, totalPages, rows } = useMemo(
    () => getUserPage({ users: filteredUsers, page, rowsPerPage }),
    [filteredUsers, page, rowsPerPage],
  );

  const syncPageDraft = useCallback((nextPage) => {
    setPageDraft(String(nextPage));
  }, []);

  const applyPage = useCallback(
    (nextPage) => {
      const { page: clampedPage } = getUserPage({
        users: filteredUsers,
        page: nextPage,
        rowsPerPage,
      });
      setPage(clampedPage);
      syncPageDraft(clampedPage);
    },
    [filteredUsers, rowsPerPage, syncPageDraft],
  );

  const handleRowsPerPageChange = useCallback(
    (nextRowsPerPage) => {
      setRowsPerPage(nextRowsPerPage);
      const { page: clampedPage } = getUserPage({
        users: filteredUsers,
        page,
        rowsPerPage: nextRowsPerPage,
      });
      setPage(clampedPage);
      syncPageDraft(clampedPage);
    },
    [filteredUsers, page, syncPageDraft],
  );

  const handlePageCommit = useCallback(() => {
    const parsedPage = parsePageInput(pageDraft, totalPages);
    applyPage(parsedPage);
  }, [applyPage, pageDraft, totalPages]);

  const handlePrevious = useCallback(() => {
    applyPage(currentPage - 1);
  }, [applyPage, currentPage]);

  const handleNext = useCallback(() => {
    applyPage(currentPage + 1);
  }, [applyPage, currentPage]);

  const handleSearchChange = useCallback(
    (event) => {
      setSearchQuery(event.target.value);
      setPage(1);
      syncPageDraft(1);
    },
    [syncPageDraft],
  );

  const hasNoSearchMatches =
    searchQuery.trim() !== "" && filteredUsers.length === 0;

  const isEmptyList =
    searchQuery.trim() === "" && filteredUsers.length === 0;

  return {
    currentPage,
    totalPages,
    rows,
    rowsPerPage,
    pageDraft,
    searchQuery,
    hasNoSearchMatches,
    isEmptyList,
    handleRowsPerPageChange,
    handlePageCommit,
    handlePrevious,
    handleNext,
    handleSearchChange,
    setPageDraft,
  };
}
