import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  navHeight,
  stageHeight,
} from "@/utils/scripts/animations/utils/sticky-nav";

// Scroll motion for src/components/perpage/rehabilitacion/ComoSeHace.astro (feature
// rehabilitacion-como-se-hace), adapted from the Shine project's pinned slide-in process steps.
// The component's base CSS is the stacked <ol> (one solid panel per step), visible without JS.
// Three gsap.matchMedia() branches:
// - ≥768px with motion: "stage mode". The <ol> gets `data-stage` (the component's
//   `group-data-stage/stage:` classes overlay the three panels on it) and an inline height of the
//   viewport minus the sticky NavBar. The ordinal and the title of each panel are split into
//   masked chars (SplitText, words + chars, no lines, so the split doesn't depend on font metrics
//   and runs in page order). Panel 1's chars rise in once as the stage enters. The stage is then
//   pinned under the nav and one scrubbed timeline slides each next panel up over the previous one
//   (yPercent 100 → 0), after which its ordinal and title chars rise in, staggered, and its text
//   fades up. ~1 stage height of scroll per slide plus short holds. No snap.
// - <768px with motion: no pin, no split. Each step's ordinal, title and text fade up once as it
//   enters the viewport.
// - Reduced motion: no animation, no split; the steps stacked, in their final, visible state.
// Only transform and opacity are animated. Leaving a branch (resize across 768px, motion
// preference change) reverts everything it did: the splits (original markup back), ScrollTriggers
// and pin spacer, inline props, the stage attribute and the inline height.
// Lenis (src/utils/scripts/lennis.js) drives the native window scroll, so ScrollTrigger reads it
// from the regular scroll events; the numeric scrub smooths the playhead on top of it.
gsap.registerPlugin(ScrollTrigger, SplitText);

const HOLD = 0.35;

const root = document.querySelector<HTMLElement>("[data-rehab-steps]");
const stage = root?.querySelector<HTMLElement>("[data-rehab-steps-stage]");

if (root && stage) {
  const panels = gsap.utils.toArray<HTMLElement>(
    "[data-rehab-steps-panel]",
    stage,
  );
  const parts = (panel: HTMLElement) => ({
    number: panel.querySelector<HTMLElement>("[data-rehab-steps-number]"),
    label: panel.querySelector<HTMLElement>("[data-rehab-steps-label]"),
    title: panel.querySelector<HTMLElement>("[data-rehab-steps-title]"),
    rule: panel.querySelector<HTMLElement>("[data-rehab-steps-rule]"),
    text: panel.querySelector<HTMLElement>("[data-rehab-steps-text]"),
  });
  const content = panels.flatMap((panel) =>
    Object.values(parts(panel)).filter((el): el is HTMLElement => !!el),
  );

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    gsap.set(content, { autoAlpha: 1, clearProps: "transform" });
    gsap.set(panels, { clearProps: "transform" });
  });

  mm.add(
    "(max-width: 767.98px) and (prefers-reduced-motion: no-preference)",
    () => {
      panels.forEach((panel) => {
        const targets = Object.values(parts(panel)).filter(
          (el): el is HTMLElement => !!el,
        );
        if (!targets.length) return;

        gsap.from(targets, {
          opacity: 0,
          y: 32,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: panel, start: "top 80%", once: true },
        });
      });
    },
  );

  mm.add(
    "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    () => {
      if (panels.length < 2) return;

      // Stage mode on. The height is layout, not motion: set once here and again before every
      // ScrollTrigger refresh so it follows the viewport and the nav height.
      stage.setAttribute("data-stage", "");
      const sizeStage = () => gsap.set(stage, { height: stageHeight() });
      sizeStage();
      ScrollTrigger.addEventListener("refreshInit", sizeStage);

      // Ordinal + title of each panel in masked chars. Created inside the media context, so it is
      // reverted with it. aria "auto": the element keeps its text in aria-label.
      const steps = panels.map((panel) => {
        const { number, label, title, rule, text } = parts(panel);
        const splitTargets = [number, title].filter(
          (el): el is HTMLElement => !!el,
        );
        const chars = splitTargets.length
          ? SplitText.create(splitTargets, {
              type: "words, chars",
              mask: "chars",
            }).chars
          : [];
        const rest = [label, rule, text].filter((el): el is HTMLElement => !!el);
        return { panel, chars, rest };
      });

      const revealChars = {
        yPercent: 100,
        opacity: 0,
        stagger: 0.02,
        duration: 0.5,
        ease: "power2.out",
      };

      // Panel 1: its content rises in once as the stage comes into view (not scrubbed, so it is
      // never caught half-built when the pin starts).
      const [first, ...next] = steps;
      if (first) {
        const intro = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: { trigger: stage, start: "top 75%", once: true },
        });
        if (first.chars.length) {
          intro.from(first.chars, { ...revealChars, duration: 0.6 });
        }
        if (first.rest.length) {
          intro.from(
            first.rest,
            { opacity: 0, y: 24, duration: 0.8, stagger: 0.1 },
            "-=0.3",
          );
        }
      }

      // Scroll units: 1 timeline second = 1 stage height of scroll.
      const transitions = steps.length - 1;
      const totalUnits = transitions + HOLD * (transitions + 1);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stage,
          pin: true,
          start: () => `top top+=${navHeight()}`,
          end: () => `+=${totalUnits * stageHeight()}`,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      next.forEach(({ panel, chars, rest }, i) => {
        const index = i + 1;
        const at = HOLD * index + (index - 1);

        tl.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 1 }, at);

        if (chars.length) {
          tl.from(chars, revealChars, at + 0.7);
        }
        if (rest.length) {
          tl.from(
            rest,
            { opacity: 0, y: 24, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            at + 0.85,
          );
        }
      });

      // Trailing hold on the last step before the pin releases.
      tl.to({}, { duration: HOLD });

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", sizeStage);
        stage.removeAttribute("data-stage");
        gsap.set(stage, { clearProps: "height" });
        gsap.set([...panels, ...content], {
          clearProps: "transform,opacity",
        });
      };
    },
  );
}
