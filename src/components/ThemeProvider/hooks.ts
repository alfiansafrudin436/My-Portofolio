"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark";

export type ThemeContextValue = {
  theme: Theme;
  isDark: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

export const THEME_STORAGE_KEY = "theme";

export const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * The class on <html> is the source of truth — the inline script in the root
 * layout sets it before React runs. Reading it through useSyncExternalStore
 * (rather than mirroring it into state in an effect) keeps React in step with
 * that external value, including changes made from another tab.
 */
const themeStore = {
  subscribe(onChange: () => void) {
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    window.addEventListener("storage", onChange);
    return () => {
      observer.disconnect();
      window.removeEventListener("storage", onChange);
    };
  },
  getSnapshot(): Theme {
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  },
  // The server cannot know the visitor's choice; the inline script corrects
  // the DOM before paint and the observer then syncs React.
  getServerSnapshot(): Theme {
    return "light";
  },
};

export function useThemeState(): ThemeContextValue {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot,
  );

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    root.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Private mode or blocked storage: the choice simply will not persist.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(themeStore.getSnapshot() === "dark" ? "light" : "dark");
  }, [setTheme]);

  return useMemo(
    () => ({ theme, isDark: theme === "dark", setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside <ThemeProvider>");
  }
  return context;
}
