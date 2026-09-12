import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ProjectList } from './project-list';
import { ReleaseNotesList } from './release-notes-list';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ProjectList,
    ReleaseNotesList,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
