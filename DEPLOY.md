# Deploying / Updating the Site

This is an **Astro** static site. `npm run build` compiles it into `dist/` — plain HTML, CSS
and JS. **The contents of `dist/` are what belongs in `public_html/`.** Nothing else in this
repo (`src/`, `package.json`, `node_modules/`) should ever be uploaded to the server.

Hosting is **cPanel**. Deploys run automatically via GitHub Actions on every push to `main`
(see `.github/workflows/deploy.yml`).

---

## One-time setup

### 1. Get a Web3Forms key

The contact form is inlined at **build time**. Without a key, the site builds with a
placeholder and **form submissions go nowhere, silently**.

Get a free key at https://web3forms.com using `info@pavilionmasterbuilders.com`.

### 2. Create an FTP account in cPanel

cPanel → **FTP Accounts** → create one dedicated to deploys.

Note the **Directory** field — it determines the `FTP_SERVER_DIR` secret below:

| FTP account's home directory | `FTP_SERVER_DIR` value |
| ---------------------------- | ---------------------- |
| `public_html`                | `./`                   |
| account root (`/home/user`)  | `./public_html/`       |

Getting this wrong is the most common failure: the site ends up nested at
`public_html/public_html/` or dumped in the account root. Verify it after the first deploy.

### 3. Add the repository secrets

GitHub repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secret | Value |
| ------ | ----- |
| `PUBLIC_WEB3FORMS_KEY` | Your Web3Forms access key |
| `FTP_SERVER` | Your FTP hostname, e.g. `ftp.pavilionmasterbuilders.com` |
| `FTP_USERNAME` | Full FTP username, usually `deploy@pavilionmasterbuilders.com` |
| `FTP_PASSWORD` | The FTP account password |
| `FTP_SERVER_DIR` | `./` or `./public_html/` — see the table above |

### 4. Back up the current `public_html` before the first deploy

cPanel → **File Manager** → select everything in `public_html` → **Compress** → download the
zip. One-time insurance; after this, git history is your rollback.

---

## Everyday updates

```bash
git checkout main && git pull
# edit content in src/data/ (products, offices, testimonials) or src/components/
npm run dev            # http://localhost:4321 — check your change
npm run build          # must end with "Complete!"
npm run preview        # serves dist/ exactly as it will be served live

git add -A
git commit -m "Update <what changed>"
git push               # GitHub Actions builds and deploys automatically
```

Watch the deploy in the repo's **Actions** tab. A green check means it's live.

For anything substantial, branch first (`git checkout -b my-change`), verify locally, then
merge to `main`.

### Local `.env`

For `npm run dev` / `npm run build` to produce a working contact form locally, copy
`.env.example` to `.env` and paste your key. `.env` is gitignored — it never leaves your
machine. CI uses the `PUBLIC_WEB3FORMS_KEY` secret instead.

---

## Rollback

```bash
git revert <bad-commit>
git push
```

The workflow rebuilds and redeploys the previous state. To find the commit, use `git log --oneline`.

---

## What the deploy does and does not touch

The workflow syncs `dist/` into `public_html/` incrementally — it only transfers files that
actually changed, so a typical content edit uploads a handful of files, not the whole site.

It **never deletes** these, even though they aren't in `dist/`:

- `.htaccess` — your redirects, HTTPS forcing, custom error pages
- `.well-known/` — **Let's Encrypt ACME challenge; deleting it breaks SSL auto-renewal**
- `cgi-bin/`

This is why you should never "delete everything in `public_html` and re-upload." Those three
are invisible in most FTP clients (they start with a dot) and losing `.well-known/` doesn't
fail loudly — the certificate just quietly stops renewing and expires ~60 days later.

### Optional: asset caching

Astro fingerprints filenames in `_astro/` (e.g. `index.a1b2c3.css`), so they can be cached
forever safely. To enable, edit `public_html/.htaccess` in File Manager and add:

```apache
<IfModule mod_headers.c>
  <FilesMatch "\.(css|js|jpg|jpeg|png|webp|avif|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>
```

The `must-revalidate` on HTML matters: it's what lets a content change appear immediately
instead of being cached by browsers.

---

## Troubleshooting

**Deploy fails on "contact form key is missing"** — the `PUBLIC_WEB3FORMS_KEY` secret isn't
set, or is misspelled. This check is deliberate; it stops a broken form reaching production.

**Deploy fails to connect** — cPanel usually offers FTPS on port 21. If your host disabled
plain FTPS, check with them. Do not fall back to `protocol: ftp`; it sends the password in
cleartext.

**Site appears at the wrong path** — `FTP_SERVER_DIR` doesn't match the FTP account's home
directory. See the table in step 2.

**Changes don't appear** — hard-refresh (Ctrl+Shift+R). If it persists, check the Actions tab
that the run actually succeeded.
