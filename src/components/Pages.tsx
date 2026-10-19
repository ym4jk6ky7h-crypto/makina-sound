import { useMemo, type ReactNode } from "react";
import type { Door, Piece } from "../data/cover";
import { doors, pieces } from "../data/cover";
import { readCatalog } from "../data/catalog";
import { readDjs } from "../data/djsCatalog";
import { readVenues } from "../data/library";
import type { PageCopy } from "../data/pages";
import { archiveCopy, doorCopy, exploreCopy, projectCopy } from "../data/pages";
import { includesQuery } from "../lib/search";
import type { SectionId } from "../lib/section";
import { Motif } from "./art/Motif";
import { FlyerList, VenueList } from "./LibraryPages";
import { SessionCard } from "./SessionsPage";

function Frame({
  kicker,
  label,
  title,
  lead,
  children,
}: {
  kicker: string;
  label: string;
  title: string;
  lead: string;
  children?: ReactNode;
}) {
  return (
    <article className="sheet">
      <div className="wrap">
        <p className="back">
          <a href="#inicio">Portada</a>
        </p>
        <header className="section-head">
          <p className="section-kicker">
            <span className="idx">{kicker}</span>
            {label}
          </p>
          <h1>{title}</h1>
          <p className="section-intro">{lead}</p>
        </header>
        {children}
      </div>
    </article>
  );
}

function Essays({ page }: { page: PageCopy }) {
  return (
    <>
      {page.essays.map((essay) => (
        <section key={essay.heading} className="essay">
          <h2>{essay.heading}</h2>
          {essay.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>
      ))}
      <p className="sheet-note">{page.note}</p>
    </>
  );
}

const paths = [
  {
    href: "#explorar",
    title: "Makina actual",
    summary: "Sesiones cuyo título dice makina actual, y los DJs de esas sesiones que tienen ficha.",
  },
  {
    href: "#discos",
    title: "Remember",
    summary: "Clásicos y contexto del sonido. Artículos, no una discografía.",
  },
  {
    href: "#djs",
    title: "DJs",
    summary: "Biografía y discografía con enlace al tema. Solo si la ficha se puede firmar.",
  },
  {
    href: "#sesiones",
    title: "Sesiones",
    summary: "Sesiones de YouTube para escuchar aquí. No son fichas de canciones.",
  },
  {
    href: "#salas",
    title: "Salas",
    summary: "Historia de los cuartos. No hay un mapa de locales.",
  },
  {
    href: "#flyers",
    title: "Flyers",
    summary: "Tres carteles citados por Pont Aeri. La imagen no se copia.",
  },
  {
    href: "#archivo",
    title: "Archivo",
    summary: "Buscar textos, DJs y sesiones ya publicados.",
  },
  {
    href: "#rincon",
    title: "El rincón del DJ",
    summary: "Dos guías con pasos de una página abierta: monitores y aguja.",
  },
  {
    href: "#equipo",
    title: "Equipo DJ",
    summary: "Fotos con licencia y fichas de fabricante. Sin precios.",
  },
];

function Related({ current }: { current: string }) {
  const list = paths.filter((path) => path.href !== current);
  return (
    <nav className="jump" aria-label="Otras secciones">
      {list.map((path) => (
        <a key={path.href} href={path.href}>
          <strong>{path.title}</strong>
          <span>{path.summary}</span>
        </a>
      ))}
    </nav>
  );
}

export function ExplorePage() {
  const catalog = useMemo(() => readCatalog(), []);
  const djs = useMemo(() => readDjs(), []);
  const venues = useMemo(() => readVenues(), []);
  const names = useMemo(() => new Map(djs.map((dj) => [dj.id, dj.name])), [djs]);
  const current = useMemo(
    () =>
      catalog.sessions
        .filter((session) => session.era === "current")
        .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")),
    [catalog.sessions],
  );
  const people = useMemo(() => {
    const used = new Set(current.flatMap((session) => session.djIds ?? []));
    return djs.filter((dj) => used.has(dj.id)).sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, [current, djs]);

  return (
    <Frame
      kicker={exploreCopy.kicker}
      label={exploreCopy.label}
      title={exploreCopy.title}
      lead={exploreCopy.lead}
    >
      <p className="note">
        {current.length === 1 ? "1 sesión" : `${current.length} sesiones`}. El remember se queda
        en su sección. Un vídeo de 2026 sin esa frase en el título no entra aquí.
      </p>
      <h2 className="jump-title">Sesiones</h2>
      {current.length === 0 ? (
        <p className="note">Ninguna sesión publicada trae esa marca en el título.</p>
      ) : (
        <div className="session-grid">
          {current.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              djs={(session.djIds ?? []).flatMap((id) => {
                const name = names.get(id);
                return name ? [name] : [];
              })}
              venues={venues.filter((venue) => venue.sessionIds.includes(session.id)).map((venue) => venue.name)}
            />
          ))}
        </div>
      )}
      <h2 className="jump-title">DJs con ficha en estas sesiones</h2>
      {people.length === 0 ? (
        <p className="note">Ninguna de estas sesiones enlaza todavía con una ficha de DJ.</p>
      ) : (
        <ul className="track-links">
          {people.map((dj) => (
            <li key={dj.id}>
              <a href={`#djs/${dj.id}`}>{dj.name}</a>
            </li>
          ))}
        </ul>
      )}
      <h2 className="jump-title">Seguir hacia el resto</h2>
      <Related current="#explorar" />
    </Frame>
  );
}

export function ProjectPage() {
  return (
    <Frame kicker={projectCopy.kicker} label={projectCopy.label} title={projectCopy.title} lead={projectCopy.lead}>
      <Essays page={projectCopy} />
    </Frame>
  );
}

const emptyCatalog: Record<"discos" | "salas" | "flyers", string> = {
  discos: "No hay fichas de clásicos. Los artículos de abajo no son una discografía.",
  salas: "No hay salas documentadas. No hay mapa ni ficha de local.",
  flyers: "No hay flyers ni cintas originales. Lo dibujado en esta página es una ilustración editorial.",
};

export function DoorPage({ id }: { id: "discos" | "salas" | "flyers" }) {
  const page = doorCopy[id];
  const door = doors.find((item) => item.id === id);
  return (
    <Frame kicker={page.kicker} label={page.label} title={page.title} lead={page.lead}>
      <p className="note">{emptyCatalog[id]}</p>
      {id === "salas" ? <VenueList /> : null}
      {id === "flyers" ? <FlyerList /> : null}
      {door ? (
        <div className="sheet-art">
          <Motif kind={door.kind} />
          <span className="art-credit">Ilustración</span>
        </div>
      ) : null}
      <p className="sheet-caption">
        Ilustración editorial de esta edición. No es una fotografía, un flyer auténtico ni
        una ficha.
      </p>
      <Essays page={page} />
      <h2 className="jump-title">Otras secciones</h2>
      <Related current={`#${id}`} />
    </Frame>
  );
}

export function ArchivePage({ query }: { query: string }) {
  const catalog = useMemo(() => readCatalog(), []);
  const djs = useMemo(() => readDjs(), []);
  const pieceList = pieces.filter((piece) =>
    includesQuery(query, [piece.title, piece.summary, piece.reading, piece.kicker, ...piece.keywords]),
  );
  const doorList = doors.filter((door) => pageMatches(door, query));
  const djList = djs.filter((dj) =>
    includesQuery(query, [dj.name, ...dj.biography, ...dj.tracks.map((track) => track.title)]),
  );
  const sessionList = catalog.sessions.filter((session) =>
    includesQuery(query, [session.title, session.djName ?? ""]),
  );
  const trimmed = query.trim();
  const total = pieceList.length + doorList.length + djList.length + sessionList.length;

  return (
    <Frame kicker={archiveCopy.kicker} label={archiveCopy.label} title={archiveCopy.title} lead={archiveCopy.lead}>
      {trimmed ? (
        <p className="note" role="status">
          {total === 0
            ? `Nada publicado coincide con «${trimmed}». No hay resultados inventados.`
            : `Resultados para «${trimmed}»: ${djList.length} DJs, ${sessionList.length} sesiones, ${pieceList.length + doorList.length} textos.`}
        </p>
      ) : (
        <>
          <h2 className="jump-title">Qué puedes consultar</h2>
          <Related current="#archivo" />
          <p className="sheet-note">
            Sin una búsqueda, aquí están los artículos. Escribe un nombre para ver también
            DJs y sesiones publicados.
          </p>
        </>
      )}
      {trimmed && djList.length > 0 ? (
        <>
          <h2 className="jump-title">DJs</h2>
          <ul className="track-links">
            {djList.map((dj) => (
              <li key={dj.id}>
                <a href={`#djs/${dj.id}`}>{dj.name}</a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {trimmed && sessionList.length > 0 ? (
        <>
          <h2 className="jump-title">Sesiones</h2>
          <ul className="track-links">
            {sessionList.map((session) => (
              <li key={session.id}>
                <a href={`#sesiones/${session.id}`}>{session.title}</a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {doorList.length > 0 && trimmed ? (
        <>
          <h2 className="jump-title">Secciones</h2>
          <DoorLinksMatching doors={doorList} />
        </>
      ) : null}
      <div className="reading-list">
        {pieceList.map((piece) => (
          <article key={piece.id} className="reading-full" id={`lectura-${piece.id}`}>
            <p className="piece-kicker">
              <span className="idx">{piece.index}</span>
              Artículo editorial
            </p>
            <h2>{piece.title}</h2>
            <p>{piece.summary}</p>
            <p>{piece.reading}</p>
            <p>
              <a className="text-link" href={`#${doorIdForPiece(piece)}`}>
                Seguir en {doorTitle(piece)}
              </a>
            </p>
          </article>
        ))}
      </div>
    </Frame>
  );
}

function doorIdForPiece(piece: Piece): SectionId {
  const door = doors.find((item) => item.pieceId === piece.id);
  if (
    door?.id === "discos" ||
    door?.id === "djs" ||
    door?.id === "sesiones" ||
    door?.id === "salas" ||
    door?.id === "flyers"
  ) {
    return door.id;
  }
  return "explorar";
}

function doorTitle(piece: Piece) {
  return doors.find((item) => item.pieceId === piece.id)?.title ?? "la sección";
}

function isDoorKey(id: string): id is "discos" | "djs" | "sesiones" | "salas" | "flyers" {
  return id === "discos" || id === "djs" || id === "sesiones" || id === "salas" || id === "flyers";
}

function pageMatches(door: Door, query: string) {
  if (!isDoorKey(door.id)) return includesQuery(query, [door.title, door.summary, ...door.keywords]);
  const page = doorCopy[door.id];
  const essayText = page.essays.flatMap((essay) => [essay.heading, ...essay.paragraphs]);
  return includesQuery(query, [door.title, door.summary, page.lead, page.note, ...door.keywords, ...essayText]);
}

function DoorLinksMatching({ doors: list }: { doors: Door[] }) {
  return (
    <nav className="jump" aria-label="Secciones que coinciden">
      {list.map((door) => (
          <a key={door.id} href={`#${door.id}`}>
          <strong>{door.title}</strong>
          <span>Artículo editorial. {door.summary}</span>
        </a>
      ))}
    </nav>
  );
}
