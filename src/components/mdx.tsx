import { ImageZoom, type ImageZoomProps } from 'fumadocs-ui/components/image-zoom';
import 'fumadocs-ui/components/image-zoom2.css';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import type { ComponentProps } from 'react';
import { ImageEmbed } from './image-embed';
import { ProjectList } from './project-list';
import { ReleaseNotesList } from './release-notes-list';
import { VideoEmbed } from './video-embed';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Markdown images become click-to-zoom. remark-image runs with useImport, so `src` arrives as a static
    // import object rather than a string — pass it through untouched (React types an img src as
    // string | Blob; next/image and ImageZoom want string | StaticImport, hence the cast).
    img: ({ src, ...props }: ComponentProps<'img'>) => <ImageZoom {...props} src={src as ImageZoomProps['src']} />,
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
