"use client";

import NextLink from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSiteHeader } from "@/components/SiteHeader/hooks";
import { cn } from "@/lib/utils/cn";

export function SiteHeader({ name }: { name: string }) {
  const { links, isOpen, isScrolled, activeSection, toggle, close } =
    useSiteHeader();

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors",
        isScrolled || isOpen
          ? "border-b border-border bg-bg"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <NextLink
          href="/"
          className="label text-fg transition-colors hover:text-accent"
        >
          {name}
        </NextLink>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {links.map((link) => (
            <NextLink
              key={link.id}
              href={link.href}
              aria-current={activeSection === link.id ? "true" : undefined}
              className={cn(
                "label border-b-2 py-1 transition-colors",
                activeSection === link.id
                  ? "border-accent text-fg"
                  : "border-transparent text-fg-muted hover:text-fg",
              )}
            >
              {link.label}
            </NextLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="grid size-9 place-items-center border border-border text-fg-muted transition-colors hover:border-border-strong hover:text-fg md:hidden"
          >
            {isOpen ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Menu className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-bg md:hidden">
          <Container as="nav" className="flex flex-col py-4" aria-label="Mobile">
            {links.map((link) => (
              <NextLink
                key={link.id}
                href={link.href}
                onClick={close}
                className="border-b border-border py-5 text-2xl text-fg transition-colors hover:text-accent"
              >
                {link.label}
              </NextLink>
            ))}
          </Container>
        </div>
      )}
    </header>
  );
}
