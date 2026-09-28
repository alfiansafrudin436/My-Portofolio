import type { Experience, Project, Skill } from "@/types/models";

export type ProfileStats = {
  years: number;
  projects: number;
  technologies: number;
  companies: number;
};

function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

function monthsBetween(from: Date, to: Date): number {
  return Math.max(
    0,
    (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()),
  );
}

/** "2 yrs 3 mos" — compact tenure label for a timeline entry. */
export function formatDuration(
  start: string,
  end: string | null,
  isCurrent = false,
): string {
  const to = isCurrent || !end ? new Date() : parseDate(end);
  const total = monthsBetween(parseDate(start), to) + 1;
  const years = Math.floor(total / 12);
  const months = total % 12;
  const parts: string[] = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

/** Whole years from the earliest start date to now (rounded down, min 0). */
export function yearsOfExperience(experiences: Experience[]): number {
  if (experiences.length === 0) return 0;
  const earliest = experiences
    .map((experience) => parseDate(experience.start_date))
    .reduce((a, b) => (a < b ? a : b));
  return Math.floor(monthsBetween(earliest, new Date()) / 12);
}

export function computeStats(
  experiences: Experience[],
  projects: Project[],
  skills: Skill[],
): ProfileStats {
  const technologies = new Set<string>();
  skills.forEach((skill) => technologies.add(skill.name.toLowerCase()));
  projects.forEach((project) =>
    project.tech_stack.forEach((tech) => technologies.add(tech.toLowerCase())),
  );

  return {
    years: yearsOfExperience(experiences),
    projects: projects.length,
    technologies: technologies.size,
    companies: new Set(experiences.map((e) => e.company.toLowerCase())).size,
  };
}
