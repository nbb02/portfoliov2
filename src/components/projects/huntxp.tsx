import { FiAward } from "react-icons/fi"
import ProjectOverview from "./ProjectOverview"

export default function HuntXP() {
  return (
    <ProjectOverview
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
      tags={[
        "AI in the browser",
        "WebLLM",
        "Resume parsing",
        "Points & levels",
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
          title: "AI in the browser",
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
            "XP, level, and leaderboard position derived from application activity.",
            "Server routes for profile and pipeline persistence, with the AI path kept local.",
          ],
        },
      ]}
      preview={{
        src: "/assets/projects/huntxp/homepage.webp",
        alt: "HuntXP homepage with the application pipeline",
        width: 1800,
        height: 974,
      }}
      gallery={[
        {
          src: "/assets/projects/huntxp/homepage.webp",
          alt: "HuntXP landing page with the momentum engine and feature overview",
        },
        {
          src: "/assets/projects/huntxp/pipeline.webp",
          alt: "HuntXP application pipeline grouped by status with XP per card",
        },
        {
          src: "/assets/projects/huntxp/job-ai.webp",
          alt: "HuntXP Job AI workbench showing a strengths and gaps analysis for a role",
        },
        {
          src: "/assets/projects/huntxp/resume-ai.webp",
          alt: "HuntXP Resume AI parsing a resume into a structured profile",
        },
        {
          src: "/assets/projects/huntxp/leaderboard.webp",
          alt: "HuntXP leaderboard ranking demo hunters by momentum XP",
        },
        {
          src: "/assets/projects/huntxp/profile.webp",
          alt: "HuntXP profile customization with skills, HTML/CSS, and a live preview",
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "Local-first AI with in-browser model inference",
        "Structured document parsing and validation",
        "Points, levels, and leaderboards",
        "Stateful pipeline and kanban-style interfaces",
        "Privacy-aware handling of personal documents",
        "AI tool UX: context, suggestions, and reasoning views",
      ]}
      nextHref="/projects/recycling-platform"
      nextLabel="Next: Recycling Platform"
    />
  )
}
