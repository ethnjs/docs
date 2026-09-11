'use client';

import { ApiReferenceReact } from '@scalar/api-reference-react';
// The package's JS doesn't import its stylesheet (only its .d.ts does), so Scalar renders unstyled without this.
import '@scalar/api-reference-react/style.css';
import { useTheme } from 'next-themes';
import { type CSSProperties, useMemo } from 'react';

// Nexus's live spec, fetched by Scalar in the browser (never at build time) — so Nexus's backend CORS
// must allow this site's origin. Scalar shows the spec's info.version, so no version wiring is needed here.
const nexusOpenApiUrl = 'https://nexus-api.socalscioly.org/openapi.json';

export function NexusApiReference() {
  // Follow the site's theme toggle instead of Scalar's own.
  const { resolvedTheme } = useTheme();
  const configuration = useMemo(
    () => ({
      url: nexusOpenApiUrl,
      // Scalar's "Ask AI" agent (it otherwise turns itself on automatically when served from localhost).
      agent: { disabled: true },
      hideDarkModeToggle: true,
      forceDarkModeState: resolvedTheme === 'dark' ? ('dark' as const) : ('light' as const),
    }),
    [resolvedTheme],
  );

  return (
    // Offset Scalar's sticky sidebar below the fumadocs navbar (h-14).
    <div className="w-full" style={{ '--scalar-custom-header-height': '3.5rem' } as CSSProperties}>
      <ApiReferenceReact configuration={configuration} />
    </div>
  );
}
