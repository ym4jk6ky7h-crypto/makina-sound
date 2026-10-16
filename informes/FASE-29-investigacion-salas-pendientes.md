# Fase 29 — Investigación de salas pendientes

Fecha de la revisión: 16 de octubre de 2026.

`#salas` pasa de 27 fichas a 32. La fase no rehace el barrido de la fase 28: abre páginas concretas para las salas que el inventario dejó fuera. No hay fotografías ni carteles nuevos. El catálogo musical no cambia: 55 perfiles, 618 tarjetas y 150 sesiones. Los tres carteles citados siguen sin imagen.

La lista de control sigue siendo `informes/INVENTARIO-HISTORICO-DISCOTECAS.md`. Esta fase actualiza esas filas. No crea una segunda lista.

## Recuento

| | Salas |
| --- | ---: |
| Al inicio | 27 |
| Al cierre, en la web | 32 |
| Fichas nuevas | 5 |

Las cinco fichas son `barcalles`, `penelope`, `sala-del-cel`, `distrito-cero` y `heaven`.

## Las siete prioritarias

| Sala | Decisión | Qué sostiene el resultado |
| --- | --- | --- |
| Barçalles | Ficha | Barcelofília, 24 de marzo de 2011: Sagrada Família, antiguo cine Versalles, apertura en 1990, siete años, título 1990-1997, aforo de 1.500, mismos propietarios que Fibra Òptica y la Atlántida de Sitges, conflicto en Mallorca con Castillejos. |
| Penélope | Ficha, solo la de Benifaió | Valencia Bonita, página abierta: CV-520, km 9, carretera de Catadau a Benifaió, límite con Alfarp. Nombres del mismo local: Chivago River, Fontana, Penélope. Cierre de la etapa Penélope en 2008. |
| La Sala del Cel | Ficha | La República, 9 de enero de 2023. Pastis dice que empezó allí, primero con espectáculos y luego poniendo discos, unos tres años, y que en diciembre de 2022 la sala acogió su aniversario en Girona. Enlace a DJ Pastis. |
| Distrito Cero | Ficha, encontrada en esa entrevista | Canet de Mar. Pastis dice que trabajó allí un verano, entre La Sala del Cel y el Pont Aeri. No se alarga a una residencia. |
| Area de Beethoven | Sin ficha | Makina Mania, hilo 72800, mensaje del 12 de marzo de 2008, abierto: «Area Beethoven», calle Beethoven de Barcelona, hacia 1994, sesión light, y el autor dice que no es Area. Un solo recuerdo. Los directorios actuales de Music Beethoven, calle Beethoven 15, no se han abierto como historia y no se funden. |
| Area | Sin ficha | Sigue dependiendo del foro de cesabadell.org, que solo responde por http. |
| Concor | Sin ficha | El mismo foro la separa: calle Sant Cugat, 1992-1995, sin municipio. No hay https. |
| Area Concor | Sin ficha histórica | Nitbcn lista Área Concor en Narcís Monturiol i Estarriol, 12, Sant Quirze del Vallès, sin fechas. `discoteca-area-concor.espaciosweb.net` respondió 503. La República solo escribe Àrea Cöncor en una lista de la escena. Publicarla haría que buscar «concor» devolviera esa ficha y borraría la separación con el Concor anterior. |

## Qué no se convierte en dato

- Barçalles: noviembre de 1997 y la lista de cabina de La Disco de tu Vida. Esa página se abrió y nombra a Nando Dixkontrol, Pepe Billy y Julio Posadas entre otros. No distingue residencia de sesión suelta, así que no hay `djIds`.
- Penélope: el «2001 cuentan» y el 18 de diciembre de 1999, que es un comentario en la página, no el cuerpo del artículo. Levante-EMV volvió a responder 406. La Penélope del Poble Espanyol no se abrió.
- La Sala del Cel: la horquilla 1992-1994 de una ficha de foro. La anécdota de que le pidieron cambiar de música no se reescribe como causa del final.
- Distrito Mías no se publica como alias de Distrito Cero.
- Heaven: Valencia Bonita escribe 1989, un cierre en 1996 y El Perelló. Vicente Bresó escribe Pomelo y El Perelló. Las Provincias, 30 de enero de 2022, fecha la apertura en 1991, sitúa la sala en el Perellonet, avenida de las Gaviotas, y dice que en 2022 seguía en uso como She. Se publican 1991, el Perellonet y She. No se publican 1996 ni Pomelo.

## Segunda prioridad

Heaven entra, con la discrepancia escrita arriba. No es una sala mákina.

Siguen sin ficha, y el inventario conserva la fila:

- Verdi, By Pass, Nivel 2, El Gat, Level, RK-3, Qu4ttro, Nuclear Station, Orbital, Central Rock, Odeon, Compliche, Apocalipse, Revival y B-Side: no apareció una página propia en esta pasada.
- L'Anònim: Pastis lo nombra en La República junto a Ocho, La Sala del Cel y La Festa, hacia 1994, sin pueblo. El recuerdo de Montcada no se publica.
- Desk: sigue la frase de la Wikipedia y un mensaje que habla de un local detrás del antiguo Desk en L'Hospitalet. No basta.
- Fibra Òptica y Atlántida de Sitges: Barcelofília solo dice que compartían propietarios con Barçalles.
- Crac y Casablanca: siguen en la frase de El País, sin página propia.
- Tropical: Valencia Bonita, en el artículo de 2016, dice que ACTV sustituyó a locales como Tropical y un pie de foto la pone donde estuvo ACTV. No se ficha: no hay fechas ni una página solo de Tropical.
- Triplex de Cullera y Activa de Mataró: sin página de la sala. La República repite el paso de Pastis a Activa y no describe el local.
- Psicosis, Orbital, Central Rock y Cybertrack: sin página nueva.

Un mensaje del mismo hilo de Makina Mania dice que Chasis estuvo en Mollet y luego en Mataró. No se cambia la ficha de Mataró.

## Relaciones

- La Sala del Cel y Distrito Cero enlazan a DJ Pastis porque la entrevista lo dice. La ficha del DJ muestra las dos salas. No hay sesión de catálogo para ninguna de las dos.
- Barçalles, Penélope y Heaven no enlazan DJs.
- No se añade ningún `sessionIds`.

## Pruebas y revisión visual

`npm test`: 47 pruebas, 0 fallos. La prueba nueva comprueba las cinco fichas, que Area, Concor, Area Concor y Area de Beethoven no se publican, que buscar «concor» y «beethoven» no devuelve sala, que «barçalles» devuelve solo Barçalles, y que Girona deja La Sala del Cel.

Compilación local: `assets/index-Dvit9Qjq.js` (860,58 kB, gzip 209,92) y `assets/index-D2rVgAoB.css` (30,53 kB, gzip 6,82).

Compilación con `VITE_BASE=/makina-sound/`: `assets/index-rjnbesIt.js` (860,60 kB, gzip 209,93) y `assets/index-BC1EX7JV.css` (30,63 kB, gzip 6,83). El aviso de chunk por encima de 500 kB ya existía.

En el navegador, a ancho de escritorio, el directorio muestra 32 salas. Barçalles aparece en orden alfabético. Buscar «concor» deja el estado vacío y 0 de 32. La ficha de La Sala del Cel enlaza a DJ Pastis, no tiene sesión ni cartel, y la ficha de Pastis vuelve a La Sala del Cel y a Distrito Cero. `#salas/no-existe` muestra «Sala no encontrada».

A 390 px, `innerWidth`, `scrollWidth` y `clientWidth` valen 390. La búsqueda y el filtro quedan en columna. No se afirma que la consola estuviera limpia.

## Publicación

El workflow [38888499921](https://github.com/ym4jk6ky7h-crypto/makina-sound/actions/runs/38888499921) terminó en success. GitHub Pages responde 200 y sirve `assets/index-rjnbesIt.js` y `assets/index-BC1EX7JV.css`. El JavaScript público contiene «Barçalles», «Chivago River», «Distrito Cero» y «El Perellonet».

## Limitaciones

- Area, Concor y Area Concor siguen separados a propósito. El directorio https da una dirección en Sant Quirze y no una historia.
- Area de Beethoven sigue siendo un recuerdo de foro.
- Penélope depende de un artículo cultural. La prensa de Levante no se pudo abrir.
- Las fechas de Heaven no coinciden entre Las Provincias, Valencia Bonita y el blog de Bresó. Manda la pieza de prensa.
- Varios nombres de la lista catalana siguen en una sola enumeración.
