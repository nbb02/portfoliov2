import type { ReactNode } from "react"

export default function ScrollLink({
  target,
  className,
  children,
}: {
  target: string
  className?: string
  children: ReactNode
}) {
  return (
    <a
      href={`#${target}`}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        document
          .getElementById(target)
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      }}
    >
      {children}
    </a>
  )
}
