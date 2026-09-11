import { llms, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { docsContentRoute, docsImageRoute, docsRoute } from './shared';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';
import { compareDatesDesc } from './changelog';

const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema.extend({
      // ISO 8601 with UTC offset, e.g. 2026-09-15T14:30:00-07:00 — orders changelog entries
      date: z.iso.datetime({ offset: true }).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema.extend({
      // Project links shown on the landing page (set in a project's root meta.json)
      site: z.url().optional(),
      github: z.url().optional(),
    }),
  },
});

// See https://fumadocs.dev/docs/headless/source-api for more info
export const source = loader({
  baseUrl: docsRoute,
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  pageTree: {
    transformers: [
      {
        // Order every project's changelog/ by `date`, newest first — a static meta.json would need editing each release.
        folder(node, folderPath) {
          if (!/(^|\/)changelog$/.test(folderPath)) return node;
          const dateOf = (child: (typeof node.children)[number]) => {
            if (child.type !== 'page' || !child.$ref) return undefined;
            const file = this.storage.read(child.$ref);
            return file?.format === 'page' ? file.data.date : undefined;
          };
          node.children.sort((a, b) => compareDatesDesc(dateOf(a), dateOf(b)));
          return node;
        },
      },
    ],
  },
});

export const docsLlms = llms(source, {
  renderPage: async (page) => `# ${page.data.title} (${page.url})

${await page.data.getText('processed')}`,
});
