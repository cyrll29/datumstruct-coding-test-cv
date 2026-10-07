"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import useUserDelete from "@/hooks/useUserDelete";
import useUserPagination from "@/hooks/useUserPagination";
import FormModal from "./FormModal";
import Pagination from "./Pagination";
import UsersTableHeader from "./UsersTableHeader";
import UsersTableRow from "./UsersTableRow";

export default function UsersTable({ users }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const pagination = useUserPagination(users);
  const { deletingUserId, deleteError, handleDelete } = useUserDelete();

  const openEditModal = useCallback((user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }, []);

  const openAddModal = useCallback(() => {
    setSelectedUser(null);
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
  }, []);

  const handleModalSuccess = useCallback(() => {
    setIsModalOpen(false);
    setSelectedUser(null);
    router.refresh();
  }, [router]);

  return (
    <>
      <section
        className="neo-raised w-full max-w-4xl rounded-neo-card bg-neo-surface p-6 sm:p-8"
        aria-label="Users table"
      >
        <UsersTableHeader
          deleteError={deleteError}
          searchQuery={pagination.searchQuery}
          onSearchChange={pagination.handleSearchChange}
          onAddUser={openAddModal}
        />

        <div className="overflow-x-auto rounded-neo-control neo-inset">
          <table className="min-w-[640px] w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neo-shadow-dark/30 text-neo-muted">
                <th scope="col" className="px-4 py-3 font-semibold text-neo-text">
                  ID
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-neo-text">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-neo-text">
                  Username
                </th>
                <th scope="col" className="px-4 py-3 font-semibold text-neo-text">
                  Email
                </th>
                <th scope="col" className="w-14 px-4 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pagination.hasNoSearchMatches ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-neo-muted"
                  >
                    No users match that search.
                  </td>
                </tr>
              ) : null}
              {pagination.isEmptyList ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-neo-muted"
                  >
                    No users yet.
                  </td>
                </tr>
              ) : null}
              {pagination.rows.map((user) => (
                <UsersTableRow
                  key={user.id}
                  user={user}
                  isDeleting={deletingUserId === user.id}
                  onEdit={openEditModal}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Pagination
            page={pagination.currentPage}
            totalPages={pagination.totalPages}
            rowsPerPage={pagination.rowsPerPage}
            pageDraft={pagination.pageDraft}
            onRowsPerPageChange={pagination.handleRowsPerPageChange}
            onPrevious={pagination.handlePrevious}
            onNext={pagination.handleNext}
            onPageDraftChange={pagination.setPageDraft}
            onPageCommit={pagination.handlePageCommit}
          />
        </div>
      </section>

      {isModalOpen ? (
        <FormModal
          key={selectedUser?.id ?? "add-user"}
          user={selectedUser}
          onClose={handleModalClose}
          onSuccess={handleModalSuccess}
        />
      ) : null}
    </>
  );
}
