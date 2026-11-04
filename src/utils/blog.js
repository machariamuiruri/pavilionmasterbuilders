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

export const squash = (text) => text.replace(/\s+/g, ' ').trim();

// Markdown to plain prose. Only the words matter here, so this is deliberately
// crude rather than a real parser. Shared by the search index and FAQ schema.
export const stripMarkdown = (md) =>
  squash(
    md
      .replace(/<!--[\s\S]*?-->/g, ' ')
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
      .replace(/^[>\s]*[-*+]\s+/gm, ' ')
      .replace(/[#*_`~|]+/g, ' ')
  );

// Question/answer pairs from a post's FAQ section, for FAQPage schema.
//
// A post opts in just by having a `## Frequently asked questions` (or `## FAQs`)
// heading: each `###` heading under it is a question, and the text beneath it,
// up to the next heading, is the answer. Reading them from the body rather than
// from frontmatter means the schema can never say something the page doesn't --
// Google requires FAQ markup to match visible content. No such section, or no
// questions in it, returns [] and the page gets no FAQPage node.
const FAQ_HEADING = /^##\s+(frequently asked questions|faqs?)\s*$/i;

export const faqsOf = (body) => {
  // Fenced code can contain lines that look like headings; blank it out first.
  const lines = body.replace(/```[\s\S]*?```/g, '').split('\n');
  const start = lines.findIndex((line) => FAQ_HEADING.test(line.trim()));
  if (start === -1) return [];

  const faqs = [];
  let current = null;
  for (const line of lines.slice(start + 1)) {
    if (/^##\s/.test(line)) break; // next H2 ends the FAQ section
    const question = line.match(/^###\s+(.+)$/);
    if (question) {
      current = { q: stripMarkdown(question[1]), a: [] };
      faqs.push(current);
    } else if (current) {
      current.a.push(line);
    }
  }

  return faqs
    .map(({ q, a }) => ({ q, a: stripMarkdown(a.join('\n')) }))
    .filter(({ q, a }) => q && a);
};

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
