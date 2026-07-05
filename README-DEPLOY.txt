PAVILION MASTER BUILDERS — SITE UPDATE
======================================

WHAT'S IN THIS PACKAGE
  pavilion_final_premium.html   -> updated site (same filename as before)
  assets/                       -> product images referenced by the site
  README-DEPLOY.txt             -> this file

WHAT CHANGED
  • Products section expanded from 4 cards to the full 8-line offering,
    each with a real product photo (Decra, LGS, Mixx, Fiber Cement,
    UPVC Gutters, Rust Converter, Alternative Building, Re-roofing).
  • New "Mixx Cement" section (nav > Solutions > Mixx, or #mixx):
    the three finishes, tabbed colour charts, the sealers, and the
    full application spec table.
  • New Contact section (#contact) with a working enquiry form and all
    four office cards. Every CTA button now scrolls to it.
  • Footer offices corrected to K-Mall, Karen, Eldoret, Kisumu.
  • Fixed a CSS typo (`glass;`) so the nav and cards now show the
    intended frosted-glass effect.

DEPLOY (Vercel)
  1. Drop the updated pavilion_final_premium.html and the assets/ folder
     into your existing project root — alongside your current PAV.png logo
     (PAV.png is unchanged and is NOT included here; keep the one you have).
  2. Commit & push. Vercel rebuilds automatically.

ACTIVATE THE CONTACT FORM (Web3Forms — free, ~1 min)
  1. Go to https://web3forms.com  ->  enter  info@pavilionmasterbuilders.com
  2. Copy the Access Key they email you.
  3. In pavilion_final_premium.html, find  YOUR_WEB3FORMS_ACCESS_KEY
     (one line, marked with a TODO comment) and replace it with your key.
  4. Submissions now arrive at info@pavilionmasterbuilders.com.
     The form validates, shows success/error inline, and has spam
     protection built in (honeypot). No backend or server needed.
