import { Section } from "@/components/Section";
import { SectionHeading } from "@/components/SectionHeading";
import { groupSkillsByCategory } from "@/lib/utils/skills";
import type { Skill } from "@/types/models";

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  const groups = groupSkillsByCategory(skills);

  return (
    <Section id="capabilities">
      <SectionHeading index="03" title="Capabilities" />

      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((group) => (
          <div key={group.category}>
            <h3 className="label border-b border-border-strong pb-2 text-fg">
              {group.label}
            </h3>
            <ul>
              {group.skills.map((skill) => (
                <li
                  key={skill.id}
                  className="border-b border-border py-2.5 text-sm text-fg"
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
