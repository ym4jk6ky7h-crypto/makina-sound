import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readCatalog } from "../src/data/catalog.ts";
import { exploreCopy } from "../src/data/pages.ts";
import { prepareSources } from "../src/lib/sources.ts";
import { filterSessions, openCatalog, publishSessions } from "../src/lib/sessions.ts";
import { embedUrl, videoIdFromUrl } from "../src/lib/youtube.ts";

const channelId = "UCaaaaaaaaaaaaaaaaaaaaaa";
const otherChannel = "UCbbbbbbbbbbbbbbbbbbbbbb";

const verified = {
  id: "amics-de-la-makina",
  displayName: "Amics de la Makina",
  youtubeName: "Amics de la Makina",
  channelId,
  channelUrl: "https://www.youtube.com/@amicsdelamakina7857",
  sourceType: "channel",
  enabled: true,
  verificationStatus: "verified",
};

const pending = {
  id: "buenri",
  displayName: "Buenri",
  sourceType: "artist",
  enabled: false,
  verificationStatus: "pending",
  note: "Hay varios resultados.",
};

function session(overrides: Record<string, unknown> = {}) {
  return {
    id: "sesion-a",
    title: "Sesión remember en la sala",
    channelName: "Amics de la Makina",
    channelId,
    youtubeVideoId: "abcdefghijk",
    youtubeUrl: "https://www.youtube.com/watch?v=abcdefghijk",
    publishedAt: "2024-05-02",
    era: "remember",
    sourceUrl: "https://www.youtube.com/watch?v=abcdefghijk",
    sourceIds: ["amics-de-la-makina"],
    status: "published",
    kind: "session",
    ...overrides,
  };
}

describe("fuentes", () => {
  it("acepta una fuente verificada y deja pendiente la que no tiene canal", () => {
    const sources = prepareSources([verified, pending, { ...verified, id: "amics-de-la-makina" }]);
    assert.deepEqual(
      sources.map((source) => source.id),
      ["amics-de-la-makina", "buenri"],
    );
  });

  it("rechaza un canal verificado con URL de otro identificador", () => {
    const sources = prepareSources([
      { ...verified, channelUrl: `https://www.youtube.com/channel/${otherChannel}` },
    ]);
    assert.equal(sources.length, 0);
  });

  it("rechaza una fuente pendiente que ya trae un canal", () => {
    const sources = prepareSources([{ ...pending, channelId, enabled: false }]);
    assert.equal(sources.length, 0);
  });
});

describe("sesiones", () => {
  const sources = prepareSources([verified, pending]);

  it("exige que el identificador y la URL coincidan", () => {
    assert.equal(videoIdFromUrl("https://www.youtube.com/watch?v=abcdefghijk"), "abcdefghijk");
    assert.equal(videoIdFromUrl("https://youtu.be/abcdefghijk"), "abcdefghijk");
    assert.equal(videoIdFromUrl("https://example.com/watch?v=abcdefghijk"), null);
    assert.equal(embedUrl("no-es-id"), null);
    assert.equal(embedUrl("abcdefghijk"), "https://www.youtube-nocookie.com/embed/abcdefghijk");
    const published = publishSessions(
      [session({ youtubeUrl: "https://www.youtube.com/watch?v=zzzzzzzzzzz" })],
      sources,
    );
    assert.equal(published.length, 0);
  });

  it("excluye borradores, pendientes y fichas inválidas", () => {
    const published = publishSessions(
      [
        session(),
        session({ id: "borrador", status: "draft", youtubeVideoId: "bbbbbbbbbbb", youtubeUrl: "https://youtu.be/bbbbbbbbbbb", sourceUrl: "https://youtu.be/bbbbbbbbbbb" }),
        session({ id: "revisar", kind: "pending", youtubeVideoId: "ccccccccccc", youtubeUrl: "https://www.youtube.com/watch?v=ccccccccccc", sourceUrl: "https://www.youtube.com/watch?v=ccccccccccc" }),
        session({ id: "corta", youtubeVideoId: "corto", youtubeUrl: "https://www.youtube.com/watch?v=corto" }),
      ],
      sources,
    );
    assert.deepEqual(published.map((item) => item.id), ["sesion-a"]);
  });

  it("deja una sola ficha si el vídeo llega por dos fuentes y ordena por fecha", () => {
    const published = publishSessions(
      [
        session({ publishedAt: "2020-01-01" }),
        session({
          id: "sesion-b",
          title: "Sesión actual",
          era: "current",
          publishedAt: "2026-03-01",
          youtubeVideoId: "bbbbbbbbbbb",
          youtubeUrl: "https://www.youtube.com/watch?v=bbbbbbbbbbb",
          sourceUrl: "https://www.youtube.com/watch?v=bbbbbbbbbbb",
        }),
        session({
          id: "sin-fecha",
          title: "Sin fecha",
          publishedAt: undefined,
          youtubeVideoId: "ccccccccccc",
          youtubeUrl: "https://www.youtube.com/watch?v=ccccccccccc",
          sourceUrl: "https://www.youtube.com/watch?v=ccccccccccc",
        }),
        session({
          id: "duplicada",
          sourceIds: ["amics-de-la-makina"],
          djName: "Alguien",
        }),
      ],
      sources,
    );
    assert.deepEqual(
      published.map((item) => item.youtubeVideoId),
      ["bbbbbbbbbbb", "abcdefghijk", "ccccccccccc"],
    );
    assert.deepEqual(published[1].sourceIds, ["amics-de-la-makina"]);
    assert.equal(published[1].djName, "Alguien");
  });

  it("filtra por fecha y nombre, y ordena por vistas", () => {
    const catalog = openCatalog(
      [verified],
      [
        session(),
        session({
          id: "actual",
          title: "Makina de ahora",
          djName: "DJ Nau",
          channelName: "DJ NAU",
          era: "current",
          publishedAt: "2026-02-02",
          viewCount: 20,
          durationSeconds: 3600,
          youtubeVideoId: "bbbbbbbbbbb",
          youtubeUrl: "https://www.youtube.com/watch?v=bbbbbbbbbbb",
          sourceUrl: "https://www.youtube.com/watch?v=bbbbbbbbbbb",
        }),
        session({
          id: "duda",
          title: "Sesión sin época",
          era: "unknown",
          publishedAt: "2025-01-01",
          youtubeVideoId: "ccccccccccc",
          youtubeUrl: "https://www.youtube.com/watch?v=ccccccccccc",
          sourceUrl: "https://www.youtube.com/watch?v=ccccccccccc",
        }),
      ],
    );
    const query = { text: "", era: "all" as const, sort: "date-desc" as const };
    assert.equal(filterSessions(catalog.sessions, { ...query, era: "remember" }).length, 1);
    assert.equal(filterSessions(catalog.sessions, { ...query, era: "current" }).length, 1);
    assert.equal(filterSessions(catalog.sessions, { ...query, text: "nau" }).length, 1);
    assert.equal(filterSessions(catalog.sessions, { ...query, text: "sesión" }).length, 2);
    assert.equal(filterSessions(catalog.sessions, { ...query, text: "amics", era: "remember" }).length, 0);
    assert.deepEqual(
      filterSessions(catalog.sessions, { ...query, sort: "views" }).map((item) => item.viewCount ?? 0),
      [20, 0, 0],
    );
    assert.equal(filterSessions(catalog.sessions, { ...query, sort: "name" })[0].title, "Makina de ahora");
    const named = new Map([["dj-nau", "Arnau de prueba"]]);
    const target = catalog.sessions.find((item) => item.youtubeVideoId === "bbbbbbbbbbb");
    assert.ok(target);
    const withIds = catalog.sessions.map((item) => item.id === target.id ? { ...item, djIds: ["dj-nau"] } : item);
    assert.equal(filterSessions(withIds, { ...query, text: "ricardo" }, named).length, 0);
    assert.equal(filterSessions(withIds, { ...query, text: "arnau" }, named).length, 1);
    assert.equal(filterSessions(catalog.sessions, { ...query, text: "arnau" }, named).length, 0);
    assert.equal(filterSessions(withIds, { ...query, djId: "dj-nau" }, named).length, 1);
    assert.equal(filterSessions(withIds, { ...query, venueSessionIds: [target.id] }, named).length, 1);
    assert.equal(filterSessions(withIds, { ...query, venueSessionIds: [] }, named).length, 0);
    assert.equal(filterSessions(withIds, { ...query, text: "nada", djId: "dj-nau" }, named).length, 0);
  });

  it("une los DJs de una sesión repetida y rechaza identificadores inválidos", () => {
    const merged = publishSessions(
      [
        session({ djIds: ["dj-nau"] }),
        session({ id: "copia", djIds: ["sergi-blue"] }),
      ],
      sources,
    );
    assert.deepEqual(merged[0]?.djIds, ["dj-nau", "sergi-blue"]);
    assert.equal(publishSessions([session({ djIds: ["DJ Nau"] })], sources).length, 0);
    assert.equal(publishSessions([session({ djIds: ["dj-nau", "dj-nau"] })], sources).length, 0);
    assert.equal(publishSessions([session({ djIds: [] })], sources).length, 0);
  });
});

describe("makina actual", () => {
  it("cierra la sección en las sesiones cuyo título lo dice", () => {
    const current = readCatalog().sessions.filter((session) => session.era === "current");
    assert.ok(current.length > 0);
    for (const session of current) {
      assert.match(session.title, /makina actual/i);
    }
    const marked = readCatalog().sessions.filter((session) => /makina actual/i.test(session.title));
    assert.equal(marked.length, current.length);
    assert.match(exploreCopy.lead, /Sección cerrada/);
    assert.doesNotMatch(exploreCopy.lead, /va a reunir|Aún sin fichas/);
  });
});
