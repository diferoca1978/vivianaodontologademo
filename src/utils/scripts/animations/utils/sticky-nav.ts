// Shared height helpers for scripts that pin a stage under the sticky NavBar
// (pinned-panels.ts and rehabilitacion-oral/cuando-tratamientos.ts, spec 05).

// The site's only sticky header (src/components/global/NavBar.astro).
const nav = document.querySelector<HTMLElement>("header");

// Read on every refresh (resize, orientation, font/image load), never cached.
export const navHeight = () => nav?.offsetHeight ?? 0;
export const stageHeight = () => window.innerHeight - navHeight();
