import { notes } from "./content"
import { Reveal } from "./reveal"

export function Notes() {
  return (
    <section className="section" id="notes" aria-labelledby="notes-title">
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="label">{notes.label}</p>
              <h2 className="section-title" id="notes-title">
                {notes.title}
              </h2>
            </div>
            <p className="section-lede">{notes.body}</p>
          </div>
        </Reveal>

        <div className="notes-grid">
          {notes.items.map((item, index) => (
            <Reveal className="note-card" key={item.title} delay={index * 50}>
              <span className="note-index" aria-hidden="true">
                {item.index}
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
