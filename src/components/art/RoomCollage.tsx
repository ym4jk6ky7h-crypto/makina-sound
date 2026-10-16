function WallSheet({
  x,
  y,
  w,
  h,
  rotate,
  fill,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  fill: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect width={w} height={h} fill={fill} stroke="#171717" strokeWidth="3" />
      <rect y="8" width={w} height="8" fill="#171717" opacity="0.85" />
      <rect x="8" y={h - 28} width={w - 16} height="4" fill="#171717" opacity="0.55" />
      <rect x="8" y={h - 18} width={w * 0.55} height="4" fill="#171717" opacity="0.55" />
    </g>
  );
}

function ForegroundFlyer({
  x,
  y,
  w,
  h,
  rotate,
  fill,
  band,
  word,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  fill: string;
  band: string;
  word: string;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
      <rect width={w} height={h} fill={fill} stroke="#171717" strokeWidth="4" />
      <rect width={w} height="18" fill={band} />
      <text
        x="14"
        y={h * 0.42}
        fill="#171717"
        fontFamily="'Barlow Condensed', Impact, sans-serif"
        fontSize={w > 180 ? 54 : 40}
        fontWeight="800"
      >
        {word}
      </text>
      <circle cx={w - 36} cy={h - 72} r="16" fill="#E7FF42" stroke="#171717" strokeWidth="3" />
      <rect y={h - 34} width={w} height="34" fill="#171717" />
      <text
        x="12"
        y={h - 11}
        fill="#F0E9DA"
        fontFamily="'Barlow Condensed', Impact, sans-serif"
        fontSize="16"
        fontWeight="700"
      >
        DIBUJO
      </text>
    </g>
  );
}

const crowd: Array<[number, number, number]> = [
  [100, 448, 12],
  [154, 440, 13],
  [208, 452, 12],
  [262, 438, 14],
  [324, 450, 12],
  [382, 442, 13],
  [440, 454, 12],
  [498, 440, 12],
  [552, 448, 11],
  [72, 528, 16],
  [128, 516, 18],
  [190, 534, 16],
  [250, 518, 19],
  [316, 536, 17],
  [382, 520, 18],
  [446, 538, 16],
  [508, 516, 17],
  [568, 530, 15],
  [64, 630, 22],
  [128, 616, 24],
  [198, 642, 22],
  [268, 618, 25],
  [344, 646, 23],
  [418, 620, 24],
  [492, 644, 21],
  [560, 618, 20],
];

export function RoomCollage() {
  return (
    <svg className="room-art" viewBox="0 0 640 820" aria-hidden="true">
      <rect width="640" height="820" fill="#141414" />
      <rect x="28" y="34" width="584" height="372" fill="#1b1b1b" />
      <polygon points="28,406 612,406 640,820 0,820" fill="#101010" />
      <g opacity="0.45" stroke="#2a2a2a" strokeWidth="2">
        <line x1="320" y1="406" x2="40" y2="820" />
        <line x1="320" y1="406" x2="200" y2="820" />
        <line x1="320" y1="406" x2="440" y2="820" />
        <line x1="320" y1="406" x2="600" y2="820" />
      </g>

      <WallSheet x={46} y={150} w={78} h={102} rotate={-3} fill="#F0E9DA" />
      <WallSheet x={58} y={262} w={72} h={92} rotate={2} fill="#E7FF42" />
      <WallSheet x={44} y={360} w={80} h={86} rotate={-2} fill="#FF3B8D" />

      {[130, 270, 410, 530].map((x, index) => {
        const acid = index % 2 === 0;
        const color = acid ? "#E7FF42" : "#FF3B8D";
        return (
          <g key={x}>
            <polygon
              points={`${x},108 ${x - 110},560 ${x + 86},560`}
              fill={color}
              opacity="0.13"
            />
            <line x1={x} y1="36" x2={x} y2="86" stroke="#303030" strokeWidth="5" />
            <circle cx={x} cy="96" r="15" fill={color} />
            <circle cx={x} cy="96" r="5" fill="#171717" />
          </g>
        );
      })}

      <g>
        <rect x="48" y="286" width="54" height="150" fill="#0c0c0c" stroke="#2a2a2a" />
        <circle cx="75" cy="330" r="16" fill="#1c1c1c" stroke="#F0E9DA" strokeWidth="2" />
        <circle cx="75" cy="382" r="12" fill="#1c1c1c" stroke="#FF3B8D" strokeWidth="2" />
        <rect x="538" y="286" width="54" height="150" fill="#0c0c0c" stroke="#2a2a2a" />
        <circle cx="565" cy="330" r="16" fill="#1c1c1c" stroke="#F0E9DA" strokeWidth="2" />
        <circle cx="565" cy="382" r="12" fill="#1c1c1c" stroke="#E7FF42" strokeWidth="2" />
      </g>

      <g>
        <rect x="214" y="300" width="212" height="108" fill="#242424" stroke="#F0E9DA" strokeWidth="2" />
        <circle cx="268" cy="354" r="32" fill="#101010" stroke="#F0E9DA" strokeWidth="3" />
        <circle cx="268" cy="354" r="8" fill="#E7FF42" />
        <circle cx="372" cy="354" r="32" fill="#101010" stroke="#F0E9DA" strokeWidth="3" />
        <circle cx="372" cy="354" r="8" fill="#FF3B8D" />
        <rect x="308" y="328" width="24" height="52" fill="#171717" />
        <rect x="314" y="334" width="6" height="18" fill="#E7FF42" />
        <rect x="322" y="342" width="6" height="22" fill="#FF3B8D" />
      </g>

      {crowd.map(([x, y, size], index) => (
        <g key={`${x}-${y}`}>
          <ellipse cx={x} cy={y + size * 1.15} rx={size * 1.35} ry={size * 0.48} fill="#0a0a0a" />
          <ellipse cx={x} cy={y} rx={size * 0.7} ry={size * 0.82} fill="#161616" />
          {index % 6 === 0 ? (
            <ellipse
              cx={x}
              cy={y - size * 0.15}
              rx={size * 0.72}
              ry={size * 0.28}
              fill="none"
              stroke="#E7FF42"
              strokeWidth="2"
            />
          ) : null}
          {index % 7 === 0 ? (
            <rect x={x - 4} y={y + size * 0.7} width="8" height="5" fill="#FF3B8D" />
          ) : null}
        </g>
      ))}

      <ForegroundFlyer x={24} y={500} w={196} h={268} rotate={-7} fill="#F0E9DA" band="#FF3B8D" word="PISTA" />
      <ForegroundFlyer x={418} y={168} w={176} h={236} rotate={6} fill="#F0E9DA" band="#171717" word="NOCHE" />
      <ForegroundFlyer x={250} y={575} w={168} h={210} rotate={-3} fill="#E7FF42" band="#FF3B8D" word="SONIDO" />
    </svg>
  );
}
