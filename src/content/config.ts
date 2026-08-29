import { defineCollection, z } from 'astro:content';

// Blog posts are Markdown files in src/content/blog/. The filename becomes the
// URL: `decra-vs-iron-sheets.md` -> /blog/decra-vs-iron-sheets
//
// This schema is enforced at build time. If a post is missing a required field
// or has a malformed date, the BUILD FAILS with the offending file named — so a
// broken post can never reach the live site. See BLOGGING.md.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // Doubles as the listing excerpt and the page's meta description.
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    // Path under public/, e.g. '/assets/blog/my-photo.jpg'
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    // Product slugs to link at the foot of the post, e.g. ['decra-roofing']
    relatedProducts: z.array(z.string()).default([]),
    // true = visible in `npm run dev`, excluded from the published site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
