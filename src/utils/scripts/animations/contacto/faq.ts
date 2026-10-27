import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Open/close animation for the native <details> in
// src/components/perpage/contacto/Faq.astro (feature contacto-faq), the same motion as
// src/utils/scripts/animations/rehabilitacion-oral/faq.ts and blanqueamiento-dental/faq.ts. The answer's height and opacity
// tween together; on close, `open` is removed only after the tween ends so the native disclosure cannot cut it off.
// A click mid-animation reverses from wherever the answer is. Reduced motion keeps the plain native
// toggle (no listeners, no inline styles).
gsap.registerPlugin(ScrollTrigger);

const root = document.querySelector<HTMLElement>("#preguntas-frecuentes");
const items = gsap.utils.toArray<HTMLDetailsElement>("[data-faq-item]", root);

if (root && items.length > 0) {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    items.forEach((details) => details.removeAttribute("data-closing"));
    gsap.set(root.querySelectorAll("[data-faq-answer]"), { clearProps: "height,opacity,overflow" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const cleanups = items.map((details) => {
      const summary = details.querySelector<HTMLElement>("summary");
      const answer = details.querySelector<HTMLElement>("[data-faq-answer]");
      if (!summary || !answer) return () => {};

      // `target` is where the item is heading; it differs from `details.open` only mid-close.
      let target = details.open;
      let tween: gsap.core.Tween | undefined;

      const settle = () => {
        tween = undefined;
        gsap.set(answer, { clearProps: "height,opacity,overflow" });
        // Content below changed height: keep any later ScrollTriggers in place.
        ScrollTrigger.refresh();
      };

      const open = () => {
        details.removeAttribute("data-closing");
        // Mid-close the answer already has an inline height; start from there, not from 0.
        if (!details.open) {
          gsap.set(answer, { height: 0, opacity: 0, overflow: "hidden" });
          details.open = true;
        }
        tween = gsap.to(answer, {
          height: answer.scrollHeight,
          opacity: 1,
          duration: 0.45,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: settle,
        });
      };

      const close = () => {
        details.setAttribute("data-closing", "");
        gsap.set(answer, { overflow: "hidden" });
        tween = gsap.to(answer, {
          height: 0,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            details.open = false;
            details.removeAttribute("data-closing");
            settle();
          },
        });
      };

      // Fires for mouse, Enter and Space alike. Outside an animation, read the real state so a
      // details the browser opened on its own (find-in-page) closes on the first click.
      const onClick = (event: MouseEvent) => {
        event.preventDefault();
        target = tween ? !target : !details.open;
        tween?.kill();
        if (target) open();
        else close();
      };

      summary.addEventListener("click", onClick);

      // Leaving this branch (e.g. reduced motion switched on mid-animation): land on the final state.
      return () => {
        summary.removeEventListener("click", onClick);
        if (tween) {
          tween.kill();
          tween = undefined;
          details.open = target;
        }
        details.removeAttribute("data-closing");
        gsap.set(answer, { clearProps: "height,opacity,overflow" });
      };
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  });
}
