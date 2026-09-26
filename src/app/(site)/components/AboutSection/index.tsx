import Image from "next/image";
import { Prose } from "@/components/Prose";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import type { Profile } from "@/types/models";

export function AboutSection({ profile }: { profile: Profile | null }) {
  if (!profile?.bio) return null;

  return (
    <Section id="about">
      <SectionHeading index="02" title="About" />

      <div className="grid gap-10 md:grid-cols-12">
        {profile.avatar_url && (
          <div className="relative aspect-4/5 md:col-span-4">
            <Image
              src={profile.avatar_url}
              alt={profile.full_name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="border border-border object-cover"
            />
          </div>
        )}

        <div
          className={
            profile.avatar_url
              ? "md:col-span-7 md:col-start-6"
              : "md:col-span-8 md:col-start-4"
          }
        >
          <Prose text={profile.bio} />

          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noreferrer noopener"
              className="label mt-8 inline-flex border border-border-strong px-5 py-3 text-fg transition-colors hover:bg-fg hover:text-bg"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </Section>
  );
}
