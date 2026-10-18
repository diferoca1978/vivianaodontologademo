# 01 — Blanqueamiento Hero y Beneficios: animaciones

**Status:** Draft <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Añadir entradas GSAP sutiles al Hero y a la sección Beneficios de la página de Blanqueamiento Dental para dar continuidad visual a las secciones ya animadas del sitio. Respetar `prefers-reduced-motion` y mantener el contenido visible en todo momento para quienes prefieren movimiento reducido.

## Scope

**In:**
- Hero: animar de forma escalonada el texto y el CTA al cargar; la foto entra suavemente con un leve asentamiento de escala.
- Beneficios: revelar el título y los cuatro beneficios escalonadamente al entrar la sección en el viewport.
- Colocar hooks declarativos en Astro y la lógica GSAP en `src/utils/scripts/animations/blanqueamiento/`.
- En ambas animaciones, usar `gsap.matchMedia()` y dejar elementos en su estado final visible para movimiento reducido.

**Out:**
- Cambios de diseño, copy, contenido, SEO, navegación o datos de negocio.
- Animaciones continuas, parallax, interacciones activadas por hover o cambios en el Hero de inicio.
- Nuevas dependencias.

## Files affected

- `src/components/perpage/blanqueamiento/Hero.astro` — hooks de animación y carga del módulo de animación.
- `src/components/perpage/blanqueamiento/Beneficios.astro` — hooks para el título y cada beneficio.
- `src/utils/scripts/animations/blanqueamiento/hero.ts` — entrada GSAP del Hero.
- `src/utils/scripts/animations/blanqueamiento/beneficios.ts` — revelado de la sección al entrar en viewport.
- `AGENTS.md` no requiere cambios: el patrón, la ubicación y el requisito de movimiento reducido ya están documentados.

## Source of the content

- `src/components/perpage/blanqueamiento/Hero.astro:10-15, 31-79, 80-99` — copy y composición actuales del Hero.
- `src/components/perpage/blanqueamiento/Beneficios.astro:10-15, 18-59` — copy aprobado desde `services` y composición visual actual.
- Dirección de movimiento elegida por el usuario el 2026-10-17: Hero con entrada escalonada de texto/CTA y asentamiento suave de foto; Beneficios con revelado escalonado al entrar en viewport.

## Decisions made and discarded

- **Elegido:** entradas breves y escalonadas, con movimiento vertical discreto; asentamiento de escala leve solo para la foto del Hero. Mantiene el foco en el contenido y acompaña las composiciones ya aprobadas.
- **Descartado:** animaciones continuas, parallax y efectos de hover; no son necesarios para la lectura de estas secciones y añadirían movimiento persistente.
- **Elegido:** animación de Beneficios al entrar en viewport, una sola vez; el Hero anima al cargar. Separa el ritmo de apertura de página del contenido que aparece más abajo.
- **Descartado:** ocultar contenido mediante CSS antes de cargar JavaScript. Si JS no se ejecuta o hay movimiento reducido, el contenido debe seguir visible.

## Acceptance criteria

- [ ] El Hero de Blanqueamiento presenta una entrada GSAP escalonada para copy y CTA y un asentamiento suave de escala en la foto.
- [ ] Los elementos de Beneficios se revelan una vez al entrar en el viewport, con título seguido de los cuatro beneficios en secuencia.
- [ ] La lógica vive en archivos bajo `src/utils/scripts/animations/blanqueamiento/`, no dentro de componentes Astro.
- [ ] Cada animación usa `gsap.matchMedia()` con una rama explícita para `prefers-reduced-motion: reduce` que mantiene todos los elementos en estado final visible (`autoAlpha: 1`) y no oculta contenido.
- [ ] Sin JavaScript, el contenido permanece visible.
- [ ] No hay cambios en copy, SEO, contenido o estructura de diseño de las secciones.
- [ ] `pnpm check` termina sin errores, warnings ni hints.
- [ ] `pnpm build` termina correctamente y el gate SEO no introduce errores.
- [ ] Se actualizan `CHECKPOINTS.md` solo si el trabajo satisface un punto existente; no se modifica el estado de `feature_list.json` en nombre del mantenedor.

## Implementation plan

1. Añadir hooks `data-*` a los elementos existentes de ambas secciones, conservando su estado visible por defecto; importar los módulos desde sus componentes Astro.
2. Crear el módulo de entrada del Hero con timelines GSAP para el texto/CTA y el asentamiento de escala de la imagen; contemplar reduced motion con `gsap.matchMedia()`.
3. Crear el módulo de Beneficios con revelado único al entrar en viewport y rama explícita de reduced motion; evitar dejar elementos ocultos si no se ejecuta JavaScript.
4. Ejecutar `pnpm check` y `pnpm build`, revisar el resultado y confirmar los criterios de aceptación contra la página construida.
