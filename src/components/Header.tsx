import { useEffect, useRef } from "react";
import type { FormEvent } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#inicio", label: "Inicio", key: "inicio" },
  { href: "#explorar", label: "Makina actual", key: "explorar" },
  { href: "#discos", label: "Remember", key: "discos" },
  { href: "#djs", label: "DJs", key: "djs" },
  { href: "#sesiones", label: "Sesiones", key: "sesiones" },
  { href: "#salas", label: "Salas y flyers", key: "salas" },
  { href: "#rincon", label: "Rincón", key: "rincon" },
  { href: "#equipo", label: "Equipo", key: "equipo" },
  { href: "#archivo", label: "Archivo", key: "archivo" },
] as const;

function isCurrent(key: string, section: string) {
  if (key === "salas") return section === "salas" || section === "flyers";
  return key === section;
}

type HeaderProps = {
  query: string;
  section: string;
  menuOpen: boolean;
  searchOpen: boolean;
  onQuery: (value: string) => void;
  onSearch: () => void;
  onInicio: () => void;
  onNavigate: () => void;
  onMenu: () => void;
  onSearchToggle: () => void;
  onCloseMenu: () => void;
  onCloseSearch: () => void;
};

export function Header({
  query,
  section,
  menuOpen,
  searchOpen,
  onQuery,
  onSearch,
  onInicio,
  onNavigate,
  onMenu,
  onSearchToggle,
  onCloseMenu,
  onCloseSearch,
}: HeaderProps) {
  const firstLink = useRef<HTMLAnchorElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (menuOpen) firstLink.current?.focus();
  }, [menuOpen]);

  useEffect(() => {
    if (searchOpen) field.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (menuOpen) {
        onCloseMenu();
        menuButton.current?.focus();
      } else if (searchOpen) {
        onCloseSearch();
        searchButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, searchOpen, onCloseMenu, onCloseSearch]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch();
  }

  return (
    <header className="site-header" id="inicio">
      <div className="wrap header-bar">
        <Logo onInicio={onInicio} />
        <nav className="nav-desktop" aria-label="Secciones">
          {links.map((link) => (
            <a
              key={link.key}
              href={link.href}
              aria-current={isCurrent(link.key, section) ? "page" : undefined}
              onClick={(event) => {
                if (link.key === "inicio") {
                  event.preventDefault();
                  onInicio();
                  return;
                }
                onNavigate();
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <form
          className={searchOpen ? "search is-open" : "search"}
          role="search"
          onSubmit={submit}
        >
          <label className="sr-only" htmlFor="buscador-portada">
            Buscar DJs, sesiones o textos
          </label>
          <input
            ref={field}
            id="buscador-portada"
            type="search"
            inputMode="search"
            enterKeyHint="search"
            maxLength={80}
            placeholder="DJs, sesiones o textos"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
          />
          {query ? (
            <button type="button" className="search-clear" onClick={() => onQuery("")}>
              Limpiar
            </button>
          ) : null}
          <button type="submit" className="search-submit">
            Buscar
          </button>
        </form>
        <button
          ref={searchButton}
          type="button"
          className="search-toggle"
          aria-expanded={searchOpen}
          aria-controls="buscador-portada"
          onClick={onSearchToggle}
        >
          <SearchIcon />
          <span className="sr-only">{searchOpen ? "Ocultar el buscador" : "Mostrar el buscador"}</span>
        </button>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="menu-portada"
          onClick={onMenu}
        >
          {menuOpen ? "Cerrar" : "Menú"}
        </button>
      </div>
      <nav
        id="menu-portada"
        className={menuOpen ? "nav-mobile is-open" : "nav-mobile"}
        aria-label="Secciones"
        hidden={!menuOpen}
      >
        {links.map((link, index) => (
          <a
            key={link.key}
            ref={index === 0 ? firstLink : undefined}
            href={link.href}
            aria-current={isCurrent(link.key, section) ? "page" : undefined}
            onClick={(event) => {
              if (link.key === "inicio") {
                event.preventDefault();
                onInicio();
                return;
              }
              onNavigate();
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M14.5 14.5 L20 20" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
