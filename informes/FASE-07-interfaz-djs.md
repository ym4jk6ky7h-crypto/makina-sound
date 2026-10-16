# Fase 07 — Interfaz de DJs

Fecha: 15 de octubre de 2026.
Estado: completada.
Alcance: navegación y presentación de la sección DJs. No se han modificado discografías, biografías, sesiones ni otras secciones.

## Comportamiento anterior

`#djs` mezclaba en la misma página el texto «Aquí va la ficha de quien pincha…», el directorio y una ficha abierta. Si el hash no nombraba un DJ, la página elegía el primero por orden alfabético: Da Terror. Encima salía el reproductor de su primera sesión, aunque nadie hubiera elegido un vídeo. La biografía, los releases y las sesiones quedaban debajo del listado.

## Comportamiento nuevo

- `#djs` muestra el directorio: encabezado «DJs», buscador por nombre, orden y las 15 tarjetas. No hay biografía, discografía, lista de sesiones ni reproductor.
- Cada tarjeta enlaza a `#djs/id`. El enlace es un ancla real, así que el historial del navegador y el botón atrás funcionan.
- `#djs/id` muestra solo esa ficha: nombre, años si constan, biografía, etapas si constan, fuentes, temas, producciones y sesiones.
- Los temas reúnen los releases en los que el DJ figura como artista: propios, colaboraciones, remixes, reediciones y recopilatorios. Las producciones van en otro apartado. Las sesiones salen de `sessions.json` con `sessionsForDj` y los `djIds` ya guardados.
- Si un apartado no tiene datos, se lee un aviso: «No hay temas documentados en esta ficha.», «No hay producciones documentadas en esta ficha.» o «No hay sesiones relacionadas en el catálogo.»
- El reproductor solo se monta después de pulsar «Escuchar aquí» y solo si el vídeo tiene un identificador de YouTube válido que coincide con su URL. Una portada o un enlace de Discogs no abre el reproductor. Al cambiar de ficha, el reproductor se cierra.
- `#djs/id-desconocido` muestra «DJ no encontrado» y «Volver a DJs». No cae en otra ficha.
- La búsqueda por nombre permanece mientras se entra en una ficha y se vuelve, porque el estado vive en la misma página. Una recarga directa de una ficha no recupera una búsqueda anterior.
- El buscador del directorio compara el nombre. Ya no usa la biografía, el título de un release ni el título de una sesión para decidir qué tarjetas salen.
- No hay una fotografía verificada en los datos. Todas las tarjetas del directorio llevan la ilustración de cabina de la web, con el rótulo «Ilustración». Los discos siguen usando su portada de Discogs. Si no hay portada primaria, se mantiene «Sin portada verificada» y no se reutiliza la imagen de otro release.

## Archivos

Modificados:

- `src/components/DjsPage.tsx`
- `src/styles/sessions.css`
- `package.json` (la orden `npm test` incluye el archivo nuevo)
- `INFORME-MAKINA-SOUND.md`

Creados:

- `src/lib/djView.ts`
- `tests/djs-view.test.ts`
- `informes/FASE-07-interfaz-djs.md`

Sin cambios: `src/data/djs.json`, `src/data/sessions.json`, `djIds`, biografías, créditos, `src/data/pages.ts` y el resto de secciones. La vista de la ficha lee el modelo que ya existía.

## Pruebas

`npm test`: 29 pruebas, 0 fallos. Las 22 anteriores siguen pasando. Las 7 nuevas cubren el directorio sin biografía ni releases ni sesiones, la búsqueda por nombre, la ficha exclusiva, el filtro por `djIds`, los apartados vacíos de Nando Dixkontrol, Javi Maki y Da Terror, el identificador desconocido y el rechazo de una portada o un enlace de Discogs como reproductor.

`npm run build`: correcto. Bundle `dist/assets/index-DhZWZqip.js` (696,22 kB, gzip 170,85 kB) y `dist/assets/index-CfaAjrCX.css`. Sigue el aviso de Vite por el chunk mayor de 500 kB. No se ha partido el bundle.

## Revisión visual

Servidor de preview ya en marcha: `http://127.0.0.1:4177/`. Se cargó el bundle `index-DhZWZqip.js`.

- Directorio en escritorio: encabezado «DJs», 15 tarjetas en tres columnas, ilustración en todas, 0 iframes, 0 imágenes rotas. No aparece el texto genérico ni la biografía de Da Terror.
- Búsqueda «terror»: queda solo Da Terror. Al abrir la ficha y pulsar atrás, el hash vuelve a `#djs`, el campo sigue en «terror» y hay una sola tarjeta.
- Da Terror: biografía, fuente, una colaboración sin portada verificada, aviso de producciones y 3 sesiones. Al entrar, 0 iframes. «Escuchar aquí» carga `https://www.youtube-nocookie.com/embed/BfqJuN_MXDI?rel=0`.
- Nando Dixkontrol por URL directa: 4 temas, la producción To The Big Big Ben y el aviso de sesiones. 5 portadas cargadas, 0 rotas, 0 iframes.
- Ruboy: encabezado propio, 142 imágenes de release, 1 «Sin portada verificada», 143 tarjetas (142 releases y 1 sesión) y 0 iframes al entrar.
- Javi Maki: avisos de temas y de producciones, 4 sesiones, sin releases inventados.
- `#djs/no-existe`: «DJ no encontrado». «Volver a DJs» abre el directorio completo.
- Móvil, 390 px: una columna, sin desbordamiento horizontal. Cabecera con menú. La ficha de Nando se lee en esa anchura.
- Tablet, 768 px: el directorio pasa a dos columnas.
- `#sesiones` sigue abriendo el reproductor de Cesk, `GGCuKvxLx70`.

## Datos

No se ha escrito `djs.json` ni `sessions.json`. Siguen 15 perfiles y 150 sesiones. Los recuentos de la tabla vigente no cambian: son tarjetas de release, no cortes del tracklist.

Hallazgo que no se corrige en esta fase: Makineros 90's Vol.1 tiene portada en la ficha de Ruboy y no la tiene en la de Da Terror. La fase 06 dejó esa diferencia a propósito. Tampoco hay retratos con fuente verificada.

## Limitaciones

La búsqueda del directorio es por nombre. Quien busque un título de release tiene que entrar en la ficha o usar el buscador general de la cabecera. El orden por fecha se conserva.

El reproductor de una sesión queda entre la cabecera y los temas, no junto a la tarjeta pulsada. Al elegirlo, la página se desplaza hasta él.

## Siguiente paso

Parar y esperar la revisión de este informe y de `INFORME-MAKINA-SOUND.md`. No empieza otra fase.
