import { ImageZoom } from 'fumadocs-ui/components/image-zoom';

// Captioned screenshot for MDX pages — the image counterpart of VideoEmbed, with the same bordered box
// and caption. `src` is a runtime path (e.g. "/nexus/v1.0.0-beta/hero.png") served from public/, which the
// sync fills from the project's docs/public/. Plain markdown images keep working and are zoomable too.
export function ImageEmbed({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="my-8 m-0">
      {/* ImageZoom nests the image in a [data-rmiz-content] span that stays inline, so its line box adds
          a strip of background above and below the image — blockify it and drop the inherited leading. */}
      <div className="rounded-[12px] overflow-hidden border leading-none [&_[data-rmiz-content]]:block">
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
