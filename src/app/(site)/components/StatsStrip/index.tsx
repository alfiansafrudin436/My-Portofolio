import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import type { ProfileStats } from "@/lib/utils/stats";

export function StatsStrip({ stats }: { stats: ProfileStats }) {
  const items = [
    { value: stats.years > 0 ? `${stats.years}+` : null, label: "Years of experience" },
    { value: stats.projects || null, label: "Projects shipped" },
    { value: stats.technologies || null, label: "Technologies" },
    { value: stats.companies || null, label: "Companies" },
  ].filter((item) => item.value !== null);

  if (items.length === 0) return null;

  return (
    <Container className="pb-14 md:pb-20">
      <Reveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border shadow-soft md:grid-cols-4">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col-reverse bg-surface px-6 py-5">
              <dt className="text-sm text-fg-muted">{item.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-fg">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Container>
  );
}
