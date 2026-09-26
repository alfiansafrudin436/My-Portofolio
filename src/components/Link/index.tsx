import NextLink from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Editorial link: an accent underline that slides in on hover. External hrefs
 * get the arrow glyph and the usual rel guards automatically.
 */
export function Link({
  href,
  children,
  className,
  showExternalIcon = true,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  showExternalIcon?: boolean;
}) {
  const isExternal = /^(https?:|mailto:|tel:)/i.test(href);

  const classes = cn(
    "group/link inline-flex items-center gap-1 text-fg transition-colors hover:text-accent",
    className,
  );

  const content = (
    <>
      <span className="bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-300 group-hover/link:bg-[length:100%_1px] bg-linear-to-r from-accent to-accent">
        {children}
      </span>
      {isExternal && showExternalIcon && (
        <ArrowUpRight className="size-3.5 shrink-0" aria-hidden />
      )}
    </>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noreferrer noopener" className={classes}>
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} className={classes}>
      {content}
    </NextLink>
  );
}
