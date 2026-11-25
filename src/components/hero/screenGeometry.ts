/**
 * Width ÷ height of the laptop's screen mesh. The dolly's capture is cropped to
 * this ratio, so the texture maps 1:1 onto the screen and the page that replaces
 * it starts on the same row.
 */
export const SCREEN_ASPECT = 1.544

/**
 * The same ratio for the phone that stands in on narrow viewports. Its screen at
 * the viewport's width is the viewport's height, so the handover lands on the
 * page's top edge exactly as the laptop's does.
 */
export const PHONE_SCREEN_ASPECT = 390 / 844

/**
 * The dolly never renders below 2×. On a 1× display the lid's edges stair-step
 * and the page inside is sampled off the renderer's own resolution, which is
 * what makes the flight look soft; the hero already supersamples for the same
 * reason. The capture follows this ratio, so the screen stays 1:1 with it.
 */
export const SCREEN_MIN_DPR = 2
export const SCREEN_MAX_DPR = 3

/** Past this many texels the capture costs more than the screen can show. */
const MAX_SCREEN_TEXELS = 20_000_000

/**
 * The ratio the screen is both drawn and captured at. They have to agree: the
 * screen fills the viewport at the end of the dolly, so a capture denser than
 * the canvas is thrown away and a sparser one is upscaled twice — once by the
 * sampler, once by the display.
 */
export function screenPixelRatio(width: number, aspect: number) {
  if (typeof window === "undefined") return 1
  const dpr = Math.min(
    SCREEN_MAX_DPR,
    Math.max(SCREEN_MIN_DPR, window.devicePixelRatio || 1),
  )
  const texels = width * (width / aspect)
  const budget = Math.sqrt(MAX_SCREEN_TEXELS / Math.max(texels, 1))
  return Math.max(1, Math.min(dpr, budget))
}

/** The capture cache key: same layout at a denser ratio is a different bitmap. */
export function screenCacheKey(width: number, ratio: number) {
  return `w${Math.round(width)}@${ratio.toFixed(2)}`
}
