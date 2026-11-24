import { useState } from "react"
import { hero, project, type Stat } from "./content"
import { Reveal } from "./reveal"

export function Hero({ stats }: { stats: Stat[] }) {
  const [view, setView] = useState<"ui" | "clean">("ui")
  const [lead, mark, tail] = project.titleParts

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="shell">
        <Reveal>
          <div className="hero-grid">
            <div>
              <p className="label">{project.label}</p>
              <h1 id="hero-title">
                {lead}
                <em>{mark}</em>
                {tail}
              </h1>
            </div>

            <div className="hero-aside">
              <p className="lede">{project.lede}</p>
              <dl className="meta">
                {project.meta.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>

        <Reveal delay={110}>
          <figure className="hero-stage">
            <div className="frame">
              <img
                key={view}
                src={view === "ui" ? hero.shots.day : hero.shots.clean}
                alt={
                  view === "ui"
                    ? "The Virtual Spaces office at day: an isometric low-poly floor plan with desks, characters, a break room and a terrace tennis court."
                    : "The same office with every interface overlay hidden, showing only the 3D scene."
                }
                width={2400}
                height={1500}
              />
              <div className="frame-toggle">
                <div className="seg" role="group" aria-label="Screenshot overlay">
                  <button
                    type="button"
                    aria-pressed={view === "ui"}
                    onClick={() => setView("ui")}
                  >
                    With UI
                  </button>
                  <button
                    type="button"
                    aria-pressed={view === "clean"}
                    onClick={() => setView("clean")}
                  >
                    Clean
                  </button>
                </div>
              </div>
            </div>
            <figcaption className="stage-foot">
              <span>{view === "ui" ? hero.caption : hero.cleanCaption}</span>
              <span>1 canvas · one shadow map · no textures</span>
            </figcaption>
          </figure>
        </Reveal>

        <Reveal delay={160}>
          <div className="stats">
            {stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <div className="stat-num">
                  {stat.value} <span>{stat.unit}</span>
                </div>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
