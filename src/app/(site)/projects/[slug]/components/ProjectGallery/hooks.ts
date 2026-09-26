"use client";

import { useCallback, useEffect, useState } from "react";

export function useProjectGallery(count: number) {
  const [index, setIndex] = useState<number | null>(null);

  const isOpen = index !== null;

  const open = useCallback((next: number) => setIndex(next), []);
  const close = useCallback(() => setIndex(null), []);

  const next = useCallback(() => {
    setIndex((current) => (current === null ? null : (current + 1) % count));
  }, [count]);

  const prev = useCallback(() => {
    setIndex((current) =>
      current === null ? null : (current - 1 + count) % count,
    );
  }, [count]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, close, next, prev]);

  return {
    // data
    index,
    isOpen,
    // methods
    open,
    close,
    next,
    prev,
  };
}
