'use client';

import { ApiReferenceReact } from '@scalar/api-reference-react';
// The package's JS doesn't import its stylesheet (only its .d.ts does), so Scalar renders unstyled without this.
import '@scalar/api-reference-react/style.css';
import { useTheme } from 'next-themes';
import { type CSSProperties, useEffect, useMemo } from 'react';

// Nexus's live spec, fetched by Scalar in the browser (never at build time) — so Nexus's backend CORS
// must allow this site's origin. Scalar shows the spec's info.version, so no version wiring is needed here.
const nexusOpenApiUrl = 'https://nexus-api.socalscioly.org/openapi.json';

export function NexusApiReference() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const configuration = useMemo(
    () => ({
      url: nexusOpenApiUrl,
      // Scalar's "Ask AI" agent (it otherwise turns itself on automatically when served from localhost).
      agent: { disabled: true },
      // Scalar follows the site's theme toggle, so hide its own.
      hideDarkModeToggle: true,
      // Initial paint only — Scalar reads this once at init (`forceDarkModeState` is the same, and since it
      // also freezes Scalar's own theme watcher to that value, it would fight the effect below).
      darkMode: isDark,
    }),
    [isDark],
  );

  // Scalar themes itself off these classes on <body> — exactly what its own toggle does — so keep them in
  // sync with the site theme. Doing it here (instead of through config) avoids remounting the reference.
  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
    document.body.classList.toggle('light-mode', !isDark);

    return () => {
      document.body.classList.remove('dark-mode', 'light-mode');
    };
  }, [isDark]);

  return (
    // Offset Scalar's sticky sidebar below the fumadocs navbar (h-14).
    <div className="w-full" style={{ '--scalar-custom-header-height': '3.5rem' } as CSSProperties}>
      <ApiReferenceReact configuration={configuration} />
    </div>
  );
}
