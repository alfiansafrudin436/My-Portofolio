"use client";

import { ArrowDownToLine, Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { buttonClasses } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialIcon } from "@/components/SocialIcon";
import { useContactSection } from "@/app/(site)/components/ContactSection/hooks";
import type { Profile, SocialLink } from "@/types/models";

export function ContactSection({
  profile,
  socialLinks,
}: {
  profile: Profile | null;
  socialLinks: SocialLink[];
}) {
  const email = profile?.email ?? null;
  const { copied, canCopy, copyEmail } = useContactSection(email);

  return (
    <Section id="contact">
      <SectionHeading eyebrow="Let's talk" title="Let's work together" />

      <Reveal>
        <div className="rounded-xl border border-border bg-bg-subtle p-8 md:p-12">
          <p className="max-w-[52ch] text-xl text-fg text-pretty">
            {profile?.available
              ? (profile.available_note ??
                "I'm open to new opportunities, and I'd love to hear what you're building.")
              : "Have a project or role in mind? Send me a message."}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {email && (
              <a href={`mailto:${email}`} className={buttonClasses("accent", "lg")}>
                <Mail className="size-4" aria-hidden />
                {email}
              </a>
            )}
            {email && canCopy && (
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address"
                className={buttonClasses("outline", "lg")}
              >
                {copied ? (
                  <Check className="size-4 text-success" aria-hidden />
                ) : (
                  <Copy className="size-4" aria-hidden />
                )}
                {copied ? "Copied" : "Copy"}
              </button>
            )}
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
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-fg-muted">
            {profile?.phone && (
              <a
                href={`tel:${profile.phone.replace(/\s+/g, "")}`}
                className="inline-flex items-center gap-2 hover:text-accent"
              >
                <Phone className="size-4" aria-hidden />
                {profile.phone}
              </a>
            )}
            {profile?.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="size-4" aria-hidden />
                {profile.location}
              </span>
            )}
          </div>

          {socialLinks.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-3 border-t border-border pt-8">
              {socialLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    <SocialIcon name={link.icon} className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
