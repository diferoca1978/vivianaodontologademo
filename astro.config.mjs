// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

import shineSeo from '@shine/seo-core/integration';
import { sitemapFilter } from '@shine/seo-core/config';
import { PAGES } from './src/config/pages.ts';

// https://astro.build/config
export default defineConfig({
  // The client's domain. Every absolute URL comes from it through siteUrl() (src/utils/url.ts).
  site: 'https://vivianaodontologa.com',

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

  adapter: netlify(),
  // The SEO gate goes last: it reads the sitemap that @astrojs/sitemap writes at the end of the build.
  integrations: [sitemap({ filter: sitemapFilter(PAGES) }), shineSeo()]
});