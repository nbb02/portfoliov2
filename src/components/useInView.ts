import { useEffect, useState } from "react"
import type { RefObject } from "react"

/**
 * Whether the element is within `rootMargin` of the viewport. Used to stop WebGL
 * canvases drawing while they are nowhere near the screen — browsers throttle a
 * hidden tab but not an off-screen canvas in a visible one.
 */
export function useInView(
  ref: RefObject<Element | null>,
  rootMargin = "0px",
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) setInView(entry.isIntersecting)
      },
      { rootMargin },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [ref, rootMargin])

  return inView
}
