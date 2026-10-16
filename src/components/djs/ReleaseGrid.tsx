import { useState } from "react";
import type { DjCredit, DjTrack } from "../../lib/djs.ts";
import type { DjArtistGroup } from "../../lib/djView.ts";
import { mediaPlayer } from "../../lib/djView.ts";
import { thumbnailUrl } from "../../lib/youtube.ts";

const PAGE = 24;

const roleLabel: Record<DjCredit, string> = {
  own: "Tema propio",
  collaboration: "Colaboración",
  produced: "Producción",
  remix: "Remix",
  compilation: "Recopilatorio",
  reissue: "Reedición",
};

export function ReleaseGrid({
  group,
  playingKey,
  onPlay,
  hideTitle,
}: {
  group: DjArtistGroup;
  playingKey: string | null;
  onPlay: (key: string) => void;
  hideTitle?: boolean;
}) {
  const [shown, setShown] = useState(PAGE);
  const visible = group.tracks.slice(0, shown);
  const rest = group.tracks.length - visible.length;
  return (
    <section className="dj-release-group" aria-label={group.title}>
      {hideTitle ? null : <h3>{group.title}</h3>}
      {group.note ? <p className="dj-quiet">{group.note}</p> : null}
      <ul className="dj-covers">
        {visible.map((track) => (
          <li key={track.id}>
            <ReleaseCard
              track={track}
              selected={playingKey === `track:${track.id}`}
              onPlay={() => onPlay(`track:${track.id}`)}
            />
          </li>
        ))}
      </ul>
      {rest > 0 ? (
        <button type="button" className="dj-more" onClick={() => setShown((count) => count + PAGE)}>
          Mostrar {Math.min(PAGE, rest)} más
        </button>
      ) : null}
    </section>
  );
}

function ReleaseCard({
  track,
  selected,
  onPlay,
}: {
  track: DjTrack;
  selected: boolean;
  onPlay: () => void;
}) {
  const playable = mediaPlayer({
    title: track.title,
    youtubeVideoId: track.youtubeVideoId,
    youtubeUrl: track.youtubeUrl,
  });
  const thumb = track.coverUrl ?? (track.kind === "session" && track.youtubeVideoId ? thumbnailUrl(track.youtubeVideoId) : null);
  const meta = [track.year, track.label].filter(Boolean).join(" · ");
  return (
    <article className={selected ? "dj-release is-selected" : "dj-release"}>
      <Cover url={thumb} title={track.title} />
      <div className="dj-release-copy">
        <h4>{track.title}</h4>
        {meta ? <p className="dj-release-issue">{meta}</p> : null}
        <p className="dj-role">{roleLabel[track.role]}</p>
        {track.artists?.length ? <p className="dj-meta">{track.artists.join(", ")}</p> : null}
        {track.credits?.length ? (
          <ul className="dj-credit-list">
            {track.credits.map((credit, index) => (
              <li key={`${credit.name}-${credit.role}-${index}`}>{credit.name}, {credit.role}</li>
            ))}
          </ul>
        ) : null}
        {track.format || track.catalogNumber ? (
          <p className="dj-meta">{[track.format, track.catalogNumber].filter(Boolean).join(" · ")}</p>
        ) : null}
        {track.edition ? <p className="dj-edition">{track.edition}</p> : null}
        <p className="dj-release-links">
          {playable ? (
            <button type="button" onClick={onPlay}>
              Escuchar aquí
            </button>
          ) : null}
          {track.links.map((link) => (
            <a key={link.url} href={link.url} rel="noreferrer">
              {link.label}
            </a>
          ))}
        </p>
      </div>
    </article>
  );
}

function Cover({ url, title }: { url: string | null; title: string }) {
  const [failed, setFailed] = useState(false);
  if (!url || failed) {
    return (
      <span className="dj-cover-empty">
        <span aria-hidden="true">MS</span>
        <span className="dj-sr">Sin portada verificada de {title}</span>
      </span>
    );
  }
  return (
    <img
      className="dj-cover"
      src={url}
      alt=""
      width={480}
      height={480}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
