// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// SITE_URL is a placeholder until a domain is chosen. Update it (and wrangler.jsonc)
// before the first deploy; the sitemap and canonical URLs are built from it.
const SITE_URL = 'https://connorcates.com';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !/\/404$/.test(page) })],
});
