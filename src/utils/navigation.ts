// Header nav — arquitectura-informacion.md §3. The "Agendar Cita" CTA links to
// COMPANY.whatsapp, so it is not an entry here.
const NAVIGATION = [
  { name: "Inicio", path: "/" },
  { name: "Blanqueamiento Dental", path: "/blanqueamiento-dental/" },
  { name: "Rehabilitación Oral", path: "/rehabilitacion-oral/" },
  { name: "Contacto", path: "/contacto/" },
];

// Pages from the brief that are not built yet. The SEO gate fails the build on a link to a
// page that does not exist (url-resolves), so the nav, the footer and the service cards hide
// these links until the page exists. The feature that builds a page removes its path here.
const PENDING_PAGES = ["/rehabilitacion-oral/"];

export function isBuilt(path: string): boolean {
  return !PENDING_PAGES.includes(path);
}

export const MainNavigation = NAVIGATION.filter((l) => isBuilt(l.path));
