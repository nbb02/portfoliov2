import { story } from "./content"
import { Reveal } from "./reveal"

export function Story() {
  return (
    <section
      className="section section--compact"
      id="why"
      aria-labelledby="why-title"
    >
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="label">{story.label}</p>
              <h2 className="section-title" id="why-title">
                {story.title}
              </h2>
            </div>
            <div>
              <p className="section-lede">{story.body}</p>
              <ul className="fact-chips">
                {story.chips.map((chip) => (
                  <li key={chip}>{chip}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
