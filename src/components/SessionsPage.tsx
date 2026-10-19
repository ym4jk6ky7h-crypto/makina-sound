import { useEffect, useMemo, useState } from "react";
import { readCatalog } from "../data/catalog.ts";
import { readDjs } from "../data/djsCatalog.ts";
import { readVenues } from "../data/library.ts";
import { doorCopy } from "../data/pages.ts";
import type { EraFilter, SessionRecord, SessionSort } from "../lib/sessions.ts";
import { readFocus } from "../lib/section.ts";
import { filterSessions, sessionThumbnailUrl } from "../lib/sessions.ts";
import { SessionPlayer } from "./SessionPlayer.tsx";

const filters: { id: EraFilter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "remember", label: "Remember" },
  { id: "current", label: "Makina actual" },
];

const sorts: { id: SessionSort; label: string }[] = [
  { id: "date-desc", label: "Publicación, más reciente" },
  { id: "date-asc", label: "Publicación, más antigua" },
  { id: "name", label: "Nombre" },
  { id: "views", label: "Más vistas" },
  { id: "duration", label: "Más largas" },
];

function formatViews(count: number): string {
  const formatted = new Intl.NumberFormat("es").format(count);
  return count === 1 ? `${formatted} vista` : `${formatted} vistas`;
}

function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);
  if (hours > 0 && minutes > 0) return `${hours} h ${minutes} min`;
  if (hours > 0) return `${hours} h`;
  return `${minutes} min`;
}

function formatDate(value: string): string {
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function SessionsPage() {
  const catalog = useMemo(() => readCatalog(), []);
  const djs = useMemo(() => readDjs().map((dj) => ({ id: dj.id, name: dj.name })), []);
  const venues = useMemo(
    () => readVenues().map((venue) => ({ id: venue.id, name: venue.name, sessionIds: venue.sessionIds })),
    [],
  );
  const names = useMemo(() => new Map(djs.map((dj) => [dj.id, dj.name])), [djs]);
  const [text, setText] = useState("");
  const [era, setEra] = useState<EraFilter>("all");
  const [sort, setSort] = useState<SessionSort>("date-desc");
  const [djId, setDjId] = useState("");
  const [venueId, setVenueId] = useState("");
  const [focus, setFocus] = useState(() => readFocus());

  useEffect(() => {
    function onHash() {
      setFocus(readFocus());
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [focus]);

  const djOptions = useMemo(() => {
    const used = new Set(catalog.sessions.flatMap((session) => session.djIds ?? []));
    return djs.filter((dj) => used.has(dj.id)).sort((a, b) => a.name.localeCompare(b.name, "es"));
  }, [catalog.sessions, djs]);
  const venueOptions = useMemo(
    () => venues.filter((venue) => venue.sessionIds.some((id) => catalog.sessions.some((session) => session.id === id))),
    [catalog.sessions, venues],
  );
  const venueSessions = venueOptions.find((venue) => venue.id === venueId)?.sessionIds;
  const visible = useMemo(
    () => filterSessions(
      catalog.sessions,
      { text, era, sort, djId, venueSessionIds: venueId ? venueSessions ?? [] : undefined },
      names,
    ),
    [catalog.sessions, djId, era, names, sort, text, venueId, venueSessions],
  );
  const focused = catalog.sessions.find((session) => session.id === focus) ?? null;
  const filtered = text.trim().length > 0 || era !== "all" || sort !== "date-desc" || djId !== "" || venueId !== "";
  const withDjs = catalog.sessions.filter((session) => (session.djIds?.length ?? 0) > 0).length;
  const withRooms = catalog.sessions.filter((session) => venues.some((venue) => venue.sessionIds.includes(session.id))).length;
  const page = doorCopy.sesiones;

  function clearFilters() {
    setText("");
    setEra("all");
    setSort("date-desc");
    setDjId("");
    setVenueId("");
  }

  if (focus && !focused) {
    return (
      <article className="sheet dj-archive">
        <div className="wrap">
          <p className="back"><a href="#sesiones">Volver a Sesiones</a></p>
          <header className="dj-mast">
            <h1>Sesión no encontrada</h1>
            <p>No hay una sesión publicada con el identificador «{focus}».</p>
          </header>
        </div>
      </article>
    );
  }

  if (focused) {
    return (
      <SessionFile
        session={focused}
        djs={djs.filter((dj) => focused.djIds?.includes(dj.id))}
        venues={venues.filter((venue) => venue.sessionIds.includes(focused.id))}
      />
    );
  }

  return (
    <article className="sheet dj-archive">
      <div className="wrap">
        <header className="dj-mast">
          <div>
            <p className="dj-kicker">Archivo</p>
            <h1>{page.title}</h1>
            <p className="dj-lead">{page.lead}</p>
            <dl className="dj-stats">
              <div><dt>Con DJ</dt><dd>{withDjs}</dd></div>
              <div><dt>Con sala</dt><dd>{withRooms}</dd></div>
              <div><dt>Con fecha de publicación</dt><dd>{catalog.sessions.filter((session) => session.publishedAt).length}</dd></div>
            </dl>
          </div>
          <p className="dj-count" aria-label={`${catalog.sessions.length} sesiones`}>
            <span className="dj-count-num">{visible.length === catalog.sessions.length ? catalog.sessions.length : visible.length}</span>
            <span className="dj-count-label">
              {visible.length === catalog.sessions.length ? "sesiones en el archivo" : `de ${catalog.sessions.length}`}
            </span>
          </p>
        </header>

        <section className="session-tools" aria-label="Buscar y filtrar sesiones">
          <form className="session-search" role="search" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="buscar-sesiones">Buscar por título o DJ</label>
            <input
              id="buscar-sesiones"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Título o nombre del DJ"
            />
          </form>
          <label className="session-filters">
            DJ
            <select value={djId} onChange={(event) => setDjId(event.target.value)}>
              <option value="">Todos</option>
              {djOptions.map((dj) => <option key={dj.id} value={dj.id}>{dj.name}</option>)}
            </select>
          </label>
          <label className="session-filters">
            Sala
            <select value={venueId} onChange={(event) => setVenueId(event.target.value)}>
              <option value="">Todas</option>
              {venueOptions.map((venue) => <option key={venue.id} value={venue.id}>{venue.name}</option>)}
            </select>
          </label>
          <label className="session-filters">
            Orden
            <select value={sort} onChange={(event) => setSort(event.target.value as SessionSort)}>
              {sorts.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
            </select>
          </label>
          <div className="era-filters" role="group" aria-label="Filtrar por época del título">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={era === filter.id ? "is-selected" : undefined}
                aria-pressed={era === filter.id}
                onClick={() => setEra(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>
          {filtered ? <button className="dj-clear" type="button" onClick={clearFilters}>Quitar filtros</button> : null}
        </section>

        {visible.length === 0 ? (
          <p className="dj-empty" role="status">Ninguna sesión coincide. Prueba con otro título o quita los filtros.</p>
        ) : (
          <ul className="session-grid">
            {visible.map((session) => (
              <li key={session.id}>
                <SessionCard
                  session={session}
                  djs={(session.djIds ?? []).flatMap((id) => {
                    const name = names.get(id);
                    return name ? [name] : [];
                  })}
                  venues={venues.filter((venue) => venue.sessionIds.includes(session.id)).map((venue) => venue.name)}
                />
              </li>
            ))}
          </ul>
        )}
        <p className="sheet-note">
          La fecha de cada ficha es la de publicación del vídeo, no la de la noche. Entran sesiones
          y mezclas comprobadas. Anuncios, entrevistas y videoclips se quedan fuera. Las vistas y la
          duración son las de YouTube en el momento de catalogar la ficha.
        </p>
        {page.essays.map((essay) => (
          <section key={essay.heading} className="essay">
            <h2>{essay.heading}</h2>
            {essay.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <p className="sheet-note">{page.note}</p>
      </div>
    </article>
  );
}

function SessionFile({
  session,
  djs,
  venues,
}: {
  session: SessionRecord;
  djs: { id: string; name: string }[];
  venues: { id: string; name: string }[];
}) {
  return (
    <article className="sheet dj-archive dj-file">
      <div className="wrap">
        <p className="back"><a href="#sesiones">Volver a Sesiones</a></p>
        <header className="dj-file-head">
          <div className="dj-file-title">
            <p className="dj-kicker">Ficha</p>
            <h1>{session.title}</h1>
            {session.publishedAt ? (
              <p className="dj-count">Publicada el <time dateTime={session.publishedAt}>{formatDate(session.publishedAt)}</time></p>
            ) : null}
          </div>
          <p className="dj-lead">La fecha es la de publicación del vídeo en YouTube, no la de la actuación.</p>
        </header>
        <SessionPlayer session={session} />
        <section className="dj-block">
          {session.djName ? <p>Nombre en el catálogo: {session.djName}</p> : null}
          <p>Canal: {session.channelName}</p>
          {session.durationSeconds ? <p>Duración: {formatDuration(session.durationSeconds)}</p> : null}
          {session.viewCount !== undefined ? <p>{formatViews(session.viewCount)} en YouTube al catalogar la ficha.</p> : null}
          {session.era === "remember" ? <p>El título indica remember.</p> : null}
          {session.era === "current" ? <p>El título indica makina actual.</p> : null}
        </section>
        {djs.length > 0 ? (
          <section className="dj-block">
            <h2>DJs en el archivo</h2>
            <ul className="dj-link-list">
              {djs.map((dj) => <li key={dj.id}><a href={`#djs/${dj.id}`}>{dj.name}</a></li>)}
            </ul>
          </section>
        ) : null}
        {venues.length > 0 ? (
          <section className="dj-block">
            <h2>Sala</h2>
            <ul className="dj-link-list">
              {venues.map((venue) => <li key={venue.id}><a href={`#salas/${venue.id}`}>{venue.name}</a></li>)}
            </ul>
          </section>
        ) : null}
        <section className="dj-block dj-sources">
          <h2>Reproducción</h2>
          <ul>
            <li>
              <a href={session.youtubeUrl} rel="noreferrer">Abrir en YouTube</a>
              <span>Enlace original del vídeo. No es una fecha de la noche.</span>
            </li>
            {session.sourceUrl !== session.youtubeUrl ? (
              <li>
                <a href={session.sourceUrl} rel="noreferrer">Procedencia</a>
                <span>Página de la que salió la ficha.</span>
              </li>
            ) : null}
          </ul>
        </section>
      </div>
    </article>
  );
}

export function SessionCard({
  session,
  djs,
  venues,
}: {
  session: SessionRecord;
  djs: string[];
  venues: string[];
}) {
  const thumb = sessionThumbnailUrl(session);
  const who = djs.length > 0 ? djs.join(", ") : session.djName;
  return (
    <a className="session-card" href={`#sesiones/${session.id}`}>
      {thumb ? <img src={thumb} alt="" width={480} height={270} loading="lazy" /> : <span className="session-plate" aria-hidden="true">Sesión</span>}
      <span className="session-copy">
        {session.era === "remember" ? <span className="era">Remember</span> : null}
        {session.era === "current" ? <span className="era">Actual</span> : null}
        <span className="session-title">{session.title}</span>
        {who ? <span>{who}</span> : null}
        {venues.length > 0 ? <span>{venues.join(", ")}</span> : null}
        {session.publishedAt ? (
          <time dateTime={session.publishedAt}>Publicada el {formatDate(session.publishedAt)}</time>
        ) : null}
      </span>
    </a>
  );
}