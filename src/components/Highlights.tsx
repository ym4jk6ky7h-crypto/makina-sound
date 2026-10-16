import type { Door, Piece } from "../data/cover";
import { Motif } from "./art/Motif";

type HighlightsProps = {
  pieces: Piece[];
  openId: string | null;
  query: string;
  activeDoor: Door | null;
  onToggle: (id: string) => void;
  onClear: () => void;
};

export function Highlights({
  pieces,
  openId,
  query,
  activeDoor,
  onToggle,
  onClear,
}: HighlightsProps) {
  const trimmed = query.trim();
  const mode = pieces.length === 4 ? "spread" : pieces.length === 1 ? "single" : "list";
  let status = "";
  if (trimmed && pieces.length === 0) {
    status = `No hay coincidencias para «${trimmed}» en esta portada. Prueba con disco, sesión, sala o flyer.`;
  } else if (trimmed) {
    const noun = pieces.length === 1 ? "lectura coincide" : "lecturas coinciden";
    status = `${pieces.length} ${noun} con «${trimmed}».`;
  } else if (activeDoor) {
    status = `Puerta abierta: ${activeDoor.title}. Esta es la lectura de apertura, no una ficha de un documento histórico.`;
  }

  return (
    <section className="highlights" id="lecturas" aria-labelledby="lecturas-title">
      <div className="wrap">
        <div className="section-head">
          <p className="section-kicker">
            <span className="idx">06</span>
            Textos
          </p>
          <h2 id="lecturas-title">Textos seleccionados</h2>
          <p className="section-intro">
            Cuatro artículos para entrar en el sonido, la sesión, la sala y el papel.
            Son textos de esta edición, no fichas musicales ni documentos de una noche
            concreta.
          </p>
        </div>
        {status ? (
          <div className="status-row">
            <p className="note" role="status">
              {status}
            </p>
            {activeDoor && !trimmed ? (
              <button type="button" className="action" onClick={onClear}>
                Ver las cuatro puertas
              </button>
            ) : null}
          </div>
        ) : null}
        {pieces.length > 0 ? (
          <div className={`piece-list is-${mode}`}>
            {pieces.map((piece, index) => {
              const open = openId === piece.id;
              const lead = mode === "spread" && index === 0;
              return (
                <article
                  key={piece.id}
                  id={`pieza-${piece.id}`}
                  className={lead ? "piece is-lead" : "piece"}
                >
                  <div className="art">
                    <Motif kind={piece.kind} />
                    <span className="art-credit">Ilustración</span>
                  </div>
                  <div className="piece-body">
                    <p className="piece-kicker">
                      <span className="idx">{piece.index}</span>
                      {piece.kicker}
                    </p>
                    <h3>{piece.title}</h3>
                    <p>{piece.summary}</p>
                    {open ? <p className="reading">{piece.reading}</p> : null}
                    <button
                      type="button"
                      className="action"
                      aria-expanded={open}
                      onClick={() => onToggle(piece.id)}
                    >
                      {open ? "Cerrar lectura" : "Leer esta pieza"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
