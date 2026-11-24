import type { CSSProperties } from "react"
import { project } from "./content"
import { Logo } from "./logo"
import { scrollToSection, scrollToTop } from "./scroll"

export function Nav({
  progress,
  active,
  links,
}: {
  progress: number
  active: string | undefined
  links: Array<{ id: string; label: string }>
}) {
  return (
    <header className="nav" id="top">
      <div className="shell nav-inner">
        <button
          type="button"
          className="brand"
          aria-label={`${project.name} — back to top`}
          onClick={scrollToTop}
        >
          <span className="brand-mark">
            <Logo />
          </span>
          <span className="brand-text">
            <span className="brand-name">{project.name}</span>
            <span className="brand-tag">Case study · {project.year}</span>
          </span>
        </button>

        <nav aria-label="Sections">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  aria-current={active === link.id ? "true" : undefined}
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div
        className="progress"
        style={{ "--progress": progress } as CSSProperties}
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      />
    </header>
  )
}
