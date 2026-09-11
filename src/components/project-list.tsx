import Link from 'fumadocs-core/link';
import type * as PageTree from 'fumadocs-core/page-tree';
import { Cards } from 'fumadocs-ui/components/card';
import { getSidebarTabs, type SidebarTab } from 'fumadocs-ui/components/sidebar/tabs';
import { ArrowUpRight } from 'lucide-react';
import { source } from '@/lib/source';

// Every root folder under content/docs is a project. The card links to the page its sidebar tab
// opens; `site` and `github` in the project's meta.json add links underneath.
export function ProjectList() {
  const projects: { tab: SidebarTab; folder: PageTree.Folder }[] = [];
  getSidebarTabs(source.getPageTree(), {
    transform(tab, folder) {
      if (!tab.unlisted) projects.push({ tab, folder });
      return tab;
    },
  });

  return (
    <Cards>
      {projects.map(({ tab, folder }) => {
        const meta = source.getNodeMeta(folder)?.data;
        const links = [
          { label: 'Live site', href: meta?.site },
          { label: 'GitHub', href: meta?.github },
        ].filter((link) => link.href);

        return (
          // Same look as fumadocs' <Card>, but the title is a stretched link so the external links can sit on top.
          <div
            key={tab.url}
            className="relative rounded-xl border bg-fd-card p-4 text-fd-card-foreground transition-colors hover:bg-fd-accent/80 @max-lg:col-span-full"
          >
            <h3 className="not-prose mb-1 text-sm font-medium">
              <Link href={tab.url} className="after:absolute after:inset-0">
                {tab.title}
              </Link>
            </h3>
            {tab.description ? <p className="my-0! text-sm text-fd-muted-foreground">{tab.description}</p> : null}
            {links.length > 0 && (
              <div className="not-prose relative mt-3 flex gap-4 text-sm">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-0.5 text-fd-muted-foreground transition-colors hover:text-fd-foreground"
                  >
                    {link.label}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </Cards>
  );
}
