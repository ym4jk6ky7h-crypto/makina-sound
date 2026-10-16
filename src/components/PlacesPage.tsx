import { useEffect, useMemo, useState } from "react";
import { readCatalog } from "../data/catalog.ts";
import { readDjs } from "../data/djsCatalog.ts";
import { readFlyers, readVenues } from "../data/library.ts";
import { doorCopy } from "../data/pages.ts";
import type { FlyerRecord, VenueRecord } from "../lib/collections.ts";
import { describeFlyer, describeVenue, filterVenues, venuePlaces } from "../lib/places.ts";
import { includesQuery } from "../lib/search.ts";
import { readFocus } from "../lib/section.ts";

export function PlacesPage({ kind }: { kind: "salas" | "flyers" }) {
  const venues = useMemo(() => readVenues(), []);
  const flyers = useMemo(() => readFlyers(), []);
  const djs = useMemo(() => readDjs().map((dj) => ({ id: dj.id, name: dj.name })), []);
  const sessions = useMemo(
    () => readCatalog().sessions.map((session) => ({ id: session.id, title: session.title })),
    [],
  );
  const [focus, setFocus] = useState(() => readFocus());
  const [text, setText] = useState("");
  const [place, setPlace] = useState("");
  const page = doorCopy[kind];

  useEffect(() => {
    function onHash() {
      setFocus(readFocus());
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [focus, kind]);

  if (kind === "salas") {
    const screen = describeVenue(focus, venues, djs, sessions, flyers);
    if (screen.kind === "profile") return <VenueFile venue={screen.venue} djs={screen.djs} sessions={screen.sessions} flyers={screen.flyers} />;
    if (screen.kind === "missing") return <Missing label="Sala no encontrada" back="#salas" />;
    const visible = filterVenues(screen.venues, { text, place });
    const places = venuePlaces(screen.venues);
    const filtered = text.trim().length > 0 || place !== "";
    return (
      <article className="sheet dj-archive">
        <div className="wrap">
          <p className="back"><a href="#inicio">Portada</a> · <a href="#flyers">Flyers</a></p>
          <header className="dj-mast">
            <div>
              <p className="dj-kicker">{page.kicker} · {page.label}</p>
              <h1>{page.title}</h1>
              <p className="dj-lead">{page.lead}</p>
            </div>
            <p className="dj-count" aria-label={visible.length === screen.venues.length ? `${screen.venues.length} salas en el archivo` : `${visible.length} de ${screen.venues.length} salas`}>
              <span className="dj-count-num">{visible.length === screen.venues.length ? screen.venues.length : visible.length}</span>
              <span className="dj-count-label">{visible.length === screen.venues.length ? "salas en el archivo" : `de ${screen.venues.length}`}</span>
            </p>
          </header>
          <section className="session-tools" aria-label="Buscar y filtrar salas">
            <Search id="buscar-salas" text={text} onText={setText} placeholder="Nombre, alias o localidad" />
            <label className="session-filters">
              Localidad
              <select value={place} onChange={(event) => setPlace(event.target.value)}>
                <option value="">Todas</option>
                {places.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
            {filtered ? <button className="dj-clear" type="button" onClick={() => { setText(""); setPlace(""); }}>Quitar filtros</button> : null}
          </section>
          {visible.length === 0 ? (
            <p className="dj-empty" role="status">Ninguna sala coincide. Prueba con otro nombre o quita los filtros.</p>
          ) : (
            <ul className="dj-gallery">
              {visible.map((venue) => (
                <li key={venue.id}>
                  <a className="dj-card" href={`#salas/${venue.id}`}>
                    <Plate label={`Composición editorial, no es una fotografía de ${venue.name}`}>{venue.name}</Plate>
                    <span className="dj-card-copy">
                      <strong>{venue.name}</strong>
                      {venue.aliases.length > 0 ? <span>{venue.aliases.join(" · ")}</span> : null}
                      {venue.location ? <span>{venue.location}</span> : null}
                      {venue.period ? <span>{venue.period}</span> : null}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
          <p className="sheet-note">La placa de cada tarjeta es una composición del archivo, no una fotografía del local. Una sala solo entra si una página abierta sostiene el dato. Area, Area Concor y Area de Beethoven no se han fundido: la identidad sigue sin una fuente suficiente.</p>
        </div>
      </article>
    );
  }

  const screen = describeFlyer(focus, flyers, venues, djs);
  if (screen.kind === "profile") return <FlyerFile flyer={screen.flyer} venue={screen.venue} djs={screen.djs} />;
  if (screen.kind === "missing") return <Missing label="Flyer no encontrado" back="#flyers" />;
  const visible = screen.flyers.filter((flyer) =>
    includesQuery(text, [flyer.title, flyer.venueName ?? "", flyer.summary]),
  );
  const publishedImages = flyers.filter((flyer) => flyer.imageUrl).length;
  return (
    <article className="sheet dj-archive">
      <div className="wrap">
        <p className="back"><a href="#inicio">Portada</a> · <a href="#salas">Salas</a></p>
        <header className="dj-mast">
          <div>
            <p className="dj-kicker">{page.kicker} · {page.label}</p>
            <h1>{page.title}</h1>
            <p className="dj-lead">{page.lead}</p>
          </div>
          <p className="dj-count" aria-label={`${visible.length} referencias`}>
            <span className="dj-count-num">{visible.length}</span>
            <span className="dj-count-label">referencias, {publishedImages} imágenes</span>
          </p>
        </header>
        <Search id="buscar-flyers" text={text} onText={setText} placeholder="Cartel o sala" />
        <p className="note">Ninguna imagen de cartel está autorizada para publicarse aquí. Cada ficha enlaza la página donde se cita y deja la reproducción pendiente.</p>
        {visible.length === 0 ? (
          <p className="note" role="status">Ningún cartel coincide. Prueba con otro nombre.</p>
        ) : (
          <ul className="dj-gallery flyer-grid">
            {visible.map((flyer) => (
              <li key={flyer.id}>
                <a className="dj-card" href={`#flyers/${flyer.id}`}>
                  <Plate label={`Sin reproducción de ${flyer.title}`}>Sin imagen</Plate>
                  <span className="dj-card-copy">
                    <strong>{flyer.title}</strong>
                    <span>{flyer.venueName}</span>
                    <span>{flyer.eventDate}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function VenueFile({
  venue,
  djs,
  sessions,
  flyers,
}: {
  venue: VenueRecord;
  djs: { id: string; name: string }[];
  sessions: { id: string; title: string }[];
  flyers: FlyerRecord[];
}) {
  return (
    <article className="sheet dj-archive dj-file">
      <div className="wrap">
        <p className="back"><a href="#salas">Volver a Salas</a></p>
        <header className="dj-file-head">
          <Plate large label={`Composición editorial, no es una fotografía de ${venue.name}`}>{venue.name}</Plate>
          <div className="dj-file-title">
            <p className="dj-kicker">Ficha</p>
            <h1>{venue.name}</h1>
            {venue.aliases.length > 0 ? <p className="dj-quiet">También escrito: {venue.aliases.join(", ")}</p> : null}
            {venue.location ? <p className="dj-count">{venue.location}</p> : null}
            {venue.period ? <p className="dj-quiet">{venue.period}</p> : null}
          </div>
          <p className="dj-lead">{venue.summary}</p>
        </header>
        <section className="dj-block">
          {venue.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </section>
        <section className="dj-block">
          <h2>DJs en el archivo</h2>
          {djs.length === 0 ? <p className="dj-empty">Ningún perfil publicado está vinculado a esta sala.</p> : (
            <ul className="dj-link-list">
              {djs.map((dj) => <li key={dj.id}><a href={`#djs/${dj.id}`}>{dj.name}</a></li>)}
            </ul>
          )}
        </section>
        <section className="dj-block">
          <h2>Sesiones del catálogo</h2>
          <p className="dj-quiet">Solo entran vídeos cuyo título nombra la sala. La fecha del catálogo es la de publicación del vídeo.</p>
          {sessions.length === 0 ? <p className="dj-empty">No hay una sesión del catálogo vinculada.</p> : (
            <ul>
              {sessions.map((session) => (
                <li key={session.id}><a href={`#sesiones/${session.id}`}>{session.title}</a></li>
              ))}
            </ul>
          )}
        </section>
        <section className="dj-block">
          <h2>Carteles citados</h2>
          {flyers.length === 0 ? <p className="dj-empty">No hay un cartel citado para esta sala.</p> : (
            <ul>
              {flyers.map((flyer) => (
                <li key={flyer.id}><a href={`#flyers/${flyer.id}`}>{flyer.title}</a> · sin imagen publicada</li>
              ))}
            </ul>
          )}
        </section>
        <section className="dj-block dj-sources">
          <h2>Fuentes</h2>
          <ul>
            {venue.links.map((link) => (
              <li key={link.url}>
                <a href={link.url} rel="noreferrer">{link.label}</a>
                {link.note ? <span>{link.note}</span> : null}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

function FlyerFile({
  flyer,
  venue,
  djs,
}: {
  flyer: FlyerRecord;
  venue?: VenueRecord;
  djs: { id: string; name: string }[];
}) {
  return (
    <article className="sheet dj-archive dj-file">
      <div className="wrap">
        <p className="back"><a href="#flyers">Volver a Flyers</a></p>
        <header className="dj-file-head">
          <Plate large label={`Sin reproducción de ${flyer.title}`}>Pendiente</Plate>
          <div className="dj-file-title">
            <p className="dj-kicker">Referencia</p>
            <h1>{flyer.title}</h1>
            {flyer.eventDate ? <p className="dj-count">{flyer.eventDate}</p> : null}
          </div>
          <p className="dj-lead">{flyer.summary}</p>
        </header>
        {flyer.imageUrl ? <img src={flyer.imageUrl} alt={`Cartel ${flyer.title}`} /> : null}
        <section className="dj-block">
          {flyer.credit ? <p>{flyer.credit}</p> : null}
          {venue ? <p>Sala en el archivo: <a href={`#salas/${venue.id}`}>{venue.name}</a></p> : null}
          {djs.length > 0 ? (
            <ul className="dj-link-list">
              {djs.map((dj) => <li key={dj.id}><a href={`#djs/${dj.id}`}>{dj.name}</a></li>)}
            </ul>
          ) : <p className="dj-quiet">Esta referencia no atribuye DJs que el cartel no nombre en una fuente ya ligada a un perfil.</p>}
        </section>
        <section className="dj-block dj-sources">
          <h2>Fuente</h2>
          <ul>
            {flyer.links.map((link) => (
              <li key={link.url}><a href={link.url} rel="noreferrer">{link.label}</a></li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}

function Plate({ children, label, large }: { children: string; label: string; large?: boolean }) {
  return (
    <span className={large ? "room-plate is-large" : "room-plate"}>
      <span aria-hidden="true">{children}</span>
      <span className="dj-sr">{label}</span>
    </span>
  );
}

function Search({ id, text, onText, placeholder }: { id: string; text: string; onText: (value: string) => void; placeholder: string }) {
  return (
    <form className="session-search" role="search" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor={id}>Buscar</label>
      <input id={id} value={text} onChange={(event) => onText(event.target.value)} placeholder={placeholder} />
    </form>
  );
}

function Missing({ label, back }: { label: string; back: string }) {
  return (
    <article className="sheet dj-archive">
      <div className="wrap">
        <p className="back"><a href={back}>Volver</a></p>
        <h1>{label}</h1>
      </div>
    </article>
  );
}
