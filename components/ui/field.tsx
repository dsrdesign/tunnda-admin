import type { ComponentProps, ReactNode } from "react";

const CONTROL =
  "min-h-12 w-full rounded-2xl border-[1.5px] border-field-border bg-surface px-4 text-base text-fg outline-none transition duration-300 ease-spring placeholder:text-muted/60 focus:border-forest focus:ring-4 focus:ring-forest/15 aria-[invalid=true]:border-error";

/** Champ avec son libellé au-dessus et une aide (ou une erreur) en dessous. */
export function Field({
  id,
  label,
  hint,
  error,
  className = "",
  ...props
}: ComponentProps<"input"> & {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
  error?: string | null;
}) {
  const describedBy = error || hint ? `${id}-help` : undefined;
  return (
    <div className={`grid gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[0.9375rem] font-medium">
        {label}
      </label>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className={CONTROL}
        {...props}
      />
      {error || hint ? (
        <p
          id={describedBy}
          className={`text-sm ${error ? "text-error" : "text-muted"}`}
        >
          {error ?? hint}
        </p>
      ) : null}
    </div>
  );
}

/** Liste de choix au même style que les champs. */
export function SelectField({
  id,
  label,
  children,
  ...props
}: ComponentProps<"select"> & { id: string; label: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-[0.9375rem] font-medium">
        {label}
      </label>
      <select id={id} className={`${CONTROL} appearance-none`} {...props}>
        {children}
      </select>
    </div>
  );
}

/** Choix exclusif présenté en pastilles (ex. vivant / décédé / je ne sais pas). */
export function Choice<T extends string>({
  legend,
  name,
  value,
  options,
  onChange,
}: {
  legend: string;
  name: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="grid gap-1.5">
      <legend className="mb-1.5 text-[0.9375rem] font-medium">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`cursor-pointer rounded-full px-4 py-2.5 text-[0.9375rem] transition duration-300 ease-spring has-focus-visible:outline-3 has-focus-visible:outline-forest ${
              value === option.value
                ? "bg-forest text-on-forest"
                : "bg-forest-soft text-forest hover:bg-forest-soft-hover"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Texte long (biographie, souvenirs) au même style que les champs. */
export function TextAreaField({
  id,
  label,
  hint,
  ...props
}: ComponentProps<"textarea"> & {
  id: string;
  label: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-[0.9375rem] font-medium">
        {label}
      </label>
      <textarea
        id={id}
        aria-describedby={hint ? `${id}-help` : undefined}
        className={`${CONTROL} min-h-32 resize-y py-3 leading-relaxed`}
        {...props}
      />
      {hint ? (
        <p id={`${id}-help`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
