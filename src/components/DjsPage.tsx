import { useEffect, useMemo, useState } from "react";
import { readCatalog } from "../data/catalog.ts";
import { readDjs } from "../data/djsCatalog.ts";
import type { DjSort } from "../lib/djs.ts";
import { describeDjScreen, mediaPlayer } from "../lib/djView.ts";
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
  const [text, setText] = useState("");
  const [sort, setSort] = useState<DjSort>("name");
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
    () => describeDjScreen(focus, djs, catalog.sessions, { text, sort }),
    [catalog.sessions, djs, focus, sort, text],
  );

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
                <label htmlFor="buscar-djs">Buscar por nombre</label>
                <input
                  id="buscar-djs"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  placeholder="Nombre del DJ"
                />
              </form>
              <label className="dj-sort">
                Orden
                <select value={sort} onChange={(event) => setSort(event.target.value as DjSort)}>
                  {sorts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </section>
            {screen.cards.length === 0 ? (
              <p className="dj-empty" role="status">Ningún DJ coincide. Prueba con otro nombre.</p>
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
                        {dj.hint ? <span className="dj-card-hint">{dj.hint}</span> : null}
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
          <h3>Producciones</h3>
          {profile.productionsEmpty ? (
            <p className="dj-empty">{profile.productionsEmpty}</p>
          ) : (
            <ReleaseGrid
              group={{ role: "produced", title: "Para otros artistas", tracks: profile.productions }}
              playingKey={playingKey}
              onPlay={onPlay}
              hideTitle
            />
          )}
        </section>
        <section className="dj-block" aria-labelledby="sesiones-dj">
          <h2 id="sesiones-dj">Sesiones</h2>
          {profile.sessionsEmpty ? (
            <p className="dj-empty">{profile.sessionsEmpty}</p>
          ) : (
            <SessionBlock sessions={profile.sessions} playingKey={playingKey} onPlay={onPlay} />
          )}
        </section>
        {profile.links.length > 0 ? (
          <section className="dj-block dj-sources" aria-labelledby="fuentes-dj">
            <h2 id="fuentes-dj">Fuentes</h2>
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
