import type { FlyerRecord, VenueRecord } from "./collections.ts";

export type NamedRef = { id: string; name: string };
export type SessionRef = { id: string; title: string };

export type VenueScreen =
  | { kind: "directory"; venues: VenueRecord[] }
  | {
      kind: "profile";
      venue: VenueRecord;
      djs: NamedRef[];
      sessions: SessionRef[];
      flyers: FlyerRecord[];
    }
  | { kind: "missing"; id: string };

export function describeVenue(
  id: string,
  venues: VenueRecord[],
  djs: NamedRef[],
  sessions: SessionRef[],
  flyers: FlyerRecord[],
): VenueScreen {
  if (!id) return { kind: "directory", venues };
  const venue = venues.find((item) => item.id === id);
  if (!venue) return { kind: "missing", id };
  const knownDjs = new Map(djs.map((dj) => [dj.id, dj]));
  const knownSessions = new Map(sessions.map((session) => [session.id, session]));
  return {
    kind: "profile",
    venue,
    djs: venue.djIds.flatMap((djId) => {
      const dj = knownDjs.get(djId);
      return dj ? [dj] : [];
    }),
    sessions: venue.sessionIds.flatMap((sessionId) => {
      const session = knownSessions.get(sessionId);
      return session ? [session] : [];
    }),
    flyers: flyers.filter((flyer) => flyer.venueId === venue.id),
  };
}

export function describeFlyer(
  id: string,
  flyers: FlyerRecord[],
  venues: VenueRecord[],
  djs: NamedRef[],
): { kind: "directory"; flyers: FlyerRecord[] } | { kind: "profile"; flyer: FlyerRecord; venue?: VenueRecord; djs: NamedRef[] } | { kind: "missing"; id: string } {
  if (!id) return { kind: "directory", flyers };
  const flyer = flyers.find((item) => item.id === id);
  if (!flyer) return { kind: "missing", id };
  const knownDjs = new Map(djs.map((dj) => [dj.id, dj]));
  return {
    kind: "profile",
    flyer,
    venue: venues.find((venue) => venue.id === flyer.venueId),
    djs: flyer.djIds.flatMap((djId) => {
      const dj = knownDjs.get(djId);
      return dj ? [dj] : [];
    }),
  };
}

export function venuesForDj(djId: string, venues: VenueRecord[]): VenueRecord[] {
  return venues.filter((venue) => venue.djIds.includes(djId));
}
