// Build-time search index, emitted as a static /search.json.
//
// The site is static with no server, so search runs in the visitor's browser
// against this file. main.js fetches it once, the first time someone opens the
// search panel — it is never part of the initial page load.
//
// Indexing the source data rather than the built HTML means the index is
// available in `astro dev` too, so search behaves identically in development.

import { getCollection } from 'astro:content';
import { productDetails } from '../data/productDetails.js';
import { stats, services, whyChoose, testimonials, projects } from '../data/site.js';
import { publishedPosts, slugify } from '../utils/blog.js';

// Keys holding paths, ids or emoji rather than prose. Indexing them would put
// things like "assets" or a slug fragment into the searchable text.
const SKIP_KEYS = new Set([
  'img', 'src', 'heroImage', 'slug', 'type', 'link', 'cta', 'icon', 'id', 'tel', 'initials',
]);

// Walk arbitrarily nested data and collect the prose. Deliberately generic: a
// new productDetails section type gets indexed without editing this file.
function collectText(value, out) {
  if (typeof value === 'string') {
    // Skip URLs, anchors and anything without a couple of letters in it.
    if (!/^(\/|https?:|#|data:|mailto:)/.test(value) && /[a-z]{2}/i.test(value)) out.push(value);
    return out;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectText(item, out);
    return out;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      if (!SKIP_KEYS.has(key)) collectText(item, out);
    }
  }
  return out;
}

const squash = (text) => text.replace(/\s+/g, ' ').trim();

const textOf = (value) => squash(collectText(value, []).join(' '));

// Markdown to plain prose. Only the words matter here, so this is deliberately
// crude rather than a real parser.
const stripMarkdown = (md) =>
  squash(
    md
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/^[>\s]*[-*+]\s+/gm, ' ')
      .replace(/[#*_`~|]+/g, ' ')
  );

// Relative importance by page type, applied to the final score. Without this a
// thin listing page outranks real content whenever its title happens to start
// with the search term — "roof" put "Roofing articles" above "Decra Roofing".
const WEIGHT = {
  product: 1,
  post: 0.95,
  home: 0.7,
  section: 0.5,
  category: 0.45,
};

export async function GET() {
  const docs = [];

  // Product pages
  for (const product of Object.values(productDetails)) {
    docs.push({
      u: `/products/${product.slug}`,
      t: product.title,
      k: product.tag || 'Solution',
      d: product.tagline || product.metaDescription || '',
      // Title, tag and tagline are already indexed as t/k/d and shown above the
      // snippet. Leaving them out of the body stops every snippet opening by
      // repeating the heading the reader just read.
      b: textOf({ intro: product.intro, highlights: product.highlights, sections: product.sections }),
      w: WEIGHT.product,
    });
  }

  // Blog posts
  const posts = publishedPosts(await getCollection('blog'));
  for (const post of posts) {
    docs.push({
      u: `/blog/${post.slug}`,
      t: post.data.title,
      k: post.data.category,
      d: post.data.description,
      b: squash(`${post.data.tags.join(' ')} ${stripMarkdown(post.body)}`),
      w: WEIGHT.post,
    });
  }

  // Blog categories, so "roofing" can surface the category listing too
  const categories = [...new Set(posts.map((post) => post.data.category))];
  for (const category of categories) {
    docs.push({
      u: `/blog/category/${slugify(category)}`,
      t: `${category} articles`,
      k: 'Category',
      d: `Articles filed under ${category}.`,
      b: posts
        .filter((post) => post.data.category === category)
        .map((post) => post.data.title)
        .join(' '),
      w: WEIGHT.category,
    });
  }

  docs.push({
    u: '/blog',
    t: 'Blog',
    k: 'Section',
    d: 'Guides and articles on roofing, construction methods and finishes in Kenya.',
    b: posts.map((post) => `${post.data.title} ${post.data.description}`).join(' '),
    w: WEIGHT.section,
  });

  // The homepage carries content that lives nowhere else — the stats, the
  // testimonials, the service list and the project showcase.
  docs.push({
    u: '/',
    t: 'Pavilion Master Builders',
    k: 'Home',
    d: 'Sustainable building solutions across East Africa — roofing, light gauge steel, decorative cement, cladding and more.',
    b: textOf({ stats, services, whyChoose, testimonials, projects }),
    w: WEIGHT.home,
  });

  return new Response(JSON.stringify(docs), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}
