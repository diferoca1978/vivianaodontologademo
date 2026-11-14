import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll reveal for src/components/perpage/home/Testimonios.astro, as in CalmaActiva.
// - Heading rises in once the section is 70% in view.
// - Each review card fades in from the bottom as it enters the viewport (ScrollTrigger.batch),
//   once; cards that enter together (same row) are staggered by the batch.
// Reduced motion: no animation, everything lands in its final, visible state.
gsap.registerPlugin(ScrollTrigger);

const section = document.querySelector<HTMLElement>("#testimonios");

if (section) {
  const head = gsap.utils.toArray<HTMLElement>("[data-testimonios-head]", section);
  const items = gsap.utils.toArray<HTMLElement>("[data-testimonios-item]", section);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set([...head, ...items], { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (head.length) {
      gsap.from(head, {
        autoAlpha: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%", once: true },
      });
    }

    if (!items.length) return;

    gsap.set(items, { autoAlpha: 0, y: 40 });
    ScrollTrigger.batch(items, {
      start: "top 88%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }),
    });
  });
}
