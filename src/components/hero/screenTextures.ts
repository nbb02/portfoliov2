import * as THREE from "three"
import { SCREEN_PANEL_WIDTH, type PanelKey } from "./panelCapture"

/*
 * Textures live in the 3D chunks, not in `panelCapture`: importing three at the
 * top level of a module the home route loads eagerly drags the whole renderer
 * into the first bundle for a screen that is only ever sampled by a lazy canvas.
 */
const keyOf = (value: PanelKey) =>
  typeof value === "number" ? `w${Math.round(value)}` : value

const textures = new Map<string, THREE.Texture>()

export function screenTexture(
  canvas: HTMLCanvasElement,
  key: PanelKey = SCREEN_PANEL_WIDTH,
) {
  const cacheKey = keyOf(key)
  const existing = textures.get(cacheKey)
  if (existing) {
    /* A resize replaces the bitmap for the same width; the texture has to
       follow it or the lid keeps the frame from before the resize. */
    if (existing.image !== canvas) {
      existing.image = canvas
      existing.needsUpdate = true
    }
    return existing
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.flipY = false
  texture.colorSpace = THREE.SRGBColorSpace
  texture.wrapS = THREE.ClampToEdgeWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  // Bilinear within the nearest mip level: blending two levels together, which
  // trilinear does, is what softens the page's UI text while the dolly is still
  // growing the screen.
  texture.minFilter = THREE.LinearMipmapNearestFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.needsUpdate = true

  textures.set(cacheKey, texture)
  return texture
}

/** Frees captures for keys the page no longer draws. */
export function releaseScreenTexturesExcept(keep: PanelKey[]) {
  const kept = new Set(keep.map(keyOf))
  for (const [key, texture] of textures) {
    if (kept.has(key)) continue
    texture.dispose()
    textures.delete(key)
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
  minFilter: THREE.MinificationTextureFilter = THREE.LinearMipmapLinearFilter,
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
  map.minFilter = minFilter
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
