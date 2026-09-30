import gsap from "gsap";

// Mobile menu for NavBar.astro: toggle (button, aria-expanded, Escape) + smooth open/close.
// Reduced motion: the panel shows/hides instantly, links always land visible.
const toggle = document.querySelector<HTMLButtonElement>("[data-nav-toggle]");
const panel = document.querySelector<HTMLElement>("[data-nav-panel]");

if (toggle && panel) {
  const items = panel.querySelectorAll<HTMLElement>("[data-nav-item]");
  const iconOpen = toggle.querySelector("[data-icon-open]");
  const iconClose = toggle.querySelector("[data-icon-close]");
  let reduceMotion = false;

  const setIcons = (open: boolean) => {
    toggle.setAttribute("aria-expanded", String(open));
    iconOpen?.classList.toggle("hidden", open);
    iconClose?.classList.toggle("hidden", !open);
  };

  const open = () => {
    setIcons(true);
    gsap.killTweensOf([panel, items]);
    panel.classList.remove("hidden");
    if (reduceMotion) {
      gsap.set(panel, { clearProps: "height,opacity" });
      gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
      return;
    }
    gsap
      .timeline()
      .fromTo(
        panel,
        { height: 0, autoAlpha: 0 },
        { height: "auto", autoAlpha: 1, duration: 0.5, ease: "power3.out" },
      )
      .fromTo(
        items,
        { autoAlpha: 0, y: -12 },
        { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.06 },
        0.08,
      )
      .set(panel, { clearProps: "height" });
  };

  const close = () => {
    setIcons(false);
    gsap.killTweensOf([panel, items]);
    const hide = () => {
      panel.classList.add("hidden");
      gsap.set(panel, { clearProps: "height,opacity" });
      gsap.set(items, { autoAlpha: 1, clearProps: "transform" });
    };
    if (reduceMotion) return hide();
    gsap.to(panel, { height: 0, autoAlpha: 0, duration: 0.35, ease: "power3.inOut", onComplete: hide });
  };

  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";

  gsap.matchMedia().add(
    { reduce: "(prefers-reduced-motion: reduce)" },
    (ctx) => {
      reduceMotion = Boolean(ctx.conditions?.reduce);
    },
  );

  toggle.addEventListener("click", () => (isOpen() ? close() : open()));
  panel.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).closest("a")) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      close();
      toggle.focus();
    }
  });
}
