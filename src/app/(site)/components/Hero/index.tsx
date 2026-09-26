"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/Container";
import type { Profile } from "@/types/models";

/**
 * Accents the final word of the statement. Returns the lead separately so the
 * line can still wrap naturally instead of being broken by hand.
 */
function splitLast(text: string): [string, string] {
  const trimmed = text.trim();
  const index = trimmed.lastIndexOf(" ");
  if (index === -1) return ["", trimmed];
  return [trimmed.slice(0, index), trimmed.slice(index + 1)];
}

export function Hero({ profile }: { profile: Profile | null }) {
  const reduceMotion = useReducedMotion();

  const name = profile?.full_name ?? "Alfian Safrudin";
  const statement =
    profile?.tagline ?? "I build fast, scalable interfaces for the web.";
  const [lead, lastWord] = splitLast(statement);

  const reveal = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.45,
        delay: reduceMotion ? 0 : index * 0.09,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <Container
      as="section"
      className="flex min-h-[calc(72svh-4rem)] flex-col justify-center py-16"
    >
      <h1>
        {/* The name is the title; the tagline below is the subtitle. They are
            separated three ways — size, weight and colour — so the hierarchy
            survives even at phone width where the size gap narrows. */}
        <motion.span
          custom={0}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="block text-display font-medium text-balance"
        >
          {name}
        </motion.span>

        <motion.span
          custom={1}
          variants={reveal}
          initial="hidden"
          animate="visible"
          className="mt-4 block max-w-[34ch] text-xl font-normal text-fg-muted text-balance"
        >
          {lead}{" "}
          <span className="text-accent">{lastWord}</span>
        </motion.span>
      </h1>

      <motion.div
        custom={2}
        variants={reveal}
        initial="hidden"
        animate="visible"
        className="mt-12 grid gap-8 border-t border-border pt-6 md:grid-cols-12"
      >
        <div className="space-y-2 md:col-span-4">
          <p className="label text-fg">{profile?.headline ?? "Frontend Engineer"}</p>
          {profile?.location && (
            <p className="label text-fg-muted">{profile.location}</p>
          )}
          {profile?.available && (
            <p className="label flex items-center gap-2 text-fg-muted">
              <span
                className="inline-block size-1.5 rounded-full bg-success"
                aria-hidden
              />
              {profile.available_note ?? "Available for new opportunities"}
            </p>
          )}
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {profile?.bio && (
            <p className="max-w-[46ch] text-base text-fg-muted text-pretty">
              {profile.bio.split(/\n{2,}/)[0]}
            </p>
          )}
          <p className="label mt-8 flex items-center gap-2 text-fg-subtle">
            Scroll
            <ArrowDown className="size-3" aria-hidden />
          </p>
        </div>
      </motion.div>
    </Container>
  );
}
