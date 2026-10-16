import { useState } from "react";
import type { PlayableMedia } from "../../lib/djView.ts";
import { mediaPlayer } from "../../lib/djView.ts";
import type { SessionRecord } from "../../lib/sessions.ts";
import { sessionThumbnailUrl } from "../../lib/sessions.ts";

const PAGE = 8;

export function SessionBlock({
  sessions,
  sessionVenues,
  playingKey,
  onPlay,
}: {
  sessions: SessionRecord[];
  sessionVenues?: ReadonlyMap<string, { id: string; name: string }[]>;
  playingKey: string | null;
  onPlay: (key: string) => void;
}) {
  const [shown, setShown] = useState(PAGE);
  const visible = sessions.slice(0, shown);
  const rest = sessions.length - visible.length;
  return (
    <>
      <p className="dj-quiet">Salen del catálogo de sesiones. La fecha es la de publicación del vídeo, no la de la fiesta.</p>
      <ul className="dj-sessions">
        {visible.map((session) => {
          const thumb = sessionThumbnailUrl(session);
          const playable: PlayableMedia | null = mediaPlayer(session);
          return (
            <li key={session.id}>
              <article className={playingKey === `session:${session.id}` ? "dj-session is-selected" : "dj-session"}>
                {thumb ? (
                  <img src={thumb} alt="" width={320} height={180} loading="lazy" decoding="async" />
                ) : (
                  <span className="dj-session-empty" aria-hidden="true" />
                )}
                <div>
                  <p className="dj-kicker">{session.djIds && session.djIds.length > 1 ? "Sesión compartida" : "Sesión"}</p>
                  <h3>{session.title}</h3>
                  {session.publishedAt ? <p className="dj-meta">Publicada el {session.publishedAt}</p> : null}
                  {(sessionVenues?.get(session.id) ?? []).map((room) => (
                    <p className="dj-meta" key={room.id}><a href={`#salas/${room.id}`}>{room.name}</a></p>
                  ))}
                  <p className="dj-release-links">
                    {playable ? (
                      <button type="button" onClick={() => onPlay(`session:${session.id}`)}>
                        Escuchar aquí
                      </button>
                    ) : null}
                    <a href={session.youtubeUrl} rel="noreferrer">
                      Abrir el vídeo
                    </a>
                    <a href={`#sesiones/${session.id}`}>Abrir en Sesiones</a>
                  </p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
      {rest > 0 ? (
        <button type="button" className="dj-more" onClick={() => setShown((count) => count + PAGE)}>
          Mostrar {Math.min(PAGE, rest)} sesiones más
        </button>
      ) : null}
    </>
  );
}
