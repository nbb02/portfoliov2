import { useEffect, useRef } from "react"
import { Link, useSearchParams } from "react-router-dom"
import ProjectOverview from "./ProjectOverview"
import ProjectShowcase, { type ShowcaseTab } from "./ProjectShowcase"
import PrintSetShowcase from "./printset-showcase"

const SHOWCASE: ShowcaseTab[] = [
  {
    id: "editor",
    label: "Editor",
    kicker: "01 · The canvas",
    headline: "Four ways to fill a sheet.",
    body: "Every page owns its layout mode, so one document can mix a slot sheet, a photo grid and a hand-placed collage without turning into three tools.",
    bullets: [
      "Single photo with contain, cover, fit-width, fit-height or stretch.",
      "Slot templates, including an ID preset that keeps 3.5 in width and derives height from the photo.",
      "Equal-cell grids that paginate as photos fill up, with a fit rule per cell.",
      "Free boxes with guides, magnet snapping and equal-gap spacing readouts.",
    ],
    caption:
      "Letter · 0.50 in margins · four cells at 3.55 × 4.80 in. Screen guides never reach print.",
    images: [
      {
        src: "/assets/projects/printset/editor-grid.webp",
        alt: "PrintSet editing a four-photo grid on Letter paper with rulers, margins and spacing guides visible",
        width: 2880,
        height: 1800,
      },
    ],
  },
  {
    id: "precision",
    label: "Precision",
    kicker: "02 · Inch control",
    headline: "Place it, then nudge it by a sixteenth.",
    body: "Positions are stored in inches, so zoom, window size and device pixel ratio cannot change the sheet. Dragging is assisted; the final number is still yours.",
    bullets: [
      "Arrow keys nudge by 1/16 in; Shift moves a quarter inch.",
      "Magnet snap takes over when an edge or centre lines up, with the gap measured while you move.",
      "Crop on the canvas or in a precise modal, then rotate a quarter turn without re-deriving the crop.",
      "Effective DPI warns below 200 without blocking the layout.",
    ],
    caption:
      "Guides, snap lines and spacing pills are one screen-only SVG overlay, separate from document data.",
    images: [
      {
        src: "/assets/projects/printset/collage.webp",
        alt: "A hand-placed PrintSet collage with guide lines and inch spacing readouts on the canvas",
        width: 2880,
        height: 1800,
      },
    ],
  },
  {
    id: "outputs",
    label: "Outputs",
    kicker: "03 · On paper",
    headline: "The sheet is the deliverable.",
    body: "The same document renders to the screen, the print stylesheet and a PDF. Each output reads the same placed boxes, drawn at the paper's own size.",
    bullets: [
      "Slot sheets for ID fronts and backs, badges and cut-to-size cards.",
      "Grids for contact sheets, photo sets and catalogues.",
      "Freeform pages for collages, labels and anything irregular.",
      "Exact-size PDF export, composed at up to 300 dpi with a 4096 px long-edge cap.",
    ],
    caption:
      "ID sheet, four-up grid and hand-placed collage, each drawn at real paper sizes with cut guides only where asked.",
    images: [
      {
        src: "/assets/projects/printset/sheet-id.webp",
        alt: "Two ID-sized cards laid out on a sheet with cut guides",
        width: 1080,
        height: 1394,
        label: "ID",
      },
      {
        src: "/assets/projects/printset/sheet-grid.webp",
        alt: "Four photos arranged in an equal grid on a sheet",
        width: 1080,
        height: 1394,
        label: "Grid",
      },
      {
        src: "/assets/projects/printset/sheet-collage.webp",
        alt: "Hand-placed photo boxes forming a collage on a sheet",
        width: 1080,
        height: 1394,
        label: "Collage",
      },
    ],
  },
  {
    id: "ai",
    label: "AI bridge",
    kicker: "04 · Optional",
    headline: "The agent edits. You stay in charge.",
    body: "Switch on AI in the header and an MCP client can build or adjust the open layout while you watch. The app keeps the document; the model never works on a hidden copy.",
    bullets: [
      "The bridge runs over loopback, one window at a time.",
      "AI edits go through the same store as the toolbar, so undo works on them.",
      "Tools cover paper, margins, pages, grids, slots, placement, crop, rotation, fit and PDF export.",
      "Off by default: no edits until the header says AI live.",
    ],
    caption:
      "The MCP server is launched by your client from the repository; the packaged app does not include it.",
    images: [
      {
        src: "/assets/projects/printset/ai-live.webp",
        alt: "PrintSet with the AI live indicator in the header and a photo grid on the canvas",
        width: 2880,
        height: 1800,
      },
    ],
  },
]

const SECTIONS = [
  {
    title: "Features",
    body: "A focused tool for the last step before the printer, not another design editor.",
    bullets: [
      "Four layout modes per page: single photo, slot templates, paginated grids, and hand-placed free boxes.",
      "A slot designer that saves named templates, plus saved custom paper sizes.",
      "Inline crop with eight handles, quarter-turn rotation, five fit rules and a precise crop modal.",
      "Undo/redo, multiple autosaved layouts, and a .printset bundle that moves documents and photos between machines.",
      "Exact-size PDF export and a print stylesheet that keeps the sheet at 1:1.",
      "No text, effects, layers, accounts or uploads. Photos go on paper at the size you meant.",
    ],
  },
  {
    title: "Engineering",
    body: "One document model feeds every output, and the geometry stays out of React.",
    bullets: [
      "Every placed box stores x, y, width and height in inches; nothing is stored as screen pixels.",
      "Screen, @media print and pdf-lib all read the same PlacedItem[], which is why the printout matches the window.",
      "Transform order is fixed: rotation → crop → fit → pan, with one forward geometry function and one inverse.",
      "Photos decode with EXIF orientation applied, then are stored once in IndexedDB keyed by content hash.",
      "Layout maths lives in a React-free library and is covered by 123 tests.",
      "The same static bundle runs inside a Tauri v2 window; native access goes through one fallback-aware module.",
    ],
  },
]

const HIGHLIGHTS = [
  "Inches-first document model and geometry",
  "Screen, print stylesheet and PDF from one render",
  "Pure TypeScript layout library with 123 tests",
  "Tauri v2 desktop shell around a static bundle",
  "IndexedDB storage with content-hash image dedupe",
  "Local MCP bridge with undoable AI edits",
]

const VIEWS = [
  { id: "overview", label: "Overview", to: "/projects/printset" },
  {
    id: "showcase",
    label: "Full showcase",
    to: "/projects/printset?view=showcase",
  },
] as const

function PrintSetTabs({ view }: { view: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-300 pb-4">
      <nav
        aria-label="PrintSet views"
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
        PrintSet 0.1 · 2026
      </p>
    </div>
  )
}

export default function PrintSet() {
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
      kicker="Print layout tool · 2026"
      title="PrintSet"
      intro="Image print layouts at real paper sizes. Drop photos, place them at exact inch positions, then print or export a PDF that measures what it says. One codebase ships as a Windows desktop app and a static web build."
      iconNode={
        <img
          src="/assets/projects/printset/icon.webp"
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 rounded-[10px]"
        />
      }
      stack={[
        "React",
        "TypeScript",
        "Tauri",
        "Zustand",
        "pdf-lib",
        "Vite",
        "Tailwind",
        "IndexedDB",
        "MCP",
      ]}
      tags={[
        "Desktop + web",
        "Local-first",
        "Exact-size PDF",
        "MCP bridge",
      ]}
      links={[
        { label: "Source on GitHub", href: "https://github.com/nbb02/PrintSet" },
      ]}
      meta={[
        { label: "Role", value: "Personal project" },
        { label: "Timeline", value: "2026" },
        { label: "Status", value: "v0.1.0 · Windows + web" },
      ]}
      afterHero={
        <div ref={tabsRef} className="scroll-mt-24">
          <PrintSetTabs view={view} />
        </div>
      }
      sections={isShowcase ? [] : SECTIONS}
      preview={{
        src: "/assets/projects/printset/editor-grid.webp",
        alt: "PrintSet editor with a four-photo grid on Letter paper",
        width: 2880,
        height: 1800,
      }}
      showcase={
        isShowcase ? undefined : (
          <ProjectShowcase
            title="Inside the app"
            intro="A short tour of the editor, the precision controls, the sheets it produces, and the optional AI bridge."
            tabs={SHOWCASE}
            moreHref="/projects/printset?view=showcase"
            moreLabel="Open the full showcase"
          />
        )
      }
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={isShowcase ? [] : HIGHLIGHTS}
      nextHref="/projects/client-portal"
      nextLabel="Next: Client Portal Platform"
    >
      {isShowcase && <PrintSetShowcase />}
    </ProjectOverview>
  )
}
