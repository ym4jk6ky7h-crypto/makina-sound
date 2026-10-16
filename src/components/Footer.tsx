type FooterProps = {
  onInicio: () => void;
};

const links = [
  { href: "#explorar", label: "Makina actual" },
  { href: "#discos", label: "Remember" },
  { href: "#djs", label: "DJs" },
  { href: "#sesiones", label: "Sesiones" },
  { href: "#salas", label: "Salas y flyers" },
  { href: "#rincon", label: "El rincón del DJ" },
  { href: "#equipo", label: "Equipo DJ" },
  { href: "#archivo", label: "Archivo" },
  { href: "#proyecto", label: "El proyecto" },
];

export function Footer({ onInicio }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <p className="footer-name">
            Makina <span>Sound</span>
          </p>
          <p>Del remember al sonido de hoy</p>
        </div>
        <nav aria-label="Enlaces del pie">
          <a
            href="#inicio"
            onClick={(event) => {
              event.preventDefault();
              onInicio();
            }}
          >
            Inicio
          </a>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="wrap footer-note">
        Ilustraciones originales de esta edición. No documentan salas, flyers ni
        fotografías históricas. MAKINA SOUND, 2026.
      </p>
    </footer>
  );
}
