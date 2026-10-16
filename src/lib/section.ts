export type SectionId =
  | "inicio"
  | "explorar"
  | "archivo"
  | "proyecto"
  | "discos"
  | "djs"
  | "sesiones"
  | "salas"
  | "flyers"
  | "rincon"
  | "equipo";

const sections: SectionId[] = [
  "inicio",
  "explorar",
  "archivo",
  "proyecto",
  "discos",
  "djs",
  "sesiones",
  "salas",
  "flyers",
  "rincon",
  "equipo",
];

const aliases: Record<string, SectionId> = {
  "la-noche": "inicio",
  "pieza-tempo": "discos",
  "pieza-sesion": "sesiones",
  "pieza-sala": "salas",
  "pieza-papel": "flyers",
};

function bareHash(hash: string): string {
  return hash.replace(/^#/, "").split("/")[0] ?? "";
}

export function readFocus(hash = window.location.hash): string {
  const focus = hash.replace(/^#/, "").split("/")[1] ?? "";
  return /^[A-Za-z0-9_-]+$/.test(focus) ? focus : "";
}

export function readSection(hash = window.location.hash): SectionId {
  const id = bareHash(hash);
  if (!id || id === "inicio") return "inicio";
  if (aliases[id]) return aliases[id];
  if (sections.includes(id as SectionId)) return id as SectionId;
  return "inicio";
}

export function openSection(id: SectionId) {
  const next = `#${id}`;
  if (window.location.hash === next) {
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    return;
  }
  window.location.hash = next;
}
