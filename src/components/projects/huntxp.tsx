import { FiAward } from "react-icons/fi"
import CaseStudy from "./CaseStudy"

export default function HuntXP() {
  return (
    <CaseStudy
      kicker="Personal platform · 2026"
      title="HuntXP"
      intro="A gamified job-hunting workbench that turns applications into a pipeline, parses a resume into structured data, and runs AI coaching locally in the browser."
      icon={FiAward}
      stack={[
        "Next.js",
        "React",
        "TypeScript",
        "WebLLM",
        "Llama 3.2",
      ]}
      keyPoints={[
        "AI runs locally in the browser",
        "XP and leaderboard loop",
        "Resume parsed into structured data",
      ]}
      tags={[
        "Local-first AI",
        "WebLLM",
        "Resume parsing",
        "Gamification",
        "Pipeline",
      ]}
      meta={[
        { label: "Role", value: "Personal project" },
        { label: "Timeline", value: "2026" },
        { label: "Status", value: "Active build" },
      ]}
      sections={[
        {
          title: "Features",
          body: "A complete loop from first application to offer, with progress you can see.",
          bullets: [
            "Application pipeline with status tracking, job details, and a paged kanban-style workspace.",
            "XP, levels, and a global leaderboard that reward consistent progress instead of one-off effort.",
            "Public profile builder with skills, achievements, and an HTML/CSS branding engine with a live preview.",
            "Resume AI that parses a PDF, DOCX, or TXT file into a structured profile with work history and skills.",
            "Job AI workbench with skill-match scoring, saved resume context, and dedicated Chat, Docs, and Prep tabs.",
            "Contextual coaching with suggested questions and a separate reasoning view.",
          ],
        },
        {
          title: "Local-first AI",
          body: "The personal-data features are designed to keep sensitive input on the device.",
          bullets: [
            "In-browser inference through WebLLM/MLC, with a locally downloaded Llama 3.2 3B instruction model.",
            "Model selection is explicit, so a cloud model can be chosen only when it is wanted.",
            "Resume data is turned into a structured profile before it is used as AI context.",
            "The AI surface separates coaching messages from the model's reasoning stream.",
            "Everything is scoped to the signed-in user, including the public-profile visibility toggle.",
          ],
        },
        {
          title: "Engineering",
          body: "The build is shaped around a fast, stateful workbench rather than a set of disconnected forms.",
          bullets: [
            "A single React/TypeScript front end with a persistent application pipeline and profile store.",
            "An in-browser model runtime, loaded on demand so the rest of the app stays usable while it warms up.",
            "Structured resume parsing with guided and raw JSON views for verification.",
            "Gamification state (XP, level, leaderboard position) derived from application activity.",
            "Server routes for profile and pipeline persistence, with the AI path kept local.",
          ],
        },
      ]}
      gallery={[
        {
          src: "/assets/projects/huntxp/homepage.png",
          alt: "HuntXP landing page with the momentum engine and feature overview",
        },
        {
          src: "/assets/projects/huntxp/profile.png",
          alt: "HuntXP profile customization with the HTML and CSS branding engine",
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "Local-first AI with in-browser model inference",
        "Structured document parsing and validation",
        "Gamification systems: XP, levels, and leaderboards",
        "Stateful pipeline and kanban-style interfaces",
        "Privacy-aware handling of personal documents",
        "AI tool UX: context, suggestions, and reasoning views",
      ]}
      nextHref="/projects/virtual-office"
      nextLabel="Next: Virtual Office"
    />
  )
}
