import type { Door } from "../data/cover";
import { Motif } from "./art/Motif";

type DoorGridProps = {
  doors: Door[];
  activeId: string | null;
  filtered: boolean;
  onEnter: (door: Door) => void;
  sectionId: string;
  headingId: string;
  index: string;
  kicker: string;
  title: string;
  intro: string;
};

export function DoorGrid({
  doors,
  activeId,
  filtered,
  onEnter,
  sectionId,
  headingId,
  index,
  kicker,
  title,
  intro,
}: DoorGridProps) {
  return (
    <section className="doors" id={sectionId} aria-labelledby={headingId}>
      <div className="wrap">
        <div className="section-head">
          <p className="section-kicker">
            <span className="idx">{index}</span>
            {kicker}
          </p>
          <h2 id={headingId}>{title}</h2>
          <p className="section-intro">{intro}</p>
        </div>
        {doors.length === 0 ? (
          <p className="note">
            Ninguna puerta coincide con la búsqueda. Prueba con disco, sesión, sala o flyer,
            o mira las lecturas del archivo.
          </p>
        ) : (
          <div className={filtered ? "door-grid is-filtered" : "door-grid"}>
            {doors.map((door) => {
              const active = door.id === activeId;
              return (
                <a
                  key={door.id}
                  className={active ? "door is-active" : "door"}
                  href={`#${door.id}`}
                  aria-current={active ? "true" : undefined}
                  onClick={(event) => {
                    event.preventDefault();
                    onEnter(door);
                  }}
                >
                  <div className="art">
                    <Motif kind={door.kind} />
                    <span className="art-credit">Ilustración</span>
                  </div>
                  <div className="door-body">
                    <span className="idx">{door.index}</span>
                    <h3>{door.title}</h3>
                    <p>{door.summary}</p>
                    <span className="door-go">Entrar en la sección</span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
