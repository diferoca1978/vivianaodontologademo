# Client gaps — Dra. Viviana Rodríguez

What the brief (`docs/brief/`) does not cover. Nothing here gets invented: each
item is asked for (or decided) before the feature that needs it is built. The
**Blocks** column names the `feature_list.json` ids that wait on it.

## Decisiones pendientes (tuyas) — antes de cerrar las páginas

Cada decisión tiene un ID; las descripciones de `feature_list.json` lo citan.
Cuando la tomes, marca la casilla y escribe la respuesta en la línea «Decidido».

Desde el 2026-10-16 el SEO del sitio viene de `@shine/seo-core` (`seo.pageHead()`,
`seo.homeNodes()`, `seo.businessRef()`…), y el build falla ante cualquier error SEO
(el gate). Las decisiones de abajo ya están reescritas con esa API.

### Qué necesita cada página para cerrarse

| Página (feature) | Decisiones | De la clienta (tabla de abajo) |
| ---------------- | ---------- | ------------------------------ |
| Todas — decidir **antes de construir la primera sección** | D4 | #6 og-image, #8 aviso legal (footer) |
| Inicio (`page-home`) | — | #2 textos de las 8 tarjetas, #5 fotos |
| Blanqueamiento (`page-blanqueamiento`) | — | #5 fotos |
| Rehabilitación (`page-rehabilitacion`) | — | #4 frase de anestesia digital, #5 fotos |
| Contacto (`page-contacto`) | — | — (confirmar el horario #1, pero no bloquea) |

**Orden de construcción:** Contacto conviene primero. Los CTA finales de
Blanqueamiento y Rehabilitación enlazan a `/contacto/`, y las dos páginas de
servicio se enlazan entre sí. El gate falla ante un enlace a una página que no
existe (`url-resolves`), así que esos enlaces se pintan con `isBuilt()`
(`src/utils/navigation.ts`) mientras su destino esté en `PENDING_PAGES`.

### D2 — Schema que el paquete no genera

- [x] Decidido: resuelto con `@shine/seo-core` v0.1.3 y por descarte (2026-10-22).
- **Resultado:**
  - `Service`: retirado por decisión del mantenedor. Las páginas de servicio no
    llevan nodo `Service`.
  - Horario: `COMPANY.business.hours` → `openingHoursSpecification` (v0.1.3).
  - Nombre de la ficha: `COMPANY.alternateName` → `alternateName` (v0.1.3).
    `name` se queda en «Dra. Viviana Rodríguez», porque el paquete también lo
    usa como `WebSite.name` y como sufijo de los títulos.
  - `medicalSpecialty` y `paymentAccepted`: no se emiten. La documentación de
    Google no los usa para ningún resultado enriquecido y no aportan señal.
- **Bloquea:** nada.

### D3 — Fecha de «última actualización» visible en las páginas de servicio

- [x] Decidido: Opción 2: no se publica fecha de última actualización (2026-10-22).
- **Problema:** el brief (§6) pedía publicarla, pero no decía de dónde sale.
- **Opciones:**
  - (a) Una fecha fija por página, escrita a mano en la config, que se cambia
    solo cuando cambia el contenido. Es la honesta (recomendada).
  - (b) La fecha del build. Cambia en cada deploy aunque el contenido no
    cambie, lo que da una falsa señal de frescura.
  - (c) La fecha del último commit del archivo. Es automática, pero depende de
    tener el historial de git en el build de Netlify.
- **Bloquea:** nada.

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

- [x] Decidido: (b) acordeón `<details>` colapsado al cargar, con el texto en
  el HTML, en las cuatro páginas (Inicio por decisión del cliente; Blanqueamiento
  el 2026-10-20; confirmado para Rehabilitación y Contacto el 2026-10-22).
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

### D7 — FAQPage en el JSON-LD

- [x] Decidido (2026-10-16): no se emite `FAQPage`. Las preguntas siguen
  visibles en cada página, sin marcado. Se aparta del brief §6, que lo pedía.
- **Por qué:** Google dejó de mostrar el resultado enriquecido de FAQ en 2026,
  y `@shine/seo-core` no tiene generador para él. La FAQ visible es lo que leen
  Google y los LLM.
- **Afecta:** `home-faq` (se quitó su `FAQPage`), `blanqueamiento-faq`,
  `rehabilitacion-faq`, `contacto-faq`.

## Antes del lanzamiento (Shine)

- [ ] **Comprar el dominio.** `vivianaodontologa.com` está en `site` y en
  `clients.json`, pero el 2026-10-16 no estaba registrado (NXDOMAIN en el
  registro .com). Se compra en la cuenta de Cloudflare de Shine, con el DNS
  apuntando a Netlify. Después, en `clients.json` va `"cloudflare": "own"`, y
  hace falta la regla WAF de `seo-watch` (`CHECKPOINTS.md` §5).

## Pending from the client

| # | Missing | Blocks | Brief reference |
| - | ------- | ------ | --------------- |
| 1 | **Opening hours — tentative since 2026-10-02.** Taken from the Google Business Profile and stored in `COMPANY.business.hours`: Tue & Thu 2–7 pm · Wed & Sat 8 am–1 pm · Fri 8 am–2 pm · Sun & Mon closed. The user chose to publish them now and correct them if needed. **Still to confirm with the client.** | nothing anymore. `global-footer` was reopened to show them. The Dentist `openingHoursSpecification` waits on D2. | arquitectura §1, §6, §7 · textos §4 |
| 2 | **1-2 line description for each of the 8 short service cards** (Odontología General, Odontología Estética, Implantes, Coronas en Zirconio, Incrustaciones Dentales, Placas de Bruxismo, Prótesis Removibles, Diseño de Sonrisa) | `home-servicios` | arquitectura §5, §7 |
| 3 | **Resolved 2026-10-02.** The user chose 5 Google reviews and the signature rule; both are in `docs/source/resenas-google.md`. Confirm the choice with the client. | nothing (`home-testimonios` is unblocked) | arquitectura §7 · textos §1 |
| 4 | **A sentence mentioning anestesia digital on the Rehabilitación Oral page.** Brief §5 requires it on every service page, but textos §3 never mentions it. | `page-rehabilitacion` | arquitectura §5 · brand.md "Miedos a resolver" |
| 5 | **Real photos** (the practice, results). Rehabilitación Oral "Cuándo la necesitas" now uses 4 photos added on 2026-10-26 (`worn-teeth`, `missing-tooth`, `teeth-hurt`, `solution`, spec 05): confirm with the client that they are the final ones | service pages (`home-hero` is unblocked: it uses `Hero-home-reference-opt1.webp`; `home-sobre` is unblocked: the doctor's photos are `aboutme-home.webp` and `aboutme-home2.webp`; the client will supply further images when needed) | brand.md "Principios visuales" · arquitectura §7 |
| 6 | **Social share image (og-image, 1200×630).** `COMPANY.image` points to `/images/og-image.png`, which doesn't exist yet, so the SEO gate warns (`asset-missing`) on every page. It can be made from #5. | every page's Open Graph / Twitter card | — |
| 7 | **Resolved 2026-10-02.** The Google Business Profile `https://www.google.com/maps?cid=13310363482939215067` is in `COMPANY.socialMedia.googleBusiness`, so it also goes to `sameAs`. The coordinates 4.6889867, -74.0466053 are in `COMPANY.business.geo`, so they go to the Dentist `geo`. | nothing | arquitectura §6 · textos §4 |
| 8 | **Aviso legal / política de tratamiento de datos**: its text, and whether it's its own page. The footer must link to it, and no page for it is in the sitemap. (Colombia: Ley 1581 de 2012.) | `global-footer` | arquitectura §3 |
| 9 | **Vector logo (SVG).** The palette was taken from the PNG logo, so confirm it against the vector if one exists. The schema logo uses `public/images/logo.png` (a copy of `logobgwhite.png`) for now. | quality only | brand.md "Paleta", "Activos" · arquitectura §7 |
| 10 | *(optional)* Quote about why she's passionate about Rehabilitación Oral | `home-sobre` | arquitectura §7 |
| 11 | *(optional)* Postal code | Dentist `address` | — |
| 12 | *(optional)* Pre-filled WhatsApp message. `COMPANY.whatsapp` currently opens a chat with no text. | — | — |
| 13 | *(optional)* Should "llave" and the financing plans appear in the copy? arquitectura §1 lists them, but the payment copy in textos §1 and §4 doesn't. | — | arquitectura §1 |
| 14 | **Blanqueamiento copy left out of the 2026-10-19 brief.** (a) The new FAQ "¿El blanqueamiento dental produce sensibilidad?" says "Puede presentarse sensibilidad temporal", while the page's meta description (still from textos §2, `PAGES.blanqueamiento.description`) promises "sin dolor". (b) The home service card (`src/config/services.ts:46`) still has the old subtitle "Una sonrisa más blanca, sin ansiedad ni sorpresas…"; the page's new subtitle is "Una sonrisa más luminosa, sin perder su apariencia natural." (c) `services.ts` also keeps the old §2 copy in the blanqueamiento `seoDescription` ("sin dolor", which feeds `llms.txt`) and in `benefits` (the old Beneficios, still rendered by `Beneficios.astro` until the new sections replace it). All stay as they are until the client decides. | nothing (consistency only) | textos-blanqueamiento.md › Preguntas frecuentes · textos §1 Servicios, §2 Meta description |
| 15 | **Short version of the Blanqueamiento intro.** On 2026-10-19 the maintainer chose a shorter intro than the one the brief had before (the longer text in `textos-sitio.md` §2 and the old hero, which mentioned "en Chicó" and "nuestro consultorio"): the new one drops "en Chicó" and "su nombre clínico" and names "el consultorio de la Dra. Viviana Rodríguez". `textos-blanqueamiento.md:5` already carries a near-identical version, with only minor wording differences ("lo realizamos" / "pensado" vs "realizamos el procedimiento" / "diseñado"). It appears as highlighted text below the hero (`specs/03-blanqueamiento-hero-intro-destacada.md`). The client has to confirm it. The highlights also write "Tres modalidades" where the brief has "3 modalidades", and the hero shows only 2 of the brief's 3 points (the maintainer dropped "En consultorio:") in a different order. | nothing (the page builds with the short text) | textos-blanqueamiento.md:5, 7 · specs/03 |

## Ficha de Google (Google Business Profile) — revisada el 2026-10-02

Dice «Consultorio Viviana Rodriguez», con la categoría Prostodoncista y 5,0 ⭐
en 9 reseñas. El enlace está en `COMPANY.socialMedia.googleBusiness`.

- **Teléfono:** verificado. La ficha muestra 302 5445760, el mismo de
  `COMPANY.phone`.
- **Nombre y dirección:** difieren del sitio («Consultorio Viviana Rodriguez»,
  «Ak 15 #104-30 consultorio 302»). Se decidió no alinear la dirección, y el
  nombre se cubre con el schema (ver «Decided on 2026-10-02»).
- **Acciones que la clienta hace en la ficha, fuera del sitio:**
  - [ ] Agregar «Dentista» como categoría secundaria. Ayuda más con búsquedas
    como «odontólogo Chicó» o «blanqueamiento Bogotá» que alinear el nombre o
    la dirección.
  - [ ] Agregar el sitio web cuando esté publicado. Hoy la ficha no tiene
    ninguno.

## Decided on 2026-10-19 (new Blanqueamiento brief)

- **H1 of `/blanqueamiento-dental/`:** "Blanqueamiento Dental en Bogotá". The client's new
  brief, `docs/brief/textos-blanqueamiento.md` (2026-10-19), puts "en Bogotá" back in the
  H1, so it supersedes the 2026-10-17 decision below. `PAGES.blanqueamiento.h1`,
  `docs/brief/textos-sitio.md` §2 and the `blanqueamiento-hero` criterion match it. The
  maintainer confirmed it on 2026-10-19.

## Decided on 2026-10-17 (Blanqueamiento hero) — superseded on 2026-10-19

- *Superseded by «Decided on 2026-10-19» above. Kept as history.*
- **H1 of `/blanqueamiento-dental/`:** "Blanqueamiento Dental", without "en Bogotá". The
  `<title>` and meta description keep "en Bogotá". `docs/brief/textos-sitio.md` §2 and the
  `blanqueamiento-hero` criterion were updated to match.

## Decided on 2026-10-02 (Google Business Profile)

- **Testimonials:** the 5 reviews and the signature rule in
  `docs/source/resenas-google.md`, chosen by the user. There is no `Review` or
  `AggregateRating` JSON-LD, because Google ignores self-serving reviews.
- **Opening hours:** the site publishes the profile's hours now and corrects
  them if the client changes them.
- **Address:** it stays "Cra 15 # 104-30, Consultorio 302" on the site, even
  though the profile writes "Ak 15 #104-30 consultorio 302".
- **Business name in the schema:**
  - The Dentist node keeps `name` "Dra. Viviana Rodríguez" and takes
    `alternateName` "Consultorio Viviana Rodríguez" (`COMPANY.alternateName`).
    Changed on 2026-10-22: the package uses `name` for `WebSite.name` and the title suffix.
  - The doctor stays a `Person` through `founders`.
  - The visible brand and the meta-title suffix stay "Dra. Viviana Rodríguez",
    so `COMPANY.name` doesn't change.
  - Resolved with `@shine/seo-core` v0.1.3 (D2).

## Decided at ingest (not in the brief) — 2026-09-30

- **Fonts:** Cormorant for headings, Raleway for body. The user chose them from
  brand.md's examples. They fill the scaffold's existing slots, so
  `--font-jakarta` is the heading slot and `--font-nunito` is the body slot.
- **Animation strategy:** GSAP, chosen by the user. `gsap` is already in
  `package.json`, so no scaffold change is needed.
- **Single NAP address form:** "Cra 15 # 104-30, Consultorio 302", chosen by the
  user. The home FAQ answer "¿Dónde queda el consultorio?" changed from
  "Carrera 15" to "Cra 15".
- **Business name** (`COMPANY.name`): "Dra. Viviana Rodríguez", matching
  the meta-title suffix the brief uses.
- **Color token names:** `turquoise`, `turquoise-light`, `gray-neutral`,
  `gray-light`, `ivory`, `charcoal`, with the values from brand.md.
- **CTA targets:** the home final CTA goes to WhatsApp, because textos §1 wins
  over arquitectura §3 on page content. The service pages' final CTAs go to
  `/contacto/`, per arquitectura §3. "Conocer servicios" goes to `#servicios`.

