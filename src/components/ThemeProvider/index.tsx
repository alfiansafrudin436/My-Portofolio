"use client";

import type { ReactNode } from "react";
import { ThemeContext, useThemeState } from "@/components/ThemeProvider/hooks";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const value = useThemeState();
  return <ThemeContext value={value}>{children}</ThemeContext>;
}
