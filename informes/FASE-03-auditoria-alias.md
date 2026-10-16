# Fase 03 — Auditoría de alias: Dith Wemyd y Hector Seral

Fecha: 15 de octubre de 2026.
Estado: **completada como auditoría**. No se ha aplicado ningún cambio al catálogo.
Proyecto: `C:\Users\edugarcia\Documents\rewind-165`.

## Alcance

La pregunta era si hay evidencia suficiente para revisar los créditos de Dith Wemyd y Hector Seral en la ficha de Pastis & Buenri, y si esos nombres identifican a Julio Posadas en esos lanzamientos.

No se ha modificado `src/data/djs.json`, `src/data/sessions.json`, ni el código. Las 15 fichas y las 150 sesiones siguen igual. Las discografías de las fases 01 y 02 no se han reescrito.

## Qué había ya en el proyecto

La ficha publicada de Pastis & Buenri nombra a estas personas solo en dos temas:

| Ficha | Release | Título | Año | Artista principal | Crédito publicado |
| --- | ---: | --- | ---: | --- | --- |
| pastis-buenri / pildo-1996 | 575057 | Pildo | 1996 | Pastis & Buenri (113131) | Dith Wemyd, producción. Hector Seral, composición. |
| pastis-buenri / in-vino | 224736 | Vol. 2 - In Vino Veritas | 1997 | Pastis & Buenri (113131) | Dith Wemyd, producción. Hector Seral, composición. |

El resto de la ficha del dúo no usa esos nombres. Adrenalin, Vibrations, Game Over II, I'm Sailing, Stripped y Pildo (Space Version) no entran en este caso.

La fase 02 había leído el campo `aliases` de Julio Posadas Gilabert (6091309) y por eso la ficha de Julio ya muestra otros temas con el crédito «alias» cuando el artista del release se llama Dith Wemyd o Hector Seral. Esos temas no son Pildo ni In Vino. La descarga `tmp-discogs-works.json` no contiene los releases 575057 ni 224736 en ningún DJ, tampoco en `julio-posadas`. Por eso Julio no tiene ahora esas dos producciones.

Las copias locales de la fase 01 guardaban el nombre del crédito, no el identificador de artista de Discogs. Con eso solo no se podía saber si «Dith Wemyd» en Pildo era la página 113807 o un texto sin enlace. Esta auditoría pidió de nuevo esas fichas y las páginas de artista. El resultado está en `tmp-phase03-evidence.json`. No se ha vuelto a bajar la descarga de 696 referencias.

## Evidencia de las páginas de artista

Consultadas el 15 de octubre de 2026 en la API de Discogs.

| Página | Id | Nombre real que escribe Discogs | Texto de la página | Enlace inverso |
| --- | ---: | --- | --- | --- |
| Dith Wemyd | 113807 | Julio Posadas | Dice que es un alias de Julio Posadas, usado sobre todo en 1996 y 1997, y explica la sigla «DJs In The House Will Enjoy Make You Dance». | Lista a Julio Posadas Gilabert (6091309) entre sus alias. |
| Hector Seral | 113132 | Julio Posadas Gilabert | Dice que es un alias de Julio Posadas, usado sobre todo en 1997 y 1998. | Lista a Julio Posadas Gilabert (6091309) entre sus alias. |
| Julio Posadas Gilabert | 6091309 | Julio Posadas Gilabert | La biografía corta no repite estos dos nombres. El campo `aliases` sí incluye 113807 y 113132. | — |

Enlaces: [Dith Wemyd](https://www.discogs.com/artist/113807-Dith-Wemyd), [Hector Seral](https://www.discogs.com/artist/113132-Hector-Seral), [Julio Posadas Gilabert](https://www.discogs.com/artist/6091309-Julio-Posadas-Gilabert).

Esto es una relación dentro de Discogs, en los dos sentidos. No se ha consultado una entrevista, un contrato ni el texto impreso del vinilo.

## Evidencia de cada lanzamiento

En la ficha del release, el crédito trae identificador de artista, no solo el nombre.

### Pildo, 575057, 1996

Enlace: [Discogs](https://www.discogs.com/release/575057-Pastis-Buenri-Pildo).

| Nombre en el crédito | Función | Id de Discogs en ese crédito | ¿Es la página del alias? |
| --- | --- | ---: | --- |
| Dith Wemyd | Producer | 113807 | Sí |
| Hector Seral | Written-By | 113132 | Sí |
| David Alvarez | Written-By | 424616 | No es este caso |
| David Pamies | Written-By | 191758 | No es este caso |
| Yolanda Rivera | Written-By | 99647 | No es este caso |
| Miguel Degá & Ricardo Campoy | Executive-Producer | 3114002 | No es este caso |

### Vol. 2 - In Vino Veritas, 224736, 1997

Enlace: [Discogs](https://www.discogs.com/release/224736-Pastis-Buenri-Vol-2-In-Vino-Veritas).

| Nombre en el crédito | Función | Id de Discogs en ese crédito | ¿Es la página del alias? |
| --- | --- | ---: | --- |
| Dith Wemyd | Producer | 113807 | Sí |
| Hector Seral | Written-By | 113132 | Sí |

El resto de compositores (David Alvarez, David Pamies, Enrique Sanmarti, Yolanda Rivera) y la producción ejecutiva de Miguel Degá tienen otros ids. No se afirma nada sobre ellos.

### Control: Robots, 575054, 1997

Este tema ya está en la ficha de Julio como tema propio, con artista Hector Seral y crédito «alias». Se abrió para comparar. El artista principal y el Written-By tienen el id 113132, el mismo que en Pildo y en In Vino. Enlace: [Discogs](https://www.discogs.com/release/575054-Hector-Seral-Robots).

## Conclusión

**Dith Wemyd, en Pildo y en In Vino Veritas.** Certeza alta dentro de Discogs. El crédito de producción de esos dos releases apunta al id 113807, y esa página declara ser un alias de Julio Posadas, con el enlace de vuelta a 6091309. No hay fuente fuera de Discogs. No se ha comprobado el vinilo.

**Hector Seral, en los mismos dos releases.** Certeza alta dentro de Discogs, con el mismo tipo de prueba: el Written-By apunta al id 113132, nombre real «Julio Posadas Gilabert», y las dos páginas se enlazan. La página dice que el alias se usó sobre todo en 1997 y 1998. Pildo es de 1996. El id del crédito sigue siendo 113132; el «sobre todo» no anula el enlace, pero deja esa frase como matiz, no como una segunda fuente.

Listar dos nombres en `aliases` no bastaría por sí solo. Aquí el crédito del release usa el id de esa página, la página pone el nombre real y el texto de alias, y Julio enlaza las dos páginas. Esa cadena sí identifica el crédito concreto.

No se concluye que el nombre impreso deba borrarse. El crédito histórico visible es «Dith Wemyd» y «Hector Seral». Sustituirlo por «Julio Posadas» ocultaría el nombre que Discogs y, según esa ficha, el release acreditan.

## Cambios recomendados, sin aplicarlos

1. En Pildo y en In Vino Veritas, dejar los nombres Dith Wemyd y Hector Seral. Añadir una nota de que Discogs enlaza esos ids con Julio Posadas Gilabert.
2. No dar por hecho que el dúo y Julio sean la misma persona. El artista principal sigue siendo Pastis & Buenri (113131).
3. Valorar, en otra fase y con autorización, añadir estos dos releases a la ficha de Julio: producción a nombre de Dith Wemyd y composición a nombre de Hector Seral. Hoy no están, porque no salían en las 122 referencias.
4. No reabrir el resto de alias de la ficha de Julio en bloque. Esta fase solo ha comprobado el id de artista en Pildo, In Vino y Robots.

## Casos no resueltos

- No hay una fuente que no sea Discogs.
- No se ha visto la funda ni la etiqueta del vinilo.
- No se ha vuelto a descargar la lista de releases del alias para explicar por qué 575057 y 224736 faltan en `tmp-discogs-works.json`. El hecho es que faltan. La ficha del release, pedida aparte, sí trae el id.
- Los otros temas de Julio que muestran «alias» se clasificaron en la fase 02 por el nombre, no por el id de cada crédito. Siguen sin esta comprobación uno a uno.
- David Alvarez (424616) y David Pamies (191758) aparecen como compositores junto a Hector Seral. No se ha investigado si tienen relación con Pastis o con Buenri. Queda fuera de esta fase.

## Archivos

Creado: `informes/FASE-03-auditoria-alias.md` y `tmp-phase03-evidence.json` (páginas de artista y créditos con id).

Modificado: `INFORME-MAKINA-SOUND.md`, solo para añadir esta auditoría. El historial anterior se conserva.

No modificados: `src/data/djs.json`, `src/data/sessions.json`, `src/lib/djs.ts`, `tmp-discogs-works.json`, las fichas de las fases 01 y 02.

## Pruebas

`npm test`, ejecutado el 15 de octubre de 2026 después de la auditoría: 19 pruebas, 0 fallos. Sirve para comprobar que el catálogo publicado sigue igual. No se ha lanzado `npm run build` porque el sitio no ha cambiado.

## Siguiente fase

No está empezada. Si se autoriza, el cambio sería anotar el alias en los dos temas de Pastis & Buenri y decidir si Julio muestra Pildo e In Vino como producción y composición con el nombre acreditado. No sustituir los nombres. Las discografías que aún no se han auditado (Ricardo F, DJ Nau, Frank T.R.A.X., DJ Sisu, DJ Sonic) pueden esperar a esa decisión.
