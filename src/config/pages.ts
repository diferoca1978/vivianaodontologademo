import type { PageSeo } from '@shine/seo-core';

// The SEO of every page: the single source of its title, description and h1. The page
// renders PAGES.x.h1 and passes PAGES.x to seo.pageHead(). keyword and source are never
// published. astro.config.mjs imports this file, so it may only import types.
//
// keyword: arquitectura-informacion.md §5. title, description and h1: textos-sitio.md, verbatim (Blanqueamiento h1: textos-blanqueamiento.md).
// pageHead() adds " | Dra. Viviana Rodríguez" unless the title already holds the name.
// privacidad: h1 is the source's title; title and description are drawn from its content.
// Its text still carries the client's placeholders (feature page-privacidad): do not publish yet.

export const PAGES = {
  home: {
    path: '/',
    keyword: 'odontóloga especialista en Bogotá / odontología sin dolor Bogotá',
    title: 'Odontóloga en Bogotá, Rehabilitación Oral',
    description:
      'Odontología de Calma Activa en Bogotá (Chicó). Rehabilitación oral, blanqueamiento y diseño de sonrisa con tecnología sin dolor. Agenda tu cita hoy.',
    h1: 'Odontóloga en Bogotá, especialista en Rehabilitación Oral',
    source: 'textos-sitio.md §1',
  },
  blanqueamiento: {
    path: '/blanqueamiento-dental/',
    keyword: 'blanqueamiento dental Bogotá',
    title: 'Blanqueamiento Dental en Bogotá | Dra. Viviana Rodríguez',
    description:
      'Blanqueamiento dental profesional en Bogotá (Chicó), en un consultorio pensado para tu calma. Resultados visibles, sin dolor y con seguimiento personalizado.',
    h1: 'Blanqueamiento Dental en Bogotá',
    source: 'textos-sitio.md §2 (title, description); textos-blanqueamiento.md (h1)',
  },
  rehabilitacion: {
    path: '/rehabilitacion-oral/',
    keyword: 'rehabilitación oral Bogotá',
    title: 'Rehabilitación Oral en Bogotá',
    description:
      'Especialista en Rehabilitación Oral en Bogotá. Recupera función y estética dental con tecnología de punta, cero dolor y un enfoque cálido. Agenda tu cita.',
    h1: 'Rehabilitación Oral en Bogotá',
    source: 'textos-sitio.md §3',
  },
  contacto: {
    path: '/contacto/',
    keyword: 'citas odontología Chicó Bogotá / contacto odontóloga Bogotá',
    title: 'Contacto y Citas | Dra. Viviana Rodríguez — Odontóloga Bogotá',
    description:
      'Agenda tu cita con la Dra. Viviana Rodríguez en Bogotá. WhatsApp, dirección, mapa y horarios de atención. Resolvemos tus dudas antes de tu primera visita.',
    h1: 'Agenda tu Cita',
    source: 'textos-sitio.md §4',
  },
  privacidad: {
    path: '/politica-de-privacidad/',
    // Legal page: noindex (seo-guide-lines), so it has no keyword and stays out of the sitemap.
    noindex: true,
    title: 'Política de Privacidad',
    description:
      'Cómo se tratan los datos personales que compartes por los canales de contacto: finalidades, datos de salud, conservación y tus derechos de Habeas Data.',
    h1: 'Política de Tratamiento de Datos Personales y Privacidad',
    source: 'docs/source/politica-privacidad-estructura.md',
  },
} satisfies Record<string, PageSeo>;
