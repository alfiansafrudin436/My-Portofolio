import { Link } from "@/components/Link";
import { formatYearRange } from "@/lib/utils/date";
import type { TimelineItem } from "@/types/models";

/**
 * A left rail of years with the entry to its right, one hairline per row —
 * rather than a dotted vertical timeline.
 */
export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="border-b border-border">
      {items.map((item) => (
        <article
          key={item.id}
          className="grid gap-4 border-t border-border py-8 md:grid-cols-12"
        >
          <p className="label text-fg-subtle md:col-span-3">
            {formatYearRange(item.startDate, item.endDate, item.isCurrent)}
          </p>

          <div className="md:col-span-9">
            <h3 className="text-xl font-medium text-fg">{item.title}</h3>

            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-fg-muted">
              {item.subtitleUrl ? (
                <Link href={item.subtitleUrl}>{item.subtitle}</Link>
              ) : (
                <span>{item.subtitle}</span>
              )}
              {item.meta && (
                <>
                  <span className="text-fg-subtle" aria-hidden>
                    ·
                  </span>
                  <span>{item.meta}</span>
                </>
              )}
            </p>

            {item.description && (
              <p className="mt-4 max-w-[68ch] text-sm text-fg-muted text-pretty">
                {item.description}
              </p>
            )}

            {item.bullets.length > 0 && (
              <ul className="mt-4 space-y-1.5">
                {item.bullets.map((bullet, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-sm text-fg-muted"
                  >
                    <span className="mt-2 size-1 shrink-0 bg-accent" aria-hidden />
                    <span className="max-w-[68ch]">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {item.tags.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="label text-fg-subtle">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
