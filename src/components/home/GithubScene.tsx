import { lazy, Suspense, useCallback, useEffect, useRef, useState } from "react"
import type { Texture } from "three"
import { useScrollOffset } from "../hero/useScrollOffset"
import { clamp01 } from "../hero/easing"
import { useInView } from "../useInView"
import { SCREEN_ASPECT, PHONE_SCREEN_ASPECT } from "../hero/screenGeometry"
import {
  SCREEN_PANEL_WIDTH,
  cachedScreenTexture,
  capturePanel,
  releaseScreenTexturesExcept,
  screenTexture,
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
  const [screen, setScreen] = useState<Texture | null>(
    () =>
      /*
       * The hero's capture is a stand-in until this viewport's own lands: it is
       * the panel at the layout below the breakpoint, which reads as the same
       * page on a phone, where the shipping screenshot would not.
       */
      cachedScreenTexture(viewportWidth()) ??
      cachedScreenTexture(SCREEN_PANEL_WIDTH),
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
  const capturedWidth = useRef(0)
  useEffect(() => {
    if (reduced || !panelHeight || !panelNear) return
    const node = panelRef.current
    if (!node || capturedWidth.current === columnWidth) return

    let cancelled = false
    const run = async () => {
      try {
        /*
         * The phone's screen ends up as the whole viewport, so its capture is
         * rasterised at twice the size — but only as far as the screen sees, so
         * the taller canvas does not cost a full panel's worth of memory.
         */
        const aspect = mobile ? PHONE_SCREEN_ASPECT : SCREEN_ASPECT
        const canvas = await capturePanel(node, columnWidth, {
          height: mobile ? Math.round(columnWidth / aspect) : undefined,
          pixelRatio: mobile ? 2 : 1,
        })
        if (cancelled) return
        capturedWidth.current = columnWidth
        setScreen(
          screenTexture(
            sliceScreen(canvas, aspect),
            columnWidth,
          ),
        )
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("[github] screen capture failed", error)
        }
      }
    }

    const idle = window.requestIdleCallback(run, { timeout: 4000 })
    return () => {
      cancelled = true
      window.cancelIdleCallback(idle)
    }
  }, [reduced, panelHeight, panelNear, columnWidth, mobile])

  /* Drop captures for widths the page no longer draws. */
  useEffect(() => {
    if (!screen || !cachedScreenTexture(columnWidth)) return
    releaseScreenTexturesExcept([SCREEN_PANEL_WIDTH, columnWidth])
  }, [screen, columnWidth])

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
          screen={screen}
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
  screen,
  columnWidth,
  mobile,
  viewportHeight,
}: {
  screen: Texture | null
  columnWidth: number
  mobile: boolean
  viewportHeight: number
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLDivElement>(null)
  const bridgeRef = useRef<HTMLDivElement>(null)
  const bridgeInnerRef = useRef<HTMLDivElement>(null)
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
      const bridge = bridgeRef.current
      const inner = bridgeInnerRef.current
      const canvas = canvasRef.current
      const quad = screenRect.current

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
         * The composition is framed on the viewport height, so on a wide monitor
         * the lid grows sideways into the copy's column. Keep the copy on the
         * page's column — the same left edge as every section — and slide it
         * only as far as needed to clear the lid, keeping the gap the bezel
         * takes up. Both numbers are bucketed so the idle drift does not move
         * the text every frame.
         */
        if (intro) {
          const clearance = Math.max(24, quad.width * 0.08)
          const available = quad.left - 24 - clearance

          if (available < 200) {
            intro.style.visibility = "hidden"
          } else {
            const width = Math.min(340, Math.floor(available / 8) * 8)
            const limit = Math.floor((quad.left - clearance - width) / 8) * 8

            intro.style.visibility = "visible"
            intro.style.width = `${width}px`
            intro.style.left = `${Math.max(24, Math.min(columnLeft(columnWidth), limit))}px`
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
  const inView = useInView(targetRef, "120% 0px")

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
          className="pointer-events-none absolute top-[12svh] z-10 hidden w-[360px] max-w-[360px] lg:block"
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
          {inView && (
            <Suspense fallback={null}>
              <LaptopScroll
                progressRef={cinemaRef}
                onScreenRect={handleScreenRect}
                render={render3d}
                screen={screen}
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
            <Suspense fallback={null}>
              <GithubPanel />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}
