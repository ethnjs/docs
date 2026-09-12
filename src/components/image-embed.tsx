import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

// Captioned screenshot for MDX pages — the image counterpart of VideoEmbed, with the same bordered box
// and caption. `src` is a runtime path (e.g. "/nexus/v1.0.0-beta/hero.png") served from public/, which the
// sync fills from the project's docs/public/. Plain markdown images keep working and are zoomable too.
export function ImageEmbed({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="my-8 m-0">
      {/* ImageZoom wraps its child in an inline <span data-rmiz>, so make that wrapper block-level. */}
      <div className="rounded-[12px] overflow-hidden border [&>[data-rmiz]]:block">
        {/* A runtime path carries no width/height, which next/image requires — so render a plain <img>
            as ImageZoom's child (it zooms whatever it is given) rather than letting it use next/image. */}
        <ImageZoom src={src}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt ?? caption ?? ''} className="block w-full h-auto" />
        </ImageZoom>
      </div>
      {caption && <figcaption className="mt-2 text-center text-xs text-fd-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
