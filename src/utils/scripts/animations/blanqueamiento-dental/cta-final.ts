import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawToothLogo } from "@/utils/scripts/animations/utils/draw-tooth-logo";

// Scroll reveal for src/components/perpage/blanqueamiento/CtaFinal.astro, the same treatment as
// src/utils/scripts/animations/home/cta-final.ts:
// - Tooth logo: drawn in once with the shared helper
//   (src/utils/scripts/animations/utils/draw-tooth-logo.ts), on its own trigger.
// - Heading and WhatsApp button (data-cta-final-head): fade up one after the other, once, when the
//   section enters the viewport. The button is visible and clickable as soon as its fade starts
//   (autoAlpha sets visibility back to inherit) and stays that way.
// Nothing is hidden by CSS: gsap.from() sets the start state from JS, so without JS everything is
// visible. Reduced motion: no animation; the heading and button land in their final, visible state
// and the logo is left untouched.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#cta-final");

if (section) {
  const logo = section.querySelector<SVGElement>("[data-cta-final-logo]");
  const head = gsap.utils.toArray<HTMLElement>(
    "[data-cta-final-head]",
    section,
  );
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    if (head.length) gsap.set(head, { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (logo) drawToothLogo(logo);

    if (!head.length) return;

    gsap.from(head, {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 72%", once: true },
    });
  });
}
