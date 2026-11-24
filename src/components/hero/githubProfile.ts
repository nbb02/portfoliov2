/**
 * The profile README, transcribed. Deliberately no organisations and no
 * repository list: every line is already public on the profile page.
 */

export const PROFILE = {
  name: "Nathaniel B. Berres",
  handle: "nbb02",
  bio: "Systems that have to hold up under real load — multi-tenant platforms, realtime dispatch, and the monitoring that proves they work.",
  followers: 1,
  following: 3,
} as const

export const PROFILE_TABS = [
  { label: "Overview", active: true },
  { label: "Repositories", active: false },
  { label: "Projects", active: false },
  { label: "Packages", active: false },
  { label: "Stars", active: false },
] as const

export const INTRO =
  "I build systems that have to hold up under real load — multi-tenant platforms, realtime dispatch, and the monitoring that proves they work. Currently shipping full-stack features on an enterprise operations platform."

export const SELECTED_WORK = [
  {
    name: "Client Portal Platform",
    period: "2026 – now",
    link: "https://nbb02.github.io/#/projects/client-portal",
    blurb:
      "CRM and project delivery in one tenant-scoped portal — isolated add-on modules, policy-based RBAC, audit trails.",
    stack: "Laravel · Inertia · React · TypeScript",
  },
  {
    name: "Logistics & Realtime Booking",
    period: "2025 – 26",
    link: "https://nbb02.github.io/#/projects/logistics",
    blurb:
      "Live location tracking, geolocation-aware dispatch, and rider–customer bidding over WebSockets with Redis Geo.",
    stack: "Node.js · Express · MySQL · Redis · Google Maps",
  },
  {
    name: "ViTech Analytics",
    period: "capstone",
    link: "https://nbb02.github.io/#/projects/vitech",
    blurb:
      "Population management and analytics with dashboards, QR check-in, role-based access, and exportable reports.",
    stack: "Laravel · React",
  },
  {
    name: "Load Balancer + Observability",
    period: "lab",
    link: "https://nbb02.github.io/#/projects/load-balancer-monitoring",
    blurb:
      "NGINX balancing, JWT-protected APIs, Socket.IO messaging, and a full metrics and log pipeline — all in containers.",
    stack: "NGINX · Docker · Prometheus · Grafana · Loki",
  },
  {
    name: "HuntXP",
    period: "personal",
    link: "https://nbb02.github.io/#/projects/huntxp",
    blurb:
      "Gamified job-hunting workbench with an application pipeline, XP and levels, and resume coaching that runs in the browser.",
    stack: "Next.js · TypeScript · WebLLM · Llama 3.2",
  },
  {
    name: "Finance PWA",
    period: "personal",
    link: "https://nbb02.github.io/#/projects/finance",
    blurb:
      "A personal finance app whose assistant can act on the same accounts, ledger, budgets, and bills as the UI.",
    stack: "React · TypeScript · AI tooling",
  },
] as const

export const RIGHT_NOW = [
  {
    label: "Role",
    value:
      "Full-Stack Software Developer · enterprise software company · May 2026 – present",
  },
  {
    label: "Building",
    value: "CRM and project delivery inside a multi-tenant portal",
  },
  {
    label: "Focus",
    value:
      "Tenant-scoped boundaries, policy-based RBAC, audit trails, versioned add-on modules",
  },
  {
    label: "Day to day",
    value:
      "Laravel · PHP · React · TypeScript · Inertia.js · Pest / PHPUnit / Vitest",
  },
  {
    label: "Before this",
    value:
      "Logistics platform at ~50k registered users — realtime tracking, AWS infra, Prometheus + Grafana + Loki",
  },
  {
    label: "Education",
    value: "BS Information Technology, Magna Cum Laude · July 2025",
  },
] as const

type Chip = { label: string; color: string; dark?: boolean }

export const STACK_CHIPS: Chip[] = [
  { label: "TypeScript", color: "#3178C6" },
  { label: "JavaScript", color: "#F7DF1E", dark: true },
  { label: "PHP", color: "#777BB4" },
  { label: "Laravel", color: "#FF2D20" },
  { label: "React", color: "#61DAFB", dark: true },
  { label: "Next.js", color: "#161B22" },
  { label: "Node.js", color: "#339933" },
  { label: "Express", color: "#24292F" },
  { label: "MySQL", color: "#4479A1" },
  { label: "PostgreSQL", color: "#4169E1" },
  { label: "MongoDB", color: "#47A248" },
  { label: "Redis", color: "#DC382D" },
  { label: "AWS", color: "#FF9900", dark: true },
  { label: "Docker", color: "#2496ED" },
  { label: "NGINX", color: "#009639" },
  { label: "Grafana", color: "#F46800" },
  { label: "Prometheus", color: "#E6522C" },
  { label: "Tailwind", color: "#06B6D4", dark: true },
  { label: "Vite", color: "#646CFF" },
  { label: "Sass", color: "#CF649A" },
  { label: "Inertia", color: "#9553E9" },
  { label: "TanStack", color: "#FF4154" },
  { label: "Radix UI", color: "#161618" },
  { label: "WebSockets", color: "#010101" },
  { label: "Pusher", color: "#300D4F" },
  { label: "BullMQ", color: "#DC382D" },
  { label: "Google Maps", color: "#4285F4" },
  { label: "Pest", color: "#000000" },
  { label: "PHPUnit", color: "#3C9CD7" },
  { label: "Vitest", color: "#6E9F18" },
  { label: "Cloudflare", color: "#F38020" },
  { label: "PayMaya", color: "#00AEEF" },
  { label: "PayMongo", color: "#6F2CFF" },
  { label: "MetaMask", color: "#F6851B" },
  { label: "Polygon", color: "#8247E5" },
]

export const STACK_NOTES = [
  "AWS EC2 · RDS · ElastiCache · S3 · CloudFront · CloudWatch · Lightsail | Infra Docker · NGINX · Prometheus · Grafana · Loki · Cloudflare",
  "Also Google Places · Distance Matrix · Geocoding · Cron · Email / SMS / WhatsApp notifications · GCP · DigitalOcean · Chart.js · MUI",
] as const

export const EXPERIENCE = [
  {
    role: "Full-Stack Software Developer",
    org: "Enterprise software company",
    period: "May 2026 – present",
    detail:
      "Multi-tenant CRM and delivery platform; tenant isolation, RBAC, add-on modules, 500+ test files",
  },
  {
    role: "Software Engineer",
    org: "Logistics and technology company",
    period: "Sep 2025 – Mar 2026",
    detail:
      "Realtime logistics platform (~50k users), AWS provisioning and hardening, observability stack",
  },
  {
    role: "Full-Stack Web Developer",
    org: "Freelance, self-employed",
    period: "Jan 2025 – Sep 2025",
    detail:
      "Client applications end to end with React, Next.js, Laravel, MySQL, and MongoDB",
  },
  {
    role: "Junior Back-End Developer",
    org: "Technology solutions provider · promoted from intern",
    period: "Jan 2025 – Sep 2025",
    detail: "Node.js and Express APIs, MySQL schemas, cPanel/AWS deployments",
  },
] as const

export const TIMELINE = [
  {
    when: "Aug 2022",
    what: "Started with HTML — a friend suggested it, I was bored and had nothing to do. Then CSS → JavaScript → SCSS → React.",
  },
  { when: "Dec 2023", what: "Learned Next.js." },
  {
    when: "2024",
    what: "School builds: POS & Inventory (React + Firebase Realtime DB) and a population-management system with dynamic charts, complex filtering, and four user levels (Laravel + React).",
  },
  {
    when: "2025",
    what: "Internship → junior back-end developer, freelance client work on the side, and graduation with Magna Cum Laude.",
  },
  {
    when: "Sep 2025",
    what: "Software Engineer on the logistics platform — realtime dispatch, AWS infrastructure, observability.",
  },
  {
    when: "May 2026",
    what: "Full-Stack Software Developer on a multi-tenant enterprise portal.",
  },
] as const

export const EARLIER_SYSTEMS = [
  {
    kind: "📅 Booking",
    what: "arc places booking · wrc events and social",
  },
  {
    kind: "🛒 E-commerce",
    what: "rst and four Laravel storefronts — carts, checkout, payments",
  },
  {
    kind: "🗂️ Management",
    what: "cra · pct · ia · pm, plus two Laravel full-stack systems on Hostinger",
  },
  {
    kind: "📊 Data",
    what: "POS & Inventory (React + Firebase Realtime DB) · Population Management (Laravel + React, 2024)",
  },
  {
    kind: "💬 Social",
    what: "jm realtime chat, feeds, and comments · community recycling platform with QR-verified collections",
  },
  {
    kind: "⛓️ Blockchain",
    what: "Exchange & points system — Laravel backend with a Node.js handler, MetaMask / Infura / Polygon, on a Hostinger VPS with CloudPanel",
  },
] as const

export const CONNECT =
  "Open to conversations about backend architecture, realtime systems, and developer tooling."
