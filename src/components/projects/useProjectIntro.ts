import { useLayoutEffect, useMemo, type RefObject } from "react"
import { useLocation } from "react-router-dom"

export type TitleIntro = "curtain" | "type" | "scramble" | "blur"
export type StackIntro = "pop" | "flip" | "shine" | "spin"

type Intro = {
  title: TitleIntro
  stack: StackIntro
}

const INTROS: Record<string, Intro> = {
  "/projects/client-portal": { title: "curtain", stack: "pop" },
  "/projects/logistics": { title: "blur", stack: "shine" },
  "/projects/load-balancer-monitoring": { title: "scramble", stack: "shine" },
  "/projects/vitech": { title: "scramble", stack: "spin" },
  "/projects/finance": { title: "blur", stack: "pop" },
  "/projects/huntxp": { title: "type", stack: "spin" },
  "/projects/recycling-platform": { title: "curtain", stack: "flip" },
  "/projects/virtual-office": { title: "scramble", stack: "flip" },
  "/projects/printset": { title: "type", stack: "shine" },
}

const TITLES: TitleIntro[] = ["curtain", "type", "scramble", "blur"]
const STACKS: StackIntro[] = ["pop", "flip", "shine", "spin"]

const EASE = "cubic-bezier(.2,.8,.2,1)"
const CROSS = "cubic-bezier(.2,1.25,.4,1)"
const GLYPHS = "#%&/<>01ABCDEFGHJKLMNPQRSTUVWXYZ"

function hash(value: string) {
  let result = 0
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) | 0
  }
  return Math.abs(result)
}

function introFor(pathname: string): Intro {
  const fixed = INTROS[pathname]
  if (fixed) return fixed

  return {
    title: TITLES[hash(pathname) % TITLES.length] ?? "curtain",
    stack: STACKS[hash(`${pathname}:stack`) % STACKS.length] ?? "pop",
  }
}

function isReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * One entrance per project page: the H1 and the stack pills. Each route gets
 * a fixed pair from `INTROS`; a new route without an entry gets a deterministic
 * pair from its path, so no page is left static and no two visits differ.
 */
export function useProjectIntro({
  title,
  titleRef,
  visualRef,
  stackRef,
}: {
  title: string
  titleRef: RefObject<HTMLHeadingElement | null>
  visualRef: RefObject<HTMLSpanElement | null>
  stackRef: RefObject<HTMLDivElement | null>
}) {
  const { pathname } = useLocation()
  const intro = useMemo(() => introFor(pathname), [pathname])

  useLayoutEffect(() => {
    const heading = titleRef.current
    const visual = visualRef.current
    if (!heading || !visual || isReducedMotion()) return

    const animations: Animation[] = []
    const timers: number[] = []
    const restores: (() => void)[] = []

    const play = (
      el: Element,
      frames: Keyframe[],
      options: KeyframeAnimationOptions,
    ) => {
      const animation = el.animate(frames, options)
      animations.push(animation)
      return animation
    }

    if (intro.title === "type" || intro.title === "scramble") {
      heading.style.minHeight = `${heading.offsetHeight}px`
    }

    if (intro.title === "curtain") {
      play(
        visual,
        [
          { transform: "translateY(calc(100% + 14px))" },
          { transform: "translateY(0)" },
        ],
        { duration: 650, easing: EASE, fill: "backwards" },
      )
    } else if (intro.title === "blur") {
      const words = visual.querySelectorAll<HTMLElement>("[data-title-word]")
      words.forEach((word, index) => {
        play(
          word,
          [
            { opacity: 0, filter: "blur(10px)", translate: "0 8px" },
            { opacity: 1, filter: "blur(0)", translate: "0 0" },
          ],
          { duration: 560, delay: index * 80, easing: EASE, fill: "backwards" },
        )
      })
    } else if (intro.title === "type") {
      visual.textContent = ""
      heading.classList.add("project-title--typing")

      let index = 0
      const timer = window.setInterval(() => {
        index += 1
        visual.textContent = title.slice(0, index)
        if (index >= title.length) {
          window.clearInterval(timer)
          heading.classList.remove("project-title--typing")
        }
      }, 30)
      timers.push(timer)
    } else {
      let tick = 0
      const timer = window.setInterval(() => {
        const resolved = Math.min(title.length, Math.floor(tick / 1.5))
        let output = ""

        for (let index = 0; index < title.length; index += 1) {
          const character = title.charAt(index)
          if (index < resolved) output += character
          else if (character === " ") output += " "
          else output += GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length))
        }

        visual.textContent = output
        tick += 1

        if (resolved >= title.length) {
          window.clearInterval(timer)
          visual.textContent = title
        }
      }, 28)
      timers.push(timer)
    }

    const stack = stackRef.current
    if (stack) {
      if (intro.stack === "flip") {
        stack.style.perspective = "800px"
        restores.push(() => {
          stack.style.perspective = ""
        })
      }

      const pills = [...stack.children].filter(
        (child): child is HTMLElement => child instanceof HTMLElement,
      )
      const base = 240

      pills.forEach((pill, index) => {
        const delay = base + index * 60

        if (intro.stack === "pop") {
          play(
            pill,
            [
              { opacity: 0, transform: "translateY(8px) scale(.6)" },
              { opacity: 1, transform: "translateY(0) scale(1)" },
            ],
            { duration: 420, delay, easing: CROSS, fill: "backwards" },
          )
          return
        }

        if (intro.stack === "flip") {
          play(
            pill,
            [
              {
                opacity: 0,
                transform: "rotateY(-85deg)",
                transformOrigin: "left center",
              },
              {
                opacity: 1,
                transform: "rotateY(0)",
                transformOrigin: "left center",
              },
            ],
            {
              duration: 460,
              delay: base + index * 55,
              easing: EASE,
              fill: "backwards",
            },
          )
          return
        }

        if (intro.stack === "shine") {
          pill.style.backgroundImage =
            "linear-gradient(115deg, transparent 35%, rgba(255,255,255,.35) 50%, transparent 65%)"
          pill.style.backgroundSize = "240% 100%"
          pill.style.backgroundRepeat = "no-repeat"
          pill.style.backgroundPosition = "-80% 0"
          restores.push(() => {
            pill.style.backgroundImage = ""
            pill.style.backgroundSize = ""
            pill.style.backgroundRepeat = ""
            pill.style.backgroundPosition = ""
          })

          play(
            pill,
            [
              { backgroundPosition: "180% 0" },
              { backgroundPosition: "-80% 0" },
            ],
            {
              duration: 620,
              delay: 120 + index * 55,
              easing: "cubic-bezier(.4,0,.2,1)",
            },
          )
          play(
            pill,
            [
              { transform: "translateY(0)" },
              { transform: "translateY(-2px)" },
              { transform: "translateY(0)" },
            ],
            { duration: 420, delay: index * 55, easing: EASE },
          )
          return
        }

        play(
          pill,
          [
            { opacity: 0, transform: "translateY(6px) scale(.92)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 380, delay, easing: CROSS, fill: "backwards" },
        )

        const icon = pill.querySelector("svg")
        if (icon) {
          play(
            icon,
            [
              { transform: "rotate(-180deg) scale(.6)" },
              { transform: "rotate(0) scale(1)" },
            ],
            { duration: 520, delay, easing: CROSS, fill: "backwards" },
          )
        }
      })
    }

    return () => {
      timers.forEach((timer) => window.clearInterval(timer))
      animations.forEach((animation) => animation.cancel())
      restores.forEach((restore) => restore())
      heading.classList.remove("project-title--typing")
      heading.style.minHeight = ""

      if (intro.title === "type" || intro.title === "scramble") {
        visual.textContent = title
      }
    }
  }, [intro, title, titleRef, visualRef, stackRef])

  return { titleMode: intro.title, stackMode: intro.stack }
}
