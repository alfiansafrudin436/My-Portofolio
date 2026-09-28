"use client";

import { cn } from "@/lib/utils/cn";

/** Toggle, for flipping a row's published/visible flag inline. */
export function Switch({
  checked,
  onChange,
  label,
  disabled,
  className,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 shrink-0 items-center rounded-full border transition-colors",
        checked ? "border-accent bg-accent" : "border-border bg-bg-subtle",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute size-3.5 rounded-full transition-transform",
          checked ? "translate-x-4.5 bg-accent-fg" : "translate-x-0.5 bg-fg-subtle",
        )}
      />
    </button>
  );
}
