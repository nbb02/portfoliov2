import { useRef, useState, type KeyboardEvent } from "react"
import { scenes as sceneData } from "./content"
import { Reveal } from "./reveal"

const PANEL_ID = "scene-panel"

export function SceneExplorer() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [spotIndex, setSpotIndex] = useState(0)
  const [mode, setMode] = useState(sceneData[0].modes[0].id)
  const tabs = useRef<Array<HTMLButtonElement | null>>([])

  const scene = sceneData[sceneIndex]
  const shot = scene.modes.find((item) => item.id === mode) ?? scene.modes[0]

  function selectScene(next: number) {
    setSceneIndex(next)
    setSpotIndex(0)
    setMode(sceneData[next].modes[0].id)
  }

  function onTabKey(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return
    event.preventDefault()
    const step = event.key === "ArrowRight" ? 1 : -1
    const next = (sceneIndex + step + sceneData.length) % sceneData.length
    selectScene(next)
    tabs.current[next]?.focus()
  }

  return (
    <section
      className="section"
      id="product"
      aria-labelledby="product-title"
    >
      <div className="shell">
        <Reveal>
          <div className="section-head">
            <div>
              <p className="label">02 — Inside the app</p>
              <h2 className="section-title" id="product-title">
                Three rooms, one canvas.
              </h2>
            </div>
            <p className="section-lede">
              Switching scenes swaps a lazily loaded React subtree under the
              same renderer, never a second browser canvas. Pick a marker on the
              floor to see the decision behind it.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div
            className="tabs"
            role="tablist"
            aria-label="Scenes"
            onKeyDown={onTabKey}
          >
            {sceneData.map((item, index) => (
              <button
                key={item.id}
                ref={(element) => {
                  tabs.current[index] = element
                }}
                id={`tab-${item.id}`}
                role="tab"
                type="button"
                aria-selected={index === sceneIndex}
                aria-controls={PANEL_ID}
                tabIndex={index === sceneIndex ? 0 : -1}
                onClick={() => selectScene(index)}
              >
                <span className="tab-num">{item.index}</span>
                {item.name}
              </button>
            ))}
          </div>

          <div
            className="explorer"
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={`tab-${scene.id}`}
          >
            <div>
              <div className="stage">
                <img
                  key={`${scene.id}-${shot.id}`}
                  src={shot.src}
                  alt={`${scene.name}: ${scene.title}`}
                  width={2400}
                  height={1500}
                />

                {scene.hotspots.map((spot, index) => (
                  <button
                    key={spot.title}
                    type="button"
                    className="spot"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    aria-pressed={index === spotIndex}
                    aria-label={`Marker ${index + 1}: ${spot.title}`}
                    onClick={() => setSpotIndex(index)}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="stage-foot">
                <span>
                  {scene.index} — {scene.name} · click a marker
                </span>
                {scene.modes.length > 1 ? (
                  <div className="seg" role="group" aria-label="Time of day">
                    {scene.modes.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={mode === item.id}
                        onClick={() => setMode(item.id)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span>Rendered at 1,600 × 1,000</span>
                )}
              </div>
            </div>

            <div className="panel">
              <div className="panel-head">
                <span className="panel-kicker">{scene.kicker}</span>
                <h3 className="panel-title">{scene.title}</h3>
                <p className="panel-body">{scene.body}</p>
              </div>

              <ul className="spot-list">
                {scene.hotspots.map((spot, index) => (
                  <li className="spot-item" key={spot.title}>
                    <button
                      type="button"
                      aria-pressed={index === spotIndex}
                      onClick={() => setSpotIndex(index)}
                    >
                      <span className="idx">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="txt">{spot.title}</span>
                    </button>
                    <div className="detail">
                      <div>
                        <p>{spot.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="panel-facts">
                {scene.facts.map(([term, detail]) => (
                  <div key={term}>
                    <dt>{term}</dt>
                    <dd>{detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
