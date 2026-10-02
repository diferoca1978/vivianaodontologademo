import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawToothLogo } from "@/utils/scripts/animations/utils/draw-tooth-logo";

// Scroll reveal for src/components/perpage/home/CalmaActiva.astro.
// - Tooth logo: its two paths are drawn stroke-first (DrawSVG), then the fills fade in and the
//   stroke thins back to its authored width. Plays once when the logo enters the viewport.
//   Shared with Sobre, see src/utils/scripts/animations/utils/draw-tooth-logo.ts.
// - Heading + intro rise in once the section is 70% in view.
// - Each card fades in from the bottom as it enters the viewport (ScrollTrigger.batch).
// Reduced motion: no animation, everything lands in its final, visible state.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#calma-activa");

if (section) {
  const logo = section.querySelector<SVGElement>("[data-calma-logo]");
  const head = gsap.utils.toArray<HTMLElement>("[data-calma-head]", section);
  const items = gsap.utils.toArray<HTMLElement>("[data-calma-item]", section);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set([...head, ...items], { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (logo) drawToothLogo(logo);

    gsap.from(head, {
      autoAlpha: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: { trigger: section, start: "top 70%", once: true },
    });

    // Each card fades in from below as it enters the viewport; cards that enter together
    // (same row) are staggered by the batch.
    gsap.set(items, { autoAlpha: 0, y: 40 });
    ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }),
    });
  });
}
