# Fase 02 — Discografías de Ruboy, Gerard Requena y Julio Posadas

Fecha: 15 de octubre de 2026.
Estado: **completada** para estos tres perfiles. No se ha empezado la fase siguiente.
Proyecto: `C:\Users\edugarcia\Documents\rewind-165`.

## Fuente

`tmp-discogs-works.json` no se ha modificado. La suma de todos los grupos del archivo es 696 referencias, no 654. Los tres grupos de esta fase miden:

| Grupo | Referencias en la descarga | Cinta o recopilatorio (Mixed o Comp) | Candidatos con ficha pedida |
| --- | ---: | ---: | ---: |
| ruboy | 194 | 37 | el resto, más Vol. 4 |
| gerard-requena | 144 | 8 | el resto |
| julio-posadas | 122 | 14 | el resto, más Pi y Re-Pi '98 |

Esos totales no son temas únicos. La descarga ya había guardado un solo formato por combinación de crédito, título y año, y prefiere el que dice `12"`. Los otros formatos de ese mismo título no están en el archivo, así que no se han podido colgar como edición. En esta fase, el cruce por `master_id` y título idéntico no encontró otra pareja que fusionar (`collapsed: 0`).

El campo `credit` de la descarga no se usó. `tmp-discogs-works.mjs` mete en `produced` al productor y al remixer. Aquí se usó el rol original (`Main`, `Remix`, `Producer`, `Co-producer`) y la ficha `GET /releases/{id}` guardada en `tmp-discogs-credits-phase02.json` (395 fichas: artistas, créditos con corte, tracklist, master, sellos, formatos e imagen).

Los alias salen de `GET /artists/{id}` en `tmp-discogs-aliases-phase02.json`.

## Decisiones técnicas

1. Mismo modelo que la fase 01: `tracks` de `djs.json`, leídos por `readDj`. Se reutilizan `credits`, `edition`, `dedupeTracks` y `classifyDiscogsCredit`.
2. `artistMatchesSubject` ya no usa `includes`. Compara el nombre entero, o cada parte de un crédito compuesto (`&`, `feat`, `vs`, `x`), y acepta el prefijo `DJ`. Así «Rolo» no entra en «Rolodex», «Doom» no entra en «Doomsday» y «Ruboy» no entra en «Ruboy Records». «Skudero & Xavi Metralla» sigue coincidiendo con Skudero.
3. Un release se publica solo si la ficha nombra al DJ, a su nombre real o a un alias de la lista de Discogs, en los artistas o en un crédito musical (producción, remix, composición, arreglos, grabación, mezcla). El rol de la página de artista, por sí solo, no basta.
4. Si el artista del release es un alias documentado y no el nombre principal, la tarjeta lleva el crédito `alias`. Si hay varios artistas, el tipo es colaboración. Si el DJ no es artista y el crédito es de producción, el tipo es producción. El remix exige el rol Remix de la página y que el release lo nombre, en los créditos o en el título.
5. Solo composición, sin ser artista ni productor, queda pendiente. Reaching Dreams (Remixes), 689481, tiene a Ruben Moreno como Written-By y no se publicó como producción.
6. Artista `Various`, o un recopilatorio sin un corte identificable, queda pendiente. No se inventa qué tema es suyo. DJ Ruboy Compilation Volume 1 (20509573) es de ese grupo: Ruben Moreno figura como productor del conjunto, sin posiciones.
7. Formato Mixed o Comp: no se publica y no se abrió el tracklist.
8. Sello AICovers: fuera. Flying Free (Cover Album), 34498675, no se añadió.
9. Los grupos de Discogs no se usaron como sujeto. Si el release nombra al DJ además del grupo, entra por ese nombre. X-Tatic (3) es alias de Ruboy y grupo de Gerard: solo entra en Gerard si la ficha escribe su nombre.
10. Euphoria (16) está a la vez como alias y como grupo de Gerard. Angelical Verses tiene a Euphoria (16) como artista y a Gerard Requena como productor. Se publicó como tema suyo, con el alias visible. La misma ficha no nombra a Ruboy, aunque la descarga lo tenía como Co-producer: no se publicó en Ruboy.
11. Pi (613988, 1993) y Re-Pi '98 (414329, 1997) comparten el master 3976796 y no estaban en las 122. Se añadieron desde la ficha de release. Re-Pi '98 queda como reedición de Pi, no como otro tema igual.
12. Vol. 4 (371479) no estaba en las 194 de Ruboy. La ficha ya lo tenía y el release confirma a DJ Ruboy como productor, junto a Skudero y Xavi Metralla. Sigue el id `ruboy-flying-free`, el título oficial «Vol. 4» y el YouTube `Z1wKhdF78tQ`.
13. Maquina Gold Sessions (1748126) es `2xCD, Mixed + CD, Comp`. Se quitó de Ruboy. No se añadió a Gerard. El 22º aniversario (8578357) es `Cass, Mixed, Promo`. Se quitó de Gerard.
14. La deduplicación de la web sigue usando el primer enlace de Discogs. Una edición alternativa iría detrás, como en el CD promo de la fase 01. Aquí no hubo una segunda edición de mismo título y mismo master que conservar.
15. Nombres cortos o de sello que Discogs guarda como variación, y que no se usaron para atribuir: Insert Coin, R*B*Y, Ruboy Records, Ruboy Remixes '01, Ruboy's Return, Gilabert, Posadas y J.P. El artista de búsqueda «Julio Posadas (2)» (7166191) y el «Ruboy» (256696) no están en la lista de alias. No se fusionaron.
16. Las fichas de Skudero, Xavi Metralla y Pastis & Buenri no se han editado. Las 150 sesiones y los `djIds` tampoco.

## Alias confirmados en Discogs

La relación es el campo `aliases` de la página de artista. No se ha contrastado cada alias con una biografía externa. Si Discogs tiene un enlace de alias equivocado, la tarjeta hereda ese error.

Ruboy (79791, DJ Ruboy) y Ruben Moreno (208306) se apuntan el uno al otro. Nombre real en ambas: Rubén Moreno Abanades. Alias comunes: Getting Started, Four Dimensions, Gravitation, Sweet Irony, Factoria X, R.B.Y., Future (5), X-Tatic (3), The Order (8).

Gerard Requena (148365), nombre real Gerard Requena Rolo. 43 alias, entre ellos Rolo, DJ Gerard, Biospheric, CJ Rolo, Emphassis, Silicon (2), Euphoria (16), Sadden, Hard State, Ger-Hard y Stel·las. La lista completa está en `tmp-discogs-aliases-phase02.json`.

Julio Posadas Gilabert (6091309). 22 alias, entre ellos DJ Julio, The Farmlopez, Hector Seral, Dith Wemyd, System One, Bilik Oda Toya, Kimik, Larson, Jim Larson, Inspire, Xian (2), El Bueno, The Mind, Nix Bachea, A-0, Guna, Avalon (11), Fusion (45) y The Return (14).

Pendiente de interpretación: Dith Wemyd y Hector Seral aparecen como alias de Julio y, en la ficha de Pastis & Buenri, como productor y compositor de Pildo y de otros maxis. Esa ficha no se ha tocado. Hay que autorizar el cambio antes de reescribir esos créditos.

## Publicados

Ruboy: 2 → 142. Gerard Requena: 2 → 128. Julio Posadas: 3 → 99.

Los ids anteriores que se conservan: `ruboy-flying-free`, `angelical`, `pi`, `vuela`, `re-pi`. `ruboy-gold` y `gerard-22` salen de la discografía.

Vol. 4 en Ruboy es producción. En Skudero y Xavi sigue siendo colaboración. No se ha duplicado dentro de una misma ficha.

## Rechazados

Cintas y recopilatorios Mixed o Comp: 37, 8 y 14. No se revisó corte a corte.

34498675, Flying Free (Cover Album), KIVY AICovers.

1748126, Maquina Gold Sessions. 8578357, Pont Aeri - 22º Aniversari Gerard Requena.

## Pendientes

La página de artista los listaba. La ficha del release no permite firmarlos.

Ruboy (15): 599986 Fantasy, 706236 Such A Shame, 678102 Makina Old EP Vol. 1, 3035403 Hardcore Illusionist 2, 8608322 Digital Archives Part 2, 9496935 Only Me 2K16 Rmx, 1901835 Dancing With An Angel RMX, 404938 Land Of Goddess, 25838728 Vol.6: Ratatouille, 30311042 Back To The Roots, 6093351 No Words, 6205139 I Don't Know, 689481 Reaching Dreams (Remixes), 20509573 DJ Ruboy Compilation Volume 1, 332819 Angelical Verses.

Gerard (8): 3614495 I Want You, 453455 Sounds Of The Past, 1418378 Hangar 13's Most Wanted Makina Tracks Vol.2, 3210147 Return To Zero, 29860015 Mines Of Moria, 34151077 Later I Will Be EP, 3614508 The Time Is Now, 3614987 What You Think (Insomnia 2010).

Julio (11): 576086 The Balloon '99, 612296 Give Me Your Hand, 212996 Papipapapipa (Remixes 2003), 457636 Urban Madness, 24674711 Silent, 561541 Extasia (Remix), 179807 Uh!, 7945272 Just Bloody Brilliant, 8219043 Deep House Oneness Vol. 2, 8313177 Can't Talk Now, 20710039 Péripétie.

Extasia no nombra a Julio. La ficha de Skudero no se ha modificado.

Sin portada primaria: Sinestesia (Ruboy) y Txill-Aut Txitxarro (Julio). El resto de las 358 URLs distintas de `i.discogs.com` respondió HTTP 200 el 15 de octubre de 2026.

## Archivos

Creados:

- `informes/FASE-02-discografias.md`
- `tmp-discogs-credits-phase02.json`
- `tmp-discogs-aliases-phase02.json`

Modificados:

- `src/data/djs.json` (solo Ruboy, Gerard Requena y Julio Posadas)
- `src/lib/djs.ts` (`artistMatchesSubject`; la coincidencia de nombres ya no es un `includes`)
- `src/components/DjsPage.tsx` (el resumen de la ficha cuenta reediciones y recopilatorios)
- `tests/djs.test.ts`
- `INFORME-MAKINA-SOUND.md` (resumen vigente al principio; la foto del 14 de octubre queda marcada como histórica; esta fase se añade al final)

No modificados: `tmp-discogs-works.json`, `src/data/sessions.json`, las fichas de la fase 01.

Eliminados al cerrar: los scripts de un solo uso `tmp-phase02-*.mjs` y `tmp-phase02-preview.json`. No forman parte del sitio.

## Pruebas

Ejecutadas el 15 de octubre de 2026, después del último cambio de interfaz:

- `npm test` → 19 pruebas, 0 fallos. La nueva comprueba los tres totales, que la fase 01 sigue igual (incluido el crédito «Dith Wemyd» en Pildo), que no hay cintas ni la portada de IA, que Vol. 4 es producción, que Angelical Verses sale como Euphoria, que Pi es tema y Re-Pi '98 reedición, y que un alias ambiguo no coincide con otro artista.
- `npm run build` → `tsc -b` y Vite correctos. Salida `dist/assets/index-DLJm4qGR.js` y `dist/assets/index-CxPnyFZX.css`. Vite avisa de que el JavaScript pasa de 500 kB (632 kB) porque las tres discografías viajan en el mismo bundle.
- Navegador en `http://127.0.0.1:4177`:
  - `#djs/ruboy`: 25 temas, 67 colaboraciones, 6 remixes, 44 producciones, 1 sesión. Vol. 4 presente. Maquina Gold no está como tarjeta. Iframe `https://www.youtube-nocookie.com/embed/Z1wKhdF78tQ?rel=0`. Una portada en estado vacío.
  - `#djs/gerard-requena`: 62 temas, 19 colaboraciones, 47 producciones. Angelical Verses presente. Sin la cinta del aniversario y sin Gold.
  - `#djs/julio-posadas`: 49 temas, 18 colaboraciones, 1 remix, 30 producciones, 1 reedición, 1 sesión. Pi y Re-Pi '98 presentes.

## Límites

No se abrió el tracklist de las cintas. Un corte producido dentro de una mixtape puede existir y esta fase no lo ha firmado.

La descarga no guardó el id de los formatos que descartó. Una edición en CD del mismo máxi puede existir en Discogs y no estar anotada.

Los alias se aceptaron porque Discogs los documenta en la página del artista. No hay una segunda fuente para cada uno.

El bundle supera el aviso de tamaño de Vite. La web sigue siendo un solo archivo estático.

## Siguiente fase

No está empezada. Antes de seguir con más DJs conviene decidir si Dith Wemyd y Hector Seral, en la ficha de Pastis & Buenri, deben leerse como alias de Julio. Después quedan las descargas más pequeñas: Ricardo F, DJ Nau, Frank T.R.A.X., DJ Sisu y DJ Sonic.
