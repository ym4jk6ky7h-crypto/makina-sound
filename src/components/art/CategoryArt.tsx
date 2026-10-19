import type { JSX } from "react";
import type { GearCategory, TutorialCategory } from "../../lib/collections.ts";

export type CategoryArtKind = "todas" | GearCategory | TutorialCategory;

function Todas() {
  return (
    <>
      <rect x="28" y="24" width="120" height="70" fill="#E7FF42" />
      <rect x="172" y="24" width="120" height="70" fill="#FF3B8D" />
      <rect x="28" y="110" width="120" height="66" fill="#F0E9DA" />
      <rect x="172" y="110" width="120" height="66" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
    </>
  );
}

function Monitores() {
  return (
    <>
      <rect x="36" y="48" width="78" height="104" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="75" cy="92" r="22" fill="#101010" stroke="#E7FF42" strokeWidth="4" />
      <rect x="206" y="48" width="78" height="104" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="245" cy="92" r="22" fill="#101010" stroke="#FF3B8D" strokeWidth="4" />
      <path d="M114 150 H206" stroke="#E7FF42" strokeWidth="3" />
    </>
  );
}

function Pa() {
  return (
    <>
      <rect x="108" y="18" width="104" height="164" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <rect x="124" y="34" width="72" height="36" fill="#FF3B8D" />
      <circle cx="160" cy="112" r="32" fill="#101010" stroke="#E7FF42" strokeWidth="4" />
      <rect x="124" y="154" width="72" height="10" fill="#F0E9DA" />
    </>
  );
}

function Subwoofers() {
  return (
    <>
      <rect x="24" y="46" width="272" height="112" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="160" cy="102" r="40" fill="#101010" stroke="#FF3B8D" strokeWidth="6" />
      <circle cx="160" cy="102" r="10" fill="#E7FF42" />
    </>
  );
}

function Mesas() {
  return (
    <>
      <rect x="22" y="58" width="276" height="96" rx="4" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      {Array.from({ length: 6 }, (_, index) => (
        <rect key={index} x={40 + index * 28} y={78} width="8" height="56" fill={index % 2 === 0 ? "#E7FF42" : "#FF3B8D"} />
      ))}
      <circle cx="230" cy="96" r="12" fill="#F0E9DA" />
      <circle cx="262" cy="96" r="12" fill="#F0E9DA" />
    </>
  );
}

function Controladoras() {
  return (
    <>
      <rect x="28" y="40" width="264" height="120" rx="6" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="92" cy="100" r="28" fill="#101010" stroke="#E7FF42" strokeWidth="5" />
      <circle cx="228" cy="100" r="28" fill="#101010" stroke="#FF3B8D" strokeWidth="5" />
      <rect x="142" y="78" width="36" height="44" fill="#F0E9DA" />
    </>
  );
}

function Reproductores() {
  return (
    <>
      <rect x="28" y="36" width="264" height="128" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <rect x="46" y="52" width="92" height="64" fill="#E7FF42" />
      <circle cx="214" cy="100" r="40" fill="#101010" stroke="#FF3B8D" strokeWidth="6" />
      <circle cx="214" cy="100" r="8" fill="#F0E9DA" />
    </>
  );
}

function Platos() {
  return (
    <>
      <rect x="36" y="28" width="248" height="144" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="132" cy="100" r="52" fill="#101010" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="132" cy="100" r="16" fill="#E7FF42" />
      <path d="M214 46 L250 132" stroke="#FF3B8D" strokeWidth="6" />
      <circle cx="214" cy="46" r="8" fill="#F0E9DA" />
    </>
  );
}

function Capsulas() {
  return (
    <>
      <rect x="118" y="28" width="84" height="48" fill="#F0E9DA" />
      <rect x="138" y="76" width="44" height="54" fill="#FF3B8D" />
      <path d="M160 130 L160 168" stroke="#E7FF42" strokeWidth="4" />
      <circle cx="160" cy="172" r="6" fill="#E7FF42" />
    </>
  );
}

function Auriculares() {
  return (
    <>
      <path d="M78 108 C78 48 242 48 242 108" fill="none" stroke="#F0E9DA" strokeWidth="10" />
      <rect x="48" y="96" width="48" height="70" fill="#E7FF42" />
      <rect x="224" y="96" width="48" height="70" fill="#FF3B8D" />
    </>
  );
}

function Accesorios() {
  return (
    <>
      <path d="M40 60 C90 60 90 140 140 140 C190 140 190 60 240 60 C270 60 280 90 280 90" fill="none" stroke="#E7FF42" strokeWidth="8" />
      <rect x="24" y="46" width="28" height="28" fill="#FF3B8D" />
      <rect x="268" y="78" width="28" height="28" fill="#F0E9DA" />
    </>
  );
}

function Cabinas() {
  return (
    <>
      <rect x="28" y="78" width="264" height="18" fill="#F0E9DA" />
      <rect x="48" y="96" width="16" height="70" fill="#F0E9DA" />
      <rect x="256" y="96" width="16" height="70" fill="#F0E9DA" />
      <rect x="70" y="40" width="70" height="38" fill="#242424" stroke="#E7FF42" strokeWidth="3" />
      <rect x="180" y="40" width="70" height="38" fill="#242424" stroke="#FF3B8D" strokeWidth="3" />
    </>
  );
}

function Soportes() {
  return (
    <>
      <rect x="58" y="36" width="64" height="40" fill="#242424" stroke="#E7FF42" strokeWidth="3" />
      <rect x="86" y="76" width="8" height="78" fill="#F0E9DA" />
      <rect x="62" y="154" width="56" height="8" fill="#F0E9DA" />
      <rect x="198" y="36" width="64" height="40" fill="#242424" stroke="#FF3B8D" strokeWidth="3" />
      <rect x="226" y="76" width="8" height="78" fill="#F0E9DA" />
      <rect x="202" y="154" width="56" height="8" fill="#F0E9DA" />
    </>
  );
}

function Acustica() {
  return (
    <>
      <path d="M40 160 L40 48 L160 48 L280 160" fill="none" stroke="#F0E9DA" strokeWidth="4" />
      <path d="M70 150 C110 90 210 90 250 150" fill="none" stroke="#E7FF42" strokeWidth="4" />
      <path d="M96 150 C124 116 196 116 224 150" fill="none" stroke="#FF3B8D" strokeWidth="4" />
    </>
  );
}

function Paneles() {
  return (
    <>
      <rect x="36" y="28" width="248" height="144" fill="none" stroke="#F0E9DA" strokeWidth="3" />
      <rect x="56" y="48" width="48" height="104" fill="#E7FF42" />
      <rect x="136" y="48" width="48" height="104" fill="#FF3B8D" />
      <rect x="216" y="48" width="48" height="104" fill="#F0E9DA" />
    </>
  );
}

function Iluminacion() {
  return (
    <>
      <rect x="40" y="36" width="240" height="12" fill="#F0E9DA" />
      <circle cx="80" cy="112" r="28" fill="#E7FF42" />
      <circle cx="160" cy="112" r="28" fill="#FF3B8D" />
      <circle cx="240" cy="112" r="28" fill="#F0E9DA" />
    </>
  );
}

function Cableado() {
  return (
    <>
      <rect x="28" y="78" width="36" height="44" fill="#FF3B8D" />
      <rect x="256" y="78" width="36" height="44" fill="#E7FF42" />
      <path d="M64 100 H120 L160 64 L200 136 L256 100" fill="none" stroke="#F0E9DA" strokeWidth="6" />
    </>
  );
}

function Montaje() {
  return (
    <>
      <rect x="46" y="96" width="150" height="16" transform="rotate(-32 46 96)" fill="#F0E9DA" />
      <rect x="118" y="46" width="16" height="120" fill="#E7FF42" />
      <circle cx="214" cy="78" r="28" fill="none" stroke="#FF3B8D" strokeWidth="8" />
    </>
  );
}

function Mantenimiento() {
  return (
    <>
      <rect x="78" y="36" width="28" height="92" fill="#F0E9DA" />
      {Array.from({ length: 7 }, (_, index) => (
        <rect key={index} x={70 + index * 8} y="128" width="4" height="36" fill="#E7FF42" />
      ))}
      <rect x="196" y="48" width="56" height="36" fill="#FF3B8D" />
      <path d="M224 84 L224 150" stroke="#F0E9DA" strokeWidth="4" />
    </>
  );
}

const drawings: Record<CategoryArtKind, () => JSX.Element> = {
  todas: Todas,
  monitores: Monitores,
  pa: Pa,
  subwoofers: Subwoofers,
  mesas: Mesas,
  controladoras: Controladoras,
  reproductores: Reproductores,
  platos: Platos,
  capsulas: Capsulas,
  auriculares: Auriculares,
  accesorios: Accesorios,
  cabinas: Cabinas,
  soportes: Soportes,
  acustica: Acustica,
  paneles: Paneles,
  iluminacion: Iluminacion,
  cableado: Cableado,
  montaje: Montaje,
  mantenimiento: Mantenimiento,
};

export function CategoryArt({ kind }: { kind: CategoryArtKind }) {
  const Drawing = drawings[kind];
  return (
    <svg className="motif" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect width="320" height="200" fill="#171717" />
      <Drawing />
    </svg>
  );
}

export function CategoryPlate({ kind }: { kind: CategoryArtKind }) {
  return (
    <div className="art">
      <CategoryArt kind={kind} />
      <span className="art-credit">Ilustración</span>
    </div>
  );
}
