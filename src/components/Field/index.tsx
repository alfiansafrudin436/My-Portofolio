import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/** Label + control + description + error. The bridge to react-hook-form. */
export function Field({
  label,
  htmlFor,
  error,
  description,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  error?: string;
  description?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <label htmlFor={htmlFor} className="label block text-fg-muted">
        {label}
        {required && (
          <span className="ml-1 text-accent" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
      {description && !error && (
        <p className="text-xs text-fg-subtle">{description}</p>
      )}
      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
