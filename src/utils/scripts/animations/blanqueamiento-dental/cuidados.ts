import gsap from "gsap";
import { drawToothLogo } from "@/utils/scripts/animations/utils/draw-tooth-logo";

// Tooth logo above the h2 of src/components/perpage/blanqueamiento/Cuidados.astro: drawn in on
// scroll with the shared helper (see src/utils/scripts/animations/utils/draw-tooth-logo.ts).
// Reduced motion: not called, the logo stays fully visible.
const logo = document.querySelector<SVGElement>("[data-cuidados-logo]");

if (logo) {
  gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
    drawToothLogo(logo);
  });
}
