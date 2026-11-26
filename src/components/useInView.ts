import { useEffect, useState } from "react"
import type { RefObject } from "react"

/**
 * Whether the element is within `rootMargin` of the viewport. Used to stop WebGL
 * canvases drawing while they are nowhere near the screen — browsers throttle a
 * hidden tab but not an off-screen canvas in a visible one.
 *
 * `latch` keeps it true once it has been true: a canvas that has been built is
 * kept, because rebuilding a context mid-scroll costs more than the memory it
 * holds. The latch lives in the observer callback so no effect has to set state.
 */
export function useInView(
  ref: RefObject<Element | null>,
  rootMargin = "0px",
  latch = false,
) {
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        setInView((current) =>
          latch ? current || entry.isIntersecting : entry.isIntersecting,
        )
      },
      { rootMargin },
    )
    observer.observe(element)

    return () => observer.disconnect()
  }, [latch, ref, rootMargin])

  return inView
}
