import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { artistMatchesSubject, auditPortraits, classifyDiscogsCredit, dedupeTracks, openDjs, songsByRole } from "../src/lib/djs.ts";
import { portraitImage, shownPortrait } from "../src/lib/djView.ts";
import { readFocus, readSection } from "../src/lib/section.ts";
import { openCatalog, sessionsForDj } from "../src/lib/sessions.ts";

const sessionsRaw = JSON.parse(readFileSync(new URL("../src/data/sessions.json", import.meta.url), "utf8"));
const sourcesRaw = JSON.parse(readFileSync(new URL("../src/data/sources.json", import.meta.url), "utf8"));
const djsRaw = JSON.parse(readFileSync(new URL("../src/data/djs.json", import.meta.url), "utf8"));
const catalog = openCatalog(sourcesRaw, sessionsRaw);
const djs = openDjs(djsRaw);

function ids(djId: string): string[] {
  return sessionsForDj(catalog.sessions, djId).map((session) => session.youtubeVideoId);
}

describe("fichas y sesiones", () => {
  it("conserva las 16 fichas y las 150 sesiones, sin copiar la sesión dentro del DJ", () => {
    assert.equal(djs.length, 55);
    assert.equal(catalog.sessions.length, 150);
    assert.equal(djs.some((dj) => dj.tracks.some((track) => track.kind === "session")), false);
    const djIds = djs.map((dj) => dj.id);
    assert.equal(new Set(djIds).size, djIds.length);
    const videos = catalog.sessions.map((session) => session.youtubeVideoId);
    assert.equal(new Set(videos).size, videos.length);
  });

  it("liga por identificador las sesiones ya comprobadas y no atribuye un nombre dudoso", () => {
    assert.equal(ids("dj-nau").length, 9);
    assert.ok(ids("dj-nau").includes("bPaK336QLKc"));
    assert.ok(ids("dj-nau").includes("qesDga3FPSQ"));
    assert.ok(ids("dj-nau").includes("dGN_8ey-jwM"));
    assert.equal(ids("sergi-blue").length, 15);
    assert.ok(ids("sergi-blue").includes("_ta6CvKvGIc"));
    assert.equal(ids("julio-posadas").length, 1);
    assert.equal(ids("ruboy").length, 1);
    assert.ok(ids("da-terror").includes("_F8Le6WTi_I"));
    assert.ok(ids("dj-pastis").includes("-SVOuYcg34g"));
    assert.ok(ids("dj-buenri").includes("-SVOuYcg34g"));
    assert.ok(ids("dj-sisu").includes("jUPXI1lAhB8"));

    const shared = catalog.sessions.find((session) => session.youtubeVideoId === "n_rkLsiEMYM");
    assert.deepEqual(shared?.djIds, ["dj-pastis", "dj-buenri", "dj-sisu"]);
    assert.equal(sessionsForDj(catalog.sessions, "dj-pastis").filter((session) => session.youtubeVideoId === "n_rkLsiEMYM").length, 1);
    assert.equal(sessionsForDj(catalog.sessions, "dj-buenri").filter((session) => session.youtubeVideoId === "n_rkLsiEMYM").length, 1);

    const pastisSolo = catalog.sessions.filter((session) => session.djName === "DJ Pastis");
    const buenriSolo = catalog.sessions.filter((session) => session.djName === "DJ Buenri");
    assert.ok(pastisSolo.length > 0);
    assert.ok(buenriSolo.length > 0);
    assert.equal(pastisSolo.every((session) => session.djIds?.includes("dj-pastis") && !session.djIds?.includes("dj-buenri")), true);
    assert.equal(buenriSolo.every((session) => session.djIds?.includes("dj-buenri") && !session.djIds?.includes("dj-pastis")), true);
    const backToBack = catalog.sessions.find((session) => session.djName === "Pastis b2b Sisu");
    assert.deepEqual(backToBack?.djIds, ["dj-sisu", "dj-pastis"]);
    const aniversario = catalog.sessions.find((session) => session.youtubeVideoId === "BhhRd4TgRE0");
    assert.deepEqual(aniversario?.djIds, ["dj-sepi"]);
    assert.equal(aniversario?.djIds?.includes("dj-buenri"), false);

    for (const session of catalog.sessions) {
      for (const djId of session.djIds ?? []) {
        assert.ok(djs.some((dj) => dj.id === djId));
      }
    }
  });

  it("corrige el corte del título cuando el nombre está en el título y deja sin atribuir el caso ambiguo", () => {
    const cesk = catalog.sessions.find((session) => session.id === "uk3jQGSFa1w");
    const pitu = catalog.sessions.find((session) => session.id === "wwIrt508fWo");
    const billing = catalog.sessions.find((session) => session.id === "zdAatPMDWro");
    assert.equal(cesk?.djName, "Dj Cesk");
    assert.equal(cesk?.title.startsWith("Dj Cesk"), true);
    assert.deepEqual(cesk?.djIds, ["dj-cesk"]);
    assert.equal(pitu?.djName, "Pitu & Cesk");
    assert.deepEqual(pitu?.djIds, ["dj-cesk", "dj-pitu"]);
    assert.equal(billing?.djName, undefined);
    assert.equal(billing?.title, "pakitoDj Select, K-diz vs Isildur - Live @Amics de la Makina /// 27-12-2025");
    assert.equal(catalog.sessions.some((session) => session.djName?.endsWith("-")), false);
  });

  it("separa remix, colaboración y producción, y no trata un recopilatorio como tema propio", () => {
    const skudero = djs.find((dj) => dj.id === "dj-skudero");
    const ruboy = djs.find((dj) => dj.id === "ruboy");
    assert.ok(skudero);
    assert.ok(ruboy);
    assert.equal(songsByRole(skudero, "collaboration").some((track) => track.id === "extasia"), true);
    assert.equal(songsByRole(skudero, "remix").some((track) => track.id === "extasia"), false);
    assert.equal(songsByRole(skudero, "own").some((track) => track.id === "extasia"), false);
    assert.equal(songsByRole(ruboy, "produced").some((track) => track.id === "ruboy-flying-free"), true);
    assert.equal(ruboy.tracks.some((track) => track.id === "ruboy-gold"), false);

    const withCompilation = openDjs([
      {
        id: "ejemplo",
        name: "Ejemplo",
        biography: ["Ficha de prueba."],
        links: [{ label: "Fuente", url: "https://example.com/fuente" }],
        tracks: [
          {
            id: "propio",
            title: "Tema propio",
            kind: "song",
            links: [{ label: "Fuente", url: "https://example.com/tema" }],
          },
          {
            id: "recopilatorio",
            title: "Aparición",
            kind: "song",
            role: "compilation",
            links: [{ label: "Fuente", url: "https://example.com/recopilatorio" }],
          },
        ],
      },
    ]);
    assert.equal(withCompilation.length, 1);
    assert.deepEqual(songsByRole(withCompilation[0], "own").map((track) => track.id), ["propio"]);
    assert.deepEqual(songsByRole(withCompilation[0], "compilation").map((track) => track.id), ["recopilatorio"]);
  });

  it("rechaza portada inválida, ficha sin fuente y borrador", () => {
    const base = {
      id: "ejemplo",
      name: "Ejemplo",
      biography: ["Ficha de prueba."],
      tracks: [
        {
          id: "tema",
          title: "Tema",
          kind: "song",
          links: [{ label: "Fuente", url: "https://example.com/tema" }],
        },
      ],
    };
    assert.equal(openDjs([{ ...base, links: [], tracks: [{ ...base.tracks[0], links: [] }] }]).length, 0);
    assert.equal(openDjs([{ ...base, status: "draft", links: [{ label: "Fuente", url: "https://example.com/a" }] }]).length, 0);
    const insecure = openDjs([
      {
        ...base,
        links: [{ label: "Fuente", url: "https://example.com/a" }],
        tracks: [{ ...base.tracks[0], coverUrl: "http://example.com/portada.jpg" }],
      },
    ]);
    assert.equal(insecure[0]?.tracks.length, 0);
    const missing = openDjs([
      {
        ...base,
        links: [],
        tracks: [{ ...base.tracks[0], coverUrl: "nota-una-url" }],
      },
    ]);
    assert.equal(missing.length, 0);
  });
});

describe("discografía verificada", () => {
  const skudero = djs.find((dj) => dj.id === "dj-skudero");
  const xavi = djs.find((dj) => dj.id === "xavi-metralla");
  const pastis = djs.find((dj) => dj.id === "dj-pastis");
  const buenri = djs.find((dj) => dj.id === "dj-buenri");

  it("no duplica un mismo release y separa tema, colaboración, remix y producción", () => {
    assert.ok(skudero && xavi && pastis && buenri);
    for (const dj of [skudero, xavi, pastis, buenri]) {
      const releaseIds = dj.tracks.flatMap((track) => {
        const id = track.links.map((link) => link.url.match(/release\/(\d+)/)?.[1]).find(Boolean);
        return id ? [id] : [];
      });
      assert.equal(new Set(releaseIds).size, releaseIds.length);
      assert.equal(dj.tracks.some((track) => /mixed|\bcomp\b/i.test(track.format ?? "")), false);
      for (const track of dj.tracks) {
        if (!track.coverUrl) continue;
        assert.equal(track.coverUrl.startsWith("https://i.discogs.com/"), true);
      }
    }
    assert.equal(songsByRole(skudero, "collaboration").some((track) => track.id === "extasia"), true);
    assert.equal(songsByRole(skudero, "remix").length, 0);
    assert.equal(songsByRole(skudero, "produced").some((track) => track.id === "rendez-vous-ii"), true);
    assert.equal(skudero.tracks.find((track) => track.id === "elements-ii")?.credits?.[0]?.name, "Ruben Moreno");
    assert.equal(pastis.tracks.find((track) => track.id === "stripped")?.role, "collaboration");
    assert.equal(buenri.tracks.find((track) => track.id === "stripped")?.role, "collaboration");
    assert.deepEqual(pastis.tracks.find((track) => track.id === "stripped")?.artists, ["Pastis & Buenri"]);
    assert.equal(xavi.tracks.find((track) => track.id === "diabolica")?.edition?.includes("PCD-201"), true);
    assert.equal(songsByRole(skudero, "collaboration").some((track) => track.id === "infectious-flight"), true);
    assert.equal(songsByRole(xavi, "own").some((track) => track.id === "diabolica"), true);
    assert.equal(xavi.tracks.filter((track) => track.links.some((link) => link.url.includes("6690372"))).length, 2);
    assert.equal(xavi.tracks.some((track) => track.links[0]?.url.includes("6690372")), false);
    assert.equal(pastis.tracks.find((track) => track.links.some((link) => link.url.endsWith("/35125469")))?.role, "own");
    assert.equal(buenri.tracks.some((track) => track.links.some((link) => link.url.includes("/35125469"))), false);
    assert.equal(pastis.tracks.some((track) => track.links.some((link) => link.url.includes("/209882"))), false);
    assert.equal(buenri.tracks.find((track) => track.links.some((link) => link.url.endsWith("/209882")))?.role, "collaboration");
    assert.equal(pastis.tracks.find((track) => track.id === "pildo-space")?.coverUrl, undefined);
    assert.equal(pastis.tracks.find((track) => track.id === "pildo-1996")?.label, "Max Music");
  });

  it("clasifica créditos y descarta cintas mezcladas, recopilatorios y portadas de IA", () => {
    const subject = ["Skudero"];
    assert.equal(
      classifyDiscogsCredit({
        format: "12\"",
        discogsRole: "Main",
        artistNames: ["Dr. Who", "Skudero"],
        subjectNames: subject,
        title: "Extasia (Remix)",
      }),
      "collaboration",
    );
    assert.equal(
      classifyDiscogsCredit({
        format: "12\", Ora",
        discogsRole: "Main",
        artistNames: ["Pastis & Buenri"],
        subjectNames: ["Pastis & Buenri"],
        title: "Stripped (Remix)",
      }),
      "own",
    );
    assert.equal(
      classifyDiscogsCredit({
        format: "12\"",
        discogsRole: "Remix",
        artistNames: ["Pastis & Buenri"],
        subjectNames: ["Pastis & Buenri"],
        title: "Ejemplo",
      }),
      "remix",
    );
    assert.equal(
      classifyDiscogsCredit({
        format: "12\"",
        discogsRole: "Co-producer",
        artistNames: ["Biospheric"],
        subjectNames: subject,
        title: "Rendez-Vous II",
      }),
      "produced",
    );
    assert.equal(
      classifyDiscogsCredit({
        format: "Cass, Mixed, Promo",
        discogsRole: "Main",
        artistNames: ["Skudero"],
        subjectNames: subject,
        title: "Pont Aeri",
      }),
      "skip",
    );
    assert.equal(
      classifyDiscogsCredit({
        format: "File",
        discogsRole: "Producer",
        artistNames: ["Pont Aeri", "Skudero & Xavi Metralla"],
        subjectNames: subject,
        title: "Flying Free (Cover Album)",
        label: "KIVY AICovers",
      }),
      "skip",
    );
    assert.equal(
      classifyDiscogsCredit({
        format: "12\"",
        discogsRole: "Main",
        artistNames: ["Pastis"],
        subjectNames: ["Pastis & Buenri"],
        title: "Abyss Of Delirium E.P.",
      }),
      "skip",
    );
    assert.equal(artistMatchesSubject(["Rolodex"], ["Rolo"]), false);
    assert.equal(artistMatchesSubject(["Doomsday"], ["Doom"]), false);
    assert.equal(artistMatchesSubject(["Ruboy Records"], ["Ruboy"]), false);
    assert.equal(artistMatchesSubject(["DJ Ruboy"], ["Ruboy"]), true);
    assert.equal(artistMatchesSubject(["Euphoria (16)"], ["Euphoria (16)"]), true);
    assert.equal(artistMatchesSubject(["X-Tatic (3)"], ["Gerard Requena"]), false);
    assert.equal(
      classifyDiscogsCredit({
        format: "12\"",
        discogsRole: "Main",
        artistNames: ["Various"],
        subjectNames: ["Gerard Requena"],
        title: "Makina Compilation",
      }),
      "skip",
    );
    assert.equal(
      classifyDiscogsCredit({
        format: "12\"",
        discogsRole: "Producer",
        artistNames: ["Biospheric"],
        subjectNames: ["Gerard Requena", "Euphoria (16)"],
        title: "Rendez-Vous II",
      }),
      "produced",
    );
    const duplicated = dedupeTracks([
      {
        id: "a",
        title: "Fluor",
        kind: "song",
        role: "own",
        links: [{ label: "Discogs", url: "https://www.discogs.com/release/372474" }],
      },
      {
        id: "b",
        title: "Fluor CD",
        kind: "song",
        role: "own",
        links: [{ label: "Discogs", url: "https://www.discogs.com/release/372474-Skudero-Fluor" }],
      },
    ]);
    assert.deepEqual(duplicated.map((track) => track.id), ["a"]);
  });
});

describe("fase 02", () => {
  const ruboy = djs.find((dj) => dj.id === "ruboy");
  const gerard = djs.find((dj) => dj.id === "gerard-requena");
  const julio = djs.find((dj) => dj.id === "julio-posadas");
  const skudero = djs.find((dj) => dj.id === "dj-skudero");
  const xavi = djs.find((dj) => dj.id === "xavi-metralla");
  const pastis = djs.find((dj) => dj.id === "dj-pastis");
  const buenri = djs.find((dj) => dj.id === "dj-buenri");

  it("publica solo créditos nombrados y conserva la fase 01", () => {
    assert.ok(ruboy && gerard && julio && skudero && xavi && pastis && buenri);
    assert.equal(ruboy.tracks.length, 142);
    assert.equal(gerard.tracks.length, 128);
    assert.equal(julio.tracks.length, 101);
    assert.equal(skudero.tracks.length, 8);
    assert.equal(xavi.tracks.length, 7);
    assert.equal(pastis.tracks.length, 32);
    assert.equal(buenri.tracks.length, 25);
    assert.equal(pastis.tracks.find((track) => track.id === "pildo-1996")?.credits?.some((credit) => credit.name === "Dith Wemyd"), true);
    for (const dj of [ruboy, gerard, julio]) {
      const releaseIds = dj.tracks.flatMap((track) => {
        const id = track.links.map((link) => link.url.match(/release\/(\d+)/)?.[1]).find(Boolean);
        return id ? [id] : [];
      });
      assert.equal(new Set(releaseIds).size, releaseIds.length);
      assert.equal(dj.tracks.some((track) => /mixed|\bcomp\b/i.test(track.format ?? "")), false);
      assert.equal(dj.tracks.some((track) => track.links.some((link) => link.url.includes("/1748126"))), false);
      assert.equal(dj.tracks.some((track) => track.links.some((link) => link.url.includes("/8578357"))), false);
      assert.equal(dj.tracks.some((track) => track.links.some((link) => link.url.includes("/34498675"))), false);
      for (const track of dj.tracks) {
        if (!track.coverUrl) continue;
        assert.equal(track.coverUrl.startsWith("https://i.discogs.com/"), true);
      }
    }
    assert.equal(ruboy.tracks.find((track) => track.id === "ruboy-flying-free")?.role, "produced");
    assert.equal(ruboy.tracks.find((track) => track.id === "ruboy-flying-free")?.title, "Vol. 4");
    assert.equal(gerard.tracks.find((track) => track.id === "angelical")?.artists?.[0], "Euphoria");
    assert.equal(gerard.tracks.some((track) => track.id === "gerard-22"), false);
    assert.equal(julio.tracks.find((track) => track.id === "pi")?.role, "own");
    assert.equal(julio.tracks.find((track) => track.id === "re-pi")?.role, "reissue");
    assert.equal(artistMatchesSubject(["X-Tatic (3)"], ["Gerard Requena", "Euphoria (16)"]), false);
    assert.equal(artistMatchesSubject(["DJ Ruboy"], ["Ruboy", "Ruben Moreno"]), true);
  });
});

describe("fase 04", () => {
  const pastis = djs.find((dj) => dj.id === "dj-pastis");
  const buenri = djs.find((dj) => dj.id === "dj-buenri");
  const julio = djs.find((dj) => dj.id === "julio-posadas");
  const note = "Discogs relaciona a Dith Wemyd y a Hector Seral con Julio Posadas Gilabert.";

  it("anota el alias sin sustituir los nombres ni duplicar el release", () => {
    assert.ok(pastis && buenri && julio);
    assert.equal(pastis.tracks.length, 32);
    assert.equal(buenri.tracks.length, 25);
    assert.equal(julio.tracks.length, 101);
    for (const person of [pastis, buenri]) {
      for (const id of ["pildo-1996", "in-vino"]) {
        const track = person.tracks.find((item) => item.id === id);
        assert.ok(track);
        assert.equal(track.role, "collaboration");
        assert.deepEqual(track.artists, ["Pastis & Buenri"]);
        assert.equal(track.credits?.some((credit) => credit.name === "Dith Wemyd" && credit.role === "producción"), true);
        assert.equal(track.credits?.some((credit) => credit.name === "Hector Seral" && credit.role === "composición"), true);
        assert.equal(track.credits?.some((credit) => credit.name === "Julio Posadas"), false);
        assert.equal(track.edition, note);
      }
      assert.equal(person.tracks.find((track) => track.id === "adrenalin")?.edition, undefined);
    }
    for (const [id, release] of [
      ["julio-pildo-1996", "575057"],
      ["julio-in-vino", "224736"],
    ] as const) {
      const copies = julio.tracks.filter((track) => track.links.some((link) => link.url.includes(release)));
      assert.equal(copies.length, 1);
      const track = copies[0];
      assert.equal(track.id, id);
      assert.equal(track.role, "produced");
      assert.deepEqual(track.artists, ["Pastis & Buenri"]);
      assert.equal(track.credits?.some((credit) => credit.name === "Dith Wemyd" && credit.role === "producción"), true);
      assert.equal(track.credits?.some((credit) => credit.name === "Dith Wemyd" && credit.role === "alias"), true);
      assert.equal(track.credits?.some((credit) => credit.name === "Hector Seral" && credit.role === "composición"), true);
      assert.equal(track.credits?.some((credit) => credit.name === "Hector Seral" && credit.role === "alias"), true);
      assert.equal(track.edition, note);
    }
    assert.equal(catalog.sessions.length, 150);
    assert.equal(djs.find((dj) => dj.id === "ruboy")?.tracks.length, 142);
    assert.equal(djs.find((dj) => dj.id === "gerard-requena")?.tracks.length, 128);
    assert.equal(djs.find((dj) => dj.id === "dj-skudero")?.tracks.length, 8);
    assert.equal(djs.find((dj) => dj.id === "xavi-metralla")?.tracks.length, 7);
  });
});

describe("fase 05", () => {
  const ricardo = djs.find((dj) => dj.id === "ricardo-f");
  const nau = djs.find((dj) => dj.id === "dj-nau");
  const frank = djs.find((dj) => dj.id === "frank-trax");
  const sisu = djs.find((dj) => dj.id === "dj-sisu");
  const sonic = djs.find((dj) => dj.id === "dj-sonic");
  const five = [ricardo, nau, frank, sisu, sonic];

  it("publica solo créditos nombrados y conserva las fases anteriores", () => {
    assert.ok(five.every(Boolean));
    assert.equal(ricardo?.tracks.length, 52);
    assert.equal(nau?.tracks.length, 29);
    assert.equal(frank?.tracks.length, 6);
    assert.equal(sisu?.tracks.length, 11);
    assert.equal(sonic?.tracks.length, 5);
    assert.equal(djs.find((dj) => dj.id === "dj-skudero")?.tracks.length, 8);
    assert.equal(djs.find((dj) => dj.id === "xavi-metralla")?.tracks.length, 7);
    assert.equal(djs.find((dj) => dj.id === "dj-pastis")?.tracks.length, 32);
    assert.equal(djs.find((dj) => dj.id === "dj-buenri")?.tracks.length, 25);
    assert.equal(djs.find((dj) => dj.id === "pastis-buenri"), undefined);
    assert.equal(djs.find((dj) => dj.id === "ruboy")?.tracks.length, 142);
    assert.equal(djs.find((dj) => dj.id === "gerard-requena")?.tracks.length, 128);
    assert.equal(djs.find((dj) => dj.id === "julio-posadas")?.tracks.length, 101);
    assert.equal(catalog.sessions.length, 150);
    assert.equal(ids("dj-nau").length, 9);
    assert.equal(ids("dj-sisu").length, 6);
    assert.equal(ids("ricardo-f").length, 3);
    assert.equal(artistMatchesSubject(["The Noise Sindicate"], ["Frank T.R.A.X.", "Francisco Martínez Miras"]), false);
    assert.equal(artistMatchesSubject(["Frank"], ["Frank T.R.A.X."]), false);
    assert.equal(artistMatchesSubject(["Del Horno"], ["Ricardo F", "Del Horno"]), true);
    for (const dj of five) {
      const releases = dj?.tracks.map((track) => track.links.map((link) => link.url.match(/release\/(\d+)/)?.[1]).find(Boolean));
      assert.equal(new Set(releases).size, releases?.length);
      for (const track of dj?.tracks ?? []) {
        assert.equal(/mixed|\bcomp\b/i.test(track.format ?? ""), false);
        assert.equal(track.links[0]?.url.startsWith("https://www.discogs.com/release/"), true);
        if (track.coverUrl) assert.equal(track.coverUrl.startsWith("https://i.discogs.com/"), true);
      }
    }
    const whispers = ricardo?.tracks.find((track) => track.id === "whispers");
    assert.equal(whispers?.role, "collaboration");
    assert.deepEqual(whispers?.artists, ["Chasis", "Ricardo F"]);
    assert.equal(whispers?.links[0]?.url.endsWith("/515647"), true);
    const duck = ricardo?.tracks.find((track) => track.id === "crazy-duck");
    assert.equal(duck?.role, "collaboration");
    assert.equal(duck?.artists?.includes("Ricardo F"), true);
    const attraction = ricardo?.tracks.find((track) => track.links.some((link) => link.url.endsWith("/614643")));
    assert.equal(attraction?.role, "produced");
    assert.deepEqual(attraction?.artists, ["Two Concepts"]);
    const succedono = ricardo?.tracks.find((track) => track.links.some((link) => link.url.endsWith("/247817")));
    assert.equal(succedono?.artists?.[0], "Silvio Zambrotti");
    assert.equal(succedono?.credits?.some((credit) => credit.name === "Silvio Zambrotti" && credit.role === "alias"), true);
    assert.equal(ricardo?.tracks.some((track) => track.links.some((link) => link.url.endsWith("/32497728"))), false);
    const sequencer = nau?.tracks.find((track) => track.links.some((link) => link.url.endsWith("/362902")));
    assert.equal(sequencer?.role, "own");
    assert.deepEqual(sequencer?.artists, ["DJ Nau"]);
    assert.equal(sequencer?.credits?.some((credit) => credit.name === "Ruben Moreno" && credit.role === "producción"), true);
    assert.equal(sequencer?.credits?.some((credit) => credit.name === "Arnau Patiño" && credit.role === "composición"), true);
    assert.equal(frank?.tracks.some((track) => track.id === "scorpia-vol-1" || track.links.some((link) => link.url.endsWith("/152701"))), false);
    const doctor = frank?.tracks.find((track) => track.links.some((link) => link.url.endsWith("/107888")));
    assert.equal(doctor?.role, "remix");
    assert.equal(doctor?.artists?.[0], "Free!!");
    assert.match(doctor?.edition ?? "", /Maximum Volume/);
    const bitch = sonic?.tracks.find((track) => track.title === "Bitch (Remix)");
    assert.equal(bitch?.role, "collaboration");
    const shine = "558797";
    assert.equal(sisu?.tracks.filter((track) => track.links.some((link) => link.url.endsWith(shine))).length, 1);
    assert.equal(sonic?.tracks.filter((track) => track.links.some((link) => link.url.endsWith(shine))).length, 1);
    assert.equal(sisu?.tracks.find((track) => track.id === "sisu-shine")?.role, "collaboration");
    assert.equal(sonic?.tracks.find((track) => track.id === "sonic-shine")?.role, "collaboration");
    const scotland = sonic?.tracks.find((track) => track.links.some((link) => link.url.endsWith("/2378280")));
    assert.deepEqual(scotland?.artists, ["DJ Sonic", "DJ Gary MC"]);
    assert.match(scotland?.edition ?? "", /You're Not Sorry/);
    assert.equal(classifyDiscogsCredit({
      format: "12\"",
      discogsRole: "Main",
      artistNames: ["DJ Sonic", "Ivan Dark"],
      subjectNames: ["DJ Sonic"],
      title: "Bitch (Remix)",
    }), "collaboration");
  });
});

describe("fase 06", () => {
  const nando = djs.find((dj) => dj.id === "nando-dixkontrol");
  const sergi = djs.find((dj) => dj.id === "sergi-blue");
  const terror = djs.find((dj) => dj.id === "da-terror");
  const ruboy = djs.find((dj) => dj.id === "ruboy");

  it("publica los tres perfiles sin tocar las fases anteriores ni las sesiones", () => {
    assert.equal(nando?.tracks.length, 5);
    assert.equal(sergi?.tracks.length, 1);
    assert.equal(terror?.tracks.length, 1);
    assert.equal(songsByRole(nando!, "own").length, 4);
    assert.equal(songsByRole(nando!, "produced").length, 1);
    assert.equal(sergi?.tracks[0]?.role, "collaboration");
    assert.equal(terror?.tracks[0]?.role, "collaboration");
    assert.equal(djs.find((dj) => dj.id === "dj-skudero")?.tracks.length, 8);
    assert.equal(djs.find((dj) => dj.id === "xavi-metralla")?.tracks.length, 7);
    assert.equal(djs.find((dj) => dj.id === "dj-pastis")?.tracks.length, 32);
    assert.equal(djs.find((dj) => dj.id === "dj-buenri")?.tracks.length, 25);
    assert.equal(djs.find((dj) => dj.id === "pastis-buenri"), undefined);
    assert.equal(ruboy?.tracks.length, 142);
    assert.equal(djs.find((dj) => dj.id === "gerard-requena")?.tracks.length, 128);
    assert.equal(djs.find((dj) => dj.id === "julio-posadas")?.tracks.length, 101);
    assert.equal(djs.find((dj) => dj.id === "ricardo-f")?.tracks.length, 52);
    assert.equal(djs.find((dj) => dj.id === "dj-nau")?.tracks.length, 29);
    assert.equal(djs.find((dj) => dj.id === "frank-trax")?.tracks.length, 6);
    assert.equal(djs.find((dj) => dj.id === "dj-sisu")?.tracks.length, 11);
    assert.equal(djs.find((dj) => dj.id === "dj-sonic")?.tracks.length, 5);
    assert.equal(catalog.sessions.length, 150);
    assert.equal(ids("sergi-blue").length, 15);
    assert.equal(ids("da-terror").length, 4);
    assert.equal(ids("nando-dixkontrol").length, 0);
    for (const dj of [nando, sergi, terror]) {
      const releases = dj?.tracks.map((item) => item.links[0]?.url.match(/release\/(\d+)/)?.[1]);
      assert.equal(new Set(releases).size, releases?.length);
      for (const item of dj?.tracks ?? []) {
        assert.equal(/mixed|\bcomp\b/i.test(item.format ?? ""), false);
        assert.equal(item.links[0]?.url.startsWith("https://www.discogs.com/release/"), true);
        if (item.coverUrl) assert.equal(item.coverUrl.startsWith("https://i.discogs.com/"), true);
      }
    }
    assert.equal(nando?.tracks.some((item) => item.links.some((link) => link.url.endsWith("/7056881"))), false);
    const universal = nando?.tracks.find((item) => item.id === "nando-universal-582412");
    assert.equal(universal?.role, "own");
    assert.deepEqual(universal?.artists, ["Nando Dixkontrol"]);
    assert.equal(universal?.credits?.some((credit) => credit.name === "Fernando Gallego" && credit.role === "alias"), true);
    assert.match(universal?.edition ?? "", /Introkontrol/);
    const ben = nando?.tracks.find((item) => item.id === "nando-big-ben-529554");
    assert.equal(ben?.role, "produced");
    assert.deepEqual(ben?.artists, ["Big-Ben"]);
    assert.equal(ben?.credits?.some((credit) => credit.name === "Nando Dixkontrol" && credit.role === "producción"), true);
    assert.equal(ben?.credits?.some((credit) => credit.name === "Nando Dixkontrol" && credit.role === "composición"), true);
    const ballade = nando?.tracks.find((item) => item.id === "nando-ballade-529564");
    assert.equal(ballade?.artists?.[0], "Nando Dixkontrol");
    assert.equal(ballade?.credits?.some((credit) => credit.name === "Cyberdix" && credit.role === "alias"), true);
    assert.equal(sergi?.tracks[0]?.coverUrl, undefined);
    assert.equal(sergi?.tracks[0]?.credits?.some((credit) => credit.role === "producción"), true);
    assert.equal(sergi?.tracks[0]?.credits?.some((credit) => credit.role === "composición"), true);
    assert.equal(terror?.tracks[0]?.coverUrl, undefined);
    assert.equal(terror?.tracks[0]?.links[0]?.url.endsWith("/32942229"), true);
    assert.equal(ruboy?.tracks.filter((item) => item.links.some((link) => link.url.endsWith("/32942229"))).length, 1);
    assert.equal(artistMatchesSubject(["Dixland Records"], ["Nando Dixkontrol", "Dixkontrol"]), false);
    assert.equal(artistMatchesSubject(["Nando Dixkontrol"], ["Nando Dixkontrol"]), true);
    assert.equal(classifyDiscogsCredit({
      format: "Cass, Mixed",
      discogsRole: "Main",
      artistNames: ["Nando Dixkontrol"],
      subjectNames: ["Nando Dixkontrol"],
      title: "Hangar 13",
    }), "skip");
  });
});

describe("rutas", () => {
  it("abre la ficha o la sesión indicada en el hash sin cambiar de sección", () => {
    assert.equal(readSection("#djs/dj-nau"), "djs");
    assert.equal(readFocus("#djs/dj-nau"), "dj-nau");
    assert.equal(readSection("#djs/dj-pastis"), "djs");
    assert.equal(readFocus("#djs/dj-pastis"), "dj-pastis");
    assert.equal(readSection("#djs/dj-buenri"), "djs");
    assert.equal(readFocus("#djs/dj-buenri"), "dj-buenri");
    assert.equal(readSection("#sesiones/GGCuKvxLx70"), "sesiones");
    assert.equal(readFocus("#sesiones/GGCuKvxLx70"), "GGCuKvxLx70");
    assert.equal(readSection("#sesiones"), "sesiones");
    assert.equal(readFocus("#sesiones"), "");
    assert.equal(readSection("#rincon"), "rincon");
    assert.equal(readSection("#equipo"), "equipo");
  });
});

describe("fase 09", () => {
  const pastis = djs.find((dj) => dj.id === "dj-pastis");
  const buenri = djs.find((dj) => dj.id === "dj-buenri");
  it("separa a Pastis y a Buenri sin copiar solos ni duplicar el dúo", () => {
    assert.ok(pastis && buenri);
    assert.equal(djs.some((dj) => dj.id === "pastis-buenri"), false);
    assert.equal(pastis.biography[0].includes("Sala del Cel"), true);
    assert.equal(buenri.biography[0].includes("Pont Aeri"), true);
    assert.equal(pastis.biography[0] === buenri.biography[0], false);
    assert.equal(songsByRole(pastis, "own").length, 2);
    assert.equal(songsByRole(buenri, "own").length, 0);
    assert.equal(songsByRole(pastis, "produced").length, 2);
    assert.equal(songsByRole(buenri, "produced").length, 6);
    assert.equal(songsByRole(pastis, "remix").length, 2);
    assert.equal(songsByRole(buenri, "remix").length, 0);
    assert.equal(songsByRole(pastis, "collaboration").length, 26);
    assert.equal(songsByRole(buenri, "collaboration").length, 19);
    const shared = ["575057", "224736", "373690", "375388", "257174", "563707", "209874", "473941"];
    for (const person of [pastis, buenri]) {
      for (const release of shared) {
        const copies = person.tracks.filter((track) => track.links.some((link) => link.url.endsWith(`/${release}`)));
        assert.equal(copies.length, 1);
        assert.equal(copies[0].role, "collaboration");
        assert.equal(copies[0].artists.includes("Pastis & Buenri"), true);
      }
      assert.equal(person.tracks.filter((track) => track.id === "pildo-space").length, 1);
    }
    assert.equal(pastis.tracks.some((track) => track.links.some((link) => link.url.endsWith("/209882"))), false);
    assert.equal(buenri.tracks.some((track) => track.links.some((link) => link.url.endsWith("/35125469"))), false);
    assert.equal(pastis.tracks.some((track) => track.links.some((link) => link.url.endsWith("/15669997"))), false);
    assert.equal(pastis.tracks.some((track) => track.links.some((link) => link.url.endsWith("/28199623"))), false);
    assert.equal(buenri.tracks.find((track) => track.id === "buenri-no-rush")?.role, "produced");
    assert.equal(buenri.tracks.find((track) => track.id === "buenri-curare")?.credits?.some((credit) => credit.name === "David Pamies"), true);
    assert.equal(pastis.tracks.find((track) => track.id === "pildo-1996")?.credits?.some((credit) => credit.name === "Dith Wemyd"), true);
    assert.equal(pastis.tracks.find((track) => track.id === "pildo-1996")?.credits?.some((credit) => credit.name === "Julio Posadas"), false);
    const pastisIds = pastis.tracks.map((track) => track.links.map((link) => link.url.match(/release\/(\d+)/)?.[1]).find(Boolean) ?? track.id);
    const buenriIds = buenri.tracks.map((track) => track.links.map((link) => link.url.match(/release\/(\d+)/)?.[1]).find(Boolean) ?? track.id);
    assert.equal(new Set(pastisIds).size, pastisIds.length);
    assert.equal(new Set(buenriIds).size, buenriIds.length);
    const soloPastis = pastisIds.filter((id) => !shared.includes(id) && id !== "pildo-space");
    const soloBuenri = buenriIds.filter((id) => !shared.includes(id) && id !== "pildo-space");
    assert.equal(soloPastis.some((id) => soloBuenri.includes(id)), false);
    assert.equal(pastis.tracks.find((track) => track.id === "adrenalin")?.credits?.some((credit) => credit.name === "Pastis"), true);
    assert.equal(buenri.tracks.find((track) => track.id === "adrenalin")?.credits?.some((credit) => credit.name === "Buenri"), true);
    assert.equal(pastis.portrait?.status, "pending");
    assert.equal(pastis.portrait?.imageUrl, undefined);
    assert.equal(buenri.portrait?.status, "unavailable");
    assert.equal(ids("dj-pastis").length, 18);
    assert.equal(ids("dj-buenri").length, 15);
    assert.equal(ids("dj-sisu").length, 6);
    assert.equal(ids("dj-pastis").includes("IpPiK5zRhZI"), true);
    assert.equal(ids("dj-buenri").includes("IpPiK5zRhZI"), false);
    assert.equal(ids("dj-buenri").includes("y-pnaBQ24I4"), true);
    assert.equal(ids("dj-pastis").includes("y-pnaBQ24I4"), false);
    assert.equal(ids("dj-pastis").includes("K-YhSmi_YJU"), true);
    assert.equal(ids("dj-buenri").includes("K-YhSmi_YJU"), false);
    assert.equal(ids("dj-skudero").length, 0);
    assert.equal(djs.find((dj) => dj.id === "dj-skudero")?.tracks.length, 8);
    assert.equal(catalog.sessions.length, 150);
  });
});

describe("fase 12", () => {
  it("publica ocho fichas nuevas sin repetir identificadores ni vaciar la biografía", () => {
    assert.equal(djs.length, 55);
    assert.equal(new Set(djs.map((dj) => dj.id)).size, 55);
    for (const id of ["dj-lucena", "dj-sepi", "dj-cesk", "xavi-bcn", "javi-tracker", "dj-luna", "dj-piyuli", "bassaul"]) {
      const dj = djs.find((item) => item.id === id);
      assert.ok(dj);
      assert.ok(dj.biography.length > 0);
      assert.ok(dj.links.every((link) => link.url.startsWith("https://")));
      assert.equal(dj.portrait?.status === "verified", false);
    }
    assert.equal(ids("dj-lucena").length, 50);
    assert.equal(ids("dj-sepi").length, 7);
    assert.equal(ids("dj-cesk").length, 6);
    assert.equal(ids("xavi-bcn").length, 1);
    assert.equal(ids("javi-tracker").length, 2);
    assert.equal(ids("dj-luna").length, 2);
    assert.equal(ids("dj-piyuli").length, 1);
    assert.equal(ids("bassaul").length, 1);
    const xavi = djs.find((dj) => dj.id === "xavi-bcn");
    assert.equal(xavi?.tracks.find((track) => track.title === "Everlasting")?.role, "produced");
    assert.equal(xavi?.tracks.find((track) => track.title === "Trance Fly")?.role, "collaboration");
    const tracker = djs.find((dj) => dj.id === "javi-tracker");
    assert.equal(tracker?.tracks.find((track) => track.title === "The Trilogy")?.role, "collaboration");
    assert.equal(readSection("#djs/dj-lucena"), "djs");
    assert.equal(readFocus("#djs/dj-lucena"), "dj-lucena");
    assert.equal(readSection("#djs/xavi-bcn"), "djs");
    assert.equal(readFocus("#djs/xavi-bcn"), "xavi-bcn");
    const contest = catalog.sessions.find((session) => session.youtubeVideoId === "ZiVYJdWRF_s");
    assert.ok(contest?.djIds?.includes("dj-sepi"));
    assert.ok(contest?.djIds?.includes("dj-sisu"));
    assert.equal(catalog.sessions.length, 150);
  });
});

describe("fase 13", () => {
  it("publica tres fichas más y conserva el vídeo de Javi Tracker", () => {
    assert.equal(djs.length, 55);
    assert.equal(catalog.sessions.length, 150);
    for (const id of ["dj-pitu", "adrian-kuyck", "dj-rottar"]) {
      const profile = djs.find((item) => item.id === id);
      assert.ok(profile);
      assert.ok(profile.biography.some((paragraph) => paragraph.length > 0));
      assert.ok(profile.links.every((link) => link.url.startsWith("https://")));
      assert.equal(profile.portrait?.status === "verified", false);
      const releases = profile.tracks.map((track) => track.links[0]?.url);
      assert.equal(new Set(releases).size, releases.length);
    }
    const pitu = djs.find((item) => item.id === "dj-pitu");
    const cesk = djs.find((item) => item.id === "dj-cesk");
    assert.equal(pitu?.tracks.every((track) => track.role === "collaboration"), true);
    assert.equal(cesk?.tracks.length, 2);
    assert.equal(djs.find((item) => item.id === "javi-tracker")?.tracks.find((track) => track.title === "Intro 1.0")?.role, "own");
    assert.equal(djs.find((item) => item.id === "bassaul")?.tracks.length, 16);
    assert.ok(ids("dj-pitu").includes("sABwkJVrk7U"));
    assert.ok(ids("dj-pitu").includes("wwIrt508fWo"));
    assert.equal(ids("dj-pitu").length, 2);
    assert.deepEqual(ids("adrian-kuyck"), ["BOLOUmMjwxo"]);
    assert.ok(ids("dj-rottar").includes("4Tpa249gOrw"));
    assert.ok(ids("da-terror").includes("YcJHNVkzzfQ"));
    assert.ok(ids("frank-trax").includes("5vUss4Y31LA"));
    const intro = catalog.sessions.find((session) => session.title.includes("Intro Sesión Xque"));
    assert.equal(intro?.youtubeVideoId.length, 11);
    assert.equal(intro?.youtubeUrl.includes(intro.youtubeVideoId), true);
    assert.equal(readSection("#djs/dj-pitu"), "djs");
    assert.equal(readFocus("#djs/dj-rottar"), "dj-rottar");
  });
});

describe("fase 14", () => {
  it("amplía fichas y releases sin romper sesiones ni repetir un disco dentro del perfil", () => {
    assert.equal(djs.length, 55);
    assert.equal(catalog.sessions.length, 150);
    const idsInCatalog = new Set(djs.map((dj) => dj.id));
    assert.equal(idsInCatalog.size, 55);
    for (const session of catalog.sessions) {
      assert.match(session.youtubeVideoId, /^[A-Za-z0-9_-]{11}$/);
      for (const djId of session.djIds ?? []) assert.equal(idsInCatalog.has(djId), true);
    }
    for (const dj of djs) {
      assert.ok(dj.biography.some((paragraph) => paragraph.length > 0));
      assert.ok(dj.links.every((item) => item.url.startsWith("https://")));
      const keys = dj.tracks.map((track) => track.links.map((item) => item.url).join("|"));
      assert.equal(new Set(keys).size, keys.length);
    }
    assert.equal(djs.find((dj) => dj.id === "javi-boss")?.tracks.every((track) => track.role === "own"), true);
    assert.equal(djs.find((dj) => dj.id === "dj-reke")?.tracks[0]?.role, "collaboration");
    assert.equal(djs.find((dj) => dj.id === "bassaul")?.tracks.length, 16);
    assert.equal(djs.find((dj) => dj.id === "javi-tracker")?.tracks.length, 6);
    const festa = catalog.sessions.find((session) => session.youtubeVideoId === "yCpRb_v2ZkA");
    assert.deepEqual(festa?.djIds, ["jordi-beat", "dani-kaos"]);
    const reke = catalog.sessions.find((session) => session.youtubeVideoId === "Cr34pQ0gO14");
    assert.ok(reke?.djIds?.includes("da-terror"));
    assert.ok(reke?.djIds?.includes("dj-reke"));
    assert.equal(readFocus("#djs/javi-boss"), "javi-boss");
  });
});

describe("calidad del directorio", () => {
  const removed = ["leo-garriga", "richard-sistema-3", "dj-xeps"];

  it("no publica un nombre, un cartel o una sesión aislada sin trayectoria firmada", () => {
    const idsInCatalog = new Set(djs.map((dj) => dj.id));
    for (const id of removed) assert.equal(idsInCatalog.has(id), false);
    for (const session of catalog.sessions) {
      for (const djId of session.djIds ?? []) assert.equal(removed.includes(djId), false);
    }
    for (const dj of djs) {
      const biography = dj.biography.join(" ");
      assert.ok(biography.length > 180);
      const urls = [
        ...dj.links.map((item) => item.url),
        ...dj.tracks.flatMap((track) => track.links.map((item) => item.url)),
      ];
      assert.ok(urls.some((url) => url.startsWith("https://")));
      assert.equal(biography.toLowerCase().includes(dj.name.toLowerCase()) || biography.length > dj.name.length * 4, true);
    }
    const kuyck = djs.find((dj) => dj.id === "adrian-kuyck");
    assert.match(kuyck?.biography.join(" ") ?? "", /Valhalla/);
    assert.equal(kuyck?.tracks[0]?.role, "collaboration");
    const kaos = djs.find((dj) => dj.id === "dani-kaos");
    assert.equal(kaos?.tracks[0]?.title, "Magnetic Fields (Reworked 2024)");
    assert.equal(kaos?.tracks[0]?.role, "own");
  });
});

describe("fase 15", () => {
  const published = [
    "dj-skryker",
    "oskar-mad",
    "dj-konik",
    "pedro-miras",
    "julio-navas",
    "david-amo",
    "alberto-tapia",
    "cesar-benito",
    "juan-cruz",
    "fran-bit",
    "joan-creus",
    "dj-x-centrik",
    "dj-bull",
    "dj-pepebilly",
    "dj-invi",
    "dj-al-fredo",
    "dj-t-ty",
    "dj-sek",
    "toni-peret",
    "quique-tejada",
    "jose-maria-castells",
  ];
  const stillOut = ["dj-jonyk", "dj-note", "dj-uron", "nervio", "kura", "popper", "ortuno", "leo-garriga", "richard-sistema-3", "dj-xeps"];

  it("publica fichas verificadas y conserva las 150 sesiones sin atribuir concursos", () => {
    assert.equal(djs.length, 55);
    assert.equal(new Set(djs.map((dj) => dj.id)).size, 55);
    assert.equal(catalog.sessions.length, 150);
    const idsInCatalog = new Set(djs.map((dj) => dj.id));
    for (const id of published) assert.equal(idsInCatalog.has(id), true);
    for (const id of stillOut) assert.equal(idsInCatalog.has(id), false);
    for (const session of catalog.sessions) {
      assert.match(session.youtubeVideoId, /^[A-Za-z0-9_-]{11}$/);
      for (const djId of session.djIds ?? []) assert.equal(idsInCatalog.has(djId), true);
    }
    const jonyk = catalog.sessions.find((session) => session.youtubeVideoId === "YqBps9i2xa8");
    assert.equal(jonyk?.djIds, undefined);
    assert.equal(djs.find((dj) => dj.id === "dj-sek")?.tracks[0]?.role, "collaboration");
    assert.equal(djs.find((dj) => dj.id === "toni-peret")?.tracks.length, 0);
    assert.equal(djs.find((dj) => dj.id === "dj-sepi")?.tracks.some((track) => track.links[0]?.url.endsWith("/844934")), true);
    assert.equal(djs.find((dj) => dj.id === "javi-tracker")?.tracks.some((track) => track.links[0]?.url.endsWith("/775993")), true);
    const shared = "https://www.discogs.com/release/1811166";
    assert.equal(djs.find((dj) => dj.id === "david-amo")?.tracks[0]?.links[0]?.url, shared);
    assert.equal(djs.find((dj) => dj.id === "julio-navas")?.tracks[0]?.links[0]?.url, shared);
  });
});

describe("fase 18", () => {
  it("no publica retratos sin licencia y conserva el catálogo musical", () => {
    assert.equal(djs.length, 55);
    assert.equal(djs.reduce((sum, dj) => sum + dj.tracks.length, 0), 618);
    assert.equal(catalog.sessions.length, 150);
    assert.equal(djs.some((dj) => dj.portrait?.status === "verified"), false);
    assert.equal(djs.some((dj) => dj.portrait?.imageUrl), false);
    const ids = new Set(djs.map((dj) => dj.id));
    assert.equal(ids.size, 55);
    for (const dj of djs) {
      assert.ok(dj.portrait?.status === "pending" || dj.portrait?.status === "unavailable");
      if (dj.portrait?.status === "pending") {
        assert.ok(dj.portrait.sourceUrl?.startsWith("https://"));
        assert.ok(dj.portrait.sourceName);
      }
    }
    assert.deepEqual(auditPortraits(djsRaw, () => false), []);
  });
});

describe("fase 19", () => {
  const rights = {
    sourceUrl: "https://example.com/fuente",
    sourceName: "Archivo de prueba",
    photographer: "Archivo de prueba",
    rightsHolder: "Archivo de prueba",
    license: "Cesión escrita para MAKINA SOUND",
    licenseUrl: "https://example.com/licencia",
    checkedAt: "2026-10-15",
  };

  function profile(id: string, portrait: Record<string, unknown>) {
    return {
      id,
      name: "Foto Prueba",
      biography: ["Ficha de prueba."],
      tracks: [],
      links: [{ label: "Fuente", url: "https://example.com/fuente" }],
      portrait,
    };
  }

  it("muestra un retrato local o remoto solo con la licencia documentada", () => {
    const local = openDjs([profile("foto-local", { status: "verified", imageUrl: "/images/djs/foto-local.jpg", ...rights })]);
    assert.equal(local[0]?.portrait?.status, "verified");
    assert.equal(local[0]?.portrait?.imageUrl, "/images/djs/foto-local.jpg");
    const localPhoto = portraitImage(local[0]);
    assert.equal(localPhoto.kind, "photo");
    if (localPhoto.kind === "photo") assert.equal(localPhoto.attribution, "Archivo de prueba. Cesión escrita para MAKINA SOUND");
    const remote = openDjs([profile("foto-remota", { status: "verified", imageUrl: "https://example.com/foto.jpg", ...rights })]);
    assert.equal(portraitImage(remote[0]).kind, "photo");
    const bare = openDjs([profile("foto-local", {
      status: "verified",
      imageUrl: "/images/djs/foto-local.jpg",
      sourceUrl: rights.sourceUrl,
      sourceName: rights.sourceName,
    })]);
    assert.equal(bare[0]?.portrait?.status, "unavailable");
    assert.equal(bare[0]?.portrait?.imageUrl, undefined);
    assert.equal(portraitImage(bare[0]).kind, "illustration");
    const escape = openDjs([profile("foto-local", { status: "verified", imageUrl: "/images/djs/../secreto.jpg", ...rights })]);
    assert.equal(escape[0]?.portrait?.status, "unavailable");
    const pending = openDjs([profile("pendiente", { status: "pending", imageUrl: "/images/djs/pendiente.jpg", ...rights })]);
    assert.equal(pending[0]?.portrait?.status, "pending");
    assert.equal(pending[0]?.portrait?.imageUrl, undefined);
    assert.equal(portraitImage(pending[0]).kind, "illustration");
    const candidate = openDjs([profile("candidato", { status: "candidate", imageUrl: "https://example.com/candidato.jpg", sourceUrl: rights.sourceUrl, sourceName: rights.sourceName })]);
    assert.equal(candidate[0]?.portrait?.status, "candidate");
    assert.equal(candidate[0]?.portrait?.imageUrl, undefined);
    assert.equal(portraitImage(candidate[0]).kind, "illustration");
    assert.deepEqual(shownPortrait(portraitImage(local[0]), true), { kind: "illustration", label: "Imagen no disponible" });
    assert.deepEqual(
      auditPortraits([profile("foto-local", { status: "verified", imageUrl: "/images/djs/foto-local.jpg", ...rights })], () => false),
      ["foto-local: no existe public/images/djs/foto-local.jpg."],
    );
    assert.deepEqual(
      auditPortraits([profile("foto-local", { status: "verified", imageUrl: "/images/djs/foto-local.jpg", ...rights })], () => true),
      [],
    );
    assert.equal(djs.length, 55);
    assert.equal(djs.reduce((sum, dj) => sum + dj.tracks.length, 0), 618);
    assert.equal(catalog.sessions.length, 150);
  });
});
