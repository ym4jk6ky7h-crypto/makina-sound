import { useEffect, useMemo, useRef, useState } from "react";
import { readCatalog } from "../data/catalog.ts";
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
  { id: "date-desc", label: "Fecha, más reciente" },
  { id: "date-asc", label: "Fecha, más antigua" },
  { id: "name", label: "Nombre" },
  { id: "views", label: "Más vistas" },
  { id: "duration", label: "Más largas" },
];

const listTitles: Record<SessionSort, string> = {
  "date-desc": "Últimas sesiones",
  "date-asc": "Sesiones más antiguas",
  name: "Por nombre",
  views: "Más vistas",
  duration: "Sesiones más largas",
};

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
  const [text, setText] = useState("");
  const [era, setEra] = useState<EraFilter>("all");
  const [sort, setSort] = useState<SessionSort>("date-desc");
  const [selectedId, setSelectedId] = useState(() => {
    const focus = readFocus();
    return catalog.sessions.some((session) => session.id === focus) ? focus : (catalog.sessions[0]?.id ?? "");
  });
  const visible = useMemo(
    () => filterSessions(catalog.sessions, { text, era, sort }),
    [catalog.sessions, text, era, sort],
  );
  const selected = catalog.sessions.find((session) => session.id === selectedId) ?? null;
  const page = doorCopy.sesiones;
  const firstPick = useRef(true);

  useEffect(() => {
    if (firstPick.current) return;
    document.getElementById("sesion-destacada")?.scrollIntoView({ block: "nearest" });
  }, [selectedId]);

  useEffect(() => {
    function onHash() {
      const focus = readFocus();
      if (catalog.sessions.some((session) => session.id === focus)) setSelectedId(focus);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [catalog.sessions]);

  return (
    <article className="sheet">
      <div className="wrap">
        <p className="back">
          <a href="#inicio">Portada</a>
        </p>
        <header className="section-head">
          <p className="section-kicker">
            <span className="idx">{page.kicker}</span>
            {page.label}
          </p>
          <h1>{page.title}</h1>
          <p className="section-intro">{page.lead}</p>
        </header>

        {catalog.sessions.length === 0 || !selected ? (
          <p className="note">
            Todavía no hay sesiones publicadas en este listado. Solo entran vídeos reales de YouTube,
            de canales confirmados, cuando el título y la fecha de publicación se han comprobado. La
            actualización automática no está conectada.
          </p>
        ) : (
          <section className="featured-session" id="sesion-destacada" aria-label="Sesión destacada">
            <SessionPlayer session={selected} />
            <div className="featured-copy">
              <h2>{selected.title}</h2>
              {selected.djName ? <p>DJ: {selected.djName}</p> : null}
              <p>Canal: {selected.channelName}</p>
              {selected.publishedAt ? (
                <p>
                  Publicada el <time dateTime={selected.publishedAt}>{formatDate(selected.publishedAt)}</time>
                </p>
              ) : null}
              {selected.viewCount !== undefined ? <p>{formatViews(selected.viewCount)}</p> : null}
              {selected.durationSeconds ? <p>Duración: {formatDuration(selected.durationSeconds)}</p> : null}
            </div>
          </section>
        )}

        <section className="session-tools" aria-label="Buscar y filtrar sesiones">
          <form
            className="session-search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <label htmlFor="buscar-sesiones">Nombre</label>
            <input
              id="buscar-sesiones"
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Título o DJ"
            />
          </form>
          <div className="session-filters">
            <label>
              Orden
              <select value={sort} onChange={(event) => setSort(event.target.value as SessionSort)}>
                {sorts.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="era-filters" role="group" aria-label="Filtrar por época">
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
        </section>

        <h2 className="jump-title">{listTitles[sort]}</h2>
        {catalog.sessions.length === 0 ? null : visible.length === 0 ? (
          <p className="note" role="status">
            Ninguna sesión coincide. Prueba con otro nombre o vuelve a Todas.
          </p>
        ) : (
          <ul className="session-grid">
            {visible.map((session) => (
              <li key={session.youtubeVideoId}>
                <SessionCard
                  session={session}
                  selected={session.id === selectedId}
                  onSelect={() => {
                    firstPick.current = false;
                    setSelectedId(session.id);
                  }}
                />
              </li>
            ))}
          </ul>
        )}
        <p className="sheet-note">
          El listado no es el archivo completo de la escena y no se filtra por canal. Entran sesiones
          y mezclas comprobadas. Anuncios, entrevistas y videoclips se quedan fuera. La fecha es la
          de publicación del vídeo. Las vistas y la duración son las de YouTube en el momento de
          comprobar la ficha; no se actualizan solas.
        </p>

        {page.essays.map((essay) => (
          <section key={essay.heading} className="essay">
            <h2>{essay.heading}</h2>
            {essay.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <p className="sheet-note">{page.note}</p>
      </div>
    </article>
  );
}

function SessionCard({
  session,
  selected,
  onSelect,
}: {
  session: SessionRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  const thumb = sessionThumbnailUrl(session);
  return (
    <button
      type="button"
      className={selected ? "session-card is-selected" : "session-card"}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {thumb ? <img src={thumb} alt="" width={480} height={270} loading="lazy" /> : null}
      <span className="session-copy">
        {session.era === "remember" ? <span className="era">Remember</span> : null}
        {session.era === "current" ? <span className="era">Actual</span> : null}
        <span className="session-title">{session.title}</span>
        <span>{session.channelName}</span>
        {session.djName ? <span>{session.djName}</span> : null}
        {session.publishedAt ? (
          <time dateTime={session.publishedAt}>{formatDate(session.publishedAt)}</time>
        ) : null}
        {session.viewCount !== undefined ? <span>{formatViews(session.viewCount)}</span> : null}
        {session.durationSeconds ? <span>{formatDuration(session.durationSeconds)}</span> : null}
      </span>
    </button>
  );
}
