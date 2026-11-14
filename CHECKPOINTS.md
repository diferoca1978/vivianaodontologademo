# CHECKPOINTS: launch checklist

Go through every item before the site counts as **delivered** (see `AGENTS.md`). Each
item depends on the ones above it.

## 1. Real domain in the project

- [x] `astro.config.mjs` → `site` is the real domain (`https://odontologavivianarodriguez.com`), not
      `https://example.com` and not a preview URL (`*.netlify.app`, `*.workers.dev`,
      `*.pages.dev`).

## 2. Domain on the host

- [ ] The domain is added to the site on Netlify, and its DNS records point there.
- [ ] DNS has propagated, and the host shows the domain as verified.
- [ ] HTTPS is active on the domain, with and without `www`, and one of the two
      redirects to the other.

## 3. Email for the contact form (only if the site has a form)

- [ ] The form follows the rules in `AGENTS.md` § Contact forms.
- [ ] The API key and the addresses are environment variables on the host, never in
      the repo.
- [ ] The sending domain is verified in Resend (SPF, DKIM and DMARC at the DNS
      provider), and a test message from the form arrives.

## 4. The gate, with the real domain

- [x] `pnpm build` passes with the real `site`. No `[CLIENTE]` or other placeholder is
      left: once `site` is the real domain, `placeholder-text` is an error.
- [ ] The favicon, the logo and the `og-image` in `public/` are the client's, not the
      placeholders (the gate cannot see what an image shows).
- [x] Every entry in `shineSeo({ ignore })` still has a valid reason.

## 5. AI bot policies (only on Cloudflare)

- [ ] Security Settings → Bot traffic → AI bot policies: the *Search*, *Agent* and
      *Training* policies are decided with the client. *Search* affects search results:
      never block it without an explicit decision.
- [ ] With *Bot Preference Sync* on, Cloudflare adds its own directives in front of the
      site's `robots.txt`. Check the robots.txt the site **serves**
      (`https://odontologavivianarodriguez.com/robots.txt`), not the one in the repo. Search Console may
      flag `Content-signal` as "Syntax not understood"; according to Cloudflare, it does
      not affect crawling.
- [ ] If the zone is the agency's (`"cloudflare": "own"` in harness-tools'
      `clients.json`): the `seo-watch` WAF rule is first in the custom rules, and Bot
      Fight Mode is off (it cannot be skipped). Steps in harness-tools' README §
      Cloudflare.

## 6. Search Console

- [ ] A domain property, verified through DNS.
- [ ] The sitemap is submitted (`https://odontologavivianarodriguez.com/sitemap-index.xml`).
- [ ] URL Inspection on the home page and the key pages: indexable, and the canonical
      Google chose is the page's own URL.
- [ ] Settings → Search generative AI is on "Include" or "Inherit" (the default; check
      that nobody set it to "Exclude").

## 7. Google Business Profile (only for a local business)

- [ ] The name, address and phone match `src/config/company.ts` exactly.

## 8. Bing Webmaster Tools

- [ ] The site is imported from Search Console.

## 9. Rich Results Test

- [ ] The home page and one inner page pass with no errors.

## 10. Delivered

- [ ] `pnpm exec check-seo --url https://odontologavivianarodriguez.com` is clean on the real domain.
- [ ] The client is in harness-tools' `clients.json` with `"launched": true` and the real
      `domain`. One manual run of `seo-watch` confirms it (Actions → seo-watch → Run
      workflow, with `client` = its `id`); `"watch": true` adds it to the weekly run.
- [ ] `feature_list.json`: every launched feature has `"status": "delivered"`.
