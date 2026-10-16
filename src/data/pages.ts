export type Essay = {
  heading: string;
  paragraphs: string[];
};

export type PageCopy = {
  kicker: string;
  label: string;
  title: string;
  lead: string;
  essays: Essay[];
  note: string;
};

export const exploreCopy = {
  kicker: "01",
  label: "Ahora",
  title: "Makina actual",
  lead: "Aquí entra lo que ya está documentado de la makina de ahora. Una fecha de vídeo no convierte una sesión en actual: hace falta que el título lo diga, o que el DJ tenga ficha y un vídeo publicado.",
};

export const archiveCopy = {
  kicker: "02",
  label: "Sala de lectura",
  title: "Archivo",
  lead: "El archivo busca en los textos editoriales y, si escribes un nombre, también en los DJs y las sesiones ya publicados. No inventa resultados.",
};

export const rinconCopy = {
  kicker: "06",
  label: "Taller",
  title: "El rincón del DJ",
  lead: "Guías de bricolaje para la cabina y el cuarto de trabajo: muebles, soportes, acústica, luz, cableado, montaje y mantenimiento. Solo se publica una guía cuando los pasos y las fuentes están escritos.",
};

export const equipoCopy = {
  kicker: "07",
  label: "Material",
  title: "Equipo DJ",
  lead: "Fichas y comparativas de material. Cada dato tiene que salir de una fuente. Un precio o una especificación sin comprobar se queda vacío.",
};

export const projectCopy: PageCopy = {
  kicker: "03",
  label: "La publicación",
  title: "El proyecto",
  lead: "MAKINA SOUND es un archivo vivo de la música Makina. No nace para reproducir una playlist: conecta el remember con el sonido de hoy, y explica cómo se vivía —y cómo se sigue viviendo— dentro de la sala.",
  essays: [
    {
      heading: "Para quién",
      paragraphs: [
        "Para quien llenó la pista y reconoce el bombo antes que el título. Y para quien llega ahora y quiere saber qué pasaba allí: la velocidad, la melodía, el humo, la gente que volvía.",
        "Las dos lecturas caben en la misma sala. Una aporta memoria. La otra, preguntas. El archivo tiene que servirles a las dos sin tratar al recién llegado como si ya hubiera estado, ni al veterano como si hiciera falta explicarle su propia noche.",
      ],
    },
    {
      heading: "Qué hay en esta fase",
      paragraphs: [
        "La portada y estas secciones. Describen el sonido, la sesión, la discoteca y los objetos. Cuentan el ambiente con el detalle que se puede sostener sin inventar una fecha, un local o un cartel.",
        "Entrar en una puerta abre el texto de esa sección y, donde ya hay catálogo, las fichas publicadas. El buscador recorre los textos, los DJs y las sesiones. No inventa lo que todavía no está cargado.",
      ],
    },
    {
      heading: "Tres capas que no se mezclan",
      paragraphs: [
        "La ilustración está hecha para esta web. Enseña una sala, unos platos, un vinilo o un montón de papeles, y lo dice en la propia imagen.",
        "El texto editorial describe la cultura: cómo sonaba, cómo se armaba una noche, qué era una sala y qué guardaba un flyer. No pretende ser la crónica de un sábado concreto.",
        "La ficha vendrá después. Un disco, una sesión, una sala o un flyer solo entrarán con procedencia: qué es, de dónde sale y qué se puede afirmar.",
      ],
    },
    {
      heading: "Lo que esta publicación no hace",
      paragraphs: [
        "No presenta un dibujo como fotografía histórica. No da por buena una sesión que no se puede documentar. No rellena un mapa de locales famosos para que la página parezca un archivo terminado.",
        "La makina ya tuvo bastante mito. Aquí el mito se escucha, pero no se fabrica.",
      ],
    },
  ],
  note: "Edición web, 2026. Portada y secciones de orientación. El catálogo queda para cuando cada pieza pueda separarse del relato.",
};

export const doorCopy: Record<"discos" | "djs" | "sesiones" | "salas" | "flyers", PageCopy> = {
  discos: {
    kicker: "01",
    label: "Clásicos",
    title: "Remember",
    lead: "El remember guarda los clásicos y el contexto del sonido: cómo se reconocía un tema y por qué la pista lo pedía. Los textos de abajo son artículos. No son fichas discográficas ni una lista de artistas.",
    essays: [
      {
        heading: "Velocidad abajo, estribillo arriba",
        paragraphs: [
          "El pulso iba rápido y seco, pensado para no dejar hueco. Encima no había un muro de ruido: había una melodía brillante, a menudo sencilla, hecha para quedarse en la cabeza al salir.",
          "Ese contraste es la seña más clara. Si solo sube el tempo, puede ser otra cosa. Si la melodía se entiende a la primera y el cuerpo no se sienta, estás en territorio makina.",
        ],
      },
      {
        heading: "La voz de la pista",
        paragraphs: [
          "Muchas pistas llevaban una frase, un coro o una voz tomada de otro sitio. No hacía falta la letra entera. Bastaba una línea que la sala pudiera corear sin mirar a un escenario, porque el escenario era el suelo.",
          "La voz no explicaba la noche. La marcaba. Cuando volvía el estribillo, la pista ya estaba dentro del tema.",
        ],
      },
      {
        heading: "Una referencia que la escena reconoce",
        paragraphs: [
          "Hay temas que siguen funcionando como memoria compartida. Flying Free, de Pont Aeri, es uno de ellos: un himno que se identificaba al momento. MAKINA SOUND lo cita como referencia pública de la cultura, no como una ficha catalogada.",
          "No acompaña aquí sello, año ni edición. Esos datos entrarán cuando se puedan comprobar pieza por pieza. Nombrar un himno no es lo mismo que inventar una discografía.",
        ],
      },
      {
        heading: "Cómo se escuchará en el archivo",
        paragraphs: [
          "Cada disco futuro tendrá su sitio: qué se oye, quién lo firmó y por qué la sala lo pedía. También lo que no se debe afirmar si la fuente no llega.",
          "Hasta entonces, esta sección enseña a escuchar. Lo esencial no era la rareza del vinilo. Era que, a los pocos compases, la pista ya estuviera de acuerdo.",
        ],
      },
    ],
    note: "Texto editorial. Flying Free y Pont Aeri se mencionan como referencia conocida de la escena, no como documento custodiado por este archivo.",
  },
  djs: {
    kicker: "02",
    label: "La cabina",
    title: "DJs",
    lead: "Aquí va la ficha de quien pincha: la biografía que se puede firmar, los temas que editó y, aparte, las sesiones. No es un ranking escrito para llegar a un número.",
    essays: [
      {
        heading: "El nombre, con una vida que se pueda contar",
        paragraphs: [
          "Un DJ de makina se reconoce por las noches y por los temas, no por ocupar un puesto en una lista de trescientos. Desde 1995 hay mucha cabina, y no toda está documentada con el mismo cuidado.",
          "Las fichas de esta página recogen a quien sigue en activo y a los nombres clásicos cuya vida y discografía se pueden leer en fuentes públicas. Entra cuando se puede decir de dónde sale, en qué salas trabajó y qué publicó. El resto no se rellena para llegar a un número.",
        ],
      },
      {
        heading: "La discografía, con el tema a un enlace",
        paragraphs: [
          "Los temas editados y las sesiones van en dos listas. Si el tema está en YouTube, se escucha aquí. Si está en Discogs, Beatport u otra plataforma, el enlace abre esa ficha.",
          "No se inventa un sello, un año ni una URL para que la lista parezca completa. Lo que no tiene enlace comprobado no se publica.",
        ],
      },
    ],
    note: "No hay un ranking de los 300 mejores. Una ficha aparece cuando la biografía y cada enlace de la discografía se han comprobado.",
  },
  sesiones: {
    kicker: "03",
    label: "La cabina",
    title: "Sesiones",
    lead: "Descubre sesiones Makina publicadas por DJs y canales de la escena. Desde el remember hasta las mezclas actuales, encuentra tu próxima sesión y escúchala aquí mismo.",
    essays: [
      {
        heading: "La cabina no era un escenario",
        paragraphs: [
          "En estas discotecas la cabina estaba al fondo, no en el centro de un foco pensado para la foto. Desde allí se veía la pista y se decidía el relato. El público miraba menos a la cabina que al tema que estaba a punto de estallar.",
          "Eso cambia cómo se cuenta. Un DJ de makina se recuerda por la sesión, por la dirección de esas horas, no por un momento de luces sobre su cara.",
        ],
      },
      {
        heading: "La sesión tenía partes",
        paragraphs: [
          "Primero un tramo para llenar el suelo y acostumbrar el oído. Después una subida en la que el tempo se sostenía y la melodía se abría. Luego el tema que la sala ya conocía, el que cambiaba el ánimo sin que nadie lo anunciara.",
          "Aguantar era tan importante como soltar. Si todo era cima, no había cima. La sesión buena se notaba en el orden, no en el número de discos.",
        ],
      },
      {
        heading: "La pista también mezclaba",
        paragraphs: [
          "La sala respondía. Si el tema era de los suyos, se veía en los brazos y en el hueco que desaparecía. Quien pinchaba leía ese cuerpo y elegía el siguiente paso.",
          "Por eso una noche de makina no se resume en un hit. Se resume en cómo se llegó hasta él, y en lo que se hizo después, cuando la pista ya estaba entregada.",
        ],
      },
      {
        heading: "Los nombres, con contexto",
        paragraphs: [
          "Los nombres de la cabina importan y entrarán con lugar y contexto, no como una lista suelta para parecer completos.",
          "Las sesiones de arriba son vídeos publicados en YouTube. La biografía y la discografía están en DJs, y solo cuando se pueden firmar.",
        ],
      },
    ],
    note: "El texto explica el oficio. No es una biografía ni una ficha de canciones. Una sesión solo aparece si el vídeo y su fecha de publicación se han comprobado.",
  },
  salas: {
    kicker: "04",
    label: "El cuarto",
    title: "Salas",
    lead: "Esta parte cuenta la historia de las salas: el cuarto, la costumbre de volver y lo que convertía un local en sitio de la gente. No hay un mapa ni fichas de discotecas. Los flyers están en la sección de al lado.",
    essays: [
      {
        heading: "Anatomía de la sala",
        paragraphs: [
          "La cola, donde el bombo ya se oía antes de entrar. La puerta. La pista, llena de espaldas y de manos. La cabina al fondo. El haz magenta o ácido, visible porque había humo. La calle, después, con el oído todavía dentro.",
          "Nada de eso es un local con nombre. Es la forma del sitio. Quien estuvo en una de esas salas reconoce las piezas aunque el cartel cambiara.",
        ],
      },
      {
        heading: "Lo que la hacía mítica",
        paragraphs: [
          "Una noche memorable no basta. La sala mítica se repetía: el mismo fin de semana, la misma gente, un sonido que se reconocía al cruzar la puerta, un flyer que anunciaba la siguiente.",
          "La leyenda, aquí, era una costumbre. Se construía volviendo, no con un ranking.",
        ],
      },
      {
        heading: "Dónde se bailaba",
        paragraphs: [
          "Esa costumbre tuvo sitios concretos, con peso especial en Cataluña y en el Levante, y también viajó a otras pistas. Decir eso es situar la cultura. No es publicar el mapa.",
          "Un local solo entrará en MAKINA SOUND con nombre, época y una fuente. Inventar una sala famosa sería fallarles a quienes sí tuvieron la suya.",
        ],
      },
      {
        heading: "La luz y el humo",
        paragraphs: [
          "Sin humo, el foco era un punto en el techo. Con humo, la sala tenía volumen: el láser se veía cruzar el aire y partir la pista. Dos colores, el ácido y el magenta, bastaban para que el cuarto pareciera otro.",
          "Las ilustraciones de esta web reconstruyen ese ambiente. No son fotografías de ninguna discoteca real.",
        ],
      },
    ],
    note: "Texto editorial. Esta sección no ficha locales ni publica un mapa de salas.",
  },
  flyers: {
    kicker: "05",
    label: "El papel",
    title: "Flyers",
    lead: "Aquí va el documento gráfico: el cartel, la cinta y lo que se podía guardar al salir. Los dibujos de esta web son ilustraciones editoriales, no flyers auténticos. La historia de las salas está en la sección anterior.",
    essays: [
      {
        heading: "Qué cabía en el flyer",
        paragraphs: [
          "El nombre de la sesión, la fecha, la sala, los nombres de la cabina y un dibujo. Tipografía apretada, a veces a dos tintas, con el mismo nervio que luego tenían los focos.",
          "Era cartel, aviso y recuerdo a la vez. Quien lo guardaba no guardaba solo un diseño: guardaba una noche a la que pensaba volver, o una a la que ya había ido.",
        ],
      },
      {
        heading: "En la pared, donde daba la luz",
        paragraphs: [
          "Dentro de la sala, los carteles de otras sesiones se leían donde pegaba un foco. No eran adorno. Eran el calendario de la gente que repetía: qué venía, quién pinchaba, a qué puerta había que ir.",
          "Por eso el flyer importa en un archivo de esta cultura. Una lista de canciones no conserva el dibujo, ni la letra hecha a mano, ni el doblez de haberlo llevado en el bolsillo.",
        ],
      },
      {
        heading: "La cinta del lunes",
        paragraphs: [
          "El papel anunciaba. La cinta —y más tarde el CD— devolvía el sonido. Alguien grababa la sesión, o una selección, y el lunes el bombo seguía en la cocina o en el coche.",
          "Ese objeto también es memoria. Cuando entre aquí, tendrá que decirse de dónde sale la grabación y qué noche dice ser. Una cinta sin procedencia es un rumor con carátula.",
        ],
      },
      {
        heading: "Cómo se mostrarán",
        paragraphs: [
          "Un flyer del archivo se enseñará como objeto: qué noche anuncia, qué se lee de verdad, quién lo conserva. Si falta un dato, se dirá que falta.",
          "Los carteles que ves en MAKINA SOUND son ilustraciones originales. Un dibujo nuestro no sustituye a un papel de entonces.",
        ],
      },
    ],
    note: "Texto editorial. Los flyers dibujados en la web no reproducen carteles históricos.",
  },
};
