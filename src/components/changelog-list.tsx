import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import type { ComponentProps } from 'react';
import { compareDatesDesc, formatChangelogDate } from '@/lib/changelog';
import { source } from '@/lib/source';
import { getMDXComponents } from './mdx';

// Releases repeat the same headings ("## Fixes"), so inside the list render them without anchor ids.
const plainHeadings = {
  h1: (props: ComponentProps<'h1'>) => <h1 {...props} id={undefined} />,
  h2: (props: ComponentProps<'h2'>) => <h2 {...props} id={undefined} />,
  h3: (props: ComponentProps<'h3'>) => <h3 {...props} id={undefined} />,
  h4: (props: ComponentProps<'h4'>) => <h4 {...props} id={undefined} />,
  h5: (props: ComponentProps<'h5'>) => <h5 {...props} id={undefined} />,
  h6: (props: ComponentProps<'h6'>) => <h6 {...props} id={undefined} />,
};

// Latest releases from content/docs/<project>/changelog/, newest first by `date`. Each release is an
// accordion holding its full page; the newest starts open and only one is open at a time.
export function ChangelogList({ project, limit = 15 }: { project: string; limit?: number }) {
  const entries = source
    .getPages()
    .filter((page) => page.slugs.length === 3 && page.slugs[0] === project && page.slugs[1] === 'changelog')
    .sort((a, b) => compareDatesDesc(a.data.date, b.data.date))
    .slice(0, limit);

  if (entries.length === 0) return <p>No releases yet.</p>;

  return (
    <Accordions multiple={false} defaultValue={[entries[0].url]}>
      {entries.map((entry) => {
        const Body = entry.data.body;
        return (
          <Accordion
            key={entry.url}
            value={entry.url}
            title={
              <span className="flex flex-1 items-baseline justify-between gap-4">
                <span>{entry.data.title}</span>
                {entry.data.date && (
                  <time dateTime={entry.data.date} className="text-sm font-normal text-fd-muted-foreground">
                    {formatChangelogDate(entry.data.date)}
                  </time>
                )}
              </span>
            }
          >
            <Body components={getMDXComponents({ ...plainHeadings, a: createRelativeLink(source, entry) })} />
          </Accordion>
        );
      })}
    </Accordions>
  );
}
