import gsap from "gsap";

const root = document.querySelector<HTMLElement>("#preguntas-frecuentes");
const items = Array.from(root?.querySelectorAll<HTMLDetailsElement>("details") ?? []);

if (items.length > 0) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      full: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const animate = !context.conditions?.reduce;
      const states = items.map((details) => ({
        open: details.open,
        tween: undefined as gsap.core.Tween | undefined,
      }));

      const transition = (details: HTMLDetailsElement, index: number) => {
        const answer = details.querySelector<HTMLElement>("[data-faq-answer]");
        const state = states[index];
        if (!answer || !state) return;

        state.tween?.kill();
        const currentHeight = answer.getBoundingClientRect().height;

        if (!animate) {
          details.open = state.open;
          gsap.set(answer, { clearProps: "height,overflow" });
          return;
        }

        if (state.open) {
          const wasRevealed = details.open;

          // Establish the closed state before opening <details>; otherwise the
          // browser can paint the answer before GSAP gets a chance to animate it.
          if (!wasRevealed) {
            gsap.set(answer, { height: "0px", overflow: "hidden" });
          } else {
            gsap.set(answer, { height: currentHeight, overflow: "hidden" });
          }

          details.open = true;
          const targetHeight = answer.scrollHeight;

          state.tween = gsap.to(answer, {
            height: targetHeight,
            duration: 0.45,
            ease: "power2.inOut",
            overwrite: true,
            onComplete: () => {
              gsap.set(answer, { clearProps: "height,overflow" });
              state.tween = undefined;
            },
          });
          return;
        }

        // Keep <details> open while height animates to zero so the native
        // disclosure behavior cannot cut off the closing transition.
        gsap.set(answer, { height: currentHeight, overflow: "hidden" });
        state.tween = gsap.to(answer, {
          height: 0,
          duration: 0.45,
          ease: "power2.inOut",
          overwrite: true,
          onComplete: () => {
            if (!state.open) details.open = false;
            gsap.set(answer, { clearProps: "height,overflow" });
            state.tween = undefined;
          },
        });
      };

      const cleanups = items.map((details, index) => {
        const summary = details.querySelector<HTMLElement>("summary");
        if (!summary) return () => {};

        const onClick = (event: MouseEvent) => {
          event.preventDefault();
          states[index].open = !states[index].open;
          transition(details, index);
        };

        summary.addEventListener("click", onClick);
        return () => {
          summary.removeEventListener("click", onClick);
          states[index].tween?.kill();
        };
      });

      return () => cleanups.forEach((cleanup) => cleanup());
    },
  );
}
