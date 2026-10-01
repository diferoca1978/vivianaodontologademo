import gsap from "gsap";

// Load-in entrance for src/components/perpage/home/Hero.astro.
// The copy rises in, then the highlights; the photo settles from a slight zoom without a
// fade, so it stays visible from the first paint (it is the LCP image on desktop).
// Reduced motion: no animation, everything lands in its final, visible state.
const items = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
const highlights = gsap.utils.toArray<HTMLElement>("[data-hero-highlight]");
const image = document.querySelector<HTMLElement>("[data-hero-image]");

if (items.length) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set([...items, ...highlights], { autoAlpha: 1, clearProps: "transform" });
    if (image) gsap.set(image, { clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.addLabel("copy", 0)
      .from(items, { autoAlpha: 0, y: 24, duration: 0.8, stagger: 0.1 }, "copy")
      .from(highlights, { autoAlpha: 0, y: 16, duration: 0.6, stagger: 0.08 }, "copy+=0.6");

    if (image) {
      tl.from(image, { scale: 1.06, duration: 1.6, ease: "power2.out" }, "copy");
    }
  });
}
