// Changelog entries are ordered by their `date` frontmatter (ISO 8601 with offset), newest first.
// Entries without a usable date sort last; ties keep their existing order.

function toTime(date: string | undefined): number {
  const time = date ? Date.parse(date) : Number.NaN;
  return Number.isNaN(time) ? -Infinity : time;
}

export function compareDatesDesc(a: string | undefined, b: string | undefined): number {
  const ta = toTime(a);
  const tb = toTime(b);
  if (ta === tb) return 0;
  return tb > ta ? 1 : -1;
}

/** Calendar date as written in the frontmatter (the release's own local day), e.g. "September 15, 2026". */
export function formatChangelogDate(date: string): string {
  return new Date(`${date.slice(0, 10)}T00:00:00Z`).toLocaleDateString('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  });
}
