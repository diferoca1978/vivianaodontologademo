import type { Author } from '@shine/seo-core';

// People: authors and founders, for E-E-A-T. seo.personNode() builds each Person node
// from them; the Person @id is <site>/#person-<slug>.

// credentials are shown on the page for E-E-A-T and never reach the JSON-LD.

interface SiteAuthor extends Author {
  credentials: string[];
}

// Source: textos-sitio.md §1 "Sobre la Dra. Viviana" (bio and credentials, verbatim)
// and arquitectura-informacion.md §1 (role). Photo pending (client-gaps.md).
export const AUTHORS: SiteAuthor[] = [
  {
    slug: 'viviana-rodriguez',
    name: 'Viviana Rodríguez',
    role: 'Odontóloga, especialista en Rehabilitación Oral',
    bio: 'Ejerzo la odontología desde 2014 y me especialicé en Rehabilitación Oral en 2019 porque me permite generar transformaciones que van mucho más allá de la estética: ver a un paciente recuperar su sonrisa, su autoestima y su tranquilidad es lo que le da sentido a mi trabajo.',
    credentials: [
      'Especialista en Rehabilitación Oral desde 2019',
      'Anestesia digital',
      'Consultorio particular en Chicó, Bogotá',
    ],
  },
];
