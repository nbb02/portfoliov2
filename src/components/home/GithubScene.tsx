import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import { useScrollOffset } from "../hero/useScrollOffset"
import { clamp01 } from "../hero/easing"
import { useInView } from "../useInView"
import {
  PHONE_SCREEN_ASPECT,
  SCREEN_ASPECT,
  SCREEN_CAPTURE_RATIO,
  screenCacheKey,
} from "../hero/screenGeometry"
import {
  HERO_PANEL_KEY,
  PHONE_PANEL_KEY,
  cachedScreenCanvas,
  capturePanel,
  releaseScreenCanvasesExcept,
  rememberScreenCanvas,
  sliceScreen,
} from "../hero/panelCapture"
import type { ScreenRect } from "../hero/LaptopScroll"

const LaptopScroll = lazy(() => import("../hero/LaptopScroll"))
const GithubPanel = lazy(() => import("../hero/GithubPanel"))

/** Scroll spent on the laptop dolly before the page is released. */
const CINEMATIC_VH = 200

/**
 * How the wide layout hands over: the panel replaces the laptop screen at the
 * same width and position it ends on, so the two agree without any settle at the
 * release. The panel is laid out at the viewport's own width, so the screen fills
 * the window and the extra width of a large monitor goes into the page's margins
 * rather than scaling the type up with it.
 */
const PANEL_REVEAL = 0.95
const INTRO_END = 0.18

/**
 * Progress at which the swapped-in panel is mounted. It used to be mounted with
 * the whole dolly, which put a second copy of the panel's DOM — several hundred
 * nodes — into the layout for the entire scroll toward this section.
 */
const BRIDGE_MOUNT = 0.8

/**
 * The width gate picks the device, not the choreography: a phone screen is the
 * viewport's own ratio, so a narrow viewport hands over the same way a wide one
 * does — only the thing holding the screen differs.
 */
const DESKTOP_MIN_WIDTH = 1024

/**
 * The viewport without the vertical scrollbar. `window.innerWidth` includes it, and
 * using it for a full-width column makes the column ~15px wider than the space it has —
 * which is what put a horizontal scrollbar on the page.
 */
function viewportWidth() {
  if (typeof document === "undefined") return 1280
  return document.documentElement.clientWidth || window.innerWidth
}

function isMobileViewport() {
  if (typeof window === "undefined") return false
  return viewportWidth() < DESKTOP_MIN_WIDTH
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Left edge of the page's 1240 column, where the intro copy starts. */
function columnLeft(width: number) {
  return Math.max(32, (width - 1240) / 2 + 32)
}

export default function GithubScene() {
  const [columnWidth, setColumnWidth] = useState(viewportWidth)
  const [panelHeight, setPanelHeight] = useState(0)
  const [mobile, setMobile] = useState(isMobileViewport)
  const [reduced, setReduced] = useState(prefersReducedMotion)
  /*
   * The scroll maths are all in `innerHeight`, and the pinned frame has to cover
   * exactly that much: `svh` is the window's, not what is on screen when the
   * address bar is hidden or the page is zoomed, and anything it leaves uncovered
   * shows the real page underneath.
   */
  const [viewportHeight, setViewportHeight] = useState(() =>
    typeof window === "undefined" ? 900 : window.innerHeight,
  )

  /*
   * The screen fills the viewport at the end of the dolly, so its capture used
   * to be rasterised at the same density the canvas draws at. It is rasterised
   * at 1× now: the rasterise is a long main-thread task, and it was the one
   * thing that reliably stuttered the scroll into this section.
   */
  const aspect = mobile ? PHONE_SCREEN_ASPECT : SCREEN_ASPECT
  const screenRatio = SCREEN_CAPTURE_RATIO
  const screenKey = screenCacheKey(columnWidth, screenRatio)

  /* Coming back to the scene reuses this viewport's capture until it is retaken. */
  const [screenCanvas, setScreenCanvas] = useState<HTMLCanvasElement | null>(
    () => cachedScreenCanvas(screenKey),
  )

  useEffect(() => {
    const update = () => {
      setColumnWidth(viewportWidth())
      setMobile(isMobileViewport())
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

  useEffect(() => {
    const measure = () => setViewportHeight(window.innerHeight)

    measure()
    window.addEventListener("resize", measure)
    window.visualViewport?.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
      window.visualViewport?.removeEventListener("resize", measure)
    }
  }, [])

  const panelRef = useRef<HTMLDivElement>(null)
  const [panelNear, setPanelNear] = useState(false)
  useEffect(() => {
    const element = panelRef.current
    if (!element) return

    const measure = () => setPanelHeight(element.offsetHeight)
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(element)

    /*
     * Rasterising a page at the viewport's width is not free, so hold it until
     * the dolly is a screen or two away instead of doing it while the hero is
     * still on screen.
     */
    const view = new IntersectionObserver(
      (entries) => setPanelNear(Boolean(entries[0]?.isIntersecting)),
      { rootMargin: "300% 0px" },
    )
    view.observe(element)

    return () => {
      resize.disconnect()
      view.disconnect()
    }
  }, [mobile])

  /*
   * The dolly's screen is the panel itself, captured once per width. Because the
   * capture is the same layout the page draws, the last frame of the dolly and
   * the top of the real page are the same pixels — the handoff cannot flick.
   */
  /*
   * Starts from the cached bitmap when there is one: this ref is per mount, and
   * a mount that starts at "" re-rasterises the whole panel even though the
   * canvas is already in memory.
   */
  const capturedKey = useRef(cachedScreenCanvas(screenKey) ? screenKey : "")
  useEffect(() => {
    if (reduced || !panelHeight || !panelNear) return
    const node = panelRef.current
    if (!node || capturedKey.current === screenKey) return

    let cancelled = false
    let started = false
    let settle = 0
    let idle = 0

    const run = async () => {
      try {
        /*
         * Only the rows the screen shows are rasterised: a full-height capture
         * would be mostly page that never reaches the screen.
         */
        const canvas = await capturePanel(node, columnWidth, {
          height: Math.round(columnWidth / aspect),
          pixelRatio: screenRatio,
          key: screenKey,
        })
        if (cancelled) return
        capturedKey.current = screenKey
        const slice = sliceScreen(canvas, aspect)
        rememberScreenCanvas(slice, screenKey)
        setScreenCanvas(slice)
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("[github] screen capture failed", error)
        }
      }
    }

    /*
     * Rasterising the panel is a long task. Running it on proximity put it in
     * the middle of the scroll toward this section, which is what made the
     * approach stutter; it waits for the scroll to settle instead.
     */
    const schedule = () => {
      if (started) return
      window.clearTimeout(settle)
      settle = window.setTimeout(() => {
        started = true
        idle = window.requestIdleCallback(run, { timeout: 2000 })
      }, 250)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    return () => {
      cancelled = true
      window.removeEventListener("scroll", schedule)
      window.clearTimeout(settle)
      if (idle) window.cancelIdleCallback(idle)
    }
  }, [reduced, panelHeight, panelNear, columnWidth, aspect, screenRatio, screenKey])

  /* Drop captures for widths the page no longer draws. The textures that go
     with them are released by the dolly, which is where three is loaded. */
  useEffect(() => {
    if (!screenCanvas || !cachedScreenCanvas(screenKey)) return
    releaseScreenCanvasesExcept([HERO_PANEL_KEY, PHONE_PANEL_KEY, screenKey])
  }, [screenCanvas, screenKey])

  return (
    <div className="relative bg-[#0D1117]">
      {mobile && (
        /*
         * The pinned copy has no room beside the lid on a phone, and the laptop
         * crosses it on the way in, so it leads the section in its own block
         * instead of riding inside the frame.
         */
        <div className="px-5 pb-2 pt-14">
          <h2 className="text-[1.55rem] font-semibold leading-tight text-[#F4F0E8]">
            Scroll into my GitHub.
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/55">
            The full profile and README — keep scrolling to read it.
          </p>
        </div>
      )}

      {!reduced && (
        <Dolly
          screenCanvas={screenCanvas}
          screenKey={screenKey}
          columnWidth={columnWidth}
          mobile={mobile}
          viewportHeight={viewportHeight}
        />
      )}

      <section
        id="github"
        className={reduced ? "relative" : "relative z-0"}
        style={reduced ? undefined : { marginTop: -viewportHeight }}
      >
        <div ref={panelRef} className="w-full">
          <Suspense fallback={null}>
            <GithubPanel />
          </Suspense>
        </div>
      </section>
    </div>
  )
}

function Dolly({
  screenCanvas,
  screenKey,
  columnWidth,
  mobile,
  viewportHeight,
}: {
  screenCanvas: HTMLCanvasElement | null
  screenKey: string
  columnWidth: number
  mobile: boolean
  viewportHeight: number
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const bridgeRef = useRef<HTMLDivElement>(null)
  const bridgeInnerRef = useRef<HTMLDivElement>(null)
  const introRef = useRef<HTMLDivElement>(null)
  const introLayout = useRef<{
    columnWidth: number
    width: number
    left: number
    visible: boolean
  } | null>(null)
  const lastOffset = useRef(0)
  const lastSpan = useRef(0)
  const screenRect = useRef<ScreenRect | null>(null)
  const cinemaRef = useRef(0)
  const applied = useRef({ p: -1, quad: "" })
  const [render3d, setRender3d] = useState(true)
  const render3dRef = useRef(true)
  const [bridgeOn, setBridgeOn] = useState(false)
  const bridgeOnRef = useRef(false)

  const applyProgress = useCallback(
    (offset: number, span: number) => {
      const frame = frameRef.current
      if (!frame) return
      const p = span > 0 ? clamp01(offset / span) : 0
      cinemaRef.current = p

      /*
       * Every one of these writes invalidates style for the frame's subtree,
       * and the bridge inside it is the whole panel — about 5 ms a frame. Once
       * the dolly is released nothing changes, so leave the DOM alone: the
       * panel below scrolls with no style work at all.
       */
      const quad = screenRect.current
      const quadKey = quad
        ? `${quad.left}|${quad.top}|${quad.width}|${quad.height}`
        : ""
      if (applied.current.p === p && applied.current.quad === quadKey) return
      applied.current = { p, quad: quadKey }

      if (p >= BRIDGE_MOUNT && !bridgeOnRef.current) {
        bridgeOnRef.current = true
        setBridgeOn(true)
      }

      const intro = introRef.current
      const bridge = bridgeRef.current
      const inner = bridgeInnerRef.current
      const canvas = canvasRef.current

      if (quad && quad.width > 1) {
        const bridgeScale = quad.width / columnWidth

        if (bridge) {
          bridge.style.transform = `translate(${quad.left}px, ${quad.top}px)`
          bridge.style.opacity = p >= PANEL_REVEAL ? "1" : "0"
          bridge.style.visibility =
            p >= PANEL_REVEAL - 0.01 ? "visible" : "hidden"
        }

        if (inner) inner.style.transform = `scale(${bridgeScale})`

        /*
         * The panel replaces the screen at the same instant, so the 3D must go with
         * it — otherwise a frozen frame stays on the canvas and shows through as a
         * second copy around the panel's edges.
         */
        if (canvas) canvas.style.opacity = p >= PANEL_REVEAL ? "0" : "1"

        /*
         * The copy is laid out against the lid once, while the dolly is still at
         * its hero framing. Deriving the width every frame made the text chase
         * the model's idle drift and reflow word by word; measuring it late — a
         * reload already inside the pin — could latch a quad with no room left
         * and hide the copy for good. Until it is measured the CSS column stands,
         * so the copy is never absent from the part of the scroll that shows it.
         */
        if (intro) {
          if (!introLayout.current && p <= INTRO_END) {
            const clearance = Math.max(24, quad.width * 0.08)
            const available = quad.left - 24 - clearance

            if (available < 200) {
              introLayout.current = {
                columnWidth,
                width: 340,
                left: columnLeft(columnWidth),
                visible: false,
              }
            } else {
              const width = Math.min(340, Math.floor(available / 8) * 8)
              const limit = Math.floor((quad.left - clearance - width) / 8) * 8
              introLayout.current = {
                columnWidth,
                width,
                left: Math.max(24, Math.min(columnLeft(columnWidth), limit)),
                visible: true,
              }
            }
          }

          const layout = introLayout.current
          if (layout && layout.columnWidth === columnWidth) {
            intro.style.visibility = layout.visible ? "visible" : "hidden"
            intro.style.width = `${layout.width}px`
            intro.style.left = `${layout.left}px`
          }
        }
      }

      if (intro) {
        const out = clamp01(p / INTRO_END)
        intro.style.opacity = `${1 - out}`
        intro.style.transform = `translateY(${-12 * out}px)`
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
    [columnWidth],
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
  /*
   * Built once and kept, like the hero: unmounting this canvas means re-creating
   * a full-viewport context, re-uploading the model and rasterising the panel
   * again the next time it comes into range.
   */
  const mounted = useInView(targetRef, "250% 0px", true)
  /* Drawing follows actual visibility, so a warm canvas that is still above the
     pin does not compete with the hero for the frame. */
  const visible = useInView(targetRef, "0px 0px")

  return (
    <section
      ref={targetRef}
      className="relative z-10"
      style={{
        height: `calc(${CINEMATIC_VH}vh + ${viewportHeight}px)`,
      }}
    >
      <div
        ref={frameRef}
        className="sticky top-0 overflow-hidden bg-[#0D1117]"
        style={{ height: viewportHeight }}
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.16)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_50%_45%,black,transparent_72%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(45,212,191,0.14),transparent_62%)]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(13,148,136,0.2),transparent_68%)]" />
        </div>

        <div
          ref={introRef}
          className="pointer-events-none absolute top-[12svh] z-10 hidden w-[340px] max-w-[340px] lg:block"
          style={{ left: columnLeft(columnWidth) }}
        >
          <h2 className="max-w-[340px] text-[1.6rem] font-semibold leading-tight text-[#F4F0E8] md:text-[2rem]">
            Scroll into my GitHub.
          </h2>
          <p className="mt-2 max-w-[320px] text-sm leading-relaxed text-white/55">
            The full profile and README — keep scrolling to read it.
          </p>
        </div>

        <div ref={canvasRef} className="pointer-events-none absolute inset-0 z-20">
          {mounted && (
            <Suspense fallback={null}>
              <LaptopScroll
                progressRef={cinemaRef}
                onScreenRect={handleScreenRect}
                render={render3d && visible}
                screenCanvas={screenCanvas}
                screenKey={screenKey}
                device={mobile ? "phone" : "laptop"}
              />
            </Suspense>
          )}
        </div>

        <div
          ref={bridgeRef}
          aria-hidden="true"
          className="invisible absolute left-0 top-0 z-30 opacity-0"
          style={{ width: columnWidth, transformOrigin: "0 0" }}
        >
          <div
            ref={bridgeInnerRef}
            style={{ width: columnWidth, transformOrigin: "0 0" }}
          >
            {bridgeOn && (
              <Suspense fallback={null}>
                <GithubPanel />
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
