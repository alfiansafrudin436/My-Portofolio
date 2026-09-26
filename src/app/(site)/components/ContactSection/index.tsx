"use client";

import { Check, Copy } from "lucide-react";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import { useContactSection } from "@/app/(site)/components/ContactSection/hooks";
import type { SocialLink } from "@/types/models";

export function ContactSection({
  email,
  socialLinks,
}: {
  email: string | null;
  socialLinks: SocialLink[];
}) {
  const { copied, canCopy, copyEmail } = useContactSection(email);

  return (
    <Section id="contact">
      <SectionHeading index="06" title="Contact" />

      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          {email ? (
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${email}`}
                className="text-3xl font-medium break-all text-fg underline decoration-transparent underline-offset-8 transition-colors hover:text-accent hover:decoration-accent md:text-4xl"
              >
                {email}
              </a>
              {canCopy && (
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="label inline-flex items-center gap-2 border border-border px-3 py-2 text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                >
                  {copied ? (
                    <Check className="size-3.5 text-success" aria-hidden />
                  ) : (
                    <Copy className="size-3.5" aria-hidden />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              )}
            </div>
          ) : (
            <p className="text-2xl text-fg-muted">
              Reach out through any of the links.
            </p>
          )}

          <p className="mt-6 max-w-[52ch] text-lg text-fg-muted text-pretty">
            Always open to new opportunities, creative projects, and
            collaboration.
          </p>
        </div>

        <ul className="space-y-0 md:col-span-4">
          {socialLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer noopener"
                className="group flex items-center justify-between gap-4 border-t border-border py-4 text-fg transition-colors last:border-b hover:text-accent"
              >
                <span className="label">{link.label}</span>
                <SocialIcon
                  name={link.icon}
                  className="size-4 transition-transform group-hover:-translate-y-0.5"
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
