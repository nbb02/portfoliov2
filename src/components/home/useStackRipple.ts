import { useCallback, useEffect, type RefObject } from "react"

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
  const replay = useCallback(() => {
    const grid = ref.current
    if (!grid || calm()) return

    const tiles = tilesOf(grid)
    const columns = columnsOf(tiles)

    tiles.forEach((tile, index) => {
      const delay =
        (index % columns + Math.floor(index / columns) * 2) * WAVE_STAGGER
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
    let interval: number | undefined
    const start = window.setTimeout(() => {
      replay()
      interval = window.setInterval(replay, WAVE_INTERVAL)
    }, WAVE_DELAY)

    return () => {
      window.clearTimeout(start)
      if (interval) window.clearInterval(interval)
    }
  }, [replay])
}
