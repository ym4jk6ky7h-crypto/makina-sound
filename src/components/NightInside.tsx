const senses = [
  {
    light: "acid",
    title: "Humo",
    text: "El aire se veía. Sin humo, el foco era un punto. Con humo, la sala tenía volumen.",
  },
  {
    light: "magenta",
    title: "Láser",
    text: "Magenta y ácido bastaban. Dos colores partían la pista y dibujaban el techo.",
  },
  {
    light: "acid",
    title: "Bombo",
    text: "Rápido y seco. El cuerpo encontraba el sitio antes de pensar el nombre del tema.",
  },
  {
    light: "magenta",
    title: "Melodía",
    text: "Encima del pulso, un estribillo brillante. Ahí se reconocía la makina, no solo en la velocidad.",
  },
];

const route = [
  {
    title: "La puerta",
    text: "El bombo llega antes que la pista. En la cola ya se nota si la sesión va a tirar.",
  },
  {
    title: "El primer tramo",
    text: "La cabina no lo da todo de golpe. Prepara el oído, baja un poco la guardia y llena el suelo.",
  },
  {
    title: "La subida",
    text: "El tempo se sostiene y la melodía se abre. Las luces dejan de decorar y empiezan a empujar.",
  },
  {
    title: "El tema de la sala",
    text: "Un estribillo conocido y la pista responde a la vez. No hace falta anunciarlo.",
  },
  {
    title: "La calle",
    text: "Al salir, el oído sigue dentro. El flyer en el bolsillo es lo único que queda en papel.",
  },
];

const traits = [
  {
    title: "Tempo alto",
    text: "Un pulso rápido, pensado para no abandonar la pista.",
  },
  {
    title: "Melodía al frente",
    text: "Estribillos claros, que se reconocían en pocos compases.",
  },
  {
    title: "Voz de sala",
    text: "Frases y coros que la gente podía corear sin mirar a ningún escenario.",
  },
];

export function NightInside() {
  return (
    <section className="night" id="la-noche" aria-labelledby="noche-title">
      <div className="wrap">
        <div className="section-head">
          <p className="section-kicker">
            <span className="idx">05</span>
            La sala
          </p>
          <h2 id="noche-title">Cómo era estar en la sala</h2>
          <p className="section-intro">
            Esto no es la ficha de una discoteca. Es el ambiente del remember: un cuarto
            oscuro, un tempo alto y una pista que respondía junta. Esa sala explica de
            dónde viene el sonido. La música que se produce hoy sigue en la portada, sin
            hacerse pasar por un lanzamiento concreto.
          </p>
        </div>

        <ul className="sense-grid">
          {senses.map((sense) => (
            <li key={sense.title} className={`sense sense-${sense.light}`}>
              <h3>{sense.title}</h3>
              <p>{sense.text}</p>
            </li>
          ))}
        </ul>

        <div className="sound">
          <h3>Cómo se reconocía el sonido</h3>
          <ul className="trait-grid">
            {traits.map((trait) => (
              <li key={trait.title}>
                <p className="trait-title">{trait.title}</p>
                <p>{trait.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="route">
          <h3>De la puerta a la calle</h3>
          <p className="route-lead">
            Una noche cualquiera, contada como se recorría. No corresponde a una fecha
            ni a un local concretos.
          </p>
          <ol>
            {route.map((step, index) => (
              <li key={step.title}>
                <span className="route-index">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
