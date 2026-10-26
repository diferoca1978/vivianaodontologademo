import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  navHeight,
  stageHeight,
} from "@/utils/scripts/animations/utils/sticky-nav";

// Scroll motion for src/components/perpage/rehabilitacion/CuandoTratamientos.astro (spec 05).
// The component's base CSS is the stacked layout ("Cuándo la necesitas", then "Tratamientos
// incluidos"), visible without JS. Three gsap.matchMedia() branches:
// - ≥768px with motion: "stage mode". The stage gets `data-stage` (the component's
//   `group-data-stage/stage:` classes overlay both sections on it) and an inline height of the
//   viewport minus the sticky NavBar. "Tratamientos" (scene B) starts at opacity 0 (not autoAlpha,
//   so both lists stay in the accessibility tree; neither has interactive content). "Cuándo"
//   (scene A) fades up once as the block enters. The stage is pinned under the nav for 1.5 × its
//   height, no snap. Crossing the middle of the pin plays a paused ~1.1s swap timeline (not
//   scrubbed, so it never rests half-way): A's 4 bubbles leave, the h2 swaps, B's 4 corners enter
//   in the same slots and TC enters last. Scrolling back across the middle reverses it. The state
//   is re-synced (instantly) on every refresh.
// - <768px with motion: no pin. Each section's h2 and bubbles fade up once as it enters.
// - Reduced motion: no animation; both sections stacked, in their final, visible state.
// Only transform and opacity are animated. Leaving a branch (resize across 768px, motion
// preference change) reverts everything it did: ScrollTriggers and pin spacer, inline props, the
// stage attribute and the inline height, so no residual space is left.
// Lenis (src/utils/scripts/lennis.js) drives the native window scroll, so ScrollTrigger reads it
// from the regular scroll events.
gsap.registerPlugin(ScrollTrigger);

const SWAP_AT = 0.5;
const PIN_LENGTH = 1.5;

const root = document.querySelector<HTMLElement>("[data-rehab-swap]");
const stage = root?.querySelector<HTMLElement>("[data-rehab-swap-stage]");
const scenes = root
  ? gsap.utils.toArray<HTMLElement>("[data-rehab-swap-scene]", root)
  : [];

if (root && stage && scenes.length === 2) {
  const [sceneA, sceneB] = scenes as [HTMLElement, HTMLElement];
  const titleOf = (scene: HTMLElement) =>
    scene.querySelector<HTMLElement>("[data-rehab-swap-title]");
  const bubblesOf = (scene: HTMLElement) =>
    gsap.utils.toArray<HTMLElement>("[data-rehab-swap-bubble]", scene);

  const titleA = titleOf(sceneA);
  const titleB = titleOf(sceneB);
  const bubblesA = bubblesOf(sceneA);
  const bubblesB = bubblesOf(sceneB);
  const cornersB = bubblesB.filter((el) => el.dataset.rehabSwapSlot !== "TC");
  const centerB = bubblesB.filter((el) => el.dataset.rehabSwapSlot === "TC");
  const contentA = titleA ? [titleA, ...bubblesA] : bubblesA;
  const contentB = titleB ? [titleB, ...bubblesB] : bubblesB;

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set([...contentA, ...contentB], {
      autoAlpha: 1,
      clearProps: "transform",
    });
  });

  mm.add(
    "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
    () => {
      [contentA, contentB].forEach((content, index) => {
        const scene = scenes[index];
        if (!scene || !content.length) return;

        gsap.from(content, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: scene, start: "top 80%", once: true },
        });
      });
    },
  );

  mm.add(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    () => {
      // Stage mode on. The height is layout, not motion: set once here and again before every
      // ScrollTrigger refresh so it follows the viewport and the nav height.
      stage.setAttribute("data-stage", "");
      const sizeStage = () => gsap.set(stage, { height: stageHeight() });
      sizeStage();
      ScrollTrigger.addEventListener("refreshInit", sizeStage);

      // Initial state of B: hidden with opacity only (stays in the accessibility tree).
      gsap.set(contentB, { opacity: 0 });

      // Entrance of A, played once when the block comes into view. Paused timeline driven from a
      // callback (not linked to the trigger) so the swap can force it to its end at any time.
      const intro = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });
      if (titleA) intro.from(titleA, { opacity: 0, y: 32, duration: 0.8 }, 0);
      if (bubblesA.length) {
        intro.from(
          bubblesA,
          { opacity: 0, y: 40, duration: 0.8, stagger: 0.08 },
          0.15,
        );
      }

      ScrollTrigger.create({
        trigger: stage,
        start: "top 75%",
        once: true,
        onEnter: () => {
          if (intro.progress() < 1) intro.play();
        },
      });

      // Swap A → B (~1.1s). fromTo with explicit visible starts on A, so reversing always lands on
      // a fully visible A even if the swap fired mid-entrance; immediateRender off so nothing is
      // touched until it first plays.
      const swapTl = gsap.timeline({
        paused: true,
        defaults: { ease: "power2.inOut" },
      });
      if (bubblesA.length) {
        swapTl.fromTo(
          bubblesA,
          { opacity: 1, y: 0, scale: 1 },
          {
            opacity: 0,
            y: -12,
            scale: 0.9,
            duration: 0.4,
            stagger: 0.04,
            ease: "power2.in",
            immediateRender: false,
          },
          0,
        );
      }
      if (titleA) {
        swapTl.fromTo(
          titleA,
          { opacity: 1, y: 0 },
          {
            opacity: 0,
            y: -24,
            duration: 0.4,
            ease: "power2.in",
            immediateRender: false,
          },
          0.1,
        );
      }
      if (titleB) {
        swapTl.fromTo(
          titleB,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            immediateRender: false,
          },
          0.4,
        );
      }
      if (cornersB.length) {
        swapTl.fromTo(
          cornersB,
          { opacity: 0, y: 12, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
            immediateRender: false,
          },
          0.5,
        );
      }
      if (centerB.length) {
        swapTl.fromTo(
          centerB,
          { opacity: 0, y: 12, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
            immediateRender: false,
          },
          0.75,
        );
      }

      let swapped = false;
      const sync = (self: ScrollTrigger, instant: boolean) => {
        const next = self.progress >= SWAP_AT;
        if (next === swapped) return;
        swapped = next;
        // A must be fully in before it can leave (or be shown again on reverse).
        intro.progress(1);
        if (instant) swapTl.pause().progress(next ? 1 : 0);
        else if (next) swapTl.play();
        else swapTl.reverse();
      };

      ScrollTrigger.create({
        trigger: stage,
        pin: true,
        start: () => `top top+=${navHeight()}`,
        end: () => `+=${PIN_LENGTH * stageHeight()}`,
        anticipatePin: 1,
        onUpdate: (self) => sync(self, false),
        onRefresh: (self) => sync(self, true),
      });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", sizeStage);
        stage.removeAttribute("data-stage");
        gsap.set(stage, { clearProps: "height" });
        gsap.set([...contentA, ...contentB], {
          clearProps: "transform,opacity",
        });
      };
    },
  );
}
