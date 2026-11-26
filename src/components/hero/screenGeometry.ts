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
 * The dolly renders at 2×. On a 1× display the lid's edges stair-step and the
 * page inside is sampled off the renderer's own resolution, which is what makes
 * the flight look soft; the hero already supersamples for the same reason.
 * Three renderers' worth of fill at 3× bought nothing visible over 2× — the
 * screen is a plane — and cost a third of the frame budget on a retina display.
 */
export const SCREEN_MIN_DPR = 2
export const SCREEN_MAX_DPR = 2

/**
 * The capture is rasterised at 1× even though the screen is drawn at 2×.
 * `html-to-image` renders the page on the main thread, and at the viewport's
 * width a 2× bitmap is a multi-megapixel long task — the one thing that
 * reliably stuttered the scroll before the dolly. The screen reads softer at
 * the end of the flight; on a phone, whose screen is drawn around 200 px wide,
 * 1× is still native resolution, so this is really a desktop trade.
 */
export const SCREEN_CAPTURE_RATIO = 1

/** The capture cache key: same layout at a denser ratio is a different bitmap. */
export function screenCacheKey(width: number, ratio: number) {
  return `w${Math.round(width)}@${ratio.toFixed(2)}`
}
