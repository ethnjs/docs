import { ImageZoom } from 'fumadocs-ui/components/image-zoom';
import 'fumadocs-ui/components/image-zoom2.css';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { ProjectList } from './project-list';
import { ReleaseNotesList } from './release-notes-list';
import { VideoEmbed } from './video-embed';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Screenshots (already handled by remark-image) become click-to-zoom. React types an img `src` as
    // string | Blob, while fumadocs' ImageProps takes string | StaticImport — MDX only ever gives a string.
    img: ({ src, ...props }: ComponentProps<'img'>) => (
      <ImageZoom {...props} src={typeof src === 'string' ? src : undefined} />
    ),
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
