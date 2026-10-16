# Fase 18 — retratos reales y rediseño editorial

Fecha de consulta: 15 de octubre de 2026.
Estado: completada. No se ha empezado otra fase.

## Auditoría inicial

El catálogo, leído de `src/data/djs.json` y `src/data/sessions.json`, tiene 55 perfiles, 618 tarjetas de release y 150 sesiones. Ningún retrato está en estado `verified` y ningún perfil guarda `imageUrl`. Trece fichas tienen una página de origen en estado `pending`. Las otras 42 están en `unavailable`.

Un retrato solo se muestra si el estado es `verified` y hay `imageUrl`, `sourceUrl` y `sourceName` en https (`src/lib/djs.ts`, `src/lib/djView.ts`). Una ruta local no pasaría esa comprobación. Las portadas de release viven en `coverUrl` y no se han usado como retrato.

La interfaz de la fase 17 ya separa placa de iniciales, nombre, discografía con portada cuadrada (`object-fit: contain`) y sesiones 16:9. Esta fase no rehace esa estructura.

## Investigación

Se han revisado los 55 perfiles. La prioridad fue Ruboy, Gerard Requena, DJ Pastis, DJ Buenri, DJ Skudero y Xavi Metralla, y después el resto del directorio.

Fuentes abiertas en esta fase:

- API de Wikimedia Commons, espacio de nombres de archivos, con identificador `MakinaSoundCatalog/1.0`.
- API de Wikipedia en español para Gerard Requena, Mákina, DJ Skudero, Ruboy, Nando Dixkontrol y Toni Peret.
- Búsqueda web de licencias y de piezas de prensa del Dream Team.

Wikipedia en español tiene artículo de Gerard Requena y de Mákina, y una página de Toni Peret. Ninguna trae un archivo de retrato: solo iconos de interfaz. Commons no tiene un archivo a nombre de Skudero, Metralla, Ruboy, Rubén Moreno Abanades, Pastis y Buenri, Nando Dixkontrol ni DJ Sonic con Pont Aeri.

Los demás nombres devuelven homónimos o documentos que no son la persona del catálogo. No se han descargado. Ejemplos descartados:

| Búsqueda | Archivo de Commons | Por qué se descarta |
| --- | --- | --- |
| Toni Peret | Peret, el bajista Miquel Rubió y otros músicos.jpg | Es el cantante de rumba, no Toni Peret. |
| Xavi BCN | Xavi Alcaraz, Barcelona.jpg | Otra persona. |
| Ricardo F DJ | Aphex Twin.jpg | Otro artista. |
| Julio Navas | Julio Nava en 2011 | Otro nombre. |
| Joan Creus | Txitxi Creus, básquet | Otra persona. |
| Pedro Miras | Fernando López Miras | Otra persona. |
| Pastis | Categoría Pastis | El licor, no el DJ. |
| DJ Nau, Sergi Blue, Julio Posadas, Da Terror | Novelas, aves, la ciudad de Posadas, una escultura | Coincidencia de palabras. |

La consulta de Adrian Kuyck fue rechazada por el límite de peticiones de la API y no se repitió. El resto de búsquedas de Commons de esta tanda sí respondió.

Una crónica de Diario de Ibiza (14 de julio de 2023) atribuye una foto de grupo de José María Castells, Quique Tejada y Toni Peret a Daniel Espinosa. No se abrió el archivo, no es un retrato individual y el texto consultado no trae licencia. Queda como candidato, no como imagen publicable. Hispasonic, El Periódico, 2M Group y Europa FM identifican al trío, sin una cesión de imagen.

Las trece páginas que el catálogo ya guardaba siguen sin una licencia compatible. Una web oficial, una entrevista o un pie de foto no bastan. DJ Nau, además, reserva las fotografías en su aviso legal (fase 08). No se ha cambiado ningún estado del JSON.

## Recuento

| | Número |
| --- | ---: |
| Perfiles investigados | 55 |
| Candidatos que podrían ser la persona, sin licencia de reutilización | 13 páginas ya archivadas, más la foto de grupo del Dream Team |
| Identidad comprobada y derechos pendientes | 13, los que el catálogo ya marca `pending` |
| Candidatos sin cerrar | 1, la foto de grupo de Diario de Ibiza |
| Retratos con licencia compatible (`verified_licensed`) | 0 |
| Retratos publicados | 0 |
| Perfiles que siguen con la placa de iniciales | 55 |

No hay archivos en `public/images/djs/`. No se ha creado un segundo catálogo de imágenes: la fuente sigue siendo el campo `portrait` de cada ficha, y hoy ninguno está verificado.

### Páginas ya guardadas, no publicadas

| DJ | Página de origen en el catálogo | Estado | Derechos |
| --- | --- | --- | --- |
| DJ Nau | https://djnau.com/presskit/ | Pendiente | El aviso legal reserva las fotos. |
| Sergi Blue | https://www.sergiblue.com/ | Pendiente | Web oficial, sin licencia de reutilización. |
| Javi Maki | Lloret Gaceta | Pendiente | Prensa, sin cesión. |
| DJ Sisu | https://www.pontaeri.es/ | Pendiente | Foto de grupo, sin orden de caras ni licencia. |
| DJ Skudero | https://www.pontaeri.es/ | Pendiente | Igual. |
| Xavi Metralla | https://www.pontaeri.es/ | Pendiente | Igual. |
| DJ Sonic | https://www.pontaeri.es/ | Pendiente | Igual. |
| DJ Pastis | https://www.jamboo.es/member/dj-pastis/ | Pendiente | Identidad no cerrada como retrato individual y sin licencia. |
| Ruboy | https://factoriamakina.com/nosotros/ | Pendiente | El archivo cita a Vanderphoto, 2025. Eso no es una licencia. |
| Nando Dixkontrol | https://www.cccb.org/ca/w/collectius/nando-dixkontrol | Pendiente | Pie de Miquel Taverna, sin cesión. |
| Julio Posadas | https://aedyp.es/rueda-de-prensa-spain-nightlife-aedyp/ | Pendiente | Foto de grupo. |
| Ricardo F | Entrevista de Makineros | Pendiente | Sin licencia de reutilización. |
| Da Terror | https://www.daterror.com/ | Pendiente | Web oficial, sin licencia de reutilización. |

DJ Buenri y Gerard Requena no tienen página de retrato en el catálogo. Esta fase tampoco ha encontrado un archivo libre.

## Diseño

La discografía, las sesiones y la placa de iniciales de la fase 17 se mantienen. Lo que cambia es la apertura del directorio y un fallo de la ficha.

- La cabecera de `#djs` pone el título y la entradilla a la izquierda, con un filete ácido, y el número real de artistas a la derecha. Si la búsqueda filtra, el número es el de resultados y la etiqueta dice «de 55».
- El nombre sigue siendo el texto principal de la tarjeta, debajo de la placa, con el año solo si existe `activeFrom`.
- Un único resultado no estira la tarjeta a todo el ancho: la galería se queda en unos 16,5 rem.
- En la ficha, «Desde YYYY» había heredado el estilo del contador y se iba al borde derecho. Ahora queda bajo el nombre.
- Si más adelante hay un retrato `verified`, la ficha le reserva una columna de 14 a 20 rem, con `object-fit: cover` y `object-position: center 20%`. La tarjeta del directorio le reserva proporción 4/5. El texto no se superpone a la cara.
- Hover y foco cambian el nombre y el filete. Con `prefers-reduced-motion` no hay transición.

Cuadrícula: dos columnas en móvil, tres desde 720 px, cuatro desde 1100 px.

## Archivos

- `src/components/DjsPage.tsx`
- `src/styles/djs.css`
- `tests/djs.test.ts` — la fase 18 comprueba 55 perfiles, 618 tarjetas, 150 sesiones y cero retratos verificados.

No se han modificado `djs.json`, `sessions.json`, biografías, créditos, fechas ni `djIds`.

## Integridad

Antes y después: 55 perfiles, 618 tarjetas, 150 sesiones, 0 `imageUrl`, 13 `pending` y 42 `unavailable`. La prueba nueva lo afirma sobre el JSON actual.

## Pruebas

`npm test`: 38 pruebas, 0 fallos.

`npm run build`: correcto.

- `dist/assets/index-CfAzSCYk.js` — 789,16 kB; gzip 192,64 kB.
- `dist/assets/index-BZWPvAOZ.css` — 28,45 kB; gzip 6,46 kB.

El aviso de chunk mayor de 500 kB ya existía.

## Revisión en el navegador

Preview real en `http://127.0.0.1:4173/`, bundle `index-CfAzSCYk.js`. La consola de las páginas medidas no registró errores. No hubo desbordamiento horizontal.

Escritorio, unos 1920 px:

- `#djs`: cuatro columnas de 268 px, cabecera con el 55, placas y nombres.
- Búsqueda «Ruboy»: «1 de 55» y una tarjeta de 264 px, no a todo el ancho. Abre `#djs/ruboy`.
- Ruboy: monograma junto al nombre, «Desde 1996» debajo, trayectoria, portadas de 100×100 con `object-fit: contain` y controles «Mostrar 24 más» y «Mostrar 20 más».
- `#djs/dj-pastis`: biografía larga y trayectoria, año bajo el nombre.
- `#djs/dj-buenri`: sesiones 16:9 (176×99), sin iframe hasta que se pide, y «Mostrar 7 sesiones más».
- `#djs/oskar-mad`: sin temas, sin producciones y sin sesiones. Fuentes Discogs y Wikipedia.
- `#djs/ruben-xxl`, en móvil: biografía corta, una colaboración, sesiones vacías y fuentes Discogs y Digital Hits.

Tablet, 820 px: tres columnas. El 55 cabe junto a la entradilla.

Móvil, 390 px, Ruben XXL: el nombre no se corta, la discografía va en una columna y no hay scroll horizontal.

## Limitaciones

- No hay ningún retrato que se pueda publicar. Hace falta una licencia explícita o una autorización, y en varios casos un retrato individual.
- La consulta de Commons para Adrian Kuyck no llegó a responder.
- Las fotos de prensa y de webs oficiales siguen pendientes. No se han vuelto a descargar.
- El diseño está preparado para una foto verificada, pero esa foto todavía no existe en el catálogo.
