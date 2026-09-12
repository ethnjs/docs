import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ImageEmbed } from './image-embed';
import { ProjectList } from './project-list';
import { ReleaseNotesList } from './release-notes-list';
import { VideoEmbed } from './video-embed';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ImageEmbed,
    ProjectList,
    ReleaseNotesList,
    VideoEmbed,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
