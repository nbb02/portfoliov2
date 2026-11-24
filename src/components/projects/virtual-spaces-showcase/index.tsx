import { Architecture } from "./architecture"
import { Footer } from "./footer"
import { Hero } from "./hero"
import { useActiveSection, useScrollProgress } from "./hooks"
import { Nav } from "./nav"
import { Notes } from "./notes"
import { SceneExplorer } from "./scene-explorer"
import { scrollToSection } from "./scroll"
import { Stack } from "./stack"
import { Story } from "./story"
import { stats } from "./content"
import "./showcase.css"

const NAV_LINKS = [
  { id: "why", label: "Why" },
  { id: "product", label: "Inside" },
  { id: "how", label: "Architecture" },
  { id: "stack", label: "Stack" },
  { id: "notes", label: "Notes" },
]
const NAV_IDS = NAV_LINKS.map((link) => link.id)

export default function VirtualSpacesShowcase() {
  const progress = useScrollProgress()
  const active = useActiveSection(NAV_IDS)

  return (
    <div className="vsp -mx-5 sm:-mx-8">
      <button
        type="button"
        className="skip-link"
        onClick={() => scrollToSection("main")}
      >
        Skip to content
      </button>
      <Nav progress={progress} active={active} links={NAV_LINKS} />
      <main id="main">
        <Hero stats={stats} />
        <Story />
        <SceneExplorer />
        <Architecture />
        <Stack />
        <Notes />
      </main>
      <Footer />
    </div>
  )
}
