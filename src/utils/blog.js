// Shared helpers for the blog listing, post and category pages.

export const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);

// Drafts stay visible while running `npm run dev` so you can preview them,
// but are dropped from the production build.
export const isPublished = (post) => import.meta.env.DEV || !post.data.draft;

export const newestFirst = (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf();

// Published posts, newest first — the ordering every listing page uses.
export const publishedPosts = (posts) => posts.filter(isPublished).sort(newestFirst);

// Unique categories with post counts, alphabetical.
export const categoriesOf = (posts) => {
  const counts = new Map();
  for (const post of posts) {
    const { category } = post.data;
    counts.set(category, (counts.get(category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: slugify(name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
};
