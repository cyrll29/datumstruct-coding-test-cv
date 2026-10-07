"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import getErrorMessage from "@/lib/users/getErrorMessage";
import userApi from "@/lib/users/userApi";

export default function useUserDelete(api = userApi) {
  const router = useRouter();
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = useCallback(
    async (user) => {
      setDeleteError("");
      setDeletingUserId(user.id);

      try {
        await api.deleteUser(user.id);
        router.refresh();
      } catch (error) {
        console.error(error);
        setDeleteError(
          getErrorMessage(error, "Could not delete that user."),
        );
      } finally {
        setDeletingUserId(null);
      }
    },
    [api, router],
  );

  return {
    deletingUserId,
    deleteError,
    handleDelete,
  };
}
