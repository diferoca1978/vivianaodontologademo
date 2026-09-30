// =============================================================================
// SERVICES CONFIGURATION
// src/config/services.ts
// =============================================================================

export interface Service {
  slug: string;
  title: string;
  description: string;
  seoDescription: string;
  image?: string;
  icon?: string;
  benefits?: string[];
}

// Services with their own page (/<slug>/). Source: textos-sitio.md §1 (card copy),
// §2 and §3 (meta descriptions, benefits).
export const services: Service[] = [
  {
    slug: 'blanqueamiento-dental',
    title: 'Blanqueamiento Dental',
    description:
      'Una sonrisa más blanca, sin ansiedad ni sorpresas. Uno de nuestros tratamientos más solicitados.',
    seoDescription:
      'Blanqueamiento dental profesional en Bogotá (Chicó), en un consultorio pensado para tu calma. Resultados visibles, sin dolor y con seguimiento personalizado.',
    benefits: [
      'Sonrisa notablemente más luminosa',
      'Procedimiento no invasivo',
      'Mejora visible en la autoestima',
      'Resultados en pocas sesiones',
    ],
  },
  {
    slug: 'rehabilitacion-oral',
    title: 'Rehabilitación Oral',
    description:
      'La especialidad de la Dra. Viviana: recuperar función y estética a la vez, con un enfoque cálido.',
    seoDescription:
      'Especialista en Rehabilitación Oral en Bogotá. Recupera función y estética dental con tecnología de punta, cero dolor y un enfoque cálido. Agenda tu cita.',
  },
];

// Services with no page of their own: a short card on / with its own anchor
// (e.g. /#implantes). Source: arquitectura-informacion.md §3.
// description stays absent until the client sends it (brief §7, client-gaps.md).
export interface ServiceCard {
  slug: string; // the anchor id on /
  title: string;
  description?: string; // 1-2 lines
}

export const serviceCards: ServiceCard[] = [
  { slug: 'odontologia-general', title: 'Odontología General' },
  { slug: 'odontologia-estetica', title: 'Odontología Estética' },
  { slug: 'implantes', title: 'Implantes' },
  { slug: 'coronas-en-zirconio', title: 'Coronas en Zirconio' },
  { slug: 'incrustaciones-dentales', title: 'Incrustaciones Dentales' },
  { slug: 'placas-de-bruxismo', title: 'Placas de Bruxismo' },
  { slug: 'protesis-removibles', title: 'Prótesis Removibles' },
  { slug: 'diseno-de-sonrisa', title: 'Diseño de Sonrisa' },
];
