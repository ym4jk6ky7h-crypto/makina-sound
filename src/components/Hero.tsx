import { RoomCollage } from "./art/RoomCollage";

function Pulse() {
  return (
    <span className="pulse" aria-hidden="true">
      {Array.from({ length: 9 }, (_, index) => (
        <span key={index} style={{ animationDelay: `${(index % 5) * 0.12}s` }} />
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-haze" aria-hidden="true" />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">
            <Pulse />
            Un archivo vivo de la música Makina
          </p>
          <h1 id="hero-title">
            <span className="hero-line">Del remember</span>
            <span className="hero-line hero-line-mark">al sonido de hoy.</span>
          </h1>
          <p className="dek">
            Los clásicos que nos marcaron, los productores que siguen creando y una
            cultura Makina que continúa viva.
          </p>
          <div className="hero-actions">
            <a className="cta" href="#la-noche">
              Entrar en la sala
            </a>
            <a className="cta cta-ghost" href="#explorar">
              Explorar la makina
            </a>
          </div>
        </div>
        <figure className="hero-figure">
          <div className="hero-frame">
            <RoomCollage />
            <span className="tape">Sala y collage</span>
          </div>
          <figcaption>
            Ilustración original: una sala vista hacia la cabina, con luces y un collage
            de carteles dibujados para esta portada. No es una fotografía ni reproduce
            un local o un flyer real.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
