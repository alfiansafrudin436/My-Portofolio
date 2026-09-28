import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { PROFICIENCY_LABELS } from "@/lib/constants";
import { groupSkillsByCategory } from "@/lib/utils/skills";
import type { Proficiency, Skill } from "@/types/models";

const LEVEL_DOTS: Record<Proficiency, number> = {
  beginner: 1,
  intermediate: 2,
  advanced: 3,
  expert: 4,
};

function LevelDots({ level }: { level: Proficiency }) {
  const filled = LEVEL_DOTS[level];
  return (
    <span
      className="inline-flex gap-0.5"
      role="img"
      aria-label={PROFICIENCY_LABELS[level]}
      title={PROFICIENCY_LABELS[level]}
    >
      {[1, 2, 3, 4].map((dot) => (
        <span
          key={dot}
          className={
            "size-1.5 rounded-full " + (dot <= filled ? "bg-accent" : "bg-border")
          }
        />
      ))}
    </span>
  );
}

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  const core = skills.filter((skill) => skill.is_featured);
  const groups = groupSkillsByCategory(skills);

  return (
    <Section id="capabilities">
      <SectionHeading
        eyebrow="Toolbox"
        title="Skills"
        description="What I reach for day to day, grouped by area."
      />

      {core.length > 0 && (
        <Reveal className="mb-12">
          <h3 className="mb-4 text-sm font-medium text-fg-muted">Core stack</h3>
          <ul className="flex flex-wrap gap-3">
            {core.map((skill) => (
              <li
                key={skill.id}
                className="inline-flex items-center gap-3 rounded-lg border border-accent/30 bg-accent-subtle px-4 py-2.5 text-fg"
              >
                <span className="font-medium">{skill.name}</span>
                {skill.years ? (
                  <span className="text-xs text-fg-muted">{skill.years} yrs</span>
                ) : null}
              </li>
            ))}
          </ul>
        </Reveal>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group, index) => (
          <Reveal key={group.category} delay={index * 0.05}>
            <div className="h-full rounded-lg border border-border bg-surface p-5">
              <h3 className="mb-3 text-sm font-semibold text-fg">{group.label}</h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill.id}
                    className="flex items-center justify-between gap-3 text-sm text-fg-muted"
                  >
                    <span>{skill.name}</span>
                    {skill.level && <LevelDots level={skill.level} />}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
