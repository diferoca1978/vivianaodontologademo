# Client gaps — Dra. Viviana Rodríguez

What the brief (`docs/brief/`) does not cover. Nothing here gets invented: each
item is asked for (or decided) before the feature that needs it is built. The
**Blocks** column names the `feature_list.json` ids that wait on it.

## Decisiones pendientes (tuyas) — antes de cerrar las páginas

Cada decisión tiene un ID; las `nota` de `feature_list.json` lo citan. Cuando
la tomes, marca la casilla y escribe la respuesta en la línea «Decidido».

### Qué necesita cada página para cerrarse

| Página (feature) | Decisiones | De la clienta (tabla de abajo) |
| ---------------- | ---------- | ------------------------------ |
| Todas — decidir **antes de construir la primera sección** | D4 | #6 og-image, #8 aviso legal (footer) |
| Inicio (`page-home`) | D1, D2, D5 | #1 horario (schema), #2 textos de las 8 tarjetas, #5 fotos · #3 testimonios no bloquea el cierre (la sección espera) |
| Blanqueamiento (`page-blanqueamiento`) | D2, D3, D5 | #5 fotos |
| Rehabilitación (`page-rehabilitacion`) | D1, D2, D3, D5 | #4 frase de anestesia digital, #5 fotos |
| Contacto (`page-contacto`) | D1, D5, D6 | #1 horario, #7 mapa |

### D1 — Títulos de página vs. `generatePageSEO()`

- [ ] Decidido: ___
- **Problema:** el generador siempre agrega `" | Dra. Viviana Rodríguez"`.
  Solo el título de Blanqueamiento encaja en ese patrón:

  | Página | Título en textos-sitio.md | Lo que saldría hoy |
  | ------ | ------------------------- | ------------------ |
  | Inicio | Odontóloga en Bogotá — Especialista en Rehabilitación Oral (58) | … Oral \| Dra. Viviana Rodríguez (83, demasiado largo) |
  | Blanqueamiento | Blanqueamiento Dental en Bogotá \| Dra. Viviana Rodríguez (56) | igual ✓ |
  | Rehabilitación | Rehabilitación Oral en Bogotá \| Especialista — Dra. Viviana (59) | … Dra. Viviana \| Dra. Viviana Rodríguez (84, nombre doble) |
  | Contacto | Contacto y Citas \| Dra. Viviana Rodríguez — Odontóloga Bogotá (61) | … Bogotá \| Dra. Viviana Rodríguez (86, nombre doble) |

- **Opciones:**
  - (a) Ajustar esos 3 títulos al patrón `<título> | Dra. Viviana Rodríguez`.
    Es un cambio de contenido, así que necesita el OK de la clienta.
  - (b) Permitir que una página pase su título completo. Es un cambio del
    scaffold (generador en `src/config/seo.ts` y la sección «Core API» de
    `.claude/skills/seo-guide-lines/SKILL.md`), así que necesita una spec de
    carril completo aprobada.
- **Bloquea:** `page-home`, `page-rehabilitacion`, `page-contacto`.

### D2 — Schema que falta en `src/config/seo.ts`

- [ ] Decidido: ___
- **Problema:** el brief (§6) pide dos cosas que el generador no sabe hacer:
  - `Service` en las dos páginas de servicio, con el Dentist como proveedor y
    Bogotá como área. No existe un generador `Service`.
  - En el nodo Dentist: la especialidad (`medicalSpecialty`) y el horario
    (`openingHoursSpecification`, cuando llegue). Schema.org no tiene
    «Rehabilitación Oral» ni «Prostodoncia»; el valor más cercano es
    `Dentistry`. Los medios de pago (`paymentAccepted`, brief §1) son
    opcionales.
- **Qué decides:** si apruebas que redacte la spec (`/spec`) que cubra todo
  esto, D3 incluida. Tú la revisas y la pasas a `Approved`; ningún agente puede
  hacerlo.
- **Bloquea:** `page-blanqueamiento`, `page-rehabilitacion`, y la especialidad
  del nodo Dentist en `page-home`.

### D3 — Fecha de «última actualización» visible en las páginas de servicio

- [ ] Decidido: ___
- **Problema:** el brief (§6) pide publicarla, pero no dice de dónde sale.
- **Opciones:**
  - (a) Una fecha fija por página, escrita a mano en la config, que se cambia
    solo cuando cambia el contenido. Es la honesta (recomendada).
  - (b) La fecha del build. Cambia en cada deploy aunque el contenido no
    cambie, lo que da una falsa señal de frescura.
  - (c) La fecha del último commit del archivo. Es automática, pero depende de
    tener el historial de git en el build de Netlify.
- Se resuelve dentro de la spec de D2, para que la fecha visible y
  `dateModified` coincidan.
- **Bloquea:** `page-blanqueamiento`, `page-rehabilitacion`.

### D4 — Contraste del turquesa (decidir antes de la primera sección)

- [x] Decidido: (a) turquesa oscuro para texto y enlaces, token `--color-turquoise-dark` (`oklch(0.52 0.1055 190.19)`, ≈4.9:1 sobre marfil) en `global.css`. Decisión de la clienta (2026-09-30), reemplaza la opción (b) que se había elegido antes.
- **Problema:** el turquesa sobre marfil da ≈2.8:1, así que falla WCAG incluso
  en texto grande. El gris neutro sobre marfil da ≈3.1:1, así que solo sirve
  para texto grande. Pero brand.md usa el turquesa para enlaces e íconos.
- **Opciones:**
  - (a) Agregar un turquesa oscuro solo para texto y enlaces: un token nuevo en
    `global.css`, del mismo tono con luminosidad ≈0.52 o menor, para llegar a
    ≥4.5:1. Necesita tu OK de diseño (idealmente también el de la clienta).
  - (b) Enlaces en carbón con subrayado o acento turquesa. El turquesa queda
    para fondos de botón (con texto carbón, ≈5.7:1), íconos grandes y
    detalles decorativos.
- En los botones con fondo `turquoise` el texto va en carbón, nunca en blanco (≈3.0:1). Con fondo `turquoise-dark` el texto blanco/marfil sí pasa (≈5.2:1).
- **Afecta:** todas las secciones con enlaces o texto turquesa, empezando por
  `global-navbar`.

### D5 — FAQ: ¿respuestas siempre abiertas o acordeón?

- [ ] Decidido: ___
- **Problema:** el brief (§5) dice «FAQ visible en la página, nunca oculta».
  En el acceptance lo tomé literal: todas las respuestas abiertas.
- **Opciones:**
  - (a) Todas abiertas, como está ahora.
  - (b) Acordeón (`<details>`) con el texto en el HTML. Google y los LLM lo
    leen igual, es más compacto y encaja con «poco texto por sección»
    (brand.md). Si eliges esta, hay que ajustar el acceptance de las 4
    features de FAQ.
- **Afecta:** `home-faq`, `blanqueamiento-faq`, `rehabilitacion-faq`,
  `contacto-faq`.

### D6 — Contacto: la meta description promete «mapa y horarios»

- [ ] Decidido: ___
- **Problema:** el horario (#1) y el mapa (#7) siguen pendientes de la clienta.
- **Opciones, si no llegan antes del lanzamiento:**
  - (a) Esperar a tenerlos para publicar Contacto.
  - (b) Lanzar con una description ajustada (cambio de copy, así que necesita
    el OK de la clienta) y volver a la original cuando lleguen.
- **Bloquea:** `page-contacto`.

## Pending from the client

| # | Missing | Blocks | Brief reference |
| - | ------- | ------ | --------------- |
| 1 | **Opening hours.** The brief says not to publish them until confirmed. | `global-footer`, `contacto-datos`, `page-contacto` (its meta description promises "horarios"), Dentist `openingHoursSpecification` | arquitectura §1, §6, §7 · textos §4 |
| 2 | **1-2 line description for each of the 8 short service cards** (Odontología General, Odontología Estética, Implantes, Coronas en Zirconio, Incrustaciones Dentales, Placas de Bruxismo, Prótesis Removibles, Diseño de Sonrisa) | `home-servicios` | arquitectura §5, §7 |
| 3 | **3-5 real patient testimonials** (Google reviews), with how each should be attributed | `home-testimonios` | arquitectura §7 · textos §1 |
| 4 | **A sentence mentioning anestesia digital on the Rehabilitación Oral page.** Brief §5 requires it on every service page, but textos §3 never mentions it. | `page-rehabilitacion` | arquitectura §5 · brand.md "Miedos a resolver" |
| 5 | **Real photos** (the practice, the doctor, results) | `home-sobre`, service pages (`home-hero` is unblocked: it uses `Hero-home-reference-opt1.webp`; the client will supply further images when needed) | brand.md "Principios visuales" · arquitectura §7 |
| 6 | **Social share image (og-image, 1200×630).** `COMPANY_INFO.image` points to `/images/og-image.png`, which doesn't exist yet, so the strict gate fails. It can be made from #5. | every page's Open Graph / Twitter card | — |
| 7 | **Map: a Google Maps / Google Business Profile link and/or the practice's coordinates** (lat/long) | `contacto-datos`, `page-contacto` (its meta description promises "mapa"), Dentist `geo` | arquitectura §6 · textos §4 |
| 8 | **Aviso legal / política de tratamiento de datos**: its text, and whether it's its own page. The footer must link to it, and no page for it is in the sitemap. (Colombia: Ley 1581 de 2012.) | `global-footer` | arquitectura §3 |
| 9 | **Vector logo (SVG).** The palette was taken from the PNG logo, so confirm it against the vector if one exists. The schema logo uses `public/images/logo.png` (a copy of `logobgwhite.png`) for now. | quality only | brand.md "Paleta", "Activos" · arquitectura §7 |
| 10 | *(optional)* Quote about why she's passionate about Rehabilitación Oral | `home-sobre` | arquitectura §7 |
| 11 | *(optional)* Postal code | Dentist `address` | — |
| 12 | *(optional)* Pre-filled WhatsApp message. `COMPANY_INFO.whatsapp` currently opens a chat with no text. | — | — |
| 13 | *(optional)* Should "llave" and the financing plans appear in the copy? arquitectura §1 lists them, but the payment copy in textos §1 and §4 doesn't. | — | arquitectura §1 |

## Decided at ingest (not in the brief) — 2026-09-30

- **Fonts:** Cormorant for headings, Raleway for body. The user chose them from
  brand.md's examples. They fill the scaffold's existing slots, so
  `--font-jakarta` is the heading slot and `--font-nunito` is the body slot.
- **Animation strategy:** GSAP, chosen by the user. `gsap` is already in
  `package.json`, so no scaffold change is needed.
- **Single NAP address form:** "Cra 15 # 104-30, Consultorio 302", chosen by the
  user. The home FAQ answer "¿Dónde queda el consultorio?" changed from
  "Carrera 15" to "Cra 15".
- **Business name** (`COMPANY_INFO.name`): "Dra. Viviana Rodríguez", matching
  the meta-title suffix the brief uses.
- **Color token names:** `turquoise`, `turquoise-light`, `gray-neutral`,
  `gray-light`, `ivory`, `charcoal`, with the values from brand.md.
- **CTA targets:** the home final CTA goes to WhatsApp, because textos §1 wins
  over arquitectura §3 on page content. The service pages' final CTAs go to
  `/contacto/`, per arquitectura §3. "Conocer servicios" goes to `#servicios`.

