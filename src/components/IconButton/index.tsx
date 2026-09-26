import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Required: the button has no visible text. */
  label: string;
  size?: "sm" | "md";
  children: ReactNode;
};

export function IconButton({
  label,
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "grid place-items-center border border-border text-fg-muted transition-colors",
        "hover:border-border-strong hover:text-fg",
        "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-fg-muted",
        size === "sm" ? "size-7" : "size-9",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
