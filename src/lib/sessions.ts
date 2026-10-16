import { includesQuery } from "./search.ts";
import { prepareSources, type SourceRecord } from "./sources.ts";
import { embedUrl, isChannelId, isPublishedDate, isVideoId, thumbnailUrl, videoIdFromUrl } from "./youtube.ts";

export type SessionEra = "remember" | "current" | "unknown";
export type SessionStatus = "draft" | "published";
export type SessionKind = "session" | "pending" | "excluded";
export type EraFilter = "all" | "remember" | "current";

export type SessionRecord = {
  id: string;
  title: string;
  djName?: string;
  channelName: string;
  channelId?: string;
  youtubeVideoId: string;
  youtubeUrl: string;
  publishedAt?: string;
  viewCount?: number;
  durationSeconds?: number;
  era: SessionEra;
  description?: string;
  sourceUrl: string;
  sourceIds: string[];
  djIds?: string[];
  status: SessionStatus;
  kind: SessionKind;
};

export type SessionSort = "date-desc" | "date-asc" | "name" | "views" | "duration";

export type SessionQuery = {
  text: string;
  era: EraFilter;
  sort: SessionSort;
  djId?: string;
  venueSessionIds?: readonly string[];
};

const ERAS = new Set<SessionEra>(["remember", "current", "unknown"]);
const STATUSES = new Set<SessionStatus>(["draft", "published"]);
const KINDS = new Set<SessionKind>(["session", "pending", "excluded"]);

function wholeNumber(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) return undefined;
  return value;
}

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

export function validateSession(value: unknown, sourceIds: ReadonlySet<string>): SessionRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const id = text(record.id);
  const title = text(record.title);
  const channelName = text(record.channelName);
  const youtubeVideoId = text(record.youtubeVideoId);
  const youtubeUrl = text(record.youtubeUrl);
  const sourceUrl = text(record.sourceUrl);
  const era = record.era;
  const status = record.status;
  const kind = record.kind;
  if (!id || !title || !channelName || !youtubeVideoId || !youtubeUrl || !sourceUrl) return null;
  if (!isVideoId(youtubeVideoId) || videoIdFromUrl(youtubeUrl) !== youtubeVideoId) return null;
  if (!embedUrl(youtubeVideoId) || !isHttpUrl(sourceUrl)) return null;
  if (typeof era !== "string" || !ERAS.has(era as SessionEra)) return null;
  if (typeof status !== "string" || !STATUSES.has(status as SessionStatus)) return null;
  if (typeof kind !== "string" || !KINDS.has(kind as SessionKind)) return null;
  if (!Array.isArray(record.sourceIds) || record.sourceIds.length === 0) return null;
  const links = record.sourceIds.filter((item): item is string => typeof item === "string" && sourceIds.has(item));
  if (links.length !== record.sourceIds.length) return null;

  const djName = text(record.djName);
  const channelId = text(record.channelId);
  const publishedAt = text(record.publishedAt);
  const description = text(record.description);
  const viewCount = wholeNumber(record.viewCount);
  const durationSeconds = wholeNumber(record.durationSeconds);
  if (record.djName !== undefined && !djName) return null;
  if (record.channelId !== undefined && (!channelId || !isChannelId(channelId))) return null;
  if (record.publishedAt !== undefined && (!publishedAt || !isPublishedDate(publishedAt))) return null;
  if (record.description !== undefined && !description) return null;
  if (record.viewCount !== undefined && viewCount === undefined) return null;
  if (record.durationSeconds !== undefined && (!durationSeconds || durationSeconds < 1)) return null;
  const djIds = readDjIds(record.djIds);
  if (djIds === null) return null;

  return {
    id,
    title,
    djName,
    channelName,
    channelId,
    youtubeVideoId,
    youtubeUrl,
    publishedAt,
    viewCount,
    durationSeconds,
    era: era as SessionEra,
    description,
    sourceUrl,
    sourceIds: links,
    djIds,
    status: status as SessionStatus,
    kind: kind as SessionKind,
  };
}

function readDjIds(value: unknown): string[] | undefined | null {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.length === 0) return null;
  const ids: string[] = [];
  const seen = new Set<string>();
  for (const item of value) {
    if (typeof item !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(item) || seen.has(item)) return null;
    seen.add(item);
    ids.push(item);
  }
  return ids;
}

function unionIds(left: string[] | undefined, right: string[] | undefined): string[] | undefined {
  const ids = [...new Set([...(left ?? []), ...(right ?? [])])];
  return ids.length > 0 ? ids : undefined;
}

function compareSessions(a: SessionRecord, b: SessionRecord): number {
  if (a.publishedAt && b.publishedAt && a.publishedAt !== b.publishedAt) {
    return a.publishedAt < b.publishedAt ? 1 : -1;
  }
  if (a.publishedAt && !b.publishedAt) return -1;
  if (!a.publishedAt && b.publishedAt) return 1;
  return a.title.localeCompare(b.title, "es");
}

export function publishSessions(value: unknown, sources: readonly SourceRecord[]): SessionRecord[] {
  if (!Array.isArray(value)) return [];
  const sourceIds = new Set(sources.map((source) => source.id));
  const byVideo = new Map<string, SessionRecord>();
  for (const item of value) {
    const session = validateSession(item, sourceIds);
    if (!session || session.status !== "published" || session.kind !== "session") continue;
    const current = byVideo.get(session.youtubeVideoId);
    if (!current) {
      byVideo.set(session.youtubeVideoId, session);
      continue;
    }
    const sourceIdsMerged = [...new Set([...current.sourceIds, ...session.sourceIds])];
    byVideo.set(session.youtubeVideoId, {
      ...current,
      sourceIds: sourceIdsMerged,
      publishedAt: current.publishedAt ?? session.publishedAt,
      djName: current.djName ?? session.djName,
      djIds: unionIds(current.djIds, session.djIds),
      viewCount: largerCount(current.viewCount, session.viewCount),
      durationSeconds: current.durationSeconds ?? session.durationSeconds,
    });
  }
  return [...byVideo.values()].sort(compareSessions);
}

function largerCount(current: number | undefined, next: number | undefined): number | undefined {
  if (current === undefined) return next;
  if (next === undefined) return current;
  return Math.max(current, next);
}

function compareByDate(a: SessionRecord, b: SessionRecord, direction: 1 | -1): number {
  if (a.publishedAt && b.publishedAt && a.publishedAt !== b.publishedAt) {
    return a.publishedAt < b.publishedAt ? direction : -direction;
  }
  if (a.publishedAt && !b.publishedAt) return -1;
  if (!a.publishedAt && b.publishedAt) return 1;
  return a.title.localeCompare(b.title, "es");
}

function compareByCount(
  a: SessionRecord,
  b: SessionRecord,
  read: (session: SessionRecord) => number | undefined,
): number {
  const left = read(a);
  const right = read(b);
  if (left !== undefined && right !== undefined && left !== right) return right - left;
  if (left !== undefined && right === undefined) return -1;
  if (left === undefined && right !== undefined) return 1;
  return compareByDate(a, b, 1);
}

export function filterSessions(
  sessions: readonly SessionRecord[],
  query: SessionQuery,
  names?: ReadonlyMap<string, string>,
): SessionRecord[] {
  const venueIds = query.venueSessionIds ? new Set(query.venueSessionIds) : null;
  const byEra = query.era === "all" ? sessions : sessions.filter((session) => session.era === query.era);
  const matched = byEra.filter((session) => {
    if (query.djId && !session.djIds?.includes(query.djId)) return false;
    if (venueIds && !venueIds.has(session.id)) return false;
    const linkedNames = (session.djIds ?? []).flatMap((id) => {
      const name = names?.get(id);
      return name ? [name] : [];
    });
    return includesQuery(query.text, [session.title, session.djName ?? "", ...linkedNames]);
  });
  const sorted = [...matched];
  if (query.sort === "date-asc") sorted.sort((a, b) => compareByDate(a, b, -1));
  else if (query.sort === "name") {
    sorted.sort((a, b) => a.title.localeCompare(b.title, "es") || compareByDate(a, b, 1));
  } else if (query.sort === "views") sorted.sort((a, b) => compareByCount(a, b, (session) => session.viewCount));
  else if (query.sort === "duration") {
    sorted.sort((a, b) => compareByCount(a, b, (session) => session.durationSeconds));
  } else sorted.sort((a, b) => compareByDate(a, b, 1));
  return sorted;
}

export function sessionsForDj(sessions: readonly SessionRecord[], djId: string): SessionRecord[] {
  return sessions.filter((session) => session.djIds?.includes(djId));
}

export function sessionEmbedUrl(session: SessionRecord): string | null {
  return embedUrl(session.youtubeVideoId);
}

export function sessionThumbnailUrl(session: SessionRecord): string | null {
  return thumbnailUrl(session.youtubeVideoId);
}

export type Catalog = {
  sources: SourceRecord[];
  sessions: SessionRecord[];
};

export function openCatalog(rawSources: unknown, rawSessions: unknown): Catalog {
  const sources = prepareSources(rawSources);
  return {
    sources,
    sessions: publishSessions(rawSessions, sources),
  };
}
