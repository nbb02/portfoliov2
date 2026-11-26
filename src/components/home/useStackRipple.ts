import { useCallback, useEffect, useRef, type RefObject } from "react"

const WAVE_DURATION = 520
const WAVE_STAGGER = 85
const WAVE_DELAY = 400
const WAVE_INTERVAL = 4500

const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches

function tilesOf(grid: HTMLElement) {
  return Array.from(grid.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  )
}

/** Column count comes from the rendered grid, so the ripple turns at the
 * same breakpoint the layout does instead of guessing from the viewport. */
function columnsOf(tiles: HTMLElement[]) {
  if (!tiles.length) return 1
  const top = tiles[0].offsetTop
  const firstRow = tiles.filter((tile) => tile.offsetTop === top).length
  return Math.max(1, firstRow)
}

export function useStackRipple(ref: RefObject<HTMLElement | null>) {
  const visible = useRef(false)
  const columns = useRef(0)

  const replay = useCallback(() => {
    const grid = ref.current
    if (!grid || !visible.current || calm()) return

    const tiles = tilesOf(grid)
    if (!tiles.length) return
    /* Measured by the resize observer, not per wave: `offsetTop` on sixteen
       tiles forces a layout, and this runs on a timer rather than a scroll. */
    if (!columns.current) columns.current = columnsOf(tiles)

    tiles.forEach((tile, index) => {
      const delay =
        (index % columns.current + Math.floor(index / columns.current) * 2) *
        WAVE_STAGGER
      tile.animate(
        [
          { translate: "0 0" },
          {
            translate: "0 -12px",
            borderColor: "#b45309",
            boxShadow: "0 10px 18px rgba(180, 83, 9, 0.2)",
          },
          { translate: "0 0" },
        ],
        {
          duration: WAVE_DURATION,
          delay,
          easing: "ease-in-out",
        },
      )
    })
  }, [ref])

  useEffect(() => {
    const grid = ref.current
    if (!grid) return

    const measure = () => {
      columns.current = columnsOf(tilesOf(grid))
    }
    measure()

    const resize = new ResizeObserver(measure)
    resize.observe(grid)

    /* The wave is decorative and invisible off screen; running it there only
       kept the layout busy behind a scrolled-away section. */
    const view = new IntersectionObserver(
      (entries) => {
        visible.current = Boolean(entries[0]?.isIntersecting)
        if (visible.current) replay()
      },
      { rootMargin: "200px 0px" },
    )
    view.observe(grid)

    let interval: number | undefined
    const start = window.setTimeout(() => {
      replay()
      interval = window.setInterval(replay, WAVE_INTERVAL)
    }, WAVE_DELAY)

    return () => {
      window.clearTimeout(start)
      if (interval) window.clearInterval(interval)
      resize.disconnect()
      view.disconnect()
    }
  }, [ref, replay])
}
