import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useScrollOffset } from "../hero/useScrollOffset"
import { clamp01 } from "../hero/easing"
import { useInView } from "../useInView"
import type { ScreenRect } from "../hero/LaptopScroll"

const LaptopScroll = lazy(() => import("../hero/LaptopScroll"))
const GithubPanel = lazy(() => import("../hero/GithubPanel"))

/** Scroll spent on the laptop dolly before the page is released. */
const CINEMATIC_VH = 200

/** The panel's design width; the page column is this, scaled. */
const PANEL_WIDTH = 1306

/**
 * The screen is anchored at the viewport top and runs past the bottom, so the page
 * column is the same width as the viewport and the panel is the same design, scaled.
 * That is what makes the last frame of the dolly and the top of the real page agree
 * without any settle at the release.
 */
const PANEL_REVEAL = 0.95
const INTRO_END = 0.18
/** Below this the scaled panel is unreadable; the section becomes a link instead. */
const MIN_CINEMATIC_WIDTH = 1024

type Metrics = { columnWidth: number; scale: number }

/**
 * The viewport without the vertical scrollbar. `window.innerWidth` includes it, and
 * using it for a full-width column makes the column ~15px wider than the space it has —
 * which is what put a horizontal scrollbar on the page.
 */
function viewportWidth() {
  return document.documentElement.clientWidth || window.innerWidth
}

function computeMetrics(): Metrics {
  if (typeof window === "undefined") return { columnWidth: PANEL_WIDTH, scale: 1 }
  const columnWidth = viewportWidth()
  return { columnWidth, scale: columnWidth / PANEL_WIDTH }
}

function isNarrow() {
  if (typeof window === "undefined") return true
  return viewportWidth() < MIN_CINEMATIC_WIDTH
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export default function GithubScene() {
  const [metrics, setMetrics] = useState<Metrics>(computeMetrics)
  const [panelHeight, setPanelHeight] = useState(0)
  const [narrow, setNarrow] = useState(isNarrow)
  const [reduced, setReduced] = useState(prefersReducedMotion)
  const { columnWidth, scale } = metrics

  useEffect(() => {
    const update = () => {
      const next = computeMetrics()
      setMetrics((current) =>
        current.columnWidth === next.columnWidth ? current : next,
      )
      setNarrow(isNarrow())
      setReduced(prefersReducedMotion())
    }

    update()
    window.addEventListener("resize", update)
    /*
     * `resize` does not fire when the vertical scrollbar appears or disappears, which
     * changes the available width. Watching the document catches both.
     */
    const observer = new ResizeObserver(update)
    observer.observe(document.documentElement)

    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    query.addEventListener("change", update)
    return () => {
      window.removeEventListener("resize", update)
      observer.disconnect()
      query.removeEventListener("change", update)
    }
  }, [])

  /*
   * The panel mounts inside Suspense, so a one-shot measurement runs before there is
   * any content and leaves the wrapper at the unscaled height — the scaled page then
   * overflows and gets clipped. Observe it instead.
   */
  const panelRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = panelRef.current
    if (!element) return
    const update = () => setPanelHeight(element.offsetHeight)
    update()
    const observer = new ResizeObserver(update)
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  if (narrow) {
    return (
      <section id="github" className="bg-[#0D1117] px-5 py-16">
        <div className="mx-auto max-w-[420px] text-center text-[#F4F0E8]">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-teal-300/80">
            Bonus
          </p>
          <h2 className="mt-3 text-[1.4rem] font-semibold leading-tight">
            The whole profile, on GitHub.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            Read the README, selected work and experience straight from the profile.
          </p>
          <a
            href="https://github.com/nbb02"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex rounded-full bg-teal-400 px-5 py-2.5 text-sm font-semibold text-[#0D1117]"
          >
            Open github.com/nbb02 →
          </a>
        </div>
      </section>
    )
  }

  return (
    <>
      {!reduced && <Dolly />}

      <section
        id="github"
        className={
          reduced
            ? "relative bg-[#0D1117]"
            : "relative z-0 -mt-[100svh] bg-[#0D1117]"
        }
      >
        <div
          className="mx-auto overflow-hidden"
          style={{
            width: columnWidth,
            height: panelHeight ? panelHeight * scale : undefined,
          }}
        >
          <div
            ref={panelRef}
            style={{
              width: PANEL_WIDTH,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
            }}
          >
            <Suspense fallback={null}>
              <GithubPanel />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  )
}

function Dolly() {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const bridgeRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const lastOffset = useRef(0)
  const lastSpan = useRef(0)
  const screenRect = useRef<ScreenRect | null>(null)
  const cinemaRef = useRef(0)
  const [render3d, setRender3d] = useState(true)
  const render3dRef = useRef(true)

  const applyProgress = useCallback(
    (offset: number, span: number) => {
      const frame = frameRef.current
      if (!frame) return
      const p = span > 0 ? clamp01(offset / span) : 0
      cinemaRef.current = p

      const intro = introRef.current
      if (intro) {
        const out = clamp01(p / INTRO_END)
        intro.style.opacity = `${1 - out}`
        intro.style.transform = `translateY(${-12 * out}px)`
      }

      const bridge = bridgeRef.current
      const canvas = canvasRef.current
      const quad = screenRect.current

      if (quad && quad.width > 1) {
        const bridgeScale = quad.width / PANEL_WIDTH

        if (bridge) {
          bridge.style.transform = `translate(${quad.left}px, ${quad.top}px) scale(${bridgeScale})`
          bridge.style.opacity = p >= PANEL_REVEAL ? "1" : "0"
          bridge.style.visibility =
            p >= PANEL_REVEAL - 0.01 ? "visible" : "hidden"
        }

        /*
         * The panel replaces the screen at the same instant, so the 3D must go with
         * it — otherwise a frozen frame stays on the canvas and shows through as a
         * second copy around the panel's edges.
         */
        if (canvas) canvas.style.opacity = p >= PANEL_REVEAL ? "0" : "1"
      }

      const released = p >= 1
      frame.style.opacity = released ? "0" : "1"
      frame.style.pointerEvents = released ? "none" : "auto"
      // The pin is stacked above the page so the frame can cover it; it must stop
      // swallowing pointer events once the page is live underneath.
      const pin = frame.parentElement
      if (pin) pin.style.pointerEvents = released ? "none" : "auto"

      const shouldRender = p < PANEL_REVEAL
      if (shouldRender !== render3dRef.current) {
        render3dRef.current = shouldRender
        setRender3d(shouldRender)
      }
    },
    [],
  )

  const handleScreenRect = useCallback(
    (rect: ScreenRect | null) => {
      const previous = screenRect.current
      screenRect.current = rect
      const changed =
        !previous ||
        !rect ||
        Math.abs(previous.left - rect.left) > 0.5 ||
        Math.abs(previous.top - rect.top) > 0.5 ||
        Math.abs(previous.width - rect.width) > 0.5 ||
        Math.abs(previous.height - rect.height) > 0.5
      if (changed) applyProgress(lastOffset.current, lastSpan.current)
    },
    [applyProgress],
  )

  const handleOffset = useCallback(
    (offset: number, span: number) => {
      lastOffset.current = offset
      lastSpan.current = span
      applyProgress(offset, span)
    },
    [applyProgress],
  )
  const { targetRef } = useScrollOffset<HTMLElement>(handleOffset)
  const inView = useInView(targetRef, "120% 0px")

  return (
    <section
      ref={targetRef}
      className="relative z-10"
      style={{ height: `calc(${CINEMATIC_VH}vh + 100svh)` }}
    >
      <div
        ref={frameRef}
        className="sticky top-0 h-[100svh] overflow-hidden bg-[#0D1117]"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(45,212,191,0.14),transparent_62%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(13,148,136,0.2),transparent_68%)]" />
        </div>

        <div
          ref={introRef}
          className="pointer-events-none absolute inset-x-0 top-[12svh] z-10 mx-auto max-w-[1240px] px-5 sm:px-8"
        >
          <h2 className="max-w-[340px] text-[1.6rem] font-semibold leading-tight text-[#F4F0E8] md:text-[2rem]">
            Scroll into my GitHub.
          </h2>
          <p className="mt-2 max-w-[320px] text-sm leading-relaxed text-white/55">
            The full profile and README — keep scrolling to read it.
          </p>
        </div>

        <div ref={canvasRef} className="pointer-events-none absolute inset-0 z-20">
          {inView && (
            <Suspense fallback={null}>
              <LaptopScroll
                progressRef={cinemaRef}
                onScreenRect={handleScreenRect}
                render={render3d}
              />
            </Suspense>
          )}
        </div>

        <div
          ref={bridgeRef}
          aria-hidden="true"
          className="invisible absolute left-0 top-0 z-30 opacity-0"
          style={{ width: PANEL_WIDTH, transformOrigin: "0 0" }}
        >
          <Suspense fallback={null}>
            <GithubPanel />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
