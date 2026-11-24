import { stack } from "./content"
import { Reveal } from "./reveal"

export function Stack() {
  return (
    <section className="section" id="stack" aria-labelledby="stack-title">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="label">{stack.label}</p>
              <h2 className="section-title" id="stack-title">
                {stack.title}
              </h2>
            </div>
            <p className="section-lede">{stack.body}</p>
          </div>
        </Reveal>

        <div className="stack-grid">
          {stack.items.map((item, index) => (
            <Reveal className="stack-card" key={item.name} delay={index * 45}>
              <div className="stack-top">
                <h3>{item.name}</h3>
                <span className="group-chip">{item.group}</span>
              </div>
              <p>{item.why}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={80}>
          <p className="stack-foot">
            react · react-dom · three · @react-three/fiber · @react-three/drei ·
            lucide-react — plus Tailwind for overlay panels, and Vite, Tauri and
            ESLint as build tools.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
