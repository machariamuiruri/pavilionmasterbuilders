import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site — outputs plain HTML/CSS/JS to dist/, deploys anywhere (cPanel, Netlify, etc.)
// `site` is required by the sitemap integration and by the canonical URLs in BaseLayout.
export default defineConfig({
  site: 'https://www.pavilionmasterbuilders.com',

  // Every route builds to <dir>/index.html, so the canonical form of a URL ends
  // in a slash -- which is what the sitemap and the canonical tags have always
  // emitted. Internal hrefs did not, so Apache's DirectorySlash answered each
  // one with a 301 to the slashed form. Every internal link on the site was a
  // redirect hop. 'always' makes the dev server enforce in development what the
  // host enforces in production, so the mismatch cannot silently return.
  trailingSlash: 'always',

  integrations: [
    // lastmod lets Google prioritise recrawls instead of treating every URL
    // as equally stale. Dates come from the build, so they move when content is
    // rebuilt and redeployed.
    sitemap({ lastmod: new Date() }),
  ],
});
