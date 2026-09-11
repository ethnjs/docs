#!/usr/bin/env bash
# Mirror a project's docs/ folder into this site.
# Usage: sync-project-docs.sh <source-docs-dir> <project-name>
set -euo pipefail

src="${1%/}"
name="$2"
dest="content/docs/$name"
assets="public/$name"

if [ ! -d "$src" ]; then
  echo "::error::No docs folder in the source repo" >&2
  exit 1
fi

# Pages: mirror deletions, but never copy public/ or .gitkeep, and never touch the files this
# repo owns (every meta.json, the project overview, and the changelog landing page). Excluded
# paths are also protected from --delete, as long as --delete-excluded isn't passed.
mkdir -p "$dest"
rsync -a --delete \
  --exclude='/public/' \
  --exclude='.gitkeep' \
  --exclude='meta.json' \
  --exclude='/index.mdx' \
  --exclude='/changelog/index.mdx' \
  "$src/" "$dest/"

# Videos: served from the site root as /<name>/<file>. The whole folder belongs to the source.
if [ -d "$src/public" ]; then
  mkdir -p "$assets"
  rsync -a --delete --exclude='.gitkeep' "$src/public/" "$assets/"
else
  rm -rf "$assets"
fi
