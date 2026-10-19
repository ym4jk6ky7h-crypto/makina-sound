import { useMemo } from "react";
import { readCatalog } from "../data/catalog";

export function CurrentBand() {
  const count = useMemo(
    () => readCatalog().sessions.filter((session) => session.era === "current").length,
    [],
  );

  return (
    <section className="night" id="makina-actual" aria-labelledby="actual-title">
      <div className="wrap">
        <div className="section-head">
          <p className="section-kicker">
            <span className="idx">01</span>
            Ahora
          </p>
          <h2 id="actual-title">Makina actual</h2>
          <p className="section-intro">
            La sección está cerrada. Entra una sesión cuando su título dice makina
            actual. La fecha del vídeo no cambia esa marca.
          </p>
        </div>
        <p className="note">
          {count === 1 ? "Hay 1 sesión" : `Hay ${count} sesiones`} con esa marca, y los
          DJs con ficha que salen en ellas. No hay un catálogo aparte de productores ni
          de lanzamientos.
        </p>
        <p>
          <a className="cta" href="#explorar">
            Entrar en Makina actual
          </a>
        </p>
      </div>
    </section>
  );
}
