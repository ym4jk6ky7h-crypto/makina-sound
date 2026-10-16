import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { describeDjScreen, djProfileHash, DJ_DIRECTORY_HASH, emptyDjCopy, mediaPlayer, portraitImage, publicAsset, shownPortrait } from "../src/lib/djView.ts";
import { openDjs } from "../src/lib/djs.ts";
import { readFocus, readSection } from "../src/lib/section.ts";
import { openCatalog, sessionsForDj } from "../src/lib/sessions.ts";

const sessionsRaw = JSON.parse(readFileSync(new URL("../src/data/sessions.json", import.meta.url), "utf8"));
const sourcesRaw = JSON.parse(readFileSync(new URL("../src/data/sources.json", import.meta.url), "utf8"));
const djsRaw = JSON.parse(readFileSync(new URL("../src/data/djs.json", import.meta.url), "utf8"));
const catalog = openCatalog(sourcesRaw, sessionsRaw);
const djs = openDjs(djsRaw);
const query = { text: "", sort: "name" as const };

describe("fase 07 directorio y ficha", () => {
  it("mantiene las 16 fichas y las 150 sesiones", () => {
    assert.equal(djs.length, 55);
    assert.equal(catalog.sessions.length, 150);
  });

  it("abre el directorio sin ficha, biografía, discografía, sesiones ni reproductor", () => {
    const screen = describeDjScreen("", djs, catalog.sessions, query);
    assert.equal(screen.kind, "directory");
    if (screen.kind !== "directory") return;
    assert.equal(screen.title, "DJs");
    assert.equal(screen.cards.length, 55);
    assert.equal(screen.cards.some((card) => card.id === "da-terror"), true);
    const blob = JSON.stringify(screen);
    assert.equal(blob.includes("biography"), false);
    assert.equal(blob.includes("youtube"), false);
    assert.equal(blob.includes("iframe"), false);
    for (const dj of djs) {
      for (const paragraph of dj.biography) assert.equal(blob.includes(paragraph), false);
      for (const track of dj.tracks) assert.equal(blob.includes(JSON.stringify(track.title)), false);
    }
    for (const session of catalog.sessions) assert.equal(blob.includes(session.title), false);
    for (const card of screen.cards) {
      assert.equal(card.image.kind, "illustration");
      if (card.image.kind === "illustration") assert.equal(card.image.label, "Ilustración");
      assert.equal(card.href, djProfileHash(card.id));
      assert.equal(readSection(card.href), "djs");
      assert.equal(readFocus(card.href), card.id);
    }
  });

  it("busca por nombre y conserva esa consulta al volver al directorio", () => {
    const byName = { text: "terror", sort: "name" as const };
    const directory = describeDjScreen("", djs, catalog.sessions, byName);
    const opened = describeDjScreen("da-terror", djs, catalog.sessions, byName);
    const back = describeDjScreen("", djs, catalog.sessions, byName);
    assert.equal(directory.kind, "directory");
    assert.equal(opened.kind, "profile");
    assert.deepEqual(back, directory);
    if (directory.kind !== "directory") return;
    assert.deepEqual(directory.cards.map((card) => card.id), ["da-terror"]);
    const byTrack = describeDjScreen("", djs, catalog.sessions, { text: "makineros", sort: "name" });
    assert.equal(byTrack.kind, "directory");
    if (byTrack.kind !== "directory") return;
    assert.equal(byTrack.cards.length, 0);
  });

  it("muestra solo el DJ de la ruta y filtra sus sesiones por djIds", () => {
    for (const dj of djs) {
      const screen = describeDjScreen(dj.id, djs, catalog.sessions, query);
      assert.equal(screen.kind, "profile");
      if (screen.kind !== "profile") continue;
      assert.equal(screen.profile.id, dj.id);
      assert.equal(screen.profile.name, dj.name);
      assert.equal(screen.profile.backHref, DJ_DIRECTORY_HASH);
      assert.deepEqual(screen.profile.biography, dj.biography);
      assert.equal(screen.profile.sessions.length, sessionsForDj(catalog.sessions, dj.id).length);
      assert.equal(screen.profile.sessions.every((session) => session.djIds?.includes(dj.id)), true);
      const artistRoles = screen.profile.artistGroups.map((group) => group.role);
      assert.equal(artistRoles.includes("produced"), false);
      assert.equal(
        screen.profile.productions.every((track) => track.role === "produced"),
        true,
      );
    }
  });

  it("no rellena temas, producciones ni sesiones cuando no hay datos", () => {
    const nando = describeDjScreen("nando-dixkontrol", djs, catalog.sessions, query);
    assert.equal(nando.kind, "profile");
    if (nando.kind !== "profile") return;
    assert.equal(nando.profile.sessions.length, 0);
    assert.equal(nando.profile.sessionsEmpty, emptyDjCopy.sessions);
    assert.equal(nando.profile.productions.length, 1);
    assert.equal(nando.profile.productionsEmpty, null);
    assert.equal(nando.profile.artistGroups.some((group) => group.role === "own"), true);

    const javi = describeDjScreen("javi-maki", djs, catalog.sessions, query);
    assert.equal(javi.kind, "profile");
    if (javi.kind !== "profile") return;
    assert.deepEqual(javi.profile.artistGroups, []);
    assert.equal(javi.profile.artistEmpty, emptyDjCopy.artist);
    assert.deepEqual(javi.profile.productions, []);
    assert.equal(javi.profile.productionsEmpty, emptyDjCopy.productions);
    assert.equal(javi.profile.sessions.length > 0, true);
    assert.equal(javi.profile.sessionsEmpty, null);

    const terror = describeDjScreen("da-terror", djs, catalog.sessions, query);
    assert.equal(terror.kind, "profile");
    if (terror.kind !== "profile") return;
    assert.equal(terror.profile.productionsEmpty, emptyDjCopy.productions);
    assert.equal(terror.profile.artistGroups.length, 1);
    assert.equal(terror.profile.artistGroups[0]?.role, "collaboration");
    assert.equal(terror.profile.sessions.length, 4);
  });

  it("deja un identificador desconocido fuera del directorio y de cualquier ficha", () => {
    const screen = describeDjScreen("no-existe", djs, catalog.sessions, query);
    assert.deepEqual(screen, { kind: "missing", id: "no-existe", backHref: DJ_DIRECTORY_HASH });
    assert.equal(readSection("#djs/no-existe"), "djs");
    assert.equal(readFocus("#djs/no-existe"), "no-existe");
    assert.equal(readFocus(DJ_DIRECTORY_HASH), "");
    assert.equal(readSection(djProfileHash("da-terror")), "djs");
  });

  it("no convierte una portada ni un enlace de Discogs en reproductor", () => {
    assert.equal(mediaPlayer(null), null);
    const terror = djs.find((dj) => dj.id === "da-terror");
    const track = terror?.tracks[0];
    assert.ok(track?.coverUrl === undefined || track.coverUrl.startsWith("https://"));
    assert.equal(mediaPlayer({
      title: track?.title ?? "",
      youtubeVideoId: track?.youtubeVideoId,
      youtubeUrl: track?.links[0]?.url,
    }), null);
    assert.equal(mediaPlayer({
      title: "Portada",
      youtubeVideoId: "GGCuKvxLx70",
      youtubeUrl: "https://i.discogs.com/portada.jpg",
    }), null);
    const session = sessionsForDj(catalog.sessions, "da-terror")[0];
    assert.ok(session);
    assert.deepEqual(mediaPlayer(session), {
      title: session.title,
      youtubeVideoId: session.youtubeVideoId,
      youtubeUrl: session.youtubeUrl,
    });
  });

  it("muestra solo una fotografía verificada y conserva el resto del catálogo", () => {
    assert.equal(djs.every((dj) => dj.portrait?.status !== "verified"), true);
    assert.equal(djs.filter((dj) => dj.portrait?.imageUrl).length, 0);
    const screen = describeDjScreen("", djs, catalog.sessions, query);
    assert.equal(screen.kind, "directory");
    if (screen.kind !== "directory") return;
    assert.equal(screen.cards.length, 55);
    assert.equal(screen.cards.every((card) => card.image.kind === "illustration"), true);
    const nau = describeDjScreen("dj-nau", djs, catalog.sessions, query);
    assert.equal(nau.kind, "profile");
    if (nau.kind !== "profile") return;
    assert.equal(nau.profile.image.kind, "illustration");
    assert.equal(nau.profile.sessions.length, 9);

    const fixture = openDjs([{
      id: "foto-prueba",
      name: "Foto Prueba",
      biography: ["Ficha de prueba."],
      tracks: [],
      links: [{ label: "Fuente", url: "https://example.com/fuente" }],
      portrait: {
        status: "verified",
        imageUrl: "https://example.com/foto.jpg",
        sourceUrl: "https://example.com/fuente",
        sourceName: "Archivo de prueba",
        license: "Cesión de prueba para esta ficha",
        licenseUrl: "https://example.com/licencia",
        checkedAt: "2026-10-15",
      },
    }]);
    const photo = portraitImage(fixture[0]);
    assert.deepEqual(photo, {
      kind: "photo",
      url: "https://example.com/foto.jpg",
      alt: "Fotografía de Foto Prueba",
      sourceName: "Archivo de prueba",
      sourceUrl: "https://example.com/fuente",
      attribution: "Cesión de prueba para esta ficha",
    });
    const duo = portraitImage({
      name: "Pastis & Buenri",
      portrait: {
        status: "verified",
        imageUrl: "https://example.com/duo.jpg",
        sourceUrl: "https://example.com/duo",
        sourceName: "Agencia",
        license: "Cesión de prueba",
        licenseUrl: "https://example.com/licencia-duo",
        checkedAt: "2026-10-15",
      },
    });
    assert.equal(duo.kind, "photo");
    if (duo.kind === "photo") assert.equal(duo.alt, "Fotografía del dúo Pastis & Buenri");
    const pending = openDjs([{
      id: "pendiente",
      name: "Pendiente",
      biography: ["Sin foto publicada."],
      tracks: [],
      links: [{ label: "Fuente", url: "https://example.com/pendiente" }],
      portrait: {
        status: "pending",
        imageUrl: "https://example.com/no-publicar.jpg",
        sourceUrl: "https://example.com/pendiente",
        sourceName: "Candidata",
      },
    }]);
    assert.equal(pending[0]?.portrait?.status, "pending");
    assert.equal(pending[0]?.portrait?.imageUrl, undefined);
    assert.equal(portraitImage(pending[0]).kind, "illustration");
    assert.deepEqual(shownPortrait(photo, true), { kind: "illustration", label: "Imagen no disponible" });
    assert.equal(publicAsset("/images/djs/ruboy.jpg", "/"), "/images/djs/ruboy.jpg");
    assert.equal(publicAsset("/images/djs/ruboy.jpg", "/makina-sound/"), "/makina-sound/images/djs/ruboy.jpg");
    assert.equal(publicAsset("https://example.com/foto.jpg", "/makina-sound/"), "https://example.com/foto.jpg");
    assert.equal(describeDjScreen("no-existe", djs, catalog.sessions, query).kind, "missing");
  });
});

describe("fase 09 directorio", () => {
  it("abre cada ficha, conserva la búsqueda y no mete la discografía en la tarjeta", () => {
    const pastis = describeDjScreen("dj-pastis", djs, catalog.sessions, query);
    const buenri = describeDjScreen("dj-buenri", djs, catalog.sessions, query);
    assert.equal(pastis.kind, "profile");
    assert.equal(buenri.kind, "profile");
    if (pastis.kind !== "profile" || buenri.kind !== "profile") return;
    assert.equal(pastis.profile.name, "DJ Pastis");
    assert.equal(buenri.profile.name, "DJ Buenri");
    assert.equal(pastis.profile.image.kind, "illustration");
    assert.equal(buenri.profile.image.kind, "illustration");
    assert.equal(pastis.profile.sessions.length, 18);
    assert.equal(buenri.profile.sessions.length, 15);
    assert.equal(describeDjScreen("pastis-buenri", djs, catalog.sessions, query).kind, "missing");
    assert.equal(describeDjScreen("dj-skudero", djs, catalog.sessions, query).kind, "profile");

    const found = describeDjScreen("", djs, catalog.sessions, { text: "pastis", sort: "name" });
    assert.equal(found.kind, "directory");
    if (found.kind !== "directory") return;
    assert.deepEqual(found.cards.map((card) => card.id), ["dj-pastis"]);
    assert.equal(found.cards[0].href, "#djs/dj-pastis");
    assert.deepEqual(found.cards[0].facts, ["Desde 1995"]);

    const directory = describeDjScreen("", djs, catalog.sessions, query);
    assert.equal(directory.kind, "directory");
    if (directory.kind !== "directory") return;
    assert.equal(directory.cards.length, 55);
    for (const card of directory.cards) {
      assert.equal(card.facts.every((fact) => fact.startsWith("Desde ") || fact.includes("–")), true);
      assert.equal(card.image.kind, "illustration");
    }
    const names = directory.cards.map((card) => card.name);
    assert.deepEqual([...names].sort((a, b) => a.localeCompare(b, "es")), names);
  });
});

describe("fase 23 directorio", () => {
  const rooms = [
    { id: "chasis", name: "Chasis", djIds: ["ricardo-f"] },
    { id: "pont-aeri", name: "Pont Aeri", djIds: ["dj-skudero"] },
  ];

  it("busca por sala, filtra por contenido y ordena por registros", () => {
    const byRoom = describeDjScreen("", djs, catalog.sessions, { text: "chasis", sort: "name" }, rooms);
    assert.equal(byRoom.kind, "directory");
    if (byRoom.kind !== "directory") return;
    assert.deepEqual(byRoom.cards.map((card) => card.id), ["ricardo-f"]);
    assert.equal(byRoom.counts.artists, 55);
    assert.ok(byRoom.counts.withReleases > 0);
    assert.ok(byRoom.counts.withSessions > 0);
    assert.equal(byRoom.counts.withRooms, 2);

    const onlySessions = describeDjScreen("", djs, catalog.sessions, { text: "", sort: "name", content: "sesiones" }, rooms);
    assert.equal(onlySessions.kind, "directory");
    if (onlySessions.kind !== "directory") return;
    assert.equal(onlySessions.cards.length, byRoom.counts.withSessions);
    assert.equal(onlySessions.cards.every((card) => card.marks.some((mark) => mark.endsWith("sesión") || mark.endsWith("sesiones"))), true);

    const byVenue = describeDjScreen("", djs, catalog.sessions, { text: "", sort: "name", room: "chasis" }, rooms);
    assert.equal(byVenue.kind, "directory");
    if (byVenue.kind !== "directory") return;
    assert.deepEqual(byVenue.cards.map((card) => card.id), ["ricardo-f"]);

    const heavy = describeDjScreen("", djs, catalog.sessions, { text: "", sort: "records" }, rooms);
    assert.equal(heavy.kind, "directory");
    if (heavy.kind !== "directory") return;
    assert.equal(heavy.cards[0]?.id, "ruboy");
    const ruboy = heavy.cards.find((card) => card.id === "ruboy");
    assert.equal(ruboy?.marks.includes("142 lanzamientos"), true);
    const blob = JSON.stringify(heavy);
    assert.equal(blob.includes("youtube"), false);

    const none = describeDjScreen("", djs, catalog.sessions, { text: "zzzz-no-existe", sort: "name" }, rooms);
    assert.equal(none.kind, "directory");
    if (none.kind !== "directory") return;
    assert.equal(none.cards.length, 0);
    assert.equal(none.counts.artists, 55);
  });
});
