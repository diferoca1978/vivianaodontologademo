import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navHeight, stageHeight } from "@/utils/scripts/animations/utils/sticky-nav";

// Scroll motion for src/components/ui/sections/BeforeAfter.astro (spec 07).
// Every `[data-before-after]` section on the page is initialized on its own, with its own
// gsap.matchMedia(), so a breakpoint or motion-preference change reverts each instance
// independently. No `[data-before-after]` on the page: nothing runs.
// The component's base CSS is the stacked layout (before photo, then after photo), visible without
// JS and with reduced motion. Overlay mode is switched on by setting `data-stage` on the stage
// (the component's `data-stage:` / `group-data-stage/stage:` classes overlay the layers and show
// the divider). Per instance, three gsap.matchMedia() branches:
// - Desktop with motion (≥768px, no reduced motion): the stage gets `data-stage` and an inline
//   height of 100svh minus the sticky NavBar (the 16:9 frame is centred in it and shrinks to fit), and is pinned with its top on the nav's bottom edge
//   for +=100% of scroll. A scrubbed timeline wipes the "after" layer in from the left with
//   clip-path while the divider (a thin vertical line) follows the cut edge via `x`.
// - Below 768px with motion: no pin. The layers are overlaid in the component's aspect-video
//   frame and the same wipe is scrubbed while the frame crosses the viewport.
// - Reduced motion: nothing runs; the base stacked layout stays.
// Only clip-path and transform are animated. Leaving a branch (resize across 768px, motion
// preference change) reverts everything it did: ScrollTriggers and pin spacer, GSAP inline props,
// the stage attribute and the inline height.
// Lenis drives the native window scroll, so ScrollTrigger reads it from the regular scroll events.
gsap.registerPlugin(ScrollTrigger);

const initBeforeAfter = (section: HTMLElement) => {
  const stage = section.querySelector<HTMLElement>("[data-before-after-stage]");
  const after = section.querySelector<HTMLElement>("[data-before-after-after]");
  const frame = section.querySelector<HTMLElement>("[data-before-after-frame]");
  const divider = section.querySelector<HTMLElement>("[data-before-after-divider]");
  if (!stage || !after || !frame || !divider) return;

  // "after" enters left to right: fully clipped at the start, fully shown at the end. The divider
  // rides the cut edge: from the left edge of the frame to its right edge.
  // `hold` adds an empty stretch after the wipe (as a fraction of the wipe's duration). The numeric
  // scrub makes the playhead trail the scroll by ~0.6s, so without it the pin released while the
  // wipe was still catching up and the divider was seen short of the right edge as the section
  // scrolled away. With the hold, the wipe completes before the pin lets go.
  const buildWipe = (scrollTrigger: ScrollTrigger.Vars, hold = 0) => {
    const tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: { ...scrollTrigger, scrub: 0.6, invalidateOnRefresh: true },
    });
    tl.fromTo(after, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)" }, 0);
    tl.fromTo(divider, { x: 0 }, { x: () => frame.offsetWidth }, 0);
    if (hold > 0) tl.to({}, { duration: hold });
    return tl;
  };

  const cleanup = () => {
    stage.removeAttribute("data-stage");
    gsap.set([stage, frame], { clearProps: "height,width" });
    gsap.set([after, divider], { clearProps: "clipPath,transform" });
  };

  const mm = gsap.matchMedia();

  mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
    // Stage mode on. Height and frame width are layout, not motion: set once here and again before
    // every ScrollTrigger refresh so they follow the viewport and the nav height. The frame is 16:9
    // (aspect-video) inside the site container; when that width is too tall for the stage, its
    // width shrinks so the whole 16:9 fits (centred, space at the sides).
    stage.setAttribute("data-stage", "");
    const sizeStage = () => {
      gsap.set(stage, { height: stageHeight() });
      const box = frame.parentElement as HTMLElement;
      const cs = getComputedStyle(box);
      const innerW = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const availH = stageHeight() - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      gsap.set(frame, { width: Math.floor(Math.min(innerW, (availH * 16) / 9)) });
    };
    sizeStage();
    ScrollTrigger.addEventListener("refreshInit", sizeStage);

    buildWipe({
      trigger: stage,
      pin: true,
      start: () => `top top+=${navHeight()}`,
      end: "+=100%",
      anticipatePin: 1,
    }, 0.25);

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", sizeStage);
      cleanup();
    };
  });

  mm.add("(max-width: 767.98px) and (prefers-reduced-motion: no-preference)", () => {
    // Overlay mode on in the component's aspect-video frame; no pin, no inline height.
    stage.setAttribute("data-stage", "");

    buildWipe({
      trigger: stage,
      start: "top 85%",
      end: "bottom 40%",
    });

    return cleanup;
  });
};

document.querySelectorAll<HTMLElement>("[data-before-after]").forEach(initBeforeAfter);
