import type { ReactNode } from "react"
import { architecture } from "./content"
import { Reveal } from "./reveal"

export function Architecture() {
  const cells: ReactNode[] = []

  architecture.tiers.forEach((tier, index) => {
    cells.push(
      <div className="tier" key={tier.title}>
        <span className="tier-kicker">{tier.kicker}</span>
        <h3>{tier.title}</h3>
        <ul>
          {tier.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>,
    )

    if (index < architecture.flows.length) {
      cells.push(
        <div className="connector" key={`flow-${index}`} aria-hidden="true">
          <span className="rail">
            <span className="dot" />
          </span>
          <em>{architecture.flows[index].label}</em>
        </div>,
      )
    }
  })

  return (
    <section className="band" id="how" aria-labelledby="how-title">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="label">{architecture.label}</p>
              <h2 className="section-title" id="how-title">
                {architecture.title}
              </h2>
            </div>
            <p className="section-lede">{architecture.body}</p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div className="tiers">{cells}</div>
        </Reveal>

        <Reveal delay={120}>
          <p className="band-note">
            <b>Both runtimes mount the same five plugins</b> — the Vite dev
            server in a browser tab, and a Node server inside the desktop shell.
            They are absent from the production bundle, so a built page simply
            falls back to the defaults in <b>src/config/defaults.js</b>.{" "}
            {architecture.note}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
