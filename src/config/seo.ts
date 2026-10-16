import { createSeo } from '@shine/seo-core';
import { COMPANY, LOCALE } from './company';
import { AUTHORS } from './authors';
import { mediaUrl, siteUrl } from '@/utils/url';

// The head and JSON-LD generators, set up once with this site's data.
// API and rules: node_modules/@shine/seo-core/README.md.

export const seo = createSeo({ company: COMPANY, authors: AUTHORS, locale: LOCALE, siteUrl, mediaUrl });
