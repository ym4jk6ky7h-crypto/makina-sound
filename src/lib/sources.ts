import { channelUrlMatches, isChannelId } from "./youtube.ts";

export type SourceType = "channel" | "artist";
export type VerificationStatus = "verified" | "pending";

export type SourceRecord = {
  id: string;
  displayName: string;
  youtubeName?: string;
  channelId?: string;
  channelUrl?: string;
  sourceType: SourceType;
  enabled: boolean;
  verificationStatus: VerificationStatus;
  note?: string;
};

const SOURCE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const TYPES = new Set<SourceType>(["channel", "artist"]);
const STATUSES = new Set<VerificationStatus>(["verified", "pending"]);

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function validateSource(value: unknown): SourceRecord | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const id = text(record.id);
  const displayName = text(record.displayName);
  const sourceType = record.sourceType;
  const verificationStatus = record.verificationStatus;
  if (!id || !SOURCE_ID.test(id) || !displayName) return null;
  if (typeof sourceType !== "string" || !TYPES.has(sourceType as SourceType)) return null;
  if (typeof verificationStatus !== "string" || !STATUSES.has(verificationStatus as VerificationStatus)) return null;
  if (typeof record.enabled !== "boolean") return null;

  const youtubeName = text(record.youtubeName);
  const channelId = text(record.channelId);
  const channelUrl = text(record.channelUrl);
  const note = text(record.note);
  if (record.youtubeName !== undefined && !youtubeName) return null;
  if (record.channelId !== undefined && !channelId) return null;
  if (record.channelUrl !== undefined && !channelUrl) return null;
  if (record.note !== undefined && !note) return null;

  if (verificationStatus === "pending") {
    if (channelId || channelUrl || record.enabled) return null;
    return {
      id,
      displayName,
      youtubeName,
      sourceType: sourceType as SourceType,
      enabled: false,
      verificationStatus: "pending",
      note,
    };
  }

  if (!channelId || !isChannelId(channelId) || !channelUrl || !channelUrlMatches(channelUrl, channelId)) return null;
  if (!record.enabled) return null;
  return {
    id,
    displayName,
    youtubeName,
    channelId,
    channelUrl,
    sourceType: sourceType as SourceType,
    enabled: true,
    verificationStatus: "verified",
    note,
  };
}

export function prepareSources(value: unknown): SourceRecord[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const sources: SourceRecord[] = [];
  for (const item of value) {
    const source = validateSource(item);
    if (!source || seen.has(source.id)) continue;
    seen.add(source.id);
    sources.push(source);
  }
  return sources;
}
