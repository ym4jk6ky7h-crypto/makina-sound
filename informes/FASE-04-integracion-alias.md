# Fase 04 — Integración controlada de los alias de Julio Posadas

Fecha: 15 de octubre de 2026.
Estado: **completada**.
Proyecto: `C:\Users\edugarcia\Documents\rewind-165`.

## Alcance

Se ha aplicado solo lo que la fase 03 documentó para dos lanzamientos: Pildo (1996, release 575057) y Vol. 2 – In Vino Veritas (1997, release 224736).

No se han cambiado las 150 sesiones ni sus `djIds`. No se han alterado las discografías de Ruboy, Gerard Requena, Skudero ni Xavi Metralla. No se han revisado ni fusionado otros alias. No se han sustituido los nombres Dith Wemyd ni Hector Seral en los créditos. No se ha tocado `tmp-discogs-works.json`. No hay un catálogo paralelo.

## Qué permite el modelo

Una tarjeta tiene un solo tipo (`own`, `collaboration`, `produced`, `remix`, `compilation`, `reissue`) y, aparte, una lista de créditos con nombre y función. La nota libre `edition` ya se muestra en la tarjeta.

Eso basta para decir las dos cosas sin ambigüedad: el tipo de la tarjeta de Julio es producción para terceros, y la composición de Hector Seral sigue en los créditos. No ha hecho falta un campo nuevo ni una segunda tarjeta por función. Esta parte no queda pendiente.

## Cambios

### Pastis & Buenri

Pildo e In Vino Veritas siguen como temas del dúo. El artista principal sigue siendo Pastis & Buenri. Los créditos originales se conservan.

Nota añadida solo en esas dos tarjetas: «Discogs relaciona a Dith Wemyd y a Hector Seral con Julio Posadas Gilabert.»

Adrenalin, Vibrations, Game Over II, I'm Sailing, Stripped y Pildo (Space Version) no llevan la nota.

La ficha sigue en 9 temas.

### Julio Posadas

No había una tarjeta previa de estos dos releases. Se han añadido dos, sin duplicar el enlace de Discogs dentro de la ficha.

| Id | Título | Año | Tipo | Artista principal | Release |
| --- | --- | ---: | --- | --- | --- |
| julio-pildo-1996 | Pildo | 1996 | produced | Pastis & Buenri | 575057 |
| julio-in-vino | Vol. 2 - In Vino Veritas | 1997 | produced | Pastis & Buenri | 224736 |

Cada tarjeta repite los créditos ya publicados en el dúo y añade dos líneas de alias, sin borrar la función original:

- Dith Wemyd, producción, y Dith Wemyd, alias.
- Hector Seral, composición, y Hector Seral, alias.

La misma nota de Discogs aparece en las dos tarjetas. Julio no figura como artista principal.

## Créditos y enlaces

Los datos de etiqueta, número de catálogo, formato, portada y enlace salen de las fichas que ya estaban publicadas en Pastis & Buenri. El formato sigue siendo «Vinyl», el valor que devolvió la API. No se ha inventado un «12"».

| Lanzamiento | Enlace | Etiqueta | Catálogo | Portada reutilizada |
| --- | --- | --- | --- | --- |
| Pildo | https://www.discogs.com/release/575057 | Max Music | NM1514MX | `https://i.discogs.com/hQYY4kixppvsiJhMtZUJvCmRfOtVLkXEB84qR-p9Mds/...jpeg` |
| Vol. 2 - In Vino Veritas | https://www.discogs.com/release/224736 | DJ's At Work | NM5037MX | `https://i.discogs.com/dj2OIPQI2ikEgza2KfSGN3OQIqJ-NewCfImgBcK738w/...jpeg` |

La relación de alias procede de la fase 03, no de una comprobación nueva de la funda:

- Dith Wemyd, artista 113807: https://www.discogs.com/artist/113807-Dith-Wemyd
- Hector Seral, artista 113132: https://www.discogs.com/artist/113132-Hector-Seral
- Julio Posadas Gilabert, artista 6091309: https://www.discogs.com/artist/6091309-Julio-Posadas-Gilabert

En los dos releases, Discogs apunta la producción al id 113807 y la composición al id 113132, y esas páginas se enlazan con 6091309. No hay fuente fuera de Discogs. El vinilo original no se ha verificado.

Matiz que se mantiene: la página de Hector Seral dice que el alias se usó sobre todo en 1997 y 1998. Pildo es de 1996. El id del crédito sigue siendo 113132.

## Recuento de tarjetas

| Perfil | Antes | Después |
| --- | ---: | ---: |
| Pastis & Buenri | 9 | 9 |
| Julio Posadas | 99 | 101 |
| DJ Skudero | 8 | 8 |
| Xavi Metralla | 7 | 7 |
| Ruboy | 142 | 142 |
| Gerard Requena | 128 | 128 |
| Sesiones | 150 | 150 |

Las demás fichas de DJ no se han editado. Siguen siendo 15 perfiles.

## Pruebas

- `npm test`: 20 pruebas, 0 fallos. La prueba nueva comprueba los créditos históricos, la nota, que Julio no es el artista principal, que no hay tarjetas duplicadas, que la composición sigue presente y que las otras discografías y las 150 sesiones no cambian.
- `npm run build`: correcto. Bundle `dist/assets/index-OQWH0DWX.js` (634 kB). Vite sigue avisando de que el chunk pasa de 500 kB.
- Navegador en `http://127.0.0.1:4177/?fase04=1`: `#djs/pastis-buenri` muestra la nota solo en Pildo e In Vino, con los nombres originales y 14 sesiones. `#djs/julio-posadas` muestra las dos tarjetas como «Producción», artista Pastis & Buenri, composición de Hector Seral visible, y los enlaces 575057 y 224736. Las dos portadas cargaron (600 px). El botón de Julio pasa de 30 a 32 producciones y conserva 1 sesión.

## Limitaciones

La tarjeta tiene un tipo principal. En Julio ese tipo es producción. La composición no es un segundo tipo de tarjeta; está en la línea de crédito. Eso es lo que el modelo puede decir con claridad, y es lo que se ha publicado.

La descarga `tmp-discogs-works.json` sigue sin estos dos releases. No se ha reescrito. Las tarjetas nuevas reutilizan la ficha ya verificada del dúo y la evidencia de `tmp-phase03-evidence.json`.

El resto de tarjetas de Julio que citan un alias siguen como las dejó la fase 02: coincidencia de nombre, no una comprobación de id una a una. Esta fase no las ha reabierto.

## Siguiente fase, sin empezarla

Las descargas más pequeñas que siguen sin publicar: Ricardo F, DJ Nau, Frank T.R.A.X., DJ Sisu y DJ Sonic. No se ha empezado ninguna.
