import { useState } from "react";
import type { DjImage } from "../../lib/djView.ts";
import { publicAsset, shownPortrait } from "../../lib/djView.ts";

export function artistInitials(name: string): string {
  const skip = new Set(["dj", "de", "del", "la", "las", "los", "y", "and"]);
  const words = name
    .replace(/&/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, ""))
    .filter((word) => word.length > 0 && !skip.has(word.toLowerCase()));
  const letters = (words.length > 0 ? words : name.split(/\s+/)).slice(0, 2);
  return letters.map((word) => word[0]?.toUpperCase() ?? "").join("") || "DJ";
}

export function DjPortrait({
  name,
  image,
  caption,
  large,
}: {
  name: string;
  image: DjImage;
  caption?: boolean;
  large?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const shown = shownPortrait(image, failed);
  if (shown.kind === "illustration") {
    const missing = shown.label === "Imagen no disponible";
    return (
      <span className={large ? "dj-monogram is-large" : "dj-monogram"}>
        <span className="dj-mono-kicker" aria-hidden="true">Archivo</span>
        <span className="dj-mono-mark" aria-hidden="true">{artistInitials(name)}</span>
        <span className="dj-sr">{missing ? "Imagen no disponible" : `Monograma de ${name}`}</span>
      </span>
    );
  }
  const logo = shown.kind === "logo";
  return (
    <figure className={`${large ? "dj-photo is-large" : "dj-photo"}${logo ? " is-logo" : ""}`}>
      <img
        src={publicAsset(shown.url)}
        alt={shown.alt}
        width={logo ? 720 : large ? 640 : 480}
        height={logo ? 196 : large ? 800 : 600}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
      {caption ? (
        <figcaption>
          <a href={shown.sourceUrl} rel="noreferrer">
            {shown.sourceName}
          </a>
          {shown.attribution ? <span>{shown.attribution}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
