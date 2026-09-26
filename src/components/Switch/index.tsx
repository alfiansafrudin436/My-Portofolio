"use client";

import { cn } from "@/lib/utils/cn";

/** Square-track toggle, for flipping a row's published/visible flag inline. */
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
        "relative inline-flex h-5 w-9 shrink-0 items-center border transition-colors",
        checked ? "border-fg bg-fg" : "border-border bg-transparent",
        "disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute size-3.5 transition-transform",
          checked ? "translate-x-4.5 bg-bg" : "translate-x-0.5 bg-fg-subtle",
        )}
      />
    </button>
  );
}
