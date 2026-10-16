# Fase 13 — Segunda ampliación del directorio y auditoría de identidades

Fecha: 15 de octubre de 2026.
Estado: **completada** con tres fichas nuevas. El objetivo era hasta diez. No se han publicado perfiles solo por aparecer en un título.

## Resultado

- Candidatos de la lista investigados: 11 (Adrian Kuyck, DJ Pitu, DJ Jonyk, DJ Note, DJ Uron, DJ Reke, Nervio, Rottar, Ortuño, Kura y Popper).
- Perfiles de la fase 12 revisados: 8.
- Perfiles nuevos publicados: **3**. El catálogo pasa de 24 a **27**.
- Lanzamientos nuevos: **7** tarjetas, que corresponden a **5** releases. Hide Away y Try están en dos fichas. No son discografías completas.
- Relaciones nuevas con sesiones ya existentes: **6**. Siguen **150** sesiones. No se ha cambiado `publishedAt`, `era` ni `youtubeVideoId`.

| Perfil | ID | Tarjetas | Sesiones enlazadas en esta fase |
| --- | --- | ---: | --- |
| DJ Pitu | `dj-pitu` | 2 colaboraciones | 2, las que ya estaban en Cesk y nombran a Pitu |
| Adrian Kuyck | `adrian-kuyck` | 1 colaboración | 1, Sesión CORAZÓN MAKINERO |
| DJ Rottar | `dj-rottar` | 0 | 1, la intro de LeBlanc con Luna y Javi Maki |

## Fuentes biográficas abiertas

- DJ Pitu y DJ Cesk: ficha de Entradium de la apertura del 31 de octubre de 2026 en Detroit Club, https://entradium.com/events/opening-amics-de-la-makina. Artista de Beatport Pitu & Cesk, https://www.beatport.com/artist/pitu-cesk/1066130.
- Adrian Kuyck: canal ya verificado en `sources.json`, https://www.youtube.com/@Adrian_Kuyckdj. La página del canal no devolvió una descripción legible. El tema está en https://uptimerecords.bandcamp.com/track/go.
- DJ Rottar: Lloret Gaceta, Lourdes Prat, 15 de marzo de 2024, https://lloretgaceta.com/ressorgeix-lesperit-makinero-a-lloret-de-mar-amb-una-festa-especial-al-leblanc-club/. La misma cabecera, 4 de marzo de 2026, lo nombra como acompañante del tardeo. Cartel de Makina Party, https://entradium.com/events/makina-party. Ese cartel no muestra el año.
- Javi Tracker, Intro 1.0: https://hardstyle.com/en/tracks/1402270c-01b1-4fb4-814f-f57b1f5ef6ae/intro-1-0.
- Bassaul DJ, Classic Style Vol.5: https://bassauldj.bandcamp.com/album/classic-style-vol-5. El índice https://bassauldj.bandcamp.com/music se ha visto; el resto de títulos no se ha abierto.
- Frank T.R.A.X.: la ficha de artista de Discogs lista «Frank Trax» entre las grafías, https://www.discogs.com/artist/50179-Frank-TRAX. No se ha copiado el nombre civil ni el lugar a la biografía.

## Lanzamientos y créditos

| Tarjeta | Dónde | Papel |
| --- | --- | --- |
| Hide Away, 2022, B-Form, Shox y Pitu & Cesk | https://www.beatport.com/release/hide-away/3879200 | colaboración, en `dj-cesk` y `dj-pitu` |
| Try (Orginal Mix), 2022, B-Form, Shox y Pitu & Cesk | https://www.beatport.com/release/try-orginal-mix/3931628 | colaboración, en las dos fichas. Se conserva la grafía de Beatport |
| Go!, 2026, Karu Uptime y Adrian Kuyck | https://uptimerecords.bandcamp.com/track/go | colaboración |
| Intro 1.0, 2017, Desk Records, Javi Tracker | Hardstyle.com, arriba | tema propio. La página dice Original Mix y 1:30 |
| Classic Style Vol.5, 2026, Bassaul Dj | Bandcamp, arriba | tema propio del disco, no una tarjeta por corte |

Aurora, de JOTA, Cia y Pitu & Cesk (https://www.beatport.com/release/aurora/3789142, B-Form, 22 de julio de 2022, catálogo WIDEFORM001), queda pendiente. La cabecera nombra a esos artistas, pero la fila del corte no llegó a verse.

## Sesiones vinculadas

- `wwIrt508fWo` y `sABwkJVrk7U`: se añade `dj-pitu` junto a `dj-cesk`.
- `BOLOUmMjwxo`: `adrian-kuyck`. No se atribuyen `sTYNvGG68mQ` ni `UUBhGxPmaZg`, del mismo canal y sin `djName`.
- `4Tpa249gOrw`: se añade `dj-rottar` junto a `javi-maki` y `dj-luna`.
- `YcJHNVkzzfQ`, «DA TERROR @ 9º ANIVERSARIO MAKINEROS 90's 2023»: `da-terror`. Da Terror pasa de 3 a 4 sesiones.
- `5vUss4Y31LA`, «FRANK TRAX @ 8º ANIVERSARIO…»: `frank-trax`, por la grafía que Discogs ya relaciona con Frank T.R.A.X.

La final del Xque sigue solo en Sepi y Sisu. Kura, Popper y Ortuño no tienen ficha. «Cesk y Nervio» sigue solo en Cesk. «DJ REKE & DA TERROR» sigue solo en Da Terror.

## Los ocho perfiles de la fase 12

- DJ Lucena. Las búsquedas llevan a otras personas: un DJ Lucena de una fiesta en Brasil, una sesión de un concurso Stylecore y una dedicatoria de radio. Ninguna identifica el canal DaniDjLucena. La ficha no cambia.
- DJ Cesk. Siguen dos canales posibles y `sources.json` continúa en pendiente. No se elige uno. Sí entran los dos temas de 2022 y un párrafo que los cita. Para cerrar el canal haría falta una descripción que lo ate a Amics de la Makina, o un enlace desde el organizador del cartel.
- Javi Tracker. El `youtubeVideoId` de «30 JAVI TRACKER I Intro Sesión Xque 2005/07» mide 11 caracteres y no contiene un espacio: la lectura de la fase 12 partió el bloque `KMZ`. oEmbed de YouTube devuelve ese título y el canal DC TV' Forever Deejays. No se sustituye el id ni la fecha. Se añade Intro 1.0. No se usa el relato de 2011-2019: la página del vídeo no se pudo abrir.
- DJ Sepi, Xavi BCN, DJ Luna X-Files y DJ Piyuli. No ha aparecido una fuente nueva que justifique reescribir la biografía ni añadir un release. La crónica de 2026 ya usada para Luna nombra también a Rottar y a Xeps; eso no cambia el texto de Luna.
- Bassaul DJ. Se añade Classic Style Vol.5. El índice muestra más títulos, entre ellos colaboraciones con Naniko y Brenda. Quedan sin abrir.

## Candidatos no publicados

| Nombre | Decisión | Motivo |
| --- | --- | --- |
| DJ Jonyk | Pendiente | Una sesión de Amics y una subida de 2012 en Makina Mania. `sources.json` sigue viendo dos canales. |
| DJ Note y DJ Uron | Pendiente | Solo el directo conjunto del 27 de diciembre de 2025. No hay ficha que separe a cada uno. |
| DJ Reke | Pendiente | Solo el título con Da Terror. Una página de SonidoPDF habla de una sesión en Fabrik, no de una biografía. |
| Nervio | Pendiente | Sale en un back to back con Cesk y en una fase previa del concurso. Siguen al menos dos canales. |
| Ortuño, Kura y Popper | Pendiente | El título de la final del Xque 2004 y un post del foro los nombran. No hay una página de cada uno. |
| DJ Xeps | Pendiente | La crónica de 2026 lo cita como acompañante. No hay sesión a su nombre ni otra fuente abierta. |
| Jordi Beat y Dani Kaos | Pendiente | El título del octavo aniversario de Makineros los nombra juntos. El foro mezcla residencias y enlaces caídos. La Festa Ideology, en Discogs 1128324, es un recopilatorio mezclado; no se ha abierto la ficha ni se publica como tema propio. |
| Kobix & Petix, Mauri & Kan | Pendiente | Hay sesión o cartel, y no una biografía que fije a cada persona. |
| DjXory | Sigue descartado como intérprete | Igual que en la fase 12: el canal publica sesiones de otros. |

No se han confundido con estos perfiles Adrian Mills, DJ Seinfeld ni Xavi Forné. Salen en búsquedas próximas y son otras personas.

## Archivos

- `src/data/djs.json`: tres perfiles nuevos; párrafos o tarjetas en DJ Cesk, Javi Tracker y Bassaul DJ. Las otras fichas de la fase 12 y las 16 anteriores conservan sus tarjetas, salvo esas tres ampliaciones.
- `src/data/sessions.json`: solo `djIds` en seis sesiones.
- `tests/djs.test.ts` y `tests/djs-view.test.ts`: el directorio espera 27 fichas; Da Terror, 4 sesiones; prueba de la fase 13.
- `INFORME-MAKINA-SOUND.md`: resumen vigente y fase 13. El historial anterior se conserva.

No se ha cambiado la interfaz, el CSS ni `sources.json`. El script de una sola ejecución se ha borrado después de aplicar los datos.

## Pruebas y compilación

`npm test`: 34 pruebas, 0 fallos.

`npm run build`: correcto. `tsc -b` y Vite 8.3.4.

- `dist/assets/index-CflFefW3.js`: 745,17 kB, gzip 182,14 kB.
- `dist/assets/index-C7q_vArb.css`: 22,34 kB, gzip 5,36 kB.

Sigue el aviso de fragmento por encima de 500 kB. No se ha partido el bundle. No se ha pasado el directorio por el navegador.

## Límites y siguiente tanda

Las biografías nuevas son cortas porque la fuente lo es. Ninguna trae retrato. Classic Style Vol.5 no reparte créditos por corte: la tarjeta es el disco. El índice de Bassaul, Aurora, y los candidatos de la tabla de arriba son la prioridad si más adelante se abre cada ficha. No se ha empezado otra fase.
