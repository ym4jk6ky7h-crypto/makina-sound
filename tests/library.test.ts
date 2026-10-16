import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { openComparisons, openFlyers, openGear, openTutorials, openVenues } from "../src/lib/collections.ts";

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
    assert.deepEqual(openVenues(empty), []);
    assert.deepEqual(openFlyers(JSON.parse(readFileSync(new URL("../src/data/flyers.json", import.meta.url), "utf8"))), []);
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
