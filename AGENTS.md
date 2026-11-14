# AGENTS.md

Instructions for any coding agent working in this repository. `CLAUDE.md` only points
here.

## What this is

The website of **Dra. Viviana Rodríguez** (dentist, Rehabilitación Oral, Bogotá): an Astro
site whose SEO core comes from the `@shine/seo-core` package (absolute URLs, head tags,
JSON-LD, robots.txt and a build gate). Host: **Netlify**. Domain:
**odontologavivianarodriguez.com** (bought on Shine's Cloudflare account on 2026-11-14),
already in `astro.config.mjs`.

The package's README (`node_modules/@shine/seo-core/README.md`) documents its API and
every rule the gate checks, for the exact version this site installs.

## Commands

```sh
pnpm dev                                              # dev server at localhost:4321
pnpm build                                            # build + the SEO gate: fails on any SEO error
pnpm check                                            # astro check (types and .astro diagnostics)
pnpm preview                                          # preview the build
pnpm exec check-seo --url https://odontologavivianarodriguez.com   # the gate's rules against the live site
pnpm prettier --write .                               # formatting (no eslint)
```

There is no test runner: `pnpm build` (with the gate) and `pnpm check` are the test suite.

## Tech stack (see `package.json`)

- **Astro 7**, static output, with the `@astrojs/netlify` adapter.
- **TypeScript 6**, pinned on purpose: `astro check` refuses TypeScript 7.
  `pnpm-workspace.yaml` (`update.ignoreDeps`) keeps `pnpm up --latest` from raising it.
  Never let `astro check` install `@astrojs/check` on its own.
- **Tailwind CSS 4** through `@tailwindcss/vite`. No `tailwind.config.js`: the theme is
  `@theme` in `src/styles/global.css`.
- **`@shine/seo-core`** (pinned to a git tag) and **`@astrojs/sitemap`**.
- **GSAP 3** and **Lenis** (`src/utils/scripts/lennis.js`) for animation and smooth scroll.
- When adding Actions or content collections, import `z` from `astro/zod`.

## Where each thing lives

| What | Where |
|---|---|
| Domain and trailing-slash policy | `astro.config.mjs` (`site`, `trailingSlash: 'always'`) |
| Business data (name, contact, address, logo, profiles, hours, WhatsApp) | `src/config/company.ts` |
| People (the doctor, her credentials) | `src/config/authors.ts` |
| SEO of every page (title, description, h1, keyword, `noindex`) | `src/config/pages.ts` |
| The SEO generators, set up once | `src/config/seo.ts` |
| Absolute URLs | `src/utils/url.ts` (`siteUrl()`, `mediaUrl()`) |
| Services and FAQ copy | `src/config/services.ts`, `src/config/faqs.ts` |
| Navigation, and the pages not built yet | `src/utils/navigation.ts` |
| Brand colors and fonts | `src/styles/global.css` (`@theme`) and the fonts in `astro.config.mjs` |
| Animations | `src/utils/scripts/animations/` |
| The brief (content source of truth) | `docs/brief/`, plus `docs/source/` (reviews, privacy policy draft) |
| What is pending, done and delivered | `feature_list.json` |
| The launch checklist | `CHECKPOINTS.md` |
| What the brief did not answer, and open decisions | `client-gaps.md` |

Components: `src/components/global/` (navbar, footer), `src/components/perpage/<page>/`
(sections of one page) and `src/components/ui/` (primitives, grouped as
`ui/<category>/`). `ui/sections/` holds generic, prop-driven sections reused across pages
(e.g. `PinnedPanels.astro`): no page copy inside, the data comes from a `perpage/<page>/`
component. PascalCase file names. Route files in `src/pages/` are lowercase
kebab-case Spanish slugs.

**Fonts** are spread over three files (Astro Fonts API): `astro.config.mjs` `fonts[]`
(`name` + `provider`), the `--font-*` family in `global.css` `@theme`, and the
`<Font cssVariable>` in `src/layouts/MainLayout.astro`. The `cssVariable` name links the
three; keep it stable. Swapping a font in a slot touches the first two; adding or removing
a slot touches all three.

## SEO rules (these fail silently if ignored)

- **Every absolute URL comes from `siteUrl()` or `mediaUrl()`.** Never write the domain
  by hand. Internal links may be relative, but in the canonical form, trailing slash
  included.
- **A page's SEO lives in `pages.ts`.** The page renders `PAGES.x.h1` and passes `PAGES.x`
  to `seo.pageHead()`. `noindex: true` there is the only way to keep a page out of the
  index and the sitemap.
- **Keywords come from the brief.** If an indexable page has none, ask; never invent one.
- **JSON-LD only through `<MainLayout schemas={…}>`** (which hands them to the package's
  `<SeoHead>`), built with the `seo` generators: the full business node only on the home
  (`seo.homeNodes()`), `seo.businessRef()` elsewhere, breadcrumbs only when they are
  visible. Mark up only what the page shows and what is true. No `FAQPage`, `HowTo`,
  `SearchAction`, or self-serving reviews: the FAQs stay visible on the page, without
  markup (decided on 2026-10-16, `client-gaps.md`).
- **A link to a page that is not built yet fails the gate** (`url-resolves`). Its path
  stays in `PENDING_PAGES` (`src/utils/navigation.ts`) until the page exists; the feature
  that builds the page removes it.
- **The gate is never disabled.** Its only valve is `shineSeo({ ignore })` in
  `astro.config.mjs`, one entry per finding, each with its reason, and only with the
  maintainer's ok.
- **Data the brief does not give stays as `[CLIENTE]`** (in code and copy) and goes to
  `client-gaps.md`. `site` is already the real domain, so any `[CLIENTE]` that reaches
  the HTML fails the build.

## If the build fails on the gate

The report names the rule, the page and the URL. The rules are explained in the
package README ("The rules") and defined in `node_modules/@shine/seo-core/check-seo/rules.mjs`.
Fix the cause in the page, `pages.ts` or the config. Do not work around a rule.

## Done and delivered

- **Done:** `pnpm build` passes with the gate green, `pnpm check` is clean and the
  feature's `acceptance` is met. Set its `status` to `done` in `feature_list.json`.
- **Delivered:** the change is on `main`, deployed, and
  `pnpm exec check-seo --url https://odontologavivianarodriguez.com` is clean on the real domain.
  Only then set `status` to `delivered`. This applies to the launch and to every later
  change to the live site.
- Each feature carries `id`, `description`, `source` (the brief section its content comes
  from), `acceptance` (a checklist) and `status` (`pending`, `in_progress`, `done` or
  `delivered`). `in_progress` is set by `/spec-impl`, one feature at a time.
- Short branches, merged soon.
- Agents do not commit or push in this repo: the maintainer does.

## Building conventions

- `<meta name="viewport" content="width=device-width, initial-scale=1">` in the layout.
- Colors and fonts only from the `@theme` tokens in `src/styles/global.css`, through
  Tailwind utilities. No colors written by hand in components, no inline `style=""`, no
  arbitrary values (`h-[220px]`). Tailwind 4 gradients: `bg-linear-to-*`.
- Props typed with an `interface`. Every internal import through the `@/` alias
  (`@/*` → `./src/*`).
- Images with `<Image>` or `<Picture>` from `astro:assets`, always with `alt` (`alt=""`
  only for a decorative image). SVG icons imported from `@/assets/icons/`, never inline
  `<svg>`.
- Never hardcode client data in a component: read it from `src/config/*`.
- The page scrollbar is hidden on `<html>` in `global.css` (`scrollbar-width: none`), by the maintainer's decision on 2026-10-17. Scrolling itself must keep working.
- `public/` holds the favicon, the logo (at least 112 px) and the `og-image`.
- The Netlify adapter stays while the site may need server code (the booking spec);
  every page is prerendered.

## Animation strategy: GSAP

This site uses **GSAP** (chosen at ingest, `client-gaps.md`). Before writing an animation,
use the `gsap-*` skill that matches the technique (`gsap-core`, `gsap-timeline`,
`gsap-scrolltrigger`, `gsap-plugins`, `gsap-utils`, `gsap-performance`). No
framework-specific GSAP API (`useGSAP`): this site has no UI framework.

- **Where:** all animation code lives in `src/utils/scripts/animations/`, never inside a
  component. One folder per route (`home/`, `blanqueamiento-dental/`,
  `rehabilitacion-oral/`, `contacto/`), `global/` for what every page shares (navbar,
  footer, floating button) and `utils/` for helpers. One file per section, named after
  it (`home/hero.ts`), imported by that section's component. A script shared by several
  pages lives in `utils/` and initializes every instance by its `data-*` hook
  (`utils/pinned-panels.ts`, used by `ui/sections/PinnedPanels.astro`).
- **Reduced motion is mandatory:** every timeline is wrapped in `gsap.matchMedia()` with a
  `(prefers-reduced-motion: reduce)` branch that leaves elements in their final, visible
  state (`autoAlpha: 1`). CSS motion degrades with the `motion-reduce:` variant. Content
  is never left hidden or mid-animation.
- **Division of labor:** `front-end-astro` builds the markup without animation; the
  animation goes afterwards in its utils file.

## Spec-first: two lanes

Every change goes through one of two lanes before code. `specs/README.md` has the full
routing rule.

- **Light lane:** the answer is already written in an approved document (the brief,
  `docs/source/`, a decision in `client-gaps.md`). Add or update the `feature_list.json`
  entry with `source` and `acceptance`, then run `/spec-impl feature <id>`.
- **Full lane:** no document answers it (an infrastructure change, a design decision,
  anything client-facing that would be invented, a change to the package's API). Run
  `/spec` to draft `specs/NN-slug.md` with `Status: Draft`. A human reviews it and sets
  `Status: Approved`; no agent does. Only then does implementation start.
- Changes that need the full lane: adding or removing a dependency or the adapter, a
  dependency's major version, server Actions or an email service, a new or renamed file
  in `src/config/`, a change to folder conventions, and anything the package should do
  (that is a spec in `shine-seo-core`, not here).

Both lanes end the same way: `spec-verifier` runs every criterion for real against the
build (in the light lane, it also confirms the text cited in `source` landed), then a
human commits.

### Skill routing

- **`front-end-astro`** builds each section or component (structure, Tailwind, the
  `global.css` tokens). Once per section.
- **`seo-guide-lines`** closes each page: its `pages.ts` entry, its JSON-LD, the one-`<h1>`
  rule, internal links and AI-search readiness.
- Order per page: every section with `front-end-astro`, then the page with
  `seo-guide-lines`.

### Delegate vs. handle inline

`/spec-impl` delegates each code step to the `coder` subagent (`.claude/agents/coder.md`)
and keeps the branch, the diff review and the pauses in the main session. A subagent
starts cold, so delegate only substantial, self-contained work; small edits, lookups and
any visual work that depends on an attached image stay inline. No subagent commits or
pushes.

## Contact forms

1. Recipient and sender addresses come only from environment variables, with no default
   in code. If one is missing, sending fails with a visible error.
2. Each client has its own email API key (Resend). Keys are never shared.
3. The form has a honeypot field. The server silently discards any submission that
   fills it.
4. The server validates every field for length and format, the phone included.
5. Escape all visitor input before inserting it into the email HTML.
6. Never send email to the address the visitor typed. Use it only as `replyTo`.
7. If sending fails, the visitor sees an error, never a success message.
8. Add Cloudflare Turnstile only once real spam appears.
