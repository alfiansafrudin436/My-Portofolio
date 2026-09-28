import { Prose } from "@/components/Prose";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import type { Profile } from "@/types/models";

export function AboutSection({ profile }: { profile: Profile | null }) {
  if (!profile?.bio) return null;

  return (
    <Section id="about">
      <SectionHeading eyebrow="Get to know me" title="About" />

      <Reveal>
        <div className="max-w-[68ch] text-lg">
          <Prose text={profile.bio} />
        </div>
      </Reveal>
    </Section>
  );
}
