export function CurrentBand() {
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
            Aquí entra lo que se produce hoy: productores en activo, lanzamientos y
            sesiones recientes. Por ahora es una introducción. No hay fichas mientras
            un dato no tenga fuente.
          </p>
        </div>
        <p className="note">
          Todavía no hay lanzamientos, productores ni sesiones actuales publicados.
          Cuando existan, se distinguirán de los artículos y de las ilustraciones.
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
