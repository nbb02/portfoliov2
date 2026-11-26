import { useEffect, type RefObject } from "react"

const OFF_CARD = "-200%"

function reset(card: HTMLElement) {
  card.style.setProperty("--mx", OFF_CARD)
  card.style.setProperty("--my", OFF_CARD)
}

/**
 * One delegated pointer listener for the whole work grid. Only the card under
 * the pointer reads its rect, so a nine-card bento never measures nine times.
 * Leaving a card parks the glow off-card so it cannot stay lit behind you.
 */
export function useSpotlightCards(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current
    if (!root) return

    const onMove = (event: PointerEvent) => {
      const target = event.target as Element | null
      const card = target?.closest<HTMLElement>(".spotlight-card")
      if (!card || !root.contains(card)) return

      const rect = card.getBoundingClientRect()
      card.style.setProperty(
        "--mx",
        `${((event.clientX - rect.left) / rect.width) * 100}%`,
      )
      card.style.setProperty(
        "--my",
        `${((event.clientY - rect.top) / rect.height) * 100}%`,
      )
    }

    const onOut = (event: PointerEvent) => {
      const target = event.target as Element | null
      const card = target?.closest<HTMLElement>(".spotlight-card")
      if (!card) return

      const next = event.relatedTarget as Node | null
      if (next && card.contains(next)) return

      reset(card)
    }

    root.addEventListener("pointermove", onMove)
    root.addEventListener("pointerout", onOut)

    return () => {
      root.removeEventListener("pointermove", onMove)
      root.removeEventListener("pointerout", onOut)
    }
  }, [ref])
}
