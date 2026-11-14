import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll reveal for src/components/perpage/rehabilitacion/EnlaceCruzado.astro (feature
// rehabilitacion-enlace-cruzado), the same motion as the CTA panel in
// src/utils/scripts/animations/blanqueamiento-dental/contraindicaciones.ts.
// - CTA panel (data-enlace-cruzado-cta): fades up once when it enters the viewport. The
//   Blanqueamiento Dental link inside it is visible and clickable as soon as the fade starts
//   (autoAlpha sets visibility back to inherit) and stays that way.
// The section sits after ComoSeHace's pinned stage; its ScrollTrigger is created after that one
// (page order), so a refresh measures it below the pin spacer. No pin here.
// Nothing is hidden by CSS: gsap.from() sets the start state from JS, so without JS the panel is
// visible. Reduced motion: no animation; the panel lands in its final, visible state.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#enlace-cruzado");
const cta = section?.querySelector<HTMLElement>("[data-enlace-cruzado-cta]");

if (cta) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(cta, { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.from(cta, {
      autoAlpha: 0,
      y: 32,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: cta, start: "top 85%", once: true },
    });
  });
}
