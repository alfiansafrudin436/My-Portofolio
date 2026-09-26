"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useProjectGallery } from "@/app/(site)/projects/[slug]/components/ProjectGallery/hooks";

export function ProjectGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const { index, isOpen, open, close, next, prev } = useProjectGallery(
    images.length,
  );

  if (images.length === 0) return null;

  return (
    <>
      <div className="mt-12 grid gap-4 sm:grid-cols-2">
        {images.map((url, position) => (
          <button
            key={url}
            type="button"
            onClick={() => open(position)}
            aria-label={`View image ${position + 1} of ${images.length}`}
            className="relative aspect-4/3 overflow-hidden border border-border transition-colors hover:border-border-strong"
          >
            <Image
              src={url}
              alt={`${title} — image ${position + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {isOpen && index !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} gallery`}
            className="fixed inset-0 z-100 flex items-center justify-center bg-bg/95 p-4"
            onClick={close}
          >
            <div
              className="relative h-full max-h-[80vh] w-full max-w-5xl"
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                src={images[index]}
                alt={`${title} — image ${index + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute top-4 right-4 grid size-10 place-items-center border border-border text-fg transition-colors hover:border-border-strong"
            >
              <X className="size-4" aria-hidden />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 grid size-10 place-items-center border border-border text-fg transition-colors hover:border-border-strong"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    next();
                  }}
                  aria-label="Next image"
                  className="absolute right-4 grid size-10 place-items-center border border-border text-fg transition-colors hover:border-border-strong"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
