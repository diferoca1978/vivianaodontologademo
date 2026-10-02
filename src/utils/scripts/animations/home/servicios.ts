import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll reveal for src/components/perpage/home/Servicios.astro.
// - The headings (h2 and "También ofrecemos") and every card (2 featured + 8 short) fade in
//   from the bottom as they enter the viewport. ScrollTrigger.batch groups the ones that enter
//   together (same row) and staggers them; each plays once.
// Reduced motion: no animation, everything lands in its final, visible state.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#servicios");

if (section) {
  // One selector so the elements come back in page order (headings interleaved with cards).
  const items = gsap.utils.toArray<HTMLElement>(
    "[data-servicios-head], [data-servicios-card]",
    section,
  );
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    gsap.set(items, {
      autoAlpha: 0,
      y: (_i: number, el: HTMLElement) =>
        el.hasAttribute("data-servicios-card") ? 40 : 24,
    });

    ScrollTrigger.batch(items, {
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
  });
}
