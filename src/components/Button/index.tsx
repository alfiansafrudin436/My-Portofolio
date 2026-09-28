import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type ButtonVariant = "solid" | "accent" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const VARIANTS: Record<ButtonVariant, string> = {
  solid:
    "bg-fg text-bg border border-fg hover:opacity-90 disabled:hover:opacity-100",
  accent:
    "bg-accent text-accent-fg border border-accent hover:brightness-110 disabled:hover:brightness-100",
  outline:
    "border border-border-strong/30 text-fg hover:border-border-strong hover:bg-bg-subtle disabled:hover:bg-transparent",
  ghost:
    "border border-transparent text-fg-muted hover:text-fg hover:border-border",
  danger:
    "border border-danger text-danger hover:bg-danger hover:text-bg disabled:hover:bg-transparent disabled:hover:text-danger",
};

const SIZES: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

/** Class string shared by <button> and anchor-styled-as-button. */
export function buttonClasses(
  variant: ButtonVariant = "solid",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all",
    "disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
    className,
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "solid",
  size = "md",
  isLoading = false,
  disabled,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={buttonClasses(variant, size, className)}
      {...props}
    >
      {isLoading && <Loader2 className="size-3.5 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
