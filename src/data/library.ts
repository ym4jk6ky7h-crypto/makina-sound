import rawComparisons from "./comparisons.json" with { type: "json" };
import rawFlyers from "./flyers.json" with { type: "json" };
import rawGear from "./gear.json" with { type: "json" };
import rawTutorials from "./tutorials.json" with { type: "json" };
import rawVenues from "./venues.json" with { type: "json" };
import { openComparisons, openFlyers, openGear, openTutorials, openVenues } from "../lib/collections.ts";

export function readVenues() {
  return openVenues(rawVenues);
}

export function readFlyers() {
  return openFlyers(rawFlyers);
}

export function readTutorials() {
  return openTutorials(rawTutorials);
}

export function readGear() {
  return openGear(rawGear);
}

export function readComparisons() {
  return openComparisons(rawComparisons, readGear());
}
