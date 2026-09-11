# ethnjs docs

Documentation hub for ethnjs projects, built with [Fumadocs](https://fumadocs.dev) on Next.js and deployed to
[docs.ethanshih.com](https://docs.ethanshih.com) via Vercel. Each project gets its own section under
`/docs/<project>`, and each project's pages are written in that project's own repo and synced here on release.

API references are rendered with [Scalar](https://scalar.com), reading a project's live OpenAPI spec in the
browser — so they always match what the API is actually serving. NEXUS's is at `/docs/nexus/api`.

## Docs are edited at the source

**Pages under `content/docs/<project>/` are synced copies. Don't edit them here — the next release overwrites them.**
Edit the page in the project's repo instead.

| Project | Edit its docs in                                                             | Published at  |
| ------- | ---------------------------------------------------------------------------- | ------------- |
| NEXUS   | [`ethnjs/nexus`](https://github.com/ethnjs/nexus) → `docs/`                   | `/docs/nexus` |

Every docs page has a **View on GitHub** link that opens its real source file, so following that link always
lands in the right repo.

In a project's `docs/` folder:

- `*.mdx` — pages. Images sit next to the page and are linked relatively (`![Setup](./setup.png)`).
- `changelog/<tag>.mdx` — one page per release, named after the tag (`v1.0.0-beta.mdx`), with `title` and a
  `date` in its frontmatter (ISO 8601 with an offset, e.g. `2026-09-15T14:30:00-07:00`). The date orders the
  changelog, newest first.
- `public/` — videos and other static files, served from the site root as `/<project>/<file>`.

### What this repo owns

These are edited here, and the sync never touches them:

- `content/docs/index.mdx` — the landing page listing all projects.
- `content/docs/<project>/meta.json` — the section's title, sidebar order, and its live-site and GitHub links.
- `content/docs/<project>/index.mdx` — the project overview.
- `content/docs/<project>/changelog/index.mdx` — the changelog landing page.
- Everything under `src/` — the site itself.

### How the sync works

1. A release is published in the project's repo (release-please tags it, e.g. `v1.0.0-beta`).
2. That repo sends a `repository_dispatch` event of type `project-release` to this one.
3. [`.github/workflows/sync-project-docs.yml`](.github/workflows/sync-project-docs.yml) copies the project's
   `docs/` into `content/docs/<project>/` and its `docs/public/` into `public/<project>/`, mirroring deletions
   but keeping the files listed above.
4. It commits to `main`, and Vercel deploys.

The workflow can also be run by hand from the Actions tab (`repo` and `ref` inputs) to sync before a release.

## Contributing

Requires Node.js and npm.

```bash
npm install
npm run dev     # http://localhost:3000
```

Before opening a pull request:

```bash
npm run types:check
npm run lint
npm run build
```

Branch off `main`, keep commit messages in [Conventional Commits](https://www.conventionalcommits.org) style
(`feat: ...`, `fix: ...`, `docs: ...`), and open a PR. Avoid committing to `main` directly — the sync workflow
pushes there.

### Adding a project

1. Create `content/docs/<project>/meta.json` with `"root": true`, a `title`, and optional `description`, `site`,
   and `github` fields. It becomes a sidebar tab and a card on the landing page automatically.
2. Add `content/docs/<project>/index.mdx` (overview) and, if it has releases,
   `content/docs/<project>/changelog/index.mdx` rendering `<ChangelogList project="<project>" />`.
3. Allow the project's repo in `.github/workflows/sync-project-docs.yml` and add it to `syncedProjects` in
   [`src/lib/shared.ts`](src/lib/shared.ts) so its pages link back to the right repo.
4. Have that repo send a `project-release` `repository_dispatch` to `ethnjs/docs` when it releases.

## Project structure

```
.
├── .github/
│   ├── scripts/          # the sync script
│   └── workflows/        # docs sync, on a project-release dispatch or by hand
├── content/docs/         # MDX content — one folder per project, plus the landing page
│   └── nexus/            # NEXUS section: overview, meta.json, changelog/
├── public/               # videos and other static files synced from projects, as /<project>/…
└── src/
    ├── app/              # routes: docs pages, NEXUS API reference (Scalar), search, llms.txt, OG images
    ├── components/       # project list, changelog accordions, Scalar embed, providers
    └── lib/              # content source, frontmatter schemas, changelog ordering, GitHub links
```
