import { useEffect, useMemo, useState } from "react";
import { readCatalog } from "../data/catalog.ts";
import { readDjs } from "../data/djsCatalog.ts";
import { readVenues } from "../data/library.ts";
import { venuesForDj } from "../lib/places.ts";
import type { DjSort } from "../lib/djs.ts";
import { describeDjScreen, mediaPlayer } from "../lib/djView.ts";
import type { DjContentFilter } from "../lib/djView.ts";
import type { DjProfileView, PlayableMedia } from "../lib/djView.ts";
import { readFocus } from "../lib/section.ts";
import { SessionPlayer } from "./SessionPlayer.tsx";
import { DjPortrait } from "./djs/DjPortrait.tsx";
import { ReleaseGrid } from "./djs/ReleaseGrid.tsx";
import { SessionBlock } from "./djs/SessionBlock.tsx";

const sorts: { id: DjSort; label: string }[] = [
  { id: "name", label: "Nombre" },
  { id: "date-desc", label: "Desde el más reciente" },
  { id: "date-asc", label: "Desde 1995" },
  { id: "records", label: "Con más registros" },
];

const contents: { id: DjContentFilter; label: string }[] = [
  { id: "all", label: "Todo el archivo" },
  { id: "discografia", label: "Con discografía" },
  { id: "sesiones", label: "Con sesiones" },
  { id: "sala", label: "Con sala" },
];

function reviewLabel(value: string): string {
  const [year, month, day] = value.split("-");
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const name = months[Number(month) - 1];
  if (!name || !day || !year) return value;
  return `${Number(day)} de ${name} de ${year}`;
}

export function DjsPage() {
  const djs = useMemo(() => readDjs(), []);
  const catalog = useMemo(() => readCatalog(), []);
  const rooms = useMemo(
    () => readVenues().map((venue) => ({ id: venue.id, name: venue.name, djIds: venue.djIds })),
    [],
  );
  const [text, setText] = useState("");
  const [sort, setSort] = useState<DjSort>("name");
  const [content, setContent] = useState<DjContentFilter>("all");
  const [room, setRoom] = useState("");
  const [focus, setFocus] = useState(() => readFocus());
  const [playingKey, setPlayingKey] = useState<string | null>(null);

  useEffect(() => {
    function onHash() {
      setFocus(readFocus());
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    setPlayingKey(null);
    window.scrollTo(0, 0);
  }, [focus]);

  const screen = useMemo(
    () => describeDjScreen(focus, djs, catalog.sessions, { text, sort, content, room }, rooms),
    [catalog.sessions, content, djs, focus, room, rooms, sort, text],
  );
  const filtered = text.trim().length > 0 || content !== "all" || room !== "" || sort !== "name";
  function clearFilters() {
    setText("");
    setSort("name");
    setContent("all");
    setRoom("");
  }

  if (screen.kind === "missing") {
    return (
      <article className="sheet dj-archive">
        <div className="wrap">
          <p className="back">
            <a href={screen.backHref}>Volver a DJs</a>
          </p>
          <header className="dj-mast">
            <h1>DJ no encontrado</h1>
            <p>No hay una ficha con el identificador «{screen.id}».</p>
          </header>
        </div>
      </article>
    );
  }

  if (screen.kind === "profile") {
    return <DjProfilePage profile={screen.profile} playingKey={playingKey} onPlay={setPlayingKey} />;
  }

  const totalLabel = djs.length === 1 ? "1 artista" : `${djs.length} artistas`;
  const visibleLabel = screen.cards.length === djs.length
    ? totalLabel
    : `${screen.cards.length} de ${djs.length}`;

  return (
    <article className="sheet dj-archive">
      <div className="wrap">
        <header className="dj-mast">
          <div>
            <p className="dj-kicker">Archivo</p>
            <h1>{screen.title}</h1>
            <p className="dj-lead">
              Artistas de mákina y remember con trayectoria y una fuente que se puede abrir. Un nombre en un cartel no basta para entrar.
            </p>
            {screen.kind === "directory" ? (
              <dl className="dj-stats">
                <div><dt>Con discografía</dt><dd>{screen.counts.withReleases}</dd></div>
                <div><dt>Con sesiones</dt><dd>{screen.counts.withSessions}</dd></div>
                <div><dt>Con sala</dt><dd>{screen.counts.withRooms}</dd></div>
              </dl>
            ) : null}
          </div>
          <p className="dj-count" aria-label={visibleLabel}>
            <span className="dj-count-num">{screen.cards.length}</span>
            <span className="dj-count-label">
              {screen.cards.length === djs.length ? "artistas en el archivo" : `de ${djs.length}`}
            </span>
          </p>
        </header>
        {djs.length === 0 ? (
          <p className="dj-empty">Todavía no hay fichas de DJ.</p>
        ) : (
          <>
            <section className="dj-tools" aria-label="Buscar DJs">
              <form className="dj-search" role="search" onSubmit={(event) => event.preventDefault()}>
                <label htmlFor="buscar-djs">Buscar por nombre o sala</label>
                <input
                  id="buscar-djs"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Nombre del DJ o sala"
                />
              </form>
              <label className="dj-sort">
                Contenido
                <select value={content} onChange={(event) => setContent(event.target.value as DjContentFilter)}>
                  {contents.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </label>
              <label className="dj-sort">
                Sala
                <select value={room} onChange={(event) => setRoom(event.target.value)}>
                  <option value="">Todas</option>
                  {rooms.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>
              </label>
              <label className="dj-sort">
                Orden
                <select value={sort} onChange={(event) => setSort(event.target.value as DjSort)}>
                  {sorts.map((item) => (
                    <option key={item.id} value={item.id}>{item.label}</option>
                  ))}
                </select>
              </label>
              {filtered ? (
                <button className="dj-clear" type="button" onClick={clearFilters}>Quitar filtros</button>
              ) : null}
            </section>
            {screen.cards.length === 0 ? (
              <p className="dj-empty" role="status">
                Ningún DJ coincide. Prueba con otro nombre o quita los filtros.
              </p>
            ) : (
              <ul className="dj-gallery">
                {screen.cards.map((dj) => (
                  <li key={dj.id}>
                    <a className="dj-card" href={dj.href}>
                      <DjPortrait name={dj.name} image={dj.image} />
                      <span className="dj-card-copy">
                        <span className="dj-card-name">{dj.name}</span>
                        {dj.facts.map((fact) => (
                          <span key={fact} className="dj-card-meta">{fact}</span>
                        ))}
                        {dj.marks.map((mark) => (
                          <span key={mark} className="dj-card-hint">{mark}</span>
                        ))}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </article>
  );
}

function DjProfilePage({
  profile,
  playingKey,
  onPlay,
}: {
  profile: DjProfileView;
  playingKey: string | null;
  onPlay: (key: string) => void;
}) {
  const rooms = venuesForDj(profile.id, readVenues());
  const playing = playingSource(profile, playingKey);
  const player = mediaPlayer(playing);
  const [lead, ...rest] = profile.biography;
  useEffect(() => {
    if (!playingKey) return;
    document.getElementById("reproductor-dj")?.scrollIntoView({ block: "nearest" });
  }, [playingKey]);
  return (
    <article className="sheet dj-archive dj-file">
      <div className="wrap">
        <p className="back">
          <a href={profile.backHref}>Volver a DJs</a>
        </p>
        <header className="dj-file-head">
          <DjPortrait name={profile.name} image={profile.image} caption large />
          <div className="dj-file-title">
            <p className="dj-kicker">Ficha</p>
            <h1>{profile.name}</h1>
            {profile.years ? <p className="dj-count">{profile.years}</p> : null}
          </div>
          {lead ? <p className="dj-lead">{lead}</p> : null}
        </header>
        {rest.length > 0 || profile.stages.length > 0 ? (
          <section className="dj-block" aria-labelledby="trayectoria">
            <h2 id="trayectoria">Trayectoria</h2>
            {rest.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {profile.stages.map((stage) => (
              <section key={stage.id}>
                <h3>{stage.heading}</h3>
                <p>{stage.text}</p>
              </section>
            ))}
          </section>
        ) : null}
        {player ? <ProfilePlayer player={player} name={profile.name} /> : null}
        <section className="dj-block" aria-labelledby="discografia">
          <h2 id="discografia">Discografía</h2>
          {profile.reviewedAt ? (
            <p className="dj-quiet">
              Discografía comprobada el {reviewLabel(profile.reviewedAt)}. No se publica un crédito que no se pueda firmar. Si falta la portada, no había una imagen que coincidiera con esa referencia.
            </p>
          ) : null}
          {profile.artistEmpty ? <p className="dj-empty">{profile.artistEmpty}</p> : null}
          {profile.artistGroups.map((group) => (
            <ReleaseGrid key={group.role} group={group} playingKey={playingKey} onPlay={onPlay} />
          ))}
          {profile.productions.length > 0 ? (
            <>
              <h3>Producciones</h3>
              <ReleaseGrid
                group={{ role: "produced", title: "Para otros artistas", tracks: profile.productions }}
                playingKey={playingKey}
                onPlay={onPlay}
                hideTitle
              />
            </>
          ) : null}
        </section>
        <section className="dj-block" aria-labelledby="sesiones-dj">
          <h2 id="sesiones-dj">Sesiones</h2>
          {profile.sessionsEmpty ? (
            <p className="dj-empty">{profile.sessionsEmpty}</p>
          ) : (
            <SessionBlock sessions={profile.sessions} playingKey={playingKey} onPlay={onPlay} />
          )}
        </section>
        {rooms.length > 0 ? (
          <section className="dj-block" aria-labelledby="salas-dj">
            <h2 id="salas-dj">Salas</h2>
            <ul className="dj-link-list">
              {rooms.map((room) => (
                <li key={room.id}><a href={`#salas/${room.id}`}>{room.name}</a></li>
              ))}
            </ul>
          </section>
        ) : null}
        {profile.links.length > 0 ? (
          <section className="dj-block dj-sources" aria-labelledby="fuentes-dj">
            <h2 id="fuentes-dj">Fuentes</h2>
            <p className="dj-quiet">La biografía sale de estas páginas. El enlace no añade un dato que el texto no diga.</p>
            <ul>
              {profile.links.map((link) => (
                <li key={link.url}>
                  <a href={link.url} rel="noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}

function playingSource(
  profile: DjProfileView,
  playingKey: string | null,
): { title: string; youtubeVideoId?: string; youtubeUrl?: string } | null {
  if (!playingKey) return null;
  const separator = playingKey.indexOf(":");
  const kind = playingKey.slice(0, separator);
  const id = playingKey.slice(separator + 1);
  if (kind === "session") {
    const session = profile.sessions.find((item) => item.id === id);
    return session
      ? { title: session.title, youtubeVideoId: session.youtubeVideoId, youtubeUrl: session.youtubeUrl }
      : null;
  }
  if (kind === "track") {
    const tracks = [...profile.artistGroups.flatMap((group) => group.tracks), ...profile.productions];
    const track = tracks.find((item) => item.id === id);
    return track
      ? { title: track.title, youtubeVideoId: track.youtubeVideoId, youtubeUrl: track.youtubeUrl }
      : null;
  }
  return null;
}

function ProfilePlayer({ player, name }: { player: PlayableMedia; name: string }) {
  return (
    <section className="featured-session" id="reproductor-dj" aria-label="Reproductor">
      <SessionPlayer
        session={{
          youtubeVideoId: player.youtubeVideoId,
          title: `${name}: ${player.title}`,
          youtubeUrl: player.youtubeUrl,
        }}
      />
    </section>
  );
}
