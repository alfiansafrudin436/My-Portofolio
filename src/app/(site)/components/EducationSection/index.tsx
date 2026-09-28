import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { Timeline } from "@/app/(site)/components/Timeline";
import type { Education, TimelineItem } from "@/types/models";

function toTimelineItem(education: Education): TimelineItem {
  return {
    id: education.id,
    title: [education.degree, education.field_of_study]
      .filter(Boolean)
      .join(" — "),
    subtitle: education.institution,
    subtitleUrl: education.institution_url,
    meta: [education.location, education.grade].filter(Boolean).join(" · "),
    description: education.description,
    bullets: [],
    tags: [],
    startDate: education.start_date,
    endDate: education.end_date,
    isCurrent: education.is_current,
  };
}

export function EducationSection({ education }: { education: Education[] }) {
  if (education.length === 0) return null;

  return (
    <Section id="education">
      <SectionHeading eyebrow="Background" title="Education" />
      <Timeline items={education.map(toTimelineItem)} />
    </Section>
  );
}
