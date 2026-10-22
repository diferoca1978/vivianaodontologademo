import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll reveal for src/components/perpage/blanqueamiento/Contraindicaciones.astro (same language
// as src/utils/scripts/animations/home/cta-final.ts). Three groups, each with its own trigger and
// played once:
// - Head (h2 + lead-in, data-contraindicaciones-head): fade up one after the other when the
//   section enters the viewport.
// - The five cases (data-contraindicaciones-item): fade up staggered when the first one enters.
// - CTA panel (data-contraindicaciones-cta): fades up when it enters. The Rehabilitación Oral link
//   inside it is visible and clickable as soon as the fade starts (autoAlpha sets visibility back
//   to inherit) and stays that way.
// Sticky column: the head hooks sit on the children of the `lg:sticky` wrapper, never on the
// wrapper itself, so it never gets a transform. The head's trigger is the section, not a sticky
// element, so a refresh never measures a stuck position. No pin anywhere.
// Nothing is hidden by CSS: gsap.from() sets the start state from JS, so without JS everything is
// visible. Reduced motion: no animation; everything lands in its final, visible state.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#contraindicaciones");

if (section) {
  const head = gsap.utils.toArray<HTMLElement>(
    "[data-contraindicaciones-head]",
    section,
  );
  const items = gsap.utils.toArray<HTMLElement>(
    "[data-contraindicaciones-item]",
    section,
  );
  const cta = section.querySelector<HTMLElement>(
    "[data-contraindicaciones-cta]",
  );
  const targets = cta ? [...head, ...items, cta] : [...head, ...items];

  if (targets.length) {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(targets, { autoAlpha: 1, clearProps: "transform" });
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      if (head.length) {
        gsap.from(head, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%", once: true },
        });
      }

      if (items.length) {
        gsap.from(items, {
          autoAlpha: 0,
          y: 24,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: items[0], start: "top 85%", once: true },
        });
      }

      if (cta) {
        gsap.from(cta, {
          autoAlpha: 0,
          y: 32,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: cta, start: "top 85%", once: true },
        });
      }
    });
  }
}
