export function Logo({ size = 26 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient
          id="vs-plate-grad"
          x1="4"
          y1="4"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <path
        d="M5 5H18.5V9.5H27V27H10V22.5H5V5Z"
        fill="#111827"
        stroke="url(#vs-plate-grad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 15H18.5M18.5 9.5V20"
        stroke="#334155"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="14" cy="10.5" r="2.2" fill="#fbbf24" />
      <circle cx="22.5" cy="15" r="1.6" fill="#38bdf8" />
    </svg>
  )
}
