# Fase 01 — Discografía verificada de Skudero, Xavi Metralla y Pastis & Buenri

Fecha: 15 de octubre de 2026.
Estado: **completada** para estos tres perfiles. El resto de la discografía no entra en esta fase.
Proyecto: `C:\Users\edugarcia\Documents\rewind-165`.

## Fuente

Archivo usado: `tmp-discogs-works.json`. No se modificó ni se borró. No se repitió la descarga de las 654 referencias.

Recuento real en ese archivo, antes de filtrar:

| Grupo de la descarga | Referencias | Roles de la página de artista |
| --- | ---: | --- |
| `dj-skudero` | 20 | Main 16, Remix 2, Producer 1, Co-producer 1 |
| `xavi-metralla` | 14 | Main 12, Producer 1, Co-producer 1 |
| `pastis-buenri` | 69 | Main 55, Remix 5, Producer 9 |

El grupo del dúo junta tres ids de Discogs: 113131 (Pastis & Buenri), 539428 (Pastis) y 209469 (Buenri). Por eso 69 no es el número de temas del dúo.

El campo `credit` de esa descarga no se publicó tal cual. `tmp-discogs-works.mjs` convierte en `produced` cualquier rol que contenga producer, written-by o remix. La clasificación de esta fase usa el rol original (`Main`, `Remix`, `Producer`, `Co-producer`) y, para lo que no es una cinta, la ficha `GET /releases/{id}` guardada en `tmp-discogs-credits-phase01.json`.

## Decisiones técnicas

1. No hay un catálogo paralelo. Los temas siguen en `tracks` de `src/data/djs.json` y los lee `readDj` en `src/lib/djs.ts`.
2. Tipos de crédito que ya existían: `own`, `collaboration`, `produced`, `remix`, `compilation`, `reissue`. Un tema tiene un solo tipo. Los créditos de otras personas van en `credits[]` (`name`, `role`), no en un archivo nuevo.
3. `edition` guarda otra edición sin crear otra tarjeta. El CD promo 6690372 cuelga de Metramorphosis y de Diabolica. La deduplicación usa solo el primer enlace de Discogs, que es el máxi, así que el promo no fusiona las dos canciones ni crea una tercera.
4. `dedupeTracks` colapsa dos pistas con el mismo `/release/{id}`. No se llegó a meter el vinilo y el archivo del mismo máxi: la descarga ya prefería un formato y esta fase no añadió el duplicado.
5. `classifyDiscogsCredit` es la regla de las pruebas, no un importador ciego:
   - formato `mixed` o `comp`: `skip`;
   - sello con `aicovers`: `skip`;
   - artista `Various`: `skip`;
   - rol Discogs `Remix`, y el sujeto está en los artistas o en el título: `remix`;
   - el título «(Remix)» con rol `Main` no basta para el tipo remix;
   - rol de productor y el sujeto no es el artista: `produced`;
   - el sujeto es el artista y hay más de un artista: `collaboration`;
   - el sujeto es el único artista: `own`.
6. Para el dúo el sujeto es la cadena `Pastis & Buenri`. «Pastis» a secas no coincide, así que un tema solo de Pastis no entra en la ficha del dúo.
7. El formato visible sale de la descarga cuando el release está en ella (`12"`, `12", Pic`, `12", Ora`, `File, MP3, 320`). Si el release no estaba en las 20/14/69 y la ficha de la API solo dice `Vinyl` o `File`, se dejó esa palabra. No se escribió `12"` por costumbre.
8. Se quitó el discriminador de Discogs al mostrar el nombre: `Dr. Who (3)` queda `Dr. Who`, `Game Over (2)` queda `Game Over`, `DJ Mind (2)` queda `DJ Mind`. El informe conserva el nombre original.
9. La portada es la imagen primaria de esa ficha de release (`https://i.discogs.com/...`). `CoverImage` la sustituye por «Sin portada verificada» si la URL falla. Pildo (Space Version) no tiene imagen porque no hay release de Discogs comprobado.
10. `reviewedAt` de los tres perfiles es `2026-10-15`. La ficha lo enseña. Las sesiones y los `djIds` no se han editado. Ruboy conserva Flying Free como producción suya.

## Publicados

Temas en la ficha, antes y después: Skudero 5 → 8, Xavi 3 → 7, Pastis & Buenri 4 → 9. Fichas de DJ: 15. Sesiones: 150.

### DJ Skudero

| Id interno | Release | Título | Año | Tipo | Por qué |
| --- | ---: | --- | --- | --- | --- |
| extasia | 561541 | Extasia (Remix) | 1996 | colaboración | Artistas Dr. Who (3) y Skudero. Rol de la página: Main. Composición: Alex Fain y Paolo Verlanzi. No hay rol Remix. |
| fluor | 372474 | Fluor | 1997 | tema | Artista Skudero. Producción compartida con Hard Boiled. |
| rendez-vous-ii | 700504 | Rendez-Vous II | 1997 | producción | Artista Biospheric. Skudero es coproductor, con Frank Diaz y Juan Francisco Martinez. Gerard Requena produce. Jean-Michel Jarre figura en la composición. |
| elements | 226085 | Elements | 1998 | tema | No estaba entre las 20. Artista Skudero. Producción compartida con Gerard Requena. Formato de la API: Vinyl. |
| infectious-flight | 349060 | Infectious Flight | 1998 | colaboración | Skudero y DJ Gollum, ambos composición y producción. |
| elements-ii | 372469 | Elements II | 1999 | tema | Artista Skudero. La producción, la grabación y la mezcla son de Ruben Moreno, no de Skudero. |
| flying-free | 371479 | Vol. 4 | 1999 | colaboración | No estaba entre las 20. Artistas «Skudero & Xavi Metralla» y Pont Aeri. Producción: DJ Ruboy, Skudero y Xavi Metralla. YouTube `Z1wKhdF78tQ`. El título oficial no es «Flying Free». |
| spirit-bird | 16148047 | Spirit Bird | 2020 | tema | Artista Skudero. Producción: Dany BPM. |

### Xavi Metralla

| Id interno | Release | Título | Año | Tipo | Por qué |
| --- | ---: | --- | --- | --- | --- |
| metramorphosis | 224183 | Metramorphosis | 1997 | tema | No estaba entre las 14. Coproducción y composición de Xavi; producción y composición de Gerard Requena. |
| diabolica | 362939 | Diabolica | 1998 | tema | Mismo reparto de créditos que Metramorphosis. Formato de la descarga: 12". |
| xavi-flying-free | 371479 | Vol. 4 | 1999 | colaboración | El mismo release que en Skudero. Una tarjeta en esta ficha. |
| redballoons | 914716 | 99 Redballoons | 2002 | tema | Artista único. Sin créditos extra en la ficha. |
| makina-survive | 410552 | Makina Survive! | 2004 | tema | Grabación y composición: Jaime Panadero, Tony Costa y Xavi Metralla. Composición también de David R. Watson (2) y Kathleen Jones (4). |
| makina-ep-2 | 348094 | Makina EP 2 | 2004 | colaboración | Xavi Metralla y DJ Mind (2). Sin créditos extra. |
| fight-song | 16596579 | Fight Song | 2020 | tema | Artista único. Sin créditos extra. |

En Metramorphosis y Diabolica se conserva el enlace al CD promo 6690372 (Bit Music PCD-201, 1998, formato CD). En esa ficha Xavi Metralla es Presenter y aparece un coproductor llamado Xavi Escudero. No se afirma que sea el mismo Xavi: no está documentado como alias en los datos usados.

Los enlaces de perfil a Beatport y Apple Music se dejaron como estaban.

### Pastis & Buenri

Solo entra un release cuyo artista es el dúo «Pastis & Buenri».

| Id interno | Release | Título | Año | Tipo | Por qué |
| --- | ---: | --- | --- | --- | --- |
| pildo-1996 | 575057 | Pildo | 1996 | tema | No estaba entre las 69. Producción: Dith Wemyd. Producción ejecutiva: Miguel Degá y Ricardo Campoy. Composición: David Alvarez, David Pamies, Hector Seral, Yolanda Rivera. |
| in-vino | 224736 | Vol. 2 - In Vino Veritas | 1997 | tema | No estaba entre las 69. Mismo productor. Se añade Enrique Sanmarti en la composición. Título copiado de la API, con el guion. |
| adrenalin | 373690 | Adrenalin | 1998 | tema | No estaba entre las 69. Gerard Requena produce y compone. Pastis y Buenri figuran en la composición, con esos nombres. |
| vibrations | 375388 | Vibrations | 1999 | colaboración | Artistas: el dúo, DJ Ruboy y Game Over (2). |
| lovin | 257174 | I Need Your Lovin' / Different Melody | 2000 | colaboración | Artistas: Uraken, el dúo y Gerard Requena. La ficha no trae créditos extra. No se afirma que el dúo escribiera las dos caras. |
| game-over-ii | 563707 | Game Over II | 2000 | colaboración | El dúo, DJ Ruboy y Game Over (2). Sin créditos extra. |
| im-sailing | 209874 | I'm Sailing | 2002 | tema | Solo el dúo. Sellos Xque Records y Bit Music, catálogo 72-002. Formato de la descarga: 12", Pic. |
| stripped | 473941 | Stripped (Remix) | 2004 | tema | Solo el dúo. Rol de la página: Main. `extraartists` vacío. El título dice Remix y se conserva, pero el tipo no es remix porque nadie está acreditado como remixer. |
| pildo-space | — | Pildo (Space Version) | 2025 | tema | Ya estaba en la ficha. YouTube `XDqO6_3HNFw` y Beatport `19897701`. Sin portada: no hay release de Discogs que se pueda emparejar. No se trata como reedición de Pildo (1996). |

## Rechazados o pendientes

### Cintas y recopilatorios

El rol Main de una cinta Mixed significa que mezclaron la cinta, no que produjeran cada corte. No se abrió el tracklist. Quedan pendientes por si un corte concreto tuviera un crédito de producción aparte.

Skudero (13): 8448071, 8448115, 6113324, 6113783, 6113959, 8454609, 7004843, 7057164, 7057330, 8430237, 6923017, 14980411 (Remix, Cass Mixed), 6113707 (Remix, Cass Mixed).

Xavi (7): 6116108, 8426658, 8426857, 6114029, 6114083, 7057315, 8578357 (Co-producer en la cinta del 22º aniversario de Gerard Requena).

Grupo Pastis & Buenri (23): 6721729, 6721934, 6730523, 1322290, 6721659, 8073184, 705094, 6731014, 604918, 4417488, 4553834, 4670479, 4653182, 6934063, 4739347, 810954, 6264129, 8605697, 4629336, 4331851, 2477873, 5107768, 3153367.

### Portada de IA

34498675, Flying Free (Cover Album), 2025, KIVY AICovers. Aparece como Producer en Skudero y en Xavi. No es el Vol. 4 de 1999.

### Solitario de Pastis

No van a la ficha del dúo. Si más adelante hay una ficha de Pastis, hay que volver a leer cada release; esta lista solo dice que el artista no es el dúo.

Main: 896986 Dark Spirit (con David Traya), 1483020 Trance Fly (con Xavi BCN), 1582219 Cosmic NRG, 3560860 Vol. 11, 6719196 E Nomine, 7432979 Wechseln, 6617184 The Trilogy, 16109461 Da Piano E.P., 21908710 Last Requiem, 23514542 Hardtrance Squad Vol.1, 24106640 Distorsion Times Vol.9, 24106985 Hardtrance Squad Vol.2, 25203028 La Vezina Corp. E.P.1, 25264018 The Moon E.P., 29737903 Tauro E.P., 35125469 Abyss Of Delirium E.P. (solo Pastis), 35264539 Exoplanet E.P., 36008869 Música, 13975427 Return To Classics (año 0 en la descarga).

Producción: 1574989 Everlasting (UVPX), 2070609 Summer (Ger y Enef), 15669997 Pastis Records E.P. Vol.1 (Various; un recopilatorio no se publica como tema).

### Solitario de Buenri

Main: 209882 Curare, 721541 Crazy On The Track, 1214551 Chemical Noise, 20339629 Where Are You, 26618804 Game Over 3, 35667088 Phantasy, 38170530 Vol.1, 38277102 Stars, 38277174 The Night, 38584401 Hello.

Producción: 994469 No Rush, 659121 Dreams, 662463 Forever And Ever, 698969 Vol. 9, 815683 Fallout Shelter, 1200416 Under The Rage.

### Remixes que no se pudieron firmar

28199623 y 29948332, Scratch Bass, catálogo INT015. Artistas DJ Dani El Loco y DJ X-Centrik. El título de 2001 dice «Pastis & DJ X-Centrik Remix»: es Pastis, no el dúo. Los créditos extra de la ficha están vacíos. Si se publicara, los dos formatos serían una sola tarjeta.

30519016, Hey-A-Wa. La descarga decía Remix. La ficha del release tiene a DJ Sylvan como artista y a Ricardo Vazquez LLanes como productor. No nombra a Pastis ni a Buenri. No se publica.

## Archivos

Creados:

- `informes/FASE-01-discografia.md`
- `tmp-discogs-credits-phase01.json` (65 fichas de release; caché de la auditoría, no es el catálogo de la web)
- `tmp-discogs-credits-phase01.mjs` (script que pidió esas fichas; no forma parte del sitio)

Modificados:

- `src/data/djs.json` (solo los tres perfiles: temas, créditos, edición y `reviewedAt`)
- `src/lib/djs.ts` (`credits`, `edition`, `dedupeTracks`, `classifyDiscogsCredit`)
- `src/components/DjsPage.tsx` (créditos, edición, fecha de comprobación, portada con reserva)
- `tests/djs.test.ts`
- `INFORME-MAKINA-SOUND.md` (este cierre se añade al final; la foto del 14 de octubre sigue)

No modificados: `tmp-discogs-works.json`, `src/data/sessions.json`, el resto de fichas de DJ.

Eliminados: ninguno del catálogo. Los scripts de un solo uso de esta comprobación (`tmp-apply-phase01.mjs`, `tmp-check-phase01.mjs`, `tmp-formats.mjs`, `tmp-roles.mjs`, `tmp-extras.mjs`, `tmp-rejected.mjs`) se borran al cerrar para que no reescriban `djs.json` si alguien los vuelve a lanzar.

## Pruebas

Ejecutadas el 15 de octubre de 2026:

- `npm test` → 18 pruebas, 0 fallos. Las nuevas cubren el tipo de crédito, el descarte de cinta mezclada, recopilatorio de Various y sello AICovers, y la deduplicación de dos enlaces al mismo release.
- `npm run build` → `tsc -b` y Vite correctos. Bundle `dist/assets/index-CyuUx5dd.js` y `dist/assets/index-CxPnyFZX.css`.
- Navegador en `http://127.0.0.1:4176`:
  - `#djs/dj-skudero`: 4 temas, 3 colaboraciones, 1 producción, 8 imágenes de Discogs decodificadas, 0 rotas.
  - `#djs/xavi-metralla`: 5 temas, 2 colaboraciones, 7 imágenes, nota del CD promo, Beatport y Apple Music, iframe `https://www.youtube-nocookie.com/embed/Z1wKhdF78tQ?rel=0`.
  - `#djs/pastis-buenri`: 6 temas, 3 colaboraciones, 8 imágenes de Discogs, Pildo Space con «Sin portada verificada», 14 sesiones (tres compartidas con Sisu), iframe `https://www.youtube-nocookie.com/embed/XDqO6_3HNFw?rel=0`.

## Límites

Las URLs de `i.discogs.com` funcionaron en esa comprobación. No son un archivo propio: si Discogs las retira, la ficha enseña el estado vacío. No se inventó una portada de sustitución.

No se recorrió el tracklist de las cintas. Un corte producido dentro de una mixtape puede existir y esta fase no lo ha firmado.

I Need Your Lovin' / Different Melody puede ser un split. Sin créditos extra, solo se publica el artista compartido.

El alias Xavi Escudero queda sin identificar.

## Siguiente fase

No está empezada. Lo razonable es repetir este filtro con Ruboy, Gerard Requena y Julio Posadas, que concentran el resto de la descarga. Los temas en solitario de Pastis y de Buenri piden ficha propia; meterlos en el dúo desharía esta fase.
