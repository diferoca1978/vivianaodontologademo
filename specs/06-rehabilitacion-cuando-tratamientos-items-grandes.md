# 06 — Rehabilitación Oral: ítems más grandes en "Cuándo la necesitas" y "Tratamientos incluidos"

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Aumentar el tamaño de las burbujas (círculo con foto y pastilla con texto) del bloque `CuandoTratamientos` de Rehabilitación Oral, para que las fotos se vean mejor. Pedido por el mantenedor el 2026-11-03. El tamaño no está escrito en ningún documento aprobado y agrandar los círculos obliga a reubicar los slots que definió la spec 05, por eso va por el carril completo.

## Scope

**In:**

- Círculo de la burbuja en ≥768px, de 112/128/144 px (md/lg/xl) a **144/176/208 px**. En <768px, de 96 a **112 px**.
- Pastilla con el texto: un paso más de tamaño (`text-base` desde md y `lg:text-lg`), sin saltos de línea en ≥768px.
- Icono de respaldo (`ToothOutline`) del círculo sin foto, escalado en proporción.
- Reubicar los 5 slots (TL, TC, TR, BL, BR) lo mínimo necesario para que no haya choques, manteniendo las 4 esquinas en el mismo sitio en los dos estados y TC solo en "Tratamientos".
- Subir los `widths` y el `sizes` de `<Image>` para que Astro genere imágenes a la nueva resolución (2× del círculo más grande).

**Out:**

- Cambiar el copy, las fotos, el orden o los h2 de las dos secciones.
- Cambiar el movimiento: el pin, el swap, el reduced motion y el comportamiento al cruzar 768px no se tocan (`cuando-tratamientos.ts` sigue igual).
- Cambiar el tamaño del h2.
- Nuevas fotos o recortes (las originales miden 768 px o más de ancho).
- Cualquier otra sección de la página.

## Files affected

- `src/components/perpage/rehabilitacion/CuandoTratamientos.astro` — tamaños del círculo y de la pastilla, tamaño del icono de respaldo, clases de posición de `slots`, `widths` y `sizes` de `<Image>`, y el comentario de cabecera.
- `specs/05-rehabilitacion-cuando-tratamientos-swap.md` — no cambia: sigue en `Implemented`. Esta spec reemplaza solo los tamaños y las posiciones de los slots.
- `AGENTS.md`, `feature_list.json`, `client-gaps.md`, `src/config/*` y `docs/brief/` — sin cambios: no hay copy, datos ni convención nueva.
- `src/utils/scripts/animations/rehabilitacion-oral/cuando-tratamientos.ts` — sin cambios; solo se verifica que el stage no se desborde.

## Decisions made and discarded

- **Elegido (mantenedor, 2026-11-03):** círculos de 144/176/208 px en md/lg/xl, un crecimiento de entre un 29% y un 45% sobre los 112/128/144 de hoy. **Descartados:** 128/160/192 (un cambio más discreto) y 160/208/240 (casi el doble, que obligaría a reorganizar buena parte del layout).
- **Elegido:** la pastilla también crece un paso (`text-base` desde md, `lg:text-lg`), para mantener la proporción con el círculo. **Descartado:** dejarla en `text-sm`, porque la pastilla quedaría pequeña junto a fotos más grandes.
- **Elegido:** en móvil el círculo pasa de 96 a 112 px. **Descartado:** no cambiar móvil.
- **Elegido:** si hay choques, se mueven los slots y el tamaño pedido se respeta. **Descartado:** reducir el círculo en el ancho donde no cabe.
- **Elegido:** valores de la escala de Tailwind (`size-28`, `size-36`, `size-44`, `size-52`), sin valores arbitrarios. **Descartado:** píxeles escritos a mano.
- **Nota de partida (2026-11-03):** una primera versión de las preguntas dio por hecho que el círculo medía 96 px en todos los anchos. Era un error: ya escalaba por breakpoint hasta 144 px en xl. Las medidas de arriba parten de los valores reales del componente.

## Acceptance criteria

- [x] ≥768px: el círculo mide 144 px en md, 176 px en lg y 208 px en xl. En <768px mide 112 px.
- [x] La pastilla usa `text-base` desde md y `lg:text-lg`, y sigue en una sola línea en ≥768px.
- [x] Sin choques entre el h2 y las burbujas, ni entre burbujas, ni de BR con el botón flotante de WhatsApp, en 768×1024, 1024×768, 1280×720 y 1440×900, en los dos estados ("Cuándo" y "Tratamientos").
- [x] Las 4 esquinas ocupan el mismo sitio en los dos estados y TC solo existe en "Tratamientos".
- [x] Ninguna burbuja ni pastilla queda cortada por los bordes del stage en ≥768px, y el stage no desborda su alto.
- [x] 390×844: sin scroll horizontal, los círculos de 112 px y las pastillas se leen completos.
- [x] Las fotos se sirven con `widths` y `sizes` acordes al nuevo tamaño (al menos 2× de 208 px) y siguen usando `<Image>` con `alt=""`.
- [x] El pin, el swap, el reduced motion y el resize que cruza 768px se comportan igual que antes; `cuando-tratamientos.ts` no cambia.
- [x] Sin colores escritos a mano, sin `style=""` inline, sin valores arbitrarios de Tailwind y sin `<svg>` inline.
- [x] `pnpm check` sin errores, warnings ni hints.
- [x] `pnpm build` termina correctamente y el gate SEO no introduce errores.

## Implementation plan

1. Con `front-end-astro`, en `CuandoTratamientos.astro`: cambiar el círculo a `size-28 md:size-36 lg:size-44 xl:size-52`, la pastilla a `text-base lg:text-lg`, escalar el icono de respaldo y subir `widths` y `sizes` de `<Image>`. Actualizar el comentario de cabecera.
2. Reubicar las clases de posición de `slots` lo mínimo necesario, ajustando el espacio entre burbujas y h2. Probar de una en una los viewports de los criterios.
3. Revisar en el navegador en 390×844, 768×1024, 1024×768, 1280×720 y 1440×900: los dos estados, el scroll de ida y vuelta, reduced motion, sin JS y un resize que cruce 768px.
4. `pnpm check` y `pnpm build`. Pasar `spec-verifier` y, si todo cumple, el mantenedor cambia el estado de la spec.
