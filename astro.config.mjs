// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Placeholder — the provisioning script rewrites this per client
  // (sed s|site: 'https://vivianaodontologa.com'|...|). Required by robots.txt.ts and @astrojs/sitemap.
  site: 'https://vivianaodontologa.com',

  // Every page URL ends in '/'; siteUrl() in src/utils/url.ts builds them the same way.
  trailingSlash: 'always',

  // Heading slot (--font-jakarta) = Cormorant, body slot (--font-nunito) = Raleway.
  // The cssVariable names are the scaffold's slot names — kept stable on a font swap.
  fonts: [
    {
      name: "Cormorant",
      cssVariable: "--font-jakarta",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600],
      fallbacks: ["serif"],
    },
    {
      name: "Raleway",
      cssVariable: "--font-nunito",
      provider: fontProviders.fontsource(),
      weights: [400, 500, 600],
      styles: ["normal"],
    },
  ],

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: netlify(),
  integrations: [sitemap()]
});