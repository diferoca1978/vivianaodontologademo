# Brief — Dra. Viviana Rodríguez (Odontóloga, Rehabilitación Oral)

Fuente de contenido para vestir el sitio. Idioma: español (Colombia).

## 1. Datos del negocio

| Campo | Detalle |
| --- | --- |
| Cliente | Dra. Viviana Rodríguez — Odontóloga, especialista en Rehabilitación Oral |
| Dirección | Cra 15 # 104-30, Consultorio 302, zona Chicó, Bogotá |
| WhatsApp / teléfono | 302 544 5760 |
| Correo | vivianarodriguezod@gmail.com |
| Instagram | @dra.vivianarodriguez\_ |
| TikTok | @dra.vivianarodriguez\_ |
| Horario | PENDIENTE (no publicar hasta confirmarlo) |
| Pagos | Tarjeta débito/crédito (datáfono), llave o código QR; hay planes de financiación por estos medios. No EPS ni seguros dentales (atención particular) |
| Objetivo del sitio | Posicionar orgánicamente (SEO/AEO/GEO) y convertir visitas en citas agendadas por WhatsApp |

NAP (nombre, dirección, teléfono) idéntico en todo el sitio y en el schema. Usar siempre "Cra 15 # 104-30" o siempre "Carrera 15 # 104-30", sin mezclar.

## 2. Marca y diseño

Ver [brand.md](./brand.md): propuesta de valor, tono, credenciales, paciente ideal, paleta, tipografía y principios visuales.

**Servicios estrella (3):** Blanqueamiento Dental (el que más quiere impulsar), Rehabilitación Oral y Diseño de Sonrisa.

## 3. Estructura del sitio

Páginas (slugs en minúscula): `/` Inicio, `/blanqueamiento-dental`, `/rehabilitacion-oral`, `/contacto`. No hay blog.

Los demás servicios no tienen página propia: van como tarjetas cortas (1-2 líneas) dentro de Inicio, cada una con ancla propia (ej. `/#implantes`): Odontología General, Odontología Estética, Implantes, Coronas en Zirconio, Incrustaciones Dentales, Placas de Bruxismo, Prótesis Removibles, Diseño de Sonrisa.

**Navegación:**

- Header: Inicio · Blanqueamiento Dental · Rehabilitación Oral · Contacto, más botón CTA fijo "Agendar Cita" (WhatsApp).
- Botón flotante de WhatsApp en todas las páginas.
- Footer: dirección, teléfono/WhatsApp, correo, Instagram y TikTok, horario (cuando exista), enlace a Contacto, aviso legal / tratamiento de datos.
- Breadcrumbs en páginas de servicio: Inicio > Blanqueamiento Dental · Inicio > Rehabilitación Oral.

**Enlazado interno:**

- Inicio enlaza a ambas páginas de servicio desde el menú, las tarjetas de servicios y el CTA principal.
- Blanqueamiento Dental y Rehabilitación Oral se enlazan entre sí.
- Todas las páginas terminan con CTA a Contacto.

## 4. Palabras clave

Sin datos de volumen (el sitio aún no existe); prioridad por intención y relevancia.

**Inicio (marca y local):** odontóloga especialista en Bogotá (alta), odontólogo Chicó Bogotá (alta), odontología sin dolor Bogotá (alta), odontóloga en Bogotá (media, muy competida), odontóloga zona norte Bogotá (media).

**Blanqueamiento Dental:** blanqueamiento dental Bogotá (principal), blanqueamiento dental precio Bogotá / cuánto cuesta (alta), blanqueamiento dental sin dolor / seguro (alta), blanqueamiento dental profesional Bogotá (media). "Aclaramiento dental" solo como sinónimo dentro del texto, nunca como H1.

**Rehabilitación Oral:** rehabilitación oral Bogotá (principal), especialista en rehabilitación oral Bogotá (alta), qué es la rehabilitación oral (alta, AEO), rehabilitación oral prótesis dental Bogotá (media).

**Otros servicios (tarjetas de Inicio):** diseño de sonrisa Bogotá (alta), resinas estéticas, implantes dentales, coronas de zirconio, placas de bruxismo / férula de descarga, prótesis dental removible (todas con "Bogotá").

**Miedo y confianza (diferenciador):** odontología de calma / consultorio relajante Bogotá (alta, territorio propio de la marca), odontólogo sin dolor Bogotá, anestesia digital qué es.

Diferenciador frente a la competencia: nadie ocupa el territorio "calma / bienestar / cero ansiedad" en Bogotá. Tono cálido; evitar títulos sobre-optimizados con símbolos o teléfono en el H1.

## 5. Contenido por página

El texto literal de cada página y servicio (metas, H1, subtítulos, bloques, FAQ y CTA) está en [textos-sitio.md](./textos-sitio.md). Si este archivo y `textos-sitio.md` difieren, manda `textos-sitio.md`. Aquí solo va lo que ese archivo no trae: keywords e intención de búsqueda de cada página.

| Página | Texto en | Keyword principal | Keywords secundarias | Intención |
| --- | --- | --- | --- | --- |
| Inicio `/` | `textos-sitio.md` §1 | odontóloga especialista en Bogotá / odontología sin dolor Bogotá | rehabilitación oral Bogotá, blanqueamiento dental Bogotá, diseño de sonrisa Bogotá | Navegacional + local + emocional |
| Blanqueamiento Dental `/blanqueamiento-dental` | `textos-blanqueamiento.md` (meta title y description: `textos-sitio.md` §2) | blanqueamiento dental Bogotá | aclaramiento dental Bogotá (solo como sinónimo en el texto), blanqueamiento dental precio Bogotá, blanqueamiento dental sin dolor | Transaccional |
| Rehabilitación Oral `/rehabilitacion-oral` | `textos-sitio.md` §3 | rehabilitación oral Bogotá | especialista en rehabilitación oral Bogotá, qué es la rehabilitación oral, prótesis dental Bogotá | Transaccional + informacional |
| Contacto `/contacto` | `textos-sitio.md` §4 | citas odontología Chicó Bogotá / contacto odontóloga Bogotá | — | Transaccional / navegacional |

**Reglas de contenido (aplican a todo el copy):**

- La respuesta directa a la pregunta principal va en los primeros 50-100 palabras de cada página de servicio.
- Mencionar anestesia digital y ambiente de calma en cada página de servicio.
- FAQ visible en la página, nunca oculta.
- Las tarjetas de los 8 servicios sin página propia (ver sección 3) no tienen texto en `textos-sitio.md`: solo nombre. Su descripción de 1-2 líneas está PENDIENTE (ver sección 7).

## 6. Schema (JSON-LD)

- `Dentist` (LocalBusiness): en el layout general; nombre, dirección (NAP), teléfono, geo (anidado en `PostalAddress`/`GeoCoordinates`), horario (pendiente de confirmar con la clienta), redes en `sameAs`. La especialidad y los medios de pago no se emiten en el JSON-LD (decisión del mantenedor, 2026-10-22).
- `Service`: retirado por decisión del mantenedor (2026-10-22); las páginas de servicio no llevan nodo `Service`.
- `FAQPage`: no se emite (decisión del 2026-10-16, client-gaps.md D7). Las preguntas siguen visibles en cada página, sin marcado.
- `BreadcrumbList`: en las dos páginas de servicio.
- Fecha de última actualización: retirada por decisión del mantenedor (2026-10-22); no se publica en las páginas de servicio.

## 7. Pendiente de la clienta

Además de lo de [brand.md](./brand.md) (logo vectorial, fotos):

- Horario de atención.
- Descripción de 1-2 líneas para cada tarjeta de servicio de Inicio sin página propia (Odontología General, Odontología Estética, Implantes, Coronas en Zirconio, Incrustaciones Dentales, Placas de Bruxismo, Prótesis Removibles, Diseño de Sonrisa).
- 3-5 testimonios reales de pacientes.
- Cita textual sobre por qué le apasiona la Rehabilitación Oral (opcional).
