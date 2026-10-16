export function ProjectBand() {
  return (
    <section className="project" id="proyecto" aria-labelledby="proyecto-title">
      <div className="wrap project-grid">
        <div>
          <p className="section-kicker">
            <span className="idx">07</span>
            La publicación
          </p>
          <h2 id="proyecto-title">El proyecto</h2>
          <blockquote>
            <p>Del remember al sonido de hoy.</p>
          </blockquote>
        </div>
        <div className="project-copy">
          <p>
            MAKINA SOUND es un archivo vivo de la música Makina. Conecta el remember
            con lo que se produce hoy: los clásicos, los productores que siguen en
            activo y la cultura de la sala. Sirve para quien la bailó y para quien la
            descubre ahora.
          </p>
          <p>
            Esta pantalla es la portada, no un catálogo de lanzamientos. Los textos
            explican el sonido y la cultura. Una ficha solo entrará con fuente. Nada de
            lo dibujado aquí es una fotografía histórica.
          </p>
          <p>
            <a className="text-link" href="#archivo">
              Ir al archivo
            </a>
            {" · "}
            <a className="text-link" href="#proyecto">
              Leer el proyecto
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
