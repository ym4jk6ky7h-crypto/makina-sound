# MAKINA SOUND

Archivo vivo de la música Makina: el remember y el sonido de hoy. Lema: «Del remember al sonido de hoy».

La carpeta del proyecto sigue llamándose `rewind-165`. Es el directorio local, no el nombre público de la web.

## Cómo ejecutarla en local

Desde esta carpeta:

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173). Si ese puerto está ocupado, Vite usa el siguiente.

Para comprobar la compilación de producción:

```bash
npm run build
npm run preview
```

## Qué hay ahora

- Cabecera con el logotipo MAKINA SOUND, seis entradas y buscador.
- Portada: Makina actual, Remember esencial, DJs, Sesiones, Salas y flyers, textos y el proyecto.
- Nueve vistas por ancla: `#inicio`, `#explorar` (Makina actual), `#discos` (Remember), `#djs`, `#sesiones`, `#salas`, `#flyers`, `#archivo` y `#proyecto` (en el pie).
- En `#djs`, la ficha de un DJ (biografía y discografía con enlace) solo entra si se puede firmar. No hay un ranking de 300 nombres.
- En `#sesiones`, sesiones de YouTube comprobadas. No es el archivo completo de cada canal y no hay catálogo de discos.
- En el móvil, el menú y el buscador de la cabecera se abren de verdad.

El buscador de la cabecera filtra la portada (prueba con «sala», «flyer», «remember» o «sesión»). Al enviar, abre Archivo. Dentro de Sesiones se busca por título o DJ, se acota por época (Todas, Remember, Makina actual) y se ordena por fecha, nombre, más vistas o duración. No hay filtro por canal ni por año. El listado abre por la sesión publicada más recientemente. No se actualiza solo desde YouTube. En DJs se busca por nombre o tema. El vídeo grande es la sesión publicada más reciente de todo el catálogo. No hay backend ni actualización automática desde YouTube.

## Sesiones de YouTube

Los componentes leen el catálogo con `readCatalog()` (`src/data/catalog.ts`). Esa función junta dos JSON locales:

- `src/data/sources.json`: canales y DJs. Cada ficha tiene `id`, `displayName` (el nombre de búsqueda, aunque no coincida con YouTube), `youtubeName`, `channelId`, `channelUrl`, `sourceType` (`channel` o `artist`), `enabled`, `verificationStatus` (`verified` o `pending`) y una `note` opcional.
- `src/data/sessions.json`: vídeos. Cada ficha tiene `id`, `title`, `djName` si el título o el canal lo identifican, `channelName`, `channelId`, `youtubeVideoId`, `youtubeUrl`, `publishedAt` (fecha de publicación del vídeo, `AAAA-MM-DD`), `viewCount` y `durationSeconds` si se han comprobado, `era` (`remember`, `current` o `unknown`), `sourceUrl`, `sourceIds`, `status` (`draft` o `published`) y `kind` (`session`, `pending` o `excluded`).

La web solo muestra fuentes válidas y sesiones `published` con `kind` `session`. Un borrador, una ficha pendiente o un vídeo repetido no generan otra tarjeta. El identificador del vídeo manda: si llega por dos fuentes, se conserva una ficha y se juntan las procedencias. El orden es la fecha de publicación, de más reciente a más antigua. Una fecha desconocida va al final. `publishedAt` no es la fecha de una fiesta ni la época del remember.

Para añadir una sesión:

1. Confirma el canal en `sources.json`. Si hay varios canales posibles, déjalo en `pending`, sin `channelId` ni `channelUrl`, y con `enabled` en `false`.
2. Comprueba en YouTube el título, el canal, el identificador del vídeo y la fecha de publicación. La URL tiene que ser `https://www.youtube.com/watch?v=` más ese identificador.
3. Entra solo si es una sesión o una mezcla. Deja fuera anuncios, entrevistas, videoclips y temas sueltos (`kind`: `excluded` o `pending`).
4. Pon `era` en `remember` o `current` solo cuando el propio vídeo lo diga. Si no, `unknown`.
5. `viewCount` y `durationSeconds` solo si salen de la ficha de YouTube en el momento de comprobar el vídeo. No son una cifra en directo. No rellenes biografías ni miniaturas propias. La miniatura sale de `i.ytimg.com` a partir del identificador.

La actualización automática no está conectada: no hay clave de YouTube Data API ni función en servidor. No hace falta configurar credenciales para usar la web. Si más adelante se consulta la API, la clave tiene que vivir fuera del frontend (variable de entorno en un servicio que no se empaquete con Vite) y el resultado debe volcarse en estos JSON. `readCatalog()` es el punto para cambiar la lectura sin rehacer la sección.

Canales confirmados: Amics de la Makina, Digital Hits FM, Makina Legends, Makina o Muerte, Makineros 90's, DC TV' Forever Deejays, Portal Makina, La Nostra Maqkina, Sepi Official Dj, DaniDjLucena, DJ NAU, Lia Jensen Music, Sergi Blue, xquesiano81, Bassaul dj, DjXory, Javi Maki y Adrian Kuyck.

Siguen pendientes, sin canal asignado: DJ Cesk, DJ Lokis, Note DJ, DJ Bonik, Julio Posadas, Javi Neurass, Buenri, Pastis, DJ Soon, De Nervio, DJ Pitu, DJ Plus, Paco Pil, DVRK Oktopus y DJ Jonyk. El motivo está en la nota de cada fuente.

## Imágenes y tipografía

Las ilustraciones son dibujos originales (SVG). No son fotografías de salas, flyers ni sesiones reales.

Barlow Condensed y Source Sans 3 se usan bajo la licencia SIL Open Font License, empaquetadas con Fontsource en el build. La web no llama a una CDN de fuentes en el navegador.
