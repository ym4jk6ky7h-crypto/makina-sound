export type MotifKind = "vinyl" | "session" | "room" | "paper";

export type Door = {
  id: string;
  pieceId: string;
  index: string;
  title: string;
  summary: string;
  kind: MotifKind;
  keywords: string[];
};

export type Piece = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  summary: string;
  reading: string;
  kind: MotifKind;
  keywords: string[];
};

export const doors: Door[] = [
  {
    id: "discos",
    pieceId: "tempo",
    index: "01",
    title: "Remember esencial",
    summary:
      "El bombo, la melodía y la voz que la pista reconocía. El recuerdo del sonido, no una discografía.",
    kind: "vinyl",
    keywords: ["makina", "disco", "discos", "vinilo", "sonido", "tema", "esencial", "esenciales", "remember", "clasico", "clasicos", "pont", "aeri", "flying", "himno"],
  },
  {
    id: "djs",
    pieceId: "cabina",
    index: "02",
    title: "DJs",
    summary:
      "Biografía y discografía de la cabina, con enlace al tema. Solo cuando la ficha se puede firmar.",
    kind: "session",
    keywords: ["makina", "dj", "djs", "cabina", "biografia", "discografia", "tema"],
  },
  {
    id: "sesiones",
    pieceId: "sesion",
    index: "03",
    title: "Sesiones",
    summary: "Sesiones de YouTube de la escena, para escucharlas aquí. No es una ficha de canciones.",
    kind: "session",
    keywords: ["makina", "sesion", "sesiones", "cabina", "mezcla", "pinchar", "youtube"],
  },
  {
    id: "salas",
    pieceId: "sala",
    index: "04",
    title: "Salas",
    summary:
      "Historia de los cuartos donde se bailaba: la costumbre de volver, no un mapa de locales.",
    kind: "room",
    keywords: ["makina", "sala", "salas", "discoteca", "pista", "local", "mitica", "miticas"],
  },
  {
    id: "flyers",
    pieceId: "papel",
    index: "05",
    title: "Flyers",
    summary:
      "Tres carteles que Pont Aeri nombra. Los dibujos de esta web no son esos papeles.",
    kind: "paper",
    keywords: ["makina", "flyer", "flyers", "cartel", "papel", "cassette", "cinta", "recuerdo", "recuerdos", "historia"],
  },
  {
    id: "rincon",
    pieceId: "taller",
    index: "06",
    title: "El rincón del DJ",
    summary: "Dos guías firmadas: colocar monitores y cuidar la aguja. El resto sigue vacío.",
    kind: "session",
    keywords: ["taller", "bricolaje", "cabina", "acustica", "tutorial", "rincon"],
  },
  {
    id: "equipo",
    pieceId: "material",
    index: "07",
    title: "Equipo DJ",
    summary: "Fotos con licencia y fichas de fabricante. Sin precio de tienda.",
    kind: "vinyl",
    keywords: ["equipo", "monitor", "mesa", "plato", "auriculares", "altavoz"],
  },
];

export const pieces: Piece[] = [
  {
    id: "tempo",
    index: "01",
    kicker: "Lectura de apertura",
    title: "El tempo que no dejaba sentarse",
    summary:
      "Un pulso rápido, una melodía brillante y una energía pensada para no abandonar la pista.",
    reading:
      "En la sala el bombo marcaba el sitio antes que el nombre del tema. Encima iba una melodía clara, casi dulce, y a menudo una voz o un coro que la pista podía anticipar. La makina se reconocía en ese contraste: velocidad abajo, estribillo arriba, sin hueco para sentarse. Esta lectura no señala un disco concreto. Abre el archivo por el sonido, para que los títulos esenciales entren después con sus datos comprobados.",
    kind: "vinyl",
    keywords: ["makina", "disco", "discos", "vinilo", "sonido", "tempo", "melodia", "musica", "esencial", "remember"],
  },
  {
    id: "sesion",
    index: "02",
    kicker: "Lectura de apertura",
    title: "La sesión era el relato",
    summary:
      "Quien pinchaba no encadenaba temas: construía la noche, y la sala sabía seguirla entre el humo.",
    reading:
      "Una sesión de makina tenía dirección. No lo daba todo al abrir la puerta: la cabina preparaba el oído, subía el pulso y sostenía la pista hasta que un tema conocido la cambiaba de golpe. El láser y el humo acompañaban, pero quien narraba la noche era quien estaba al fondo, entre los platos. El archivo hablará de DJs y de sesiones como ese relato, no como una lista de nombres sin contexto.",
    kind: "session",
    keywords: ["makina", "dj", "djs", "sesion", "cabina", "mezcla", "noche", "pinchar"],
  },
  {
    id: "sala",
    index: "03",
    kicker: "Lectura de apertura",
    title: "La sala como punto de encuentro",
    summary:
      "La discoteca era un cuarto oscuro donde esa música se volvía costumbre: focos, humo y gente que volvía.",
    reading:
      "Sin la sala, la makina sería solo una velocidad. El cuarto estaba casi a oscuras. El magenta y el ácido cortaban el humo, la pista se llenaba de espaldas y de manos, y el fin de semana tenía una dirección: esa puerta. Esta portada todavía no ficha locales. Cada sala tendrá que documentarse con cuidado, sin presentar como hecho una noche que no se puede demostrar.",
    kind: "room",
    keywords: ["makina", "sala", "salas", "discoteca", "pista", "local", "luces", "encuentro"],
  },
  {
    id: "papel",
    index: "04",
    kicker: "Lectura de apertura",
    title: "Papel, tinta y cinta",
    summary:
      "Flyers, carteles y cassettes guardan la noche cuando la música ya se ha apagado.",
    reading:
      "Donde pegaba un foco se leían los carteles de otras sesiones: tipografía apretada, un dibujo, una fecha. Al salir, en el bolsillo cabía un flyer. En la cinta cabía lo que alguien quería volver a oír el lunes, con el oído todavía acostumbrado al bombo. Flyers cita los carteles que una página abierta nombra, sin copiar la imagen. Los dibujos de esta web siguen siendo ilustraciones de portada.",
    kind: "paper",
    keywords: ["makina", "flyer", "flyers", "cartel", "papel", "tinta", "cassette", "cinta", "recuerdo"],
  },
];
