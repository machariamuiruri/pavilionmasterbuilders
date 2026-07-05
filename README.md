# Pavilion Master Builders — Website

Marketing website for **Pavilion Master Builders Limited**, a Kenyan construction-materials company offering sustainable building solutions across East Africa.

Built as a single self-contained page in **vanilla HTML, CSS and JavaScript** (no build step, no framework) with a premium glassmorphism aesthetic, and deployed on **Vercel**.

---

## Tech stack

- Vanilla HTML5 / CSS3 / JavaScript — everything lives in one HTML file
- [Font Awesome](https://fontawesome.com/) (via CDN) for icons
- [Web3Forms](https://web3forms.com/) for the contact form (no backend required)
- Hosted on [Vercel](https://vercel.com/)

## Project structure

```
.
├── pavilion_final_premium.html   # the site — HTML + CSS + JS in one file
├── PAV.png                       # company logo (used in the nav)
├── favicon.png                   # 48×48 browser-tab icon
├── apple-touch-icon.png          # 180×180 mobile home-screen icon
├── assets/                       # product imagery, organised by product line
│   ├── roofing-decra/
│   ├── light-gauge-steel/
│   ├── mixx-cement/
│   │   ├── finishes/
│   │   ├── colour-charts/
│   │   └── products/
│   ├── fiber-cement/
│   ├── upvc-gutters/
│   ├── rust-converter/
│   ├── alternative-building/
│   └── reroofing-cleaning/
├── README-DEPLOY.txt             # quick deploy + form-setup notes
└── README.md
```

## Page sections

Hero · Stats · **Solutions** (Decra Roofing, Light Gauge Steel, Mixx Cement, Fiber Cement, UPVC Gutters, Rust Converter, Alternative Building, Re-roofing & Cleaning) · **Mixx Cement** deep-dive (finishes, colour charts, sealers, application guide) · Projects · Testimonials · Why Choose · **Contact** (enquiry form + four offices) · Footer.

## Running locally

Because image paths are relative, serve the folder over HTTP rather than opening the file directly:

```bash
# from the project root
python3 -m http.server 8000
# then visit http://localhost:8000/pavilion_final_premium.html
```

## Deployment (Vercel)

1. Push this repo to GitHub.
2. In Vercel, **Add New → Project** and import the repo. Framework preset: **Other** (it's a static site — no build command, output directory is the root).
3. Every push to the main branch triggers an automatic redeploy.

> **Tip:** to serve the site at the clean root URL (`/`) instead of `/pavilion_final_premium.html`, rename the file to `index.html`.

## Contact form setup (Web3Forms)

The enquiry form posts to Web3Forms — free, no server needed.

1. Go to [web3forms.com](https://web3forms.com/) and enter `info@pavilionmasterbuilders.com`.
2. Copy the **Access Key** they email you.
3. In `pavilion_final_premium.html`, find `YOUR_WEB3FORMS_ACCESS_KEY` (marked with a `TODO` comment) and replace it with your key.

Submissions then arrive at `info@pavilionmasterbuilders.com`. The form validates input, shows inline success/error messages, and includes a honeypot for spam protection.

## Editing content

- **Product images** live in `assets/<product-line>/`. Swap a file (keep the same name) or update the `src` in the HTML.
- **Offices / phone numbers** are in the Contact section and the footer.
- **Colours** are CSS variables in the `:root` block near the top of the `<style>` (navy `--primary`, gold `--accent`, green `--success`).

## Offices

K-Mall (Off Kangundo Rd, Nairobi) · Karen (Dari Business Park) · Eldoret (Rupa Business Center) · Kisumu (Swan Center)

---

© Pavilion Master Builders Limited. All rights reserved.
