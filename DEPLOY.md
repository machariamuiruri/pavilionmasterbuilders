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
| `PUBLIC_WEB3FORMS_KEY` | `ac32a660-6380-4e2b-aae5-2c4e8c41d6d1` |
| `FTP_SERVER` | `rs8.rcnoc.com` |
| `FTP_USERNAME` | `deploy@pavilionmasterbuilders.com` |
| `FTP_PASSWORD` | The FTP account password |
| `FTP_SERVER_DIR` | `./` (the deploy account's home *is* `public_html`) |

**Do not use `ftp.pavilionmasterbuilders.com`** — cPanel's FTP Accounts page suggests it, but
that DNS record does not exist (confirmed NXDOMAIN). cPanel prints `ftp.<domain>` from a
template without checking the zone. `rs8.rcnoc.com` is the server's real hostname, and using
it also avoids an FTPS certificate hostname mismatch.

The Web3Forms key is not really a secret — it is inlined into the page source and visible to
anyone. It lives in a GitHub secret so it is easy to rotate, not because it needs hiding.

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

### The `.htaccess` file

Because the deploy excludes it, this file exists **only on the server**. It is not in git and
nothing rebuilds it, so if `public_html` is ever wiped it has to be retyped — which is what
this section is for. Edit it at cPanel → **File Manager** → `public_html`, after ticking
**Settings → Show Hidden Files (dotfiles)**.

What was there until now was the WordPress site's `.htaccess`, left behind when the site was
replaced. WordPress itself is gone from the server, but its rules were not, and one of them
had a visible effect: `RewriteRule . /index.php [L]` sends every missing URL to `/index.php`,
which does not exist on a static site, so visitors got the host's grey default error page and
the custom 404 from `src/pages/404.astro` was never reached. Three other leftover blocks
(`speedycache`, `WEBPspeedycache`, `SpeedyCacheheaders`) referred to plugins and cache folders
that no longer exist.

The compression and expiry blocks below are the parts of that file worth keeping.

**Do not add rules forcing HTTPS.** The host already does it, at both hostnames.

```apache
# ============================================================================
# Pavilion Master Builders
# Documented in DEPLOY.md. Keep the two in sync -- this file is not in git and
# is not recreated by a deploy.
# ============================================================================

# --- Error pages ------------------------------------------------------------
# The site builds a styled 404 to /404.html. Without these lines Apache serves
# its own generic one instead. 410 gets the same page; the wording fits both.
ErrorDocument 404 /404.html
ErrorDocument 410 /404.html

RewriteEngine On

# --- Old WordPress URLs -----------------------------------------------------
# Google indexed these from the WooCommerce site that used to live here.
# They run BEFORE the www rule so legacy traffic takes one hop, not two.
# NE is required on the last one: without it the # is escaped to %23.
RewriteRule ^shop/?$     https://www.pavilionmasterbuilders.com/products/ [R=301,L]
RewriteRule ^services/?$ https://www.pavilionmasterbuilders.com/products/ [R=301,L]
RewriteRule ^contact/?$  https://www.pavilionmasterbuilders.com/#contact  [R=301,L,NE]

# Nothing on the current site corresponds to these. Redirecting a checkout page
# to the homepage is a soft 404 -- Google ignores it and leaves the old URL in
# limbo. 410 Gone gets it dropped from the index properly.
RewriteRule ^(my-account|cart|checkout)/?$ - [G]
RewriteRule ^(comments/)?feed/?$           - [G]

# --- Canonical hostname -----------------------------------------------------
# Both hostnames serve every page with a 200, so without this each page exists
# at two addresses. The .well-known exception keeps Let's Encrypt renewals
# working -- an ACME challenge that gets redirected fails.
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^(.*)$ https://www.pavilionmasterbuilders.com/$1 [R=301,L]

# --- Compression ------------------------------------------------------------
<IfModule mod_deflate.c>
	AddOutputFilterByType DEFLATE text/html
	AddOutputFilterByType DEFLATE text/css
	AddOutputFilterByType DEFLATE text/plain
	AddOutputFilterByType DEFLATE text/xml
	AddOutputFilterByType DEFLATE text/javascript
	AddOutputFilterByType DEFLATE application/javascript
	AddOutputFilterByType DEFLATE application/x-javascript
	AddOutputFilterByType DEFLATE application/json
	AddOutputFilterByType DEFLATE application/xml
	AddOutputFilterByType DEFLATE application/rss+xml
	AddOutputFilterByType DEFLATE application/xhtml+xml
	AddOutputFilterByType DEFLATE application/vnd.ms-fontobject
	AddOutputFilterByType DEFLATE font/ttf
	AddOutputFilterByType DEFLATE font/otf
	AddOutputFilterByType DEFLATE font/woff
	AddOutputFilterByType DEFLATE font/woff2
	AddOutputFilterByType DEFLATE image/svg+xml
	AddOutputFilterByType DEFLATE image/x-icon
</IfModule>

# --- Caching ----------------------------------------------------------------
# A0 on the default is what keeps HTML fresh: a redeploy is visible immediately
# rather than after a cache expires. Astro fingerprints everything in _astro/,
# so those files are safe to keep for a year.
#
# Note the trap: photos under /assets/ are NOT fingerprinted -- their filenames
# are written by hand. Replacing one in place leaves anybody who already has it
# on the old image for a year. Give a replaced photo a new filename.
<IfModule mod_expires.c>
	ExpiresActive on
	ExpiresDefault A0
	ExpiresByType text/css A31536000
	ExpiresByType text/javascript A31536000
	ExpiresByType application/javascript A31536000
	ExpiresByType font/ttf A31536000
	ExpiresByType font/otf A31536000
	ExpiresByType font/woff A31536000
	ExpiresByType font/woff2 A31536000
	ExpiresByType application/vnd.ms-fontobject A31536000
	ExpiresByType image/jpeg A31536000
	ExpiresByType image/png A31536000
	ExpiresByType image/gif A31536000
	ExpiresByType image/webp A31536000
	ExpiresByType image/svg+xml A31536000
	ExpiresByType image/x-icon A31536000
	ExpiresByType application/pdf A31536000
</IfModule>

<IfModule mod_headers.c>
	<FilesMatch "\.html$">
		Header set Cache-Control "public, max-age=0, must-revalidate"
	</FilesMatch>
</IfModule>

# php -- BEGIN cPanel-generated handler, do not edit
# Set the "ea-php82" package as the default "PHP" programming language.
<IfModule mime_module>
  AddHandler application/x-httpd-ea-php82 .php .php8 .phtml
</IfModule>
# php -- END cPanel-generated handler, do not edit
```

Leave the cPanel handler block at the bottom exactly as cPanel wrote it — it is regenerated
when the PHP version changes, and the markers are how cPanel finds it. Nothing on the site is
PHP, but removing it is not worth the risk of cPanel rewriting the file.

Check it from a terminal afterwards. The last line matters most — a bad rewrite rule can
swallow every URL on the site, so confirm a normal page still loads before walking away:

```bash
curl -sI https://pavilionmasterbuilders.com/ | head -3            # 301 → www
curl -sI https://www.pavilionmasterbuilders.com/shop/ | head -3    # 301 → /products/
curl -sI https://www.pavilionmasterbuilders.com/cart/ | head -3    # 410
curl -s  https://www.pavilionmasterbuilders.com/nope/ | grep title # the styled 404
curl -sI https://www.pavilionmasterbuilders.com/blog/ | head -3     # 200, unchanged
```

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

**Deploy fails on "The deploy target is EMPTY"** — the FTP account's home directory is not
`public_html`. cPanel cannot change an existing account's directory; delete the account and
recreate it, overwriting the auto-filled **Directory** field with `public_html`. See step 2.

## Why there is no automated post-deploy check

The site sits behind a JavaScript bot-challenge ("One moment, please..."). Any non-browser
client — including GitHub's runners and `curl` — receives the challenge page with HTTP 200
instead of the real content, so CI cannot confirm over HTTP what the site is serving. A check
like that would fail on every deploy, including good ones.

Instead the workflow inspects the FTP target *before* uploading and fails if it is empty,
which is the signature of an account pointed at the wrong folder. Each build also writes
`deploy-stamp.txt` containing the deployed commit SHA — open
https://www.pavilionmasterbuilders.com/deploy-stamp.txt **in a browser** (which passes the
challenge) and compare it to `git rev-parse HEAD` to confirm what is live.
