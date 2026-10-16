# Fase 06 — Discografías de Nando Dixkontrol, Sergi Blue y Da Terror

Fecha: 15 de octubre de 2026.
Estado: **completada** para estos tres perfiles. No se ha empezado otra fase.
Proyecto: `C:\Users\edugarcia\Documents\rewind-165`.

## Alcance y fuentes

Solo estos tres perfiles. No se han modificado biografías, sesiones, diseño ni el bundle más allá de los datos nuevos.

`tmp-discogs-works.json` no se ha modificado. Sigue en 696 referencias. Los tres grupos miden:

| Grupo | Referencias en la descarga | Mixed o Comp, sin abrir el tracklist | Fichas de release abiertas |
| --- | ---: | ---: | ---: |
| nando-dixkontrol | 6 | 1 | 5 |
| sergi-blue | 1 | 0 | 1 |
| da-terror | 1 | 0 | 1 |

8 referencias examinadas en la descarga. 7 fichas de release abiertas. 7 tarjetas publicadas. Una tarjeta es un release, no cada corte del tracklist.

El campo `credit` de la descarga no se usó. La clasificación sale del rol original y de `GET /releases/{id}` en `tmp-discogs-credits-phase06.json`, con id de artista. Los alias salen de `GET /artists/{id}` en `tmp-discogs-aliases-phase06.json`.

Ids: Nando Dixkontrol 99293, Sergi Blue 17282047, Da Terror 11914190.

## Publicados

| Perfil | Antes | Después | Tipos |
| --- | ---: | ---: | --- |
| Nando Dixkontrol | 0 | 5 | 4 temas, 1 producción |
| Sergi Blue | 0 | 1 | 1 colaboración |
| Da Terror | 0 | 1 | 1 colaboración |

| Tarjeta | Release | Año | Tipo | Artista de la tarjeta |
| --- | ---: | ---: | --- | --- |
| The Universal Ocho Family | 582412 | 1994 | tema | Nando Dixkontrol, cortes B1 y B2 |
| Welcome To Cybertron | 396267 | 1996 | tema | Nando Dixkontrol |
| Addicts To Vinyl | 445585 | 1998 | tema | Nando Dixkontrol |
| Ballade Pour Adeline | 529564 | 1998 | tema | Nando Dixkontrol |
| To The Big Big Ben | 529554 | 1998 | producción | Big-Ben |
| Aún Recuerdas | 36402964 | 2026 | colaboración | Sergi Blue, jmsanz |
| Makineros 90's Vol.1 | 32942229 | 2025 | colaboración | Da Terror, DJ Ruboy, Marian Dacal, Eva Marti |

The Universal Ocho Family es un release de Disco 8, Ice Fran y Nando Dixkontrol. El corte A es de Ice Fran. La tarjeta se queda en B1 Introkontrol y B2 Megadixk Nº 8. La composición conserva el nombre Fernando Gallego.

To The Big Big Ben no es un tema de Nando. El artista es Big-Ben. Nando está como producción, composición y mezcla. La composición no se ha convertido en el tipo de la tarjeta.

Welcome To Cybertron y Addicts To Vinyl tienen a Nando como único artista. En Welcome, Oscar Araujo comparte producción y composición. En Ballade Pour Adeline, Dixland produce y adapta A1 y A2, y Richard Clayderman figura en la composición de esos cortes. La composición de Nando es B1.

Aún Recuerdas acredita a Sergi Blue y a jmsanz como producción, composición y letra del único corte. No hay portada primaria.

Makineros 90's Vol.1 nombra a los cuatro artistas en el release. El tracklist (Keeping Makina Alive, Makina Is Rising, Basesina) no dice de quién es cada corte. La tarjeta lo dice. La misma referencia ya estaba en Ruboy, con la misma lista de artistas. Esa ficha no se ha tocado. No se ha copiado su imagen.

## Alias

| Perfil | Alias en Discogs | Usado en estas tarjetas | Sin release en este lote |
| --- | --- | --- | --- |
| Nando Dixkontrol 99293 | Psicodromo 450914, Fernando Gallego 1375817, Cyberdix 6307686 | Fernando Gallego, Cyberdix | Psicodromo |
| Sergi Blue 17282047 | ninguno | — | — |
| Da Terror 11914190 | ninguno | — | — |

El nombre real de Nando en Discogs es Fernando Gallego. No hay fuente fuera de Discogs para estos alias. El vinilo no se ha comprobado. Dixland Records no se ha tratado como alias: es el sello, y en Ballade el crédito de producción es Dixland (2), otro id.

## Rechazados y no examinados

Rechazado sin abrir el tracklist: 7056881 Hangar 13, Cass Mixed, Hangar 13 Records, 2003, rol Main en la página de artista. No se publica como tema ni como producción.

No queda un release abierto sin clasificar. Psicodromo está en la lista de alias y no aparece en estas siete fichas.

## Portadas

Las cinco de Nando son la imagen primaria de la ficha y respondieron imagen con HTTP 200.

Sin imagen primaria, y por eso «Sin portada verificada»:

- Aún Recuerdas, 36402964.
- Makineros 90's Vol.1, 32942229. La ficha de Ruboy guarda otra URL de `i.discogs.com` desde la fase 02. Esta fase no la ha vuelto a comprobar como primaria y no la ha copiado.

## Archivos

Modificados: `src/data/djs.json`, `tests/djs.test.ts`, `INFORME-MAKINA-SOUND.md`.

Nuevos, de evidencia, sin entrar en el sitio: `tmp-discogs-aliases-phase06.json`, `tmp-discogs-credits-phase06.json`.

No se ha tocado `tmp-discogs-works.json` ni `src/data/sessions.json`. Las biografías no se han reescrito.

## Pruebas y revisión

- `npm test`: 22 pruebas, 0 fallos. La prueba nueva comprueba los recuentos y los tipos, la deduplicación, la exclusión de Hangar 13, Fernando Gallego sin sustituir al artista, Big-Ben como producción con la composición conservada, Cyberdix como alias, Aún Recuerdas sin portada, Makineros una vez en Da Terror y una vez en Ruboy, las fases 01 a 05, y las 150 sesiones (Sergi 15, Da Terror 3, Nando 0).
- `npm run build`: correcto. Bundle `dist/assets/index-bPBn4fj0.js` (694 kB). Vite avisa de que el chunk pasa de 500 kB. No se ha partido el bundle.
- Navegador en `http://127.0.0.1:4177/?fase06=1`: Nando muestra 4 temas y 1 producción, sin sesiones y sin imágenes rotas. Sergi muestra Aún Recuerdas con «Sin portada verificada» y 15 sesiones, aparte de la colaboración. Da Terror muestra la colaboración, la nota del tracklist, «Sin portada verificada» y 3 sesiones. Ruboy sigue en 142 tarjetas.

## Limitaciones

El tracklist de Hangar 13 no se ha leído. Puede haber un corte identificable, y no se afirma lo contrario.

Makineros no permite decir qué cara es de Da Terror. La tarjeta es del release compartido.

Los alias dependen de Discogs. El vinilo no se ha mirado.

## Siguiente recomendación, sin empezarla

La descarga de 696 referencias ya no tiene otro grupo de DJ sin esta revisión. Javi Maki no está en ese archivo. No se ha empezado una cosecha nueva.
