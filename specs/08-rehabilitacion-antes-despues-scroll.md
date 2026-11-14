# 08 — Rehabilitación Oral: comparación antes/después con máscara al hacer scroll

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Añadir a `/rehabilitacion-oral/`, justo después de ComoSeHace, la misma comparación antes/después de la spec 07: la foto "antes" (diente ausente) y, al hacer scroll, la foto "después" revelada encima con un barrido horizontal. Reutiliza sin cambios el componente genérico `ui/sections/BeforeAfter.astro` y su script; esta spec solo aporta los datos y el montaje. Va por el carril completo porque ningún documento aprobado define esta sección en la página.

## Scope

**In:**

- Datos y montaje en `src/components/perpage/rehabilitacion/AntesDespues.astro`: importa `whitouttooth.webp` (antes) y `whithtooth.webp` (después), pasa las etiquetas "Antes" / "Después", el `ariaLabel` y los `alt`, y renderiza `BeforeAfter`.
- Montar `AntesDespues` en `src/pages/rehabilitacion-oral.astro` entre `ComoSeHace` y `EnlaceCruzado`.
- Diseño y movimiento idénticos a la spec 07, heredados del componente sin tocarlo:
  - Barrido horizontal: la capa "después" entra de izquierda a derecha (`clip-path`) con la divisoria vertical siguiendo el corte. "Después" arriba a la izquierda y "Antes" arriba a la derecha, cada etiqueta dentro de su capa.
  - ≥768px sin reduced motion: pin de 1 pantalla (`+=100%`), marco 16:9 `rounded-4xl` dentro del contenedor del sitio, centrado y reducido para caber en el stage.
  - <768px sin reduced motion: sin pin, marco `aspect-video` `rounded-4xl` en el contenedor (`px-4`), barrido con scrub.
  - Reduced motion y sin JS: las dos fotos apiladas ("Antes" y luego "Después"), cada una con su etiqueta.
  - Fondo ivory, sin h2 ni otro copy aparte de las etiquetas.
- Entrada nueva `rehabilitacion-antes-despues` en `feature_list.json`, con esta spec como `source`.

**Out:**

- Cualquier cambio en `BeforeAfter.astro` o `animations/utils/before-after.ts`. Si al implementar hiciera falta tocarlos, se para y se consulta, porque afectaría también a Blanqueamiento.
- Un h2, un párrafo, un aviso de "imagen ilustrativa" o nombrar el tratamiento aplicado (corona, implante…) en cualquier texto.
- Re-exportar o alinear las fotos: el desfase de encuadre se acepta tal cual, como en la 07.
- Cambios en `pages.ts`, SEO, JSON-LD o el resto de secciones de la página.
- Nuevas dependencias.

## Files affected

- `src/components/perpage/rehabilitacion/AntesDespues.astro`: nuevo, solo datos y montaje (mismo patrón que `perpage/blanqueamiento/AntesDespues.astro`).
- `src/pages/rehabilitacion-oral.astro`: importa y monta `AntesDespues` tras `ComoSeHace`.
- `feature_list.json`: entrada nueva `rehabilitacion-antes-despues`. La descripción de `page-rehabilitacion` no enumera secciones, así que no cambia.
- `src/assets/images/whitouttooth.webp` y `whithtooth.webp`: se usan tal cual.
- `src/components/ui/sections/BeforeAfter.astro` y `src/utils/scripts/animations/utils/before-after.ts`: sin cambios.
- `src/components/perpage/rehabilitacion/CuandoTratamientos.astro`: la foto del ítem "Pérdida de uno o varios dientes" pasa de `missing-tooth.webp` a `whitouttooth.webp` (ver § Decisions). Cambio añadido por el mantenedor durante la implementación.
- `AGENTS.md`: sin cambios; la convención de `ui/sections/` + `perpage/<page>/` ya está documentada y esta spec la sigue. `CHECKPOINTS.md` y `client-gaps.md`: sin cambios.

## Source of the content

- Las fotos son de un paciente real de la Dra. Viviana, con consentimiento para publicarlas. Lo confirmó el mantenedor el 2026-11-11.
- Etiquetas "Antes" / "Después": las mismas que decidió el mantenedor en la spec 07 (2026-11-11). Es el único texto visible de la sección.
- `ariaLabel` y `alt`: texto de accesibilidad, no copy de marketing. Propuesta del agente, neutra y sin afirmaciones clínicas: sección "Antes y después de la rehabilitación oral"; `alt` "Sonrisa con un diente ausente antes de la rehabilitación oral" y "La misma sonrisa después de la rehabilitación oral".

## Decisions made and discarded

- **Elegido (mantenedor, 2026-11-11):** aplicar la spec 07 tal cual a Rehabilitación Oral, reutilizando `BeforeAfter` sin cambios. Todas las decisiones de diseño y movimiento de la 07 (barrido horizontal, pin ≥768px de 1 pantalla, scrub sin pin en móvil, marco contenido 16:9 `rounded-4xl`, layout apilado con reduced motion o sin JS, solo etiquetas, desfase de encuadre aceptado) se heredan sin reabrirlas; ver `specs/07-blanqueamiento-antes-despues-scroll.md` § Decisions. **Descartado:** un componente o un script propios de esta página.
- **Elegido (mantenedor):** va tras ComoSeHace y antes de EnlaceCruzado: primero se explica el proceso y después se muestra el resultado, el mismo criterio que la 07. **Descartados:** entre CuandoTratamientos y ComoSeHace (muestra el resultado antes del proceso y deja tres pins seguidos) y justo tras el Hero.
- **Elegido (mantenedor):** paciente real con consentimiento, así que no lleva aviso de "imagen ilustrativa".
- **Elegido (agente, pendiente de revisión al aprobar):** `alt` neutros que describen lo visible (un diente ausente) sin nombrar el tratamiento aplicado. **Descartado:** "…con el diente restaurado con una corona", porque es una afirmación clínica que no está confirmada por la clienta.
- **Convivencia de pins:** ComoSeHace se fija con su propio script (`rehabilitacion-oral/como-se-hace.ts`) y está antes en el DOM, así que su ScrollTrigger se crea antes que el de `before-after.ts` (Astro emite los scripts en orden de DOM; mismo caso verificado en la 07 con PinnedPanels). Se verifica en el navegador; `refresh` o `refreshPriority` solo si aparece un salto.
- **Elegido (mantenedor, 2026-11-11, durante la implementación):** en CuandoTratamientos, el ítem "Pérdida de uno o varios dientes" usa `whitouttooth.webp` en lugar de `missing-tooth.webp`. Es una excepción explícita a la exclusión de Scope "Out" sobre el resto de secciones de la página. `missing-tooth.webp` dejó de usarse y se borró de `src/assets/images/` el 2026-11-14 (limpieza del repo).

## Acceptance criteria

- [x] `perpage/rehabilitacion/AntesDespues.astro` solo contiene datos y monta `BeforeAfter` con `id`, `ariaLabel`, `before`, `after`, `beforeAlt`, `afterAlt`, `beforeLabel` y `afterLabel`.
- [x] `git diff` no toca `BeforeAfter.astro` ni `animations/utils/before-after.ts`.
- [x] `rehabilitacion-oral.astro` monta `AntesDespues` justo después de `ComoSeHace` y antes de `EnlaceCruzado`.
- [x] La sección es un `<section>` con `aria-label="Antes y después de la rehabilitación oral"` y no tiene h2. La página sigue con un solo `<h1>`.
- [x] Las fotos son `whitouttooth.webp` (antes) y `whithtooth.webp` (después), servidas con `<Image>` de `astro:assets` y con los `alt` de § Source of the content.
- [x] El único texto visible son las etiquetas "Antes" y "Después".
- [x] ≥768px sin reduced motion: la sección se fija durante 1 pantalla, el marco 16:9 `rounded-4xl` va en el contenedor y centrado, la capa "después" se revela de izquierda a derecha con la divisoria pegada al corte, y al soltar el pin "después" está completa sin espacio residual.
- [x] <768px sin reduced motion: sin pin, barrido con scrub y sin scroll horizontal en 390×844.
- [x] Al inicio solo se ve la etiqueta "Antes" y al final solo "Después".
- [x] `prefers-reduced-motion: reduce` y sin JavaScript: las dos fotos apiladas, completas y con su etiqueta.
- [x] Scroll de ida y vuelta entre el pin de ComoSeHace, esta sección y EnlaceCruzado sin saltos ni solapes.
- [x] Un resize que cruce 768px revierte el pin sin espacio residual ni capas desalineadas.
- [x] /blanqueamiento-dental/ sigue funcionando igual (su antes/después no cambia).
- [x] `feature_list.json` tiene la entrada `rehabilitacion-antes-despues`.
- [x] `pnpm check` sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.

## Implementation plan

1. Crear `src/components/perpage/rehabilitacion/AntesDespues.astro` copiando el patrón de `perpage/blanqueamiento/AntesDespues.astro`, con las fotos `whitouttooth.webp` / `whithtooth.webp`, el `id` `antes-y-despues`, el `ariaLabel` y los `alt` de esta spec.
2. Importarlo y montarlo en `src/pages/rehabilitacion-oral.astro` entre `ComoSeHace` y `EnlaceCruzado`. `pnpm check`.
3. Revisar en el navegador /rehabilitacion-oral/ en 390×844, 768×1024, 1280×720 y 1440×900: scroll de ida y vuelta (sobre todo la transición desde el pin de ComoSeHace), reduced motion, sin JS y un resize que cruce 768px. Comprobar de paso que /blanqueamiento-dental/ no cambia.
4. Añadir la entrada `rehabilitacion-antes-despues` a `feature_list.json`.
5. `pnpm check` y `pnpm build`. Pasar `spec-verifier` y, si todo cumple, el mantenedor cambia el estado de la spec.
