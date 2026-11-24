import { useEffect, useState } from "react"

/**
 * A CSS media query as React state. The first value is read synchronously so a
 * layout chosen by the query is right on the first render instead of flipping
 * after mount.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const list = window.matchMedia(query)
    const update = () => setMatches(list.matches)

    update()
    list.addEventListener("change", update)
    return () => list.removeEventListener("change", update)
  }, [query])

  return matches
}
