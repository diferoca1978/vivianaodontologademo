# 02 — Blanqueamiento: sección "Cómo se hace" con pasos pinned

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Construir la sección "Cómo se hace" de la página de Blanqueamiento Dental como un escenario pinned a pantalla completa en el que, al hacer scroll, un panel (foto full-bleed, número gigante, título y descripción) da paso al siguiente con una transición ligada al scroll. Cumple la entrada `blanqueamiento-como-se-hace` de `feature_list.json` (copy del brief) y define el diseño y el movimiento, que ningún documento aprobado cubre.

## Scope

**In:**

- Nuevo componente `Pasos.astro` con `<h2>Cómo se hace</h2>` y un `<ol>` de 3 pasos (título + texto verbatim del brief), cada paso con su foto, número grande (`01`–`03`) y overlay oscuro para legibilidad.
- Montaje en `blanqueamiento-dental.astro`, a continuación de Beneficios.
- Desde `md` (≥768px): escenario pinned con ScrollTrigger (`pin` + `scrub`), transición entre pasos por **wipe con `clip-path`**: el panel entrante se revela sobre el saliente; número y texto del saliente suben y se desvanecen, los del entrante entran desde abajo. Sin snap.
- Por debajo de `md`: **sin pin**; los 3 pasos se apilan como paneles normales (alto ~80svh) con revelado simple al entrar en viewport.
- Lógica GSAP en `src/utils/scripts/animations/blanqueamiento-dental/pasos.ts`, con `gsap.matchMedia()`: rama `(min-width: 768px) and (prefers-reduced-motion: no-preference)` para el pin, rama móvil/sin pin para el revelado, y rama `(prefers-reduced-motion: reduce)` que deja los 3 pasos apilados, visibles y sin pin.
- Mapeo de imágenes (ya en `src/assets/images/`, hoy sin trackear): `firstcheck2.webp` → paso 1, `calmenvironment.webp` → paso 2, `postservice.webp` → paso 3.

**Out:**

- El enlace cruzado a Rehabilitación Oral (`blanqueamiento-enlace-cruzado`), las FAQ y el CTA final: son features aparte.
- Cambios en Hero y Beneficios, en `pages.ts`, en SEO, en JSON-LD o en la navegación.
- Snap/Observer, navegación por teclado entre pasos, indicador de progreso o barra lateral.
- Nuevas dependencias (GSAP y ScrollTrigger ya están en el proyecto).
- Reutilizar la sección para Rehabilitación Oral (su feature `rehabilitacion-como-se-hace` decidirá si extrae un componente compartido).

## Files affected

- `src/components/perpage/blanqueamiento/Pasos.astro` — nuevo; markup sin animación inline, hooks `data-*`, carga del módulo de animación.
- `src/pages/blanqueamiento-dental.astro` — importa y monta `Pasos` tras `Beneficios`.
- `src/utils/scripts/animations/blanqueamiento-dental/pasos.ts` — nuevo; pin, wipe y ramas de `matchMedia`.
- `feature_list.json` — la entrada `blanqueamiento-como-se-hace` conserva su `source` y `acceptance`; su `status` no cambia en este spec (lo gestiona `/spec-impl`/el mantenedor).
- `src/assets/images/{firstcheck2,calmenvironment,postservice}.webp` — ya existen; se incorporan al repo con la feature.
- `AGENTS.md` no requiere cambios: el patrón (`animations/<ruta>/<sección>.ts`, `gsap.matchMedia()`, reduced motion) ya está documentado.
- Nota de carpeta: `AGENTS.md` nombra la carpeta `blanqueamiento-dental/` (ya existe, vacía). El spec 01 menciona `blanqueamiento/`; este spec sigue `AGENTS.md`. Alinear ambos al implementar.

## Source of the content

- `docs/brief/textos-sitio.md:106-110` — H2 "Cómo se hace" y los 3 pasos (títulos y textos verbatim): Valoración inicial, Ambiente de calma, Aplicación y seguimiento.
- `feature_list.json:236-244` — entrada `blanqueamiento-como-se-hace` y sus criterios (`<ol>` de 3 pasos, h2).
- Los números `01`–`03` son ordinales de la lista, no contenido nuevo.
- Diseño: `references/blanqueamiento-como-se-hace/04-dentica-pinned-steps.png` (+ `references.md`, punto 04): sección pinned a pantalla completa, foto full-bleed con overlay oscuro, número gigante abajo-izquierda, título y descripción abajo-derecha, un paso por viewport.
- Imágenes elegidas por el usuario el 2026-10-17; mapeo confirmado en la fase de preguntas de este spec.

## Decisions made and discarded

- **Elegido:** wipe con `clip-path` ligado al scroll (`scrub`). Reproduce el cambio de panel de la referencia y da sensación de cortina sin ocultar contenido en el estado base. **Descartado:** crossfade (demasiado sutil para el efecto buscado) y snap con Observer (secuestra el scroll y rompe con Lenis).
- **Elegido:** sin pin en móvil, pasos apilados. El scrub pinned con scroll táctil y barra del navegador cambiante es frágil y el alto de pantalla es escaso para título + descripción. **Descartado:** pin en móvil y corte en `lg`; el usuario eligió explícitamente el corte móvil sin pin. El corte se fija en `md` (768px), el mismo que se usó en la pregunta.
- **Elegido:** el `<ol>` semántico se conserva en ambos modos; en el modo pinned los `<li>` son paneles superpuestos en un escenario `sticky`/pinned. El contenido está en el HTML en el orden del brief aunque el pin no se ejecute.
- **Elegido:** estado base visible sin JS: el CSS de base es el layout apilado; el modo pinned (paneles superpuestos) solo se activa desde JS (clase/atributo aplicado en la rama `min-width: 768px` de `matchMedia`) y se revierte al salir de ella. **Descartado:** apilar con CSS `md:absolute` en el estado base, porque sin JS dejaría pasos 2 y 3 ocultos bajo el 1.
- **Elegido:** overlay oscuro con los tokens `charcoal` con opacidad y texto `ivory`; sin colores escritos a mano ni estilos inline (los valores de `clip-path` los fija GSAP). La foto es decorativa respecto al texto del paso, por eso `alt=""` salvo que el implementador la justifique como informativa.
- **Elegido:** el escenario pinned usa un alto de `100svh` menos el alto del `NavBar` (es `sticky top-0` y ocupa flujo), de modo que el nav no compita con la foto, como pedía el "evitar" de la referencia. El `start` del trigger se alinea al borde inferior del nav. **Descartado:** nav transparente sobre la foto.
- **Elegido:** el `<h2>` "Cómo se hace" vive sobre el escenario, visible y legible, sin superponerse al número ni al texto del paso. Posición exacta (cabecera previa al pin o eyebrow dentro del panel) la resuelve el implementador con `front-end-astro`, dentro de la restricción de que sea visible en cada estado.
- **Elegido:** recorrido del pin ~100svh de scroll por transición (3 pasos = 2 transiciones + holds), `anticipatePin` y `invalidateOnRefresh` para resize/orientación. **Descartado:** `scrub: true` sin suavizado; se usa un `scrub` numérico pequeño para amortiguar junto a Lenis.
- **Elegido:** conservar la entrada de `feature_list.json` como fuente del copy y hacer de este spec el contrato de diseño/movimiento (full lane), porque el pinned no está documentado en ningún documento aprobado.

## Acceptance criteria

- [x] `Pasos.astro` renderiza `<h2>` "Cómo se hace" y un `<ol>` con exactamente 3 `<li>`, con título y texto verbatim de `docs/brief/textos-sitio.md:108-110`.
- [x] Las imágenes usan `<Image>`/`<Picture>` de `astro:assets` con `firstcheck2`, `calmenvironment` y `postservice` en ese orden, con `alt` presente.
- [x] Cada paso muestra número (`01`–`03`), título y texto sobre overlay oscuro con contraste AA para el texto (verificado visualmente).
- [x] A ≥768px y sin reduced motion, la sección se fija (pin) y el scroll controla la transición por wipe `clip-path` entre pasos 1→2→3; al terminar el último paso, el scroll continúa con normalidad hacia la siguiente sección sin saltos.
- [x] A <768px no hay pin: los 3 pasos se ven apilados, completos, con revelado simple al entrar en viewport.
- [x] Con `prefers-reduced-motion: reduce` no hay pin ni scrub: los 3 pasos se ven apilados y en estado final visible (`autoAlpha: 1`).
- [x] Sin JavaScript, los 3 pasos (imagen, número, título, texto) permanecen visibles y legibles.
- [x] Redimensionar el viewport cruzando 768px, o cambiar la preferencia de movimiento, restaura el layout correcto sin elementos ocultos ni espacio de pin residual (los `matchMedia` revierten).
- [x] La lógica vive en `src/utils/scripts/animations/blanqueamiento-dental/pasos.ts`, no en el componente Astro; los componentes solo llevan hooks `data-*`.
- [x] El nav sticky no tapa ni compite con la foto/paneles dentro del escenario pinned.
- [x] Sin colores escritos a mano, sin `style=""` inline ni valores arbitrarios de Tailwind; íconos (si los hay) desde `@/assets/icons/`.
- [x] Sin cambios en `pages.ts`, SEO, JSON-LD, Hero ni Beneficios; el HTML final no contiene `[CLIENTE]`.
- [x] La entrada `blanqueamiento-como-se-hace` de `feature_list.json` cumple sus criterios (h2 y `<ol>` de 3 pasos verbatim).
- [x] `CHECKPOINTS.md` se actualiza solo si la sección satisface un punto existente.
- [x] `pnpm check` termina sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.

## Implementation plan

1. Con `front-end-astro`, crear `Pasos.astro` sin animación: `<section aria-labelledby>`, `<h2>`, `<ol>` de 3 `<li>` apilados (layout base visible sin JS), imágenes, números, overlay con tokens y hooks `data-*` para escenario, paneles, número y texto. Copy desde `docs/brief/textos-sitio.md:108-110` (datos locales del componente, citando la fuente en un comentario como en `Beneficios.astro`).
2. Montar `Pasos` en `blanqueamiento-dental.astro` tras `Beneficios`; verificar que la página compila y la sección se ve correcta apilada en todos los tamaños.
3. Con `gsap-scrolltrigger`, `gsap-timeline` y `gsap-core`, crear `pasos.ts`: registrar ScrollTrigger y, dentro de `gsap.matchMedia()`, las tres ramas (desktop con motion, móvil sin pin, reduced motion). En desktop: activar el modo escenario, construir un timeline con `scrub` y `pin`, wipe `clip-path` entre paneles y desplazamiento/fade del número y texto. Con `gsap-performance`, animar solo `clip-path`, `transform` y `opacity`.
4. Importar el módulo desde `Pasos.astro` siguiendo el patrón de los demás componentes, y confirmar que Lenis y ScrollTrigger conviven (refresh tras carga de imágenes).
5. Revisar en navegador: desktop (pin, wipe, salida limpia), móvil (<768px apilado), reduced motion, sin JS, y cruce de 768px con resize.
6. Ejecutar `pnpm check` y `pnpm build`, y comprobar cada criterio de aceptación contra la página construida.
