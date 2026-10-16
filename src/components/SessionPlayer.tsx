import { useEffect, useState } from "react";
import { embedUrl } from "../lib/youtube.ts";

type Playable = {
  youtubeVideoId: string;
  title: string;
  youtubeUrl: string;
};

function problemMessage(code: number): string {
  if (code === 100 || code === 101 || code === 150) {
    return code === 100
      ? "Este vídeo no está disponible. Puede haberse eliminado, estar en privado o haber sido retirado."
      : "El canal no permite reproducir este vídeo dentro de la web. Sigue disponible en YouTube.";
  }
  if (code === 5) return "El reproductor no ha podido iniciar este vídeo.";
  return "YouTube no ha podido reproducir esta sesión.";
}

export function SessionPlayer({ session }: { session: Playable }) {
  const src = embedUrl(session.youtubeVideoId);
  const [problem, setProblem] = useState<string | null>(null);

  useEffect(() => {
    setProblem(null);
  }, [session.youtubeVideoId]);

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== "https://www.youtube-nocookie.com" && event.origin !== "https://www.youtube.com") return;
      let data: unknown = event.data;
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (!data || typeof data !== "object" || !("event" in data)) return;
      const message = data as { event?: string; info?: unknown };
      if (message.event === "onError") setProblem(problemMessage(Number(message.info)));
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!src) {
    return (
      <p className="note" role="alert">
        Esta ficha no tiene un identificador de YouTube válido, así que no se carga ningún reproductor.
      </p>
    );
  }

  return (
    <div className="player-block">
      <div className="player-frame">
        <iframe
          key={session.youtubeVideoId}
          src={`${src}?rel=0`}
          title={session.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={(event) => {
            event.currentTarget.contentWindow?.postMessage(
              JSON.stringify({ event: "listening", id: session.youtubeVideoId }),
              "https://www.youtube-nocookie.com",
            );
          }}
          onError={() => setProblem("No se ha podido cargar el reproductor de YouTube.")}
        />
      </div>
      {problem ? (
        <p className="note" role="alert">
          {problem}{" "}
          <a className="text-link" href={session.youtubeUrl}>
            Abrir en YouTube
          </a>
        </p>
      ) : (
        <p className="sheet-caption">
          Si YouTube ha retirado el vídeo, lo ha puesto en privado o no permite incrustarlo,{" "}
          <a className="text-link" href={session.youtubeUrl}>
            ábrelo en YouTube
          </a>
          .
        </p>
      )}
    </div>
  );
}
