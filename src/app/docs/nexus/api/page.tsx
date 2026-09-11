import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { Metadata } from 'next';
import { NexusApiReference } from '@/components/nexus-api-reference';
import { baseOptions } from '@/lib/layout.shared';

export const metadata: Metadata = {
  title: 'NEXUS API Reference | ethnjs docs',
};

// Full-width Scalar under the site navbar (outside the docs layout), with a link back to the NEXUS docs.
export default function Page() {
  return (
    <HomeLayout {...baseOptions()} links={[{ text: '← NEXUS docs', url: '/docs/nexus', active: 'none' }]}>
      <NexusApiReference />
    </HomeLayout>
  );
}
