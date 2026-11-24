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
