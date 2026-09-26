"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useContactSection(email: string | null) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copyEmail = useCallback(async () => {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context, denied permission): the mailto
      // link next to the button still works.
    }
  }, [email]);

  return {
    // data
    email,
    copied,
    canCopy: email !== null,
    // methods
    copyEmail,
  };
}
