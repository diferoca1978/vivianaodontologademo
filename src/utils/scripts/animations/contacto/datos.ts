import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll reveal for src/components/perpage/contacto/Datos.astro (same language as
// src/utils/scripts/animations/blanqueamiento-dental/seguridad.ts).
// Every [data-datos-item] (heading, contact details, map card, payments, socials) fades up once,
// when it enters the viewport; items that enter together are staggered in a batch, so the
// side-by-side layout on lg and the stacked one below it both read in order.
// Nothing is hidden by CSS: gsap.set() hides them from JS, so without JS everything is visible.
// Reduced motion: no animation; everything lands in its final, visible state.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#datos-de-contacto");
const items = section
  ? gsap.utils.toArray<HTMLElement>("[data-datos-item]", section)
  : [];

if (section && items.length) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.set(items, { autoAlpha: 0, y: 24 });

    const triggers = ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          overwrite: true,
        }),
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  });
}
