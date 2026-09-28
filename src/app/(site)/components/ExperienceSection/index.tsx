import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/app/(site)/components/Timeline";
import { EMPLOYMENT_TYPE_LABELS } from "@/lib/constants";
import { formatDuration, yearsOfExperience } from "@/lib/utils/stats";
import type { Experience, TimelineItem } from "@/types/models";

function toTimelineItem(experience: Experience): TimelineItem {
  return {
    id: experience.id,
    title: experience.position,
    subtitle: experience.company,
    subtitleUrl: experience.company_url,
    meta: [
      EMPLOYMENT_TYPE_LABELS[experience.employment_type],
      experience.location,
    ]
      .filter(Boolean)
      .join(" · "),
    description: experience.description,
    bullets: experience.highlights,
    tags: experience.tech_stack,
    startDate: experience.start_date,
    endDate: experience.end_date,
    isCurrent: experience.is_current,
    duration: formatDuration(
      experience.start_date,
      experience.end_date,
      experience.is_current,
    ),
  };
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (experiences.length === 0) return null;

  const years = yearsOfExperience(experiences);
  const companies = new Set(experiences.map((e) => e.company.toLowerCase())).size;

  return (
    <Section id="experience">
      <SectionHeading
        eyebrow="Track record"
        title="Experience"
        description={
          years > 0
            ? `${years}+ years building products across ${companies} ${companies === 1 ? "company" : "companies"}.`
            : undefined
        }
      />
      <Timeline items={experiences.map(toTimelineItem)} />
    </Section>
  );
}
