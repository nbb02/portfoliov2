const artProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const

const baseClass = "pointer-events-none"

export function PortalArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      aria-hidden="true"
      className={`${baseClass} ${className}`}
      {...artProps}
    >
      <rect x="16" y="78" width="132" height="44" rx="7" opacity="0.35" />
      <rect x="40" y="56" width="132" height="44" rx="7" opacity="0.6" />
      <rect x="64" y="34" width="132" height="44" rx="7" />
      <path d="M78 46h44M78 54h28" opacity="0.55" />
      <circle cx="78" cy="65" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="86" cy="65" r="1.8" fill="currentColor" stroke="none" />
      <path
        className="art-pulse"
        d="M182 86l16 5v10c0 9-7 14.5-16 17-9-2.5-16-8-16-17V91z"
      />
      <path d="M176 99l4 4 8-8" opacity="0.9" />
    </svg>
  )
}

export function LogisticsArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 140"
      aria-hidden="true"
      className={`${baseClass} ${className}`}
      {...artProps}
    >
      <g opacity="0.22">
        <path d="M18 122l72-42M60 126l72-42M102 130l72-42M144 134l72-42" />
        <path d="M18 122h54M60 126h54M102 130h54M144 134h54" />
      </g>
      <path
        className="art-route"
        d="M24 108C64 100 74 56 116 66c38 9 56-22 96-30"
      />
      <circle cx="76" cy="82" r="5" opacity="0.7" />
      <circle cx="76" cy="82" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="164" cy="55" r="5" opacity="0.7" />
      <circle cx="164" cy="55" r="1.8" fill="currentColor" stroke="none" />
      <path d="M212 24c-5 0-9 4-9 9 0 6 9 15 9 15s9-9 9-15c0-5-4-9-9-9z" />
      <circle cx="212" cy="33" r="3" opacity="0.8" />
    </svg>
  )
}

const HEXES = [
  [80, 26],
  [127, 53],
  [127, 107],
  [80, 134],
  [33, 107],
  [33, 53],
] as const

function hexPath(x: number, y: number, r = 6) {
  const w = r * 0.87
  return `M${x} ${y - r}L${x + w} ${y - r / 2}L${x + w} ${y + r / 2}L${x} ${y + r}L${x - w} ${y + r / 2}L${x - w} ${y - r / 2}Z`
}

export function RecyclingArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 160"
      aria-hidden="true"
      className={`${baseClass} ${className}`}
      {...artProps}
    >
      <g className="art-loop">
        <circle cx="80" cy="80" r="54" strokeDasharray="26 30" />
        <circle
          cx="80"
          cy="80"
          r="40"
          strokeDasharray="16 22"
          opacity="0.5"
        />
      </g>
      {HEXES.map(([x, y], index) => (
        <path
          key={`${x}-${y}`}
          d={hexPath(x, y)}
          opacity={index % 2 === 0 ? 0.9 : 0.5}
        />
      ))}
      <path d={hexPath(80, 80, 14)} opacity="0.9" />
      <path d="M76 80l3 3 6-6" />
    </svg>
  )
}

export function CommerceArt({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 140"
      aria-hidden="true"
      className={`${baseClass} ${className}`}
      {...artProps}
    >
      <path d="M28 76l42-21 42 21-42 21z" />
      <path d="M28 76v36l42 21V97" />
      <path d="M112 76v36l-42 21" />
      <path d="M70 97v36" opacity="0.45" />
      <path d="M49 65.5v36M91 65.5v36" opacity="0.35" />
      <path d="M118 52l32-16 32 16-32 16z" opacity="0.65" />
      <path d="M118 52v26l32 16V68" opacity="0.65" />
      <path d="M182 52v26l-32 16" opacity="0.65" />
      <path d="M150 68v26" opacity="0.35" />
    </svg>
  )
}
