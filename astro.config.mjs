import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site — outputs plain HTML/CSS/JS to dist/, deploys anywhere (cPanel, Netlify, etc.)
// `site` is required by the sitemap integration and by the canonical URLs in BaseLayout.
export default defineConfig({
  site: 'https://www.pavilionmasterbuilders.com',
  integrations: [sitemap()],
});
