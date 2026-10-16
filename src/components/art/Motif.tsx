import type { MotifKind } from "../../data/cover";

function Vinyl() {
  return (
    <>
      <rect width="320" height="200" fill="#171717" />
      <g transform="translate(28 36) rotate(-8)">
        <rect width="78" height="108" fill="#F0E9DA" stroke="#F0E9DA" strokeWidth="3" />
        <rect width="78" height="16" fill="#FF3B8D" />
        <rect x="10" y="70" width="56" height="5" fill="#171717" />
        <rect x="10" y="82" width="36" height="5" fill="#171717" />
      </g>
      <circle cx="188" cy="100" r="74" fill="#101010" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="188" cy="100" r="58" fill="none" stroke="#F0E9DA" strokeOpacity="0.4" />
      <circle cx="188" cy="100" r="44" fill="none" stroke="#F0E9DA" strokeOpacity="0.4" />
      <circle cx="188" cy="100" r="30" fill="none" stroke="#F0E9DA" strokeOpacity="0.4" />
      <circle cx="188" cy="100" r="20" fill="#E7FF42" />
      <circle cx="188" cy="100" r="4" fill="#171717" />
    </>
  );
}

function Session() {
  return (
    <>
      <rect width="320" height="200" fill="#171717" />
      <rect x="22" y="36" width="120" height="108" rx="4" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="82" cy="90" r="34" fill="#101010" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="82" cy="90" r="8" fill="#E7FF42" />
      <rect x="178" y="36" width="120" height="108" rx="4" fill="#242424" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="238" cy="90" r="34" fill="#101010" stroke="#F0E9DA" strokeWidth="3" />
      <circle cx="238" cy="90" r="8" fill="#FF3B8D" />
      <rect x="146" y="58" width="28" height="64" fill="#101010" stroke="#F0E9DA" strokeWidth="2" />
      <rect x="152" y="66" width="6" height="22" fill="#E7FF42" />
      <rect x="162" y="74" width="6" height="28" fill="#FF3B8D" />
      {Array.from({ length: 16 }, (_, index) => (
        <rect
          key={index}
          x={24 + index * 18}
          y={168 - (index % 5) * 8}
          width="10"
          height={18 + (index % 5) * 8}
          fill={index % 4 === 0 ? "#FF3B8D" : "#E7FF42"}
        />
      ))}
    </>
  );
}

function Room() {
  return (
    <>
      <rect width="320" height="200" fill="#171717" />
      <rect x="78" y="28" width="164" height="150" fill="#1c1c1c" stroke="#F0E9DA" strokeWidth="3" />
      <rect x="92" y="42" width="36" height="28" fill="#E7FF42" />
      <rect x="142" y="42" width="36" height="28" fill="#F0E9DA" />
      <rect x="192" y="42" width="36" height="28" fill="#FF3B8D" />
      <rect x="92" y="80" width="36" height="28" fill="#F0E9DA" />
      <rect x="142" y="80" width="36" height="28" fill="#171717" stroke="#F0E9DA" />
      <rect x="192" y="80" width="36" height="28" fill="#E7FF42" />
      <rect x="128" y="118" width="64" height="60" fill="#FF3B8D" />
      <rect x="156" y="118" width="6" height="60" fill="#171717" />
      {Array.from({ length: 9 }, (_, index) => (
        <circle key={index} cx={96 + index * 16} cy="24" r="3.5" fill="#E7FF42" />
      ))}
    </>
  );
}

function Paper() {
  return (
    <>
      <rect width="320" height="200" fill="#171717" />
      <g transform="translate(48 28) rotate(-8)">
        <rect width="150" height="150" fill="#FF3B8D" />
      </g>
      <g transform="translate(78 22) rotate(4)">
        <rect width="168" height="156" fill="#F0E9DA" stroke="#171717" strokeWidth="4" />
        <rect width="168" height="18" fill="#171717" />
        <rect x="16" y="42" width="120" height="8" fill="#171717" />
        <rect x="16" y="60" width="96" height="8" fill="#171717" />
        <rect x="16" y="78" width="132" height="8" fill="#171717" />
        <rect x="16" y="104" width="70" height="28" fill="#E7FF42" stroke="#171717" strokeWidth="3" />
      </g>
      <g transform="translate(196 78) rotate(8)">
        <rect width="92" height="78" fill="#E7FF42" stroke="#171717" strokeWidth="4" />
        <path d="M8 8 H20 M72 8 H84 M8 70 H20 M72 70 H84" stroke="#171717" strokeWidth="2" />
      </g>
    </>
  );
}

const drawings = {
  vinyl: Vinyl,
  session: Session,
  room: Room,
  paper: Paper,
};

export function Motif({ kind }: { kind: MotifKind }) {
  const Drawing = drawings[kind];
  return (
    <svg className="motif" viewBox="0 0 320 200" aria-hidden="true">
      <Drawing />
    </svg>
  );
}
