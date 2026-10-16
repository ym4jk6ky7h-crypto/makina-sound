# Fase 16 — rediseño editorial del directorio y de las fichas de DJs

Fecha: 15 de octubre de 2026.
Estado: completada. No se ha empezado ninguna ampliación del catálogo.

## Qué queda igual

55 perfiles, 618 tarjetas de release y 150 sesiones. No se han añadido ni eliminado DJs, biografías, releases, créditos, sesiones, fechas de publicación, identificadores de YouTube, `djIds` ni identificadores de perfil. La navegación sigue siendo por hash: `#djs` y `#djs/id`. No hay React Router. El resto de secciones no se ha tocado.

## Dirección artística

La sección se trata como un archivo de revista, no como una tienda ni como un panel de etiquetas.

- Fondo carbón, texto en papel y filetes finos.
- El amarillo ácido queda en el antetítulo, el foco del teclado y algún acento. No rellena las tarjetas.
- El magenta de la marca no cubre los retratos.
- Los nombres usan la tipografía condensada de la marca. El texto y los metadatos usan la tipografía de lectura.
- Las tarjetas comparten proporción. El retrato, o el monograma si no hay foto, ocupa la parte alta. El nombre va debajo, en contraste con el fondo, para que se lea sin depender de un degradado.
- El movimiento es una transición corta de la tarjeta. Se apaga si el sistema pide menos movimiento.

## Organización

Directorio `#djs`:

- Antetítulo «Archivo», título «DJs» e introducción sobre el criterio del archivo.
- Cuenta real: «55 artistas», o «N de 55» cuando la búsqueda filtra.
- Buscador por nombre y orden: nombre, desde el más reciente y desde el año más antiguo. Quien no tiene año documentado queda después de los que sí lo tienen. No se le inventa una fecha.
- Cada tarjeta enlaza a `#djs/id`. Muestra el nombre, «Desde YYYY» solo si `activeFrom` existe, y una indicación discreta: «Música y sesiones», «Con discografía» o «Con sesiones». Esa indicación no entra en los hechos de la tarjeta ni copia títulos.

Ficha `#djs/id`:

- Cabecera: monograma o retrato, nombre, dato secundario verificado y el primer párrafo de la biografía actual. En móvil el nombre va antes que el retrato y el monograma se reduce. Desde 720 px el retrato y el texto van en paralelo.
- Trayectoria: el resto de párrafos, solo si la biografía tiene más de uno. No se ha reescrito ni ampliado ningún texto. No hay cronología fabricada.
- Discografía: cuadrícula de portadas con proporción fija. Cada pieza muestra título, año, sello, crédito (tema propio, colaboración, producción, remix, recopilatorio o reedición) y el enlace que ya existía. Si no hay portada verificada, el hueco dice «Sin portada verificada». Se muestran 24 piezas y un control «Mostrar N más».
- Sesiones: sección aparte, con miniatura 16:9, fecha de publicación del vídeo, reproductor bajo demanda y enlace al vídeo y a `#sesiones/id`. Se muestran 8 y el resto se pide. Si no hay sesiones, el vacío lo dice y no inventa contenido.
- Fuentes: solo si el perfil tiene enlaces https. La etiqueta es el nombre de la fuente, no la URL larga.

## Archivos

- `src/components/DjsPage.tsx` — página del directorio y de la ficha.
- `src/components/djs/DjPortrait.tsx` — retrato verificado o monograma.
- `src/components/djs/ReleaseGrid.tsx` — discografía paginada.
- `src/components/djs/SessionBlock.tsx` — sesiones paginadas.
- `src/styles/djs.css` — estilos de esta sección. `src/main.tsx` los importa.
- `src/styles/sessions.css` — se retiran las reglas antiguas de la ficha de DJ para que no compitan con el nuevo diseño. Las sesiones de `#sesiones` se dejan como estaban.
- `src/lib/djView.ts` — la tarjeta del directorio gana el campo `hint`. Los hechos siguen siendo solo el año documentado. El modelo interno del fallback sigue llamándose «Ilustración», como exigen las pruebas; la interfaz muestra iniciales y «Sin retrato de {nombre}».

`src/data/djs.json` y `src/data/sessions.json` no se han modificado.

## Retratos

Una fotografía solo se muestra si el estado es `verified` y hay `imageUrl`, `sourceUrl` y `sourceName` en https. Un HTTP 200 no cuenta como verificación. Esta fase no marca ninguna imagen como verificada y no guarda ninguna `imageUrl`.

Inventario del catálogo actual:

| Estado | Perfiles |
| --- | ---: |
| Verificada y utilizable | 0 |
| Pendiente de permiso o de identificación | 13 |
| No encontrada | 42 |

Pendientes. La página de origen está guardada. La imagen no se publica:

| DJ | Página de origen | Por qué no se usa |
| --- | --- | --- |
| DJ Nau | https://djnau.com/presskit/ | El aviso legal de la web reserva las fotografías. |
| Sergi Blue | https://www.sergiblue.com/ | Retrato de la web oficial, sin licencia de reutilización. |
| Javi Maki | Lloret Gaceta, crónica de las dos décadas en cabina | Prensa. La fase 08 no pudo leer una licencia. |
| DJ Sisu | https://www.pontaeri.es/ | Solo en foto de grupo, sin orden de las caras ni licencia. |
| DJ Skudero | https://www.pontaeri.es/ | Igual que Sisu. |
| Xavi Metralla | https://www.pontaeri.es/ | Igual que Sisu. |
| DJ Sonic | https://www.pontaeri.es/ | Igual que Sisu. |
| DJ Pastis | https://www.jamboo.es/member/dj-pastis/ | La identidad de esa ficha no queda cerrada como retrato individual del dúo, y no hay licencia. |
| Ruboy | https://factoriamakina.com/nosotros/ | Retrato del proyecto. El archivo cita a Vanderphoto, 2025. Eso no es una licencia. |
| Nando Dixkontrol | https://www.cccb.org/ca/w/collectius/nando-dixkontrol | Pie de Miquel Taverna. Sin cesión. |
| Julio Posadas | https://aedyp.es/rueda-de-prensa-spain-nightlife-aedyp/ | Foto de grupo. No es un retrato individual. |
| Ricardo F | Entrevista de Makineros | Sin licencia de reutilización. |
| Da Terror | https://www.daterror.com/ | Web oficial, sin licencia de reutilización. |

Los otros 42 perfiles no tienen una candidata que identifique a la persona y se pueda publicar. No se han usado fotos de sala, de fiesta, de grupo ni imágenes generadas. El inventario de la fase 08 se mantiene: Wikimedia no ofrece un retrato libre de estos artistas.

Fallback: iniciales sobre un fondo gráfico común, proporción reservada y texto accesible «Sin retrato de {nombre}». Si una foto verificada fallara al cargar, el mismo bloque pasa a «Imagen no disponible» y no deja un icono roto.

## Pruebas

`npm test`: 37 pruebas, 0 fallos.

`npm run build`: correcto.

- `dist/assets/index-BvuuqXRP.js` — 788783 bytes (788,78 kB); gzip 191562 bytes (191,56 kB).
- `dist/assets/index-0_Hcpo6Q.css` — 25875 bytes (25,88 kB); gzip 5964 bytes (5,96 kB).

El aviso de Vite por un chunk mayor de 500 kB ya existía. No se ha añadido ninguna dependencia.

## Comprobación en el navegador

Preview real en `http://127.0.0.1:4173/`, con el bundle de esta fase.

- Escritorio, `#djs`: título, introducción, «55 artistas», buscador y orden. Cuadrícula de monogramas a cuatro columnas.
- Búsqueda «Ruboy»: «1 de 55» y una tarjeta. Al abrir la ficha y volver, la consulta sigue escrita.
- Orden «Desde 1995»: José María Castells (1980), Quique Tejada y Toni Peret (1982), y después el resto de años documentados. Quien no tiene año aparece al final, sin una fecha falsa.
- `#djs/ruboy`: biografía, trayectoria, discografía con portadas reales y controles «Mostrar N más».
- `#djs/dj-pastis`: ficha propia, «Desde 1995», trayectoria.
- `#djs/dj-buenri`: ficha distinta, con discografía y sesiones.
- `#djs/ruben-xxl`: una colaboración (Bring Me To Life, 2003), producciones vacías, sesiones vacías y fuentes Discogs y Digital Hits.
- `#djs/oskar-mad`: sin discografía ni sesiones, con fuentes. Monograma «OM».
- Tablet, unos 820 px: el directorio pasa a tres columnas y el buscador y el orden quedan en paralelo.
- Móvil, unos 390 px: en la ficha el nombre va primero y el monograma queda pequeño, antes de la trayectoria.

No hay reproducción automática.

## Limitaciones

- Ningún retrato se puede publicar todavía. Hace falta una licencia o una autorización por escrito, y en Pont Aeri además un retrato individual.
- Las biografías de un solo párrafo no tienen bloque de trayectoria: ese párrafo ya está en la cabecera.
- Las discografías largas no se cargan enteras de golpe. El dato sigue completo; la vista pide el resto.
- No se ha rehecho ninguna otra sección.
