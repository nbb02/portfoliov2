import { useEffect, useRef } from "react"
import { FiGitBranch, FiLayers, FiMonitor } from "react-icons/fi"
import { Link, useSearchParams } from "react-router-dom"
import ProjectOverview, { type ProjectBrief } from "./ProjectOverview"
import ProjectShowcase, { type ShowcaseTab } from "./ProjectShowcase"
import VirtualSpacesShowcase from "./virtual-spaces-showcase"

const SHOWCASE: ShowcaseTab[] = [
  {
    id: "office",
    label: "Office",
    kicker: "01 · The floor",
    headline: "Nine rooms, one floorplan.",
    body: "The plate outline, walls, doors, desk rows and walk graph all live in one module, so nothing else in the scene is allowed to declare a wall.",
    bullets: [
      "Seventeen claimable seats; a desk renders whether or not an agent owns it.",
      "The outer wall that faces the camera drops to a low kerb, so you can see into every room.",
      "An idle agent walks to the break room instead of standing at an empty desk.",
      "Synthetic tennis visitors play outside and never reach the bridge or hold a seat.",
    ],
    caption:
      "Office at day. Every character on the floor is an agent reported in the last 24 hours.",
    images: [
      {
        src: "/assets/projects/virtual-office/day.webp",
        alt: "The Virtual Spaces office at day, with claimed desks, a break room, a lounge and a terrace tennis court",
        width: 2400,
        height: 1500,
      },
    ],
  },
  {
    id: "tools",
    label: "Tools Wing",
    kicker: "02 · Live status",
    headline: "One bay per tool, lit only when it works.",
    body: "Bays come from config, so the default trio is hand-placed and a fourth tool simply gets a fourth bay. The medallion is the status; the operator is the presence.",
    bullets: [
      "Seven states: running, waiting, recent, idle, closed, unknown and offline.",
      "A tool that is idle or closed sleeps in a recharge pod until its process returns.",
      "Lights, arc and operator appear only while the tool is actually working.",
      "The status board is fed by a two-second poll that stops while the tab is hidden.",
    ],
    caption:
      "OpenCode is running, Codex is closed. Both facts come from the process table, not from old logs.",
    images: [
      {
        src: "/assets/projects/virtual-office/tools-wing.webp",
        alt: "The Tools Wing with an OpenCode bay running, a closed Codex bay and idle tools in recharge pods",
        width: 2400,
        height: 1500,
      },
    ],
  },
  {
    id: "farm",
    label: "Farm",
    kicker: "03 · Same engine",
    headline: "Proof the scene data is really data.",
    body: "The farm reuses the character rigs, the router and the theme, and changes only its own data module. It is the test that nothing about the office is hard-coded.",
    bullets: [
      "A windmill, two pigs and three hens, animated on the same frame loop.",
      "Four solar panels merged into a single mesh with the rest of the props.",
      "Each farm role has its own idle spots: Vera checks the beds, Atlas the pens, Nova the array.",
      "Animals wander inside the same walk graph the humans use, so nothing leaves its pen.",
    ],
    caption: "A second world for the cost of one data file.",
    images: [
      {
        src: "/assets/projects/virtual-office/farm.webp",
        alt: "The Virtual Spaces farm with a windmill, solar array, crop beds, pigs and hens",
        width: 2400,
        height: 1500,
      },
    ],
  },
  {
    id: "night",
    label: "After hours",
    kicker: "04 · Day and night",
    headline: "The same room after dark.",
    body: "Palette, sky and lights are one theme switch, so the night scene costs no second build and every overlay stays readable.",
    bullets: [
      "A night palette with starlight, floor lamps and glowing monitors.",
      "Clean view hides every overlay so the scene can be captured on its own.",
      "Free-fly and scene keys never ask for a pointer lock.",
      "Every screenshot in this showcase was taken with the clean view.",
    ],
    caption:
      "Office at night. The clean, HUD-free view is in the gallery and the full showcase.",
    images: [
      {
        src: "/assets/projects/virtual-office/night.webp",
        alt: "The Virtual Spaces office at night with lit monitors, floor lamps and a starfield",
        width: 2400,
        height: 1500,
      },
    ],
  },
]

const BRIEF: ProjectBrief = {
  what: {
    title: "A 3D office for your agents.",
    points: [
      "Desks: agents claim seats and bays light up while tools run.",
      "Routes: characters walk the live floor instead of a static diagram.",
      "Control: start and stop dev servers from inside the scene.",
    ],
  },
  how: {
    title: "Local data, one scene.",
    points: [
      "The floor, walls, doors, and walk graph live in one module.",
      "Bridges return derived state, never raw logs or file paths.",
      "The same bridge code runs in the browser build and the desktop shell.",
    ],
  },
}

const NOTES = [
  {
    label: "Scene",
    text: "Switching scenes swaps a subtree, not a second canvas.",
    icon: FiLayers,
  },
  {
    label: "Bridges",
    text: "Endpoints return derived state, never raw logs.",
    icon: FiGitBranch,
  },
  {
    label: "Shell",
    text: "The same bridges run in the browser and desktop builds.",
    icon: FiMonitor,
  },
] as const

const VIEWS = [
  { id: "overview", label: "Overview", to: "/projects/virtual-office" },
  {
    id: "showcase",
    label: "Full showcase",
    to: "/projects/virtual-office?view=showcase",
  },
] as const

function VirtualSpacesTabs({ view }: { view: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 pb-4">
      <nav
        aria-label="Virtual Spaces views"
        className="flex gap-1 rounded-full border border-slate-300 bg-white/50 p-1"
      >
        {VIEWS.map((item) => {
          const active = item.id === view

          return (
            <Link
              key={item.id}
              to={item.to}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                active
                  ? "bg-[#11161D] text-white shadow-sm"
                  : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
              }`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
      <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
        Virtual Spaces · 2026
      </p>
    </div>
  )
}

export default function VirtualSpaces() {
  const [searchParams] = useSearchParams()
  const view = searchParams.get("view") === "showcase" ? "showcase" : "overview"
  const isShowcase = view === "showcase"
  const tabsRef = useRef<HTMLDivElement>(null)
  const previousView = useRef(view)

  useEffect(() => {
    if (previousView.current === view) return
    previousView.current = view

    const tabs = tabsRef.current
    if (!tabs) return

    const rect = tabs.getBoundingClientRect()
    if (rect.top < 0 || rect.bottom > window.innerHeight) {
      tabs.scrollIntoView({ block: "start" })
    }
  }, [view])

  return (
    <ProjectOverview
      kicker="3D workspace · 2026"
      title="Virtual Spaces"
      intro="A 3D office that shows what your coding agents are doing. Virtual Spaces reads the local logs, databases and process table that agent tools leave behind, then turns them into a place you can watch: agents claim desks, bays light up while a tool runs, and dev servers start from inside the scene. Nothing leaves the machine."
      iconNode={
        <img
          src="/assets/projects/virtual-office/icon.svg"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9"
        />
      }
      stack={[
        "React",
        "React Three Fiber",
        "Three.js",
        "Vite",
        "Node.js",
        "Tauri",
        "Tailwind",
      ]}
      tags={["Local-first", "3D", "Desktop + web", "Agent presence"]}
      links={[
        {
          label: "Source on GitHub",
          href: "https://github.com/nbb02/virtual-office",
        },
      ]}
      meta={[
        { label: "Role", value: "Design, frontend, local backend — solo" },
        { label: "Timeline", value: "2026" },
        { label: "Status", value: "In progress — Windows + web" },
      ]}
      afterHero={
        <div ref={tabsRef} className="scroll-mt-24">
          <VirtualSpacesTabs view={view} />
        </div>
      }
      brief={isShowcase ? undefined : BRIEF}
      preview={{
        src: "/assets/projects/virtual-office/day.webp",
        alt: "Virtual Spaces office at day with desks, agents, a lounge and a terrace court",
        width: 2400,
        height: 1500,
      }}
      showcase={
        isShowcase ? undefined : (
          <ProjectShowcase
            title="Inside the app"
            intro="A short tour of the office floor, the live tool status, the farm, and the same room after dark."
            tabs={SHOWCASE}
            moreHref="/projects/virtual-office?view=showcase"
            moreLabel="Open the full showcase"
          />
        )
      }
      notes={isShowcase ? undefined : NOTES}
      nextHref="/projects/client-portal"
      nextLabel="Next: Client Portal Platform"
    >
      {isShowcase && <VirtualSpacesShowcase />}
    </ProjectOverview>
  )
}
