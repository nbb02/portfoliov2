import { FiUsers } from "react-icons/fi"
import { PortalArt } from "../home/ProjectArt"
import ProjectOverview from "./ProjectOverview"

export default function ClientPortal() {
  return (
    <ProjectOverview
      kicker="Enterprise platform · 2026–Present"
      title="Client Portal Platform"
      intro="An existing multi-tenant operations portal covering CRM, project delivery, and a large modular add-on system. I contribute across tenancy, authorization, and delivery workflows."
      icon={FiUsers}
      art={<PortalArt className="h-52 w-full" />}
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
      tags={["Multiple clients", "Authorization", "Add-on modules"]}
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
        "Add-on modules and extension points",
        "Secure integrations and idempotent retries",
      ]}
      nextHref="/projects/logistics"
      nextLabel="Next: Logistics & Realtime Booking"
    />
  )
}
