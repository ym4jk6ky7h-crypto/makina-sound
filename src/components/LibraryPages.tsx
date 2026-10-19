import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { CategoryPlate } from "./art/CategoryArt.tsx";
import type { CategoryArtKind } from "./art/CategoryArt.tsx";
import { readComparisons, readFlyers, readGear, readTutorials, readVenues } from "../data/library.ts";
import { equipoCopy, rinconCopy } from "../data/pages.ts";
import type { ComparisonRecord, GearCategory, GearRecord, TutorialCategory, TutorialRecord } from "../lib/collections.ts";
import {
  gearCategories,
  gearCategoryLabels,
  tutorialCategories,
  tutorialCategoryLabels,
} from "../lib/collections.ts";
import { includesQuery } from "../lib/search.ts";
import { readFocus } from "../lib/section.ts";

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
          propia guía. Esta página no sustituye a un profesional. El dibujo marca la categoría:
          es una ilustración, no una foto del material.
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
        <CategoryIndex
          label="Categorías del rincón"
          selected={category}
          onSelect={(value) => setCategory(value as TutorialCategory | "all")}
          entries={tutorialCategories
            .filter((id) => tutorials.some((tutorial) => tutorial.category === id))
            .map((id) => ({
              id,
              label: tutorialCategoryLabels[id],
              count: countLabel(tutorials.filter((tutorial) => tutorial.category === id).length, "guía", "guías"),
            }))}
        />
        {visible.length === 0 ? (
          <p className="note" role="status">
            {tutorials.length === 0
              ? "No hay tutoriales publicados. Una guía solo entra con pasos, materiales y una fuente comprobada."
              : "Ningún tutorial coincide. Prueba con otra categoría."}
          </p>
        ) : (
          tutorialCategories.map((id) => {
            const items = visible.filter((tutorial) => tutorial.category === id);
            if (items.length === 0) return null;
            return (
              <CategoryBand
                key={id}
                id={`rincon-${id}`}
                kind={id}
                title={tutorialCategoryLabels[id]}
                count={countLabel(items.length, "guía", "guías")}
              >
                <ul className="session-grid">
                  {items.map((tutorial) => (
                    <li key={tutorial.id}>
                      <TutorialCard tutorial={tutorial} />
                    </li>
                  ))}
                </ul>
              </CategoryBand>
            );
          })
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
  const [brand, setBrand] = useState("all");
  const [focus, setFocus] = useState(() => readFocus());
  useEffect(() => {
    function onHash() {
      setFocus(readFocus());
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [focus]);
  const opened = focus ? products.find((product) => product.id === focus) : undefined;
  const browsing = category === "all" && text.trim().length === 0;
  const visible = products.filter((product) => {
    if (category !== "all" && product.category !== category) return false;
    if (brand !== "all" && product.manufacturer !== brand) return false;
    return includesQuery(text, [product.manufacturer, product.model, product.summary, gearCategoryLabels[product.category]]);
  });
  const visibleComparisons = comparisons.filter((comparison) => {
    const touches =
      comparison.category === category ||
      comparison.items.some((item) => products.find((product) => product.id === item.productId)?.category === category);
    if (category !== "all" && !touches) return false;
    return includesQuery(text, [comparison.title, comparison.question]);
  });
  const brands = [
    ...new Set(
      products
        .filter((product) => category === "all" || product.category === category)
        .map((product) => product.manufacturer),
    ),
  ].sort((left, right) => left.localeCompare(right, "es"));
  const page = equipoCopy;

  function chooseCategory(value: GearCategory | "all") {
    setCategory(value);
    setBrand("all");
  }

  if (focus && !opened) {
    return (
      <article className="sheet">
        <div className="wrap">
          <p className="back">
            <a href="#equipo">Volver a equipo</a>
          </p>
          <header className="section-head">
            <h1>Ficha no encontrada</h1>
            <p className="section-intro">No hay un equipo con el identificador «{focus}».</p>
          </header>
        </div>
      </article>
    );
  }

  if (opened) return <GearDetail product={opened} />;

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
          Un monitor de estudio y un altavoz de PA no se cambian el uno por el otro. La comparativa
          queda en la categoría de la pregunta. Pulsa una ficha para ver qué es, qué lleva, las
          conexiones y las medidas que se han leído. No hay precios de tienda ni enlaces de afiliado.
          La fotografía entra cuando Wikimedia Commons la publica con licencia libre. Si no hay esa
          foto, queda la ilustración de la categoría. Una ficha sin tabla de fabricante no inventa
          cifras.
        </p>
        <LibraryTools
          label="Buscar equipo"
          inputId="buscar-equipo"
          text={text}
          onText={setText}
          category={category}
          categories={gearCategories.map((id) => ({ id, label: gearCategoryLabels[id] }))}
          onCategory={(value) => chooseCategory(value as GearCategory | "all")}
        />
        <CategoryIndex
          label="Categorías de equipo"
          selected={category}
          onSelect={(value) => chooseCategory(value as GearCategory | "all")}
          entries={gearCategories
            .filter((id) => products.some((product) => product.category === id))
            .map((id) => ({
              id,
              label: gearCategoryLabels[id],
              count: countLabel(products.filter((product) => product.category === id).length, "ficha", "fichas"),
            }))}
        />
        {browsing ? (
          <p className="note" role="status">
            Hay {countLabel(products.length, "ficha", "fichas")}. Elige una categoría y, si hace falta, una marca.
          </p>
        ) : (
          <>
            {category !== "all" ? <BrandBar brands={brands} selected={brand} onSelect={setBrand} /> : null}
            {visible.length === 0 && visibleComparisons.length === 0 ? (
              <p className="note" role="status">
                {products.length === 0
                  ? "No hay equipos publicados. Una ficha necesita fabricante, modelo, descripción propia y la fuente de cada dato. Precios y especificaciones que no se han comprobado no se rellenan."
                  : "Ningún equipo coincide. Prueba con otra categoría o con otra marca."}
              </p>
            ) : (
              gearCategories.map((id) => {
                const items = visible.filter((product) => product.category === id);
                const comparisonsHere =
                  brand === "all"
                    ? visibleComparisons.filter((comparison) =>
                        category === "all" ? comparison.category === id : id === category,
                      )
                    : [];
                if (items.length === 0 && comparisonsHere.length === 0) return null;
                return (
                  <CategoryBand
                    key={id}
                    id={`equipo-${id}`}
                    kind={id}
                    title={gearCategoryLabels[id]}
                    count={countLabel(items.length, "ficha", "fichas")}
                  >
                    <BrandGroups items={items} />
                    {comparisonsHere.map((comparison) => (
                      <ComparisonBlock key={comparison.id} comparison={comparison} products={products} />
                    ))}
                  </CategoryBand>
                );
              })
            )}
          </>
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
    <article className="session-card catalog-card">
      <CategoryPlate kind={tutorial.category} />
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
        {tutorial.tools.length > 0 ? <p>Herramientas: {tutorial.tools.join(", ")}</p> : null}
        {tutorial.warnings.length > 0 ? (
          <ul>
            {tutorial.warnings.map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        ) : null}
        <SourceLinks links={tutorial.links} />
      </div>
    </article>
  );
}

function GearCard({ product }: { product: GearRecord }) {
  return (
    <article className="session-card catalog-card gear-teaser">
      {product.image ? (
        <figure className="gear-photo">
          <img src={product.image.url} alt={product.image.alt} width={960} height={540} loading="lazy" />
          <figcaption>
            <a href={product.image.sourceUrl} rel="noreferrer">
              {product.image.author}
            </a>
            <span>{product.image.license}</span>
          </figcaption>
        </figure>
      ) : (
        <CategoryPlate kind={product.category} />
      )}
      <div className="session-copy">
        <p>{gearCategoryLabels[product.category]}</p>
        <h3 className="session-title">
          <a className="gear-open" href={`#equipo/${product.id}`}>
            {product.manufacturer} {product.model}
          </a>
        </h3>
        <p>{product.summary}</p>
        <p className="gear-more">Abrir ficha</p>
      </div>
    </article>
  );
}

function splitGearFacts(specs: Record<string, string>) {
  const measures: [string, string][] = [];
  const connections: [string, string][] = [];
  const included: [string, string][] = [];
  for (const entry of Object.entries(specs)) {
    if (/^(medidas|peso|alto|ancho|fondo|faders de tempo)/i.test(entry[0])) measures.push(entry);
    else if (/^(entrada|entradas|salida|salidas|usb|red|cable|tarjeta|envíos|envios|auriculares|bluetooth|seguridad|alimentación)/i.test(entry[0])) {
      connections.push(entry);
    } else included.push(entry);
  }
  return { measures, connections, included };
}

function GearDetail({ product }: { product: GearRecord }) {
  const facts = splitGearFacts(product.specs);
  return (
    <article className="sheet">
      <div className="wrap gear-detail">
        <p className="back">
          <a href="#equipo">Volver a equipo</a>
        </p>
        <header className="section-head">
          <p className="section-kicker">{gearCategoryLabels[product.category]}</p>
          <h1>
            {product.manufacturer} {product.model}
          </h1>
          <p className="section-intro">{product.summary}</p>
        </header>
        {product.image ? (
          <figure className="gear-hero">
            <img src={product.image.url} alt={product.image.alt} width={960} height={540} />
            <figcaption>
              <a href={product.image.sourceUrl} rel="noreferrer">
                {product.image.author}
              </a>
              <span>
                {product.image.license}
                {" · "}
                <a href={product.image.licenseUrl} rel="noreferrer">
                  licencia
                </a>
              </span>
            </figcaption>
          </figure>
        ) : (
          <CategoryPlate kind={product.category} />
        )}
        <section className="essay">
          <h2>Qué es</h2>
          <p>{product.summary}</p>
          {product.suitedFor ? <p>{product.suitedFor}</p> : null}
          {product.checkedAt ? <p>Lectura del {product.checkedAt}.</p> : null}
        </section>
        <section className="essay">
          <h2>Qué lleva</h2>
          <FactList
            rows={facts.included}
            empty="La página abierta no lista piezas, controles o programas de este modelo."
          />
          {product.strengths.length > 0 ? (
            <ul>
              {product.strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>
        <section className="essay">
          <h2>Conexiones</h2>
          <FactList rows={facts.connections} empty="La página abierta no describe las conexiones de este modelo." />
        </section>
        <section className="essay">
          <h2>Medidas</h2>
          <FactList rows={facts.measures} empty="La página abierta no da medidas ni peso de este modelo." />
        </section>
        <section className="essay">
          <h2>Precio</h2>
          {product.price ? (
            <p>
              {product.price.amount} {product.price.currency} en {product.price.shop}, comprobado el{" "}
              {product.price.checkedAt}.{" "}
              <a href={product.price.url} rel="noreferrer">
                Ver la fuente
              </a>
              .
            </p>
          ) : (
            <p>
              No hay un precio en esta ficha. La página abierta no daba una cifra disponible, y el
              archivo no copia ofertas de tienda ni enlaces de afiliado. Un precio más bajo cambia de
              día: no se inventa.
            </p>
          )}
        </section>
        {product.limits.length > 0 ? (
          <section className="essay">
            <h2>Límites de la ficha</h2>
            <ul>
              {product.limits.map((limit) => (
                <li key={limit}>{limit}</li>
              ))}
            </ul>
          </section>
        ) : null}
        <section className="essay">
          <h2>Fuentes</h2>
          <SourceLinks links={product.links} />
        </section>
      </div>
    </article>
  );
}

function FactList({ rows, empty }: { rows: [string, string][]; empty: string }) {
  if (rows.length === 0) return <p>{empty}</p>;
  return (
    <dl className="gear-facts">
      {rows.map(([name, value]) => (
        <div key={name}>
          <dt>{name}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BrandBar({
  brands,
  selected,
  onSelect,
}: {
  brands: string[];
  selected: string;
  onSelect: (brand: string) => void;
}) {
  if (brands.length < 2) return null;
  return (
    <div className="era-filters brand-bar" role="group" aria-label="Marcas">
      <button
        type="button"
        className={selected === "all" ? "is-selected" : ""}
        aria-pressed={selected === "all"}
        onClick={() => onSelect("all")}
      >
        Todas las marcas
      </button>
      {brands.map((brand) => (
        <button
          key={brand}
          type="button"
          className={selected === brand ? "is-selected" : ""}
          aria-pressed={selected === brand}
          onClick={() => onSelect(brand)}
        >
          {brand}
        </button>
      ))}
    </div>
  );
}

function BrandGroups({ items }: { items: GearRecord[] }) {
  const brands = [...new Set(items.map((item) => item.manufacturer))].sort((left, right) => left.localeCompare(right, "es"));
  if (brands.length < 2) return <GearGrid items={items} />;
  return (
    <>
      {brands.map((brand) => (
        <section key={brand} className="brand-group" aria-label={brand}>
          <h3 className="brand-title">{brand}</h3>
          <GearGrid items={items.filter((item) => item.manufacturer === brand)} />
        </section>
      ))}
    </>
  );
}

function GearGrid({ items }: { items: GearRecord[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="session-grid">
      {items.map((product) => (
        <li key={product.id}>
          <GearCard product={product} />
        </li>
      ))}
    </ul>
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

function CategoryIndex({
  label,
  selected,
  onSelect,
  entries,
}: {
  label: string;
  selected: string;
  onSelect: (id: string) => void;
  entries: { id: string; label: string; count: string }[];
}) {
  return (
    <div className="catalog-index" role="group" aria-label={label}>
      <button
        type="button"
        className={selected === "all" ? "catalog-chip is-selected" : "catalog-chip"}
        aria-pressed={selected === "all"}
        onClick={() => onSelect("all")}
      >
        <CategoryPlate kind="todas" />
        <span className="catalog-chip-copy">
          <strong>Todas</strong>
            <span>Elige una categoría</span>
        </span>
      </button>
      {entries.map((entry) => (
        <button
          key={entry.id}
          type="button"
          className={selected === entry.id ? "catalog-chip is-selected" : "catalog-chip"}
          aria-pressed={selected === entry.id}
          onClick={() => onSelect(entry.id)}
        >
          <CategoryPlate kind={entry.id as CategoryArtKind} />
          <span className="catalog-chip-copy">
            <strong>{entry.label}</strong>
            <span>{entry.count}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

function CategoryBand({
  id,
  kind,
  title,
  count,
  children,
}: {
  id: string;
  kind: CategoryArtKind;
  title: string;
  count: string;
  children: ReactNode;
}) {
  return (
    <section className="catalog-band" id={id} aria-labelledby={`${id}-titulo`}>
      <header className="catalog-band-head">
        <CategoryPlate kind={kind} />
        <div>
          <p className="section-kicker">{count}</p>
          <h2 className="jump-title" id={`${id}-titulo`}>
            {title}
          </h2>
        </div>
      </header>
      {children}
    </section>
  );
}

function ComparisonBlock({
  comparison,
  products,
}: {
  comparison: ComparisonRecord;
  products: readonly GearRecord[];
}) {
  return (
    <section className="essay">
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
  );
}

function countLabel(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}
