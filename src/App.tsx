import { useEffect, useMemo, useState } from "react";
import { CurrentBand } from "./components/CurrentBand";
import { DoorGrid } from "./components/DoorGrid";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Highlights } from "./components/Highlights";
import { NightInside } from "./components/NightInside";
import { ArchivePage, DoorPage, ExplorePage, ProjectPage } from "./components/Pages";
import { DjsPage } from "./components/DjsPage";
import { EquipoPage, RinconPage } from "./components/LibraryPages";
import { SessionsPage } from "./components/SessionsPage";
import { ProjectBand } from "./components/ProjectBand";
import { doors, pieces } from "./data/cover";
import type { Door, Piece } from "./data/cover";
import { includesQuery } from "./lib/search";
import { scrollToId } from "./lib/scroll";
import { readSection } from "./lib/section";
import type { SectionId } from "./lib/section";

export default function App() {
  const [section, setSection] = useState<SectionId>(() => readSection());
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function onHash() {
      setSection(readSection());
      setMenuOpen(false);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    if (window.location.hash === "#la-noche") {
      scrollToId("la-noche");
      return;
    }
    window.scrollTo(0, 0);
  }, [section]);

  const visibleDoors = useMemo(
    () => doors.filter((door) => includesQuery(query, [door.title, door.summary, ...door.keywords])),
    [query],
  );

  const visiblePieces = useMemo(
    () =>
      pieces.filter((piece) =>
        includesQuery(query, [piece.title, piece.summary, piece.reading, piece.kicker, ...piece.keywords]),
      ),
    [query],
  );

  function onInicio() {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery("");
    setOpenId(null);
    if (window.location.hash !== "#inicio") {
      window.location.hash = "inicio";
      return;
    }
    setSection("inicio");
    window.scrollTo(0, 0);
  }

  function onEnter(door: Door) {
    setMenuOpen(false);
    setSearchOpen(false);
    window.location.hash = door.id;
  }

  function onSearch() {
    setMenuOpen(false);
    if (window.location.hash !== "#archivo") {
      window.location.hash = "archivo";
      return;
    }
    setSection("archivo");
    window.scrollTo(0, 0);
  }

  function onQuery(value: string) {
    setQuery(value);
  }

  const doorSection =
    section === "discos" || section === "salas" || section === "flyers" ? section : null;

  return (
    <>
      <a className="skip" href="#contenido">
        Saltar al contenido
      </a>
      <Header
        query={query}
        section={section}
        menuOpen={menuOpen}
        searchOpen={searchOpen}
        onQuery={onQuery}
        onSearch={onSearch}
        onInicio={onInicio}
        onNavigate={() => setMenuOpen(false)}
        onMenu={() => {
          setMenuOpen((open) => !open);
          setSearchOpen(false);
        }}
        onSearchToggle={() => {
          setSearchOpen((open) => !open);
          setMenuOpen(false);
        }}
        onCloseMenu={() => setMenuOpen(false)}
        onCloseSearch={() => setSearchOpen(false)}
      />
      <main id="contenido">
        {section === "inicio" ? (
          <Home
            doors={visibleDoors}
            pieces={visiblePieces}
            query={query}
            openId={openId}
            onEnter={onEnter}
            onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
            onClear={() => {
              setOpenId(null);
              setQuery("");
            }}
          />
        ) : null}
        {section === "explorar" ? <ExplorePage /> : null}
        {section === "archivo" ? <ArchivePage query={query} /> : null}
        {section === "proyecto" ? <ProjectPage /> : null}
        {section === "djs" ? <DjsPage /> : null}
        {section === "sesiones" ? <SessionsPage /> : null}
        {section === "rincon" ? <RinconPage /> : null}
        {section === "equipo" ? <EquipoPage /> : null}
        {doorSection ? <DoorPage id={doorSection} /> : null}
      </main>
      <Footer onInicio={onInicio} />
    </>
  );
}

function Home({
  doors,
  pieces,
  query,
  openId,
  onEnter,
  onToggle,
  onClear,
}: {
  doors: Door[];
  pieces: Piece[];
  query: string;
  openId: string | null;
  onEnter: (door: Door) => void;
  onToggle: (id: string) => void;
  onClear: () => void;
}) {
  const filtered = Boolean(query.trim());
  const remember = doors.filter((door) => door.id === "discos");
  const cabin = doors.filter((door) => door.id === "djs" || door.id === "sesiones");
  const places = doors.filter((door) => door.id === "salas" || door.id === "flyers");
  const workshop = doors.filter((door) => door.id === "rincon" || door.id === "equipo");
  const anyDoor = remember.length + cabin.length + places.length + workshop.length > 0;

  return (
    <>
      <Hero />
      <CurrentBand />
      {filtered && !anyDoor ? (
        <section className="doors">
          <div className="wrap">
            <p className="note">
              Ninguna sección coincide con la búsqueda. Prueba con remember, sesión, sala
              o flyer, o mira las lecturas del archivo.
            </p>
          </div>
        </section>
      ) : null}
      {remember.length > 0 ? (
        <DoorGrid
          doors={remember}
          activeId={null}
          filtered={filtered}
          onEnter={onEnter}
          sectionId="remember-esencial"
          headingId="remember-title"
          index="02"
          kicker="Clásicos"
          title="Remember esencial"
          intro="Los clásicos y el contexto del sonido. Son artículos para situar el remember, no una discografía."
        />
      ) : null}
      {cabin.length > 0 ? (
        <DoorGrid
          doors={cabin}
          activeId={null}
          filtered={filtered}
          onEnter={onEnter}
          sectionId="acceso-djs"
          headingId="djs-title"
          index="03"
          kicker="Cabina"
          title="DJs y sesiones"
          intro="Dos entradas distintas. En DJs, la biografía y la discografía con enlace al tema. En Sesiones, las mezclas para escuchar aquí. Ninguna se rellena sin comprobar."
        />
      ) : null}
      {places.length > 0 ? (
        <DoorGrid
          doors={places}
          activeId={null}
          filtered={filtered}
          onEnter={onEnter}
          sectionId="acceso-salas"
          headingId="salas-title"
          index="04"
          kicker="Historia"
          title="Salas y flyers"
          intro="La historia de las salas y el papel que quedó de aquellas noches. Los dibujos de esta web no son flyers auténticos."
        />
      ) : null}
      {workshop.length > 0 ? (
        <DoorGrid
          doors={workshop}
          activeId={null}
          filtered={filtered}
          onEnter={onEnter}
          sectionId="acceso-taller"
          headingId="taller-title"
          index="06"
          kicker="Taller"
          title="Rincón y equipo"
          intro="El bricolaje de la cabina y el material de pinchar. Las dos secciones están preparadas y, de momento, sin fichas publicadas."
        />
      ) : null}
      <NightInside />
      <Highlights
        pieces={pieces}
        openId={openId}
        query={query}
        activeDoor={null}
        onToggle={onToggle}
        onClear={onClear}
      />
      <ProjectBand />
    </>
  );
}
