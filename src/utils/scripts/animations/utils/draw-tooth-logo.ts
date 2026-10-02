import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

// Scroll-triggered draw-in for the tooth logo (src/assets/icons/tooth-logo.svg), shared by the
// sections that show it above their heading (home CalmaActiva and Sobre).
// Its two paths are drawn stroke-first (DrawSVG), then the fills fade in and the stroke thins
// back to its authored width. Plays once when the logo's top reaches 85% of the viewport.
// Full motion only: call it inside a gsap.matchMedia() "(prefers-reduced-motion: no-preference)"
// branch so the media context reverts it. With reduced motion, don't call it: the logo is left
// untouched and fully visible.
export const drawToothLogo = (logo: SVGElement): gsap.core.Timeline => {
  const paths = gsap.utils.toArray<SVGPathElement>("path", logo);
  // The logo's paths are filled shapes with a hairline stroke, so draw them with a thicker
  // stroke (first path sits in a ~3.4x scaled group) and return to the authored width after.
  const authoredWidths = paths.map((path) =>
    parseFloat(getComputedStyle(path).strokeWidth),
  );
  const drawWidths = [1.5, 4];

  gsap.set(paths, { fillOpacity: 0, strokeWidth: (i) => drawWidths[i] ?? 4 });

  return gsap
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
      {
        fillOpacity: 1,
        strokeWidth: (i) => authoredWidths[i],
        duration: 0.8,
        ease: "power1.out",
      },
      "-=0.7",
    );
};
