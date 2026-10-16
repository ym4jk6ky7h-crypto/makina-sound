# Fase 20 — retratos reales y acceso a MAKINA SOUND

Fecha: 16 de octubre de 2026.
Estado: completada. No se ha publicado ninguna fotografía y no se ha empezado otra fase.

## Catálogo comprobado

Antes de investigar, el JSON da estos números. Después siguen igual.

| Dato | Número |
| --- | --- |
| Perfiles | 55 |
| Tarjetas de discografía | 618 |
| Sesiones | 150 |
| Retratos `verified` | 0 |
| `imageUrl` publicado | 0 |
| Candidatos `pending` | 13 |
| Perfiles `unavailable` | 42 |

No se han tocado biografías, créditos, identificadores, relaciones, sesiones ni otras secciones. No hay archivos nuevos en `public/images/`.

## Criterio

Una fotografía solo entra si se pueden citar, a la vez, la identidad de esa imagen y una autorización de uso. El sistema de la fase 19 exige `imageUrl`, fuente, nombre de la fuente, texto de licencia, URL de esa licencia y fecha. Una web oficial, un crédito de autor o un HTTP 200 no bastan. No se ha descargado ninguna imagen.

La comprobación es del 16 de octubre de 2026.

## Investigación

Wikimedia Commons, consultado ese día para los 13 nombres, no tiene un archivo que sea el retrato de estas personas. Los resultados que aparecen son homónimos: libros de un autor llamado Nau, fotos de aves o monumentos tituladas «Flying Free», la ciudad de Posadas, esculturas, Aphex Twin, o digitalizaciones sin relación. No se usan.

| DJ | Resultado | URL de origen | Derechos | Siguiente acción |
| --- | --- | --- | --- | --- |
| DJ Nau | No publicado. El presskit es su web oficial. La petición directa devolvió 403. | https://djnau.com/presskit/ y https://djnau.com/aviso-legal/ | El aviso legal, leído en el texto indexado de esa URL el mismo día, reserva los contenidos, incluidas las fotografías, a Arnau Patiño Vidal. Permite verlos en su web y prohíbe cederlos, distribuirlos o comunicarlos públicamente sin autorización expresa. | Autorización escrita del titular para esta web. |
| Sergi Blue | No publicado. La web oficial respondió. | https://www.sergiblue.com/ | El pie dice «© 2026 Sergi Blue. All Rights Reserved.» No hay cesión. | Autorización del artista. |
| Javi Maki | No publicado. La crónica se abrió. | https://lloretgaceta.com/la-makina-no-se-apaga-en-lloret-javi-maki-celebra-dos-decadas-en-cabina-con-un-tardeo-especial-y-el-regreso-de-dj-luna-x-files/ | El texto identifica al DJ y no incluye una licencia de fotografía. | Autorización de Lloret Gaceta y un retrato individual identificado. |
| DJ Sisu | No publicado. La página de Pont Aeri habla de una foto de grupo. | https://www.pontaeri.es/artistas.html | «Fotografía promocional de los cuatro residentes; fecha de toma no especificada», con enlace a Wololo Sound. No es un retrato individual y no hay licencia de reutilización. | Retrato individual etiquetado y cesión de quien tenga los derechos. |
| DJ Skudero | Igual que DJ Sisu. Wikipedia no tiene retrato en su artículo. | https://www.pontaeri.es/artistas.html | La misma foto de grupo, sin licencia. | La misma cesión, con la cara identificada. |
| Xavi Metralla | Igual que DJ Sisu. | https://www.pontaeri.es/artistas.html | La misma foto de grupo, sin licencia. | La misma cesión, con la cara identificada. |
| DJ Sonic | Igual que DJ Sisu. | https://www.pontaeri.es/artistas.html | La misma foto de grupo, sin licencia. | La misma cesión, con la cara identificada. |
| DJ Pastis | No publicado. La ficha de booking se abrió. | https://www.jamboo.es/member/dj-pastis/ | Esa página no trae una cláusula de uso de imagen. La ficha del dúo en https://www.2mgroup.es/artistas/pastis-y-buenri dice «Todos los derechos reservados» y no es un retrato individual. | Cesión y una foto que identifique a la persona de esta ficha. |
| Ruboy | No publicado. La web del sello confirma que es Rubén Moreno Abanades. | https://factoriamakina.com/nosotros/ y https://factoriamakina.com/legal/ | El apartado de propiedad intelectual prohíbe reproducir, distribuir o comunicar públicamente las imágenes sin autorización expresa del titular. | Autorización de Factoría Makina, en info@factoriamakina.com. |
| Nando Dixkontrol | No publicado. La ficha del CCCB se abrió. | https://www.cccb.org/ca/w/collectius/nando-dixkontrol | La página dice «© CCCB, 2017. Autor: Miquel Taverna.» El crédito no es una licencia para republicar. | Cesión del CCCB o de Miquel Taverna. |
| Julio Posadas | No publicado. La crónica se abrió. | https://aedyp.es/rueda-de-prensa-spain-nightlife-aedyp/ | El pie dice «© AEDYP. Todos los derechos reservados». La imagen de esa página es de una rueda de prensa, no un retrato individual. | Retrato individual y autorización de AEDYP. |
| Ricardo F | No publicado. La entrevista se abrió. | https://makineros.com/entrevistamos-a-ricardo-fdj-residente-de-la-sala-chasis-durante-9-anos/ | El pie dice «© 2025 MAKINEROS. Todos los derechos reservados.» | Autorización de Makineros. |
| Da Terror | No publicado. La web no se pudo leer. | https://www.daterror.com/ | La petición falló y otra lectura devolvió error 500. No hay licencia que citar. | Volver a abrir la web o pedir el presskit al artista. |

## Diseño

No hay retrato autorizado, así que el directorio y las fichas siguen con el monograma de las fases 17 y 18. No se ha cambiado la maquetación. El hueco de una foto real, con recorte `object-fit: cover` y `object-position: center 20%` en la tarjeta, ya está en la hoja y no se ha usado.

Comprobado en el navegador, en `http://127.0.0.1:4173/?v=fase20#djs`: las 55 tarjetas dicen «Sin retrato de…» y el contador marca 55 artistas. En `#djs/ruboy` el título es Ruboy, el texto accesible es «Sin retrato de Ruboy», hay un monograma, ninguna foto, y la discografía sigue paginada con «Mostrar 24 más».

## Pruebas

`npm test`: 39 pruebas, 0 fallos.

`npm run build`: correcto. El bundle no cambia respecto a la fase 19: `dist/assets/index-DosoZukJ.js` (789,56 kB; gzip 192,82 kB) y `dist/assets/index-BZWPvAOZ.css` (28,45 kB; gzip 6,46 kB).

Una ruta de retrato que no existe, `/images/djs/ruboy.jpg`, devuelve el HTML de la portada porque la vista previa reenvía las rutas desconocidas a `index.html`. El catálogo no pide esa ruta. Si más adelante un archivo verificado faltara, el componente pasa a «Imagen no disponible» y deja las iniciales.

## Cómo entrar

La dirección comprobada es **http://127.0.0.1:4173/**. El 16 de octubre de 2026 respondió 200, sirvió `assets/index-DosoZukJ.js` y el título es MAKINA SOUND. El directorio está en http://127.0.0.1:4173/#djs.

Es temporal. Solo existe mientras el proceso de vista previa sigue abierto en este ordenador. No es una dirección pública y no hay túnel ni clave.

Para volver a abrirla, en PowerShell, desde `C:\Users\edugarcia\Documents\rewind-165`:

```
npm install
npm run build
npm run preview -- --port 4173 --host 127.0.0.1
```

`npm install` solo hace falta si faltan `node_modules`. Luego abrir http://127.0.0.1:4173/#djs.

Otra forma, con recarga al guardar, es `npm run dev` en esa misma carpeta. Vite anuncia entonces su propia dirección local, por defecto http://127.0.0.1:5173/. Esa tampoco es permanente.

No se ha añadido ninguna dependencia ni ningún script nuevo: los comandos que ya trae el proyecto bastan.
