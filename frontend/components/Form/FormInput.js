"use client";

export default function FormInput({ field, value, onChange, disabled = false }) {
  const inputIdentifier = `user-form-${field.name}`;
  const isReadOnly = field.readOnly || disabled;

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={inputIdentifier}
        className="text-sm font-medium text-neo-muted"
      >
        {field.label}
      </label>
      <input
        id={inputIdentifier}
        name={field.name}
        type={field.type}
        value={value ?? ""}
        readOnly={field.readOnly}
        disabled={disabled && !field.readOnly}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={`w-full rounded-neo-control bg-neo-surface px-3 py-2.5 text-sm text-neo-text ${
          isReadOnly
            ? "neo-inset cursor-default opacity-80"
            : "neo-inset focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neo-muted disabled:cursor-not-allowed disabled:opacity-50"
        }`}
        aria-readonly={field.readOnly || undefined}
      />
    </div>
  );
}
