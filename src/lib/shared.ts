import { createGetUrl } from 'fumadocs-core/source';

export const appName = 'ethnjs docs';
export const docsRoute = '/docs';
export const docsImageRoute = '/og/docs';
export const docsContentRoute = '/llms.mdx/docs';

export const gitConfig = {
  user: 'ethnjs',
  repo: 'docs',
  branch: 'main',
};

// Projects whose pages are synced in from their own repo by .github/workflows/sync-project-docs.yml.
// Those pages are edited at the source, so "View on GitHub" has to point there, not at the copy here.
const syncedProjects: Record<string, { repo: string; branch: string; docsPath: string }> = {
  nexus: { repo: 'ethnjs/nexus', branch: 'main', docsPath: 'docs' },
};

// Files inside a project folder that this repo owns and the sync never overwrites — keep in step with
// the excludes in .github/scripts/sync-project-docs.sh.
const ownedProjectFiles = new Set(['index.mdx', 'changelog/index.mdx']);

/** GitHub URL of a page's real source file. `pagePath` is relative to `content/docs`. */
export function getPageGitHubUrl(pagePath: string): string {
  const [project, ...rest] = pagePath.split('/');
  const relativePath = rest.join('/');
  const synced = syncedProjects[project];

  if (synced && !ownedProjectFiles.has(relativePath)) {
    return `https://github.com/${synced.repo}/blob/${synced.branch}/${synced.docsPath}/${relativePath}`;
  }

  return `https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/content/docs/${pagePath}`;
}

const getContentUrl = createGetUrl(docsContentRoute);

export function getPageMarkdownUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'content.md'];

  return { segments, url: getContentUrl(segments, page.locale) };
}

const getImageUrl = createGetUrl(docsImageRoute);

export function getPageImageUrl(page: { slugs: string[]; locale?: string }) {
  const segments = [...page.slugs, 'image.png'];

  return { segments, url: getImageUrl(segments, page.locale) };
}
