import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export function Container({
  as: Tag = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag className={cn("mx-auto w-full max-w-[1440px] px-6 md:px-10", className)}>
      {children}
    </Tag>
  );
}
