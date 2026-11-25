import { useEffect, useRef, useState } from "react"
import type {
  ComponentType,
  MouseEvent as ReactMouseEvent,
  TouchEvent as ReactTouchEvent,
} from "react"
import { Link } from "react-router-dom"
import { FiArrowUpRight } from "react-icons/fi"
import TagPill from "./TagPill"
import { LogisticsArt, PortalArt, RecyclingArt } from "./ProjectArt"

const DWELL = 7000

interface Project {
  id: string
  title: string
  to: string
  eyebrow: string
  body: string
  tags: string[]
  image?: string
  art?: ComponentType<{ className?: string }>
  artClass?: string
  texture?: "grid" | "dots"
}

const GRID_PATTERN = {
  backgroundImage:
    "linear-gradient(to right, rgba(148,163,184,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.16) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
}

const DOT_PATTERN = {
  backgroundImage:
    "radial-gradient(circle, rgba(94,234,212,0.55) 1px, transparent 1px)",
  backgroundSize: "18px 18px",
}

const SYSTEMS: Project[] = [
  {
    id: "client-portal",
    title: "Client Portal Platform",
    to: "/projects/client-portal",
    eyebrow: "Enterprise platform · 2026–Present",
    body: "A multi-tenant operations portal covering CRM, project delivery, and modular add-ons.",
    tags: ["Multiple clients", "Authorization", "Add-on modules"],
    art: PortalArt,
    artClass: "absolute -right-8 bottom-20 h-36 w-[62%] text-teal-300/35",
    texture: "grid",
  },
  {
    id: "load-balancer",
    title: "Load Balancer + Observability",
    to: "/projects/load-balancer-monitoring",
    eyebrow: "Local infrastructure lab · 2026",
    body: "NGINX load balancing with Prometheus, Grafana and Loki wired into one local lab.",
    tags: ["Local lab", "Monitoring", "Docker"],
    image:
      "/assets/projects/load-balancer-monitoring/Load Balancer Visualizer.webp",
  },
  {
    id: "vitech",
    title: "ViTech Analytics",
    to: "/projects/vitech",
    eyebrow: "Capstone project · 2024",
    body: "Dashboards, QR check-in and role-based access for a capstone programme.",
    tags: ["Capstone", "Roles & permissions", "Dashboards"],
    image: "/assets/projects/vitech/dashboard.webp",
  },
  {
    id: "logistics",
    title: "Logistics & Realtime Booking",
    to: "/projects/logistics",
    eyebrow: "Realtime platform · 2025–2026",
    body: "Dispatch, live tracking, and rider-customer bidding over WebSockets.",
    tags: ["Realtime", "WebSockets", "AWS"],
    art: LogisticsArt,
    artClass: "absolute -right-4 bottom-24 h-32 w-[74%] text-teal-200/45",
    texture: "dots",
  },
  {
    id: "recycling",
    title: "Recycling Platform",
    to: "/projects/recycling-platform",
    eyebrow: "Social & blockchain · 2024–2025",
    body: "Verified collections, points, tiers, partner rewards and a blockchain-backed ledger.",
    tags: ["Social", "Blockchain", "Community"],
    art: RecyclingArt,
    artClass: "absolute -right-6 bottom-24 h-36 w-[54%] text-teal-300/40",
    texture: "dots",
  },
]

const SIDE_BUILDS: Project[] = [
  {
    id: "printset",
    title: "PrintSet",
    to: "/projects/printset",
    eyebrow: "Print layout tool · 2026",
    body: "",
    tags: ["Local-first"],
    image: "/assets/projects/printset/editor-grid.webp",
  },
  {
    id: "huntxp",
    title: "HuntXP",
    to: "/projects/huntxp",
    eyebrow: "Job-hunting platform · 2026",
    body: "",
    tags: ["WebLLM"],
    image: "/assets/projects/huntxp/homepage.webp",
  },
  {
    id: "finance",
    title: "Finance PWA",
    to: "/projects/finance",
    eyebrow: "Personal finance · 2026",
    body: "",
    tags: ["Next.js"],
    image: "/assets/projects/finance/ai-assistant.webp",
  },
  {
    id: "virtual-spaces",
    title: "Virtual Spaces",
    to: "/projects/virtual-office",
    eyebrow: "3D workspace · 2026",
    body: "",
    tags: ["React Three Fiber"],
    image: "/assets/projects/virtual-office/day.webp",
  },
]

function Artwork({ project }: { project: Project }) {
  const Art = project.art

  return (
    <>
      {project.texture && (
        <span
          className="absolute inset-0 opacity-25"
          style={project.texture === "grid" ? GRID_PATTERN : DOT_PATTERN}
          aria-hidden="true"
        />
      )}
      {project.image ? (
        <img
          src={project.image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
        />
      ) : (
        Art && <Art className={project.artClass} />
      )}
    </>
  )
}

function Tile({ project, compact }: { project: Project; compact?: boolean }) {
  const Art = project.art

  return (
    <Link
      to={project.to}
      className={`group relative flex flex-col justify-end overflow-hidden rounded-xl bg-[#11161D] ${
        compact ? "aspect-square p-2" : "aspect-[4/3.1] p-2.5"
      }`}
    >
      {project.image ? (
        <img
          src={project.image}
          alt=""
          loading="lazy"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      ) : (
        <>
          <span
            className="absolute inset-0 opacity-30"
            style={DOT_PATTERN}
            aria-hidden="true"
          />
          {Art && (
            <Art className="absolute inset-x-0 bottom-5 h-[72%] w-full text-teal-200/55" />
          )}
        </>
      )}
      <span
        className="absolute inset-0 bg-gradient-to-t from-[#080C11] via-[#080C11]/40 to-transparent"
        aria-hidden="true"
      />
      <FiArrowUpRight
        size={compact ? 11 : 13}
        aria-hidden="true"
        className="absolute right-2 top-2 text-white/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />

      <h3
        className={`relative font-semibold leading-tight text-white ${
          compact ? "text-[12px]" : "text-[12.5px]"
        }`}
      >
        {project.title}
      </h3>
      <span className="relative mt-1.5 flex">
        <TagPill tag={project.tags[0]} dark size="xs" />
      </span>
    </Link>
  )
}

export default function MobileWork() {
  const [index, setIndex] = useState(0)
  const [previous, setPrevious] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const [stopped, setStopped] = useState(false)
  const clearRef = useRef<number | null>(null)

  const project = SYSTEMS[index]
  const others = SYSTEMS.filter((entry) => entry.id !== project.id)

  const advance = (next: number) => {
    setPrevious(index)
    setIndex(next)
    if (clearRef.current) window.clearTimeout(clearRef.current)
    clearRef.current = window.setTimeout(() => setPrevious(null), 560)
  }

  useEffect(() => {
    return () => {
      if (clearRef.current) window.clearTimeout(clearRef.current)
    }
  }, [])

  const pause = () => setPaused(true)
  const resume = () => setPaused(false)

  const touchX = useRef<number | null>(null)
  const touchY = useRef<number | null>(null)
  const swiped = useRef(false)

  const handleTouchStart = (event: ReactTouchEvent) => {
    touchX.current = event.touches[0].clientX
    touchY.current = event.touches[0].clientY
    swiped.current = false
  }

  const handleTouchEnd = (event: ReactTouchEvent) => {
    if (touchX.current === null || touchY.current === null) return

    const dx = event.changedTouches[0].clientX - touchX.current
    const dy = event.changedTouches[0].clientY - touchY.current
    touchX.current = null
    touchY.current = null

    // horizontal only: a diagonal scroll must not advance the card
    if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.2) return

    swiped.current = true
    setStopped(true)
    advance((index + (dx < 0 ? 1 : -1) + SYSTEMS.length) % SYSTEMS.length)
  }

  const handleClick = (event: ReactMouseEvent) => {
    if (!swiped.current) return
    event.preventDefault()
    swiped.current = false
  }

  return (
    <div className="min-[600px]:hidden">
      <div
        className="relative mt-8"
        onPointerEnter={pause}
        onPointerLeave={resume}
        onFocus={pause}
        onBlur={resume}
      >
        <Link
          to={project.to}
          aria-label={`${project.title} — view project`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={handleClick}
          className="relative flex h-[250px] flex-col justify-end overflow-hidden rounded-2xl bg-[#11161D] p-5 text-white"
        >
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {previous !== null && <Artwork project={SYSTEMS[previous]} />}
            <div key={project.id} className="work-art-in absolute inset-0">
              <Artwork project={project} />
            </div>
            <span className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-[#0B0F14]/70 to-transparent" />
          </div>

          <div className="relative">
            <p className="text-[10px] font-semibold text-teal-300">
              {project.eyebrow}
            </p>
            <h2 className="mt-1.5 text-[25px] font-semibold leading-[1.06] tracking-[-0.04em]">
              {project.title}
            </h2>
            <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-relaxed text-slate-300">
              {project.body}
            </p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <TagPill key={tag} tag={tag} dark />
                ))}
              </div>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15">
                <FiArrowUpRight size={14} aria-hidden="true" />
              </span>
            </div>
          </div>

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/10">
            <i
              key={project.id}
              className="work-hair block h-full bg-teal-300"
              data-paused={paused || stopped}
              style={{ animationDuration: `${DWELL}ms` }}
              onAnimationEnd={() => {
                if (!paused && !stopped) advance((index + 1) % SYSTEMS.length)
              }}
            />
          </span>
        </Link>

        <div className="mt-3 flex items-center justify-center gap-1.5">
          {SYSTEMS.map((entry, dot) => (
            <button
              key={entry.id}
              type="button"
              aria-label={entry.title}
              aria-current={dot === index}
              onClick={() => {
                setStopped(true)
                if (dot !== index) advance(dot)
              }}
              className={`h-1.5 rounded-full transition-all ${
                dot === index ? "w-4 bg-[#11161D]" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {others.map((entry) => (
          <Tile key={entry.id} project={entry} />
        ))}
      </div>

      <div className="mt-8 border-t border-slate-300 pt-6">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-teal-700">
              Personal &amp; experiments
            </p>
            <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Side builds.
            </h3>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-400">
            4
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {SIDE_BUILDS.map((entry) => (
          <Tile key={entry.id} project={entry} compact />
        ))}
      </div>

      <Link
        to="/projects"
        className="mt-5 flex items-center justify-center rounded-full bg-[#11161D] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
      >
        All 9 projects →
      </Link>
    </div>
  )
}
