import type { PageSeo } from '@shine/seo-core';

// The SEO of every page: the single source of its title, description and h1. The page
// renders PAGES.x.h1 and passes PAGES.x to seo.pageHead(). keyword and source are never
// published. astro.config.mjs imports this file, so it may only import types.
//
// keyword: arquitectura-informacion.md §5. title, description and h1: textos-sitio.md, verbatim (Blanqueamiento h1: textos-blanqueamiento.md).
// pageHead() adds " | Dra. Viviana Rodríguez" unless the title already holds the name.
// The privacy page joins once its slug and text are confirmed (feature page-privacidad).

export const PAGES = {
  home: {
    path: '/',
    keyword: 'odontóloga especialista en Bogotá / odontología sin dolor Bogotá',
    title: 'Odontóloga en Bogotá — Especialista en Rehabilitación Oral | Dra. Viviana Rodríguez',
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
    title: 'Rehabilitación Oral en Bogotá | Especialista — Dra. Viviana',
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
      'Consultorio en Bogotá (Chicó). Resolvemos tus dudas antes de tu primera visita.',
    h1: 'Agenda tu Cita',
    source: 'textos-sitio.md §4',
  },
} satisfies Record<string, PageSeo>;
