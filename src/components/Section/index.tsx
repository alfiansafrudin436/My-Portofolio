import type { ReactNode } from "react";
import { Container } from "@/components/Container";
import { cn } from "@/lib/utils/cn";

export function Section({
  id,
  className,
  bare = false,
  children,
}: {
  id?: string;
  className?: string;
  /** Skip the Container, for sections that manage their own width. */
  bare?: boolean;
  children: ReactNode;
}) {
  const content = bare ? children : <Container>{children}</Container>;

  return (
    <section
      id={id}
      className={cn("scroll-mt-20 border-t border-border py-20 md:py-section", className)}
    >
      {content}
    </section>
  );
}
