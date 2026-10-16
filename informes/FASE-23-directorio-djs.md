# Fase 23 — directorio de DJs y fichas

Fecha: 16 de octubre de 2026.

## Problemas al empezar

El directorio `#djs` ya tenía 55 tarjetas, monograma, año y enlace a `#djs/id`. La búsqueda de pantalla solo miraba el nombre artístico. `filterDjs` puede leer biografía, etapas y títulos, pero el directorio no lo usaba: la prueba de la fase 07 exige que «makineros» no devuelva fichas y que el directorio no lleve biografías, títulos de temas ni títulos de sesiones.

No había filtro por sala ni por presencia de discografía o sesiones. No había un control para vaciar la consulta. El orden era alfabético o por `activeFrom`. La cabecera solo contaba artistas visibles. La tarjeta usaba un texto vago («Música y sesiones», «Con discografía», «Con sesiones») y no los recuentos reales. `workLabel` existía y no se pintaba.

En la ficha, el bloque «Producciones» salía aunque estuviera vacío. Discografía y sesiones ya explicaban la ausencia con una frase corta. La sección Salas, de la fase 22, solo aparece si `venues.json` nombra al DJ. El texto accesible del monograma decía «Sin retrato de», como si la tarjeta estuviera incompleta.

Retratos verificados: 0. Pendientes: 13. Sin candidato: 42. El catálogo seguía en 55 perfiles, 618 tarjetas y 150 sesiones. Tres salas y tres referencias de cartel, sin imagen.

## Archivos

| Archivo | Motivo |
| --- | --- |
| `src/lib/djView.ts` | Búsqueda por nombre y sala, filtros, cifras del archivo, marcas con recuentos reales y orden por registros. |
| `src/lib/djs.ts` | El orden admite `records`. El orden por fecha no cambia. |
| `src/components/DjsPage.tsx` | Cabecera, filtros, estado vacío, tarjetas y omisión del bloque vacío de producciones. |
| `src/components/djs/DjPortrait.tsx` | El monograma se nombra como monograma. |
| `src/styles/djs.css` | Cifras, filtros, foco del botón, monograma de ficha y una columna por debajo de 480 px. |
| `tests/djs-view.test.ts` | Prueba de sala, contenido, orden, estado vacío y recuento de Ruboy. |

No se han editado `djs.json`, `sessions.json`, `venues.json` ni `flyers.json`.

## Qué hace el directorio

La cabecera sigue titulada «DJs». Debajo hay tres cifras del archivo completo, calculadas al abrir los datos: 46 con discografía, 25 con sesiones y 13 con sala. El número grande sigue siendo el de resultados visibles.

La búsqueda combina el nombre artístico con el nombre de las salas ya ligadas. «Pont Aeri» devuelve a Pastis, Buenri, Sisu, Skudero, Xavi Metralla, Sonic y Nando Dixkontrol. No busca en la biografía ni en los títulos de temas o sesiones: eso metería la discografía en el directorio y contradice la prueba que deja «makineros» en cero.

Filtros que sí cambian el resultado, y que se combinan con el texto:

- Contenido: todo, con discografía, con sesiones o con sala.
- Sala: Pont Aeri, Xque o Chasis, leídas de `venues.json`.
- Orden: Nombre, Desde el más reciente, Desde 1995, y «Con más registros».

«Con más registros» ordena por la suma de tarjetas de lanzamiento y sesiones del catálogo, y a igualdad por nombre. No es un ranking histórico. El primero del archivo es Ruboy, con 142 lanzamientos y 1 sesión.

«Quitar filtros» vacía texto, contenido, sala y orden. Si no hay coincidencias, el texto es: «Ningún DJ coincide. Prueba con otro nombre o quita los filtros.»

Cada tarjeta muestra el monograma, el nombre, el año solo cuando `activeFrom` existe, y marcas reales: «N lanzamientos», «N sesiones» y el nombre de la sala, o «N salas» si hay más de una. Sin retrato no hay un contador de fotos. El año sigue siendo solo «Desde YYYY» o un rango.

## Fichas

La biografía no se ha reescrito. La discografía y las sesiones siguen separadas. Si no hay producciones, ese título no se pinta. Si no hay temas o sesiones, se mantiene la frase que ya existía. Si no hay sala ligada, la sección no aparece.

Ricardo F, comprobado en el navegador: discografía, producciones, tres sesiones y el enlace `#salas/chasis`. Toni Peret: monograma, trayectoria, «No hay temas documentados en esta ficha.», «No hay sesiones relacionadas en el catálogo.» y tres fuentes. No tiene sección Salas. «Volver a DJs» apunta a `#djs`. Desde Chasis, el enlace a Ricardo F vuelve a `#djs/ricardo-f`. `#flyers` sigue con tres referencias y cero imágenes.

## Retratos

No se incorpora ninguno. Siguen 13 pendientes y 42 sin candidato. Esta fase no ha vuelto a descargar las páginas de licencia: el inventario del mismo día está en `informes/FASE-20-retratos-y-acceso.md`. Allí falta, en cada caso, una licencia de reutilización que se pueda citar, o no se pudo leer la página. Un archivo en `public/` no sería un permiso. El monograma es la imagen del directorio y de la ficha. Su texto accesible es «Monograma de {nombre}».

## Pruebas y compilaciones

`npm test`: 42 pruebas, 22 suites, 0 fallos. La prueba nueva es «busca por sala, filtra por contenido y ordena por registros».

`npm run build`, base `/`: correcto. `dist/assets/index-BJ_XPKAY.js` (809,47 kB; gzip 197,21 kB) y `dist/assets/index--xK6cVC5.css` (29,78 kB; gzip 6,70 kB).

`VITE_BASE=/makina-sound/` y `npm run build`: correcto. `dist/assets/index-CqQXe88r.js` (809,48 kB; gzip 197,22 kB) y `dist/assets/index-qPO6uUeK.css` (29,89 kB; gzip 6,71 kB). El aviso de fragmento por encima de 500 kB ya existía.

Vista local en `http://127.0.0.1:4174/?v=fase23`. Es temporal y solo responde mientras el proceso de vista previa sigue abierto.

Comprobado en el navegador:

- `#djs` a 1920 px: 55 tarjetas, 55 monogramas, 0 fotografías, cifras 46 / 25 / 13.
- Sala Chasis: una tarjeta, Ricardo F. «Quitar filtros» devuelve las 55.
- Texto «zzzz-no-existe»: «0 de 55» y el estado vacío.
- Orden «Con más registros»: Ruboy el primero.
- Texto «Pont Aeri» con ese orden: 7 de 55, Pastis el primero.
- `#djs/ricardo-f` y `#djs/toni-peret`, y el cruce con `#salas/chasis`.
- `#flyers`: 3 referencias, 0 imágenes.
- A 390 px de ancho: una columna, sin scroll horizontal. La cabecera mide unos 358 px. El campo de búsqueda mide 51 px de alto y «Quitar filtros» 44 px. El monograma de Ricardo F mide 92×92. En esa ficha no hubo recursos con estado HTTP 400 o superior.

No se adjuntó un listener de consola antes de la primera carga, así que no se afirma que la consola estuviera vacía. No se revisó una anchura de tablet distinta de 390 y de escritorio.

## Publicación

Pendiente de confirmar el flujo de GitHub Actions después de subir estos cambios. La URL pública anterior sigue siendo https://ym4jk6ky7h-crypto.github.io/makina-sound/ y, hasta que ese flujo termine, sirve la fase 22.

## Pendiente

- Retratos: hace falta una licencia citable para cada candidato. El detalle de qué falta está en la fase 20.
- La búsqueda no entra en biografías ni en títulos. Es una decisión para no convertir el directorio en un buscador de discografía.
- «Con más registros» cuenta tarjetas del archivo, no importancia histórica.
- Scorpia y el Psicódromo siguen sin ficha de sala.
- Los tres carteles siguen sin imagen autorizada.
