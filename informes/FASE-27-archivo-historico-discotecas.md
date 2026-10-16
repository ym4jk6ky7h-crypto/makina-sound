# Fase 27 — Archivo histórico de discotecas

Fecha de la revisión: 16 de octubre de 2026.

`#salas` pasa de cinco fichas a catorce. Cada ficha nueva repite solo lo que una página abierta sostiene. No hay fotografías ni carteles nuevos. El catálogo musical no cambia: 55 perfiles, 618 tarjetas y 150 sesiones. Los tres carteles citados siguen sin imagen.

## Inventario de la lista de trabajo

| Nombre del encargo | Estado | Qué se publica |
| --- | --- | --- |
| Gran Velvet | Identificada y documentada | Ficha `gran-velvet`, Montigalà, Badalona. |
| Area de Bethoveen | Identidad ambigua | Sin ficha. Un recuerdo de foro la describe como otra sala, en la calle Beethoven de Barcelona en 1994, y dice que no tiene que ver con Area. Eso basta para no fusionarla. No basta para fecharla. |
| Barçalles | Pendiente de fuentes fiables | Sin ficha. Solo aparecen recuerdos de foro. |
| Area | Identidad ambigua | Sin ficha. Los hilos mezclan Area, Area Concor y Concor, y no se ha abierto una página que fije el local. |
| Area Concor | Identidad ambigua | Sin ficha. Se mantiene separada de Area y de la sala de Beethoven. |
| El 8 | Identificada y documentada | Ficha `disco-ocho`. Las páginas abiertas escriben Disco 8, Disco Ocho y Ocho. Ninguna usa la grafía El 8, así que no se publica como alias. |
| Pont Aeri | Ya documentada | Se conserva. Se añade la discrepancia de fechas de El Español, sin sustituir La Vanguardia. |
| La Festa | Pendiente de fuentes fiables | Sin ficha. Solo aparecen recuerdos de foro. |
| Xque | Ya documentada | Se conservan las grafías X-Que y X-Què como alias. Se añade la versión de El Español sin sustituir la Wikipedia. |
| Éxtasis | Identificada, con información pendiente | Ficha `extasis`, solo Llombai. La Wikipedia la nombra y dice que no alcanzó la fama de las salas principales. No hay fechas ni DJ. El Español usa «éxtasis» para la pastilla y no se mezcla. |
| Nau B-3 | Identificada, con la localidad pendiente | Ficha `nau-b3`. El Español dice que tuvo varias ubicaciones y la asocia con El Brujo. No se publica un pueblo. |
| Central | Identificada y documentada | Ficha `central-cubelles`. Es la sala de Cubelles que El Español atribuye a Scorpia. No es «Scorpia: Central del Sonido» de Òdena. |
| Chocolate | Identificada y documentada | Ficha `chocolate`, con el alias Chocolate Cream. |
| Barraca | Identificada y documentada | Ficha `barraca`, Les Palmeres, Sueca. |
| Penélope | Identificada, con información pendiente | Sin ficha. Una búsqueda la menciona como antigua Chivago Rivers en un artículo personal de 2015. Esa página no se ha usado como fuente. |
| ACTV | Identificada y documentada | Ficha `actv`, Malvarrosa. |
| Chasis | Ya documentada | Se conserva. Kontrol, también en Mataró, es otra ficha. |

Kontrol no estaba en la lista de trabajo. Entra porque la misma frase de El Español que documenta Central la nombra en Mataró.

## Fuentes abiertas

- Santiago Alonso, Applehead, 13 de abril de 2023: https://appleheadteam.com/el-lugar-mas-excitante-del-mundo/
- Wikipedia en español, Barraca: https://es.wikipedia.org/wiki/Barraca_(discoteca)
- Wikipedia en español, Ruta Destroy: https://es.wikipedia.org/wiki/Ruta_Destroy
- Las Provincias, 3 de abril de 2017: https://www.lasprovincias.es/culturas/musica/201703/31/discotecas-miticas-valencia-20170331170458.html
- David López Frías, El Español, 6 de noviembre de 2016: https://www.elespanol.com/reportajes/grandes-historias/20161105/168483417_0.html
- Intertapes, ficha de una cinta de Disco 8: https://intertapes.net/ocho

El Punt Avui pidió un captcha y no se cita. Tampoco se usan Makineros, Flech Corporation, Badalona Recuerdos, los foros de Makina Mania ni el hilo de cesabadell.org. Una búsqueda no cuenta como página abierta.

## Discrepancias que se dejan escritas

- Chocolate: la Wikipedia llama a 1998 el último gran año y no lo da como cierre. Las Provincias fecha el nacimiento en 1980 y el cierre en 2007, y luego la etapa Qoqoa sin fecha.
- ACTV: el pie de la Wikipedia escribe Akuarela. Las Provincias escribe Aquarela. Ninguna fecha el cambio.
- Pont Aeri: El Español habla de un cierre definitivo en 2010. La Vanguardia anuncia el cierre del local de Vallgorguina en 2012. Se conservan las dos frases.
- Xque: El Español atribuye la apertura a Pastis y Buenri y un cierre en 2006. La Wikipedia la atribuye a Gin Lemon y fecha Palafrugell hasta el 21 de julio de 2007. Pastis y Buenri no pasan a fundadores.
- Psicódromo: El Español sitúa el cierre en 1994. Vice lo fecha el 5 de mayo de 1992.

## Qué no se enlaza

- El vídeo «Intro Chocolate + Sesión Pastis & Buenri» no entra en Chocolate.
- Las sesiones de DJ Nau no entran en Nau B-3.
- Frank T.R.A.X. no entra en Central de Cubelles ni en Kontrol.
- Pepebilly entra en Disco Ocho por la frase de El Español y sigue en Psicódromo. Intertapes no lo nombra.
- El Brujo se nombra en la prosa de Nau B-3. No hay perfil en el archivo.
- No se añade un filtro de contexto musical. Las salas se solapan y las fuentes no dan una clasificación única.

## Archivo

Cada sala puede llevar `aliases` y `places`. Si faltan, el lector los deja vacíos. La búsqueda usa el nombre, los alias, la localidad escrita y el resumen. El filtro de localidad usa `places`, no una clasificación inventada. El orden es alfabético y no hay un segundo criterio. La cabecera cuenta el resultado. El estado vacío y el botón de quitar filtros aparecen cuando la consulta no es la de partida. `#salas/id` abre la ficha. `#salas/no-existe` dice «Sala no encontrada».

Las placas siguen siendo composición editorial. No se ha descargado ninguna imagen de terceros.

## Pruebas y revisión visual

`npm test`: 45 pruebas, 0 fallos. Las nuevas comprueban las nueve fichas, la ausencia de Area, Barçalles, La Festa y Penélope, el alias Chocolate Cream, Pepebilly en Disco Ocho, que Central no lleva a Frank T.R.A.X., que Kontrol no es Chasis, y que la búsqueda «central» devuelve Cubelles y Scorpia por separado.

Compilación local: `assets/index-B7R9dYT-.js` (835,34 kB, gzip 203,54) y `assets/index-D2rVgAoB.css` (30,53 kB, gzip 6,82).

Compilación con `VITE_BASE=/makina-sound/`: `assets/index-fttSzolT.js` (835,35 kB, gzip 203,54) y `assets/index-BC1EX7JV.css` (30,63 kB, gzip 6,83).

En el navegador, a ancho de escritorio, el directorio muestra 14 salas en orden alfabético. Buscar «ocho» deja una ficha y el recuento pasa a 1 de 14. Mataró deja Chasis y Kontrol. Una búsqueda sin resultado muestra el estado vacío. Quitar filtros restaura las 14. La ficha de Disco Ocho enlaza a DJ Pepebilly, y la ficha del DJ vuelve a Disco Ocho y al Psicódromo. Chasis conserva a Ricardo F y las cinco sesiones. Chocolate no enlaza ninguna sesión. `#salas/no-existe` muestra «Sala no encontrada».

A 390 px, `innerWidth`, `scrollWidth` y `clientWidth` valen 390. La búsqueda y el filtro quedan en columna y la primera tarjeta se lee entera. No se afirma que la consola estuviera limpia.

## Publicación

El workflow [38880856594](https://github.com/ym4jk6ky7h-crypto/makina-sound/actions/runs/38880856594) terminó en success. GitHub Pages responde 200 y sirve `assets/index-fttSzolT.js` y `assets/index-BC1EX7JV.css`. El JavaScript público contiene «Disco Ocho», «Montigalà» y la nota que deja Area de Beethoven sin fusionar.
