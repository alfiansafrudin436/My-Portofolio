const MONTH_YEAR: Intl.DateTimeFormatOptions = {
  month: "short",
  year: "numeric",
};

/** Postgres `date` columns arrive as "YYYY-MM-DD"; parse them as local time. */
function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function formatMonthYear(value: string): string {
  return parseDate(value).toLocaleDateString("en-US", MONTH_YEAR);
}

/** "Jan 2022 — Present" */
export function formatDateRange(
  start: string,
  end: string | null,
  isCurrent = false,
): string {
  const from = formatMonthYear(start);
  if (isCurrent || !end) return `${from} — Present`;
  return `${from} — ${formatMonthYear(end)}`;
}

export function formatYearRange(
  start: string,
  end: string | null,
  isCurrent = false,
): string {
  const from = parseDate(start).getFullYear();
  if (isCurrent || !end) return `${from} — Now`;
  const to = parseDate(end).getFullYear();
  return from === to ? String(from) : `${from} — ${to}`;
}
