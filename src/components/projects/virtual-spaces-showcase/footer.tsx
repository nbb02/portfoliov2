import { footer, project } from "./content"
import { Logo } from "./logo"
import { scrollToTop } from "./scroll"

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="foot-brand">
          <span className="brand-mark">
            <Logo />
          </span>
          <span className="brand-text">
            <span className="brand-name">{project.name}</span>
            <span className="brand-tag">Case study · {project.year}</span>
          </span>
        </div>

        <p className="foot-credit">{footer.credit}</p>

        <div className="foot-bottom">
          <span>{footer.note}</span>
          <button type="button" onClick={scrollToTop}>
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
