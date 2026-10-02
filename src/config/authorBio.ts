// People: authors and founders, for E-E-A-T. One model, filled per client from the brief.
// seo.ts builds each Person JSON-LD node from it (generatePersonSchema).

export interface Author {
  slug: string; // ASCII kebab-case, unique, stable: the Person @id is <site>/#person-<slug>
  name: string;
  role: string;
  bio: string;
  image?: string; // a path on this site or an https:// URL
  credentials: string[]; // shown on the page for E-E-A-T, not emitted in the JSON-LD
  socialMedia?: Record<string, string>; // profile URLs only → sameAs
  url?: string; // the author's page on this site, as a path
}

// Source: textos-sitio.md §1 "Sobre la Dra. Viviana" (bio and credentials, verbatim)
// and arquitectura-informacion.md §1 (role). Photo pending (client-gaps.md).
export const AUTHORS: Author[] = [
  {
    slug: 'viviana-rodriguez',
    name: 'Viviana Rodríguez',
    role: 'Odontóloga, especialista en Rehabilitación Oral',
    bio: 'Ejerzo la odontología desde 2014 y me especialicé en Rehabilitación Oral en 2019 porque me permite generar transformaciones que van mucho más allá de la estética: ver a un paciente recuperar su sonrisa, su autoestima y su tranquilidad es lo que le da sentido a mi trabajo.',
    credentials: [
      'Especialista en Rehabilitación Oral desde 2019',
      'Reconocimiento al mejor trabajo de grado de su posgrado',
      'Anestesia digital y escáner intraoral',
      'Consultorio particular en Chicó, Bogotá',
    ],
  },
];
