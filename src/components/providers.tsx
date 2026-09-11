'use client';

import { RootProvider } from 'fumadocs-ui/provider/next';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

// Scalar ships its own search and Ctrl+K, so fumadocs' search (navbar button and hotkey) is turned
// off on those pages — otherwise both dialogs open at once. Disabling it here skips SearchProvider
// entirely, so no hotkey listener is bound, and the navbar trigger hides itself.
const routesWithoutSearch = ['/docs/nexus/api'];

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return <RootProvider search={{ enabled: !routesWithoutSearch.includes(pathname) }}>{children}</RootProvider>;
}
