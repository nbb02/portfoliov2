import { useEffect, useRef } from "react"

/**
 * Scroll offset, in px, from the moment a tall section's top reaches the viewport
 * top until its bottom leaves. Clamped to the section's own range, so the value
 * is stable when the section is off-screen in either direction.
 */
export function useScrollOffset<T extends HTMLElement>(
  onFrame: (offset: number, span: number) => void,
) {
  const targetRef = useRef<T>(null)
  const onFrameRef = useRef(onFrame)

  useEffect(() => {
    onFrameRef.current = onFrame
  }, [onFrame])

  useEffect(() => {
    const target = targetRef.current
    if (!target) return

    let frame = 0

    const measure = () => {
      frame = 0
      const rect = target.getBoundingClientRect()
      const span = rect.height - window.innerHeight
      const offset = Math.min(Math.max(0, -rect.top), Math.max(0, span))
      onFrameRef.current(offset, span)
    }

    const schedule = () => {
      if (frame) return
      frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return { targetRef }
}
