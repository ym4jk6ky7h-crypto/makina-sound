type LogoProps = {
  onInicio: () => void;
};

export function Logo({ onInicio }: LogoProps) {
  return (
    <a
      className="logo"
      href="#inicio"
      onClick={(event) => {
        event.preventDefault();
        onInicio();
      }}
    >
      <span className="logo-word">Makina</span>
      <span className="logo-sound">Sound</span>
      <span className="logo-desc">Del remember al sonido de hoy</span>
    </a>
  );
}
