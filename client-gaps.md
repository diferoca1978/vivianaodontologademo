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
| Inicio (`page-home`) | D1, D2, D5 | #2 textos de las 8 tarjetas, #5 fotos |
| Blanqueamiento (`page-blanqueamiento`) | D2, D3, D5 | #5 fotos |
| Rehabilitación (`page-rehabilitacion`) | D1, D2, D3, D5 | #4 frase de anestesia digital, #5 fotos |
| Contacto (`page-contacto`) | D1, D5 | — (confirmar el horario #1, pero no bloquea) |

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
- **Problema:** el generador no sabe hacer estas cosas, que piden el brief (§6)
  y la ficha de Google:
  - `Service` en las dos páginas de servicio, con el Dentist como proveedor y
    Bogotá como área. No existe un generador `Service`.
  - En el nodo Dentist:
    - La especialidad (`medicalSpecialty`). Schema.org no tiene «Rehabilitación
      Oral» ni «Prostodoncia»; el valor más cercano es `Dentistry`.
    - El horario (`openingHoursSpecification`). Los datos ya están en
      `COMPANY_INFO.openingHours` desde el 2026-10-02.
    - El nombre de la ficha: `name` = `COMPANY_INFO.listingName` («Consultorio
      Viviana Rodríguez») y `alternateName` = `COMPANY_INFO.name` («Dra.
      Viviana Rodríguez»). Ya está decidido (ver «Decided on 2026-10-02»). El
      dato ya está en `companyInfo.ts`.
    - Los medios de pago (`paymentAccepted`, brief §1), que son opcionales.
- **Recomendación:** partirla en dos specs.
  - La del nodo Dentist primero, porque es pequeña y sus datos ya están.
  - Después la de `Service` junto con D3.
- **Qué decides:** si apruebas que se redacte la spec. `/spec` lo corres tú,
  porque un agente no puede invocarlo. Tú la revisas y la pasas a `Approved`;
  ningún agente puede hacerlo.
- **Bloquea:** `page-blanqueamiento`, `page-rehabilitacion`, y en `page-home`
  la especialidad, el horario y el nombre de la ficha del nodo Dentist.

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

- [x] Resuelto (2026-10-02): ya no aplica. El mapa (#7) y el horario (#1,
  tomado de la ficha de Google) ya existen, así que la description se queda
  como está en el brief.
- **Problema:** el horario (#1) y el mapa (#7) siguen pendientes de la clienta.
- **Opciones, si no llegan antes del lanzamiento:**
  - (a) Esperar a tenerlos para publicar Contacto.
  - (b) Lanzar con una description ajustada (cambio de copy, así que necesita
    el OK de la clienta) y volver a la original cuando lleguen.
- **Bloquea:** `page-contacto`.

## Pending from the client

| # | Missing | Blocks | Brief reference |
| - | ------- | ------ | --------------- |
| 1 | **Opening hours — tentative since 2026-10-02.** Taken from the Google Business Profile and stored in `COMPANY_INFO.openingHours`: Tue & Thu 2–7 pm · Wed & Sat 8 am–1 pm · Fri 8 am–2 pm · Sun & Mon closed. The user chose to publish them now and correct them if needed. **Still to confirm with the client.** | nothing anymore. `global-footer` was reopened to show them. The Dentist `openingHoursSpecification` waits on D2. | arquitectura §1, §6, §7 · textos §4 |
| 2 | **1-2 line description for each of the 8 short service cards** (Odontología General, Odontología Estética, Implantes, Coronas en Zirconio, Incrustaciones Dentales, Placas de Bruxismo, Prótesis Removibles, Diseño de Sonrisa) | `home-servicios` | arquitectura §5, §7 |
| 3 | **Resolved 2026-10-02.** The user chose 5 Google reviews and the signature rule; both are in `docs/source/resenas-google.md`. Confirm the choice with the client. | nothing (`home-testimonios` is unblocked) | arquitectura §7 · textos §1 |
| 4 | **A sentence mentioning anestesia digital on the Rehabilitación Oral page.** Brief §5 requires it on every service page, but textos §3 never mentions it. | `page-rehabilitacion` | arquitectura §5 · brand.md "Miedos a resolver" |
| 5 | **Real photos** (the practice, results) | service pages (`home-hero` is unblocked: it uses `Hero-home-reference-opt1.webp`; `home-sobre` is unblocked: the doctor's photos are `aboutme-home.webp` and `aboutme-home2.webp`; the client will supply further images when needed) | brand.md "Principios visuales" · arquitectura §7 |
| 6 | **Social share image (og-image, 1200×630).** `COMPANY_INFO.image` points to `/images/og-image.png`, which doesn't exist yet, so the strict gate fails. It can be made from #5. | every page's Open Graph / Twitter card | — |
| 7 | **Resolved 2026-10-02.** The Google Business Profile `https://www.google.com/maps?cid=13310363482939215067` is in `COMPANY_INFO.socialMedia.googleBusiness`, so it also goes to `sameAs`. The coordinates 4.6889867, -74.0466053 are in `COMPANY_INFO.business.geo`, so they go to the Dentist `geo`. | nothing | arquitectura §6 · textos §4 |
| 8 | **Aviso legal / política de tratamiento de datos**: its text, and whether it's its own page. The footer must link to it, and no page for it is in the sitemap. (Colombia: Ley 1581 de 2012.) | `global-footer` | arquitectura §3 |
| 9 | **Vector logo (SVG).** The palette was taken from the PNG logo, so confirm it against the vector if one exists. The schema logo uses `public/images/logo.png` (a copy of `logobgwhite.png`) for now. | quality only | brand.md "Paleta", "Activos" · arquitectura §7 |
| 10 | *(optional)* Quote about why she's passionate about Rehabilitación Oral | `home-sobre` | arquitectura §7 |
| 11 | *(optional)* Postal code | Dentist `address` | — |
| 12 | *(optional)* Pre-filled WhatsApp message. `COMPANY_INFO.whatsapp` currently opens a chat with no text. | — | — |
| 13 | *(optional)* Should "llave" and the financing plans appear in the copy? arquitectura §1 lists them, but the payment copy in textos §1 and §4 doesn't. | — | arquitectura §1 |

## Ficha de Google (Google Business Profile) — revisada el 2026-10-02

Dice «Consultorio Viviana Rodriguez», con la categoría Prostodoncista y 5,0 ⭐
en 9 reseñas. El enlace está en `COMPANY_INFO.socialMedia.googleBusiness`.

- **Teléfono:** verificado. La ficha muestra 302 5445760, el mismo de
  `COMPANY_INFO.phone`.
- **Nombre y dirección:** difieren del sitio («Consultorio Viviana Rodriguez»,
  «Ak 15 #104-30 consultorio 302»). Se decidió no alinear la dirección, y el
  nombre se cubre con el schema (ver «Decided on 2026-10-02»).
- **Acciones que la clienta hace en la ficha, fuera del sitio:**
  - [ ] Agregar «Dentista» como categoría secundaria. Ayuda más con búsquedas
    como «odontólogo Chicó» o «blanqueamiento Bogotá» que alinear el nombre o
    la dirección.
  - [ ] Agregar el sitio web cuando esté publicado. Hoy la ficha no tiene
    ninguno.

## Decided on 2026-10-02 (Google Business Profile)

- **Testimonials:** the 5 reviews and the signature rule in
  `docs/source/resenas-google.md`, chosen by the user. There is no `Review` or
  `AggregateRating` JSON-LD, because Google ignores self-serving reviews.
- **Opening hours:** the site publishes the profile's hours now and corrects
  them if the client changes them.
- **Address:** it stays "Cra 15 # 104-30, Consultorio 302" on the site, even
  though the profile writes "Ak 15 #104-30 consultorio 302".
- **Business name in the schema:**
  - The Dentist node takes `name` "Consultorio Viviana Rodríguez"
    (`COMPANY_INFO.listingName`) and `alternateName` "Dra. Viviana Rodríguez".
  - The doctor stays a `Person` through `founders`.
  - The visible brand and the meta-title suffix stay "Dra. Viviana Rodríguez",
    so `COMPANY_INFO.name` doesn't change.
  - It needs the D2 spec, because it changes the generator.

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

