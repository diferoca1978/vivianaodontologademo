import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll reveal for src/components/perpage/blanqueamiento/Seguridad.astro (same language as
// src/utils/scripts/animations/home/cta-final.ts).
// The question (h2) fades up first and the answer block, with its turquoise rule, follows it, once,
// when the section enters the viewport. Side by side on lg, stacked below it; one trigger for both
// keeps the question-then-answer order at every breakpoint.
// Nothing is hidden by CSS: gsap.from() sets the start state from JS, so without JS everything is
// visible. Reduced motion: no animation; both land in their final, visible state.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#seguridad");

if (section) {
  // Question first, then answer: the stagger below relies on this order.
  const blocks = [
    ...gsap.utils.toArray<HTMLElement>("[data-seguridad-question]", section),
    ...gsap.utils.toArray<HTMLElement>("[data-seguridad-answer]", section),
  ];

  if (blocks.length) {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(blocks, { autoAlpha: 1, clearProps: "transform" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(blocks, {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 72%", once: true },
      });
    });
  }
}
