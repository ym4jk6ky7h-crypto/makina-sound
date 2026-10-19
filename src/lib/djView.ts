import type { CareerStage, DjCredit, DjLink, DjProfile, DjSort, DjTrack } from "./djs.ts";
import { filterDjs, songsByRole } from "./djs.ts";
import type { SessionRecord } from "./sessions.ts";
import { sessionsForDj } from "./sessions.ts";
import { embedUrl, videoIdFromUrl } from "./youtube.ts";
import { includesQuery } from "./search.ts";

export const DJ_DIRECTORY_HASH = "#djs";

export const emptyDjCopy = {
  artist: "No hay temas documentados en esta ficha.",
  productions: "No hay producciones documentadas en esta ficha.",
  sessions: "No hay sesiones relacionadas en el catálogo.",
} as const;

const artistRoles: { role: DjCredit; title: string; note?: string }[] = [
  { role: "own", title: "Temas propios" },
  { role: "collaboration", title: "Colaboraciones" },
  { role: "remix", title: "Remixes" },
  { role: "reissue", title: "Reediciones" },
  { role: "compilation", title: "Recopilatorios", note: "Salir en un recopilatorio no demuestra que esa persona produjera el tema." },
];

export type DjImage =
  | { kind: "photo" | "logo"; url: string; alt: string; sourceName: string; sourceUrl: string; attribution: string }
  | { kind: "illustration"; label: "Ilustración" | "Imagen no disponible" };

export function publicAsset(url: string, base = import.meta.env.BASE_URL || "/"): string {
  if (!url.startsWith("/")) return url;
  if (!base || base === "/") return url;
  const prefix = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${prefix}${url}`;
}

export type DjDirectoryCard = {
  id: string;
  name: string;
  href: string;
  facts: string[];
  hint: string | null;
  marks: string[];
  image: DjImage;
};

export type DjContentFilter = "all" | "discografia" | "sesiones" | "sala";

export type DjDirectoryQuery = {
  text: string;
  sort: DjSort;
  content?: DjContentFilter;
  room?: string;
};

export type DjRoomRef = { id: string; name: string; djIds: readonly string[] };

export type DjDirectoryCounts = {
  artists: number;
  withReleases: number;
  withSessions: number;
  withRooms: number;
};

export type DjArtistGroup = {
  role: DjCredit;
  title: string;
  note?: string;
  tracks: DjTrack[];
};

export type DjProfileView = {
  id: string;
  name: string;
  backHref: typeof DJ_DIRECTORY_HASH;
  years: string | null;
  biography: string[];
  stages: CareerStage[];
  links: DjLink[];
  reviewedAt?: string;
  image: DjImage;
  artistGroups: DjArtistGroup[];
  artistEmpty: string | null;
  productions: DjTrack[];
  productionsEmpty: string | null;
  sessions: SessionRecord[];
  sessionsEmpty: string | null;
};

export type DjScreen =
  | { kind: "directory"; title: "DJs"; cards: DjDirectoryCard[]; counts: DjDirectoryCounts }
  | { kind: "profile"; profile: DjProfileView }
  | { kind: "missing"; id: string; backHref: typeof DJ_DIRECTORY_HASH };

export type PlayableMedia = {
  youtubeVideoId: string;
  youtubeUrl: string;
  title: string;
};

export function djProfileHash(id: string): string {
  return `#djs/${id}`;
}

export function portraitImage(dj: Pick<DjProfile, "name" | "portrait">): DjImage {
  const portrait = dj.portrait;
  if (
    portrait?.status === "verified" &&
    portrait.imageUrl &&
    portrait.sourceUrl &&
    portrait.sourceName &&
    portrait.license &&
    portrait.licenseUrl &&
    portrait.checkedAt
  ) {
    const logo = portrait.kind === "logo";
    const duo = dj.name.includes("&");
    const attribution = [portrait.photographer, portrait.license].filter(Boolean).join(". ");
    return {
      kind: logo ? "logo" : "photo",
      url: portrait.imageUrl,
      alt: logo
        ? `Logotipo de ${dj.name}`
        : duo ? `Fotografía del dúo ${dj.name}` : `Fotografía de ${dj.name}`,
      sourceName: portrait.sourceName,
      sourceUrl: portrait.sourceUrl,
      attribution,
    };
  }
  return { kind: "illustration", label: "Ilustración" };
}

export function shownPortrait(image: DjImage, failed: boolean): DjImage {
  if ((image.kind === "photo" || image.kind === "logo") && failed) return { kind: "illustration", label: "Imagen no disponible" };
  return image;
}

export function yearsLabel(dj: Pick<DjProfile, "activeFrom" | "activeUntil">): string | null {
  if (!dj.activeFrom) return null;
  return dj.activeUntil ? `${dj.activeFrom}–${dj.activeUntil}` : `Desde ${dj.activeFrom}`;
}

function presenceHint(trackCount: number, sessionCount: number): string | null {
  if (trackCount > 0 && sessionCount > 0) return "Música y sesiones";
  if (trackCount > 0) return "Con discografía";
  if (sessionCount > 0) return "Con sesiones";
  return null;
}

function countLabel(count: number, one: string, many: string): string | null {
  if (count === 1) return `1 ${one}`;
  if (count > 1) return `${count} ${many}`;
  return null;
}

export function workLabel(dj: DjProfile, sessionCount: number): string | null {
  const parts = [
    countLabel(songsByRole(dj, "own").length, "tema", "temas"),
    countLabel(songsByRole(dj, "collaboration").length, "colaboración", "colaboraciones"),
    countLabel(songsByRole(dj, "remix").length, "remix", "remixes"),
    countLabel(songsByRole(dj, "produced").length, "producción", "producciones"),
    countLabel(songsByRole(dj, "reissue").length, "reedición", "reediciones"),
    countLabel(songsByRole(dj, "compilation").length, "recopilatorio", "recopilatorios"),
    countLabel(sessionCount, "sesión", "sesiones"),
  ].filter((part): part is string => Boolean(part));
  return parts.length > 0 ? parts.join(" · ") : null;
}

function roomsFor(djId: string, rooms: readonly DjRoomRef[]): DjRoomRef[] {
  return rooms.filter((room) => room.djIds.includes(djId));
}

function directoryCounts(djs: readonly DjProfile[], sessions: readonly SessionRecord[], rooms: readonly DjRoomRef[]): DjDirectoryCounts {
  return {
    artists: djs.length,
    withReleases: djs.filter((dj) => dj.tracks.length > 0).length,
    withSessions: djs.filter((dj) => sessionsForDj(sessions, dj.id).length > 0).length,
    withRooms: djs.filter((dj) => roomsFor(dj.id, rooms).length > 0).length,
  };
}

export function describeDjScreen(
  focus: string,
  djs: readonly DjProfile[],
  sessions: readonly SessionRecord[],
  query: DjDirectoryQuery,
  rooms: readonly DjRoomRef[] = [],
): DjScreen {
  if (!focus) {
    const content = query.content ?? "all";
    const roomId = query.room ?? "";
    const named = djs.filter((dj) => {
      const linked = roomsFor(dj.id, rooms);
      const sessionCount = sessionsForDj(sessions, dj.id).length;
      if (content === "discografia" && dj.tracks.length === 0) return false;
      if (content === "sesiones" && sessionCount === 0) return false;
      if (content === "sala" && linked.length === 0) return false;
      if (roomId && !linked.some((room) => room.id === roomId)) return false;
      return includesQuery(query.text, [dj.name, ...linked.map((room) => room.name)]);
    });
    const visible = filterDjs(named, { text: "", year: "", sort: query.sort === "records" ? "name" : query.sort });
    if (query.sort === "records") {
      visible.sort((a, b) => {
        const weight = (dj: DjProfile) => dj.tracks.length + sessionsForDj(sessions, dj.id).length;
        const diff = weight(b) - weight(a);
        return diff !== 0 ? diff : a.name.localeCompare(b.name, "es");
      });
    }
    return {
      kind: "directory",
      title: "DJs",
      counts: directoryCounts(djs, sessions, rooms),
      cards: visible.map((dj) => {
        const year = yearsLabel(dj);
        const sessionCount = sessionsForDj(sessions, dj.id).length;
        const linked = roomsFor(dj.id, rooms);
        const marks = [
          countLabel(dj.tracks.length, "lanzamiento", "lanzamientos"),
          countLabel(sessionCount, "sesión", "sesiones"),
          linked.length === 1 ? linked[0].name : linked.length > 1 ? `${linked.length} salas` : null,
        ].filter((mark): mark is string => Boolean(mark));
        return {
          id: dj.id,
          name: dj.name,
          href: djProfileHash(dj.id),
          facts: year ? [year] : [],
          hint: presenceHint(dj.tracks.length, sessionCount),
          marks,
          image: portraitImage(dj),
        };
      }),
    };
  }
  const dj = djs.find((item) => item.id === focus);
  if (!dj) return { kind: "missing", id: focus, backHref: DJ_DIRECTORY_HASH };
  const artistGroups = artistRoles
    .map((group) => ({ ...group, tracks: songsByRole(dj, group.role) }))
    .filter((group) => group.tracks.length > 0);
  const productions = songsByRole(dj, "produced");
  const linked = sessionsForDj(sessions, dj.id);
  return {
    kind: "profile",
    profile: {
      id: dj.id,
      name: dj.name,
      backHref: DJ_DIRECTORY_HASH,
      years: yearsLabel(dj),
      biography: dj.biography,
      stages: dj.stages,
      links: dj.links,
      reviewedAt: dj.reviewedAt,
      image: portraitImage(dj),
      artistGroups,
      artistEmpty: artistGroups.length === 0 ? emptyDjCopy.artist : null,
      productions,
      productionsEmpty: productions.length === 0 ? emptyDjCopy.productions : null,
      sessions: linked,
      sessionsEmpty: linked.length === 0 ? emptyDjCopy.sessions : null,
    },
  };
}

export function mediaPlayer(source: { title: string; youtubeVideoId?: string; youtubeUrl?: string } | null): PlayableMedia | null {
  if (!source?.youtubeVideoId || !source.youtubeUrl) return null;
  if (videoIdFromUrl(source.youtubeUrl) !== source.youtubeVideoId) return null;
  if (!embedUrl(source.youtubeVideoId)) return null;
  return {
    title: source.title,
    youtubeVideoId: source.youtubeVideoId,
    youtubeUrl: source.youtubeUrl,
  };
}
