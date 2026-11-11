export type RoleItem = {
  title: string
  company: string
  range: string
  highlights: string[]
  current?: boolean
}

export const JOURNEY_ROLES: RoleItem[] = [
  {
    title: "Software Developer",
    company: "Enterprise Software Company*",
    range: "May 2026 – Present",
    current: true,
    highlights: [
      "Building a multi-tenant portal for CRM, project delivery, and document workflows.",
      "Working on tenant isolation, authorization boundaries, audit trails, and secure integrations.",
    ],
  },
  {
    title: "Software Engineer",
    company: "Logistics and Technology Company*",
    range: "Sep 2025 – Mar 2026",
    highlights: [
      "Built a logistics platform competing with Lalamove and Grab, reaching ~50k registered users.",
      "Deployed AWS infrastructure with a Dockerized Prometheus, Grafana, and Loki stack.",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Freelance",
    range: "Jan 2025 – Sep 2025",
    highlights: [
      "Delivered client web applications with React, Laravel, and MySQL.",
      "Built full-stack solutions with Next.js and MongoDB.",
    ],
  },
  {
    title: "Intern to Junior Back-End Developer",
    company: "Technology Solutions Provider*",
    range: "Jan 2025 – Sep 2025",
    highlights: [
      "Developed Node.js and Express services integrated with MySQL.",
      "Assisted with server deployment, configuration, and maintenance.",
    ],
  },
]
