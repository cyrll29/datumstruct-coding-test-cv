"use client";

import { useCallback, useState } from "react";
import buildUserFormValues from "@/lib/users/buildUserFormValues";
import getErrorMessage from "@/lib/users/getErrorMessage";
import userApi from "@/lib/users/userApi";

export default function useUserForm({ user, onSuccess, api = userApi }) {
  const isEditing = Boolean(user?.id);
  const [values, setValues] = useState(() => buildUserFormValues(user));
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = useCallback((fieldName, nextValue) => {
    setValues((previous) => ({ ...previous, [fieldName]: nextValue }));
    setErrorMessage("");
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      setErrorMessage("");
      setIsSubmitting(true);

      const payload = {
        name: values.name.trim(),
        email: values.email.trim(),
        username: values.username.trim(),
      };

      try {
        if (isEditing) {
          await api.updateUser(user.id, payload);
        } else {
          await api.createUser(payload);
        }
        onSuccess();
      } catch (error) {
        console.error(error);
        setErrorMessage(
          getErrorMessage(error, "Something went wrong. Please try again."),
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [api, isEditing, onSuccess, user, values],
  );

  return {
    isEditing,
    values,
    errorMessage,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
  };
}
