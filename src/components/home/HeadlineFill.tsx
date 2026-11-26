import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { useMediaQuery } from "../useMediaQuery"

type Word = { word: string; delay: number }
type Group = { accent: boolean; words: Word[] }

export default function HeadlineFill({
  text,
  accent = "",
  className = "",
  as = "h1",
  trigger = "load",
}: {
  text: string
  accent?: string
  className?: string
  as?: "h1" | "h2"
  trigger?: "load" | "view"
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)")
  const [lit, setLit] = useState(false)

  useEffect(() => {
    if (reduceMotion) return

    if (trigger === "load") {
      const timer = window.setTimeout(() => setLit(true), 500)
      return () => window.clearTimeout(timer)
    }

    const node = ref.current
    if (!node || !("IntersectionObserver" in window)) {
      const frame = window.requestAnimationFrame(() => setLit(true))
      return () => window.cancelAnimationFrame(frame)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLit(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [reduceMotion, trigger])

  const accentWords = new Set(accent.split(" ").filter(Boolean))
  const groups: Group[] = []
  let wordIndex = 0

  text.split(" ").forEach((word) => {
    const clean = word.replace(/[^a-z]/gi, "")
    const isAccent = clean !== "" && accentWords.has(clean)
    const entry = { word, delay: wordIndex * 85 }
    wordIndex += 1

    const last = groups[groups.length - 1]
    if (isAccent && last?.accent) {
      last.words.push(entry)
    } else {
      groups.push({ accent: isAccent, words: [entry] })
    }
  })

  const content: ReactNode = groups.map((group, groupIndex) => (
    <Fragment key={`${groupIndex}-${group.words[0].word}`}>
      {groupIndex > 0 ? " " : null}
      {group.accent ? (
        <span className="hf-accent whitespace-nowrap">
          {group.words.map((entry, index) => (
            <Fragment key={`${entry.word}-${index}`}>
              <span
                className="hf-word"
                style={{ "--hf-delay": `${entry.delay}ms` } as CSSProperties}
              >
                {entry.word}
              </span>
              {index < group.words.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ) : (
        <span
          className="hf-word"
          style={
            { "--hf-delay": `${group.words[0].delay}ms` } as CSSProperties
          }
        >
          {group.words[0].word}
        </span>
      )}
    </Fragment>
  ))

  const headingProps = {
    ref,
    className: `headline-fill ${lit ? "is-lit" : ""} ${className}`,
  }

  return as === "h2" ? (
    <h2 {...headingProps}>{content}</h2>
  ) : (
    <h1 {...headingProps}>{content}</h1>
  )
}
