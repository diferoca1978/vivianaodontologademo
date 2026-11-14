# 05 — Rehabilitación Oral: "Cuándo la necesitas" y "Tratamientos incluidos" en un solo bloque fijado

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Construir las secciones "Cuándo la necesitas" (4 ítems) y "Tratamientos incluidos" (5 ítems) de Rehabilitación Oral como un solo bloque con el layout de la referencia que dio el mantenedor el 2026-10-26: un h2 grande centrado, rodeado de burbujas (círculo + etiqueta tipo pastilla). Al hacer scroll, el bloque se fija y pasa de la primera sección a la segunda con el mismo layout. Las 4 burbujas que ya están se quedan en su sitio y aparece una quinta. Cumple las entradas `rehabilitacion-cuando` y `rehabilitacion-tratamientos` de `feature_list.json` (el copy es del brief) y define el diseño y el movimiento, que ningún documento aprobado cubre.

## Scope

**In:**

- Nuevo `src/components/perpage/rehabilitacion/CuandoTratamientos.astro`: un wrapper `[data-rehab-swap]` con un stage `[data-rehab-swap-stage]`, que contiene dos `<section>` (`id="cuando"` y `id="tratamientos"`). Cada una tiene su h2 (`aria-labelledby`) y su `<ul role="list">` de burbujas. Las dos secciones están siempre en el HTML, en el orden del brief.
- Burbuja: `<li>` posicionado en un slot. Dentro van el círculo (`ring-ivory`, sombra suave) y la pastilla con el texto, centrada debajo del círculo y en una sola línea en ≥768px (sin saltos de línea). Las burbujas no flotan.
- "Cuándo la necesitas": los 4 textos verbatim en un array dentro del componente, cada uno con su foto de `src/assets/images/` (`worn-teeth`, `missing-tooth`, `teeth-hurt`, `solution`, en ese orden), con `<Image>` y `alt=""`. Si una burbuja no trae imagen, cae al placeholder de `perpage/home/Servicios.astro` (gradiente `turquoise-light` + `ToothOutline` en `text-turquoise/40`, `aria-hidden`).
- "Tratamientos incluidos": se leen de `serviceCards` (`src/config/services.ts`) por slug en el orden del brief. El título va en la pastilla y la foto en el círculo, con `<Image>` y `alt=""`. Sin descripciones.
- 5 slots compartidos, definidos una sola vez: TL, TC, TR, BL, BR. "Cuándo" usa TL, TR, BL y BR. "Tratamientos" usa los 5 y TC es la burbuja extra. El orden visual (izquierda a derecha, de arriba abajo) es el del brief.
- Nuevo `src/utils/scripts/animations/rehabilitacion-oral/cuando-tratamientos.ts`: pin, swap disparado, entrada y reduced motion (ver Decisiones).
- Sacar `navHeight()` y `stageHeight()` de `animations/utils/pinned-panels.ts` a `animations/utils/sticky-nav.ts`, e importarlos desde los dos scripts, sin cambiar el comportamiento de `pinned-panels.ts`.
- Montar `CuandoTratamientos` en `src/pages/rehabilitacion-oral.astro`, justo después de `Hero`.

**Out:**

- Confirmar con el cliente que las 4 fotos de "Cuándo la necesitas" son las definitivas (client-gaps #5).
- Descripciones de los tratamientos (client-gaps #2): no se inventan.
- Las demás secciones de la página ("Cómo se hace", enlace cruzado, FAQ, CTA final) y `page-rehabilitacion` (SEO, `PENDING_PAGES`).
- Cambios en `PinnedPanels.astro`, en `pages.ts`, en el JSON-LD o en `services.ts`.
- Nuevas dependencias o plugins de GSAP.

## Files affected

- `src/components/perpage/rehabilitacion/CuandoTratamientos.astro` — nuevo.
- `src/utils/scripts/animations/rehabilitacion-oral/cuando-tratamientos.ts` — nuevo.
- `src/utils/scripts/animations/utils/sticky-nav.ts` — nuevo; el helper del alto del nav y del stage.
- `src/utils/scripts/animations/utils/pinned-panels.ts` — importa el helper; sin cambio de comportamiento.
- `src/pages/rehabilitacion-oral.astro` — monta el bloque tras `Hero`.
- `feature_list.json` — `rehabilitacion-cuando` y `rehabilitacion-tratamientos` (`feature_list.json:342-360`): la descripción dice que comparten este bloque, `source` suma este spec y `acceptance` suma el layout, el placeholder y las fotos de `serviceCards`.
- `client-gaps.md` — #5 (`client-gaps.md:130`): las 4 fotos de "Cuándo la necesitas" quedan registradas como pendientes de confirmar.
- `AGENTS.md` — revisar. No cambia ninguna convención (componente en `perpage/`, script en la carpeta de la ruta, helper en `utils/`).

## Source of the content

- `docs/brief/textos-sitio.md:151-156` — h2 "Cuándo la necesitas" y sus 4 ítems: "Desgaste dental visible", "Pérdida de una o varias piezas", "Bruxismo o dolor articular", "Buscas recuperar función y estética a la vez". Verbatim.
- `docs/brief/textos-sitio.md:158-160` — h2 "Tratamientos incluidos" y sus 5 ítems, en este orden: Coronas en Zirconio · Incrustaciones Dentales · Prótesis Removibles · Placas de Bruxismo · Implantes. Verbatim; los títulos de `serviceCards` (`src/config/services.ts:77-86`) ya coinciden.
- Fotos de los tratamientos: las de `serviceCards`, que ya usa el home (`corona.webp`, `incrustaciones.webp`, `protesisremovible.webp`, `bruxismo.webp`, `implantedental.webp`).
- Diseño: la referencia que adjuntó el mantenedor el 2026-10-26 (h2 grande centrado, avatares circulares dispersos con burbujas de texto). No se copia ningún texto de la referencia.
- Decisiones del mantenedor (2026-10-26): un solo bloque con el mismo layout para las dos secciones; fotos en "Cuándo" (antes placeholder); sin pin en móvil; swap disparado; sin flotación (se quitó el 2026-10-26); pastilla debajo del círculo, en una sola línea.

## Decisions made and discarded

- **Elegido:** un componente `perpage/rehabilitacion/CuandoTratamientos.astro` con las dos secciones adentro. **Descartado:** un componente genérico en `ui/sections/`, porque solo lo usa esta página. Si otra página lo necesita, se extrae como se hizo con `PinnedPanels`.
- **Elegido:** dos `<section>`, cada una con su h2 y su `<ul>`, siempre en el DOM. El layout base las apila y el script las superpone en modo stage. **Descartado:** un solo h2 cuyo texto cambia por JS, porque esconde la segunda sección sin JS y a los buscadores, y rompe el criterio "h2 'Tratamientos incluidos'".
- **Elegido (mantenedor, 2026-10-26):** las 4 fotos nuevas en los círculos de "Cuándo" (`worn-teeth`, `missing-tooth`, `teeth-hurt`, `solution`). El placeholder de marca queda solo como respaldo si falta una imagen. **Descartado:** íconos en círculo, y reusar fotos del sitio que no muestran el síntoma.
- **Elegido (mantenedor):** sin pin debajo de 768px. Ahí los dos bloques van apilados, cada uno con su h2 y sus burbujas en una composición compacta (`flex-wrap`, con un desfase vertical alterno), y aparecen con un fade, una vez. **Descartado:** pin en móvil, porque las etiquetas largas no caben alrededor de un título grande a 390px.
- **Elegido (mantenedor):** swap disparado. El bloque se fija y, al cruzar la mitad del recorrido, se reproduce un timeline de duración fija (unos 1.1 s) que se revierte al subir. **Descartado:** scrub ligado al scroll como en `PinnedPanels`, que puede dejar los dos h2 semitransparentes y superpuestos si el usuario se detiene a la mitad.
- **Elegido (mantenedor, 2026-10-26):** burbujas estáticas en reposo, sin flotación; la pastilla va centrada debajo del círculo y sin saltos de línea en ≥768px, y las esquinas se reparten de forma menos simétrica y más hacia el centro. **Descartado:** la flotación sutil que tenía la primera versión (y su wrapper `data-rehab-swap-float`), y la pastilla montada sobre el borde del círculo.
- **Elegido:** en modo stage, la escena oculta usa `opacity: 0` y no `autoAlpha`. Así sigue en el árbol de accesibilidad y el lector de pantalla lee las dos listas; ninguna tiene elementos interactivos. **Descartado:** `autoAlpha`, que con `visibility: hidden` saca la segunda lista del árbol de accesibilidad mientras no se llega a la mitad del pin.
- **Elegido:** las 4 esquinas quedan en el mismo slot en los dos estados, y TC solo existe en "Tratamientos". BR va más arriba y más adentro que las demás esquinas, para no quedar bajo el botón flotante de WhatsApp (`fixed right-4 bottom-4 sm:right-6 sm:bottom-6`). **Descartado:** redistribuir las 5 posiciones en el cambio, porque el mantenedor pidió conservar el layout.
- **Elegido:** recorrido del pin de 1.5 × el alto del stage (unos 0.75 de pantalla por estado). Sin snap.
- **Elegido:** el helper del alto del nav pasa a `utils/sticky-nav.ts`. **Descartado:** copiar las dos funciones de `pinned-panels.ts`.

## Acceptance criteria

- [x] `CuandoTratamientos.astro` se monta en `/rehabilitacion-oral/` justo después del hero.
- [x] h2 "Cuándo la necesitas" seguido de un `<ul>` con los 4 ítems verbatim, en el orden del brief.
- [x] h2 "Tratamientos incluidos" seguido de un `<ul>` con los 5 ítems verbatim, en el orden del brief, leídos de `serviceCards`. Sin texto de descripción.
- [x] Cada sección es un `<section>` con `id` y `aria-labelledby` que apunta a su h2. Las dos están en el HTML construido, en ese orden.
- [x] Las burbujas de "Cuándo" muestran sus 4 fotos y las de "Tratamientos" la suya (las de `serviceCards`), todas con `<Image>` de `astro:assets` y `alt=""`.
- [x] ≥768px: el h2 va centrado y las burbujas en los slots TL, TR, BL y BR ("Cuándo") o TL, TC, TR, BL y BR ("Tratamientos"). Las 4 esquinas ocupan la misma posición en los dos estados. Sin choques entre el h2 y las burbujas, ni de BR con el botón de WhatsApp, en 768×1024, 1280×720 y 1440×900.
- [x] ≥768px sin reduced motion: el bloque se fija bajo el nav. Al cruzar la mitad del recorrido, salen las 4 burbujas, cambia el h2 y entran las 5 (TC al final); al subir, se revierte. Nunca queda a medias. Al soltarse el pin, la salida hacia lo que sigue queda limpia.
- [x] <768px: sin pin; las dos secciones apiladas, completas, con fade al entrar y sin scroll horizontal a 390px.
- [x] Las burbujas no flotan: están quietas con y sin motion. La pastilla va debajo del círculo y en una sola línea en ≥768px.
- [x] `prefers-reduced-motion: reduce` y sin JavaScript: las dos secciones apiladas, visibles y legibles, con el mismo layout.
- [x] Un resize que cruce 768px, o un cambio de preferencia de movimiento, revierte el stage y el pin sin espacio residual.
- [x] La lógica GSAP vive en `animations/rehabilitacion-oral/cuando-tratamientos.ts` y solo anima `transform` y `opacity`. El componente solo lleva los hooks `data-rehab-swap*`. `pinned-panels.ts` usa `utils/sticky-nav.ts` y el bloque de Blanqueamiento se comporta igual que antes.
- [x] Sin colores escritos a mano, sin `style=""` inline, sin valores arbitrarios de Tailwind y sin `<svg>` inline. El HTML final no contiene `[CLIENTE]`.
- [x] `feature_list.json` (las dos entradas) y `client-gaps.md` #5 quedan actualizados. `AGENTS.md` está revisado.
- [x] `pnpm check` sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.

## Implementation plan

1. Con `front-end-astro`, crear `CuandoTratamientos.astro`: los datos (el array de "Cuándo" y los slugs de `serviceCards`), el array de slots, las dos `<section>`, el layout base apilado (<768px en flujo, ≥768px absoluto alrededor del h2) y las clases `group-data-stage/stage:` del modo stage. Montarlo en `rehabilitacion-oral.astro` tras `Hero`.
2. Sacar `navHeight()` y `stageHeight()` a `animations/utils/sticky-nav.ts` y hacer que `pinned-panels.ts` los importe. Comprobar que Blanqueamiento no cambia.
3. Con `gsap-scrolltrigger` y `gsap-timeline`, escribir `cuando-tratamientos.ts`: `gsap.matchMedia()` con las ramas reduced, <768px y ≥768px. En la de ≥768px: el modo stage y su altura, el estado inicial de B en `opacity: 0`, la entrada de A, el pin, el `swapTl` pausado que se dispara al cruzar `progress 0.5` (sincronizado en `onRefresh`) y el cleanup.
4. Revisar en el navegador en 390×844, 768×1024, 1280×720 y 1440×900: scroll de ida y vuelta, reduced motion, sin JS, y un resize que cruce 768px.
5. Actualizar `feature_list.json` y `client-gaps.md` #5, y revisar `AGENTS.md`.
6. Correr `pnpm check` y `pnpm build`, y comprobar cada criterio contra la página construida (`spec-verifier`).
