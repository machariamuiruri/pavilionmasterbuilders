# Pavilion Master Builders — Website (Astro)

Marketing website for **Pavilion Master Builders Limited**, rebuilt with [Astro](https://astro.build/).
It ships as a **fully static site** (plain HTML/CSS/JS in `dist/`) — same performance and
zero-cost hosting as the original single-file version, but componentised and content-driven
so it's far easier to grow and maintain.

## Why Astro (vs the old single file)

- **Reusable components** — one `ProductCard`, one `Nav`, one `Footer`, instead of copy-pasted HTML.
- **Content lives as data** — products, offices, testimonials, Mixx finishes/colours, etc. are
  plain arrays in `src/data/`. Add a product by adding one object; you never touch markup.
- **Offices defined once** — the Contact section and the Footer both read the same `offices`
  list, so they can never drift out of sync.
- **CSS and JS are separate files** — `src/styles/global.css` and `src/scripts/main.js`, which
  Astro bundles and minifies automatically at build time.
- Still deploys as static files anywhere (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Requirements

- [Node.js](https://nodejs.org/) 18.14 or newer

## Commands

```bash
npm install        # install dependencies (first time only)
npm run dev        # local dev server with hot reload  ->  http://localhost:4321
npm run build      # build the static site into dist/
npm run preview    # preview the built dist/ locally
```

## Project structure

```
pavilion-astro/
├── public/                    # served as-is at the site root
│   ├── PAV.png                # logo
│   ├── favicon.png · apple-touch-icon.png
│   └── assets/                # product imagery (roofing, mixx, gutters, …)
├── src/
│   ├── data/                  # ← EDIT CONTENT HERE (no HTML needed)
│   │   ├── products.js        #   the 8 solution cards
│   │   ├── mixx.js            #   Mixx finishes, colour charts, sealers, applications
│   │   └── site.js           #   offices, nav, stats, projects, testimonials, why-choose
│   ├── components/            # one file per UI piece (Nav, Hero, ProductCard, Mixx, …)
│   ├── layouts/BaseLayout.astro
│   ├── styles/global.css      # all styles (bundled + minified on build)
│   ├── scripts/main.js        # hamburger menu, colour-chart tabs, contact form
│   └── pages/index.astro      # the home page — assembles the sections
├── astro.config.mjs
└── package.json
```

## Editing content (the common tasks)

- **Add / edit a product** → edit `src/data/products.js` (one object per card).
- **Add / edit a product _page_** → edit `src/data/productDetails.js`. Each product has its own
  page at `/products/<slug>`, generated from that file by `src/pages/products/[slug].astro`.
  Add a `slug` entry (with `sections`) and a matching card in `products.js` — no new files needed.
- **Change an office or phone number** → edit `offices` in `src/data/site.js` (updates Contact + Footer).
- **Add a Mixx colour / finish / sealer** → edit `src/data/mixx.js`.
- **Swap a photo** → drop the file in `public/assets/…` and point the data entry at it.
- **Add a whole new page** → create `src/pages/about.astro` using `BaseLayout`; it's live at `/about`.

## Contact form (Web3Forms)

The enquiry form posts to [Web3Forms](https://web3forms.com/) — free, no backend.

1. Get a key at web3forms.com (enter `info@pavilionmasterbuilders.com`).
2. Copy `.env.example` to `.env` and set `PUBLIC_WEB3FORMS_KEY=your-key`.
3. Rebuild / redeploy. (Without a key the form still renders; it just won't deliver.)

## Deployment (Vercel)

Import the repo in Vercel — it auto-detects Astro (build: `astro build`, output: `dist/`).
Add the `PUBLIC_WEB3FORMS_KEY` environment variable in the Vercel dashboard. Push to deploy.

---

© Pavilion Master Builders Limited. All rights reserved.
