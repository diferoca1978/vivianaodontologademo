import gsap from "gsap";

// Load-in entrance for src/components/perpage/rehabilitacion/Hero.astro (the same as
// src/utils/scripts/animations/blanqueamiento-dental/hero.ts, minus the highlights this hero
// does not have).
// - Copy: the subtitle, the h1 and the intro rise in one after the other, then the CTA.
// - Photo: settles from a slight zoom without a fade, so it stays visible from the first paint
//   (it is the priority/LCP image). Its wrapper is overflow-hidden, so the zoom is clipped.
// Nothing is hidden by CSS: gsap.from() sets the start state from JS, so without JS everything
// is visible. Reduced motion: no animation, everything lands in its final, visible state.
const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
const cta = document.querySelector<HTMLElement>("[data-hero-cta]");
const image = document.querySelector<HTMLElement>("[data-hero-image]");

if (items.length) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(cta ? [...items, cta] : items, { autoAlpha: 1, clearProps: "transform" });
    if (image) gsap.set(image, { clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.addLabel("copy", 0).from(
      items,
      { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 },
      "copy",
    );

    if (cta) tl.from(cta, { autoAlpha: 0, y: 16, duration: 0.6 }, "copy+=0.6");

    if (image) {
      tl.from(
        image,
        { scale: 1.06, duration: 1.6, ease: "power2.out" },
        "copy",
      );
    }
  });
}
