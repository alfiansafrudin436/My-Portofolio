import { Link } from "@/components/Link";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/Badge";
import { formatYearRange } from "@/lib/utils/date";
import type { TimelineItem } from "@/types/models";

/** A vertical rail with one card per entry; the current role is highlighted. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="relative space-y-6 border-l border-border pl-6 md:pl-10">
      {items.map((item) => (
        <li key={item.id} className="relative">
          <span
            className={
              "absolute top-7 -left-[1.9rem] size-3 rounded-full border-2 border-bg md:-left-[2.9rem] " +
              (item.isCurrent ? "bg-accent" : "bg-fg-subtle")
            }
            aria-hidden
          />
          <Reveal>
            <article className="rounded-lg border border-border bg-surface p-6 shadow-soft">
              <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                <div>
                  <h3 className="text-xl font-semibold text-fg">{item.title}</h3>
                  <p className="mt-1 flex flex-wrap items-center gap-x-2 text-fg-muted">
                    {item.subtitleUrl ? (
                      <Link href={item.subtitleUrl}>{item.subtitle}</Link>
                    ) : (
                      <span className="font-medium text-fg">{item.subtitle}</span>
                    )}
                    {item.meta && (
                      <>
                        <span className="text-fg-subtle" aria-hidden>
                          ·
                        </span>
                        <span className="text-sm">{item.meta}</span>
                      </>
                    )}
                  </p>
                </div>
                <div className="flex flex-col items-start gap-1 md:items-end">
                  <p className="text-sm font-medium text-fg-muted">
                    {formatYearRange(item.startDate, item.endDate, item.isCurrent)}
                  </p>
                  {item.duration && (
                    <p className="text-xs text-fg-subtle">{item.duration}</p>
                  )}
                  {item.isCurrent && <Badge tone="success">Current</Badge>}
                </div>
              </header>

              {item.description && (
                <p className="mt-4 max-w-[68ch] text-fg-muted text-pretty">
                  {item.description}
                </p>
              )}

              {item.bullets.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-3 text-fg-muted">
                      <span
                        className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span className="max-w-[68ch]">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {item.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} tone="muted">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
