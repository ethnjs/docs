'use client';

// Video for MDX pages — fumadocs ships no video component. Mirrors ethnjs/portfolio's VideoEmbed
// (which splits base/wrapper across two files; the context-menu handler needs a client component either way).
// `src` resolves against this repo's public/, which the sync fills from the project's docs/public/,
// so a synced page's src="/nexus/x.mp4" works once a sync has run.
export function VideoEmbed({ src, caption }: { src: string; caption?: string }) {
  return (
    <figure className="my-8 m-0">
      <div className="rounded-[12px] overflow-hidden border">
        <video
          src={src}
          autoPlay
          muted
          loop
          playsInline
          onContextMenu={(e) => e.preventDefault()}
          className="block w-full h-auto"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-fd-muted-foreground">{caption}</figcaption>
      )}
    </figure>
  );
}
