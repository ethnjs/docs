import Link from 'fumadocs-core/link';
import { Accordions } from 'fumadocs-ui/components/accordion';
import { AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from 'fumadocs-ui/components/ui/accordion';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { SquareArrowOutUpRight } from 'lucide-react';
import type { ComponentProps } from 'react';
import { compareDatesDesc, formatReleaseDate } from '@/lib/release-notes';
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

// Latest releases from content/docs/<project>/release-notes/, newest first by `date`. Each release is an
// accordion holding its full page; the newest starts open and only one is open at a time.
//
// Built from the accordion primitives rather than fumadocs' <Accordion>, which renders only its own
// copy-link button beside the trigger — this needs a link to the release's page in that same slot.
export function ReleaseNotesList({ project, limit = 15 }: { project: string; limit?: number }) {
  const entries = source
    .getPages()
    .filter((page) => page.slugs.length === 3 && page.slugs[0] === project && page.slugs[1] === 'release-notes')
    .sort((a, b) => compareDatesDesc(a.data.date, b.data.date))
    .slice(0, limit);

  if (entries.length === 0) return <p>No releases yet.</p>;

  return (
    <Accordions multiple={false} defaultValue={[entries[0].url]}>
      {entries.map((entry) => {
        const Body = entry.data.body;
        return (
          <AccordionItem key={entry.url} value={entry.url}>
            <AccordionHeader data-accordion-value={entry.url}>
              <AccordionTrigger>
                <span className="flex flex-1 items-baseline justify-between gap-4">
                  <span>{entry.data.title}</span>
                  {entry.data.date && (
                    <time dateTime={entry.data.date} className="text-sm font-normal text-fd-muted-foreground">
                      {formatReleaseDate(entry.data.date)}
                    </time>
                  )}
                </span>
              </AccordionTrigger>
              {/* Sibling of the trigger, never inside it: a link nested in a button is invalid markup. */}
              <Link
                href={entry.url}
                aria-label={`Open the ${entry.data.title} release page`}
                title="Open release page"
                className={buttonVariants({ color: 'secondary', size: 'icon-sm', className: 'not-prose me-2 shrink-0' })}
              >
                <SquareArrowOutUpRight className="size-3.5" />
              </Link>
            </AccordionHeader>
            <AccordionContent hiddenUntilFound>
              <div className="px-4 pb-2 text-[0.9375rem] prose-no-margin [&[hidden]:not([hidden='until-found'])]:hidden">
                <Body components={getMDXComponents({ ...plainHeadings, a: createRelativeLink(source, entry) })} />
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordions>
  );
}
