import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { openComparisons, openFlyers, openGear, openTutorials, openVenues } from "../src/lib/collections.ts";
import { openDjs } from "../src/lib/djs.ts";
import { describeFlyer, describeVenue, filterVenues, venuesForDj } from "../src/lib/places.ts";
import { openCatalog } from "../src/lib/sessions.ts";

const empty = JSON.parse(readFileSync(new URL("../src/data/venues.json", import.meta.url), "utf8"));

const tutorial = {
  id: "cabina-basica",
  title: "Cabina de prueba",
  summary: "Una guía que solo existe en el test.",
  category: "cabinas",
  difficulty: "inicial",
  steps: ["Medir el hueco."],
  safety: "No cargues el tablero sin fijarlo.",
  tools: [],
  materials: [],
  warnings: [],
  links: [{ label: "Fuente", url: "https://example.com/guia" }],
  status: "published",
};

describe("catálogos nuevos", () => {
  it("no publica los archivos vacíos", () => {
    assert.deepEqual(openVenues([]), []);
    const venues = openVenues(empty);
    const flyers = openFlyers(JSON.parse(readFileSync(new URL("../src/data/flyers.json", import.meta.url), "utf8")));
    assert.equal(venues.length, 14);
    assert.deepEqual(venues.slice(0, 5).map((venue) => venue.id), ["pont-aeri", "xque", "chasis", "scorpia", "psicodromo"]);
    assert.equal(flyers.length, 3);
    assert.equal(flyers.every((flyer) => flyer.imageUrl === undefined), true);
    assert.deepEqual(openTutorials(JSON.parse(readFileSync(new URL("../src/data/tutorials.json", import.meta.url), "utf8"))), []);
    assert.deepEqual(openGear(JSON.parse(readFileSync(new URL("../src/data/gear.json", import.meta.url), "utf8"))), []);
    assert.deepEqual(openComparisons(JSON.parse(readFileSync(new URL("../src/data/comparisons.json", import.meta.url), "utf8")), []), []);
  });

  it("deja fuera borradores, fichas sin fuente y datos a medias", () => {
    assert.equal(openTutorials([{ ...tutorial, status: "draft" }]).length, 0);
    assert.equal(openTutorials([{ ...tutorial, status: "review" }]).length, 0);
    assert.equal(openTutorials([{ ...tutorial, safety: " " }]).length, 0);
    assert.equal(openTutorials([{ ...tutorial, links: [{ label: "Fuente", url: "http://example.com/guia" }] }]).length, 0);

    const venue = {
      id: "sala-prueba",
      name: "Sala",
      summary: "Ficha de prueba.",
      category: "sala",
      links: [{ label: "Fuente", url: "https://example.com/sala" }],
      status: "published",
    };
    assert.equal(openVenues([venue, { ...venue, id: "sala-prueba" }]).length, 1);
    assert.equal(openVenues([{ ...venue, links: [] }]).length, 0);
    assert.equal(openVenues([{ ...venue, status: "draft" }]).length, 0);

    assert.equal(
      openFlyers([
        {
          id: "papel",
          title: "Papel",
          summary: "No es un flyer real.",
          quality: "parcial",
          imageUrl: "/dibujo.svg",
          links: [{ label: "Fuente", url: "https://example.com/papel" }],
          status: "published",
        },
      ]).length,
      0,
    );

    const product = {
      id: "monitor-prueba",
      manufacturer: "Marca",
      model: "Modelo",
      category: "monitores",
      summary: "Descripción de prueba.",
      links: [{ label: "Fabricante", url: "https://example.com/monitor" }],
      status: "published",
    };
    assert.equal(openGear([product]).length, 1);
    assert.equal(openGear([{ ...product, links: [{ label: "Fabricante", url: "nota" }] }]).length, 0);
    assert.equal(
      openGear([{ ...product, price: { amount: 100, currency: "EUR", shop: "Tienda" } }]).length,
      0,
    );
    const priced = openGear([
      {
        ...product,
        price: {
          amount: 199,
          currency: "EUR",
          shop: "Tienda",
          url: "https://example.com/precio",
          checkedAt: "2026-10-14",
        },
      },
    ]);
    assert.equal(priced[0]?.price?.amount, 199);

    assert.equal(
      openComparisons(
        [
          {
            id: "cerca-o-lejos",
            title: "Cerca o lejos",
            category: "monitores",
            question: "¿Para qué cuarto?",
            items: [
              { productId: "no-existe", suitedFor: "Nadie", strengths: ["Ninguna"], limits: ["No está"] },
              { productId: "monitor-prueba", suitedFor: "Cerca", strengths: ["Detalle"], limits: ["No llena una sala"] },
            ],
            links: [{ label: "Fuente", url: "https://example.com/comparar" }],
            status: "published",
          },
        ],
        priced,
      ).length,
      0,
    );
  });
});

describe("fase 22 salas y flyers", () => {
  const venues = openVenues(JSON.parse(readFileSync(new URL("../src/data/venues.json", import.meta.url), "utf8")));
  const flyers = openFlyers(JSON.parse(readFileSync(new URL("../src/data/flyers.json", import.meta.url), "utf8")));
  const djs = openDjs(JSON.parse(readFileSync(new URL("../src/data/djs.json", import.meta.url), "utf8")));
  const sessions = openCatalog(
    JSON.parse(readFileSync(new URL("../src/data/sources.json", import.meta.url), "utf8")),
    JSON.parse(readFileSync(new URL("../src/data/sessions.json", import.meta.url), "utf8")),
  ).sessions;

  it("publica las salas documentadas y tres referencias sin imagen", () => {
    const djIds = new Set(djs.map((dj) => dj.id));
    const sessionIds = new Set(sessions.map((session) => session.id));
    assert.equal(venues.length, 14);
    assert.deepEqual(venues.slice(0, 5).map((venue) => venue.id), ["pont-aeri", "xque", "chasis", "scorpia", "psicodromo"]);
    assert.equal(flyers.length, 3);
    for (const venue of venues) {
      assert.ok(venue.paragraphs.length > 0);
      for (const id of venue.djIds) assert.ok(djIds.has(id), id);
      for (const id of venue.sessionIds) assert.ok(sessionIds.has(id), id);
    }
    assert.equal(flyers.every((flyer) => flyer.imageUrl === undefined), true);
    assert.equal(
      openFlyers([{
        id: "sin-licencia",
        title: "Cartel",
        summary: "Una imagen https no basta.",
        quality: "verificada",
        imageUrl: "https://example.com/cartel.jpg",
        links: [{ label: "Fuente", url: "https://example.com/cartel" }],
        status: "published",
      }]).length,
      0,
    );
  });

  it("abre la ficha y no inventa una sala ausente", () => {
    const names = djs.map((dj) => ({ id: dj.id, name: dj.name }));
    const titles = sessions.map((session) => ({ id: session.id, title: session.title }));
    const pont = describeVenue("pont-aeri", venues, names, titles, flyers);
    assert.equal(pont.kind, "profile");
    if (pont.kind !== "profile") return;
    assert.equal(pont.djs.some((dj) => dj.id === "dj-skudero"), true);
    assert.equal(pont.sessions[0]?.id, "gWNOt-He3g8");
    assert.equal(pont.flyers.length, 3);
    const scorpia = describeVenue("scorpia", venues, names, titles, flyers);
    assert.equal(scorpia.kind, "profile");
    if (scorpia.kind === "profile") {
      assert.deepEqual(scorpia.djs.map((dj) => dj.id), ["frank-trax"]);
      assert.equal(scorpia.sessions.length, 0);
      assert.match(scorpia.venue.links[0]?.note ?? "", /1990/);
    }
    const psico = describeVenue("psicodromo", venues, names, titles, flyers);
    assert.equal(psico.kind, "profile");
    if (psico.kind === "profile") {
      assert.deepEqual(psico.djs.map((dj) => dj.id), ["nando-dixkontrol", "dj-pepebilly"]);
      assert.equal(psico.sessions.length, 0);
    }
    assert.equal(describeVenue("sala-inexistente", venues, names, titles, flyers).kind, "missing");
    assert.equal(venuesForDj("ricardo-f", venues)[0]?.id, "chasis");
    assert.equal(venuesForDj("frank-trax", venues)[0]?.id, "scorpia");
    const paper = describeFlyer("macrorave-2009", flyers, venues, names);
    assert.equal(paper.kind, "profile");
    if (paper.kind === "profile") assert.equal(paper.venue?.id, "pont-aeri");
  });
});

describe("fase 26 relaciones de sesión", () => {
  const venues = openVenues(JSON.parse(readFileSync(new URL("../src/data/venues.json", import.meta.url), "utf8")));
  const djs = openDjs(JSON.parse(readFileSync(new URL("../src/data/djs.json", import.meta.url), "utf8")));
  const sessions = openCatalog(
    JSON.parse(readFileSync(new URL("../src/data/sources.json", import.meta.url), "utf8")),
    JSON.parse(readFileSync(new URL("../src/data/sessions.json", import.meta.url), "utf8")),
  ).sessions;

  it("enlaza la sala solo cuando el título de YouTube la nombra y deja fuera el resto", () => {
    assert.equal(sessions.length, 150);
    assert.equal(djs.length, 55);
    const pont = venues.find((venue) => venue.id === "pont-aeri");
    const chasis = venues.find((venue) => venue.id === "chasis");
    const xque = venues.find((venue) => venue.id === "xque");
    const tracker = sessions.find((session) => session.title.includes("Intro Sesión Xque"));
    assert.ok(pont && chasis && xque && tracker);
    assert.deepEqual(pont.sessionIds, ["gWNOt-He3g8", "dGN_8ey-jwM"]);
    assert.equal(pont.djIds.includes("dj-nau"), false);
    assert.deepEqual(chasis.sessionIds, ["BwIWr8hEAY4", "kXoeGh41i4M", "MJHKZX-zSvg", "g1unn_TmztE", "r38U4a2ZHS8"]);
    assert.deepEqual(chasis.djIds, ["ricardo-f"]);
    assert.deepEqual(xque.sessionIds, ["ZiVYJdWRF_s", tracker.id]);
    assert.equal(xque.djIds.includes("javi-tracker"), false);
    assert.equal(venues.find((venue) => venue.id === "scorpia")?.sessionIds.length, 0);
    assert.equal(venues.find((venue) => venue.id === "psicodromo")?.sessionIds.length, 0);
    assert.equal(pont.links.some((link) => link.url === "https://www.youtube.com/watch?v=dGN_8ey-jwM"), true);
    assert.match(pont.links.find((link) => link.url.endsWith("dGN_8ey-jwM"))?.note ?? "", /publicación/);

    assert.equal(sessions.find((session) => session.id === "sTYNvGG68mQ")?.djIds, undefined);
    assert.equal(sessions.find((session) => session.id === "UUBhGxPmaZg")?.djIds, undefined);
    assert.equal(sessions.find((session) => session.id === "YqBps9i2xa8")?.djIds, undefined);
    assert.equal(sessions.find((session) => session.id === "gWNOt-He3g8")?.djIds, undefined);
    assert.deepEqual(sessions.find((session) => session.id === "BhhRd4TgRE0")?.djIds, ["dj-sepi"]);
    assert.deepEqual(sessions.find((session) => session.id === "g1unn_TmztE")?.djIds, ["julio-posadas"]);
    assert.deepEqual(sessions.find((session) => session.id === "r38U4a2ZHS8")?.djIds, ["xavi-bcn"]);
    assert.equal(sessions.find((session) => session.id === "Ra-85WUVk2k")?.djIds, undefined);

    const names = djs.map((dj) => ({ id: dj.id, name: dj.name }));
    const titles = sessions.map((session) => ({ id: session.id, title: session.title }));
    const screen = describeVenue("chasis", venues, names, titles, []);
    assert.equal(screen.kind, "profile");
    if (screen.kind === "profile") {
      assert.deepEqual(screen.sessions.map((session) => session.id), chasis.sessionIds);
      assert.deepEqual(screen.djs.map((dj) => dj.id), ["ricardo-f"]);
    }
    assert.equal(describeVenue("sala-inexistente", venues, names, titles, []).kind, "missing");
  });
});

describe("fase 27 archivo de salas", () => {
  const venues = openVenues(JSON.parse(readFileSync(new URL("../src/data/venues.json", import.meta.url), "utf8")));

  it("separa las salas nuevas y no publica las que siguen sin fuente", () => {
    const ids = venues.map((venue) => venue.id);
    for (const id of ["gran-velvet", "barraca", "chocolate", "actv", "disco-ocho", "nau-b3", "central-cubelles", "kontrol", "extasis"]) {
      assert.ok(ids.includes(id), id);
    }
    for (const id of ["area", "area-concor", "area-beethoven", "barcalles", "la-festa", "penelope"]) {
      assert.equal(ids.includes(id), false, id);
    }
    assert.deepEqual(venues.find((venue) => venue.id === "chocolate")?.aliases, ["Chocolate Cream"]);
    assert.deepEqual(venues.find((venue) => venue.id === "disco-ocho")?.djIds, ["dj-pepebilly"]);
    assert.equal(venues.find((venue) => venue.id === "central-cubelles")?.djIds.includes("frank-trax"), false);
    assert.equal(venues.find((venue) => venue.id === "kontrol")?.id === "chasis", false);
    assert.equal(venues.find((venue) => venue.id === "chocolate")?.sessionIds.length, 0);
    assert.equal(venues.find((venue) => venue.id === "nau-b3")?.places.length, 0);
  });

  it("busca por alias y filtra por la localidad publicada", () => {
    assert.deepEqual(filterVenues(venues, { text: "chocolate cream", place: "" }).map((venue) => venue.id), ["chocolate"]);
    assert.deepEqual(filterVenues(venues, { text: "central", place: "" }).map((venue) => venue.id), ["central-cubelles", "scorpia"]);
    assert.deepEqual(filterVenues(venues, { text: "", place: "Mataró" }).map((venue) => venue.id), ["chasis", "kontrol"]);
    assert.deepEqual(filterVenues(venues, { text: "velvet", place: "Sueca" }).map((venue) => venue.id), []);
    assert.deepEqual(filterVenues(venues, { text: "", place: "" }).map((venue) => venue.name), [...venues].sort((a, b) => a.name.localeCompare(b.name, "es")).map((venue) => venue.name));
  });
});
