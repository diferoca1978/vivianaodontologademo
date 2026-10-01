// Client data: the company, its business kind and the site locale.
// Data and the types that shape it only, with no imports. The generators live in seo.ts.

// Locale — <html lang>, og:locale and WebSite.inLanguage derive from it.

export const LOCALE = 'es-CO'; // BCP 47

// The LocalBusiness subtypes a `local` business may use. Add a subtype when a client's
// brief needs one, and add it to LOCAL_BUSINESS_TYPES in harness/check-seo.mjs as well,
// or `local-address` will not check it.

export type LocalBusinessType = 'LocalBusiness' | 'LegalService' | 'Dentist';

// remote: the client receives no visitors at an address, so it cannot hold a street,
// a postal code or geo. local: a real address that the site shows.

export type Business =
  | {
      kind: 'remote';
      address?: { city: string; region: string; countryCode: string };
    }
  | {
      kind: 'local';
      type: LocalBusinessType;
      address: {
        street: string;
        city: string;
        region: string;
        postalCode?: string;
        countryCode: string; // ISO 3166-1 alpha-2
      };
      geo?: { latitude: number; longitude: number };
    };

export interface CompanyInfo {
  name: string;
  description: string;
  phone: string;
  email: string;
  whatsapp: string;
  business: Business;
  logo: string; // a path on this site or an https:// URL
  image: string; // a path on this site or an https:// URL
  foundingDate?: string;
  founders?: string[]; // Author slugs from authorBio.ts, not names
  socialMedia: Record<string, string>; // profile URLs only → sameAs
}

// Company config — customize per project. Replace every marked placeholder from the
// brief / client-gaps.md. Optional fields ship absent: add them only when the client has them.

// Source: docs/brief/arquitectura-informacion.md §1, textos-sitio.md §1, brand.md.
// NAP: always "Cra 15 # 104-30, Consultorio 302" (never "Carrera"), per brief §1.
// Pending (client-gaps.md): opening hours, geo, postal code, og-image, vector logo.

export const COMPANY_INFO: CompanyInfo = {
  name: 'Dra. Viviana Rodríguez',
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
  },
  logo: '/images/logo.png',
  image: '/images/og-image.png',
  foundingDate: '2023-04',
  founders: ['viviana-rodriguez'],
  socialMedia: {
    instagram: 'https://www.instagram.com/dra.vivianarodriguez_/',
    tiktok: 'https://www.tiktok.com/@dra.vivianarodriguez_',
  },
};
