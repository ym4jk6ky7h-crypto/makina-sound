# Fase 21 — publicación permanente y retratos

Fecha: 16 de octubre de 2026.
Estado: completada. La web está publicada. No se ha incorporado ninguna fotografía.

## Estado inicial

El proyecto no tenía repositorio git. `package.json` sigue con `dev`, `build`, `preview` y `test`. Vite no tenía `base`. La navegación es por hash (`#djs`, `#djs/id`). El catálogo, leído del JSON, era 55 perfiles, 618 tarjetas, 150 sesiones, 0 retratos verificados, 13 pendientes y 42 sin candidato. `npm test` de partida, el de la fase 20, tenía 39 pruebas en verde.

La cuenta de GitHub ya tenía sesión, con permiso de repositorios y de Actions. No había sesión de Cloudflare, Netlify ni Vercel. El repositorio `makina-hub` es otra aplicación, con Next y Vercel, y no se ha tocado.

## Publicación

Plataforma: GitHub Pages. Es la que ya tenía credenciales y sirve una web estática por HTTPS sin backend. La navegación por hash no necesita reescribir rutas.

La compilación de producción usa `VITE_BASE=/makina-sound/`, definido solo en `.github/workflows/pages.yml`. En local, sin esa variable, la base sigue siendo `/`. Un retrato local `/images/djs/{id}.jpg` se prefija con esa base al mostrarse, así que no pide el archivo en la raíz del dominio. Una URL https remota no se modifica.

El flujo, en cada push a `main`, instala, ejecuta `npm test`, compila y publica `dist`. No guarda tokens en el repositorio: Actions usa el token del propio GitHub.

El primer intento devolvió 404 porque Pages aún no estaba activado. Se activó el origen «GitHub Actions» y se relanzó el mismo flujo. Terminó en éxito.

## URL comprobada

https://ym4jk6ky7h-crypto.github.io/makina-sound/

El 16 de octubre de 2026 respondió 200, con el título MAKINA SOUND, y sirvió `assets/index-pFJ8C9aa.js` (200) y `assets/index-ChtpcYJz.css`. En el navegador, `#djs` muestra 55 artistas y «Sin retrato de…» en todas las tarjetas. `#djs/ruboy` abre la ficha, con el monograma «Sin retrato de Ruboy» y ninguna foto de retrato.

El directorio público es https://ym4jk6ky7h-crypto.github.io/makina-sound/#djs.

Es una dirección permanente mientras el repositorio y Pages sigan activos. No depende de tener el ordenador encendido. El código fuente es público en https://github.com/ym4jk6ky7h-crypto/makina-sound. Los volcados `tmp-*.json` no se han subido.

Una ruta de retrato inexistente, `/images/djs/ruboy.jpg` bajo el sitio, responde 404. El catálogo no la pide.

Para publicar un cambio posterior, desde `C:\Users\edugarcia\Documents\rewind-165`:

```
git add -A
git commit -m "Describe el cambio."
git push
```

El flujo de Actions vuelve a publicar solo. No hace falta otro servidor.

La copia local sigue siendo temporal. Desde la misma carpeta: `npm run dev` o `npm run build` y después `npm run preview -- --port 4173 --host 127.0.0.1`. Esa dirección es `http://127.0.0.1:4173/` y no se abre desde otro dispositivo.

## Retratos

Se han revisado los 55 perfiles del registro. No se ha descargado ninguna imagen y no se ha marcado ninguna como `verified`.

| Resultado | Número |
| --- | ---: |
| DJs revisados | 55 |
| Fotografías autorizadas e incorporadas | 0 |
| Pendientes de permiso | 13 |
| Sin una opción adecuada | 42 |

Los 13 pendientes son los de la fase 20, comprobados el mismo día. Siguen sin una cesión: DJ Nau, Sergi Blue, Javi Maki, DJ Sisu, DJ Skudero, Xavi Metralla, DJ Sonic, DJ Pastis, Ruboy, Nando Dixkontrol, Julio Posadas, Ricardo F y Da Terror. La tabla de fuentes, derechos y siguiente acción está en `informes/FASE-20-retratos-y-acceso.md`. No se repiten aquí como si fueran una autorización nueva.

Una búsqueda del 16 de octubre de 2026 sobre Gerard Requena, Toni Peret y DJ Buenri en Wikimedia Commons devolvió otras personas: José María Requena Rolanía, Gerard van der Weerd, Gérard Errera y Gerard Way. No son estos DJs y no se usan. Los otros 39 perfiles sin candidato tampoco tenían, en el registro, una página de retrato con licencia. No se ha inventado una fuente para ellos.

El sistema sigue siendo el campo `portrait` de cada ficha. No hay un segundo catálogo. `verified` exige imagen, fuente, licencia, enlace de la licencia y fecha. `pending` y `candidate` no publican la imagen. La ficha, cuando haya una foto autorizada, muestra la fuente y, debajo, el autor y el texto de la licencia. El directorio y las fichas sin foto siguen con el monograma.

Para añadir una foto más adelante: guardar `public/images/djs/{id}.jpg` (o png o webp), poner `status: "verified"` con la documentación, y hacer push. `auditPortraits` rechaza el archivo si no existe, si el nombre no es el identificador o si un pendiente conserva la imagen.

## Pruebas

`npm test`: 39 pruebas, 20 suites, 0 fallos. Incluyen la ruta local con licencia, la ruta remota, el pendiente que no publica la imagen, el prefijo `/makina-sound/` y el hecho de que una URL https no se reescribe.

`npm run build` en local, sin `VITE_BASE`: correcto. Bundle `dist/assets/index-DbrW9jA9.js` (789,80 kB; gzip 192,93 kB) y `dist/assets/index-Dy_nDfox.css` (28,51 kB; gzip 6,46 kB).

La compilación que sirve la web pública, con `VITE_BASE=/makina-sound/`, es `assets/index-pFJ8C9aa.js` (789,81 kB; gzip 192,94 kB) y `assets/index-ChtpcYJz.css` (28,61 kB; gzip 6,48 kB). El aviso de un chunk mayor de 500 kB ya existía y no se ha cambiado la forma de cargar el catálogo.

## Pendiente

Falta la autorización escrita de los 13 candidatos, y una foto individual en los casos de grupo. El siguiente paso útil es pedir esas cesiones. Hasta entonces el monograma es el retrato publicado.

Si se quiere un dominio propio, se añade en la configuración de Pages del repositorio y hay que cambiar `VITE_BASE` a `/` en el flujo, porque el sitio dejaría de vivir en la carpeta `/makina-sound/`.
