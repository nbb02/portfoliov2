import { FiBarChart2, FiFileText, FiLayout, FiSliders } from "react-icons/fi"
import ProjectOverview from "../projects/ProjectOverview"

export default function ViTech() {
  return (
    <ProjectOverview
      kicker="Capstone project · 2024"
      title="ViTech Analytics"
      intro="A population management and analytics platform built as a capstone project, with dashboards, QR check-in, role-based access, and exportable reports."
      icon={FiBarChart2}
      stack={[
        "Laravel",
        "MySQL",
        "React",
        "Material UI",
        "Chart.js",
        "SCSS",
        "Docker",
        "DigitalOcean",
      ]}
      tags={[
        "Capstone",
        "Data visualization",
        "Roles & permissions",
        "Dashboards",
        "QR check-in",
        "Exports",
      ]}
      meta={[
        { label: "Role", value: "Full Stack Developer" },
        { label: "Timeline", value: "2024" },
        {
          label: "Focus",
          value: "Analytics, administration, reporting",
        },
      ]}
      brief={{
        what: {
          title: "Population data made operable.",
          points: [
            "Dashboards: sector filters, stacked charts, and configurable panels.",
            "Exploration: map popups, filters, and sortable tables.",
            "Operations: QR check-in, roles, audit trails, and exports.",
          ],
        },
        how: {
          title: "A dashboard that can be reshaped.",
          points: [
            "Panels are composed, so each program can change its own view.",
            "Program rules are configuration, not branches spread through the UI.",
            "Exports reuse the same data path as the screen, so numbers do not drift.",
          ],
        },
      }}
      preview={{
        src: "/assets/projects/vitech/dashboard.webp",
        alt: "ViTech analytics dashboard",
        width: 1800,
        height: 931,
      }}
      gallery={[
        {
          src: "/assets/projects/vitech/dashboard.webp",
          alt: "ViTech dashboard overview",
        },
        {
          src: "/assets/projects/vitech/dashboard-full.webp",
          alt: "ViTech full dashboard",
        },
        {
          src: "/assets/projects/vitech/exploration-full.webp",
          alt: "ViTech map exploration",
        },
        {
          src: "/assets/projects/vitech/members-list.webp",
          alt: "ViTech member management",
        },
        {
          src: "/assets/projects/vitech/member-qr.webp",
          alt: "ViTech QR check-in",
        },
        {
          src: "/assets/projects/vitech/settings-sectors.webp",
          alt: "ViTech sector settings",
        },
      ]}
      notes={[
        {
          label: "Composition",
          text: "Dashboards are assembled from panels per program.",
          icon: FiLayout,
        },
        {
          label: "Rules",
          text: "Program thresholds are configuration, not code branches.",
          icon: FiSliders,
        },
        {
          label: "Exports",
          text: "Reports reuse the same data path as the screen.",
          icon: FiFileText,
        },
      ]}
      nextHref="/projects/load-balancer-monitoring"
      nextLabel="Next: Load Balancer + Observability"
    />
  )
}
