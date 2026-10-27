import gsap from "gsap";

// Load-in entrance for src/components/perpage/contacto/Hero.astro (same language as
// src/utils/scripts/animations/blanqueamiento-dental/hero.ts).
// - Copy: the h1 and the intro rise in one after the other.
// - Photo: settles from a slight zoom without a fade, so it stays visible from the first paint
//   (it is the priority/LCP image). Its wrapper is overflow-hidden, so the zoom is clipped.
// Nothing is hidden by CSS: gsap.from() sets the start state from JS, so without JS everything
// is visible. Reduced motion: no animation, everything lands in its final, visible state.
const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
const image = document.querySelector<HTMLElement>("[data-hero-image]");

if (items.length) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
    if (image) gsap.set(image, { clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(items, { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.12 }, 0);

    if (image) {
      tl.from(image, { scale: 1.06, duration: 1.6, ease: "power2.out" }, 0);
    }
  });
}
