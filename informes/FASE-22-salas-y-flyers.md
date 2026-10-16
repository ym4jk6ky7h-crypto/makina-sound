# Fase 22 — salas y flyers

Fecha: 16 de octubre de 2026.
Estado: completada y publicada. El flujo de GitHub Pages terminó en éxito. https://ym4jk6ky7h-crypto.github.io/makina-sound/ respondió 200 y sirvió `assets/index-D90E7Cd2.js`, que ya contiene Pont Aeri y Macrorave 2009.

## Estado inicial

`#salas` y `#flyers` eran textos editoriales. `venues.json` y `flyers.json` estaban vacíos. El menú ya apuntaba a esas rutas por hash. El catálogo musical seguía en 55 perfiles, 618 tarjetas y 150 sesiones. `npm test` tenía 39 pruebas en verde.

## Salas incorporadas

Tres fichas. Cada afirmación del texto sale de una página abierta el 16 de octubre de 2026, o de una biografía que este archivo ya tenía firmada.

| Sala | Qué se publica | Fuentes | Qué no se publica |
| --- | --- | --- | --- |
| Pont Aeri | Origen en 1991 y etapas Terrassa, Manresa (2000), Traiguera (2000) y Vallgorguina (2002), según la web oficial. Núcleo de cabina en Vallgorguina: Skudero, Xavi Metralla, Sonic y Sisu. Nando Dixkontrol, residente según el CCCB, sin fecha de esa etapa. Pastis y Buenri, por sus fichas ya publicadas. Anuncio de cierre del local de Vallgorguina a partir de noviembre de 2012, La Vanguardia, 5 de agosto de 2012, en boca de Ramón Escudero. El 9 Nou, 28 de diciembre de 2012, cuenta el cierre de esa sala. La web oficial sigue anunciando fiestas con el nombre. | https://www.pontaeri.es/ · https://www.lavanguardia.com/vida/20120805/54334033363/vallgorguina-iva-hunde-discoteca-pont-aeri-cierra.html · https://el9nou.cat/valles-oriental/actualitat/el-darrer-vol-del-pont-aeri/ · https://www.cccb.org/ca/w/collectius/nando-dixkontrol | No hay fotografía. No se convierte «este sábado» del 9 Nou en una fecha de calendario calculada aquí. |
| Xque | Palafrugell, 1992–2007, y Olot, 2010–2011, según la Wikipedia en español. Oskar Mad, Pastis, DJ Sek y Buenri en Palafrugell. Sepi, Bull, Fran Bit y el regreso de Pastis en Olot. Cierre de Palafrugell el 21 de julio de 2007. | https://es.wikipedia.org/wiki/Xque | La cifra de asistencia del cierre lleva en Wikipedia la marca de cita requerida y no entra. No se abre aquí el artículo del Diari de Girona al que remite la Wikipedia: la fecha de Olot queda atribuida a ese artículo de Wikipedia. |
| Chasis | Mataró. Ricardo F, residente nueve años desde 1993, como ya dice su ficha a partir de la entrevista en Makineros. | https://makineros.com/entrevistamos-a-ricardo-fdj-residente-de-la-sala-chasis-durante-9-anos/ | No hay fecha de apertura ni de cierre del local. Las cifras de público de la entrevista no se repiten como aforo del edificio. |

Scorpia y el Psicódromo se investigaron y no tienen ficha. Para Scorpia no había una página de sala con fechas comprobadas. El Psicódromo aparece en biografías ya publicadas, sin una historia del local suficiente para una ficha propia.

No hay fotografía de ninguna sala. La tarjeta usa una composición tipográfica y el texto accesible dice que no es una fotografía.

## Flyers

Imágenes autorizadas e incorporadas: 0.

Referencias pendientes de reproducción: 3. Las tres están nombradas en https://www.pontaeri.es/ y no se copia el archivo gráfico.

| Referencia | Fecha citada | Procedencia que cita Pont Aeri | Permiso |
| --- | --- | --- | --- |
| Macrorave 2009, Vallgorguina | 23 de junio de 2009 | Last.fm | No leído. Imagen no publicada. |
| Masters of Hardcore 2011, Vallgorguina | 17 de septiembre de 2011 | Partyflock | No leído. Imagen no publicada. |
| Vallgorguina 4ever, Terminal, Sabadell | 29 de noviembre de 2025 | Wololo Sound | No leído. Imagen no publicada. Es un reencuentro, no un cartel del local de 2012. |

Una imagen https sin licencia queda fuera del lector. La prueba lo exige.

## Enlaces

Desde la ficha de sala se abre el perfil de cada DJ cuyo identificador está en la ficha, y la sesión del catálogo cuyo título nombra la sala. La fecha visible de esa sesión sigue siendo la de publicación del vídeo.

- Pont Aeri: siete DJs y «Closing Party @ Pont Aeri (Junio 2024)», que no es el cierre de 2012.
- Xque: siete DJs y el concurso de 2004 cuyo título nombra la sala. El catálogo ya atribuía ese vídeo a DJ Sepi y DJ Sisu; no se añaden los otros nombres del título.
- Chasis: Ricardo F y las dos caras tituladas «Ricardo F @ Chasis 2000».

Desde la ficha de un DJ, la sección Salas aparece solo si alguna sala lo nombra. Ricardo F enlaza Chasis. No se ha reescrito ninguna biografía.

## Interfaz

`#salas` es un listado con búsqueda y ficha `#salas/id`. `#flyers` es una cuadrícula de referencias, sin imagen, y ficha `#flyers/id`. El texto editorial anterior de esas secciones deja de ocupar la entrada: el archivo va delante. Remember, DJs y sesiones no se han rediseñado. En móvil, a 390 px, el menú se pliega, Flyers no muestra ninguna imagen y el título cabe en la pantalla.

## Pruebas

`npm test`: 41 pruebas, 21 suites, 0 fallos. Dos pruebas nuevas comprueban las tres salas, la ausencia de imagen, el rechazo de un cartel https sin licencia, la ficha de Pont Aeri y que Scorpia no existe.

`npm run build` en local: `dist/assets/index-CQN4sIQI.js` (807,12 kB; gzip 196,54 kB) y `dist/assets/index-D-56YlQq.css`.

Compilación con `VITE_BASE=/makina-sound/`, la que usa GitHub Pages: `assets/index-D90E7Cd2.js` (807,14 kB; gzip 196,55 kB) y `assets/index-FcP9tNcP.css`.

Comprobado en local, en http://127.0.0.1:4173/?v=fase22#salas, la ficha de Pont Aeri, Flyers y la ficha de Ricardo F. En público, el mismo archivo está en https://ym4jk6ky7h-crypto.github.io/makina-sound/#salas y https://ym4jk6ky7h-crypto.github.io/makina-sound/#flyers.

## Pendiente

Faltan cesiones para reproducir carteles. Faltan fichas de Scorpia y del Psicódromo si aparece una fuente con fechas que se puedan citar. El catálogo de DJs y de sesiones no se ha ampliado.
