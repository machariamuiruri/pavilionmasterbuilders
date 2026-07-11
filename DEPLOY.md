# Deploying / Updating the Site

This project is an **Astro** app. Vercel **builds** it (`astro build`) and serves the output
from `dist/`. The build settings are locked in `vercel.json`, so they travel with the repo —
you don't have to configure them in the dashboard. The **only** thing you must set in the
Vercel dashboard is the Web3Forms secret (below).

> Same repo, same Vercel project, same domain. You're swapping the contents from a single
> static HTML file to an Astro project. Do it on a branch so the live site doesn't change
> until you've verified a preview.

## Prerequisites
- Node.js 18+ and git installed locally.

---

## First-time migration (old single-file site → Astro)

### 1. Get the repo and start a safe branch
```bash
git clone https://github.com/<you>/<your-repo>.git   # or cd into your existing clone
cd <your-repo>
git checkout main && git pull
git checkout -b astro-rebuild
```

### 2. Replace the old files with this Astro project
Delete the old site files (the single `.html`, `PAV.png`, old `assets/`, `README-DEPLOY.txt`,
and any old `vercel.json`) but **keep the hidden `.git` folder**, then copy in this project.

```bash
# macOS/Linux — removes everything except .git
find . -maxdepth 1 -not -name '.git' -not -name '.' -exec rm -rf {} +
# copy the Astro project contents into the repo root
cp -R /path/to/pavilion-astro/. .
```
On Windows: in Explorer, delete the old files (leave the hidden `.git` folder) and drag the
Astro files in. You should now see `package.json`, `astro.config.mjs`, `vercel.json`, `src/`
and `public/` at the repo root.

### 3. Test locally before pushing
```bash
npm install
npm run dev      # http://localhost:4321 — click every product page, check mobile in devtools
npm run build    # must end with "Complete!" and no errors
```

### 4. Set the one required Vercel setting
Vercel dashboard → your project → **Settings → Environment Variables**:
- Add `PUBLIC_WEB3FORMS_KEY` = your Web3Forms key (get it free at https://web3forms.com,
  entering `info@pavilionmasterbuilders.com`). Enable it for **Production** (and **Preview**
  if you want the form working on preview URLs). The `PUBLIC_` prefix is required.

(Framework, build command and output directory are already set by `vercel.json` — no need to
touch the Framework Preset. If Vercel ever ignores it, set Framework Preset to **Astro** manually.)

### 5. Push the branch and check the preview
```bash
git add -A
git commit -m "Rebuild site with Astro: components, data-driven content, product pages"
git push -u origin astro-rebuild
```
Vercel creates a **Preview Deployment** for the branch. Open it from the **Deployments** tab and
verify: home page, all 8 product pages, mobile layout, and submit the contact form as a real test.

### 6. Go live
Merge `astro-rebuild` into `main` (open a PR on GitHub and merge, or):
```bash
git checkout main && git merge astro-rebuild && git push
```
Vercel builds `main` and promotes it to your production domain automatically.

---

## Everyday updates (after migration)

```bash
git checkout main && git pull
# edit content in src/data/ (products, offices, testimonials, product pages) or components
npm run dev            # preview locally
git add -A && git commit -m "Update <what changed>"
git push               # Vercel rebuilds and deploys automatically
```

For anything bigger, branch first (`git checkout -b my-change`), push, check the Vercel preview,
then merge to `main`.

## Notes
- **Root URL improves:** `/` now serves the homepage; products live at `/products/<slug>`.
- **Instant rollback:** Vercel **Deployments** tab → promote a previous deployment back to
  production in one click. Your old site also remains in git history.
- **If a deploy shows raw files** instead of the built site, `vercel.json` wasn't picked up —
  confirm it's at the repo root and that the Framework Preset isn't overridden to "Other".
