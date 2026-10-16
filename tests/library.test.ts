import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { openComparisons, openFlyers, openGear, openTutorials, openVenues } from "../src/lib/collections.ts";
import { openDjs } from "../src/lib/djs.ts";
import { describeFlyer, describeVenue, venuesForDj } from "../src/lib/places.ts";
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
    assert.deepEqual(venues.map((venue) => venue.id), ["pont-aeri", "xque", "chasis", "scorpia", "psicodromo"]);
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

  it("publica cinco salas y tres referencias sin imagen", () => {
    const djIds = new Set(djs.map((dj) => dj.id));
    const sessionIds = new Set(sessions.map((session) => session.id));
    assert.deepEqual(venues.map((venue) => venue.id), ["pont-aeri", "xque", "chasis", "scorpia", "psicodromo"]);
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
