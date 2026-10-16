import rawDjs from "./djs.json" with { type: "json" };
import { openDjs } from "../lib/djs.ts";

export function readDjs() {
  return openDjs(rawDjs);
}
