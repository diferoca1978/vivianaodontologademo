# docs/brief/: the client brief

The content source of truth for this site. Three files, all required:

| File | What it holds | Where it lands |
|---|---|---|
| `arquitectura-informacion.md` | Business data, site structure, navigation, and the **SEO table** (one row per page: slug, keyword, intent, title, description, h1) | `src/config/company.ts`, `authors.ts`, `pages.ts`, `feature_list.json` |
| `textos-sitio.md` | The copy of every page, section by section (`## 1. Home (/)`, `### Hero`…) | The pages and components; each feature's `source` cites a section of it |
| `brand.md` | Value proposition, tone, palette, fonts, logo, photos, and whether the site needs animation | `src/styles/global.css` (`@theme`), the fonts, `public/` |

This site's brief predates that layout: the SEO table (`arquitectura-informacion.md` §5)
holds the keyword and the intent, and each page's meta title, meta description and h1 are
in `textos-sitio.md`. `docs/source/` holds material the client supplied later (the Google
reviews, the privacy policy draft).

Rules:

- **Keywords come from the client or the maintainer**, in the SEO table. An agent never
  proposes or invents one. If an indexable page has no keyword, the agent asks.
- **Nothing the brief does not say gets invented.** A missing phone, address, schedule,
  photo or text stays as `[CLIENTE]` in the code and is listed in `client-gaps.md` at the
  repo root.
- The business name, address and phone (NAP) are written **exactly the same** everywhere:
  in the brief, in `company.ts`, on the page and in Google Business Profile.
