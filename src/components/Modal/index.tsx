"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useId } from "react";
import { useModalBehaviour } from "@/components/Modal/hooks";
import { cn } from "@/lib/utils/cn";

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  size = "md",
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}) {
  const titleId = useId();
  const { panelRef } = useModalBehaviour(isOpen, onClose);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-100 flex items-start justify-center overflow-y-auto bg-fg/20 p-4 backdrop-blur-[2px] sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "my-auto w-full border border-border bg-surface",
              size === "sm" && "max-w-md",
              size === "md" && "max-w-2xl",
              size === "lg" && "max-w-4xl",
            )}
          >
            <div className="flex items-start justify-between gap-6 border-b border-border px-6 py-5">
              <div>
                <h2 id={titleId} className="text-xl font-medium text-fg">
                  {title}
                </h2>
                {description && (
                  <p className="mt-1 text-sm text-fg-muted">{description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="-mt-1 -mr-1 grid size-8 shrink-0 place-items-center text-fg-subtle transition-colors hover:text-fg"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
            <div className="px-6 py-6">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
