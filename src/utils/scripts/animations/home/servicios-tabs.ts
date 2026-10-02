import gsap from "gsap";

// Tabs (WAI-ARIA) for src/components/perpage/home/Servicios.astro, driven by GSAP.
// A service is selected on hover (mouse only), click, focus-arrow keys, Home/End.
// Switching: the current panel fades out, then the next one's children rise in, staggered.
// Without JS the first panel is visible. Reduced motion: the swap is instant, no tweens.
const root = document.querySelector<HTMLElement>("#servicios");
const tabs = Array.from(
  root?.querySelectorAll<HTMLButtonElement>('[role="tab"]') ?? [],
);
const panels = tabs.map((tab) =>
  document.getElementById(tab.getAttribute("aria-controls") ?? "")!,
);

if (root && tabs.length > 1 && panels.every(Boolean)) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      full: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const animate = !context.conditions?.reduce;
      let current = Math.max(
        tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"),
        0,
      );
      let tl: gsap.core.Timeline | undefined;

      const select = (next: number, focus = false) => {
        if (focus) tabs[next].focus();
        if (next === current) return;

        for (const [i, tab] of tabs.entries()) {
          tab.setAttribute("aria-selected", String(i === next));
          tab.tabIndex = i === next ? 0 : -1;
        }

        // Settle any transition in flight: only the outgoing panel stays visible.
        tl?.kill();
        const out = panels[current];
        const incoming = panels[next];
        for (const panel of panels) {
          gsap.set([panel, ...Array.from(panel.children)], {
            clearProps: "all",
          });
          panel.hidden = panel !== out;
        }
        current = next;

        if (!animate) {
          out.hidden = true;
          incoming.hidden = false;
          return;
        }

        tl = gsap
          .timeline()
          .to(out, {
            autoAlpha: 0,
            y: -12,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              out.hidden = true;
              gsap.set(out, { clearProps: "all" });
            },
          })
          .add(() => {
            incoming.hidden = false;
          })
          .fromTo(
            Array.from(incoming.children),
            { autoAlpha: 0, y: 24 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.08,
              ease: "power3.out",
              clearProps: "transform,opacity,visibility",
            },
          );
      };

      const cleanups = tabs.map((tab, i) => {
        const onEnter = (e: PointerEvent) => {
          if (e.pointerType === "mouse") select(i);
        };
        const onClick = () => select(i);
        const onKey = (e: KeyboardEvent) => {
          const keys: Record<string, number> = {
            ArrowRight: (i + 1) % tabs.length,
            ArrowDown: (i + 1) % tabs.length,
            ArrowLeft: (i - 1 + tabs.length) % tabs.length,
            ArrowUp: (i - 1 + tabs.length) % tabs.length,
            Home: 0,
            End: tabs.length - 1,
          };
          if (e.key in keys) {
            e.preventDefault();
            select(keys[e.key], true);
          }
        };
        tab.addEventListener("pointerenter", onEnter);
        tab.addEventListener("click", onClick);
        tab.addEventListener("keydown", onKey);
        return () => {
          tab.removeEventListener("pointerenter", onEnter);
          tab.removeEventListener("click", onClick);
          tab.removeEventListener("keydown", onKey);
        };
      });

      return () => {
        tl?.kill();
        cleanups.forEach((fn) => fn());
      };
    },
  );
}
