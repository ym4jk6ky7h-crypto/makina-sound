# Fase 19 — sistema de retratos

Fecha: 15 de octubre de 2026.
Estado: completada. No se ha publicado ninguna fotografía nueva y no se ha empezado otra fase.

## Por qué una ruta local no pasaba

`readPortrait` solo aceptaba un retrato `verified` si `imageUrl` era `https://`. Una ruta como `/images/djs/ruboy.jpg` no cumple eso, y el lector la convertía en `unavailable`. Aunque hubiera pasado, `portraitImage` no pedía licencia: bastaban la imagen, el nombre de la fuente y su URL.

La vista solo muestra foto si el estado que sale del lector es `verified` y tiene imagen. `pending` tira `imageUrl` aunque venga en el JSON. Si el archivo falla al cargar, `DjPortrait` pasa a «Imagen no disponible» y deja las iniciales. Las pruebas de la fase 07 y de la fase 18 exigen que el catálogo real no tenga ningún `verified` ni ningún `imageUrl`.

## Modelo

Sigue habiendo un solo sitio: el campo `portrait` de cada ficha. No hay un segundo catálogo.

Estados:

| Estado | Qué significa | ¿Se muestra la foto? |
| --- | --- | --- |
| `verified` | Identidad y uso autorizados, con la documentación de abajo | Sí |
| `pending` | Identidad o página de origen conocida; derechos pendientes | No |
| `candidate` | Candidato que todavía hay que comprobar | No |
| `unavailable` | No hay imagen utilizable | No |

Para que `verified` se conserve hacen falta, a la vez:

- `imageUrl`: `https://…` o `/images/djs/{id}.jpg`, `.jpeg`, `.png` o `.webp`. El nombre del archivo tiene que ser el identificador del DJ. No vale `..` ni otra carpeta.
- `sourceUrl` y `sourceName`: la página de origen, en https.
- `license`: el texto de la licencia o de la autorización.
- `licenseUrl`: un enlace https a esa evidencia.
- `checkedAt`: fecha `AAAA-MM-DD` de la comprobación.
- `photographer` y `rightsHolder`: solo si se conocen.

Guardar un archivo en `public/` no lo autoriza. Una web oficial tampoco. Si falta la licencia, la fuente o la fecha, el retrato queda en `unavailable` y no se publica la imagen.

Los 13 `pending` y los 42 `unavailable` del JSON no se han modificado. Un `pending` puede traer una URL de imagen y el lector la descarta.

## Cómo añadir un retrato

1. Recibir el archivo, o la autorización, con una procedencia que se pueda citar.
2. Comprobar que la persona es el DJ de ese identificador, no un homónimo.
3. Anotar autor, titular, licencia y la página donde se lee esa licencia.
4. Si el uso permite copiarla, guardarla en `public/images/djs/{id}.jpg` (o png o webp), con el identificador exacto.
5. En el `portrait` de esa ficha, poner `status: "verified"` y los campos de arriba. La ruta local no lleva dominio.
6. `npm test` ejecuta `auditPortraits`. Avisa si el archivo no existe, si la ruta sale de `/images/djs/`, si el nombre no es el identificador, si dos fichas comparten archivo o si un verificado no tiene documentación.
7. Abrir `#djs` y `#djs/{id}` y comprobar el retrato. Si el archivo no carga, la ficha muestra las iniciales y no se rompe.

No hay backend ni panel de administración.

## Catálogo

Antes y después: 55 perfiles, 618 tarjetas, 150 sesiones, 0 retratos verificados, 13 pendientes y 42 sin candidato. No se han añadido archivos de imagen.

## Archivos

- `src/lib/djs.ts` — lectura del retrato y `auditPortraits`.
- `src/lib/djView.ts` — la foto solo sale si la licencia, su enlace y la fecha están presentes.
- `tests/djs.test.ts` y `tests/djs-view.test.ts`.

No se han tocado biografías, discografías, sesiones, estilos ni otras secciones.

## Pruebas

`npm test`: 39 pruebas, 0 fallos. Cubren retrato local autorizado, retrato remoto autorizado, verificado sin licencia, ruta con `..`, pendiente, candidato, archivo inexistente, el fallback si la imagen falla y el catálogo real.

`npm run build`: correcto. Bundle `dist/assets/index-DosoZukJ.js` (789,56 kB; gzip 192,82 kB). La hoja no cambia: `dist/assets/index-BZWPvAOZ.css`.

## Pendiente

Sigue sin haber una fotografía con licencia compatible. Los 13 candidatos y la foto de grupo del Dream Team, anotada en la fase 18, no se publican. El diseño de las fases 17 y 18 ya reserva el hueco del retrato para cuando exista uno autorizado.
