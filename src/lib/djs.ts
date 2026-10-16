import { includesQuery } from "./search.ts";
import { embedUrl, isPublishedDate, isVideoId, videoIdFromUrl } from "./youtube.ts";

export type DjSort = "name" | "date-desc" | "date-asc";

export type DjLink = {
  label: string;
  url: string;
};

export type DjCreditLine = {
  name: string;
  role: string;
};

export type DjWorkKind = "song" | "session";
export type DjCredit = "own" | "collaboration" | "produced" | "remix" | "compilation" | "reissue";
export type DjStatus = "draft" | "review" | "published";

export type CareerStage = {
  id: string;
  heading: string;
  text: string;
};

export type DjTrack = {
  id: string;
  title: string;
  kind: DjWorkKind;
  role: DjCredit;
  year?: string;
  artists?: string[];
  label?: string;
  format?: string;
  catalogNumber?: string;
  coverUrl?: string;
  credits?: DjCreditLine[];
  edition?: string;
  links: DjLink[];
  youtubeVideoId?: string;
  youtubeUrl?: string;
};

export type DjPortraitStatus = "verified" | "pending" | "candidate" | "unavailable";

export type DjPortrait = {
  status: DjPortraitStatus;
  imageUrl?: string;
  sourceUrl?: string;
  sourceName?: string;
  photographer?: string;
  rightsHolder?: string;
  license?: string;
  licenseUrl?: string;
  checkedAt?: string;
};

export type DjProfile = {
  id: string;
  name: string;
  activeFrom?: number;
  activeUntil?: number;
  biography: string[];
  stages: CareerStage[];
  links: DjLink[];
  tracks: DjTrack[];
  reviewedAt?: string;
  portrait?: DjPortrait;
};

export type DjQuery = {
  text: string;
  year: string;
  sort: DjSort;
};

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function yearNumber(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1950 || value > 2100) return undefined;
  return value;
}

function httpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function readLinks(value: unknown): DjLink[] {
  if (!Array.isArray(value)) return [];
  const links: DjLink[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const label = text(record.label);
    const url = text(record.url);
    if (!label || !url || !httpsUrl(url)) continue;
    links.push({ label, url });
  }
  return links;
}

const ROLES = new Set<DjCredit>(["own", "collaboration", "produced", "remix", "compilation", "reissue"]);

function optionalText(record: Record<string, unknown>, key: string): string | undefined | null {
  if (record[key] === undefined) return undefined;
  return text(record[key]) ?? null;
}

function readArtists(value: unknown): string[] | undefined | null {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.length === 0) return null;
  const names: string[] = [];
  for (const item of value) {
    const name = text(item);
    if (!name) return null;
    names.push(name);
  }
  return names;
}

function readCreditLines(value: unknown): DjCreditLine[] | undefined | null {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.length === 0) return null;
  const lines: DjCreditLine[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;
    const name = text(record.name);
    const role = text(record.role);
    if (!name || !role) return null;
    lines.push({ name, role });
  }
  return lines;
}

function readRole(record: Record<string, unknown>): DjCredit | null {
  const raw = record.role ?? record.credit;
  if (raw === undefined) return "own";
  return typeof raw === "string" && ROLES.has(raw as DjCredit) ? (raw as DjCredit) : null;
}

function readStages(value: unknown): CareerStage[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return null;
  const stages: CareerStage[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;
    const id = text(record.id);
    const heading = text(record.heading);
    const body = text(record.text);
    if (!id || !heading || !body || seen.has(id)) return null;
    seen.add(id);
    stages.push({ id, heading, text: body });
  }
  return stages;
}

function readTrack(value: unknown): DjTrack | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const id = text(record.id);
  const title = text(record.title);
  const year = text(record.year);
  const kind = record.kind === "song" || record.kind === "session" ? record.kind : undefined;
  const role = readRole(record);
  if (!id || !title || !kind || !role) return null;
  const coverUrl = text(record.coverUrl);
  if (record.coverUrl !== undefined && (!coverUrl || !httpsUrl(coverUrl))) return null;
  if (record.year !== undefined && !/^\d{4}$/.test(year ?? "")) return null;
  const artists = readArtists(record.artists);
  const label = optionalText(record, "label");
  const format = optionalText(record, "format");
  const catalogNumber = optionalText(record, "catalogNumber");
  if (artists === null || label === null || format === null || catalogNumber === null) return null;
  const credits = readCreditLines(record.credits);
  const edition = optionalText(record, "edition");
  if (credits === null || edition === null) return null;
  const links = readLinks(record.links);
  if (links.length === 0) return null;
  const youtube = links.find((link) => videoIdFromUrl(link.url));
  const youtubeVideoId = youtube ? videoIdFromUrl(youtube.url) ?? undefined : undefined;
  if (youtubeVideoId && !embedUrl(youtubeVideoId)) return null;
  return {
    id,
    title,
    kind,
    role,
    year,
    artists,
    label: label ?? undefined,
    format: format ?? undefined,
    catalogNumber: catalogNumber ?? undefined,
    coverUrl,
    credits,
    edition: edition ?? undefined,
    links,
    youtubeVideoId: youtubeVideoId && isVideoId(youtubeVideoId) ? youtubeVideoId : undefined,
    youtubeUrl: youtube?.url,
  };
}

const PORTRAIT_STATUS = new Set<DjPortraitStatus>(["verified", "pending", "candidate", "unavailable"]);
const LOCAL_PORTRAIT = /^\/images\/djs\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp)$/;

export function isLocalPortraitPath(value: string): boolean {
  return LOCAL_PORTRAIT.test(value);
}

function portraitImageAllowed(value: string): boolean {
  return httpsUrl(value) || isLocalPortraitPath(value);
}

function readPortrait(value: unknown): DjPortrait | undefined {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object") return undefined;
  const record = value as Record<string, unknown>;
  const status = record.status;
  if (typeof status !== "string" || !PORTRAIT_STATUS.has(status as DjPortraitStatus)) return undefined;
  const imageUrl = text(record.imageUrl);
  const sourceUrl = text(record.sourceUrl);
  const sourceName = text(record.sourceName);
  const photographer = text(record.photographer);
  const rightsHolder = text(record.rightsHolder);
  const license = text(record.license);
  const licenseUrl = text(record.licenseUrl);
  const checkedAt = text(record.checkedAt);
  if (status === "verified") {
    if (
      !imageUrl || !sourceUrl || !sourceName || !license || !licenseUrl || !checkedAt ||
      !portraitImageAllowed(imageUrl) || !httpsUrl(sourceUrl) || !httpsUrl(licenseUrl) ||
      !isPublishedDate(checkedAt)
    ) {
      return { status: "unavailable" };
    }
    return {
      status,
      imageUrl,
      sourceUrl,
      sourceName,
      license,
      licenseUrl,
      checkedAt,
      photographer,
      rightsHolder,
    };
  }
  if ((status === "pending" || status === "candidate") && sourceUrl && sourceName && httpsUrl(sourceUrl)) {
    return { status, sourceUrl, sourceName };
  }
  return { status: "unavailable" };
}

export function auditPortraits(value: unknown, fileExists: (publicPath: string) => boolean): string[] {
  const issues: string[] = [];
  if (!Array.isArray(value)) return ["El catálogo de DJs no es una lista."];
  const opened = new Map(openDjs(value).map((dj) => [dj.id, dj]));
  const files = new Map<string, string>();
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    const id = text(record.id) ?? "sin identificador";
    if (!record.portrait || typeof record.portrait !== "object") continue;
    const raw = record.portrait as Record<string, unknown>;
    const imageUrl = text(raw.imageUrl) ?? "";
    const profile = opened.get(id);
    if (raw.status === "verified") {
      if (profile?.portrait?.status !== "verified") {
        issues.push(`${id}: retrato marcado como verificado sin documentación suficiente.`);
      }
      if (imageUrl.startsWith("/")) {
        if (!isLocalPortraitPath(imageUrl)) {
          issues.push(`${id}: la ruta local no está en /images/djs/.`);
        } else if (imageUrl.slice(imageUrl.lastIndexOf("/") + 1).replace(/\.[^.]+$/, "") !== id) {
          issues.push(`${id}: el archivo no usa el identificador del DJ.`);
        } else if (!fileExists(imageUrl.slice(1))) {
          issues.push(`${id}: no existe public${imageUrl}.`);
        } else {
          const previous = files.get(imageUrl);
          if (previous) issues.push(`${imageUrl} está asociado a ${previous} y a ${id}.`);
          files.set(imageUrl, id);
        }
      }
    } else if (imageUrl && profile?.portrait?.imageUrl) {
      issues.push(`${id}: un retrato no autorizado conserva la imagen.`);
    }
  }
  return issues;
}

function readDj(value: unknown): DjProfile | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const id = text(record.id);
  const name = text(record.name);
  const biography = Array.isArray(record.biography)
    ? record.biography.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
  if (!id || !name || biography.length === 0 || !Array.isArray(record.tracks)) return null;
  if (record.status === "draft" || record.status === "review") return null;
  if (record.status !== undefined && record.status !== "published") return null;
  const reviewedAt = text(record.reviewedAt);
  if (record.reviewedAt !== undefined && (!reviewedAt || !isPublishedDate(reviewedAt))) return null;
  const activeFrom = yearNumber(record.activeFrom);
  const activeUntil = yearNumber(record.activeUntil);
  if (record.activeFrom !== undefined && activeFrom === undefined) return null;
  if (record.activeUntil !== undefined && activeUntil === undefined) return null;
  if (activeFrom && activeUntil && activeUntil < activeFrom) return null;
  const stages = readStages(record.stages);
  if (!stages) return null;
  const seen = new Set<string>();
  const tracks: DjTrack[] = [];
  for (const item of record.tracks) {
    const track = readTrack(item);
    if (!track || seen.has(track.id)) continue;
    seen.add(track.id);
    tracks.push(track);
  }
  const uniqueTracks = dedupeTracks(tracks);
  const links = readLinks(record.links);
  if (tracks.length === 0 && links.length === 0) return null;
  const portrait = readPortrait(record.portrait);
  return { id, name, activeFrom, activeUntil, biography, stages, links, tracks: uniqueTracks, reviewedAt, portrait };
}

export function openDjs(value: unknown): DjProfile[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const djs: DjProfile[] = [];
  for (const item of value) {
    const dj = readDj(item);
    if (!dj || seen.has(dj.id)) continue;
    seen.add(dj.id);
    djs.push(dj);
  }
  return djs.sort((a, b) => a.name.localeCompare(b.name, "es"));
}

function overlapsYear(dj: DjProfile, year: number): boolean {
  if (!dj.activeFrom) return false;
  if (dj.activeFrom > year) return false;
  if (dj.activeUntil && dj.activeUntil < year) return false;
  return true;
}

export function songsByRole(dj: DjProfile, role: DjCredit): DjTrack[] {
  return dj.tracks.filter((track) => track.kind === "song" && track.role === role);
}

export function discogsReleaseId(url: string): string | undefined {
  const match = url.match(/discogs\.com\/release\/(\d+)/);
  return match?.[1];
}

export function dedupeTracks(tracks: readonly DjTrack[]): DjTrack[] {
  const seen = new Set<string>();
  const unique: DjTrack[] = [];
  for (const track of tracks) {
    const releaseId = track.links.map((link) => discogsReleaseId(link.url)).find(Boolean);
    const key = releaseId ? `release:${releaseId}` : `id:${track.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(track);
  }
  return unique;
}

const MIX_FORMAT = /mixed|\bcomp\b/i;
const CREDIT_SPLIT = /\s+(?:&|feat\.?|featuring|vs\.?|x|and)\s+|,\s*/i;

function discogsKey(name: string): string {
  return name.trim().replace(/\s+\(\d+\)$/, "").replace(/\s+/g, " ").toLowerCase();
}

export function artistMatchesSubject(artistNames: readonly string[], subjectNames: readonly string[]): boolean {
  const subjects = subjectNames.map(discogsKey).filter((name) => name.length >= 3);
  for (const artist of artistNames) {
    const cleaned = discogsKey(artist);
    if (subjects.includes(cleaned)) return true;
    for (const part of cleaned.split(CREDIT_SPLIT)) {
      const name = part.trim().replace(/^dj\s+/, "");
      if (name.length >= 3 && subjects.includes(name)) return true;
    }
  }
  return false;
}

function titleNamesSubject(title: string, subjectNames: readonly string[]): boolean {
  const haystack = ` ${discogsKey(title)} `;
  return subjectNames.some((name) => {
    const subject = discogsKey(name);
    if (subject.length < 4) return false;
    return new RegExp(`[^a-z0-9]${subject.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[^a-z0-9]`, "i").test(haystack);
  });
}

export function classifyDiscogsCredit(input: {
  format: string;
  discogsRole: string;
  artistNames: readonly string[];
  subjectNames: readonly string[];
  title: string;
  label?: string;
}): DjCredit | "skip" {
  if (MIX_FORMAT.test(input.format)) return "skip";
  if (/aicovers/i.test(input.label ?? "")) return "skip";
  if (input.artistNames.some((name) => /^various$/i.test(name.trim()))) return "skip";
  const subject = artistMatchesSubject(input.artistNames, input.subjectNames);
  if (/remix/i.test(input.discogsRole)) {
    return subject || titleNamesSubject(input.title, input.subjectNames) ? "remix" : "skip";
  }
  if (/producer/i.test(input.discogsRole) && !subject) return "produced";
  if (!subject) return "skip";
  return input.artistNames.length > 1 ? "collaboration" : "own";
}

export function filterDjs(
  djs: readonly DjProfile[],
  query: DjQuery,
  extras?: ReadonlyMap<string, readonly string[]>,
): DjProfile[] {
  const year = /^\d{4}$/.test(query.year) ? Number(query.year) : 0;
  const matched = djs.filter((dj) => {
    if (year && !overlapsYear(dj, year)) return false;
    return includesQuery(query.text, [
      dj.name,
      ...dj.biography,
      ...dj.stages.flatMap((stage) => [stage.heading, stage.text]),
      ...dj.tracks.map((track) => track.title),
      ...(extras?.get(dj.id) ?? []),
    ]);
  });
  const sorted = [...matched];
  if (query.sort === "date-desc" || query.sort === "date-asc") {
    sorted.sort((a, b) => {
      if (a.activeFrom && b.activeFrom && a.activeFrom !== b.activeFrom) {
        return query.sort === "date-desc" ? b.activeFrom - a.activeFrom : a.activeFrom - b.activeFrom;
      }
      if (a.activeFrom && !b.activeFrom) return -1;
      if (!a.activeFrom && b.activeFrom) return 1;
      return a.name.localeCompare(b.name, "es");
    });
  } else {
    sorted.sort((a, b) => a.name.localeCompare(b.name, "es"));
  }
  return sorted;
}
