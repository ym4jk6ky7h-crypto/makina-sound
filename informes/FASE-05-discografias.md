# Fase 05 — Discografías de Ricardo F, DJ Nau, Frank T.R.A.X., DJ Sisu y DJ Sonic

Fecha: 15 de octubre de 2026.
Estado: **completada** para estos cinco perfiles. No se ha empezado otra discografía.
Proyecto: `C:\Users\edugarcia\Documents\rewind-165`.

## Fuente

`tmp-discogs-works.json` no se ha modificado. Sigue sumando 696 referencias. Los cinco grupos miden:

| Grupo | Referencias en la descarga | Mixed o Comp, sin abrir el tracklist | Fichas de release pedidas |
| --- | ---: | ---: | ---: |
| ricardo-f | 56 | 3 | 53, más Whispers (515647), que ya estaba en la ficha y no estaba en la descarga |
| dj-nau | 30 | 1 | 29 |
| frank-trax | 22 | 16 | 6, más Scorpia (152701), que ya estaba en la ficha |
| dj-sisu | 11 | 0 | 11 |
| dj-sonic | 6 | 1 | 5 |

127 fichas examinadas. 103 tarjetas publicadas. Una tarjeta es un release de Discogs, no cada canción del tracklist.

El campo `credit` de la descarga no se usó. `tmp-discogs-works.mjs` mete en `produced` al productor, al compositor y al remixer. Aquí se usó el rol original de la página de artista y la ficha `GET /releases/{id}` guardada en `tmp-discogs-credits-phase05.json`, con el id de artista en artistas y créditos. Los alias salen de `GET /artists/{id}` en `tmp-discogs-aliases-phase05.json`.

Ids de artista usados: Ricardo F 149540, DJ Nau 138046, Frank T.R.A.X. 50179, DJ Sisu 148369, DJ Sonic (2) 69702. No se ha usado el otro Sonic (46957).

## Decisiones

1. Mismo modelo: `tracks` de `djs.json`. Una tarjeta, un tipo. Los otros créditos van en `credits[]`. La nota va en `edition`.
2. Se publica si el release nombra al DJ, a su nombre real o a un alias de Discogs, por id. El grupo no cuenta como sujeto. Pertenecer a Chasis, Interplanet, The Messiah's, Ducted, Access (7), Two Concepts, The Noise Sindicate, Yom Trax o Sonic & D-Vstor no basta.
3. Nombres cortos que no se han usado para atribuir, aunque Discogs los liste como variación: R. Forns, Nau, Frank, DJ Frank y Sonic. «Sisu» sí se acepta como coincidencia exacta.
4. Si el artista del release es un alias, el nombre histórico se queda y se añade la línea `alias` más la nota de Discogs. No se sustituye Del Horno, Silvio Zambrotti, Arnau Patiño, Francisco Martínez ni Narcis Castella.
5. Varios artistas en el release: colaboración. Un solo artista que es el sujeto: tema. Si no es el artista y el crédito es de producción: producción. El remix exige el rol Remix en un corte identificable. El título «(Remix)» con rol Main no cambia el tipo: Bitch (Remix) sigue como colaboración.
6. Solo composición, sin ser artista ni productor ni remixer, no se convierte en producción. En este lote no quedó ningún caso así: los que la página de artista marcaba como Remix estaban acreditados en un corte, o eran cinta.
7. Formato Mixed o Comp, artista Various o sello AICovers: fuera, sin abrir el tracklist.
8. Si el tracklist reparte los cortes entre artistas distintos, la tarjeta se queda con los cortes que nombran al DJ. Scotland Versus Spain no se atribuye entero: solo A1, You're Not Sorry, con DJ Gary MC. C58 Bases y C58 Members igual. Doctor Beat es el remix de B1, Maximum Volume, no el maxi entero.
9. Un crédito que no cubre todos los cortes lleva la posición. En Crazy Duck, la composición de Ricardo F es A1, A2 y AA1. In Memoria (AA2) queda en George David Weiss, Hugo Peretti y Luigi Creatore.
10. No había dos ediciones con el mismo master y el mismo título que fusionar.
11. El formato visible es el de la descarga cuando el release estaba en ella. Whispers no estaba: el formato `12"` sale de las descripciones de la ficha pedida, no de una suposición. No se han añadido vídeos de YouTube.
12. La portada es la imagen primaria `https://i.discogs.com/...`. Si la ficha no trae primaria, la tarjeta no lleva `coverUrl` y la web muestra «Sin portada verificada».
13. Las sesiones siguen saliendo de `djIds`. No se han copiado a `tracks`.
14. Skudero, Xavi Metralla, Pastis & Buenri, Ruboy, Gerard Requena y Julio Posadas no se han editado.

## Alias

Relación tomada del campo `aliases` de Discogs. No se ha contrastado con una fuente fuera de Discogs. El vinilo no se ha mirado.

| Perfil | Alias en Discogs | Usados en estas tarjetas | Sin release en este lote |
| --- | --- | --- | --- |
| Ricardo F | Silvio Zambrotti, Del Horno, Ricardo Forns | Silvio Zambrotti, Del Horno | Ricardo Forns, como nombre de artista de un release |
| DJ Nau | Arnau Patiño | Arnau Patiño, en composición | — |
| Frank T.R.A.X. | Francisco Martínez, EFTEE | Francisco Martínez | EFTEE |
| DJ Sisu | Narcis Castella, Luka Caro | Narcis Castella | Luka Caro |
| DJ Sonic (2) | ninguno | — | El grupo Sonic & D-Vstor no se ha usado como sujeto |

## Publicados

| Perfil | Antes | Después | Tipos |
| --- | ---: | ---: | --- |
| Ricardo F | 2 | 52 | 17 temas, 18 colaboraciones, 11 remixes, 6 producciones |
| DJ Nau | 0 | 29 | 12 temas, 17 colaboraciones |
| Frank T.R.A.X. | 1 | 6 | 3 temas, 2 colaboraciones, 1 remix |
| DJ Sisu | 2 | 11 | 11 colaboraciones |
| DJ Sonic | 1 | 5 | 5 colaboraciones |

Ids conservados: `whispers`, `crazy-duck`, `sisu-no-time-cry`, `sisu-shine`, `sonic-shine`. `scorpia-vol-1` sale.

Whispers y Crazy Duck siguen siendo colaboraciones de Chasis y Ricardo F, no temas solo de Ricardo. Hard Sequencer es tema de DJ Nau; la producción es de Ruben Moreno y la composición conserva el nombre Arnau Patiño. Shine A Light está una vez en Sisu y una vez en Sonic, las dos como colaboración. Attraction, Perpignan, Big Bear, Great Trip y Lietome son producciones para Two Concepts, Interplanet, The Messiah's y G&G. Back To The Roots es producción para Chasis; en Rhapsody Ricardo F figura también como artista del corte.

## Rechazados

Cintas o recopilatorios, tracklist no abierto:

- Ricardo F: 4590990 100% 90's The Sessions Vol 1; 1126649 In New Music We Trust; 12525435 House Planet; 3853191 Bonzai Worx - Volume 2 (Various).
- DJ Nau: 8729833 Makina Spain United Vol.2.
- Frank: 152636 Technoconnection Vol. 2; 152619 Eden; 169704 Discoteca Queen; 248167 Tendenze E.P.; 3406413 Frank T.R.A.X. Compilation; 413808 Frank T.R.A.X. 2005 - Myself; 83000 Addicted To Trance; 87313 Gatecrasher; 152621 ♥ Trance; 258951 Future Trance Ibiza; 1981744 Technics: The Original Sessions; 2612725 Promo Only UK Club Beats; 10388438 The White Disc Volume 119; 10410221 Club Beats Series 6 Volume 3; 10414167 Club Beats Series 5 Volume 12; 152705 Megaaplec Dance 2003.
- Frank, además: 152701 Scorpia Vol.1 Peace, Love & Party. CD Mixed. Frank T.R.A.X. figura como DJ Mix, no como productor de los temas. Se quitó la tarjeta antigua, que lo presentaba como tema. La biografía ya no lo llama maxi publicado.
- DJ Sonic: 15351993 The New Monkey, cinta Mixed.

Sesión, no tema: 32497728 Chasis - Fiesta Blanca. El único corte se titula Session Chasis Fiesta Blanca 2024.

## Pendientes

No queda un release de estos cinco cuya ficha se haya abierto y no se haya podido clasificar. Lo que no se publica es lo rechazado de arriba, más los alias EFTEE, Luka Caro y Ricardo Forns, que la página de artista lista y este lote no usa.

Makina Records Vol. 2 a Vol. 6 nombran a DJ Sisu y a D-Vstor como artistas del release, pero el tracklist no reparte los cortes. La tarjeta es la colaboración del EP, no una canción por cara. En Vol. 7 el tracklist sí reparte: el corte de Sisu es B2, 9 PM.

## Portadas

56 URLs distintas de `i.discogs.com` respondieron imagen con HTTP 200. No se generó ninguna carátula.

Sin imagen primaria, y por eso «Sin portada verificada»:

- Ricardo F, 24: Difficult Situation / Bring It Back, Overload, Ibiza Trip, Mykonos, Vaya Circo EP, Around The World, No Fear, Everybody Loves, Narco, World Of Sound, Feeling, House Is House, Say What, Horns, Out Confusion, Technorama EP, 15 Years Old, Crazy Monday, No One Can Hurt Me, Two, Titania, Da House, Chasis (30th Anniversary Edition), Fucking Kat.
- DJ Nau, 18: Freedom, Leaves, UK Experience Vol II, Ukord, Voight-Kampff, Baila!, Twenty9, C58 Bases EP Vol 1, It's Only A Dream, The One I Love Rmx / Stigma, Soft Melody (Survive), 2008, C58 Bases EP Vol2, Another Dimension EP, C58 Bases EP Vol3, C58 Members EP, Mysterious Of The Mind, Energize.
- Frank: Dance Religion 2k21.
- DJ Sisu: Makina Records Vol. 6 y Vol. 7.
- DJ Sonic: Name Of Love.

## Archivos

Modificados: `src/data/djs.json`, `tests/djs.test.ts`, `INFORME-MAKINA-SOUND.md`.

Nuevos, de evidencia, sin entrar en el sitio: `tmp-discogs-aliases-phase05.json`, `tmp-discogs-credits-phase05.json`, `tmp-phase05-decisions.json`.

No se ha tocado `tmp-discogs-works.json` ni `src/data/sessions.json`.

## Pruebas

- `npm test`: 21 pruebas, 0 fallos. La prueba nueva cubre los recuentos, la deduplicación, las portadas https, la exclusión de Mixed/Comp, Whispers y Crazy Duck como colaboración, Attraction como producción ajena, el alias Silvio Zambrotti sin sustituir el nombre, Hard Sequencer con Arnau Patiño en la composición, la salida de Scorpia, Doctor Beat como remix de un corte, Bitch (Remix) sin tipo remix, Shine A Light una vez en cada ficha, Scotland Versus Spain reducido al corte, y las 150 sesiones con los `djIds` de Nau (9), Sisu (5) y Ricardo F (3).
- `npm run build`: correcto. Bundle `dist/assets/index-D1OFcVsZ.js` (690 kB). Vite avisa de que el chunk pasa de 500 kB.
- Navegador en `http://127.0.0.1:4177/?fase05=2`: las cinco fichas. Ricardo muestra 3 sesiones y 24 «Sin portada verificada». Nau, 9 sesiones; Hard Sequencer conserva a Ruben Moreno y a Arnau Patiño. Frank no muestra Scorpia y sí el remix de Maximum Volume. Sisu, 11 colaboraciones y 5 sesiones. Sonic, 5 colaboraciones, sin sesiones, con Bitch (Remix) en colaboraciones. Las portadas visibles cargaron; no hubo imágenes rotas en las tarjetas revisadas. Las que no tienen URL muestran el aviso.

## Limitaciones

El tracklist de las cintas y recopilatorios no se ha leído. Puede haber un corte identificable dentro, y no se afirma lo contrario.

Una tarjeta no puede ser a la vez el EP entero y solo un corte. Cuando el tracklist reparte artistas, la nota dice el corte. Cuando no lo reparte, la tarjeta es del release compartido.

No se ha comprobado el vinilo ni una fuente distinta de Discogs. Los alias heredan lo que Discogs enlaza.

## Siguiente fase, sin empezarla

En la descarga quedan grupos más pequeños sin esta revisión: Nando Dixkontrol, Sergi Blue y Da Terror. No se ha empezado ninguno.
