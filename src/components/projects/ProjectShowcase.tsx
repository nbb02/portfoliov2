import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { Link } from "react-router-dom"
import { FiCheck, FiMaximize2 } from "react-icons/fi"
import ImageLightbox from "../ImageLightbox"

export type ShowcaseImage = {
  src: string
  alt: string
  width: number
  height: number
  label?: string
}

export type ShowcaseTab = {
  id: string
  label: string
  kicker: string
  headline: string
  body: string
  bullets: string[]
  caption: ReactNode
  images: ShowcaseImage[]
}

const GRID_PATTERN = {
  backgroundImage:
    "linear-gradient(to right, rgba(148,163,184,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.14) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
}

export default function ProjectShowcase({
  kicker = "Showcase",
  title,
  intro,
  tabs,
  moreHref,
  moreLabel,
}: {
  kicker?: string
  title: string
  intro?: string
  tabs: ShowcaseTab[]
  moreHref?: string
  moreLabel?: string
}) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? "")
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const activeIndex = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === activeId),
  )
  const activeTab = tabs[activeIndex]

  const offsets = tabs.map((_, index) =>
    tabs.slice(0, index).reduce((total, item) => total + item.images.length, 0),
  )
  const lightboxImages = tabs.flatMap((tab) => tab.images)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const changeLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
  }, [])

  const onTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const count = tabs.length
    let next: number | null = null

    if (event.key === "ArrowRight") next = (activeIndex + 1) % count
    if (event.key === "ArrowLeft") next = (activeIndex - 1 + count) % count
    if (event.key === "Home") next = 0
    if (event.key === "End") next = count - 1
    if (next === null) return

    event.preventDefault()
    setActiveId(tabs[next].id)
    tabRefs.current[next]?.focus()
  }

  if (!activeTab) return null

  return (
    <>
      <section className="border-t border-slate-300 pt-6">
        <div className="flex items-center gap-3">
          <p className="shrink-0 text-sm font-semibold text-teal-700">
            {kicker}
          </p>
          <span className="h-px flex-1 bg-slate-300" aria-hidden="true" />
        </div>

        <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {title}
            </h2>
            {intro && (
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                {intro}
              </p>
            )}
          </div>

          <div
            role="tablist"
            aria-label="Showcase views"
            onKeyDown={onTabKeyDown}
            className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-slate-300 bg-white/40 p-1"
          >
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  key={tab.id}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  type="button"
                  role="tab"
                  id={`showcase-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={
                    isActive ? `showcase-panel-${tab.id}` : undefined
                  }
                  aria-label={tab.label}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(tab.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#11161D] text-white shadow-sm"
                      : "text-slate-600 hover:bg-white/70 hover:text-slate-950"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={
                      isActive ? "text-teal-300" : "text-slate-400"
                    }
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        <div
          key={activeTab.id}
          id={`showcase-panel-${activeTab.id}`}
          role="tabpanel"
          aria-labelledby={`showcase-tab-${activeTab.id}`}
          className="showcase-panel mt-4 overflow-hidden rounded-2xl border border-slate-300 bg-white/65"
        >
          <div className="grid lg:grid-cols-12">
            <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden border-b border-white/10 bg-[#11161D] p-4 sm:min-h-[400px] sm:p-6 lg:col-span-7 lg:min-h-[440px] lg:border-b-0 lg:border-r lg:border-slate-800">
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={GRID_PATTERN}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl"
                aria-hidden="true"
              />

              {activeTab.images.length === 1 ? (
                <button
                  type="button"
                  onClick={() => setLightboxIndex(offsets[activeIndex])}
                  aria-label={`Open image: ${activeTab.images[0].alt}`}
                  className="group relative z-10 mx-auto block max-w-full"
                >
                  <img
                    src={activeTab.images[0].src}
                    alt={activeTab.images[0].alt}
                    width={activeTab.images[0].width}
                    height={activeTab.images[0].height}
                    loading="lazy"
                    className="block h-auto max-h-[360px] w-auto max-w-full rounded-lg border border-white/10 shadow-2xl"
                  />
                  <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                    <FiMaximize2 size={14} aria-hidden="true" />
                  </span>
                </button>
              ) : (
                <div className="relative z-10 grid w-full grid-cols-3 gap-2.5 sm:gap-3">
                  {activeTab.images.map((image, index) => (
                    <button
                      key={image.src}
                      type="button"
                      onClick={() =>
                        setLightboxIndex(offsets[activeIndex] + index)
                      }
                      aria-label={`Open image: ${image.alt}`}
                      className="group relative overflow-hidden rounded-md border border-white/10 bg-white shadow-xl"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        className="block aspect-[800/1033] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      {image.label && (
                        <span className="absolute bottom-2 left-2 rounded-full bg-slate-950/70 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
                          {image.label}
                        </span>
                      )}
                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-slate-950/70 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <FiMaximize2 size={12} aria-hidden="true" />
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="p-5 sm:p-6 lg:col-span-5 lg:flex lg:min-h-[440px] lg:flex-col lg:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-teal-700">
                {activeTab.kicker}
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {activeTab.headline}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {activeTab.body}
              </p>

              <ul className="mt-5 space-y-2.5">
                {activeTab.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-600"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-700">
                      <FiCheck size={11} aria-hidden="true" />
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-slate-200 pt-4 text-xs leading-relaxed text-slate-500 lg:mt-auto">
                {activeTab.caption}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] text-slate-500">
            Tap a frame to inspect it at full size.
          </p>
          {moreHref && moreLabel && (
            <Link
              to={moreHref}
              className="text-xs font-semibold text-teal-700 transition-colors hover:text-teal-900"
            >
              {moreLabel} →
            </Link>
          )}
        </div>
      </section>

      <ImageLightbox
        images={lightboxImages}
        activeIndex={lightboxIndex}
        onChange={changeLightbox}
        onClose={closeLightbox}
      />
    </>
  )
}
