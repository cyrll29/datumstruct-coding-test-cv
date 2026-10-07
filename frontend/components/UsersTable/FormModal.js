"use client";

import { useCallback, useEffect, useMemo } from "react";
import FormInput from "@/components/Form/FormInput";
import InlineAlert from "@/components/Feedback/InlineAlert";
import formFields from "@/formFields";
import useUserForm from "@/hooks/useUserForm";

export default function FormModal({ user, onClose, onSuccess }) {
  const {
    isEditing,
    values,
    errorMessage,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
  } = useUserForm({ user, onSuccess });

  const visibleFields = useMemo(
    () => formFields.filter((field) => isEditing || field.name !== "id"),
    [isEditing],
  );

  const handleClose = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    onClose();
  }, [isSubmitting, onClose]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  const submitLabel = isEditing ? "Update" : "Add";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-neo-shadow-dark/40 px-4 py-8"
      role="presentation"
      onClick={handleClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        aria-busy={isSubmitting || undefined}
        className="neo-raised w-full max-w-md rounded-neo-card bg-neo-surface p-6 sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="mb-6">
          <h2
            id="user-form-title"
            className="text-xl font-semibold tracking-tight text-neo-text"
          >
            {isEditing ? "Edit user" : "Add user"}
          </h2>
          <p className="mt-1 text-sm text-neo-muted">
            {isEditing
              ? "Update the fields below and save your changes."
              : "Fill in the details to create a new user."}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {visibleFields.map((field) => (
            <FormInput
              key={field.name}
              field={field}
              value={values[field.name]}
              onChange={handleFieldChange}
              disabled={isSubmitting}
            />
          ))}

          <InlineAlert message={errorMessage} />

          <div className="mt-2 flex flex-wrap justify-end gap-2">
            <button
              type="button"
              className="neo-control px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="neo-control px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving…" : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
