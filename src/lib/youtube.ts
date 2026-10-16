const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const CHANNEL_ID = /^UC[A-Za-z0-9_-]{22}$/;

const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "youtube-nocookie.com",
  "youtu.be",
]);

export function isVideoId(value: string): boolean {
  return VIDEO_ID.test(value);
}

export function isChannelId(value: string): boolean {
  return CHANNEL_ID.test(value);
}

export function videoIdFromUrl(value: string): string | null {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");
  if (!YOUTUBE_HOSTS.has(host)) return null;
  if (host === "youtu.be") {
    const id = url.pathname.split("/").filter(Boolean)[0] ?? "";
    return isVideoId(id) ? id : null;
  }
  if (url.pathname === "/watch") {
    const id = url.searchParams.get("v") ?? "";
    return isVideoId(id) ? id : null;
  }
  const parts = url.pathname.split("/").filter(Boolean);
  if ((parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") && parts[1] && isVideoId(parts[1])) {
    return parts[1];
  }
  return null;
}

export function embedUrl(videoId: string): string | null {
  if (!isVideoId(videoId)) return null;
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function thumbnailUrl(videoId: string): string | null {
  if (!isVideoId(videoId)) return null;
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

export function channelUrlMatches(value: string, channelId: string): boolean {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return false;
  }
  if (url.protocol !== "https:" || url.hostname !== "www.youtube.com") return false;
  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "channel" && parts.length === 2) return parts[1] === channelId;
  if (parts.length === 1 && /^@[A-Za-z0-9._-]{3,60}$/.test(parts[0])) return true;
  return false;
}

export function isPublishedDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}
