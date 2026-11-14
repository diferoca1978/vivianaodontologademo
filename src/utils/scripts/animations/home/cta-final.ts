import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawToothLogo } from "@/utils/scripts/animations/utils/draw-tooth-logo";

// Scroll reveal for src/components/perpage/home/CtaFinal.astro. The logo uses the same shared
// DrawSVG treatment as CalmaActiva; reduced-motion users see the complete CTA immediately.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#cta-final");

if (section) {
  const logo = section.querySelector<SVGElement>("[data-cta-final-logo]");
  const head = gsap.utils.toArray<HTMLElement>("[data-cta-final-head]", section);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(head, { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (logo) drawToothLogo(logo);

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
