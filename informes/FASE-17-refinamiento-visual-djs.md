# Fase 17 — refinamiento visual del directorio y de las fichas de DJs

Fecha: 15 de octubre de 2026.
Estado: completada. No se ha empezado la investigación de fotografías ni otra ampliación del catálogo.

## Catálogo

No ha cambiado. Siguen 55 perfiles, 618 tarjetas de release y 150 sesiones. No se han tocado biografías, años, créditos, sellos, sesiones, identificadores, `djIds`, fuentes ni estados de retrato. Siguen 0 fotografías verificadas.

## Qué se ha corregido

| Problema de la fase 16 | Solución |
| --- | --- |
| El monograma del directorio ocupaba casi toda la tarjeta, en proporción 4/5. | Placa horizontal (2,35/1), con dos filetes. El nombre queda inmediatamente debajo y es el texto principal. El año y la indicación de discografía o sesiones pesan menos. |
| En la ficha, el bloque provisional competía con el nombre y empujaba la biografía. | El monograma mide 4,5 rem. En escritorio y en móvil va al lado del nombre. El primer párrafo de la biografía usa el ancho disponible. Si más adelante hay un retrato verificado, la columna de imagen vuelve a 4/5, con `object-fit: cover` y `object-position: center 20%`. |
| Las portadas llenaban la columna, se recortaban con `object-fit: cover` y los créditos quedaban estrechos. | Cada release es una fila: portada cuadrada de 6,25 rem con `object-fit: contain`, y el texto al lado. En escritorio hay dos columnas de esas filas, no cuatro. En móvil, una. |
| El tipo de crédito iba por encima del título y los créditos largos formaban un párrafo denso. | El orden es título, año y sello, tipo de crédito, artistas, créditos en líneas, formato y enlaces. No se ha quitado ningún dato ni se ha escondido detrás de un clic. |
| En escritorio, la miniatura de sesión quedaba casi cuadrada porque el alto del HTML ganaba a la proporción 16/9. | `height: auto` deja la miniatura en 16/9. El reproductor sigue bajo demanda. El control «Mostrar N más» no cambia. |

La placa no simula una fotografía: iniciales, fondo carbón y filetes. No hay siluetas ni ilustraciones de personas. El hover y el foco cambian el color del nombre y el borde de la placa. Con `prefers-reduced-motion` esa transición se apaga.

La cuadrícula del directorio es de dos columnas en móvil, tres desde 720 px y cuatro desde 1100 px.

## Archivos

- `src/styles/djs.css`
- `src/components/DjsPage.tsx` — la entradilla de la ficha sale del bloque del título para poder usar el ancho.
- `src/components/djs/ReleaseGrid.tsx` — mismo contenido, otro orden visual. Los créditos detallados van en una lista.

No se han modificado `djs.json`, `sessions.json` ni `src/lib/djView.ts`.

## Pruebas

`npm test`: 37 pruebas, 0 fallos. Se ejecutó con el cambio de componentes y la primera pasada de estilos. Los ajustes posteriores son solo CSS.

`npm run build`: correcto, después del último ajuste.

- `dist/assets/index-DVEDUHm3.js` — 788,92 kB; gzip 192,60 kB.
- `dist/assets/index-D7k-EnJT.css` — 27,44 kB; gzip 6,28 kB.

El aviso de Vite por un chunk mayor de 500 kB ya existía.

## Revisión en el navegador

Preview real en `http://127.0.0.1:4173/`, con el bundle de esta fase. La consola de la página no registró errores en las cargas medidas. No había desbordamiento horizontal.

Escritorio, unos 1920 px:

- `#djs`: cuatro columnas. La placa mide unos 268×114 px. Nombres, año e indicación se leen. «55 artistas».
- Búsqueda «Ruboy»: «1 de 55». La tarjeta abre `#djs/ruboy`.
- Ruboy: monograma pequeño junto al nombre, biografía a todo el ancho, portadas de 100×100 sin deformar y créditos en líneas. Hay controles «Mostrar 24 más» y «Mostrar 20 más».
- `#djs/dj-pastis`: cabecera con «Desde 1995» y trayectoria larga.
- `#djs/dj-buenri`: sesiones con miniatura 16:9 (176×99), enlaces «Escuchar aquí», «Abrir el vídeo» y «Abrir en Sesiones», y «Mostrar 7 sesiones más». Ningún iframe hasta que se pide la reproducción.
- `#djs/oskar-mad`: sin temas, sin producciones y sin sesiones. Fuentes Discogs y Wikipedia.

Tablet, 820 px: el directorio pasa a tres columnas. La placa mide unos 104 px de alto. Buscador y orden siguen en paralelo.

Móvil, 390 px, ficha de Ruboy: el monograma (72 px) queda a la izquierda del nombre, la biografía debajo a ancho completo y la discografía en una sola columna. Sin desbordamiento.

## Limitaciones

- Siguen sin publicarse retratos. La placa es el sustituto hasta que haya una fotografía autorizada.
- Una portada pequeña se muestra entera dentro del cuadrado, con el fondo carbón alrededor. No se amplía para llenarlo.
- Las iniciales de varios DJs coinciden (Buenri, Bull). No identifican a la persona; solo evitan un hueco vacío.
