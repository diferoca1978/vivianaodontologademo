# 03 — Blanqueamiento: hero más ligero e introducción destacada

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Aligerar el hero de la página de Blanqueamiento Dental: la introducción sale del hero y pasa a una sección propia, justo debajo, presentada como texto destacado (estilo cita); los highlights (ahora 2) se quedan como los dejó el mantenedor (con íconos propios). La introducción usa una versión más corta que la del brief, por decisión del mantenedor. Ningún documento aprobado define este diseño ni esta versión del texto, de ahí el carril completo.

## Scope

**In:**

- Quitar la introducción de `Hero.astro` (ya quitada en el árbol de trabajo por el mantenedor el 2026-10-19; este spec la formaliza). El hero conserva breadcrumb, `<h1>`, subtítulo, los 2 highlights, el CTA y la foto.
- Nuevo componente `Intro.astro`, montado inmediatamente después del hero, con la introducción en versión corta como texto destacado: un único `<p>` de texto HTML real, tipografía grande, sin encabezado propio.
- Ajustar el layout del hero ahora que pierde el párrafo (alturas, espaciado, posición del CTA). Ya hecho por el mantenedor el 2026-10-19: `lg:h-screen`, degradado inferior ivory hacia la siguiente sección y CTA en `lg:bottom-16`.
- Actualizar `feature_list.json` (criterios de `blanqueamiento-hero`, entrada nueva para la introducción) y dejar constancia en `client-gaps.md` de que el texto corto espera confirmación de la clienta.

**Out:**

- Cambios en los 2 highlights: el mantenedor los dejó como los quiere el 2026-10-19 (íconos `moodsearch` y `threefingers`; orden "Valoración clínica previa:" y luego "Tres modalidades:"); ni copy ni diseño se tocan.
- Cambios en el subtítulo, el `<h1>`, el CTA (etiqueta y destino), la breadcrumb o la foto.
- Animaciones: el spec 01 (movimiento del hero, aún Draft) se revisa aparte para ajustarlo a este nuevo hero. Aquí no se añade movimiento.
- Cambios en `pages.ts`, meta title/description, JSON-LD, navegación o en las demás secciones.
- Nuevas dependencias.
- Editar `docs/brief/textos-blanqueamiento.md` (documento del cliente; la versión corta se registra como decisión, no se reescribe el brief).

## Files affected

- `src/components/perpage/blanqueamiento/Hero.astro` — sin la introducción (ya hecho); highlights intactos; layout y comentarios de cabecera al día.
- `src/assets/icons/{threefingers,moodsearch}.svg` — íconos nuevos de los highlights (hoy sin trackear; se incorporan al repo con este cambio). `office.svg` quedó sin uso al quitar el tercer highlight.
- `references/highlights-awwwards/` y `references/highlights-clinica-dental/` — referencias de los highlights ya reunidas por el mantenedor; al implementar se podan según la regla de AGENTS.md (solo queda la usada).
- `src/components/perpage/blanqueamiento/Intro.astro` — nuevo; introducción destacada.
- `src/pages/blanqueamiento-dental.astro` — monta `Intro` entre `Hero` y `Beneficios`.
- `feature_list.json` — `blanqueamiento-hero`: se quita el criterio de la introducción y se actualiza el de los highlights; nueva entrada `blanqueamiento-intro`. Los cambios de `status` los gestiona `/spec-impl` y el mantenedor.
- `client-gaps.md` — nuevo punto: versión corta de la introducción pendiente de confirmación de la clienta (y las diferencias respecto al brief, ver abajo).
- `AGENTS.md` no requiere cambios.

## Source of the content

- `docs/brief/textos-blanqueamiento.md:7-9` — los 3 puntos del brief; el hero muestra 2 (el mantenedor quitó "En consultorio:" el 2026-10-19, a confirmar con la clienta). Copy como está hoy en el hero: "revision" se escribe "revisión" y "3 modalidades" se escribe "Tres modalidades" (decisión del mantenedor; el resto verbatim). Los dos puntos pasan a formar parte del `lead` en negrita.
- `docs/brief/textos-blanqueamiento.md:5` — introducción completa del brief. **No se usa tal cual.**
- Decisión del mantenedor, 2026-10-19: usar una versión corta de la introducción. Texto, con una corrección de puntuación (ver Decisiones):

  > El blanqueamiento o aclaramiento dental es un procedimiento estético que aclara el tono de tus dientes naturales y reduce pigmentaciones. En el consultorio de la Dra. Viviana Rodríguez, realizamos el procedimiento con un protocolo planificado, supervisión profesional y un ambiente diseñado para tu tranquilidad.

- Diferencias respecto al brief anterior (el texto largo de `textos-sitio.md` §2 y del hero viejo; a confirmar con la clienta): se pierde "en Chicó" y "su nombre clínico", y la forma "nuestro consultorio" pasa a "el consultorio de la Dra. Viviana Rodríguez". `textos-blanqueamiento.md:5` ya trae una versión casi idéntica (solo cambian "lo realizamos"/"pensado" por "realizamos el procedimiento"/"diseñado"). Chicó sigue en la meta description; ningún dato nuevo se introduce.

## Decisions made and discarded

- **Elegido:** la introducción es un `<p>` normal estilizado como texto destacado. **Descartado:** `<blockquote>`, porque no es una cita de nadie y marcarla así es semánticamente falso; **descartado también** comillas como parte del texto (si se usan comillas decorativas, van con CSS o `aria-hidden`).
- **Elegido:** la sección sigue siendo texto HTML, visible en móvil y desktop, en un solo bloque contiguo. **Descartado:** ocultarla en móvil o convertirla en imagen o pseudo-elemento (pierde peso para Google y para extracción por IA).
- **Elegido:** sin encabezado propio en la sección introductoria (`<section aria-label>`). **Descartado:** `<h2>`; ensuciaría el esquema de encabezados con un título que no está en el brief.
- **Elegido:** la introducción va justo después del hero, antes de Beneficios, para seguir dentro de las primeras 100 palabras del contenido principal (estimado: unas 50 palabras de breadcrumb, H1, subtítulo, highlights y CTA la preceden). **Descartado:** moverla más abajo.
- **Elegido:** versión corta del texto, por decisión del mantenedor, quedando como pendiente de la clienta en `client-gaps.md`. **Descartado:** usar la versión del brief y acortar solo con CSS (recortes visuales ocultando texto).
- **Corrección de puntuación propuesta (a aprobar):** el texto del mantenedor decía "dental,es" (sin espacio) y llevaba coma entre sujeto y verbo; se escribe "dental es". Si se prefiere conservar la coma, se cambia aquí antes de aprobar.
- **Elegido:** los 2 highlights se quedan como están (decisión del mantenedor, 2026-10-19, que reemplaza su petición anterior de rediseñarlos y quita el tercero, "En consultorio:"). **Descartado:** rediseñarlos más. El diseño aprobado es el que está hoy en `Hero.astro`: lista vertical con un ícono a la izquierda de cada ítem (`moodsearch`, `threefingers`) y lead en negrita. Las referencias reunidas no cambian el resultado.
- **Elegido:** el subtítulo del hero se queda; este spec no lo toca.

## Acceptance criteria

- [x] `Hero.astro` ya no contiene la introducción; mantiene breadcrumb, un único `<h1>` "Blanqueamiento Dental en Bogotá", el subtítulo, los 3 highlights, el CTA "Agenda tu valoración" y la foto.
- [x] `Intro.astro` existe y se monta entre `Hero` y `Beneficios`; contiene el texto de "Source of the content" en un único `<p>`, sin `<blockquote>` ni encabezado.
- [x] El `<p>` es visible en móvil y desktop (no hay `display:none` en ningún breakpoint) y el texto está en el HTML construido.
- [x] En el HTML construido, el primer carácter de la introducción cae dentro de las primeras 100 palabras del contenido principal.
- [x] Los 2 highlights quedan idénticos a los actuales: `<ul>` con "Valoración clínica previa:" y "Tres modalidades:" en negrita, su texto, y los íconos `moodsearch` y `threefingers` (decorativos, `aria-hidden`); el diff de `Hero.astro` no los modifica.
- [x] Los comentarios de cabecera de `Hero.astro` ya no mencionan la introducción como contenido del hero.
- [ ] A 390, 1024 y 1440 px el hero no tiene scroll horizontal, los highlights no se solapan con el CTA y el contraste del texto es AA.
- [x] Sin colores escritos a mano, sin `style=""` inline ni valores arbitrarios de Tailwind; íconos desde `@/assets/icons/`.
- [x] `feature_list.json`: `blanqueamiento-hero` ya no exige la introducción y la nueva entrada `blanqueamiento-intro` tiene `source` y `acceptance`; ambas cumplen sus criterios.
- [x] `client-gaps.md` registra la versión corta como pendiente de la clienta, con las diferencias respecto al brief.
- [x] Sin cambios en `pages.ts`, SEO, JSON-LD, navegación, Beneficios ni Pasos; el HTML final no contiene `[CLIENTE]`.
- [x] `pnpm check` termina sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.

## Implementation plan

1. Actualizar `feature_list.json` (criterios de `blanqueamiento-hero`, nueva entrada `blanqueamiento-intro` con la `source` de este spec) y añadir el punto de `client-gaps.md`.
2. Con `front-end-astro`, crear `Intro.astro` con el texto destacado, tokens del sitio, responsive y sin animación.
3. Con `front-end-astro`, revisar `Hero.astro` (la introducción ya está quitada): reajustar alturas y espaciado si hace falta, actualizar los comentarios de cabecera y no tocar los highlights.
4. Montar `Intro` en `blanqueamiento-dental.astro` entre `Hero` y `Beneficios`.
5. Revisar en navegador a 390, 1024 y 1440 px y ejecutar `pnpm check` y `pnpm build`; comprobar cada criterio contra la página construida (`spec-verifier`).
