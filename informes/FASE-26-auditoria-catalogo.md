# Fase 26 — Auditoría y enriquecimiento verificable del catálogo de sesiones

Fecha: 16 de octubre de 2026.

## Inventario inicial

`src/data/sessions.json` tiene 150 registros publicados. No se ha borrado ninguno ni se ha cambiado ningún identificador. No hay campo de fecha de actuación. `publishedAt` sigue siendo la fecha de publicación del vídeo.

127 sesiones tienen `djIds`. 23 no. De esas 23, tres guardan `djName` sin identificador: Jonyk (`YqBps9i2xa8`), Dj Nyu & Dj Nacho (`tB71wuzwFp4`) y Dj Uron & Dj Note (`MEsmiL4UlrY`). Las otras 20 no tienen ni `djIds` ni `djName`. Esos nombres no tienen ficha en el directorio de 55 perfiles.

Al empezar, solo 4 sesiones estaban en `sessionIds` de una sala: Pont Aeri `gWNOt-He3g8`, Xque `ZiVYJdWRF_s`, Chasis `BwIWr8hEAY4` y `kXoeGh41i4M`. Scorpia y Psicódromo seguían con la lista vacía.

## Fuentes abiertas

El 16 de octubre de 2026 se consultó el oEmbed de YouTube, que devuelve el título que la plataforma publica. Estas peticiones respondieron 200 y el título coincidía con el del catálogo:

- `https://www.youtube.com/watch?v=dGN_8ey-jwM` — «DJ NAU @ Pont aeri (34 Aniversario cierre Sala Terrassa) Abril 2026». Autor: DJ NAU.
- `https://www.youtube.com/watch?v=MJHKZX-zSvg` — «Ricardo F live @ CHASIS Fiebre de Abril (Homenaje Ronda Barceló)». Autor: DC TV' Forever Deejays.
- `https://www.youtube.com/watch?v=g1unn_TmztE` — «Julio Posadas live @ CHASIS Fiebre de Abril». Autor: DC TV' Forever Deejays.
- `https://www.youtube.com/watch?v=r38U4a2ZHS8` — «Xavi BCN live @ CHASIS Fiesta Blanca». Autor: DC TV' Forever Deejays.
- `https://www.youtube.com/watch?v=Pj40ivKMZig` — «30 JAVI TRACKER I Intro Sesión Xque 2005/07». Autor: DC TV' Forever Deejays. El identificador es el de once caracteres que ya estaba en el catálogo.
- `https://www.youtube.com/watch?v=sTYNvGG68mQ` — «Sesión MUSICOTE FM - All Right (11/01/2025)». Autor del canal: Adrian Kuyck.
- `https://www.youtube.com/watch?v=UUBhGxPmaZg` — «Sesión Nou Set 21 Sep 2024». Autor del canal: Adrian Kuyck.
- `https://www.youtube.com/watch?v=gWNOt-He3g8` — «Closing Party @ Pont Aeri (Junio 2024)». Autor: DjXory. Ya estaba enlazada a Pont Aeri.

No se han vuelto a abrir en esta fase la Wikipedia, Makineros, La Vanguardia, Vice ni el CCCB. Esas páginas siguen citadas en las fichas de sala por el trabajo anterior.

## Relaciones añadidas

La relación es de vídeo a sala, porque el título publicado nombra la sala. No se guarda la fecha del título como fecha de la noche. No se añade el DJ a la lista de residentes.

| Sesión | Sala | DJ que ya constaba |
| --- | --- | --- |
| `dGN_8ey-jwM` | Pont Aeri | `dj-nau` |
| `MJHKZX-zSvg` | Chasis | `ricardo-f` |
| `g1unn_TmztE` | Chasis | `julio-posadas` |
| `r38U4a2ZHS8` | Chasis | `xavi-bcn` |
| Intro Sesión Xque, identificador ya guardado | Xque | `javi-tracker` |

Cada vídeo nuevo queda también como enlace en la ficha de la sala, con una nota que dice que el título nombra la sala y que la fecha del catálogo es la de publicación. Pont Aeri queda en 2 sesiones, Xque en 2 y Chasis en 5. El archivo calcula 9 sesiones con sala.

En la ficha del DJ, la sesión enlazada muestra el nombre de la sala. Eso no crea un bloque de residencia. DJ Nau no entra en los residentes de Pont Aeri. Julio Posadas, Xavi BCN y Javi Tracker no entran en los de Chasis o Xque.

## Relaciones descartadas

- Los concursos y directos de Amics de la Makina cuyos nombres no tienen ficha: Jonyk, Unno, Sarroka, Nervio, Angelruta, Nyu, Wiwór, Moussabbeat, Djbonik, Stella, Select, Kobix, Petix, Uron, Note, Nacho y K-diz. El canal no basta para crear un perfil.
- `sTYNvGG68mQ` y `UUBhGxPmaZg`. El oEmbed confirma que el canal es Adrian Kuyck, pero el título no dice que él sea el DJ de la sesión. Siguen sin `djIds`.
- `BhhRd4TgRE0`, «Sepi sesión en directo discoteca Activa, aniversario Buenri 2007». El aniversario nombra a Buenri y no demuestra que pinchara. Sigue solo con `dj-sepi`.
- `g1unn_TmztE` no se atribuye a Julio Navas. El título dice Julio Posadas.
- `r38U4a2ZHS8` no se atribuye a Xavi Metralla. El título dice Xavi BCN.
- `gWNOt-He3g8` sigue sin DJ. El título no nombra a nadie de la cabina.
- `Ra-85WUVk2k` no se enlaza a Xque. El canal se llama «Makina o Muerte || Estilo XQUÈ» y el título no dice que la sesión fuera en esa sala.
- Salas escritas en otros títulos y que no tienen ficha publicada: Detroit, Be Out, Apolo, Fabrik, Activa, Input, Tramunfest, La Cabra, T3rminal, Mediterranea, Frecuencia 0 y los aniversarios de Makineros. No se crean fichas de sala.
- Scorpia y Psicódromo: ningún título del catálogo nombra esas salas. Siguen con `sessionIds` vacío.
- Las coincidencias de fragmentos como «maki» dentro de «makina» o «pitu» dentro de «capitulo» no se usan.

## Archivos

- `src/data/venues.json`: cinco `sessionIds`, los párrafos que los explican y el enlace de YouTube de cada vídeo nuevo.
- `src/components/DjsPage.tsx` y `src/components/djs/SessionBlock.tsx`: la sesión de un DJ muestra la sala cuando el vídeo ya está en `sessionIds`.
- `tests/library.test.ts`: la prueba de la fase 26 fija las listas nuevas y las exclusiones.
- `informes/FASE-26-auditoria-catalogo.md`
- `INFORME-MAKINA-SOUND.md`

No se han editado `sessions.json`, `djs.json` ni `flyers.json`.

## Pruebas

`npm test` el 16 de octubre de 2026: 43 pruebas, 23 suites, 0 fallos.

`npm run build`, base `/`: `dist/assets/index-B67SpYgY.js` (820,46 kB, gzip 199,60 kB) y `dist/assets/index-D2rVgAoB.css` (30,53 kB, gzip 6,82 kB).

`npm run build` con `VITE_BASE=/makina-sound/`: `dist/assets/index-C8d5upFg.js` (820,47 kB, gzip 199,61 kB) y `dist/assets/index-BC1EX7JV.css` (30,63 kB, gzip 6,83 kB).

El aviso de un chunk mayor de 500 kB ya existía.

En el navegador local, `http://127.0.0.1:4176/`:

- `#sesiones` muestra 150 tarjetas y las cifras 127 / 9 / 150. El filtro de sala sigue siendo Pont Aeri, Xque y Chasis.
- Sala Chasis deja cinco tarjetas, todas con «Publicada el» y el nombre de la sala.
- `#sesiones/dGN_8ey-jwM` enlaza `#djs/dj-nau` y `#salas/pont-aeri`. El reproductor es `https://www.youtube-nocookie.com/embed/dGN_8ey-jwM?rel=0`. La fecha visible es «Publicada el 20 de abril de 2026».
- `#sesiones/g1unn_TmztE` enlaza solo `#djs/julio-posadas` y `#salas/chasis`.
- `#salas/chasis` lista las cinco sesiones y, como DJ de la ficha, solo a Ricardo F.
- `#salas/xque` lista el concurso de 2004 y la intro de Javi Tracker. Javi Tracker no aparece entre los residentes.
- `#djs/dj-nau` enlaza esa sesión y, desde ella, Pont Aeri. No tiene un bloque de salas de residencia.
- `#sesiones/no-existe` muestra «Sesión no encontrada».
- A 390 px, la ficha de Julio Posadas y la de Xque tienen `scrollWidth` 390. El título de la ficha mide 344 px. En la ficha de Nau, antes de emular el móvil, `innerWidth` era 1920 y `scrollWidth` 1905.

No se instaló un oyente de consola. No se afirma que la consola estuviera vacía. En la ficha de Nau, las entradas de red con estado 400 o superior estaban vacías. El iframe de ese vídeo mostró en el navegador local la pantalla de YouTube «Este vídeo no está disponible». El oEmbed del mismo identificador había respondido 200 con el título del catálogo. La ficha conserva el enlace original.

## Publicación

Pendiente de confirmar en GitHub Actions. La compilación que debe servir Pages es `assets/index-C8d5upFg.js` y `assets/index-BC1EX7JV.css`.

## Limitaciones

Siguen 141 sesiones sin sala y 23 sin DJ enlazado. La mayoría de los huecos son concursos, canales o salas que no tienen ficha. Un título de YouTube relaciona el vídeo con el nombre que escribe; no demuestra por sí solo la noche, el aforo ni una residencia. No se han descargado vídeos ni se ha atribuido una licencia a las miniaturas.
