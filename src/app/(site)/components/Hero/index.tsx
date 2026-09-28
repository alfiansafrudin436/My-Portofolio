"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownToLine, ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import type { Profile } from "@/types/models";

/** Accents the final word of the statement without hand-breaking the line. */
function splitLast(text: string): [string, string] {
  const trimmed = text.trim();
  const index = trimmed.lastIndexOf(" ");
  if (index === -1) return ["", trimmed];
  return [trimmed.slice(0, index), trimmed.slice(index + 1)];
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
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
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.09,
        ease: "easeOut" as const,
      },
    }),
  };
  const anim = { variants: reveal, initial: "hidden", animate: "visible" } as const;

  return (
    <Container as="section" className="pt-12 pb-10 md:pt-20 md:pb-14">
      <div className="grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <motion.div custom={0} {...anim} className="flex flex-wrap items-center gap-3">
            {profile?.available && (
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-fg">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-success" />
                </span>
                {profile.available_note ?? "Available for new opportunities"}
              </span>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-1.5 text-xs text-fg-muted">
                <MapPin className="size-3.5" aria-hidden />
                {profile.location}
              </span>
            )}
          </motion.div>

          <h1 className="mt-6">
            <motion.span
              custom={1}
              {...anim}
              className="block text-xl font-medium text-fg-muted text-balance"
            >
              {name}
              <span className="text-fg-subtle"> · </span>
              <span className="text-fg">
                {profile?.headline ?? "Frontend Engineer"}
              </span>
            </motion.span>
            <motion.span
              custom={2}
              {...anim}
              className="mt-4 block text-display font-semibold text-fg text-balance"
            >
              {lead} <span className="text-accent">{lastWord}</span>
            </motion.span>
          </h1>

          {profile?.bio && (
            <motion.p
              custom={3}
              {...anim}
              className="mt-6 max-w-[54ch] text-lg text-fg-muted text-pretty"
            >
              {profile.bio.split(/\n{2,}/)[0]}
            </motion.p>
          )}

          <motion.div custom={4} {...anim} className="mt-8 flex flex-wrap gap-3">
            <a href="#contact" className={buttonClasses("accent", "lg")}>
              Hire me
              <ArrowRight className="size-4" aria-hidden />
            </a>
            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noreferrer noopener"
                className={buttonClasses("outline", "lg")}
              >
                <ArrowDownToLine className="size-4" aria-hidden />
                Download CV
              </a>
            )}
            <a href="#work" className={buttonClasses("ghost", "lg")}>
              View projects
            </a>
          </motion.div>
        </div>

        <motion.div
          custom={2}
          {...anim}
          className="order-first md:order-none md:col-span-4 md:col-start-9"
        >
          <div className="relative mx-auto aspect-4/5 w-40 overflow-hidden rounded-xl border border-border bg-bg-subtle shadow-soft md:w-full">
            {profile?.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={name}
                fill
                priority
                sizes="(max-width: 768px) 160px, 33vw"
                className="object-cover"
              />
            ) : (
              <span className="grid size-full place-items-center text-5xl font-semibold text-fg-subtle">
                {initials(name)}
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
