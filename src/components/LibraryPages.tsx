import { useMemo, useState } from "react";
import { readComparisons, readFlyers, readGear, readTutorials, readVenues } from "../data/library.ts";
import { equipoCopy, rinconCopy } from "../data/pages.ts";
import type { GearCategory, GearRecord, TutorialCategory, TutorialRecord } from "../lib/collections.ts";
import {
  gearCategories,
  gearCategoryLabels,
  tutorialCategories,
  tutorialCategoryLabels,
} from "../lib/collections.ts";
import { includesQuery } from "../lib/search.ts";

export function RinconPage() {
  const tutorials = useMemo(() => readTutorials(), []);
  const [text, setText] = useState("");
  const [category, setCategory] = useState<TutorialCategory | "all">("all");
  const visible = tutorials.filter((tutorial) => {
    if (category !== "all" && tutorial.category !== category) return false;
    return includesQuery(text, [tutorial.title, tutorial.summary, tutorialCategoryLabels[tutorial.category]]);
  });
  const page = rinconCopy;

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
        <p className="note">
          Electricidad, estructuras, cargas y fijaciones necesitan advertencia de seguridad en la
          propia guía. Esta página no sustituye a un profesional.
        </p>
        <LibraryTools
          label="Buscar tutoriales"
          inputId="buscar-rincon"
          text={text}
          onText={setText}
          category={category}
          categories={tutorialCategories.map((id) => ({ id, label: tutorialCategoryLabels[id] }))}
          onCategory={(value) => setCategory(value as TutorialCategory | "all")}
        />
        {visible.length === 0 ? (
          <p className="note" role="status">
            {tutorials.length === 0
              ? "No hay tutoriales publicados. Una guía solo entra con pasos, materiales y una fuente comprobada."
              : "Ningún tutorial coincide. Prueba con otra categoría."}
          </p>
        ) : (
          <ul className="session-grid">
            {visible.map((tutorial) => (
              <li key={tutorial.id}>
                <TutorialCard tutorial={tutorial} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

export function EquipoPage() {
  const products = useMemo(() => readGear(), []);
  const comparisons = useMemo(() => readComparisons(), []);
  const [text, setText] = useState("");
  const [category, setCategory] = useState<GearCategory | "all">("all");
  const visible = products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    return includesQuery(text, [product.manufacturer, product.model, product.summary, gearCategoryLabels[product.category]]);
  });
  const visibleComparisons = comparisons.filter((comparison) => {
    if (category !== "all" && comparison.category !== category) return false;
    return includesQuery(text, [comparison.title, comparison.question]);
  });
  const page = equipoCopy;

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
        <p className="note">
          Un monitor de estudio y un altavoz de PA no se cambian el uno por el otro: el primero se
          escucha de cerca y el segundo tiene que llenar una sala. No hay un ganador único. Si más
          adelante hay un enlace de afiliado, se marcará como tal.
        </p>
        <LibraryTools
          label="Buscar equipo"
          inputId="buscar-equipo"
          text={text}
          onText={setText}
          category={category}
          categories={gearCategories.map((id) => ({ id, label: gearCategoryLabels[id] }))}
          onCategory={(value) => setCategory(value as GearCategory | "all")}
        />
        <h2 className="jump-title">Fichas</h2>
        {visible.length === 0 ? (
          <p className="note" role="status">
            {products.length === 0
              ? "No hay equipos publicados. Una ficha necesita fabricante, modelo, descripción propia y la fuente de cada dato. Precios y especificaciones que no se han comprobado no se rellenan."
              : "Ningún equipo coincide. Prueba con otra categoría."}
          </p>
        ) : (
          <ul className="session-grid">
            {visible.map((product) => (
              <li key={product.id}>
                <GearCard product={product} />
              </li>
            ))}
          </ul>
        )}
        <h2 className="jump-title">Comparativas</h2>
        {visibleComparisons.length === 0 ? (
          <p className="note" role="status">
            No hay comparativas publicadas. Cada una tiene que decir para quién sirve un equipo y
            qué deja fuera, no elegir un ganador para todos los usos.
          </p>
        ) : (
          visibleComparisons.map((comparison) => (
            <section key={comparison.id} className="essay">
              <h3>{comparison.title}</h3>
              <p>{comparison.question}</p>
              <ul>
                {comparison.items.map((item) => {
                  const product = products.find((entry) => entry.id === item.productId);
                  return (
                    <li key={item.productId}>
                      <strong>{product ? `${product.manufacturer} ${product.model}` : item.productId}</strong>
                      {": "}
                      {item.suitedFor}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
      </div>
    </article>
  );
}

export function VenueList() {
  const venues = useMemo(() => readVenues(), []);
  if (venues.length === 0) return null;
  return (
    <ul className="session-grid">
      {venues.map((venue) => (
        <li key={venue.id}>
          <article className="session-card">
            <div className="session-copy">
              <p>{venue.category}</p>
              <h3 className="session-title">{venue.name}</h3>
              {venue.location ? <p>{venue.location}</p> : null}
              <p>{venue.summary}</p>
              <SourceLinks links={venue.links} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

export function FlyerList() {
  const flyers = useMemo(() => readFlyers(), []);
  if (flyers.length === 0) return null;
  return (
    <ul className="session-grid">
      {flyers.map((flyer) => (
        <li key={flyer.id}>
          <article className="session-card">
            {flyer.imageUrl ? <img src={flyer.imageUrl} alt="" width={480} height={270} loading="lazy" /> : null}
            <div className="session-copy">
              <p>{flyer.quality === "verificada" ? "Procedencia verificada" : "Procedencia parcial"}</p>
              <h3 className="session-title">{flyer.title}</h3>
              <p>{flyer.summary}</p>
              <SourceLinks links={flyer.links} />
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

function LibraryTools({
  label,
  inputId,
  text,
  onText,
  category,
  categories,
  onCategory,
}: {
  label: string;
  inputId: string;
  text: string;
  onText: (value: string) => void;
  category: string;
  categories: { id: string; label: string }[];
  onCategory: (value: string) => void;
}) {
  return (
    <section className="session-tools" aria-label={label}>
      <form className="session-search" role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={inputId}>Buscar</label>
        <input id={inputId} value={text} onChange={(event) => onText(event.target.value)} placeholder="Palabra" />
      </form>
      <div className="session-filters">
        <label>
          Categoría
          <select value={category} onChange={(event) => onCategory(event.target.value)}>
            <option value="all">Todas</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}

function TutorialCard({ tutorial }: { tutorial: TutorialRecord }) {
  return (
    <article className="session-card">
      <div className="session-copy">
        <p>
          {tutorialCategoryLabels[tutorial.category]} · {tutorial.difficulty}
        </p>
        <h3 className="session-title">{tutorial.title}</h3>
        <p>{tutorial.summary}</p>
        <p>{tutorial.safety}</p>
        <ol>
          {tutorial.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <SourceLinks links={tutorial.links} />
      </div>
    </article>
  );
}

function GearCard({ product }: { product: GearRecord }) {
  const specLines = Object.entries(product.specs);
  return (
    <article className="session-card">
      <div className="session-copy">
        <p>{gearCategoryLabels[product.category]}</p>
        <h3 className="session-title">
          {product.manufacturer} {product.model}
        </h3>
        <p>{product.summary}</p>
        {product.suitedFor ? <p>Para quién: {product.suitedFor}</p> : null}
        {specLines.length > 0 ? (
          <ul>
            {specLines.map(([name, value]) => (
              <li key={name}>
                {name}: {value}
              </li>
            ))}
          </ul>
        ) : null}
        {product.price ? (
          <p>
            {product.price.amount} {product.price.currency} en {product.price.shop}, comprobado el{" "}
            {product.price.checkedAt}.
          </p>
        ) : null}
        <SourceLinks links={product.links} />
      </div>
    </article>
  );
}

function SourceLinks({ links }: { links: { label: string; url: string; affiliate?: boolean }[] }) {
  return (
    <ul className="track-links">
      {links.map((link) => (
        <li key={link.url}>
          <a href={link.url} rel="noreferrer">
            {link.label}
            {link.affiliate ? " (afiliado)" : ""}
          </a>
        </li>
      ))}
    </ul>
  );
}
