// Build-time RSS feed, emitted as a static /rss.xml.
//
// Reads the same blog collection, and the same published/newest-first rules,
// as the listing pages — so a draft hidden from /blog/ is hidden here too.
// Links are made absolute from `site` in astro.config.mjs.

import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { publishedPosts } from '../utils/blog.js';

export async function GET(context) {
  const posts = publishedPosts(await getCollection('blog'));

  return rss({
    title: 'Pavilion Master Builders Blog',
    description:
      'Practical guidance on Light Gauge Steel, Fibre Cement, Decra Roofing and alternative building in Kenya.',
    site: context.site,
    // Trailing slash matches the canonical form of every page (trailingSlash: 'always').
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.slug}/`,
      categories: [post.data.category, ...post.data.tags],
    })),
    customData: '<language>en-ke</language>',
  });
}
