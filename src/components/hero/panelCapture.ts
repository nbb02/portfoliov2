import { toCanvas } from "html-to-image"
import * as THREE from "three"

/**
 * The panel's width for the laptop screen: twice the ~330 px the screen is
 * drawn at. At that width the panel lays out in its stacked form, so its type
 * is twice the size relative to the screen than a full desktop page would be,
 * and the capture only has to be minified 2× — a 1300 px page pushed into 330
 * turns twelve-pixel text into four-pixel mush.
 */
export const SCREEN_PANEL_WIDTH = 660

const pending = new Map<number, Promise<HTMLCanvasElement>>()
const textures = new Map<number, THREE.Texture>()

/**
 * The laptop used to wear a screenshot of the profile, which went stale every
 * time the panel's copy changed. Rasterising the panel itself means the screen
 * always shows the current page, and a capture at its full design width
 * downscales into the screen cleanly — a small bitmap would alias into noise.
 * The width is part of the key: the hero captures the narrow layout, the dolly
 * captures the page at the viewport's own width.
 */
export function capturePanel(
  node: HTMLElement,
  width = SCREEN_PANEL_WIDTH,
  options: { height?: number; pixelRatio?: number } = {},
) {
  const key = Math.round(width)
  const inFlight = pending.get(key)
  if (inFlight) return inFlight

  const promise = (async () => {
    await document.fonts.ready
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    )

    return toCanvas(node, {
      width: key,
      height: options.height,
      pixelRatio: options.pixelRatio ?? 1,
      backgroundColor: "#0D1117",
      cacheBust: true,
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

export function screenTexture(canvas: HTMLCanvasElement, width = SCREEN_PANEL_WIDTH) {
  const key = Math.round(width)
  const existing = textures.get(key)
  if (existing) return existing

  const texture = new THREE.CanvasTexture(canvas)
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.needsUpdate = true

  textures.set(key, texture)
  return texture
}

export function cachedScreenTexture(width = SCREEN_PANEL_WIDTH) {
  return textures.get(Math.round(width)) ?? null
}

/** Frees captures for widths the page no longer draws. */
export function releaseScreenTexturesExcept(keep: number[]) {
  const kept = new Set(keep.map((width) => Math.round(width)))
  for (const [key, texture] of textures) {
    if (kept.has(key)) continue
    texture.dispose()
    textures.delete(key)
    pending.delete(key)
  }
}

/**
 * Keep a window smaller than the whole page on screen so the wheel always has
 * somewhere to go, even when the capture is much taller than it is wide.
 */
const MAX_REPEAT_Y = 0.56

/**
 * Fits the page to the panel's width and returns how far it can scroll, or
 * `null` while the texture has no image behind it yet.
 */
export function fitScreenMap(
  map: THREE.Texture,
  screenAspect: number,
  maxAnisotropy: number,
) {
  const image = map.image as { width?: number; height?: number } | undefined
  const imageWidth = image?.width ?? 0
  const imageHeight = image?.height ?? 0

  if (!imageWidth || !imageHeight) {
    return null
  }

  map.flipY = false
  map.colorSpace = THREE.SRGBColorSpace
  map.wrapS = THREE.ClampToEdgeWrapping
  map.wrapT = THREE.ClampToEdgeWrapping
  map.minFilter = THREE.LinearMipmapLinearFilter
  map.magFilter = THREE.LinearFilter
  map.generateMipmaps = true
  map.anisotropy = Math.min(16, maxAnisotropy)

  const imageAspect = imageWidth / imageHeight
  const repeatY = Math.min(MAX_REPEAT_Y, imageAspect / screenAspect)

  map.repeat.set(1, repeatY)
  map.offset.set(0, 0)
  map.needsUpdate = true

  return Math.max(0, 1 - repeatY)
}
