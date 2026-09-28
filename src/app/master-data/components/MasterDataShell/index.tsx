"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useMasterDataShell } from "@/app/master-data/components/MasterDataShell/hooks";
import { cn } from "@/lib/utils/cn";

export function MasterDataShell({
  email,
  children,
}: {
  email: string;
  children: ReactNode;
}) {
  const {
    nav,
    isSidebarOpen,
    isSigningOut,
    isActive,
    toggleSidebar,
    handleSignOut,
  } = useMasterDataShell();

  const navLinks = (
    <nav className="flex flex-col gap-1" aria-label="Master data">
      {nav.map((item) => (
        <NextLink
          key={item.href}
          href={item.href}
          aria-current={isActive(item.href, item.exact) ? "page" : undefined}
          className={cn(
            "rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive(item.href, item.exact)
              ? "bg-accent-subtle text-accent"
              : "text-fg-muted hover:bg-bg-subtle hover:text-fg",
          )}
        >
          {item.label}
        </NextLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Mobile bar */}
      <div className="flex h-16 items-center justify-between border-b border-border px-6 md:hidden">
        <NextLink href="/master-data" className="font-semibold text-fg">
          Master Data
        </NextLink>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={isSidebarOpen}
            className="grid size-9 place-items-center rounded-md border border-border text-fg-muted transition-colors hover:text-fg"
          >
            {isSidebarOpen ? (
              <X className="size-4" aria-hidden />
            ) : (
              <Menu className="size-4" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="border-b border-border px-6 py-4 md:hidden">{navLinks}</div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-border bg-surface py-8 md:sticky md:top-0 md:flex md:h-screen">
        <div>
          <div className="flex items-center justify-between px-6 pb-8">
            <NextLink
              href="/master-data"
              className="font-semibold text-fg transition-colors hover:text-accent"
            >
              Master Data
            </NextLink>
            <ThemeToggle />
          </div>
          <div className="px-4">{navLinks}</div>
        </div>

        <div className="space-y-3 border-t border-border px-6 pt-6">
          <NextLink
            href="/"
            className="block text-sm text-fg-subtle transition-colors hover:text-fg"
          >
            ← View site
          </NextLink>
          <p className="truncate text-xs text-fg-muted" title={email}>
            {email}
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-danger disabled:opacity-50"
          >
            <LogOut className="size-3.5" aria-hidden />
            {isSigningOut ? "Signing out" : "Sign out"}
          </button>
        </div>
      </aside>

      <div className="min-w-0 flex-1 px-6 py-8 md:px-10 md:py-12">{children}</div>
    </div>
  );
}
