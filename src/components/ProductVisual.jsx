import { useId } from "react";

const palettes = {
  obsidian: {
    scene: "linear-gradient(165deg, #3a322c 0%, #161311 48%, #2a211c 100%)",
    caseA: "#5a5856",
    caseB: "#141414",
    cavity: "#070707",
    bud: "#1a1a1a",
    budB: "#8a8682",
    stem: "#101010",
    mesh: "#050505",
    metal: "#e4c7b4",
    glow: "rgba(196, 148, 120, 0.35)",
  },
  ivory: {
    scene: "linear-gradient(165deg, #fbf7f2 0%, #e7ddd2 52%, #f3e4d8 100%)",
    caseA: "#ffffff",
    caseB: "#d9d0c4",
    cavity: "#f6f1ea",
    bud: "#f7f4f0",
    budB: "#ffffff",
    stem: "#efe8e0",
    mesh: "#cfc6bb",
    metal: "#1c1c1c",
    glow: "rgba(255,255,255,0.75)",
  },
  signal: {
    scene: "linear-gradient(160deg, #1d2218 0%, #121410 55%, #2a3320 100%)",
    caseA: "#4a5240",
    caseB: "#151814",
    cavity: "#0d100c",
    bud: "#1c2118",
    budB: "#c5d68a",
    stem: "#121510",
    mesh: "#0a0c08",
    metal: "#dff26a",
    glow: "rgba(214, 227, 106, 0.28)",
  },
  graphite: {
    scene: "linear-gradient(165deg, #4e4c49 0%, #232221 50%, #3a3835 100%)",
    caseA: "#7a7672",
    caseB: "#2a2927",
    cavity: "#1a1918",
    bud: "#3f3d3a",
    budB: "#d4cfc7",
    stem: "#2c2b29",
    mesh: "#1a1918",
    metal: "#d7a07a",
    glow: "rgba(215, 160, 122, 0.28)",
  },
  sand: {
    scene: "linear-gradient(165deg, #f3e6d4 0%, #e4d0b8 48%, #f7eee4 100%)",
    caseA: "#fff6ec",
    caseB: "#c9b39a",
    cavity: "#f3e6d6",
    bud: "#eadccb",
    budB: "#fffaf4",
    stem: "#d9c4ae",
    mesh: "#b89f86",
    metal: "#6b4b34",
    glow: "rgba(255,255,255,0.55)",
  },
  taupe: {
    scene: "linear-gradient(165deg, #d8cdc3 0%, #b7a89c 46%, #e6dbd2 100%)",
    caseA: "#f6eee6",
    caseB: "#a89284",
    cavity: "#eadfd4",
    bud: "#d4c2b2",
    budB: "#fff8f2",
    stem: "#b79f90",
    mesh: "#8c7566",
    metal: "#4a382e",
    glow: "rgba(255,255,255,0.45)",
  },
  silver: {
    scene: "linear-gradient(165deg, #eceae6 0%, #c8c6c2 42%, #f5f4f1 100%)",
    caseA: "#ffffff",
    caseB: "#b5b4b0",
    cavity: "#e7e6e3",
    bud: "#d9d8d4",
    budB: "#ffffff",
    stem: "#c5c4c0",
    mesh: "#9a9894",
    metal: "#3a3a3a",
    glow: "rgba(255,255,255,0.8)",
  },
  clay: {
    scene: "linear-gradient(165deg, #f0d2c2 0%, #c4622d 42%, #f6e0d4 100%)",
    caseA: "#f8dccb",
    caseB: "#a24e28",
    cavity: "#e7b79a",
    bud: "#d57242",
    budB: "#ffe7da",
    stem: "#b85a30",
    mesh: "#7a381c",
    metal: "#fff4ec",
    glow: "rgba(255,255,255,0.4)",
  },
};

function StemBud({ id, tone, transform }) {
  return (
    <g transform={transform}>
      <ellipse cx="78" cy="118" rx="46" ry="10" fill="#000" opacity="0.12" />
      <path
        d="M86 46c8 2 14 18 12 46-1 16-4 34-6 46-2 10-12 14-18 8-8-8-10-28-8-48 2-22 8-48 14-54 2-2 4-1 6 2z"
        fill={`url(#${id}-stem)`}
      />
      <path
        d="M34 18c28-16 62-4 70 22 8 24-4 48-24 56-6 2-8 8-6 14 2 8-8 16-20 12-22-8-40-28-44-52-6-28 2-42 24-52z"
        fill={`url(#${id}-bud)`}
      />
      <ellipse cx="28" cy="48" rx="16" ry="22" fill={tone.mesh} />
      <ellipse cx="24" cy="46" rx="7" ry="10" fill="#000" opacity="0.35" />
      <ellipse cx="62" cy="36" rx="14" ry="10" fill="#fff" opacity="0.28" />
      <circle cx="92" cy="108" r="3.2" fill={tone.metal} />
    </g>
  );
}

export default function ProductVisual({
  palette = "obsidian",
  variant = "stem",
  compact = false,
  className = "",
}) {
  const id = useId().replace(/:/g, "");
  const tone = palettes[palette] ?? palettes.obsidian;

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ background: tone.scene }}>
      <div
        className="pointer-events-none absolute -left-10 -top-12 h-44 w-44 rounded-full blur-3xl"
        style={{ background: tone.glow }}
      />
      <svg viewBox="0 0 400 480" className="relative h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id={`${id}-case`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone.caseA} />
            <stop offset="100%" stopColor={tone.caseB} />
          </linearGradient>
          <linearGradient id={`${id}-bud`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={tone.budB} />
            <stop offset="45%" stopColor={tone.bud} />
            <stop offset="100%" stopColor={tone.caseB} />
          </linearGradient>
          <linearGradient id={`${id}-stem`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tone.budB} />
            <stop offset="100%" stopColor={tone.stem} />
          </linearGradient>
        </defs>
        <g transform={compact ? "translate(200 250) scale(0.8) translate(-200 -250)" : undefined}>
          {variant === "open" ? (
            <OpenSet id={id} tone={tone} />
          ) : variant === "bean" ? (
            <BeanSet id={id} tone={tone} />
          ) : (
            <StemSet id={id} tone={tone} />
          )}
        </g>
      </svg>
    </div>
  );
}

function Case({ id, tone, y = 78 }) {
  return (
    <g>
      <ellipse cx="200" cy="250" rx="150" ry="18" fill="#000" opacity="0.1" />
      <path
        d={`M78 ${y + 70}c0-46 28-78 78-86 62-10 150 8 176 62 8 16 6 36-8 48l-40 22H118l-28-16c-10-8-12-18-12-30z`}
        fill={`url(#${id}-case)`}
        opacity="0.95"
      />
      <rect x="92" y={y + 62} width="220" height="108" rx="40" fill={`url(#${id}-case)`} />
      <rect x="112" y={y + 78} width="180" height="52" rx="22" fill={tone.cavity} />
      <path
        d={`M120 ${y + 74}c28-16 130-18 168 4`}
        stroke="#fff"
        strokeOpacity="0.4"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="188" y={y + 146} width="24" height="6" rx="3" fill={tone.metal} opacity="0.8" />
    </g>
  );
}

function StemSet({ id, tone }) {
  return (
    <g>
      <Case id={id} tone={tone} />
      <StemBud id={id} tone={tone} transform="translate(8,168) rotate(-18)" />
      <StemBud id={id} tone={tone} transform="translate(392,188) scale(-1,1) rotate(-18)" />
    </g>
  );
}

function BeanSet({ id, tone }) {
  return (
    <g>
      <Case id={id} tone={tone} y={70} />
      <BeanBud id={id} tone={tone} transform="translate(18,250)" />
      <BeanBud id={id} tone={tone} transform="translate(382,268) scale(-1,1)" />
    </g>
  );
}

function BeanBud({ id, tone, transform }) {
  return (
    <g transform={transform}>
      <ellipse cx="70" cy="130" rx="48" ry="12" fill="#000" opacity="0.12" />
      <path d="M28 78c8-28 40-36 58-16 8 8 10 14 6 24-18 8-40 10-58 2-6-12-8-8-6-10z" fill={tone.budB} opacity="0.55" />
      <ellipse cx="78" cy="78" rx="46" ry="50" fill={`url(#${id}-bud)`} />
      <ellipse cx="46" cy="84" rx="16" ry="20" fill={tone.mesh} />
      <ellipse cx="42" cy="82" rx="6" ry="8" fill="#000" opacity="0.35" />
      <ellipse cx="96" cy="58" rx="12" ry="16" fill="#fff" opacity="0.28" />
    </g>
  );
}

function OpenSet({ id, tone }) {
  return (
    <g>
      <ellipse cx="200" cy="390" rx="120" ry="14" fill="#000" opacity="0.12" />
      <path
        d="M70 250c6-90 78-130 132-58"
        stroke={`url(#${id}-bud)`}
        strokeWidth="28"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M330 250c-6-90-78-130-132-58"
        stroke={`url(#${id}-bud)`}
        strokeWidth="28"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="168" cy="214" r="8" fill={tone.metal} />
      <circle cx="232" cy="214" r="8" fill={tone.metal} />
      <rect x="145" y="300" width="110" height="78" rx="28" fill={`url(#${id}-case)`} />
      <rect x="188" y="352" width="24" height="6" rx="3" fill={tone.metal} />
    </g>
  );
}
