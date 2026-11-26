import { useLayoutEffect, type RefObject } from "react"
import { useNavigationType } from "react-router-dom"

const EASE = "cubic-bezier(.2,.8,.2,1)"
const THRESHOLD = 0.15

type Variant = "head" | "curtain" | "flip" | "rise"

/**
 * One run per page visit, per surface. `Overview` and the home page remount
 * when returning from a project page, so the guard lives outside React. A full
 * reload clears it.
 */
const played = new Set<string>()

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

function targetsOf(group: HTMLElement) {
  const selector = group.dataset.showupTargets
  if (selector) {
    return [...group.querySelectorAll<HTMLElement>(selector)]
  }
  return [...group.children].filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  )
}

function play(
  variant: Variant,
  el: HTMLElement,
  index: number,
  created: Animation[],
) {
  if (variant === "head") {
    created.push(
      el.animate(
        [{ translate: "0 110%" }, { translate: "0 0" }],
        {
          duration: 650,
          delay: index * 110,
          easing: EASE,
          fill: "backwards",
        },
      ),
    )
    return
  }

  if (variant === "curtain") {
    const delay = index * 80
    created.push(
      el.animate(
        [
          { clipPath: "inset(100% 0 0 0 round 16px)" },
          { clipPath: "inset(0 0 0 0 round 16px)" },
        ],
        { duration: 700, delay, easing: EASE, fill: "backwards" },
      ),
    )

    const media = el.querySelector<HTMLElement>("[data-showup-media]")
    if (media) {
      created.push(
        media.animate(
          [{ scale: "1.18" }, { scale: "1" }],
          { duration: 1000, delay, easing: EASE, fill: "backwards" },
        ),
      )
    }
    return
  }

  if (variant === "flip") {
    created.push(
      el.animate(
        [
          {
            opacity: 0,
            transform: "rotateX(-75deg) translateY(30px)",
            transformOrigin: "50% 0",
          },
          { opacity: 1, transform: "none", transformOrigin: "50% 0" },
        ],
        {
          duration: 750,
          delay: index * 110,
          easing: "cubic-bezier(.2,1.3,.4,1)",
          fill: "backwards",
        },
      ),
    )
    return
  }

  created.push(
    el.animate(
      [
        { opacity: 0, translate: "0 48px", filter: "blur(14px)" },
        { opacity: 1, translate: "0 0", filter: "blur(0)" },
      ],
      {
        duration: 750,
        delay: index * 80,
        easing: EASE,
        fill: "backwards",
      },
    ),
  )
}

function start(root: HTMLElement) {
  const groups = [
    ...root.querySelectorAll<HTMLElement>("[data-showup-group]"),
  ]
  if (groups.length === 0) return () => {}

  const created: Animation[] = []
  const waiting = new Set<HTMLElement>()
  const lines = new Map<HTMLElement, HTMLElement>()
  const variants = new Map<HTMLElement, Variant>()
  const observed: HTMLElement[] = []

  for (const group of groups) {
    const variant = (group.dataset.showupGroup as Variant) ?? "rise"

    for (const el of targetsOf(group)) {
      variants.set(el, variant)
      observed.push(el)

      if (variant === "head") {
        // The wrapper is what gets observed: the line sits 110% below inside
        // an overflow clip, so it would never report as visible itself.
        const line = el.firstElementChild
        if (line instanceof HTMLElement) {
          line.style.translate = "0 110%"
          lines.set(el, line)
        }
      } else {
        el.style.opacity = "0"
        waiting.add(el)
      }
    }
  }

  const restore = () => {
    waiting.forEach((el) => (el.style.opacity = ""))
    lines.forEach((line) => (line.style.translate = ""))
    created.forEach((animation) => animation.cancel())
  }

  if (observed.length === 0) return () => {}
  if (!("IntersectionObserver" in window)) {
    restore()
    return () => {}
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry, index) => {
          const el = entry.target as HTMLElement
          const variant = variants.get(el) ?? "rise"
          observer.unobserve(el)
          waiting.delete(el)

          if (variant === "head") {
            const line = lines.get(el)
            if (line) line.style.translate = ""
            play("head", line ?? el, index, created)
            return
          }

          el.style.opacity = ""
          play(variant, el, index, created)
        })
    },
    { threshold: THRESHOLD, rootMargin: "0px 0px -8% 0px" },
  )

  observed.forEach((el) => observer.observe(el))

  return () => {
    observer.disconnect()
    restore()
  }
}

export function useShowUp<T extends HTMLElement>(
  rootRef: RefObject<T | null>,
  scope: string,
) {
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || reducedMotion()) return

    const returning = played.has(scope)

    // Browser back restores a mid-page offset; replaying there would blank the
    // cards under the pointer. Push navigation lands at the top, so replay.
    if (returning && navigationType === "POP") return
    if (navigationType !== "POP") window.scrollTo(0, 0)

    const stop = start(root)
    const timer = window.setTimeout(() => {
      played.add(scope)
    }, 100)

    return () => {
      window.clearTimeout(timer)
      stop()
    }
  }, [navigationType, rootRef, scope])
}
