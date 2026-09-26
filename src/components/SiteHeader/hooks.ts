"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/constants";

export function useSiteHeader() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [spiedSection, setSpiedSection] = useState<string | null>(null);

  const isHome = pathname === "/";

  // Close the mobile overlay on navigation. Adjusting state during render is
  // React's recommended alternative to a setState-in-effect here.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setIsOpen(false);
  }

  // Only the home page has the anchors, so elsewhere nothing is active.
  const activeSection = isHome ? spiedSection : null;

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((open) => !open), []);

  // Solid header with a bottom rule once the hero has scrolled away.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll behind the overlay.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Scroll-spy for the nav underline.
  useEffect(() => {
    if (!isHome) return;

    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.id),
    ).filter((element): element is HTMLElement => element !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setSpiedSection(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  return {
    // data
    links: NAV_LINKS,
    isOpen,
    isScrolled,
    activeSection,
    isHome,
    // methods
    toggle,
    close,
  };
}
