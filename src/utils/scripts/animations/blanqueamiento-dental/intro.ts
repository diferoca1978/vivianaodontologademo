import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawToothLogo } from "@/utils/scripts/animations/utils/draw-tooth-logo";

// Scroll reveal for src/components/perpage/blanqueamiento/Intro.astro (same language as
// src/utils/scripts/animations/home/sobre.ts).
// - Tooth logo behind the text: drawn in once with the shared helper
//   (src/utils/scripts/animations/utils/draw-tooth-logo.ts), on its own trigger. The helper only
//   animates the logo's paths, so the svg's centering translate classes are left alone.
// - Quote mark, paragraph and turquoise rule (data-intro-item, in that DOM order): fade up one
//   after another, once, when the quote mark enters the viewport.
// Nothing is hidden by CSS: gsap.from() sets the start state from JS, so without JS everything is
// visible. Reduced motion: no animation; the items land in their final, visible state and the
// logo is left untouched.
gsap.registerPlugin(ScrollTrigger);

const logo = document.querySelector<SVGElement>("[data-intro-logo]");
const items = gsap.utils.toArray<HTMLElement>("[data-intro-item]");

if (logo || items.length) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    if (items.length)
      gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (logo) drawToothLogo(logo);

    if (!items.length) return;

    gsap.from(items, {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
    });
  });
}
