import { FiBarChart2 } from "react-icons/fi"
import CaseStudy from "../projects/CaseStudy"

export default function ViTech() {
  return (
    <CaseStudy
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
        "RBAC",
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
      sections={[
        {
          title: "Features",
          body: "A configurable analytics workspace for population and program data.",
          bullets: [
            "Dynamic dashboards with sector filters, stacked charts, and configurable panels.",
            "Map-based data exploration with popups, filters, and sortable tables.",
            "Camera-based QR scanning for member check-in and form handling.",
            "Role-based access control with audit trails and multi-level user management.",
            "Printable PDF reports, Excel/CSV exports, and chart-embedded documentation.",
            "Program rules engine with threshold-based configurations.",
          ],
        },
        {
          title: "Stack",
          body: "A Laravel/React application with a component-driven dashboard and a containerized deployment path.",
          bullets: [
            "Laravel and MySQL for the backend and data model.",
            "React, Material UI, Chart.js, and SCSS for the frontend.",
            "Docker for reproducible local and team environments.",
            "Hostinger, DigitalOcean, and CloudPanel for deployment.",
          ],
        },
      ]}
      gallery={[
        {
          src: "/assets/projects/vitech/dashboard.png",
          alt: "ViTech dashboard overview",
        },
        {
          src: "/assets/projects/vitech/dashboard-full.png",
          alt: "ViTech full dashboard",
        },
        {
          src: "/assets/projects/vitech/exploration-full.png",
          alt: "ViTech map exploration",
        },
        {
          src: "/assets/projects/vitech/members-list.png",
          alt: "ViTech member management",
        },
        {
          src: "/assets/projects/vitech/member-qr.png",
          alt: "ViTech QR check-in",
        },
        {
          src: "/assets/projects/vitech/settings-sectors.png",
          alt: "ViTech sector settings",
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "Data visualization and dashboard design",
        "Role-based access control and audit trails",
        "Reporting, exports, and printable documents",
        "Camera/QR integration and form handling",
        "Containerized deployment and environment setup",
      ]}
      nextHref="/projects/load-balancer-monitoring"
      nextLabel="Next: Load Balancer + Observability"
    />
  )
}
