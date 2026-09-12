// Captioned screenshot for MDX pages — the image counterpart of VideoEmbed, with the same bordered box
// and caption. `src` is a runtime path (e.g. "/nexus/v1.0.0-beta/hero.png") served from public/, which the
// sync fills from the project's docs/public/.
export function ImageEmbed({ src, alt, caption }: { src: string; alt?: string; caption?: string }) {
  return (
    <figure className="not-prose my-8">
      <div className="rounded-[12px] overflow-hidden border leading-none">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? caption ?? ''} className="block w-full h-auto" />
      </div>
      {caption && <figcaption className="mt-2 text-center text-xs text-fd-muted-foreground">{caption}</figcaption>}
    </figure>
  );
}
