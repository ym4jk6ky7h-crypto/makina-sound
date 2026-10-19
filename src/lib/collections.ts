import { isPublishedDate } from "./youtube.ts";

export type EditorialStatus = "draft" | "review" | "published";

export type SourceLink = {
  label: string;
  url: string;
  note?: string;
  affiliate?: boolean;
};

export type VenueRecord = {
  id: string;
  name: string;
  summary: string;
  category: string;
  location?: string;
  period?: string;
  aliases: string[];
  places: string[];
  paragraphs: string[];
  djIds: string[];
  sessionIds: string[];
  links: SourceLink[];
  images: VenueImage[];
  checkedAt?: string;
};

export type VenueImage = {
  url: string;
  alt: string;
  caption: string;
  author: string;
  takenAt?: string;
  kind?: "photo" | "logo";
  license: string;
  licenseUrl: string;
  sourceName: string;
  sourceUrl: string;
};

export type FlyerRecord = {
  id: string;
  title: string;
  summary: string;
  quality: "verificada" | "parcial";
  eventDate?: string;
  venueName?: string;
  venueId?: string;
  djIds: string[];
  credit?: string;
  imageUrl?: string;
  license?: string;
  licenseUrl?: string;
  links: SourceLink[];
  checkedAt?: string;
};

export const tutorialCategories = [
  "cabinas",
  "soportes",
  "acustica",
  "paneles",
  "iluminacion",
  "cableado",
  "montaje",
  "mantenimiento",
] as const;

export type TutorialCategory = (typeof tutorialCategories)[number];

export const tutorialCategoryLabels: Record<TutorialCategory, string> = {
  cabinas: "Cabinas y muebles",
  soportes: "Soportes de monitores",
  acustica: "Acústica de salas pequeñas",
  paneles: "Paneles y trampas de graves",
  iluminacion: "Iluminación y acabados",
  cableado: "Cableado",
  montaje: "Montaje del equipo",
  mantenimiento: "Mantenimiento",
};

export type TutorialRecord = {
  id: string;
  title: string;
  summary: string;
  category: TutorialCategory;
  difficulty: "inicial" | "medio" | "avanzado";
  steps: string[];
  safety: string;
  tools: string[];
  materials: string[];
  links: SourceLink[];
  expected?: string;
  time?: string;
  warnings: string[];
  checkedAt?: string;
};

export const gearCategories = [
  "monitores",
  "pa",
  "subwoofers",
  "mesas",
  "controladoras",
  "reproductores",
  "platos",
  "capsulas",
  "auriculares",
  "accesorios",
] as const;

export type GearCategory = (typeof gearCategories)[number];

export const gearCategoryLabels: Record<GearCategory, string> = {
  monitores: "Monitores de estudio",
  pa: "Altavoces de PA",
  subwoofers: "Subwoofers",
  mesas: "Mesas de mezclas",
  controladoras: "Controladoras",
  reproductores: "Reproductores",
  platos: "Platos",
  capsulas: "Cápsulas y agujas",
  auriculares: "Auriculares",
  accesorios: "Accesorios y cableado",
};

export type GearPrice = {
  amount: number;
  currency: string;
  shop: string;
  url: string;
  checkedAt: string;
};

export type GearImage = {
  url: string;
  alt: string;
  author: string;
  license: string;
  licenseUrl: string;
  sourceName: string;
  sourceUrl: string;
};

export type GearRecord = {
  id: string;
  manufacturer: string;
  model: string;
  category: GearCategory;
  summary: string;
  specs: Record<string, string>;
  strengths: string[];
  limits: string[];
  suitedFor?: string;
  price?: GearPrice;
  image?: GearImage;
  links: SourceLink[];
  checkedAt?: string;
};

export type ComparisonItem = {
  productId: string;
  suitedFor: string;
  strengths: string[];
  limits: string[];
};

export type ComparisonRecord = {
  id: string;
  title: string;
  category: GearCategory;
  question: string;
  items: ComparisonItem[];
  links: SourceLink[];
  checkedAt?: string;
};

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function httpsUrl(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function slug(value: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value);
}

export function readLinks(value: unknown): SourceLink[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;
  const links: SourceLink[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;
    const label = text(record.label);
    const url = text(record.url);
    if (!label || !url || !httpsUrl(url)) return null;
    if (record.affiliate !== undefined && record.affiliate !== true && record.affiliate !== false) return null;
    const note = record.note === undefined ? undefined : text(record.note);
    if (record.note !== undefined && !note) return null;
    links.push({ label, url, note, affiliate: record.affiliate === true ? true : undefined });
  }
  return links;
}

function checkedAt(record: Record<string, unknown>): string | undefined | null {
  if (record.checkedAt === undefined) return undefined;
  const value = text(record.checkedAt);
  if (!value || !isPublishedDate(value)) return null;
  return value;
}

function stringList(value: unknown, allowEmpty: boolean): string[] | null {
  if (!Array.isArray(value)) return null;
  if (!allowEmpty && value.length === 0) return null;
  const items: string[] = [];
  for (const item of value) {
    const line = text(item);
    if (!line) return null;
    items.push(line);
  }
  return items;
}

function isPublished(record: Record<string, unknown>): boolean {
  return record.status === "published";
}

function idList(value: unknown, pattern: RegExp): string[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return null;
  const ids: string[] = [];
  for (const item of value) {
    const id = text(item);
    if (!id || !pattern.test(id) || ids.includes(id)) return null;
    ids.push(id);
  }
  return ids;
}

function paragraphsOf(value: unknown): string[] | null {
  if (value === undefined) return [];
  return stringList(value, true);
}

const VENUE_IMAGE = /^\/images\/venues\/[a-z0-9]+(?:-[a-z0-9]+)*\.(?:jpg|jpeg|png|webp)$/;

function readVenueImages(value: unknown, venueId: string): VenueImage[] | null {
  if (value === undefined) return [];
  if (!Array.isArray(value)) return null;
  const images: VenueImage[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;
    const url = text(record.url);
    const alt = text(record.alt);
    const caption = text(record.caption);
    const author = text(record.author);
    const license = text(record.license);
    const licenseUrl = text(record.licenseUrl);
    const sourceName = text(record.sourceName);
    const sourceUrl = text(record.sourceUrl);
    const takenAt = text(record.takenAt);
    const kind = text(record.kind);
    if (!url || !alt || !caption || !author || !license || !licenseUrl || !sourceName || !sourceUrl) return null;
    if (record.kind !== undefined && kind !== "photo" && kind !== "logo") return null;
    if (!httpsUrl(licenseUrl) || !httpsUrl(sourceUrl)) return null;
    if (record.takenAt !== undefined && (!takenAt || !isPublishedDate(takenAt))) return null;
    const local = VENUE_IMAGE.test(url);
    if (!local && !httpsUrl(url)) return null;
    if (local) {
      const stem = url.slice(url.lastIndexOf("/") + 1).replace(/\.[^.]+$/, "");
      if (stem !== venueId && !stem.startsWith(`${venueId}-`)) return null;
    }
    images.push({
      url,
      alt,
      caption,
      author,
      license,
      licenseUrl,
      sourceName,
      sourceUrl,
      takenAt,
      kind: kind === "logo" ? "logo" : undefined,
    });
  }
  return images;
}

export function openVenues(value: unknown): VenueRecord[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const venues: VenueRecord[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (!isPublished(record)) continue;
    const id = text(record.id);
    const name = text(record.name);
    const summary = text(record.summary);
    const category = text(record.category);
    const location = text(record.location);
    const period = text(record.period);
    const aliases = record.aliases === undefined ? [] : stringList(record.aliases, true);
    const places = record.places === undefined ? [] : stringList(record.places, true);
    const paragraphs = paragraphsOf(record.paragraphs);
    const djIds = idList(record.djIds, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    const sessionIds = idList(record.sessionIds, /^[A-Za-z0-9_-]{11}$/);
    const links = readLinks(record.links);
    const checked = checkedAt(record);
    if (!id || !slug(id) || seen.has(id) || !name || !summary || !category || !links || checked === null) continue;
    if (record.location !== undefined && !location) continue;
    if (record.period !== undefined && !period) continue;
    const images = readVenueImages(record.images, id);
    if (!aliases || !places || !paragraphs || !djIds || !sessionIds || !images) continue;
    seen.add(id);
    venues.push({
      id,
      name,
      summary,
      category,
      location,
      period,
      aliases,
      places,
      paragraphs,
      djIds,
      sessionIds,
      links,
      images,
      checkedAt: checked ?? undefined,
    });
  }
  return venues;
}

export function openFlyers(value: unknown): FlyerRecord[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const flyers: FlyerRecord[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (!isPublished(record)) continue;
    const id = text(record.id);
    const title = text(record.title);
    const summary = text(record.summary);
    const quality = record.quality === "verificada" || record.quality === "parcial" ? record.quality : undefined;
    const links = readLinks(record.links);
    const imageUrl = text(record.imageUrl);
    const license = text(record.license);
    const licenseUrl = text(record.licenseUrl);
    const venueId = text(record.venueId);
    const djIds = idList(record.djIds, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    const checked = checkedAt(record);
    if (!id || !slug(id) || seen.has(id) || !title || !summary || !quality || !links || checked === null || !djIds) continue;
    if (record.imageUrl !== undefined && (!imageUrl || !httpsUrl(imageUrl))) continue;
    if (imageUrl && (!license || !licenseUrl || !httpsUrl(licenseUrl))) continue;
    if (record.venueId !== undefined && (!venueId || !slug(venueId))) continue;
    const eventDate = text(record.eventDate);
    if (record.eventDate !== undefined && (!eventDate || !isPublishedDate(eventDate))) continue;
    const venueName = text(record.venueName);
    const credit = text(record.credit);
    if (record.venueName !== undefined && !venueName) continue;
    if (record.credit !== undefined && !credit) continue;
    seen.add(id);
    flyers.push({
      id,
      title,
      summary,
      quality,
      eventDate,
      venueName,
      venueId,
      djIds,
      credit,
      imageUrl,
      license,
      licenseUrl,
      links,
      checkedAt: checked ?? undefined,
    });
  }
  return flyers;
}

export function openTutorials(value: unknown): TutorialRecord[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const tutorials: TutorialRecord[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (!isPublished(record)) continue;
    const id = text(record.id);
    const title = text(record.title);
    const summary = text(record.summary);
    const category = tutorialCategories.find((itemId) => itemId === record.category);
    const difficulty =
      record.difficulty === "inicial" || record.difficulty === "medio" || record.difficulty === "avanzado"
        ? record.difficulty
        : undefined;
    const steps = stringList(record.steps, false);
    const safety = text(record.safety);
    const tools = stringList(record.tools, true);
    const materials = stringList(record.materials, true);
    const links = readLinks(record.links);
    const warnings = stringList(record.warnings ?? [], true);
    const checked = checkedAt(record);
    if (!id || !slug(id) || seen.has(id) || !title || !summary || !category || !difficulty) continue;
    if (!steps || !safety || !tools || !materials || !links || !warnings || checked === null) continue;
    seen.add(id);
    tutorials.push({
      id,
      title,
      summary,
      category,
      difficulty,
      steps,
      safety,
      tools,
      materials,
      links,
      expected: text(record.expected),
      time: text(record.time),
      warnings,
      checkedAt: checked ?? undefined,
    });
  }
  return tutorials;
}

function readPrice(value: unknown): GearPrice | undefined | null {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const amount = record.amount;
  const currency = text(record.currency);
  const shop = text(record.shop);
  const url = text(record.url);
  const checked = text(record.checkedAt);
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 0) return null;
  if (!currency || !/^[A-Z]{3}$/.test(currency) || !shop || !url || !httpsUrl(url)) return null;
  if (!checked || !isPublishedDate(checked)) return null;
  return { amount, currency, shop, url, checkedAt: checked };
}

function readSpecs(value: unknown): Record<string, string> | null {
  if (value === undefined) return {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const specs: Record<string, string> = {};
  for (const [key, item] of Object.entries(value)) {
    const name = text(key);
    const spec = text(item);
    if (!name || !spec) return null;
    specs[name] = spec;
  }
  return specs;
}

function readGearImage(value: unknown): GearImage | undefined | null {
  if (value === undefined) return undefined;
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const url = text(record.url);
  const alt = text(record.alt);
  const author = text(record.author);
  const license = text(record.license);
  const licenseUrl = text(record.licenseUrl);
  const sourceName = text(record.sourceName);
  const sourceUrl = text(record.sourceUrl);
  if (!url || !httpsUrl(url) || !alt || !author || !license) return null;
  if (!licenseUrl || !httpsUrl(licenseUrl) || !sourceName || !sourceUrl || !httpsUrl(sourceUrl)) return null;
  return { url, alt, author, license, licenseUrl, sourceName, sourceUrl };
}

export function openGear(value: unknown): GearRecord[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  const products: GearRecord[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (!isPublished(record)) continue;
    const id = text(record.id);
    const manufacturer = text(record.manufacturer);
    const model = text(record.model);
    const category = gearCategories.find((itemId) => itemId === record.category);
    const summary = text(record.summary);
    const specs = readSpecs(record.specs);
    const strengths = stringList(record.strengths ?? [], true);
    const limits = stringList(record.limits ?? [], true);
    const links = readLinks(record.links);
    const price = readPrice(record.price);
    const image = readGearImage(record.image);
    const checked = checkedAt(record);
    if (!id || !slug(id) || seen.has(id) || !manufacturer || !model || !category || !summary) continue;
    if (!specs || !strengths || !limits || !links || price === null || image === null || checked === null) continue;
    seen.add(id);
    products.push({
      id,
      manufacturer,
      model,
      category,
      summary,
      specs,
      strengths,
      limits,
      suitedFor: text(record.suitedFor),
      price: price ?? undefined,
      image: image ?? undefined,
      links,
      checkedAt: checked ?? undefined,
    });
  }
  return products;
}

export function openComparisons(value: unknown, products: readonly GearRecord[]): ComparisonRecord[] {
  if (!Array.isArray(value)) return [];
  const productIds = new Set(products.map((product) => product.id));
  const seen = new Set<string>();
  const comparisons: ComparisonRecord[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const record = item as Record<string, unknown>;
    if (!isPublished(record)) continue;
    const id = text(record.id);
    const title = text(record.title);
    const category = gearCategories.find((itemId) => itemId === record.category);
    const question = text(record.question);
    const links = readLinks(record.links);
    const checked = checkedAt(record);
    if (!id || !slug(id) || seen.has(id) || !title || !category || !question || !links || checked === null) continue;
    if (!Array.isArray(record.items) || record.items.length < 2) continue;
    const items: ComparisonItem[] = [];
    let valid = true;
    for (const entry of record.items) {
      if (!entry || typeof entry !== "object") {
        valid = false;
        break;
      }
      const row = entry as Record<string, unknown>;
      const productId = text(row.productId);
      const suitedFor = text(row.suitedFor);
      const strengths = stringList(row.strengths, false);
      const limits = stringList(row.limits, false);
      if (!productId || !productIds.has(productId) || !suitedFor || !strengths || !limits) {
        valid = false;
        break;
      }
      items.push({ productId, suitedFor, strengths, limits });
    }
    if (!valid) continue;
    seen.add(id);
    comparisons.push({ id, title, category, question, items, links, checkedAt: checked ?? undefined });
  }
  return comparisons;
}
