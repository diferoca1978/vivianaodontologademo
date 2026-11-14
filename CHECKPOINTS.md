# CHECKPOINTS: launch checklist

Go through every item before the site counts as **delivered** (see `AGENTS.md`). Each
item depends on the ones above it.

## 1. Real domain in the project

- [x] `astro.config.mjs` → `site` is the real domain (`https://odontologavivianarodriguez.com`), not
      `https://example.com` and not a preview URL (`*.netlify.app`, `*.workers.dev`,
      `*.pages.dev`).

## 2. Domain on the host

- [x] The domain is added to the site on Netlify (2026-11-14).
- [x] Its DNS records point there (apex A `75.2.60.5`, `www` CNAME
      `vivianaodontologa.netlify.app`, both DNS only on Cloudflare).
- [x] DNS has propagated (1.1.1.1 and 8.8.8.8), and Netlify serves the domain over HTTP.
- [x] HTTPS is active on the domain, with and without `www`, and one of the two
      redirects to the other (Let's Encrypt cert for both names, valid until
      2027-02-12; `www` and `http` 301 to `https://odontologavivianarodriguez.com/`, HSTS on).

## 3. Email for the contact form (only if the site has a form)

> **Does not apply (2026-11-14):** the site has no form; contact is through WhatsApp,
> phone and email links. No Resend integration, API key or sending domain. If a form
> (or the booking spec) is added later, reopen this section.

- [x] N/A: The form follows the rules in `AGENTS.md` § Contact forms.
- [x] N/A: The API key and the addresses are environment variables on the host, never in
      the repo.
- [x] N/A: The sending domain is verified in Resend (SPF, DKIM and DMARC at the DNS
      provider), and a test message from the form arrives.

## 4. The gate, with the real domain

- [x] `pnpm build` passes with the real `site`. No `[CLIENTE]` or other placeholder is
      left: once `site` is the real domain, `placeholder-text` is an error.
- [x] The favicon, the logo and the `og-image` in `public/` are the client's, not the
      placeholders (the gate cannot see what an image shows). Checked by eye on
      2026-11-14; the `og-image` was rebuilt because it still printed the old domain.
- [x] Every entry in `shineSeo({ ignore })` still has a valid reason.

## 5. AI bot policies (only on Cloudflare)

> **Does not apply (2026-11-14):** both records are **DNS only** (grey cloud), so
> traffic goes straight to Netlify and no Cloudflare bot setting, WAF rule or Bot Fight
> Mode touches it. Netlify serves the repo's `robots.txt` unchanged (checked live). If
> the proxy is ever turned on, reopen this section and set SSL/TLS to Full (strict).

- [x] N/A: Security Settings → Bot traffic → AI bot policies: the *Search*, *Agent* and
      *Training* policies are decided with the client. *Search* affects search results:
      never block it without an explicit decision.
- [x] N/A: With *Bot Preference Sync* on, Cloudflare adds its own directives in front of the
      site's `robots.txt`. Check the robots.txt the site **serves**
      (`https://odontologavivianarodriguez.com/robots.txt`), not the one in the repo. Search Console may
      flag `Content-signal` as "Syntax not understood"; according to Cloudflare, it does
      not affect crawling.
- [x] N/A: If the zone is the agency's (`"cloudflare": "own"` in harness-tools'
      `clients.json`): the `seo-watch` WAF rule is first in the custom rules, and Bot
      Fight Mode is off (it cannot be skipped). Steps in harness-tools' README §
      Cloudflare.

## 6. Search Console

- [x] A domain property, verified through DNS (2026-11-14, `google-site-verification`
      TXT record on Cloudflare).
- [x] The sitemap is submitted (`https://odontologavivianarodriguez.com/sitemap-index.xml`)
      (2026-11-14).
- [x] Indexing requested in URL Inspection for the 4 sitemap pages (2026-11-14). Live
      check: all 200, `index, follow`, self-referencing canonical.
- [ ] Once Google has crawled them (a few days): URL Inspection shows each page indexed,
      and the canonical Google chose is the page's own URL.
- [x] Settings → Search generative AI is on "Include" or "Inherit" (Inherit, 2026-11-14) (the default; check
      that nobody set it to "Exclude").

## 7. Google Business Profile (only for a local business)

- [x] The name, address and phone match `src/config/company.ts` exactly. Phone, geo and
      hours match. Name and address differ on purpose ("Consultorio Viviana Rodriguez",
      "Ak 15 #104-30"): decided on 2026-10-02 (`client-gaps.md`), name covered by
      `alternateName`, same place by geo.
- [x] Website `https://odontologavivianarodriguez.com/` added to the profile (2026-11-14).
- [ ] Google has published the website change on the profile (it is under review).

## 8. Bing Webmaster Tools

- [x] The site is imported from Search Console (2026-11-14).
- [x] The sitemap shows in Bing's Sitemaps report (`sitemap-index.xml`), submitted by hand
      on 2026-11-14 (the GSC import did not bring it).

## 9. Rich Results Test

- [x] The home page and one inner page pass with no errors (2026-11-14: `/` and
      `/blanqueamiento-dental/`).
      PageSpeed Insights, desktop, same day: Performance 100, Accessibility 97, Best
      Practices 100, SEO 100, agent navigation 3/3.

## 10. Delivered

- [x] `pnpm exec check-seo --url https://odontologavivianarodriguez.com` is clean on the real domain
      (2026-11-14: 4 pages, 0 errors; 2 title-length warnings on `/` and `/contacto/`).
- [x] The client is in harness-tools' `clients.json` with `"launched": true` and the real
      `domain`. One manual run of `seo-watch` confirms it (Actions → seo-watch → Run
      workflow, with `client` = its `id`); `"watch": true` adds it to the weekly run.
- [x] `feature_list.json`: every launched feature has `"status": "delivered"` (37, 2026-11-14).
