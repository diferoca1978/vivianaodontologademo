// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import sitemap from '@astrojs/sitemap';

import shineSeo from '@shine/seo-core/integration';
import { sitemapFilter } from '@shine/seo-core/config';
import { PAGES } from './src/config/pages.ts';

// https://astro.build/config
export default defineConfig({
  // Testing clone: no custom domain. On Vercel, `site` is the project's production URL
  // (VERCEL_PROJECT_PRODUCTION_URL, set at build time, without the https:// scheme); locally
  // it falls back to the dev server. Every absolute URL comes from it through siteUrl()
  // (src/utils/url.ts). The real site's domain is odontologavivianarodriguez.com.
  site: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : 'http://localhost:4321',

  // Every page URL ends in '/'; siteUrl() in src/utils/url.ts builds them the same way.
  trailingSlash: 'always',

  // Heading slot (--font-cormorant) = Cormorant, body slot (--font-raleway) = Raleway.
  // The cssVariable names are the scaffold's slot names — kept stable on a font swap.
  fonts: [
    {
      name: "Cormorant",
      cssVariable: "--font-cormorant",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600],
      fallbacks: ["serif"],
    },
    {
      name: "Raleway",
      cssVariable: "--font-raleway",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600],
      styles: ["normal"],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: vercel(),
  // The SEO gate goes last: it reads the sitemap that @astrojs/sitemap writes at the end of the build.
  integrations: [
    sitemap({ filter: sitemapFilter(PAGES) }),
    shineSeo({
      ignore: [
        {
          rule: 'sitemap-coverage',
          reason:
            'Testing clone: every page is noindex (CLONE_NOINDEX in src/config/pages.ts), so there is no page to list and @astrojs/sitemap writes no sitemap.',
        },
      ],
    }),
  ]
});