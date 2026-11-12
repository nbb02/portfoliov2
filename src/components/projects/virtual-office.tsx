import { FiBox } from "react-icons/fi"
import CaseStudy from "./CaseStudy"

export default function VirtualOffice() {
  return (
    <CaseStudy
      kicker="3D environment · 2026 · In progress"
      title="Virtual Office"
      intro="A browser-based 3D developer office with animated agent characters, desks, server racks, and a local agent bridge. The 3D scene and agent/presence layer are in place; most real integrations are still being wired."
      icon={FiBox}
      stack={[
        "React",
        "TypeScript",
        "React Three Fiber",
        "Three.js",
        "Vite",
        "WebSocket",
        "Node.js",
      ]}
      keyPoints={[
        "Isometric 3D office scene",
        "Animated agent states",
        "Local task bridge over WebSocket",
      ]}
      tags={["3D", "React Three Fiber", "Agents", "Local tools", "In progress"]}
      meta={[
        { label: "Role", value: "Personal project" },
        { label: "Timeline", value: "2026" },
        { label: "Status", value: "In progress" },
      ]}
      sections={[
        {
          title: "Features",
          body: "A gamified 3D workspace for developer operations and agent activity.",
          bullets: [
            "Isometric 3D office with desks, server racks, and a breakroom.",
            "Scene switching across office, tools wing, and farm environments.",
            "Animated agent characters with idle, walk, type, and alert states.",
            "Agent badges, task launcher, and live presence cues.",
            "A local bridge for dispatching agent tasks and streaming responses.",
            "Rendering pauses when the tab is hidden to avoid background GPU use.",
          ],
        },
        {
          title: "Architecture",
          body: "A decoupled frontend and local agent bridge.",
          bullets: [
            "React 18, React Three Fiber, Three.js, Vite, and Tailwind.",
            "Local Node/Express/WebSocket bridge for agent task dispatch.",
            "Pluggable CLI engines for agent runs and reports.",
            "HTML report modal for agent output instead of image-heavy responses.",
          ],
        },
        {
          title: "Status",
          body: "The 3D environment and agent/presence layer are implemented. Real project, server, and tooling integrations are not connected yet; the next step is wiring those events into the scene.",
        },
      ]}
      gallery={[
        {
          src: "/assets/projects/virtual-office/office.png",
          alt: "Virtual Office scene with desks, server rack, breakroom, and agent characters",
        },
        {
          src: "/assets/projects/virtual-office/tools-wing.png",
          alt: "Virtual Office Tools Wing with Antigravity, Codex, and OpenCode consoles",
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "3D scene composition with React Three Fiber",
        "3D asset and animation state design",
        "WebSocket bridge and agent task dispatch",
        "Developer-tool integration and local tooling",
        "Performance-aware rendering and visibility control",
      ]}
      nextHref="/projects/client-portal"
      nextLabel="Next: Client Portal Platform"
    />
  )
}
