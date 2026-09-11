import { ApiReference } from '@scalar/nextjs-api-reference';

// Nexus's live spec, fetched by Scalar in the browser (never at build time) — so Nexus's backend CORS
// must allow this site's origin. Scalar shows the spec's info.version, so no version wiring is needed here.
const nexusOpenApiUrl = 'https://nexus-api.socalscioly.org/openapi.json';

export const GET = ApiReference({
  url: nexusOpenApiUrl,
  pageTitle: 'NEXUS API Reference | ethnjs docs',
});
