import gsap from "gsap";

// Infinite marquee for src/components/ui/utils/Marquee.astro.
// Full motion: the list is cloned until it covers the container twice, the container stops
// scrolling (data-marquee-active) and the track loops with GSAP at `speed` px/s, paused while
// the pointer or focus is inside. Reduced motion / no JS: untouched, the row stays a scrollable
// region. The clones are aria-hidden, inert and carry no ids, so anchors stay unique.
export const initMarquee = () => {
  const containers = gsap.utils.toArray<HTMLElement>("[data-marquee]");
  if (!containers.length) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      full: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      if (context.conditions?.reduce) return;

      const cleanups: Array<() => void> = [];

      for (const container of containers) {
        const track = container.querySelector<HTMLElement>(
          "[data-marquee-track]",
        );
        const original =
          track?.querySelector<HTMLElement>("[data-marquee-set]");
        if (!track || !original) continue;

        const speed = parseFloat(container.dataset.speed ?? "40");
        const dir = container.dataset.direction === "right" ? 1 : -1;
        const pauseOnHover = container.dataset.pause === "true";

        let tween: gsap.core.Tween | undefined;
        let clones: HTMLElement[] = [];
        const hadTabindex = container.getAttribute("tabindex");

        const build = () => {
          tween?.kill();
          clones.forEach((c) => c.remove());
          clones = [];
          gsap.set(track, { x: 0 });

          const setWidth = original.getBoundingClientRect().width;
          if (!setWidth) return;

          // Enough copies so the track is at least twice the container wide.
          const copies = Math.max(
            1,
            Math.ceil((container.clientWidth * 2) / setWidth) - 1,
          );
          for (let i = 0; i < copies; i++) {
            const clone = original.cloneNode(true) as HTMLElement;
            clone.removeAttribute("data-marquee-set");
            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("inert", "");
            clone
              .querySelectorAll("[id]")
              .forEach((el) => el.removeAttribute("id"));
            track.appendChild(clone);
            clones.push(clone);
          }

          const from = dir === -1 ? 0 : -setWidth;
          gsap.set(track, { x: from });
          tween = gsap.to(track, {
            x: from + dir * setWidth,
            duration: setWidth / speed,
            ease: "none",
            repeat: -1,
          });
        };

        container.setAttribute("data-marquee-active", "");
        container.removeAttribute("tabindex"); // nothing to scroll while it loops
        container.scrollLeft = 0;
        build();

        const pause = () => tween?.pause();
        const play = () => tween?.play();
        if (pauseOnHover) {
          container.addEventListener("pointerenter", pause);
          container.addEventListener("pointerleave", play);
          container.addEventListener("focusin", pause);
          container.addEventListener("focusout", play);
        }

        let lastWidth = container.clientWidth;
        const observer = new ResizeObserver(() => {
          if (container.clientWidth !== lastWidth) {
            lastWidth = container.clientWidth;
            build();
          }
        });
        observer.observe(container);

        cleanups.push(() => {
          observer.disconnect();
          tween?.kill();
          clones.forEach((c) => c.remove());
          gsap.set(track, { clearProps: "transform" });
          container.removeEventListener("pointerenter", pause);
          container.removeEventListener("pointerleave", play);
          container.removeEventListener("focusin", pause);
          container.removeEventListener("focusout", play);
          container.removeAttribute("data-marquee-active");
          if (hadTabindex !== null)
            container.setAttribute("tabindex", hadTabindex);
        });
      }

      return () => cleanups.forEach((fn) => fn());
    },
  );
};
