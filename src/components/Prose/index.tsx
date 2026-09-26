import { cn } from "@/lib/utils/cn";

/**
 * Typographic scope for long-form text. Hand-rolled rather than
 * @tailwindcss/typography, whose defaults fight this token set.
 *
 * Paragraph breaks are plain blank lines — the master-data forms take plain
 * text, not markdown, so nothing here needs to parse.
 */
export function Prose({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className={cn("space-y-5 text-lg text-fg-muted text-pretty", className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}
