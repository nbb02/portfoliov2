import type { ReactNode } from "react"
import { TAG_ICONS } from "./tagIcons"

// Names that should get an inline icon when they appear in body copy.
const TECH_TAGS = [
  "React Three Fiber",
  "TanStack Query",
  "Material UI",
  "DigitalOcean",
  "Hostinger",
  "Vercel AI SDK",
  "TypeScript",
  "IndexedDB",
  "pdf-lib",
  "Zustand",
  "Tauri",
  "PostgreSQL",
  "Prometheus",
  "Inertia.js",
  "Next.js",
  "Node.js",
  "Socket.IO",
  "Chart.js",
  "Three.js",
  "Supabase",
  "Tailwind",
  "Laravel",
  "PHP",
  "Sanctum",
  "Express",
  "Grafana",
  "Drizzle",
  "WebLLM",
  "Llama 3.2",
  "Vercel",
  "Docker",
  "MySQL",
  "Redis",
  "NGINX",
  "Loki",
  "React",
  "SCSS",
  "Vite",
  "AWS",
  "MCP",
  "WebSockets",
  "WebSocket",
  "JWT",
  "PWA",
]

// Spoken/written variants mapped to their icon entry.
const ALIASES: Record<string, string> = {
  "Tailwind CSS": "Tailwind",
  "Drizzle ORM": "Drizzle",
  Postgres: "PostgreSQL",
  Dockerized: "Docker",
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

const PATTERNS = [...TECH_TAGS, ...Object.keys(ALIASES)].sort(
  (a, b) => b.length - a.length,
)

const TECH_REGEX = new RegExp(
  `(?<![A-Za-z0-9])(${PATTERNS.map(escapeRegExp).join("|")})(?![A-Za-z0-9])`,
  "g",
)

export default function TechText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  let lastIndex = 0

  for (const match of text.matchAll(TECH_REGEX)) {
    const index = match.index ?? 0
    const matched = match[0]
    const tag = ALIASES[matched] ?? matched
    const meta = TAG_ICONS[tag]

    if (index > lastIndex) {
      parts.push(text.slice(lastIndex, index))
    }

    if (meta) {
      const Icon = meta.icon
      parts.push(
        <span key={`${index}-${matched}`} className="whitespace-nowrap">
          <Icon
            size={13}
            style={{ color: meta.color }}
            className="mr-1 inline-block align-[-2px]"
            aria-hidden="true"
          />
          {matched}
        </span>,
      )
    } else {
      parts.push(matched)
    }

    lastIndex = index + matched.length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return <>{parts}</>
}
