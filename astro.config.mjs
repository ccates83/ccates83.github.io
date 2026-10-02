// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Served by GitHub Pages from the ccates83.github.io repo. If a custom domain is added,
// update this and public/robots.txt, and add public/CNAME.
const SITE_URL = 'https://ccates83.github.io';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  devToolbar: { enabled: false },
  trailingSlash: 'never',
  build: { format: 'file' },
  integrations: [sitemap({ filter: (page) => !/\/404$/.test(page) })],
});
