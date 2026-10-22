# 01 — Blanqueamiento: animaciones de la página

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Añadir entradas GSAP sutiles a las secciones de la página de Blanqueamiento Dental que aún no se animan (Hero, Intro, Seguridad, Contraindicaciones y CTA final) para dar continuidad visual a las secciones ya animadas del sitio (home, Cuidados, FAQ y Modalidades). Respetar `prefers-reduced-motion` y mantener el contenido visible en todo momento para quienes prefieren movimiento reducido.

## Scope

**In:**

- Hero: animar de forma escalonada el texto y el CTA al cargar; la foto entra suavemente con un leve asentamiento de escala.
- Intro: el logo del diente de fondo se dibuja con el helper compartido `draw-tooth-logo`; la comilla, el párrafo y la línea turquesa aparecen escalonados, una sola vez, al entrar en viewport.
- Seguridad: el título (pregunta) sube y se desvanece primero; el bloque de respuesta (con su filete turquesa) le sigue, una sola vez, al entrar en viewport.
- Contraindicaciones: la columna izquierda (pregunta y frase introductoria), los cinco casos (escalonados) y el panel CTA aparecen en secuencia al entrar en viewport, cada grupo con su propio disparador.
- CTA final: mismo tratamiento que `home/cta-final.ts` (logo dibujado y titular + botón con subida escalonada, una sola vez).
- Colocar hooks declarativos `data-*` en Astro y la lógica GSAP en `src/utils/scripts/animations/blanqueamiento-dental/`, un archivo por sección.
- En todas las animaciones, usar `gsap.matchMedia()` y dejar los elementos en su estado final visible para movimiento reducido.
- Actualizar los comentarios de cabecera de `Intro.astro`, `Seguridad.astro`, `Contraindicaciones.astro` y `CtaFinal.astro` que hoy dicen "No animation".

**Out:**

- Cambios de diseño, copy, contenido, SEO, navegación o datos de negocio.
- Animaciones continuas, parallax, interacciones activadas por hover (los hovers existentes no cambian) o cambios en el Hero de inicio.
- Beneficios: la sección salió de la página el 2026-10-19 (spec 04 y `feature_list.json`) y el archivo solo se conserva como referencia; no se anima aquí.
- Las secciones que ya tienen animación: Cuidados (`cuidados.ts`), FAQ (`faq.ts`) y Modalidades (`PinnedPanels`).
- Nuevas dependencias.

## Files affected

- `src/components/perpage/blanqueamiento/Hero.astro` — hooks de animación y carga del módulo de animación.
- `src/components/perpage/blanqueamiento/Intro.astro` — hooks para el logo, la comilla, el párrafo y la línea.
- `src/components/perpage/blanqueamiento/Seguridad.astro` — hooks para la pregunta y la respuesta.
- `src/components/perpage/blanqueamiento/Contraindicaciones.astro` — hooks para la cabecera, cada caso y el panel CTA.
- `src/components/perpage/blanqueamiento/CtaFinal.astro` — hooks para el logo y los elementos del titular/botón.
- `src/utils/scripts/animations/blanqueamiento-dental/hero.ts` — entrada GSAP del Hero.
- `src/utils/scripts/animations/blanqueamiento-dental/intro.ts` — logo dibujado y revelado escalonado.
- `src/utils/scripts/animations/blanqueamiento-dental/seguridad.ts` — revelado de pregunta y respuesta.
- `src/utils/scripts/animations/blanqueamiento-dental/contraindicaciones.ts` — revelado de cabecera, casos y panel.
- `src/utils/scripts/animations/blanqueamiento-dental/cta-final.ts` — logo dibujado y revelado del CTA.
- `AGENTS.md` no requiere cambios: el patrón, la ubicación (`blanqueamiento-dental/` ya figura en la lista de carpetas por ruta) y el requisito de movimiento reducido ya están documentados.

## Source of the content

- `src/components/perpage/blanqueamiento/Hero.astro:10-15, 31-79, 80-99` — copy y composición actuales del Hero.
- `src/components/perpage/blanqueamiento/{Intro,Seguridad,Contraindicaciones,CtaFinal}.astro` — copy y composición actuales (verbatim del brief, ver cabeceras de cada componente); esta spec no los modifica.
- Patrones de referencia ya aprobados en el sitio: `home/cta-final.ts` (CTA final), `home/sobre.ts` (logo + revelado escalonado), `blanqueamiento-dental/cuidados.ts` y `utils/draw-tooth-logo.ts` (logo dibujado).
- Dirección de movimiento elegida por el usuario el 2026-10-17: Hero con entrada escalonada de texto/CTA y asentamiento suave de foto. (Beneficios se retiró de la spec el 2026-10-22: ya no está en la página.)
- Ampliación del 2026-10-22 (petición del usuario): extender el mismo lenguaje de movimiento a Intro, Seguridad, Contraindicaciones y CTA final, tomando como modelo las animaciones del home. Los detalles por sección de arriba son propuesta del borrador y quedan sujetos a la revisión humana.

## Decisions made and discarded

- **Elegido:** entradas breves y escalonadas, con movimiento vertical discreto; asentamiento de escala leve solo para la foto del Hero. Mantiene el foco en el contenido y acompaña las composiciones ya aprobadas.
- **Descartado:** animaciones continuas, parallax y efectos de hover; no son necesarios para la lectura de estas secciones y añadirían movimiento persistente.
- **Elegido:** animación del resto de secciones al entrar en viewport, una sola vez; el Hero anima al cargar. Separa el ritmo de apertura de página del contenido que aparece más abajo.
- **Descartado:** ocultar contenido mediante CSS antes de cargar JavaScript. Si JS no se ejecuta o hay movimiento reducido, el contenido debe seguir visible.
- **Elegido:** un archivo por sección en `blanqueamiento-dental/` (convención de `AGENTS.md`), reutilizando `drawToothLogo` en lugar de duplicar la lógica del logo.
- **Elegido:** en Contraindicaciones, animar los hijos de la columna izquierda y no el contenedor `sticky`, para no aplicar un `transform` al elemento que se pega al hacer scroll.
- **Descartado:** `SplitText` en los títulos de Seguridad y Contraindicaciones. En el home solo se usa en `Sobre` por su titular con pesos mixtos; aquí una subida por bloque basta y evita el coste de esperar a las fuentes.
- **Corregido:** la versión anterior de esta spec apuntaba a `animations/blanqueamiento/`; la carpeta real es `animations/blanqueamiento-dental/`.

## Acceptance criteria

- [x] El Hero de Blanqueamiento presenta una entrada GSAP escalonada para copy y CTA y un asentamiento suave de escala en la foto.
- [x] En Intro, el logo de fondo se dibuja y la comilla, el párrafo y la línea aparecen en secuencia, una sola vez, al entrar en viewport.
- [x] En Seguridad, la pregunta aparece primero y la respuesta después, una sola vez, al entrar en viewport.
- [x] En Contraindicaciones, la cabecera, los cinco casos (escalonados) y el panel CTA se revelan una sola vez cada grupo; el contenedor `sticky` no recibe `transform`.
- [x] En CTA final, el logo se dibuja y el titular y el botón suben escalonados, igual que en `home/cta-final.ts`.
- [x] El enlace a Rehabilitación Oral (cuando se muestra) y el botón de WhatsApp del CTA final siguen siendo visibles y clicables al terminar y durante la animación.
- [x] La lógica vive en archivos bajo `src/utils/scripts/animations/blanqueamiento-dental/`, no dentro de componentes Astro, un archivo por sección.
- [x] Cada animación usa `gsap.matchMedia()` con una rama explícita para `prefers-reduced-motion: reduce` que mantiene todos los elementos en estado final visible (`autoAlpha: 1`) y no oculta contenido.
- [x] Sin JavaScript, el contenido permanece visible.
- [x] No hay cambios en copy, SEO, contenido o estructura de diseño de las secciones; solo se añaden atributos `data-*` y se actualizan los comentarios de cabecera que decían "No animation".
- [x] `pnpm check` termina sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.
- [x] Se actualizan `CHECKPOINTS.md` solo si el trabajo satisface un punto existente; no se modifica el estado de `feature_list.json` en nombre del mantenedor.

## Implementation plan

1. Añadir hooks `data-*` a los elementos existentes de las seis secciones, conservando su estado visible por defecto; importar cada módulo desde su componente Astro (como `Cuidados.astro` y `home/CtaFinal.astro`).
2. Crear el módulo de entrada del Hero con timelines GSAP para el texto/CTA y el asentamiento de escala de la imagen; contemplar reduced motion con `gsap.matchMedia()`.
3. Crear `intro.ts`, `seguridad.ts`, `contraindicaciones.ts` y `cta-final.ts` siguiendo el patrón de `home/cta-final.ts` y `home/sobre.ts` (`gsap.from` con `scrollTrigger: { once: true }`, rama reduced motion con `gsap.set(..., { autoAlpha: 1, clearProps: "transform" })`, `drawToothLogo` donde hay logo).
4. Actualizar los comentarios de cabecera de los cuatro componentes que decían "No animation".
5. Ejecutar `pnpm check` y `pnpm build`, revisar el resultado y confirmar los criterios de aceptación contra la página construida, incluido el comportamiento con movimiento reducido.
