"use client";

import { useCallback, useState, useTransition } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "@/actions/auth";
import { MASTER_DATA_NAV } from "@/lib/constants";

export function useMasterDataShell() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSigningOut, startSignOut] = useTransition();

  // Close the mobile sidebar on navigation, adjusted during render rather
  // than in an effect.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsSidebarOpen(false);
  }

  const isActive = useCallback(
    (href: string, exact: boolean) =>
      exact ? pathname === href : pathname.startsWith(href),
    [pathname],
  );

  const handleSignOut = useCallback(() => {
    startSignOut(async () => {
      await signOut();
    });
  }, []);

  return {
    // data
    nav: MASTER_DATA_NAV,
    pathname,
    isSidebarOpen,
    isSigningOut,
    // methods
    isActive,
    toggleSidebar: () => setIsSidebarOpen((open) => !open),
    closeSidebar: () => setIsSidebarOpen(false),
    handleSignOut,
  };
}
