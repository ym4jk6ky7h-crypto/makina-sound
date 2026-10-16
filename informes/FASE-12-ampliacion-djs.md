# Fase 12 — Ampliación del catálogo de DJs

Fecha: 15 de octubre de 2026.
Estado: **completada** con ocho fichas nuevas. El objetivo era hasta diez. No se han publicado fichas vacías para llegar al número.

## A. Resultado

- Candidatos de la lista de partida investigados: 15 (DJ Lucena, Cesk, DJ Sepi, DjXory, Xavi BCN, Javi Tracker, Adrian Kuyck, Bassaul DJ, DJ Luna, DJ Jonyk, DJ Pitu, DJ Note, DJ Uron, DJ Reke, DJ Piyuli).
- Nombres adicionales vistos en títulos de sesión y dejados fuera: Nervio, Rottar, Kura, Popper, Ortuño, Nyu, Nacho, y los concursantes de Amics de la Makina sin ficha (UNNO, SARROKA, ANGELRUTA, DJ WIWOR, MOUSSABEAT, DJBONIK, STELLA, DJ SELECT, Kobix & Petix, Mauri & Kan).
- Perfiles nuevos publicados: **8**. El catálogo pasa de 16 a **24**.
- Lanzamientos nuevos: **10** tarjetas. No son discografías completas.
  - Xavi BCN: 8 (6 colaboraciones y 2 producciones). Salen de fichas de Discogs ya abiertas en la fase 10.
  - Javi Tracker: 1 colaboración (The Trilogy).
  - Bassaul DJ: 1 tema propio (Were Funky).
  - DJ Lucena, DJ Sepi, DJ Cesk, DJ Luna X-Files y DJ Piyuli: 0 tarjetas.
- Relaciones nuevas con sesiones ya existentes: **71**. 70 apuntan a las fichas nuevas y una añade `dj-sisu` a la final del concurso del Xque 2004, cuyo título ya lo nombraba. Siguen **150** sesiones. No se ha cambiado `publishedAt`, `era` ni `youtubeVideoId`.
- Pendientes o descartados: 7 de la lista de partida no se publican. DjXory se descarta como intérprete. Los otros seis quedan pendientes.

| Perfil | Sesiones enlazadas |
| --- | ---: |
| DJ Lucena | 50 |
| DJ Sepi | 7 |
| DJ Cesk | 6 |
| Javi Tracker | 2 |
| DJ Luna X-Files | 2 |
| Xavi BCN | 1 |
| DJ Piyuli | 1 |
| Bassaul DJ | 1 |

DJ Sisu pasa de 5 a 6 sesiones publicadas por la final del Xque. El resto de los 16 perfiles conserva el número de sesiones y de tarjetas.

## B. Auditoría de candidatos

| Nombre | Identidad confirmada | Fuentes biográficas | Evidencia discográfica | Sesiones | Decisión | Motivo |
| --- | --- | --- | --- | --- | --- | --- |
| DJ Lucena / DaniDjLucena | Canal único DaniDjLucena. Los títulos dicen DjLucena. No se ha identificado con el cantante Daniel Lucó ni con otro Dani Lucena. | El canal ya estaba verificado en `sources.json`. No hay entrevista independiente. | Ningún release firmado. Las mezclas son sesiones, no temas. | 50, todas del canal y con `djName` DjLucena | Publicado | La ficha se limita al canal y a lo que dicen sus títulos. |
| DJ Sepi | Canal Sepi Official Dj, único en la auditoría de fuentes. | Canal y página de Xque en la Wikipedia en español (residentes de la reapertura de Olot, septiembre de 2010). | Ningún release firmado en esta fase. | 7 | Publicado | El título identifica a Sepi, también en el aniversario de Buenri. |
| Cesk / DJ Cesk | El mismo nombre en Amics de la Makina y en el cartel de Entradium. | Entradium, apertura del 31 de octubre de 2026 en Detroit Club, con Pitu. | Ningún release firmado. | 6 | Publicado | No se usa un canal de YouTube: `sources.json` deja `dj-cesk` pendiente porque hay dos canales parecidos. |
| Xavi BCN | Javier Querol Llauro, según la entrevista de Makinaforce. BCN es Barcelona. | Entrevista de BCN Resistance (mayo de 2025), abierta. Entrevista de Makinaforce (28 de mayo de 2012), abierta; es http y no entra como enlace de ficha. | 8 fichas de Discogs donde ya figuraba como artista o productor junto a Pastis. | 1, Chasis Fiesta Blanca | Publicado | Selección, no obra completa. |
| Javi Tracker | Ficha de artista de Beatport. | Texto de artista de Beatport, abierto. | The Trilogy (2015), Desk Records, con Pastis y DJ Al-Fredo. | 2 en el JSON; una tiene un id de YouTube con espacio y no se ha reparado. | Publicado | Una sola tarjeta. El texto de Beatport es promocional. |
| DJ Luna | DJ Luna X-Files. La crónica da el nombre civil David Luna Segovia. | Lloret Gaceta, Lourdes Prat, 4 de marzo de 2026, abierta. | Ningún release firmado. | 2, las del tardeo de LeBlanc de marzo de 2026 | Publicado | La crónica distingue esta persona de otros DJ Luna. |
| DJ Piyuli | Presentador de El que + trenca, con Oriol Carrió. | Guía de la Radio, 19 de octubre de 2021, abierta. | Ningún release firmado corte a corte. | 1, Digital Hits FM, 2022 | Publicado | No se ha usado la biografía comercial de Soundcharts ni un nombre civil de otra ficha. |
| Bassaul DJ | Bassaul Dj, Alicante, en su Bandcamp. Canal de YouTube ya verificado. | Página de Bandcamp y ficha del álbum Were Funky, abiertas. | Were Funky, 30 de mayo de 2025. El resto del índice de Bandcamp no se ha abierto. | 1, canal Bassaul dj | Publicado | Una tarjeta. No es la discografía completa. |
| DjXory | Canal verificado de subidas de makina. | Solo la ficha de canal de `sources.json`. | No se ha buscado una discografía de intérprete. | 17 vídeos del canal, ya atribuidos a otros DJs | Descartado | El canal publica sesiones ajenas. No hay una sesión del catálogo que lo nombre como quien pincha. |
| Adrian Kuyck | Canal verificado. Una sesión se llama Sesión CORAZÓN MAKINERO. | No se ha abierto una entrevista ni la ficha de Bandcamp de «Go!». | Mención de búsqueda, no ficha abierta. | 1 con su nombre. Otras dos del canal no tienen `djName`. | Pendiente | Con solo el canal no hay biografía que firmar. |
| DJ Jonyk | Un título de Amics de la Makina. | Ninguna abierta. | Ninguna. | 1 | Pendiente | `sources.json` ve dos canales distintos. |
| DJ Pitu | Aparece junto a Cesk en títulos y en el cartel de Entradium. | El cartel no lo biografía. | Ninguna. | Las conjuntas quedan solo en Cesk. | Pendiente | Varios canales posibles. No hay sesión en solitario que fije la identidad. |
| DJ Note y DJ Uron | Solo el título conjunto Dj Uron & Dj Note. | Ninguna abierta. | Ninguna. | 1, sin `djIds` | Pendiente | No se puede separar a cada uno. `note-dj` sigue pendiente en las fuentes. |
| DJ Reke | Solo el título DJ REKE & DA TERROR. | Ninguna abierta. | Ninguna. | 1, ya atribuida solo a Da Terror | Pendiente | El título nombra a dos personas y solo una tiene ficha. |

## C. Trazabilidad

### Enlaces usados en las fichas

- DJ Lucena: https://www.youtube.com/@DaniDjLucena
- DJ Sepi: https://www.youtube.com/@sepi_official_dj y https://es.wikipedia.org/wiki/Xque
- DJ Cesk: https://entradium.com/events/opening-amics-de-la-makina
- Xavi BCN: https://bcnresistance.com/entrevistas/entrevista-a-xavi-bcn-musicon-con-alma-gamberra-desde-barcelona/
- Javi Tracker: https://www.beatport.com/artist/javi-tracker/305747
- DJ Luna X-Files: https://lloretgaceta.com/la-makina-no-se-apaga-en-lloret-javi-maki-celebra-dos-decadas-en-cabina-con-un-tardeo-especial-y-el-regreso-de-dj-luna-x-files/
- DJ Piyuli: https://guiadelaradio.com/digital-hits-fm-rescata-el-historico-el-que-trenca-de-oriol-carrio-y-dj-piyuli
- Bassaul DJ: https://bassauldj.bandcamp.com/ y https://www.youtube.com/@bassauldj
- Were Funky: https://bassauldj.bandcamp.com/album/bassaul-dj-were-funky

La entrevista de 2012 de Xavi BCN está en http://www.makinaforce.com/?p=1167. Se ha leído. No se publica como enlace porque el modelo solo admite https.

### Releases publicados

| Tarjeta | Release | Papel |
| --- | --- | --- |
| Trance Fly, 2008, Al-Khemie | https://www.discogs.com/release/1483020 | colaboración |
| Everlasting, 2008, Pastis Records, artista UVPX | https://www.discogs.com/release/1574989 | producción |
| Summer, 2009, Pastis Records, artistas Ger (2) y Enef | https://www.discogs.com/release/2070609 | producción |
| Vol. 11, 2012, BCN Records (2) | https://www.discogs.com/release/3560860 | colaboración |
| E Nomine (For Raquel), 2013, BCN Records (2) | https://www.discogs.com/release/6719196 | colaboración |
| Wechseln, 2013, Pastis Records | https://www.discogs.com/release/7432979 | colaboración |
| Da Piano E.P., 2020, BCN Records (2) | https://www.discogs.com/release/16109461 | colaboración |
| Last Requiem, 2022, Ruboy Records | https://www.discogs.com/release/21908710 | colaboración |
| The Trilogy, 2015, Desk Records (2) | https://www.discogs.com/release/6617184 | colaboración |
| Were Funky, 2025 | Bandcamp, arriba | tema propio |

Hey-A-Wa no se copia a Xavi BCN: en la tarjeta de Pastis el remix firmado es el de Pastis, y Xavi no está en los artistas de esa tarjeta. Las fichas de Pastis y de Buenri no se han editado. El mismo release puede estar en dos perfiles; dentro de cada perfil no se repite.

### Créditos dudosos y datos que no entran

- Beatport sitúa el Xque de Javi Tracker en Girona. La sala estaba en Palafrugell. El texto de la ficha no repite Girona.
- Beatport dice TNT de Valencia. Un resultado de búsqueda de Clubxtrem hablaba de Castellón para un cartel de 2003. Esa página no se ha abierto. La ciudad no se publica.
- Un resultado de búsqueda atribuía a Javi Tracker el fin de su carrera el 20 de mayo de 2019. No se ha abierto la transcripción. No entra.
- La biografía de foro de DJ Bull (hermano de Sepi, fecha de nacimiento) no se ha usado.
- El proyecto Sensxperiment «PINCHADISCOS» es de la localidad de Lucena. No identifica al canal DaniDjLucena.
- No se publica año de inicio de Xavi BCN en 1992: solo aparecía en un texto de SoundCloud no usado.
- El EP de Bonzai y la colaboración con DJ Gollum que él anuncia en 2025 no tienen ficha de release abierta. No hay tarjetas.
- Were Funky no trae portada en la página abierta. La tarjeta queda sin imagen.
- La sesión «30 JAVI TRACKER I Intro Sesión Xque 2005/07» tiene el id `Pj40ivKM Zig`, con un espacio. Sigue así. No es un vídeo reproducible. No se ha tocado el id para poder enlazarla.
- Kura, Popper y Ortuño salen en la final del Xque y no tienen perfil. La sesión queda en Sepi y en Sisu.
- «Cesk y Nervio» queda solo en Cesk. «Luna, Rottar y Javi Maki» queda en Luna y en Javi Maki. Pitu no recibe las sesiones conjuntas.

### Alias y duplicados

- DaniDjLucena y DjLucena son el canal y el nombre de las mezclas. No se han fusionado con otros Lucena.
- DJ Luna del catálogo es DJ Luna X-Files, por el título de LeBlanc y la crónica.
- Cesk, Dj Cesk y Cesk y Nervio son el mismo perfil. El canal de YouTube no se elige.
- Bassaul, Bassaul DJ y Bassaul Dj son la misma ficha. El artista del tema se deja como en Bandcamp: Bassaul Dj.

### Fuentes que no se han abierto

- Ficha de Bandcamp «Go!» de Adrian Kuyck con Karu Uptime.
- Clubxtrem, para la residencia TNT de Javi Tracker.
- Biografías de foros de makina (Makina Mania y similares).
- Entrevista de Wix y ficha de disco.market de DJ Piyuli.
- Índice completo de Bandcamp de Bassaul, más allá de Were Funky.
- Discogs nuevo para Lucena, Sepi, Cesk, Luna y Piyuli. No se ha vuelto a descargar el archivo de créditos de las fases anteriores.

### Límites

Las biografías de Lucena, Sepi, Cesk, Luna y Piyuli son cortas porque la fuente lo es. Ninguna ficha nueva tiene retrato: el estado es `unavailable` y la interfaz sigue mostrando la ilustración. No hay `activeFrom`: un año de inicio no comprobado no debe salir en la tarjeta como «Desde YYYY». Las discografías de Xavi BCN, Javi Tracker y Bassaul son una selección verificada.

Prioridad para una fase posterior, sin ficha todavía: Adrian Kuyck, si se abre el release y una fuente biográfica; DJ Pitu, si se separa su canal; DJ Jonyk, DJ Note, DJ Uron y DJ Reke, si aparece una fuente que no sea solo el título de una sesión conjunta.

## D. Implementación

### Archivos

- `src/data/djs.json`: ocho perfiles al final. Los 16 anteriores conservan 29, 1, 0, 11, 8, 7, 142, 128, 5, 101, 52, 6, 1, 5, 32 y 25 tarjetas.
- `src/data/sessions.json`: solo `djIds`. 150 entradas.
- `tests/djs.test.ts`: la prueba de fase 12; Sisu pasa a 6 sesiones; la sesión de Activa espera `dj-sepi` y no a Buenri; la de Cesk del 27 de diciembre de 2025 espera `dj-cesk`.
- `tests/djs-view.test.ts`: el directorio espera 24 tarjetas. La comprobación de que un título de tema no está en la tarjeta compara el título como valor JSON, porque «Pi» (Julio Posadas) es una subcadena de «Piyuli».
- `INFORME-MAKINA-SOUND.md`: resumen vigente y fase 12. El historial de las fases 01 a 11 se conserva.
- `informes/FASE-12-ampliacion-djs.md`: este archivo.

No se han modificado `src/lib/djs.ts`, la interfaz, el CSS ni `sources.json`. El script de una sola ejecución `tmp-fase12-apply.mjs` se ha eliminado después de aplicar los datos. `tmp-fase10-releases.json` y `tmp-discogs-works.json` siguen en disco y no se han editado.

### Pruebas y compilación

`npm test`: 33 pruebas, 0 fallos. Duración aproximada 1,1 s.

`npm run build`: correcto. `tsc -b` y Vite 8.3.4.

- `dist/assets/index-CJUXcial.js`: 739,25 kB, gzip 180,76 kB.
- `dist/assets/index-C7q_vArb.css`: 22,34 kB, gzip 5,36 kB.

Sigue el aviso de Vite de fragmento por encima de 500 kB. Ya estaba antes de esta fase. No se ha partido el bundle.
