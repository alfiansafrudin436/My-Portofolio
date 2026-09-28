"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { ToastContext, useToastState } from "@/components/Toast/hooks";
import { cn } from "@/lib/utils/cn";

export function ToastProvider({ children }: { children: ReactNode }) {
  const value = useToastState();

  return (
    <ToastContext value={value}>
      {children}
      <div
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-100 flex flex-col items-end gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6"
      >
        <AnimatePresence initial={false}>
          {value.toasts.map((toast) => (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border bg-surface-raised py-3 pr-3 pl-4 shadow-soft",
                "border-border border-l-2",
                toast.tone === "success" ? "border-l-success" : "border-l-danger",
              )}
            >
              <p className="flex-1 text-sm text-fg">{toast.message}</p>
              <button
                type="button"
                onClick={() => value.dismiss(toast.id)}
                aria-label="Dismiss notification"
                className="mt-0.5 text-fg-subtle transition-colors hover:text-fg"
              >
                <X className="size-4" aria-hidden />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext>
  );
}
