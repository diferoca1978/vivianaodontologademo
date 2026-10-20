import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { drawToothLogo } from "@/utils/scripts/animations/utils/draw-tooth-logo";

// Scroll motion for src/components/ui/sections/PinnedPanels.astro (specs 02 and 04).
// Every `[data-pinned]` section on the page is initialized on its own: Astro bundles this module
// once per page however many PinnedPanels it mounts, so it walks all of them (in document order)
// and gives each one its own stage, panels, numbers, texts and logo, looked up inside that root,
// and its own gsap.matchMedia(), so a breakpoint or motion-preference change reverts each instance
// independently. No `[data-pinned]` on the page: nothing runs.
// The component's base CSS is the stacked layout (one panel after another), visible without JS.
// Per instance, three gsap.matchMedia() branches:
// - Desktop with motion (≥768px, no reduced motion): "stage mode". The <ul> gets the
//   `data-stage` attribute (the component's `data-stage:` / `group-data-stage:` classes overlay
//   the panels on it) and an inline height of 100svh minus the sticky NavBar, so the nav never
//   covers the photo. The <ul> is pinned with its top on the nav's bottom edge, and one scrubbed
//   timeline wipes each incoming panel in with clip-path (bottom to top) over the outgoing one,
//   while the outgoing number and text rise and fade out and the incoming ones rise in from
//   below. ~100svh of scroll per transition, plus short holds on each step. No snap.
// - Below 768px with motion: no pin. Each panel's number and text fade up once as the panel
//   enters the viewport.
// - Tooth logo next to the h2: drawn in once on scroll (shared drawToothLogo), full motion only;
//   with reduced motion it is left untouched and fully visible.
// - Reduced motion: no pin, no scrub; every step stacked, in its final, visible state.
// Only clip-path, transform and opacity are animated. Leaving a branch (resize across 768px,
// motion preference change) reverts everything it did: ScrollTriggers and pin spacer, inline
// props set by GSAP, the stage attribute and the inline height.
// Instances are set up top to bottom, so their ScrollTriggers are created (and refreshed) in
// page order and an earlier instance's pin spacer is accounted for in a later one's positions.
// Lenis (src/utils/scripts/lennis.js) drives the native window scroll, so ScrollTrigger reads it
// from the regular scroll events; the numeric scrub smooths the playhead on top of it.
gsap.registerPlugin(ScrollTrigger);

// The site's only sticky header (src/components/global/NavBar.astro), shared by every instance.
const nav = document.querySelector<HTMLElement>("header");

// Read on every refresh (resize, orientation, font/image load), never cached.
const navHeight = () => nav?.offsetHeight ?? 0;
const stageHeight = () => window.innerHeight - navHeight();

const initPinnedPanels = (section: HTMLElement) => {
  const stage = section.querySelector<HTMLElement>("[data-pinned-stage]");
  if (!stage) return;

  const panels = gsap.utils.toArray<HTMLElement>("[data-pinned-panel]", stage);
  const numbers = gsap.utils.toArray<HTMLElement>("[data-pinned-number]", stage);
  const texts = gsap.utils.toArray<HTMLElement>("[data-pinned-text]", stage);
  const logo = section.querySelector<SVGElement>("[data-pinned-logo]");
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    if (logo) drawToothLogo(logo);
  });

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set([...numbers, ...texts], { autoAlpha: 1, clearProps: "transform" });
    gsap.set(panels, { clearProps: "clipPath" });
  });

  mm.add("(max-width: 767.98px) and (prefers-reduced-motion: no-preference)", () => {
    panels.forEach((panel) => {
      const content = [
        ...gsap.utils.toArray<HTMLElement>("[data-pinned-number]", panel),
        ...gsap.utils.toArray<HTMLElement>("[data-pinned-text]", panel),
      ];
      if (!content.length) return;

      gsap.from(content, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: panel, start: "top 75%", once: true },
      });
    });
  });

  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    if (panels.length < 2) return;

    // Stage mode on. The height is layout, not motion: set once here and again before every
    // ScrollTrigger refresh so it follows the viewport and the nav height.
    stage.setAttribute("data-stage", "");
    const sizeStage = () => gsap.set(stage, { height: stageHeight() });
    sizeStage();
    ScrollTrigger.addEventListener("refreshInit", sizeStage);

    // Scroll units: 1 timeline second = 1 stage height (~100svh) of scroll.
    const HOLD = 0.35;
    const transitions = panels.length - 1;
    const totalUnits = transitions + HOLD * (transitions + 1);

    // Initial state: panel 1 shown, the rest clipped away below and their content waiting
    // under the fold. Kept inside the timeline (fromTo) so scrubbing back restores it.
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 1 },
      scrollTrigger: {
        trigger: stage,
        pin: true,
        start: () => `top top+=${navHeight()}`,
        end: () => `+=${totalUnits * stageHeight()}`,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    panels.forEach((panel, index) => {
      if (index === 0) return;

      const at = HOLD * index + (index - 1);
      const outgoing = [numbers[index - 1], texts[index - 1]].filter(Boolean);
      const incoming = [numbers[index], texts[index]].filter(Boolean);

      tl.fromTo(
        panel,
        { clipPath: "inset(100% 0% 0% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)" },
        at,
      );

      if (outgoing.length) {
        tl.fromTo(
          outgoing,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: () => -0.12 * stageHeight(),
            duration: 0.6,
            ease: "power2.in",
            // A later fromTo on content an earlier one already set: don't render its start
            // state now, or it would undo the incoming "hidden below" state of step 2.
            immediateRender: false,
          },
          at,
        );
      }

      if (incoming.length) {
        tl.fromTo(
          incoming,
          { opacity: 0, y: () => 0.12 * stageHeight() },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", stagger: 0.08 },
          at + 0.4,
        );
      }
    });

    // Trailing hold on the last step before the pin releases.
    tl.to({}, { duration: HOLD });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", sizeStage);
      stage.removeAttribute("data-stage");
      gsap.set(stage, { clearProps: "height" });
      gsap.set([...panels, ...numbers, ...texts], { clearProps: "clipPath,transform,opacity" });
    };
  });
};

document.querySelectorAll<HTMLElement>("[data-pinned]").forEach(initPinnedPanels);
