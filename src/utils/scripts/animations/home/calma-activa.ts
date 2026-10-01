import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// Scroll reveal for src/components/perpage/home/CalmaActiva.astro.
// - Tooth logo: its two paths are drawn stroke-first (DrawSVG), then the fills fade in and the
//   stroke thins back to its authored width. Plays once when the logo enters the viewport.
// - Heading + intro rise in once the section is 70% in view.
// - Each card fades in from the bottom as it enters the viewport (ScrollTrigger.batch).
// Reduced motion: no animation, everything lands in its final, visible state.
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

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
    if (logo) {
      const paths = gsap.utils.toArray<SVGPathElement>("path", logo);
      // The logo's paths are filled shapes with a hairline stroke, so draw them with a thicker
      // stroke (first path sits in a ~3.4x scaled group) and return to the authored width after.
      const authoredWidths = paths.map((path) => parseFloat(getComputedStyle(path).strokeWidth));
      const drawWidths = [1.5, 4];

      gsap.set(paths, { fillOpacity: 0, strokeWidth: (i) => drawWidths[i] ?? 4 });

      gsap
        .timeline({
          scrollTrigger: { trigger: logo, start: "top 85%", once: true },
        })
        .fromTo(
          paths,
          { drawSVG: "0%" },
          { drawSVG: "100%", duration: 1.6, stagger: 0.35, ease: "power2.inOut" },
        )
        .to(
          paths,
          { fillOpacity: 1, strokeWidth: (i) => authoredWidths[i], duration: 0.8, ease: "power1.out" },
          "-=0.7",
        );
    }

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
