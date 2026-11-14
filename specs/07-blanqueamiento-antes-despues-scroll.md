# 07 — Blanqueamiento: comparación antes/después con máscara al hacer scroll

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Añadir a `/blanqueamiento-dental/`, justo después de Modalidades, una sección que muestra la foto "antes" del blanqueamiento y, al hacer scroll, revela encima la foto "después" con un barrido horizontal. Se construye como componente genérico y reutilizable (como `PinnedPanels`). Ningún documento aprobado define esta sección: ni su diseño, ni su movimiento, ni sus textos. Por eso va por el carril completo.

## Scope

**In:**

- Componente genérico `src/components/ui/sections/BeforeAfter.astro`, sin copy de ninguna página. Props: `id`, `ariaLabel`, `before` y `after` (`ImageMetadata`), `beforeAlt`, `afterAlt`, `beforeLabel` y `afterLabel`.
- Datos y montaje en `src/components/perpage/blanqueamiento/AntesDespues.astro`: importa `beforewhitening.webp` (antes) y `afterwithening.webp` (después), pasa las etiquetas "Antes" / "Después" y los `alt`.
- Script `src/utils/scripts/animations/utils/before-after.ts`. Inicializa cada `[data-before-after]` de la página a través de los hooks `data-before-after*` (`-stage`, `-before`, `-after`, `-divider`).
- **Máscara:** barrido horizontal. La capa "después" pasa de `clip-path: inset(0 100% 0 0)` a `inset(0 0% 0 0)`, es decir, entra de izquierda a derecha. Una línea divisoria vertical fina (token del tema, `aria-hidden`) sigue el borde del corte.
- **Etiquetas:** "Antes" y "Después" van dentro de su propia capa, así que se ocultan y aparecen con ella. "Después" va arriba a la izquierda, porque su capa entra por la izquierda, y "Antes" arriba a la derecha.
- **≥768px, sin reduced motion:** la sección se fija (pin) con un alto de `100svh` menos el nav, como el stage de `PinnedPanels`. La foto va contenida en el contenedor del sitio (`max-w-7xl`, `px-4 xl:px-8`), en un marco 16:9 con `rounded-4xl`, centrado en vertical dentro del stage; si a esa anchura el 16:9 no cabe en el alto disponible, el marco se reduce hasta caber y quedan márgenes a los lados. El barrido va ligado al scroll (scrub) a lo largo de 1 pantalla (`end: "+=100%"`). Después, la salida hacia Seguridad es limpia.
- **<768px, sin reduced motion:** sin pin. Las dos capas se superponen en un marco `aspect-video` con `rounded-4xl` dentro del mismo contenedor (`px-4`), y el barrido avanza con scrub mientras el marco cruza el viewport.
- **Fondo y contenedor (todos los modos):** la sección usa el fondo ivory de la página (sin banda oscura) y las fotos van siempre dentro del contenedor del sitio con `rounded-4xl`, también en el layout base.
- **Reduced motion y sin JavaScript:** el layout base. Las dos fotos van apiladas, primero "Antes" y luego "Después", cada una con su etiqueta, ambas visibles. El script es el que superpone las capas, solo cuando hay movimiento permitido.
- Montar `AntesDespues` en `src/pages/blanqueamiento-dental.astro` entre `Modalidades` y `Seguridad`.
- Entrada nueva `blanqueamiento-antes-despues` en `feature_list.json`, con esta spec como `source`.

**Out:**

- Un h2, un párrafo o cualquier otro copy aparte de las etiquetas "Antes" / "Después" (decisión del mantenedor).
- Un aviso tipo "imagen ilustrativa": las fotos son de un paciente real (ver Decisiones).
- Re-exportar o alinear las fotos. El desfase de encuadre entre las dos se acepta tal cual.
- Un slider arrastrable o cualquier interacción que no sea el scroll.
- Las imágenes `whithtooth.webp` y `whitouttooth.webp`, que llegaron en el mismo lote, y usar `BeforeAfter` en Rehabilitación Oral u otras páginas (el componente lo permite, pero eso iría en otra spec o feature).
- Cambios en `pages.ts`, SEO, JSON-LD o el resto de secciones de la página.
- Nuevas dependencias.

## Files affected

- `src/components/ui/sections/BeforeAfter.astro`: nuevo, genérico y con props. Sigue la convención de `ui/sections/` que ya documenta `AGENTS.md`.
- `src/components/perpage/blanqueamiento/AntesDespues.astro`: nuevo, solo datos y montaje.
- `src/utils/scripts/animations/utils/before-after.ts`: nuevo. Es un script compartido por `data-*`, como `utils/pinned-panels.ts`.
- `src/pages/blanqueamiento-dental.astro`: monta `AntesDespues` tras `Modalidades`.
- `feature_list.json`: entrada nueva `blanqueamiento-antes-despues`. Hay que revisar si la descripción de `page-blanqueamiento` enumera las secciones y, si es así, añadirla.
- `src/assets/images/beforewhitening.webp` y `afterwithening.webp`: se usan tal cual, sin cambios.
- `AGENTS.md`: sin cambios. La convención de `ui/sections/` y de los scripts compartidos en `animations/utils/` ya está documentada y esta spec la sigue. `CHECKPOINTS.md` y `client-gaps.md`: sin cambios.

## Source of the content

- Las fotos son de un paciente real de la Dra. Viviana, con consentimiento para publicarlas. Lo confirmó el mantenedor el 2026-11-11.
- Etiquetas "Antes" / "Después": decisión del mantenedor (2026-11-11). Es el único texto visible de la sección.
- `ariaLabel` de la sección y `alt` de las fotos: texto de accesibilidad, no copy de marketing. Propuesta: sección "Antes y después del blanqueamiento dental"; `alt` "Sonrisa antes del blanqueamiento dental" y "La misma sonrisa después del blanqueamiento dental". Ninguno añade afirmaciones clínicas.

## Decisions made and discarded

- **Elegido (mantenedor, 2026-11-11):** va tras Modalidades. Primero se explican las opciones y después se muestra el efecto, antes de hablar de seguridad. **Descartado:** tras Intro (llega antes de explicar qué se hace) y antes del CtaFinal.
- **Elegido (mantenedor):** barrido horizontal con línea divisoria, el lenguaje clásico del antes/después, que deja ver los dos estados a la vez. **Descartados:** barrido vertical (repite el wipe de Modalidades, justo la sección anterior), círculo desde el centro y máscara con forma de muela (más compleja, con mask SVG, y la silueta tapa parte de la comparación).
- **Elegido (mantenedor):** pin solo desde 768px y, en móvil, scrub sin pin. Es el mismo criterio que las specs 02 y 04: en pantalla vertical, una foto 16:9 se queda pequeña dentro de un pin a pantalla completa. **Descartados:** pin en todos los anchos y sin pin en ningún ancho.
- **Elegido (mantenedor):** el pin dura 1 pantalla (`+=100%`). **Descartados:** 1,5 pantallas (hace la página pesada) y media pantalla (el efecto apenas se percibe).
- **Elegido (mantenedor, 2026-11-11, cambiado tras revisar la implementación):** foto contenida en el ancho del sitio, marco 16:9 con `rounded-4xl` sobre fondo ivory, con el pin conservado y el marco centrado y reducido para caber en el alto del stage. **Descartados:** full-bleed a pantalla (la primera elección; al verlo implementado no convenció), marco que llena el alto recortando la foto (deja de ser 16:9), quitar el pin en todos los anchos, esquinas rectas y mantener la banda charcoal.
- **Elegido (mantenedor):** solo las etiquetas, sin h2 ni aviso. Como no hay heading, la sección se nombra con `aria-label` y las fotos llevan un `alt` descriptivo, no `alt=""`, porque son el contenido de la sección. **Descartados:** "Etiquetas + aviso de imagen ilustrativa" (no aplica, porque el paciente es real) y un h2 propuesto por el agente (sería copy inventado y pendiente de la clienta).
- **Elegido (mantenedor):** dejar el desfase de encuadre entre las dos fotos: en "después" la boca está más abajo y con más zoom, y la línea de corte mostrará un salto. **Descartados:** re-exportarlas alineadas y compensarlo con `transform` o `object-position` (frágil y aproximado).
- **Elegido (mantenedor):** con reduced motion o sin JS, las dos fotos van apiladas con su etiqueta. Se conserva la comparación sin animación y se cumple la regla de `AGENTS.md` de no dejar contenido oculto. **Descartados:** mostrar solo "después" (se pierde la comparación) y la máscara congelada al 50%.
- **Elegido (mantenedor):** componente genérico en `ui/sections/` con el script en `animations/utils/`, siguiendo el patrón de `PinnedPanels`, así Rehabilitación Oral puede reutilizarlo sin copiar código. **Descartado:** componente y script solo para esta página.
- **Elegido:** se anima solo `clip-path` en la capa "después" y `transform` (x) en la divisoria, nunca `left` ni `width`, para no forzar el layout en cada frame (`gsap-performance`).

## Acceptance criteria

- [x] `BeforeAfter.astro` no contiene copy de ninguna página: todo llega por props (`id`, `ariaLabel`, `before`, `after`, `beforeAlt`, `afterAlt`, `beforeLabel`, `afterLabel`).
- [x] `blanqueamiento-dental.astro` monta `AntesDespues` justo después de `Modalidades` y antes de `Seguridad`.
- [x] La sección es un `<section>` con `aria-label` y no tiene h2. La página sigue con un solo `<h1>`.
- [x] Las dos fotos usan `<Image>` (o `<Picture>`) de `astro:assets` con `beforewhitening.webp` y `afterwithening.webp`, y su `alt` no está vacío.
- [x] El único texto visible son las etiquetas "Antes" y "Después". No hay aviso, h2 ni párrafo.
- [x] ≥768px sin reduced motion: la sección se fija, la foto va en un marco 16:9 `rounded-4xl` dentro del contenedor del sitio, centrado en vertical en el stage y reducido si no cabe en el alto (sin desbordar ni recortar el 16:9), y, durante 1 pantalla de scroll, la capa "después" se revela de izquierda a derecha con la divisoria pegada al borde del corte. Al soltar el pin, "después" está completa y no queda espacio residual.
- [x] <768px sin reduced motion: sin pin, marco `aspect-video` `rounded-4xl` dentro del contenedor (`px-4`) y barrido con scrub mientras cruza el viewport. Sin scroll horizontal en 390×844.
- [x] Cada etiqueta se oculta y aparece con su capa: al inicio solo se ve "Antes", y al final solo "Después".
- [x] `prefers-reduced-motion: reduce` y sin JavaScript: las dos fotos apiladas (antes y luego después), visibles completas y con su etiqueta, dentro del contenedor y con `rounded-4xl`.
- [x] La sección usa el fondo ivory de la página (sin `bg-charcoal`) en todos los modos.
- [x] Hacer un resize que cruce 768px, o cambiar la preferencia de movimiento, revierte el pin y los estilos sin espacio residual ni capas desalineadas (`gsap.matchMedia()` con revert).
- [x] La lógica GSAP vive en `animations/utils/before-after.ts`, que inicializa cada `[data-before-after]` de la página. Los componentes solo llevan hooks `data-before-after*`.
- [x] La animación solo toca `clip-path`, `transform` y `opacity`.
- [x] Sin colores escritos a mano, sin `style=""` inline, sin valores arbitrarios de Tailwind y sin `<svg>` inline.
- [x] Pin de Modalidades y pin de esta sección: el scroll hacia abajo y hacia arriba entre los dos funciona sin saltos (el orden de creación de los ScrollTrigger es correcto, o hay `refresh`).
- [x] `feature_list.json` tiene la entrada `blanqueamiento-antes-despues` y la descripción de la página está revisada.
- [x] `pnpm check` sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.

## Implementation plan

1. Con `front-end-astro`, crear `BeforeAfter.astro` con el layout base (las dos fotos apiladas, cada una con su etiqueta) más los hooks `data-before-after*`, la divisoria (`aria-hidden`, oculta en el layout base) y las props tipadas. Funciona sin JS.
2. Crear `AntesDespues.astro` con los imports de las fotos, las etiquetas y los `alt`, y montarlo en `blanqueamiento-dental.astro` entre `Modalidades` y `Seguridad`. Comprobar `pnpm check` y la página sin animación.
3. Con `gsap-scrolltrigger` (y `gsap-performance`), escribir `animations/utils/before-after.ts`. `gsap.matchMedia()` con tres ramas: ≥768px con movimiento (superponer las capas, pin `+=100%`, scrub del `clip-path` y del `x` de la divisoria), <768px con movimiento (superponer en `aspect-video`, scrub sin pin) y reduced motion (nada, se queda el layout base). Importarlo desde `BeforeAfter.astro`.
4. Revisar la convivencia con el pin de `PinnedPanels` justo encima: orden de inicialización y `ScrollTrigger.refresh()` si hace falta.
5. Revisar en el navegador en 390×844, 768×1024, 1280×720 y 1440×900: scroll de ida y vuelta, reduced motion, sin JS y un resize que cruce 768px.
6. Añadir la entrada `blanqueamiento-antes-despues` a `feature_list.json` y revisar la descripción de `page-blanqueamiento`.
7. `pnpm check` y `pnpm build`. Pasar `spec-verifier` y, si todo cumple, el mantenedor cambia el estado de la spec.
