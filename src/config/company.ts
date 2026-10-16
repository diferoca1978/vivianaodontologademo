import type { Company } from '@shine/seo-core';

// The business and the site locale. Data, and the types that only this site needs.
// The generators come from @shine/seo-core through src/config/seo.ts.

// Locale — <html lang>, og:locale and WebSite.inLanguage derive from it.

export const LOCALE = 'es-CO'; // BCP 47

// Opening hours: one entry per group of days that share the same times. A day in no
// entry is closed. Times are 24-hour "HH:MM", local time.

export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export interface OpeningHours {
  days: DayOfWeek[];
  opens: string; // "HH:MM"
  closes: string; // "HH:MM"
}

// What the site shows beyond the package's Company type. None of it reaches the JSON-LD
// yet: listingName and openingHours wait on client-gaps.md D2.

interface SiteCompany extends Company {
  listingName?: string; // the name on the Google Business Profile, when it differs from name
  whatsapp: string;
  openingHours?: OpeningHours[];
  socialMedia: Record<string, string>; // profile URLs only → sameAs
}

// Source: docs/brief/arquitectura-informacion.md §1, textos-sitio.md §1, brand.md. listingName,
// geo, openingHours and socialMedia.googleBusiness come from the Google Business Profile (2026-10-02).
// NAP: always "Cra 15 # 104-30, Consultorio 302" (never "Carrera"), per brief §1, even though
// the profile writes "Ak 15".
// openingHours still need the client's confirmation (client-gaps.md #1).
// Pending (client-gaps.md): postal code, og-image, vector logo.

export const COMPANY: SiteCompany = {
  name: 'Dra. Viviana Rodríguez',
  listingName: 'Consultorio Viviana Rodríguez',
  description:
    'Odontología de Calma Activa: cuidamos tu sonrisa y tu tranquilidad. Consultorio particular en Bogotá, con tecnología sin dolor y atención personalizada.',
  phone: '+57 302 544 5760',
  email: 'vivianarodriguezod@gmail.com',
  whatsapp: 'https://wa.me/573025445760',
  business: {
    kind: 'local',
    type: 'Dentist',
    address: {
      street: 'Cra 15 # 104-30, Consultorio 302',
      city: 'Bogotá',
      region: 'Bogotá D.C.',
      countryCode: 'CO',
    },
    geo: { latitude: 4.6889867, longitude: -74.0466053 },
  },
  openingHours: [
    { days: ['Tuesday', 'Thursday'], opens: '14:00', closes: '19:00' },
    { days: ['Wednesday', 'Saturday'], opens: '08:00', closes: '13:00' },
    { days: ['Friday'], opens: '08:00', closes: '14:00' },
  ],
  logo: '/images/logo.png',
  image: '/images/og-image.png',
  foundingDate: '2023-04',
  founders: ['viviana-rodriguez'],
  socialMedia: {
    instagram: 'https://www.instagram.com/dra.vivianarodriguez_/',
    tiktok: 'https://www.tiktok.com/@dra.vivianarodriguez_',
    googleBusiness: 'https://www.google.com/maps?cid=13310363482939215067',
  },
};
