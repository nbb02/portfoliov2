import { FiUsers } from "react-icons/fi"
import CaseStudy from "./CaseStudy"

export default function ClientPortal() {
  return (
    <CaseStudy
      kicker="Enterprise platform · 2026–Present"
      title="Client Portal Platform"
      intro="A multi-tenant operations portal unifying CRM, project delivery, embedded forms, and document generation across a large modular add-on system."
      icon={FiUsers}
      stack={[
        "React",
        "TypeScript",
        "Laravel",
        "Inertia.js",
        "Tailwind",
        "Redis",
        "MySQL",
        "AWS",
      ]}
      tags={[
        "Multi-tenancy",
        "Authorization",
        "Modular architecture",
        "Embedded forms",
        "Document pipelines",
      ]}
      meta={[
        { label: "Role", value: "Software Developer" },
        { label: "Timeline", value: "May 2026 – Present" },
        {
          label: "Focus",
          value: "Tenancy, authorization, reliable delivery",
        },
      ]}
      sections={[
        {
          title: "Features",
          body: "A shared platform effort across product, design, and engineering. The main areas are:",
          bullets: [
            "CRM and delivery workflows: pipelines, deals, contacts, tasks, approvals, and audit trails.",
            "Modular add-ons: extension points, isolated routes, and versioned modules that ship without modifying core code.",
            "Embedded forms: drag-and-drop authoring, conditional logic, multi-page flows, and cross-domain embedding.",
            "Document generation: template-driven PDFs, queued rendering, image processing, and merged documents.",
            "Integrations: accounting, e-commerce webhooks, calendar sync, email, and messaging behind permission checks.",
            "Shared practices: additive migrations, deployment verification, and test coverage for tenant boundaries.",
          ],
        },
        {
          title: "Security",
          body: "Tenant isolation, authorization boundaries, and audit trails are central to the platform.",
          bullets: [
            "Tenant isolation: resolve the tenant at the request boundary and scope every read and write.",
            "Authorization: role checks and policy-based access in front of sensitive actions.",
            "Auditability: audit trails that keep changes attributable to a real actor.",
            "Secure integrations: verify webhooks, scope API access to the tenant, and make retries and failures explicit.",
            "Permission-scoped tooling: agent and integration tools inherit the user's existing rights instead of expanding them.",
          ],
        },
      ]}
      highlightsKicker="Capabilities"
      highlightsTitle="Skills"
      highlights={[
        "Tenant isolation and boundary testing",
        "Policy-based authorization and audit trails",
        "Modular architecture and extension points",
        "Secure integrations and idempotent retries",
        "Queued document workflows and failure handling",
      ]}
      nextHref="/projects/logistics"
      nextLabel="Next: Logistics & Realtime Booking"
    />
  )
}
