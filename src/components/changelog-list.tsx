import Link from 'fumadocs-core/link';
import { compareDatesDesc, formatChangelogDate } from '@/lib/changelog';
import { source } from '@/lib/source';

// Latest releases from content/docs/<project>/changelog/, newest first by `date`.
export function ChangelogList({ project, limit = 15 }: { project: string; limit?: number }) {
  const entries = source
    .getPages()
    .filter((page) => page.slugs.length === 3 && page.slugs[0] === project && page.slugs[1] === 'changelog')
    .sort((a, b) => compareDatesDesc(a.data.date, b.data.date))
    .slice(0, limit);

  if (entries.length === 0) return <p>No releases yet.</p>;

  return (
    <ul>
      {entries.map((entry) => (
        <li key={entry.url}>
          <Link href={entry.url}>{entry.data.title}</Link>
          {entry.data.date && (
            <>
              {' — '}
              <time dateTime={entry.data.date}>{formatChangelogDate(entry.data.date)}</time>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
