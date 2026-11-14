import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { drawToothLogo } from "@/utils/scripts/animations/utils/draw-tooth-logo";

// Scroll reveal for src/components/perpage/home/Sobre.astro.
// - Tooth logo: same draw-in as CalmaActiva (src/utils/scripts/animations/utils/draw-tooth-logo.ts),
//   once, when the logo enters the viewport.
// - Photo collage: the large photo rises in first and the small one follows shortly after,
//   once the collage enters the viewport.
// - Text column: one timeline, once, when the heading enters the viewport. It has its own trigger
//   because below lg it stacks under the collage.
//   1. Heading: SplitText splits it by words and each word fades up from below, one after
//      another. Words are wrapped inside the nested spans, so both weights and the turquoise
//      full stop keep their styles. The full stop is passed as `ignore`, which moves it into the
//      "Bogotá" word: it rises with it and can't wrap onto a line of its own. SplitText's default
//      aria ("auto") puts the full sentence in the h2's aria-label and hides the word wrappers,
//      so screen readers read the heading once.
//   2. Bio, credentials and CTA (data-sobre-text) fade up as one block right after the words.
//   The split waits for the web fonts (document.fonts.ready), as GSAP advises for custom fonts;
//   autoSplit wouldn't apply, since it only re-splits when lines are split. The split and the
//   timeline live in the media context, which reverts both (the h2 gets its original markup
//   back) when the query stops matching.
// Reduced motion: no animation and no split; everything lands in its final, visible state; the
// logo is left untouched.
gsap.registerPlugin(ScrollTrigger, SplitText);

const section = document.querySelector<HTMLElement>("#sobre");

if (section) {
  const logo = section.querySelector<SVGElement>("[data-sobre-logo]");
  // Large first, then small: the stagger below relies on this order.
  const photos = [
    ...gsap.utils.toArray<HTMLElement>("[data-sobre-photo-large]", section),
    ...gsap.utils.toArray<HTMLElement>("[data-sobre-photo-small]", section),
  ];
  const title = section.querySelector<HTMLElement>("[data-sobre-title]");
  const text = gsap.utils.toArray<HTMLElement>("[data-sobre-text]", section);
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: reduce)", () => {
    const targets = title ? [...photos, title, ...text] : [...photos, ...text];
    gsap.set(targets, { autoAlpha: 1, clearProps: "transform" });
  });

  mm.add("(prefers-reduced-motion: no-preference)", (context) => {
    if (logo) drawToothLogo(logo);

    if (photos.length) {
      gsap.from(photos, {
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: { trigger: photos[0], start: "top 85%", once: true },
      });
    }

    if (!title) return;

    // The fonts promise resolves outside this handler, so the split and the timeline are added
    // back into the media context with context.add() to be reverted with it. `active` drops a
    // late resolve once this run has been reverted (the context object is reused on re-match).
    let active = true;

    document.fonts.ready.then(() => {
      if (!active) return;

      context.add(() => {
        // Queried here, not once up top: reverting a split restores the h2's innerHTML, which
        // replaces this span, so a re-split after a media change needs the live one.
        const stop = title.querySelector<HTMLElement>(
          "[data-sobre-title-stop]",
        );
        const split = SplitText.create(title, {
          type: "words",
          ignore: stop ?? undefined,
        });

        const tl = gsap.timeline({
          defaults: { duration: 0.8, ease: "power3.out" },
          scrollTrigger: { trigger: title, start: "top 85%", once: true },
        });

        tl.from(split.words, { autoAlpha: 0, yPercent: 60, stagger: 0.08 });

        if (text.length) tl.from(text, { autoAlpha: 0, y: 24 }, "-=0.3");
      });
    });

    return () => {
      active = false;
    };
  });
}
