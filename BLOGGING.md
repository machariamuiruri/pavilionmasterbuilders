# Publishing a Blog Post

Posts are Markdown files in `src/content/blog/`. You can write them entirely on
github.com — no terminal, no local setup. Committing a file triggers the deploy, and the
post is live in about a minute.

**The filename becomes the URL.** `decra-vs-iron-sheets.md` → `/blog/decra-vs-iron-sheets`.
Use lowercase words separated by hyphens, and don't rename it after publishing — that
changes the URL and breaks any existing links to it.

---

## Publishing from github.com

1. Go to the repo → open the `src/content/blog/` folder
2. **Add file → Create new file**
3. Name it, ending in `.md` — e.g. `roof-maintenance-checklist.md`
4. Paste the template below and write your post
5. Scroll down → **Commit changes** → commit directly to `main`
6. Watch the **Actions** tab. Green tick = live.

## Template

Copy this whole block as your starting point.

```markdown
---
title: "Your Post Title"
description: "One or two sentences. Shown on the blog listing card AND used as the Google search description, so make it count."
pubDate: 2026-09-01
category: "Roofing"
tags: ["decra", "maintenance"]
heroImage: "/assets/blog/my-photo.jpg"
heroAlt: "Plain description of the photo, for screen readers"
relatedProducts: ["decra-roofing"]
draft: false
---

Your opening paragraph. Plain sentences work best.

## A subheading

More text. Leave a blank line between paragraphs.

- A bullet
- Another bullet

**Bold text** and [a link](https://example.com) work as you'd expect.
```

## The fields

| Field | Required | Notes |
| --- | --- | --- |
| `title` | Yes | Keep it under ~60 characters so Google doesn't truncate it |
| `description` | Yes | Aim for 120–155 characters |
| `pubDate` | Yes | `YYYY-MM-DD`. Posts sort newest first |
| `category` | Yes | Creates a category page automatically. Reuse existing spellings exactly — "Roofing" and "roofing" would make two separate categories |
| `tags` | No | Display only; doesn't create pages |
| `heroImage` | No | Path starting `/assets/blog/` — see below |
| `heroAlt` | No | Describe the image. Needed for accessibility and image search |
| `relatedProducts` | No | Product slugs, listed below. Links appear at the foot of the post |
| `draft` | No | `true` hides it from the live site |
| `updatedDate` | No | Shows "Updated <date>" under the title |

Valid `relatedProducts` slugs:

```
decra-roofing        light-gauge-steel    mixx-cement           fiber-cement
upvc-gutters         rust-converter       alternative-building  reroofing-cleaning
```

A slug that doesn't match one of these is silently skipped rather than rendering a
broken link — so check your spelling if a related product doesn't appear.

## Adding images

1. Repo → `public/assets/blog/` → **Add file → Upload files**
2. Drag the image in and commit
3. Reference it as `/assets/blog/your-file.jpg`

Resize large photos before uploading — around 1600px wide is plenty. Straight-from-the-camera
files are often 5–8 MB and will make the page slow.

To put an image inside the body of a post:

```markdown
![Description of the image](/assets/blog/another-photo.jpg)
```

## Drafts and works in progress

Set `draft: true` and the post won't appear on the live site. It stays visible when
running `npm run dev` locally, so it can be previewed before going out.

Alternatively, **prefix the filename with an underscore** — `_half-finished-idea.md` is
ignored completely, schema and all. Useful for notes that aren't a real post yet.

## If the deploy fails

Frontmatter is validated at build time, and **a malformed post fails the build rather
than publishing something broken.** The Actions log names the file and the problem:

```
blog → my-post.md frontmatter does not match collection schema.
pubDate: Invalid date
category: Required
```

Fix the file and commit again. The live site is untouched while a build is failing — it
keeps serving the previous version.

Most common causes:

- **Date not quoted correctly** — use `pubDate: 2026-09-01`, not `01/09/2026`
- **Missing `category`** — it's required
- **A colon inside an unquoted title** — wrap the whole value in double quotes
- **Smart quotes** from pasting out of Word — retype them as plain `"` quotes

## Checking it went live

The Actions tab is the source of truth for whether the deploy succeeded. Then open
https://www.pavilionmasterbuilders.com/blog in a browser.

Note that `curl` and most link-checking tools receive a bot-challenge page from the
host rather than the real site, so check in an actual browser.
