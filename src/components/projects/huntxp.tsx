import { FiAward, FiFileText, FiLock } from "react-icons/fi"
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
      brief={{
        what: {
          title: "From first application to offer.",
          points: [
            "Pipeline: status tracking, job details, and a paged kanban workspace.",
            "Momentum: XP, levels, and a leaderboard reward consistent progress.",
            "Profile: skills, achievements, and a live HTML/CSS branding preview.",
          ],
        },
        how: {
          title: "Data before the model.",
          points: [
            "Resume parsing produces structured data before the model sees it.",
            "The model runs locally, so personal documents do not leave the device.",
            "XP and leaderboard position are derived from activity, never entered by hand.",
          ],
        },
      }}
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
      notes={[
        {
          label: "Privacy",
          text: "Resume parsing and inference stay in the browser.",
          icon: FiLock,
        },
        {
          label: "Structure",
          text: "Resumes become structured data before the model sees them.",
          icon: FiFileText,
        },
        {
          label: "Progress",
          text: "XP and rank are derived from application activity.",
          icon: FiAward,
        },
      ]}
      nextHref="/projects/recycling-platform"
      nextLabel="Next: Recycling Platform"
    />
  )
}
