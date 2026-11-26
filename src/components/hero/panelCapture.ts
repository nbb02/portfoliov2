/**
 * The full-panel width used as the dolly's stand-in and fallback: twice the
 * ~330 px its laptop screen is drawn at. At that width the panel lays out in its
 * stacked form, so its type is twice the size relative to the screen than a full
 * desktop page would be, and the capture only has to be minified 2× — a 1300 px
 * page pushed into 330 turns twelve-pixel text into four-pixel mush.
 */
export const SCREEN_PANEL_WIDTH = 660

/**
 * The hero's desktop capture is a closer view than the dolly's stand-in: 660 px
 * of page squeezed into the lid still reads as a miniature once it is tilted.
 * 480 px keeps the type large enough to read while minifying it only ~1.4×.
 */
export const HERO_PANEL_WIDTH = 480
export const HERO_PANEL_KEY = "hero-desktop"

/**
 * The same idea for a phone, where the screen is drawn around 180 px wide: 660
 * is squeezed more than three times there and the page turns to grey lines.
 * Half the width keeps the type at the same size relative to the screen as the
 * desktop card, and it is still minified only 2×.
 */
export const PHONE_PANEL_WIDTH = 360

/**
 * The phone capture is its own layout, not a viewport width, so it gets a key
 * of its own — otherwise a 360 px viewport would hand its texture to the dolly.
 */
export const PHONE_PANEL_KEY = "hero-phone"

export type PanelKey = number | string

const keyOf = (value: PanelKey) =>
  typeof value === "number" ? `w${Math.round(value)}` : value

const pending = new Map<string, Promise<HTMLCanvasElement>>()
const canvases = new Map<string, HTMLCanvasElement>()

/**
 * The laptop used to wear a screenshot of the profile, which went stale every
 * time the panel's copy changed. Rasterising the panel itself means the screen
 * always shows the current page, and a capture at its full design width
 * downscales into the screen cleanly — a small bitmap would alias into noise.
 * The width and the density are part of the key: the hero captures the narrow
 * layout at 2×, the dolly the page at the viewport's own width and at whatever
 * ratio the canvas draws it, which is one bitmap per pair.
 *
 * `patches/html-to-image+1.11.13.patch` keeps the clone's font sizes exact. The
 * library shrinks them by up to a pixel, which reflows the snapshot's line
 * breaks away from the page's and shows up as a word jumping at the handoff.
 */
export function capturePanel(
  node: HTMLElement,
  width = SCREEN_PANEL_WIDTH,
  options: { height?: number; pixelRatio?: number; key?: PanelKey } = {},
) {
  const widthPx = Math.round(width)
  const key = keyOf(options.key ?? widthPx)
  const inFlight = pending.get(key)
  if (inFlight) return inFlight

  const promise = (async () => {
    await document.fonts.ready
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    )

    /* Rasterising is a one-off after an idle callback; the library has no
       business in the first bundle. */
    const { toCanvas } = await import("html-to-image")

    return toCanvas(node, {
      width: widthPx,
      height: options.height,
      pixelRatio: options.pixelRatio ?? 1,
      backgroundColor: "#0D1117",
      // The host is parked offscreen so it never shows; the clone has to be
      // laid out at the origin or the capture comes back blank.
      style: { position: "static", left: "auto", top: "auto" },
    })
  })()
    .then((canvas) => {
      pending.delete(key)

      if (canvas.width < 2 || canvas.height < 2) {
        throw new Error("panel capture came back empty")
      }

      canvases.set(key, canvas)
      return canvas
    })
    .catch((error) => {
      pending.delete(key)
      throw error
    })

  pending.set(key, promise)
  return promise
}

/**
 * The slice of the page the laptop screen shows: its top `width ÷ aspect` rows.
 * Cropping to the screen's own ratio lets the quad map the texture 1:1 and lets
 * the real page take over on the same row.
 */
export function sliceScreen(canvas: HTMLCanvasElement, aspect: number) {
  const width = canvas.width
  const height = Math.min(canvas.height, Math.round(width / aspect))

  const slice = document.createElement("canvas")
  slice.width = width
  slice.height = height
  slice
    .getContext("2d")
    ?.drawImage(canvas, 0, 0, width, height, 0, 0, width, height)

  return slice
}

export function cachedScreenCanvas(key: PanelKey = SCREEN_PANEL_WIDTH) {
  return canvases.get(keyOf(key)) ?? null
}

/**
 * The dolly captures a slice rather than the whole page, so it replaces the
 * cached bitmap for its own key once the crop is known.
 */
export function rememberScreenCanvas(
  canvas: HTMLCanvasElement,
  key: PanelKey = SCREEN_PANEL_WIDTH,
) {
  canvases.set(keyOf(key), canvas)
}

/** Frees captures for keys the page no longer draws. */
export function releaseScreenCanvasesExcept(keep: PanelKey[]) {
  const kept = new Set(keep.map(keyOf))
  for (const key of canvases.keys()) {
    if (kept.has(key)) continue
    canvases.delete(key)
    pending.delete(key)
  }
}

