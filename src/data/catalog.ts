import rawSessions from "./sessions.json" with { type: "json" };
import rawSources from "./sources.json" with { type: "json" };
import { openCatalog } from "../lib/sessions.ts";

export function readCatalog() {
  return openCatalog(rawSources, rawSessions);
}
