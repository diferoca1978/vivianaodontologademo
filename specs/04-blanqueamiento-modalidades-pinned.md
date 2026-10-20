# 04 — Blanqueamiento: sección de modalidades sobre el escenario pinned reutilizable

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Construir la sección "¿Qué tipo de blanqueamiento dental es ideal para ti?" (3 modalidades) reutilizando el patrón pinned de 3 paneles de `Pasos.astro`, y a la vez convertir ese patrón en un componente genérico con props, para que "Cómo se hace" deje de estar escrito a mano en él. La sección de modalidades reemplaza a "Cómo se hace" en la página (no conviven). Cumple la entrada `blanqueamiento-modalidades` de `feature_list.json` (copy del brief) y define el diseño del panel con la lista "Incluye", que ningún documento aprobado cubre.

## Scope

**In:**

- Extraer el patrón de `Pasos.astro` a un componente genérico `src/components/ui/sections/PinnedPanels.astro` (movido con `git mv` desde `Pasos.astro`, para no perder historial). Props: `id`, `title`, `intro?` (párrafo bajo el h2) y `panels: { title, text, image, includes? }[]`, donde `includes` es `{ heading, items: { lead?, text }[] }` opcional. Sin copy de ninguna página dentro del componente.
- Nuevo `src/components/perpage/blanqueamiento/Modalidades.astro`: solo datos (copy verbatim del brief + mapeo de imágenes) y la llamada a `PinnedPanels`.
- Generalizar los hooks: `data-pasos*` → `data-pinned*` (`data-pinned`, `-stage`, `-panel`, `-media`, `-number`, `-text`, `-logo`). El selector del script deja de ser único por nombre de sección: se inicializa cada `[data-pinned]` de la página (una instancia hoy, N en el futuro, p. ej. Rehabilitación Oral).
- Mover y renombrar `animations/blanqueamiento-dental/pasos.ts` → `animations/utils/pinned-panels.ts` (reutilizable entre páginas, como `draw-tooth-logo.ts`). Misma lógica (`gsap.matchMedia()`, wipe `clip-path`, pin ≥768px, reduced motion).
- En `blanqueamiento-dental.astro`: quitar `Pasos` y montar `Modalidades` en su lugar (tras `Intro`; `Beneficios` ya se retiró de la página).
- Lista "Incluye" bajo el párrafo de cada panel, en versión compacta (ver Decisiones). Consultorio (3 ítems) y casero (4 ítems) la llevan; mixto no.
- Número grande `01`–`03` se mantiene como adorno (`aria-hidden`), sin significar orden.
- Imágenes: las mismas de hoy, en este orden: `firstcheck2.webp` → consultorio, `calmenvironment.webp` → casero, `postservice.webp` → mixto. El mantenedor las reemplazará más adelante por fotos acordes a cada modalidad (cambio de una línea de import en `Modalidades.astro`, fuera de este spec).

**Out:**

- El copy anterior de "Cómo se hace" (3 pasos): sale de la página y no se vuelve a usar aquí; queda en el historial de git.
- Coexistencia de "Cómo se hace" y modalidades en la misma página.
- Fotos nuevas por modalidad.
- Cambios en `pages.ts`, SEO, JSON-LD, Hero, Intro, Beneficios (el componente se conserva en el repo, ya no se monta).
- La sección de contraindicaciones, FAQ y CTA (features aparte).
- Nuevas dependencias.

## Files affected

- `src/components/perpage/blanqueamiento/Pasos.astro` → `src/components/ui/sections/PinnedPanels.astro` — movido y generalizado (props, hooks `data-pinned*`, ids por prop).
- `src/components/perpage/blanqueamiento/Modalidades.astro` — nuevo; datos y montaje.
- `src/utils/scripts/animations/blanqueamiento-dental/pasos.ts` → `src/utils/scripts/animations/utils/pinned-panels.ts` — movido; itera todas las instancias `[data-pinned]`.
- `src/pages/blanqueamiento-dental.astro` — `Pasos` → `Modalidades` (el cambio de `Beneficios` ya está hecho).
- `feature_list.json` — entrada `blanqueamiento-modalidades` (acceptance y descripción actualizadas con las decisiones de este spec) y descripciones de `page-blanqueamiento` y `blanqueamiento-contraindicaciones` que mencionan `Pasos`.
- `AGENTS.md` — revisar la tabla "Where each thing lives" y las menciones a `Pasos`/`pasos.ts`; la convención de `ui/sections/` es nueva, ver si se documenta. `CHECKPOINTS.md` solo si la sección satisface un punto existente.
- `specs/02-blanqueamiento-como-se-hace-pinned.md` y su referencia en `references/blanqueamiento-como-se-hace/` — no se editan (registro); el diseño base sigue siendo el de ese spec.
- Imágenes de `src/assets/images/` — sin cambios.

## Source of the content

- `docs/brief/textos-blanqueamiento.md:13-40` — h2 "¿Qué tipo de blanqueamiento dental es ideal para ti?", párrafo de introducción, 3 h3 (consultorio, casero, mixto), sus descripciones y las listas "Incluye:" (negritas parciales incluidas). Todo verbatim.
- `feature_list.json:239-250` — entrada `blanqueamiento-modalidades`, fuente del copy y de los criterios.
- Diseño y movimiento base: `specs/02-blanqueamiento-como-se-hace-pinned.md` y `references/blanqueamiento-como-se-hace/04-dentica-pinned-steps.png`.
- Los números `01`–`03` son un adorno, no contenido.
- Decisiones del mantenedor (2026-10-19): reemplaza a "Cómo se hace" y no conviven; "Incluye" debajo del párrafo con diseño más compacto; fotos existentes por ahora; número grande se mantiene como adorno; hooks genéricos sacados de `data-pasos`; `Pasos` reutilizable con props.

## Decisions made and discarded

- **Elegido:** componente genérico con props en `ui/sections/` y datos en `perpage/blanqueamiento/Modalidades.astro`. **Descartado:** copiar `Pasos.astro` a `Modalidades.astro` (dos copias del mismo escenario y del script) y parametrizar `Pasos.astro` en su sitio (el nombre sigue diciendo "pasos" y el componente seguiría dentro de una página).
- **Elegido:** mover el script a `animations/utils/` con selector `[data-pinned]` que itera instancias. Las instancias no conviven hoy, pero el cierre por instancia no cuesta nada y evita repetir la limitación del selector único cuando Rehabilitación Oral lo reutilice. **Descartado:** dejar `querySelector` único.
- **Elegido:** `<ul role="list">` en vez de `<ol>`: las modalidades no son una secuencia y el número grande es solo adorno (`aria-hidden`). El orden del brief se conserva en el DOM. **Descartado:** conservar `<ol>`, que anuncia un orden que no existe.
- **Elegido:** "Incluye" debajo del párrafo, compacta: encabezado "Incluye:" pequeño, ítems en `text-sm`, con viñeta tipográfica del sistema (tooth/turquoise de los tokens) y negritas solo donde el brief las pone. Se renderiza como `<ul>` semántico dentro del panel, no como chips ni acordeón. **Descartado:** acordeón/`<details>` en móvil (esconde contenido que el criterio exige verbatim y visible), chips (rompen las frases largas de los ítems) y columna aparte en desktop (el mantenedor pidió debajo del párrafo).
- **Elegido (confirmado por el mantenedor, 2026-10-19):** en móvil sin pin se mantiene el apilado de spec 02, pero cada panel pasa de `aspect-2/3 min-h-128` a `min-h-svh`, para que el contenido (párrafo + lista de 4) crezca en lugar de recortarse. Se usa `svh`, no `h-screen`/`100vh`: en móviles `100vh` incluye la barra del navegador y el panel se pasa del área visible; y `min-h` en vez de `h` fijo para que un panel con más texto no desborde con `overflow-hidden`. **Descartado:** mantener `aspect-2/3 min-h-128` y `h-svh` fijo (recorta si el contenido no cabe en ~560px de alto).
- **Elegido:** el pin ≥768px mantiene `100svh` menos el alto del nav, ahora con contenido más alto por panel: el texto del panel debe caber en ese alto en 768×1024 y 1280×720 (criterio de aceptación). Si no cabe, la lista pasa a dos columnas dentro del panel en `lg` antes de tocar el movimiento.
- **Elegido:** el h2 de la sección y la introducción viven en la cabecera previa al escenario, como el h2 actual; el logo de la muela sigue siendo adorno.
- **Elegido:** `Pasos.astro` no se borra: se mueve con `git mv`, así que el código sigue vivo bajo otro nombre y el historial se conserva. `Beneficios.astro` se conserva sin montar, como pidió el mantenedor.

## Acceptance criteria

- [x] `PinnedPanels.astro` no contiene copy de ninguna página; recibe todo por props (`id`, `title`, `intro?`, `panels`); `aria-labelledby` e `id` salen de la prop `id`.
- [x] No queda ninguna referencia a `data-pasos`, `Pasos.astro` ni `animations/blanqueamiento-dental/pasos` en `src/` (grep = 0), salvo comentarios históricos justificados.
- [x] La página renderiza el h2 "¿Qué tipo de blanqueamiento dental es ideal para ti?" y, debajo, el párrafo de introducción verbatim.
- [x] 3 h3 en este orden: "Blanqueamiento dental en consultorio", "Blanqueamiento dental casero", "Blanqueamiento dental mixto", cada uno con su descripción verbatim.
- [x] Consultorio y casero renderizan "Incluye:" con 3 y 4 ítems verbatim, con las negritas del brief; mixto no tiene lista.
- [x] El número `01`–`03` se ve, grande, y es `aria-hidden`; la lista de paneles es un `<ul>`.
- [x] Imágenes con `<Image>` de `astro:assets`, `firstcheck2`, `calmenvironment`, `postservice` en ese orden, `alt=""`.
- [x] La lista "Incluye" es compacta: cabe junto al título y al párrafo, sin recortes, en 390×844, 768×1024 y 1280×720 (pin activo en los dos últimos).
- [x] ≥768px sin reduced motion: pin con wipe `clip-path` entre los 3 paneles y salida limpia hacia la siguiente sección; la animación sigue animando solo `clip-path`, `transform` y `opacity`.
- [x] <768px: sin pin, paneles apilados con `min-h-svh`, contenido completo visible.
- [x] `prefers-reduced-motion: reduce` y sin JavaScript: los 3 paneles apilados, visibles y legibles.
- [x] Cruzar 768px con resize o cambiar la preferencia de movimiento revierte el stage y el pin sin espacio residual (sin regresión respecto a spec 02).
- [x] `blanqueamiento-dental.astro` monta `Modalidades` y no monta `Pasos` ni `Beneficios`; `Beneficios.astro` sigue en el repo.
- [x] La lógica GSAP vive en `animations/utils/pinned-panels.ts`; los componentes solo llevan hooks `data-pinned*`.
- [x] Sin colores escritos a mano, sin `style=""` inline ni valores arbitrarios de Tailwind; el HTML final no contiene `[CLIENTE]`.
- [x] `feature_list.json` queda actualizado (acceptance de `blanqueamiento-modalidades` y descripciones que nombran `Pasos`); `AGENTS.md` revisado.
- [ ] `pnpm check` sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.

## Implementation plan

1. Con `git mv`, mover `Pasos.astro` a `src/components/ui/sections/PinnedPanels.astro` y `pasos.ts` a `animations/utils/pinned-panels.ts`. Sin cambios de comportamiento todavía; ajustar solo los imports.
2. Con `front-end-astro`, generalizar `PinnedPanels.astro`: props tipadas, `ul`, ids por prop, hooks `data-pinned*`, bloque `includes` compacto bajo el párrafo, `min-h-svh` en móvil. Mantener el logo y el número como adorno.
3. Con `gsap-scrolltrigger`, adaptar `pinned-panels.ts` para inicializar cada `[data-pinned]` (selectores por instancia) sin cambiar la lógica del pin ni de `matchMedia`.
4. Crear `Modalidades.astro` con el copy verbatim de `textos-blanqueamiento.md:13-40` y el mapeo de imágenes; montarlo en `blanqueamiento-dental.astro` en lugar de `Pasos`.
5. Revisar en navegador: 390×844, 768×1024, 1280×720; reduced motion; sin JS; resize cruzando 768px.
6. Actualizar `feature_list.json` y revisar `AGENTS.md`.
7. `pnpm check` y `pnpm build`; comprobar cada criterio contra la página construida.
