# Fase 30 — imágenes históricas, Desk y Urban

Fecha: 16 de octubre de 2026.

## Resumen

`#salas` pasa de 32 a 33 fichas. Entra Desk, en L'Hospitalet de Llobregat, sin calle, sin apertura y sin cierre. Urban no entra: hay dos recuerdos distintos y ninguno se ha corroborado. Se publican dos fotografías con licencia abierta y atribución: la fachada de Barraca (Francesc Fort, 26 de julio de 2026) y el edificio cuyo rótulo dice Puzzle Superclub (19Tarrestnom65, 9 de abril de 2022). Los 55 perfiles siguen con monograma. No cambian las 618 tarjetas ni las 150 sesiones. No se republica ningún cartel.

## Cifras

- DJs investigados en Wikimedia Commons: 55. Retratos incorporados: 0.
- Salas investigadas: las 32 ya publicadas, más Desk y los dos Urban. Fotografías de sala incorporadas: 2. Carteles incorporados: 0.
- Fichas nuevas: Desk (`desk`).

## Derechos

El detalle, con la URL de cada ficha abierta, está en `informes/INVENTARIO-IMAGENES-HISTORICAS.md`.

Incorporadas, CC BY-SA 4.0, consulta del 16 de octubre de 2026:

- Barraca. Francesc Fort. [File:Barraca MMXXVI.jpg](https://commons.wikimedia.org/wiki/File:Barraca_MMXXVI.jpg). Archivo `public/images/venues/barraca.jpg`.
- Puzzle. 19Tarrestnom65. [File:Discoteca Puzzle.jpg](https://commons.wikimedia.org/wiki/File:Discoteca_Puzzle.jpg). Archivo `public/images/venues/puzzle.jpg`.

No se usan el logotipo de Pont Aeri, la foto de grupo de Vale Music, el Peret de la rumba, Luna-C, Xavi Alcaraz, el Heaven de Londres ni el archivo diminuto titulado «discoteca chocolate». La foto de Akuarela Playa tiene licencia, pero el pie la presenta como un nombre posterior de ACTV y el archivo no ha unificado esos nombres: no se publica en la ficha de ACTV.

## Desk

La Wikipedia de la mákina, abierta de nuevo el 16 de octubre de 2026, dice que Al-fredo y Javi Traker fueron discjockeys residentes de la sala Desk en Hospitalet de Llobregat. La frase está en el pasaje de Other Side y no lleva una nota que date la residencia. Más adelante, el mismo artículo dice que Desk va haciendo fiestas puntuales. No hay página propia de la sala. La ficha enlaza a DJ Al-Fredo y a Javi Tracker, y advierte que la biografía de Tracker cita una ficha de Beatport que llama a Desk sala de Barcelona. Esa página de Beatport no se ha vuelto a abrir. El desacuerdo queda escrito y no se resuelve. No hay sesión del catálogo cuyo título nombre Desk.

## Urban

Se investiga aparte de Desk.

- L'Hospitalet. El hilo 72800, ya abierto en la fase 29, dice «el urban de LH (detras de antiguo desk)». Una lista del hilo 36810 escribe «Urban (Hospitalet)» como ítem distinto de Desk y de «Summa (Cornellà)». No es una dirección. No hay ficha.
- Cornellà. El resultado de búsqueda del tema 55265 de Makina Mania habla de un Urban de Cornellà y de nombres anteriores. La página del hilo no se abrió en esta fase. Esos nombres no se publican. No se funde con el Urban de L'Hospitalet ni con ninguna otra sala llamada Urban.

## Lo que sigue pendiente

Area, Concor, Area Concor y Area de Beethoven siguen fuera. Siguen sin ficha propia Verdi, By Pass, Anonim, Nivel 2, El Gat, Level, RK-3, Qu4ttro, Nuclear Station, Orbital, Central Rock, Odeon, Compliche, Apocalipse, Revival, B-Side, Psicosis, Crac, Casablanca, Tropical, Akuarela, Coliseum de Mollet, Triplex, Activa de Mataró, Fibra Òptica y la Atlántida de Sitges. Los 55 retratos siguen pendientes de una fotografía identificada y con licencia.

## Pruebas y compilación

`npm test`: 48 pruebas, 0 fallos. La prueba nueva exige Desk, rechaza Urban, comprueba autor y licencia de las dos fotos y que el archivo exista, y deja caer una imagen cuyo nombre no corresponde a la sala.

Compilación local, sin `VITE_BASE`: `assets/index-CCrk20bk.js` (865,61 kB, gzip 211,38) y `assets/index-BKqj0BqF.css` (31,13 kB, gzip 6,92). Con `VITE_BASE=/makina-sound/`: `assets/index-Cczm8gar.js` (865,62 kB, gzip 211,39) y `assets/index-29UJ0Wtn.css` (31,23 kB, gzip 6,93). El aviso de fragmento superior a 500 kB ya estaba. Las dos JPEG suman unos 1,2 MB y no entran en el JavaScript.

## Inspección visual

Sobre `http://localhost:4182/`, compilación local.

- Escritorio: la ficha de Barraca muestra la fachada, el enlace a Commons, «Francesc Fort. CC BY-SA 4.0.» y el pie del 26 de julio de 2026. El título queda legible al lado. `scrollWidth` 1905 e `innerWidth` 1920.
- 390 px de ancho de layout: la foto pasa arriba y el título debajo. `clientWidth` y `scrollWidth` quedan en 390. El directorio también queda en 390. Las tarjetas de Barraca y Puzzle llevan foto; el resto conserva la placa.
- Búsqueda de salas: «desk» devuelve 1 de 33, solo Desk. «urban» devuelve 0 de 33.
- Búsqueda de DJs: «desk» devuelve DJ Al-Fredo y Javi Tracker, 2 de 55, ambos con monograma. «urban» devuelve 0 de 55.
- `#salas/desk` enlaza a esos dos perfiles y no muestra sesión ni cartel.
- `#salas/no-existe` muestra «Sala no encontrada».
- Puzzle cargó a 1920×1440 en la ficha. No se revisó la consola del navegador.

## Despliegue

El workflow [38893984629](https://github.com/ym4jk6ky7h-crypto/makina-sound/actions/runs/38893984629) terminó en éxito. La web pública, https://ym4jk6ky7h-crypto.github.io/makina-sound/, responde 200 y sirve `assets/index-Cczm8gar.js` y `assets/index-29UJ0Wtn.css`. El JavaScript contiene «Francesc Fort», «19Tarrestnom65», «Hospitalet de Llobregat» y las rutas de las dos fotografías. `images/venues/barraca.jpg` y `images/venues/puzzle.jpg` responden 200, `image/jpeg`, con 554289 y 665641 bytes.
